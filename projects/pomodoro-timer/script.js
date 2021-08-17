let i = 0 // Variável para validar condição na função startPauseSwitch.
var mm = 0 // Variável que mede os minutos.
var ss = 0 // Variável que mede os segundos.

// Função que alterna entre a ação de pause e start em um único botão.
function startPauseSwitch(){
    if (i == 0){
        stapau.value = "Pause"
        i = 1
        start()
    }else{
        i = 0
        stapau.value = "Start"
        pause()
    }
}

var time = 1000 //Velocidade em milissegundos do contador (Padrão = 1000).
var counter

// Função que inicia o setInterval na variável "counter" anteriormente declarada.
function start(){
    counter = setInterval(() => { timer(); }, time)
}

function pause(){
    clearInterval(counter)
}
function reset(){
    clearInterval(counter)
    i = 0
    stapau.value = "Start"
    mm = 00
    ss = 00
    visor.innerText = "00:00"
}

function notify(title, body){
    const notification = new Notification(title, {
        body: body,
        icon: "../media/fav-icon.png"
    })
}

var visor = document.getElementById("visor")
function timer(){
    ss++
    if(ss == 59){
        ss = 0
        mm++
        if(mm == 25){
            reset()
            if (Notification.permission === "granted"){
                notify("DÊ UMA PAUSA :)", "Você está estudando há 25 minutos, dê uma pausa de 5 minutos.")
            }else if (Notification.permission !== "denied"){
                alert("Aceite as notificações!")
                Notification.requestPermission().then(permission => {
                    if (permission === "granted"){
                        notify("DÊ UMA PAUSA :)", "Você está estudando há 25 minutos, dê uma pausa de 5 minutos.")
                    }
                })
            }
        }
    }

    var format = (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss)
    visor.innerText = format
}
let stapau = document.getElementById("stapau")
let res = document.getElementById("res")
function load(){
    stapau.addEventListener("click", startPauseSwitch)
    res.addEventListener("click", reset)
}