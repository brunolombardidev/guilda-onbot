// Arquivo principal do bot
require("dotenv").config()
const { Client, GatewayIntentBits, Collection } = require("discord.js")
const { registerCommands } = require("./commands")
const { PlaylistManager } = require("./playlist")

// Tratamento de erros não capturados
process.on("unhandledRejection", (error) => {
  console.error("Erro não tratado:", error)
})

process.on("uncaughtException", (error) => {
  console.error("Exceção não capturada:", error)
  // Não encerre o processo para manter o bot online
  // process.exit(1);
})

// Criando uma nova instância do cliente Discord
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
  ],
})

// Inicializando o gerenciador de playlists
const playlistManager = new PlaylistManager()

// Evento disparado quando o bot está pronto
client.once("ready", () => {
  console.log(`Bot está online como ${client.user.tag}!`)
  registerCommands(client)
})

// Manipulador de comandos
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return

  const { commandName } = interaction

  try {
    // Comandos de playlist
    if (commandName === "add") {
      const url = interaction.options.getString("url")
      const voiceChannel = interaction.member.voice.channel

      if (!voiceChannel) {
        return interaction.reply("Você precisa estar em um canal de voz para usar este comando!")
      }

      await playlistManager.addToPlaylist(interaction.guildId, voiceChannel.id, url, interaction.user.tag)
      interaction.reply(`Vídeo adicionado à playlist do canal ${voiceChannel.name}!`)
    } else if (commandName === "play") {
      const voiceChannel = interaction.member.voice.channel

      if (!voiceChannel) {
        return interaction.reply("Você precisa estar em um canal de voz para usar este comando!")
      }

      await playlistManager.play(interaction.guildId, voiceChannel)
      interaction.reply("Reproduzindo música!")
    } else if (commandName === "pause") {
      const voiceChannel = interaction.member.voice.channel

      if (!voiceChannel) {
        return interaction.reply("Você precisa estar em um canal de voz para usar este comando!")
      }

      playlistManager.pause(interaction.guildId, voiceChannel.id)
      interaction.reply("Música pausada!")
    } else if (commandName === "loop") {
      const voiceChannel = interaction.member.voice.channel

      if (!voiceChannel) {
        return interaction.reply("Você precisa estar em um canal de voz para usar este comando!")
      }

      const isLooping = playlistManager.toggleLoop(interaction.guildId, voiceChannel.id)
      interaction.reply(`Loop ${isLooping ? "ativado" : "desativado"}!`)
    } else if (commandName === "playlist") {
      const voiceChannel = interaction.member.voice.channel

      if (!voiceChannel) {
        return interaction.reply("Você precisa estar em um canal de voz para usar este comando!")
      }

      const playlist = playlistManager.getPlaylist(interaction.guildId, voiceChannel.id)

      if (!playlist || playlist.length === 0) {
        return interaction.reply("A playlist está vazia!")
      }

      const playlistText = playlist
        .map((item, index) => `${index + 1}. ${item.title} (Adicionado por: ${item.addedBy})`)
        .join("\n")

      interaction.reply(`**Playlist do canal ${voiceChannel.name}:**\n${playlistText}`)
    }
  } catch (error) {
    console.error(error)
    interaction.reply("Ocorreu um erro ao executar o comando!")
  }
})

// Login do bot
client.login(process.env.DISCORD_TOKEN)
