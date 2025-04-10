(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function s(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(t){if(t.ep)return;t.ep=!0;const i=s(t);fetch(t.href,i)}})();const c="/iceland-trip/us.svg",n="/iceland-trip/map.svg",l="/iceland-trip/wiki.svg",d=e=>`
        <li class="stop-item">
            <div class="stop-content">
                <div class="stop-name">${e.name}</div>
                <div class="stop-links">
                    ${e.wikipedia?`<a href="${e.wikipedia}" target="_blank" class="wiki-link"> <img src="${l}" class="icon" alt="wiki Icon" /></a>`:'<span class="wiki-link-disabled">No Wiki</span>'}
                   | <a href="${e.googleMap}" target="_blank" class="map-link"> <img src="${n}" class="icon" alt="map Icon" /></a> 
                </div>
            </div>
        </li>
    `,p=e=>{const r=document.createElement("li");return r.classList.add("list-item"),r.innerHTML=`
    <h2 class="day-title">${e.date} - Day ${e.dayNum}</h2>
    <a href="${e.map}" target="_blank" class="directions">
      📍 Directions for the day
    </a>
    <ul class="stop-list">
      ${e.stops.map(s=>d(s)).join("")}
    </ul>
  `,r},u=async()=>{try{const e=await fetch("./trip.json");if(!e.ok)throw new Error(`Failed to fetch trip data: ${e.statusText}`);const r=await e.json();document.querySelector("#app").innerHTML=`
          <div>
            <a href="" target="">
              <img src="${c}" class="logo" alt="Iceland Map" />
            </a>
            <a href=""><h1 class="header">Iceland Trip</h1></a>
          </div>
        `;const s=document.createElement("ul");s.classList.add("list"),r.forEach(a=>{s.appendChild(p(a))}),document.querySelector("#app").appendChild(s)}catch(e){console.error(e)}};u();
