const { REST, Routes, SlashCommandBuilder } = require("discord.js")

// Definição dos comandos slash
const commands = [
  new SlashCommandBuilder()
    .setName("add")
    .setDescription("Adiciona um vídeo do YouTube à playlist")
    .addStringOption((option) => option.setName("url").setDescription("URL do vídeo do YouTube").setRequired(true)),

  new SlashCommandBuilder().setName("play").setDescription("Reproduz a música atual"),

  new SlashCommandBuilder().setName("pause").setDescription("Pausa a música atual"),

  new SlashCommandBuilder().setName("loop").setDescription("Ativa/desativa o loop da música atual"),

  new SlashCommandBuilder().setName("playlist").setDescription("Mostra a playlist atual"),
]

// Função para registrar os comandos slash
async function registerCommands(client) {
  try {
    console.log("Iniciando registro de comandos slash...")

    const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN)

    await rest.put(Routes.applicationCommands(client.user.id), { body: commands.map((command) => command.toJSON()) })

    console.log("Comandos slash registrados com sucesso!")
  } catch (error) {
    console.error("Erro ao registrar comandos slash:", error)
  }
}

module.exports = { registerCommands }
