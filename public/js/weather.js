
  window.onload = async function(){
      console.log('In weatherGetter =====================')
    const cityList = document.querySelectorAll("[data-city]");
    console.log(cityList)
    for(let i = 0; i < cityList.length; i++){
        const city = cityList[i].dataset.city;
        console.log(cityList[i].dataset.city)
    const response = await fetch(`/weather/${city}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    cityList[i].appendChild(createWeatherWidget(response));
    }

  };


//Adds icons based on the contents of the description that is passed in
function addIcons(day, description){
  if (description.includes('lightening')|| description.includes('thunder')) {
      day.addClass('fa-bolt');
  } else if (description.includes('rain')) {
      day.addClass('fa-cloud-rain');
  } else if (description.includes('wind')) {
      day.addClass('fa-wind');
  } else if (description.includes('snow')|| description.includes('freezing')) {
      day.addClass('fa-snowflake');
  } else if (description.includes('cloud') || description.includes('overcast')) {
     day.addClass('fa-cloud');
   }
  else {
      day.addClass('fa-sun');
  }
}

//Creates the weather cards with the date, location, icons, and any data.
function createWeatherWidget(data){
  console.log("In widget creator");
  console.log(data);
  let weatherData = document.createElement('div');
  weatherData.appendChild('<br>' +  '<p class="text">'+ moment().format('LL') + '</p>');
  weatherData.append('Temp: '+ data['curTemp'] + ' °F<br>');
  weatherData.append('<p'+ data['description'] + '</p>');
  weatherData.classList.add('row');
  addIcons(weatherData, data['description']);
  return weatherData;
}