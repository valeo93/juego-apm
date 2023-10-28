var puntos=0
var vidas=5

function preload()
{
    mario_corre=loadAnimation("m2.png", "m3.png", "m4.png")
    mario=loadAnimation("m1.png")
}


function setup()
{
    canvas=createCanvas(400,400)
    background("red")
    jugador=createSprite(200,350,50,100)
    malos=createGroup()
    buenos=createGroup()
    bordes=createEdgeSprites()
    jugador.addAnimation("pose", mario)
    jugador.addAnimation("corre", mario_corre)
}
function draw()
{
    background("green")
    jugador.collide(bordes)
    jugador.collide(malos,perder_vidas)
    jugador.collide(buenos,ganar_puntos)
    mostrar_marcadores()
    if(frameCount%50==0)
    {
        malo_1=createSprite(random(0,400),-10,30,30)
        malo_1.velocity.y=5
        malo_1.shapeColor="yellow"
        malos.add(malo_1)
    }
    if(frameCount%70==0)
    {
        bueno_1=createSprite(random(0,400),-10,30,30)
        bueno_1.velocity.y=5
        bueno_1.shapeColor="red"
        buenos.add(bueno_1)
    }
    drawSprites()
}
function Mover_derecha()
{
    jugador.x=jugador.x +10
    jugador.changeAnimation("corre", mario_corre)
    jugador.mirrorX(1)
}
function Mover_izquierda()
{
    jugador.x=jugador.x -10
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