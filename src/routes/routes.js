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
import WebVIew from "../pages/web/WebView";

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
      <Route exact path="/web/formPermohonan/:id">
        <FormPermohonan />
      </Route>
      <Route exact path="/web/tandaTrima">
        <TandaTrima />
      </Route>
      <Route exact path="/web/webview">
        <WebVIew />
      </Route>
      <Route exact path="/web/ulpim">
        <Ulpim />
      </Route>
    </Switch>
  );
}

export default Routes;
