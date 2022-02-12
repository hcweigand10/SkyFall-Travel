async function deleteDestinationHandler(event) {
    let id = event.target.id;
    const element = document.getElementById(id);
    const tripId = element.dataset.tripId;
    const destinationId = event.target.id;
    console.log(destinationId);
    const response = await fetch(`/api/destination/${destinationId}/${tripId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    console.log(response);
    location.reload();

  }

$('.delete-destination-button').on('click', deleteDestinationHandler);

