async function deleteStopHandler(event) {
    let id = event.target.id;
    const element = document.getElementById(id);
    const tripId = element.dataset.tripId;
    const stopId = event.target.id;
    console.log(stopId);
    const response = await fetch(`/api/stop/${stopId}/${tripId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    console.log(response);
    document.location.replace(`/dashboard/trip/${tripId}`);

  }

$('.delete-stop-button').on('click', deleteStopHandler);

