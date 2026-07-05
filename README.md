# Sistema de Vendas

PWA simples para cadastro de produtos e registro de vendas, com controle de estoque em tempo real. Visual inspirado em um livro-caixa: papel creme, tinta verde-escura e detalhes em latão.

## Funcionalidades

- Cadastro de produtos (ID, nome, quantidade, preço)
- Registro de vendas com baixa automática no estoque
- Tabela de estoque atualizada em tempo real
- Funciona offline (Service Worker)
- Instalável no celular e no computador (PWA)

## Tecnologias

- HTML5 semântico
- CSS3 (sem frameworks)
- JavaScript puro (vanilla JS)
- `localStorage` para persistência local, com camada de abstração (`js/storage.js`) pronta para migração futura ao Firebase, sem necessidade de alterar o restante do código

## Estrutura de pastas

```
sistema-vendas/
├── index.html
├── manifest.json
├── sw.js
├── README.md
├── LICENSE
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   └── storage.js
├── icons/
│   ├── icon-192.png
│   ├── icon-512.png
│   └── icon-512-maskable.png
└── screenshots/
    └── screenshot-wide.png
```

## Como rodar localmente

Como o app usa Service Worker, ele precisa ser servido por HTTP (não funciona abrindo o `index.html` direto com duplo clique).

```bash
# na pasta do projeto
python3 -m http.server 8080
```

Depois acesse `http://localhost:8080`.

## Publicando no GitHub Pages

1. Crie um repositório no GitHub (ex.: `sistema-vendas`).
2. Suba todos os arquivos mantendo a estrutura de pastas acima.
3. Em **Settings → Pages**, selecione a branch `main` e a pasta `/ (root)`.
4. O app ficará disponível em `https://SEU-USUARIO.github.io/sistema-vendas/`.

## Gerando um APK a partir do PWA

Depois de publicado no GitHub Pages (o PWA precisa estar em HTTPS), use o **PWABuilder**:

1. Acesse https://www.pwabuilder.com
2. Cole a URL do seu GitHub Pages e clique em **Start**.
3. O PWABuilder valida o `manifest.json` e o Service Worker.
4. Clique em **Package for Stores → Android** para gerar o pacote (APK ou AAB), assinado com uma chave própria ou gerada automaticamente.
5. Baixe o pacote e instale no celular, ou publique na Google Play.

## Licença

Distribuído sob a licença MIT. Veja o arquivo `LICENSE`.
