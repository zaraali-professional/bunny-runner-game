var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;


var bunny,bunny_running,bunny_collided;
var ground,invisibleGround,groundImage;

var cloudsGroup,cloudImage;
var obstaclesGroup,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;


var gameOverImg,restartImg;
var jumpSound,dieSound;

function preload(){
bunny_running = loadAnimation("bunny1.png", "bunny2.png");
bunny_collided = loadAnimation("bunny2.png");

groundImage = loadImage("ground2.png");
cloudImage = loadImage("cloud.png");

obstacle1 = loadImage("obstacle1.png");
obstacle2 = loadImage("obstacle2.png");
obstacle3 = loadImage("obstacle3.png");
obstacle4 = loadImage("obstacle4.png");
obstacle5 = loadImage("obstacle5.png");
obstacle6 = loadImage("obstacle6.png");

restartImg = loadImage("restart.png");
gameOverImg = loadImage("gameover.png");

jumpSound = loadSound("jump.mp3.wav");
dieSound = loadSound("die.mp3.wav");

}

function setup(){
createCanvas(600,400);

//create a bunny sprite
bunny = createSprite(50,160,20,50);
bunny.addAnimation("running",bunny_running);
bunny.addAnimation("collided",bunny_collided);
bunny.scale = 0.5;

//creating ground sprite
ground = createSprite(200,180,400,20);
ground.addImage("ground",groundImage);
ground.x = ground.width/2;

gameOver = createSprite(300,100);
gameOver.addImage(gameOverImg);

restart = createSprite(300,140);
restart.addImage(restartImg);

gameOver.scale = 0.2;
restart.scale = 0.1;

// creating invisible ground
invisibleGround = createSprite(200,190,400,10);
invisibleGround.visible = false;

obstaclesGroup = createGroup();
cloudsGroup   = createGroup();

bunny.setCollider("circle",0,0,40);

//bunny.debug = true;

}

function draw(){
background("white");
textSize(20);
text("score:"+score,500,50);


if(gameState === PLAY){
   gameOver.visible = false
   restart.visible = false
   
   ground.velocityX = -(4+3* score/100)
   //scoring
   score = score + Math.round(getFrameRate()/60);

   if(ground.x<0)
    { 
    ground.x = ground.width/2;
    }

    if(keyDown("space") && bunny.y>=100){
    bunny.velocityY = -12;


    if(keyDown("space")&& bunny.y >=100){
            bunny.velocityY = -12;
            jumpSound.play();

    }
}

bunny.velocityY = bunny.velocityY + 0.8;

spawnClouds();
spawnObstacles();



if(obstaclesGroup.isTouching(bunny)){
   jumpSound.play();
   gameState = END;
   dieSound.play();
   }
}
else if(gameState === END){
        gameOver.visible = true;
        restart.visible = true;

        //stop the ground
        ground.velocityX = 0;
        bunny.velocityY = 0;

        //change the bunny animation
        bunny.changeAnimation("collided",bunny_collided);

        //setting life time of the game objects so that they are never destroyed
        obstaclesGroup.setLifetimeEach(-1);
        cloudsGroup.setLifetimeEach(-1);
        ;

        obstaclesGroup.setVelocityXEach(0);
        cloudsGroup.setVelocityXEach(0);

}
//stopping bunny from falling down
bunny.collide(invisibleGround);

if(mousePressedOver(restart)){
   reset();
}

drawSprites();
}

function reset(){
        gameState = PLAY;

        gameOver.visible = false;
        restart.visible = false;

        obstaclesGroup.destroyEach();
        cloudsGroup.destroyEach();

        bunny.changeAnimation("running",bunny_running);

        score = 0;
}

function spawnObstacles(){
  if (frameCount % 60 === 0){
    var obstacle = createSprite(400,165,10,40);
    obstacle.velocityX = -(6+ score/100);
 
    
     // //generate random obstacles
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
     //adding obstacles to the group
     obstaclesGroup.add(obstacle);
    }
 }
 function spawnClouds(){
    if (frameCount % 60 === 0){
    cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;

    cloud.lifetime = 200;

    cloud.depth = bunny.depth;
    bunny.depth = bunny.depth +1;

    //adding cloud to the group
    cloudsGroup.add(cloud);
    }
 }
    
