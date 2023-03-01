
import React from 'react';
import MapView from '../map-components/MapView';

function Map() {
  return (
    <div className = "map">
    <div className='map-intro'>
            <h1>Location Map</h1>
        </div>       
        
        <div className = "map-content">
            <MapView/>
        </div>
    </div>      
  )
}

export default Map