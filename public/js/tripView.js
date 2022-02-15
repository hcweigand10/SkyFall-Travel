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



