export interface NIB {
  code: number;
  data: NIBData;
  message: string;
  registered_nib: RegisteredNib;
}

export interface NIBData {
  pelaku_usaha: PelakuUsaha;
}

export interface PelakuUsaha {
  nib: string;
  date_release_nib: string;
  company_name: string;
  address: string;
  npwp: string;
  status_nib: string;
  business_actor_category: string;
  authorized_capital: number;
  daerah_id_user_proses: string;
  flag_umk?: string;
  DataProyek: DataProyek[];
}

export interface DataProyek {
  kbli: string;
  business_name: string;
  address: string;
  investment_amount: number;
  proyek_daerah_id: string;
}

export interface RegisteredNib {
  message: string;
  status: boolean;
}
