class Game {
  constructor(){

  }
// data reading 
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      //new form 
      form = new Form()
      form.display();
    }
//adding images
    car1 = createSprite(100,200);
    car1.addImage(car1_Img)
    car2 = createSprite(300,200);
    car2.addImage(car2_Img)
    car3 = createSprite(500,200);
    car3.addImage(car3_Img)
    car4 = createSprite(700,200);
    car4.addImage(car4_Img)
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    player.getCarsAtEnd();

    if(allPlayers !== undefined){
      //var display_position = 100;
      background(rgb(10,30,10))
      image(track,0,-displayHeight*4,displayWidth,displayHeight*5)
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          fill("red");
         ellipse(x,y,65,65);
        
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }
//the car movers forward 
    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    //when the car reaches 3680 the game ends
if (player.distance<3680){
  gameState=2
  //rank increases 
  player.rank=+1
  Player.updateCarsAtEnd(player.rank);
}
    drawSprites();
  }
  //gameState end 
  end(){
    game.update(2)
  }
}
