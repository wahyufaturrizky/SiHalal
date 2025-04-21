<script setup lang="ts">
// import DataDivisiModal from "@/views/pages/pelaku-usaha/DataDivisiModal.vue";
import { computed, defineEmits, defineProps, ref, watch } from "vue";
import { useDisplay } from "vuetify";

const props = defineProps({
  mode: { type: String, default: "add" },
  initialData: { type: Object, default: () => ({}) },
});

const emit = defineEmits(["confirm", "cancel"]);

const isVisible = ref(false);

const openDialog = () => {
  isVisible.value = true;
};

const closeDialog = () => {
  isVisible.value = false;
};

const confirm = () => {
  if (props.mode === "add") emit("confirmAdd", form.value);
  else emit("confirmEdit", form.value);

  closeDialog();
};

const cancel = () => {
  emit("cancel");
  closeDialog();
};

const { mdAndUp } = useDisplay();

const dialogMaxWidth = computed(() => {
  return mdAndUp.value ? "700" : "90%";
});

const tableDivisionHeader = [
  { title: "No", key: "no" },
  { title: "Divisi / Unit Usaha", key: "bussiness_unit" },
  { title: "Alamat", key: "address" },
  { title: "Username", key: "username" },
];

const form = ref({
  jenisDocument: "",
  nomorDocument: "",
  tanggalDocument: "",
  masaBerlaku: "",
  instansiPenerbit: "",
});

watch(
  () => props.initialData,
  (newData) => {
    if (props.mode === "edit" && newData) form.value = { ...newData };
  },
  { immediate: true }
);

const handleDivisionConfirm = (formData) => {
  emit("confirm", formData);
};
</script>

<template>
  <div>
    <VBtn variant="outlined" @click="openDialog"> Ubah Data </VBtn>

    <VDialog v-model="isVisible" :max-width="dialogMaxWidth">
      <VCard class="pa-2">
        <VCardTitle
          class="text-h5 font-weight-bold d-flex justify-space-between align-center"
        >
          <span>Divisi / Unit Usaha</span>
          <DataDivisiModal
            :card-width="700"
            mode="add"
            confirm-color="primary"
            @confirm="handleDivisionConfirm"
            @cancel="() => console.log('Add cancelled')"
          />
        </VCardTitle>

        <VCardText>
          <VDataTable
            disable-sort
            :items-per-page-options="[10, 25, 50, 100]"
            :headers="tableDivisionHeader"
          />
        </VCardText>
      </VCard>
    </VDialog>
  </div>
</template>

<style scoped>
/* Your styles here */
</style>
