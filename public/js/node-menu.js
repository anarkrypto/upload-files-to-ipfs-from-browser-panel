const formRemote = document.getElementById("remote")
const formLocal = document.getElementById("local")
const tabGroup = document.getElementById("tab-group")
const tabRemote = document.getElementById("tab-remote")
const tabLocal = document.getElementById("tab-local")

function changeToRemote() {
  formRemote.style.display = "block"
  formLocal.style.display = "none"
  tabRemote.className = "tab active"
  tabLocal.className = "tab"
}

function changeToLocal() {
  formRemote.style.display = "none"
  formLocal.style.display = "block"
  tabRemote.className = "tab"
  tabLocal.className = "tab active"
}

if (node.default === "remote") {
  tabGroup.style.flexDirection = "row-reverse"
  changeToRemote()
}

if (node.default === "local") {
  tabGroup.style.flexDirection = "row"
  changeToLocal()
}

tabRemote.addEventListener("click", changeToRemote)
tabLocal.addEventListener("click", changeToLocal)

