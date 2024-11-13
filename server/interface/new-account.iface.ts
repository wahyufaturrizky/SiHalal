export default interface NewAccountForeign {
  company_name: string;
  address: string;
  city: string;
  province: string;
  country: string;
  postal_code: string;
  phone: string;
  email: string;
}

export interface NewAccountDomestic {
  nib: string;
  date_release_nib: string;
  company_name: string;
  address: string;
  npwp: string;
  status_nib: string;
  business_actor_category: string;
  authorized_capital: number;
  data_proyek: DomesticDataProyek[];
}

export interface DomesticDataProyek {
  kbli: string;
  business_name: string;
  address: string;
  authorized_capital: number;
}

export interface AlamatNib {
  provinsi: string;
  kabupaten: string;
  kecamatan: string;
}

export interface NewAccountGovernment {
  business_actor_name: string;
  nik: string;
  phone: string;
  email: string;
  address: string;
  province_code: string;
  city_code: string;
  sub_district_code: string;
  village: string;
  postal_code: string;
  business_type: string;
  business_scale: string;
  venture_capital: Number;
  kbli: string;
}
