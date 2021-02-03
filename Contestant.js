class Contestant {
    constructor(){
      this.index =null;
      this.distance = 0;
      this.name = null;
    }
  
    getCount(){
      var playerCountRef = database.ref('contestantNum');
      playerCountRef.on("value",function(data){
        contestantCount = data.val();
      })
    }
  
    updateCount(count){
      database.ref('/').update({
        contestantNum: count
      });
    }
  
    update(){
      var playerIndex = "players/player" + this.index;
      database.ref(playerIndex).set({
        Playername:this.name,
        option:this.distance
      });
    }
   //Static functions are accessed with class name, they return 
   //constant value irrespective of the object that is callin it
   
     static getPlayerInfo(){
       var playerInforef= database.ref('players');
       playerInforef.on("value",(data)=>{
         allPlayers = data.val();
       })
       console.log(allPlayers);
     }
  }
  
  