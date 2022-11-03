import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../pages/admin/Auth/Login";
import LoginPegawai from "../pages/admin/Auth/LoginPegawai";
import LoginUmum from "../pages/admin/Auth/LoginUmum";
import Register from "../pages/admin/Register/Index";
import Verifikasi from "../pages/admin/Verifikasi/Index";
import VerifikasiUmum from "../pages/admin/VerifikasiUmum/Index";
import Home from "../pages/web/Home";
import Ppid from "../pages/web/Ppid";
import FormPermohonan from "../pages/web/Ppid/formPermohonan";
import TandaTrima from "../pages/web/Ppid/tandaTrima";
import Ulpim from "../pages/web/Ulpim";
import DataUlpim from "../pages/web/Ulpim/dataUlpim";
import DetailPengaduan from "../pages/web/Ulpim/detailPengaduan";
import KirimPengaduan from "../pages/web/Ulpim/kirimPengaduan";
import LihatPengaduanOpd from "../pages/web/Ulpim/lihatPengaduanOpd";
import PengaduanOpd from "../pages/web/Ulpim/pengaduanOpd";
import WebVIew from "../pages/web/WebView";
import PrivateRoute from "./PrivateRoutes";

function Routes() {
  return (
    <Switch>
      {/* route "/admin/login" */}
      <Route exact path="/admin/register">
        <Register />
      </Route>
      <Route exact path="/admin/login">
        <Login />
      </Route>
      <Route exact path="/admin/login/pegawai">
        <LoginPegawai />
      </Route>
      <Route exact path="/admin/login/umum">
        <LoginUmum />
      </Route>
      <Route exact path="/admin/login/verifikasi">
        <Verifikasi />
      </Route>
      <Route exact path="/admin/login/verifikasiUmum">
        <VerifikasiUmum />
      </Route>
      {/* route "/WEB" */}
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/web/ppid">
        <Ppid />
      </Route>
      <PrivateRoute exact path="/web/formPermohonan/:id">
        <FormPermohonan />
      </PrivateRoute>
      <Route exact path="/web/tandaTrima">
        <TandaTrima />
      </Route>
      <Route exact path="/web/webview">
        <WebVIew />
      </Route>
      <Route exact path="/web/ulpim">
        <Ulpim />
      </Route>
      <Route exact path="/web/dataUlpim">
        <DataUlpim />
      </Route>
      <Route exact path="/web/pengaduanOpd">
        <PengaduanOpd />
      </Route>
      <PrivateRoute exact path="/web/kirimPengaduan">
        <KirimPengaduan />
      </PrivateRoute>
      <PrivateRoute exact path="/web/dataUlpim/:id">
        <DetailPengaduan />
      </PrivateRoute>
      <PrivateRoute exact path="/web/lihatPengaduanOpd/:id">
        <LihatPengaduanOpd />
      </PrivateRoute>
    </Switch>
  );
}

export default Routes;
