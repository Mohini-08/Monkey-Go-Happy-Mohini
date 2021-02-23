var PLAY = 1;
var END =0;
var gameState = PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obs, obstacleImage;
var FoodGroup, obstacleGroup;
var score=0;

var survivalTime =0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
 
}

function setup() {
  createCanvas(500,500);
  
  PLAY =1;
  GameState = PLAY;
  END = 0;
  
  
  
  monkey = createSprite(70,370,50,50);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(250,405,1000,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  
  invisible  =createSprite(250,405,1000,10);
  invisible.x = ground.width/2;
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
 
}


function draw() {
background("white");

if(gameState === PLAY){
     
  if(ground.x<0){
       ground.x = ground.width/2;
  }
  
  ground.velocityX = -(5+2 * score/100);

  if(keyDown("space")){//} && monkey.y<100){
       monkey.velocityY = -12;
  }
     
  survivalTime = Math.round(frameCount/ frameRate());
     
  if (monkey.isTouching(FoodGroup)){
       FoodGroup.destroyEach();
       score = score + 1;
  }
  
  foodspawn();
  obsspawn();
  
  if (monkey.isTouching(obstacleGroup)){
       gameState = END;
  }
}

else if(gameState === END){
  
    ground.velocityX =0;
    invisible.velocityX = 0;
  
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
}
  
  monkey.velocityY = monkey.velocityY +0.9;
  
  monkey.collide(invisible);
  
  drawSprites();
  
  stroke("black");
  textSize(20);
  fill("red");
  text("score: " + score,400,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  text("survivalTime: " + survivalTime,100,50)  
}

function foodspawn(){
    if(frameCount%100 === 0 ){
       banana = createSprite(500,10,10,20);
       banana.addImage(bananaImage);
       banana.velocityX = -5;
       banana.y = Math.round(random(120,200));
       banana.scale = 0.1;
       banana.lifetime = 200;
     //  banana.setCollider("rectangle",0,0,400,400);
       FoodGroup.add(banana);
       }
}
 
function obsspawn(){
     if(frameCount%300 === 0){
       obs = createSprite(500,365,23,32);
       obs.addImage(obstacleImage);
       obs.velocityX = -(5+2* score/100);
       obs.scale = 0.2;
       obs.lifetime = 200;
       obs.setCollider("circle", 0,0,200);
       obstacleGroup.add(obs);
     }
}






