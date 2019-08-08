import React from "react";
import "./bootstrap.min.css";
import "./iofrm-style.css";
import "./iofrm-theme17.css";
class LoginScreen extends React.Component {
  state = {
    email: "",
    password: ""
  };

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }
  componentDidMount(){
    fetch('http://localhost:3001/users/login',{
      method:"POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
    })
    .then(res => res.json())
    .then((data) => {
      if(data.success == true){
        window.location.href = "/profile";
      }
    })
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }
  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    const validateMsg = document.getElementById("validateMsg");
    if (this.state.password.length < 6) {
      validateMsg.innerText = "Your password must be at least 6 characters";
    } else {
      console.log(this.state);
      validateMsg.innerText = "";
      fetch("http://localhost:3001/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.message === "Wrong Password") {
            validateMsg.innerText = "Wrong password, try again";
          }else if(data.message === "Email didn't exist"){
            validateMsg.innerText = "Email didn't exist. Register to new account now";
          } 
          else if (data.success == true) {
            validateMsg.innerText = "";
            window.location.href = `/profile`;
          }
          console.log(data);
        });
    }
  }

  render() {
    return (
      <div className="form-body without-side">
        <div className="website-logo">
          <a href="index.html">
            <div className="logo">
              <img className="logo-size" src="images/logo-light.svg" alt="" />
            </div>
          </a>
        </div>
        <div className="row">
          <div className="img-holder">
            <div className="bg" />
            <div className="info-holder">
              <img src="images/graphic3.svg" alt="" />
            </div>
          </div>
          <div className="form-holder">
            <div className="form-content">
              <div className="form-items">
                <h3>Đăng nhập</h3>
                <p>
                  Login to Techkids-hotgirls social network
                </p>
                <form onSubmit={this.handleSubmit} id="form-login">
                  <input
                    className="form-control"
                    type="email"
                    name="username"
                    placeholder="Địa chỉ E-mail"
                    // value={this.state.email}
                    onChange={this.handleEmailChange}
                    required
                  />
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    placeholder="Mật khẩu"
                    // value={this.state.password}
                    onChange={this.handlePasswordChange}
                    required
                  />
                  <div className="form-button">
                    <button id="submit" type="submit" className="ibtn">
                      Đăng nhập
                    </button>{" "}
                    <a href="#">Quên mật khẩu?</a>
                  </div>
                  <p id="validateMsg" />
                </form>
                <div className="other-links">
                  <div className="text">Hoặc đăng nhập với</div>
                  <a href="#">
                    <i className="fab fa-facebook-f" />
                    Facebook
                  </a>
                  <a href="#">
                    <i className="fab fa-google" />
                    Google
                  </a>
                  <a href="#">
                    <i className="fab fa-linkedin-in" />
                    Linkedin
                  </a>
                </div>
                <div className="page-links">
                  <a href="/register">Đăng kí tài khoản</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default LoginScreen;
