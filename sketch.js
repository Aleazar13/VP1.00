var database ,dog,dog1,dog2
var position
//var form
var feed,add
var foodobject
var Feedtime
var Lastfeed, foodStockImg, fs;
var foods;
//Create variables here

function preload()

{
  dogimg1 = loadImage("dogImg.png")
  dogimg2 = loadImage("dogImg1.png");
  foodStockImg = loadImage("Milk.png")
  //load images here
  
}

function setup() {
	createCanvas(700, 700);
  database = firebase.database();
  console.log(database);
 
  foodobject=new Food()
  dog = createSprite(550,250,10,10);
  dog.addImage(dogimg1)
  dog.scale=0.2

  fs = createSprite(170, 50, 20, 20);
  fs.addImage(foodStockImg);
  fs.scale = 0.1
 
  var dogo = database.ref('Food');
  dogo.on("value", readStock, showError);
  feed = createButton("FEED DRAGO MILK")
  feed.position(600,100)
  feed.mousePressed(FeedDog)
  add = createButton("ADD FOOD")
  add.position(400,100)
  // add.mousePressed(AddFood)


} 

function draw(){
 background(46,139,87);

 foodobject.display()
 
 drawSprites();
  
 fill(255,255,254);
 textSize(15);

if(keyWentDown(UP_ARROW)){
  writeStock(foods);
  dog.addImage(dogimg2);
}
//  fedtime=database.ref('FeedTime')
//  fedtime.on("value",function(data){ Lastfeed=data.val(); });
//  if(Lastfeed>=12)
//  {
//    text("Last Fed :" + Lastfeed%12 + "PM", 150,100);
//  }else if(Lastfeed ===0 )
//  {
//    text("Last Fed : 12 AM" , 150,100)
//  }else
//  {
//    text("Last Fed :" + Lastfeed + "AM", 150,100);
//  }
text("food reamaing"+foods,400,400)

drawSprites();
}
// function readPosition(data){
//   position = data.val();
//   foodobject.updateFoodStock(position)
// }

function readStock(data){
foods=data.val();
}

function writeStock(x){
if(x<=0){
x=0
}else{
  x=x-1;
}

database.ref('/').update({
  Food:x
})
}


function showError(){
  console.log("Error in writing to the database");
}

function writePosition(nazo){
  if(nazo>0){
    nazo=nazo-1
  }
  else{
    nazo=0
  }
  database.ref('/').set({
    'Food': nazo
  })

}
// function AddFood(){
// position++
// database.ref('/').update({
//   Food:position
// // }
// )
// }
function FeedDog(){

dog.addImage(dogimg2)

foodobject.updateFoodStock(foodobject.getFoodStock()-1)
 database.ref('/').update({
   Food:foodobject.getFoodStock(),
   FeedTime:hour ()
 })
}