let destinationBudget = document.getElementsByClassName("budget");
let destinationNames = document.getElementsByClassName("card-title");

const budgetArr = [];
const destinationArr = [];
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

// loop to grab information of each destination name and its budget
for (let i = 0; i < destinationBudget.length; i++) {
  budgetArr.push(parseInt(destinationBudget[i].innerHTML));
  totalBudget += parseInt(destinationBudget[i].innerHTML);
  destinationArr.push(destinationNames[i].innerHTML);
  colorArr.push(randomHexColor());
}

console.log(budgetArr);
console.log(destinationArr);
console.log(colorArr);
console.log(totalBudget);

const data = {
  labels: destinationArr,
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
            color: 'white',
            font: {
              size: 20
            }
        }
      },
      title: {
        display: true,
        text: "Trip Budget",
        padding: {
          top: 10,
          bottom: 30,
        },
        font: {
          size: 60,
        },
        color: "white",
      },
      subtitle: {
        display: true,
        text: `Total Budget: ${totalBudget}`,
        font: {
          size: 30,
        },
        color: "white",
      },
    },
  },
};

const myChart = new Chart(document.getElementById("budgetChart"), config);
