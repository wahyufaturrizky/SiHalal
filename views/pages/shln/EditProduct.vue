<script setup lang="ts">
import { useDisplay } from "vuetify";

const headers = [
  { title: "No", key: "index" },
  { title: "Manufacture Name", key: "manufacture_name" },
  { title: "Product Name", key: "product_name" },
  { title: "HS Code", key: "hs_code" },
  { title: "Action", key: "action" },
];
const items: DataProduct[] = [
  {
    id: 1,
    manufacturer_name: "Allyn Group",
    product_name: "Product A",
    hs_code: "0232134",
  },
];
const productDialog = ref(false);
const addProduct = () => {
  productDialog.value = true;
};

const deleteDialog = ref(false);
const deletedId = ref(-1);
const deleteItem = (item: DataProduct) => {
  deletedId.value = item.id;
  deleteDialog.value = true;
};
const closeDelete = () => {
  deletedId.value = -1;
  deleteDialog.value = false;
};
const { mdAndDown } = useDisplay();
interface DataProduct {
  id: number;
  manufacturer_name: string;
  product_name: string;
  hs_code: string;
}

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
              <v-data-table
                :headers="headers"
                :items="items"
                :items-per-page="5"
                class="text-no-wrap"
              >
                <template #item.index="{ index }">
                  {{ index + 1 }}
                </template>
                <template #item.manufacture_name="{ item }">
                  {{ item.manufacturer_name }}
                </template>
                <template #item.product_name="{ item }">
                  {{ item.product_name }}
                </template>
                <template #item.hs_code="{ item }">
                  {{ item.hs_code }}
                </template>
                <template #item.action="{ item }">
                  <div class="d-flex gap-1">
                    <IconBtn size="small" @click="deleteItem(item)">
                      <VIcon icon="fa-trash-o" color="error" />
                    </IconBtn>
                  </div>
                </template>
              </v-data-table>
            </VRow>
          </v-card-text>
        </v-card>
      </VCol>
      <VCol cols="12" md="4">
        <v-card>
          <v-card-text>
            <h3 class="text-h4">Tracking</h3>
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
            <VBtn color="primary" variant="elevated" @click="closeDelete">
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
        <v-form>
          <v-card-text>
            <VCol>
              <div
                class="text-subtitle-1 font-weight-bold text-high-emphasis mb-1"
              >
                Manufacture
              </div>
              <VSelect
                :items="['alyn group', 'other']"
                placeholder="Select Manufacture"
                eager
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
                :items="['00001', '00002']"
                placeholder="Select HS COde"
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
                <VBtn
                  type="submit"
                  color="primary"
                  variant="elevated"
                  @click="productDialog = false"
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
