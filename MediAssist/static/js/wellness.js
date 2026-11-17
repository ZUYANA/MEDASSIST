
function loadWellness(){

let tips=[

{

title:"💧 Hydration",

text:
"Drink water early in the day and keep sipping instead of waiting until thirsty."

},

{

title:"😴 Sleep",

text:
"7–9 hours sleep improves focus, energy and mood."

},

{

title:"🥗 Food",

text:
"Add fruits, vegetables and more fibre to meals today."

},

{

title:"🚶 Move",

text:
"Even 15 min walking helps circulation and mood."

},

{

title:"🧠 Mind",

text:
"Reduce screen time before sleep."

}

];


let day=
new Date().getDate();


let tip1=
tips[
day%
tips.length
];


let tip2=
tips[
(day+2)
%
tips.length
];


document.getElementById(
"wellnessCards"
).innerHTML=`

<div class="wellness-card">

<h2>
${tip1.title}
</h2>

<p>

${tip1.text}

</p>

</div>


<div class="wellness-card">

<h2>
${tip2.title}
</h2>

<p>

${tip2.text}

</p>

</div>

`;

}


loadWellness();