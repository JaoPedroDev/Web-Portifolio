var txtvisor = document.getElementById("visor")

function adicionar(){
    txtvisor.innerHTML++
}
function zerar(){
    txtvisor.innerHTML = 0
}
function subtrair(){
    if(txtvisor.innerHTML != 0){
        txtvisor.innerHTML--
    }
}