# Upload Files to IPFS from Browser - Panel

<h1 align="center">
  <img width="650px" src="https://raw.githubusercontent.com/anarkrypto/upload-files-to-ipfs-from-browser-panel/master/public/img/preview.png" alt="Upload files to IPFS with Browser - Panel" />
</h1>


### Introduction

Upload your files to IPFS directly from the Browser using local or remote IPFS nodes.

A simple and intuitive web interface for the API [js-ipfs-http-client](https://github.com/ipfs/js-ipfs-http-client)

[<h3>Demo Online</h3>](https://anarkrypto.github.io/upload-files-to-ipfs-from-browser-panel/public)

## Running locally (node js):

```bash
// Clone this project
git clone https://github.com/anarkrypto/upload-files-to-ipfs-from-browser-panel.git

// Go to the project directory
cd upload-files-to-ipfs-from-browser-panel

// Instal node dependencies
npm install

// Run the server:
app.js
```

If everything went well, it will return something like:
``` Server listening on https://localhost:3000 ```

So open the address https://localhost:3000 in your browser and that's it!
You can now start uploading your files.


### Sending to a local IPFS node


If you haven't installed it yet, follow the steps to install and configure the IPFS node: [IPFS - Getting Started](https://ipfs.io/ipfs/Qme5m1hmmMbjdzcDeUC2LtHZxAABYtdmq5mBpvtBsC8VL5/docs/getting-started/)

#### Cors

To use an IPFS node running locally you need to set IPFS CORS policies correctly.

Otherwise, you will have permission errors in the requests.

Paste the following commands in your terminal:

```bash
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["GET", "POST"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Headers '["Authorization"]'
ipfs config --json API.HTTPHeaders.Access-Control-Expose-Headers '["Location"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Credentials '["true"]'
```

Start / Restart IPFS node:
```bash
ipfs daemon 
```

Ready! Your node will be online locally and ready to serve API requests.

By default, the IPFS node runs the API at localhost:5001 (or 127.0.0.1:5001). And the gateway on port 8080.
