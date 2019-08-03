import React from 'react'
import './CreateGameScreen.css'
class CreateGameScreen extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    var myArray = [];
    var player1 = document.getElementById('player1').value;
    var player2 = document.getElementById('player2').value;
    var player3 = document.getElementById('player3').value;
    var player4 = document.getElementById('player4').value;


    myArray.push(player1);
    myArray.push(player2);
    myArray.push(player3);
    myArray.push(player4);
    console.log(myArray);
    var pVal = "";
    for (let i = 0; i < myArray.length; i++) {
      pVal = pVal + myArray[i] + "<br/>";
    }
    fetch(`http://localhost:8080/create-games`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        playerName: {
          myArray
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          console.log(data);
          
          window.location.href = `/games/${data.id}`;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <div className="main-container">
        <h1> Score Keeper</h1>
        <div className="input-group input-group-lg">
          <input placeholder="Player1..." type="text" className="form-control" id="player1" />
        </div>
        <br />
        <div className="input-group input-group-lg">
          <input placeholder="Player2..." type="text" className="form-control" id="player2" />
        </div>
        <br />
        <div className="input-group input-group-lg">
          <input placeholder="Player3..." type="text" className="form-control" id="player3" />
        </div>
        <br />
        <div className="input-group input-group-lg">
          <input placeholder="Player4..." type="text" className="form-control" id="player4" />
        </div>
        <br />
          <button className="create" type="submit" onClick={this.handleSubmit}>CREATE A NEW GAME</button>
      </div>
    )
  }
}
export default CreateGameScreen