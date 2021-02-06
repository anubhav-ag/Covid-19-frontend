import React, { Component } from 'react';
import './App.css';
// eslint-disable-next-line no-unused-vars
import axios from 'axios'
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import VaccineAppt from './components/pages/VaccineAppt';


class App extends Component {
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <VaccineAppt />
        </MuiThemeProvider>
      </div>
    );
  }
}
export default App;