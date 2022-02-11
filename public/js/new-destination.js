const newFormHandler = async function(event) {
    event.preventDefault();
    console.log('all good');

    const name = document.querySelector('#name').value;
    const date_arrived = document.querySelector('#date-arrived').value;
    const date_leaving = document.querySelector('#date-leaving').value;
    const budget = document.querySelector('#budget').value;
    const tripId = document.querySelector('#tripId').value;
  
    await fetch('/api/destination', {
      method: 'POST',
      body: JSON.stringify({
        name,
        date_arrived, 
        date_leaving, 
        budget, 
        tripId,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    document.location.replace(`/dashboard/trip/${tripId}`);
  };
  
  document
    .querySelector('#new-post-form')
    .addEventListener('submit', newFormHandler);