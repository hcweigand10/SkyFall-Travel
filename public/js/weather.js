
  window.onload = async function(){
      console.log('In weatherGetter =====================')
    const cityList = $("[data-city]");
  
    console.log(cityList)
    for(let i = 0; i < cityList.length; i++){
        const city = cityList[i].dataset.city;
    fetch(`/weather/${city}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((response) => response.json()).then(response =>{
    console.log('--------------------')
    console.log(response);
    let header = document.createElement('h5');
    header.className = 'card-title'
    cityList[i].appendChild(header);
    cityList[i].appendChild(createWeatherWidget(response));
    });
    }
  };


//Adds icons based on the contents of the description that is passed in
function addIcons(day, description){
  console.log(day)
  let image = document.createElement('img');
  image.classList = ("card-img-top");
  if (description.includes('lightening')|| description.includes('thunder')) {
    image.src = "../assets/storm.png"
  } else if (description.includes('rain')) {
    image.src = "../assets/rain.png"
  } else if (description.includes('wind')) {
    image.src = "../assets/windIcon.png"
  } else if (description.includes('snow')|| description.includes('freezing')|| description.includes('sleet') ||  description.includes('flurries')) {
    image.src = "../assets/snow.png"
  } else if (description.includes('cloud') || description.includes('overcast')|| description.includes('fog')) {
    image.src = "../assets/fog.png"
  }
  else {
    image.src = "../assets/sunny.png"
  }
  day.appendChild(image);
  console.log(day)
  return day;
}

//Creates the weather cards with the date, location, icons, and any data.
function createWeatherWidget(data){
  let weatherData = document.createElement('div');
  addIcons(weatherData, data['description']);
  weatherData.className += ("col card weather-card")
  let cardBody = document.createElement('div');
  cardBody.className = 'card-body';
  let cardText = document.createElement('p');
  cardText.className = 'card-text';
  cardText.innerHTML= (`Current Temp:  ${data['curTemp']}°F <br>${data['condition']}`);
  cardText.style.color = 'black';
  cardBody.appendChild(cardText);
  weatherData.appendChild(cardBody);
  weatherData.classList.add('row');
  return weatherData;
}