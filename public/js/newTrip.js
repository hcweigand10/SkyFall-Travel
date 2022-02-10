const tripFormHandler = async function(event) {
    event.preventDefault();
  
    const name = document.querySelector('#trip-name').value;
    const location_name = document.querySelector('#location-name').value;
    const date_arrival = document.querySelector('#date-arrival').value;
    const date_leaving = document.querySelector('#date-leaving').value;
    const flight_price = document.querySelector('#flight-price').value;
    const food_price = document.querySelector('#food-price').value;
    const lodging_price = document.querySelector('#lodging-price').value;
    const extra_expenditure = document.querySelector('#extras-list').value;

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

 
  document.querySelector('#tripButton').addEventListener('submit', tripFormHandler);
  