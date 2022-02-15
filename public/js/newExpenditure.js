const newFormHandler = async function() {
    const name = document.querySelector('#name').value;
    const event_type = document.querySelector('#event-type').value;
    const price = document.querySelector('#price').value;
    const tripId = document.querySelector('#tripId').value;
    const stopId = document.querySelector('#stopId').value;
    await fetch(`/api/expenditure/${tripId}/${stopId}`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        event_type, 
        price, 
        stopId,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    document.location.replace(`/dashboard/trip/${tripId}/stop/${stopId}`);
};

const deleteFormHandler = async function(event) {

 console.log(event.target.id);
  let id = event.target.id;
  const element = document.getElementById(id);
  const tripId = element.dataset.tripId;
  const stopId = element.dataset.stopId;
  console.log(element.dataset)
  await fetch(`/api/expenditure/${id}/${tripId}/${stopId}`, {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
  });
  // location.reload();
};

  $('.extra-expenditure').on('click',function(){
    $('#new-post-form').append(`<label class="form-label" for="name">Expenditure</label>
    <input type="text" id="name" class="form-input" />

    <label class="form-label" for="event-type">Event type</label>
    <input type="text" id="event-type" class="form-input" />

    <label class="form-label" for="price">Price</label>
    <input type="text" id="price" class="form-input" />

    <input type="hidden" id="stopId" class="form-input" value="{{StopId}}" />
    <input type="hidden" id="tripId" class="form-input" value="{{TripId}}" />`);
  });
 
  $('.submit-form').on('click', newFormHandler);
  $('.delete-expenditure').on('click', deleteFormHandler);