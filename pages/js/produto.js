
const btnNovo = document.getElementById("btnNovo");
const btnPesq = document.getElementById("btnPesq");
const edtBusca = document.getElementById('edtBusca');
const cmbBusca = document.getElementById('cmbBusca');
const table = document.querySelector('.search-table');


btnNovo.addEventListener("click", function(){
    openHTML("cad_prod.html","","Cadastro de Produto","modal");    
});

btnPesq.addEventListener("click", function(){

    table.innerHTML = 
    `<table>
    <th>Cod</th><th>Descrição</th><th>Und.</th><th>Qtd</th><th>Cod. Prod.</th><th>Forn</th><th>Preço</th>
    </table>`;

    const resp = queryDB("pesq_prod",[cmbBusca.value,edtBusca.value]);

    resp.then(result =>{
        let arr = JSON.parse(result);

        arr.forEach((item)=>{
            let row = document.createElement('tr');

            item.forEach((field,index)=>{
                let td = document.createElement('td');
                td.innerHTML = field.toUpperCase();
                if([0,8,9].includes(index)){
                    td.style.display = 'none';
                }
                row.appendChild(td);
            });

            table.appendChild(row);
        
        });

    });
    resp.catch(error =>{
        alert(error);
    });

});
