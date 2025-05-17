# Guia de Deploy - Discord YouTube Player

Este guia explica como fazer o deploy do bot Discord YouTube Player usando o Render.

## Pré-requisitos

1. Uma conta no [GitHub](https://github.com/)
2. Uma conta no [Render](https://render.com/) (o plano gratuito é suficiente)
3. Um bot Discord já criado no [Portal de Desenvolvedores do Discord](https://discord.com/developers/applications)

## Passo 1: Preparar o repositório no GitHub

1. Faça login na sua conta do GitHub
2. Crie um novo repositório (pode ser público ou privado)
3. Faça upload dos arquivos do bot para o repositório (ou use Git para fazer push)
4. Certifique-se de que o arquivo `.env` NÃO está incluído no repositório (ele deve estar no .gitignore)

## Passo 2: Configurar o serviço no Render

1. Faça login na sua conta do Render
2. Clique em "New +" e selecione "Web Service"
3. Conecte sua conta do GitHub se ainda não estiver conectada
4. Selecione o repositório que contém o código do bot
5. Configure o serviço:
   - **Nome**: Escolha um nome para seu serviço (ex: discord-youtube-player)
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plano**: Free (gratuito)

6. Na seção "Environment Variables", adicione:
   - Chave: `DISCORD_TOKEN`
   - Valor: [Cole o token do seu bot Discord aqui]

7. Clique em "Create Web Service"

## Passo 3: Verificar o deploy

1. O Render começará a fazer o build e deploy do seu serviço
2. Você pode acompanhar o progresso nos logs
3. Quando o deploy estiver concluído, o bot deve ficar online no Discord

## Passo 4: Manter o serviço ativo (opcional)

O plano gratuito do Render pode desativar seu serviço após períodos de inatividade. Para manter o bot sempre online:

1. Configure um serviço de ping como o [UptimeRobot](https://uptimerobot.com/) (gratuito)
2. No UptimeRobot, adicione um novo monitor do tipo HTTP(s)
3. Use a URL do seu serviço Render como alvo do ping
4. Configure o intervalo para 5 minutos

## Solução de problemas

Se o bot não ficar online:

1. Verifique os logs no Render para identificar erros
2. Certifique-se de que o token do bot está correto
3. Verifique se o bot foi adicionado ao seu servidor Discord com as permissões corretas
4. Confirme que todas as dependências estão instaladas corretamente

Para mais ajuda, consulte a [documentação do Render](https://render.com/docs) ou abra uma issue no repositório do GitHub.
