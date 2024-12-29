<script setup lang="ts">
import { modalTypeEnum } from "./verval-enum";

const tableHeader = [
  { title: "No", value: "no" },
  { title: "Nama Bahan", value: "nama_bahan" },
  { title: "Diragukan / Tidak Diragukan", value: "status" },
  { title: "Temuan", value: "temuan" },
  { title: "Catatan", value: "keterangan" },
  { title: "Action", value: "action" },
];

const content = ref([]);

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  idReg: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["confirm-add"]);

const handleAddBahan = (result: boolean) => {
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
        <VCol cols="6"><h3>Bahan</h3></VCol>
        <VCol cols="6" style="display: flex; justify-content: end">
          <ModalBahanPendampingVerval
            :modal-type="modalTypeEnum.ADD"
            :id-reg="props.idReg"
            @emit-add="handleAddBahan"
          ></ModalBahanPendampingVerval
        ></VCol>
      </VRow>
    </VCardTitle>
    <VCardItem>
      <VDataTable :headers="tableHeader" :items="content" hide-default-footer>
        <template #item.no="{ index }">
          {{ index + 1 }}
        </template>
        <template #item.status="{ item }">
          {{
            item.status === 0
              ? "Diragukan"
              : item.status === 1
              ? "Tidak Diragukan"
              : "-"
          }}
        </template>
        <template #item.action="{ item }">
          <VMenu>
            <template #activator="{ props }">
              <VIcon icon="fa-ellipsis-v" v-bind="props"></VIcon>
            </template>

            <VList>
              <ModalBahanPendampingVerval
                :modal-type="modalTypeEnum.EDIT"
                :id-bahan="item.id"
              ></ModalBahanPendampingVerval>
              <VListItem style="color: red" prepend-icon="fa-trash"
                >Hapus</VListItem
              >
            </VList>
          </VMenu>
        </template>
      </VDataTable>
    </VCardItem>
  </VCard>
</template>
