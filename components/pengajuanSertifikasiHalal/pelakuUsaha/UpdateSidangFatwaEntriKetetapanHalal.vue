<script setup lang="ts">
import { ref } from "vue";
import { useDisplay } from "vuetify";

const route = useRoute();

const selfDeclareId = (route.params as any).id;

const emit = defineEmits(["refresh"]);

const addDialog = ref(false);
const loadingAdd = ref(false);

const updateData = async () => {
  try {
    loadingAdd.value = true;

    const res: any = await $api(
      `/sidang-fatwa/entri-ketetapan-halal/update/${selfDeclareId}`,
      {
        method: "put",
      }
    );

    if (res?.code === 2000) {
      loadingAdd.value = false;
      addDialog.value = false;
      emit("refresh");
      useSnackbar().sendSnackbar("Berhasil update data", "success");
    } else {
      useSnackbar().sendSnackbar(res.errors.list_error.join(", "), "error");
      loadingAdd.value = false;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingAdd.value = false;
  }
};

const { mdAndUp } = useDisplay();
const dialogMaxWidth = computed(() => (mdAndUp ? 700 : "90%"));
</script>

<template>
  <VBtn variant="outlined" class="text-capitalize" @click="addDialog = true">
    Update Status Selesai Sidang Fatwa
  </VBtn>

  <VDialog v-model="addDialog" :max-width="dialogMaxWidth">
    <VCard>
      <VCardTitle>
        <VRow>
          <VCol cols="10"><h3>Update Status</h3></VCol>
          <VCol cols="2" style="display: flex; justify-content: end">
            <VIcon size="small" icon="fa-times" @click="addDialog = false" />
          </VCol>
        </VRow>
      </VCardTitle>
      <VCardItem>
        <VRow>
          <VCol cols="12">
            <p>Pastikan Ketetapan Halal Sudah Terisi!</p>
            <p>
              Selanjutnya dokumen akan dikirimkan untuk proses Penerbitan
              Sertifikat
            </p>
          </VCol>
        </VRow>
      </VCardItem>
      <VCardActions
        style="display: flex; justify-content: end; padding: 1.5svw"
      >
        <div>
          <VBtn
            :disabled="loadingAdd"
            @click="addDialog = false"
            variant="outlined"
          >
            Batal
          </VBtn>
          <VBtn :loading="loadingAdd" @click="updateData" variant="flat"
            >Ya, Update</VBtn
          >
        </div>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
