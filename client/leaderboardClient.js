/**
 * Created by Sy on 10/28/2015.
 */

Meteor.subscribe('thePlayers');

Template.leaderboard.helpers({
  'player': function(){
    var currentUserId = Meteor.userId();
    return PlayerList.find({}, {sort: {score: -1, name: 1}});
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
    Meteor.call('modifyPlayerScore', selectedPlayer, 5);
  },
  'click .decrement': function(){
    var selectedPlayer = Session.get('selectedPlayer');
    Meteor.call('modifyPlayerScore', selectedPlayer, -5);
  },
  'click .remove': function(){
    var selectedPlayer = Session.get('selectedPlayer');
    Meteor.call('removePlayerData', selectedPlayer);
  }
});

Template.addPlayerForm.events({
  'submit form': function(){
    event.preventDefault();
    var playerNameVar = event.target.playerName.value;
    Meteor.call('insertPlayerData', playerNameVar);
  }
});