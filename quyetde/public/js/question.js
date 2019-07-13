window.onload = () => {
  // fetch api => get question by id
  const urlParts = window.location.pathname.split('/');
  const questionId = urlParts[urlParts.length - 1];
  fetch(`/get-question-by-id/${questionId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.data) {
        document.querySelector('.question-content').innerHTML = data.data.questionContent;
        document.querySelector('.total-vote').innerHTML = data.data.like + data.data.dislike;

        let likePercent = data.data.like;
        let dislikePercent = data.data.dislike;
        if (likePercent === 0 && dislikePercent === 0) {
          likePercent = 50;
          dislikePercent = 50;
        } else {
          likePercent = (data.data.like / (data.data.like + data.data.dislike) * 100).toFixed(2);
          dislikePercent = 100 - Number(likePercent);
        }

        document.querySelector('.dislike').innerHTML = `${dislikePercent}%`;
        document.querySelector('.like').innerHTML = `${likePercent}%`;
      } else {
        window.alert('Question not found');
      }
    })
    .catch((error) => {
      console.log(error);
      window.alert(error.message);
    });

  // add event listener
  document.querySelector('.other-question-button').addEventListener('click', () => {
    window.location.href = '/';
  });
};