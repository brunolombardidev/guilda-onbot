# Discord YouTube Player

Um bot para o Discord que permite aos usuários criar uma playlist compartilhada de vídeos do YouTube.

## Características

- Reproduz áudio de vídeos do YouTube em canais de voz
- Permite que qualquer usuário adicione vídeos à playlist
- Controles de reprodução: play, pause e loop
- Não avança automaticamente para o próximo vídeo
- Playlist compartilhada por canal de voz

## Comandos

- `/add [url]` - Adiciona um vídeo do YouTube à playlist
- `/play` - Reproduz a música atual
- `/pause` - Pausa a música atual
- `/loop` - Ativa/desativa o loop da música atual
- `/playlist` - Mostra a playlist atual

## Configuração

1. Crie um aplicativo no [Portal de Desenvolvedores do Discord](https://discord.com/developers/applications)
2. Crie um bot para o aplicativo e copie o token
3. Adicione o bot ao seu servidor com as permissões necessárias
4. Crie um arquivo `.env` na raiz do projeto e adicione seu token:
   \`\`\`
   DISCORD_TOKEN=seu_token_aqui
   \`\`\`
5. Instale as dependências: `npm install`
6. Inicie o bot: `npm start`

## Deploy no GitHub e Railway

### Preparação

1. Certifique-se de que todos os arquivos estão prontos
2. NÃO inclua o arquivo `.env` no repositório

### GitHub

1. Crie um repositório no GitHub
2. Inicialize o Git localmente:
   \`\`\`
   git init
   git add .
   git commit -m "Versão inicial"
   git remote add origin https://github.com/seu-usuario/seu-repositorio.git
   git push -u origin master
   \`\`\`

### Railway

1. Acesse [Railway](https://railway.app/)
2. Faça login com GitHub
3. Crie um novo projeto a partir do repositório GitHub
4. Adicione a variável de ambiente `DISCORD_TOKEN`
5. O deploy será automático

### Manutenção

- Cada push para o GitHub acionará um novo deploy
- Verifique os logs no Railway para monitorar o bot

## Requisitos

- Node.js 16.9.0 ou superior
- FFmpeg instalado no sistema (ou use ffmpeg-static)
