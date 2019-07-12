# Upload Files to IPFS from Browser - Panel

<h1 align="center">
  <a href="https://ipfs.io"><img width="650px" src="https://raw.githubusercontent.com/anarkrypto/upload-files-to-ipfs-from-browser-panel/master/public/img/preview.png" alt="Upload files to IPFS with Browser - Panel" /></a>
</h1>


<h3>Introdução</h3>

Suba seus arquivos para a IPFS diretamente pelo Browser.
Você pode escolher entre usar um node IPFS rodando localmente ou remotamente, portanto instalar um node IPFS é opcional.

Uma interface web simples e intituiva para a API js-ipfs-http-client https://github.com/ipfs/js-ipfs-http-client

As linguagens utilizadas aqui (javascript, html e css) se aplicam a qualquer servidor web, podem rodar tanto com node js, conforme segue o tutorial abaixo, como em outros. 
Para rodar no apache e nginx, por exemplo, basta copiar os arquivos de dentro do diretório <a href="https://github.com/anarkrypto/upload-files-to-ipfs-from-browser-panel/tree/master/public" target="_blank"><strong>/public</strong></a> para o diretório do servidor (por exemplo /var/www/html/).

## Instalando e rodando (node js):

Primeiramente resolva as dependências (git, npm e node js)
Debian / Ubuntu:
```bash
  sudo apt update && sudo apt upgrade

  sudo apt-get install curl python-software-properties

  curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -

  sudo apt-get install nodejs

  sudo apt install git
```

Para verificar as versões instaladas:
```bash
node -v
npm -v
git --version
```

Instalando

```bash
git clone https://github.com/anarkrypto/upload-files-to-ipfs-from-browser-panel.git

cd upload-files-to-ipfs-from-browser-panel

npm install
```


 Para iniciar o servidor localmente então,  (porta 3000 por padrão), digite no mesmo diretório:

```bash
node app.js
```

Se deu tudo certo, ele vai retornar algo como
``` Server listening on https://localhost:3000 ```

Então abra este endereço https://localhost:3000 no seu navegador e pronto! Já pode começar a enviar seus arquivos, a interface é intuitiva.


