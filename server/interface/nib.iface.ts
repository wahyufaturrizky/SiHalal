export default interface NIB {
  code: number;
  data: NIBData;
  message: string;
}

export interface NIBData {
  pelaku_usaha: NIBPelakuUsaha;
}

export interface NIBPelakuUsaha {
  responinqueryNIB: NIBResponinqueryNib;
}

export interface NIBResponinqueryNib {
  dataNIB: DataNib;
  keterangan: string;
  kode: number;
}

export interface DataNib {
  agama_user_proses: string;
  alamat_perseroan: string;
  alamat_user_proses: string;
  daerah_id_user_proses: string;
  dalam_bentuk_lain: string;
  dalam_bentuk_uang: number;
  data_checklist: DataChecklist[];
  data_dni: DataDni[];
  data_proyek: DataProyek[];
  data_rptka: DataRptka;
  email_perusahaan: string;
  email_user_proses: string;
  flag_ekspor: string;
  flag_impor: string;
  flag_perusahaan: string;
  flag_umk: string;
  gabung_negara: string;
  hp_user_proses: string;
  jangka_waktu: string;
  jenis_api: string;
  jenis_id_user_proses: string;
  jenis_kawasan: string;
  jenis_pelaku_usaha: string;
  jenis_perseroan: string;
  jenis_perubahan_terakhir: string;
  jns_kelamin_user_proses: string;
  kd_kawasan: number;
  kelurahan_perseroan: string;
  kode_pos_perseroan: string;
  legalitas: Legalita[];
  nama_perseroan: string;
  nama_singkatan: string;
  nama_user_proses: string;
  negara_pma_dominan: string;
  nib: string;
  nilai_pma_dominan: string;
  nilai_pmdn: string;
  no_akta_lama: string;
  no_id_user_proses: string;
  no_npp: string;
  no_pengesahan: string;
  no_pengesahan_lama: string;
  no_va: string;
  no_wlkp: string;
  nomor_telpon_perseroan: string;
  npwp_perseroan: string;
  oss_id: string;
  pekerjaan_user_proses: string;
  pemegang_saham: PemegangSaham[];
  penanggung_jwb: PenanggungJwb[];
  persen_pma: number;
  persen_pmdn: number;
  perseroan_daerah_id: string;
  rt_rw_perseroan: string;
  rt_rw_user_proses: string;
  skala_usaha: string;
  status_badan_hukum: string;
  status_nib: string;
  status_penanaman_modal: string;
  status_perkawinan_user_proses: string;
  status_perseroan: string;
  tempat_lahir_user_proses: string;
  tgl_akta_lama: string;
  tgl_lahir_user_proses: any;
  tgl_pengajuan_nib: string;
  tgl_pengesahan: string;
  tgl_pengesahan_lama: string;
  tgl_perubahan_nib: string;
  tgl_terbit_nib: string;
  tipe_dokumen: string;
  total_modal_dasar: number;
  total_modal_ditempatkan: number;
  total_pma: string;
  versi_pia: string;
}

export interface DataChecklist {
  bidang_spesifik?: string;
  data_persyaratan: DataPersyaratan[];
  file_izin: string;
  file_izin_oss: string;
  flag_checklist: string;
  flag_perpanjangan: string;
  flag_transaksional: string;
  id_bidang_spesifik?: number;
  id_izin: string;
  id_kewenangan: number;
  id_produk: string;
  id_proyek: string;
  instansi: string;
  jenis_izin: string;
  kd_daerah: string;
  kd_dokumen: string;
  kd_izin: string;
  kewenangan: string;
  nama_izin: string;
  nm_dokumen: string;
  no_izin?: string;
  parameter_kewenangan: string;
  status_checklist: string;
  tgl_izin?: string;
}

export interface DataPersyaratan {
  file_dokumen: string;
  id_syarat: string;
  keterangan: string;
  no_dokumen: string;
  tgl_dokumen: string;
}

export interface DataDni {
  kd_dni: number;
}

export interface DataProyek {
  bangunan_gedung: string;
  data_lokasi_proyek: DataLokasiProyek[];
  data_proyek_produk: DataProyekProduk[];
  deskripsi_kegiatan: string;
  flag_cabang: string;
  flag_merger: string;
  flag_perluasan: string;
  flag_satu_lini: string;
  id_proyek: string;
  investasi_lain: string;
  jawab_lokasi_b: string;
  jawab_lokasi_c: string;
  jawab_lokasi_d: string;
  jawab_lokasi_e: string;
  jawab_lokasi_f: string;
  jawab_lokasi_g: string;
  jenis_identitas_pj: string;
  jenis_lokasi: string;
  jenis_proyek: string;
  jumlah_investasi: string;
  jumlah_tka_l: number;
  jumlah_tka_p: number;
  jumlah_tki_l: number;
  jumlah_tki_p: number;
  kbli: string;
  kd_kawasan: number;
  luas_tanah: string;
  memiliki_menguasai: string;
  mesin_peralatan: string;
  mesin_peralatan_usd: string;
  modal_kerja: string;
  nama_cabang: string;
  nama_kegiatan: string;
  nama_perseroan_merger: string;
  nama_pj: string;
  nilai_kurs: number;
  no_identitas_pj: string;
  nomor_proyek: string;
  npwp_cabang: string;
  npwp_perseroan_merger: string;
  pembelian_pematang_tanah: string;
  satuan_luas_tanah: string;
  sektor: string;
  skala_resiko: string;
  skala_usaha: string;
  status_proyek: string;
  status_tanah: string;
  sub_jumlah: string;
  tanggal_kurs: any;
  uraian_usaha: string;
}

export interface DataLokasiProyek {
  alamat_usaha: string;
  data_lokasi_proyek: DataLokasiProyek2[];
  data_posisi_proyek: DataPosisiProyek[];
  id_kegiatan: string;
  id_proyek_lokasi: string;
  jenis_kawasan: string;
  jenis_lokasi: string;
  kd_kawasan: string;
  proyek_daerah_id: string;
  response_kegiatan: string;
  status_lokasi: string;
}

export interface DataLokasiProyek2 {
  lat_lng: string;
  serial: number;
}

export interface DataPosisiProyek {
  id_proyek_lokasi: string;
  id_proyek_posisi: string;
  posisi_lokasi: string;
}

export interface DataProyekProduk {
  flag_memiliki_halal: string;
  flag_memiliki_sni_bina_umk: string;
  flag_self_declare: string;
  id_bidang_usaha: number;
  id_kbli_ta: string;
  id_produk: string;
  id_proyek: string;
  jenis_produksi: string;
  kapasitas: string;
  kbli: string;
  masa_berlaku_sertifikat_halal: any;
  masa_berlaku_sni_bina_umk: any;
  merk_dagang: string;
  nomor_sertifikat_halal: any;
  nomor_sni_bina_umk: any;
  pemegang_haki: string;
  pemegang_paten: string;
  pi_nomor: string;
  pi_npwp: string;
  pi_tanggal: string;
  satuan: string;
  tipe_cakupan: any;
  tkdn: number;
}

export interface DataRptka {
  jangka_penggunaan_waktu: any;
  jangka_waktu_permohonan_rptka: number;
  jenis_rptka: string;
  jumlah_tka_rptka: number;
  no_rptka: string;
  rptka_akhir: any;
  rptka_awal: any;
  rptka_gaji: number;
  rptka_jabatan: RptkaJabatan[];
  rptka_lokasi: RptkaLokasi[];
  rptka_negara: RptkaNegara[];
}

export interface RptkaJabatan {
  id_jabatan: number;
  jabatan: string;
  jumlah: number;
  keterangan: string;
  rptka_tki_pendamping: RptkaTkiPendamping[];
  tgl_mulai: any;
  tgl_selesai: any;
}

export interface RptkaTkiPendamping {
  email: string;
  foto: string;
  hp: string;
  id_jabatan: number;
  id_pendamping: number;
  jabatan: string;
  keterangan: string;
  nama: string;
  nik: string;
  pendidikan_min: string;
  pengalaman_kerja: number;
  sertifikat: string;
}

export interface RptkaLokasi {
  jumlah: number;
  lokasi_id: string;
}

export interface RptkaNegara {
  id_negara: string;
  jumlah: number;
}

export interface Legalita {
  alamat_notaris: string;
  jenis_legal: string;
  nama_notaris: string;
  no_legal: string;
  telepon_notaris: string;
  tgl_legal: string;
}

export interface PemegangSaham {
  alamat_pemegang_saham: string;
  email_pemegang_saham: string;
  fax_pemegang_saham: string;
  flag_asing: string;
  flag_pajak_pemegang_saham: string;
  jabatan_pemegang_saham: string;
  jenis_pemegang_saham: string;
  jns_identitas_pemegang_saham: string;
  ket_pajak_pemegang_saham: string;
  nama_pemegang_saham: string;
  negara_asal_pemegang_saham: string;
  no_identitas_pemegang_saham: string;
  npwp_pemegang_saham: string;
  pengendali_pemegang_saham: string;
  total_modal_pemegang: number;
  valid_identitas_pemegang_saham: string;
}

export interface PenanggungJwb {
  alamat_penanggung_jwb: string;
  blok_penanggung_jwb: string;
  daerah_id_penanggung_jwb: string;
  email_penanggung_jwb: string;
  flag_asing: string;
  flag_pajak_penanggung_jwb: string;
  jabatan_penanggung_jwb: string;
  jalan_penanggung_jwb: string;
  jns_identitas_penanggung_jwb: string;
  kebangsaan_penanggung_jwb: string;
  kelurahan_penanggung_jwb: string;
  ket_pajak_penanggung_jwb: string;
  kode_pos_penanggung_jwb: string;
  nama_penanggung_jwb: string;
  negara_asal_penanggung_jwb: string;
  no_fax_penanggung_jwb: string;
  no_hp_penanggung_jwb: string;
  no_identitas_penanggung_jwb: string;
  no_penanggung_jwb: string;
  no_telp_penanggung_jwb: string;
  npwp_penanggung_jwb: string;
  rt_rw_penanggung_jwb: string;
}
