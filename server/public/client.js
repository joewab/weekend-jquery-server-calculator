console.log('JS');

$(document).ready(onReady);

function onReady(){
    console.log('JQ');

    //the next few lines correspond to functions I made for base mode
    //that I ended up replacing with functions for the stretch goals

    // $('.mathButton').on('click', makeOperator);
    // $('#equalsButton').on('click', makeEquationObject);
    // $('#clearButton').on('click', clearFields);

    //stretch buttons
    $('.numberButton').on('click', calculatorButton);
    $('#clearScreen').on('click', clearScreen);
    $('.operatorButton').on('click', operatorSubmit);
    $('.solveButton').on('click', makeMathObject)

}

//stretch functions

////////////////////////////////////////////////////////////////////////////////
//       /         /         /         /         /         /         /         / 

//This will be called if a button with a math operator on it is clicked.
//It inputs the math operator onto the calculator screen with a space on either side
//The spaces on either side are there so the equation can be more easily split
//into its parts later on...

function operatorSubmit(){
    $('#calculatorScreen').append(` ${$(this).text()} `);
}

////////////////////////////////////////////////////////////////////////////////
//       /         /         /         /         /         /         /         / 

//This will be called when the "C" button is clicked. It clears the "screen".

function clearScreen(){
    $('#calculatorScreen').empty();
}

////////////////////////////////////////////////////////////////////////////////
//       /         /         /         /         /         /         /         / 

//This will be called whenever a number or "." is clicked on the calculator
//It puts the text value of the number onto the calculator "screen"

function calculatorButton(){
    $('#calculatorScreen').append($(this).text());
}
////////////////////////////////////////////////////////////////////////////////
//       /         /         /         /         /         /         /         / 

//This will be called when the equals button on the calculator is clicked
//It makes an object that contains the data input on the calculator

function makeMathObject(){

//if the input is empty, the function won't run
    if ($('#calculatorScreen').text()==='') {
        alert('please write an equation!');
        return false
    }

//since the input from the calculator is one string, this will separate
//the parts of that string that are separated by spaces and put them into
//an array
    let splitEntry = $('#calculatorScreen').text().split(' ');

//here the object is being created based on the index positions of the items
//in the array
    let equationObject = {
        number1: splitEntry[0],
        number2: splitEntry[2],
        operator: splitEntry[1]
    }

    console.log(equationObject);
   
//after checking what the object contains, I then call another function to post the
//object onto the server
    postMathObject(equationObject);

//finally the calculator screen on the DOM is reset
    $('#calculatorScreen').empty();

}

////////////////////////////////////////////////////////////////////////////////
//       /         /         /         /         /         /         /         / 


//This will post the equation object created above to the server
function postMathObject(equation){
    $.ajax({
        method: 'POST',
        url: '/equations',
        data: equation
      })
      .then (function(response){
        console.log('response of post is:');
        console.log(response);
      })
    
      getAndRenderEquationObjects()
}


////////////////////////////////////////////////////////////////////////////////
//       /         /         /         /         /         /         /         / 

//This will request the array of equations from the server and post them onto the DOM
//in different places
function getAndRenderEquationObjects(){
    $.ajax({
        method: 'GET',
        url: '/equations'
      })
       .then(function(response){
        console.log('the server sent me something!');
        console.log(response);
        
        $('#answer').empty();
        $('#answer').append(`<h2> equation: ${response[response.length-1].number1} ${response[response.length-1].operator} ${response[response.length-1].number2} </h2>`)
        $('#answer').append(`<h2> solution: ${response[response.length-1].solution} </h2>`);
      
        $('#previousEquations').empty();
        $('#previousEquations').append('Previous Equations');

        $('#equations').empty();
        for(i=response.length-1; i>=0; i--){
          $('#equations').append(
            `<li>${response[i].number1} ${response[i].operator} ${response[i].number2} = ${response[i].solution}</li>`
          )
        }
    })
}


//the code below was written for base mode and then
//replaced by code for the stretch goals
////////////////////////////////////////////////////////////////////////////////
//       /         /         /         /         /         /         /         / 


// function clearFields(){
//     $('#num1Input').val('');
//     $('#num2Input').val('')
// }



////////////////////////////////////////////////////////////////////////////////
//       /         /         /         /         /         /         /         / 

// let operator;

// function makeOperator(){
//    operator = $(this).text();
//    console.log(operator);
//    $('#showFunction').empty();
//    $('#showFunction').append(operator);
//    return operator
// }

////////////////////////////////////////////////////////////////////////////////
//       /         /         /         /         /         /         /         / 


// function makeEquationObject(){
//     console.log(operator);
//     console.log('in makeEquationObject');
//     if ($('#num1Input').val()===''|| $('#num2Input').val()==='') {
//         alert('please enter two numbers!');
//         return false
//     }

//     $('#firstNumber').empty();
//     $('#secondNumber').empty();

//     $('#firstNumber').append($('#num1Input').val());
//     $('#secondNumber').append($('#num2Input').val())

//     let equationObject = {
//         number1: $('#num1Input').val(),
//         number2: $('#num2Input').val(),
//         operator: operator
//     }

//     console.log(equationObject);
   
//     postMathObject(equationObject);

// }

////////////////////////////////////////////////////////////////////////////////
//       /         /         /         /         /         /         /         / 
