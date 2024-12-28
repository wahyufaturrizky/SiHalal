import { defineStore } from "pinia";
interface DetailVerifikatorReguler {
  aspek_legal: AspekLegal[];
  auditor: any[];
  bahan: Bahan[];
  certificate_halal: CertificateHalal;
  dokumen: Dokumen;
  dokumen_pendukung: DokumenPendukung[];
  formulir_data_periksa_audit_internal: FormulirDataPeriksaAuditInternal[];
  hasil_audit: HasilAudit;
  invoices: Invoices;
  jadwal_audit: JadwalAudit;
  list_ttd: any[];
  outlet: Outlet[];
  pabrik: Pabrik[];
  penanggung_jawab: PenanggungJawab;
  penyelia_halal: PenyeliaHalal[];
  produk: Produk[];
  risalah_kaji_ulang: RisalahKajiUlang[];
  sertifikat_halal_info: SertifikatHalalInfo;
  sidang_fatwa: SidangFatwa2;
  tim_manajemen_halal: TimManajemenHalal[];
  tracking: Tracking[];
}

interface AspekLegal {
  id_reg_legal: string;
  jenis_surat: string;
  no_surat: string;
  tanggal_surat: string;
  masa_berlaku: string;
  instansi_penerbit: string;
}

interface Bahan {
  id_reg_bahan: string;
  nama_bahan: string;
  merk: string;
  produsen: string;
  no_sertifikat_halal: string;
  jenis_bahan: string;
}

interface CertificateHalal {
  id_reg: string;
  tanggal_buat: string;
  no_mohon: string;
  tgl_mohon: string;
  jenis_layanan: string;
  id_jenis_layanan: string;
  jenis_produk: string;
  id_jenis_produk: string;
  merk_dagang: string;
  area_pemasaran: string;
  lph_id: string;
  nama_lph: string;
  pendamping: string;
  id_pendamping: string;
  lembaga_pendamping: string;
  id_lembaga_pendamping: string;
  nama_kbli: string;
  nama_pu: string;
  alamat_pu: string;
  kota_pu: string;
  negara_pu: string;
  telp_pu: string;
  jenis_badan_usaha: string;
  id_jenis_badan_usaha: string;
  tingkat_usaha: string;
  modal_usaha: number;
  provinsi_pu: string;
  kode_pos_pu: string;
  email: string;
  skala_usaha: string;
  asal_usaha: string;
  url_sample_penyelia_sk: string;
  no_daftar: string;
  tgl_daftar: string;
  nama_provinsi: string;
  jenis_pengajuan: string;
  id_jenis_pengajuan: string;
  status: string;
  channel: string;
  id_channel: string;
  fasilitator_name: string;
  narasi: string;
  lph: Lph;
}

interface Lph {
  lph_id: string;
  no_reg: string;
  nama_pimpinan: string;
  nama_lph: string;
  email: string;
  provinsi: string;
}

interface Dokumen {
  permohonan: string;
  sjph: string;
}

interface DokumenPendukung {
  id_reg_dok: string;
  id_reg: string;
  nama_dokumen: string;
  file_dok: string;
}

interface FormulirDataPeriksaAuditInternal {
  id: string;
  aspek: string;
  deskripsi: string;
  parent_id: string;
}

interface HasilAudit {
  tanggal_mulai: string;
  tanggal_selesai: string;
  hasil_audit: string;
  id_reg: string;
  dokumen: string;
  Dokumen: Dokumen2;
}

interface Dokumen2 {
  id_hasil_doc: string;
  id_reg: string;
  filename: string;
  typeoffile: string;
  keterangan: string;
  create_by: string;
  create_on: any;
}

interface Invoices {
  id_inv: string;
  tgl_inv: any;
  tipe_trans: any;
  nama: any;
  ndpu: any;
  alamat1: any;
  alamat2: any;
  alamat3: any;
  no_telp: any;
  gol_prod: any;
  status: any;
  kategori_transaksi: any;
  asal: any;
  duedate: any;
  status_payment: any;
  status_date: any;
  total_inv: any;
  unik_id: any;
  create_by: any;
  create_on: any;
  update_by: any;
  update_on: any;
  id_pu: any;
  file_inv: any;
  catatan: any;
  no_inv: any;
  no_ref: any;
  id_ref: any;
  va: any;
  id_reg: any;
  biaya: string;
  jumlah: string;
  mtipe_trans: MtipeTrans;
  sertifikat_halal_reguler: SertifikatHalalReguler;
  Facilitated: Facilitated2;
}

interface MtipeTrans {
  ref_id: string;
  ref_group_id: string;
  ref_desc: string;
  ref_desc_eng: string;
  LongInit: number;
  Parent: string;
}

interface SertifikatHalalReguler {
  id_reg: string;
  fac_id: any;
  id_pu: string;
  lph_id: any;
  nama_pu: string;
  nama_pu_sh: string;
  nama_pu_alt: string;
  ref_no_sert: string;
  ref_id_reg: number;
  no_daftar: string;
  tgl_daftar: any;
  alamat_pu: string;
  kota_pu: string;
  jenis_usaha: string;
  email: string;
  no_telp: string;
  jenis_daftar: string;
  verifikator_id: string;
  creator_id: string;
  serah_terima_id: string;
  nama_pj: string;
  no_kontak_pj: string;
  email_pj: string;
  alamat_pabrik: string;
  status_pabrik: string;
  merek_dagang: string;
  tgl_penerimaan_dok: any;
  diterima_oleh: string;
  no_sp: string;
  tgl_sp: any;
  create_on: any;
  create_by: string;
  tgl_kirim: any;
  taken_by: string;
  taken_by2: string;
  taken_by3: string;
  file_sp: string;
  no_mohon: string;
  tgl_mohon: any;
  negara_pu: string;
  kode_pos_pu: string;
  status_reg: string;
  channel_id: string;
  jenis_produk: string;
  jenis_layanan: string;
  skala_usaha: string;
  prov_pu: string;
  modal_usaha: number;
  area_pemasaran: string;
  f_umk: number;
  f_ln: number;
  id_prov: string;
  id_lembaga: any;
  KbliId: string;
  MProvinsi: Mprovinsi;
  MJenisUsaha: MjenisUsaha;
  MSkalaUsaha: MskalaUsaha;
  MJenisDaftar: MjenisDaftar;
  MJenisProduk: MjenisProduk;
  MStatusReg: MstatusReg;
  MChannel: Mchannel;
  MJenisLayanan: MjenisLayanan;
  MAreaPemasaran: MareaPemasaran;
  Pendamping: Pendamping;
  BusinessActor: BusinessActor;
  Facilitated: Facilitated;
  Factory: Factory;
  SidangFatwa: SidangFatwa;
  Products: any;
  LPH: Lph2;
  MLembagaPendamping: MlembagaPendamping;
}

interface Mprovinsi {
  kodeprovinsi: string;
  namaprovinsi: string;
}

interface MjenisUsaha {
  ref_id: string;
  ref_group_id: string;
  ref_desc: string;
  ref_desc_eng: string;
  LongInit: number;
  Parent: string;
}

interface MskalaUsaha {
  ref_id: string;
  ref_group_id: string;
  ref_desc: string;
  ref_desc_eng: string;
  LongInit: number;
  Parent: string;
}

interface MjenisDaftar {
  ref_id: string;
  ref_group_id: string;
  ref_desc: string;
  ref_desc_eng: string;
  LongInit: number;
  Parent: string;
}

interface MjenisProduk {
  ref_id: string;
  ref_group_id: string;
  ref_desc: string;
  ref_desc_eng: string;
  LongInit: number;
  Parent: string;
}

interface MstatusReg {
  ref_id: string;
  ref_group_id: string;
  ref_desc: string;
  ref_desc_eng: string;
  LongInit: number;
  Parent: string;
}

interface Mchannel {
  ref_id: string;
  ref_group_id: string;
  ref_desc: string;
  ref_desc_eng: string;
  LongInit: number;
  Parent: string;
}

interface MjenisLayanan {
  ref_id: string;
  ref_group_id: string;
  ref_desc: string;
  ref_desc_eng: string;
  LongInit: number;
  Parent: string;
}

interface MareaPemasaran {
  ref_id: string;
  ref_group_id: string;
  ref_desc: string;
  ref_desc_eng: string;
  LongInit: number;
  Parent: string;
}

interface Pendamping {
  id_pendamping: string;
  nama: string;
  IDLembaga: string;
  Status: string;
  Lembaga: Lembaga;
  Submissions: any;
}

interface Lembaga {
  id_lp: string;
  no_register: string;
  no_pendaftaran: string;
  nama_lembaga: string;
  jenis_lembaga: string;
  alamat: string;
  desa: string;
  nama_pimpinan: string;
  email: string;
  status: string;
  kabupaten: string;
  MKabupaten: Mkabupaten;
}

interface Mkabupaten {
  kodeprovinsi: string;
  kodekabupaten: string;
  namakabupaten: string;
}

interface BusinessActor {
  id: string;
  user_id: any;
  no_ndpu: any;
  alamat: any;
  Kota: any;
  prov: any;
  kode_pos: any;
  email: any;
  no_telp: any;
  jenis_usaha: any;
  skala_usaha: any;
  nama_pim: any;
  jabatan_pim: any;
  no_kontak_pim: any;
  email_pim: any;
  nama_pu: any;
  nama_pj: any;
  jabatan_pj: any;
  no_kontak_pj: any;
  email_pj: any;
  id_prov: any;
  id_kota: any;
  id_kecamatan: any;
  id_negara: any;
  created_on: any;
  updated_by: any;
  updated_on: any;
  tgl_ndpu: any;
  no_urut_ndpu: any;
  f_ln: any;
  f_umk: any;
  perseroan_daerah_id: any;
  id_pu_induk: any;
  oss_id: any;
  modal_dasar: any;
  id_proyek: any;
  created_by: any;
  Legals: any;
  asal_pu: string;
}

interface Facilitated {
  fac_id: string;
  created_by: string;
  created_on: string;
  updated_by: string;
  updated_on: string;
  active: number;
  sumber_biaya: string;
  jenis: string;
  tgl_aktif: string;
  tgl_selesai: string;
  kuota: number;
  f_kriteria: boolean;
  tahun: number;
  status: string;
  status_code: string;
  nama_pic_program: string;
  no_hp_pic_program: string;
  nama_pic_lp: string;
  no_hp_pic_lp: string;
  nama_program: string;
  provinsi_id: string;
  kabupaten_id: string;
  lingkup_wilayah: string;
  is_locked_lembaga: boolean;
  nomor_pic_program: string;
  fac_description: string;
  fac_name: string;
  kode_fac: string;
  id_fac_header: string;
  FacilitatedHeader: FacilitatedHeader;
  MasterDataDB: MasterDataDb;
  MSumberBiaya: MsumberBiaya;
}

interface FacilitatedHeader {
  id_fac_header: string;
  nama: string;
  alamat: string;
  provinsi: string;
  kabupaten: string;
  kecamatan: string;
  kode_pos: string;
  kontak_person: string;
  no_hp: string;
  email: string;
  tgl_daftar: string;
  jenis_fasilitator: string;
  MProvinsi: Mprovinsi2;
  MKabupaten: Mkabupaten2;
  MKecamatan: Mkecamatan;
}

interface Mprovinsi2 {
  kodeprovinsi: string;
  namaprovinsi: string;
}

interface Mkabupaten2 {
  kodeprovinsi: string;
  kodekabupaten: string;
  namakabupaten: string;
}

interface Mkecamatan {
  id: number;
  kodekabupaten: string;
  kodekecamatan: string;
  namakecamatan: string;
}

interface MasterDataDb {
  ref_id: string;
  ref_group_id: string;
  ref_desc: string;
  ref_desc_eng: string;
  LongInit: number;
  Parent: string;
}

interface MsumberBiaya {
  ref_id: string;
  ref_group_id: string;
  ref_desc: string;
  ref_desc_eng: string;
  LongInit: number;
  Parent: string;
}

interface Factory {
  id_pabrik: string;
  id_reg: string;
  id_fas: string;
  fasil_id: string;
  nama: string;
  kab_kota: string;
  provinsi: string;
  negara: string;
  kode_pos: string;
  alamat: string;
  status_milik: string;
}

interface SidangFatwa {
  no_kh: string;
  id_reg: string;
  tgl_sidang: string;
  ketetapan: string;
  catatan: string;
  f_sertifikat: string;
  FilterStartDate: any;
  FilterEndDate: any;
  SertifikatHalalReguler: any;
}

interface Lph2 {
  lph_id: string;
  no_reg: string;
  nama_pimpinan: string;
  nama_lph: string;
  email: string;
  provinsi: string;
}

interface MlembagaPendamping {
  ID: string;
  LokasiPendamping: string;
  IDReg: string;
  IDLembaga: string;
  IDPendamping: string;
  Pendamping: Pendamping2;
}

interface Pendamping2 {
  id_pendamping: string;
  nama: string;
  IDLembaga: string;
  Status: string;
  Lembaga: Lembaga2;
  Submissions: any;
}

interface Lembaga2 {
  id_lp: string;
  no_register: string;
  no_pendaftaran: string;
  nama_lembaga: string;
  jenis_lembaga: string;
  alamat: string;
  desa: string;
  nama_pimpinan: string;
  email: string;
  status: string;
  kabupaten: string;
  MKabupaten: Mkabupaten3;
}

interface Mkabupaten3 {
  kodeprovinsi: string;
  kodekabupaten: string;
  namakabupaten: string;
}

interface Facilitated2 {
  fac_id: string;
  created_by: string;
  created_on: string;
  updated_by: string;
  updated_on: string;
  active: number;
  sumber_biaya: string;
  jenis: string;
  tgl_aktif: string;
  tgl_selesai: string;
  kuota: number;
  f_kriteria: boolean;
  tahun: number;
  status: string;
  status_code: string;
  nama_pic_program: string;
  no_hp_pic_program: string;
  nama_pic_lp: string;
  no_hp_pic_lp: string;
  nama_program: string;
  provinsi_id: string;
  kabupaten_id: string;
  lingkup_wilayah: string;
  is_locked_lembaga: boolean;
  nomor_pic_program: string;
  fac_description: string;
  fac_name: string;
  kode_fac: string;
  id_fac_header: string;
  FacilitatedHeader: FacilitatedHeader2;
  MasterDataDB: MasterDataDb2;
  MSumberBiaya: MsumberBiaya2;
}

interface FacilitatedHeader2 {
  id_fac_header: string;
  nama: string;
  alamat: string;
  provinsi: string;
  kabupaten: string;
  kecamatan: string;
  kode_pos: string;
  kontak_person: string;
  no_hp: string;
  email: string;
  tgl_daftar: string;
  jenis_fasilitator: string;
  MProvinsi: Mprovinsi3;
  MKabupaten: Mkabupaten4;
  MKecamatan: Mkecamatan2;
}

interface Mprovinsi3 {
  kodeprovinsi: string;
  namaprovinsi: string;
}

interface Mkabupaten4 {
  kodeprovinsi: string;
  kodekabupaten: string;
  namakabupaten: string;
}

interface Mkecamatan2 {
  id: number;
  kodekabupaten: string;
  kodekecamatan: string;
  namakecamatan: string;
}

interface MasterDataDb2 {
  ref_id: string;
  ref_group_id: string;
  ref_desc: string;
  ref_desc_eng: string;
  LongInit: number;
  Parent: string;
}

interface MsumberBiaya2 {
  ref_id: string;
  ref_group_id: string;
  ref_desc: string;
  ref_desc_eng: string;
  LongInit: number;
  Parent: string;
}

interface JadwalAudit {
  jml_hari: number;
  id_reg: string;
  id_audit: string;
  jadwal_awal: any;
  jadwal_akhir: any;
}

interface Outlet {
  id_outlet: string;
  nama_outlet: string;
  alamat_outlet: string;
  status_milik: string;
}

interface Pabrik {
  id_pabrik: string;
  nama_pabrik: string;
  alamat_pabrik: string;
  status_milik: string;
}

interface PenanggungJawab {
  nama_pj: string;
  nomor_kontak_pj: string;
  email_pj: string;
}

interface PenyeliaHalal {
  penyelia_id: string;
  penyelia_nama: string;
  no_ktp: string;
  no_kontak: string;
  no_penyelia_halal: string;
  tgl_penyelia_halal: string;
  no_sk: string;
  tanggal_sk: string;
  file_spph: string;
  file_skph: string;
  file_ktp: string;
}

interface Produk {
  id_reg_prod: string;
  reg_publish: boolean;
  nama_produk: string;
  photo: string;
  jumlah_bahan: number;
  daftar_bahan: any;
}

interface RisalahKajiUlang {
  id: string;
  aspek: string;
  deskripsi: string;
  parent_id: string;
}

interface SertifikatHalalInfo {
  nomor_sertifikat: string;
  tanggal_sertifikat: string;
}

interface SidangFatwa2 {
  nomor_penetapan: string;
  tanggal_penetapan: string;
  ketetapan: string;
  dokumen: string;
}

interface TimManajemenHalal {
  id_reg_tim: string;
  id_reg: string;
  nama: string;
  jabatan: string;
  posisi: string;
}

interface Tracking {
  status: string;
  username: string;
  tanggal: string;
  comment: string;
}
export const useMyVerifikatorRegulerStore = defineStore({
  id: "myVerifikatorRegulerStore",
  state: () =>
    ({
      aspek_legal: [],
      auditor: [],
      bahan: [],
      certificate_halal: {
        id_reg: "",
        tanggal_buat: "",
        no_mohon: "",
        tgl_mohon: "",
        jenis_layanan: "",
        id_jenis_layanan: "",
        jenis_produk: "",
        id_jenis_produk: "",
        merk_dagang: "",
        area_pemasaran: "",
        lph_id: "",
        nama_lph: "",
        pendamping: "",
        id_pendamping: "",
        lembaga_pendamping: "",
        id_lembaga_pendamping: "",
        nama_kbli: "",
        nama_pu: "",
        alamat_pu: "",
        kota_pu: "",
        negara_pu: "",
        telp_pu: "",
        jenis_badan_usaha: "",
        id_jenis_badan_usaha: "",
        tingkat_usaha: "",
        modal_usaha: 0,
        provinsi_pu: "",
        kode_pos_pu: "-",
        email: "",
        skala_usaha: "",
        asal_usaha: "",
        url_sample_penyelia_sk: "",
        no_daftar: "",
        tgl_daftar: "",
        nama_provinsi: "",
        jenis_pengajuan: "",
        id_jenis_pengajuan: "",
        status: "",
        channel: "",
        id_channel: "",
        fasilitator_name: "",
        narasi: "",
        lph: {
          lph_id: "",
          no_reg: "",
          nama_pimpinan: "",
          nama_lph: "",
          email: "",
          provinsi: "",
        },
      },
      dokumen: {
        permohonan: "",
        sjph: "",
      },
      dokumen_pendukung: [],
      formulir_data_periksa_audit_internal: [],
      hasil_audit: {
        tanggal_mulai: "",
        tanggal_selesai: "",
        hasil_audit: "",
        id_reg: "",
        dokumen: "",
        Dokumen: {
          id_hasil_doc: "",
          id_reg: "",
          filename: "",
          typeoffile: "",
          keterangan: "",
          create_by: "",
          create_on: null,
        },
      },
      invoices: {
        id_inv: "",
        tgl_inv: null,
        tipe_trans: null,
        nama: null,
        ndpu: null,
        alamat1: null,
        alamat2: null,
        alamat3: null,
        no_telp: null,
        gol_prod: null,
        status: null,
        kategori_transaksi: null,
        asal: null,
        duedate: null,
        status_payment: null,
        status_date: null,
        total_inv: null,
        unik_id: null,
        create_by: null,
        create_on: null,
        update_by: null,
        update_on: null,
        id_pu: null,
        file_inv: null,
        catatan: null,
        no_inv: null,
        no_ref: null,
        id_ref: null,
        va: null,
        id_reg: null,
        biaya: "",
        jumlah: "",
        mtipe_trans: {
          ref_id: "",
          ref_group_id: "",
          ref_desc: "",
          ref_desc_eng: "",
          LongInit: 0,
          Parent: "",
        },
        sertifikat_halal_reguler: {
          id_reg: "",
          fac_id: null,
          id_pu: "",
          lph_id: null,
          nama_pu: "",
          nama_pu_sh: "",
          nama_pu_alt: "",
          ref_no_sert: "",
          ref_id_reg: 0,
          no_daftar: "",
          tgl_daftar: null,
          alamat_pu: "",
          kota_pu: "",
          jenis_usaha: "",
          email: "",
          no_telp: "",
          jenis_daftar: "",
          verifikator_id: "",
          creator_id: "",
          serah_terima_id: "",
          nama_pj: "",
          no_kontak_pj: "",
          email_pj: "",
          alamat_pabrik: "",
          status_pabrik: "",
          merek_dagang: "",
          tgl_penerimaan_dok: null,
          diterima_oleh: "",
          no_sp: "",
          tgl_sp: null,
          create_on: null,
          create_by: "",
          tgl_kirim: null,
          taken_by: "",
          taken_by2: "",
          taken_by3: "",
          file_sp: "",
          no_mohon: "",
          tgl_mohon: null,
          negara_pu: "",
          kode_pos_pu: "",
          status_reg: "",
          channel_id: "",
          jenis_produk: "",
          jenis_layanan: "",
          skala_usaha: "",
          prov_pu: "",
          modal_usaha: 0,
          area_pemasaran: "",
          f_umk: 0,
          f_ln: 0,
          id_prov: "",
          id_lembaga: null,
          KbliId: "",
          MProvinsi: {
            kodeprovinsi: "",
            namaprovinsi: "",
          },
          MJenisUsaha: {
            ref_id: "",
            ref_group_id: "",
            ref_desc: "",
            ref_desc_eng: "",
            LongInit: 0,
            Parent: "",
          },
          MSkalaUsaha: {
            ref_id: "",
            ref_group_id: "",
            ref_desc: "",
            ref_desc_eng: "",
            LongInit: 0,
            Parent: "",
          },
          MJenisDaftar: {
            ref_id: "",
            ref_group_id: "",
            ref_desc: "",
            ref_desc_eng: "",
            LongInit: 0,
            Parent: "",
          },
          MJenisProduk: {
            ref_id: "",
            ref_group_id: "",
            ref_desc: "",
            ref_desc_eng: "",
            LongInit: 0,
            Parent: "",
          },
          MStatusReg: {
            ref_id: "",
            ref_group_id: "",
            ref_desc: "",
            ref_desc_eng: "",
            LongInit: 0,
            Parent: "",
          },
          MChannel: {
            ref_id: "",
            ref_group_id: "",
            ref_desc: "",
            ref_desc_eng: "",
            LongInit: 0,
            Parent: "",
          },
          MJenisLayanan: {
            ref_id: "",
            ref_group_id: "",
            ref_desc: "",
            ref_desc_eng: "",
            LongInit: 0,
            Parent: "",
          },
          MAreaPemasaran: {
            ref_id: "",
            ref_group_id: "",
            ref_desc: "",
            ref_desc_eng: "",
            LongInit: 0,
            Parent: "",
          },
          Pendamping: {
            id_pendamping: "",
            nama: "",
            IDLembaga: "",
            Status: "",
            Lembaga: {
              id_lp: "",
              no_register: "",
              no_pendaftaran: "",
              nama_lembaga: "",
              jenis_lembaga: "",
              alamat: "",
              desa: "",
              nama_pimpinan: "",
              email: "",
              status: "",
              kabupaten: "",
              MKabupaten: {
                kodeprovinsi: "",
                kodekabupaten: "",
                namakabupaten: "",
              },
            },
            Submissions: null,
          },
          BusinessActor: {
            id: "",
            user_id: null,
            no_ndpu: null,
            alamat: null,
            Kota: null,
            prov: null,
            kode_pos: null,
            email: null,
            no_telp: null,
            jenis_usaha: null,
            skala_usaha: null,
            nama_pim: null,
            jabatan_pim: null,
            no_kontak_pim: null,
            email_pim: null,
            nama_pu: null,
            nama_pj: null,
            jabatan_pj: null,
            no_kontak_pj: null,
            email_pj: null,
            id_prov: null,
            id_kota: null,
            id_kecamatan: null,
            id_negara: null,
            created_on: null,
            updated_by: null,
            updated_on: null,
            tgl_ndpu: null,
            no_urut_ndpu: null,
            f_ln: null,
            f_umk: null,
            perseroan_daerah_id: null,
            id_pu_induk: null,
            oss_id: null,
            modal_dasar: null,
            id_proyek: null,
            created_by: null,
            Legals: null,
            asal_pu: "",
          },
          Facilitated: {
            fac_id: "",
            created_by: "",
            created_on: "",
            updated_by: "",
            updated_on: "",
            active: 0,
            sumber_biaya: "",
            jenis: "",
            tgl_aktif: "",
            tgl_selesai: "",
            kuota: 0,
            f_kriteria: false,
            tahun: 0,
            status: "",
            status_code: "",
            nama_pic_program: "",
            no_hp_pic_program: "",
            nama_pic_lp: "",
            no_hp_pic_lp: "",
            nama_program: "",
            provinsi_id: "",
            kabupaten_id: "",
            lingkup_wilayah: "",
            is_locked_lembaga: false,
            nomor_pic_program: "",
            fac_description: "",
            fac_name: "",
            kode_fac: "",
            id_fac_header: "",
            FacilitatedHeader: {
              id_fac_header: "",
              nama: "",
              alamat: "",
              provinsi: "",
              kabupaten: "",
              kecamatan: "",
              kode_pos: "",
              kontak_person: "",
              no_hp: "",
              email: "",
              tgl_daftar: "",
              jenis_fasilitator: "",
              MProvinsi: {
                kodeprovinsi: "",
                namaprovinsi: "",
              },
              MKabupaten: {
                kodeprovinsi: "",
                kodekabupaten: "",
                namakabupaten: "",
              },
              MKecamatan: {
                id: 0,
                kodekabupaten: "",
                kodekecamatan: "",
                namakecamatan: "",
              },
            },
            MasterDataDB: {
              ref_id: "",
              ref_group_id: "",
              ref_desc: "",
              ref_desc_eng: "",
              LongInit: 0,
              Parent: "",
            },
            MSumberBiaya: {
              ref_id: "",
              ref_group_id: "",
              ref_desc: "",
              ref_desc_eng: "",
              LongInit: 0,
              Parent: "",
            },
          },
          Factory: {
            id_pabrik: "",
            id_reg: "",
            id_fas: "",
            fasil_id: "",
            nama: "",
            kab_kota: "",
            provinsi: "",
            negara: "",
            kode_pos: "",
            alamat: "",
            status_milik: "",
          },
          SidangFatwa: {
            no_kh: "",
            id_reg: "",
            tgl_sidang: "",
            ketetapan: "",
            catatan: "",
            f_sertifikat: "",
            FilterStartDate: null,
            FilterEndDate: null,
            SertifikatHalalReguler: null,
          },
          Products: null,
          LPH: {
            lph_id: "",
            no_reg: "",
            nama_pimpinan: "",
            nama_lph: "",
            email: "",
            provinsi: "",
          },
          MLembagaPendamping: {
            ID: "",
            LokasiPendamping: "",
            IDReg: "",
            IDLembaga: "",
            IDPendamping: "",
            Pendamping: {
              id_pendamping: "",
              nama: "",
              IDLembaga: "",
              Status: "",
              Lembaga: {
                id_lp: "",
                no_register: "",
                no_pendaftaran: "",
                nama_lembaga: "",
                jenis_lembaga: "",
                alamat: "",
                desa: "",
                nama_pimpinan: "",
                email: "",
                status: "",
                kabupaten: "",
                MKabupaten: {
                  kodeprovinsi: "",
                  kodekabupaten: "",
                  namakabupaten: "",
                },
              },
              Submissions: null,
            },
          },
        },
        Facilitated: {
          fac_id: "",
          created_by: "",
          created_on: "",
          updated_by: "",
          updated_on: "",
          active: 0,
          sumber_biaya: "",
          jenis: "",
          tgl_aktif: "",
          tgl_selesai: "",
          kuota: 0,
          f_kriteria: false,
          tahun: 0,
          status: "",
          status_code: "",
          nama_pic_program: "",
          no_hp_pic_program: "",
          nama_pic_lp: "",
          no_hp_pic_lp: "",
          nama_program: "",
          provinsi_id: "",
          kabupaten_id: "",
          lingkup_wilayah: "",
          is_locked_lembaga: false,
          nomor_pic_program: "",
          fac_description: "",
          fac_name: "",
          kode_fac: "",
          id_fac_header: "",
          FacilitatedHeader: {
            id_fac_header: "",
            nama: "",
            alamat: "",
            provinsi: "",
            kabupaten: "",
            kecamatan: "",
            kode_pos: "",
            kontak_person: "",
            no_hp: "",
            email: "",
            tgl_daftar: "",
            jenis_fasilitator: "",
            MProvinsi: {
              kodeprovinsi: "",
              namaprovinsi: "",
            },
            MKabupaten: {
              kodeprovinsi: "",
              kodekabupaten: "",
              namakabupaten: "",
            },
            MKecamatan: {
              id: 0,
              kodekabupaten: "",
              kodekecamatan: "",
              namakecamatan: "",
            },
          },
          MasterDataDB: {
            ref_id: "",
            ref_group_id: "",
            ref_desc: "",
            ref_desc_eng: "",
            LongInit: 0,
            Parent: "",
          },
          MSumberBiaya: {
            ref_id: "",
            ref_group_id: "",
            ref_desc: "",
            ref_desc_eng: "",
            LongInit: 0,
            Parent: "",
          },
        },
      },
      jadwal_audit: {
        jml_hari: 0,
        id_reg: "",
        id_audit: "",
        jadwal_awal: null,
        jadwal_akhir: null,
      },
      list_ttd: [],
      outlet: [],
      pabrik: [],
      penanggung_jawab: {
        nama_pj: "",
        nomor_kontak_pj: "",
        email_pj: "",
      },
      penyelia_halal: [],
      produk: [],
      risalah_kaji_ulang: [],
      sertifikat_halal_info: {
        nomor_sertifikat: "",
        tanggal_sertifikat: "",
      },
      sidang_fatwa: {
        nomor_penetapan: "",
        tanggal_penetapan: "",
        ketetapan: "",
        dokumen: "",
      },
      tim_manajemen_halal: [],
      tracking: [],
    } as DetailVerifikatorReguler),
  actions: {
    setData(data: DetailVerifikatorReguler) {
      this.$state = data;
    },
    getCertificate() {
      return this.certificate_halal;
    },
  },
});
