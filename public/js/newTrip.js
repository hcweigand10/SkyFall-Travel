const now = moment();
let stopsCount = 1;
let stops = [];

const tripFormHandler = async function (event) {
  event.stopImmediatePropagation();
  let tripId;
  stops = [];
  const name = document.querySelector("#name").value.trim();
  const start_date = document.querySelector("#start-date").value;
  const end_date = document.querySelector("#end-date").value;
  if (moment(start_date).isBefore(moment().format("YYYY-MM-DD"))) {
    alert("Invalid Trip Start Date");
    return;
  } else if (moment(end_date).isBefore(moment(start_date))) {
    alert("Invalid Trip End Date");
    return;
  } else if (!name) {
    alert("Missing Trip Name");
  }
  let budget = 0;
  // for loop for each additional stop
  const stopForms = document.querySelectorAll(".form-group-stop");
  let i = 0;
  stopForms.forEach(element => {
    i++;
    const stopObj = {
      name: element.children[1].value.trim(),
      start_date: element.children[3].value,
      end_date: element.children[5].value,
      budget: parseInt(element.children[8].value)
    }
    console.log(stopObj)
    console.log(start_date)
    if (!stopObj.name) {
      alert(`Missing name on Stop #${i}`);
      return;
    }
    // checking for valid dates (not before end date of prior stop or before main arrival)
    if (i == 1) {
      if (
        moment(stopObj.start_date).isBefore(moment(start_date)) ||
        moment(end_date).isBefore(stopObj.start_date)
      ) {
        alert(`Invalid Start Date on Stop #${i}`);
        return;
      } else if (
        moment(stopObj.end_date).isBefore(moment(stopObj.start_date)) ||
        moment(end_date).isBefore(stopObj.end_date)
      ) {
        alert(`Invalid End Date on Stop #${i}`);
        return;
      }
    } else {
      if (
        moment(stopObj.start_date).isBefore(moment(stops[i - 2].end_date)) ||
        moment(end_date).isBefore(stopObj.start_date)
      ) {
        alert(`Invalid Start Date on Stop #${i}`);
        return;
      } else if (
        moment(stopObj.end_date).isBefore(moment(stopObj.start_date)) ||
        moment(end_date).isBefore(stopObj.end_date)
      ) {
        alert(`Invalid End Date on Stop #${i}`);
        return;
      }
    }
    budget += stopObj.budget;
    stops.push(stopObj);
  })

  await fetch("/api/trip/new", {
    method: "POST",
    body: JSON.stringify({
      name,
      start_date,
      end_date,
      budget,
      stops
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
  $("#stops").append(
    `<div class="form-group-stop" id="stop-${stopsCount}">
    <label for="stop-name">Stop:</label>
    <input type="text" id="stop-name-${stopsCount}"></input>

    <label for="start-date">Start Date:</label>
    <input type="date" id="start-date-${stopsCount}"></input>

    <label for="end-date">End Date:</label>
    <input type="date" id="end-date-${stopsCount}"></input>

    <label for="budget">Budget:</label>
    <span>$</span>
    <input type="number" id="budget-${stopsCount}" value="0"></input>
    <span>.00</span>
    <button class="btn btn-danger btn-sm" onclick="deleteStop(${stopsCount})">Delete</button>
</div>`
  );
});

const deleteStop = (count) => {
  stopsCount--;
  $(`#stop-${count}`).remove();
};

$("#create-trip-button").on("click", tripFormHandler);
