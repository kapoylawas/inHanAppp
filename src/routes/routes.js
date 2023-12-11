import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../pages/admin/Auth/Login";
import LoginPegawai from "../pages/admin/Auth/LoginPegawai";
import LoginUmum from "../pages/admin/Auth/LoginUmum";
import Register from "../pages/admin/Register/Index";
import Verifikasi from "../pages/admin/Verifikasi/Index";
import VerifikasiUmum from "../pages/admin/VerifikasiUmum/Index";
import AllMenu from "../pages/web/AllMenu";
import Berita from "../pages/web/Berita";
import DetailBerita from "../pages/web/Berita/detailBerita";
import Blikosda from "../pages/web/Blikosda";
import CallCenter from "../pages/web/CallCenter";
import Home from "../pages/web/Home";
import Ppid from "../pages/web/Ppid";
import FormPermohonan from "../pages/web/Ppid/formPermohonan";
import TandaTrima from "../pages/web/Ppid/tandaTrima";
import Radio from "../pages/web/Radio";
import Confirm from "../pages/web/Sipul/confirm";
import Sipul from "../pages/web/Sipul/Index";
import IsiForm from "../pages/web/Sipul/isiForm";
import ListFrorm from "../pages/web/Sipul/listForm";
import Ulpim from "../pages/web/Ulpim";
import DataUlpim from "../pages/web/Ulpim/dataUlpim";
import DetailPengaduan from "../pages/web/Ulpim/detailPengaduan";
import KirimPengaduan from "../pages/web/Ulpim/kirimPengaduan";
import LihatPengaduanOpd from "../pages/web/Ulpim/lihatPengaduanOpd";
import PengaduanOpd from "../pages/web/Ulpim/pengaduanOpd";
import PengaduanUser from "../pages/web/Ulpim/pengaduanUser";
import WebVIew from "../pages/web/WebView";
import ConfirmWeb from "../pages/web/WebView/confirmWeb";
import IsiFormWeb from "../pages/web/WebView/isiFormWeb";
import ListFrormWeb from "../pages/web/WebView/listFormWeb";
import SipulWeb from "../pages/web/WebView/sipulWeb";
import Wisata from "../pages/web/Wisata";
import Detail from "../pages/web/Wisata/detail";
import PrivateRoute from "./PrivateRoutes";
import OpdPegawai from "../pages/web/Ulpim/opdPegawai";
import Jawaban from "../pages/web/Ulpim/jawaban";
import Aptika from "../pages/web/Aptika";
import AduanWeb from "../pages/web/Aptika/aduanWeb";
import Sapras from "../pages/web/Sapras";
import Send from "../pages/web/Sapras/send";
import Laporan from "../pages/web/Sapras/laporan";
import Elanda from "../pages/web/Elanda";
import Pelaporan from "../pages/web/Elanda/pelaporan";
import Rekom from "../pages/web/Elanda/rekom";
import Sipak from "../pages/web/Sipak/Index";
import Pendaftaran from "../pages/web/Sipak/pendaftaran";
import Lacak from "../pages/web/Sipak/lacak";
import Pelayanan from "../pages/web/Sipak/pelayanan";
import KartuKeluarga from "../pages/web/Sipak/kartuKeluarga";
import Kia from "../pages/web/Sipak/kia";
import Kta from "../pages/web/Sipak/kta";

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
      <Route exact path="/web/blikosda">
        <Blikosda />
      </Route>
      <Route exact path="/web/lainya">
        <AllMenu />
      </Route>
      <Route exact path="/web/radio">
        <Radio />
      </Route>
      <PrivateRoute exact path="/web/callCenter">
        <CallCenter />
      </PrivateRoute>
      <PrivateRoute exact path="/web/kirimPengaduan">
        <KirimPengaduan />
      </PrivateRoute>
      <PrivateRoute exact path="/web/dataUlpim/:id">
        <DetailPengaduan />
      </PrivateRoute>
      <PrivateRoute exact path="/web/lihatPengaduanOpd/:id">
        <LihatPengaduanOpd />
      </PrivateRoute>
      <PrivateRoute exact path="/web/pengaduanUser">
        <PengaduanUser />
      </PrivateRoute>
      <PrivateRoute exact path="/web/opdPegawai">
        <OpdPegawai />
      </PrivateRoute>
      <PrivateRoute exact path="/web/jawaban/:id_pesan/:id_istansi">
        <Jawaban />
      </PrivateRoute>
      <PrivateRoute exact path="/web/sipul">
        <Sipul />
      </PrivateRoute>
      <PrivateRoute exact path="/web/listForm">
        <ListFrorm />
      </PrivateRoute>
      <PrivateRoute exact path="/web/isiForm/:id">
        <IsiForm />
      </PrivateRoute>
      <PrivateRoute exact path="/web/confirm">
        <Confirm />
      </PrivateRoute>
      <Route exact path="/web/wisata">
        <Wisata />
      </Route>
      <Route exact path="/web/detail/:id">
        <Detail />
      </Route>
      <Route exact path="/web/berita">
        <Berita />
      </Route>
      <PrivateRoute exact path="/web/aptika">
        <Aptika />
      </PrivateRoute>
      <PrivateRoute exact path="/web/aduanWeb">
        <AduanWeb />
      </PrivateRoute>
      <Route exact path="/web/sarpras">
        <Sapras />
      </Route>
      <PrivateRoute exact path="/web/send">
        <Send />
      </PrivateRoute>
      <PrivateRoute exact path="/web/laporan">
        <Laporan />
      </PrivateRoute>
      <Route exact path="/web/elanda">
        <Elanda />
      </Route>
      <PrivateRoute exact path="/web/rekom">
        <Rekom />
      </PrivateRoute>
      <PrivateRoute exact path="/web/pelaporan">
        <Pelaporan />
      </PrivateRoute>
      <Route exact path="/web/sipak">
        <Sipak />
      </Route>
      <PrivateRoute exact path="/web/pendaftaran">
        <Pendaftaran />
      </PrivateRoute>
      <PrivateRoute exact path="/web/lacak">
        <Lacak />
      </PrivateRoute>
      <PrivateRoute exact path="/web/pelayanan">
        <Pelayanan />
      </PrivateRoute>
      <PrivateRoute exact path="/web/kk">
        <KartuKeluarga />
      </PrivateRoute>
      <PrivateRoute exact path="/web/kia">
        <Kia />
      </PrivateRoute>
      <PrivateRoute exact path="/web/kta">
        <Kta />
      </PrivateRoute>
      <Route exact path="/web/detailBerita/:id">
        <DetailBerita />
      </Route>
      <Route exact path="/web/sipulWeb">
        <SipulWeb />
      </Route>
      <Route exact path="/web/listFormWeb">
        <ListFrormWeb />
      </Route>
      <Route exact path="/web/isiFormWeb/:id">
        <IsiFormWeb />
      </Route>
      <Route exact path="/web/confirmWeb">
        <ConfirmWeb />
      </Route>
    </Switch>
  );
}

export default Routes;
