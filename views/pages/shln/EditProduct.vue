<script setup lang="ts">
import { hsCodeValidator } from "@/@core/utils/validators";
import type { Manufacture } from "@/pages/sertifikasi-halal/luar-negeri/submission/[id]/edit.vue";
import { useDisplay } from "vuetify";
const props = defineProps<{
  manufacture: Manufacture[];
  scope: string;
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
    id: string;
  }[]
>();
const route = useRoute();
const shlnId = route.params.id;
const productDialog = ref(false);
const bulkingDialog = ref(false);
const addProduct = () => {
  productDialog.value = true;
};
const addBulking = () => {
  bulkingDialog.value = true;
};
const refVForm = ref<VForm>();
const bulkingForm = ref<VForm>();

const onSubmit = async () => {
  // sendSnackbar("error bang", "success");
  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) insertProduct();
  });
};
const onSubmitBulking = async () => {
  // sendSnackbar("error bang", "success");
  if (selectedFile.value == null) {
    useSnackbar().sendSnackbar("mohon masukkan file", "error");
    return;
  }
  bulkingDialog.value = false;
};
const insertProduct = async () => {
  productAddButton.value = true;
  try {
    let hs_code_id = form.value.hs_code_id;
    let body = {};
    if (
      props.scope == "4405c628-894b-4622-aaf0-b1acab962db1" ||
      props.scope == "5b18abfa-47e9-4846-9faa-0e6013bb4211" ||
      props.scope == "78a95209-5d90-4f90-ace0-b785ef474efc"
    ) {
      body = {
        shln_id: form.value.shlnId,
        manufactur_id: form.value.manufactur_id,
        name: form.value.name,
        hs_code_id: lastSelectedId.value,
      };
    } else {
      body = {
        shln_id: form.value.shlnId,
        manufactur_id: form.value.manufactur_id,
        name: form.value.name,
        hs_code: form.value.hs_code_id,
        hs_code_desc: form.value.hs_code_desc,
      };
    }
    const response = await $api("/shln/submission/product/add", {
      method: "post",
      body,
    });
    if (response.code == 500) {
      useSnackbar().sendSnackbar("Gagal menambahkan Product", "error");
      productDialog.value = false;
      productAddButton.value = false;
      return;
    }
    await loadItem(page.value, itemPerPage.value);
    await loadTracking();
    form.value = {
      shlnId: shlnId,
      manufactur_id: null,
      name: "",
      hs_code_id: null,
    };

    useSnackbar().sendSnackbar("Berhasil menambahkan product", "success");
    productDialog.value = false;
    productAddButton.value = false;
    selectLevels.value = [
      {
        options: selectLevels.value[0].options, // Initial empty options for the first level
        parentId: null, // No parent for the root level
      },
    ];
    selectedValues.value = [];
  } catch (error) {
    useSnackbar().sendSnackbar("Gagal menambahkan product", "error");
    productDialog.value = false;
    productAddButton.value = false;
  }
};
const form = ref({
  shlnId: shlnId,
  manufactur_id: null,
  name: "",
  hs_code_id: null,
  hs_code_desc: "",
});

const deleteDialog = ref(false);
const deletedId = ref();
const productAddButton = ref(false);
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
    const response = await $api("/shln/submission/product/delete", {
      method: "post",
      body: {
        shlnId: shlnId,
        productId: deletedId.value,
      },
    });
    if (response.code != 2000) {
      useSnackbar().sendSnackbar("Gagal Menghapus product", "error");
      return;
    }
    await loadItem(page.value, itemPerPage.value);
    deleteDialog.value = false;
    useSnackbar().sendSnackbar("Berhasil Menghapus product", "success");
  } catch (error) {
    deleteDialog.value = false;
    useSnackbar().sendSnackbar("Gagal Menghapus product", "error");
  }
};
const { mdAndDown } = useDisplay();
interface DataProduct {
  id: number;
  manufaktur: string;
  name: string;
  hc_code: string;
}

const selectLevels = ref([
  {
    options: [], // Initial empty options for the first level
    parentId: null, // No parent for the root level
  },
]);

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
const selectedValues = ref([]);
const loadInitialHsCode = async () => {
  try {
    const response = await $api("/shln/submission/product/hscode", {
      method: "get",
    });

    selectLevels.value[0].options = response.data;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};
const handleSelect = async (levelIndex) => {
  console.log(levelIndex, selectedValues.value);
  const selectedId = selectedValues.value[levelIndex];
  const findHsCode = selectLevels.value[levelIndex].options.find(
    (data) => selectedId == data.id
  );

  // Remove levels after the current one
  selectLevels.value.splice(levelIndex + 1);
  selectedValues.value.splice(levelIndex + 1);

  try {
    // Fetch subdata for the selected value
    const response = await $api(
      `/shln/submission/product/hscode?sub=${findHsCode.hscode}`,
      {
        method: "get",
      }
    );
    const subdata = response.data;

    // Add a new level if subdata exists
    if (subdata.length > 0) {
      selectLevels.value.push({
        options: subdata,
        parentId: selectedId,
      });
    }
  } catch (error) {
    console.error("Failed to fetch subdata:", error);
  }
};
const lastSelectedId = computed(() => {
  return selectedValues.value.length
    ? selectedValues.value[selectedValues.value.length - 1]
    : null;
});
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
// const getSubHsCode = async () => {
//   try {
//     const response = await $api("/shln/submission/product/hscode", {
//       method: "get",
//     });

//     hsCode.value = response.data;
//   } catch (error) {
//     useSnackbar().sendSnackbar("Ada Kesalahan", "error");
//   }
// };
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
  await Promise.allSettled([loadTracking(), loadHsCode(), loadInitialHsCode()]);
});

const selectedFile = ref<File | null>(null);

function onFileSelected(file: File | null) {
  selectedFile.value = file;
}
const formatItemTitle = (item) => {
  return `${item.hscode} - ${item.description}`;
};
</script>

<template>
  <div>
    <VRow>
      <VCol cols="12" md="8">
        <v-card>
          <v-card-text>
            <VRow class="justify-space-between">
              <VCol cols="12" md="2">
                <h3 class="text-h4">Product</h3>
              </VCol>
              <VCol cols="12" md="2">
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
            <!-- <VRow class="justify-end">
              <VCol
                cols="12"
                md="4"
                :class="`d-flex justify-end ${mdAndDown ? 'flex-wrap' : ''}`"
              >
                <v-btn color="primary" block class="ma-1"
                  >Download Template <v-icon end icon="fa-download" />
                </v-btn>
              </VCol>
              <VCol
                cols="12"
                md="6"
                :class="`d-flex justify-end ${mdAndDown ? 'flex-wrap' : ''}`"
              >
                <VRow class="justify-end">
                  <VCol cols="12" md="6">
                    <v-btn
                      color="primary"
                      variant="outlined"
                      class="ma-1"
                      block
                      @click="addBulking"
                      >Tambah Bulking <v-icon end icon="fa-plus" />
                    </v-btn>
                  </VCol>
                  <VCol cols="12" md="6">
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
              </VCol>
            </VRow> -->
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
                v-if="
                  scope == '4405c628-894b-4622-aaf0-b1acab962db1' ||
                  scope == '5b18abfa-47e9-4846-9faa-0e6013bb4211' ||
                  scope == '78a95209-5d90-4f90-ace0-b785ef474efc'
                "
                class="mb-5"
                v-for="(level, index) in selectLevels"
                :key="index"
              >
                <div
                  class="text-subtitle-1 font-weight-bold text-high-emphasis mb-1"
                >
                  HS Code
                </div>
                <v-select
                  v-model="selectedValues[index]"
                  :items="level.options"
                  item-value="id"
                  variant="outlined"
                  :rules="[requiredValidator]"
                  density="compact"
                  :item-title="formatItemTitle"
                  placholder="Select HS Code"
                  v-on:update:model-value="handleSelect(index)"
                />
              </div>
              <div v-else>
                <div>
                  <div
                    class="text-subtitle-1 font-weight-bold text-high-emphasis mb-1"
                  >
                    HS Code
                  </div>
                  <div>
                    <v-text-field
                      placeholder="Input HS Code"
                      :rules="[requiredValidator, hsCodeValidator]"
                      variant="outlined"
                      density="compact"
                      v-model="form.hs_code_id"
                    ></v-text-field>
                  </div>
                </div>
                <div>
                  <div
                    class="text-subtitle-1 font-weight-bold text-high-emphasis mb-1"
                  >
                    HS Code Description
                  </div>
                  <v-text-field
                    placeholder="Input HS Code"
                    :rules="[requiredValidator, hsCodeDescValidator]"
                    variant="outlined"
                    density="compact"
                    v-model="form.hs_code_desc"
                  ></v-text-field>
                </div>
              </div>
              <!-- <VSelect
                v-model="form.hs_code_id"
                :items="hsCode"
                item-value="hscode"
                item-title="description"
                placeholder="Select HS Code"
                :rules="[requiredValidator]"
                eager
                variant="outlined"
                density="compact"
              /> -->
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
                  v-model="form.name"
                ></v-text-field>
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
                <VBtn
                  type="submit"
                  color="primary"
                  :disabled="productAddButton"
                  variant="elevated"
                >
                  Add
                </VBtn>
              </div>
            </VCol>
          </VCardText>
        </v-form>
      </VCard>
    </VDialog>
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
    <VDialog v-model="bulkingDialog" max-width="800px">
      <DialogCloseBtn
        variant="text"
        size="default"
        @click="bulkingDialog = false"
      />
      <VCard title="Add Product">
        <v-form ref="bulkingForm" @submit.prevent="onSubmitBulking">
          <v-card-text>
            <VCol>
              <div
                class="text-subtitle-1 font-weight-bold text-high-emphasis mb-1"
              >
                File Products
              </div>
              <div class="d-flex flex-row gap-5 flex-wrap">
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
                  @click="bulkingDialog = false"
                >
                  Cancel
                </VBtn>
                <VBtn
                  type="submit"
                  color="primary"
                  :disabled="productAddButton"
                  variant="elevated"
                >
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
