
document.getElementById('signup-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('signup-username').value;
  const password = document.getElementById('signup-password').value;
  const email = document.getElementById('signup-email').value;

  const res = await fetch('/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      password: password,
      email: email
    })
  }).then((res) => res.json());

  if(res.status === 'ok'){
    location.href = `/resume?token=${res.data}`;
  }

  if(res.status === 'error'){
    alert(res.error);
  }
})

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  const res = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  }).then((res) => res.json());

  if(res.status === 'ok'){
    location.href = `/resume?token=${res.data}`;
  }

  if(res.status === 'error'){
    alert(res.error);
  }
})
