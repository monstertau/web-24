import React from "react";
import "./App.css";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import LoginScreen from "./pages/LoginScreen";
import RegisterScreen from "./pages/RegisterScreen";
import ProfileScreen from "./pages/ProfileScreen";
class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route
          exact
          path="/"
          render={() => {
            return <Redirect to="/login"/>
          }}
        />
        <Route path="/login" exact component={LoginScreen} />
        <Route path="/register" exact component={RegisterScreen} />
        <Route path="/profile" component={ProfileScreen}/>
      </BrowserRouter>
    );
  }
}

export default App;
