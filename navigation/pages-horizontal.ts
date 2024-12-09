// title ambil dari locales
export default [
  {
    title: "navbar.dashboard",
    icon: { icon: "fa-home" },
    to: "index",
    action: "read",
    roles: [
      "Pelaku Usaha",
      "Fasilitator",
      "Verifikator Fasilitator",
      "Verifikator Self-Declare",
      "Verifikator Reguler",
      "Verifikator HLN",
      "Komite Fatwa",
      "Komisi Fatwa",
      "Pendamping",
      "Lembaga Penjamin Halal",
      "Auditor",
      "Admin",
    ],
  },
  {
    title: "navbar.business_actor",
    icon: { icon: "mdi-account-tie" },
    to: "pelaku-usaha",
    roles: ["Pelaku Usaha", "Admin"],
  },
  {
    title: "navbar.applicant.title",
    icon: { icon: "ri-more-line" },
    roles: ["Fasilitator", "Admin"],
    children: [
      {
        title: "navbar.applicant.menu.profile",
        to: "applicant-profile",
        icon: { icon: "mdi-account" },
        roles: ["Fasilitator", "Admin"],
      },
    ],
  },
  {
    title: "navbar.facilitate_registration.title",
    icon: { icon: "ri-more-line" },
    roles: ["Fasilitator", "Admin"],
    children: [
      {
        title: "navbar.facilitate_registration.menu.entry",
        to: "facilitation-entry",
        icon: { icon: "mdi-card-account-details-outline" },
        roles: ["Fasilitator", "Admin"],
      },
      {
        title: "navbar.facilitate_registration.menu.list",
        to: "facilitation-list",
        icon: { icon: "mdi-list-box-outline" },
        roles: ["Fasilitator", "Admin"],
      },
    ],
  },
  {
    title: "navbar.list_ba.title",
    icon: { icon: "ri-more-line" },
    roles: ["Fasilitator", "Admin"],
    children: [
      {
        title: "navbar.list_ba.menu.fa_inquiry",
        to: "bussiness-actor-list-inquiry",
        icon: { icon: "mdi-help-circle-outline" },
        roles: ["Fasilitator", "Admin"],
      },
      {
        title: "navbar.list_ba.menu.fa_cancelation",
        to: "bussiness-actor-list-cancelation",
        icon: { icon: "mdi-calendar-remove-outline" },
        roles: ["Fasilitator", "Admin"],
      },
    ],
  },
  {
    title: "navbar.invoice.title",
    icon: { icon: "ri-more-line" },
    roles: ["Fasilitator", "Keuangan", "Admin"],
    children: [
      {
        title: "navbar.invoice.menu.facilitate",
        to: "invoice-facilitate",
        icon: { icon: "mdi-invoice-text-outline" },
        roles: ["Fasilitator", "Admin"],
      },
      {
        title: "navbar.invoice.menu.shln",
        to: "finance-invoice-pelaku-usaha",
        icon: { icon: "mdi-invoice-text-outline" },
        roles: ["Keuangan", "Admin"],
      },
      {
        title: "navbar.invoice.menu.facilitator",
        to: "finance-invoice-facilitate",
        icon: { icon: "mdi-invoice-text-outline" },
        roles: ["Keuangan", "Admin"],
      },
      {
        title: "navbar.invoice.menu.regular",
        to: "invoice-invoice-reguler",
        icon: { icon: "mdi-invoice-text-outline" },
        roles: ["Keuangan", "Admin"],
      },
    ],
  },
  {
    title: "navbar.sh_registration.title",
    icon: { icon: "ri-more-line" },
    roles: ["Pelaku Usaha", "Admin"],
    children: [
      {
        title: "navbar.sh_registration.menu.regular_submission",
        icon: { icon: "ri-id-card-line" },
        to: "sh-domestic-submission-reguler",
        roles: ["Pelaku Usaha", "Admin"],
      },
      {
        title: "navbar.sh_registration.menu.self_declare_submission",
        icon: { icon: "ri-id-card-line" },
        to: "sh-domestic-submission-self-declare",
        roles: ["Pelaku Usaha", "Admin"],
      },
    ],
  },
  {
    title: "navbar.shln.title",
    icon: { icon: "ri-more-line" },
    roles: ["Pelaku Usaha", "Admin", "Verifikator HLN"],
    children: [
      {
        title: "navbar.shln.menu.submission",
        icon: { icon: "ri-id-card-line" },
        to: "sertifikasi-halal-luar-negeri-submission",
        roles: ["Pelaku Usaha", "Admin"],
      },
      {
        title: "navbar.shln.menu.invoice",
        icon: { icon: "mdi-invoice-text-outline" },
        to: "sertifikasi-halal-luar-negeri-invoice",
        roles: ["Pelaku Usaha", "Admin"],
      },
      {
        title: "navbar.shln.menu.verification",
        to: "sertifikasi-halal-luar-negeri-verification",
        roles: ["Verifikator HLN", "Admin"],
      },
    ],
  },
  {
    title: "navbar.online_registration.title",
    icon: { icon: "ri-more-line" },
    roles: [
      "Verifikator Fasilitator",
      "Verifikator Self-Declare",
      "Verifikator Reguler",
      "Admin",
    ],
    children: [
      {
        title: "navbar.online_registration.menu.fa_verification",
        icon: { icon: "fa-check-circle" },
        to: "facilitator-verifikasi",
        roles: ["Verifikator Fasilitator", "Admin"],
      },
      {
        title: "navbar.online_registration.menu.sd_verification",
        icon: { icon: "fa-check-circle" },
        to: "self-declare-verifikasi-self-declare",
        roles: ["Verifikator Self-Declare", "Admin"],
      },
      {
        title: "navbar.online_registration.menu.rg_verification",
        icon: { icon: "fa-check-circle" },
        to: "online-registration-verifikasi-reguler",
        roles: ["Verifikator Reguler", "Admin"],
      },
    ],
  },
  {
    title: "navbar.halal_cert_submission.title",
    icon: { icon: "ri-more-line" },
    roles: ["Pendamping", "Admin"],
    children: [
      {
        title: "navbar.halal_cert_submission.menu.check_pu_submission",
        icon: { icon: "fa-check-circle" },
        to: "sh-domestic-submission-self-declare-list-pengajuan-pu-pendamping",
        roles: ["Pendamping", "Admin"],
      },
      {
        title: "navbar.halal_cert_submission.menu.verval",
        icon: { icon: "fa-check-circle" },
        to: "pengajuan-verval-pendamping",
        roles: ["Pendamping", "Admin"],
      },
    ],
  },
  {
    title: "navbar.process_on_lph.title",
    icon: { icon: "ri-more-line" },
    roles: ["Lembaga Penjamin Halal", "Admin"],
    children: [
      {
        title: "navbar.process_on_lph.menu.list_submission",
        icon: { icon: "fa-check-circle" },
        to: "lph-list-register",
        roles: ["Lembaga Penjamin Halal", "Admin"],
      },
      {
        title: "navbar.process_on_lph.menu.list_acc_submission",
        icon: { icon: "fa-check-circle" },
        to: "lph-list-accepted",
        roles: ["Lembaga Penjamin Halal", "Admin"],
      },
      {
        title: "navbar.process_on_lph.menu.payment_info",
        icon: { icon: "fa-check-circle" },
        to: "reguler-payment-info",
        roles: ["Lembaga Penjamin Halal", "Admin"],
      },
      {
        title: "navbar.process_on_lph.menu.update_check",
        icon: { icon: "fa-check-circle" },
        to: "reguler-examination-update",
        roles: ["Lembaga Penjamin Halal", "Admin"],
      },
      {
        title: "navbar.process_on_lph.menu.settlement_data",
        icon: { icon: "fa-check-circle" },
        to: "reguler-post-audit",
        roles: ["Lembaga Penjamin Halal", "Admin"],
      },
    ],
  },
  {
    title: "navbar.data_pu_submission.title",
    icon: { icon: "ri-more-line" },
    roles: ["Auditor", "Admin"],
    children: [
      {
        title: "navbar.process_on_lph.menu.settlement_data",
        icon: { icon: "fa-search" },
        to: "audit-pengajuan",
        roles: ["Auditor", "Admin"],
      },
    ],
  },
  {
    title: "navbar.sidang_fatwa.title",
    icon: { icon: "ri-more-line" },
    roles: ["Komisi Fatwa", "Admin"],
    children: [
      {
        title: "navbar.sidang_fatwa.menu.proses_sidang_fatwa",
        icon: { icon: "fa-balance-scale" },
        to: "sidang-fatwa-tabel-pengajuan",
        roles: ["Komisi Fatwa", "Admin"],
      },
      {
        title: "navbar.sidang_fatwa.menu.entri_ketetapan_halal",
        icon: { icon: "fa-database" },
        to: "sidang-fatwa-entri-ketetapan-halal",
        roles: ["Komisi Fatwa", "Admin"],
      },
    ],
  },
  {
    title: "navbar.self_declare.title",
    icon: { icon: "ri-more-line" },
    roles: ["Komite Fatwa", "Admin"],
    children: [
      {
        title: "navbar.self_declare.menu.proses_sidang_fatwa",
        icon: { icon: "fa-balance-scale" },
        to: "sidang-fatwa-proses-sidang",
        roles: ["Komite Fatwa", "Admin"],
      },
      {
        title: "navbar.self_declare.menu.hasil_penetapan",
        icon: { icon: "fa-database" },
        to: "sidang-self-declare-entry-ketetapan-halal",
        roles: ["Komite Fatwa", "Admin"],
      },
      {
        title: "navbar.self_declare.menu.inquiry_1",
        icon: { icon: "fa-id-card" },
        to: "sidang-self-declare-inquiry",
        roles: ["Komite Fatwa", "Admin"],
      },
      {
        title: "navbar.self_declare.menu.inquiry_2",
        icon: { icon: "fa-id-card-o" },
        to: "sidang-self-declare-inquiry2",
        roles: ["Komite Fatwa", "Admin"],
      },
      {
        title: "navbar.self_declare.menu.recapitulation",
        icon: { icon: "fa-clipboard" },
        to: "sidang-self-declare-rekapitulasi",
        roles: ["Komite Fatwa", "Admin"],
      },
    ],
  },
];
