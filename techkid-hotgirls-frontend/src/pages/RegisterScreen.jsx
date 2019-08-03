import React from "react";
import './bootstrap.min.css'
import './iofrm-style.css'
import './iofrm-theme17.css'
class RegisterScreen extends React.Component {
  render() {
    return (
      <div class="form-body without-side">
        <div class="website-logo">
            <a href="index.html">
                <div class="logo">
                    <img class="logo-size" src="images/logo-light.svg" alt=""/>
                </div>
            </a>
        </div>
        <div class="row">
            <div class="img-holder">
                <div class="bg"></div>
                <div class="info-holder">
                    <img src="images/graphic3.svg" alt=""/>
                </div>
            </div>
            <div class="form-holder">
                <div class="form-content">
                    <div class="form-items">
                        <h3>Register new account</h3>
                        <p>Access to the most powerfull tool in the entire design and web industry.</p>
                        <form>
                            <input class="form-control" type="text" name="name" placeholder="Full Name" required/>
                            <input class="form-control" type="email" name="email" placeholder="E-mail Address" required/>
                            <input class="form-control" type="password" name="password" placeholder="Password" required/>
                            <div class="form-button">
                                <button id="submit" type="submit" class="ibtn">Register</button>
                            </div>
                        </form>
                        <div class="other-links">
                            <div class="text">Or register with</div>
                            <a href="#"><i class="fab fa-facebook-f"></i>Facebook</a><a href="#"><i class="fab fa-google"></i>Google</a><a href="#"><i class="fab fa-linkedin-in"></i>Linkedin</a>
                        </div>
                        <div class="page-links">
                            <a href="login17.html">Login to account</a>
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
