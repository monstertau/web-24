import React from "react";
import './bootstrap.min.css'
import './iofrm-style.css'
import './iofrm-theme17.css'
class LoginScreen extends React.Component {
  render() {
    return (
      <div class="form-body without-side">
        <div class="website-logo">
          <a href="index.html">
            <div class="logo">
              <img class="logo-size" src="images/logo-light.svg" alt="" />
            </div>
          </a>
        </div>
        <div class="row">
          <div class="img-holder">
            <div class="bg" />
            <div class="info-holder">
              <img src="images/graphic3.svg" alt="" />
            </div>
          </div>
          <div class="form-holder">
            <div class="form-content">
              <div class="form-items">
                <h3>Login to account</h3>
                <p>
                  Access to the most powerfull tool in the entire design and web
                  industry.
                </p>
                <form>
                  <input
                    class="form-control"
                    type="text"
                    name="username"
                    placeholder="E-mail Address"
                    required
                  />
                  <input
                    class="form-control"
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                  />
                  <div class="form-button">
                    <button id="submit" type="submit" class="ibtn">
                      Login
                    </button>{" "}
                    <a href="forget17.html">Forget password?</a>
                  </div>
                </form>
                <div class="other-links">
                  <div class="text">Or login with</div>
                  <a href="#">
                    <i class="fab fa-facebook-f" />
                    Facebook
                  </a>
                  <a href="#">
                    <i class="fab fa-google" />
                    Google
                  </a>
                  <a href="#">
                    <i class="fab fa-linkedin-in" />
                    Linkedin
                  </a>
                </div>
                <div class="page-links">
                  <a href="register17.html">Register new account</a>
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
