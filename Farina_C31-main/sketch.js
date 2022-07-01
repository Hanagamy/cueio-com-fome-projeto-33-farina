const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
//IMG = imagem
//S = sound
var rope;
var rope2;
var watermelon;
var watermelonIMG;
var glue;
var backgroundIMG;
var cueio;
var cueiotriste;
var cueiocomendo;
var cueiopiscano;
var cueioIMG;
var comendoS;
var bloons;
var bloonsIMG;
var arS;
var cordaS;
var backgroundS;
var titiS;
var muteBnt;

let engine;
let world;
var ground;

function preload(){
  backgroundIMG = loadImage("background.png");
  watermelonIMG = loadImage("melon.png");
  cueioIMG=loadImage("Rabbit-01.png");

cueiopiscano = loadAnimation("blink_1.png","blink_2.png","blink_3.png");

cueiocomendo = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
comendoS = loadSound("eating_sound.mp3");

cueiotriste = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
titiS = loadSound("sad.wav");

bloonsIMG = loadImage("balloon.png");
arS = loadSound("air.wav");

cordaS = loadSound("rope_cut.mp3");

backgroundS = loadSound("sound1.mp3");

cueiopiscano.playing = true;
cueiocomendo.playing = true;
cueiotriste.playing = true;
cueiotriste.looping= false;
cueiocomendo.looping = false; 

}
function setup() 
{
  createCanvas(500,700);
  frameRate(80);

  backgroundS.play();
  backgroundS.setVolume(0.0625);
  backgroundS.loop=true;

  engine = Engine.create();
  world = engine.world;

  button = createImg('cut_btn.png');
  button.position(220,30);
  button.size(50,50);
  button.mouseClicked(knife);

  bnt2 = createImg('cut_btn.png');
  bnt2.position(80,10);
  bnt2.size(50,50);
  bnt2.mouseClicked(knife2);

  bnt3 = createImg('cut_btn.png');
  bnt3.position(320,0);
  bnt3.size(50,50);
  bnt3.mouseClicked(knife3);

  bloons = createImg("balloon.png");
  bloons.position(10,250);
  bloons.size(100,100);
  bloons.mouseClicked(correnteDeAr);

  muteBnt = createImg("mute.png");
  muteBnt.position(10,50);
  muteBnt.size(100,100);
  muteBnt.mouseClicked(mutepls);
  rope= new Rope(5,{x:245,y:30});
  rope2= new Rope(7,{x:105,y:15});
  rope3= new Rope(7,{x:345,y:5});

  ground = new Ground(200,680,600,20);

 cueiopiscano.frameDelay = 20;
  cueiocomendo.frameDelay = 20;
  cueiotriste.frameDelay=20;

  var WATERMEOLON_options = {
    density:0.005
  };

  //coelho
  cueio=createSprite(125,620,100,100);
  cueio.scale = 0.15;

  //varuaçoes da animação do coelho
  cueio.addAnimation("piscando",cueiopiscano);
  cueio.addAnimation("comendo",cueiocomendo);
  cueio.addAnimation("triste",cueiotriste);
  //mudança de animação do coelho
  cueio.changeAnimation("piscando");
 

//fruta
  watermelon = Bodies.circle(60,20,10,WATERMEOLON_options);
  Matter.Composite.add(rope.body,watermelon);

  //corda
  glue = new Link(rope,watermelon);
  glue2 = new Link(rope2,watermelon);
  glue3 = new Link(rope3,watermelon);
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50);
  imageMode(CENTER);
}

function draw() 
{
  background(51);
  image(backgroundIMG,width/2,height/2,490,690);
  
  //verifica se existe
  if(watermelon!=null){
    image(watermelonIMG,watermelon.position.x,watermelon.position.y,75,75);
  }
  
  rope.show();  
  rope2.show(); 
  rope3.show();
  Engine.update(engine);
  

  //verifica se a fruta colideo com o coelho
  if(collide(watermelon,cueio)==true){
    comendoS.play();
    cueio.changeAnimation('comendo');
  }

  //verifica se a fruta colidio com o chão
  if(collide(watermelon,ground.body)==true){
    titiS.play();
    cueio.changeAnimation("triste");
  }



  drawSprites(); 
}

//função de ponto de corte
function knife(){
  cordaS.play();
  rope.break();
  glue.dettach();
  glue = null;
}
function knife2(){
  cordaS.play();
  rope2.break();
  glue2.dettach();
  glue2 = null;
}
function knife3(){
  cordaS.play();
  rope3.break();
  glue3.dettach();
  glue3 = null;
}

//função de verificação de colisão
function collide(body,sprite){
  if(body!=null){
     var dista = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
     if(dista<=80){
      World.remove(engine.world,watermelon);
      watermelon=null;
      return true;
     }
     else{
      return false;
     }
  }
}

function correnteDeAr(){
  arS.play();
  Matter.Body.applyForce(watermelon,{x:0,y:0},{x:0.01,y:0})
}
function mutepls(){
  if(backgroundS.isPlaying()){
    backgroundS.stop();
  }
  else{
    backgroundS.play();
  }
}

