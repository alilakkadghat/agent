

var hunter , bullet,  background, redB, pinkB, greenB ,blueB ,bulletGroup ;
var zombieB;

var hunterImage, bulletImage, green_balloonImage, red_balloonImage, pink_balloonImage ,blue_balloonImage, backgroundImage;

var zombiI,zombie;

var youloseImg,youwinImg;

var life =3;

var gamestate="str";
//var gamestate="play";
var lose,win;

var gunShot,start1,startimg;

var zombie_hurt;

var back;

var man_hurt;
var man_dead;
var you_did;
var Kill=0;
var ammo=25;
var button1,button2;
var youlose,youwin;
var shootimage;



function preload(){
  
  backgroundImage = loadImage("back3.jpg");
  youloseImg=loadImage("youlose.jpg");
  youwinImg=loadImage("youwin.jpeg")
  startimg=loadImage("agent.jpg");

  bulletImage = loadImage("bullet.png");
  hunterImage = loadImage("1.png");
  shootimage=loadImage("2.png");
 zombieI=loadAnimation("z1.png","z2.png","z3.png","z4.png","z5.png","z6.png");
  gunShot=loadSound("gunshot.mp3.mp3");
  zombie_hurt=loadSound("Monster 16 (mp3cut.net).wav");
  man_hurt=loadSound("AAAGH1.mp3");
  man_dead=loadSound("Scary Scream-SoundBible.com-1115384336.mp3");
 // zombieI2=loadAnimation("zm2.png","zm3.png","zm4.pmg","zm5.png");
}


function setup() {
  createCanvas(600, 500);
  

  
  back = createSprite(0,0,600,600);
  back.addImage(backgroundImage);
  back.scale = 2.5
  
  // creating hunter to shoot bullet
  hunter = createSprite(480,220,20,50);
  hunter.addImage(hunterImage); 
  hunter.scale = 0.8;
  
    button1=createButton("Reset");
    button1.position(0,470);
     button1.mousePressed(cg);
    
  
    
   button3=createButton("PLAY");
    button3.position(540,460);
     button3.mousePressed(st);
       
 
 
 
  bulletGroup = new Group();
  zombieB=new Group();
  
  youlose = createSprite(300,250,600,600);
  youlose.addImage(youloseImg);
  youlose.scale=0.5;
  
  youwin = createSprite(300,250,600,600);
  youwin.addImage(youwinImg);
  youwin.scale=0.7;
  
  youlose.visible=false;
  youwin.visible=false;
  
   back1 = createSprite(300,300,0,0);
  back1.addImage(startimg);
  back1.scale =3.2
  back1.visible=true; 
  
  
}

function draw() {

  if(gamestate==="str"){
   
    textSize(40);
      button1.hide();
    
    }
  else if(gamestate==="play"){
    
      button1.show();
  
    back1.visible=false;
    back.velocityX = -3 
  
    youlose.visible=false;
  youwin.visible=false;
    if (back.x < 0){
      back.x = back.width/2;
    
    }
  
  //moving hunter
  hunter.y = World.mouseY
  
   // release bullet when space key is pressed
  if (keyWentDown("space")) {
    createbullet();
    hunter.addImage(shootimage);
    gunShot.play();
    ammo=ammo-1;
    
  }
  if(keyWentUp("space")){
hunter.addImage(hunterImage);
  }
  
  //creating continous enemies
  var select_zombie = Math.round(random(1,2));
  
  if (World.frameCount % 100 == 0) {
   zombie1();
  }

//destroying balloons
  if(zombieB.isTouching(bulletGroup)){
  zombieB.destroyEach ();
  bulletGroup.destroyEach();
    Kill=Kill+1;
    zombie_hurt.play();
    
  }
      if(ammo===0){
         gamestate="end";
        
          youlose.visible=true;
    
      }
    if(Kill===20){
      gamestate="end";
       
       youwin.visible=true;
    }
    
    for(i=0;i<zombieB.length;i++){
      
    if(zombieB.isTouching(hunter)){
       zombieB[i].destroy();
     // text("you loose one life",250,300);
      man_hurt.play();
      life=life-1;
      
      if(life===0){
        gamestate="end";
        man_dead.play();
         youlose.visible=true;
         
      }
    
    }
    }
  
  

  }
  else if (gamestate==="end"){

   zombieB.setVelocityXEach(0);
   bulletGroup.destroyEach(); 
    zombieB.destroyEach();
    if(Kill===2){
    //  fill("yellow");
     // textSize(20);
      //text("You Won !!!",300,250);
       //youwin.visible=true;
    }
    else if(life===0){
      fill("white");
      textSize(20);
      text("you were killed by zombie",200,490);
       youlose.visible=true;
    
 
  
    }
    else if(ammo===0){
       fill("white");
      textSize(20);
     text("you don't have any ammo",250,490);
      zombieB.setVisibleEach(false);
      bulletGroup.setVisibleEach(false);
       youlose.visible=true;
    }
    
    
  }
  
    drawSprites();
    textSize(20);
    fill("cyan");
  text("Kill: "+ Kill, 250,17);
  fill("lightgreen");
  text("Life: "+ life,350,17);
  fill("yellow")
  text("Ammo: "+ammo,100,17);
}



function zombie1() {
  var zm1 = createSprite(0,Math.round(random(20, 370)), 10, 10);
  zm1.addAnimation("z1",zombieI);
  zm1.velocityX = 5;
  zm1.lifetime = 200;
  zm1.scale = 0.4;
  zombieB.add(zm1);
  return zm1;
}

 function createbullet() {
  var bullet= createSprite(100, 100, 60, 10);
  bullet.addImage(bulletImage);
  bullet.x = 360;
  bullet.y=hunter.y;
  bullet.velocityX = -13;
  bullet.lifetime = 100;
  bullet.scale = 0.03;
  bulletGroup.add(bullet);
  return bullet;
   
} 

function cg(){
  
    // button1.visible=false;
  zombieB.destroyEach();
  console.log("hi");
 gamestate="play";
  youlose.visible=false;
  
  youwin.visible=false;
  Kill=0;
  ammo=25;
  life=3;
}

function st(){
  gamestate="play";
  button3.hide();
  
}

