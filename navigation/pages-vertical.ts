// title ambil dari locales
export default [
  { heading: 'Menu Utama' },
  {
    title: 'dashboard',
    icon: { icon: 'fa-home' },
    to: 'index',
    action: 'read',
    subject: 'AclDemo',
  },
  {
    title: 'Pelaku Usaha',
    icon: { icon: 'mdi-account-tie' },
    to: 'pelaku-usaha',
  },
  { heading: 'registrasi_sh' },
  {
    title: 'sh_domestic.title',
    icon: { icon: 'mdi-card-account-details-outline' },
    children: [
      {
        title: 'pengajuan_reguler',
        to: 'sh-domestic-submission-reguler',
      },
      {
        title: 'sh_domestic.self_declare',
        to: 'sh-domestic-submission-self-declare',
      },
      {
        title: 'sh_domestic.status_request',
        to: 'sh-domestic-submission-status',
      },
      {
        title: 'sh_domestic.revision',
        to: 'sh-domestic-certificate-revision',
      },
      {
        title: 'sh_domestic.bill',
        to: 'sh-domestic-bill',
      },
      {
        title: 'sh_domestic.due_bill',
        to: 'sh-domestic-due-bill',
      },
      {
        title: 'sh_domestic.guide',
        to: 'sh-domestic-guide-halal-label',
      },
    ],
  },
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
  {
    title: 'pendaftaran_online.title',
    icon: { icon: 'fa-drivers-license-o' },
    children: [
      {
        title: 'pendaftaran_online.bahan_non_sertif',
        to: 'online-registration-non-certified-material-approval',
      },
      {
        title: 'pendaftaran_online.distribusi_kf',
        to: 'online-registration-distribution-to-kf-secretariat',
      },
      {
        title: 'pendaftaran_online.verifikasi_ol',
        to: 'online-registration-online-verification',
      },
      {
        title: 'pendaftaran_online.status_komite',
        to: 'online-registration-status-received-by-fatwa-committee',
      },
      {
        title: 'pendaftaran_online.verifikasi_kf',
        to: 'online-registration-verification-report-secretariat-kf',
      },
      {
        title: 'pendaftaran_online.verifikasi_sd',
        to: 'online-registration-self-declare-verification',
      },
      {
        title: 'pendaftaran_online.laporan_verifikasi',
        to: 'online-registration-verification-report',
      },
      {
        title: 'pendaftaran_online.verifikasi_auditor',
        to: 'online-registration-auditor-verification',
      },
      {
        title: 'pendaftaran_online.verifikasi_fasilitator',
        to: 'online-registration-facilitator-verification',
      },
      {
        title: 'pendaftaran_online.entri_data_sert_penyelia',
        to: 'online-registration-data-entry-supervisor-certificate',
      },
      {
        title: 'pendaftaran_online.info_bayar',
        to: 'online-registration-payment-information',
      },
      {
        title: 'pendaftaran_online.update_sidang_fatwa',
        to: 'online-registration-fatwa-session-update',
      },
      {
        title: 'pendaftaran_online.penerbit_sertifikat',
        to: 'online-registration-certificate-issuance',
      },
      {
        title: 'pendaftaran_online.penerbit_sertifikat_sd',
        to: 'online-registration-self-declare-certificate-issuance',
      },
      {
        title: 'pendaftaran_online.lampiran_sertifikat',
        to: 'online-registration-certificate-attachment',
      },
      {
        title: 'pendaftaran_online.proses_persetujuan',
        to: 'online-registration-approval-process',
      },
      {
        title: 'pendaftaran_online.perubahan_produk',
        to: 'online-registration-product-change',
      },
      {
        title: 'pendaftaran_online.daftar_fasilitasi',
        to: 'online-registration-facilitation-list',
      },
      {
        title: 'pendaftaran_online.duplikat_data',
        to: 'online-registration-data-duplication',
      },
      {
        title: 'pendaftaran_online.permohonan_rev_sh',
        to: 'online-registration-sh-revision-request',
      },
    ],
  },
  {
    title: 'internal_audit.title',
    icon: { icon: 'mdi-list-box-outline' },
    children: [
      {
        title: 'internal_audit.entry',
        to: 'internal-audit-entry',
      },
      {
        title: 'internal_audit.status',
        to: 'internal-audit-status',
      },
    ],
  },
  { heading: 'registrasi_shln' },
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
      {
        title: 'shln_verification',
        to: 'sertifikasi-halal-shln-verification',
      },
      {
        title: 'shln_payment',
        to: 'sertifikasi-halal-shln-payment',
      },
      {
        title: 'shln_inquiry',
        to: 'sertifikasi-halal-shln-inquiry',
      },
    ],
  },
  { heading: 'registrar' },
  {
    title: 'facilitator_profile',
    to: 'facilitator-profile',
    icon: { icon: 'mdi-account' },
  },
  { heading: 'facilitate.heading' },
  {
    title: 'facilitate.entry',
    to: 'facilitation-entry',
    icon: { icon: 'mdi-card-account-details-outline' },
  },
  {
    title: 'facilitate.list',
    to: 'facilitation-register',
    icon: { icon: 'mdi-list-box-outline' },
  },
  { heading: 'pelaku_usaha.heading' },
  {
    title: 'pelaku_usaha.inquery',
    to: 'facilitator-list-inquiry-facilitation',
    icon: { icon: 'mdi-help-circle-outline' },
  },
  {
    title: 'pelaku_usaha.cancel',
    to: 'facilitator-list-canceled-facilitation',
    icon: { icon: 'mdi-calendar-remove-outline' },
  },
  { heading: 'facilitate.heading-invoice' },
  {
    title: 'facilitate.invoice',
    to: 'facilitator-list-invoice',
    icon: { icon: 'mdi-invoice-text-outline' },
  },
  { heading: 'information.heading' },
  {
    title: 'information.material.title',
    icon: { icon: 'mdi-book-open-blank-variant-outline' },
    children: [
      {
        title: 'information.material.faq',
        to: 'material-faq',
      },
      {
        title: 'information.material.reference',
        to: 'material-reference',
      },
    ],
  },
]
