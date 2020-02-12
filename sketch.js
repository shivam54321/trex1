var play = 1;
var end = 0;
var gamestate =play;
var gameover,restart,gameoverImage,restartImage;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;


function preload(){
  trex_running = loadAnimation("https://assets.editor.p5js.org/5c5bc37c07d9ce001edcb109/a508fc15-69eb-4b8c-8b9f-c5ca9f4d371b.png","https://assets.editor.p5js.org/5c5bc37c07d9ce001edcb109/9adab8ce-b602-4651-890b-ca72a891a6b2.png","https://assets.editor.p5js.org/5c5bc37c07d9ce001edcb109/7fa4cfef-b5e1-427c-9c91-58dc61c2ee53.png");
  trex_collided = loadAnimation("https://assets.editor.p5js.org/5c5bc37c07d9ce001edcb109/b00b3a6d-94ff-4bfc-a869-3979c0ee4de0.png");
  
  groundImage = loadImage("https://assets.editor.p5js.org/5c5bc37c07d9ce001edcb109/8d76d904-1430-49ac-af1f-3d70e0f91eee.png");
  
  cloudImage = loadImage("https://assets.editor.p5js.org/5c5bc37c07d9ce001edcb109/073a79d9-e397-4644-a01f-ea691039de78.png");
  gameoverImage = loadImage("https://assets.editor.p5js.org/5c5bc37c07d9ce001edcb109/4e830116-4238-4317-a19b-3950217392ec.png");
  restartImage = loadImage("https://assets.editor.p5js.org/5c5bc37c07d9ce001edcb109/9922d28b-0486-4520-9549-eab853aa6616.png");
  obstacle1 = loadImage("https://assets.editor.p5js.org/5c5bc37c07d9ce001edcb109/cdb0a09a-12fd-4425-96f0-642f997b4427.png");
  obstacle2 = loadImage("https://assets.editor.p5js.org/5c5bc37c07d9ce001edcb109/ea7a2df2-d909-430c-b9c1-23bc70801077.png");
  obstacle3 = loadImage("https://assets.editor.p5js.org/5c5bc37c07d9ce001edcb109/a3ab70a5-eb42-4454-8ab2-249cb2366527.png");
  obstacle4 = loadImage("https://assets.editor.p5js.org/5c5bc37c07d9ce001edcb109/9f8c51ef-5d57-493b-b550-f3f921c78e35.png");
  obstacle5 = loadImage("https://assets.editor.p5js.org/5c5bc37c07d9ce001edcb109/087d4c4b-1ed8-46a6-9ba7-df925fe37e5e.png");
  obstacle6 = loadImage("https://assets.editor.p5js.org/5c5bc37c07d9ce001edcb109/ce6c64ee-0daa-4119-9092-a019ba05c03a.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
   trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
   gameover = createSprite(200,80);
restart = createSprite(200,130);
gameover.addImage("gameOver",gameoverImage);
gameover.scale = 0.5;
restart.addImage("restart",restartImage);
restart.scale = 0.5;
gameover.visible = false;
restart.visible = false;
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
 
  score = 0;
}

function draw() {
  background(180);
  text("Score: "+ score, 500,50);
   if(gamestate===play) {
     
     score = score + Math.round(getFrameRate()/60);
  if(keyDown("space")) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
     }
     ground.velocityX=-6;
     trex.collide(invisibleGround);
  spawnClouds();
  spawnObstacles();
   if(obstaclesGroup.isTouching(trex)) {
        gamestate=end
       }  
         
     
   } else if (gamestate===end) {
      
    gameover.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided );
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);  
  
   if (mousePressedOver(restart)) {
       
       reset();
    }
   
  
  
  }
  
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -4;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset () {
  
  gamestate=play;
  
  restart.visible=false;
  gameover.visible=false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  score=0;

}