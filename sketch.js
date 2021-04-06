var database ,dog,dog1,dog2
var position
var form
var feed,add
var foodobject
var Feedtime
var Lastfeed,lastFed;
var gameState="g";
var texti=20;
var home;
//Create variables here

function preload()

{
  dogimg1 = loadImage("dogImg.png")
  dogimg2 = loadImage("dogImg1.png")
	//load images here
}

function setup() {
	createCanvas(1000, 500);
  database = firebase.database();
//  console.log(database);
 
  foodobject=new Food();
  dog = createSprite(550,250,10,10);
  dog.addImage(dogimg1);
  dog.scale=0.2
  

  var dogo = database.ref('Food');
  dogo.on("value", readPosition, showError);

feed = createButton("FEED DRAGO")
feed.position(500,15)

add = createButton("ADD FOOD")
///add.color("yellow")
add.position(400,15)
add.mousePressed(AddFood)
  feed.mousePressed(FeedDog)

} 



function draw(){
  background(46,139,87);

  
 foodobject.display();

 fedTime = database.ref('FeedTime');
 fedTime.on("value",function(data){
   lastFed = data.val();
 });
 
 fill(255,255,254);
 textSize(15);
 
  if(lastFed>=12){
     text("Last Feed : "+ lastFed%12 +" PM",250,30);
  }
  else if(lastFed=== 0){
    text("Last Feed :12 AM ",250,30)
  }
else{
  text("Last Feed : "+ lastFed +" AM",250,30);

}

 
   drawSprites();

}
function readPosition(data){
  position = data.val();
  foodobject.updateFoodStock(position)
 
  
}

function showError(){
  console.log("Error in writing to the database");
}


function AddFood(){
position++
database.ref('/').update({
  Food:position
}

)
}

function FeedDog(){

dog.addImage(dogimg2);
//dog.velocityY = -3;
//dog.velocityY = dog.velocityY +1;
//foodobject.velocityX= 3;
foodobject.updateFoodStock(foodobject.getFoodStock()-1)
 database.ref('/').update({
   Food:foodobject.getFoodStock(),
   FeedTime : hour()
 })
}
