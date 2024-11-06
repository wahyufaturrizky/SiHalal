// title ambil dari locales
export default [
  {
    title: "dashboard",
    icon: { icon: "ri-home-smile-line" },
    to: "index",
    action: "read",
    subject: "AclDemo",
  },
  {
    title: "registrasi_sh",
    icon: { icon: "ri-more-line" },
    children: [
      {
        title: "Sertifikasi",
        icon: { icon: "ri-home-smile-line" },
        children: [
          {
            title: "pengajuan_reguler",
            to: "sertifikasi-halal-reguler",
          },
          {
            title: "tagihan_jatuh_tempo",
            to: "sertifikasi-halal-jatuh-tempo",
          },
          {
            title: "tagihan_invoice",
            to: "sertifikasi-halal-tagihan-invoice",
          },
          {
            title: "manajemen_pengguna",
            icon: { icon: "ri-home-smile-line" },
            children: [
              {
                title: "uam_user",
                to: "user-management-user",
              },
              {
                title: "uam_role",
                to: "user-management-role",
              },
            ],
          },
        ],
      },
      {
        title: "pendaftaran_online.title",
        icon: { icon: "fa-drivers-license-o" },
        children: [
          {
            title: "pendaftaran_online.bahan_non_sertif",
            to: "sertifikasi-halal-reguler",
          },
          {
            title: "pendaftaran_online.distribusi_kf",
            to: "sertifikasi-halal-reguler",
          },
          {
            title: "pendaftaran_online.verifikasi_ol",
            to: "sertifikasi-halal-reguler",
          },
          {
            title: "pendaftaran_online.status_komite",
            to: "sertifikasi-halal-reguler",
          },
          {
            title: "pendaftaran_online.verifikasi_kf",
            to: "sertifikasi-halal-reguler",
          },
          {
            title: "pendaftaran_online.verifikasi_sd",
            to: "sertifikasi-halal-reguler",
          },
          {
            title: "pendaftaran_online.laporan_verifikasi",
            to: "sertifikasi-halal-reguler",
          },
          {
            title: "pendaftaran_online.verifikasi_auditor",
            to: "sertifikasi-halal-reguler",
          },
          {
            title: "pendaftaran_online.verifikasi_fasilitator",
            to: "sertifikasi-halal-reguler",
          },
          {
            title: "pendaftaran_online.entri_data_sert_penyelia",
            to: "sertifikasi-halal-reguler",
          },
          {
            title: "pendaftaran_online.info_bayar",
            to: "sertifikasi-halal-reguler",
          },
          {
            title: "pendaftaran_online.update_sidang_fatwa",
            to: "sertifikasi-halal-reguler",
          },
          {
            title: "pendaftaran_online.penerbit_sertifikat",
            to: "sertifikasi-halal-reguler",
          },
          {
            title: "pendaftaran_online.penerbit_sertifikat_sd",
            to: "sertifikasi-halal-reguler",
          },
          {
            title: "pendaftaran_online.lampiran_sertifikat",
            to: "sertifikasi-halal-reguler",
          },
          {
            title: "pendaftaran_online.proses_persetujuan",
            to: "sertifikasi-halal-reguler",
          },
          {
            title: "pendaftaran_online.perubahan_produk",
            to: "sertifikasi-halal-reguler",
          },
          {
            title: "pendaftaran_online.daftar_fasilitasi",
            to: "sertifikasi-halal-reguler",
          },
          {
            title: "pendaftaran_online.duplikat_data",
            to: "sertifikasi-halal-reguler",
          },
          {
            title: "pendaftaran_online.permohonan_rev_sh",
            to: "sertifikasi-halal-reguler",
          },
        ],
      },
      {
        title: "fasilitator.new_fasilitator",
        icon: { icon: "ri-home-smile-line" },
        children: [
          {
            title: "fasilitator.inquiry",
            to: "fasilitator-list-inquiry-facilitation",
          },
          {
            title: "fasilitator.cancellation_of_application",
            to: "fasilitator-list-canceled-fasilitation",
          },
          {
            title: "fasilitator.invoice",
            to: "fasilitator-list-invoice",
          },
        ],
      },
    ],
  },
  {
    title: "registrasi_sh",
    icon: { icon: "ri-more-line" },
    children: [
      {
        title: "sh_dalam_negeri",
        icon: { icon: "ri-home-smile-line" },
        children: [
          {
            title: "pengajuan_reguler",
            to: "sertifikasi-halal-reguler",
          },
        ],
      },
    ],
  },

  {
    title: "registrasi_sh",
    icon: { icon: "ri-more-line" },
    children: [
      {
        title: "sh_dalam_negeri",
        icon: { icon: "ri-home-smile-line" },
        children: [
          {
            title: "pengajuan_reguler",
            to: "sertifikasi-halal-reguler",
          },
        ],
      },
    ],
  },
  {
    title: "registrasi_sh",
    icon: { icon: "ri-more-line" },
    children: [
      {
        title: "sh_dalam_negeri",
        icon: { icon: "ri-home-smile-line" },
        children: [
          {
            title: "pengajuan_reguler",
            to: "sertifikasi-halal-reguler",
          },
        ],
      },
    ],
  },
];
