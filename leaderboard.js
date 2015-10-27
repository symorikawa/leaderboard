console.log("Hello World");

if(Meteor.isClient){
  console.log("Hello client");
  Template.leaderboard.helpers({
    'player': function(){
      return PlayerList.find();
    },
    'otherHelperFunction': function() {
      return "other helper funtion";
    }
  });

  Template.leaderboard.events({
    'click .player': function(){
      Session.set('selectedPlayer', 'session value test');
      var selectedPlayer = Session.get('selectedPLayer');
      console.log(selectedPlayer);
    }
  });
}

if(Meteor.isServer){
  console.log("Hello server");
}

PlayerList = new Mongo.Collection('players');