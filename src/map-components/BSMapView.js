import React, {useState, useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import * as L from 'leaflet';
import 'leaflet-defaulticon-compatibility';
import { useLocation } from '../myHooks/useLocation';

function BSMapView(props) {

    const mapContainer = useRef();
    const { setLatLong } = useLocation()
    const [lat, setLat] = useState(null)
    const [long, setLong] = useState(null)

    useEffect(()=>{

        const map = L.map(mapContainer.current).setView([54.010372, -2.785492], 14);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        
        var marker;
        if(props.type === "edit"){
            marker = L.marker([props.lat, props.long]).addTo(map);
            setLat(props.lat)
            setLong(props.long)
            setLatLong(props.lat, props.long)
        }
        
        function onMapClick(e) {  
            try{
                map.removeLayer(marker)
            } catch (e) {}
            
            marker = new L.Marker(e.latlng, {draggable:true});
            map.addLayer(marker);
            setLat(e.latlng.lat)
            setLong(e.latlng.lng)
            setLatLong(e.latlng.lat, e.latlng.lng)
        };
        map.on('click', onMapClick);

        // unmount
        return () => map.remove();
    }, []);

    return (<>
        <p>Location:</p>
        {/* <p>{lat}</p>
        <p>{long}</p> */}
        <div style={{padding: 0, margin: 0, width: "100%", height: "50vh",}}
             ref={el => mapContainer.current = el}>
        </div>    
    </>);
}

export default BSMapView