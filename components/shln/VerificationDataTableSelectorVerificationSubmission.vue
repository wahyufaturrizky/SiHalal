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
  itemperpagesubmission: {
    type: Number,
    required: true,
  },
  loadingsubmission: {
    type: Boolean,
    required: true,
  },
  pagesubmission: {
    type: Number,
    required: true,
  },
  totalitemssubmission: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits<{
  (event: "add", selectedItems: any[]): void;
  (event: "cancel", message: string): void;
  (event: "handle-input-submission", searchQuerySubmission: string): void;
  (event: "update"): void;
}>();

const searchQuerySubmission = ref("");

const dialogVisible = ref(false);

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

const handleInput = () => {
  emit("handle-input-submission", searchQuerySubmission.value);
};
</script>

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
          v-model="searchQuerySubmission"
          density="compact"
          placeholder="Search Data"
          append-inner-icon="ri-search-line"
          style="max-width: 100%"
          @input="handleInput"
        />
      </VCol>
      <VRow>
        <VCol>
          <VDataTableServer
            v-model:items-per-page="props.itemperpagesubmission"
            v-model:page="props.pagesubmission"
            :loading="props.loadingsubmission"
            :items-length="props.totalitemssubmission"
            :headers="props.headers"
            :items="items"
            @update:options="emit('update')"
          >
            <template #item.id="{ index }">
              {{
                index +
                1 +
                (props.pagesubmission - 1) * props.itemperpagesubmission
              }}
            </template>
            <template #item.check="{ item }">
              <VCheckbox v-model="checkedItems[item.no]" />
            </template>
          </VDataTableServer>
        </VCol>
      </VRow>
      <VRow class="mt-3">
        <VCol class="d-flex justify-end">
          <VBtn
            color="primary"
            variant="outlined"
            class="mr-2"
            @click="cancelSelection"
          >
            Cancel
          </VBtn>
          <VBtn color="primary" @click="addSelection">
            Add ({{ checkedItemsCount }})
          </VBtn>
        </VCol>
      </VRow>
    </VCard>
  </VDialog>
</template>

<style scoped lang="scss"></style>
