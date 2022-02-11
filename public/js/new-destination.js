const newFormHandler = async function(event) {
    event.preventDefault();
  
    const name = document.querySelector('input[name="post-title"]').value;
    const date_arrived = document.querySelector('textarea[name="post-body"]').value;
    const date_leaving = document.querySelector('textarea[name="post-body"]').value;
    const budget = document.querySelector('textarea[name="post-body"]').value;
    const tripId = document.querySelector('textarea[name="post-body"]').value;
  
    await fetch(`/api/post`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        body,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    document.location.replace('/dashboard');
  };
  
  document
    .querySelector('#new-post-form')
    .addEventListener('submit', newFormHandler);