async function deleteTripHandler(event) {
    let id = event.target.id;
    const response = await fetch(`/api/trip/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    console.log(response);
    location.reload();

  }

$('.delete-trip-button').on('click', deleteTripHandler);

