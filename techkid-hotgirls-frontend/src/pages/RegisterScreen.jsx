import React from "react";
import "./bootstrap.min.css";
import "./iofrm-style.css";
import "./iofrm-theme17.css";
class RegisterScreen extends React.Component {
  state = {
    email: "",
    password: "",
    fullName: ""
  };

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleFullNameChange = this.handleFullNameChange.bind(this);
  }
  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }
  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }
  handleFullNameChange(event) {
    this.setState({ fullName: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    if (this.state.password.length < 6) {
      document.getElementById("validatePassword").innerText =
        "Your password must be at least 6 characters";
    } else {
      document.getElementById("validatePassword").innerText = "";
      fetch("http://localhost:3001/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
          fullName: this.state.fullName
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.message === "Email has been used") {
            document.getElementById("validateEmail").innerText =
              "Email has been used";
          } else if (data.success == true) {
            document.getElementById("validateEmail").innerText = "";
            window.location.href = "/login";
          }
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
                <h3>Đăng kí tài khoản mới</h3>
                <p>
                  Đăng kí tài khoản để có thể truy cập Techkids-hotgirls ngay!
                </p>
                <form onSubmit={this.handleSubmit}>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    placeholder="Tên đầy đủ"
                    value={this.state.fullName}
                    onChange={this.handleFullNameChange}
                    required
                  />

                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    placeholder="Địa chỉ E-mail"
                    value={this.state.email}
                    onChange={this.handleEmailChange}
                    required
                  />
                  <p id="validateEmail" />

                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    placeholder="Mật khẩu"
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                    required
                  />
                  <p id="validatePassword" />
                  <div className="form-button">
                    <button id="submit" type="submit" className="ibtn">
                      Đăng kí
                    </button>
                  </div>
                </form>
                <div className="other-links">
                  <div className="text">Hoặc đăng kí với</div>
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
                  <a href="/login">Đăng nhập</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default RegisterScreen;
