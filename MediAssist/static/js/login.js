loginBtn.onclick=()=>{

let name=

document.getElementById(
"name"
).value;


let age=

document.getElementById(
"age"
).value;


let gender=

document.getElementById(
"gender"
).value;



if(

!name

||

!age

||

gender==="Select Gender"

)

return alert(

"Fill everything 😭"

);



localStorage.setItem(

"userName",

name

);


localStorage.setItem(

"userAge",

age

);


localStorage.setItem(

"userGender",

gender

);



window.location.href=

"dashboard.html";

};