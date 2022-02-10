const tripFormHandler = async function(event) {
    event.preventDefault();
  
    const name = document.querySelector('input[name="trip-name"]').value;
    const location_name = document.querySelector('input[name="location-name"]').value;
    const date_arrival = document.querySelector('input[name="date-arrival"]').value;
    const date_leaving = document.querySelector('input[name="date-leaving"]').value;
    const flight_price = document.querySelector('input[name="flight-price"]').value;
    const food_price = document.querySelector('input[name="food-price"]').value;
    const lodging_price = document.querySelector('input[name="lodging-price"]').value;
    const extra_expenditure = document.querySelector('#extras-list').value;

    if (body) {
      await fetch('/api/trip', {
        method: 'POST',
        body: JSON.stringify({
          name,
          location_name,
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
  };
  
  document
    .querySelector('#new-trip-form')
    .addEventListener('submit', tripFormHandler);
  