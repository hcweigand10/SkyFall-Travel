const now = moment();
let stopsCount = (document.querySelectorAll(".stop-form")).length;
let stops = [];
let stopBreakdowns = []
const updateId = parseInt(document.querySelector("#tripId").innerHTML);
console.log(updateId)

const tripFormHandler = async function (event) {
  event.stopImmediatePropagation();
  let valid = true;
  let tripId;
  stops = [];
  stopBreakdowns = [];
  const name = document.querySelector("#name").value.trim();
  const start_date = document.querySelector("#start-date-trip").value;
  const end_date = document.querySelector("#end-date-trip").value;
  if (
    !start_date ||
    moment(start_date).isBefore(moment().format("YYYY-MM-DD"))
  ) {
    alert("Invalid Trip Start Date");
    valid = false;
    return;
  } else if (!end_date || moment(end_date).isBefore(moment(start_date))) {
    alert("Invalid Trip End Date");
    valid = false;
    return;
  } else if (!name) {
    alert("Missing Trip Name");
    valid = false;
    return;
  }
  let tripBudget = 0;
  // for each loop for each additional stop
  const stopForms = document.querySelectorAll(".stop-form");
  let i = 0;
  stopForms.forEach((element) => {
    console.log(element);
    i++;
    // getting individual budget breakdowns
    const accomodation = parseInt(element.children[3].children[1].children[1].value);
    const travel_costs = parseInt(element.children[3].children[1].children[4].value);
    const food_entertainment = parseInt(element.children[4].children[1].children[1].value);
    const other = parseInt(element.children[4].children[1].children[4].value);
    const stopObj = {
      name: element.children[0].children[1].value.trim(),
      start_date: element.children[1].children[1].children[0].value,
      end_date: element.children[1].children[1].children[2].value,
      budget: accomodation + travel_costs + food_entertainment + other,
    };
    const expenditureObj = {
      accomodation,
      travel_costs,
      food_entertainment,
      other
    }
    console.log(stopObj);
    console.log(expenditureObj);
    if (!stopObj.name) {
      alert(`Missing name on Stop #${i}`);
      valid = false;
      return;
    }
    // checking for valid dates (not before end date of prior stop or before main arrival)
    if (i == 1) {
      if (
        moment(stopObj.start_date).isBefore(moment(start_date)) ||
        moment(end_date).isBefore(stopObj.start_date)
      ) {
        alert(`Invalid Start Date on Stop #${i}`);
        valid = false;
        return;
      } else if (
        moment(stopObj.end_date).isBefore(moment(stopObj.start_date)) ||
        moment(end_date).isBefore(stopObj.end_date)
      ) {
        alert(`Invalid End Date on Stop #${i}`);
        valid = false;
        return;
      }
    } else {
      if (
        moment(stopObj.start_date).isBefore(moment(stops[i - 2].end_date)) ||
        moment(end_date).isBefore(stopObj.start_date)
      ) {
        alert(`Invalid Start Date on Stop #${i}`);
        valid = false;
        return;
      } else if (
        moment(stopObj.end_date).isBefore(moment(stopObj.start_date)) ||
        moment(end_date).isBefore(stopObj.end_date)
      ) {
        alert(`Invalid End Date on Stop #${i}`);
        valid = false;
        return;
      }
    }
    tripBudget += stopObj.budget;
    stopBreakdowns.push(expenditureObj)
    stops.push(stopObj);
  });

  if (!valid) {
    return;
  }
  await fetch(`/api/trip/${updateId}`, {
    method: "PUT",
    body: JSON.stringify({
      name,
      start_date,
      end_date,
      budget: tripBudget,
      stops,
      stopBreakdowns
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data.id);
      tripId = data.id;
    });

  location.href = `/dashboard/trip/${updateId}`;
};


$("#update-trip-button").on("click", tripFormHandler);
