var texto = document.getElementById("texto")
var visor = document.getElementById("visor")
var velocidade = document.getElementById("vel")
var vel = 200
var textoSeparado
var tmp
var pos = 0
var i = 0 //Previne que o contador ligue mais de uma vez
function principal(){
    textoSeparado = separaPalavras(texto.innerText, ' ')
    if(pos < textoSeparado.length){
        visor.innerText = textoSeparado[pos]
        pos++
    }else{
        pos = 0
    }
}
//Separa as palavras de um texto usando split
function separaPalavras(string, separador){
    var arrayDePalavras = string.split(separador)
    return arrayDePalavras
}
function iniciar(){
    if(texto.innerText !== ""){
        if(i == 0){
            tmp = setInterval(principal, vel)
        }
        i = 1
    }
}
function pausar(){
    clearInterval(tmp)
    i = 0
}
function resetar(){
    pos = 0
    vel = 200
    velocidade.value = ""
    visor.innerText = textoSeparado[0]
    i = 0
    clearInterval(tmp)
}
function mudar(){
    vel = velocidade.value
    pausar()
    iniciar()
}
var ini = document.getElementById('ini')
var pau = document.getElementById('pau')
var res = document.getElementById('res')
var mud = document.getElementById("mud")
function carregar(){
    ini.addEventListener("click", iniciar)
    pau.addEventListener("click", pausar)
    res.addEventListener("click", resetar)
    mud.addEventListener("click", mudar)
}
window.addEventListener("load", carregar)