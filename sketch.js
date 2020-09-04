var PLAY = 1;
var END  = 0;
var monkey , monkey_running;
var ground;

var bananaImage, obstacleImage;

var bananaGroup, obstacleGroup;

var survival  = 0 ;

var gameState = PLAY;

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  
  
  createCanvas(600,600);
  monkey  =  createSprite(50,450,10,10);
  monkey.addAnimation("running",monkey_running);
  monkey.addAnimation("banana",bananaImage);
  monkey.scale = 0.18;
  // monkey.debug =true;
  
  ground = createSprite(300,555,600,100);
  ground.shapeColor = "brown";
  ground.velocityX =  -6;
  
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
}


function draw() {
  
  background("green");
  
  textSize(20);
  
  text("Survival Time: " + round(survival) , 100 , 100);
  
  //console.log(monkey.y);
  
  if(gameState == PLAY){
    if(ground.x > 0){
      ground.x = 300;
    }

    if(keyDown("space") && monkey.y > 430 ){
      monkey.velocityY = -15;
    }

    if(obstacleGroup.isTouching(monkey)){
      gameState = END;
    }

    monkey.velocityY +=  0.5;

    createBananas();

    if(frameCount > 300){
      createObstacles();
    }
    
    if(monkey.isTouching(bananaGroup)){
      bananaGroup.destroyEach();
    }
    
    survival = round(frameCount/frameRate());
  }
  
  else if(gameState == END){
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
    obstacleGroup.setLifetimeEach(0);
    bananaGroup.setLifetimeEach(0);   
    
    ground.velocityX = 0;
    
    survival = 0;
    monkey.y = 450;
    
    monkey.changeAnimation("banana");
  }
  
  monkey.collide(ground);
  
  drawSprites();
  
}

function createBananas(){
  
  if(frameCount % 80 == 0){
     
    banana = createSprite(300,random(140,220),10,10);
    banana.addImage(bananaImage);
    banana.velocityX  = -6;
    banana.lifetime = 100;
    banana.scale = 0.2;
    
    bananaGroup.add(banana);
    
  }
  
}

function createObstacles(){
  
  if(frameCount % 300 == 0){
     
    obstacle = createSprite(300,465 ,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX  = -6;
    obstacle.lifetime = 100;
    //obstacle.debug = true;
    obstacle.scale = 0.2;
    obstacleGroup.add(obstacle);
    
  }
  
}




