import React from 'react';

class LoginScreen extends React.Component {
  state = {
    email: '',
    password: '',
    errMessage: '',
  };

  handleEmailChange = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  handlePasswordChange = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:3001/users/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (!data.success) {
          this.setState({
            errMessage: data.message
          });
        } else {
          // save current user to localStorage
          window.localStorage.setItem('email', data.data.email);
          window.localStorage.setItem('fullName', data.data.fullName);

          // redirect user
          window.location.href = '/';
        }
      })
      .catch((error) => {
        this.setState({
          errMessage: error.message,
        });
      });
  };

  render() {
    return (
      <div className='row'>
        <div className='col-3'></div>
        <div className='col-6 mt-5 pt-4'>
          <form onSubmit={this.handleFormSubmit} className='needs-validation'>
            <div className="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input
                value={this.state.email}
                onChange={this.handleEmailChange}
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input
                value={this.state.password}
                onChange={this.handlePasswordChange}
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>

            <div className='form-group'>
            {this.state.errMessage ? (
              <div className="alert alert-danger" role="alert">
                {this.state.errMessage}
              </div>
              ) : null}
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
        <div className='col-3'></div>
      </div>
    );
  }
}

export default LoginScreen;