console.log('JS');

$(document).ready(onReady);

function onReady(){
    console.log('JQ');
    $('.mathButton').on('click', makeMathObject);
}

////////////////////////////////////////////////////////////////////////////////
//       /         /         /         /         /         /         /         / 


function makeMathObject(){
    console.log('in makeMathObject');
    let mathObject = {
        number1: $('#num1Input').val(),
        number2: $('#num2Input').val(),
        operator: $(this).text()
    }

    console.log(mathObject);
   
    postMathObject(mathObject);

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
}