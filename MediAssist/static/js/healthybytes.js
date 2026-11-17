const healthyArticles = [
{
title:"Why Drinking Water Matters 💧",
desc:"Staying hydrated improves focus, energy and overall health.",
link:"https://www.healthline.com/nutrition/how-much-water-should-you-drink-per-day",
image:"/static/images/water.jpg"
},
{
title:"Benefits of Daily Walking 🚶",
desc:"Walking daily can improve heart health and reduce stress.",
link:"https://www.medicalnewstoday.com/articles/325509",
image:"/static/images/walking.jpg"
},
{
title:"Healthy Sleep Habits 😴",
desc:"Good sleep helps immunity, memory and mood balance.",
link:"https://www.sleepfoundation.org/sleep-hygiene",
image:"/static/images/sleep.jpg"
},
{
title:"Managing Stress Better 🌸",
desc:"Simple mindfulness techniques to reduce stress naturally.",
link:"https://www.helpguide.org/articles/stress/stress-management.htm",
image:"/static/images/stress.jpg"
}
];

const healthyContainer =
document.getElementById("healthyContainer");

function renderHealthyBytes(){

if(!healthyContainer) return;

healthyContainer.innerHTML="";

healthyArticles.forEach(article=>{

healthyContainer.innerHTML += `
<div class="healthy-card">

<img
src="${article.image}"
class="healthy-img"
alt="${article.title}"
>

<div class="healthy-content">

<h2>${article.title}</h2>

<p>${article.desc}</p>

<a
href="${article.link}"
target="_blank"
>
Read More →
</a>

</div>

</div>
`;

});

}

renderHealthyBytes();