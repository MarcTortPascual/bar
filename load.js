let pag = location.href.split("/").slice(-1)[0].replace(".html","")

fetch("https://raw.githubusercontent.com/MarcTortPascual/bar/main/menu.xml").then(
    //transformamos los datos recividos a json
    function(ret){
        if (ret.status ==200){
            return ret.text
        }
    }
).then(function(ret){
    /*
    <div class="menu-item">
      <img src="imagenes/coctel.png" alt="Cóctel de la Casa">
      <div class="item-text">
        <h3>Cóctel de la Casa</h3>
        <p>Cóctel especial de la casa hecho con ingredientes frescos. <span>$7.00</span></p>
      </div>
    </div>
    */
    let parser = new DOMParser()
    let xml = parser.parseFromString(ret,"text/xml")
    let container = document.getElementsByTagName("section")[0]
    if (container){
        container.remove()
    }
    container = document.createElement("section")
    for ( let e of xml.getElementsByTagName(pag)[0].children){
        let divmain = document.createElement("div")
        divmain.setAttribute("class","menu-item")
        let img = document.createElement("img")
        img.setAttribute("img",e.getAttribute("img"))
        img.setAttribute("alt","Imagen de " + e.getAttribute("nombre"))
        divmain.append(img)
        let childdiv = document.createElement("div")
        childdiv.setAttribute("class","item-text")
        let tittle  =  document.createElement("h3")
        tittle.innerHTML = e.getAttribute("nombre")
        let desc = document.createElement("p")
        desc.innerHTML =  e.getAttribute("nombre")
        childdiv.append(tittle)
        childdiv.append(desc)

        divmain.append(childdiv)
        container.append(divmain)
    }
})