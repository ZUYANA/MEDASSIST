const profileBtn =
document.getElementById("profileBtn");

const profilePopup =
document.getElementById("profilePopup");

document.body.addEventListener(

"click",

()=>{

let unlock=new Audio(
"../static/sounds/reminder.mp3"
);

unlock.play();

unlock.pause();

},

{once:true}

);

profileBtn.onclick=()=>{

profilePopup.classList.toggle(
"active"
);


};


// CLOCK

function updateClock(){

let now=new Date();

clock.innerHTML=
now.toLocaleTimeString([],{
hour:"2-digit",
minute:"2-digit"
});

date.innerHTML=
now.toLocaleDateString([],{
weekday:"long",
month:"long",
day:"numeric"
});

}

updateClock();

setInterval(
updateClock,
1000
);




// POPUP

const popup=
document.getElementById(
"popupOverlay"
);

const medName=
document.getElementById(
"medName"
);

const medTime=
document.getElementById(
"medTime"
);

let editIndex=null;


// STORAGE

let medicines=
JSON.parse(
localStorage.getItem(
"medicines"
)
)
||
[];

let currentSound =
new Audio(
"../static/sounds/reminder.mp3"
);

currentSound.load();
let activeAlarms={};



function save(){

localStorage.setItem(
"medicines",
JSON.stringify(
medicines
)
);

updateStreak();
updateProgress();

}


// BADGE

function checkBadge(){

let streak=
parseInt(
localStorage.getItem(
"streak"
)
)||0;


let title="";
let msg="";


if(streak===3){

title="🔥 Starter";
msg="3 Days Complete!";

}

else if(streak===7){

title="🏅 Champion";
msg="7 Day Streak!";

}

else if(streak===30){

title="👑 Medicine Master";
msg="30 Days!";

}

else if(streak===100){

title="🚀 Legend";
msg="100 DAYS";

}


if(title){

badgeTitle.innerHTML=
title;

badgeText.innerHTML=
`${msg}<br><br>Keep Going 💊`;

badgePopup.style.display=
"block";


setTimeout(
closeBadge,
5000
);

}

}


function closeBadge(){

badgePopup.style.display=
"none";

}



// STREAK

function updateStreak(){

let streak=
parseInt(
localStorage.getItem(
"streak"
)
)||0;


streakCount.innerHTML=
`🔥 Streak: ${streak} days`;

}



// PROGRESS

function updateProgress(){

let total=
medicines.length;

let taken=
medicines.filter(
m=>m.taken
).length;


let percent=
total>0
?

Math.round(
(taken/total)*100
)

:

0;


progressBar.style.width=
percent+"%";


progressText.innerHTML=
`${taken}/${total} taken (${percent}%)`;

}



// RESET DAILY

function resetDaily(){

let today=
new Date()
.toDateString();


let lastReset=
localStorage.getItem(
"lastReset"
);


if(
lastReset!==today
){

let streak=
parseInt(
localStorage.getItem(
"streak"
)
)||0;


let allTaken=

medicines.length>0

&&

medicines.every(
m=>m.taken
);


if(
allTaken
){

streak++;

checkBadge();

}

else{

streak=0;

}


localStorage.setItem(
"streak",
streak
);


medicines.forEach(

med=>{

med.taken=false;

med.missed=false;

med.beepCount=0;

}

);


activeAlarms={};


localStorage.setItem(
"lastReset",
today
);


save();

renderMedicines();

updateProgress();

}

}



// POPUP

function attachPopup(){

let btn=
document.getElementById(
"openPopup"
);


if(btn){

btn.onclick=()=>{

editIndex=null;

medName.value="";
medTime.value="";

popup.classList.add(
"active"
);

};

}

}


cancelPopup.onclick=()=>{

popup.classList.remove(
"active"
);

};




// CAN TAKE

function canTake(time){

let now=
new Date();


let current=

String(
now.getHours()
).padStart(
2,
"0"
)

+

":"

+

String(
now.getMinutes()
).padStart(
2,
"0"
);


return current>=time;

}



function formatTime(time){

let hour=
parseInt(
time.split(":")[0]
);


let minute=
time.split(":")[1];


let ampm=

hour>=12

?

"PM"

:

"AM";


hour=
hour%12||12;


return `${hour}:${minute} ${ampm}`;

}



// RENDER

function renderMedicines(){

medicineWrapper.innerHTML=
"";


medicines.forEach(

(med,index)=>{


let short=
med.name
.substring(
0,
4
)
.toUpperCase();



medicineWrapper.innerHTML+=`

<div class="medicine-card">

<div class="card-top">

<div class="med-logo">

${short}

</div>

<div style="position:relative;">

<div
class="menu-btn"
onclick="toggleMenu(${index})"
>

⋮

</div>


<div
class="dropdown"
id="menu-${index}"
>

<button onclick="editMedicine(${index})">

Edit

</button>


<button onclick="deleteMedicine(${index})">

Delete

</button>

</div>

</div>

</div>


<div class="line"></div>

<h2>

${med.name}

</h2>

<div class="line"></div>

<p>

${formatTime(
med.time
)}

</p>

<div class="line"></div>


<button

class="taken-btn"

onclick="
markTaken(
${index}
)
"

${med.taken?"disabled":""}

>

${
med.missed
?
"Missed ❌"

:
med.taken
?
"Taken ✓"

:
canTake(med.time)
?
"Take"

:
"Waiting ⏳"
}

</button>

</div>

`;

});


medicineWrapper.innerHTML+=`

<div
class="add-card"
id="openPopup"
>

<span>+</span>

<p>

Add Medicine

</p>

</div>

`;


attachPopup();

}



renderMedicines();

updateProgress();

updateStreak();




// ADD

addMedicineBtn.onclick=()=>{

let name=
medName.value;

let time=
medTime.value;


if(
!name
||
!time
)

return;


if(editIndex!==null){

medicines[editIndex].name=name;
medicines[editIndex].time=time;

medicines[editIndex].taken=false;
medicines[editIndex].missed=false;
medicines[editIndex].beepCount=0;


/* clear old alarm */

if(activeAlarms[editIndex]){

clearInterval(
activeAlarms[editIndex]
);

delete activeAlarms[
editIndex
];

}


editIndex=null;

}
else{

medicines.push({

name,
time,

taken:false,

missed:false,

beepCount:0

});

}


save();

renderMedicines();

popup.classList.remove(
"active"
);

};



// EDIT
function editMedicine(index){

editIndex=index;

medName.value=
medicines[index].name;

medTime.value=
medicines[index].time;


/* RESET STATUS */


if(activeAlarms[editIndex]){

clearInterval(
activeAlarms[editIndex]
);

delete activeAlarms[editIndex];

}

/* CLEAR OLD ALARM */

if(activeAlarms[index]){

clearInterval(
activeAlarms[index]
);

delete activeAlarms[index];

}


save();

popup.classList.add(
"active"
);

}

// DELETE

function deleteMedicine(index){

medicines.splice(
index,
1
);


save();

renderMedicines();

}



// MENU

function toggleMenu(index){

document
.getElementById(
`menu-${index}`
)
.classList.toggle(
"show"
);

}



// TAKEN

function markTaken(index){

medicines[index].taken=true;

medicines[index].missed=false;

medicines[index].beepCount=0;
let streak=
parseInt(
localStorage.getItem(
"streak"
)
)||0;

let allTaken=
medicines.length>0
&&
medicines.every(
m=>m.taken
);

if(allTaken){
streak++;
checkBadge();
}
else{
streak=0;
}

localStorage.setItem(
"streak",
streak
);

/* STOP BEEP */

if(currentSound){

currentSound.pause();

currentSound.currentTime=0;

}


/* STOP ALARM LOOP */

if(activeAlarms[index]){

clearInterval(
activeAlarms[index]
);

delete activeAlarms[index];

}


save();

renderMedicines();

}


// NOTIFICATION

if(
Notification.permission
!=="granted"
){

Notification.requestPermission();

}



// ALARM
function playAlarm(){

currentSound.currentTime=0;

currentSound.play()
.catch(err=>
console.log(
"Audio blocked:",
err
)
);

setTimeout(()=>{

currentSound.pause();

currentSound.currentTime=0;

},

30000);

}

// CHECK EVERY 5 SEC
// CHECK EVERY 5 SEC

setInterval(()=>{

resetDaily();

let now=
new Date();


let currentMinutes=

now.getHours()*60+

now.getMinutes();



medicines.forEach(

(med,index)=>{


let medHour=

parseInt(
med.time.split(":")[0]
);


let medMin=

parseInt(
med.time.split(":")[1]
);


let medTotal=

medHour*60+

medMin;



if(

currentMinutes>=medTotal

&&

!med.taken

&&

!med.missed

&&

!activeAlarms[index]

){


if(
Notification.permission==="granted"
){

new Notification(

"💊 Medicine Reminder",

{

body:
`Take ${med.name}`

}

);

}


playAlarm();


med.beepCount=1;



activeAlarms[index]=

setInterval(()=>{


if(

medicines[index].taken

){

clearInterval(
activeAlarms[index]
);

delete activeAlarms[index];

return;

}



medicines[index]
.beepCount++;



if(

medicines[index]
.beepCount>=5

){

medicines[index]
.missed=true;


save();

renderMedicines();


clearInterval(
activeAlarms[index]
);

delete activeAlarms[index];

return;

}



playAlarm();


save();


},

60000

);



save();

renderMedicines();

}

}

);

},

5000);
function logout(){

window.location.href=

"login.html";

}

window.onload=()=>{

let name=

localStorage.getItem(
"userName"
);

let age=

localStorage.getItem(
"userAge"
);

let gender=

localStorage.getItem(
"userGender"
);



if(name){

profileBtn.innerHTML=
name;

}


if(
document.getElementById(
"profileName"
)
){

profileName.innerHTML=
name;


profileAge.innerHTML=
age;


profileGender.innerHTML=
gender;

}


};