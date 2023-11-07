var puntos=0
var vidas=5

var usuario=window.location.search.substring(1).split("=")[1]

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
    mario_corre=loadAnimation("m2.png", "m3.png", "m4.png")
    mario=loadAnimation("m1.png")
    fondo=loadImage("bg001.png")
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

}


function setup()
{
    canvas=createCanvas(400,400)
    jugador=createSprite(200,340,50,100)
    malos=createGroup()
    buenos=createGroup()
    bordes=createEdgeSprites()
    jugador.addAnimation("pose", mario)
    jugador.addAnimation("corre", mario_corre)
    suelo=createSprite(0,380,800,10)
    suelo.visible=false
    reciclable=[r1,r2,r3,r4,r5,r6,r7,r8,r9,r10,r11,r12,r13,r14,r15,r16,r17,r18,r19,r20]
    no_rec=[n1,n2,n3,n4,n5,n6,n7,n8]
    n6.resize (190,200) 
    n7.resize (277,150)
    n8.resize (200,200)
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
        malo_1=createSprite(random(0,400),-10,30,30)
        malo_1.velocity.y=5
        aleatorio=Math.floor(Math.random()*no_rec.length)
        malo_1.scale=0.2
        malo_1.addImage(no_rec[aleatorio])
        malos.add(malo_1)
    }
    if(frameCount%70==0)
    { 
        bueno_1=createSprite(random(0,400),-10,30,30)
        bueno_1.velocity.y=5
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
        jugador.destroy()
        textSize(30)
        text("¡PERDISTE!", 150,200)
        noLoop()
        registrar_puntos()
    }
}
function ganar_puntos(s1,s2)
{
    puntos=puntos+1
    s2.destroy()

}
function mostrar_marcadores()
{
    textSize(20)
    fill("black")
    text(puntos + " puntos", 300,50 )
    text(vidas + " vidas", 10,50)
}
function registrar_puntos ()
{
    firebase.database().ref().child(usuario).update({puntos:puntos})
}