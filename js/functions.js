$(document).ready(function(){

    var fatherDiv = $('#fields');
    var btnShow = $('#show');
    var messageShow = $('.warningShow')
    var fields = 0;
    var shown = false;

    function isNumber(e) { /* Função auxiliar para inputs */
        if ($.isNumeric(e)) {
            return true;
        }
        return false;
    }

    $('#numberFields').on('change', function (event){ /* Função para captar mudanças na quantidade de campos */
        if (!isNumber(event.target.value) || (!event.target.value)){
            messageShow.css("display", "block");
        }
        else{
            fields = parseInt(event.target.value)
            messageShow.css("display", "none");
        }
    });



    btnShow.click(function(){ /* Função para exibir campos dinamicamente */
        if (shown == true){ /* Função para que os campos não seja replicados */
            show == false;
            fatherDiv.empty();
        }
        if (Number.isInteger(fields)){ /* Mais uma validação para a quantidade de campos */
            messageShow.css("display", "none")
            
                for (let i = 0; i < fields; i++){
                    if (i % 10 == 0){
                        var div = document.createElement('div');
                    }
                    var input = document.createElement('input');
                    var span = document.createElement('span');
                    var more = document.createTextNode("+")
                    div.appendChild(input);
                    if (i != (fields - 1)){
                        span.appendChild(more);
                        div.appendChild(span);                   
                    }
                    
                    $(input).prop('required',true);
                    $(input).prop('name', i);
                    fatherDiv.append(div);
                    
                }
                shown = true;
        }
        else {
            messageShow.css("display", "block")
        }
        
        
    });

    $("#formSum").submit(function( event ) { /* Função para tratar e exibir resultados dos campos dinâmicos*/
        var validatorNumber = 0;
        var sum = 0;
        var response = ( $( this ).serializeArray());
        jQuery.each( response, function( i, response ) {
            if (!isNumber(response.value)){
                messageShow.css("display", "block");
                validatorNumber = 1;
            } else {
                sum += parseFloat(response.value);
            }
        });
        if (validatorNumber == 0){
            alert("Result: " + sum)
        }
        
        event.preventDefault();
      });   
});