window.onload = () => {
  let roundUpdate;
  let tempScore;

  const urlParts = window.location.pathname.split('/');
  const gameId = urlParts[urlParts.length - 1];
  fetch(`/get-game-by-id/${gameId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then((res) => res.json())
    .then((data) => {
      roundUpdate = data.data.round;
      // console.log(roundUpdate);
      if (playerNameElements) {

        playerNameElements.insertAdjacentHTML(
          `beforeend`,
          `
        <h3 id="player1Name">${data.data.playerName[0]}</h3>
        <h3 id="player2Name">${data.data.playerName[1]}</h3>
        <h3 id="player3Name">${data.data.playerName[2]}</h3>
        <h3 id="player4Name">${data.data.playerName[3]}</h3>
        `
        )
      }
      let RoundElement = document.querySelector('.roundTable');

      for (let i = 1; i <= roundUpdate; i++) {
        if (RoundElement) {
          RoundElement.insertAdjacentHTML(
            `beforeend`,
            `<div>
        Round${i}
        <input type="number" class="round${i}player1 score" value = "${data.data.score[i-1][0]}">
        <input type="number" class="round${i}player2 score" value = "${data.data.score[i-1][1]}">
        <input type="number" class="round${i}player3 score" value = "${data.data.score[i-1][2]}">
        <input type="number" class="round${i}player4 score" value = "${data.data.score[i-1][3]}">
        </div>
        `
          )
        }
      }

    })
    .catch((error) => {
      console.log(error);
      window.alert(error.message);
    })


  let buttonElements = document.querySelector('.newRoundButton');
  let playerNameElements = document.querySelector('.playerName');

  buttonElements.addEventListener('click', (event) => {
    event.preventDefault();

    fetch(`/update-round`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: gameId,
      })
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        let RoundElement = document.querySelector('.roundTable');
        if (RoundElement) {
          RoundElement.insertAdjacentHTML(
            `beforeend`,
            `<div>
              Round${data.data.round + 1}
              <input type="number" class="round${data.data.round + 1}player1 score" value = "0">
              <input type="number" class="round${data.data.round + 1}player2 score" value = "0">
              <input type="number" class="round${data.data.round + 1}player3 score" value = "0">
              <input type="number" class="round${data.data.round + 1}player4 score" value = "0">
              </div>
              `
          )
          roundUpdate++;
        }
      })
      .catch((error) => {
        console.log(error);
        window.alert(error.message);
      })

  });
  function on(elSelector, eventName, selector, fn) {
    var element = document.querySelector(elSelector);

    element.addEventListener(eventName, function(event) {
        var possibleTargets = element.querySelectorAll(selector);
        var target = event.target;

        for (var i = 0, l = possibleTargets.length; i < l; i++) {
            var el = target;
            var p = possibleTargets[i];

            while(el && el !== element) {
                if (el === p) {
                    return fn.call(p, event);
                }

                el = el.parentNode;
            }
        }
    });
}
  on('.roundTable','input','.score', (event) => {
    console.log(roundUpdate)
    event.preventDefault();
    tempScore = new Array(roundUpdate);
    for (let i = 0; i < tempScore.length; i++) {
      tempScore[i] = new Array(4);
    }

    for (let i = 1; i <= 4; i++) {
      let sumTemp = 0;

      for (let j = 1; j <= roundUpdate; j++) {
        let scoreUpdate = document.querySelector(`.round${j}player${i}`);
        tempScore[j-1][i-1] = Number(scoreUpdate.value);
        sumTemp += Number(scoreUpdate.value);
      }
      document.querySelector(`.sum${i}`).innerHTML = sumTemp;
    }
    console.log(tempScore);
    fetch(`/update-score`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: gameId,
        score: tempScore,
      })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        window.alert(error.message);
      })
  })

 
}