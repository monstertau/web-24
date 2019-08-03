import React from "react";
import "./App.css";
import {BrowserRouter,Route} from 'react-router-dom';
import LoginScreen from "./pages/LoginScreen";
import RegisterScreen from "./pages/RegisterScreen";
class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
      <Route path="/login" component={LoginScreen}/>
      <Route path="/register" component={RegisterScreen}/>
      </BrowserRouter>
    );
  }
}

export default App;
