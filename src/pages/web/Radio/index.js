/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect, useState } from "react";
import LayoutWeb from "../../../layouts/web";
import Iframe from "react-iframe";
import Api from "../../../api";

function Radio() {

    const [radio, setRadio] = useState([]);
    const [latitude, setLatitude] = React.useState('');
    const [longitude, setLongitude] = React.useState('');


    React.useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
        })
    }, [])

    const fetchData = async () => {
        await Api.get(`/radio`, {
          headers: {
            //header Bearer + Token
            objects: "/radio",
            statusUsers: 1,
            lng: latitude,
            lat: longitude
          },
        })
          .then((response) => {
            setRadio(response.data.data);
            console.log("data", response);
          })
          .catch((error) => {
            console.log(error);
          });
    };

    useEffect(() => {
        //call function "fetchDataPlaces"
        fetchData();
    
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);


  return (
    <React.Fragment>
      <LayoutWeb>
        <div className="pt-20 pb-20">
          <div className="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-6/12">
            <Iframe
              url={radio.radio}
              width="100%"
              height="320px"
              display="block"
              position="relative"
            />
          </div>
        </div>
      </LayoutWeb>
    </React.Fragment>
  );
}

export default Radio;
