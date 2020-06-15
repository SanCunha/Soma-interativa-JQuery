$(document).ready(function(){

    var fatherDiv = $('#fields');
    var btnShow = $('#show');
    var btnReset = $('#reset');
    var messageShow = $('.warningShow');
    var fields = 0;
    var operator = "+";
    var shown = false;
    var savedValues = [];

    function isNumber(e) { /* Função auxiliar para inputs */
        if ($.isNumeric(e)) {
            return true;
        }
        return false;
    }

    function showFields (fields, operator, values){        
        for (let i = 0; i < fields; i++){
            if (i % 10 == 0){
                var div = document.createElement('div');
            }
            var input = document.createElement('input');
            $(input).prop('value', values[i]);
            $(input).prop('required',true);
            $(input).prop('id', i);
            $(input).prop('name', i);

            var span = document.createElement('span');
            var symbol = document.createTextNode(operator);


            div.appendChild(input);
            if (i != (fields - 1)){
                span.appendChild(symbol);
                div.appendChild(span);                   
            }
            
            fatherDiv.append(div);
            
        }
        shown = true;
    }

    function showResult(value){
        $("#result").val(value);
    }

    function reset(){
        fatherDiv.empty();
        savedValues.splice(0,);
        showResult(0.0);
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

    $('#select').on('change', function (event){ /* Função para captar mudanças na quantidade de campos */
        switch (event.target.value){
            case "Sum":
                operator = "+";
            break;
            case "Sub":
                operator = "-";
            break;
            case "Mul":
                operator = "*";
            break;
            case "Div":
                operator = "/";
            break;
        }
        fatherDiv.empty();
        showFields(fields, operator, savedValues);        
    });

    btnShow.click(function(){ /* Função para exibir campos dinamicamente */
        if (shown == true){ /* Função para que os campos não seja replicados */
            show == false;
            reset();
        }
        if (Number.isInteger(fields)){ /* Mais uma validação para a quantidade de campos */
            messageShow.css("display", "none")
            showFields(fields, operator, savedValues)
        }
        else {
            messageShow.css("display", "block")
        }
        
        
    });

    btnReset.click(function() {
        reset();
        operator = "+";
        showFields(fields, operator, savedValues)
    });

    $("#form").submit(function( event ) { /* Função para tratar e exibir resultados dos campos dinâmicos*/
        var validatorNumber = 0;
        var response = ($(this).serializeArray());
        var select = $("#select option:selected").val();
        var result = parseFloat($("#0").val());

        jQuery.each( response, function( i, response ) {
            if (!isNumber(response.value)){
                messageShow.css("display", "block");
                validatorNumber = 1;
            } else {
                savedValues.push(parseFloat(response.value));
                if (i != 0) {
                    switch (select){
                        case "Sum":
                            result += parseFloat(response.value);
                        break;
                        case "Sub":
                            result -= parseFloat(response.value);
                        break;
                        case "Mul":
                            result = result * parseFloat(response.value);
                        break;
                        case "Div":
                            result = result / parseFloat(response.value);
                        break;
                    }
                }                                
            }
        });
        if (validatorNumber == 0){
            showResult(result);
        }
        
        event.preventDefault();
      });   
});