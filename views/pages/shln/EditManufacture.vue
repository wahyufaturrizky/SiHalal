<script setup lang="ts">
import { useDisplay } from "vuetify";

const headers = [
  { title: "No", key: "index" },
  { title: "Manufacture Name", key: "manufacture_name" },
  { title: "Address", key: "address" },
  { title: "Country", key: "country" },
  { title: "Action", key: "action" },
];
const items: DataManufacture[] = [
  {
    id: 1,
    manufacturer_name: "Allyn Group",
    address: "Jalan Mangga Besar Raya",
    country: "Thailand",
  },
];
const manufactureDialog = ref(false);
const addManufacuter = () => {
  manufactureDialog.value = true;
};

const deleteDialog = ref(false);
const deletedId = ref(-1);
const deleteItem = (item: DataManufacture) => {
  deletedId.value = item.id;
  deleteDialog.value = true;
};
const closeDelete = () => {
  deletedId.value = -1;
  deleteDialog.value = false;
};
const { mdAndDown } = useDisplay();
interface DataManufacture {
  id: number;
  manufacturer_name: string;
  address: string;
  country: string;
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
                <h3 class="text-h4">Manufacture</h3>
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
                  @click="addManufacuter"
                  >Tambah <v-icon end icon="fa-plus" />
                </v-btn>
                <v-btn class="ma-1" color="primary" block>Save</v-btn>
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
                <template #item.address="{ item }">
                  {{ item.address }}
                </template>
                <template #item.country="{ item }">
                  {{ item.country }}
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
            <h3 class="text-h4">Manufacture</h3>
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
    <VDialog v-model="manufactureDialog" max-width="500px">
      <DialogCloseBtn
        variant="text"
        size="default"
        @click="manufactureDialog = false"
      />
      <VCard title="Add Manufacture">
        <v-form>
          <v-card-text>
            <VCol>
              <div
                class="text-subtitle-1 font-weight-bold text-high-emphasis mb-1"
              >
                Name
              </div>
              <v-text-field
                placeholder="Input Name"
                :rules="[requiredValidator]"
                variant="outlined"
                density="compact"
              ></v-text-field>
            </VCol>
            <VCol>
              <div
                class="text-subtitle-1 font-weight-bold text-high-emphasis mb-1"
              >
                Address
              </div>
              <v-text-field
                placeholder="Input Address"
                :rules="[requiredValidator]"
                variant="outlined"
                density="compact"
              ></v-text-field>
            </VCol>
            <VCol>
              <div
                class="text-subtitle-1 font-weight-bold text-high-emphasis mb-1"
              >
                Country of Origin
              </div>
              <v-text-field
                placeholder="Input Country of Origin"
                :rules="[requiredValidator]"
                variant="outlined"
                density="compact"
              ></v-text-field>
            </VCol>
          </v-card-text>
          <VCardText>
            <VCol>
              <div class="d-flex justify-end gap-4">
                <VBtn
                  color="primary"
                  variant="outlined"
                  @click="manufactureDialog = false"
                >
                  Cancel
                </VBtn>
                <VBtn
                  type="submit"
                  color="primary"
                  variant="elevated"
                  @click="manufactureDialog = false"
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
