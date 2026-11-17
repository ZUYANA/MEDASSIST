const questionContainer =
document.getElementById(
"questionContainer"
);

const openCheckin =
document.getElementById(
"openCheckin"
);



const questions=[

{
q:"How are you feeling today? 🌸",

options:[

["😊 Really good",10],
["🙂 Fine",7],
["😕 boring",4],
["😞 Bad",1]

]

},

{

q:"Did you talk to someone today? 💬",

options:[

["🥰 Yussss",10],
["🙂 A little",7],
["😶 Hardly",4],
["😔 No",1]

]

},

{

q:"How was your sleep? 😴",

options:[

["✨ Amazing",10],
["🙂 Okay",7],
["😔 Bad",4],
["😭Terrible",1]

]

},

{

q:"Energy today? ⚡",

options:[

["😁 Hyper",10],
["😊 Fine",7],
["😩 Tired",4],
[" Empty",1]

]

},

{

q:"Did you eat properly? 🍜",

options:[

["🍲 Yes",10],
["🙂 Mostly",7],
["😬 Skipped",4],
["😭 No",1]

]

},

{

q:"Feeling stressed? 🧠",

options:[

["😌 Calm",10],
["🙂 Little",7],
["😣 A lot",4],
[" 🤯Overwhelmed",1]

]

},

{

q:"Did something make you smile today? 🌻",

options:[

["😁Yes",10],
["🙂 Maybe",7],
["😕 Not much",4],
["😔 No",1]

]

},

{

q:"Did you feel lonely? 💗",

options:[

["😊 Not lonely",10],
["🙂 Slightly",7],
["😔 Lonely",4],
["😭 Very",1]

]

},

{

q:"Water intake today? 💧",

options:[

["💙 Enough",10],
["🙂 Some",7],
["😬 Little",4],
["😭 None",1]

]

},

{

q:"Overall vibe today? 🌙",

options:[

["✨ Amazing",10],
["🌤️ Okay",7],
["🌧️ Rough",4],
["⛈️ Horrible",1]

]

}

];


let current=0;

let score=0;



function showQuestion(){

let q=
questions[current];


let html=`

<div class="question-box">


<button
class="cancel-checkin"

onclick="closeCheckin()"
>

✕

</button>


<h2>

${q.q}

</h2>


<div class="options">

`;


q.options.forEach(

option=>{

html+=`

<button

class="option"

onclick="answerQuestion(${option[1]})"

>

${option[0]}

</button>

`;

}


);


html+=`

</div>


<p>

Question

${current+1}

/

${questions.length}

</p>


</div>

`;


questionContainer.innerHTML=

html;

}

function answerQuestion(points){

score+=points;

current++;



if(

current<questions.length

){

showQuestion();

}


else{

showResult();

}

}



function showResult(){


let percent=

Math.round(

(score/100)

*100

);



let mood="";

let advice="";



if(percent>=80){

mood=

"🌞 Excellent";


advice=

"You're doing really well today 💛";

}


else if(percent>=60){

mood=

"🌤️ Good";


advice=

"Take breaks and keep caring for yourself";

}


else if(percent>=40){

mood=

"🌧️ Low";


advice=

"Rest. Drink water. Slow down a little";

}


else{

mood=

"🌑 Difficult";


advice=

"Today feels heavy. Be gentle with yourself";

}



localStorage.setItem(

"todayWellness",

JSON.stringify({

date:

new Date()
.toDateString(),

score:

percent

})

);
let days=[

"Sun",
"Mon",
"Tue",
"Wed",
"Thu",
"Fri",
"Sat"

];


let today=

days[
new Date()
.getDay()
];


let weekly=

JSON.parse(

localStorage.getItem(
"weeklyMood"
)

)

||

{};


weekly[today]=
percent;


localStorage.setItem(

"weeklyMood",

JSON.stringify(
weekly
)

);

questionContainer.innerHTML=

`

<div class="result-box">

<h1>

${percent}%

</h1>


<h2>

${mood}

</h2>


<p>

${advice}

</p>


<button

onclick="

restartCheckin()

"

>

Retry 🌸

</button>


</div>

`;

}



function restartCheckin(){

current=0;

score=0;

showQuestion();

}



if(openCheckin){

openCheckin.onclick=()=>{


current=0;

score=0;


questionContainer.style.display=

"block";


showQuestion();

};

}
function closeCheckin(){

questionContainer.style.display=

"none";


questionContainer.innerHTML=

"";


current=0;

score=0;

}


function saveMood(score){

let history=

JSON.parse(

localStorage.getItem(
"moodHistory"
)

)

||

[];


history.push({

date:

new Date()

.toLocaleDateString(),

score

});


if(

history.length>7

){

history.shift();

}


localStorage.setItem(

"moodHistory",

JSON.stringify(
history
)

);

}
