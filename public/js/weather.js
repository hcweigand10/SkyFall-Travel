
window.onload = getWeatherAndWidget();
async function getWeatherAndWidget(){
  const cityList = $("[data-city]");
  for(let i = 0; i < cityList.length; i++){
      const city = cityList[i].dataset.city;
      const path = "";
     if(cityList[i].classList.contains('accordion')){
      path = "/../..";
     }
      fetch(`/weather/${city}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((response) => response.json()).then(response =>{
      if(response.description){
        cityList[i].appendChild(createWeatherWidget(response,path));
      }else{
        cityList[i].appendChild(createFailedWidget());
      }
    });
  }
}
  
//Adds icons based on the contents of the description that is passed in
function addIcons(day, description, path){
  let image = document.createElement('img');
   image.classList = ("card-img-top");
  if (description.includes('lightening')|| description.includes('thunder')) {
    image.src = path + "/../assets/storm.png"
  } else if (description.includes('rain')) {
    image.src = path + "/../assets/raincloud.png"
  } else if (description.includes('wind')) {
    image.src = path + "/../assets/windIcon.png"
  } else if (description.includes('snow')|| description.includes('freezing')|| description.includes('sleet') ||  description.includes('flurries')) {
    image.src = path + "/../assets/snow.png"
  } else if (description.includes('cloud') || description.includes('overcast')) {
    image.src = path + "/../assets/cloud.png";
  } else if (description.includes('fog')) {
    image.src = path + "/../assets/fog.png"
  }
  else {
    image.src = path + "/../assets/sunny.png"
  }
  day.appendChild(image);
  return day;
}

//Creates the weather cards with the date, location, icons, and any data.
function createWeatherWidget(data, path){
  let weatherData = document.createElement('div');
  if(data.description){
    addIcons(weatherData, data['description'], path);
  }
  weatherData.className += ("col-sm-12 col-md-3 card weather-card");
  let cardBody = document.createElement('div');
  cardBody.className = 'card-body';
  let cardText = document.createElement('p');
  cardText.className = 'card-text';
  cardText.innerHTML= (`Current:  ${data['curTemp']}°F <br>${data['condition']}`);
  cardText.style.color = 'black';
  cardBody.appendChild(cardText);
  weatherData.appendChild(cardBody);
  weatherData.classList.add('row');
  return weatherData;
}


//Creates the weather cards with the date, location, icons, and any data.
function createFailedWidget(){
  let weatherData = document.createElement('div');
  let image = document.createElement('img');
  image.src = '/../../../assets/car.png'
  weatherData.appendChild(image);
  weatherData.className += ("col card weather-card")
  let cardBody = document.createElement('div');
  cardBody.className = 'card-body';
  let cardText = document.createElement('p');
  cardText.className = 'card-text';
  cardText.innerHTML= (`Change this stop's name for current weather!`);
  cardText.style.color = 'black';
  cardBody.appendChild(cardText);
  weatherData.appendChild(cardBody);
  weatherData.classList.add('row');
  return weatherData;
}
