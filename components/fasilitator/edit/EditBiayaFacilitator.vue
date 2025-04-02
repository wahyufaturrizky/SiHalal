<script setup lang="ts">
import type { MasterDistrict } from "@/server/interface/master.iface";
import { computed, ref } from "vue";
import { useDisplay } from "vuetify";

const props = defineProps({
  type: {
    type: String,
  },
  islockedlembaga: {
    type: Boolean,
  },
});

const { type, islockedlembaga } = props || {};

// State untuk checkbox
const province = ref();
const district = ref();
const kunciLembaga = ref(false);
const route = useRoute();
const loadingDelete = ref(false);
const loadingLock = ref(false);
const loadingAdd = ref(false);
const loadingItemsInstitutionName = ref(false);
const loadingJenisLayanan = ref(false);
const loadingJenisProduk = ref(false);
const loadingLembagaPemeriksaHalal = ref(false);
const totalItems = ref(0);
const statusFilter = ref("OF1,OF10,OF12,OF15,OF2,OF290,OF5,OF320,OF11");
const detailBiaya = ref<any>({});
const biayaDialog = ref<boolean>(false);

const facilitateId = route.params.id;
const loading = ref(false);
const page = ref<number>(1);
const size = ref<number>(10);

// Data tabel
const detailBiayaitems = ref([]);
const itemsInstitutionName = ref([]);
const itemsJenisLayanan = ref([]);
const itemsJenisProduk = ref([]);
const itemsLembagaPemeriksaHalal = ref([]);
const totalBiayaDetail = ref(0);

// Form data dan dialog
const formRef = ref(null);
const selectedItem = ref(null);
const addDialog = ref(false);
const deleteDialog = ref(false);

// Data untuk form tambah lembaga
const formData = ref({
  ruangLingkup: "",
  provinsiId: "",
  kabupatenId: "",
  jenisLayanan: "",
  jenisProduk: "",
  kuota: "",
  jumlahProduk: "",
  lphId: "",
});

kunciLembaga.value = islockedlembaga;

const loadItemById = async (options?: {
  page: number;
  itemsPerPage: number;
}) => {
  try {
    loading.value = true;

    if (options) {
      page.value = options.page;
      size.value = options.itemsPerPage;
    }

    const response = await $api(
      `/facilitate/biaya-reguler/list/${facilitateId}`,
      {
        method: "get",
        params: {
          page: page.value,
          size: size.value,
          status: statusFilter.value,
        },
      }
    );

    if (response.code === 2000) {
      totalBiayaDetail.value = 0;
      detailBiayaitems.value = response.data?.map((item) => {
        const {
          id,
          lph_nama,
          jenis_layanan,
          jenis_produk,
          jumlah_produk,
          kabupaten,
          provinsi,
          kuota,
          akomodasi_akhir,
          akomodasi_awal,
          akomodasi_diskon,
          created_by,
          created_on,
          fac_id,
          fac_id_detail,
          fac_status,
          jenis_layanan_id,
          jenis_produk_id,
          kabupaten_id,
          lph_id,
          mandays,
          operasional,
          provinsi_id,
          ruang_lingkup,
          tiket_pesawat_akhir,
          tiket_pesawat_awal,
          tiket_pesawat_diskon,
          total_biaya,
          transport_akhir,
          transport_awal,
          transport_diskon,
          uhpd_akhir,
          uhpd_awal,
          uhpd_diskon,
          unit_cost_akhir,
          unit_cost_awal,
          unit_cost_diskon,
          biaya_bpjph,
          biaya_mui,
          total_biaya_satuan,
        } = item;

        totalBiayaDetail.value += total_biaya;

        totalItems.value = response?.total_item;

        loading.value = false;
        return {
          lph_nama,
          jenis_layanan,
          jenis_produk,
          jumlah_produk,
          kabupaten,
          provinsi,
          kuota,
          akomodasi_akhir,
          akomodasi_awal,
          akomodasi_diskon,
          created_by,
          created_on,
          fac_id,
          fac_id_detail,
          fac_status,
          jenis_layanan_id,
          jenis_produk_id,
          kabupaten_id,
          lph_id,
          mandays,
          operasional,
          provinsi_id,
          ruang_lingkup,
          tiket_pesawat_akhir,
          tiket_pesawat_awal,
          tiket_pesawat_diskon,
          total_biaya,
          transport_akhir,
          transport_awal,
          transport_diskon,
          uhpd_akhir,
          uhpd_awal,
          uhpd_diskon,
          unit_cost_akhir,
          unit_cost_awal,
          unit_cost_diskon,
          biaya_bpjph,
          biaya_mui,
          total_biaya_satuan,
        };
      });
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
      loading.value = false;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loading.value = false;
  }
};

const getProvince = async () => {
  const response = await $api("/master/province", {
    method: "get",
  });
  province.value = response;

  loadLembagaPemeriksaHalal();
};

const getDistrict = async (kode: string) => {
  const response: MasterDistrict[] = await $api("/master/district", {
    method: "post",
    body: {
      province: kode,
    },
  });
  district.value = response;

  loadLembagaPemeriksaHalal();
};

const loadItemLembagaPendamping = async () => {
  try {
    loadingItemsInstitutionName.value = true;

    const response = await $api(
      `/master/${
        type === "Reguler" ? "lembaga-pemeriksa-halal" : "lembaga-pendamping"
      }`,
      {
        method: "get",
      }
    );

    if (response) {
      itemsInstitutionName.value = response;

      loadingItemsInstitutionName.value = false;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
      loadingItemsInstitutionName.value = false;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingItemsInstitutionName.value = false;
  }
};

const loadJenisLayanan = async () => {
  try {
    loadingJenisLayanan.value = true;

    const response = await $api(`/facilitate/jenis-layanan/list`, {
      method: "get",
    });

    if (response) {
      itemsJenisLayanan.value = response;

      loadingJenisLayanan.value = false;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");

      loadingJenisLayanan.value = false;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");

    loadingJenisLayanan.value = false;
  }
};

const loadJenisProduk = async (parent: string) => {
  try {
    loadingJenisProduk.value = true;

    const response = await $api(`/facilitate/jenis-produk/list`, {
      method: "get",
      params: {
        parent: parent,
      },
    });

    if (response) {
      itemsJenisProduk.value = response;

      loadingJenisProduk.value = false;

      loadLembagaPemeriksaHalal();
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");

      loadingJenisProduk.value = false;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");

    loadingJenisProduk.value = false;
  }
};

const loadLembagaPemeriksaHalal = async () => {
  try {
    const { jenisLayanan, ruangLingkup, provinsiId, kabupatenId } =
      formData.value;

    if (jenisLayanan && ruangLingkup && provinsiId && kabupatenId) {
      loadingLembagaPemeriksaHalal.value = true;

      const response = await $api(`/facilitate/lph/list`, {
        method: "get",
        params: {
          jenis_layanan: jenisLayanan,
          area_pemasaran: ruangLingkup,
          prov: provinsiId,
          kab: kabupatenId,
        },
      });

      if (response) {
        itemsLembagaPemeriksaHalal.value = response;

        loadingLembagaPemeriksaHalal.value = false;
      } else {
        useSnackbar().sendSnackbar("Ada Kesalahan", "error");

        loadingLembagaPemeriksaHalal.value = false;
      }
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");

    loadingLembagaPemeriksaHalal.value = false;
  }
};

const deleteFacilitateBiaya = async (id: string) => {
  try {
    loadingDelete.value = true;

    const res = await $api(`/facilitate/biaya-reguler/delete/${id}`, {
      method: "delete",
    });

    if (res?.code === 2000) {
      loadingDelete.value = false;
      addDialog.value = false;
      page.value = 1;
      await loadItemById();
    } else {
      useSnackbar().sendSnackbar("Gagal update data", "error");
      loadingDelete.value = false;
      addDialog.value = false;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingDelete.value = false;
  }
};

const openModalBiayaDetail = (item: any) => {
  const dataItem = item;

  // dataItem.unit_cost_awal = formatToIDR(item.unit_cost_awal);
  // dataItem.unit_cost_akhir = formatToIDR(item.unit_cost_akhir);
  // dataItem.uhpd_awal = formatToIDR(item.uhpd_awal);
  // dataItem.uhpd_akhir = formatToIDR(item.uhpd_akhir);
  // dataItem.operasional = formatToIDR(item.operasional);
  // dataItem.transport_awal = formatToIDR(item.transport_awal);
  // dataItem.transport_akhir = formatToIDR(item.transport_akhir);
  // dataItem.akomodasi_awal = formatToIDR(item.akomodasi_awal);
  // dataItem.akomodasi_akhir = formatToIDR(item.akomodasi_akhir);
  // dataItem.tiket_pesawat_awal = formatToIDR(item.tiket_pesawat_awal);
  // dataItem.tiket_pesawat_akhir = formatToIDR(item.tiket_pesawat_akhir);
  // dataItem.subtotal = formatToIDR(item.subtotal);

  detailBiaya.value = dataItem;
  biayaDialog.value = true;
};

// Reset form
const resetForm = () => {
  formData.value = {
    ruangLingkup: "",
    provinsiId: "",
    kabupatenId: "",
    jenisLayanan: "",
    jenisProduk: "",
    kuota: "",
    jumlahProduk: "",
    lphId: "",
  };
};

const addFacilitateLembaga = async () => {
  try {
    loadingAdd.value = true;

    if (formData.value.jenisProduk !== "A0016") {
      formData.value.jumlahProduk = 50;
    }

    formData.value.kuota = parseInt(formData.value.kuota);

    const res = await $api("/facilitate/biaya-reguler/add", {
      method: "post",
      body: {
        fac_id: facilitateId,
        ruang_lingkup: formData.value.ruangLingkup,
        provinsi_id: formData.value.provinsiId,
        kabupaten_id: formData.value.kabupatenId,
        jenis_layanan: formData.value.jenisLayanan,
        jenis_produk: formData.value.jenisProduk,
        kuota: formData.value.kuota,
        jumlah_produk: formData.value.jumlahProduk,
        lph_id: formData.value.lphId,
        // "fac_status": "Active",
        // "is_taken": true,
        // "created_by": "Admin"
      },
    });

    if (res?.code === 2000) {
      loadingAdd.value = false;
      resetForm();
      addDialog.value = false;
      useSnackbar().sendSnackbar("Berhasil menambahkan data", "success");
      page.value = 1;
      await loadItemById();
    } else {
      useSnackbar().sendSnackbar("Gagal update data", "error");
      loadingAdd.value = false;
      resetForm();
      addDialog.value = false;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingAdd.value = false;
    resetForm();
    addDialog.value = false;
  }
};

const updateLockFacilitateLembaga = async () => {
  try {
    loadingLock.value = true;

    const res = await $api("/facilitate/lembaga/lock", {
      method: "put",
      body: {
        fac_id: facilitateId,
        is_locked_lembaga: kunciLembaga.value,
      },
    });

    if (res?.code === 2000) {
      loadingLock.value = false;
    } else {
      useSnackbar().sendSnackbar("Gagal update data", "error");
      loadingLock.value = false;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingLock.value = false;
  }
};

onMounted(async () => {
  await loadItemLembagaPendamping();
  await getProvince();
  await loadJenisLayanan();
});

const domesticAuditHeader: any[] = [
  { title: "No", key: "no" },
  { title: "Lembaga Pemeriksa Halal (LPH)", key: "lph_nama", nowrap: true },
  { title: "Man Days", key: "mandays", nowrap: true },
  { title: "Unit Cost Awal", key: "unit_cost_awal", nowrap: true },
  { title: "Diskon (%)", key: "unit_cost_diskon", nowrap: true },
  { title: "Unit Cost Akhir", key: "unit_cost_akhir", nowrap: true },
  { title: "UHPD Awal", key: "uhpd_awal", nowrap: true },
  { title: "Diskon (%)", key: "uhpd_diskon", nowrap: true },
  { title: "UHPD Akhir", key: "uhpd_akhir", nowrap: true },
  { title: "Operasional", key: "operasional", nowrap: true },
  { title: "Akomodasi Awal", key: "akomodasi_awal", nowrap: true },
  { title: "Diskon (%)", key: "akomodasi_diskon", nowrap: true },
  { title: "Akomodasi Akhir", key: "akomodasi_akhir", nowrap: true },
  { title: "Transportasi Awal", key: "transport_awal", nowrap: true },
  { title: "Diskon (%)", key: "transport_diskon", nowrap: true },
  { title: "Transportasi Akhir", key: "transport_akhir", nowrap: true },
  { title: "Tiket Pesawat Awal", key: "tiket_pesawat_awal", nowrap: true },
  { title: "Diskon (%)", key: "tiket_pesawat_diskon", nowrap: true },
  { title: "Tiket Pesawat Akhir", key: "tiket_pesawat_akhir", nowrap: true },
  { title: "Pemeriksaan dan Penerbitan SH", key: "biaya_bpjph", nowrap: true },
  { title: "Penetapan", key: "biaya_mui", nowrap: true },
  { title: "Sub Tot", key: "total_biaya_satuan", nowrap: true },
  { title: "Kuota", key: "kuota", nowrap: true },
  { title: "Total", key: "total_biaya", nowrap: true },
  { title: "Action", key: "actions", align: "center", nowrap: true },
];

// Fungsi tambah data
const tambahData = () => {
  addFacilitateLembaga();
};

const confirmDelete = (item: any) => {
  selectedItem.value = item;
  deleteDialog.value = true;
};

const hapusData = () => {
  const index = selectedItem.value;

  deleteFacilitateBiaya(index.fac_id_detail);

  deleteDialog.value = false;
};

const { mdAndUp } = useDisplay();
const dialogMaxWidth = computed(() => (mdAndUp ? 700 : "90%"));

const checkIsFieldEmpty = (data: any) => {
  return Object.keys(data)?.find((key) => key !== "jumlahProduk" && !data[key]);
};
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VExpansionPanels v-model="openPanelFacilitate">
        <VExpansionPanel>
          <VCard class="pa-4">
            <VCardText class="d-flex justify-space-between align-center">
              <p class="text-h4">List Detail Biaya</p>
              <VBtn
                color="primary"
                class="mb-4"
                append-icon="ri-add-line"
                @click="addDialog = true"
              >
                Tambah
              </VBtn>
            </VCardText>

            <VCardText>
              <VDataTableServer
                :items-per-page-options="[10, 25, 50, 100]"
                class="domestic-table border rounded mt-5"
                :headers="domesticAuditHeader"
                :items="detailBiayaitems || []"
                :items-length="totalItems"
                :items-per-page="size"
                :page="page"
                @update:options="loadItemById"
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
                  <tr v-for="(item, idx) in detailBiayaitems" :key="idx">
                    <td>{{ idx + 1 }}</td>
                    <td>{{ item.lph_nama }}</td>
                    <td>{{ item.mandays }}</td>
                    <td>{{ formatToIDR(item.unit_cost_awal) || 0 }}</td>
                    <td>{{ item.unit_cost_diskon || 0 }}</td>
                    <td>{{ formatToIDR(item.unit_cost_akhir) || 0 }}</td>
                    <td>{{ formatToIDR(item.uhpd_awal) || 0 }}</td>
                    <td>{{ item.uhpd_diskon || 0 }}</td>
                    <td>{{ formatToIDR(item.uhpd_akhir) || 0 }}</td>
                    <td>{{ formatToIDR(item.operasional) || 0 }}</td>
                    <td>{{ formatToIDR(item.akomodasi_awal) || 0 }}</td>
                    <td>{{ item.akomodasi_diskon || 0 }}</td>
                    <td>{{ formatToIDR(item.akomodasi_akhir) || 0 }}</td>
                    <td>{{ formatToIDR(item.transport_awal) || 0 }}</td>
                    <td>{{ item.transport_diskon || 0 }}</td>
                    <td>{{ formatToIDR(item.transport_akhir) || 0 }}</td>
                    <td>{{ formatToIDR(item.tiket_pesawat_awal) || 0 }}</td>
                    <td>{{ item.tiket_pesawat_diskon || 0 }}</td>
                    <td>{{ formatToIDR(item.tiket_pesawat_akhir) || 0 }}</td>
                    <td>{{ formatToIDR(item.biaya_bpjph) || 0 }}</td>
                    <td>{{ formatToIDR(item.biaya_mui) || 0 }}</td>
                    <td>{{ formatToIDR(item.total_biaya_satuan) || 0 }}</td>
                    <td>{{ item.kuota }}</td>
                    <td>{{ formatToIDR(item.total_biaya) || 0 }}</td>
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

                          <VListItem
                            prepend-icon="ri-delete-bin-6-line"
                            title="Hapus"
                            @click="() => confirmDelete(item)"
                          />
                        </VList>
                      </VMenu>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="23"></td>
                    <td v-if="items.length">
                      <div class="d-flex gap-5">
                        <div class="d-flex align-center font-weight-bold">
                          {{ formatToIDR(totalBiayaDetail) || 0 }}
                        </div>
                      </div>
                    </td>
                  </tr>
                </template>
              </VDataTableServer>
            </VCardText>
          </VCard>
        </VExpansionPanel>
      </VExpansionPanels>
    </VCol>

    <VDialog v-model="addDialog" :max-width="dialogMaxWidth">
      <VCard class="pa-4">
        <VCardTitle class="text-h4"> Tambah Biaya </VCardTitle>
        <VCardText>
          <VForm ref="formRef">
            <VRow>
              <VCol :cols="12">
                <VItemGroup>
                  <VLabel text="Lingkup Wilayah Fasilitasi"></VLabel>
                  <VAutocomplete
                    id="ruangLingkup"
                    v-model="formData.ruangLingkup"
                    :rules="[requiredValidator]"
                    :items="['Nasional', 'Provinsi', 'Kota/Kab.']"
                    placeholder="Pilih lingkup wilayah"
                    solo
                    clearable
                  />
                </VItemGroup>
              </VCol>
            </VRow>

            <VRow>
              <VCol :cols="12">
                <VItemGroup>
                  <VLabel text="Provinsi"></VLabel>
                  <VAutocomplete
                    :rules="[requiredValidator]"
                    require
                    v-on:update:model-value="getDistrict"
                    placeholder="Pilih Provinsi"
                    v-model="formData.provinsiId"
                    :items="province"
                    item-value="code"
                    item-title="name"
                  />
                </VItemGroup>
              </VCol>
            </VRow>

            <VRow>
              <VCol :cols="12">
                <VItemGroup>
                  <VLabel text="Kabupaten/Kota"></VLabel>
                  <VAutocomplete
                    :items="district"
                    item-value="code"
                    item-title="name"
                    v-model="formData.kabupatenId"
                    :rules="[requiredValidator]"
                    require
                    placeholder="Pilih Kabupaten/Kota"
                    v-on:update:model-value="loadLembagaPemeriksaHalal"
                  />
                </VItemGroup>
              </VCol>
            </VRow>

            <VRow>
              <VCol :cols="12">
                <VItemGroup>
                  <VLabel text="Jenis Layanan"></VLabel>
                  <VSelect
                    id="jenisLayanan"
                    v-model="formData.jenisLayanan"
                    placeholder="Pilih Jenis Layanan"
                    :items="itemsJenisLayanan"
                    item-title="name"
                    item-value="code"
                    required
                    :disabled="loadingJenisLayanan"
                    :loading="loadingJenisLayanan"
                    :rules="[requiredValidator]"
                    v-on:update:model-value="loadJenisProduk"
                  />
                </VItemGroup>
              </VCol>
            </VRow>

            <VRow>
              <VCol :cols="12">
                <VItemGroup>
                  <VLabel text="Jenis Produk"></VLabel>
                  <VSelect
                    id="jenisProduk"
                    v-model="formData.jenisProduk"
                    placeholder="Pilih Jenis Produk"
                    :items="itemsJenisProduk"
                    item-title="name"
                    item-value="code"
                    required
                    :disabled="loadingJenisProduk"
                    :loading="loadingJenisProduk"
                    :rules="[requiredValidator]"
                  />
                </VItemGroup>
              </VCol>
            </VRow>

            <VRow v-if="formData.jenisLayanan == 'A0016'">
              <VCol cols="12">
                <VLabel text="Jumlah Produk"></VLabel>
                <VTextField
                  id="jumlahProduk"
                  v-model="formData.jumlahProduk"
                  :rules="[requiredValidator]"
                  placeholder="isi jumlah produk"
                  outlined
                  type="number"
                />
              </VCol>
            </VRow>

            <VRow>
              <VCol cols="12">
                <VLabel text="Kuota"></VLabel>
                <VTextField
                  id="kuota"
                  v-model="formData.kuota"
                  :rules="[requiredValidator]"
                  placeholder="isi kuota"
                  outlined
                  type="number"
                />
              </VCol>
            </VRow>

            <VRow>
              <VCol :cols="12">
                <VItemGroup>
                  <VLabel text="Lembaga Pemeriksa Halal"></VLabel>
                  <VSelect
                    id="lembagaPemeriksaHalal"
                    v-model="formData.lphId"
                    placeholder="Pilih Lembaga Pemeriksa Halal (LPH)"
                    :items="itemsLembagaPemeriksaHalal"
                    item-title="name"
                    item-value="id"
                    required
                    :disabled="loadingLembagaPemeriksaHalal"
                    :loading="loadingLembagaPemeriksaHalal"
                    :rules="[requiredValidator]"
                  />
                </VItemGroup>
              </VCol>
            </VRow>

            <!-- <label class="text-h6" for="picName">
              Nama Penanggung Jawab Program LPH
            </label>
            <VTextField
              id="picName"
              v-model="formData.picName"
              placeholder="Isi Nama Penanggung Jawab Program LPH / LP3H "
              required
              class="mb-4"
              :rules="[requiredValidator]"
            />
            <label class="text-h6" for="picName">
              Nomor Kontak Penanggung Jawab Program LPH / LP3H
            </label>
            <VTextField
              v-model="formData.picPhoneNumber"
              placeholder="Isi Nomor Kontak Penanggung Jawab Program LPH / LP3H "
              required
              class="mb-4"
              :rules="[requiredValidator]"
              type="number"
            /> -->
          </VForm>
        </VCardText>
        <VCardActions>
          <VSpacer />
          <VBtn text variant="outlined" @click="addDialog = false">
            Batal
          </VBtn>
          <VBtn
            :disabled="loadingAdd || checkIsFieldEmpty(formData)"
            color="primary"
            text
            variant="flat"
            @click="tambahData"
          >
            {{ loadingAdd ? "Loading..." : "Tambah" }}
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
              <div class="text-h6">Lembaga Pemeriksa Halal (LPH)</div>
              <VTextField
                v-model="detailBiaya.lph_nama"
                rounded="xl"
                density="compact"
                disabled
              />
            </VCol>
          </VRow>
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
            >Batal</VBtn
          >
        </VCardActions>
      </VCard>
    </VDialog>

    <VDialog v-model="deleteDialog" :max-width="dialogMaxWidth">
      <VCard class="pa-4">
        <VCardTitle class="text-h4"> Hapus Biaya </VCardTitle>
        <VCardText>Yakin ingin menghapus data biaya? </VCardText>
        <VCardActions>
          <VSpacer />
          <VBtn
            text
            color="primary"
            variant="outlined"
            @click="deleteDialog = false"
          >
            Batal
          </VBtn>
          <VBtn
            :disabled="loadingDelete"
            color="error"
            variant="flat"
            text
            @click="hapusData"
          >
            {{ loadingDelete ? "Loading..." : "Ya, Hapus" }}
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </VRow>
</template>

<style scoped lang="scss">
:deep(.v-data-table.domestic-table > .v-table__wrapper) {
  table {
    thead {
      tr {
        th:nth-of-type(24) {
          position: sticky;
          border-inline-start: 1px solid rgba(#000, 0.12);
          inset-inline-end: 110px;
        }

        th:last-of-type {
          position: sticky;
          inset-inline-end: 0;
        }
      }
    }

    tbody {
      tr:not(:last-of-type) {
        td:nth-of-type(24) {
          position: sticky;
          background: white;
          border-inline-start: 1px solid rgba(#000, 0.12);
          inline-size: 150px;
          inset-inline-end: 110px;
        }

        td:last-of-type {
          position: sticky;
          background: white;
          inset-inline-end: 0;
        }
      }

      tr:last-of-type {
        td:nth-of-type(2) {
          position: sticky;
          background: white;
          inline-size: max-content;
          inset-inline-end: 250px;
        }

        td:last-of-type {
          position: sticky;
          background: white;
          inline-size: max-content;
          inset-inline-end: 110px;
        }
      }
    }
  }
}
</style>
