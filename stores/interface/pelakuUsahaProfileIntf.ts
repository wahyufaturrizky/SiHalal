export interface apiProfileIntf {
  code: Number;
  data: {
    business_actor: {
      profile: profileMain;
      responsible_person: penanggungJawab;
      bussines_unit: Array<businessUnit>;
      factory: Array<factory>;
      kbli: Array<kbli>;
      legal: Array<legal>;
      outlet: Array<outlet>;
      supervisor_halal: Array<supervisorHalal>;
    };
  };
}

export interface profileMain {
  id: String;
  company_name: String;
  address: String;
  province_code: String;
  province_name: String;
  city_code: String;
  city_name: String;
  sub_district_code: String;
  sub_district_name: String;
  village: String;
  phone: String;
  email: String;
}

export interface penanggungJawab {
  email: String;
  name: String;
  phone: String;
}

export interface businessUnit {
  id: String;
  business_unit: String;
  username: String;
  address: String;
}

export interface factory {
  id: String;
  doc_number: String;
  expiration_date: String;
  date: String;
  publishing_agency: String;
  type: String;
}

export interface kbli {
  no: String;
  name: String;
  kbli: String;
  address: String;
  capital: String;
}

export interface legal {
  id: String;
  doc_number: String;
  expiration_date: String;
  date: String;
  publishing_agency: String;
  type: String;
}

export interface outlet {
  id: String;
  name: String;
  address: String;
}

export interface supervisorHalal {
  id: string;
  name: string;
  file_skph: string;
  file_spph: string;
  file_ktp: string;
  ktp_no: string;
  religion: string;
  certification_no: string;
  sk_no: string;
}

export interface perizinanData {
  id_proyek: string;
  oss_id: string;
  jenis_izin: string;
  kd_izin: string;
  kd_daerah: string;
  nama_izin: string;
  no_izin: string;
  tgl_izin: string;
  instansi: string;
  file_izin: string;
  file_izin_oss: string;
  id_produk: string;
  id_izin: string;
  id: string;
}
