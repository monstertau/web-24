window.onload = () => {
  const urlParts = window.location.pathname.split('/');
  const content = urlParts[urlParts.length - 1];
  console.log(content);
  fetch('/find-question', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      questionContent: content,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const searchBoxElement = document.querySelector('.searchbox');
      searchBoxElement.innerHTML = "";
      if (searchBoxElement) {
        for (let i = 0; i < data.data.length; i++) {
          searchBoxElement.insertAdjacentHTML(
            'beforeend',
            `<h3 class='questnum ${i}'>${data.data[i].questionContent}</h3>`,
          )
          searchBoxElement.insertAdjacentHTML(
            'beforeend',
            `<div class='likenum ${i}'>Like: ${data.data[i].like}</div>`,
          )
          searchBoxElement.insertAdjacentHTML(
            'beforeend',
            `<div class='dislikenum ${i}'>Dislike: ${data.data[i].dislike}</div>`,
          )
        }
      }
    })
    .catch((error) => {
      console.log(error);
      window.alert(error.message);
    })
}