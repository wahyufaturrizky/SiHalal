<script setup lang="ts">
import { computed, defineEmits, defineProps, ref } from "vue";

// Props and Emits
defineProps({ mode: String });

const emit = defineEmits(["confirm-add", "cancel"]);

// State variables
const isModalOpen = ref(false);
interface DataItem {
  id: number;
  nama: string;
  total: number;
  status: string;
}

const selectedItems = ref<DataItem[]>([]);

// Dummy data for table
const dataItems = ref([
  // { id: 1, nama: 'Item A', total: 10, status: 'Aktif' },
  // { id: 2, nama: 'Item B', total: 5, status: 'Non-Aktif' },
  // { id: 3, nama: 'Item C', total: 8, status: 'Aktif' },
]);

// Table headers
const tableHeaders = [
  { title: "No", key: "id", align: "center" }, // Map "no" to a template for the "id"
  { title: "Nama", key: "nama" },
  { title: "Total", key: "total" },
  { title: "Status", key: "status" },
];

// Computed property for enabling the Tambah button
const isAddButtonEnabled = computed(() => selectedItems.value.length > 0);

// Methods
const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  emit("cancel");
};

const confirmSelection = () => {
  emit("confirm-add", selectedItems.value);
  closeModal();
};

const getStatusClass = (status: string) => {
  return status === "Aktif" ? "text-success" : "text-error";
};

const onSelectedItemsChange = (newSelectedItems: DataItem[]) => {
  selectedItems.value = newSelectedItems;
  console.log(selectedItems, "ini selected items");
};
</script>

<template>
  <VDialog v-model="isModalOpen" max-width="60svw">
    <template #activator="{ props }">
      <VBtn
        variant="outlined"
        prepend-icon="fa-plus"
        style="margin: 1svw"
        v-bind="props"
        @click="openModal"
      >
        Tambah
      </VBtn>
    </template>

    <VCard>
      <!-- Modal Header -->
      <VCardTitle>
        <div class="d-flex justify-space-between align-center w-100">
          <span class="text-h4">Tambah Outlet</span>
          <VBtn icon variant="text" elevation="0" @click="closeModal">
            <VIcon>mdi-close</VIcon>
          </VBtn>
        </div>
      </VCardTitle>

      <!-- Modal Body -->
      <VCardText>
        <div v-if="dataItems.length === 0" class="text-center">
          <img
            src="/assets/images/pages/empty-data.png"
            alt="No Data"
            class="mb-4"
            style="max-width: 150px"
          />
          <p>
            Jika data tidak sesuai atau tidak ada, silakan update data
            <a
              href="/profile-pelaku-usaha"
              class="text-primary text-decoration-underline"
              target="_blank"
            >
              Profile Pelaku Usaha
            </a>
          </p>
        </div>
        <VDataTable
          disable-sort
          v-else
          :headers="tableHeaders"
          :items="dataItems"
          v-model:selected-items="selectedItems"
          class="elevation-1"
          show-select
        >
          <template #item.no="{ item }">
            {{ item.id }}
          </template>
          <template #item.status="{ item }">
            <span :class="getStatusClass(item.status)">{{ item.status }}</span>
          </template>
        </VDataTable>
      </VCardText>

      <!-- Modal Footer -->
      <VCardActions class="mr-5">
        <VSpacer />
        <VBtn variant="outlined" @click="closeModal" color="grey">Batal</VBtn>
        <VBtn
          variant="flat"
          :disabled="!isAddButtonEnabled"
          color="primary"
          @click="confirmSelection"
        >
          Tambah
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<style scoped>
.text-center {
  text-align: center;
}
.text-success {
  color: #4caf50;
}
.text-error {
  color: #e53935;
}
.text-primary {
  color: #1976d2;
}
.text-decoration-underline {
  text-decoration: underline;
}
</style>
