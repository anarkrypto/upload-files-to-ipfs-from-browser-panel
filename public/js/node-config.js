//set default remote Node
document.getElementById("remote_address").value = node.remote.address;
document.getElementById("remote_apiPort").value = node.remote.port;
document.getElementById("remote_gatewayPort").value = node.remote.gateway;
document.querySelector("#remote").querySelector("#labelAddress").className = "active"
document.querySelector("#remote").querySelector("#labelPort").className = "active"
document.querySelector("#remote").querySelector("#labelGateway").className = "active"
if (node.remote.protocol.toLowerCase() == "https" || node.remote.protocol.toLowerCase() == "http") {
  changeProtocol("remote", node.remote.protocol.toLowerCase())
} else {
  alert ("Configurations Invalid: Protocols accepted are HTTP or HTTPS only! Edit your config.js")
  throw new Error();
}

//set default local node
document.querySelector("#local_address").value = node.local.address;
document.querySelector("#local_apiPort").value = node.local.port;
document.getElementById("local_gatewayPort").value = node.local.gateway;
document.querySelector("#local").querySelector("#labelAddress").className = "active"
document.querySelector("#local").querySelector("#labelPort").className = "active"
document.querySelector("#local").querySelector("#labelGateway").className = "active"
if (node.local.protocol.toLowerCase() == "https" || node.local.protocol.toLowerCase() == "http") {
  changeProtocol("local", node.local.protocol.toLowerCase())
} else {
  alert ("Configurations Invalid: Protocols accept are HTTP or HTTPS only! Edit your config.js")
  throw new Error();
}


function changeProtocol (selectedNode, protocol) {
  if (protocol == "https") {
    node[selectedNode].protocol = "https"
    document.querySelector("#"+selectedNode).querySelector("#http").className = "tab"
    document.querySelector("#"+selectedNode).querySelector("#https").className += " active"
  }
  if (protocol == "http") {
    node[selectedNode].protocol = "http"
    document.querySelector("#"+selectedNode).querySelector("#https").className = "tab"
    document.querySelector("#"+selectedNode).querySelector("#http").className += " active"
  }
}
