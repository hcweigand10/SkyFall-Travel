const newFormHandler = async function(event) {
    event.preventDefault();
    console.log('all good');

    const name = document.querySelector('#name').value;
    const start_date = document.querySelector('#start-date').value;
    const end_date = document.querySelector('#end-date').value;
    const budget = document.querySelector('#budget').value;
    const tripId = document.querySelector('#tripId').value;
  
    await fetch('/api/stop', {
      method: 'POST',
      body: JSON.stringify({
        name,
        start_date, 
        end_date, 
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