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

const countPersyaratan = ref({
  countProses: 0,
  countSjph: 0,
});

const disableAddProses = ref(false);

watch(
  () => props.data,
  async (newData) => {
    content.value = newData;

    if (newData) {
      content.value.forEach((val) => {
        if (parseInt(val.persyaratan) == 0) {
          countPersyaratan.value.countProses += 1;
        } else if (parseInt(val.persyaratan) == 1) {
          countPersyaratan.value.countSjph += 1;
        }
      });

      if (
        countPersyaratan.value.countSjph > 0 &&
        countPersyaratan.value.countProses > 0
      ) {
        disableAddProses.value = true;
      }
    }
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

const validationErrorRibbon = ref(false);

const openValidationErrorRibbon = () => {
  validationErrorRibbon.value = true;
};

defineExpose({
  openValidationErrorRibbon,
});

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
            :disable-add="disableAddProses"
            :modal-type="modalTypeEnum.ADD"
            @emit-add="handleAddBahan"
          ></ModalProsesProdukHalalVerval>
        </VCol>
      </VRow>
    </VCardTitle>
    <VCardItem>
      <VRow>
        <VCol cols="12">
          <VAlert
            closable
            type="error"
            text="Proses Produk belum sepenuhnya dipilih"
            v-if="validationErrorRibbon"
          ></VAlert>
        </VCol>
      </VRow>
      <br />
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
