<script setup lang="ts">
import { ref } from 'vue';
import { VDataTableServer } from 'vuetify/components';

interface TimelineItem {
  title: string
  user: string
  date: string
  color: string
}

const tabs = ref([
  { text: 'Pelaku Usaha', value: 'pelaku_usaha' },
  { text: 'Pengajuan', value: 'pengajuan' },
  { text: 'Pabrik & Outlet', value: 'pabrik' },
  { text: 'Bahan', value: 'bahan' },
  { text: 'Produk', value: 'produk' },
  { text: 'Melacak', value: 'melacak' },
]);

const tab = ref('pelaku_usaha'); // Default selected tab

const timelineItems = ref<TimelineItem[]>([
  {
    title: 'Submitted',
    user: 'Samsul',
    date: '2024-09-09',
    color: 'deep-orange-lighten-4',
  },
  {
    title: 'Draft',
    user: 'Samsul',
    date: '2024-09-09',
    color: 'purple-lighten-2',
  },
]);

const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

const showTimeline = ref(false);

// const items = ref<
//   {
//     id: string;
//     jenis_bahan: string;
//     nama_bahan: string;
//     produsen: string;
//     no_sertifikat_halal: string;
//     keterangan: string;
//   }[]
// >([]);

const itemPerPage = ref(10)
const totalItems = ref(0)
const loading = ref(false)
const page = ref(1)

// const loadItem = async (page: number, size: number, keyword: string = "") => {
//   try {
//     loading.value = true;

//     const response = await $api("/shln/verificator", {
//       method: "get",
//       params: {
//         page,
//         size,
//         keyword,
//       },
//     });

//     items.value = response.data;
//     totalItems.value = response.total_item;
//     loading.value = false;
//   } catch (error) {
//     useSnackbar().sendSnackbar("Ada Kesalahan", "error");
//     loading.value = false;
//   }
// };

const loadItem = async (page, size) => {
  // Temporarily skip API call for dummy data testing
  items.value = items.value.slice((page - 1) * size, page * size); // Paginate dummy data
  totalItems.value = items.value.length;
};

const debouncedFetch = debounce(loadItem, 500);

onMounted(() => {
  // Assign dummy data to items instead of fetching from API
  items.value = [
    {
      id: 1,
      jenis_bahan: 'Cleaning Agent',
      nama_bahan: 'Air',
      produsen: 'Produsen A',
      nomor_sertifikat_halal: '123456',
      keterangan: 'Digunakan untuk mencuci',
    },
    {
      id: 2,
      jenis_bahan: 'Kemasan',
      nama_bahan: 'Alumunium Foil',
      produsen: 'Produsen B',
      nomor_sertifikat_halal: '789012',
      keterangan: 'Kemasan tahan panas',
    },
    {
      id: 3,
      jenis_bahan: 'Cleaning Agent',
      nama_bahan: 'Sabun Pencuci',
      produsen: 'Produsen C',
      nomor_sertifikat_halal: '345678',
      keterangan: 'Menghilangkan noda',
    },
    {
      id: 4,
      jenis_bahan: 'Kemasan',
      nama_bahan: 'Plastik',
      produsen: 'Produsen D',
      nomor_sertifikat_halal: '-',
      keterangan: 'Kemasan fleksibel',
    },
    {
      id: 5,
      jenis_bahan: 'Cleaning Agent',
      nama_bahan: 'Detergent',
      produsen: 'Produsen E',
      nomor_sertifikat_halal: '901234',
      keterangan: 'Membersihkan bahan',
    },
  ];

  totalItems.value = items.value.length; // Set totalItems for pagination
});

// onMounted(async () => {
//   await loadItem(1, itemPerPage.value, "");
// });

// const refresh = async () => {
//   await loadItem(1, itemPerPage.value, "");
// };

const verifikatorTableHeader = [
  { title: 'No', key: 'id' },
  { title: 'Jenis Bahan', key: 'jenis_bahan' },
  { title: 'Nama Bahan', key: 'nama_bahan' },
  { title: 'Produsen', key: 'produsen' },
  { title: 'Nomor Sertifikat Halal', key: 'nomor_sertifikat_halal' },
  { title: 'Keterangan', key: 'keterangan' },
  { title: 'Action', key: 'action' },
]

const pabrikTableHeader = [
  { title: 'No', key: 'id' },
  { title: 'Jenis', key: 'jenis' },
  { title: 'No. Dokumen', key: 'no_dokumen' },
  { title: 'Tanggal', key: 'tanggal' },
  { title: 'Masa Berlaku', key: 'masa_berlaku' },
  { title: 'Instansi Penerbit', key: 'instansi_penerbit' },
  { title: 'Action', key: 'action' },
]

const outletTableHeader = [
  { title: 'No', key: 'id' },
  { title: 'Nama', key: 'nama' },
  { title: 'Alamat', key: 'alamat' },
  { title: 'Action', key: 'action' },
]

// Dummy data
const items = ref([
  {
    id: 1,
    jenis_bahan: 'Cleaning Agent',
    nama_bahan: 'Air',
    produsen: 'Produsen A',
    nomor_sertifikat_halal: '123456',
    keterangan: 'Digunakan untuk mencuci',
  },
  {
    id: 2,
    jenis_bahan: 'Kemasan',
    nama_bahan: 'Alumunium Foil',
    produsen: 'Produsen B',
    nomor_sertifikat_halal: '789012',
    keterangan: 'Kemasan tahan panas',
  },
  {
    id: 3,
    jenis_bahan: 'Cleaning Agent',
    nama_bahan: 'Sabun Pencuci',
    produsen: 'Produsen C',
    nomor_sertifikat_halal: '345678',
    keterangan: 'Menghilangkan noda',
  },
  {
    id: 4,
    jenis_bahan: 'Kemasan',
    nama_bahan: 'Plastik',
    produsen: 'Produsen D',
    nomor_sertifikat_halal: '-',
    keterangan: 'Kemasan fleksibel',
  },
  {
    id: 5,
    jenis_bahan: 'Cleaning Agent',
    nama_bahan: 'Detergent',
    produsen: 'Produsen E',
    nomor_sertifikat_halal: '901234',
    keterangan: 'Membersihkan bahan',
  },
])

const pabrikTableData = ref([
  {
    id: 1,
    jenis: 'Sertifikat ISO',
    no_dokumen: 'ISO-123456',
    tanggal: '01/01/2024',
    masa_berlaku: '01/01/2027',
    instansi_penerbit: 'ISO Certification Body',
  },
  {
    id: 2,
    jenis: 'Surat Izin Usaha',
    no_dokumen: 'SIU-987654',
    tanggal: '15/02/2024',
    masa_berlaku: '12/03/2027',
    instansi_penerbit: 'Dinas Perizinan',
  },
  {
    id: 3,
    jenis: 'HACCP Certificate',
    no_dokumen: 'HACCP-345678',
    tanggal: '11/02/2024',
    masa_berlaku: '21/03/2025',
    instansi_penerbit: 'HACCP Authority',
  },
])

const outletTableData = ref([
  {
    id: 1,
    nama: 'Outlet A',
    alamat: 'Jl. Sudirman No. 10, Jakarta',
  },
  {
    id: 2,
    nama: 'Outlet B',
    alamat: 'Jl. Merdeka Raya No. 5, Bandung',
  },
  {
    id: 3,
    nama: 'Outlet C',
    alamat: 'Jl. Ahmad Yani No. 8, Surabaya',
  },
])



const handleAddProductConfirm = formData => {
  console.log('Add confirmed:', formData)
}

const handleDeleteOutletConfirm = oulet => {
  console.log('Delete outlet confirmed:', oulet)
}

const handleDeletePabrikConfirm = pabrik => {
  console.log('Delete pabrik confirmed:', pabrik)
}

const file = ref<File | null>(null);
const fileInputRef = ref<HTMLInputElement | null>(null);

// Handle file upload
const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files.length > 0) {
    file.value = input.files[0]
    console.log('File uploaded:', file.value.name)
  }
  else {
    console.log('No file selected')
  }
}

// Trigger file input click
const triggerFileInputClick = () => {
  fileInputRef.value?.click()
}
</script>

<template>
  <VContainer class="pa-0">
    <!-- Title and Buttons Row -->
    <VRow>
      <VCol>
        <p class="text-h4">Detail Pengajuan</p>
      </VCol>
      <VCol class="d-flex justify-end align-center" cols="4" md="5">
        <VBtn variant="outlined" class="mx-2">Lihat Laporan</VBtn>
        <VBtn color="#49A84C" class="mx-2">Tandai OK</VBtn>
        <VBtn variant="outlined" color="error" class="mx-2">
          Batalkan Status Hijau
        </VBtn>
        <VBtn variant="outlined" class="mx-2">Pengembalian</VBtn>
        <VBtn color="#E1442E" class="mx-2">Dibatalkan</VBtn>
      </VCol>
    </VRow>

    <!-- Tabs -->
    <VRow>
      <VCol>
        <VTabs v-model="tab" align-tabs="start" height="60">
          <VTab v-for="item in tabs" :key="item.value" :value="item.value">
            {{ item.text }}
          </VTab>
        </VTabs>
      </VCol>
    </VRow>

    <!-- Tab Content -->
    <VRow v-if="tab === 'pabrik'">
      <VRow>
        <VCol>
          <VCard variant="flat" class="pa-4">
            <VRow>
              <VCol>
                <p class="text-h3">Pabrik</p>
              </VCol>
              <VCol class="d-flex justify-end align-center" cols="6" md="2">
                <TambahPabrikOutlet
                  mode="add"
                  @confirm-add="handleAddProductConfirm"
                  @cancel="() => console.log('Add cancelled')"
                />
              </VCol>
            </VRow>
            <VRow>
              <VCol>
                <VDataTableServer
                  v-model:items-per-page="itemPerPage"
                  v-model:page="page"
                  :headers="pabrikTableHeader"
                  :items="pabrikTableData"
                  :loading="loading"
                  :items-length="totalItems"
                  loading-text="Loading..."
                  @update:options="loadItem(page, itemPerPage)"
                >
                  <template #item.id="{ index }">
                    {{ index + 1 + (page - 1) * itemPerPage }}
                  </template>
                  <template #item.tgl_daftar="{ item }">
                    {{ formatDateIntl(new Date(item.tgl_daftar)) }}
                  </template>
                  <template #item.action="{ item }">
                    <div class="d-flex gap-1">
                      <VBtn
                      variant="text"
                      elevation="0"
                      @click="handleDeletePabrikConfirm"
                      >
                        <VIcon
                          mode="edit"
                          icon="ri-delete-bin-fill"
                          color="#E1442E"
                        />
                      </VBtn>
                    </div>
                  </template>
                </VDataTableServer>
              </VCol>
            </VRow>
          </VCard>
        </VCol>
      </VRow>
      <VRow>
        <VCol>
          <VCard variant="flat" class="pa-4">
            <VRow>
              <VCol>
                <p class="text-h3">Outlet</p>
              </VCol>
              <VCol class="d-flex justify-end align-center" cols="6" md="2">
                <TambahPabrikOutlet
                  mode="add"
                  @confirm-add="handleAddProductConfirm"
                  @cancel="() => console.log('Add cancelled')"
                />
              </VCol>
            </VRow>
            <VRow>
              <VCol>
                <VDataTableServer
                  v-model:items-per-page="itemPerPage"
                  v-model:page="page"
                  :headers="outletTableHeader"
                  :items="outletTableData"
                  :loading="loading"
                  :items-length="totalItems"
                  loading-text="Loading..."
                  @update:options="loadItem(page, itemPerPage)"
                >
                  <template #item.id="{ index }">
                    {{ index + 1 + (page - 1) * itemPerPage }}
                  </template>
                  <template #item.tgl_daftar="{ item }">
                    {{ formatDateIntl(new Date(item.tgl_daftar)) }}
                  </template>
                  <template #item.action="{ item }">
                    <div class="d-flex gap-1">
                      <VBtn
                      variant="text"
                      elevation="0"
                      @click="handleDeleteOutletConfirm"
                      >
                        <VIcon
                          mode="edit"
                          icon="ri-delete-bin-fill"
                          color="#E1442E"
                        />
                      </VBtn>
                    </div>
                  </template>
                </VDataTableServer>
              </VCol>
            </VRow>
          </VCard>
        </VCol>
      </VRow>
    </VRow>

    <!-- Tab Content -->
    <VRow v-if="tab === 'bahan'">
      <VCol>
        <VCard variant="flat" class="pa-4">
          <VRow>
            <VCol>
              <p class="text-h3">Daftar Nama Bahan dan Kemasan</p>
            </VCol>
            <VCol class="d-flex justify-end align-center" cols="0" md="2">
              <TambahBahanModalHalal
                mode="add"
                @confirm-add="handleAddProductConfirm"
                @cancel="() => console.log('Add cancelled')"
              />
              <VContainer>
                <VBtn @click="triggerFileInputClick" color="primary" variant="outlined" class="d-flex align-center">
                  <VIcon size="20">ri-upload-line</VIcon>
                  <span class="ml-2">Upload File</span>
                </VBtn>
                <!-- Hidden File Input -->
                <input
                    ref="fileInputRef"
                    type="file"
                    style="display: none;"
                    accept=".pdf,.doc,.docx"
                    @change="handleFileUpload"
                  />
              </VContainer>
            </VCol>
          </VRow>
          <VRow>
            <VCol>
              <VAlert
                type="warning"
                variant="tonal"
                color="#652672"
              >
              <ol>
                <li>1. Termasuk  isikan bahan dengan kategori cleaning agent seperti: Air, Sabun Pencuci, Detergent, dll</li>
                <li>2. Isikan nama kemasan produk, contoh: Alumunium foil, standing pouch, plastik, dll</li>
              </ol>
              </VAlert>
            </VCol>
          </VRow>
          <VRow>
            <VCol>
              <VDataTableServer
                v-model:items-per-page="itemPerPage"
                v-model:page="page"
                :headers="verifikatorTableHeader"
                :items="items"
                :loading="loading"
                :items-length="totalItems"
                loading-text="Loading..."
                @update:options="loadItem(page, itemPerPage, searchQuery)"
              >
                <template #item.id="{ index }">
                  {{ index + 1 + (page - 1) * itemPerPage }}
                </template>
                <template #item.tgl_daftar="{ item }">
                  {{ formatDateIntl(new Date(item.tgl_daftar)) }}
                </template>
                <template #item.action="{ item }">
                  <div class="d-flex gap-1">
                    <UbahBahanModalHalal
                        @confirm-edit="handleEditProductConfirm"
                        @cancel="() => console.log('Add cancelled')"
                      />
                  </div>
                </template>
              </VDataTableServer>
            </VCol>
          </VRow>
        </VCard>
      </VCol> 
    </VRow>

    <!-- Tab Content -->
    <VRow v-if="tab === 'produk'">
      <VCol>
        <VCard variant="flat" class="pa-4">
          <VRow>
            <VCol>
              <p class="text-h3">Daftar Nama Bahan dan Kemasan</p>
              <ol>
                <li>Termasuk  isikan bahan dengan kategori cleaning agent seperti: Air, Sabun Pencuci, Detergent, dll</li>
                <li>Isikan nama kemasan produk, contoh: Alumunium foil, standing pouch, plastik, dll</li>
              </ol>
            </VCol>
            <VCol class="d-flex justify-end align-center" cols="6" md="2">
              <TambahProduk
                mode="add"
                @confirm-add="handleAddProductConfirm"
                @cancel="() => console.log('Add cancelled')"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol>
              <VDataTableServer
                v-model:items-per-page="itemPerPage"
                v-model:page="page"
                :headers="verifikatorTableHeader"
                :items="items"
                :loading="loading"
                :items-length="totalItems"
                loading-text="Loading..."
                @update:options="loadItem(page, itemPerPage)"
              >
                <template #item.id="{ index }">
                  {{ index + 1 + (page - 1) * itemPerPage }}
                </template>
                <template #item.tgl_daftar="{ item }">
                  {{ formatDateIntl(new Date(item.tgl_daftar)) }}
                </template>
                <template #item.action="{ item }">
                  <div class="d-flex gap-1">
                    <UbahProduk
                        mode="edit"
                        :initialData="selectedProduct"
                        icon="ri-pencil-fill"
                        :show-label="false"
                        color="#652672"
                        @confirm-edit="handleEditProductConfirm"
                        @cancel="() => console.log('Add cancelled')"
                      />
                  </div>
                </template>
              </VDataTableServer>
            </VCol>
          </VRow>
        </VCard>
      </VCol>
    </VRow>

    <!-- Tab Content -->
    <VRow v-if="tab === 'melacak'">
      <VCol>
        <VCard variant="flat" class="pa-4">
          <div class="d-flex justify-space-between align-center" @click="showTimeline = !showTimeline">
            <p class="text-h4">Pengajuan Sertifikasi Halal</p>
            <VIcon :icon="showTimeline ? 'mdi-chevron-up' : 'mdi-chevron-down'" />
          </div>
          <VExpandTransition>
            <div v-if="showTimeline">
              <VTimeline align="start" density="compact" truncate-line="both">
                <VTimelineItem
                  v-for="(item, i) in timelineItems"
                  :key="i"
                  dot-color="#FFFFFF"
                >
                  <template #icon>
                    <VIcon icon="ri-circle-line" color="primary" size="35" />
                  </template>
                  <div class="d-flex justify-space-between align-start">
                    <div>
                      <div class="text-subtitle-2 font-weight-bold">
                        {{ item.title }}
                      </div>
                      <div class="text-caption text-grey">{{ item.user }}</div>
                    </div>
                    <div class="text-caption text-grey">
                      {{ formatDate(item.date) }}
                    </div>
                  </div>
                </VTimelineItem>
              </VTimeline>
            </div>
          </VExpandTransition>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<style scoped>
.v-card {
  border: none !important;
  box-shadow: none !important;
}

.v-timeline {
  padding-inline-start: 0;
}

:deep(.v-timeline-item__body) {
  padding-block: 12px;
  padding-inline: 0;
}

:deep(.v-timeline-item__dot) {
  margin-inline-end: 16px;
}
</style>
