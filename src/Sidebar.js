import React, {Component} from 'react'


class Sidebar extends Component {


 render(){
    return (
      <div className='left-navbar'>
        <form>
          <input type="text" className="locationInput" placeholder="Search for a location on the map"/>
          <button></button>
        </form>

      </div>
    );

 }


}


export default Sidebar
