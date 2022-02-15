async function editFormHandler(event) {
    event.preventDefault();
    console.log("hello this is a updates");

    const name = document.querySelector('#edit-name').value;
    const start_date = document.querySelector('#edit-arriving-date').value;
    const end_date = document.querySelector('#edit-departure').value;
    const budget = document.querySelector('#edit-budget').value;
    const stopId = document.querySelector('#stopId').value;
    const tripId = document.querySelector('#tripId').value;

    const response = await fetch(`/api/stop/${stopId}`, {
      method: 'PUT',
      body: JSON.stringify({
        name,
        start_date,
        end_date,
        budget,
        tripId
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    // TODO: What happens if the response is ok?
    // if the response is ok, change the page to go go to the page of that item added and refreshes the page to update the data
    if (response.ok) {
        console.log(stopId);
        console.log('=============');
        // document.location.replace(`/dashboard/trip/${tripId}`);
    } else {
      alert('Failed to edit stop');
    }
  }
  
document.querySelector('.edit-form').addEventListener('submit', editFormHandler);

