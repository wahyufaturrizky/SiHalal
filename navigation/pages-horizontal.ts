// title ambil dari locales
export default [
  {
    title: 'dashboard',
    icon: { icon: 'ri-home-smile-line' },
    to: 'index',
    action: 'read',
    subject: 'AclDemo',
  },
  {
    title: 'registrasi_sh',
    icon: { icon: 'ri-more-line' },
    children: [
      {
        title: 'Sertifikasi',
        icon: { icon: 'ri-home-smile-line' },
        children: [
          {
            title: 'pengajuan_reguler',
            to: 'sertifikasi-halal-reguler',
          },
          {
            title: 'tagihan_jatuh_tempo',
            to: 'sertifikasi-halal-jatuh-tempo',
          },
          {
            title: 'tagihan_invoice',
            to: 'sertifikasi-halal-tagihan-invoice',
          },
          {
            title: 'manajemen_pengguna',
            icon: { icon: 'ri-home-smile-line' },
            children: [
              {
                title: 'uam_user',
                to: 'user-management-user',
              },
              {
                title: 'uam_role',
                to: 'user-management-role',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'registrasi_shln',
    icon: { icon: 'ri-more-line' },
    children: [
      {
        title: 'sh_luar_negeri',
        icon: { icon: 'ri-id-card-line' },
        children: [
          {
            title: 'shln_submission',
            to: 'sertifikasi-halal-shln-submission',
          },
          {
            title: 'shln_invoice',
            to: 'sertifikasi-halal-shln-invoice',
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
    ],
  },
];
