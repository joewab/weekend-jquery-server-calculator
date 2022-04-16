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

let equations = [];

app.post('/equations', (req, res) => {
    console.log('Post /equations');
    let newEquation = {
        number1: req.body.number1,
        number2: req.body.number2,
        operator: req.body.operator,
        solution: 
        eval(req.body.number1+
        req.body.operator+
        req.body.number2)
    }

    equations.push(newEquation);
    console.log(newEquation);
    res.sendStatus(200);
    console.log(equations);
  })