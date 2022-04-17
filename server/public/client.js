console.log('JS');

$(document).ready(onReady);

function onReady(){
    console.log('JQ');
    $('.mathButton').on('click', makeOperator);
    $('#equalsButton').on('click', makeEquationObject);
    $('#clearButton').on('click', clearFields);
    $('.numberButton').on('click', calculatorButton)

}

function calculatorButton(){
    console.log($(this).text());
}
////////////////////////////////////////////////////////////////////////////////
//       /         /         /         /         /         /         /         / 

function clearFields(){
    $('#num1Input').val('');
    $('#num2Input').val('')
}



////////////////////////////////////////////////////////////////////////////////
//       /         /         /         /         /         /         /         / 

let operator;

function makeOperator(){
   operator = $(this).text();
   console.log(operator);
   $('#showFunction').empty();
   $('#showFunction').append(operator);
   return operator
}

////////////////////////////////////////////////////////////////////////////////
//       /         /         /         /         /         /         /         / 


function makeEquationObject(){
    console.log(operator);
    console.log('in makeEquationObject');
    if ($('#num1Input').val()===''|| $('#num2Input').val()==='') {
        alert('please enter two numbers!');
        return false
    }

    $('#firstNumber').empty();
    $('#secondNumber').empty();

    $('#firstNumber').append($('#num1Input').val());
    $('#secondNumber').append($('#num2Input').val())

    let equationObject = {
        number1: $('#num1Input').val(),
        number2: $('#num2Input').val(),
        operator: operator
    }

    console.log(equationObject);
   
    postMathObject(equationObject);

}

////////////////////////////////////////////////////////////////////////////////
//       /         /         /         /         /         /         /         / 


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


function getAndRenderEquationObjects(){
    $.ajax({
        method: 'GET',
        url: '/equations'
      })
       .then(function(response){
        console.log('the server sent me something!');
        console.log(response);
        
        $('#answer').empty();
        $('#answer').append(`solution: ${response[response.length-1].solution}`);
      
        $('#pastEquations').empty();
        for(i=response.length-1; i>=0; i--){
          $('#pastEquations').append(
            `<li>${response[i].number1} ${response[i].operator} ${response[i].number2} = ${response[i].solution}</li>`
          )
        }
    })
}
