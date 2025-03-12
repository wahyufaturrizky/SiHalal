<!-- eslint-disable array-callback-return -->
<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const props = defineProps<{
  isviewonly: Boolean;
}>();

const route = useRoute();
const addDialog = ref(false);
const confirmSaveDialog = ref(false);
const loading = ref(false);
const titleDialog = ref("");
const id = route.params.id;
const lovPabrik = ref<any>([]);
const lovProduct = ref<any>([]);
const start = ref(1);
const end = ref(1);
const lengthData = ref([]);

const formData = ref({
  id_pabrik: "",
  id_produk: [],
});

const comitmentData = ref({
  label: [
    { title: "No.", key: "no", nowrap: true },
    {
      title: "pengajuan-reguler.reguler-form-produk-pabrikname",
      key: "nama_pabrik",
      nowrap: true,
    },
    {
      title: "pengajuan-reguler.reguler-form-produk-prodname",
      key: "nama_produk",
      nowrap: true,
    },
    {
      title: "pengajuan-reguler.reguler-form-produk-aksi",
      value: "action",
      sortable: false,
      nowrap: true,
      popOver: true,
    },
  ],
  value: [],
});

const tableHeader = [
  { title: "No", value: "no" },
  {
    title: "pengajuan-reguler.reguler-form-produk-pabrikname",
    value: "nama_pabrik",
  },
  {
    title: "pengajuan-reguler.reguler-form-produk-prodname",
    value: "nama_produk",
  },
  { title: "pengajuan-reguler.reguler-form-produk-aksi", value: "action" },
];

const items = [
  {
    id: "112233",
    product_name: "xx",
    factory_name: "xx",
  },
];
const selected = ref([]);

const toggleAdd = () => {
  addDialog.value = true;
  titleDialog.value = "Tambah Pemetaan Produk dan Pabrik";
};

const toggleEdit = () => {
  addDialog.value = true;
  titleDialog.value = "Ubah Pemetaan Produk dan Pabrik";
};

const handleSubmit = () => {
  // submit
};

const getListData = async () => {
  try {
    const response: any = await $api("/reguler/pelaku-usaha/tab-produk/list", {
      method: "get",
      query: {
        url: `${LIST_TAB_PRODUK}${id}/list`,
      },
    });

    if (response.code === 2000) {
      comitmentData.value = {
        ...comitmentData.value,
        value: response.data,
      };
    }

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getListPabrikLayout = async () => {
  try {
    const response: any = await $api("/reguler/pelaku-usaha/tab-produk/list", {
      method: "get",
      query: {
        url: `${LIST_TAB_PRODUK}${id}/list-pabrik`,
      },
    });

    if (response.code === 2000) lovPabrik.value = response.data;

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const listProductPage = ref(1);
const listProductSize = ref(10);
const listProductTotal = ref(0);
const listProductChecked = ref([]);
const isSelectedCheckedProduct = (item) =>
  listProductChecked.value.includes(item);
const toggleSelectionProduct = (item) => {
  if (isSelectedCheckedProduct(item)) {
    listProductChecked.value = listProductChecked.value.filter(
      (id) => id !== item.id_reg_prod
    );
  } else {
    listProductChecked.value.push(item.id_reg_prod);
  }
};
const itemsPerPageCommitment = ref(10);
const getListProduct = async (page = 1, size = 99999) => {
  try {
    const response: any = await $api("/reguler/pelaku-usaha/tab-produk/list", {
      method: "get",
      query: {
        url: `api/v1/halal-certificate-reguler/lph/post-audit/${id}/produk`,
        page,
        size,
      },
    });

    response.data.map((item: any) => {
      item.checked = false;
    });
    listProductTotal.value = response.totalItems;
    const countData = Array(response.totalItems)
      .fill(0)
      .map((_, index) => index + 1);

    lovProduct.value = response.data.map((data) => {
      return { ...data, checked: false };
    });
    lengthData.value = countData;
  } catch (error) {
    console.log(error);
  }
};

const handleAddOrEdit = async () => {
  const listChecked: any[] = [];

  // lovProduct.value.map((item: any) => {
  //   if (item.checked) return listChecked.push(item.id_reg_prod);
  // });

  const payload = {
    ...formData.value,
    id_produk: listProductChecked.value,
  };

  try {
    const response: any = await $api(
      "/reguler/pelaku-usaha/tab-produk/create",
      {
        method: "post",
        query: { id },
        body: payload,
      }
    );

    if (response.code === 2000) {
      addDialog.value = false;
      getListData();
      listProductChecked.value = [];
      useSnackbar().sendSnackbar("Sukses menambah data", "success");
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteData = async (idData: string) => {
  try {
    const response: any = await $api(
      "/reguler/pelaku-usaha/tab-produk/remove",
      {
        method: "delete",
        query: { id: idData },
      }
    );

    if (response.code === 2000) {
      addDialog.value = false;
      getListData();
      useSnackbar().sendSnackbar("Sukses menghapus data", "success");
    }
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  loading.value = true;
  await Promise.allSettled([
    getListData(),
    getListPabrikLayout(),
    getListProduct(),
  ]);
  loading.value = false;
});

watch([start, end], () => {
  if (start.value !== null && end.value !== null) {
    listProductChecked.value = lovProduct.value.map(
      (product: any, index: number) => product.id_reg_prod
    );
  }
});
</script>

<template>
  <div v-if="!loading">
    <DialogSaveDataPengajuan
      title="Simpan Perubahan"
      :is-open="confirmSaveDialog"
      :toggle="() => (confirmSaveDialog = false)"
      :on-save="() => handleSubmit()"
    />
    <DialogWithAction
      :title="titleDialog"
      :is-open="addDialog"
      :label-save-btn="labelSaveBtn"
      :toggle="() => (addDialog = false)"
      :on-save="handleAddOrEdit"
    >
      <template #content>
        <div v-if="titleDialog === 'Tambah Pemetaan Produk dan Pabrik'">
          <VCardItem>
            <VRow>
              <VCol cols="12">
                <VItemGroup>
                  <VLabel>Pabrik</VLabel>
                  <VSelect
                    v-model="formData.id_pabrik"
                    placeholder="Pilih Pabrik"
                    :items="lovPabrik"
                    item-title="nama"
                    item-value="id_pabrik"
                  />
                </VItemGroup>
              </VCol>
            </VRow>
            <VRow>
              <VCol cols="6">
                <VItemGroup>
                  <VLabel>Nomor</VLabel>
                  <VSelect
                    v-model="start"
                    placeholder="Pilih Nomor"
                    :items="lengthData"
                  />
                </VItemGroup>
              </VCol>
              <VCol cols="6">
                <VItemGroup>
                  <VLabel>Sampai</VLabel>
                  <VSelect
                    v-model="end"
                    placeholder="Pilih Nomor"
                    :items="lengthData"
                  />
                </VItemGroup>
              </VCol>
            </VRow>
            <VRow>
              <VCol cols="12">
                <VDataTable
                  :headers="tableHeader"
                  :items="lovProduct"
                  class="border rounded"
                  :items-per-page="listProductSize"
                  @update:items-per-page="(items) => (listProductSize = items)"
                  :page="listProductPage"
                  :items-length="listProductTotal"
                  @update:page="(page) => (listProductPage = page)"
                >
                  <template #header.nama_produk="{ column }">
                    <label>{{ t(column.title) }}</label>
                  </template>
                  <template #header.nama_pabrik="{ column }">
                    <label>{{ t(column.title) }}</label>
                  </template>

                  <template #header.action="{ column }">
                    <label>{{ t(column.title) }}</label>
                  </template>

                  <template #item.no="{ index }">
                    <label>{{
                      index + 1 + (listProductPage - 1) * listProductSize
                    }}</label>
                  </template>
                  <template #item.action="{ item }">
                    <VCheckbox
                      :model-value="isSelectedCheckedProduct(item.id_reg_prod)"
                      @click="toggleSelectionProduct(item)"
                    ></VCheckbox>
                  </template>
                </VDataTable>
              </VCol>
            </VRow>
          </VCardItem>
        </div>
      </template>
    </DialogWithAction>
    <TableData
      :on-submit="() => (confirmSaveDialog = true)"
      :on-add="toggleAdd"
      :on-edit="toggleEdit"
      :on-delete="(item: any) => deleteData(item.id_map_pabrik)"
      :data="comitmentData"
      :title="t('pengajuan-reguler.reguler-form-produk-title')"
      with-add-button
      :hide-default-footer="false"
      :isviewonly="props.isviewonly"
      :items-per-page="itemsPerPageCommitment"
    />
  </div>
</template>

<style scoped>
.text-center {
  text-align: center;
}

.bgContent {
  border-radius: 10px;
  background-color: #f0e9f1;
}

.progress-text {
  font-size: 14px !important;
  font-weight: 700 !important;
  line-height: 20px !important;
}
</style>
