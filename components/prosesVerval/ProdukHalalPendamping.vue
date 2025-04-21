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
    type: Object as PropType<Record<string, any>>,
    required: true,
  },
  itemsPerPage: {
    type: Number,
    default: 10,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
});

const route = useRoute();
const emit = defineEmits(["confirm-add", "confirm-delete"]);

const handleAddProduk = (result: boolean) => {
  emit("confirm-add", result);
};

const handleDeleteProduk = async (idProduk: string) => {
  try {
    const response = await $api(
      `/self-declare/proses-verval/${route.params?.id}/product-delete`,
      {
        method: "post",
        body: {
          idProduk,
        },
      }
    );

    if (response.code !== 2000) {
      useSnackbar().sendSnackbar("Gagal menghapus produk", "error");
      return;
    }

    // Update content to remove the deleted item
    content.value = content.value.filter((item) => item.id !== idProduk);

    emit("confirm-delete", true);
    useSnackbar().sendSnackbar("Berhasil menghapus produk", "success");
  } catch (error) {
    useSnackbar().sendSnackbar("Gagal menghapus produk", "error");
    console.error("Error during deletion:", error);
  }
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

const validationErrorRibbon = ref(false);

const openValidationErrorRibbon = () => {
  validationErrorRibbon.value = true;
};

defineExpose({
  openValidationErrorRibbon,
});
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
      <VRow>
        <VCol cols="12">
          <VAlert
            closable
            type="error"
            text="Produk belum sepenuhnya dipilih"
            v-if="validationErrorRibbon"
          ></VAlert>
        </VCol>
      </VRow>
      <br />
      <VDataTable
        disable-sort
        :items-per-page-options="[10, 25, 50, 100]"
        :headers="tableHeader"
        :items="content"
        hide-default-footer
      >
        <template #item.no="{ index }">
          <div>
            {{
              ((props.currentPage || 1) - 1) * (props.itemsPerPage || 10) +
              index +
              1
            }}
          </div>
        </template>
        <template #item.action="{ item }">
          <VBtn variant="text" @click="handleDeleteProduk(item.id)">
            <template #default>
              <VIcon style="color: red" icon="fa-trash"></VIcon>
            </template>
          </VBtn>
        </template>
      </VDataTable>
    </VCardItem>
  </VCard>
</template>
