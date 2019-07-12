//Change this file as you need it

const node = []

node.default = "remote"

// default remote Node
node.remote = []
node.remote.address = 'ipfs.infura.io'
node.remote.port = 5001
node.remote.gateway = 80
node.remote.protocol = "https"


// default local node
node.local = []
node.local.address = '127.0.0.1'
node.local.port = 5001
node.local.gateway = 8080
node.local.protocol = 'http'
