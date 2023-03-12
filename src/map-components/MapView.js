import React, {useEffect, useRef } from 'react';
import useFetch from "../myHooks/useFetch";
import { useUserData } from '../myHooks/useUserData';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import * as L from 'leaflet';
import 'leaflet-defaulticon-compatibility';

function MapView() {

    const mapContainer = useRef();

    const { getInstituteData } = useUserData()
    const instituteData = getInstituteData()

    const [buildingData] = useFetch('https://rest.distressing.dev/building/info?instituteID='+instituteData[0])
    let map = null;

    useEffect(()=>{

        if (buildingData !== null) {
            if (buildingData.buildings.length > 0) { 
                map = L.map(mapContainer.current).setView([parseFloat(buildingData.buildings[0].latitude), parseFloat(buildingData.buildings[0].longitude)], 15);

                L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                }).addTo(map);
            
                buildingData.buildings.forEach((item) => {
                    
                    var marker;
                    marker = new L.Marker([parseFloat(item.latitude), parseFloat(item.longitude)])
                        .bindPopup(item.buildingName);
                    map.addLayer(marker);
                })
                
                // unmount
                return () => map.remove();               
            }
        }
    });


    return (
        <div style={{padding: 0, margin: 0, width: "80%", height: "80vh",}}
             ref={el => mapContainer.current = el}>
        </div>  
    )
}

export default MapView
