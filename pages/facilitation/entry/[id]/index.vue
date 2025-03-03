<script setup lang="ts">

interface FasilitatorData {
  fasilitasi: Fasilitasi;
  lembaga: Lembaga[];
  status_registrasi: StatusRegistrasi;
  tracking: any[];
  fasilitasi_detail: FasilitasiDetail[]; 
}

interface Fasilitasi {
  nama: string;
  nama_program: string;
  fac_description: string;
  penanggung_jawab: string;
  phone_penanggung_jawab: string;
  tahun: number;
  lingkup_wilayah_fasilitas: string;
  tgl_mulai: string;
  tgl_selesai: string;
  jenis_fasilitasi: string;
  sumber_pembiayaan: string;
  kuota: number;
  is_locked_lembaga: boolean;
}

interface FasilitasiDetail {
  id: string;
  fac_id: string;
  fac_status: string;
  created_by: string;
  created_on: string;
  deleted: string | null;
  is_taken: string | null;
  jenis_layanan: string;
  jenis_produk: string;
  jumlah_produk: number;
  kabupaten_id: string;
  kuota: number;
  lph_id: string;
  provinsi_id: string;
  ruang_lingkup: string;
  MFacilitatedDetailBiaya: FasilitasiDetailBiaya;
  MJenisLayanan: {
    ref_id: string;
    ref_group_id: string;
    ref_desc: string;
    ref_desc_eng: string;
    long_init: number;
    long_init_besar: number;
    long_init_menengah: number;
    Parent: string;
  };
  MJenisProduk: {
    ref_id: string;
    ref_group_id: string;
    ref_desc: string;
    ref_desc_eng: string;
    long_init: number;
    long_init_besar: number;
    long_init_menengah: number;
    Parent: string;
  };
  MKabupaten: {
    kodeprovinsi: string;
    kodekabupaten: string;
    namakabupaten: string;
  };
  MLPH: {
    lph_id: string;
    no_reg: string;
    alamat: string;
    email: string;
    kota: string;
    lph_sn: string;
    nama_lph: string;
    nama_pimpinan: string;
    no_hp: string;
    provinsi: string;
  };
  MProvinsi: {
    kodeprovinsi: string;
    namaprovinsi: string;
  };
}

interface FasilitasiDetailBiaya {
  id: string;
  fac_id: string;
  fac_id_detail: string;
  created_by: string;
  created_on: string;
  updated_by: string;
  updated_on: string;
  kabupaten_id: string;
  provinsi_id: string;
  kuota: number;
  mandays: number;
  akomodasi_awal: number;
  akomodasi_akhir: number;
  akomodasi_diskon: number;
  biaya_bpjph: number;
  biaya_mui: number;
  operasional: number;
  tiket_pesawat_awal: number;
  tiket_pesawat_akhir: number;
  tiket_pesawat_diskon: number;
  transport_awal: number;
  transport_akhir: number;
  transport_diskon: number;
  uhpd_awal: number;
  uhpd_akhir: number;
  uhpd_diskon: number;
  unit_cost_awal: number;
  unit_cost_akhir: number;
  unit_cost_diskon: number;
  total_biaya: number;
  total_biaya_satuan: number;
}

interface Lembaga {
  id: string;
  fac_id: string;
  nama_pic_lembaga: string;
  nomor_pic_lembaga: string;
  lp_id?: string;
  lph_id?: string;
  created_by: string;
  created_on: string;
}

interface StatusRegistrasi {
  status: string;
  kode_fasilitasi: string;
  status_code: string;
}

const detail = ref<FasilitatorData>({
  fasilitasi: {
    nama: "",
    nama_program: "",
    fac_description: "",
    penanggung_jawab: "",
    phone_penanggung_jawab: "",
    tahun: 0,
    lingkup_wilayah_fasilitas: "",
    tgl_mulai: "",
    tgl_selesai: "",
    jenis_fasilitasi: "",
    sumber_pembiayaan: "",
    sumber_pembiayaan_name: "",
    kuota: 0,
    is_locked_lembaga: true,
  },
  lembaga: [],
  status_registrasi: {
    status: "",
    status_code: "",
    kode_fasilitasi: "",
  },
  tracking: [],
  fasilitasi_detail: [],
});

const defaultStatus = { color: "error", desc: "Unknown Status" };

const statusItem: any = new Proxy(
  {
    OF1: { color: "grey-300", desc: "Draft" },
    OF12: { color: "error", desc: "Belum Ver. LPH" },
    OF10: { color: "success", desc: "Sudah Ver. LPH" },
    OF15: { color: "success", desc: "Sudah Ver. LPH" },
    OF2: { color: "error", desc: "Belum Ver. LPH" },
    OF290: { color: "error", desc: "Belum Ver. LPH" },
    OF5: { color: "success", desc: "Sudah Ver. LPH" },
    OF320: { color: "success", desc: "Sudah Ver. LPH" },
    OF11: { color: "success", desc: "Sudah Ver. LPH" },
  },
  {
    get(target: any, prop: any) {
      return prop in target ? target[prop] : defaultStatus;
    },
  }
);

const institutionHeader = [
  { title: "No", key: "index" },
  { title: "Nama LPH / LP3H", key: "lph" },
  { title: "Nama Penanggung Jawab", key: "nama_pic_lembaga" },
  { title: "Nomor Penanggung Jawab", key: "nomor_pic_lembaga" },
];

const biayaFasilitasiHeader = [
  { title: "No", key: "index", nowrap: true},
  { title: "Lembaga Pemeriksa Halal (LPH)", nowrap: true },
  { title: "Alamat Fasilitasi", nowrap: true },
  // { title: "Kabupaten",  nowrap: true },
  { title: "Jenis Layanan",  nowrap: true },
  { title: "Jenis Produk",  nowrap: true },
  { title: "Kuota",  nowrap: true },
  { title: "Biaya", nowrap: true },
  { title: "Status",  nowrap: true },
];

const loading = ref(true);
const loadingSubmit = ref(false);
const loadingDelete = ref(false);
const visibleModalKirim = ref(false);
const visibleModalHapus = ref(false);
const dataFasilitasi = ref();
const dataDetailRegistration = ref();
const timelineEvents = ref();
const openPanelRegisterData = ref(0);
const openPanelFacilitate = ref(0);
const openPanelTracking = ref(0);

const panelInstitution = ref([0, 1]);
const panelBiayaFasilitasi = ref([0, 1]);

const route = useRoute();
const router = useRouter();

const facilitateId = (route.params as any).id;
const detailBiaya = ref<any>({});
const biayaDialog = ref<boolean>(false);

const jenisFasilitasi = ref();
const listLembaga = ref([]);

const totalBiayaDetail = ref(0);

const loadItemById = async () => {
  try {
    const response: any = await $api(`/facilitate/entry/${facilitateId}`, {
      method: "get",
    });

    if (response.code === 2000) {
      totalBiayaDetail.value = 0;
      const { fasilitator } = response.data || {};
      detail.value = fasilitator

      jenisFasilitasi.value = detail.value.fasilitasi.jenis_fasilitasi;

      let url = "/facilitate/verifikator/lp";
      
      if (jenisFasilitasi.value == "Reguler") {
        url = "/facilitate/verifikator/lph";
      }
      
      const lembaga = await $api(url, {
        method: "get",
      });

      if (lembaga.code != 2000) {
        useSnackbar().sendSnackbar("Ada Kesalahan", "error");
        return;
      }
      
      listLembaga.value = lembaga.data;

      fasilitator.fasilitasi_detail.map((value: any)=> {
        totalBiayaDetail.value += value.MFacilitatedDetailBiaya.total_biaya;
      })
      // const { fasilitasi, tracking, status_registrasi } = fasilitator || {};

      // const {
      //   nama,
      //   kuota,
      //   penanggung_jawab,
      //   nama_program,
      //   phone_penanggung_jawab,
      //   tahun,
      //   lingkup_wilayah_fasilitas,
      //   tgl_mulai,
      //   tgl_selesai,
      //   jenis_fasilitasi,
      //   fac_description,
      //   sumber_biaya_name,
      // } = fasilitasi || {};

      // dataFasilitasi.value = {
      //   nama_fasilitator: nama,
      //   nama_program_fasilitasi: nama_program,
      //   nama_penanggung_jawab: penanggung_jawab,
      //   fasilitasi_deskripsi: fac_description,
      //   nomor_kontak_penanggung_jawab: phone_penanggung_jawab,
      //   tahun: tahun,
      //   lingkup_wilayah_fasilitasi: lingkup_wilayah_fasilitas,
      //   tanggal_mulai: tgl_mulai ? formatDateIntl(new Date(tgl_mulai)) : "",
      //   tanggal_selesai: tgl_selesai ? formatDateIntl(new Date(tgl_selesai)) : "",
      //   jenis_fasilitasi: jenis_fasilitasi,
      //   sumber_pembiayaan: sumber_biaya_name,
      //   kuota: kuota,
      // };

      // dataDetailRegistration.value = status_registrasi;

      // timelineEvents.value = tracking?.map((itemLembaga: any) => {
      //   const { date, status, comment } = itemLembaga || {};

      //   return {
      //     time: date ? formatDateIntl(new Date(date)) : "",
      //     title: status,
      //     description: comment,
      //     dotColor: "grey",
      //   };
      // });

      return response;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  } catch (error) {
    console.log("@error", error);

    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const submitFacilitate = async () => {
  try {
    loadingSubmit.value = true;

    const res = await $api(`/facilitate/entry/submit/${facilitateId}`, {
      method: "post",
    });

    console.log(res);

    if (res?.code === 2000) {
      router.go(-1);
      loadingSubmit.value = false;
      visibleModalKirim.value = false;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
      loadingSubmit.value = false;
      visibleModalKirim.value = false;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingSubmit.value = false;
    visibleModalKirim.value = false;
  }
};

const deleteFacilitate = async () => {
  try {
    loadingDelete.value = true;

    const res = await $api(`/facilitate/entry/delete/${facilitateId}`, {
      method: "post",
    });

    if (res?.code === 2000) {
      router.go(-1);
      loadingDelete.value = false;
      visibleModalHapus.value = false;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
      loadingDelete.value = false;
      visibleModalHapus.value = false;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingDelete.value = false;
    visibleModalHapus.value = false;
  }
};

onMounted(async () => {
  const res = await Promise.all([loadItemById()]);

  const checkResIfUndefined = res.every((item: any) => {
    return item !== undefined;
  });

  if (checkResIfUndefined) {
    loading.value = false;
  } else {
    loading.value = false;
  }
});

const navigateAction = () => {
  navigateTo(`/facilitation/entry/${facilitateId}/edit`);
};

const navigateActionLembaga = () => {
  navigateTo(`/facilitation/entry/${facilitateId}/edit-lembaga`);
};

const openModalBiayaDetail = (item: any) => {
  const dataItem = item.MFacilitatedDetailBiaya

  dataItem.unit_cost_awal = formatToIDR(dataItem.unit_cost_awal);
  dataItem.unit_cost_akhir = formatToIDR(dataItem.unit_cost_akhir);
  dataItem.uhpd_awal = formatToIDR(dataItem.uhpd_awal);
  dataItem.uhpd_akhir = formatToIDR(dataItem.uhpd_akhir);
  dataItem.operasional = formatToIDR(dataItem.operasional);
  dataItem.transport_awal = formatToIDR(dataItem.transport_awal);
  dataItem.transport_akhir = formatToIDR(dataItem.transport_akhir);
  dataItem.akomodasi_awal = formatToIDR(dataItem.akomodasi_awal);
  dataItem.akomodasi_akhir = formatToIDR(dataItem.akomodasi_akhir);
  dataItem.tiket_pesawat_awal = formatToIDR(dataItem.tiket_pesawat_awal);
  dataItem.tiket_pesawat_akhir = formatToIDR(dataItem.tiket_pesawat_akhir);
  dataItem.total_biaya_satuan = formatToIDR(dataItem.total_biaya_satuan);
  dataItem.total_biaya = formatToIDR(dataItem.total_biaya);
  dataItem.biaya_mui = formatToIDR(dataItem.biaya_mui);
  dataItem.biaya_bpjph = formatToIDR(dataItem.biaya_bpjph);

  detailBiaya.value = dataItem;
  biayaDialog.value = true;
};

const formatLembaga = (val: string) => {
  return listLembaga.value.find((item: any) => item.id === val)?.name;
};
</script>

<template>
  <KembaliButton />
  <VRow v-if="!loading">
    <VCol cols="6" style="display: flex; align-items: center;">
      <h2>Detail Data Fasilitasi</h2>
    </VCol>
    <VCol cols="6" style="display: flex; justify-content: end;">
      <div v-if="['OF1', 'OF2'].includes(detail.status_registrasi.status_code)">
        <VBtn
          density="compact"
          style="margin: 0.5svw;"
          variant="outlined"
          color="#E1442E"
          @click="visibleModalHapus = true"
        >
          <VIcon style="color: #e1442e;" icon="fa-trash" />
        </VBtn>

        <VBtn
          density="compact"
          style="margin: 0.5svw;"
          variant="outlined"
          append-icon="fa-pencil"
          @click="navigateAction"
        >
          Ubah
        </VBtn>

        <VBtn
          density="compact"
          style="margin: 0.5svw;"
          variant="flat"
          append-icon="fa-paper-plane"
          @click="visibleModalKirim = true"
        >
          Kirim
        </VBtn>
      </div>

      <div v-if="['OF320', 'OF10', 'OF12', 'OF5'].includes(detail.status_registrasi.status_code)">
        <VBtn
          density="compact"
          style="margin: 0.5svw;"
          variant="outlined"
          append-icon="fa-pencil"
          @click="navigateActionLembaga"
        >
          Ubah Data Lembaga
        </VBtn>
      </div>
    </VCol>
  </VRow>
  <VRow v-if="!loading">
    <VCol cols="8">
      <VExpansionPanels v-model="openPanelFacilitate">
        <VExpansionPanel>
          <VExpansionPanelTitle>
            <h3>Data Fasilitasi</h3>
          </VExpansionPanelTitle>
          <VExpansionPanelText>
            <VRow>
              <VCol cols="3"> Nama Fasilitator </VCol>
              <VCol cols="1"> : </VCol>
              <VCol cols="8"> {{ detail.fasilitasi.nama }} </VCol>
            </VRow>

            <VRow>
              <VCol cols="3"> Nama Program Fasilitasi </VCol>
              <VCol cols="1"> : </VCol>
              <VCol cols="8"> {{  detail.fasilitasi.nama_program}} </VCol>
            </VRow>

            <VRow>
              <VCol cols="3"> Nama Penanggung Jawab Program </VCol>
              <VCol cols="1"> : </VCol>
              <VCol cols="8"> {{  detail.fasilitasi.penanggung_jawab }} </VCol>
            </VRow>

            <VRow>
              <VCol cols="3"> Fasilitasi Deskripsi </VCol>
              <VCol cols="1"> : </VCol>
              <VCol cols="8"> {{  detail.fasilitasi.fac_description }} </VCol>
            </VRow>

            <VRow>
              <VCol cols="3"> Nomor Kontak Penanggung Jawab </VCol>
              <VCol cols="1"> : </VCol>
              <VCol cols="8"> {{  detail.fasilitasi.phone_penanggung_jawab }} </VCol>
            </VRow>

            <VRow>
              <VCol cols="3"> Tahun </VCol>
              <VCol cols="1"> : </VCol>
              <VCol cols="8"> {{  detail.fasilitasi.tahun }} </VCol>
            </VRow>

            <VRow>
              <VCol cols="3"> Lingkup Wilayah Fasilitasi </VCol>
              <VCol cols="1"> : </VCol>
              <VCol cols="8"> {{  detail.fasilitasi.lingkup_wilayah_fasilitas }} </VCol>
            </VRow>

            <VRow>
              <VCol cols="3"> Tanggal Mulai </VCol>
              <VCol cols="1"> : </VCol>
              <VCol cols="8"> {{ detail.fasilitasi.tgl_mulai ? formatDate(new Date(detail.fasilitasi.tgl_mulai)) : "" }} </VCol>
            </VRow>

            <VRow>
              <VCol cols="3"> Tanggal Selesai </VCol>
              <VCol cols="1"> : </VCol>
              <VCol cols="8"> {{ detail.fasilitasi.tgl_selesai ? formatDate(new Date(detail.fasilitasi.tgl_selesai)): "" }} </VCol>
            </VRow>

            <VRow>
              <VCol cols="3"> Jenis Fasilitasi </VCol>
              <VCol cols="1"> : </VCol>
              <VCol cols="8"> {{  detail.fasilitasi.jenis_fasilitasi }} </VCol>
            </VRow>

            <VRow>
              <VCol cols="3"> Sumber Pembiayaan </VCol>
              <VCol cols="1"> : </VCol>
              <VCol cols="8"> {{  detail.fasilitasi.sumber_biaya_name }} </VCol>
            </VRow>

            <VRow v-if=" detail.fasilitasi.jenis_fasilitasi == 'Self Declare'">
              <VCol cols="3"> Kuota </VCol>
              <VCol cols="1"> : </VCol>
              <VCol cols="8"> {{  detail.fasilitasi.kuota }} </VCol>
            </VRow>
          </VExpansionPanelText>
        </VExpansionPanel>
      </VExpansionPanels>

       <br />

        <VExpansionPanels v-model="panelInstitution">
          <VExpansionPanel>
            <VExpansionPanelTitle>
              <h3>Lembaga</h3>
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <VDataTable :headers="institutionHeader" :items="detail.lembaga">
                <template #item.index="{ index }">
                  {{ index + 1 }}
                </template>
                <template #item.lph="{ item }">
                  {{
                    item.lp_id != null
                      ? formatLembaga(item.lp_id)
                      : formatLembaga(item.lph_id)
                  }}
                </template>
              </VDataTable>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br />

        <VExpansionPanels v-model="panelBiayaFasilitasi">
          <VExpansionPanel>
            <VExpansionPanelTitle>
              <h3>Biaya Fasilitasi</h3>
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <VDataTable
                  class="domestic-table border rounded"
                  :headers="biayaFasilitasiHeader"
                  :items="detail.fasilitasi_detail || []"
                  hide-default-footer
                >
                  <template #body="{ items }">
                    <tr v-if="items.length === 0">
                      <td colspan="7" class="text-center">
                        <div class="pt-2">
                          <img src="~/assets/images/empty-data.png" alt="" />
                          <div class="pt-2 font-weight-bold">Data Kosong</div>
                        </div>
                      </td>
                    </tr>
                    <tr v-for="(item, idx) in detail.fasilitasi_detail" :key="idx">
                      <td>{{ idx + 1 }}</td>
                      <td>{{ item.MLPH.nama_lph }}</td>
                      <td>{{ item.MProvinsi.namaprovinsi + ", " + item.MKabupaten.namakabupaten.toLowerCase().replace(/\b\w/g, char => char.toUpperCase()) }}</td>
                      <td>{{ item.MJenisLayanan.ref_desc }}</td>
                      <td>{{ item.MJenisProduk.ref_desc }}</td>
                      <td>{{ item.kuota }}</td>
                     
                      <td class="text-center">
                        <VMenu>
                          <template #activator="{ props }">
                            <VIcon
                              icon="fa-ellipsis-v"
                              color="primary"
                              class="cursor-pointer"
                              v-bind="props"
                            />
                          </template>
                          <VList>
                            <VListItem
                              prepend-icon="mdi-eye"
                              title="Detail"
                              @click="() => openModalBiayaDetail(item)"
                            />
                          </VList>
                        </VMenu>
                      </td>

                       <td>
                          <VChip
                            label
                            :color="statusItem[item.fac_status].color"
                          >
                            {{ statusItem[item.fac_status].desc }}
                          </VChip>
                      </td>
                    </tr>
                    <tr>
                      <td />
                      <td />
                      <td />
                      <td />
                      <td />
                      <td />
                      <td />
                      <td v-if="items.length">
                        <div class="d-flex gap-5">
                          <td
                            class="text-right font-weight-bold"
                            style="align-content: center;"
                          >
                            Total
                          </td>
                          <div class="d-flex align-center font-weight-bold">
                            {{ formatToIDR(totalBiayaDetail) || 0 }}
                          </div>
                        </div>
                      </td>
                    </tr>
                    <div />
                  </template>
                </VDataTable>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>


    </VCol>
    <VCol cols="4">
      <VRow>
        <VCol :cols="12">
          <VExpansionPanels v-model="openPanelRegisterData">
            <VExpansionPanel>
              <VExpansionPanelTitle>
                <h3>Registration Data</h3>
              </VExpansionPanelTitle>
              <VExpansionPanelText>
                <RegisterDataFacilitate :data="detail.status_registrasi" />
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>
        </VCol>
      </VRow>

      <VRow>
        <VCol :cols="12">
          <VExpansionPanels v-model="openPanelTracking">
            <VExpansionPanel>
              <VExpansionPanelTitle>
                <h3>Tracking</h3>
              </VExpansionPanelTitle>
              <VExpansionPanelText>
                <HalalTimeLine :event="detail.tracking" />
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>
        </VCol>
      </VRow>
    </VCol>
  </VRow>

  <VDialog v-model="visibleModalHapus" max-width="50svw">
    <VCard style="padding: 1svw;">
      <VCardTitle><h3>Hapus Pengajuan</h3></VCardTitle>
      <VCardItem>
        <p>Yakin ingin menghapus pengajuan fasilitasi?</p>
      </VCardItem>
      <VCardActions>
        <VBtn
          variant="outlined"
          density="compact"
          @click="visibleModalHapus = false"
        >
          Batal
        </VBtn>
        <VBtn
          color="#E1442E"
          variant="flat"
          density="compact"
          :disabled="loadingDelete"
          @click="deleteFacilitate"
        >
          {{ loadingDelete ? "Loading..." : "Ya, Hapus" }}
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>

  <VDialog v-model="visibleModalKirim" max-width="50svw">
    <VCard>
      <VCardTitle><h3>Kirim Pengajuan</h3></VCardTitle>
      <VCardItem>
        <p>Yakin ingin mengirim pengajuan fasilitasi?</p>
      </VCardItem>
      <VCardActions>
        <VBtn
          variant="outlined"
          density="compact"
          @click="visibleModalKirim = false"
        >
          Batal
        </VBtn>
        <VBtn
          :disabled="loadingSubmit"
          variant="flat"
          density="compact"
          @click="submitFacilitate"
        >
          {{ loadingSubmit ? "Loading..." : "Kirim" }}
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>

  <VDialog v-model="biayaDialog" max-width="840px" persistent>
      <VCard class="pa-4">
        <VCardTitle class="d-flex justify-space-between align-center">
          <div class="text-h3 font-weight-bold">Biaya Fasilitasi</div>
          <VIcon
            @click="
              () => {
                biayaDialog = false;
              }
            "
          >
            fa-times
          </VIcon>
        </VCardTitle>
        <VCardText>
          <VRow>
            <VCol>
              <div class="text-h6">Unit Cost Awal</div>
              <VTextField
                v-model="detailBiaya.unit_cost_awal"
                rounded="xl"
                density="compact"
                disabled
              />
            </VCol>
            <VCol>
              <div class="text-h6">Diskon (%)</div>
              <VTextField
                disabled
                v-model="detailBiaya.unit_cost_diskon"
                type="number"
                rounded="xl"
                density="compact"
                placeholder="Masukkan Diskon"
                :min="0"
                :max="100"
                @keypress="validateInput"
                @input="
                  (e) => {
                    validateInput(e);
                    if (+e.target.value) {
                      const initialCost = idrToNumber(
                        detailBiaya.unit_cost_awal
                      );
                      detailBiaya.unit_cost_akhir =
                        initialCost - initialCost * (+e.target.value / 100);
                      if (detailBiaya.unit_cost_akhir) {
                        detailBiaya.unit_cost_akhir = formatToIDR(
                          detailBiaya.unit_cost_akhir
                        );
                      }
                    } else {
                      detailBiaya.unit_cost_akhir = detailBiaya.unit_cost_awal;
                    }
                  }
                "
              />
            </VCol>
            <VCol>
              <div class="text-h6">Unit Cost Akhir</div>
              <VTextField
                v-model="detailBiaya.unit_cost_akhir"
                rounded="xl"
                density="compact"
                disabled
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol>
              <div class="text-h6">UHPD Awal</div>
              <VTextField
                v-model="detailBiaya.uhpd_awal"
                rounded="xl"
                density="compact"
                disabled
              />
            </VCol>
            <VCol>
              <div class="text-h6">Diskon (%)</div>
              <VTextField
                disabled
                v-model="detailBiaya.uhpd_diskon"
                rounded="xl"
                density="compact"
                placeholder="Masukkan Diskon"
                :min="0"
                :max="100"
                @keypress="validateInput"
                @input="
                  (e) => {
                    validateInput(e);
                    if (+e.target.value) {
                      const initialCost = idrToNumber(detailBiaya.uhpd_awal);
                      detailBiaya.uhpd_akhir =
                        initialCost - initialCost * (+e.target.value / 100);
                      if (detailBiaya.uhpd_akhir) {
                        detailBiaya.uhpd_akhir = formatToIDR(
                          detailBiaya.uhpd_akhir
                        );
                      }
                    } else {
                      detailBiaya.uhpd_akhir = detailBiaya.uhpd_awal;
                    }
                  }
                "
              />
            </VCol>
            <VCol>
              <div class="text-h6">UHPD Akhir</div>
              <VTextField
                v-model="detailBiaya.uhpd_akhir"
                rounded="xl"
                density="compact"
                disabled
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol>
              <div class="text-h6">Operasional</div>
              <VTextField
                v-model="detailBiaya.operasional"
                rounded="xl"
                density="compact"
                disabled
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol>
              <div class="text-h6">Transportasi Awal</div>
              <VTextField
                v-model="detailBiaya.transport_awal"
                rounded="xl"
                density="compact"
                disabled
              />
            </VCol>
            <VCol>
              <div class="text-h6">Diskon (%)</div>
              <VTextField
                disabled
                v-model="detailBiaya.transport_diskon"
                rounded="xl"
                density="compact"
                placeholder="Masukkan Diskon"
                :min="0"
                :max="100"
                @keypress="validateInput"
                @input="
                  (e) => {
                    validateInput(e);
                    if (+e.target.value) {
                      const initialCost = idrToNumber(
                        detailBiaya.transport_awal
                      );
                      detailBiaya.transport_akhir =
                        initialCost - initialCost * (+e.target.value / 100);
                      if (detailBiaya.transport_akhir) {
                        detailBiaya.transport_akhir = formatToIDR(
                          detailBiaya.transport_akhir
                        );
                      }
                    } else {
                      detailBiaya.transport_akhir = detailBiaya.transport_awal;
                    }
                  }
                "
              />
            </VCol>
            <VCol>
              <div class="text-h6">Transportasi Akhir</div>
              <VTextField
                v-model="detailBiaya.transport_akhir"
                rounded="xl"
                density="compact"
                disabled
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol>
              <div class="text-h6">Akomodasi Awal</div>
              <VTextField
                v-model="detailBiaya.akomodasi_awal"
                rounded="xl"
                density="compact"
                disabled
              />
            </VCol>
            <VCol>
              <div class="text-h6">Diskon (%)</div>
              <VTextField
                disabled
                v-model="detailBiaya.akomodasi_diskon"
                rounded="xl"
                density="compact"
                placeholder="Masukkan Diskon"
                :min="0"
                :max="100"
                @keypress="validateInput"
                @input="
                  (e) => {
                    validateInput(e);
                    if (+e.target.value) {
                      const initialCost = idrToNumber(
                        detailBiaya.akomodasi_awal
                      );
                      detailBiaya.akomodasi_akhir =
                        initialCost - initialCost * (+e.target.value / 100);
                      if (detailBiaya.akomodasi_akhir) {
                        detailBiaya.akomodasi_akhir = formatToIDR(
                          detailBiaya.akomodasi_akhir
                        );
                      }
                    } else {
                      detailBiaya.akomodasi_akhir = detailBiaya.akomodasi_awal;
                    }
                  }
                "
              />
            </VCol>
            <VCol>
              <div class="text-h6">Akomodasi Akhir</div>
              <VTextField
                v-model="detailBiaya.akomodasi_akhir"
                rounded="xl"
                density="compact"
                disabled
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol>
              <div class="text-h6">Tiket Pesawat Awal</div>
              <VTextField
                v-model="detailBiaya.tiket_pesawat_awal"
                rounded="xl"
                density="compact"
                disabled
              />
            </VCol>
            <VCol>
              <div class="text-h6">Diskon (%)</div>
              <VTextField
                disabled
                v-model="detailBiaya.tiket_pesawat_diskon"
                rounded="xl"
                density="compact"
                placeholder="Masukkan Diskon"
                :min="0"
                :max="100"
                @keypress="validateInput"
                @input="
                  (e) => {
                    validateInput(e);
                    if (+e.target.value) {
                      const initialCost = idrToNumber(
                        detailBiaya.tiket_pesawat_awal
                      );
                      detailBiaya.tiket_pesawat_akhir =
                        initialCost - initialCost * (+e.target.value / 100);
                      if (detailBiaya.tiket_pesawat_akhir) {
                        detailBiaya.tiket_pesawat_akhir = formatToIDR(
                          detailBiaya.tiket_pesawat_akhir
                        );
                      }
                    } else {
                      detailBiaya.tiket_pesawat_akhir =
                        detailBiaya.tiket_pesawat_awal;
                    }
                  }
                "
              />
            </VCol>
            <VCol>
              <div class="text-h6">Tiket Pesawat Akhir</div>
              <VTextField
                v-model="detailBiaya.tiket_pesawat_akhir"
                rounded="xl"
                density="compact"
                disabled
              />
            </VCol>
          </VRow>

          <VRow>
            <VCol>
              <div class="text-h6">Pemeriksaan dan Penerbitan SH</div>
              <VTextField
                v-model="detailBiaya.biaya_bpjph"
                rounded="xl"
                density="compact"
                disabled
              />
            </VCol>
          </VRow>

          <VRow>
            <VCol>
              <div class="text-h6">Penetapan</div>
              <VTextField
                v-model="detailBiaya.biaya_mui"
                rounded="xl"
                density="compact"
                disabled
              />
            </VCol>
          </VRow>

          <VRow>
            <VCol>
              <div class="text-h6">Total Biaya Satuan</div>
              <VTextField
                v-model="detailBiaya.total_biaya_satuan"
                rounded="xl"
                density="compact"
                disabled
              />
            </VCol>
          </VRow>

           <VRow>
            <VCol>
              <div class="text-h6">Total Biaya</div>
              <VTextField
                v-model="detailBiaya.total_biaya"
                rounded="xl"
                density="compact"
                disabled
              />
              <div class="text-sm">Total Biaya adalah hasil total biaya satuan di kali dengan kuota</div>
            </VCol>
          </VRow>

        </VCardText>
        <VCardActions class="pt-2 px-4">
          <VBtn
            variant="outlined"
            class="px-4 me-3"
            @click="
              () => {
                biayaDialog = false;
              }
            "
            >Batal</VBtn
          >
        </VCardActions>
      </VCard>
    </VDialog>
</template>

<style>
.v-btn--variant-outlined {
  color: red;
}
</style>

<style scoped lang="scss">
:deep(.v-data-table.domestic-table > .v-table__wrapper) {
  table {
    thead {
      tr {
        th:nth-of-type(7) {
          position: sticky;
          border-inline-start: 1px solid rgba(#000, 0.12);
          inset-inline-end: 220px;
        }

        th:last-of-type {
          position: sticky;
          inline-size: 50px;
          inset-inline-end: 0;
        }
      }
    }

    tbody {
      tr:not(:last-of-type) {
        td:nth-of-type(7) {
          position: sticky;
          background: white;
          border-inline-start: 1px solid rgba(#000, 0.12);
          inline-size: 150px;
          inset-inline-end: 220px;
        }

        td:last-of-type {
          position: sticky;
          background: white;
          inline-size: 50px; // Adjust width of last <td>
          inset-inline-end: 0;
        }
      }

      tr:last-of-type {
        td:nth-of-type(2) {
          position: sticky;
          background: white;
          inline-size: max-content;
          inset-inline-end: 100px;
        }

        td:last-of-type {
          position: sticky;
          background: white;
          inline-size: max-content;
          inset-inline-end: 100px;
        }
      }
    }
  }
}

</style>
