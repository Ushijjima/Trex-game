var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var cactus,cactusImage1,cactusImage2,cactusImage3,cactusImage4,cactusImage5,cactusImage6;
var score=0;
var PLAY= 1;
var END= 0;
var gameState = PLAY
var s1 


var newImage;

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadAnimation("trex_collided.png");

  groundImage = loadImage("ground2.png");

  cloudImage = loadImage("cloud.png");

  cactusImage1 = loadImage("obstacle1.png")
  cactusImage2 = loadImage("obstacle2.png")
  cactusImage3 = loadImage("obstacle3.png")
  cactusImage4 = loadImage("obstacle4.png")
  cactusImage5 = loadImage("obstacle5.png")
  cactusImage6 = loadImage("obstacle6.png")





}

function setup() {
  createCanvas(600, 200);
s1 = new Student("yashas",16,11)
s1.display()
  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("running", trex_running);
   trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;

  ground = createSprite(200, 180, 400, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;
  

  invisibleGround = createSprite(200, 190, 400, 10);
  invisibleGround.visible = false;
  cactusGroup = new Group()
  cloudsGroup = new Group()


  console.log("Hello" + 5)

}

function draw() {
  background(180);


  trex.debug=true
trex.setCollider("circle",0,0,60)
  
  text("score:"+ score,500,50)
    
    if(gameState===PLAY){
      
      ground.velocityX = -4;
      score = score + Math.round(frameCount/120)
      if (ground.x < 0) {
        ground.x = ground.width / 2;
      
      }
      if (keyDown("space") && trex.y >= 100) {
        trex.velocityY = -10;
      }
    
      trex.velocityY = trex.velocityY + 0.8
      spawnClouds();
      spawnCactus();
      if(cactusGroup.isTouching(trex)){
        gameState = END
      }
    }
    else if(gameState === END){
      ground.velocityX = 0;
      trex.changeAnimation("collided",trex_collided)
      cactusGroup.setVelocityXEach(0) 
      cloudsGroup.setVelocityXEach(0)
      trex.velocityY=0
      cactusGroup.setLifetimeEach(-1)
      cloudsGroup.setLifetimeEach(-1)
        
    }

  trex.collide(invisibleGround);


  //spawn the clouds
  

  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600, 100, 40, 10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10, 60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;


    //assigning lifetime to the variable
    cloud.lifetime = 200

    //adjust the depth
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    cloudsGroup.add(cloud)
  }
}
function spawnCactus() {
if (frameCount % 80 === 0){
  cactus = createSprite(600,170,50,50)
  cactus.velocityX = -3
  var rand = Math.round(random(1,6))
  switch(rand){
    case 1:cactus.addImage(cactusImage1);
    break;
    case 2:cactus.addImage(cactusImage2);
    break;
    case 3:cactus.addImage(cactusImage3);
    break;
    case 4:cactus.addImage(cactusImage4);
    break;
    case 5:cactus.addImage(cactusImage5);
    break;
    case 6:cactus.addImage(cactusImage6);
    break;
    default:break;

  }
  cactus.lifetime = 200

  cactus.scale=0.5
  cactusGroup.add(cactus)
  
}


}

