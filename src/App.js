import React, { Component } from 'react';
import logo from './logo.svg';
import scriptLoader from 'react-async-script-loader'
import './App.css';
import GoogleMap from "react-google-map";
import GoogleMapLoader from "react-google-maps-loader";
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';
import fetchJsonp from 'fetch-jsonp'

let markers = [], infoWindows = [] ,filteredLocations = [] ,dataForMarkers = [];


class App extends Component {

  state={
    locationsForMarkers :[
      {name:'Biserica Neagră' ,pos:{lat:45.6408588, lng:25.587760}},
      {name:'Brașov Olympic Ice Rink', pos:{lat:45.6637484 , lng:25.6121403}},
      {name:'Poiana Brașov', pos:{lat:  45.5978534, lng:25.5519401}},
      {name:'Transilvania University of Brașov', pos:{lat:45.6451546,lng:25.588970}},
      {name:'Strada Sforii', pos:{lat:45.6396179,lng:25.5884976}}

    ],

      query:'',
      myMap:{},
      placesInfo:[]

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
      console.log(this.state.placesInfo)
      ///First of all we have to make sure that the scripted is loaded
      if (isScriptLoadSucceed) {
        //Creating the Map
        const map = new window.google.maps.Map(document.getElementById('map'), {
          zoom: 12,
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

    openInfoWIndow(){


      console.log(this.state.myMap)
    }

    updateStateWithNewInfo(info){
      this.setState({
          placesInfo:info
      });

    }

      componentDidMount(){
        let responses = [];
        //after all components was inserted into the DOM we will request info about locations using wikipedia api
        ///first of all we map over out list of locations and make a call using each location name
        this.state.locationsForMarkers.map  ((location,index)=>{
  return fetchJsonp(`https://en.wikipedia.org/w/api.php?action=opensearch&search=${location.name}&format=json&callback=wikiCallback`)
  .then(response => response.json()).then((responseJson) => {

      responses=responseJson
        this.setState({
          placesInfo:responses
        })
  }).catch(error =>
  console.error(error)
  )
});


}
 convertingData(data){


   let newData = [];

   if(data[2]!== undefined)
   {
     data[2].forEach(data =>newData.push(data));

   }
 if(newData.length !== 0)

   dataForMarkers.push({info:newData , placeName:data[0]});
/*   if(newData!==undefined)
console.log(newData)
*/

   ///here we filter the data for our markers



 }

    componentDidUpdate(){
      ///after all the elements are updated we can start to work


      const map = this.state.myMap;
      //first of all we need to set all our Markers to null and empty the both arrays (markers & infoWindows)
      markers.map((marker, index) =>{
        marker.setMap(null) ;
      });
      markers = [];
      infoWindows = [];

      filteredLocations.map(marker =>{

        ///marker = locatia pe care vom contstrui markerul

        let mapMarkers = new window.google.maps.Marker({
            map:this.state.myMap,
            position:marker.pos,
            title:marker.title
        });

        let contentForInfoWindow;





        let data = dataForMarkers.forEach(loc=>{
            if(loc.placeName === marker.name)
            {
              contentForInfoWindow = `<div class='infoWindowContent'>${marker.name}</div><div>${loc.info}</div>
              `
            }
        });




        let markerInfoWindow = new window.google.maps.InfoWindow({
          content:contentForInfoWindow
        })


        ///we add the marker to the markers array
        markers.push(mapMarkers);
        infoWindows.push(markerInfoWindow);

        ///now we have to open the infow window when a marker is clicked , but first of all
        ///we need to close already open Markers
        mapMarkers.addListener('click',function(){
          ///here we map over all infoWindows and close them all

            infoWindows.forEach(element => {element.close()});
            markerInfoWindow.open(map,mapMarkers)


          ///before adding a new  animation we need to clear the old onChange

        })
      });

    }



  render() {


    console.log(dataForMarkers)
    let data = this.state.placesInfo;
    this.convertingData(data)


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
