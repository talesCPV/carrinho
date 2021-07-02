loadMenu();

var modal = document.getElementById("myModal");
var modal_title = document.getElementById("modal-title");
var modal_text = document.querySelector(".modal-text");
var btnClose = document.querySelector(".close");
var flag = false;

// CLOSE MODAL
btnClose.addEventListener('click',()=>{
    modal.style.display = "none";
})


const d = new Date();
document.querySelector('.footer').innerHTML =  `Caçapava, ${('0' + d.getDate()).slice(-2) }/${('0' + (d.getMonth() + 1)).slice(-2) }/${d.getFullYear()} `  ;
document.querySelector('.data-user').innerHTML = localStorage.getItem("nome") +  '<a href="#" onclick="logout_here()"> <i class="fa fa-power-off" aria-hidden="true"></i></a>';
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

  function openHTML(template,where="window",label){    
      console.log(template) 
    fetch( "templates/"+template)
    .then( stream => stream.text() )
    .then( text => {
                
        if(where == "window"){
            const main = document.querySelector(".screen");
            main.innerHTML = text;
            let script = main.getElementsByTagName('script');
            eval(script[0].innerHTML);
        }else{
            modal_text.innerHTML = text;
            modal_title.innerHTML = label;
            modal.style.display = "block";
            let script = modal_text.getElementsByTagName('script');
            eval(script[0].innerHTML);
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
            const logout = document.createElement('div');
            logout.innerHTML = "<div class='logout'><li><a href='#'> <i class='fa fa-power-off' aria-hidden='true'> Logout</i></a></li></div>";
            ul.appendChild(logout);
            sidebar.innerHTML = "";
            sidebar.appendChild(ul);

            const btnLogout = document.querySelector(".logout");
            btnLogout.addEventListener('click',(event)=>{
                event.preventDefault;
                logout_here();
            })            
        }        

    });

}

function logout_here(){
    localStorage.clear();
    window.open("login.html","_self")  
}



// *********    AJAX FUNCTION    **********    

function queryDB(data){        

//  data =  new URLSearchParams();

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
function fillCmb(select, valor, table, field1, field2=field1, where=""){
    const query = `SELECT ${field1}, ${field2} FROM ${table} ${where}`;
    const data = new URLSearchParams();
    data.append('query', query);
    const resp = queryDB(data);
    resp.then((result)=>{
        let arr = JSON.parse(result);
        arr.forEach((item)=>{
            let op = document.createElement('option');
            op.innerHTML = item[field2].toUpperCase();
            op.value = item[field1];            
//            console.log(item['nome'].trim() + ' - ' + valor.trim())
            if(item['nome'].trim() == valor.trim()){
                op.selected = true;
            }
            select.appendChild(op);        
        });    
    })     
}

function fillCmbTxt(select,valor ,path){

    const data = new URLSearchParams();
    data.append('path', path);

    const myRequest = new Request('ajax/load_files.php',{
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
//        return myPromisse;
    myPromisse.then((resolve)=>{

        const arr = resolve.split('\n');
        arr.forEach((item)=>{
            let op = document.createElement('option');
            op.innerHTML = item.toUpperCase();
            op.value = item.toUpperCase();
            if(item.trim() == valor.trim()){
                op.selected = true;
            }            
            select.appendChild(op);        
        });    
    })
}