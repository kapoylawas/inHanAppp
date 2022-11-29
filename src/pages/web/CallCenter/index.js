import React, { useEffect, useRef, useState } from "react";
import LayoutWeb from "../../../layouts/web";
//import mapbox gl
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
//import mapbox gl direction
import Directions from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
//mapbox gl geocoder
import MapboxGeocoder from 'mapbox-gl-geocoder';
import { useLocation } from "react-router-dom";
//api key mapbox
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX;

function CallCenter() {
  document.title = "Call Center";

  const mapContainer = useRef(null);

  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");

  console.log(longitude);
  console.log(latitude);

  const query = new URLSearchParams(useLocation().search);

  useEffect(() => {
    //init Map
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/outdoors-v11",
      center: [query.get("longitude"), query.get("latitude")],
      zoom: 15,
    });

    //init geocoder
    const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
  
        marker: {
          draggable: true,
        },
  
        mapboxgl: mapboxgl,
      });
  
      //add geocoder to map
      map.addControl(geocoder);

    //init geolocate
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      // When active the map will receive updates to the device's location as it changes.
      trackUserLocation: true,
      // Draw an arrow next to the location dot to indicate which direction the device is heading.
      showUserHeading: true,
    });

    // Add geolocate control to the map.
    map.addControl(geolocate);

    //init directions
    const directions = new Directions({
      accessToken: mapboxgl.accessToken,
      unit: "metric",
      profile: "mapbox/driving",
      // UI controls
      controls: {
        inputs: false,
        instructions: true,
      },
    });

    // Add directions to the map.
    map.on("load", function () {
      geolocate.trigger(); //<- Automatically activates geolocation

      geolocate.on("geolocate", function (position) {
        setLongitude(position.coords.longitude);
        setLatitude(position.coords.latitude);
      });

      directions.setOrigin([longitude, latitude]);
      directions.setDestination([
        query.get("longitude"),
        query.get("latitude"),
      ]);

      map.addControl(directions);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <React.Fragment>
      <LayoutWeb>
        <div className="pt-20 pb-20">
          <div className="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-6/12">
            <div className="card-body">
              <h5>
                <i className="fa fa-location-arrow"></i> DIRECTION FROM USER
                LOCATION
              </h5>
              <hr />
              <div
                ref={mapContainer}
                className="map-container"
                style={{ height: "300px" }}
              />
            </div>
          </div>
        </div>
      </LayoutWeb>
    </React.Fragment>
  );
}

export default CallCenter;
