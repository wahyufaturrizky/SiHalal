<script setup lang="ts">
import { useDisplay } from "vuetify";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  documenttype: {
    type: String,
    required: true,
  },
});

const route = useRoute();
const isVisible = ref(false);

const inputValue = ref("");
const loading = ref(false);

const closeDialog = () => {
  isVisible.value = false;
};

const putVerificatorDocument = async (comment: string[]) => {
  try {
    loading.value = true;

    const res = await $api(
      `/shln/verificator/document/${props.documenttype}/accept/${route.params.id}`,
      {
        method: "put",
        body: {
          comment,
          docid: props.id,
        },
      }
    );

    if (res?.code === 2000) {
      closeDialog();
    } else {
      closeDialog();
      useSnackbar().sendSnackbar("Gagal menambahkan data", "error");
    }

    inputValue.value = "";
    closeDialog();
    loading.value = false;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    inputValue.value = "";
    closeDialog();
    loading.value = false;
  }
};

const onConfirm = () => {
  putVerificatorDocument(inputValue.value);
};

const cancel = () => {
  inputValue.value = "";
  closeDialog();
};

const openDialog = () => {
  isVisible.value = true;
};

const { mdAndUp } = useDisplay();

const dialogMaxWidth = computed(() => {
  return mdAndUp ? 700 : "90%";
});
</script>

<template>
  <VBtn variant="outlined" color="#49a84c" @click="openDialog"> Approve </VBtn>
  <VDialog v-model="isVisible" :max-width="dialogMaxWidth">
    <VCard max-width="50svw">
      <VCardTitle>
        <VRow>
          <VCol cols="10">
            <h3>Approve Confirmation</h3>
          </VCol>
          <VCol cols="2" style="display: flex; justify-content: end">
            <VIcon size="small" icon="fa-times" @click="closeDialog" />
          </VCol>
        </VRow>
      </VCardTitle>
      <VCardText>
        <VRow>
          <VCol cols="12">
            <VTable>
              <thead>
                <tr>
                  <th>Tanggal</th>
                  <th>Catatan</th>
                  <th>Verifikator</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>18/10/2024, 09:00:00 AM</td>
                  <td />
                  <td>JoeyHLN</td>
                </tr>
              </tbody>
            </VTable>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12">
            <p><b>Are you sure you want to approve this submission?</b></p>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12">
            <VTextarea placeholder="Input Additional Notes" />
          </VCol>
        </VRow>
      </VCardText>
      <VCardActions>
        <VBtn variant="outlined" @click="cancel"> Cancel </VBtn>
        <VBtn variant="elevated"> Save Notes </VBtn>
        <VBtn
          :disabled="loading"
          color="#49A84C"
          variant="elevated"
          @click="onConfirm"
        >
          {{ loading ? "Loading..." : "Approve" }}
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
