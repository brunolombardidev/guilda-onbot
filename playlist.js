const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require("@discordjs/voice")
const ytdl = require("ytdl-core")

class PlaylistManager {
  constructor() {
    // Armazena playlists por servidor e canal
    this.playlists = new Map()
    // Armazena conexões de voz ativas
    this.connections = new Map()
    // Armazena players de áudio ativos
    this.players = new Map()
    // Armazena estado de loop por canal
    this.loopStates = new Map()
  }

  // Gera uma chave única para cada canal de voz em cada servidor
  getChannelKey(guildId, channelId) {
    return `${guildId}-${channelId}`
  }

  // Adiciona um vídeo à playlist
  async addToPlaylist(guildId, channelId, url, addedBy) {
    const channelKey = this.getChannelKey(guildId, channelId)

    if (!this.playlists.has(channelKey)) {
      this.playlists.set(channelKey, [])
    }

    try {
      // Obtém informações do vídeo
      const videoInfo = await ytdl.getInfo(url)
      const videoDetails = {
        url,
        title: videoInfo.videoDetails.title,
        addedBy,
      }

      this.playlists.get(channelKey).push(videoDetails)
      return videoDetails
    } catch (error) {
      console.error("Erro ao adicionar vídeo:", error)
      throw new Error("URL de vídeo inválida ou inacessível")
    }
  }

  // Reproduz a música atual
  async play(guildId, voiceChannel) {
    const channelKey = this.getChannelKey(guildId, voiceChannel.id)
    const playlist = this.playlists.get(channelKey)

    if (!playlist || playlist.length === 0) {
      throw new Error("A playlist está vazia!")
    }

    // Pega o primeiro vídeo da playlist
    const currentVideo = playlist[0]

    // Conecta ao canal de voz se ainda não estiver conectado
    if (!this.connections.has(channelKey)) {
      const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: guildId,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
      })

      this.connections.set(channelKey, connection)
    }

    // Cria um player de áudio se ainda não existir
    if (!this.players.has(channelKey)) {
      const player = createAudioPlayer()
      this.players.set(channelKey, player)

      // Configura o evento de fim de reprodução
      player.on(AudioPlayerStatus.Idle, () => {
        // Se o loop estiver ativado, reproduz novamente o mesmo vídeo
        if (this.loopStates.get(channelKey)) {
          this.play(guildId, voiceChannel)
        }
      })

      const connection = this.connections.get(channelKey)
      connection.subscribe(player)
    }

    // Cria um recurso de áudio a partir do vídeo do YouTube
    const stream = ytdl(currentVideo.url, {
      filter: "audioonly",
      quality: "highestaudio",
      highWaterMark: 1 << 25, // 32MB buffer
    })

    const resource = createAudioResource(stream)
    const player = this.players.get(channelKey)

    // Reproduz o áudio
    player.play(resource)

    return currentVideo
  }

  // Pausa a reprodução
  pause(guildId, channelId) {
    const channelKey = this.getChannelKey(guildId, channelId)
    const player = this.players.get(channelKey)

    if (player) {
      player.pause()
    }
  }

  // Ativa/desativa o loop
  toggleLoop(guildId, channelId) {
    const channelKey = this.getChannelKey(guildId, channelId)

    const currentState = this.loopStates.get(channelKey) || false
    this.loopStates.set(channelKey, !currentState)

    return !currentState
  }

  // Retorna a playlist atual
  getPlaylist(guildId, channelId) {
    const channelKey = this.getChannelKey(guildId, channelId)
    return this.playlists.get(channelKey) || []
  }
}

module.exports = { PlaylistManager }
