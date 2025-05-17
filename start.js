// Script de inicialização para serviços de hospedagem
const { spawn } = require("child_process")
const path = require("path")

// Verifica se o token está definido
if (!process.env.DISCORD_TOKEN) {
  console.error("ERRO: Variável de ambiente DISCORD_TOKEN não definida!")
  console.error("Por favor, defina a variável de ambiente DISCORD_TOKEN antes de iniciar o bot.")
  process.exit(1)
}

// Inicia o bot
console.log("Iniciando o bot Discord...")
const bot = spawn("node", [path.join(__dirname, "index.js")], { stdio: "inherit" })

bot.on("close", (code) => {
  console.log(`O processo do bot foi encerrado com código ${code}`)
})
