// title ambil dari locales
export default [
  {
    title: "dashboard",
    icon: { icon: "fa-home" },
    to: "index",
    action: "read",
    roles: ["Pelaku Usaha", "Admin"],
  },
  { heading: "Menu" },
  {
    title: "self_declare.title",
    icon: { icon: "fa-solid fa-id-card" },
    roles: ["Pendamping", "Pelaku Usaha"],
    children: [
      {
        title: "self_declare.cek_data_pengajuan",
        to: "self-declare-cek-data-pengajuan",
        roles: ["Pendamping", "Pelaku Usaha"],
      },
    ],
  },
  {
    title: "Pelaku Usaha",
    icon: { icon: "mdi-account-tie" },
    to: "pelaku-usaha",
    roles: ["Pelaku Usaha", "Admin"],
  },
  // { heading: "registrasi_sh" },
  // {
  //   title: "sh_domestic.title",
  //   icon: { icon: "mdi-card-account-details-outline" },
  //   roles: ["Pelaku Usaha", "Admin"],
  //   children: [
  //     {
  //       title: "pengajuan_reguler",
  //       to: "sh-domestic-submission-reguler",
  //       roles: ["Pelaku Usaha", "Admin"],
  //     },
  //     {
  //       title: "sh_domestic.self_declare",
  //       to: "sh-domestic-submission-self-declare",
  //       roles: ["Pelaku Usaha", "Admin"],
  //     },
  //     {
  //       title: "sh_domestic.status_request",
  //       to: "sh-domestic-submission-status",
  //       roles: ["Pelaku Usaha", "Admin"],
  //     },
  //     {
  //       title: "sh_domestic.revision",
  //       to: "sh-domestic-certificate-revision",
  //       roles: ["Pelaku Usaha", "Admin"],
  //     },
  //     {
  //       title: "sh_domestic.bill",
  //       to: "sh-domestic-bill",
  //       roles: ["Pelaku Usaha", "Admin"],
  //     },
  //     {
  //       title: "sh_domestic.due_bill",
  //       to: "sh-domestic-due-bill",
  //       roles: ["Pelaku Usaha", "Admin"],
  //     },
  //     {
  //       title: "sh_domestic.guide",
  //       to: "sh-domestic-guide-halal-label",
  //       roles: ["Pelaku Usaha", "Admin"],
  //     },
  //   ],
  // },
  // {
  //   title: "Sertifikasi",
  //   icon: { icon: "ri-home-smile-line" },
  //   roles: ["Pelaku Usaha", "Admin"],
  //   children: [
  //     {
  //       title: "pengajuan_reguler",
  //       to: "sertifikasi-halal-reguler",
  //       roles: ["Pelaku Usaha", "Admin"],
  //     },
  //     {
  //       title: "tagihan_jatuh_tempo",
  //       to: "sertifikasi-halal-jatuh-tempo",
  //       roles: ["Pelaku Usaha", "Admin"],
  //     },
  //     {
  //       title: "tagihan_invoice",
  //       to: "sertifikasi-halal-tagihan-invoice",
  //       roles: ["Pelaku Usaha", "Admin"],
  //     },
  //     {
  //       title: "manajemen_pengguna",
  //       roles: ["Pelaku Usaha", "Admin"],
  //       children: [
  //         {
  //           title: "uam_user",
  //           to: "user-management-user",
  //           roles: ["Pelaku Usaha", "Admin"],
  //         },
  //         {
  //           title: "uam_role",
  //           to: "user-management-role",
  //           roles: ["Pelaku Usaha", "Admin"],
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   title: "pendaftaran_online.title",
  //   icon: { icon: "fa-drivers-license-o" },
  //   roles: ["Pelaku Usaha", "Admin"],
  //   children: [
  //     {
  //       title: "pendaftaran_online.bahan_non_sertif",
  //       to: "online-registration-non-certified-material-approval",
  //       roles: ["Pelaku Usaha", "Admin"],
  //     },
  //     {
  //       title: "pendaftaran_online.distribusi_kf",
  //       to: "online-registration-distribution-to-kf-secretariat",
  //       roles: ["Pelaku Usaha", "Admin"],
  //     },
  //     {
  //       title: "pendaftaran_online.verifikasi_ol",
  //       to: "online-registration-online-verification",
  //       roles: ["Pelaku Usaha", "Admin"],
  //     },
  //     {
  //       title: "pendaftaran_online.status_komite",
  //       to: "online-registration-status-received-by-fatwa-committee",
  //       roles: ["Pelaku Usaha", "Admin"],
  //     },
  //     {
  //       title: "pendaftaran_online.verifikasi_kf",
  //       to: "online-registration-verification-report-secretariat-kf",
  //       roles: ["Pelaku Usaha", "Admin"],
  //     },
  //     {
  //       title: "pendaftaran_online.verifikasi_sd",
  //       to: "online-registration-self-declare-verification",
  //       roles: ["Pelaku Usaha", "Admin"],
  //     },
  //     {
  //       title: "pendaftaran_online.laporan_verifikasi",
  //       to: "online-registration-verification-report",
  //       roles: ["Pelaku Usaha", "Admin"],
  //     },
  //     {
  //       title: "pendaftaran_online.verifikasi_auditor",
  //       to: "online-registration-auditor-verification",
  //       roles: ["Pelaku Usaha", "Admin"],
  //     },
  //     {
  //       title: "pendaftaran_online.verifikasi_fasilitator",
  //       to: "online-registration-facilitator-verification",
  //       roles: ["Pelaku Usaha", "Admin"],
  //     },
  //     {
  //       title: "pendaftaran_online.entri_data_sert_penyelia",
  //       to: "online-registration-data-entry-supervisor-certificate",
  //       roles: ["Pelaku Usaha", "Admin"],
  //     },
  //     {
  //       title: "pendaftaran_online.info_bayar",
  //       to: "online-registration-payment-information",
  //       roles: ["Pelaku Usaha", "Admin"],
  //     },
  //     {
  //       title: "pendaftaran_online.update_sidang_fatwa",
  //       to: "online-registration-fatwa-session-update",
  //       roles: ["Pelaku Usaha", "Admin"],
  //     },
  //     {
  //       title: "pendaftaran_online.penerbit_sertifikat",
  //       to: "online-registration-certificate-issuance",
  //       roles: ["Pelaku Usaha", "Admin"],
  //     },
  //     {
  //       title: "pendaftaran_online.penerbit_sertifikat_sd",
  //       to: "online-registration-self-declare-certificate-issuance",
  //       roles: ["Pelaku Usaha", "Admin"],
  //     },
  //     {
  //       title: "pendaftaran_online.lampiran_sertifikat",
  //       to: "online-registration-certificate-attachment",
  //       roles: ["Pelaku Usaha", "Admin"],
  //     },
  //     {
  //       title: "pendaftaran_online.proses_persetujuan",
  //       to: "online-registration-approval-process",
  //       roles: ["Pelaku Usaha", "Admin"],
  //     },
  //     {
  //       title: "pendaftaran_online.perubahan_produk",
  //       to: "online-registration-product-change",
  //       roles: ["Pelaku Usaha", "Admin"],
  //     },
  //     {
  //       title: "pendaftaran_online.daftar_fasilitasi",
  //       to: "online-registration-facilitation-list",
  //       roles: ["Pelaku Usaha", "Admin"],
  //     },
  //     {
  //       title: "pendaftaran_online.duplikat_data",
  //       to: "online-registration-data-duplication",
  //       roles: ["Pelaku Usaha", "Admin"],
  //     },
  //     {
  //       title: "pendaftaran_online.permohonan_rev_sh",
  //       to: "online-registration-sh-revision-request",
  //       roles: ["Pelaku Usaha", "Admin"],
  //     },
  //   ],
  // },
  // {
  //   title: "internal_audit.title",
  //   icon: { icon: "mdi-list-box-outline" },
  //   roles: ["Pelaku Usaha", "Admin"],
  //   children: [
  //     {
  //       title: "internal_audit.entry",
  //       to: "internal-audit-entry",
  //       roles: ["Pelaku Usaha", "Admin"],
  //     },
  //     {
  //       title: "internal_audit.status",
  //       to: "internal-audit-status",
  //       roles: ["Pelaku Usaha", "Admin"],
  //     },
  //   ],
  // },
  // { heading: "registrasi_shln" },
  // {
  //   title: "sh_luar_negeri",
  //   icon: { icon: "ri-id-card-line" },
  //   roles: ["Pelaku Usaha", "Admin"],
  //   children: [
  //     {
  //       title: "shln_submission",
  //       to: "sertifikasi-halal-shln-submission",
  //       roles: ["Pelaku Usaha", "Admin"],
  //     },
  //     {
  //       title: "shln_invoice",
  //       to: "sertifikasi-halal-shln-invoice",
  //       roles: ["Pelaku Usaha", "Admin"],
  //     },
  //     {
  //       title: "shln_verification",
  //       to: "sertifikasi-halal-shln-verification",
  //       roles: ["Pelaku Usaha", "Admin"],
  //     },
  //     {
  //       title: "shln_payment",
  //       to: "sertifikasi-halal-shln-payment",
  //       roles: ["Pelaku Usaha", "Admin"],
  //     },
  //     {
  //       title: "shln_inquiry",
  //       to: "sertifikasi-halal-shln-inquiry",
  //       roles: ["Pelaku Usaha", "Admin"],
  //     },
  //   ],
  // },
  // { heading: "registrar" },
  // {
  //   title: "facilitator_profile",
  //   to: "facilitator-profile",
  //   icon: { icon: "mdi-account" },
  //   roles: ["Pelaku Usaha", "Admin"],
  // },
  // { heading: "facilitate.heading" },
  // {
  //   title: "facilitate.entry",
  //   to: "facilitation-entry",
  //   icon: { icon: "mdi-card-account-details-outline" },
  //   roles: ["Pelaku Usaha", "Admin"],
  // },
  // {
  //   title: "facilitate.list",
  //   to: "facilitation-register",
  //   icon: { icon: "mdi-list-box-outline" },
  //   roles: ["Pelaku Usaha", "Admin"],
  // },
  // { heading: "pelaku_usaha.heading" },
  // {
  //   title: "pelaku_usaha.inquery",
  //   to: "facilitator-list-inquiry-facilitation",
  //   icon: { icon: "mdi-help-circle-outline" },
  //   roles: ["Pelaku Usaha", "Admin"],
  // },
  // {
  //   title: "pelaku_usaha.cancel",
  //   to: "facilitator-list-canceled-facilitation",
  //   icon: { icon: "mdi-calendar-remove-outline" },
  //   roles: ["Pelaku Usaha", "Admin"],
  // },
  // { heading: "facilitate.heading-invoice" },
  // {
  //   title: "facilitate.invoice",
  //   to: "facilitator-list-invoice",
  //   icon: { icon: "mdi-invoice-text-outline" },
  //   roles: ["Pelaku Usaha", "Admin"],
  // },
  // {
  //   title: "Invoice - Fasilitator Finance",
  //   to: "finance-invoice",
  //   icon: { icon: "mdi-invoice-text-outline" },
  //   roles: ["Pelaku Usaha", "Admin"],
  // },
  // {
  //   title: "Invoice - Fasilitator Fasilitasi",
  //   to: "facilitation-invoice",
  //   icon: { icon: "mdi-invoice-text-outline" },
  //   roles: ["Pelaku Usaha", "Admin"],
  // },
  // { heading: "information.heading" },
  // {
  //   title: "information.material.title",
  //   icon: { icon: "mdi-book-open-blank-variant-outline" },
  //   roles: ["Pelaku Usaha", "Admin"],
  //   children: [
  //     {
  //       title: "information.material.faq",
  //       to: "material-faq",
  //       roles: ["Pelaku Usaha", "Admin"],
  //     },
  //     {
  //       title: "information.material.reference",
  //       to: "material-reference",
  //       roles: ["Pelaku Usaha", "Admin"],
  //     },
  //   ],
  // },
  // { heading: "sidang_self_declare.title" },
  // {
  //   title: "sidang_self_declare.title",
  //   icon: { icon: "mdi-scale-balance" },
  //   roles: ["Pelaku Usaha", "Admin"],
  //   children: [
  //     {
  //       title: "sidang_self_declare.proses_sidang",
  //       to: "sidang-self-declare-proses-sidang",
  //       roles: ["Pelaku Usaha", "Admin"],
  //     },
  //     {
  //       title: "sidang_self_declare.entry_ketetapan_halal",
  //       to: "sidang-self-declare-entry-ketetapan-halal",
  //       roles: ["Pelaku Usaha", "Admin"],
  //     },
  //     {
  //       title: "sidang_self_declare.inquiry",
  //       to: "sidang-self-declare-inquiry",
  //       roles: ["Pelaku Usaha", "Admin"],
  //     },
  //     {
  //       title: "sidang_self_declare.rekapitulasi",
  //       to: "sidang-self-declare-rekapitulasi",
  //       roles: ["Pelaku Usaha", "Admin"],
  //     },
  //   ],
  // },
];
