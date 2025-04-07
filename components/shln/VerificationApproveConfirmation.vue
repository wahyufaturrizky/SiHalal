<script setup lang="ts">
import VerificationSaveConfirmation from "@/components/shln/VerificationSaveConfirmation.vue";
import { computed, defineEmits, ref } from "vue";
import { useDisplay } from "vuetify";

const emit = defineEmits(["confirm", "cancel"]);

const inputValue = ref("");

const headers = [
  { title: "Tanggal", key: "date" },
  { title: "Catatan", key: "notes" },
  { title: "Verifikator", key: "verifikator" },
];

const items = ref([
  { date: "18/10/2024, 09:00:00 AM", notes: "", verifikator: "Joey, HLN" },
]);

const isVisible = ref(false);

const openDialog = () => {
  isVisible.value = true;
};

const closeDialog = () => {
  isVisible.value = false;
};

const confirm = () => {
  closeDialog();
  emit("confirm");
};

const cancel = () => {
  emit("cancel");
  closeDialog();
};

const saveNotes = () => {
  if (inputValue.value.trim() !== "") {
    items.value.push({
      date: new Date().toLocaleString(),
      notes: inputValue.value,
      verifikator: "User 1",
    });
    inputValue.value = ""; // Clear input after adding
  }
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
      color="success"
      append-icon="ri-check-line"
      @click="openDialog"
    >
      Approve
    </VBtn>

    <VDialog v-model="isVisible" :max-width="dialogMaxWidth">
      <VCard>
        <VCardTitle
          class="text-h5 font-weight-bold d-flex justify-space-between align-center"
        >
          <span>Approve Confirmation</span>
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
        <VCardItem>
          <VDataTable :headers="headers" :items="items">
            <template #item.date="{ item }">
              {{ item.date ? formatDateId(item.date) : "NA" }}
            </template>
          </VDataTable>
        </VCardItem>
        <VCardText>
          <p class="mb-2">Are you sure you want to approve this submission?</p>
          <VTextarea
            v-model="inputValue"
            placeholder="Input Additional Notes"
            clearable
            auto-grow
            dense
            outlined
            :style="{ maxWidth: '100%' }"
          />
        </VCardText>
        <VCardActions>
          <VBtn variant="outlined" text @click="cancel"> Cancel </VBtn>
          <VBtn variant="flat" color="primary" text @click="saveNotes">
            Save Notes
          </VBtn>
          <VerificationSaveConfirmation @confirm="confirm" />
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>

<style scoped></style>
