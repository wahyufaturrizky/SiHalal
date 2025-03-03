<script setup lang="ts">
import { statusItemFacilitator } from '@/server/utils/statusFasilitator'

interface FasilitatorData {
  fasilitasi: Fasilitasi
  lembaga: Lembaga[]
  status_registrasi: StatusRegistrasi
  tracking: any[]
  fasilitasi_detail: FasilitasiDetail[]
}

interface Fasilitasi {
  nama: string
  nama_program: string
  fac_description: string
  penanggung_jawab: string
  phone_penanggung_jawab: string
  tahun: number
  lingkup_wilayah_fasilitas: string
  tgl_mulai: string
  tgl_selesai: string
  jenis_fasilitasi: string
  sumber_pembiayaan: string
  kuota: number
  is_locked_lembaga: boolean
}

interface FasilitasiDetail {
  id: string
  fac_id: string
  fac_status: string
  created_by: string
  created_on: string
  deleted: string | null
  is_taken: string | null
  jenis_layanan: string
  jenis_produk: string
  jumlah_produk: number
  kabupaten_id: string
  kuota: number
  lph_id: string
  provinsi_id: string
  ruang_lingkup: string
  MFacilitatedDetailBiaya: FasilitasiDetailBiaya
  MJenisLayanan: {
    ref_id: string
    ref_group_id: string
    ref_desc: string
    ref_desc_eng: string
    long_init: number
    long_init_besar: number
    long_init_menengah: number
    Parent: string
  }
  MJenisProduk: {
    ref_id: string
    ref_group_id: string
    ref_desc: string
    ref_desc_eng: string
    long_init: number
    long_init_besar: number
    long_init_menengah: number
    Parent: string
  }
  MKabupaten: {
    kodeprovinsi: string
    kodekabupaten: string
    namakabupaten: string
  }
  MLPH: {
    lph_id: string
    no_reg: string
    alamat: string
    email: string
    kota: string
    lph_sn: string
    nama_lph: string
    nama_pimpinan: string
    no_hp: string
    provinsi: string
  }
  MProvinsi: {
    kodeprovinsi: string
    namaprovinsi: string
  }
}

interface FasilitasiDetailBiaya {
  id: string
  fac_id: string
  fac_id_detail: string
  created_by: string
  created_on: string
  updated_by: string
  updated_on: string
  kabupaten_id: string
  provinsi_id: string
  kuota: number
  mandays: number
  akomodasi_awal: number
  akomodasi_akhir: number
  akomodasi_diskon: number
  biaya_bpjph: number
  biaya_mui: number
  operasional: number
  tiket_pesawat_awal: number
  tiket_pesawat_akhir: number
  tiket_pesawat_diskon: number
  transport_awal: number
  transport_akhir: number
  transport_diskon: number
  uhpd_awal: number
  uhpd_akhir: number
  uhpd_diskon: number
  unit_cost_awal: number
  unit_cost_akhir: number
  unit_cost_diskon: number
  total_biaya: number
  total_biaya_satuan: number
}

interface Lembaga {
  id: string
  fac_id: string
  nama_pic_lembaga: string
  nomor_pic_lembaga: string
  lp_id?: string
  lph_id?: string
  created_by: string
  created_on: string
}

interface StatusRegistrasi {
  status: string
  kode_fasilitasi: string
  status_code: string
}

const detailBiaya = ref<any>({})
const biayaDialog = ref<boolean>(false)

const panelFasilitasi = ref([0, 1])
const panelInstitution = ref([0, 1])
const panelBiayaFasilitasi = ref([0, 1])
const panelTracking = ref([0, 1])
const panelStatus = ref([0, 1])

const route = useRoute()
const shlnId = route.params.id

const detail = ref<FasilitatorData>({
  fasilitasi: {
    nama: '',
    nama_program: '',
    fac_description: '',
    penanggung_jawab: '',
    phone_penanggung_jawab: '',
    tahun: 0,
    lingkup_wilayah_fasilitas: '',
    tgl_mulai: '',
    tgl_selesai: '',
    jenis_fasilitasi: '',
    sumber_pembiayaan: '',
    kuota: 0,
    is_locked_lembaga: true,
  },
  lembaga: [],
  status_registrasi: {
    status: '',
    status_code: '',
    kode_fasilitasi: '',
  },
  tracking: [],
  fasilitasi_detail: [],
})

const jenisFasilitasi = ref()
const listLembaga = ref([])

const totalBiayaDetail = ref(0)

const getDetail = async () => {
  try {
    const response = await $api('/facilitate/verifikator/detail', {
      method: 'post',
      body: {
        id: shlnId,
      },
    })

    if (response.code != 2000)
      navigateTo('/facilitator/verifikasi')

    totalBiayaDetail.value = 0

    const { fasilitator } = response.data || {}

    detail.value = fasilitator
    jenisFasilitasi.value = detail.value.fasilitasi.jenis_fasilitasi

    let url = '/facilitate/verifikator/lp'
    if (jenisFasilitasi.value == 'Reguler')
      url = '/facilitate/verifikator/lph'

    const lembaga = await $api(url, {
      method: 'get',
    })

    if (lembaga.code != 2000) {
      useSnackbar().sendSnackbar('Ada Kesalahan', 'error')

      return
    }

    listLembaga.value = lembaga.data

    fasilitator.fasilitasi_detail.map((value: any) => {
      totalBiayaDetail.value += value.MFacilitatedDetailBiaya.total_biaya
    })
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
}

const formatLembaga = (val: string) => {
  return listLembaga.value.find((item: any) => item.id === val)?.name
}

const returnHandler = async (message: string) => {
  try {
    const res = await $api('/facilitate/verifikator/return', {
      method: 'post',
      body: {
        id: route.params.id,
        comment: message,
      },
    })

    if (res.code != 2000) {
      useSnackbar().sendSnackbar('Ada kesalahan!', 'error')

      return
    }
    navigateTo('/facilitator/verifikasi')
    useSnackbar().sendSnackbar('Data berhasil di return', 'success')
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada kesalahan!', 'error')
  }

  // window.location.href = "/login";
}

const rejectHandler = async (message: string) => {
  try {
    const res = await $api('/facilitate/verifikator/reject', {
      method: 'post',
      body: {
        id: route.params.id,
        comment: message,
      },
    })

    if (res.code != 2000) {
      useSnackbar().sendSnackbar('Ada kesalahan!', 'error')

      return
    }
    navigateTo('/facilitator/verifikasi')
    useSnackbar().sendSnackbar('Data berhasil di return', 'success')
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada kesalahan!', 'error')
  }
}

const approveHandler = async (message: string) => {
  try {
    const res = await $api('/facilitate/verifikator/approve', {
      method: 'post',
      body: {
        id: route.params.id,
      },
    })

    if (res.code != 2000) {
      useSnackbar().sendSnackbar('Ada kesalahan!', 'error')

      return
    }
    navigateTo('/facilitator/verifikasi')
    useSnackbar().sendSnackbar('Data berhasil di approve', 'success')
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada kesalahan!', 'error')
  }
}

const dataSOF = ref([])

const loadSOF = async () => {
  try {
    const response = await $api('/master/source-of-fund', {
      method: 'get',
    })

    if (response.length)
      dataSOF.value = response
    else
      useSnackbar().sendSnackbar('Ada Kesalahan asd', 'error')
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
}

const formatSof = (val: string) => {
  return dataSOF.value.find((item: any) => item.code === val)?.name
}

const openModalBiayaDetail = (item: any) => {
  const dataItem = item.MFacilitatedDetailBiaya

  dataItem.unit_cost_awal = formatToIDR(dataItem.unit_cost_awal)
  dataItem.unit_cost_akhir = formatToIDR(dataItem.unit_cost_akhir)
  dataItem.uhpd_awal = formatToIDR(dataItem.uhpd_awal)
  dataItem.uhpd_akhir = formatToIDR(dataItem.uhpd_akhir)
  dataItem.operasional = formatToIDR(dataItem.operasional)
  dataItem.transport_awal = formatToIDR(dataItem.transport_awal)
  dataItem.transport_akhir = formatToIDR(dataItem.transport_akhir)
  dataItem.akomodasi_awal = formatToIDR(dataItem.akomodasi_awal)
  dataItem.akomodasi_akhir = formatToIDR(dataItem.akomodasi_akhir)
  dataItem.tiket_pesawat_awal = formatToIDR(dataItem.tiket_pesawat_awal)
  dataItem.tiket_pesawat_akhir = formatToIDR(dataItem.tiket_pesawat_akhir)
  dataItem.total_biaya_satuan = formatToIDR(dataItem.total_biaya_satuan)
  dataItem.total_biaya = formatToIDR(dataItem.total_biaya)
  dataItem.biaya_mui = formatToIDR(dataItem.biaya_mui)
  dataItem.biaya_bpjph = formatToIDR(dataItem.biaya_bpjph)

  detailBiaya.value = dataItem
  biayaDialog.value = true
}

onMounted(async () => {
  await Promise.allSettled([getDetail(), loadSOF()])
})

const institutionHeader = [
  { title: 'No', key: 'index' },
  { title: 'Nama LPH / LP3H', key: 'lph' },
  { title: 'Nama Penanggung Jawab', key: 'nama_pic_lembaga' },
  { title: 'Nomor Penanggung Jawab', key: 'nomor_pic_lembaga' },
]

const biayaFasilitasiHeader = [
  { title: 'No', key: 'index', nowrap: true },
  { title: 'Lembaga Pemeriksa Halal (LPH)', nowrap: true },
  { title: 'Alamat Fasilitasi', nowrap: true },

  // { title: "Kabupaten",  nowrap: true },
  { title: 'Jenis Layanan', nowrap: true },
  { title: 'Jenis Produk', nowrap: true },
  { title: 'Kuota', nowrap: true },
  { title: 'Biaya', nowrap: true },
  { title: 'Status', nowrap: true },
]

const defaultStatus = { color: 'error', desc: 'Unknown Status' }

const statusItem: any = new Proxy(
  {
    OF1: { color: 'grey-300', desc: 'Draft' },
    OF12: { color: 'error', desc: 'Belum Ver. LPH' },
    OF10: { color: 'success', desc: 'Sudah Ver. LPH' },
    OF15: { color: 'success', desc: 'Sudah Ver. LPH' },
    OF2: { color: 'error', desc: 'Belum Ver. LPH' },
    OF290: { color: 'error', desc: 'Belum Ver. LPH' },
    OF5: { color: 'success', desc: 'Sudah Ver. LPH' },
    OF320: { color: 'success', desc: 'Sudah Ver. LPH' },
    OF11: { color: 'success', desc: 'Sudah Ver. LPH' },
  },
  {
    get(target: any, prop: any) {
      return prop in target ? target[prop] : defaultStatus
    },
  },
)
</script>

<template>
  <KembaliButton />
  <VRow class="d-flex justify-start align-center px-4">
    <h1 style="font-size: 32px;">
      Detail Ajuan Fasilitasi
    </h1>
  </VRow>
  <VRow
    v-if="detail.status_registrasi.status_code == 'OF10'"
    class="d-flex justify-end align-center px-4"
  >
    <VerifikatorFasilitatorReturnConfirm @confirm="returnHandler" />
    <VerifikatorFasilitatorRejectConfirm @confirm="rejectHandler" />
    <VerifikatorFasilitatorApproveConfirm @confirm="approveHandler" />
  </VRow>
  <VRow>
    <VCol cols="8">
      <VExpansionPanels v-model="panelFasilitasi">
        <VExpansionPanel class="py-2">
          <VExpansionPanelTitle>
            <h3>Data Fasilitasi</h3>
          </VExpansionPanelTitle>
          <VExpansionPanelText>
            <InfoRow name="Nama Fasilitator">
              {{
                detail.fasilitasi.nama
              }}
            </InfoRow>
            <InfoRow name="Nama Program Fasilitasi">
              {{
                detail.fasilitasi.nama_program
              }}
            </InfoRow>
            <InfoRow name="Nama Penanggung Jawab Program">
              {{
                detail.fasilitasi.penanggung_jawab
              }}
            </InfoRow>
            <InfoRow name="Nomor Penanggung Jawab Program">
              {{
                detail.fasilitasi.phone_penanggung_jawab
              }}
            </InfoRow>
            <InfoRow name="Tahun">
              {{ detail.fasilitasi.tahun }}
            </InfoRow>
            <InfoRow name="Lingkup Wilayah Fasilitasi">
              {{
                detail.fasilitasi.lingkup_wilayah_fasilitas
              }}
            </InfoRow>
            <InfoRow name="Tgl. Mulai ">
              {{
                detail.fasilitasi.tgl_mulai != ""
                  ? formatDateIntl(new Date(detail.fasilitasi.tgl_mulai))
                  : ""
              }}
            </InfoRow>
            <InfoRow name="Tgl. Selesai">
              {{
                detail.fasilitasi.tgl_selesai != ""
                  ? formatDateIntl(new Date(detail.fasilitasi.tgl_selesai))
                  : ""
              }}
            </InfoRow>
            <InfoRow name="Jenis Fasilitasi">
              {{
                detail.fasilitasi.jenis_fasilitasi
              }}
            </InfoRow>
            <InfoRow name="Sumber Pembiayaan">
              {{
                formatSof(detail.fasilitasi.sumber_pembiayaan)
              }}
            </InfoRow>
            <InfoRow name="Kuota">
              {{ detail.fasilitasi.kuota }}
            </InfoRow>
          </VExpansionPanelText>
        </VExpansionPanel>
      </VExpansionPanels>

      <br>

      <VExpansionPanels v-model="panelInstitution">
        <VExpansionPanel class="py-2">
          <VExpansionPanelTitle>
            <h3>Lembaga</h3>
          </VExpansionPanelTitle>
          <VExpansionPanelText>
            <VDataTable
              :headers="institutionHeader"
              :items="detail.lembaga"
            >
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

      <br>

      <VExpansionPanels v-model="panelBiayaFasilitasi">
        <VExpansionPanel class="py-2">
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
                  <td
                    colspan="7"
                    class="text-center"
                  >
                    <div class="pt-2">
                      <img
                        src="~/assets/images/empty-data.png"
                        alt=""
                      >
                      <div class="pt-2 font-weight-bold">
                        Data Kosong
                      </div>
                    </div>
                  </td>
                </tr>
                <tr
                  v-for="(item, idx) in detail.fasilitasi_detail"
                  :key="idx"
                >
                  <td>{{ idx + 1 }}</td>
                  <td>{{ item.MLPH.nama_lph }}</td>
                  <td>{{ `${item.MProvinsi.namaprovinsi}, ${item.MKabupaten.namakabupaten.toLowerCase().replace(/\b\w/g, char => char.toUpperCase())}` }}</td>
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
      <VExpansionPanels v-model="panelStatus">
        <VExpansionPanel class="py-2">
          <VExpansionPanelTitle>
            <h3>Status Registrasi</h3>
          </VExpansionPanelTitle>
          <VExpansionPanelText>
            <InfoRow
              name="Status"
              separator=""
              class="d-flex align-center"
            >
              <VChip
                class="ma-2"
                label
                :color="
                  statusItemFacilitator[detail.status_registrasi.status_code]
                    .color
                "
              >
                {{
                  statusItemFacilitator[detail.status_registrasi.status_code]
                    .desc
                }}
              </VChip>
            </InfoRow>
            <InfoRow
              name="Kode Fasilitasi"
              separator=""
            >
              {{
                detail.status_registrasi.kode_fasilitasi
              }}
            </InfoRow>
          </VExpansionPanelText>
        </VExpansionPanel>
      </VExpansionPanels>

      <br>
      <VExpansionPanels v-model="panelTracking">
        <VExpansionPanel class="py-2">
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

  <VDialog
    v-model="biayaDialog"
    max-width="840px"
    persistent
  >
    <VCard class="pa-4">
      <VCardTitle class="d-flex justify-space-between align-center">
        <div class="text-h3 font-weight-bold">
          Biaya Fasilitasi
        </div>
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
            <div class="text-h6">
              Unit Cost Awal
            </div>
            <VTextField
              v-model="detailBiaya.unit_cost_awal"
              rounded="xl"
              density="compact"
              disabled
            />
          </VCol>
          <VCol>
            <div class="text-h6">
              Diskon (%)
            </div>
            <VTextField
              v-model="detailBiaya.unit_cost_diskon"
              disabled
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
                      detailBiaya.unit_cost_awal,
                    );
                    detailBiaya.unit_cost_akhir
                      = initialCost - initialCost * (+e.target.value / 100);
                    if (detailBiaya.unit_cost_akhir) {
                      detailBiaya.unit_cost_akhir = formatToIDR(
                        detailBiaya.unit_cost_akhir,
                      );
                    }
                  }
                  else {
                    detailBiaya.unit_cost_akhir = detailBiaya.unit_cost_awal;
                  }
                }
              "
            />
          </VCol>
          <VCol>
            <div class="text-h6">
              Unit Cost Akhir
            </div>
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
            <div class="text-h6">
              UHPD Awal
            </div>
            <VTextField
              v-model="detailBiaya.uhpd_awal"
              rounded="xl"
              density="compact"
              disabled
            />
          </VCol>
          <VCol>
            <div class="text-h6">
              Diskon (%)
            </div>
            <VTextField
              v-model="detailBiaya.uhpd_diskon"
              disabled
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
                    detailBiaya.uhpd_akhir
                      = initialCost - initialCost * (+e.target.value / 100);
                    if (detailBiaya.uhpd_akhir) {
                      detailBiaya.uhpd_akhir = formatToIDR(
                        detailBiaya.uhpd_akhir,
                      );
                    }
                  }
                  else {
                    detailBiaya.uhpd_akhir = detailBiaya.uhpd_awal;
                  }
                }
              "
            />
          </VCol>
          <VCol>
            <div class="text-h6">
              UHPD Akhir
            </div>
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
            <div class="text-h6">
              Operasional
            </div>
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
            <div class="text-h6">
              Transportasi Awal
            </div>
            <VTextField
              v-model="detailBiaya.transport_awal"
              rounded="xl"
              density="compact"
              disabled
            />
          </VCol>
          <VCol>
            <div class="text-h6">
              Diskon (%)
            </div>
            <VTextField
              v-model="detailBiaya.transport_diskon"
              disabled
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
                      detailBiaya.transport_awal,
                    );
                    detailBiaya.transport_akhir
                      = initialCost - initialCost * (+e.target.value / 100);
                    if (detailBiaya.transport_akhir) {
                      detailBiaya.transport_akhir = formatToIDR(
                        detailBiaya.transport_akhir,
                      );
                    }
                  }
                  else {
                    detailBiaya.transport_akhir = detailBiaya.transport_awal;
                  }
                }
              "
            />
          </VCol>
          <VCol>
            <div class="text-h6">
              Transportasi Akhir
            </div>
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
            <div class="text-h6">
              Akomodasi Awal
            </div>
            <VTextField
              v-model="detailBiaya.akomodasi_awal"
              rounded="xl"
              density="compact"
              disabled
            />
          </VCol>
          <VCol>
            <div class="text-h6">
              Diskon (%)
            </div>
            <VTextField
              v-model="detailBiaya.akomodasi_diskon"
              disabled
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
                      detailBiaya.akomodasi_awal,
                    );
                    detailBiaya.akomodasi_akhir
                      = initialCost - initialCost * (+e.target.value / 100);
                    if (detailBiaya.akomodasi_akhir) {
                      detailBiaya.akomodasi_akhir = formatToIDR(
                        detailBiaya.akomodasi_akhir,
                      );
                    }
                  }
                  else {
                    detailBiaya.akomodasi_akhir = detailBiaya.akomodasi_awal;
                  }
                }
              "
            />
          </VCol>
          <VCol>
            <div class="text-h6">
              Akomodasi Akhir
            </div>
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
            <div class="text-h6">
              Tiket Pesawat Awal
            </div>
            <VTextField
              v-model="detailBiaya.tiket_pesawat_awal"
              rounded="xl"
              density="compact"
              disabled
            />
          </VCol>
          <VCol>
            <div class="text-h6">
              Diskon (%)
            </div>
            <VTextField
              v-model="detailBiaya.tiket_pesawat_diskon"
              disabled
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
                      detailBiaya.tiket_pesawat_awal,
                    );
                    detailBiaya.tiket_pesawat_akhir
                      = initialCost - initialCost * (+e.target.value / 100);
                    if (detailBiaya.tiket_pesawat_akhir) {
                      detailBiaya.tiket_pesawat_akhir = formatToIDR(
                        detailBiaya.tiket_pesawat_akhir,
                      );
                    }
                  }
                  else {
                    detailBiaya.tiket_pesawat_akhir
                      = detailBiaya.tiket_pesawat_awal;
                  }
                }
              "
            />
          </VCol>
          <VCol>
            <div class="text-h6">
              Tiket Pesawat Akhir
            </div>
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
            <div class="text-h6">
              Pemeriksaan dan Penerbitan SH
            </div>
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
            <div class="text-h6">
              Penetapan
            </div>
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
            <div class="text-h6">
              Total Biaya Satuan
            </div>
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
            <div class="text-h6">
              Total Biaya
            </div>
            <VTextField
              v-model="detailBiaya.total_biaya"
              rounded="xl"
              density="compact"
              disabled
            />
            <div class="text-sm">
              Total Biaya adalah hasil total biaya satuan di kali dengan kuota
            </div>
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
        >
          Batal
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<style scoped lang="scss">
:deep(.v-data-table.domestic-table > .v-table__wrapper) {
  table {
    thead {
      tr {
        th:nth-of-type(7) {
          position: sticky;
          border-inline-start: 1px solid rgba(#000, 0.12);
          inset-inline-end: 210px;
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
          inset-inline-end: 210px;
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
          inset-inline-end: 50px;
        }

        td:last-of-type {
          position: sticky;
          background: white;
          inline-size: max-content;
          inset-inline-end: 50px;
        }
      }
    }
  }
}
</style>
