<script setup lang="ts">
import { computed, ref } from "vue";
import { useDisplay } from "vuetify";

const router = useRouter();
const route = useRoute();

const isVisible = ref(false);
const loading = ref(false);

const openDialog = () => {
  isVisible.value = true;
};

const closeDialog = () => {
  isVisible.value = false;
};

const putVerificatorApprove = async () => {
  try {
    loading.value = true;

    const res = await $api(`/shln/verificator/accept/${route.params.id}`, {
      method: "put",
    });

    if (res?.code === 2000) {
      useSnackbar().sendSnackbar("Success Approve Submission", "success");
      closeDialog();
      loading.value = false;

      setTimeout(() => {
        router.go(-1);
      }, 1000);
    } else {
      useSnackbar().sendSnackbar(res.errors.list_error.join(", "), "error");
      closeDialog();
      loading.value = false;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    closeDialog();
    loading.value = false;
  }
};

const confirm = () => {
  putVerificatorApprove();
  router.push("/sertifikasi-halal/luar-negeri/verification");
};

const cancel = () => {
  closeDialog();
};

const { mdAndUp } = useDisplay();

const dialogMaxWidth = computed(() => {
  return mdAndUp ? 700 : "90%";
});
</script>

<template>
  <div class="ma-1">
    <VBtn
      variant="outlined"
      color="success"
      append-icon="ri-check-line"
      @click="openDialog"
    >
      Approve
    </VBtn>

    <VDialog v-model="isVisible" :max-width="dialogMaxWidth">
      <VCard>
        <VCardTitle
          class="text-h5 font-weight-bold d-flex justify-space-between align-center"
        >
          <span>Approve Confirmation </span>
          <VBtn
            icon
            color="transparent"
            style="border: none"
            elevation="0"
            @click="closeDialog"
          >
            <VIcon color="black"> ri-close-line </VIcon>
          </VBtn>
        </VCardTitle>
        <VCardText>
          <p class="mb-2">Are you sure you want to Approve this submission?</p>
          <VCardActions style="display: flex; justify-content: end">
            <VBtn variant="outlined" text @click="cancel"> Cancel </VBtn>
            <VBtn
              :disabled="loading"
              color="success"
              variant="flat"
              @click="confirm"
            >
              {{ loading ? "Loading..." : "Approve" }}
            </VBtn>
          </VCardActions>
        </VCardText>
      </VCard>
    </VDialog>
  </div>
</template>

<style scoped></style>
