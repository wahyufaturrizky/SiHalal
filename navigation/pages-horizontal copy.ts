// title ambil dari locales
export default [
  {
    title: 'dashboard',
    icon: { icon: 'ri-home-smile-line' },
    to: 'index',
    action: 'manage',
    roles: ['Pelaku Usaha', 'Admin'],
    subject: ['Pelaku Usaha', 'Fasilitator', 'Admin'],
  },
  {
    title: 'Pelaku Usaha',
    icon: { icon: 'mdi-account-tie' },
    to: 'pelaku-usaha',
    roles: ['Pelaku Usaha', 'Admin'],
  },
  {
    title: 'registrasi_sh',
    icon: { icon: 'ri-more-line' },
    roles: ['Pelaku Usaha', 'Verifikator HLN', , 'Pendamping', 'Admin'],
    children: [
      {
        title: 'Sertifikasi',
        icon: { icon: 'ri-home-smile-line' },
        roles: ['Pelaku Usaha', 'Admin'],
        children: [
          {
            title: 'pengajuan_reguler',
            to: 'sertifikasi-halal-reguler',
            roles: ['Pelaku Usaha', 'Admin'],
          },
          {
            title: 'Cek Data Pengajuan',
            to: 'sh-domestic-submission-self-declare-list-pengajuan-pu-pendamping',
            roles: ['Pendamping', 'Admin'],
          },
          {
            title: 'tagihan_jatuh_tempo',
            to: 'sertifikasi-halal-jatuh-tempo',
            roles: ['Pelaku Usaha', 'Admin'],
          },
          {
            title: 'tagihan_invoice',
            to: 'sertifikasi-halal-tagihan-invoice',
            roles: ['Pelaku Usaha', 'Admin'],
          },
          {
            title: 'manajemen_pengguna',
            icon: { icon: 'ri-home-smile-line' },
            roles: ['Pelaku Usaha', 'Admin'],
            children: [
              {
                title: 'uam_user',
                to: 'user-management-user',
                roles: ['Pelaku Usaha', 'Admin'],
              },
              {
                title: 'uam_role',
                to: 'user-management-role',
                roles: ['Pelaku Usaha', 'Admin'],
              },
            ],
          },
        ],
      },
      {
        title: 'pendaftaran_online.title',
        icon: { icon: 'fa-drivers-license-o' },
        roles: ['Pelaku Usaha', 'Admin'],
        children: [
          {
            title: 'pendaftaran_online.bahan_non_sertif',
            to: 'online-registration-non-certified-material-approval',
            roles: ['Pelaku Usaha', 'Admin'],
          },
          {
            title: 'pendaftaran_online.distribusi_kf',
            to: 'online-registration-distribution-to-kf-secretariat',
            roles: ['Pelaku Usaha', 'Admin'],
          },
          {
            title: 'pendaftaran_online.verifikasi_ol',
            to: 'online-registration-regular-verification',
            roles: ['Verifikator Reguler', 'Admin'],
          },
          {
            title: 'pendaftaran_online.status_komite',
            to: 'online-registration-status-received-by-fatwa-committee',
            roles: ['Pelaku Usaha', 'Admin'],
          },
          {
            title: 'pendaftaran_online.verifikasi_kf',
            to: 'online-registration-verification-report-secretariat-kf',
            roles: ['Pelaku Usaha', 'Admin'],
          },
          {
            title: 'pendaftaran_online.verifikasi_sd',
            to: 'online-registration-self-declare-verification',
            roles: ['Verifikator Self-Declare', 'Admin'],
          },
          {
            title: 'pendaftaran_online.laporan_verifikasi',
            to: 'online-registration-verification-report',
            roles: ['Pelaku Usaha', 'Admin'],
          },
          {
            title: 'pendaftaran_online.verifikasi_auditor',
            to: 'online-registration-auditor-verification',
            roles: ['Pelaku Usaha', 'Admin'],
          },
          {
            title: 'pendaftaran_online.verifikasi_fasilitator',
            to: 'online-registration-facilitator-verification',
            roles: ['Verifikator Fasilitator', 'Admin'],
          },
          {
            title: 'pendaftaran_online.entri_data_sert_penyelia',
            to: 'online-registration-data-entry-supervisor-certificate',
            roles: ['Pelaku Usaha', 'Admin'],
          },
          {
            title: 'pendaftaran_online.info_bayar',
            to: 'online-registration-payment-information',
            roles: ['Pelaku Usaha', 'Admin'],
          },
          {
            title: 'pendaftaran_online.update_sidang_fatwa',
            to: 'online-registration-fatwa-session-update',
            roles: ['Pelaku Usaha', 'Admin'],
          },
          {
            title: 'pendaftaran_online.penerbit_sertifikat',
            to: 'online-registration-certificate-issuance',
            roles: ['Pelaku Usaha', 'Admin'],
          },
          {
            title: 'pendaftaran_online.penerbit_sertifikat_sd',
            to: 'online-registration-self-declare-certificate-issuance',
            roles: ['Pelaku Usaha', 'Admin'],
          },
          {
            title: 'pendaftaran_online.lampiran_sertifikat',
            to: 'online-registration-certificate-attachment',
            roles: ['Pelaku Usaha', 'Admin'],
          },
          {
            title: 'pendaftaran_online.proses_persetujuan',
            to: 'online-registration-approval-process',
            roles: ['Pelaku Usaha', 'Admin'],
          },
          {
            title: 'pendaftaran_online.perubahan_produk',
            to: 'online-registration-product-change',
            roles: ['Pelaku Usaha', 'Admin'],
          },
          {
            title: 'pendaftaran_online.daftar_fasilitasi',
            to: 'online-registration-facilitation-list',
            roles: ['Pelaku Usaha', 'Admin'],
          },
          {
            title: 'pendaftaran_online.duplikat_data',
            to: 'online-registration-data-duplication',
            roles: ['Pelaku Usaha', 'Admin'],
          },
          {
            title: 'pendaftaran_online.permohonan_rev_sh',
            to: 'online-registration-sh-revision-request',
            roles: ['Pelaku Usaha', 'Admin'],
          },
        ],
      },
      {
        title: 'sh_domestic.title',
        icon: { icon: 'mdi-card-account-details-outline' },
        roles: ['Pelaku Usaha', 'Admin'],
        children: [
          {
            title: 'pengajuan_reguler',
            to: 'sh-domestic-submission-reguler',
            roles: ['Pelaku Usaha', 'Admin'],
          },
          {
            title: 'sh_domestic.self_declare',
            to: 'sh-domestic-submission-self-declare',
            roles: ['Pelaku Usaha', 'Admin'],
          },
          {
            title: 'sh_domestic.status_request',
            to: 'sh-domestic-status',
            roles: ['Pelaku Usaha', 'Admin'],
          },
          {
            title: 'sh_domestic.revision',
            to: 'sh-domestic-certificate-revision',
            roles: ['Pelaku Usaha', 'Admin'],
          },
          {
            title: 'sh_domestic.bill',
            to: 'sh-domestic-bill',
            roles: ['Pelaku Usaha', 'Admin'],
          },
          {
            title: 'sh_domestic.due_bill',
            to: 'sh-domestic-due-bill',
            roles: ['Pelaku Usaha', 'Admin'],
          },
          {
            title: 'sh_domestic.guide',
            to: 'sh-domestic-guide-halal-label',
            roles: ['Pelaku Usaha', 'Admin'],
          },
        ],
      },
      {
        title: 'Proses di LPH',
        icon: { icon: 'mdi-card-account-details-outline' },
        roles: ['LPH', 'Admin'],
        children: [
          {
            title: 'Daftar Ajuan',
            to: 'sh-domestic-submission-reguler',
            roles: ['LPH', 'Admin'],
          },
          {
            title: 'Daftar Ajuan Diterima',
            to: 'sh-domestic-submission-self-declare',
            roles: ['LPH', 'Admin'],
          },
          {
            title: 'Info Pembayaran',
            to: 'sh-domestic-status',
            roles: ['LPH', 'Admin'],
          },
          {
            title: 'Update Pemeriksaan',
            to: 'sh-domestic-certificate-revision',
            roles: ['LPH', 'Admin'],
          },
          {
            title: 'Penyelesaian Data Post Audit',
            to: 'sh-domestic-bill',
            roles: ['LPH', 'Admin'],
          },
          {
            title: 'Inquiry',
            to: 'sh-domestic-due-bill',
            roles: ['LPH', 'Admin'],
          },
          {
            title: 'Buat Tagihan ke BPJPH',
            to: 'sh-domestic-guide-halal-label',
            roles: ['LPH', 'Admin'],
          },
          {
            title: 'Daftar Tagihan ke BPJPH',
            to: 'sh-domestic-guide-halal-label',
            roles: ['LPH', 'Admin'],
          },
        ],
      },
      {
        title: 'internal_audit.title',
        icon: { icon: 'mdi-list-box-outline' },
        roles: ['Pelaku Usaha', 'Admin'],
        children: [
          {
            title: 'internal_audit.entry',
            to: 'internal-audit-entry',
            roles: ['Pelaku Usaha', 'Admin'],
          },
          {
            title: 'internal_audit.status',
            to: 'internal-audit-status',
            roles: ['Pelaku Usaha', 'Admin'],
          },
        ],
      },
    ],
  },
  {
    title: 'registrar',
    icon: { icon: 'ri-more-line' },
    roles: ['Pelaku Usaha', , 'Fasilitator', 'Admin'],
    children: [
      {
        title: 'facilitator_Profile',
        to: 'applicant-profile',
        icon: { icon: 'mdi-account' },
        roles: ['Fasilitator', 'Admin'],
      },
    ],
  },
  {
    title: 'facilitate.heading',
    icon: { icon: 'ri-more-line' },
    roles: ['Pelaku Usaha', 'Admin'],
    children: [
      {
        title: 'facilitate.entry',
        to: 'facilitation-entry',
        icon: { icon: 'mdi-card-account-details-outline' },
        roles: ['Fasilitator', 'Admin'],
      },
      {
        title: 'facilitate.list',
        to: 'facilitation-list',
        icon: { icon: 'mdi-list-box-outline' },
        roles: ['Fasilitator', 'Admin'],
      },
    ],
  },
  {
    title: 'pelaku_usaha.heading',
    icon: { icon: 'ri-more-line' },
    roles: ['Pelaku Usaha', 'Admin'],
    children: [
      {
        title: 'pelaku_usaha.inquery',
        to: 'bussiness-actor-list-inquiry',
        icon: { icon: 'mdi-help-circle-outline' },
        roles: ['Fasilitator', 'Admin'],
      },
      {
        title: 'pelaku_usaha.cancel',
        to: 'bussiness-actor-list-cancelation',
        icon: { icon: 'mdi-calendar-remove-outline' },
        roles: ['Fasilitator', 'Admin'],
      },
    ],
  },
  {
    title: 'facilitate.heading-invoice',
    icon: { icon: 'ri-more-line' },
    roles: ['Fasilitator', 'Keuangan', 'Admin'],
    children: [
      {
        title: 'facilitate.invoice',
        to: 'infoice-facilitate',
        icon: { icon: 'mdi-invoice-text-outline' },
        roles: ['Fasilitator', 'Admin'],
      },
      {
        title: 'facilitate.invoice',
        to: 'finance-invoice-facilitate',
        icon: { icon: 'mdi-invoice-text-outline' },
        roles: ['Keuangan', 'Admin'],
      },
      {
        title: 'Invoice - SHLN',
        icon: { icon: 'mdi-invoice-text-outline' },
        to: 'finance-invoice-pelaku-usaha',
        roles: ['Keuangan', 'Admin'],
      },
    ],
  },
  {
    title: 'registrasi_shln',
    icon: { icon: 'ri-more-line' },
    roles: ['Pelaku Usaha', 'Verifikator HLN', 'Admin'],
    children: [
      {
        title: 'sh_luar_negeri',
        icon: { icon: 'ri-id-card-line' },
        roles: ['Pelaku Usaha', 'Admin'],
        children: [
          {
            title: 'shln_submission',
            to: 'sertifikasi-halal-luar-negeri-submission',
            roles: ['Pelaku Usaha', 'Admin'],
          },
          {
            title: 'shln_invoice',
            roles: ['Pelaku Usaha', 'Admin'],
            to: 'sertifikasi-halal-luar-negeri-invoice',
          },

          {
            title: 'shln_verification',
            to: 'sertifikasi-halal-luar-negeri-verification',
            roles: ['Verifikator HLN', 'Admin'],
          },
          {
            title: 'shln_payment',
            to: 'sertifikasi-halal-shln-payment',
            roles: ['Pelaku Usaha', 'Admin'],
          },
          {
            title: 'shln_inquiry',
            to: 'sertifikasi-halal-luar-negeri-inquiry',
            roles: ['Pelaku Usaha', 'Admin'],
          },
        ],
      },
    ],
  },
  {
    title: 'information.material.title',
    icon: { icon: 'mdi-book-open-blank-variant-outline' },
    roles: ['Pelaku Usaha', 'Admin'],
    children: [
      {
        title: 'information.material.faq',
        to: 'material-faq',
        roles: ['Pelaku Usaha', 'Admin'],
      },
      {
        title: 'information.material.reference',
        to: 'material-reference',
        roles: ['Pelaku Usaha', 'Admin'],
      },
    ],
  },
  {
    title: 'sidang_fatwa.title',
    icon: { icon: 'mdi-scale-balance' },
    roles: ['Komisi', 'Komite Fatwa', 'Admin'],
    children: [
      {
        title: 'Proses Sidang',
        to: 'sidang-fatwa-tabel-pengajuan',
        roles: ['Komite Fatwa', 'Admin'],
      },
    ],
  },
  {
    title: 'sidang_self_declare.title',
    icon: { icon: 'mdi-scale-balance' },
    roles: ['Komite Fatwa', 'Admin'],
    children: [
      {
        title: 'sidang_self_declare.proses_sidang',
        to: 'sidang-fatwa-proses-sidang',
        roles: ['Komite Fatwa', 'Admin'],
      },
      {
        title: 'sidang_self_declare.entry_ketetapan_halal',
        to: 'sidang-self-declare-entry-ketetapan-halal',
        roles: ['Komite Fatwa', 'Admin'],
      },
      {
        title: 'sidang_self_declare.inquiry',
        to: 'sidang-self-declare-inquiry',
        roles: ['Komite Fatwa', 'Admin'],
      },
      {
        title: 'sidang_self_declare.rekapitulasi',
        to: 'sidang-self-declare-rekapitulasi',
        roles: ['Komite Fatwa', 'Admin'],
      },
    ],
  },
]
