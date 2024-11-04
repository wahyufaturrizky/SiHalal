// title ambil dari locales
export default [
  {
    title: "dashboard",
    icon: { icon: "ri-home-smile-line" },
    to: "index",
    action: "read",
    subject: "AclDemo",
  },
  { heading: "registrasi_sh" },
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
    title: "New Fasilitator",
    icon: { icon: "ri-home-smile-line" },
    children: [
      {
        title: "Inquiry",
        to: "fasilitator-list-inquiry-facilitation",
      },
      {
        title: "Pembatalan Permohonan",
        to: "fasilitator-list-canceled-fasilitation",
      },
    ],
  },
];
