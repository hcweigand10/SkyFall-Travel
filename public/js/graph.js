let stopBudget = document.getElementsByClassName("budget");
let stopNames = document.getElementsByClassName("card-title");

const budgetArr = [];
const stopArr = [];
const colorArr = [];

function randomInteger(max) {
  return Math.floor(Math.random() * (max + 1));
}

function randomRgbColor() {
  let r = randomInteger(255);
  let g = randomInteger(255);
  let b = randomInteger(255);
  return [r, g, b];
}

function randomHexColor() {
  let [r, g, b] = randomRgbColor();

  let hr = r.toString(16).padStart(2, "0");
  let hg = g.toString(16).padStart(2, "0");
  let hb = b.toString(16).padStart(2, "0");

  return "#" + hr + hg + hb;
}
let totalBudget = 0;

// loop to grab information of each stop name and its budget
for (let i = 0; i < stopBudget.length; i++) {
  budgetArr.push(parseInt(stopBudget[i].innerHTML));
  totalBudget += parseInt(stopBudget[i].innerHTML);
  stopArr.push(stopNames[i].innerHTML);
  colorArr.push(randomHexColor());
}

console.log(budgetArr);
console.log(stopArr);
console.log(colorArr);
console.log(totalBudget);



const data = {
  labels: stopArr,
  datasets: [
    {
      label: "My First Dataset",
      data: budgetArr,
      backgroundColor: colorArr,
      hoverOffset: 4,
    },
  ],
};

const config = {
  type: "doughnut",
  data: data,
  options: {
    plugins: {
      legend: {
        display: true,
        labels: {
            color: 'whitesmoke',
            font: {
              size: 15
            }
        }
      },
      title: {
        display: true,
        text: "Trip Budget",
        padding: {
          top: 10,
          bottom: 10,
        },
        font: {
          size: 45,
        },
        color: "whitesmoke",
      },
      subtitle: {
        display: true,
        text: `Total Budget: ${totalBudget}`,
        font: {
          size: 25,
        },
        color: "white",
      },
    },
  },
};

if(stopNames.length < 2) {

  let category = document.getElementsByClassName("category");
  let price = document.getElementsByClassName("price");

  console.log(price);
  console.log(category);

  const eventArr = [];
  const priceArr = [];
  const colorArr = [];

  for (let i = 0; i < category.length; i++) {
    eventArr.push(category[i].value);
    priceArr.push(parseInt(price[i].value));
    colorArr.push(randomHexColor());
  }

  console.log(eventArr);
  console.log(priceArr)

  const xdata = {
    labels: eventArr,
    datasets: [
      {
        label: "My First Dataset",
        data: priceArr,
        backgroundColor: colorArr,
        hoverOffset: 4,
      },
    ],
  };
  
  const xconfig = {
    type: "doughnut",
    data: xdata,
    options: {
      plugins: {
        legend: {
          display: true,
          labels: {
              color: 'whitesmoke',
              font: {
                size: 15
              }
          }
        },
        title: {
          display: true,
          text: "Trip Budget",
          padding: {
            top: 10,
            bottom: 10,
          },
          font: {
            size: 45,
          },
          color: "whitesmoke",
        },
      },
    },
  };

  const myChart = new Chart(document.getElementById("budgetChart"), xconfig);
} else {
  const myChart = new Chart(document.getElementById("budgetChart"), config);
}
// const myChart = new Chart(document.getElementById("budgetChart"), config);
