function setup()
{
    canvas=createCanvas(400,400)
    background("red")
    jugador=createSprite(200,200,50,100)

}
function draw()
{
    background("red")
    drawSprites()
}
function Mover_derecha()
{
    jugador.x=jugador.x +5
}
function Mover_izquierda()
{
    jugador.x=jugador.x -5
}