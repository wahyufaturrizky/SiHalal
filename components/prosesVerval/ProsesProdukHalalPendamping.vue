<script setup lang="ts">
import { modalTypeEnum } from "./verval-enum";

interface prosesProdukIntf {
  id: string;
  requirement: string;
  explanation: string;
}

const route = useRoute();

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
    content.value = newData;
  },
  { immediate: true }
);

const emit = defineEmits(["confirm-add", "confirm-delete"]);

const handleAddBahan = (result: boolean) => {
  emit("confirm-add", result);
};

const handleDeleteProsesProduk = async (idProses: string) => {
  try {
    const response = await $api(
      `/self-declare/proses-verval/${route.params?.id}/product-process-delete`,
      {
        method: "post",
        body: {
          idProses,
        },
      }
    );

    if (response.code !== 2000) {
      useSnackbar().sendSnackbar("Gagal menghapus proses", "error");
      return;
    }

    // Update content to remove the deleted item
    content.value = content.value.filter(
      (item: prosesProdukIntf) => item.id !== idProses
    );

    emit("confirm-delete", true);
    useSnackbar().sendSnackbar("Berhasil menghapus proses", "success");
  } catch (error) {
    useSnackbar().sendSnackbar("Gagal menghapus proses", "error");
    console.error("Delete failed:", error);
  }
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
          <VBtn variant="text" @click="handleDeleteProsesProduk(item.id)">
            <template #default>
              <VIcon style="color: red" icon="fa-trash"></VIcon>
            </template>
          </VBtn>
        </template>
      </VDataTable>
    </VCardItem>
  </VCard>
</template>
