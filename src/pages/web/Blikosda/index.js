import React, { useEffect, useState } from "react";
import Api from "../../../api";
import LayoutWeb from "../../../layouts/web";

function Blikosda() {
  document.title = "In Hand App - Blikosda";

  const [blikosda, setBliko] = useState([]);
  const sort = blikosda.sort();

  const [latitude, setLatitude] = React.useState('');
  const [longitude, setLongitude] = React.useState('');


    React.useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
        })
    }, [])

  const fetchData = async () => {
    await Api.get(`/blikosda/all-product`, {
      headers: {
        //header Bearer + Token
        objects: "/blikosda/all-product",
        statusUsers: 1,
        lng: latitude,
        lat: longitude
      },
    })
      .then((response) => {
        setBliko(response.data.data);
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
      <>
        <LayoutWeb>
          <div className="pt-20 pb-20">
            <div className="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-6/12">
              <h1> testing</h1>
              {sort.map((bliko, index) => (
                <div  key={index}> 
                    <h1> {bliko.nama} </h1>
                    <hr />
                    <img src={bliko.images} style={{ width: "80px" }} alt="" />
                    <hr />
                    <h1> 
                    {bliko.kategori.map((kategori, index) => (
                        <div>
                            <h1> {kategori.name} </h1>
                            <h1> {kategori.slug} </h1>
                        </div>
                    ))}
                    </h1>
                    <hr />
                </div>
            ))}
            </div>
          </div>
        </LayoutWeb>
      </>
    </React.Fragment>
  );
}

export default Blikosda;
