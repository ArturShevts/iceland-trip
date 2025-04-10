import tripData from "./trip.json";

const createDay = (day) => {
    const li = document.createElement("li");
    li.innerHTML = `
        <h2>${day.date} - Day ${day.dayNum}</h2>
        <a href="${day.map}" target="_blank">Map</a>
        <ul>
            ${day.stops.map(stop => createStop(stop)).join("")}
        </ul>
    `;
    return li;
};

const createStop = (stop) => {
    return `
        <li>
            ${stop.name} 
            <a href="${stop.googleMap}" target="_blank">Map</a> | 
            <a href="${stop.wikipedia || '#'}" target="_blank">${stop.wikipedia ? "Wiki" : "No Wiki"}</a>
        </li>
    `;
};

const renderTrip = () => {
    const ul = document.createElement("ul");
    tripData.forEach(day => {
        ul.appendChild(createDay(day));
    });
    document.body.appendChild(ul);
};

renderTrip();