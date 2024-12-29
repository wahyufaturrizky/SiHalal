<script setup lang="ts">
import { modalTypeEnum } from "./verval-enum";

const tableHeader = [
  { title: "No", value: "no" },
  { title: "Kriteria", value: "kriteria" },
  { title: "Pertanyaan", value: "pertanyaan" },
  { title: "Jawaban", value: "jawaban" },
  { title: "Action", value: "action" },
];

const content = ref([]);

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["confirm-add"]);

const handleAddProduk = (result: boolean) => {
  emit("confirm-add", result);
};

watch(
  () => props.data,
  async (newData) => {
    if (newData) {
      content.value = newData;
    }
  },
  { immediate: true }
);
</script>
<template>
  <VCard>
    <VCardTitle>
      <VRow>
        <VCol cols="6"><h3>Produk</h3></VCol>
        <VCol cols="6" style="display: flex; justify-content: end"
          ><ModalProdukHalalVerval
            :modal-type="modalTypeEnum.ADD"
            @emit-add="handleAddProduk"
          ></ModalProdukHalalVerval
        ></VCol>
      </VRow>
    </VCardTitle>
    <VCardItem>
      <VDataTable :headers="tableHeader" :items="content" hide-default-footer>
        <template #item.no="{ index }">
          {{ index + 1 }}
        </template>
        <template #item.action>
          <VIcon style="color: red" icon="fa-trash"></VIcon>
        </template>
      </VDataTable>
    </VCardItem>
  </VCard>
</template>
