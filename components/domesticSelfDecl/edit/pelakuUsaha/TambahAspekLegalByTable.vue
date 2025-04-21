<script setup lang="ts">
const { canNotEdit } = defineProps({
  canNotEdit: {
    type: Boolean,
  },
});

const tableHeader: any[] = [
  { title: "No", value: "no", nowrap: true },
  { title: "Jenis", value: "jenis_surat", nowrap: true },
  { title: "No Dokumen", value: "no_surat", nowrap: true },
  { title: "Tanggal", value: "tgl_surat", nowrap: true },
  { title: "Masa Berlaku", value: "masa_berlaku", nowrap: true },
  { title: "Instansi Penerbit", value: "instansi_penerbit", nowrap: true },
  { title: "Action", value: "action", align: "center" },
];

const legalData = ref([
  // {
  //   id: 1,
  //   jenis: "xx",
  //   doc_no: "xx",
  //   date: "xx",
  //   effective_date: "xx",
  //   publisher: "xx",
  // },
  // {
  //   id: 2,
  //   jenis: "xx",
  //   doc_no: "xx",
  //   date: "xx",
  //   effective_date: "xx",
  //   publisher: "xx",
  // },
]);
const route = useRoute<"">();
const submissionId = route.params?.id;

const selected = ref([]);
const addText = computed(() => {
  return selected.value.length ? `Tambah (${selected.value.length})` : "Tambah";
});
const getLegalList = async () => {
  try {
    const response: any = await $api(
      `/self-declare/business-actor/legal/list`,
      {
        method: "get",
        query: {
          page: 1,
          size: 10,
          id_reg: submissionId,
        },
      }
    );
    if (response.code === 2000) {
      legalData.value = response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

const emit = defineEmits(["submit"]);
const handleSubmit = () => {
  emit("submit", selected.value);
  selected.value = [];
};

onMounted(() => {
  getLegalList();
});
</script>

<template>
  <VDialog max-width="60svw">
    <template #activator="{ props: openModal }">
      <VBtn
        v-if="!canNotEdit"
        v-bind="openModal"
        variant="outlined"
        append-icon="fa-plus"
      >
        Tambah
      </VBtn>
    </template>
    <template #default="{ isActive }">
      <VCard>
        <VCardTitle>
          <VRow>
            <VCol cols="10" style="display: flex; align-items: center"
              ><h3>Tambah Aspek Legal</h3></VCol
            >
            <VCol cols="2" style="display: flex; justify-content: end">
              <VCol cols="2" style="display: flex; justify-content: end"
                ><VIcon
                  size="small"
                  icon="fa-times"
                  @click="isActive.value = false"
                ></VIcon
              ></VCol>
            </VCol>
          </VRow>
        </VCardTitle>
        <VCardItem>
          <VDataTable
            disable-sort
            :headers="tableHeader"
            :items="legalData"
            class="custom-table"
            hide-default-footer
          >
            <template #item.no="{ index }">
              {{ index + 1 }}
            </template>
            <template #item.tgl_surat="{ item }: any">
              {{ item.tgl_surat ? item.tgl_surat : "-" }}
            </template>
            <template #item.masa_berlaku="{ item }: any">
              {{ item.masa_berlaku ? item.masa_berlaku : "-" }}
            </template>
            <template #item.action="{ item }: any">
              <VCheckbox v-model="selected" :value="item.id_legal" />
            </template>
          </VDataTable>
        </VCardItem>
        <VCardText v-if="!legalData.length">
          <div
            class="d-flex justify-center align-center pa-3 rounded-lg"
            style="background-color: #f6f6f6"
          >
            <VIcon
              size="24px"
              icon="ri-information-2-fill"
              color="primary"
              class="me-1"
            />
            <div>
              Jika data tidak sesuai atau tidak ada, silakan update data Profile
              <nuxt-link
                to="/pelaku-usaha"
                class="font-weight-bold text-decoration-underline"
                >Pelaku Usaha</nuxt-link
              >
            </div>
          </div>
        </VCardText>
        <VCardActions
          style="display: flex; justify-content: end; padding: 1.5svw"
        >
          <div>
            <VBtn @click="isActive.value = false" variant="outlined">
              Batal
            </VBtn>
            <VBtn
              variant="flat"
              :color="selected.length ? 'primary' : '#A09BA1'"
              @click="
                selected.length
                  ? [handleSubmit(), (isActive.value = false)]
                  : null
              "
            >
              {{ addText }}
            </VBtn>
          </div>
        </VCardActions>
      </VCard>
    </template>
  </VDialog>
</template>

<style scoped lang="scss">
:deep(.v-data-table.custom-table > .v-table__wrapper) {
  table {
    thead > tr > th:last-of-type {
      right: 0;
      position: sticky;
      border-left: 1px solid rgba(#000000, 0.12);
    }
    tbody > tr > td:last-of-type {
      right: 0;
      position: sticky;
      border-left: 1px solid rgba(#000000, 0.12);
      background: white;
    }
  }
}
</style>
