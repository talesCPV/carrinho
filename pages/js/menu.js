let global_params;

// *********    MODAL FUNCTIONS    **********

    var span = document.getElementById("close");
    var modal = document.querySelector('.modal');
    var modal_label = document.getElementById("modal-title");
    var modal_content = document.querySelector(".modal-content");

    span.onclick = function() {
        modal.style.display = "none";
    }

// *********    MENU FUNCTIONS    **********

    var main = document.getElementById("content");

    function runScript(html){
 
        let script = html.getElementsByTagName('script');
        eval(script[0].innerHTML);
    }

    function openNav() {
        document.getElementById("mySidenav").style.width = "450px";
        document.getElementById("menulink").style.marginLeft = "250px";
    }

    function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("menulink").style.marginLeft= "0";
    }

    function openHTML(template, label,where="window"){        

        fetch( "./templates/"+template)
        .then( stream => stream.text() )
        .then( text => {
            closeNav();
            if(where == "window"){
                main.innerHTML = text;
                runScript(main);
            }else{
                modal_content.innerHTML = text;
                modal_label.innerHTML = label;
                modal.style.display = "block";
                runScript(modal_content);
            }

        }); 
        
    }    

// *********    AJAX FUNCTION    **********    

function queryDB(source,parans){        

    const data = new URLSearchParams();
    data.append('source',source);
    for(let i=0; i<parans.length; i++){
        data.append('param_'+i,parans[i]);
    }

    const myRequest = new Request('./files/ajax.php',{
        method: 'POST',
        body: data
    });

    const myPromisse = new Promise((resolve,reject) =>{

        fetch(myRequest)
        .then(function (response){

            if (response.status === 200) { 
                resolve(response.text());
            } else { 
                reject(new Error("Houve algum erro na comunicação com o servidor"));
            } 

        });

    });

    return myPromisse;
    
}

// *********    CHECK DATA FUNCTIONS    **********

function float_number(campo,casas=2){
    var ok_chr = new Array('1','2','3','4','5','6','7','8','9','0');
    var text = campo.value;
    var after_dot = 0;
    var out_text = '';
    for(var i = 0; i<text.length; i++){

        if(after_dot > 0){ // conta quantas casas depois da virgula
            after_dot = after_dot + 1;
        }

        if (after_dot <= (casas + 1) ){ // se não passou das casas depois da virgula ( conta o ponto + n digitos)

            if(ok_chr.includes(text.charAt(i))){
                if (after_dot == 0){ // elimina o 0 a equerda
                    out_text = parseFloat(out_text + text.charAt(i));                    
                }else{
                    out_text = out_text + text.charAt(i);
                }
            }
            if((text.charAt(i) == ',' || text.charAt(i) == '.') && after_dot == 0){
                out_text = out_text + '.';
                after_dot = after_dot + 1;
            }
        }

    }
    if(out_text == ''){
        out_text = 0;
    }

    campo.value = out_text;
}


function int_number(campo){
    var ok_chr = new Array('1','2','3','4','5','6','7','8','9','0');
    var text = campo.value;
    var out_text = '';
    for(var i = 0; i<text.length; i++){

        if(ok_chr.includes(text.charAt(i))){
            out_text = out_text + text.charAt(i); 
        }

    }
    if(out_text == ''){
        out_text = 0;
    }

    campo.value = parseFloat(out_text);
}

// *********    POPULATION FIELDS    **********

// fill combobox with query from DB (combobox, ajax source, query params, index params (option.innerHTML, option.value))
function fillCmb(select,source,params,index_params){
    const query = queryDB(source,params);

    query.then(result =>{
        let arr = JSON.parse(result);

        arr.forEach((item)=>{
            let op = document.createElement('option');
            op.innerHTML = item[index_params[0]].toUpperCase();
            op.value = item[index_params[1]];
            select.appendChild(op);        
        });

    });
    query.catch(error =>{
        alert(error);
    });
        
}
