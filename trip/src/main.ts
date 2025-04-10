import './style.css'
import viteLogo from '/vite.svg'

type Stop = {
    name: string;
    googleMap: string;
    wikipedia: string | null;
};

type Day = {
    dayNum: number;
    date: string;
    map: string;
    stops: Stop[];
};

const createDay = (day: Day): HTMLLIElement => {
  const li = document.createElement("li");
  li.classList.add("list-item");
  li.innerHTML = `
    <h2>${day.date} - Day ${day.dayNum}</h2>
    <a href="${day.map}" target="_blank" class="directions">
      📍 Directions for the day
    </a>
    <ul class="list">
      ${day.stops.map(stop => createStop(stop)).join("")}
    </ul>
  `;
  return li;
};

const createStop = (stop: Stop): string => {
    return `
        <li>
            ${stop.name} 
            <a href="${stop.googleMap}" target="_blank">📍 Map</a> | 
            <a href="${stop.wikipedia || '#'}" target="_blank">${stop.wikipedia ? "📖 Wiki" : "No Wiki"}</a>
        </li>
    `;
};

const renderTrip = async (): Promise<void> => {
    try {
        const response = await fetch('./trip.json');
        if (!response.ok) {
            throw new Error(`Failed to fetch trip data: ${response.statusText}`);
        }
        const tripData: Day[] = await response.json();
        const ul = document.createElement("ul");
        tripData.forEach(day => {
            ul.appendChild(createDay(day));
        });
        document.body.appendChild(ul);
    } catch (error) {
        console.error(error);
    }
};

renderTrip();
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `

  <div>
    <a href="" target="">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
 
   <a href=""><h1>Iceland Trip</h1></a>
  
  </div>
`

