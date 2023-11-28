var puntos=0
var vidas=5
var puntajeAnterior=0
var ancho = 0;
var usuario=decodeURIComponent(window.location.search.match(/(\?|&)usuario\=([^&]*)/)[2]);
var escenario=decodeURIComponent(window.location.search.match(/(\?|&)escenario\=([^&]*)/)[2]);
var personaje=decodeURIComponent(window.location.search.match(/(\?|&)personaje\=([^&]*)/)[2]);

var firebaseConfig = {
  apiKey: "AIzaSyCE4YjZ8zyNEo4D9jXth6SdsL_Z2k6MtS8",
  authDomain: "apps-makers.firebaseapp.com",
  databaseURL: "https://apps-makers-default-rtdb.firebaseio.com",
  projectId: "apps-makers",
  storageBucket: "apps-makers.appspot.com",
  messagingSenderId: "356564925856",
  appId: "1:356564925856:web:98c04d91730ea5821578c5"
};

firebase.initializeApp(firebaseConfig);
function preload()
{
    cargar_personaje()
    cargar_escenario()
    r1=loadImage("r1.png")
    r2=loadImage("r2.png")
    r3=loadImage("r3.png")
    r4=loadImage("r4.png")
    r5=loadImage("r5.png")
    r6=loadImage("r6.png")
    r7=loadImage("r7.png")
    r8=loadImage("r8.png")
    r9=loadImage("r9.png")
    r10=loadImage("r10.png")
    r11=loadImage("r11.png")
    r12=loadImage("r12.png")
    r13=loadImage("r13.png")
    r14=loadImage("r14.png")
    r15=loadImage("r15.png")
    r16=loadImage("r16.png")
    r17=loadImage("r17.png")
    r18=loadImage("r18.png")
    r19=loadImage("r19.png")
    r20=loadImage("r20.png")
    n1=loadImage("n1.png")
    n2=loadImage("n2.png")
    n3=loadImage("n3.png")
    n4=loadImage("n4.png")
    n5=loadImage("n5.png")
    n6=loadImage("n6.png")
    n7=loadImage("n7.png")
    n8=loadImage("n8.png")
    n9=loadImage("n9.png")
    n10=loadImage("n10.png")

    texto=loadFont("PTSerif-Regular.ttf")
    musica=loadSound("Classical Pop.mp3")
    sonidoP=loadSound("completetask_0.mp3")

}


function setup()
{
    musica.setVolume(0.2)
    musica.play()
    if(windowWidth < windowHeight)
    {
        ancho = windowWidth - 50
    }
    else
    {
        ancho = windowHeight -100
    }
    document.getElementById("mostrar_puntos").style.width = ancho - 120 + "px";
    canvas=createCanvas(ancho,ancho)
    jugador=createSprite(200,ancho*0.85,50,100)
    jugador.velocityY = 1;
    malos=createGroup()
    buenos=createGroup()
    bordes=createEdgeSprites()
    jugador.addAnimation("pose", mario)
    jugador.addAnimation("corre", mario_corre)
    suelo=createSprite(ancho/2,ancho*0.925,ancho,10)
    suelo.visible=false
    reciclable=[r1,r2,r3,r4,r5,r6,r7,r8,r9,r10,r11,r12,r13,r14,r15,r16,r17,r18,r19,r20]
    no_rec=[n1,n2,n3,n4,n5,n6,n7,n8,n9,n10]
    n6.resize (190,200) 
    n7.resize (277,150)
    n8.resize (200,200)
    n9.resize (110,180)
    n10.resize (150,150)
    r13.resize (40,60)
    r15.resize (25,50)
    r19.resize (22,32)
    r20.resize (22,32)
    textFont(texto)
}
function draw()
{
    background(fondo)
    jugador.collide(bordes)
    jugador.collide(suelo)
    jugador.collide(malos,perder_vidas)
    jugador.collide(buenos,ganar_puntos)
    mostrar_marcadores()
    if(frameCount%50==0)
    {
        malo_1=createSprite(random(0,ancho),-10,30,30)
        malo_1.velocity.y=5+puntos*0.5
        aleatorio=Math.floor(Math.random()*no_rec.length)
        malo_1.scale=0.2
        malo_1.addImage(no_rec[aleatorio])
        malos.add(malo_1)
    }
    if(frameCount%70==0)
    { 
        bueno_1=createSprite(random(0,ancho),-10,30,30)
        bueno_1.velocity.y=5+puntos*0.5
        aleatorio=Math.floor(Math.random()*reciclable.length)
        bueno_1.addImage(reciclable[aleatorio])
        buenos.add(bueno_1)
    }
    drawSprites()
}
function Mover_derecha()
{
    jugador.x=jugador.x +20
    jugador.changeAnimation("corre", mario_corre)
    jugador.mirrorX(1)
}
function Mover_izquierda()
{
    jugador.x=jugador.x -20
    jugador.changeAnimation("corre", mario_corre)
    jugador.mirrorX(-1)
}
function perder_vidas(s1,s2)
{
    s2.destroy()
    vidas=vidas-1
    if(vidas==0)
    {
        musica.stop()
        jugador.destroy()
        textSize(30)
        text("¡PERDISTE!", ancho/2 -(textWidth("¡PERDISTE!")/2),ancho/2)
        noLoop()
        mostrar_logro()
        registrar_puntos()
    }
}
function ganar_puntos(s1,s2)
{
    sonidoP.setVolume(0.5)
    sonidoP.play()
    puntos=puntos+1
    s2.destroy()

}
function mostrar_marcadores()
{
    textSize(20)
    if(escenario=="Espacio")
    {
        fill("white")
    }
    else
    {
        fill("black")  
    }
    text(puntos + " puntos", ancho - textWidth(puntos + " puntos") -30,50 )
    text(vidas + " vidas", 30,50)
}

consultar_puntos()
function consultar_puntos() {
    if(usuario != "")
    {
        firebase.database().ref("/" + usuario + "/puntos").on('value', function (snapshot) 
        {
                puntajeAnterior = snapshot.val();
        });
    }
}

function registrar_puntos ()
{
    if(usuario != "")
    {
       firebase.database().ref().child(usuario).update({puntos:puntos+puntajeAnterior}) 
    }
}

function cargar_escenario()
{
    switch(escenario)
    {
        case "Parque": 
        fondo= loadImage("bg001.png");
        break; 
        case "Nevado": 
        fondo= loadImage("sky.png");
        break; 
        case "Espacio": 
        fondo= loadImage("main_menu_background.jpg");
        break; 
        default: 
        fondo= loadImage("bg001.png");
        break; 
    }
    fondo.resize(ancho, ancho)
}

function cargar_personaje()
{
    switch(personaje)
    {
        case "Mario": 
        mario= loadAnimation("m1.png");
        mario_corre= loadAnimation("m2.png", "m3.png", "m4.png");
        break; 
        case "Nicki": 
        mario= loadAnimation("N_1.gif");
        mario_corre= loadAnimation("N_2.png", "N_3.png", "N_4.png");
        break; 
        case "Pablo": 
        mario= loadAnimation("P_1.gif");
        mario_corre= loadAnimation("P_2.png", "P_3.png", "P_4.png");
        break; 
        case "Daniela": 
        mario= loadAnimation("D_1.gif");
        mario_corre= loadAnimation("D_2.png", "D_3.png", "D_4.png");
        break;
        case "Axel": 
        mario= loadAnimation("A_1.png");
        mario_corre= loadAnimation("A_2.png", "A_3.png");
        break;
        default: 
        mario= loadAnimation("m1.png");
        mario_corre= loadAnimation("m2.png", "m3.png", "m4.png");
        break; 
    }
}
function mostrar_logro() {
    document.getElementById("mostrar_puntos").style.visibility = "visible";
    document.getElementById("puntaje").innerHTML = "Felicidades " + usuario+" ganaste " + puntos + " puntos de reciclaje";
    console.log("puntos: " + puntos +", hitorial: "+puntajeAnterior);
    if(puntajeAnterior + puntos >= 80 && puntajeAnterior < 80 )
    {
        document.getElementById("mensaje").innerHTML = "Desbloqueaste a Axel"
        document.getElementById("imagen").src = "A_1.png"
        document.getElementById("logro_desbloqueado").style.visibility = "visible"
    }
    else if(puntajeAnterior + puntos >= 60 && puntajeAnterior <  60)
    {
        document.getElementById("mensaje").innerHTML = "Desbloqueaste a Daniela"
        document.getElementById("imagen").src = "D_1.gif"
        document.getElementById("logro_desbloqueado").style.visibility = "visible"
    }
    else if(puntajeAnterior + puntos >= 40 && puntajeAnterior < 40 )
    {
            document.getElementById("mensaje").innerHTML = "Desbloqueaste a Pablo"
            document.getElementById("imagen").src = "P_1.gif"
            document.getElementById("logro_desbloqueado").style.visibility = "visible"
    }
    else if(puntajeAnterior + puntos >= 20 && puntajeAnterior < 20){
        document.getElementById("mensaje").innerHTML = "Desbloqueaste a Nicki"
        document.getElementById("imagen").src = "N_1.gif"
        document.getElementById("logro_desbloqueado").style.visibility = "visible"
    }
}