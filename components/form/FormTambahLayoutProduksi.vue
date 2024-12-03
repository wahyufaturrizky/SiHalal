<script setup lang="ts">
import { useDisplay } from "vuetify";

const props = defineProps({
  isEditable: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["confirm"]);

const isVisible = ref(false);

const openDialog = () => {
  isVisible.value = true;
};

const closeDialog = () => {
  isVisible.value = false;
};

const form = ref({
  pabrik: null,
  file: null,
});

const resetForm = () => {
  form.value = {
    pabrik: null,
    file: null,
  };
};

const confirm = () => {
  emit("confirm", form.value);
  resetForm();
  closeDialog();
};

const cancel = () => {
  closeDialog();
};

const { mdAndUp } = useDisplay();

const dialogMaxWidth = computed(() => {
  return mdAndUp.value ? 700 : "90%";
});

const pabrik = [
  { title: "Pabrik 1", value: "1" },
  { title: "Pabrik 2", value: "2" },
];

</script>

<template>
  <div class="mb-2">
    <VBtn
      @click="openDialog"
      variant="outlined"
      append-icon="ri-add-line"
      v-if="props.isEditable"
    >
      Tambah
    </VBtn>
    <VDialog v-model="isVisible" :max-width="dialogMaxWidth">
      <VCard class="pa-2">
        <VCardTitle
          class="text-h5 font-weight-bold d-flex justify-space-between align-center"
        >
          <span>Tambah Layout</span>
          <VBtn
            icon
            color="transparent"
            style="border: none"
            elevation="0"
            @click="closeDialog"
          >
            <VIcon color="black">ri-close-line</VIcon>
          </VBtn>
        </VCardTitle>

        <VCardText>
          <VLabel for="pabrik"> Pabrik </VLabel>
          <VSelect
            id="pabrik"
            v-model="form.pabrik"
            placeholder="Pilih Pabrik"
            outlined
            dense
            required
            class="mb-4"
            :items="pabrik"
          />
          <VRow no-gutters class="d-flex justify-space-between align-center">
            <VCol cols="6">
              <VLabel for="uploadLayout">Upload Layout</VLabel>
            </VCol>
            <VCol cols="6">
              <HalalFileInput id="uploadLayout" v-model="form.file"></HalalFileInput>
            </VCol>
          </VRow>
        </VCardText>

        <div class="d-flex justify-end ga-2">
          <VBtn @click="cancel" variant="outlined"> Batal </VBtn>
          <VBtn @click="confirm"> Tambah </VBtn>
        </div>
      </VCard>
    </VDialog>
  </div>
</template>

<style scoped></style>
