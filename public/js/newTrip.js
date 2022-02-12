const now = moment();
let destinationsCount = 1;
let destinations = [];

const tripFormHandler = async function (event) {
  event.stopImmediatePropagation();
  let tripId;
  destinations = [];
  const name = document.querySelector("#name").value.trim();
  const date_arrival = document.querySelector("#date-arrival").value;
  const date_leaving = document.querySelector("#date-leaving").value;
  if (moment(date_arrival).isBefore(moment().format("YYYY-MM-DD"))) {
    alert("Invalid Trip Arrival Date");
    return;
  } else if (moment(date_leaving).isBefore(moment(date_arrival))) {
    alert("Invalid Trip Departure Date");
    return;
  } else if (!name) {
    alert("Missing Trip Name");
  }
  let budget = 0;
  console.log(destinationsCount);
  // for loop for each additional destination
  for (let i = 1; i < destinationsCount + 1; i++) {
    console.log(i);
    budget += parseInt(document.querySelector(`#budget-${i}`).value);
    const destinationObj = {
      name: document.querySelector(`#destination-name-${i}`).value.trim(),
      date_arrived: document.querySelector(`#date-arrival-${i}`).value,
      date_leaving: document.querySelector(`#date-leaving-${i}`).value,
      budget: parseInt(document.querySelector(`#budget-${i}`).value),
    };
    if (!destinationObj.name) {
      alert(`Missing name on Destination #${i}`);
      return;
    }
    // checking for valid dates (not before departure date of prior destination or before main arrival)
    if (i == 1) {
      if (
        moment(destinationObj.date_arrived).isBefore(moment(date_arrival)) ||
        moment(date_leaving).isBefore(destinationObj.date_arrived)
      ) {
        alert(`Invalid Arrival Date on Destination #${i}`);
        return;
      } else if (
        moment(destinationObj.date_leaving).isBefore(moment(destinationObj.date_arrived)) ||
        moment(date_leaving).isBefore(destinationObj.date_leaving)
      ) {
        alert(`Invalid Departure Date on Destination #${i}`);
        return;
      }
    } else {
      if (
        moment(destinationObj.date_arrived).isBefore(moment(destinations[i - 2].date_leaving)) ||
        moment(date_leaving).isBefore(destinationObj.date_arrived)
      ) {
        alert(`Invalid Arrival Date on Destination #${i}`);
        return;
      } else if (
        moment(destinationObj.date_leaving).isBefore(moment(destinationObj.date_arrived)) ||
        moment(date_leaving).isBefore(destinationObj.date_leaving)
      ) {
        alert(`Invalid Departure Date on Destination #${i}`);
        return;
      }
    }
    destinations.push(destinationObj);
  }

  await fetch("/api/trip/new", {
    method: "POST",
    body: JSON.stringify({
      name,
      date_arrival,
      date_leaving,
      budget,
      destinations,
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

$("#additional-destination").on("click", function () {
  destinationsCount++;
  $("#destinations").append(
    `<div class="form-group" id="destination-${destinationsCount}">
    <label for="destination-name">Destination:</label>
    <input type="text" id="destination-name-${destinationsCount}"></input>

    <label for="date-arrival">Arrival Date:</label>
    <input type="date" id="date-arrival-${destinationsCount}"></input>

    <label for="date-leaving">Departure Date:</label>
    <input type="date" id="date-leaving-${destinationsCount}"></input>

    <label for="budget">Budget:</label>
    <span>$</span>
    <input type="number" id="budget-${destinationsCount}"></input>
    <span>.00</span>
    <button class="btn btn-danger btn-sm" onclick="deleteDestination(${destinationsCount})">Delete</button>
</div>`
  );
});

const deleteDestination = (count) => {
  $(`#destination-${count}`).remove();
};

$("#create-trip-button").on("click", tripFormHandler);
