// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on friends-data, match, etc.
// ===============================================================================

const friends = require("../data/friends");



// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function (req, res) {
    res.json(friends);
  });

  
  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a survey response... this data is then sent to the server...
  // Then the server saves the data to the friends array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function (req, res) {
    // Note the code here. Our "server" will respond to requests and let users know the matching friend.
    // It will do this by sending the name of the matched friend.
    // req.body is available since we're using the body parsing middleware
    const id = Math.floor(Math.random() * 100000);
    const userID = req.body.userName.replace(/\s+/g, "") + `-${id}`;

    var newFriend = req.body;
    var lowestScore = 100;

    function add(a, b) {
      return parseInt(a) + parseInt(b);
    }

    var newFriendScore = newFriend.scores.reduce(add, 0);

    for (var i = 0; i < friends.length; i++) {
      var friendScore = friends[i].scores.reduce(add, 0);

      var scoreDiff = Math.abs(friendScore - newFriendScore);
      if (scoreDiff < lowestScore && newFriend.name !== friends[i].name) {
        lowestScore = scoreDiff;
        newFriend.winningFriend = friends[i];
      }
    }
    console.log(
      newFriend.name +
      "'s " +
      "friend match is : " +
      newFriend.winningFriend.name
    );

    newFriend.routeName = newFriend.name.replace(/\s+/g, "").toLowerCase();

    console.log("Newly added friend: " + newFriend.name);

    friends.push(newFriend);

    res.json(newFriend);
  });



  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  app.post("/api/clear", function (req, res) {
    // Empty out the arrays of data
    friends.length = [];

    res.json({ ok: true });
  });
};
