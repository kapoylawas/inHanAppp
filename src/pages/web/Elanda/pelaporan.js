import React, { useEffect, useState } from "react";
import LayoutWeb from "../../../layouts/web";
import Api from "../../../api";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import toast from "react-hot-toast";

function Pelaporan() {
  document.title = "E-landa - Rekomendasi Iji Penelitian";

  return (
    <React.Fragment>
      <LayoutWeb>
        <div className="pt-20 pb-20"></div>
      </LayoutWeb>
    </React.Fragment>
  );
}

export default Pelaporan;
