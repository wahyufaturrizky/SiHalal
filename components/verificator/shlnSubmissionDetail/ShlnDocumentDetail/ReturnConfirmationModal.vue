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
  isDisabled: {
    type: Boolean,
    required: false,
  },
});

const emit = defineEmits<{
  (e: "refresh"): void;
}>();

const route = useRoute();

const inputValue = ref("");
const loading = ref(false);
const isVisible = ref(false);

const closeDialog = () => {
  isVisible.value = false;
};

const putVerificatorDocument = async (comment: string[]) => {
  try {
    loading.value = true;

    const res = await $api(
      `/shln/verificator/document/${props.documenttype}/return/${route.params.id}`,
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
      emit("refresh");
    } else {
      closeDialog();
      useSnackbar().sendSnackbar("Gagal menambahkan data", "error");
    }

    inputValue.value = "";

    loading.value = false;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    inputValue.value = "";
    closeDialog();
    loading.value = false;
  }
};

const openDialog = () => {
  isVisible.value = true;
};

const onConfirm = () => {
  putVerificatorDocument(inputValue.value);
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
  <VBtn
    variant="outlined"
    color="primary"
    append-icon="ri-reset-left-line"
    :disabled="props.isDisabled"
    @click="openDialog"
  >
    Return
  </VBtn>
  <VDialog v-model="isVisible" :max-width="dialogMaxWidth">
    <VCard>
      <VCardTitle>
        <VRow>
          <VCol cols="10">
            <h3>Return Confirmation</h3>
          </VCol>
          <VCol cols="2" style="display: flex; justify-content: end">
            <VIcon size="small" icon="fa-times" @click="closeDialog" />
          </VCol>
        </VRow>
      </VCardTitle>
      <VCardText>
        <VRow>
          <VCol cols="12">
            <p><b>Are you sure you want to Return this submission?</b></p>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12">
            <VTextarea
              v-model="inputValue"
              clearable
              auto-grow
              dense
              outlined
              :style="{ maxWidth: '100%' }"
              placeholder="Input Return Notes (Optional)"
            />
          </VCol>
        </VRow>
      </VCardText>
      <VCardActions>
        <VBtn variant="outlined" @click="cancel"> Cancel </VBtn>
        <VBtn :disabled="loading" variant="elevated" @click="onConfirm">
          {{ loading ? "Loading..." : "Yes, Return" }}
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
