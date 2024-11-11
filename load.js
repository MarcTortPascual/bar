let pag = location.href.split("/").slice(-1)[0].replace(".html","")
fetch("https://raw.githubusercontent.com/MarcTortPascual/bar/main/menu.xml").then(
   
    function(ret){
        if (ret.status ==200){
            return ret.text()
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
    let platos = parser.parseFromString(ret,"text/xml")
    console.log(platos.getElementsByTagName(pag)[0].children)
    let container = document.getElementsByTagName("section")[0]

    for ( let e of platos.getElementsByTagName(pag)[0].children){
        let divmain = document.createElement("div")
        divmain.setAttribute("class","menu-item")
        let img = document.createElement("img")
        img.setAttribute("src",e.getAttribute("img"))
        img.setAttribute("alt","Imagen de " + e.getAttribute("nombre"))
        divmain.append(img)
        let childdiv = document.createElement("div")
        childdiv.setAttribute("class","item-text")
        let tittle  =  document.createElement("h3")
        tittle.innerHTML = e.getAttribute("nombre")
        let desc = document.createElement("p")
        desc.innerHTML =  e.innerHTML
        childdiv.append(tittle)
        childdiv.append(desc)

        divmain.append(childdiv)
        container.append(divmain)
       
        
    }
    
})