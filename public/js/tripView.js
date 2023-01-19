const now = moment();

const startDates = document.querySelectorAll(".start-date")
const endDates = document.querySelectorAll(".end-date")

startDates.forEach(element => {
    const tripId = element.id
    const date = element.value
    const formatDate = moment(`${date}`, "YYYY-MM-DD").format(`MMMM Do, YYYY`)
    document.querySelector(`#${tripId}-visible`).innerHTML = formatDate
});

endDates.forEach(element => {
    const tripId = element.id
    const date = element.value
    const formatDate = moment(`${date}`, "YYYY-MM-DD").format(`MMMM Do, YYYY`)
    document.querySelector(`#${tripId}-visible`).innerHTML = formatDate
});

const deleteStop = async (id,tripId) => {
    console.log(id,tripId);
    const response = await fetch(`/api/stop/${id}/${tripId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log(response);
      location.reload();
}


