const tripFormHandler = async function(event) {
  console.log('In handler');

    event.stopImmediatePropagation();
    console.log('In handler');


    const name = document.querySelector('.name').value;
    const destination_name = document.querySelector('.destination-name').value;
    const date_arrival = document.querySelector('.date-arrival').value;
    const date_leaving = document.querySelector('.date-leaving').value;
    const flight_price = document.querySelector('.flight-price').value;
    const food_price = document.querySelector('.food-price').value;
    const lodging_price = document.querySelector('.lodging-price').value;
    const extra_expenditure = document.querySelector('.extras-list').value;
    const newTrip =  await fetch('/api/trip', {
        method: 'POST',
        body: JSON.stringify({
          name,
          destination_name,
          date_arrival,
          date_leaving,
          flight_price,
          food_price,
          lodging_price,
          extra_expenditure
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      document.location.reload();
    }

console.log('getting button');
document.querySelector('.create-trip-button').addEventListener('click', tripFormHandler);
  