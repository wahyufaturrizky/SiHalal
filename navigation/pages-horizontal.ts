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
]
