<script setup lang="ts">
import { computed, ref } from "vue";
import { useDisplay } from "vuetify";

const loading = ref(false);

const isVisible = ref(false);

const route = useRoute();

const openDialog = () => {
  isVisible.value = true;
};

const closeDialog = () => {
  isVisible.value = false;
};

const postVerificatorReturn = async () => {
  try {
    loading.value = true;

    const res = await $api("/shln/verificator/manufacture/tracking", {
      method: "post",
      body: {
        shln_id: route.params.id,
        type: "approve",
        comment: "",
      },
    });

    if (res?.code === 2000) {
      closeDialog();
      loading.value = false;
    } else {
      closeDialog();
      loading.value = false;

      useSnackbar().sendSnackbar("Gagal menambahkan data", "error");
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");

    closeDialog();
    loading.value = false;
  }
};

const confirm = () => {
  postVerificatorReturn();
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
    <VBtn variant="outlined" color="success" @click="openDialog">
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
          <p class="mb-2">Are you sure you want to approve this submission?</p>
        </VCardText>
        <VCardActions>
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
      </VCard>
    </VDialog>
  </div>
</template>

<style scoped></style>
