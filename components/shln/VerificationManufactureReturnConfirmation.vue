<script setup lang="ts">
import { computed, ref } from "vue";
import { useDisplay } from "vuetify";

const props = defineProps({
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

const openDialog = () => {
  isVisible.value = true;
};

const closeDialog = () => {
  isVisible.value = false;
};

const postVerificatorReturn = async (comment: string[]) => {
  try {
    loading.value = true;

    const res = await $api("/shln/verificator/manufacture/tracking", {
      method: "post",
      body: {
        shln_id: route.params.id,
        type: "reject",
        comment,
      },
    });

    if (res?.code === 2000) {
      inputValue.value = "";
      closeDialog();
      emit("refresh");
    } else {
      inputValue.value = "";
      closeDialog();
      useSnackbar().sendSnackbar("Gagal menambahkan data", "error");
    }

    loading.value = false;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    inputValue.value = "";
    closeDialog();
    loading.value = false;
  }
};

const confirm = () => {
  postVerificatorReturn(inputValue.value);
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
      color="primary"
      append-icon="ri-reset-left-line"
      :disabled="props.isDisabled"
      @click="openDialog"
    >
      Return
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
            color="primary"
            variant="flat"
            @click="confirm"
          >
            {{ loading ? "Loading..." : "Yes, Return" }}
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>

<style scoped></style>
