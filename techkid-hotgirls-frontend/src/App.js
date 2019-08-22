import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import LoginScreen from './pages/LoginScreen';
import HomeScreen from './pages/HomeScreen';
import CreatePostScreen from './pages/CreatePostScreen';

class App extends React.Component {
  state = {
    currentUser: {
      email: '',
      fullName: '',
    },
  };

  componentWillMount() {
    const email = window.localStorage.getItem(`email`);
    const fullName = window.localStorage.getItem(`fullName`);

    if (email && fullName) {
      this.setState({
        currentUser: {
          email: email,
          fullName: fullName,
        },
      });
    }
  }

  handleLogoutClick = () => {
    // call logout api => clear session storage
    fetch('http://localhost:3001/users/logout', {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // clear window.localStorage
        window.localStorage.removeItem('email');
        window.localStorage.removeItem('fullName');

        // clear fullname + email in state
        this.setState({
          currentUser: {
            email: '',
            fullName: '',
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">Techkids Hotgirls</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {this.state.currentUser.email ? (
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <a className="nav-link">Welcome {this.state.currentUser.fullName},</a>
                </li>
                <a className="btn btn-outline-primary ml-3" onClick={this.handleLogoutClick}>Log out</a>
              </ul>
            ) : (
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <a className="nav-link" href="/login">Login</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/register">Register</a>
                </li>
              </ul>
            )}
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
              <a className='btn btn-outline-primary ml-3' href='/create-post'>+ New Post</a>
            </form>
          </div>
        </nav>

        <BrowserRouter>
          <Route path='/' exact={true} component={HomeScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/create-post' component={CreatePostScreen} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
