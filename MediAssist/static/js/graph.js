const graphBtn =
document.getElementById(
"toggleGraph"
);

const graph =
document.getElementById(
"graphContainer"
);


graphBtn.onclick=()=>{

graph.style.display=

graph.style.display==="block"

?

"none"

:

"block";



let data=

JSON.parse(

localStorage.getItem(
"weeklyMood"
)

)

||

{};



let days=[

"Mon",
"Tue",
"Wed",
"Thu",
"Fri",
"Sat",
"Sun"

];


days.forEach(day=>{

let bar=

document.getElementById(
day.toLowerCase()
);

let score=

data[day]

||

0;



bar.style.height=

score*2+"px";



bar.innerHTML=

score>0

?

`${score}%`

:

"";



bar.onclick=()=>{

alert(

day+

"\nWellness: "

+

score

+

"%"

);

};

});

};