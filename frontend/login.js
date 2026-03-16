async function login(){

const username = document.getElementById("username").value;
const password = document.getElementById("password").value;

const response = await fetch("http://localhost:5000/api/login",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
username:username,
password:password
})

});

const data = await response.json();

if(data.success){

alert("Login successful");

}else{

alert("Invalid login");

}

}