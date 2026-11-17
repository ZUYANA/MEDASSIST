document.addEventListener(

"DOMContentLoaded",

()=>{

const themeToggle=

document.getElementById(
"themeToggle"
);



let savedTheme=

localStorage.getItem(
"theme"
)

||

"light";



if(

savedTheme===

"dark"

){

document.body.classList.add(
"dark"
);

themeToggle.checked=true;

}


else{

document.body.classList.remove(
"dark"
);

themeToggle.checked=false;

}




themeToggle.addEventListener(

"change",

()=>{


if(

themeToggle.checked

){

document.body.classList.add(
"dark"
);


localStorage.setItem(

"theme",

"dark"

);

}


else{


document.body.classList.remove(
"dark"
);


localStorage.setItem(

"theme",

"light"

);

}


}

);


});