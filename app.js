const api_url ='http://api.weatherapi.com/v1/forecast.json?key=62ad42a7d2274a17b2c105634241111';
const form = document.querySelector('form');
const locationInput = document.querySelector('[data-location]');
const temperature = document.querySelector('[data-temperature]');
const temperatureText = document.querySelector('[data-temperature-text]');
const date = document.querySelector('[data-date]');
const img = document.querySelector('[data-image]');
const forecastContainer = document.querySelector('.app-card-bottom');

form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    getTheWeather();
});

const getTheWeather = async() => {
    const days = [];
    const otherDays = [];
    const location = locationInput.value;


    await fetch(`${api_url}&q=${location}&days=4&lang=fr`)
    .then(response => response.json())
    .then(({forecast, location})=>{
        forecast.forecastday.map(item =>{
          
            days.push({
                icon: item.day.condition.icon,
                text: item.day.condition.text,
                temp: Math.round(item.day.avgtemp_c),
                country: location.country,
                time: location.localtime.split(' ')[1],
                day: new Date(item.date).toLocaleDateString('fr-FR', {weekday: 'long'})
                
            });
        });

    })

    .catch(err => {
        console.error("Erreur API:", err);
    });

    // affichage data pour le premier jour
    const firstDate = days[0];

    //affichage data pour today
    temperature.innerHTML = `${firstDate.temp}°C`;
    temperatureText.innerHTML = firstDate.text;
    date.innerHTML = firstDate.country + ' - ' + firstDate.day + ', ' + firstDate.time;
    img.src = 'https://'+ firstDate.icon;//affichage de l'icon

    //affichage pour les 3 jours (y compris le premier)
    
    days.map((item, i) =>{
        if(i>0){
            otherDays.push(`
                <div class= 'day-item'>
                    <div>${item.day}</div>  
                    <img src ='https://${item.icon}' width= '60'>
                    <div data-temperature>
                        <span>${item.temp}</span><sup>°C</sup>
                    </div>
                    <div data-temperature-text>${item.text}</div>
                </div>`
            );
        }
    });

    forecastContainer.innerHTML = otherDays.join('');
    
}

getTheWeather();