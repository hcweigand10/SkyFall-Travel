let stopBudget = document.getElementsByClassName("budget");
let stopNames = document.getElementsByClassName("stopName");

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
console.log(stopNames);
if(stopNames.length < 2) {

  const accomodation = document.getElementsByClassName("accomodation");
  const travel_costs = document.getElementsByClassName("travel_costs");
  const food_entertainment = document.getElementsByClassName("food_entertainment");
  const other = document.getElementsByClassName("other");

  const colorArr = [];

  for (let i = 0; i < 4; i++) {
    colorArr.push(randomHexColor());
  }

  console.log(accomodation[0].value)
  const xdata = {
    labels: ['Acommodations', 'Travel Costs', 'Food/Enterntainment', 'Other'],
    datasets: [
      {
        label: "My First Dataset",
        data: [parseInt(accomodation[0].value), parseInt(travel_costs[0].value), parseInt(food_entertainment[0].value), parseInt(other[0].value)],
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
          text: "Budget Breakdown",
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
