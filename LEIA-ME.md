# Wins Inspeções — site institucional

Site de página única responsivo, feito com React e Vite. É necessário ter Node.js instalado (versão 20.19+ ou 22.12+).

## Executar localmente

```bash
npm install
npm run dev
```

Abra no navegador o endereço exibido no terminal. Para gerar os arquivos de produção, execute `npm run build`; o resultado estará na pasta `dist`. Para testá-lo localmente, execute `npm run preview`.

## Testes

Execute `npm test` para os testes de componentes e formulário. Para os testes de navegação e responsividade em navegador, instale o Chromium com `npx playwright install chromium` e execute `npm run test:e2e`. O Playwright inicia o servidor automaticamente.

## Proposta refinada

Uma presença institucional focada em apresentar a Wins, explicar UT e LP, mostrar a forma de trabalho e ajudar clientes a estruturar pedidos de orçamento. O site não inventa história, certificações, clientes, áreas de atendimento ou canais de contato.

## Antes de publicar

- Confirme com a Wins todos os serviços, aplicações, missão, visão, valores e textos técnicos.
- Adicione o e-mail comercial, telefone, WhatsApp, razão social, CNPJ e região de atendimento reais. Não há canais fictícios configurados.
- O formulário **não envia nem armazena dados**: prepara um texto para o visitante copiar e encaminhar. Para receber pedidos automaticamente, será necessária uma integração real e segura, além de aviso e política de privacidade adequados.
- A seção de parcerias não recebe currículos. Não adicione upload sem definir o tratamento e armazenamento seguros dos dados e uma política de privacidade adequada à LGPD.
- Acrescente qualificações, certificados, cases, fotos de serviços e documentos apenas quando forem comprováveis e autorizados.
- A fotografia é ilustrativa e vem do Unsplash; fontes vêm do Google Fonts. Precisam de internet. Prefira imagens autorizadas da empresa para publicação.
- Publique com HTTPS e revise os requisitos legais e de privacidade conforme as funcionalidades e os dados usados na versão final.

## Arquivos

- `index.html`: entrada e metadados da página.
- `src/main.jsx`: inicialização do React.
- `src/App.jsx`: conteúdo, componentes e lógica do orçamento.
- `styles.css`: identidade visual e responsividade.
