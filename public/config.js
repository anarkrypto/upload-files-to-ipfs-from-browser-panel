// Change this file as you need it

const config = {
	port: 5001,
	gateway: 8080
}

const node = {
	// default remote Node
	default: 'remote',
	remote: {
		address: 'ipfs.infura.io',
		...config,
		protocol: 'https'
	},

	// default local node
	local: {
		address: '127.0.0.1',
		...config,
		protocol: 'http'
	}
}
