//title ambil dari locales
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
    title: "sh_dalam_negeri",
    icon: { icon: "ri-home-smile-line" },
    children: [
      {
        title: "pengajuan_reguler",
        to: "sertifikasi-halal-reguler",
      },
    ],
  },
];
