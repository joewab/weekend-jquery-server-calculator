const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static('./server/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 5000;

// Start the server, and listen for requests:
app.listen(PORT, function() {
  console.log(`The server is running! Check it out at http://localhost:${PORT}!`);
})
