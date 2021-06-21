loadMenu();

var flag = false;

let btnTeste = document.getElementById('btnTeste');

const d = new Date();
document.querySelector('.footer').innerHTML =  `Caçapava, ${('0' + d.getDate()).slice(-2) }/${('0' + (d.getMonth() + 1)).slice(-2) }/${d.getFullYear()} `  ;
document.querySelector('.data-user').innerHTML = localStorage.getItem("nome")   ;
document.querySelector('.menu-aba').addEventListener('click',()=>{
      const menu = document.querySelector('.menu-bar');

      if(menu.style.width == "0px" || menu.style.width == "" ){
          menu.style.width =  "350px";
          menu.style.padding =  "20px 0 0 20px";
      }else{
          menu.style.width =  "0";
          menu.style.padding =  "20px 0 0 0";
      }
  })

  function openHTML(template, label,where="window"){     
    fetch( "templates/"+template)
    .then( stream => stream.text() )
    .then( text => {
        
        const main = document.querySelector(".screen");
        
        if(where == "window"){
            main.innerHTML = text;
            console.log(main)
            let script = main.getElementsByTagName('script');
            eval(script[0].innerHTML);
        }else{
            modal_content.innerHTML = text;
            modal_label.innerHTML = label;
            modal.style.display = "block";
            runScript(modal_content);
        }
    }); 
  }

function loadMenu(){
    const data = new URLSearchParams();        
    data.append("email", localStorage.getItem("email"));
    data.append("pass", localStorage.getItem("pass"));
    const myRequest = new Request("ajax/load_menu.php",{
        method : "POST",
        body : data
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

    myPromisse.then((resolve)=>{

        if(resolve.trim() != ""){
            const menu_json = JSON.parse(resolve);

            localStorage.setItem("menu",menu_json);

            const sidebar = document.querySelector('.menu-bar');
            const ul =  document.createElement('ul');

            for(let i=0; i<menu_json.length; i++){
                console.log(menu_json[i]);

                const li =  document.createElement('li');
                const a =  document.createElement('a');
                a.href = "#"+menu_json[i][0];
                const icon = document.createElement('i');
                icon.className = menu_json[i][2];
                icon.innerHTML= " "+menu_json[i][0];
                const ul_sub = document.createElement('ul');
                ul_sub.className = "sub-menu";
                ul_sub.id = menu_json[i][0];
                for(let j=0; j<menu_json[i][3].length; j++){
                    const li_sub = document.createElement('li');
                    const a_sub = document.createElement('a');                        
                    const i_sub = document.createElement('i');
                    i_sub.className = menu_json[i][3][j][2];
                    i_sub.innerHTML = " "+menu_json[i][3][j][0];
                    a_sub.appendChild(i_sub);
                    a_sub.addEventListener('click',()=> openHTML(menu_json[i][3][j][1]) );
                    li_sub.appendChild(a_sub);
                    ul_sub.appendChild(li_sub);
                }            
                a.appendChild(icon);
                li.appendChild(a);
                li.appendChild(ul_sub );
                ul.appendChild(li);
            }
            sidebar.innerHTML = "";
            sidebar.appendChild(ul);
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

    const myRequest = new Request('ajax/ajax.php',{
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
