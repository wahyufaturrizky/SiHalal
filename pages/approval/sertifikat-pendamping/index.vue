<script setup lang="ts">
interface DataUser {
  id: string;
  username: string;
  nama: string;
  email: string;
  password?: string;
  phone_no: string;
  is_verify: boolean;
  roles: Array<{ name: string }>;
}

const tableHeaders: any[] = [
  { title: "No", key: "no", sortable: false },
  { title: "NIK", key: "nik", nowrap: true },
  { title: "Nama", key: "nama", nowrap: true },
  { title: "Tanggal Lahir", key: "tgl_lahir", nowrap: true },
  { title: "Pendidikan", key: "pendidikan", nowrap: true },
  { title: "Lembaga", key: "namaLembaga", nowrap: true },
  { title: "JenisLembaga", key: "jenisLembaga", nowrap: true },
  { title: "Status", key: "status", nowrap: true },
  { title: "Action", key: "actions", sortable: false, align: "center" },
];

const tableItems = ref<Array[]>([]);
const currentPage = ref(1);
const itemPerPage = ref(10);
const totalItems = ref(0);
const selectedItem = ref([]);
const pendampingItems = ref([]);
const isLoading = ref(false);
const isLoadingPendamping = ref(false);
const tableType = ref("Pilih lembaga");

const handleLoadList = async () => {
  try {
    const response: any = await $api("/approval/sertifikat-pendamping/list", {
      method: "get",
      params: {
        page: currentPage.value,
        size: itemPerPage.value,
        type: tableType.value,
      },
    } as any);

    if (response.code === 2000) {
      if (response.data !== null) {
        response.data.map((el: any) => (el.id = el.id_pendamping));
        tableItems.value = response.data;
        currentPage.value = response.current_page;
        totalItems.value = response.total_item;
      } else {
        tableItems.value = [];
        currentPage.value = 1;
        totalItems.value = 0;
      }

      return response;
    }
  } catch (error) {
    console.error(error);
  }
};

const { refresh } = await useAsyncData(
  "user-list",
  async () => await handleLoadList(),
  {
    watch: [currentPage, itemPerPage, tableType],
  }
);

const getTypePendamping = async () => {
  try {
    isLoadingPendamping.value = true;

    const response: any = await $api("/approval/sertifikat-pendamping/type", {
      method: "get",
    } as any);

    if (response) {
      pendampingItems.value = response;
    }
    isLoadingPendamping.value = false;

    return response;
  } catch (error) {
    isLoadingPendamping.value = false;
    console.error(error);
  }
};

const onApprove = async () => {
  try {
    const response: any = await $api(
      "/approval/sertifikat-pendamping/approve",
      {
        method: "post",
        body: {
          id: selectedItem.value,
        },
      }
    );

    if (response.code !== 2000) {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
      selectedItem.value = [];
      refresh();

      return;
    }
    const totalError = response?.message?.errors;
    const totalSuccess = response?.message?.success;
    const message: any[] = [];
    if (totalError > 0) message.push(`Gagal setujui sebanyak ${totalError}`);
    if (totalSuccess > 0)
      message.push(`Sukses setujui sebanyak ${totalSuccess}`);
    useSnackbar().sendSnackbar(
      `Pendamping ${message.join()}`,
      totalSuccess > 0 ? "success" : "error"
    );
    selectedItem.value = [];
    refresh();
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

onMounted(() => {
  getTypePendamping();
});

const getChipColor = (status: string) => {
  if (status === "Pengajuan") return "success";

  return "primary";
};

const unduhFile = async (file: string) => {
  await downloadDocument(file, "PENDAMPING_SERT_UPLOAD");
};
</script>

<template>
  <VRow>
    <VCol>
      <h2 style="font-size: 32px">Sertifikat Pendamping</h2>
    </VCol>
  </VRow>
  <VRow>
    <VCol>
      <VCard class="w-100 py-3">
        <VCardTitle
          class="d-flex justify-space-between align-center font-weight-bold text-h4"
        >
          <div>List Sertifikat Pendamping</div>
          <DialogApprovalData
            title="Persetujui data"
            button-text="Ya, Setujui"
            :on-approve="onApprove"
            :disabled="selectedItem.length === 0"
          >
            <template #contentDelete>
              Anda yakin setujui {{ selectedItem.length }} data ?
            </template>
          </DialogApprovalData>
        </VCardTitle>
        <VCardItem>
          <VRow>
            <VCol cols="12" sm="4">
              <VSelect
                v-model="tableType"
                :items="pendampingItems"
                item-title="nama_lembaga"
                item-value="id_lp"
                class="mb-5"
                :loading="isLoadingPendamping"
              />
            </VCol>
          </VRow>
          <VCard variant="outlined">
            <VDataTableServer
              :items-per-page-options="[10, 25, 50, 100]"
              v-model:items-per-page="itemPerPage"
              v-model:page="currentPage"
              v-model="selectedItem"
              :items-length="totalItems"
              class="custom-table"
              :headers="tableHeaders"
              :items="tableItems"
              :loading="isLoading"
              :hide-default-footer="tableItems.length === 0"
              show-select
              hover
            >
              <template #no-data>
                <VCard variant="" class="w-full mt-7 mb-5">
                  <div class="pt-2" style="justify-items: center">
                    <img
                      src="~/assets/images/empty-data.png"
                      alt="empty_data"
                    />
                    <div class="pt-2 pb-2 font-weight-bold">Data Kosong</div>
                  </div>
                </VCard>
              </template>
              <template #item.no="{ index }">
                {{ index + 1 + (currentPage - 1) * itemPerPage }}
              </template>
              <template #item.phone_no="{ item }">
                {{ item.phone_no ? item.phone_no : "-" }}
              </template>
              <template #item.namaLembaga="{ item }">
                {{ item.Lembaga?.nama_lembaga }}
              </template>
              <template #item.jenisLembaga="{ item }">
                {{ item.Lembaga?.jenisLembaga }}
              </template>
              <template #item.status="{ item }">
                <div class="d-flex flex-wrap">
                  <VChip
                    :key="item.id"
                    :color="getChipColor(item.status)"
                    label
                    class="ma-1"
                  >
                    Pengajuan
                  </VChip>
                </div>
              </template>
              <template #item.actions="{ item }">
                <div class="d-flex gap-1">
                  <IconBtn size="small">
                    <div>
                      <VIcon
                        icon="ri-arrow-right-line"
                        color="primary"
                        @click="() => unduhFile(item.fotosertifikat)"
                      />
                    </div>
                  </IconBtn>
                  <!-- Right arrow icon for action -->
                </div>
              </template>
            </VDataTableServer>
          </VCard>
        </VCardItem>
      </VCard>
    </VCol>
  </VRow>
</template>

<style scoped lang="scss">
:deep(.v-data-table.custom-table > .v-table__wrapper) {
  table {
    thead > tr > th:last-of-type {
      position: sticky;
      border-inline-start: 1px solid rgba(#000, 0.12);
      inset-inline-end: 0;
    }

    tbody > tr > td:last-of-type {
      position: sticky;
      background: white;
      border-inline-start: 1px solid rgba(#000, 0.12);
      inset-inline-end: 0;
      justify-items: center;
    }
  }
}
</style>
