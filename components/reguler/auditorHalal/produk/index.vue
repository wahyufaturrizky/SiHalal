<!-- eslint-disable array-callback-return -->
<script setup lang="ts">
import { ref } from "vue";

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
    { title: "Nama Produk", key: "nama_produk", nowrap: true },
    { title: "Nama Pabrik", key: "nama_pabrik", nowrap: true },
    {
      title: "Action",
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
  { title: "Nama Produk", value: "nama_produk" },
  { title: "Nama Pabrik", value: "nama_pabrik" },
  { title: "Action", value: "action" },
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

const getListProduct = async () => {
  try {
    const response: any = await $api("/reguler/pelaku-usaha/tab-produk/list", {
      method: "get",
      query: {
        url: `api/v1/halal-certificate-reguler/lph/post-audit/${id}/produk`,
      },
    });

    response.data.map((item: any) => {
      item.checked = false;
    });

    const countData = Array(response.data.length)
      .fill(0)
      .map((_, index) => index + 1);

    lovProduct.value = response.data;
    lengthData.value = countData;
  } catch (error) {
    console.log(error);
  }
};

const handleAddOrEdit = async () => {
  const listChecked: any[] = [];

  lovProduct.value.map((item: any) => {
    if (item.checked) return listChecked.push(item.id_reg_prod);
  });

  const payload = {
    ...formData.value,
    id_produk: listChecked,
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
    lovProduct.value = lovProduct.value.map((product: any, index: number) => ({
      ...product,
      checked: index >= start.value - 1 && index <= end.value - 1,
    }));
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
                  hide-default-footer
                  class="border rounded"
                >
                  <template #item.no="{ index }">
                    <label>{{ index + 1 }}</label>
                  </template>
                  <template #item.action="{ item }">
                    <VCheckbox v-model="item.checked"></VCheckbox>
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
      title="Pemetaan Produk dan Pabrik"
      with-add-button
      :hide-default-footer="false"
      :isviewonly="props.isviewonly"
    />
  </div>
</template>

<style scoped>
.text-center {
  text-align: center;
}
.bgContent {
  background-color: #f0e9f1;
  border-radius: 10px;
}
.progress-text {
  font-size: 14px !important;
  font-weight: 700 !important;
  line-height: 20px !important;
}
</style>
