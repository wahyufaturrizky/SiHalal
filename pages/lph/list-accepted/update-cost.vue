<script setup lang="ts">
const router = useRouter();

const domesticAuditHeader: any[] = [
  { title: "No", key: "index" },
  { title: "Nama Fasilitas Produksi", key: "placeName", nowrap: true },
  { title: "Man Day;s", key: "manDay" },
  { title: "Unit Cost Awal", key: "startCost", nowrap: true },
  { title: "Diskon (%)", key: "firstDiscount", nowrap: true },
  { title: "Unit Cost Akhir", key: "endCost", nowrap: true },
  { title: "UHPD Awal", key: "startUhpd", nowrap: true },
  { title: "Diskon (%)", key: "secondDiscount", nowrap: true },
  { title: "UHPD Akhir", key: "endUhpd", nowrap: true },
  { title: "Operasional", key: "operational", nowrap: true },
  { title: "Akomodasi Awal", key: "startAccomodation", nowrap: true },
  { title: "Diskon (%)", key: "thirdDiscount", nowrap: true },
  { title: "Akomodasi Akhir", key: "endAccomodation", nowrap: true },
  { title: "Transportasi Awal", key: "startTransport", nowrap: true },
  { title: "Diskon (%)", key: "forthDiscount", nowrap: true },
  { title: "Transportasi Akhir", key: "endTransport", nowrap: true },
  { title: "Tiket Pesawat Awal", key: "firstFlight", nowrap: true },
  { title: "Diskon (%)", key: "fifthDiscount", nowrap: true },
  { title: "Tiket Pesawat Akhir", key: "lastFlight", nowrap: true },
  { title: "Sub Tot", key: "subTotal", nowrap: true },
  { title: "Action", key: "actions", align: "center", nowrap: true },
];
const domesticAuditData = ref([
  {
    placeName: "Outlet Indihome",
    manDay: "3",
    startCost: "Rp 700.000",
    firstDiscount: "30",
    endCost: "Rp 350.000",
    startUhpd: "Rp 850.000",
    secondDiscount: "30",
    endUhpd: "Rp 850.000",
    operational: "30",
    startAccomodation: "Rp 850.000",
    thirdDiscount: "30",
    endAccomodation: "Rp 850.000",
    startTransport: "Rp 850.000",
    forthDiscount: "30",
    endTransport: "Rp 850.000",
    firstFlight: "Rp 850.000",
    fifthDiscount: "30",
    lastFlight: "Rp 850.000",
    subTotal: "Rp 850.000",
  },
  {
    placeName: "Pabrik Masak 2H",
    manDay: "2",
    startCost: "Rp 700.000",
    firstDiscount: "-",
    endCost: "Rp 350.000",
    startUhpd: "Rp 740.000",
    secondDiscount: "-",
    endUhpd: "Rp 740.000",
    operational: "-",
    startAccomodation: "Rp 740.000",
    thirdDiscount: "-",
    endAccomodation: "Rp 740.000",
    startTransport: "Rp 740.000",
    forthDiscount: "-",
    endTransport: "Rp 740.000",
    firstFlight: "Rp 740.000",
    fifthDiscount: "-",
    lastFlight: "Rp 740.000",
    subTotal: "Rp 850.000",
  },
  {
    placeName: "",
    manDay: "",
    startCost: "",
    firstDiscount: "",
    endCost: "",
    startUhpd: "",
    secondDiscount: "",
    endUhpd: "",
    operational: "",
    startAccomodation: "",
    thirdDiscount: "",
    endAccomodation: "",
    startTransport: "",
    forthDiscount: "",
    endTransport: "",
    firstFlight: "",
    fifthDiscount: "",
    lastFlight: "Total",
    subTotal: "Rp 1.700.000",
  },
]);

const overseaAuditHeader: any[] = [
  { title: "No", key: "index" },
  { title: "Keterangan Biaya", key: "costName", nowrap: true },
  { title: "Jumlah", key: "quantity" },
  { title: "Harga", key: "price", nowrap: true },
  { title: "Sub Tot", key: "subTotal", nowrap: true },
  { title: "Action", key: "actions", align: "center", nowrap: true },
];
const overseaAuditData = ref([
  {
    costName: "Biaya Pemeriksaan",
    quantity: "1",
    price: "Rp 6.000.000",
    subTotal: "Rp 6.000.000",
  },
  {
    costName: "Biaya Audit",
    quantity: "1",
    price: "Rp 1.000.000",
    subTotal: "Rp 1.000.000",
  },
  {
    costName: "",
    quantity: "",
    price: "Total",
    subTotal: "Rp 1.700.000",
  },
]);
// const overseaTotal = {
//   price: "Total",
//   subTotal: "Rp 7.000.000",
// };

const totalAuditHeader: any[] = [
  { title: "No", key: "index" },
  { title: "Keterangan", key: "description", nowrap: true },
  { title: "", key: "price" },
  { title: "Subtotal", key: "subTotal", nowrap: true, align: "center" },
];
const totalAuditData = ref([
  {
    description: "Keterangan Apapun",
    price: "",
    subTotal: "Rp 850.000",
  },
  {
    description: "Coba dulu",
    price: "",
    subTotal: "Rp 740.000",
  },
  {
    description: "",
    price: "Total",
    subTotal: "Rp 1.590.000",
  },
]);

const isDomesticModalOpen = ref(false);
const isOverseaModalOpen = ref(false);
const isUpdateModalOpen = ref(false);

const handleOpenDomesticModal = () => {
  isDomesticModalOpen.value = !isDomesticModalOpen.value;
};
const handleOpenOverseaModal = (type: string) => {
  overseaModalType.value = type;
  isOverseaModalOpen.value = !isOverseaModalOpen.value;
};
const handleOpenUpdateModal = (type: string) => {
  updateModalType.value = type;
  isUpdateModalOpen.value = !isUpdateModalOpen.value;
};

const updateModalType = ref("CREATE");
const domesticModalText = computed(() => {
  return updateModalType.value === "CREATE" ? "Tambah" : "Ubah";
});

const overseaModalType = ref("CREATE");
const overseaModalText = computed(() => {
  return overseaModalType.value === "CREATE" ? "Tambah" : "Ubah";
});

// const selectedFactory = ref(null);
// const handleAddDomesticCost = () => {
//   selectedFactory.value = null;
//   handleOpenDomesticModal();
//   useSnackbar().sendSnackbar("Berhasil menambahkan data", "success");
// };
const handleAddOverseaCost = (type: string) => {
  handleOpenOverseaModal(type);
  const message = type === "CREATE" ? "menambahkan" : "mengubah";
  useSnackbar().sendSnackbar(`Berhasil ${message} data`, "success");
};
const handleUpdateAuditCost = (type: string) => {
  handleOpenUpdateModal("CREATE");
  const message = type === "CREATE" ? "menambahkan" : "mengubah";
  useSnackbar().sendSnackbar(`Berhasil ${message} data`, "success");
};
</script>

<template>
  <div class="d-flex align-center cursor-pointer" @click="router.go(-1)">
    <VIcon icon="mdi-chevron-left" size="40px" color="primary" />
    <div class="text-primary">Kembali</div>
  </div>
  <VRow no-gutters>
    <VCol>
      <h1>
        Informasi Penetapan Biaya Audit Untuk Fasilitas Produksi di Indonesia
      </h1>
    </VCol>
  </VRow>
  <VRow>
    <VCol>
      <VCard>
        <VCardTitle class="my-3 d-flex justify-space-between align-center">
          <div class="font-weight-bold text-h4">
            Penetapan Biaya Audit untuk Fasilitas Produksi di Indonesia
          </div>
          <VBtn
            variant="outlined"
            text="Tambah Biaya Pesawat"
            @click="handleOpenUpdateModal('CREATE')"
          />
        </VCardTitle>
        <VCardText>
          <VDataTable
            class="domestic-table"
            :headers="domesticAuditHeader"
            :items="domesticAuditData"
            hide-default-footer
          >
            <template #item.index="{ index }">
              {{ index !== domesticAuditData.length - 1 ? index + 1 : "" }}
            </template>
            <template #item.lastFlight="{ index, item }">
              <div v-if="index !== overseaAuditData.length - 1">
                {{ item.lastFlight }}
              </div>
              <div v-else class="d-none" />
            </template>
            <template #item.subTotal="{ index, item }">
              <div v-if="index !== overseaAuditData.length - 1">
                {{ item.subTotal }}
              </div>
              <div v-else class="font-weight-bold">
                {{ item.lastFlight }}
              </div>
            </template>
            <template #item.actions="props">
              <VMenu v-if="props.index !== overseaAuditData.length - 1">
                <template #activator="{ props }">
                  <VIcon
                    icon="fa-ellipsis-v"
                    color="primary"
                    class="cursor-pointer"
                    v-bind="props"
                  />
                </template>
                <VList>
                  <VListItem
                    prepend-icon="mdi-pencil"
                    title="Ubah"
                    @click="() => handleOpenUpdateModal('EDIT')"
                  />
                </VList>
              </VMenu>
              <div v-else class="font-weight-bold">
                {{ props.item.subTotal }}
              </div>
            </template>
          </VDataTable>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
  <VRow>
    <VCol>
      <VCard>
        <VCardTitle class="my-3 d-flex justify-space-between align-center">
          <div class="font-weight-bold text-h4">
            Penetapan Biaya Audit untuk Fasilitas Produksi di Luar Negeri
          </div>
          <VBtn
            variant="outlined"
            text="Tambah Biaya"
            @click="handleOpenOverseaModal('CREATE')"
          />
        </VCardTitle>
        <VCardText>
          <VDataTable
            class="oversea-table"
            :headers="overseaAuditHeader"
            :items="overseaAuditData"
            hide-default-footer
          >
            <template #item.index="{ index }">
              {{ index !== overseaAuditData.length - 1 ? index + 1 : "" }}
            </template>
            <template #item.price="{ index, item }">
              <div v-if="index !== overseaAuditData.length - 1">
                {{ item.price }}
              </div>
              <div v-else class="d-none" />
            </template>
            <template #item.subTotal="{ index, item }">
              <div v-if="index !== overseaAuditData.length - 1">
                {{ item.subTotal }}
              </div>
              <div v-else class="font-weight-bold">
                {{ item.price }}
              </div>
            </template>
            <template #item.actions="props">
              <VMenu v-if="props.index !== overseaAuditData.length - 1">
                <template #activator="{ props }">
                  <VIcon
                    icon="fa-ellipsis-v"
                    color="primary"
                    class="cursor-pointer"
                    v-bind="props"
                  />
                </template>
                <VList>
                  <VListItem
                    prepend-icon="mdi-pencil"
                    title="Ubah"
                    @click="() => handleOpenOverseaModal('EDIT')"
                  />
                </VList>
              </VMenu>
              <div v-else class="font-weight-bold">
                {{ props.item.subTotal }}
              </div>
            </template>
          </VDataTable>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
  <VRow>
    <VCol>
      <VCard>
        <VCardTitle class="my-3 d-flex justify-space-between align-center">
          <div class="font-weight-bold text-h4">Total Biaya Audit</div>
        </VCardTitle>
        <VCardText>
          <VDataTable
            :headers="totalAuditHeader"
            :items="totalAuditData"
            hide-default-footer
          >
            <template #item.index="{ index }">
              {{ index !== totalAuditData.length - 1 ? index + 1 : "" }}
            </template>
            <template #item.price="{ index, item }">
              <div
                :class="
                  index !== totalAuditData.length - 1
                    ? ''
                    : 'd-flex justify-end font-weight-bold'
                "
              >
                {{ item.price ? item.price : "" }}
              </div>
            </template>
            <template #item.subTotal="{ index, item }">
              <div
                :class="
                  index !== totalAuditData.length - 1 ? '' : 'font-weight-bold'
                "
              >
                {{ item.subTotal }}
              </div>
            </template>
          </VDataTable>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
  <!-- <VDialog v-model="isDomesticModalOpen" max-width="840px" persistent>
    <VCard class="pa-4">
      <VCardTitle class="d-flex justify-space-between align-center">
        <div class="text-h3 font-weight-bold">Tambah Biaya Pesawat</div>
        <VIcon @click="handleOpenDomesticModal"> fa-times </VIcon>
      </VCardTitle>
      <VCardText>
        <VRow>
          <VCol>
            <div class="text-h6">Pabrik</div>
            <VSelect
              v-model="selectedFactory"
              :items="[{ name: 'Pertamini', cost: 'Rp 100.000.000' }]"
              item-title="name"
              item-value="cost"
              @update:model-value=""
              density="compact"
              rounded="xl"
              placeholder="Pilih Pabrik"
            />
          </VCol>
        </VRow>
        <VRow>
          <VCol>
            <div class="text-h6">Biaya</div>
            <VTextField
              :model-value="selectedFactory"
              density="compact"
              rounded="xl"
              placeholder="-"
              readonly
            />
            <div class="d-flex align-center mt-1">
              <VIcon icon="mdi-alert-circle" color="#2C222E" size="small" />
              <div class="text-subtitle-2 ms-1" style="color: #2c222e">
                Biaya Perauditor
              </div>
            </div>
          </VCol>
        </VRow>
      </VCardText>
      <VCardActions class="px-4">
        <VBtn
          variant="outlined"
          class="px-4 me-3"
          @click="handleOpenDomesticModal"
          >Batal</VBtn
        >
        <VBtn
          variant="flat"
          class="px-4"
          color="primary"
          @click="handleAddDomesticCost"
        >
          Tambah
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog> -->
  <VDialog v-model="isOverseaModalOpen" max-width="840px" persistent>
    <VCard class="pa-4">
      <VCardTitle class="d-flex justify-space-between align-center">
        <div class="text-h3 font-weight-bold">
          {{ overseaModalText }} Biaya Fasilitas Produksi di Luar Negeri
        </div>
        <VIcon @click="handleOpenOverseaModal"> fa-times </VIcon>
      </VCardTitle>
      <VCardText>
        <VRow>
          <VCol>
            <div class="text-h6">Keterangan Biaya</div>
            <VTextField
              rounded="xl"
              density="compact"
              placeholder="Biaya Admin"
            />
          </VCol>
          <VCol>
            <div class="text-h6">Jumlah</div>
            <VTextField rounded="xl" density="compact" placeholder="2" />
          </VCol>
          <VCol>
            <div class="text-h6">Harga</div>
            <VTextField
              rounded="xl"
              density="compact"
              placeholder="Rp 400.000"
            />
          </VCol>
          <VCol>
            <div class="text-h6">Sub Total</div>
            <VTextField
              rounded="xl"
              density="compact"
              placeholder="Rp 800.000"
            />
          </VCol>
        </VRow>
      </VCardText>
      <VCardActions class="pt-2 px-4">
        <VBtn
          variant="outlined"
          class="px-4 me-3"
          @click="handleOpenOverseaModal"
          >Batal</VBtn
        >
        <VBtn
          variant="flat"
          class="px-4"
          color="primary"
          @click="handleAddOverseaCost"
        >
          {{ overseaModalText }}
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
  <VDialog v-model="isUpdateModalOpen" max-width="840px" persistent>
    <VCard class="pa-4">
      <VCardTitle class="d-flex justify-space-between align-center">
        <div class="text-h3 font-weight-bold">
          {{ domesticModalText }} Biaya Audit
        </div>
        <VIcon @click="handleOpenUpdateModal"> fa-times </VIcon>
      </VCardTitle>
      <VCardText>
        <VRow>
          <VCol>
            <div class="text-h6">Fasilitas Produksi</div>
            <VTextField
              model-value="Outlet Indihome"
              rounded="xl"
              density="compact"
            />
          </VCol>
        </VRow>
        <VRow>
          <VCol>
            <div class="text-h6">Unit Cost Awal</div>
            <VTextField
              model-value="Rp 700.000"
              rounded="xl"
              density="compact"
            />
          </VCol>
          <VCol>
            <div class="text-h6">Diskon (%)</div>
            <VTextField
              model-value="50"
              rounded="xl"
              density="compact"
              placeholder="Masukkan Diskon"
            />
          </VCol>
          <VCol>
            <div class="text-h6">Unit Cost Akhir</div>
            <VTextField
              model-value="Rp 350.000"
              rounded="xl"
              density="compact"
            />
          </VCol>
        </VRow>
        <VRow>
          <VCol>
            <div class="text-h6">UHPD Awal</div>
            <VTextField
              model-value="Rp 700.000"
              rounded="xl"
              density="compact"
            />
          </VCol>
          <VCol>
            <div class="text-h6">Diskon (%)</div>
            <VTextField
              rounded="xl"
              density="compact"
              placeholder="Masukkan Diskon"
            />
          </VCol>
          <VCol>
            <div class="text-h6">UHPD Akhir</div>
            <VTextField
              model-value="Rp 350.000"
              rounded="xl"
              density="compact"
            />
          </VCol>
        </VRow>
        <VRow>
          <VCol>
            <div class="text-h6">Operasional</div>
            <VTextField
              model-value="Rp 700.000"
              rounded="xl"
              density="compact"
            />
          </VCol>
        </VRow>
        <VRow>
          <VCol>
            <div class="text-h6">Transportasi Awal</div>
            <VTextField
              model-value="Rp 700.000"
              rounded="xl"
              density="compact"
            />
          </VCol>
          <VCol>
            <div class="text-h6">Diskon (%)</div>
            <VTextField
              model-value="50"
              rounded="xl"
              density="compact"
              placeholder="Masukkan Diskon"
            />
          </VCol>
          <VCol>
            <div class="text-h6">Transportasi Akhir</div>
            <VTextField
              model-value="Rp 350.000"
              rounded="xl"
              density="compact"
            />
          </VCol>
        </VRow>
        <VRow>
          <VCol>
            <div class="text-h6">Akomodasi Awal</div>
            <VTextField
              model-value="Rp 700.000"
              rounded="xl"
              density="compact"
            />
          </VCol>
          <VCol>
            <div class="text-h6">Diskon (%)</div>
            <VTextField
              rounded="xl"
              density="compact"
              placeholder="Masukkan Diskon"
            />
          </VCol>
          <VCol>
            <div class="text-h6">Akomodasi Akhir</div>
            <VTextField
              model-value="Rp 350.000"
              rounded="xl"
              density="compact"
            />
          </VCol>
        </VRow>
        <VRow>
          <VCol>
            <div class="text-h6">Tiket Pesawat Awal</div>
            <VTextField
              model-value="Rp 700.000"
              rounded="xl"
              density="compact"
            />
          </VCol>
          <VCol>
            <div class="text-h6">Diskon (%)</div>
            <VTextField
              rounded="xl"
              density="compact"
              placeholder="Masukkan Diskon"
            />
          </VCol>
          <VCol>
            <div class="text-h6">Tiket Pesawat Akhir</div>
            <VTextField
              model-value="Rp 350.000"
              rounded="xl"
              density="compact"
            />
          </VCol>
        </VRow>
      </VCardText>
      <VCardActions class="pt-2 px-4">
        <VBtn
          variant="outlined"
          class="px-4 me-3"
          @click="handleOpenUpdateModal"
          >Batal</VBtn
        >
        <VBtn
          variant="flat"
          class="px-4"
          color="primary"
          @click="handleUpdateAuditCost"
        >
          {{ domesticModalText }}
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<style scoped lang="scss">
:deep(.v-data-table.domestic-table > .v-table__wrapper) {
  table {
    thead {
      tr {
        th:nth-of-type(20) {
          right: 137px;
          position: sticky;
          border-left: 1px solid rgba(#000000, 0.12);
        }
        th:last-of-type {
          right: 0;
          position: sticky;
        }
      }
    }

    tbody {
      tr:not(:last-of-type) {
        td:nth-of-type(20) {
          right: 137px;
          position: sticky;
          border-left: 1px solid rgba(#000000, 0.12);
          background: white;
        }
        td:last-of-type {
          right: 0;
          position: sticky;
          background: white;
        }
      }

      tr {
        td:nth-of-type(20) {
          right: 137px;
          position: sticky;
          background: white;
        }
        td:last-of-type {
          right: 0;
          position: sticky;
          background: white;
        }
      }
    }
  }
}
:deep(.v-data-table.oversea-table > .v-table__wrapper) {
  table {
    thead {
      tr {
        th:nth-of-type(5) {
          right: 137px;
          position: sticky;
          border-left: 1px solid rgba(#000000, 0.12);
        }
        th:last-of-type {
          right: 0;
          position: sticky;
        }
      }
    }

    tbody {
      tr:not(:last-of-type) {
        td:nth-of-type(5) {
          right: 137px;
          position: sticky;
          border-left: 1px solid rgba(#000000, 0.12);
          background: white;
        }
        td:last-of-type {
          right: 0;
          position: sticky;
          background: white;
        }
      }

      tr {
        td:nth-of-type(5) {
          right: 137px;
          position: sticky;
          background: white;
        }
        td:last-of-type {
          right: 0;
          position: sticky;
          background: white;
        }
      }
    }
  }
}
</style>
