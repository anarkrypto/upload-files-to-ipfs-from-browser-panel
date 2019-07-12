# Upload Files to IPFS from Browser - Panel

<h1 align="center">
  <img width="650px" src="https://raw.githubusercontent.com/anarkrypto/upload-files-to-ipfs-from-browser-panel/master/public/img/preview.png" alt="Upload files to IPFS with Browser - Panel" />
</h1>


<h3>Introdução</h3>

Suba seus arquivos para a IPFS diretamente pelo Browser.
Você pode escolher entre usar um node IPFS rodando localmente ou remotamente, portanto instalar um node IPFS é opcional.

Uma interface web simples e intituiva para a API [js-ipfs-http-client](https://github.com/ipfs/js-ipfs-http-client)

As linguagens utilizadas aqui (javascript, html e css) se aplicam a qualquer servidor web, podem rodar tanto com node js, conforme segue o tutorial abaixo, como em outros. 
Para rodar no apache e nginx, por exemplo, basta copiar os arquivos de dentro do diretório 
[<strong>/public</strong>](https://github.com/anarkrypto/upload-files-to-ipfs-from-browser-panel/tree/master/public") para o diretório do seu servidor (por exemplo /var/www/html/).

  [<h2>Demo Online</h2>](https://anarkrypto.github.io/upload-files-to-ipfs-from-browser-panel/public)
  
  
  
Você pode acessar o mesmo neste link. É o mesmo código, hospedado pelo Github Pages


Caso decida usar um node IPFS rodando localmente, lembre-se de [Setar o Cors](#Cors) corretamente.

Caso contrário terá erros de permissão nas requisiçôes.

## Instalando e rodando (node js):

Primeiramente resolva as dependências (git, npm e node js)

Debian / Ubuntu:
```bash
  sudo apt update && sudo apt upgrade

  sudo apt install curl python-software-properties

  curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -

  sudo apt install nodejs

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


### Para rodar a API em um node IPFS localmente 


Caso ainda não tenha instalado, siga os passos de instalação e configuração do node IPFS: [IPFS - Getting Started](https://ipfs.io/ipfs/Qme5m1hmmMbjdzcDeUC2LtHZxAABYtdmq5mBpvtBsC8VL5/docs/getting-started/)

#### Cors
Após isso, configure o CORS, com os seguintes comandos no seu terminal:

```bash
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["GET", "POST"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Headers '["Authorization"]'
ipfs config --json API.HTTPHeaders.Access-Control-Expose-Headers '["Location"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Credentials '["true"]'
```

Inicie o node novamente
```bash
ipfs daemon 
```

Pronto! Seu node estará online localmente e pronto pra servir as requisições API. 

Por padrão, o node IPFS roda a API em localhost:5001 (ou 127.0.0.1:5001). E o gateway na porta 8080.
