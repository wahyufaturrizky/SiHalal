<script setup lang="ts">
import { modalTypeEnum } from "./verval-enum";

interface prosesProdukIntf {
  id: string;
  requirement: string;
  explanation: string;
}

const tableHeader = [
  { title: "No", value: "no" },
  { title: "Persyaratan", value: "persyaratan" },
  { title: "Penjelasan", value: "penjelasan" },
  { title: "Action", value: "action" },
];

const content = ref([]);

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

watch(
  () => props.data,
  async (newData) => {
    if (newData) {
      content.value = newData;
    }
  },
  { immediate: true }
);

const emit = defineEmits(["confirm-add"]);

const handleAddBahan = (result: boolean) => {
  emit("confirm-add", result);
};

const onOpenModal = async () => {
  // resetForm();
};
</script>
<template>
  <VCard>
    <VCardTitle>
      <VRow>
        <VCol cols="6"><h3>Proses Produk Halal</h3></VCol>
        <VCol cols="6" style="display: flex; justify-content: end">
          <ModalProsesProdukHalalVerval
            :modal-type="modalTypeEnum.ADD"
            @emit-add="handleAddBahan"
          ></ModalProsesProdukHalalVerval>
        </VCol>
      </VRow>
    </VCardTitle>
    <VCardItem>
      <VDataTable :headers="tableHeader" :items="content" hide-default-footer>
        <template #item.no="{ index }">
          {{ index + 1 }}
        </template>
        <template #item.persyaratan="{ item }">
          {{
            item.persyaratan === 0
              ? "Proses"
              : item.persyaratan === 1
              ? "Kriteria SJPH"
              : "-"
          }}
        </template>
        <template #item.action="{ item }">
          <VIcon style="color: red" icon="fa-trash"></VIcon>
        </template>
      </VDataTable>
    </VCardItem>
  </VCard>
</template>
