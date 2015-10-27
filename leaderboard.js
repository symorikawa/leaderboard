console.log("Hello World");

if(Meteor.isClient){
  console.log("Hello client");
  Template.leaderboard.helpers({
    'player': function(){
      return PlayerList.find({}, {sort: {score: -1, name: 1} })
    },
    'selectedClass': function(){
      var playerId = this._id;
      var selectedPlayer = Session.get('selectedPlayer');
      if(playerId == selectedPlayer){
        return "selected";
      }
    },
    'showSelectedPlayer': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      return PlayerList.findOne(selectedPlayer)
    }
  });

  Template.leaderboard.events({
    'click .player': function(){
      var playerID = this._id;
      Session.set('selectedPlayer', playerID);
    },
    'click .increment': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      PlayerList.update(selectedPlayer, {$inc: {score: 5} });
    },
    'click .decrement': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      PlayerList.update(selectedPlayer, {$inc: {score: -5} });
    }
  });

}

if(Meteor.isServer){
  console.log("Hello server");
}

PlayerList = new Mongo.Collection('players');