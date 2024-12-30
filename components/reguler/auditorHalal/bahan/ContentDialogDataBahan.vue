<script setup lang="ts">
import { VForm } from 'vuetify/components';

const props = defineProps({
  dialogType: {
    type: String,
    required: false,
  },
  data: {
    type: Object,
    required: false,
  },
  toggle: {
    type: Function,
    default: () => {},
    required: false,
  },
})

const route = useRoute();
interface BahanDataCertified {
  id: string;
  merek: string;
  nama_bahan: string;
  no_sertifikat: string;
  produsen: string;
  tgl_berlaku_sertifikat: string;
}

interface BahanDataUncertified {
  id: string;
  kelompok: string;
  nama_bahan: string;
}
const modalAddBahan = ref(false);
const jenisBahan = ['Bahan', 'Cleaning Agent', 'Kemasan'];
const typeBahan = [
  {
    id: 0,
    name: 'Bahan Bersertifikat',
  },
  {
    id: 1,
    name: 'Bahan Tidak Bersertifikat',
  },
];

const form = ref({
  typeBahan: props?.data?.no_sertifikat ? 0 : 1,
  jenis_bahan: props?.data?.jenis_bahan || null,
  nama_bahan: props?.data?.nama_bahan || '',
  kelompok: props?.data?.kelompok || '',
  merek: props?.data?.merek || '',
  produsen: props?.data?.produsen || '',
  no_sertifikat: props?.data?.no_sertifikat || '',
});

const isBahanSertifikat = () => {
  return form.value.typeBahan == 1;
};

const tableHeaderCertified = [
  { title: 'No', value: 'index' },
  { title: 'Nama Bahan', value: 'nama_bahan' },
  { title: 'Produsen', value: 'produsen' },
  { title: 'No. Sertifikat', value: 'no_sertifikat' },
  { title: 'Action', value: 'action' },
];
const tableHeaderUncertified = [
  { title: 'No', value: 'index' },
  { title: 'Nama Bahan', value: 'nama_bahan' },
  { title: 'Kelompok', value: 'kelompok' },
  { title: 'Action', value: 'action' },
];

// Uncertified Dialog
const itemsUncertified = ref<BahanDataUncertified[]>([]);
const itemPerPageUncertified = ref(5);
const totalItemsUncertified = ref(0);
const loadingUncertified = ref(true);
const pageUncertified = ref(1);

const itemsCertified = ref<BahanDataCertified[]>([]);
const itemPerPageCertified = ref(5);
const totalItemsCertified = ref(0);
const loadingCertified = ref(true);
const pageCertified = ref(1);

const loadItemBahan = async (page: number, size: number, name: string = '') => {
  try {
    if (form.value.typeBahan == 0) {
      loadingCertified.value = true;
    } else {
      loadingUncertified.value = true;
    }

    const response = await $api(
      `/self-declare/submission/bahan/${
        form.value.typeBahan == 0 ? 'certified' : 'uncertified'
      }`,
      {
        method: 'get',
        params: {
          page,
          size,
          name,
        },
      }
    );
    if (form.value.typeBahan == 0) {
      itemsCertified.value = response.data != null ? response.data : [];
      totalItemsCertified.value = response.total_item;
      return;
    }

    itemsUncertified.value = response.data != null ? response.data : [];
    totalItemsUncertified.value = response.total_item;
  } catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error');
  } finally {
    loadingUncertified.value = false;
    loadingCertified.value = false;
  }
};
const searchQueryUncertified = ref('');
const searchQueryCertified = ref('');

const debouncedFetchCertified = debounce(loadItemBahan, 500);
const debouncedFetchUncertified = debounce(loadItemBahan, 500);

const handleInputUncertified = () => {
  pageUncertified.value = 1;
  debouncedFetchUncertified(
    pageUncertified.value,
    itemPerPageUncertified.value,
    searchQueryUncertified.value
  );
};
const handleInputCertified = () => {
  pageUncertified.value = 1;
  debouncedFetchUncertified(
    pageUncertified.value,
    itemPerPageUncertified.value,
    searchQueryUncertified.value
  );
};

const searchBahanDialogUncertified = ref(false);
const searchBahanDialogCertified = ref(false);

const setDataFormUncertified = (item: BahanDataUncertified) => {
  form.value.nama_bahan = item.nama_bahan;
  form.value.kelompok = item.kelompok;
  searchBahanDialogUncertified.value = false;
};
const setDataFormCertified = (item: BahanDataCertified) => {
  form.value.nama_bahan = item.nama_bahan;
  form.value.produsen = item.produsen;
  form.value.merek = item.merek;
  form.value.no_sertifikat = item.no_sertifikat;
  searchBahanDialogCertified.value = false;
};
const refVForm = ref<VForm>();
const submitAddBahanButton = ref(false);
const onSubmitBahanUncertified = async () => {
  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) insertBahan();
  });
};

const onSubmitBahanCertified = async () => {
  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) insertBahan();
  });
};

const emits = defineEmits(['loadList', 'formChange']);

const insertBahan = async () => {
  submitAddBahanButton.value = true;

  try {
    const response = await $api(
      '/reguler/pelaku-usaha/tab-bahan/ingredients/edit-ingredients',
      {
        method: 'put',
        query: { id_reg: route.params.id, product_id: props.data?.id },
        body: {
          jenis_bahan: `${
            form.value.typeBahan === 0 ? 'certified' : 'uncertified'
          }|${form.value.jenis_bahan}`,
          nama_bahan: form.value.nama_bahan,
          kelompok: form.value.kelompok,
          merek: form.value.merek,
          produsen: form.value.produsen,
          no_sertifikat: form.value.no_sertifikat,
        },
      }
    );
    if (response.code != 2000) {
      useSnackbar().sendSnackbar('Gagal menambahkan bahan', 'error');
      return;
    }
    props.toggle()
    emits('loadList', true);
    useSnackbar().sendSnackbar('Berhasil menambahkan bahan', 'success');
  } catch (error) {
    console.log(error);
    
    useSnackbar().sendSnackbar('Gagal menambahkan bahan', 'error');
  } finally {
    form.value = {
      typeBahan: null,
      jenis_bahan: null,
      nama_bahan: '',
      kelompok: '',
      merek: '',
      produsen: '',
      no_sertifikat: '',
    };
    submitAddBahanButton.value = false;
    modalAddBahan.value = false;
  }
};

watch(props?.dialogType, () => {
  if (props?.dialogType === 'edit')
    modalAddBahan.value = true
})

watch(form.value, () => {
  emits('formChange', form.value)
})
</script>

<template>
  <div v-if="props?.dialogType === 'add'">
    <VDialog
      v-model="modalAddBahan"
      max-width="60svw"
    >
      <template #activator="{ props: openModal }">
        <VBtn
          variant="outlined"
          prepend-icon="fa-plus"
          style="margin: 1svw"
          v-bind="openModal"
        >Tambah</VBtn
        >
      </template>
      <template #default="{ isActive }">
        <VCard>
          <VCardTitle>
            <VRow>
              <VCol cols="10"><h3>Tambah Data Bahan</h3></VCol>
              <VCol cols="2" style="display: flex; justify-content: end"
              ><VIcon
                size="small"
                icon="fa-times"
                @click="isActive.value = false"
              ></VIcon
              ></VCol>
            </VRow>
          </VCardTitle>
          <VForm
            ref="refVForm"
            @submit.prevent="
              form.typeBahan == 1
                ? onSubmitBahanUncertified()
                : onSubmitBahanCertified()
            "
          >
            <VCardItem>
              <VRow>
                <VCol cols="12">
                  <VItemGroup>
                    <VLabel>Tipe Bahan</VLabel>
                    <VSelect
                      v-model="form.typeBahan"
                      :items="typeBahan"
                      item-value="id"
                      item-title="name"
                      :rules="[requiredValidator]"
                      density="compact"
                      placeholder="Pilih Tipe Bahan"
                    ></VSelect>
                  </VItemGroup>
                </VCol>
              </VRow>
              <VRow v-if="form.typeBahan != null">
                <VCol cols="12">
                  <VItemGroup>
                    <VLabel
                    >Bahan{{
                      isBahanSertifikat() ? " Tidak " : " "
                    }}Bersertifikat</VLabel
                    >
                    <VTextField
                      v-if="isBahanSertifikat()"
                      @click="searchBahanDialogUncertified = true"
                      readonly
                      :rules="[requiredValidator]"
                      v-model="form.nama_bahan"
                      placeholder="Cari Bahan Tidak Bersertifikat"
                      density="compact"
                    >
                      <template #append-inner>
                        <VIcon
                          @click="searchBahanDialogUncertified = true"
                          icon="mdi-magnify"
                        ></VIcon>
                      </template>
                    </VTextField>
                    <VTextField
                      v-else
                      :rules="[requiredValidator]"
                      @click="searchBahanDialogCertified = true"
                      readonly
                      v-model="form.nama_bahan"
                      placeholder="Cari Nama Produk / Merek / Nama Produsen / No. Sertifikat"
                      density="compact"
                    >
                      <template #append-inner>
                        <VIcon
                          @click="searchBahanDialogCertified = true"
                          icon="mdi-magnify"
                        ></VIcon>
                      </template>
                    </VTextField>
                  </VItemGroup>
                </VCol>
              </VRow>
              <br />
              <VDivider></VDivider>
              <br />
              <VRow>
                <VCol cols="12">
                  <VItemGroup>
                    <VLabel>Jenis Bahan</VLabel>
                    <VSelect
                      v-model="form.jenis_bahan"
                      :items="jenisBahan"
                      :rules="[requiredValidator]"
                      placeholder="Pilih Jenis Bahan"
                      density="compact"
                    ></VSelect>
                  </VItemGroup>
                </VCol>
              </VRow>
              <VRow>
                <VCol cols="12">
                  <VItemGroup>
                    <VLabel>Nama Bahan</VLabel>
                    <VTextField
                      v-model="form.nama_bahan"
                      disabled
                      placeholder="Nama Bahan otomatis terisi setelah memilih bahan"
                      density="compact"
                    ></VTextField>
                  </VItemGroup>
                </VCol>
              </VRow>
              <VRow>
                <!-- kelompok appears when tipe bahan = tidak bersertifikat -->
                <VCol cols="12" v-if="form.typeBahan == 1">
                  <VItemGroup>
                    <VLabel>Kelompok</VLabel>
                    <VTextField
                      v-model="form.kelompok"
                      disabled
                      placeholder="Kelompok otomatis terisi setelah memilih bahan"
                      density="compact"
                    ></VTextField>
                  </VItemGroup>
                </VCol>
              </VRow>
              <VRow v-if="form.typeBahan == 0">
                <!-- produsen appears when tipe bahan = bersertifikat -->
                <VCol cols="12">
                  <VItemGroup>
                    <VLabel>Produsen</VLabel>
                    <VTextField
                      disabled
                      v-model="form.produsen"
                      placeholder="Produsen otomatis terisi setelah memilih bahan"
                      density="compact"
                    ></VTextField>
                  </VItemGroup>
                </VCol>
              </VRow>
              <VRow v-if="form.typeBahan == 0">
                <!-- produsen appears when tipe bahan = bersertifikat -->
                <VCol cols="12">
                  <VItemGroup>
                    <VLabel>Nomor Sertifikat Halal</VLabel>
                    <VTextField
                      disabled
                      v-model="form.no_sertifikat"
                      placeholder="Nomor Sertifikat Halal otomatis terisi setelah memilih bahan"
                      density="compact"
                    ></VTextField>
                  </VItemGroup>
                </VCol>
              </VRow> </VCardItem
            ><VCardActions
              style="display: flex; justify-content: end; padding: 1.5svw"
            >
              <div>
                <VBtn @click="isActive.value = false" variant="outlined"
                >Batal</VBtn
                >
                <VBtn
                  type="submit"
                  :disabled="submitAddBahanButton"
                  variant="flat"
                >Tambah</VBtn
                >
              </div>
            </VCardActions>
          </VForm>
        </VCard>
      </template>
    </VDialog>
  </div>
  <div v-else-if="dialogType === 'edit'">
    <div>
      <VForm
        ref="refVForm"
        @submit.prevent="
          form.typeBahan == 1
            ? onSubmitBahanUncertified()
            : onSubmitBahanCertified()
        "
      >
        <VCardItem>
          <VRow>
            <VCol cols="12">
              <VItemGroup>
                <VLabel>Tipe Bahan</VLabel>
                <VSelect
                  v-model="form.typeBahan"
                  :items="typeBahan"
                  item-value="id"
                  item-title="name"
                  :rules="[requiredValidator]"
                  density="compact"
                  placeholder="Pilih Tipe Bahan"
                ></VSelect>
              </VItemGroup>
            </VCol>
          </VRow>
          <VRow v-if="form.typeBahan != null">
            <VCol cols="12">
              <VItemGroup>
                <VLabel
                >Bahan{{
                  isBahanSertifikat() ? " Tidak " : " "
                }}Bersertifikat</VLabel
                >
                <VTextField
                  v-if="isBahanSertifikat()"
                  @click="searchBahanDialogUncertified = true"
                  readonly
                  :rules="[requiredValidator]"
                  v-model="form.nama_bahan"
                  placeholder="Cari Bahan Tidak Bersertifikat"
                  density="compact"
                >
                  <template #append-inner>
                    <VIcon
                      @click="searchBahanDialogUncertified = true"
                      icon="mdi-magnify"
                    ></VIcon>
                  </template>
                </VTextField>
                <VTextField
                  v-else
                  :rules="[requiredValidator]"
                  @click="searchBahanDialogCertified = true"
                  readonly
                  v-model="form.nama_bahan"
                  placeholder="Cari Nama Produk / Merek / Nama Produsen / No. Sertifikat"
                  density="compact"
                >
                  <template #append-inner>
                    <VIcon
                      @click="searchBahanDialogCertified = true"
                      icon="mdi-magnify"
                    ></VIcon>
                  </template>
                </VTextField>
              </VItemGroup>
            </VCol>
          </VRow>
          <br />
          <VDivider></VDivider>
          <br />
          <VRow>
            <VCol cols="12">
              <VItemGroup>
                <VLabel>Jenis Bahan</VLabel>
                <VSelect
                  v-model="form.jenis_bahan"
                  :items="jenisBahan"
                  :rules="[requiredValidator]"
                  placeholder="Pilih Jenis Bahan"
                  density="compact"
                ></VSelect>
              </VItemGroup>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12">
              <VItemGroup>
                <VLabel>Nama Bahan</VLabel>
                <VTextField
                  v-model="form.nama_bahan"
                  disabled
                  placeholder="Nama Bahan otomatis terisi setelah memilih bahan"
                  density="compact"
                ></VTextField>
              </VItemGroup>
            </VCol>
          </VRow>
          <VRow>
            <!-- kelompok appears when tipe bahan = tidak bersertifikat -->
            <VCol cols="12" v-if="form.typeBahan == 1">
              <VItemGroup>
                <VLabel>Kelompok</VLabel>
                <VTextField
                  v-model="form.kelompok"
                  disabled
                  placeholder="Kelompok otomatis terisi setelah memilih bahan"
                  density="compact"
                ></VTextField>
              </VItemGroup>
            </VCol>
          </VRow>
          <VRow v-if="form.typeBahan == 0">
            <!-- produsen appears when tipe bahan = bersertifikat -->
            <VCol cols="12">
              <VItemGroup>
                <VLabel>Produsen</VLabel>
                <VTextField
                  disabled
                  v-model="form.produsen"
                  placeholder="Produsen otomatis terisi setelah memilih bahan"
                  density="compact"
                ></VTextField>
              </VItemGroup>
            </VCol>
          </VRow>
          <VRow v-if="form.typeBahan == 0">
            <!-- produsen appears when tipe bahan = bersertifikat -->
            <VCol cols="12">
              <VItemGroup>
                <VLabel>Nomor Sertifikat Halal</VLabel>
                <VTextField
                  disabled
                  v-model="form.no_sertifikat"
                  placeholder="Nomor Sertifikat Halal otomatis terisi setelah memilih bahan"
                  density="compact"
                ></VTextField>
              </VItemGroup>
            </VCol>
          </VRow>
        </VCardItem>
        <VCardActions
            style="display: flex; justify-content: end; padding: 1.5svw"
          >
            <div>
              <VBtn @click="props.toggle" variant="outlined"
                >Batal</VBtn
              >
              <VBtn
                variant="flat"
                @click="insertBahan"
                >Ubah</VBtn
              >
            </div>
          </VCardActions>
      </VForm>
    </div>
  </div>
  <div v-else-if="dialogType === 'detail'">
    <div>
      <VForm
        ref="refVForm"
        @submit.prevent="
          form.typeBahan == 1
            ? onSubmitBahanUncertified()
            : onSubmitBahanCertified()
        "
      >
        <VCardItem>
          <VRow>
            <VCol cols="12">
              <VItemGroup>
                <VLabel>Tipe Bahan</VLabel>
                <VSelect
                  v-model="form.typeBahan"
                  :items="typeBahan"
                  item-value="id"
                  item-title="name"
                  :rules="[requiredValidator]"
                  density="compact"
                  placeholder="Pilih Tipe Bahan"
                  disabled
                ></VSelect>
              </VItemGroup>
            </VCol>
          </VRow>
          <VRow v-if="form.typeBahan != null">
            <VCol cols="12">
              <VItemGroup>
                <VLabel
                >Bahan{{
                  isBahanSertifikat() ? " Tidak " : " "
                }}Bersertifikat</VLabel
                >
                <VTextField
                  v-if="isBahanSertifikat()"
                  @click="searchBahanDialogUncertified = true"
                  readonly
                  :rules="[requiredValidator]"
                  v-model="form.nama_bahan"
                  placeholder="Cari Bahan Tidak Bersertifikat"
                  density="compact"
                  disabled
                >
                  <template #append-inner>
                    <VIcon
                      @click="searchBahanDialogUncertified = true"
                      icon="mdi-magnify"
                    ></VIcon>
                  </template>
                </VTextField>
                <VTextField
                  v-else
                  :rules="[requiredValidator]"
                  @click="searchBahanDialogCertified = true"
                  readonly
                  v-model="form.nama_bahan"
                  placeholder="Cari Nama Produk / Merek / Nama Produsen / No. Sertifikat"
                  density="compact"
                  disabled
                >
                  <template #append-inner>
                    <VIcon
                      @click="searchBahanDialogCertified = true"
                      icon="mdi-magnify"
                    ></VIcon>
                  </template>
                </VTextField>
              </VItemGroup>
            </VCol>
          </VRow>
          <br />
          <VDivider></VDivider>
          <br />
          <VRow>
            <VCol cols="12">
              <VItemGroup>
                <VLabel>Jenis Bahan</VLabel>
                <VSelect
                  v-model="form.jenis_bahan"
                  :items="jenisBahan"
                  :rules="[requiredValidator]"
                  placeholder="Pilih Jenis Bahan"
                  density="compact"
                  disabled
                ></VSelect>
              </VItemGroup>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12">
              <VItemGroup>
                <VLabel>Nama Bahan</VLabel>
                <VTextField
                  v-model="form.nama_bahan"
                  disabled
                  placeholder="Nama Bahan otomatis terisi setelah memilih bahan"
                  density="compact"
                ></VTextField>
              </VItemGroup>
            </VCol>
          </VRow>
          <VRow>
            <!-- kelompok appears when tipe bahan = tidak bersertifikat -->
            <VCol cols="12" v-if="form.typeBahan == 1">
              <VItemGroup>
                <VLabel>Kelompok</VLabel>
                <VTextField
                  v-model="form.kelompok"
                  disabled
                  placeholder="Kelompok otomatis terisi setelah memilih bahan"
                  density="compact"
                ></VTextField>
              </VItemGroup>
            </VCol>
          </VRow>
          <VRow v-if="form.typeBahan == 0">
            <!-- produsen appears when tipe bahan = bersertifikat -->
            <VCol cols="12">
              <VItemGroup>
                <VLabel>Produsen</VLabel>
                <VTextField
                  disabled
                  v-model="form.produsen"
                  placeholder="Produsen otomatis terisi setelah memilih bahan"
                  density="compact"
                ></VTextField>
              </VItemGroup>
            </VCol>
          </VRow>
          <VRow v-if="form.typeBahan == 0">
            <!-- produsen appears when tipe bahan = bersertifikat -->
            <VCol cols="12">
              <VItemGroup>
                <VLabel>Nomor Sertifikat Halal</VLabel>
                <VTextField
                  disabled
                  v-model="form.no_sertifikat"
                  placeholder="Nomor Sertifikat Halal otomatis terisi setelah memilih bahan"
                  density="compact"
                ></VTextField>
              </VItemGroup>
            </VCol>
          </VRow>
        </VCardItem>
      </VForm>
    </div>
  </div>

  <VDialog v-model="searchBahanDialogCertified" max-width="60svw">
    <VCard>
      <VCardTitle>Cari Bahan</VCardTitle>
      <VCardText>
        <VRow>
          <VCol cols="12" md="4">
            <VTextField
              v-model="searchQueryUncertified"
              label="Search"
              placeholder="Search ..."
              append-inner-icon="ri-search-line"
              single-line
              hide-details
              dense
              outlined
              @input="handleInputUncertified"
            />
          </VCol>
        </VRow>
      </VCardText>
      <VCardItem>
        <VDataTableServer
          v-model:items-per-page="itemPerPageUncertified"
          v-model:page="pageUncertified"
          :items-length="totalItemsUncertified"
          :loading="loadingUncertified"
          loading-text="Loading..."
          :items="itemsUncertified"
          @update:options="
            loadItemBahan(
              pageUncertified,
              itemPerPageUncertified,
              searchQueryUncertified
            )
          "
          :headers="tableHeaderUncertified"
        >
          <template #item.index="{ index }">
            {{ index + 1 + (pageUncertified - 1) * itemPerPageUncertified }}
          </template>
          <template #item.action="{ item }">
            <div class="d-flex gap-1">
              <IconBtn size="small" @click="">
                <VIcon
                  @click="setDataFormUncertified(item)"
                  icon="ri-arrow-right-line"
                  color="primary"
                />
              </IconBtn>
            </div>
          </template>
        </VDataTableServer>
      </VCardItem>
    </VCard>
  </VDialog>

  <VDialog v-model="searchBahanDialogUncertified" max-width="60svw">
    <VCard>
      <VCardTitle>Cari Bahan</VCardTitle>
      <VCardText>
        <VRow>
          <VCol cols="12" md="4">
            <VTextField
              v-model="searchQueryUncertified"
              label="Search"
              placeholder="Search ..."
              append-inner-icon="ri-search-line"
              single-line
              hide-details
              dense
              outlined
              @input="handleInputUncertified"
            />
          </VCol>
        </VRow>
      </VCardText>
      <VCardItem>
        <VDataTableServer
          v-model:items-per-page="itemPerPageUncertified"
          v-model:page="pageUncertified"
          :items-length="totalItemsUncertified"
          :loading="loadingUncertified"
          loading-text="Loading..."
          :items="itemsUncertified"
          @update:options="
            loadItemBahan(
              pageUncertified,
              itemPerPageUncertified,
              searchQueryUncertified
            )
          "
          :headers="tableHeaderUncertified"
        >
          <template #item.index="{ index }">
            {{ index + 1 + (pageUncertified - 1) * itemPerPageUncertified }}
          </template>
          <template #item.action="{ item }">
            <div class="d-flex gap-1">
              <IconBtn size="small" @click="">
                <VIcon
                  @click="setDataFormUncertified(item)"
                  icon="ri-arrow-right-line"
                  color="primary"
                />
              </IconBtn>
            </div>
          </template>
        </VDataTableServer>
      </VCardItem>
    </VCard>
  </VDialog>
  <VDialog v-model="searchBahanDialogCertified" max-width="60svw">
    <VCard>
      <VCardTitle>Cari Bahan</VCardTitle>
      <VCardText>
        <VRow>
          <VCol cols="12" md="4">
            <VTextField
              v-model="searchQueryUncertified"
              label="Search"
              placeholder="Search ..."
              append-inner-icon="ri-search-line"
              single-line
              hide-details
              dense
              outlined
              @input="handleInputUncertified"
            />
          </VCol>
        </VRow>
      </VCardText>
      <VCardItem>
        <VDataTableServer
          v-model:items-per-page="itemPerPageCertified"
          v-model:page="pageCertified"
          :items-length="totalItemsCertified"
          :loading="loadingCertified"
          loading-text="Loading..."
          :items="itemsCertified"
          @update:options="
            loadItemBahan(
              pageCertified,
              itemPerPageCertified,
              searchQueryCertified
            )
          "
          :headers="tableHeaderCertified"
        >
          <template #item.index="{ index }">
            {{ index + 1 + (pageCertified - 1) * itemPerPageCertified }}
          </template>
          <template #item.action="{ item }">
            <div class="d-flex gap-1">
              <IconBtn size="small" @click="">
                <VIcon
                  @click="setDataFormCertified(item)"
                  icon="ri-arrow-right-line"
                  color="primary"
                />
              </IconBtn>
            </div>
          </template>
        </VDataTableServer>
      </VCardItem>
    </VCard>
  </VDialog>
</template>
