import React from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import * as waterData from "./../data/waterbodyLocation.json";
import "./styles/MapCSS.css";


export default function MapView() {
    const [activeWB, setActiveWB] = React.useState(null);
    return (
        <Map center={[9.925201, 78.119774]} zoom={12}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {waterData.features.map(wb => (
                < Marker key={wb.properties.ID} position={[wb.geometry.coordinates[0], wb.geometry.coordinates[1]]}
                    onClick={() => {
                        setActiveWB(wb);
                    }}
                />
            ))}
            {activeWB && (
                <Popup
                    position={[
                        activeWB.geometry.coordinates[0],
                        activeWB.geometry.coordinates[1]
                    ]}
                    onClose={() => {
                        setActiveWB(null);
                    }}
                >
                    <div>
                        <h2>{activeWB.properties.NAME}</h2>
                        <p>{activeWB.properties.ADDRESS}</p>
                        <p>{activeWB.properties.CAPACITY}:{activeWB.properties.AVAILABILITY}</p>
                    </div>
                </Popup>
            )}
        </Map>
    )
}