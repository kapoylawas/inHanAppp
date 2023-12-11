/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import Api from "../../api";

function Slider() {
  const slideImages = [
    {
      url: "https://admin-inhand.blitarkota.go.id/banner-img/wqeweq-19122022095939.jpg",
      caption: "",
    },
    {
      url: "https://admin-inhand.blitarkota.go.id/banner-img/zxcvbn-19122022100007.jpg",
      caption: "",
    },
  ];

  const [setErrorMessage] = useState("");

  const [banner, setBanner] = useState([]);
  console.log(banner);
  const sort = banner.sort();

  const fetchData = async () => {
    await Api.get(`/banner`, {
      // headers: {
      //   //header Bearer + Token
      //   objects: "/ppid/daftar-informasi-publik",
      //   statusUsers: 1,
      //   lng: latitude,
      //   lat: longitude
      // },
    })
      .then((response) => {
        // console.log(response);
        setBanner(response.data.data);
      })
      .catch((error) => {
        setErrorMessage(error);
      });
  };

  useEffect(() => {
    //call function "fetchDataPlaces"
    fetchData();
    // setIsLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      
      <div
        id="carouselExampleIndicators"
        class="carousel slide relative"
        data-bs-ride="carousel"
      >
        <div class="carousel-inner relative w-full overflow-hidden">
          {slideImages.map((slideImage) => (
            <div class="carousel-item active float-left w-full">
              <img
                src={slideImage.url}
                class="block w-full"
                alt="Wild Landscape"
              />
            </div>
          ))}
        </div>
        <button
          class="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            class="carousel-control-prev-icon inline-block bg-no-repeat"
            aria-hidden="true"
          ></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            class="carousel-control-next-icon inline-block bg-no-repeat"
            aria-hidden="true"
          ></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </React.Fragment>
  );
}

export default Slider;
