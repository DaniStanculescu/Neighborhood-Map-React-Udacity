import React, { Component } from 'react';
import logo from './logo.svg';
import scriptLoader from 'react-async-script-loader'
import './App.css';
import GoogleMap from "react-google-map";
import GoogleMapLoader from "react-google-maps-loader";
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by'

let markers = [], infoWindows = [] ,filteredLocations = [];


class App extends Component {

  state={
    locationsForMarkers :[
      {name:'Black Church' ,pos:{lat:45.6408588, lng:25.587760}},
      {name:'Coresi Mall ' ,pos:{lat:45.6727047 , lng:25.6154651}},
      {name:'Pizzeria Bada Bing', pos:{lat:45.6333193 , lng:25.605792}},
      {name:'Aquatic Paradise' ,pos:{lat:45.6732842 , lng:25.5866228}},
      {name:'Roses Park' , pos:{lat:45.6406551 , lng:25.6134646}},
      {name:'Olimpic Ice Rink', pos:{lat:45.6637484 , lng:25.6121403}},
      {name:'City Club Restaurant', pos:{lat: 45.642714, lng:25.6311593}},
      {name:'McDonalds' , pos:{lat:45.6335448 , lng:25.6341000}},
      {name:'Recreational Lake' ,pos:{lat:45.6146294 , lng:25.6390334}},
      {name:'Zoo' , pos:{lat:45.6140752 , lng:25.633124}} ],

      query:'',
      myMap:{}

    }



  updateQuery (query){
   this.setState({
     query:query.trim()
   });
  }

///In this function we have the functionality for the menu
  slideMenu = ()=>{

    var menuIcon = document.querySelector('.hamburger-menu');
    var leftMenu = document.querySelector('.left-navbar');



      if(leftMenu.classList.contains('activate')){
         leftMenu.classList.remove('activate');
      }else{
        leftMenu.classList.add('activate');
      }

  }

  componentWillReceiveProps({isScriptLoadSucceed}){
      ///First of all we have to make sure that the scripted is loaded
      if (isScriptLoadSucceed) {
        //Creating the Map
        const map = new window.google.maps.Map(document.getElementById('map'), {
          zoom: 15,
          //Giving an initial locaiton to start
          center:{lat:45.657974 ,lng: 25.601198}
        });
        this.setState({
          myMap:map
        });
      }
      else {
        //Handle the error by alerting the user that the map could not be load :(
          alert("The map can't be load :((");
      }
    }

    componentDidUpdate(){
      ///after all the elements are updated we can start to work

      //first of all we need to set all our Markers to null and empty the both arrays (markers & infoWindows)
      markers.map((marker, index) =>{
        marker.setMap(null) ;
      });

      filteredLocations.map(marker =>{
        let infoWindow = new window.google.maps.InfoWindow({
            content:'Hatz Johule'
        });
        ///marker = locatia pe care vom contstrui markerul
        console.log(marker)
        let mapMarkers = new window.google.maps.Marker({
            map:this.state.myMap,
            position:marker.pos,
            title:marker.title
        });


        ///we add the marker to the markers array
        markers.push(mapMarkers);
        infoWindows.push(infoWindow);
      });

    }



  render() {

    let showingLocations
    if(this.state.query){
      const match = new RegExp(escapeRegExp(this.state.query),'i')
      showingLocations = this.state.locationsForMarkers.filter((location) => match.test(location.name))
    } else{
      showingLocations =  this.state.locationsForMarkers
    }

    showingLocations.sort(sortBy('name'))

      filteredLocations = showingLocations ;

    return (
      <div>
        <div className='topbar'>
          <div className='hamburger-menu' onClick={this.slideMenu}>
              <div className='line1'></div>
              <div className='line2'></div>
              <div className='line3'></div>
          </div>
        </div>
        {/*Here we have the code for our sidebar*/}
        <div className='left-navbar'>
          <form>
            <input type="text" className="locationInput" placeholder="Search for a location on the map" onChange={(event)=>this.updateQuery(event.target.value)} value={this.state.query}/>
            <button className="search-btn"></button>
          </form>
          <ul>
            {showingLocations.map((location,index) =>(
                <li className="list-locations" key={index} tabIndex="0">{location.name}</li>

            ))}

          </ul>
        </div>
          <div className ="container">
              <div className = "map-container">
                <div id="map" role='region' aria-label = 'Brasov' ></div>
              </div>
          </div>
      </div>

    );
  }
}

export default scriptLoader(
  [
  'https://maps.googleapis.com/maps/api/js?libraries=geometry&key=AIzaSyCBSLoiCMt7KAWPunSUmxPvfc9SnuJo7Ys'
  ]

)(App)
