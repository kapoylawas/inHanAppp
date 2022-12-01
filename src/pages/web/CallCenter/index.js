/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useRef, useState } from "react";
import LayoutWeb from "../../../layouts/web";
//import mapbox gl
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
//import mapbox gl direction
// import Directions from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
//mapbox gl geocoder
import MapboxGeocoder from "mapbox-gl-geocoder";
import { useHistory } from "react-router-dom";
import Api from "../../../api";
import { toast } from "react-hot-toast";
//api key mapbox
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX;

function CallCenter() {
  document.title = "Call Center";

  // const mapContainer = useRef(null);

  // const [longitude, setLongitude] = useState("");
  // const [latitude, setLatitude] = useState("");

  // console.log(longitude);
  // console.log(latitude);

  // const query = new URLSearchParams(useLocation().search);

  // useEffect(() => {
  //   //init Map
  //   const map = new mapboxgl.Map({
  //     container: mapContainer.current,
  //     style: "mapbox://styles/mapbox/outdoors-v11",
  //     center: [query.get("longitude"), query.get("latitude")],
  //     zoom: 15,
  //   });

  //   //init geocoder
  //   const geocoder = new MapboxGeocoder({
  //       accessToken: mapboxgl.accessToken,

  //       marker: {
  //         draggable: true,
  //       },

  //       mapboxgl: mapboxgl,
  //     });

  //     //add geocoder to map
  //     map.addControl(geocoder);

  //   //init geolocate
  //   const geolocate = new mapboxgl.GeolocateControl({
  //     positionOptions: {
  //       enableHighAccuracy: true,
  //     },
  //     // When active the map will receive updates to the device's location as it changes.
  //     trackUserLocation: true,
  //     // Draw an arrow next to the location dot to indicate which direction the device is heading.
  //     showUserHeading: true,
  //   });

  //   // Add geolocate control to the map.
  //   map.addControl(geolocate);

  //   //init directions
  //   const directions = new Directions({
  //     accessToken: mapboxgl.accessToken,
  //     unit: "metric",
  //     profile: "mapbox/driving",
  //     // UI controls
  //     controls: {
  //       inputs: false,
  //       instructions: true,
  //     },
  //   });

  //   // Add directions to the map.
  //   map.on("load", function () {
  //     geolocate.trigger(); //<- Automatically activates geolocation

  //     geolocate.on("geolocate", function (position) {
  //       setLongitude(position.coords.longitude);
  //       setLatitude(position.coords.latitude);
  //     });

  //     directions.setOrigin([longitude, latitude]);
  //     directions.setDestination([
  //       query.get("longitude"),
  //       query.get("latitude"),
  //     ]);

  //     map.addControl(directions);
  //   });

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const [nik, setNik] = useState("");
  const [nama, setNama] = useState("");
  const [nohp, setNohp] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [waktu, setWaktu] = useState("");
  const [lokasikejadian, setLokasi] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");

  //state loading
  const [isLoading, setLoading] = useState(false);

  //history
  const history = useHistory();

  const storePengaduan = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();

    formData.append("nik", nik);
    formData.append("nama", nama);
    formData.append("nomor_hp", nohp);
    formData.append("deskripsi_kejadian", deskripsi);
    formData.append("lokasi_kejadian", lokasikejadian);
    formData.append("tanggal_kejadian", tanggal);
    formData.append("waktu_kejadian", waktu);
    formData.append("lng_kejadian", longitude);
    formData.append("lat_kejadian", latitude);

    await Api.post("/callcenter/pengaduan-masuk", formData, {
      // header

      headers: {
        //header Bearer + Token
        // Authorization: `Bearer ${token}`,
        // objects: "/ppid/permohonan-informasi-publik",
        // statusUsers: status,
      },
    })
      .then((response) => {
        setLoading(false);
        //show toast
        toast.success("Data Pengaduan Saved Successfully!", {
          duration: 4000,
          position: "top-right",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });

        localStorage.setItem("data", JSON.stringify(response.data.data));
        history.push("/");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
   }


  //=========================================================
  //MAPBOX
  //=========================================================

  const mapContainer = useRef(null);

  useEffect(() => {
    //init map
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [112.150002, -8.1],
      zoom: 12,
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

    //init marker
    const marker = new mapboxgl.Marker({
      draggable: true,
      color: "rgb(255,0,0)",
    })

      //set longtitude and latitude
      .setLngLat([longitude, latitude])
      //add marker to map
      .addTo(map);

    //geocoder result
    geocoder.on("result", function (e) {
      //remove marker
      marker.remove();

      //set longitude and latitude
      marker
        .setLngLat(e.result.center)

        //add to map
        .addTo(map);

      //event marker on dragend
      marker.on("dragend", function (e) {
        //assign longitude and latitude to state
        setLongitude(e.target._lngLat.lng);
        setLatitude(e.target._lngLat.lat);
      });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <LayoutWeb>
        <div className="pt-20 pb-20">
          <div className="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-6/12">
            <div className="card-body">
              <div className="p-5 rounded-md shadow-md bg-gray-50">
                <hr />
                {/* <div
                ref={mapContainer}
                className="map-container"
                style={{ height: "300px" }}
              /> */}
                <img
                  className="mx-auto"
                  width="100"
                  height="100"
                  src={require("../../../assets/blitarcirclecop.png")}
                />
                <form onSubmit={storePengaduan}>
                  <div className="mb-5">
                    <label className="mt-2">NIK</label>
                    <input
                      type="number"
                      value={nik}
                      onChange={(e) => setNik(e.target.value)}
                      className="w-full p-5 mt-2 placeholder-gray-600 bg-gray-200 border border-gray-200 rounded shadow-sm appearance-none h-7 focus:outline-none focus:placeholder-gray-600 focus:bg-white focus-within:text-gray-600"
                      placeholder="No Identitas Kependudukan"
                    />
                  </div>
                  <div className="mb-5">
                    <label className="mt-2">Nama Lengkap</label>
                    <input
                      type="text"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      className="w-full p-5 mt-2 placeholder-gray-600 bg-gray-200 border border-gray-200 rounded shadow-sm appearance-none h-7 focus:outline-none focus:placeholder-gray-600 focus:bg-white focus-within:text-gray-600"
                      placeholder="Nama Lengkap"
                    />
                  </div>
                  <div className="mb-5">
                    <label className="mt-2">No Handphone</label>
                    <input
                      type="number"
                      value={nohp}
                      onChange={(e) => setNohp(e.target.value)}
                      className="w-full p-5 mt-2 placeholder-gray-600 bg-gray-200 border border-gray-200 rounded shadow-sm appearance-none h-7 focus:outline-none focus:placeholder-gray-600 focus:bg-white focus-within:text-gray-600"
                      placeholder="No Handphone / Whatsapp"
                    />
                  </div>
                  <div className="mb-5">
                    <label className="mt-2">Deskripsi Kejadian</label>
                    <textarea
                      type="text"
                      value={deskripsi}
                      onChange={(e) => setDeskripsi(e.target.value)}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Deskripsi Kejadian"
                      rows="5"
                    />
                  </div>
                  <div className="mb-5">
                    <label className="mt-2">Tanggal Kejadian</label>
                    <input
                      type="date"
                      value={tanggal}
                      onChange={(e) => setTanggal(e.target.value)}
                      className="w-full p-5 mt-2 placeholder-gray-600 bg-gray-200 border border-gray-200 rounded shadow-sm appearance-none h-7 focus:outline-none focus:placeholder-gray-600 focus:bg-white focus-within:text-gray-600"
                      placeholder="No Handphone / Whatsapp"
                    />
                  </div>
                  <div className="mb-5">
                    <label className="mt-2">Waktu Kejadian</label>
                    <input
                      type="time"
                      value={waktu}
                      onChange={(e) => setWaktu(e.target.value)}
                      className="w-full p-5 mt-2 placeholder-gray-600 bg-gray-200 border border-gray-200 rounded shadow-sm appearance-none h-7 focus:outline-none focus:placeholder-gray-600 focus:bg-white focus-within:text-gray-600"
                    />
                  </div>
                  <div className="mb-5">
                    <label className="mt-2">Detail Lokasi Kejadian</label>
                    <input
                      type="text"
                      value={lokasikejadian}
                      onChange={(e) => setLokasi(e.target.value)}
                      className="w-full p-5 mt-2 placeholder-gray-600 bg-gray-200 border border-gray-200 rounded shadow-sm appearance-none h-7 focus:outline-none focus:placeholder-gray-600 focus:bg-white focus-within:text-gray-600"
                    />
                  </div>
                  <div className="grid grid-flow-col grid-rows-2 gap-4">
                    <div className="row-span-2 row-end-3">
                      <input
                        type="text"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                        className="w-full p-5 mt-2 placeholder-gray-600 bg-gray-200 border border-gray-200 rounded shadow-sm appearance-none h-7 focus:outline-none focus:placeholder-gray-600 focus:bg-white focus-within:text-gray-600"
                        placeholder="longitude"
                      />
                    </div>
                    <div className="row-span-2 row-end-3">
                      <input
                        type="text"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                        className="w-full p-5 mt-2 placeholder-gray-600 bg-gray-200 border border-gray-200 rounded shadow-sm appearance-none h-7 focus:outline-none focus:placeholder-gray-600 focus:bg-white focus-within:text-gray-600"
                        placeholder="latitude"
                      />
                    </div>
                  </div>
                  <br></br>
                  <div
                    ref={mapContainer}
                    className="map-container"
                    style={{ height: "300px" }}
                  />

                  <div>
                    <button
                      type="submit"
                      className="inline-block w-full px-3 py-1 mt-2 text-xl text-white bg-gray-700 rounded-md shadow-md focus:outline-none focus:bg-gray-900"
                    >
                       {" "}
                        {isLoading ? "LOADING..." : "SUBMIT"}{" "}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </LayoutWeb>
    </React.Fragment>
  );
}

export default CallCenter;
