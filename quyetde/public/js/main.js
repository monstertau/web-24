window.onload = () => {
  let selectedQuestion;

  // get random question
  fetch('/get-random-question', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then((res) => res.json())
    .then((data) => {
      selectedQuestion = data.data;
      document.querySelector('.question-content').innerHTML = data.data.questionContent;
    })
    .catch((error) => {
      console.log(error);
      window.alert(error.message);
    });

  const voteQuestion = (vote) => {
    fetch('/vote', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: selectedQuestion.id,
        vote: vote,
      }),
    })
      .then((res) => {
        window.location.href = `/question/${selectedQuestion.id}`;
      })
      .catch((error) => {
        console.log(error);
        window.alert(error.message);
      });
  };

  document.querySelector('.like').addEventListener('click', () => {
    voteQuestion('like');
  });
  document.querySelector('.dislike').addEventListener('click', () => {
    voteQuestion('dislike');
  });
  document.querySelector('.other-question').addEventListener('click', () => {
    window.location.reload();
  });
  document.querySelector('.result').addEventListener('click', () => {
    window.location.href = `/question/${selectedQuestion.id}`;
  });
};