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

## Configuração Local

1. Clone este repositório
2. Instale as dependências: `npm install`
3. Crie um arquivo `.env` na raiz do projeto e adicione seu token:
   \`\`\`
   DISCORD_TOKEN=seu_token_aqui
   \`\`\`
4. Inicie o bot: `npm run dev`

## Hospedagem no Render

Este bot está configurado para ser facilmente hospedado no Render. Siga as instruções na seção de deploy deste README.

## Requisitos

- Node.js 16.9.0 ou superior
- FFmpeg (incluído via ffmpeg-static)

## Deploy

Veja as instruções detalhadas para deploy no arquivo DEPLOY.md
