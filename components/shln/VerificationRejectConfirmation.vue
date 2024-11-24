<script setup lang="ts">
import { computed, ref } from "vue";
import { useDisplay } from "vuetify";

const router = useRouter();
const route = useRoute();

const inputValue = ref("");

const isVisible = ref(false);
const loading = ref(false);

const openDialog = () => {
  isVisible.value = true;
};

const closeDialog = () => {
  isVisible.value = false;
};

const putVerificatorReject = async (comment: string[]) => {
  try {
    loading.value = true;

    const res = await $api(`/shln/verificator/reject/${route.params.id}`, {
      method: "put",
      body: {
        comment,
      },
    });

    if (res?.code === 2000) router.go(-1);
    else useSnackbar().sendSnackbar("Gagal menambahkan data", "error");

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

const confirm = () => {
  putVerificatorReject(inputValue.value);
};

const cancel = () => {
  inputValue.value = "";
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
      color="error"
      append-icon="ri-close-line"
      @click="openDialog"
    >
      Reject
    </VBtn>

    <VDialog v-model="isVisible" :max-width="dialogMaxWidth">
      <VCard>
        <VCardTitle
          class="text-h5 font-weight-bold d-flex justify-space-between align-center"
        >
          <span>Return Confirmation </span>
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
          <p class="mb-2">Are you sure you want to Return this submission?</p>
          <VTextarea
            v-model="inputValue"
            placeholder="Input Return Note (Opsional) "
            clearable
            auto-grow
            dense
            outlined
            :style="{ maxWidth: '100%' }"
          />
        </VCardText>
        <VCardActions>
          <VBtn variant="outlined" text @click="cancel"> Cancel </VBtn>
          <VBtn
            :disabled="loading"
            color="error"
            variant="flat"
            @click="confirm"
          >
            {{ loading ? "Loading..." : "Yes, Reject" }}
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>

<style scoped></style>
