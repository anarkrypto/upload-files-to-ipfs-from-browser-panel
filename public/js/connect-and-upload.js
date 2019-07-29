function updateNode (selectedNode) {
  if (selectedNode == "remote") {
    node.default = "remote";
    node.remote.address = document.querySelector("#remote_address").value
    node.remote.port = document.querySelector("#remote_apiPort").value
    node.remote.gateway = document.querySelector("#remote").querySelector("#remote_gatewayPort").value
    node.remote.protocol = document.querySelector("#remoteProtocol").querySelector("li.active").innerText.toLowerCase()
  }

  if (selectedNode == "local") {
    node.default = "local";
    node.local.address = document.querySelector("#local_address").value
    node.local.port = document.querySelector("#local_apiPort").value
    node.local.gateway = document.querySelector("#local").querySelector("#local_gatewayPort").value
    node.local.protocol = document.querySelector("#localProtocol").querySelector("li.active").innerText.toLowerCase()
  }

  nodeConnect(selectedNode);
}


function nodeConnect (selectedNode) {
  if (selectedNode == "remote") {
    document.querySelector('button#buttonRemote').setAttribute('disabled', '')
    document.querySelector('button#buttonRemote').querySelector(".buttonContent div").innerText = "Connecting"
    document.querySelector('button#buttonRemote').querySelector(".buttonContent div").classList.add("connecting")
    document.querySelector('button#buttonLocal').querySelector(".buttonContent div").innerHTML = 'Connect <img src="img/connect.png"/>'
    document.querySelector('button#buttonRemote').querySelector(".buttonContent .min-loading").classList.remove('min-loading-hidden') //loading event
  }

  if (selectedNode == "local") {
    document.querySelector('button#buttonLocal').setAttribute('disabled', '')
    document.querySelector('button#buttonLocal').querySelector(".buttonContent div").innerText = "Connecting"
    document.querySelector('button#buttonLocal').querySelector(".buttonContent div").classList.add("connecting")
    document.querySelector('button#buttonRemote').querySelector(".buttonContent div").innerHTML = 'Connect <img src="img/connect.png"/>'
    document.querySelector('button#buttonLocal').querySelector(".buttonContent .min-loading").classList.remove('min-loading-hidden') //loading event
  }

  var status = "wait"

  ipfsRequest ("GatewayCheck.log", buffer.Buffer.from('ABC', 'utf-8')).then((data) => {
    if (data[0].hash == "QmNz1UBzpdd4HfZ3qir3aPiRdX5a93XwTuDNyXRc6PKhWW" ) {
      online(selectedNode);
      status = "online"
    } else {
      offline(selectedNode);
      status = "offline"
    }
    document.querySelector('button#buttonRemote').removeAttribute("disabled");
    document.querySelector('button#buttonLocal').removeAttribute("disabled");
    document.querySelector('button#buttonRemote').querySelector('.buttonContent .min-loading').classList.add('min-loading-hidden') //loading event
    document.querySelector('button#buttonLocal').querySelector('.buttonContent .min-loading').classList.add('min-loading-hidden') //loading event
    return status
  }, function (reason) {
    document.querySelector('button#buttonRemote').removeAttribute("disabled");
    document.querySelector('button#buttonLocal').removeAttribute("disabled");
    document.querySelector('button#buttonRemote').querySelector('.buttonContent .min-loading').classList.add('min-loading-hidden') //loading event
    document.querySelector('button#buttonLocal').querySelector('.buttonContent .min-loading').classList.add('min-loading-hidden') //loading event
    offline(selectedNode)
    return "offline"
  })
}

function online (selectedNode) {
  connected = 1
  if (selectedNode == "remote") {
    document.querySelector('button#buttonRemote').querySelector(".buttonContent div").classList.remove("connecting")
    document.querySelector('button#buttonRemote').querySelector(".buttonContent div").innerHTML = 'Node Online <img src="img/connected.png"/>'
    document.querySelector('button#buttonRemote').querySelector('.buttonContent .min-loading').classList.add('min-loading-hidden')
  }
  if (selectedNode == "local") {
    document.querySelector('button#buttonLocal').querySelector(".buttonContent div").classList.remove("connecting")
    document.querySelector('button#buttonLocal').querySelector(".buttonContent div").innerHTML = 'Node Online <img src="img/connected.png"/>'
    document.querySelector('button#buttonLocal').querySelector('.buttonContent .min-loading').classList.add('min-loading-hidden')
  }
}

function offline (selectedNode) {
  connected = 0
  if (selectedNode == "remote") {
    document.querySelector('button#buttonRemote').querySelector(".buttonContent div").innerHTML = 'Node Offline! <img src="img/disconnected.png"/>'
  }
  if (selectedNode == "local") {
    document.querySelector('button#buttonLocal').querySelector(".buttonContent div").innerHTML = 'Node Offline! <img src="img/disconnected.png"/>'
  }
}

function upload() {
  if (!connected) {
    alert ("Connect to node First!")
    return
  }
  if (filesOk.length < 1) {
      alert("<p>At least one selected file is invalid - do not select any folders.</p><p>Please reselect and try again.</p>");
      return
  }
  document.querySelector('.min-loading.blue').classList.remove('loading-hidden') //loading event
  document.querySelector('button#buttonUpload').setAttribute('disabled', '')
  document.querySelector('button#buttonRemote').setAttribute('disabled', '')
  document.querySelector('button#buttonLocal').setAttribute('disabled', '')

    filesOk.forEach(function(file){
      let reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadend = function() {
          ipfsRequest (file.name, buffer.Buffer(reader.result)).then((data) => {
            response.push(data[0])
            document.querySelector("#response").innerText = JSON.stringify(response, null, 2)
            updateList(fileChecksum(file), data[0].hash)
            uploadCount++
            if (uploadCount == filesOk.length) {
              document.querySelector('.min-loading.blue').classList.add('loading-hidden');  //stop loading event
              document.querySelector('button#buttonRemote').removeAttribute('disabled', '')
              document.querySelector('button#buttonLocal').removeAttribute('disabled', '')
              document.querySelector('button#buttonUpload').onclick=function(){resetFiles()}
              document.querySelector('button#buttonUpload').innerHTML = 'Clean Up<img src="img/reset.png" />'
              document.querySelector('button#buttonUpload').removeAttribute("disabled");
            }
      })
    }
  })
}

function ipfsRequest (file_name, data) {
  var ipfs = window.IpfsHttpClient(node[node.default].address, node[node.default].port, {protocol: node[node.default].protocol}) //router to the IPFS network without any local node
  var file_send =
  [
   {
     path: file_name,
     content: data
   }
 ]
  return new Promise((resolve, reject) => {
      ipfs.add(file_send, function (err, json) {
        if (err) {
          alert(err);
          reject (0)
        } else {
          resolve (json)
        }
      })
  })
}


function removeItem(checksum) {
  var item = files_checksum.indexOf(checksum)
  filesOk.splice(item, 1)
  files_checksum.splice(item, 1)

  document.getElementById(checksum).remove();
}

function handleDragOver(evt) {
  evt.stopPropagation(); // Do not allow the dragover event to bubble.
  evt.preventDefault(); // Prevent default dragover event behavior.
} // handleDragOver


function handleFileSelect(evt) {
    evt.stopPropagation(); // Do not allow the drop event to bubble.
    evt.preventDefault(); // Prevent default drop event behavior.

    if (evt.dataTransfer != null){
      var files = evt.dataTransfer.files; // Grab the list of files dragged to the drop box.
    } else {
      var files = evt.target.files; // FileList object from input
    }


    if (!files) {
        alert("<p>At least one selected file is invalid - do not select any folders.</p><p>Please reselect and try again.</p>");
        return;
    }
    for (var i = 0; i < files.length; i++) {
        if (!files[i]) {
            alert("Unable to access " + file.name);
            continue; // Immediately move to the next file object.
        }
        if (files[i].size == 0) {
            alert("Skipping " + files[i].name.toUpperCase() + " because it is empty.");
            continue;
        }
        if (files_checksum.includes(fileChecksum(files[i]))) {
            alert("This files is already listed");
            continue
        } else {
            files_checksum[filesOk.length] = fileChecksum(files[i])
            document.querySelector("#list").querySelector("ul").innerHTML += '<li id="' + fileChecksum(files[i]) + '"><strong class="fileName">' +
            files[i].name + '</strong> <spam class="itemClose"><a class="removeItem" href="#" onclick="removeItem(\''+fileChecksum(files[i])+'\')">&times;</a></spam>' +
            '</a></spam><br> <spam id="fileProperties"> (' + (files[i].type || 'n/a' ) +') - ' +
            files[i].size + ' bytes, last modified: ' + new Date(files[i].lastModified).toLocaleDateString() +'</spam></li>';

            filesOk[filesOk.length] = files[i]; //push valid files for filesOk array
        }

    }

    //reset filesList input
    document.getElementById("files").value = ''
    if(!/safari/i.test(navigator.userAgent)){
      document.getElementById("files").type = ''
      document.getElementById("files").type = 'file'
    }
}

function updateList (checksum, ipfsHash) {
  var i = files_checksum.indexOf(checksum) // equal filesOk[i]
  if (node[node.default].gateway == 80 || node[node.default].protocol == "https"){
    var gatewayPort = ''
  } else {
    var gatewayPort = node[node.default].gateway
  }
  document.getElementById(checksum).innerHTML = '<strong class="fileName"><a href="' + node[node.default].protocol + '://' + node[node.default].address + ':' + gatewayPort + '/ipfs/' + ipfsHash + '" class="uploaded" target="_blank">' + filesOk[i].name + ' <img src="img/link.png" width="12px"/></a></strong>' +
  '</a></spam><br> <spam id="fileProperties"> (' + (filesOk[i].type || 'n/a' ) +') - ' + filesOk[i].size + ' bytes, last modified: ' + new Date(filesOk[i].lastModified).toLocaleDateString() +'</spam>'
}

function fileChecksum(file) {
  var MD5 = function(d){result = M(V(Y(X(d),8*d.length)));return result.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}

  var checksum = MD5(file.name + file.size + file.lastModified)
  return checksum
}

function resetFiles() {
  filesOk = []
  files_checksum = []
  response = []
  uploadCount = 0
  document.querySelector("#list").querySelector("ul").innerHTML =  ""
  document.querySelector("pre#response").innerHTML =  '<spam id="info">Response IPFS API:</spam>'
  document.querySelector('button#buttonUpload').onclick = function(){upload()}
  document.querySelector('button#buttonUpload').innerHTML = 'Upload<img src="img/upload.png">'
}


var filesOk = []
var response = []
var message = []
var files_checksum = []
var selectedNode = ""
var uploadCount = 0
var connected = 0
if (!window.FileReader) {
    message = '<p>The ' +
    '<a href="http://dev.w3.org/2006/webapi/FileAPI/" target="_blank">File API</a>s ' +
    'are not fully supported by this browser.</p>' +
    '<p>Upgrade your browser to the latest version.</p>';
    document.querySelector('body').innerHTML = message;
} else {
      // Set up the file drag and drop listeners:
      document.getElementById('fileDropBox').addEventListener('dragover', handleDragOver, false);
      document.getElementById('fileDropBox').addEventListener('drop', handleFileSelect, false);
      document.getElementById('files').addEventListener('change', handleFileSelect, false);
}
updateNode(node.default)
