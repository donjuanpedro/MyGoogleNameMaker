'use strict';

process.env.DEBUG = 'actions-on-google:*';
let Assistant = require('actions-on-google').ApiAiAssistant;
let express = require('express');
let bodyParser = require('body-parser');

let app = express();
app.use(bodyParser.json({type: 'application/json'}));

const NAME_ACTION = 'make_name';
const COLOR_ARGUMENT = 'color';
const NUMBER_ARGUMENT = 'number';

// Start MyNameMaker

app.post('/', function (req, res) {
  const assistant = new Assistant({request: req, response: res});
  console.log('Request headers: ' + Json.stringify(req.headers));
  console.log('Request body: ' + JSON.stringify(req.body));

  //Make a NAME_ACTION
  function makeName (assistant) {
    let number = assistant.getArgument(NUMBER_ARGUMENT);
    let color = assistant.getArgument(COLOR_ARGUMENT);
    assistant.tell('Alright, your silly name is ' +
      color + ' ' + number +
      '! I hope you like it. See you next time.');
  }
  let actionMap = new Map();
  actionMap.set(NAME_ACTION, makeName);
  assistant.handleRequest(actionMap);
});

//end MyNameMaker

if (module === require.main) {
  //start server
  let server = app.listen(process.env.PORT || 8080, function() {
    let port = server.address().port;
    console.log('App listening on port %s', port);
  });
  //end server
}

module.exports = app;
