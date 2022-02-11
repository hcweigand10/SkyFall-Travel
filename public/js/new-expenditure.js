const newFormHandler = async function(event) {
    event.preventDefault();
    console.log('all good');

    const name = document.querySelector('#name').value;
    const event_type = document.querySelector('#event-type').value;
    const price = document.querySelector('#price').value;
    const tripId = document.querySelector('#tripId').value;
    const destinationId = document.querySelector('#destinationId').value;
  
    await fetch('/api/expenditure', {
      method: 'POST',
      body: JSON.stringify({
        name,
        event_type, 
        price, 
        destinationId,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    document.location.replace(`/dashboard/trip/${tripId}/destination/${destinationId}`);
  };
  
  document
    .querySelector('#new-post-form')
    .addEventListener('submit', newFormHandler);