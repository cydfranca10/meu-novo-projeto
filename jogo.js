console.log('[DevSoutinho] Flappy Bird');

let frames = 0;
const som_HIT = new Audio();
som_HIT.src='./efeitos_hit.wav';

const sprites = new Image();
sprites.src = "sprites.png";

const canvas = document.querySelector ('canvas');
const contexto = canvas.getContext('2d'); 

//plano de fundo
const plano_de_fundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,
    desenha() {

    contexto.fillStyle = '#70c5ce';
    contexto.fillRect(0,0, canvas.width, canvas.height)

    contexto.drawImage(
            sprites,
            plano_de_fundo.spriteX, plano_de_fundo.spriteY,
            plano_de_fundo.largura, plano_de_fundo.altura,
            plano_de_fundo.x, plano_de_fundo.y,
            plano_de_fundo.largura, plano_de_fundo.altura,
           );

           contexto.drawImage(
            sprites,
            plano_de_fundo.spriteX, plano_de_fundo.spriteY,
            plano_de_fundo.largura, plano_de_fundo.altura,
            (plano_de_fundo.x + plano_de_fundo.largura), plano_de_fundo.y,
            plano_de_fundo.largura, plano_de_fundo.altura,   
           );
    },

};

//chao
function criaChao() {
    const chao = {
        spriteX: 0,
        spriteY: 610,
        largura: 224,
        altura: 112,
        x: 0,
        y: canvas.height - 112,
        atualiza() {
          const movimentodochao = 1 
          const repeteEM = chao.largura / 2;
          const movimentacao = chao.x - movimentodochao;

          chao.x = movimentacao % repeteEM;
        },
        desenha() {
            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY,
                chao.largura, chao.altura,
                chao.x, chao.y,
                chao.largura, chao.altura,
               );
    
               contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY,
                chao.largura, chao.altura,
                (chao.x + chao.largura), chao.y,
                chao.largura, chao.altura,   
               );
    
               
        },
    };
    return chao;
    
}



function fazColisao(FlappyBird, chao) {
    const FlappyBirdy = FlappyBird.y + FlappyBird.altura;
    const chaoy = chao.y;

    if(FlappyBirdy >= chaoy) {
        return true;
    }

    return false;
};


//flapy bird
function criaFlappyBird(){
    const FlappyBird = {

        spriteX: 0,
        spriteY: 0,
        largura: 33,
        altura: 24,
        x: 10,
        y: 50,
        pulo: 4.6,
        pula() {
            console.log('devo pular');
            console.log('[antes]', FlappyBird.velocidade);
            FlappyBird.velocidade = - FlappyBird.pulo;
            console.log('[depois]', FlappyBird.velocidade);
        },
        gravidade: 0.25,
        velocidade: 0,
        atualiza() {
            if(fazColisao(FlappyBird, globais.chao)){
              console.log('fez colisao');
              som_HIT.play();

              setTimeout(() => {
                mudaParatela(Telas.GAME_OVER);
              }, 500);
              return;
    
            }
           
        FlappyBird.velocidade = FlappyBird.velocidade + FlappyBird.gravidade;
        FlappyBird.y = FlappyBird.y + FlappyBird.velocidade;
        },
        movimentos: [
            {spriteX: 0, spriteY: 0, }, //asa pra cima
            {spriteX: 0, spriteY: 26, }, //asa no meio
            {spriteX: 0, spriteY: 52, }, //asa pra baixo

        ],
        frameAtual:0,
        atualizaOFrameAtual() {
            const intervaloDeFrames = 10
            const passouOIntervalo = frames % intervaloDeFrames === 0;

            if(passouOIntervalo) {

            const baseDoIncrmento = 1
            const incremento = baseDoIncrmento + FlappyBird.frameAtual;
            const baseRepeticao = FlappyBird.movimentos.length;
            FlappyBird.frameAtual = incremento % baseRepeticao
            }
        },
       desenha () {
        FlappyBird.atualizaOFrameAtual();
        const { spriteX, spriteY } = FlappyBird.movimentos [FlappyBird.frameAtual];
        contexto.drawImage(
            sprites,
            spriteX, spriteY, // sprite x, sprite y 
            FlappyBird.largura, FlappyBird.altura, // tamanho do sprites
            FlappyBird.x, FlappyBird.y,
            FlappyBird.largura, FlappyBird.altura,
        );
    
        }
    
    }

   return FlappyBird;

}


//[mensagemgetready]
const mensagemGetReady= {

    spriteX: 134,
    spriteY: 0,
    largura: 174,
    altura: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,
   desenha () {

    contexto.drawImage(
        sprites,
        mensagemGetReady.spriteX, mensagemGetReady.spriteY, // sprite x, sprite y 
        mensagemGetReady.largura, mensagemGetReady.altura, // tamanho do sprites
        mensagemGetReady.x, mensagemGetReady.y,
        mensagemGetReady.largura, mensagemGetReady.altura,
    );

    }

}

//[mensagemgame over]
const mensegaemGameOver = {

    spriteX: 134,
    spriteY: 153,
    largura: 226,
    altura: 200,
    x: (canvas.width / 2) - 226 / 2,
    y: 50,
   desenha () {

    contexto.drawImage(
        sprites,
        mensegaemGameOver.spriteX,mensegaemGameOver.spriteY, // sprite x, sprite y 
        mensegaemGameOver.largura,mensegaemGameOver.altura, // tamanho do sprites
        mensegaemGameOver.x, mensegaemGameOver.y,
        mensegaemGameOver.largura, mensegaemGameOver.altura,
    );

    }

}

function criaCanos() {
    const canos = {
        largura: 52,
        altura: 400,
        chao: {
            spriteX: 0,
            spriteY: 169,
        },
        ceu: {
            spriteX: 52,
            spriteY: 169,
        },
        espaco: 80,
        desenha() {
            
            canos.pares.forEach(function(par){
                const yRandom = par.y;
                const espacamentoEntreCanos = 90;
    
    
                const canoCeuX = par.x;
                const canoCeuY = yRandom;

                
                //[Cano Céu]
                contexto.drawImage (
                    sprites,
                    canos.ceu.spriteX, canos.ceu.spriteY,
                    canos.largura, canos.altura,
                    canoCeuX, canoCeuY,
                    canos.largura, canos.altura,
                )
                //[Cano do Chao]
                const canoChaoX = par.x;
                const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom;
                contexto.drawImage(
                    sprites,
                    canos.chao.spriteX, canos.chao.spriteY,
                    canos.largura, canos.altura,
                    canoChaoX, canoChaoY,
                    canos.largura, canos.altura,
                )


                par.canoCeu = {
                    x: canoCeuX,
                    y:canoCeuX.altura + canoCeuY
                }
                par.canoChao = {
                    x: canoChaoX,
                    y: canoChaoY
                }

            })
        },
        temColisaoComOFlappyBird(par) { 
            const cabecaDoFlappy = globais.FlappyBird.y;
            const peDoFlappy = globais.FlappyBird.y + globais.FlappyBird.altura;
           if((globais.FlappyBird.x + globais.FlappyBird.largura) >= par.x) {
            console.log('o passaro invadiu a area dos canos');
            
            if(cabecaDoFlappy <= par.canoCeu.y) {
                return true;
            }

            if(peDoFlappy >= par.canoChao.y) {
                return true;
                
            }
        }
         

            return false;
        },
        pares: [],
        atualiza() {

            const passou100Frames = frames % 100 === 0;
            if(passou100Frames) {
                canos.pares.push({
                    x: canvas.width,
                    y: -150 * (Math.random() + 1),
                    
                });
            }
               
            canos.pares.forEach(function(par) {
                par.x = par.x - 2;

                if(canos.temColisaoComOFlappyBird(par)) {
                    console.log('voce perdeu')
                    som_HIT.play();
                    mudaParatela(Telas.GAME_OVER);
                }

            
                if(par.x + canos.largura <= 0) {
                    canos.pares.shift();

                }
            });


        }
    }
        return canos;
    }

    function criaPlacar() {
        const placar = {
            
        pontuacao: 0,
          desenha() {
        contexto.font = '35px "VT323"';
        contexto.textAlign = 'right';
        contexto.fillStyle = 'white';
        contexto.fillText(`${placar.pontuacao}`, canvas.width -10, 35);
            placar.pontuacao
          },
            
          atualiza() {
            const intervaloDeFrames = 20;
            const passouOIntervalo = frames % intervaloDeFrames === 0;

            if(passouOIntervalo) {
            placar.pontuacao = placar.pontuacao + 1;
            }
          }
        }
        
        return placar;
      }
      
      

//Telas
const globais = {};
let telaAtiva = {};
function mudaParatela(novatela) {
    telaAtiva = novatela;
    if(telaAtiva.inicializa){
        telaAtiva.inicializa();
    }
}
  

const Telas = {
    inicio:{
        inicializa(){
    globais.FlappyBird = criaFlappyBird();
    globais.chao = criaChao();
    globais.canos = criaCanos();
        },
        desenha(){
            plano_de_fundo.desenha();
            globais.FlappyBird.desenha (); 
           
            globais.chao.desenha();
            mensagemGetReady.desenha();
           
        },
        click() {
            mudaParatela(Telas.Jogo);
        },
        atualiza() {
            globais.chao.atualiza();
           
           

            
        }
    }
};

//Tela do jogo
Telas.Jogo = {
    inicializa(){
globais.placar = criaPlacar();
},
    desenha() {
        plano_de_fundo.desenha();
        globais.canos.desenha();
        globais.chao.desenha();
     globais.FlappyBird.desenha (); 
     globais.placar.desenha();
    
},
click(){
globais.FlappyBird.pula();
},
atualiza(){
globais.canos.atualiza();    
globais.chao.atualiza();
globais.FlappyBird.atualiza();
globais.placar.atualiza();
}
};

Telas.GAME_OVER = {
    desenha() {
        mensegaemGameOver.desenha();
    },
    atualiza() {

    },
    click(){
      mudaParatela(Telas.inicio);
    }
} 


function loop() {
    
    telaAtiva.desenha();
    telaAtiva.atualiza();
    
    frames = frames + 1;

requestAnimationFrame(loop);

}

window.addEventListener ('click', function() {
    if(telaAtiva.click) {
        telaAtiva.click();
    
    }
});

mudaParatela(Telas.inicio);
loop();