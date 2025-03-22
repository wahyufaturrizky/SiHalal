<script setup lang="ts">
import { modalTypeEnum } from "./verval-enum";

const tableHeader = [
  { title: "No", value: "no" },
  { title: "Nama Bahan", value: "nama_bahan" },
  { title: "Diragukan / Tidak Diragukan", value: "status" },
  { title: "Temuan", value: "temuan" },
  { title: "Keterangan", value: "keterangan" },
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
  isTemuanCanEdit: {
    type: Boolean,
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

const emit = defineEmits(["confirm-add", "confirm-delete"]);

const handleAddBahan = (result: boolean) => {
  emit("confirm-add", result);
};

const handleDeleteBahan = async (idBahan: string) => {
  try {
    const response = await $api(
      `/self-declare/proses-verval/${props.idReg}/ingredient-delete`,
      {
        method: "post",
        body: {
          idBahan,
        },
      }
    );

    if (response.code !== 2000) {
      useSnackbar().sendSnackbar("Gagal menghapus proses", "error");
      return;
    }

    // Update content to remove the deleted item
    content.value = content.value.filter((item) => item.id_bahan !== idBahan);

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
            :list-bahan="content"
            :is-temuan-can-edit="props.isTemuanCanEdit"
            @emit-add="handleAddBahan"
          ></ModalBahanPendampingVerval
        ></VCol>
      </VRow>
    </VCardTitle>
    <VCardItem>
      <VRow>
        <VCol cols="12">
          <VAlert
            closable
            type="error"
            text="Bahan belum sepenuhnya dipilih"
            v-if="validationErrorRibbon"
          ></VAlert>
        </VCol>
      </VRow>
      <br />
      <VDataTable :headers="tableHeader" :items="content" hide-default-footer>
        <template #item.no="{ index }">
          <div>
            {{
              ((props.currentPage || 1) - 1) * (props.itemsPerPage || 10) +
              index +
              1
            }}
          </div>
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
                :id-bahan="item.id_bahan"
                :list-bahan="content"
                @emit-add="handleAddBahan"
                :is-temuan-can-edit="props.isTemuanCanEdit"
              ></ModalBahanPendampingVerval>
              <VListItem @click="handleDeleteBahan(item.id_bahan)">
                <template #prepend>
                  <VIcon style="color: red" icon="fa-trash"></VIcon>
                </template>
                <template #append> Hapus </template>
              </VListItem>
            </VList>
          </VMenu>
        </template>
      </VDataTable>
    </VCardItem>
  </VCard>
</template>
