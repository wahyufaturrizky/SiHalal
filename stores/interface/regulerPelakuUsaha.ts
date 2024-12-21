export interface DataInterface {
  aspek_legal: AspekLegalInterface[]
  bahan: BahanInterace[]
  certificate_halal: CertificateHalal
  outlet: any[]
  pabrik: any[]
  penanggung_jawab: PenanggungJawab
  penyelia_halal: PenyeliaHalal[]
  produk: any[]
  sertifikat_halal_info: SertifikatHalalInfo
  sidang_fatwa: SidangFatwa
  tracking: any[]
}

export interface AspekLegalInterface {
  id_reg_legal: string
  jenis_surat: string
  no_surat: string
  tanggal_surat: string
  masa_berlaku: string
  instansi_penerbit: string
}

export interface BahanInterace {
  id_reg_bahan: string
  nama_bahan: string
  merk: string
  produsen: string
  no_sertifikat_halal: string
}

export interface CertificateHalal {
  id_reg: string
  tanggal_buat: string
  no_mohon: string
  tgl_mohon: string
  jenis_layanan: string
  jenis_produk: string
  merk_dagang: string
  area_pemasaran: string
  pendamping: string
  lembaga_pendamping: string
  nam_kbli: string
  nama_pu: string
  alamat_pu: string
  kota_pu: string
  negara_pu: string
  telp_pu: string
  jenis_badan_usaha: string
  tingkat_usaha: string
  modal_usaha: string
  provinsi_pu: string
  kode_pos_pu: string
  email: string
  skala_usaha: string
  asal_usaha: string
  url_sample_penyelia_sk: string
  no_daftar: string
  tgl_daftar: string
  nama_provinsi: string
  jenis_pengajuan: string
  status: string
  channel: string
  fasilitator_name: string
  narasi: string
}

export interface PenanggungJawab {
  nama_pj: string
  nomor_kontak_pj: string
  email_pj: string
}

export interface PenyeliaHalal {
  penyelia_id: string
  penyelia_nama: string
  no_ktp: string
  no_kontak: string
  no_penyelia_halal: string
  tgl_penyelia_halal: string
  no_sk: string
  tanggal_sk: string
}

export interface SertifikatHalalInfo {
  nomor_sertifikat: string
  tanggal_sertifikat: string
}

export interface SidangFatwa {
  nomor_penetapan: string
  tanggal_penetapan: string
  ketetapan: string
  dokumen: string
}
