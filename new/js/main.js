loadMenu();

var flag = false;

let btnTeste = document.getElementById('btnTeste');



function OpenTeste(N){

    alert(N);

}

const d = new Date();
document.querySelector('.footer').innerHTML =  `Caçapava, ${d.getDate()}/${d.getMonth()}/${d.getFullYear()} `  ;
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
            
//            runScript(main);
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
            a_sub.addEventListener('click',()=>{
                openHTML(menu_json[i][3][j][1])
            });


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