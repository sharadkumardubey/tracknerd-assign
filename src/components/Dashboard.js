import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from "react-leaflet";
import { getDatabase, get, ref } from "firebase/database";
import L from "leaflet";

import axios from "axios";

import iconUrl from "../css/images/marker-icon.png";

import "leaflet/dist/leaflet.css";

const token = sessionStorage.getItem("token");

function Dashboard() {
        const [lat, setLat] = useState(27.7229222);
        const [lng, setLng] = useState(85.3100364);
        const [zoom, setZoom] = useState(14);
        const [lastLocation, setLastLocation] = useState([]);

        useEffect(()=>{
            const db = getDatabase();
            /*.
            ...
            ...
            ... Facing issue with firebase integration thats why not able to proceed on this part
            ...
            ...
            */
            axios({
                method: "GET",
                url: "https://staging-api.tracknerd.io/v1/vehicle-groups/vehicles",
                headers: {
                    "Authorization": 'Bearer '+token
                }
            })
                .then(response => {
                    const res = response.data;
                    console.log('--->',res);
                })
                .catch(err => {
                    console.log("Error while getting Vehical list: ", err);
                });
        },[])

  return (
    <MapContainer center={[lat, lng]} zoom={zoom} style={{ width: "100%", height: "100%" }}>
                <LayersControl position="topright">
                    <LayersControl.BaseLayer name="OpenStreetMap.BlackAndWhite">
                        <TileLayer
                            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                            url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
                        />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer checked={true} name="OpenStreetMap.Mapnik">
                        <TileLayer
                            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    </LayersControl.BaseLayer>
                    {/* {renderMark()} */}
                </LayersControl>
            </MapContainer>
  )
}

export default Dashboard