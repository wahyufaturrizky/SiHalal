<!-- eslint-disable regex/invalid -->
<script setup lang="ts">
import { useDisplay } from 'vuetify';

const { mdAndUp } = useDisplay()
const isLoading = ref<boolean>(false)
const tableItems = ref<any[]>([])
const totalItems = ref<number>(0);
const currentPage = ref<number>(1)
const itemPerPage = ref<number>(10)

const tableHeaders: any[] = [
  { title: 'No', value: 'index' },
  { title: 'No. Tagihan', value: 'no_tagihan', nowrap: true },
  { title: 'Tanggal', value: 'tanggal', nowrap: true },
  { title: 'Total', value: 'total', nowrap: true },
  { title: 'Status', value: 'status', nowrap: true },
  { title: 'Bukti Bayar', value: 'bukti_url ', nowrap: true },
  { title: 'Invoice', value: 'invoice_url', nowrap: true },
  // { title: 'Action', value: 'actions', align: 'center' },
]

// const dummyData = [
//   {
//     id: '1',
//     no_tagihan: '317307981729837',
//     tanggal: '16/01/2024',
//     total: '100.000.000',
//     status: 'Terbayar',
//     bukti_url : 'A',
//     invoice_url: 'A',
//   },
//   {
//     id: '2',
//     no_tagihan: '317307981729837',
//     tanggal: '21/01/2024',
//     total: '50.000.000',
//     status: 'Terbayar',
//     bukti_url : 'A',
//     invoice_url: 'A',
//   },
//   {
//     id: '3',
//     no_tagihan: '317307981729837',
//     tanggal: '04/03/2024',
//     total: '75.000.000',
//     status: 'Terbayar',
//     bukti_url : 'A',
//     invoice_url: 'A',
//   },
//   {
//     id: '4',
//     no_tagihan: '317307981729837',
//     tanggal: '09/03/2024',
//     total: '35.000.000',
//     status: 'Terbayar',
//     bukti_url : 'A',
//     invoice_url: 'A',
//   },
//   {
//     id: '5',
//     no_tagihan: '317307981729837',
//     tanggal: '10/04/2024',
//     total: '20.000.000',
//     status: 'Terbayar',
//     bukti_url : 'A',
//     invoice_url: 'A',
//   },
// ]

const loadItem = async () => {
  isLoading.value = true
  try {
    const response: any = await $api('/reguler/lph/bpjph-bill/list', {
      method: 'get',
      params: {
        page: currentPage.value,
        size: itemPerPage.value,
      },
    } as any)

    if (response?.code === 2000) {
      tableItems.value = response?.data
      currentPage.value = response?.current_page;
      totalItems.value = response.total_item;
    } else {
      tableItems.value = [];
      currentPage.value = 1;
      totalItems.value = 0;
    }
    isLoading.value = false
    return response
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
    isLoading.value = false
  }
}
useAsyncData(
  "bpjph-bill-list",
  async () => await loadItem(),
  {
    watch: [currentPage, itemPerPage],
  }
);

const handleDownload = async (filename: string) => {
  return await downloadDocument(filename)
}

// const selectedBill = ref("");
// const isOpenDeleteModal = ref(false);
// const handleOpenDeleteModal = (id?: string | null) => {
//   if (id) selectedBill.value = id;
//   isOpenDeleteModal.value = !isOpenDeleteModal.value;
// };
// const handleConfirmDelete = async () => {
//   return
// }

onMounted(() => {
  loadItem()
})
</script>

<template>
  <VRow no-gutters>
    <VCol>
      <h1 style="font-size: 32px">
        Daftar Tagihan ke BPJPH
      </h1>
    </VCol>
  </VRow>
  <VRow>
    <VCol>
      <VCard>
        <VCardTitle class="my-3 d-flex justify-space-between align-center">
          <div class="text-h4 font-weight-bold">
            Daftar Tagihan
          </div>
        </VCardTitle>
        <VCardText>
          <VDataTableServer
            class="bill-table border rounded mt-5"
            :headers="tableHeaders"
            :items="tableItems"
            :items-length="totalItems"
            v-model:items-per-page="itemPerPage"
            v-model:page="currentPage"
            :loading="isLoading"
            :hide-default-footer="tableItems.length === 0"
          >
            <template #no-data>
              <div class="w-full mt-2">
                <div
                  class="pt-2"
                  style="justify-items: center"
                >
                  <img
                    src="~/assets/images/empty-data.png"
                    alt="empty_data"
                  >
                  <div class="pt-2 pb-2 font-weight-bold">
                    Data Kosong
                  </div>
                </div>
              </div>
            </template>
            <template #item.index="{ index }">
              {{ index + 1 + (currentPage - 1) * itemPerPage }}
            </template>
            <template #item.bukti_url ="{ item }">
              <VBtn
                v-if="item.bukti_url "
                class="px-3 ms-2 d-flex align-center"
                variant="flat"
              >
                <VIcon
                  icon="fa-download"
                  @click="handleDownload(item.bukti_url )"
                />
              </VBtn>
              <div v-else>
                -
              </div>
            </template>
            <template #item.invoice_url="{ item }">
              <VBtn
                v-if="item.invoice_url"
                class="px-3 ms-2 d-flex align-center"
                variant="flat"
              >
                <VIcon
                  icon="fa-eye"
                  @click="handleDownload(item.invoice_url)"
                />
              </VBtn>
              <div v-else>
                -
              </div>
            </template>
            <template #item.status="{ item }">
              <VChip
                variant="outlined"
                class="active-chip"
              >
                <span>
                  {{ item.status }}
                </span>
              </VChip>
            </template>
            <!-- <template #item.actions="{ item }">
              <VIcon
                icon="mdi-delete"
                color="error"
                size="x-large"
                @click="handleOpenDeleteModal(item.id)"
              />
            </template> -->
          </VDataTableServer>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
  <!-- <ConfirmModal
    dialog-title="Delete Confirmation"
    :dialog-visible="isOpenDeleteModal"
    @update:dialog-visible="isOpenDeleteModal = $event"
  >
    <VCardText> Apakah Anda yakin akan menghapus data ini? </VCardText>
    <VCardActions class="px-4">
      <VBtn variant="outlined" class="px-4 me-3" @click="handleOpenDeleteModal"
        >Batal</VBtn
      >
      <VBtn
        variant="flat"
        class="px-4"
        color="error"
        @click="[handleConfirmDelete(), handleOpenDeleteModal()]"
      >
        Ya, Hapus
      </VBtn>
    </VCardActions>
  </ConfirmModal> -->
</template>

<style scoped lang="scss">
.active-chip {
  border: 1px solid #49a84c !important;
  border-radius: 8px;
  background-color: #edf6ed;

  span {
    color: #49a84c;
  }
}
// .inactive-chip {
//   border: 1px solid #e1442e !important;
//   border-radius: 8px;
//   background-color: #fcecea;

//   span {
//     color: #e1442e;
//   }
// }
// :deep(.v-data-table.bill-table > .v-table__wrapper) {
//   table {
//     thead > tr > th:last-of-type {
//       right: 0;
//       position: sticky;
//       border-left: 1px solid rgba(#000000, 0.12);
//     }
//     tbody > tr > td:last-of-type {
//       right: 0;
//       position: sticky;
//       border-left: 1px solid rgba(#000000, 0.12);
//       background: white;
//     }
//   }
// }

// :deep(.v-data-table.bill-table > .v-data-table-footer) {
//   .v-data-table-footer__info {
//     display: none;
//   }
// }
</style>
