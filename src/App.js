import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GoogleMap from "react-google-map";
import GoogleMapLoader from "react-google-maps-loader";
import Sidebar from './Sidebar.js'
import Map from './map'

class App extends Component {

  slideMenu = ()=>{

    var menuIcon = document.querySelector('.hamburger-menu');
    var leftMenu = document.querySelector('.left-navbar');



      if(leftMenu.classList.contains('activate')){
         leftMenu.classList.remove('activate');
      }else{
        leftMenu.classList.add('activate');
      }

  }




  render() {
    return (
      <div className='container'>
        <div className='topbar'>
          <div className='hamburger-menu' onClick={this.slideMenu}>
              <div className='line1'></div>
              <div className='line2'></div>
              <div className='line3'></div>
          </div>
        </div>

          <Sidebar/>
          <Map />
          {/*After the sidebar we ar gonna put our map*/}
      </div>
    );
  }
}

export default App;
