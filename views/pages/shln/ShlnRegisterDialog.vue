<script setup lang="ts">
import { defineEmits, defineProps, ref, watch } from "vue";

const props = defineProps({
  dialogVisible: {
    type: Boolean,
    required: true,
  },
  submit: {
    type: Function,
    required: true,
  },
  totalItem: {
    type: Number,
    required: true,
  },
});
const createDraft = async () => {
  try {
    const response = await $api("/shln/submission/register", {
      method: "post",
    });
    return response.data.id;
  } catch (error) {
    return null;
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const emit = defineEmits(["update:dialogVisible"]);

const localDialogVisible = ref(props.dialogVisible);

watch(
  () => props.dialogVisible,
  (newVal) => {
    localDialogVisible.value = newVal;
  }
);
const buttonClicked = ref(false);

watch(localDialogVisible, (newVal) => {
  emit("update:dialogVisible", newVal);
});

const closeDialog = () => {
  localDialogVisible.value = false;
};

const handleRegister = async () => {
  buttonClicked.value = true;
  props.submit(await createDraft());
  closeDialog();
  buttonClicked.value = true;
};

import { useDisplay } from "vuetify";
const { mdAndUp } = useDisplay();
const dialogMaxWidth = computed(() => {
  return mdAndUp.value ? 500 : "90%";
});
</script>

<template>
  <VDialog v-model="localDialogVisible" :max-width="dialogMaxWidth">
    <VCard class="pa-2">
      <VCardTitle class="headline d-flex space-between align-center">
        <h4>Foreign Halal Certificate Registration</h4>
        <VSpacer />
        <VBtn icon class="no-bg" @click="localDialogVisible = false">
          <VIcon icon="mdi-close" style="color: black" />
        </VBtn>
      </VCardTitle>
      <VCardText>
        <VCard
          class="my-2 pa-4 d-flex flex-column mx-auto mb-8"
          elevation="4"
          width="90%"
        >
          <h3 class="font-weight-bold text-center">New</h3>
          <p v-if="totalItem < 3" class="text-center text-body-2 mt-2">
            Register your Foreign Halal Certificate to receive BPJPH
            Registration Number
          </p>
          <p v-else class="text-center text-body-2 mt-2">
            You already have {{ totalItem }} Draft data entries. Are you sure
            you want to register the new one?
          </p>
          <VRow>
            <VCol v-if="totalItem >= 3">
              <VBtn
                color="primary"
                class="mt-2 text-center"
                width="100%"
                @click="closeDialog"
                variant="outlined"
              >
                Cancel
              </VBtn>
            </VCol>
            <VCol>
              <VBtn
                color="primary"
                class="mt-2 text-center"
                @click="handleRegister"
                width="100%"
                :disabled="buttonClicked"
              >
                Register
              </VBtn>
            </VCol>
          </VRow>
        </VCard>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<style scoped>
.headline {
  font-size: 1.2rem;
}
.no-bg {
  background-color: transparent !important;
  color: inherit;
  box-shadow: none;
}
</style>
