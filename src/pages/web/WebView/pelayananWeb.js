import React, { useEffect, useState } from "react";
import LayoutWeb from "../../../layouts/web";
import Api from "../../../api";
import Cookies from "js-cookie";
import Garis from "../../../components/utilities/garis";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

function PelayananWeb() {
  document.title = "Sipak - Pelayanan 3 in 1";

  const status = localStorage.getItem("status");
  const token = Cookies.get("token");
  const [isLoading, setLoading] = useState(false);

  const [dataForm, setDataForm] = useState("");
  const [persyaratanRaw, setPersyaratanRaw] = useState([]);

  const [nik, setNik] = useState("");
  const [kk, setKk] = useState("");
  const [email, setEmail] = useState("");
  const [telepon, setTelepon] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [jenis, setJenis] = useState("");
  const [nama, setNama] = useState("");
  const [saksi, setSaksi] = useState("");
  const [niksaksi, setNiksaksi] = useState("");
  const [nmsaksi2, setNmsaksi2] = useState("");
  const [niksaksi2, setNiksaksi2] = useState("");
  const [nmayah, setNmayah] = useState("");
  const [nikayah, setNikayah] = useState("");
  const [nmibu, setNmibu] = useState("");
  const [nikibu, setNikibu] = useState("");
  const [nmanak, setNmanak] = useState("");
  const [kota, setKota] = useState("");
  const [tgl, setTgl] = useState("");
  const [jm, setJm] = useState("");

  const handleshowhideGender = (event) => {
    const getType = event.target.value;
    setGender(getType);
  };

  const handleshowhideLocation = (event) => {
    const getType = event.target.value;
    setLocation(getType);
  };

  const handleshowhideJenis = (event) => {
    const getType = event.target.value;
    setJenis(getType);
  };

  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const syaratjml = dataForm.syarat_jml;
  const tmptkn = dataForm.temp_tkn;
  const idprodukdokumen = dataForm.id_produk_dokumen;
  const jenislayanan = dataForm.jenis_layanan;
  const jenispermohonan = dataForm.jenis_permohonan;
  const permohonandokumen = dataForm.permohonan_dokumen;

  // const nikpmhn = localStorage.getItem("nip");
  // const stringNik = nikpmhn.replace(/"/g, "");
  // const nikpemohon = [stringNik];
  // const kkpmhn = localStorage.getItem("kk");
  // const stringKk = kkpmhn.replace(/"/g, "");

  const fetchData = async () => {
    await Api.get(
      `/sipak/get-form?id_produk_dokumen=2&id_jenis_permohonan=3&nik=${3505032212860004}&no_kk=${3572022901180003}`,
      {
        headers: {
          //header Bearer + Token
          // Authorization: `Bearer ${token}`,
          objects: "/isarpras/get-kategori",
          statusUsers: status,
        },
      }
    )
      .then((response) => {
        setLoading(false);
        setDataForm(response.data.data);
        setPersyaratanRaw(response.data.data.persyaratan_raw);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    //call function "fetchDataPlaces"
    fetchData();
    setLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [imagekitas, setImagekitas] = useState("");

  const handleFileChange = (e) => {
    const imageData = e.target.files[0];

    if (imageData) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        // Lakukan sesuatu dengan base64String, misalnya simpan di state
        setImagekitas(base64String);
      };
      reader.readAsDataURL(imageData);
    }

    if (!imageData.type.match("image.*")) {
      setImagekitas("");

      toast.error("Format File Tidak Cocok", {
        duration: 4000,
        position: "top-right",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }
    setImagekitas(imageData);
  };

  const [rtrw, setImagertrw] = useState("");

  const handleFilertrw = (e) => {
    const imageData = e.target.files[0];

    if (imageData) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        // Lakukan sesuatu dengan base64String, misalnya simpan di state
        setImagertrw(base64String);
      };
      reader.readAsDataURL(imageData);
    }

    if (!imageData.type.match("image.*")) {
      setImagertrw("");

      toast.error("Format File Tidak Cocok", {
        duration: 4000,
        position: "top-right",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }
    setImagertrw(imageData);
  };

  const [noakta, setImagernoakta] = useState("");
  const handleFilenoakta = (e) => {
    const imageData = e.target.files[0];

    if (imageData) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        // Lakukan sesuatu dengan base64String, misalnya simpan di state
        setImagernoakta(base64String);
      };
      reader.readAsDataURL(imageData);
    }

    if (!imageData.type.match("image.*")) {
      setImagernoakta("");

      toast.error("Format File Tidak Cocok", {
        duration: 4000,
        position: "top-right",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }
    setImagernoakta(imageData);
  };

  const [slahir, setImageslahir] = useState("");
  const handleFileslahir = (e) => {
    const imageData = e.target.files[0];

    if (imageData) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        // Lakukan sesuatu dengan base64String, misalnya simpan di state
        setImageslahir(base64String);
      };
      reader.readAsDataURL(imageData);
    }

    if (!imageData.type.match("image.*")) {
      setImageslahir("");

      toast.error("Format File Tidak Cocok", {
        duration: 4000,
        position: "top-right",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }
    setImageslahir(imageData);
  };

  const [noaktanikah, setImagenoaktanikah] = useState("");
  const handleFilenoaktanikah = (e) => {
    const imageData = e.target.files[0];

    if (imageData) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        // Lakukan sesuatu dengan base64String, misalnya simpan di state
        setImagenoaktanikah(base64String);
      };
      reader.readAsDataURL(imageData);
    }

    if (!imageData.type.match("image.*")) {
      setImagenoaktanikah("");

      toast.error("Format File Tidak Cocok", {
        duration: 4000,
        position: "top-right",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }
    setImagenoaktanikah(imageData);
  };

  const [statuskawin, setImagestatuskawin] = useState("");
  const handleFilestatuskawin = (e) => {
    const imageData = e.target.files[0];

    if (imageData) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        // Lakukan sesuatu dengan base64String, misalnya simpan di state
        setImagestatuskawin(base64String);
      };
      reader.readAsDataURL(imageData);
    }

    if (!imageData.type.match("image.*")) {
      setImagestatuskawin("");

      toast.error("Format File Tidak Cocok", {
        duration: 4000,
        position: "top-right",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }
    setImagestatuskawin(imageData);
  };

  const [kkortu, setImagekkortu] = useState("");
  const handleFilekkortu = (e) => {
    const imageData = e.target.files[0];

    if (imageData) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        // Lakukan sesuatu dengan base64String, misalnya simpan di state
        setImagekkortu(base64String);
      };
      reader.readAsDataURL(imageData);
    }

    if (!imageData.type.match("image.*")) {
      setImagekkortu("");

      toast.error("Format File Tidak Cocok", {
        duration: 4000,
        position: "top-right",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }
    setImagekkortu(imageData);
  };

  const [bukunikah, setImagebukunikah] = useState("");
  const handleFilebukunikah = (e) => {
    const imageData = e.target.files[0];

    if (imageData) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        // Lakukan sesuatu dengan base64String, misalnya simpan di state
        setImagebukunikah(base64String);
      };
      reader.readAsDataURL(imageData);
    }

    if (!imageData.type.match("image.*")) {
      setImagebukunikah("");

      toast.error("Format File Tidak Cocok", {
        duration: 4000,
        position: "top-right",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }
    setImagebukunikah(imageData);
  };

  const [aktakawin, setImageaktakawin] = useState("");
  const handleFileaktakawin = (e) => {
    const imageData = e.target.files[0];

    if (imageData) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        // Lakukan sesuatu dengan base64String, misalnya simpan di state
        setImageaktakawin(base64String);
      };
      reader.readAsDataURL(imageData);
    }

    if (!imageData.type.match("image.*")) {
      setImageaktakawin("");

      toast.error("Format File Tidak Cocok", {
        duration: 4000,
        position: "top-right",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }
    setImageaktakawin(imageData);
  };

  const [akta3, setImageakta3] = useState("");
  const handleFileakta3 = (e) => {
    const imageData = e.target.files[0];

    if (imageData) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        // Lakukan sesuatu dengan base64String, misalnya simpan di state
        setImageakta3(base64String);
      };
      reader.readAsDataURL(imageData);
    }

    if (!imageData.type.match("image.*")) {
      setImageakta3("");

      toast.error("Format File Tidak Cocok", {
        duration: 4000,
        position: "top-right",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }
    setImageakta3(imageData);
  };

  const [showInput, setShowInput] = useState(false);
  const handlePlusClick = () => {
    setShowInput(!showInput);
  };

  const [showrtrw, setShowrtrw] = useState(false);
  const handlePlusrtrw = () => {
    setShowrtrw(!showrtrw);
  };

  const [shownoakta, setShownoakta] = useState(false);
  const handlePlusnoakta = () => {
    setShownoakta(!shownoakta);
  };

  const [showslahir, setShowslahir] = useState(false);
  const handlePlusslahir = () => {
    setShowslahir(!showslahir);
  };

  const [shownoaktanikah, setShownoaktanikah] = useState(false);
  const handlePlusnoaktanikah = () => {
    setShownoaktanikah(!shownoaktanikah);
  };

  const [showstatuskawin, setShowstatuskawin] = useState(false);
  const handlePlusstatuskawin = () => {
    setShowstatuskawin(!showstatuskawin);
  };

  const [showkkortu, setShowkkortu] = useState(false);
  const handlePluskkortu = () => {
    setShowkkortu(!showkkortu);
  };

  const [showbukunikah, setShowbukunikah] = useState(false);
  const handlePlusbukunikah = () => {
    setShowbukunikah(!showbukunikah);
  };

  const [showaktakawin, setShowaktakawin] = useState(false);
  const handlePlusaktakawin = () => {
    setShowaktakawin(!showaktakawin);
  };

  const [showakta3, setShowakta3] = useState(false);
  const handlePlusakta3 = () => {
    setShowakta3(!showakta3);
  };


  const [tipe, setTipe] = useState("");

  const handleshowhide = (event) => {
    const getType = event.target.value;
    setTipe(getType);
  };

  const history = useHistory();
  const storeSipak = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("nik", '3505032212860004');
    formData.append("email", email);
    formData.append("telepon", telepon);
    formData.append("syarat_jml", syaratjml);
    formData.append("temp_tkn", tmptkn);
    formData.append("id_produk_dokumen", idprodukdokumen);
    formData.append("jenis_layanan", jenislayanan);
    formData.append("jenis_permohonan", jenispermohonan);
    formData.append("jenis_pengambilan", tipe);
    formData.append("permohonan_dokumen", permohonandokumen);
    formData.append("nik_pemohon_dokumen", ['3505032212860004']);
    formData.append("nama_anak", nmanak);
    formData.append("ttl_tempat", location);
    formData.append("ttl_tanggal", tgl);
    formData.append("ext_fileinput_1_1", imagekitas);
    formData.append("ext_fileinput_2_1", rtrw);
    formData.append("ext_fileinput_3_1", noakta);
    formData.append("ext_fileinput_4_1", slahir);
    formData.append("ext_fileinput_5_1", noaktanikah);
    formData.append("ext_fileinput_6_1", statuskawin);
    formData.append("ext_fileinput_7_1", kkortu);
    formData.append("ext_fileinput_8_1", bukunikah);
    formData.append("ext_fileinput_9_1", aktakawin);
    formData.append("ext_fileinput_10_1", akta3);
    formData.append("ext_fileinput_11_1", imagekitas);
    formData.append("persyaratan_raw", persyaratanRaw);
    formData.append("pelapor_nama", nama);
    formData.append("no_kk", 3572022901180003);
    formData.append("saksi_nama_1", saksi);
    formData.append("saksi_nik_1", niksaksi);
    formData.append("saksi_nama_2", nmsaksi2);
    formData.append("saksi_nik_2", niksaksi2);
    formData.append("ortu_nama_ayah", nmayah);
    formData.append("ortu_nik_ayah", nikayah);
    formData.append("ortu_nama_ibu", nmibu);
    formData.append("ortu_nik_ibu", nikibu);
    formData.append("anak_nama", nmanak);
    formData.append("anak_jk", nmanak);
    formData.append("anak_tmp_dilahirkan", location);
    formData.append("anak_kelahiran_ke", 2);
    formData.append("anak_penolong_kelahiran", "penolong");
    formData.append("anak_berat", 60);
    formData.append("anak_panjang", 60);

    await Api.post("/sipak/store-permohonan", formData, {
      headers: {
        //header Bearer + Token
        // Authorization: `Bearer ${token}`,
        objects: "/sipak/store-permohonan",
        statusUsers: status,
      },
    })
      .then((response) => {
        //set state isLoading to "false"
        setLoading(false);
        //show toast
        // const status = response.data.success
        if (response.status) {
          // Lakukan sesuatu dengan data yang diterima
          toast.success("Berhasil Menyimpan Data.", {
            duration: 9000,
            position: "top-center",
            style: {
              border: "1px solid #713200",
              padding: "16px",
              color: "#713200",
            },
            iconTheme: {
              primary: "#713200",
              secondary: "#FFFAEE",
            },
          });
          history.push("/web/sipakWeb");
        } else {
          // Tampilkan pesan toast jika status bukan 'success'
          toast.error("Data salah. Coba lagi.");
        }
      })
      .catch((error) => {
        //set state isLoading to "false"
        setLoading(false);
        console.error("Gagal mengambil data:", error);
        toast.error("Terjadi kesalahan. Coba lagi.");
      });
  };

  return (
    <React.Fragment>
      <div className="pt-10 pb-10">
        <div className="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-6/12">
          <div className="container p-5 mx-auto bg-gray-100 rounded-md shadow-md">
            <div className="mb-3 text-center">
              <div
                className="p-4 text-orange-700 bg-orange-100 border-l-4 border-orange-600"
                role="alert"
              >
                <p>
                  Mohon diperhatikan sebelum mengajukan permohonan, jika
                  pengajuan permohonan diwakilkan, permohonan dibatasi hanya
                  boleh diajukan oleh pemohon (sesuai data user login SIPAK)
                  yang tercatat dalam satu KK yang sama.
                </p>
              </div>
            </div>
          </div>

          <div className="container p-5 mx-auto mt-3 mb-20 bg-gray-100 rounded-md shadow-md">
            <form onSubmit={storeSipak}>
              {step === 1 && (
                <div>
                  <div className="mb-6">
                    <label
                      for="email"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Nama
                    </label>
                    <input
                      type="text"
                      value={nama}
                      className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="nama lengkap pelapor"
                      onChange={(e) => setNama(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                      <label
                        for="first_name"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        NIK
                      </label>
                      <input
                        type="text"
                        className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="3572021011050001"
                        // onChange={(e) => setNik(e.target.value)}
                        value={3505032212860004}
                        disabled
                      />
                    </div>
                    <div>
                      <label
                        for="last_name"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        No KK
                      </label>
                      <input
                        type="text"
                        className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="3572020607070039"
                        onChange={(e) => setKk(e.target.value)}
                        value={3572022901180003}
                        required
                      />
                    </div>
                    <div>
                      <label
                        for="first_name"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Nama Saksi
                      </label>
                      <input
                        type="text"
                        className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="inputkan nama saksi lengkap"
                        onChange={(e) => setSaksi(e.target.value)}
                        value={saksi}
                        required
                      />
                    </div>
                    <div>
                      <label
                        for="last_name"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        NIK Saksi
                      </label>
                      <input
                        type="text"
                        className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="input nik saksi"
                        onChange={(e) => setNiksaksi(e.target.value)}
                        value={niksaksi}
                        required
                      />
                    </div>
                    <div>
                      <label
                        for="first_name"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Nama Saksi 2
                      </label>
                      <input
                        type="text"
                        className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="inputkan nama saksi lengkap 2"
                        onChange={(e) => setNmsaksi2(e.target.value)}
                        value={nmsaksi2}
                        required
                      />
                    </div>
                    <div>
                      <label
                        for="last_name"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        NIK Saksi 2
                      </label>
                      <input
                        type="text"
                        className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="input nik saksi 2"
                        onChange={(e) => setNiksaksi2(e.target.value)}
                        value={niksaksi2}
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900">
                        Nama Ayah
                      </label>
                      <input
                        type="text"
                        className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="inputkan nama ayah lengkap 2"
                        onChange={(e) => setNmayah(e.target.value)}
                        value={nmayah}
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900">
                        NIK Ayah
                      </label>
                      <input
                        type="text"
                        className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="input nik ayah 2"
                        onChange={(e) => setNikayah(e.target.value)}
                        value={nikayah}
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900">
                        Nama Ibu
                      </label>
                      <input
                        type="text"
                        className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="inputkan nama ibu lengkap 2"
                        onChange={(e) => setNmibu(e.target.value)}
                        value={nmibu}
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900">
                        NIK Ibu
                      </label>
                      <input
                        type="text"
                        className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="input nik ibu 2"
                        onChange={(e) => setNikibu(e.target.value)}
                        value={nikibu}
                        required
                      />
                    </div>
                  </div>
                  <b>
                    {" "}
                    <Garis />
                  </b>
                  <div className="mt-2 mb-2">
                    <label
                      for="email"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Nama Anak
                    </label>
                    <input
                      type="text"
                      className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="nama lengkap anak"
                      onChange={(e) => setNmanak(e.target.value)}
                      value={nmanak}
                      required
                    />
                  </div>
                  <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                      <label
                        for="first_name"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Jenis Kelamin
                      </label>
                      <select
                        value={gender}
                        className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) => handleshowhideGender(e)}
                      >
                        <option value="">-- Jenis Kelamin --</option>
                        <option value="L">Laki-Laki</option>
                        <option value="P">Perempuan</option>
                      </select>
                    </div>
                    <div>
                      <label
                        for="last_name"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Tempat dilahirkan
                      </label>
                      <select
                        value={location}
                        className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) => handleshowhideLocation(e)}
                      >
                        <option value="">-- Pilih Tempat dilahirkan --</option>
                        <option value="RS">RS</option>
                        <option value="Puskesmas">Puskesmas</option>
                      </select>
                    </div>
                    <div>
                      <label
                        for="last_name"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Tempat Kelahiran
                      </label>
                      <input
                        type="text"
                        className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Contoh : KOTA BLITAR"
                        onChange={(e) => setKota(e.target.value)}
                        value={kota}
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900">
                        Tanggal Lahir
                      </label>
                      <input
                        type="date"
                        className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) => setTgl(e.target.value)}
                        value={tgl}
                        required
                      />
                    </div>
                    <div>
                      <label
                        for="last_name"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Pukul
                      </label>
                      <input
                        type="time"
                        className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        onChange={(e) => setJm(e.target.value)}
                        value={jm}
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900">
                        Jenis Kelahiran
                      </label>
                      <select
                        value={jenis}
                        className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) => handleshowhideJenis(e)}
                      >
                        <option value="">-- Pilih Jenis Kelahiran --</option>
                        <option value="Tunggal">Tunggal</option>
                        <option value="Kembar">Kembar</option>
                      </select>
                    </div>
                  </div>
                  <button
                    onClick={nextStep}
                    className="p-2 mt-3 text-white bg-blue-500 rounded"
                  >
                    Next
                  </button>
                </div>
              )}
              {step === 2 && (
                <div>
                  <div
                    className="flex p-4 mb-4 text-sm text-black-900 rounded-lg bg-blue-300 dark:bg-gray-800 dark:text-blue-400"
                    role="alert"
                  >
                    <svg
                      className="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                      <span className="font-medium">
                        CATATAN : Bayi belum punya NIK / Masuk KK dan status KTP
                        Orang Tua sudah kawin, Pelapor adalah Orang Tua kandung
                        Silahkan download dan isi form dibawah dengan benar
                        (sesuai dengan data yang dibutuhkan), kemudian upload
                        foto form yang telah di isi sesuai dengan bagian
                        persyaratan yang dimaksud.
                      </span>
                      <ul class="mt-1.5 list-disc list-inside">
                        <li>
                          {" "}
                          <a href="https://www.w3schools.com" target="_blank">
                            Form F-1.01
                          </a>{" "}
                        </li>
                        <li> Form F-2.01 Kelahiran</li>
                        <li>Form F-2.04 SPJTM Kebenaran Suami Istri</li>
                        <li>Form F-2.03 SPJTM Kebenaran Kelahiran</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mb-6">
                    <label
                      className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-900"
                      for="file_input"
                    >
                      Form F-1.01 FORMAT (PNG,JPG,JPEG)
                    </label>
                    <div className="flex mb-4 space-x-2.5">
                      <input
                        className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        id="multiple_files"
                        type="file"
                        multiple
                        onChange={handleFileChange}
                      />

                      <div
                        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                        onClick={handlePlusClick}
                      >
                        {showInput ? "-" : "+"}
                      </div>
                    </div>
                    {showInput && (
                      <div className="flex mb-4 space-x-2.5">
                        <input
                          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                          id="multiple_files"
                          type="file"
                          multiple
                          onChange={handleFileChange}
                        />
                      </div>
                    )}
                  </div>
                  <div className="mb-6">
                    <label
                      className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-900"
                      for="file_input"
                    >
                      Pengantar RT / RW (asli)
                    </label>
                    <div className="flex mb-4 space-x-2.5">
                      <input
                        className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        id="multiple_files"
                        type="file"
                        multiple
                        onChange={setImagertrw}
                      />

                      <div
                        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                        onClick={handlePlusrtrw}
                      >
                        {showrtrw ? "-" : "+"}
                      </div>
                    </div>
                    {showrtrw && (
                      <div className="flex mb-4 space-x-2.5">
                        <input
                          className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          id="multiple_files"
                          type="file"
                          multiple
                          onChange={handleFileChange}
                        />
                      </div>
                    )}
                  </div>
                  <div className="mb-6">
                    <label
                      className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-900"
                      for="file_input"
                    >
                      Form F-1.05 (bagi yang tidak punya akta nikah)
                    </label>
                    <div className="flex mb-4 space-x-2.5">
                      <input
                        className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        id="multiple_files"
                        type="file"
                        multiple
                        onChange={handleFilenoakta}
                      />

                      <div
                        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                        onClick={handlePlusnoakta}
                      >
                        {shownoakta ? "-" : "+"}
                      </div>
                    </div>
                    {shownoakta && (
                      <div className="flex mb-4 space-x-2.5">
                        <input
                          className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          id="multiple_files"
                          type="file"
                          multiple
                          onChange={handleFileChange}
                        />
                      </div>
                    )}
                  </div>
                  <div className="mb-6">
                    <label
                      className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-900"
                      for="file_input"
                    >
                      Surat keterangan lahir dari Dokter / Bidan / Rumah Sakit/
                      Kelurahan (ASLI)
                    </label>
                    <div className="flex mb-4 space-x-2.5">
                      <input
                        className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        id="multiple_files"
                        type="file"
                        multiple
                        onChange={handleFileslahir}
                      />

                      <div
                        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                        onClick={handlePlusslahir}
                      >
                        {showslahir ? "-" : "+"}
                      </div>
                    </div>
                    {showslahir && (
                      <div className="flex mb-4 space-x-2.5">
                        <input
                          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                          id="multiple_files"
                          type="file"
                          multiple
                          onChange={handleFileChange}
                        />
                      </div>
                    )}
                  </div>
                  <div className="mb-6">
                    <label
                      className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-900"
                      for="file_input"
                    >
                      Form F-2.04 (bagi yang tidak punya akta nikah sesuai nama
                      di KK yang dilampirkan)
                    </label>
                    <div className="flex mb-4 space-x-2.5">
                      <input
                        className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        id="multiple_files"
                        type="file"
                        multiple
                        onChange={handleFilenoaktanikah}
                      />

                      <div
                        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                        onClick={handlePlusnoaktanikah}
                      >
                        {shownoaktanikah ? "-" : "+"}
                      </div>
                    </div>
                    {shownoaktanikah && (
                      <div className="flex mb-4 space-x-2.5">
                        <input
                          className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          id="multiple_files"
                          type="file"
                          multiple
                          onChange={handleFileChange}
                        />
                      </div>
                    )}
                  </div>
                  <div className="mb-6">
                    <label
                      className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-900"
                      for="file_input"
                    >
                      KTP-el AYAH IBU (status kawin) - (ASLI)
                    </label>
                    <div className="flex mb-4 space-x-2.5">
                      <input
                        className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        id="multiple_files"
                        type="file"
                        multiple
                        onChange={handleFilestatuskawin}
                      />

                      <div
                        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                        onClick={handlePlusstatuskawin}
                      >
                        {showstatuskawin ? "-" : "+"}
                      </div>
                    </div>
                    {showstatuskawin && (
                      <div className="flex mb-4 space-x-2.5">
                        <input
                          className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          id="multiple_files"
                          type="file"
                          multiple
                          onChange={handleFileChange}
                        />
                      </div>
                    )}
                  </div>
                  <div className="mb-6">
                    <label
                      className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-900"
                      for="file_input"
                    >
                      KK Orang Tua (ASLI)
                    </label>
                    <div className="flex mb-4 space-x-2.5">
                      <input
                        className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        id="multiple_files"
                        type="file"
                        multiple
                        onChange={handleFilekkortu}
                      />

                      <div
                        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                        onClick={handlePluskkortu}
                      >
                        {showkkortu ? "-" : "+"}
                      </div>
                    </div>
                    {showkkortu && (
                      <div className="flex mb-4 space-x-2.5">
                        <input
                          className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          id="multiple_files"
                          type="file"
                          multiple
                          onChange={handleFileChange}
                        />
                      </div>
                    )}
                  </div>
                  <div className="mb-6">
                    <label
                      className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-900"
                      for="file_input"
                    >
                      Buku Nikah / Akta Perkawinan (ASLI) - fotokan halaman ke 1
                      (bagian foto dan istri)
                    </label>
                    <div className="flex mb-4 space-x-2.5">
                      <input
                        className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        id="multiple_files"
                        type="file"
                        multiple
                        onChange={handleFilebukunikah}
                      />

                      <div
                        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                        onClick={handlePlusbukunikah}
                      >
                        {showbukunikah ? "-" : "+"}
                      </div>
                    </div>
                    {showbukunikah && (
                      <div className="flex mb-4 space-x-2.5">
                        <input
                          className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          id="multiple_files"
                          type="file"
                          multiple
                          onChange={handleFileChange}
                        />
                      </div>
                    )}
                  </div>
                  <div className="mb-6">
                    <label
                      className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-900"
                      for="file_input"
                    >
                      Buku Nikah / Akta Perkawinan (ASLI) - fotokan halaman ke 2
                      (bagian data suami dan istri)
                    </label>
                    <div className="flex mb-4 space-x-2.5">
                      <input
                        className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        id="multiple_files"
                        type="file"
                        multiple
                        onChange={handleFileaktakawin}
                      />

                      <div
                        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                        onClick={handlePlusaktakawin}
                      >
                        {showaktakawin ? "-" : "+"}
                      </div>
                    </div>
                    {showaktakawin && (
                      <div className="flex mb-4 space-x-2.5">
                        <input
                          className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          id="multiple_files"
                          type="file"
                          multiple
                          onChange={handleFileChange}
                        />
                      </div>
                    )}
                  </div>
                  <div className="mb-6">
                    <label
                      className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-900"
                      for="file_input"
                    >
                      Buku Nikah / Akta Perkawinan (ASLI) - fotokan halaman ke 3
                      (tanda tangan pejabat KUA)
                    </label>
                    <div className="flex mb-4 space-x-2.5">
                      <input
                        className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        id="multiple_files"
                        type="file"
                        multiple
                        onChange={handleFileakta3}
                      />

                      <div
                        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                        onClick={handlePlusakta3}
                      >
                        {showakta3 ? "-" : "+"}
                      </div>
                    </div>
                    {showakta3 && (
                      <div className="flex mb-4 space-x-2.5">
                        <input
                          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                          id="multiple_files"
                          type="file"
                          multiple
                          onChange={handleFileChange}
                        />
                      </div>
                    )}
                  </div>
                  <div className="mb-5">
                    <select
                      value={tipe}
                      className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline"
                      onChange={(e) => handleshowhide(e)}
                    >
                      <option value="">-- PILIH JENIS PENGAMBILAN --</option>
                      <option value="Cetak Mandiri">Cetak Mandiri</option>
                      <option value="Diambil Sendiri">Diambil Sendiri</option>
                    </select>
                  </div>
                  <button
                    onClick={prevStep}
                    className="p-2 mr-2 text-white bg-gray-500 rounded"
                  >
                    Previous
                  </button>
                  <button
                    type="submit"
                    className="inline-block w-full px-3 py-1 mt-2 text-xl text-white bg-gray-700 rounded-md shadow-md focus:outline-none focus:bg-gray-900"
                    disabled={isLoading}
                  >
                    {" "}
                    {isLoading ? "LOADING..." : "SUBMIT"}{" "}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default PelayananWeb;
