const now = moment();
let stopsCount=1;
let stops = [];
let stopBreakdowns = []

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
  console.log(stopForms)
  let i = 0;
  stopForms.forEach((element) => {
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
  console.log(stops);
  await fetch("/api/trip", {
    method: "POST",
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

  location.href = `/dashboard/trip/${tripId}`;
};

$("#additional-stop").on("click", function () {
  stopsCount++;
  console.log(stopsCount)
  $("#stops").append(
    `<br>
    <hr>
    <div id="stop-${stopsCount}" class="stop-form">
      <div class="form-group">
        <div class="row">
          <label for="stop-name" style="font-size: 24px">
            Stop:
          </label>
          <div class="col-7"></div>
          <button class="btn btn-danger" style="font-size: 14px; height: 36px;" id="delete-${stopsCount}" onclick="deleteStop(${stopsCount})">Delete Stop</button>
        </div>
        <input
          type="text"
          id="stop-name-${stopsCount}"
          class="form-control row item col-12"
        ></input>
      </div>
      <div class="form-group">
        <div class="row">
          <label for="start-date-${stopsCount}" class="col-5">
            Start Date:
          </label>
          <div class="col-1"></div>
          <label for="end-date-${stopsCount}" class="col-5">
            End Date:
          </label>
        </div>
        <div class="row justify-content-space-between">
          <input
            type="date"
            id="start-date-${stopsCount}"
            class="form-control item col-5"
          ></input>
          <div class="col-1"></div>
          <input
            type="date"
            id="end-date-${stopsCount}"
            class="form-control item col-5"
          ></input>
        </div>
      </div>
      <label for="budget-${stopsCount}">Budget Breakdown:</label>

      <div class="form-group">
          <div class="row">
              <label for="accomodation-${stopsCount}}" class="col-5" style="font-size: 16px;">Accomodation:</label>
              <div class="col-1"></div>
              <label for="travel-costs-${stopsCount}}" class="col-5" style="font-size: 16px;">Travel Costs:</label>
          </div>
          <div class="row justify-content-space-between">
              <span>$</span><input type="number" id="accomodation-${stopsCount}}" class="form-control item col-5" value=0></input>
              <div class="col-1"></div>
              <span>$</span><input type="number" id="travel-costs-${stopsCount}}" class="form-control item col-5" value=0></input>
          </div>
      </div>
      <div class="form-group">
          <div class="row">
              <label for="food-${stopsCount}}" class="col-5" style="font-size: 16px;">Food/Entertainment:</label>
              <div class="col-1"></div>
              <label for="other-${stopsCount}}" class="col-5" style="font-size: 16px;">Other:</label>
          </div>
          <div class="row justify-content-space-between">
              <span>$</span><input type="number" id="food-${stopsCount}}" class="form-control item col-5" value=0></input>
              <div class="col-1"></div>
              <span>$</span><input type="number" id="other-${stopsCount}}" class="form-control item col-5" value=0></input>
          </div>
      </div>
    </div>`
  );
});

const deleteStop = (id) => {
  stopsCount--;
  $(`#stop-${id}`).remove();
};

$("#create-trip-button").on("click", tripFormHandler);
