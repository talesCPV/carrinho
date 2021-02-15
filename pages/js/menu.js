    
// *********    MODAL FUNCTIONS    **********

    // Get the <span> element that closes the modal
    var span = document.getElementById("close");
    var modal = document.querySelector('.modal');
    var modal_label = document.getElementById("modal-title");
    var modal_content = document.querySelector(".modal-content");

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

// *********    MENU FUNCTIONS    **********

    var main = document.getElementById("content");


    function openNav() {
        document.getElementById("mySidenav").style.width = "450px";
        document.getElementById("menulink").style.marginLeft = "250px";
    }

    function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("menulink").style.marginLeft= "0";
    }

    function openHTML(template, script,label,where="window"){        

        fetch( "./templates/"+template)
        .then( stream => stream.text() )
        .then( text => {
            closeNav();
            if(where == "window"){
                main.innerHTML = text;
            }else{
                modal_content.innerHTML = text;
                modal_label.innerHTML = label;
                modal.style.display = "block";
            }

            if(script != ""){

                fetch( "./js/"+script)
                .then( stream => stream.text() )
                .then( text => {
                    eval(text);
                }); 

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