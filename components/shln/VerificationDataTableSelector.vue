<template>
  <VBtn variant="flat" block append-icon="ri-add-line" @click="openDialog">
    Add Submission
  </VBtn>

  <!-- Add v-model to control dialog visibility -->
  <VDialog v-model="dialogVisible" :max-width="dialogMaxWidth">
    <VCard class="pa-4">
      <p class="text-h4">Submission</p>
      <VCol class="d-flex justify-sm-space-between align-center" cols="5">
        <VTextField
          v-model="searchQuery"
          density="compact"
          placeholder="Search Data"
          append-inner-icon="ri-search-line"
          style="max-width: 100%"
        />
      </VCol>
      <VRow>
        <VCol>
          <VDataTable
            :items-per-page-options="[10, 25, 50, 100]"
            :headers="props.headers"
            :items="filteredItems"
          >
            <template #item.check="{ item }">
              <VCheckbox v-model="checkedItems[item.no]" />
            </template>
          </VDataTable>
        </VCol>
      </VRow>
      <VRow class="mt-3">
        <VCol class="d-flex justify-end">
          <VBtn
            @click="cancelSelection"
            color="primary"
            variant="outlined"
            class="mr-2"
            >Cancel</VBtn
          >
          <VBtn @click="addSelection" color="primary"
            >Add ({{ checkedItemsCount }})</VBtn
          >
        </VCol>
      </VRow>
    </VCard>
  </VDialog>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps, ref } from "vue";
import { useDisplay } from "vuetify";

const props = defineProps({
  headers: {
    type: Array,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits<{
  (event: "add", selectedItems: any[]): void;
  (event: "cancel", message: string): void;
}>();

const dialogVisible = ref(false);

const searchQuery = ref("");

const filteredItems = computed(() => {
  if (!searchQuery.value) {
    return props.items;
  }

  return props.items.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  );
});

const checkedItems = ref<{ [key: string]: boolean }>({});

const itemsWithCheckbox = computed(() => {
  return props.items.map((item) => ({
    ...item,
    isChecked: checkedItems.value[item.no] || false,
  }));
});

const checkedItemsCount = computed(() => {
  return itemsWithCheckbox.value.filter((item) => item.isChecked).length;
});

const cancelSelection = () => {
  Object.keys(checkedItems.value).forEach((key) => {
    checkedItems.value[key] = false;
  });
  emit("cancel", "Selection canceled");
  dialogVisible.value = false;
};

const addSelection = () => {
  const selectedItems = Object.keys(checkedItems.value)
    .filter((key) => checkedItems.value[key])
    .map((key) => {
      return props.items.find((item) => item.no === key);
    });

  // Emit add event and close dialog
  emit("add", selectedItems);
  dialogVisible.value = false;
};

const { mdAndUp } = useDisplay();
const dialogMaxWidth = computed(() => {
  return mdAndUp.value ? 1100 : "90%";
});

// Function to open the dialog
const openDialog = () => {
  dialogVisible.value = true;
};
</script>

<style scoped lang="scss"></style>
