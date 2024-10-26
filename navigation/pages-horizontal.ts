//title ambil dari locales
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
