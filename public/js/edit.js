
async function editFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="post-title"]').value.trim();
    const content = document.querySelector('textarea[name="content"]').value.trim();
  
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title,
        content
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
  //create a delete button
    const deleteButton = document.querySelectorAll('.delete-post-btn');
    deleteButton.forEach((button) => {
        button.addEventListener('click', deleteFormHandler);
    })

    async function deleteFormHandler(event) {
        event.preventDefault();
        console.log(event.target)
        const id = event.target.getAttribute('data-delete');
        const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }


    document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);