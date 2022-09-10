var canvas = document.getElementById("cv"), ctx, ALTURA = 600, LARGURA = 600, frames = 0, estadoAtual, bi = 0,

estado = {
    novoJogo: function(ganhador){
        if(ganhador == "direita"){
            ++direita.score;
        }else if(ganhador == "esquerda"){
            ++esquerda.score;
        };

        esquerda.y = ALTURA / 2 - esquerda.altura / 2;
        direita.y = ALTURA / 2 - direita.altura / 2;
        bola.mod = 0;
        bola.x = LARGURA/2 - 15;
        bola.y = ALTURA/2 - 15;
        bola.dirx = Math.random() < 0.5 ? 1: -1;
        bola.diry = Math.random() < 0.5 ? 1: -1;
    }
},

bola = {
    x: LARGURA/2 - 15,
    y: ALTURA/2 - 15,
    largura: 30,
    altura: 30, 
    cor: "#a24b92",
    dirx: Math.random() < 0.5 ? 1: -1,
    diry: Math.random() < 0.5 ? 1: -1,
    mod: 0,
    velocidade: 3,

    desenha: function(){
        ctx.fillStyle = this.cor;
        ctx.fillRect(this.x, this.y, this.largura, this.altura);
    },

    movimentacao: function(){
        if(this.y + this.altura >= esquerda.y && this.y <= esquerda.y + esquerda.altura && this.x <= esquerda.x + esquerda.largura){
            this.dirx = 1;
            this.mod += 0.2;
        }else if(this.y + this.altura >= direita.y && this.y <= direita.y + direita.altura && this.x + this.largura >= direita.x){
            this.dirx = -1;
            this.mod += 0.2;
        };

        if(this.y <= 10){
            this.diry = 1;
        }else if(this.y + this.altura >= ALTURA - 10){
            this.diry = -1;
        };

        this.x += (this.velocidade + this.mod) * this.dirx;
        this.y += (this.velocidade + this.mod) * this.diry;

        if(this.x < esquerda.x){
            estado.novoJogo("direita");
        }else if(this.x + this.largura > direita.x + direita.largura){
            estado.novoJogo("esquerda");
        }
    }
},

esquerda = {
    x: 20,
    y: ALTURA / 2 - 60,
    altura: 120,
    largura: 30,
    velocidade: 6,
    cor: "#a24b92",
    mov: 0,
    score: 0,

    desenha: function(){
        ctx.fillStyle = this.cor;
        ctx.fillRect(this.x, this.y, this.largura, this.altura);
    },

    movimentacao: function(){
        // Adiciona ou subtrai o Y para movimentar o jogador.
        if(this.mov == 0){
            this.y += this.velocidade
        }else if(this.mov == 1){
            this.y -= this.velocidade
        };

        // Inverte a direção de movimentação do jogador se bater em uma das paredes de cima ou de baixo.
        if(this.y < 10){
            this.mov = 0;
        }else if(this.y + this.altura > ALTURA - 10){
            this.mov = 1;
        };
    },

    botAI: function(){
        if(bola.y + bola.altura/2 > this.y + this.altura){
            this.mov = 0;
        }else if(bola.y + bola.altura/2 < this.y){
            this.mov = 1;
        }
    }
},

direita = {
    x: 550,
    y: ALTURA / 2 - 60,
    altura: 120,
    largura: 30,
    velocidade: 6,
    cor: "#a24b92",
    mov: 2,
    score: 0,

    desenha: function(){
        ctx.fillStyle = this.cor;
        ctx.fillRect(this.x, this.y, this.largura, this.altura);
    },

    movimentacao: function(){
        // Adiciona ou subtrai o Y para movimentar o jogador.
        if(this.mov == 0){
            this.y += this.velocidade
        }else if(this.mov == 1){
            this.y -= this.velocidade
        };

        // Inverte a direção de movimentação do jogador se bater em uma das paredes de cima ou de baixo.
        if(this.y < 10){
            this.mov = 0;
        }else if(this.y + this.altura > ALTURA - 10){
            this.mov = 1;
        };
    },

    botAI: function(){
        if(bola.y + bola.altura/2 > this.y + this.altura){
            this.mov = 0;
        }else if(bola.y + bola.altura/2 < this.y){
            this.mov = 1;
        }
    }
}

function clique(evento){
    //Altera o movimento do jogador entre para cima ou para baixo
    if(evento.keyCode == 87){
        if(esquerda.mov == 0){
        esquerda.mov = 1;
        }else if(esquerda.mov == 1){
        esquerda.mov = 0;
        };
    };

    if(evento.keyCode == 38){
        if(direita.mov == 0){
        direita.mov = 1;
        }else if(direita.mov == 1){
        direita.mov = 0;
        };
    }
};

function cliqueTouch(){
    if(esquerda.mov == 0){
        esquerda.mov = 1;
        }else if(esquerda.mov == 1){
        esquerda.mov = 0;
        };
};

function main(){

    canvas.width = LARGURA;
    canvas.height = ALTURA;
    
    ctx = canvas.getContext("2d");
    
    document.addEventListener("keydown", clique);
    document.addEventListener("touchstart", cliqueTouch);

    roda();
}

function roda(){
    frames++;
    desenha();
    atualiza();

    requestAnimationFrame(roda);
};


function atualiza(){
    if(bi == 15){
        direita.botAI();
        bi = 0;
    }else{
        bi++;
    }
    esquerda.movimentacao();
    direita.movimentacao();
    bola.movimentacao();
};

function desenha(){
    // Background
    ctx.fillStyle = "#21283d";
    ctx.fillRect(0, 0, LARGURA, ALTURA);

    // Placar
    ctx.fillStyle = "#a24b92"
    ctx.font = "50px Arial";
    ctx.fillText(esquerda.score, 200, 50);
    ctx.fillText(direita.score, 377, 50);

    esquerda.desenha();
    direita.desenha();
    bola.desenha();
};