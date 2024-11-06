// title ambil dari locales
export default [
  {
    title: "dashboard",
    icon: { icon: "fa-home" },
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
    title: "pendaftaran_online.title",
    icon: { icon: "fa-drivers-license-o" },
    children: [
      {
        title: "pendaftaran_online.bahan_non_sertif",
        to: "online-registration-non-certified-material-approval",
      },
      {
        title: "pendaftaran_online.distribusi_kf",
        to: "online-registration-distribution-to-kf-secretariat",
      },
      {
        title: "pendaftaran_online.verifikasi_ol",
        to: "online-registration-online-verification",
      },
      {
        title: "pendaftaran_online.status_komite",
        to: "online-registration-status-received-by-fatwa-committee",
      },
      {
        title: "pendaftaran_online.verifikasi_kf",
        to: "online-registration-verification-report-secretariat-kf",
      },
      {
        title: "pendaftaran_online.verifikasi_sd",
        to: "online-registration-self-declare-verification",
      },
      {
        title: "pendaftaran_online.laporan_verifikasi",
        to: "online-registration-verification-report",
      },
      {
        title: "pendaftaran_online.verifikasi_auditor",
        to: "online-registration-auditor-verification",
      },
      {
        title: "pendaftaran_online.verifikasi_fasilitator",
        to: "online-registration-facilitator-verification",
      },
      {
        title: "pendaftaran_online.entri_data_sert_penyelia",
        to: "online-registration-data-entry-supervisor-certificate",
      },
      {
        title: "pendaftaran_online.info_bayar",
        to: "online-registration-payment-information",
      },
      {
        title: "pendaftaran_online.update_sidang_fatwa",
        to: "online-registration-fatwa-session-update",
      },
      {
        title: "pendaftaran_online.penerbit_sertifikat",
        to: "online-registration-certificate-issuance",
      },
      {
        title: "pendaftaran_online.penerbit_sertifikat_sd",
        to: "online-registration-self-declare-certificate-issuance",
      },
      {
        title: "pendaftaran_online.lampiran_sertifikat",
        to: "online-registration-certificate-attachment",
      },
      {
        title: "pendaftaran_online.proses_persetujuan",
        to: "online-registration-approval-process",
      },
      {
        title: "pendaftaran_online.perubahan_produk",
        to: "online-registration-product-change",
      },
      {
        title: "pendaftaran_online.daftar_fasilitasi",
        to: "online-registration-facilitation-list",
      },
      {
        title: "pendaftaran_online.duplikat_data",
        to: "online-registration-data-duplication",
      },
      {
        title: "pendaftaran_online.permohonan_rev_sh",
        to: "online-registration-sh-revision-request",
      },
    ],
  },
  { heading: "registrasi_shln" },
  {
    title: "sh_luar_negeri",
    icon: { icon: "ri-id-card-line" },
    children: [
      {
        title: "shln_submission",
        to: "sertifikasi-halal-shln-submission",
      },
      {
        title: "shln_invoice",
        to: "sertifikasi-halal-shln-invoice",
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
];
