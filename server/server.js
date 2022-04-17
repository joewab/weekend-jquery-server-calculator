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

////////////////////////////////////////////////////////////////////////////////
//       /         /         /         /         /         /         /         / 

//naming the array that will hold the equations
let equations = [];

////////////////////////////////////////////////////////////////////////////////
//       /         /         /         /         /         /         /         / 


//receiving the equation object from the client,
//performing the equation, creating a new object with the solution as a property,
//and pushing the new object into the array above^^

app.post('/equations', (req, res) => {
    console.log('Post /equations');
    let newEquation = {
        number1: req.body.number1,
        number2: req.body.number2,
        operator: req.body.operator,
        solution: doMath(req.body.number1, req.body.operator, req.body.number2,)
    }

    equations.push(newEquation);
    console.log(newEquation);
    res.sendStatus(200);
    console.log(equations);
})

////////////////////////////////////////////////////////////////////////////////
//       /         /         /         /         /         /         /         / 


//this funtion is called when the new object is being created above, the answer
//will become the "solution" property of that object.

function doMath(num1, operator, num2){
    let solution;
    if (operator === '+'){
        solution = (Number(num1) + Number(num2))
    } 
    else if (operator === '-'){
        solution = (Number(num1) - Number(num2))
    }
    else if (operator === '*'){
        solution = (Number(num1) * Number(num2))
    }
    else if (operator === '/'){
        solution = (Number(num1) / Number(num2))
    }
    return solution
}

////////////////////////////////////////////////////////////////////////////////
//       /         /         /         /         /         /         /         / 


app.get('/equations', (req, res) => {
    console.log('GET /equations');
    res.send(equations);
})
