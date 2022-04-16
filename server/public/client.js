console.log('JS');

$(document).ready(onReady);

function onReady(){
    console.log('JQ');
    $('.mathButton').on('click', makeEquationObject);
}

////////////////////////////////////////////////////////////////////////////////
//       /         /         /         /         /         /         /         / 


function makeEquationObject(){
    console.log('in makeEquationObject');
    if ($('#num1Input').val()===''|| $('#num2Input').val()===''){
        alert('please enter two numbers!');
        return false
    }
    let equationObject = {
        number1: $('#num1Input').val(),
        number2: $('#num2Input').val(),
        operator: $(this).text()
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
