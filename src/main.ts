import './style.css'
import viteLogo from '/us.svg'
import mapIcon from '/map.svg'
import  wikiIcon from '/wiki.svg'

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

const createStop = (stop: Stop): string => {
    return `
        <li class="stop-item">
            <div class="stop-content">
                <div class="stop-name">${stop.name}</div>
                <div class="stop-links">
                    ${stop.wikipedia
                        ? `<a href="${stop.wikipedia}" target="_blank" class="wiki-link"> <img src="${wikiIcon}" class="icon" alt="wiki Icon" /></a>`
                        : `<span class="wiki-link-disabled">No Wiki</span>`}
                   | <a href="${stop.googleMap}" target="_blank" class="map-link"> <img src="${mapIcon}" class="icon" alt="map Icon" /></a> 
                </div>
            </div>
        </li>
    `;
};

const createDay = (day: Day): HTMLLIElement => {
  const li = document.createElement("li");
  li.classList.add("list-item");
  li.innerHTML = `
    <h2 class="day-title">${day.date} - Day ${day.dayNum}</h2>
    <a href="${day.map}" target="_blank" class="directions">
      📍 Directions for the day
    </a>
    <ul class="stop-list">
      ${day.stops.map(stop => createStop(stop)).join("")}
    </ul>
  `;
  return li;
};

const renderTrip = async (): Promise<void> => {
    try {
        const response = await fetch('./trip.json');
        if (!response.ok) {
            throw new Error(`Failed to fetch trip data: ${response.statusText}`);
        }
        const tripData: Day[] = await response.json();

        // Set up header content
        document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
          <div>
            <a href="" target="">
              <img src="${viteLogo}" class="logo" alt="Iceland Map" />
            </a>
            <a href=""><h1 class="header">Iceland Trip</h1></a>
          </div>
        `;

        // Create and append the trip days list
        const ul = document.createElement("ul");
        ul.classList.add("list");
        tripData.forEach(day => {
            ul.appendChild(createDay(day));
        });

        document.querySelector('#app')!.appendChild(ul);
    } catch (error) {
        console.error(error);
    }
};

renderTrip();