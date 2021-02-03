class Quiz{
    constructor(){
        this.question = createElement('h2');
        this.o1 = createElement('h3');
        this.o2 = createElement('h3');
        this.o3 = createElement('h3');
        this.name = createInput("Enter your name here");
        this.COption = createInput("Enter Correct option number here.");
        this.submit = createButton("Submit");
    }

    hide(){
      this.name.hide();
      this.COption.hide();
      this.submit.hide();
    }

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

    play(){
      background("pink");
      
        this.submit.position(560,610);
        this.submit.mousePressed(()=>{
        contestantCount=contestantCount+1;
        contestant.updateCount(contestantCount);
        contestant.index = contestantCount;
        contestant.distance= this.COption.value();
        contestant.name = this.name.value();
         
          contestant.update();
        })

        this.question.html("Question: I shave every day, but my beard stays the same. Who am I?");
        this.question.position(100,300);

        this.o1.html("Option 1: blade");
        this.o1.position(100,400);

        this.o2.html("Option 2: barber");
        this.o2.position(100,450);

        this.o3.html("Option 3: none of these");
        this.o3.position(100,500);

        var title = createElement('h1'); 
        title.html("Quiz Time!");
        title.position(325,60);

        this.name.position(400,550);
     
        this.COption.position(600,550);

        if(contestantCount === 4){
          database.ref('/').update({
            gameState: 2,
          })
        }        
    } 

    end(){
        background("lightcoral");
        textSize(20);
        fill("black");
        text("The one who has given the correct option is Hilighted in green", 130,360);
        textSize(18);
        var dispos = 450;
        var correctAns = "2";
      
        //console.log("all plr : " + allPlayers);
        if(allPlayers!=undefined){
          for(var plr in allPlayers){ 
            dispos+=50;
            console.log(allPlayers[plr]);
            if(correctAns == allPlayers[plr].option){
              fill("green");
            }else {
              fill("black");
            }
            textSize(20)
            text(allPlayers[plr].Playername + " : " + allPlayers[plr].option,100,dispos);
            fill("Green");
            textSize(25);
            
          }
          text("Congratulations!!", 315, 200);
      }    
    }

    final(){
      
      var CA = "2";

      var P1O = database.ref('players/player1');
      P1O.on("value",function(option){
        option = option.val();
        })

        var P2O = database.ref('players/player2');
          P2O.on("value",function(option){
            option = option.val();
          })

          var P3O = database.ref('players/player3');
          P3O.on("value",function(option){
            option = option.val();
          })

          var P4O = database.ref('players/player4');
          P4O.on("value",function(option){
            option = option.val();
          })

          if(P1O === CA){
            background("green");
          }else{
            background("red");
          }

          if(P2O === CA){
            background("green");
          }else{
            background("red");
          }

          if(P3O === CA){
            background("green");
          }else{
            background("red");
          }

          if(P4O === CA){
            background("green");
          }else{
            background("red");
          }

    }

    getState(){
        var gameStateRef  = database.ref('gameState');
        gameStateRef.on("value",function(data){
           gameState = data.val();
        })
       
      }
    
      update(state){
        database.ref('gameState').update({
          gameState: state
        });
      }

      async start(){
        if(gameState === 0){
          contestant = new Contestant();
          contestant.getCount();
          var ContestantCRef = await database.ref('contestantNum').once("value");
          if(ContestantCRef.exists()){
              contestantCount = ContestantCRef.val();
              contestant.getCount();
          }
          quiz = new Quiz();
        }
      }

      getCount(){
          var playerCountRef = database.ref('contestantNum');
          playerCountRef.on("value",function(data){
          contestantNum = data.val();
          })
      }
 
}