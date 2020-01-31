const celeste = document.getElementById("celeste");
const violeta = document.getElementById("violeta");
const naranja = document.getElementById("naranja");
const verde = document.getElementById("verde");
const ULTIMO_NIVEL = 5;
const audio = document.querySelector("audio");
const niveles = document.getElementById("niveles")
const content_nivel = document.getElementById("content__niveles");
var tiempo = 0; 
var intervalo = 0;
var minutos1 = 0;
let nivel = 0;
let verificador = false
const minutos = document.getElementById("minutos");
const segundos = document.getElementById("segundos");
const button = document.getElementById("btnEmpezar");


class juego {
    constructor()
    {
        setTimeout(() => {
            this.iniciar()
            this.cronometro()
            this.generarSecuencia()
            setTimeout(this.siguientenNivel,500)
        },100)

    }
    iniciar() 
    {
        this.elegirColor = this.elegirColor.bind(this)
        this.siguientenNivel = this.siguientenNivel.bind(this)
        this.togglebuttonEmpezar()
        this.nivel = 1
        this.colores = {
            celeste,
            violeta,
            naranja,
            verde
        }
    }
    cronometro() 
    {
        if(verificador == false)
        {
            intervalo = setInterval(() => {
                tiempo += 1;
                segundos.innerHTML = tiempo;
                if (tiempo === 59)
                {
                    minutos1++
                    minutos.innerHTML = minutos1
                    return tiempo = 0;
                }
            }, 1000)
            return verificador = true;
        }
        else if (verificador == true)
        {
            clearInterval(intervalo)
            verificador = false;
        }
    }
    togglebuttonEmpezar()
        {
            if (button.classList.contains("hide"))
            {
                button.classList.remove("hide")
            }
            else 
            {
                button.classList.add("hide")
            }
        }
    generarSecuencia()
    {
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
    }
    siguientenNivel()
    {
        this.subnivel = 0
        this.niveles();
        this.iluminarSecuencia()
        this.agregarEventos()
    }
    transfromarNumeroaColor(num)
    {
        switch (num)
        {
            case 0:
                return "celeste"
            case 1: 
                return "violeta"
            case 2:
                return "naranja"
            case 3:
                return "verde"
        }
    }
    transfromarColoraNumero(color)
    {
        switch (color)
        {
            case "celeste":
                return 0
            case "violeta": 
                return 1
            case "naranja":
                return 2
            case "verde":
                return 3
        }
    }
    iluminarSecuencia()
    {
        for(let i=0; i < this.nivel;i++)
        {
            const color = this.transfromarNumeroaColor(this.secuencia[i])
            setTimeout(() => this.iluminarColor(color), 1000 * i)
        }
    }
    iluminarColor(color)
    {
        this.colores[color].classList.add("light")
        setTimeout(() => this.apagarColor(color), 400)
    }
    apagarColor(color)
    {
        this.colores[color].classList.remove("light")
    }
    agregarEventos()
    {
        this.colores.celeste.addEventListener("click",this.elegirColor)
        this.colores.violeta.addEventListener("click",this.elegirColor)
        this.colores.naranja.addEventListener("click",this.elegirColor)
        this.colores.verde.addEventListener("click",this.elegirColor)
    }
    eliminarEventosClick()
    {
        this.colores.celeste.removeEventListener("click",this.elegirColor)
        this.colores.violeta.removeEventListener("click",this.elegirColor)
        this.colores.naranja.removeEventListener("click",this.elegirColor)
        this.colores.verde.removeEventListener("click",this.elegirColor)
    }
    elegirColor(ev)
    {
        const nombreColor = ev.target.dataset.color
        const numeroColor = this.transfromarColoraNumero(nombreColor)
        this.iluminarColor(nombreColor)
        if (numeroColor === this.secuencia[this.subnivel])
        {
            this.subnivel++
                if(this.subnivel === this.nivel)
                {
                    this.nivel++
                    this.eliminarEventosClick()
                    if (this.nivel === (ULTIMO_NIVEL + 1))
                    {
                        this.ganoEljuego()
                    }
                    else 
                    {
                        setTimeout(this.siguientenNivel, 1000)
                    }
                }
        }
        else 
        {
           this.perdioEljuego()
        }
    }

    ganoEljuego()
    {
        this.cronometro()
        swal({
            title: "Ganaste",
            text: `Si te gusto, recomiendame:3`,
            icon: "success",
            buttons: ["Ya me cansé:3", "Yeee,quiero volver a jugar:3"]
        })
        .then( (willDelete) => {
            if(willDelete)
            {
                swal({
                    title: `Ganaste en ${minutos1}:${tiempo}s`
                })
                .then (() => 
                {
                    this.reiniciarNiveles()
                    this.reiniciarContador()
                    
                    this.iniciar()
                })
            }
            else 
            {
                swal(`Ganaste en ${minutos1}:${tiempo}`)
                .then(() => 
                {
                    swal(`Esperamos tu vuelta:'3`)
                    .then(() => 
                    {
                        this.reiniciarNiveles()
                        this.iniciar()
                    })
                })
            }
        } )
    }
    perdioEljuego()
    {
        this.cronometro()
        this.audiofallo()
        swal({
            title: "Perdiste",
            text: `Lo lamentamos,perdiste :(, pero siguelo intentadolo campeón:'3`,
            icon: "error",
            buttons: ["Ya me cansé:3", "sigamos:'3, si se puede:3"]
        })
        .then((willDelete) => { 
            this.eliminarEventosClick()
            if(willDelete)
            {
                swal({
                    title: `sobreviviste ${minutos1}:${tiempo}s`
                })
                .then (() => 
                {
                    this.reiniciarNiveles()
                    this.reiniciarContador()
                    this.iniciar()
                })
            }
            else 
            {
                swal(`sobreviviste ${minutos1}:${tiempo}s`)
                .then(() => 
                {
                    swal(`Esperamos tu vuelta:'3`)
                    .then(() => 
                    {
                        this.reiniciarNiveles()
                        this.iniciar()
                    })
                })
            }
        })
    }
    audiofallo()
    {
        audio.play();
    }
    reiniciarContador()
        {
            verificador = false;
            tiempo = 0;
            segundos.innerHTML = tiempo;
            clearInterval(intervalo)
        }
    niveles()
    {
        content_nivel.classList.add("aparicion")
        nivel++
        niveles.innerHTML = ` ${nivel}`;
    }
    reiniciarNiveles()
    {
        nivel = 0
        niveles.innerHTML = ` ${nivel}` 
        content_nivel.classList.remove("aparicion")
    }
}


button.addEventListener("click", empezar_juego); 

function empezar_juego ()
{
    window.juego = new juego()
}
