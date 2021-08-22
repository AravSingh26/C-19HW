var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost running.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);

  

  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost=createSprite(200,200,5,10)
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.5

  doorsGroup = new Group(); 
  climbersGroup = new Group(); 
  invisibleBlockGroup = new Group();
}

function draw() {
  background(200);

  
  
  if (gameState==="play"){
    spookySound.play()
    if(tower.y > 400){
      tower.y = 300
    }
    //to move the ghost towards left
    if (keyDown ("left_arrow")){
      ghost.x=ghost.x -3
    }

    //
    if (climbersGroup.isTouching(ghost)){
      ghost.velocityY=0
    }
    //to move the ghost towards right
    if (keyDown ("right_arrow")){
      ghost.x=ghost.x +3
    }
    // to make the ghost jump
    if (keyDown ("space")){
      ghost.velocityY = -5
    }
    // adding gravity
    ghost.velocityY= ghost.velocityY+0.5

    SpawnDoors ()

    if (invisibleBlockGroup.isTouching(ghost)|| ghost.y > 600){

      gameState="end"
      ghost.destroy()
    }
    drawSprites()
  }

  if (gameState==="end"){

    spookySound.stop()

    stroke("red")
    fill("red")
    textSize(50)

    text ("Gameover", 250,300)

    


  }

  
}

function SpawnDoors() {

  if (frameCount %240 === 0){

    doors= createSprite (200,-50)
    doors.addImage (doorImg)
    
    climber=createSprite(200,10)
    climber.addImage(climberImg)

    invisibleBlock=createSprite(200,15)
    invisibleBlock.width=climber.width
    invisibleBlock.height=2

    doors.velocityY=1
    climber.velocityY=1
    invisibleBlock.velocityY=1

    doors.x=Math.round(random(120,400))
    climber.x=doors.x
    invisibleBlock.x=doors.x

    doors.lifetime=800
    climber.lifetime=800
    invisibleBlock.lifetime=800

    doorsGroup.add(doors)
    climbersGroup.add(climber)
    invisibleBlockGroup.add(invisibleBlock)



  }

}
