import React from "react";
class ProfileScreen extends React.Component {
  componentDidMount() {
    fetch(`http://localhost:3001/users/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        if(data.success == true){
        console.log(data);
        document.getElementById("name").innerText = `Full Name: ${
          data.data.currentUser.fullName
        }`;
        document.getElementById("email").innerText = `Email: ${
          data.data.currentUser.email
        }`;
        document.getElementById("Created At").innerText = `ID: ${
          data.data.currentUser._id
        }`;
      }else{
        window.location.href = '/login';
      }
      });
  }
  logoutHandle = () => {
    fetch(`http://localhost:3001/users/logout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        window.location.href = '/login';
      });
  };
  render() {
    return (
      <div className="container">
        <div id="name" />
        <div id="email" />
        <div id="Created At" />
        <button id="logout" onClick={this.logoutHandle} >Log out</button>
      </div>
    );
  }
}
export default ProfileScreen;
