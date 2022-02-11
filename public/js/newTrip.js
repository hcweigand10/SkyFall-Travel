
// const tripFormHandler = async function(event) {
//   event.stopImmediatePropagation();
//   const name = document.querySelector('.name').value;
//   const destination_name = document.querySelector('.destination-name').value;
//   const date_arrival = document.querySelector('.date-arrival').value;
//   const date_leaving = document.querySelector('.date-leaving').value;
//   const flight_price = document.querySelector('.flight-price').value;
//   const food_price = document.querySelector('.food-price').value;
//   const lodging_price = document.querySelector('.lodging-price').value;
//   let extra_expenditure_items = document.querySelector('.extras-list').getElementsByTagName('li');
//   extra_expenditure_items = Array.from(extra_expenditure_items);
//   const extra_expenditure = extra_expenditure_items.map(element => {
//     const extra_spending = {}
//     let liList = element.getElementsByTagName('input');
//     liList = Array.from(liList);
//     for(let i =0; i<liList.length; i++) {
//       if (i == 0){
//         extra_spending['name'] = liList[i].value;

//       }else if (i == 1){
//         extra_spending['event_type'] = liList[i].value;
//       }
//       else{
//         extra_spending['price'] = liList[i].value;
//       } 
//     }
//     return extra_spending;
//   });
  
//   await fetch('/api/trip', {
//       method: 'POST',
//       body: JSON.stringify({
//         name,
//         destination_name,
//         date_arrival,
//         date_leaving,
//         flight_price,
//         food_price,
//         lodging_price,
//         extra_expenditure
//       }),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });

// }
//   $('.additional-extra').on('click',function(){
//     $('.extras-list').append(`<li>
//         <label for="extras-price">Name:</label>
//         <input type="text"></input>
//         <label for="extras-price">Description:</label>
//         <input type="text"></input>
//         <label for="extras-price">Price:</label>
//         <input type="number"></input>
//     </li>`);
//   });
  
// $('.create-trip-button').on('click', tripFormHandler);

let destinationsCount = 1;
let destinations = [];

const tripFormHandler = async function(event) {
  event.stopImmediatePropagation();
  let tripId;
  const name = document.querySelector('#name').value;
  const date_arrival = document.querySelector('#date-arrival').value;
  const date_leaving = document.querySelector('#date-leaving').value;
  let budget = 0;
  for (let i = 1; i < destinationsCount+1; i++) {
    budget += parseInt(document.querySelector(`#budget-${i}`).value);
    const destinationObj = {
      name: document.querySelector(`#destination-name-${i}`).value,
      date_arrived: document.querySelector(`#date-arrival-${i}`).value,
      date_leaving: document.querySelector(`#date-leaving-${i}`).value,
      budget: parseInt(document.querySelector(`#budget-${i}`).value)
    }

    destinations.push(destinationObj)
  }
  
  await fetch('/api/trip/new', {
      method: 'POST',
      body: JSON.stringify({
        name,
        date_arrival,
        date_leaving,
        budget,
        destinations
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      return res.json()
    }).then((data)=> {
      console.log(data.id)
      tripId = data.id
    });
    
  location.href=`/dashboard/trip/${tripId}`;
};

  $("#additional-destination").on('click',function(){
    destinationsCount++;
    $('#destinations').append(
    `<div class="form-group">
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
</div>`);
  });
  
$('#create-trip-button').on('click', tripFormHandler);

