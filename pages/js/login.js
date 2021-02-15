
const signinText = document.querySelector(".title-text .login");
const signinForm = document.querySelector("form.login");
const signinBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");
const signupForm = document.querySelector("form.signup");
const btnLogin = document.querySelector("#btnLogin");
const btnSignup = document.querySelector("#btnSignup");

const user = document.querySelector("#edtUser");
const pass = document.querySelector("#edtPass");
const newemail = document.querySelector("#edtNewMail");
const newpass = document.querySelector("#edtNewPass");
const newrepass = document.querySelector("#edtNewRepass");

signupBtn.onclick = (()=>{
	signinForm.style.marginLeft = "-50%";
	signinText.style.marginLeft = "-50%";
});
signinBtn.onclick = (()=>{
	signinForm.style.marginLeft = "0%";
	signinText.style.marginLeft = "0%";
	return false;
});



signinForm.addEventListener("submit",function(event){
	event.preventDefault();

	const resp = sendFetch('files/login.php');

    resp.then(result =>{
        let arr = JSON.parse(result);
        let status = arr[0];
        if (status === 200){
//            alert("Seja bem vindo "+resp[1]+" sua permissão é "+resp[2]);
			window.location.href = "main.php";
        }else{
            alert(arr[1]);
        }
       
    });
    resp.catch(error =>{
        alert(error);
    });

})

function sendFetch(url){

	const data = new URLSearchParams();
	data.append("edtUser", user.value);
	data.append("edtPass", pass.value);

	const myRequest = new Request(url,{
		method : "POST",
		body : data
	})

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