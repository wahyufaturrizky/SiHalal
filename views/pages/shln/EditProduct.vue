<script setup lang="ts">
import type { Manufacture } from "@/pages/sertifikasi-halal/luar-negeri/submission/[id]/edit.vue";
import { useDisplay } from "vuetify";
const props = defineProps<{
  manufacture: Manufacture[];
}>();
const headers = [
  { title: "No", key: "index" },
  { title: "Manufacture Name", key: "manufactur" },
  { title: "Product Name", key: "name" },
  { title: "HS Code", key: "hc_code" },
  { title: "Action", key: "action" },
];
const hsCode = ref<
  {
    description: string;
    hscode: string;
  }[]
>();
const route = useRoute();
const shlnId = route.params.id;
const productDialog = ref(false);
const addProduct = () => {
  productDialog.value = true;
};
const refVForm = ref<VForm>();

const onSubmit = async () => {
  // sendSnackbar("error bang", "success");
  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) insertProduct();
  });
};
const insertProduct = async () => {
  try {
    const response = await $api("/shln/submission/product/add", {
      method: "post",
      body: form.value,
    });
    if (response.code == 500) {
      useSnackbar().sendSnackbar("Gagal menambahkan Product", "error");
      productDialog.value = false;
      return;
    }
    await loadItem(page.value, itemPerPage.value);
    useSnackbar().sendSnackbar("Berhasil menambahkan manufacture", "success");
    productDialog.value = false;
  } catch (error) {
    useSnackbar().sendSnackbar("Gagal menambahkan manufacture", "error");
    productDialog.value = false;
  }
};
const form = ref({
  shlnId: shlnId,
  manufactur_id: "",
  name: "",
  hs_code_id: null,
});

const deleteDialog = ref(false);
const deletedId = ref();
const deleteItem = (item: DataProduct) => {
  deletedId.value = item.id;
  deleteDialog.value = true;
};
const closeDelete = () => {
  deletedId.value = null;
  deleteDialog.value = false;
};
const deleteProduct = async () => {
  try {
    await $api("/shln/submission/manufacture/delete", {
      method: "post",
      body: {
        shlnId: shlnId,
        manufactureId: deletedId.value,
      },
    });
    await loadItem(page.value, itemPerPage.value);
    deleteDialog.value = false;
    useSnackbar().sendSnackbar("Berhasil Menghapus manufacture", "success");
  } catch (error) {
    deleteDialog.value = false;
    useSnackbar().sendSnackbar("Gagal Menghapus manufacture", "error");
  }
};
const { mdAndDown } = useDisplay();
interface DataProduct {
  id: number;
  manufaktur: string;
  name: string;
  hc_code: string;
}

const itemPerPage = ref(10);
const totalItems = ref(0);
const loading = ref(true);
const page = ref(1);
const items = ref<DataProduct[]>();
const tracking = ref<{
  comment: string;
  created_at: string;
  id: string;
  status: string;
  username: string;
}>();
const loadTracking = async () => {
  try {
    const response = await $api("/shln/submission/product/tracking", {
      method: "post",
      body: {
        id: shlnId,
      },
    });

    tracking.value = response.data;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};
const loadHsCode = async () => {
  try {
    const response = await $api("/shln/submission/product/hscode", {
      method: "get",
    });

    hsCode.value = response.data;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};
const loadItem = async (page: number, size: number) => {
  try {
    loading.value = true;

    const response = await $api("/shln/submission/product", {
      method: "post",
      body: {
        id: shlnId,
      },
      params: {
        page,
        size,
      },
    });

    items.value = response.data;
    totalItems.value = response.total_item;
    loading.value = false;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loading.value = false;
  }
};
onMounted(async () => {
  await Promise.allSettled([loadTracking(), loadHsCode()]);
});

const selectedFile = ref<File | null>(null);

function onFileSelected(file: File | null) {
  selectedFile.value = file;
}
</script>

<template>
  <div>
    <VRow>
      <VCol cols="12" md="8">
        <v-card>
          <v-card-text>
            <VRow>
              <VCol cols="12" md="10">
                <h3 class="text-h4">Product</h3>
              </VCol>
              <VCol
                cols="12"
                md="2"
                :class="`d-flex justify-end ${mdAndDown ? 'flex-wrap' : ''}`"
              >
                <v-btn
                  color="primary"
                  variant="outlined"
                  block
                  class="ma-1"
                  @click="addProduct"
                  >Tambah <v-icon end icon="fa-plus" />
                </v-btn>
              </VCol>
            </VRow>
            <VRow>
              <v-data-table-server
                v-model:items-per-page="itemPerPage"
                v-model:page="page"
                :headers="headers"
                :items-length="totalItems"
                :loading="loading"
                loading-text="Loading..."
                :items="items"
                @update:options="loadItem(page, itemPerPage)"
                class="text-no-wrap"
              >
                <template #item.index="{ index }">
                  {{ index + 1 }}
                </template>
                <template #item.manufacture_name="{ item }">
                  {{ item.manufaktur }}
                </template>
                <template #item.product_name="{ item }">
                  {{ item.name }}
                </template>
                <template #item.hs_code="{ item }">
                  {{ item.hc_code }}
                </template>
                <template #item.action="{ item }">
                  <div class="d-flex gap-1">
                    <IconBtn size="small" @click="deleteItem(item)">
                      <VIcon icon="fa-trash-o" color="error" />
                    </IconBtn>
                  </div>
                </template>
              </v-data-table-server>
            </VRow>
          </v-card-text>
        </v-card>
      </VCol>
      <VCol cols="12" md="4">
        <v-card>
          <v-card-text>
            <h3 class="text-h4">Tracking</h3>
            <VSkeletonLoader
              v-if="tracking == undefined"
              :loading="true"
              type="list-item-two-line"
            >
              <VListItem
                lines="two"
                subtitle="Subtitle"
                title="Title"
                rounded
              />
            </VSkeletonLoader>
            <HalalTimeLine v-if="tracking != undefined" :event="tracking" />
          </v-card-text>
        </v-card>
      </VCol>
    </VRow>
    <VDialog v-model="deleteDialog" max-width="500px">
      <VCard title="Are you sure you want to delete this item?">
        <VCardText>
          <div class="d-flex justify-center gap-4">
            <VBtn color="primary" variant="outlined" @click="closeDelete">
              Cancel
            </VBtn>
            <VBtn color="primary" variant="elevated" @click="deleteProduct">
              OK
            </VBtn>
          </div>
        </VCardText>
      </VCard>
    </VDialog>
    <VDialog v-model="productDialog" max-width="800px">
      <DialogCloseBtn
        variant="text"
        size="default"
        @click="productDialog = false"
      />
      <VCard title="Add Product">
        <v-form ref="refVForm" @submit.prevent="onSubmit">
          <v-card-text>
            <VCol>
              <div
                class="text-subtitle-1 font-weight-bold text-high-emphasis mb-1"
              >
                Manufacture
              </div>
              <VSelect
                v-model="form.manufactur_id"
                :items="manufacture"
                item-title="name"
                item-value="id"
                placeholder="Select Manufacture"
                eager
                :rules="[requiredValidator]"
                variant="outlined"
                density="compact"
              />
            </VCol>
            <VCol>
              <div
                class="text-subtitle-1 font-weight-bold text-high-emphasis mb-1"
              >
                HS Code
              </div>
              <VSelect
                v-model="form.hs_code_id"
                :items="hsCode"
                item-value="hscode"
                item-title="description"
                placeholder="Select HS Code"
                :rules="[requiredValidator]"
                eager
                variant="outlined"
                density="compact"
              />
            </VCol>
            <VCol>
              <div
                class="text-subtitle-1 font-weight-bold text-high-emphasis mb-1"
              >
                Product Name
              </div>
              <div class="d-flex flex-row gap-5 flex-wrap">
                <v-text-field
                  placeholder="Input Product Name"
                  :rules="[requiredValidator]"
                  variant="outlined"
                  density="compact"
                ></v-text-field>
                <FileInputButton
                  buttonText="Choose File"
                  buttonColor="primary"
                  @fileSelected="onFileSelected"
                />
              </div>
            </VCol>
          </v-card-text>
          <VCardText>
            <VCol>
              <div class="d-flex justify-end gap-4">
                <VBtn
                  color="primary"
                  variant="outlined"
                  @click="productDialog = false"
                >
                  Cancel
                </VBtn>
                <VBtn type="submit" color="primary" variant="elevated">
                  Add
                </VBtn>
              </div>
            </VCol>
          </VCardText>
        </v-form>
      </VCard>
    </VDialog>
  </div>
</template>

<style scoped lang="scss"></style>
