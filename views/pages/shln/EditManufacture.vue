<script setup lang="ts">
import type { Manufacture } from "@/pages/sertifikasi-halal/luar-negeri/submission/[id]/edit.vue";
import { useDisplay } from "vuetify";
const props = defineProps<{
  manufacture: Manufacture[];
  hcnCountry: string;
}>();
const headers = [
  { title: "No", key: "index" },
  { title: "Manufacture Name", key: "name" },
  { title: "Address", key: "address" },
  { title: "Country", key: "country" },
  { title: "Action", key: "action" },
];
const { setData } = useMyUpdateSubmissionEditStore();

const manufactureDialog = ref(false);
const addManufacuter = () => {
  manufactureDialog.value = true;
};
const refVForm = ref<VForm>();

const onSubmit = async () => {
  // sendSnackbar("error bang", "success");
  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) insertManufacturer();
  });
};
const insertManufacturer = async () => {
  try {
    const response = await $api("/shln/submission/manufacture/add", {
      method: "post",
      body: form.value,
    });
    if (response.code == 500) {
      useSnackbar().sendSnackbar("Gagal menambahkan manufacture", "error");
      manufactureDialog.value = false;
      return;
    }
    setData("manufacture");
    useSnackbar().sendSnackbar("Berhasil menambahkan manufacture", "success");
    manufactureDialog.value = false;
  } catch (error) {
    useSnackbar().sendSnackbar("Gagal menambahkan manufacture", "error");
    manufactureDialog.value = false;
  }
};
const route = useRoute();
const shlnId = route.params.id;
const form = ref({
  shlnId: shlnId,
  name: "",
  address: "",
  country: "",
});
const tracking = ref<
  {
    comment: string;
    created_at: string;
    id: string;
    status: string;
    username: string;
  }[]
>();

const deleteDialog = ref(false);
const deletedId = ref();
const deleteItem = async (item: Manufacture) => {
  deletedId.value = item.id;
  deleteDialog.value = true;
};
const closeDelete = () => {
  deletedId.value = null;
  deleteDialog.value = false;
};

const loadTracking = async () => {
  try {
    const response = await $api("/shln/submission/manufacture/tracking", {
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
const deleteManufacture = async () => {
  try {
    await $api("/shln/submission/manufacture/delete", {
      method: "post",
      body: {
        shlnId: shlnId,
        manufactureId: deletedId.value,
      },
    });
    deleteDialog.value = false;
    setData("manufacture");
    useSnackbar().sendSnackbar("Berhasil Menghapus manufacture", "success");
  } catch (error) {
    deleteDialog.value = false;
    useSnackbar().sendSnackbar("Gagal Menghapus manufacture", "error");
  }
};
onMounted(async () => {
  await Promise.allSettled([loadTracking()]);
});
const { mdAndDown } = useDisplay();
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
              </VCol>
            </VRow>
            <VRow>
              <v-data-table
                :headers="headers"
                :items="manufacture"
                class="text-no-wrap"
              >
                <template #item.index="{ index }">
                  {{ index + 1 }}
                </template>
                <template #item.manufacture_name="{ item }">
                  {{ item.name }}
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
            <VBtn color="primary" variant="elevated" @click="deleteManufacture">
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
        <v-form ref="refVForm" @submit.prevent="onSubmit">
          <v-card-text>
            <VCol>
              <div
                class="text-subtitle-1 font-weight-bold text-high-emphasis mb-1"
              >
                Name
              </div>
              <v-text-field
                placeholder="Input Name"
                v-model="form.name"
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
                v-model="form.address"
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
                v-model="form.country"
                variant="outlined"
                disabled
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
