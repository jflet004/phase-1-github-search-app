document.addEventListener('DOMContentLoaded', () => {

  const form = document.querySelector('#github-form');

  form.addEventListener('submit', handleSubmit);

  function handleSubmit(e) {
    e.preventDefault();
    const userInput = e.target[0].value.trim();
    fetch(`https://api.github.com/search/users?q=${userInput}`, {
      headers: {
        'Accept': 'application / vnd.github.v3 + json'
      }
    })
      .then(response => response.json())
      .then(userData => handleData(userData))
      .catch(error => console.log(error));
    form.reset();
  }

  function handleData(data) {
    const userData = data.items[0];
    const userList = document.querySelector('#user-list');
    const lineBreak = document.createElement('br');

    renderData(userData, 'login', userList);
    renderData(userData, 'avatar_url', userList);
    renderData(userData, 'url', userList);

    userList.append(lineBreak);
  }

  function handleRepos(data) {
    const repoList = document.querySelector('#repos-list');
    repoList.textContent = '';
    const lineBreak = document.createElement('br');
    data.forEach(function (items) {
      const repoName = document.createElement('li');
      repoName.textContent = items.name;
      repoList.append(repoName);
    })
    repoList.append(lineBreak);
  }

  function renderData(data, prop, list) {
    const title = document.createElement('li');
    title.textContent = `${prop}: ${data[prop]}`;
    list.append(title);

    if (prop === 'login') {
      title.addEventListener('click', () => {
        fetch(`https://api.github.com/users/${data.login}/repos`, {
          headers: {
            'Accept': 'application / vnd.github.v3 + json'
          }
        })
          .then(response => response.json())
          .then(userData => handleRepos(userData))
          .catch(error => console.log(error));
      });
    }
  }
});



