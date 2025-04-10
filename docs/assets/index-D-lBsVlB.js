(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();const n="/iceland-trip/us.svg",c=e=>`
        <li class="stop-item">
            <div class="stop-content">
                <div class="stop-name">${e.name}</div>
                <div class="stop-links">
                    ${e.wikipedia?`<a href="${e.wikipedia}" target="_blank" class="wiki-link">📖 Wiki</a>`:'<span class="wiki-link-disabled">No Wiki</span>'}
                   | <a href="${e.googleMap}" target="_blank" class="map-link">📍 Map</a> 
                </div>
            </div>
        </li>
    `,l=e=>{const i=document.createElement("li");return i.classList.add("list-item"),i.innerHTML=`
    <h2 class="day-title">${e.date} - Day ${e.dayNum}</h2>
    <a href="${e.map}" target="_blank" class="directions">
      📍 Directions for the day
    </a>
    <ul class="stop-list">
      ${e.stops.map(s=>c(s)).join("")}
    </ul>
  `,i},d=async()=>{try{const e=await fetch("./trip.json");if(!e.ok)throw new Error(`Failed to fetch trip data: ${e.statusText}`);const i=await e.json();document.querySelector("#app").innerHTML=`
          <div>
            <a href="" target="">
              <img src="${n}" class="logo" alt="Iceland Map" />
            </a>
            <a href=""><h1 class="header">Iceland Trip</h1></a>
          </div>
        `;const s=document.createElement("ul");s.classList.add("list"),i.forEach(a=>{s.appendChild(l(a))}),document.querySelector("#app").appendChild(s)}catch(e){console.error(e)}};d();
