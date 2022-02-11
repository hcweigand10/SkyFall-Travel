async function editFormHandler(event) {
    event.preventDefault();
    console.log("hello this is a updates");

    const name = document.querySelector('#edit-name').value;
    const date_arrived = document.querySelector('#edit-arriving-date').value;
    const date_leaving = document.querySelector('#edit-departure').value;
    const budget = document.querySelector('#edit-budget').value;
    const destinationId = document.querySelector('#destinationId').value;
    const tripId = document.querySelector('#tripId').value;

    const response = await fetch(`/api/destination/${destinationId}`, {
      method: 'PUT',
      body: JSON.stringify({
        name,
        date_arrived,
        date_leaving,
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
        console.log(destinationId);
        console.log('=============');
        // document.location.replace(`/dashboard/trip/${tripId}`);
    } else {
      alert('Failed to edit dish');
    }
  }
  
document.querySelector('.edit-form').addEventListener('submit', editFormHandler);

