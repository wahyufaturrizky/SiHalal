<script setup lang="ts">
import { defineProps, ref, watch } from "vue";

// Table headers
const tableHeader = [
  { title: "No", value: "nomor" },
  { title: "Uraian", value: "uraian" },
  { title: "Bukti", value: "bukti" },
  { title: "Verval", value: "verval" },
  { title: "Sesuai / Tidak Sesuai", value: "memenuhi" },
];

// Data for the table
const content = ref([]);
const route = useRoute();

// Props for receiving `dataPersyaratan`
const props = defineProps({
  dataPersyaratan: {
    type: Object,
    required: true,
  },
});

// Array to track selected item IDs
const selected = ref(new Set<number>());
const unSelected = ref(new Set<number>());

// Watch for changes to `dataPersyaratan`
watch(
  () => props.dataPersyaratan,
  (newData) => {
    if (newData) {
      content.value = newData;
      // Initialize the selected set based on memenuhi
      content.value.forEach((val, index) => {
        if (val?.memenuhi) {
          selected.value.add(index);
        }
      });
      console.log("Initial selected items:", Array.from(selected.value));
    }
  },
  { immediate: true }
);

// Toggle the selection for a checkbox
const toggleSelection = (index: number) => {
  if (selected.value.has(index)) {
    selected.value.delete(index);
    unSelected.value.add(index);
  } else {
    selected.value.add(index);
    unSelected.value.delete(index);
  }
  console.log(selected.value);
};

const onSubmit = async () => {
  const body = {};

  if (selected.value.size > 0 || unSelected.value.size > 0) {
    selected.value.forEach((val) => {
      const tmp = content.value[val];
      body[tmp.id] = true;
    });

    unSelected.value.forEach((val) => {
      const tmp = content.value[val];
      body[tmp.id] = false;
    });

    try {
      const response = await $api(
        `/self-declare/proses-verval/${route.params?.id}/submit-verval-requirement`,
        {
          method: "post",
          body,
        }
      );
      if (response.code != 2000) {
        useSnackbar().sendSnackbar("Gagal merubah requirement", "error");
        return;
      }
      useSnackbar().sendSnackbar("Berhasil merubah requirement", "success");
      // emit("emit-add", true);
    } catch (error) {
      console.error("error = ", error);
      useSnackbar().sendSnackbar("Gagal merubah requirement", "error");
    }
  } else {
    useSnackbar().sendSnackbar("Tidak ada data yang berubah", "success");
  }
};
</script>

<template>
  <VCard>
    <VCardTitle>
      <h3>Persyaratan Khusus</h3>
    </VCardTitle>

    <VCardItem>
      <VDataTable
        :headers="tableHeader"
        :items="content"
        :hide-default-footer="true"
      >
        <!-- Row number -->
        <template #item.nomor="{ index }">
          {{ index + 1 }}
        </template>

        <!-- Checkbox for memenuhi -->
        <template #item.memenuhi="{ index }">
          <VCheckbox
            :model-value="selected.has(index)"
            @change="toggleSelection(index)"
          />
        </template>
      </VDataTable>
    </VCardItem>

    <VCardActions style="display: flex; justify-content: end">
      <VBtn variant="flat" @click="onSubmit"
        >Simpan Pengecekan Persyaratan</VBtn
      >
    </VCardActions>
  </VCard>
</template>
