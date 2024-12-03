export interface MasterCountry {
  code: string;
  code_3: string;
  code_number: string;
  iso: string;
  name: string;
}

export interface MasterProvince {
  code: string;
  name: string;
}

export interface MasterDistrict {
  code: string;
  name: string;
}

export interface MasterSubDistrict {
  code: string;
  name: string;
}

export interface MasterBadanUsaha {
  code: string;
  name: string;
  name_eng: string;
}
export interface MasterSkalaUsaha {
  code: string;
  name: string;
  name_eng: string;
}

export interface MasterKBLI {
  judul_kbli: string;
  kbli: string;
  kode_jenis_produk: string;
  kode_layanan: string;
}

export interface MasterJenisFasilitator {
  code: string;
  name: string;
  name_eng: string;
}
