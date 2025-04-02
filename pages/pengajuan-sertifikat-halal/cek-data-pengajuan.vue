<script setup lang="ts">
import { ref } from "vue";
import { VDataTableServer } from "vuetify/components";

interface TimelineItem {
  title: string;
  user: string;
  date: string;
  color: string;
}

const tabs = ref([
  { text: "Pelaku Usaha", value: "pelaku_usaha" },
  { text: "Pengajuan", value: "pengajuan" },
  { text: "Pabrik & Outlet", value: "pabrik" },
  { text: "Bahan", value: "bahan" },
  { text: "Produk", value: "produk" },
  { text: "Melacak", value: "melacak" },
]);

const tab = ref("pelaku_usaha"); // Default selected tab

const timelineItems = ref<TimelineItem[]>([
  {
    title: "Submitted",
    user: "Samsul",
    date: "2024-09-09",
    color: "deep-orange-lighten-4",
  },
  {
    title: "Draft",
    user: "Samsul",
    date: "2024-09-09",
    color: "purple-lighten-2",
  },
]);

const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const showTimeline = ref(false);
const showPengajuan = ref(false);
const showDetail = ref(false);

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

const itemPerPage = ref(10);
const totalItems = ref(0);
const loading = ref(false);
const page = ref(1);

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
      jenis_bahan: "Cleaning Agent",
      nama_bahan: "Air",
      produsen: "Produsen A",
      nomor_sertifikat_halal: "123456",
      keterangan: "Digunakan untuk mencuci",
    },
    {
      id: 2,
      jenis_bahan: "Kemasan",
      nama_bahan: "Alumunium Foil",
      produsen: "Produsen B",
      nomor_sertifikat_halal: "789012",
      keterangan: "Kemasan tahan panas",
    },
    {
      id: 3,
      jenis_bahan: "Cleaning Agent",
      nama_bahan: "Sabun Pencuci",
      produsen: "Produsen C",
      nomor_sertifikat_halal: "345678",
      keterangan: "Menghilangkan noda",
    },
    {
      id: 4,
      jenis_bahan: "Kemasan",
      nama_bahan: "Plastik",
      produsen: "Produsen D",
      nomor_sertifikat_halal: "-",
      keterangan: "Kemasan fleksibel",
    },
    {
      id: 5,
      jenis_bahan: "Cleaning Agent",
      nama_bahan: "Detergent",
      produsen: "Produsen E",
      nomor_sertifikat_halal: "901234",
      keterangan: "Membersihkan bahan",
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
  { title: "No", key: "id" },
  { title: "Jenis Bahan", key: "jenis_bahan" },
  { title: "Nama Bahan", key: "nama_bahan" },
  { title: "Produsen", key: "produsen" },
  { title: "Nomor Sertifikat Halal", key: "nomor_sertifikat_halal" },
  { title: "Keterangan", key: "keterangan" },
  { title: "Action", key: "action" },
];

const pabrikTableHeader = [
  { title: "No", key: "id" },
  { title: "Jenis", key: "jenis" },
  { title: "No. Dokumen", key: "no_dokumen" },
  { title: "Tanggal", key: "tanggal" },
  { title: "Masa Berlaku", key: "masa_berlaku" },
  { title: "Instansi Penerbit", key: "instansi_penerbit" },
  { title: "Action", key: "action" },
];

const outletTableHeader = [
  { title: "No", key: "id" },
  { title: "Nama", key: "nama" },
  { title: "Alamat", key: "alamat" },
  { title: "Action", key: "action" },
];

const legalTableHeader = [
  { title: "No", key: "id" },
  { title: "Jenis", key: "jenis" },
  { title: "No. Dokumen", key: "no_dokumen" },
  { title: "Tanggal", key: "tanggal" },
  { title: "Masa Berlaku", key: "masa_berlaku" },
  { title: "Instansi Penerbit", key: "instansi_penerbit" },
];

const penyeliaTableHeader = [
  { title: "No", key: "id" },
  { title: "Nama", key: "nama" },
  { title: "No. KTP", key: "no_ktp" },
  { title: "No. Kontak", key: "no_kontak" },
  { title: "No/Tgl Sertif Penyelia Halal", key: "sertif_penyelia_halal" },
  { title: "No/Tgl SK", key: "sk" },
  { title: "Action", key: "action" },
];

// Dummy data
const items = ref([
  {
    id: 1,
    jenis_bahan: "Cleaning Agent",
    nama_bahan: "Air",
    produsen: "Produsen A",
    nomor_sertifikat_halal: "123456",
    keterangan: "Digunakan untuk mencuci",
  },
  {
    id: 2,
    jenis_bahan: "Kemasan",
    nama_bahan: "Alumunium Foil",
    produsen: "Produsen B",
    nomor_sertifikat_halal: "789012",
    keterangan: "Kemasan tahan panas",
  },
  {
    id: 3,
    jenis_bahan: "Cleaning Agent",
    nama_bahan: "Sabun Pencuci",
    produsen: "Produsen C",
    nomor_sertifikat_halal: "345678",
    keterangan: "Menghilangkan noda",
  },
  {
    id: 4,
    jenis_bahan: "Kemasan",
    nama_bahan: "Plastik",
    produsen: "Produsen D",
    nomor_sertifikat_halal: "-",
    keterangan: "Kemasan fleksibel",
  },
  {
    id: 5,
    jenis_bahan: "Cleaning Agent",
    nama_bahan: "Detergent",
    produsen: "Produsen E",
    nomor_sertifikat_halal: "901234",
    keterangan: "Membersihkan bahan",
  },
]);

const pabrikTableData = ref([
  {
    id: 1,
    jenis: "Sertifikat ISO",
    no_dokumen: "ISO-123456",
    tanggal: "01/01/2024",
    masa_berlaku: "01/01/2027",
    instansi_penerbit: "ISO Certification Body",
  },
  {
    id: 2,
    jenis: "Surat Izin Usaha",
    no_dokumen: "SIU-987654",
    tanggal: "15/02/2024",
    masa_berlaku: "12/03/2027",
    instansi_penerbit: "Dinas Perizinan",
  },
  {
    id: 3,
    jenis: "HACCP Certificate",
    no_dokumen: "HACCP-345678",
    tanggal: "11/02/2024",
    masa_berlaku: "21/03/2025",
    instansi_penerbit: "HACCP Authority",
  },
]);

const outletTableData = ref([
  {
    id: 1,
    nama: "Outlet A",
    alamat: "Jl. Sudirman No. 10, Jakarta",
  },
  {
    id: 2,
    nama: "Outlet B",
    alamat: "Jl. Merdeka Raya No. 5, Bandung",
  },
  {
    id: 3,
    nama: "Outlet C",
    alamat: "Jl. Ahmad Yani No. 8, Surabaya",
  },
]);

const penyeliaTableData = ref([
  {
    id: 1,
    nama: "Ahmad Fauzi",
    no_ktp: "3201012001010001",
    no_kontak: "081234567890",
    sertif_penyelia_halal: "SH12345 / 01-01-2024",
    sk: "SK001 / 15-02-2024",
  },
  {
    id: 2,
    nama: "Nurul Aini",
    no_ktp: "3202011995010002",
    no_kontak: "081298765432",
    sertif_penyelia_halal: "SH67890 / 10-03-2024",
    sk: "SK002 / 20-03-2024",
  },
  {
    id: 3,
    nama: "Rahmat Hidayat",
    no_ktp: "3203011987020003",
    no_kontak: "081345678901",
    sertif_penyelia_halal: "SH11223 / 05-04-2024",
    sk: "SK003 / 25-04-2024",
  },
  {
    id: 4,
    nama: "Sri Rahayu",
    no_ktp: "3204011988010004",
    no_kontak: "081456789012",
    sertif_penyelia_halal: "SH33456 / 15-05-2024",
    sk: "SK004 / 30-05-2024",
  },
  {
    id: 5,
    nama: "Budi Santoso",
    no_ktp: "3205011985010005",
    no_kontak: "081567890123",
    sertif_penyelia_halal: "SH55678 / 20-06-2024",
    sk: "SK005 / 05-07-2024",
  },
]);

const handleAddProductConfirm = (formData) => {
  console.log("Add confirmed:", formData);
};

const handleDeleteOutletConfirm = (oulet) => {
  console.log("Delete outlet confirmed:", oulet);
};

const handleDeletePabrikConfirm = (pabrik) => {
  console.log("Delete pabrik confirmed:", pabrik);
};

const file = ref<File | null>(null);
const fileInputRef = ref<HTMLInputElement | null>(null);

// Mock data for document list
const documentList = ref([
  { nama: "Izin Edar", fileName: "Surat Izin Usaha.pdf", file: null },
  { nama: "Izin Masuk", fileName: "", file: null },
]);

// Handle file removal
const removeFile = (index: number) => {
  documentList.value[0].fileName = "";
  documentList.value[0].file = null;

  file.value = null;
};

const uploadFile = (event: Event, index: string | number) => {
  const fileUpload = event.target.files[0];
  if (fileUpload) {
    documentList.value[0].fileName = fileUpload.name;
    documentList.value[0].file = fileUpload;
  }
};

// Handle file upload
const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    file.value = input.files[0];
    console.log("File uploaded:", file.value.name);
  } else {
    console.log("No file selected");
  }
};

// Trigger file input click
const triggerFileInputClick = () => {
  fileInputRef.value?.click();
};

const data = {
  sertifikasi_date: ref([]),
};

const selectedFasilitator = ref("");
const searchFasilitator = ref("");

const fasilitators = ref([
  { id: 1, name: "Fasilitator A" },
  { id: 2, name: "Fasilitator B" },
  { id: 3, name: "Fasilitator C" },
]);

const filteredFasilitators = computed(() => {
  return fasilitators.value.filter((fasilitator) =>
    fasilitator.name
      .toLowerCase()
      .includes(searchFasilitator.value.toLowerCase())
  );
});

const onFasilitatorSearchInput = debounce((input) => {
  console.log(input, "ini input");
  searchFasilitator.value = input;
}, 500);
</script>

<template>
  <VContainer class="pa-0">
    <!-- Title and Buttons Row -->
    <VRow>
      <VCol>
        <p class="text-h4">Detail Pengajuan</p>
      </VCol>
      <VCol class="d-flex justify-end align-center" cols="4" md="5">
        <VBtn variant="outlined" class="mx-2"> Lihat Laporan </VBtn>
        <VBtn color="#49A84C" class="mx-2"> Tandai OK </VBtn>
        <VBtn variant="outlined" color="error" class="mx-2">
          Batalkan Status Hijau
        </VBtn>
        <VBtn variant="outlined" class="mx-2"> Pengembalian </VBtn>
        <VBtn color="#E1442E" class="mx-2"> Dibatalkan </VBtn>
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

    <!-- Tab Content Pelaku Usaha -->
    <VContainer v-if="tab === 'pelaku_usaha'">
      <VRow>
        <VCol>
          <VCard variant="flat" class="pa-4">
            <div
              class="d-flex justify-space-between align-center"
              @click="showDetail = !showDetail"
            >
              <p class="text-h4" style="font-weight: bold">
                Pengajuan Sertifikasi Halal
              </p>
              <VIcon
                :icon="showDetail ? 'mdi-chevron-up' : 'mdi-chevron-down'"
              />
            </div>
            <VExpandTransition>
              <div v-if="showDetail">
                <VCardText>
                  <div class="d-flex flex-column">
                    <!-- Static Details -->
                    <VRow>
                      <VCol cols="12">
                        <div class="info-row">
                          <span class="label">Nama</span>
                          <span class="colon">:</span>
                          <span class="value"
                            >Sartika/Industri Makanan Ringan</span
                          >
                        </div>
                      </VCol>
                      <VCol cols="12">
                        <div class="info-row">
                          <span class="label">Alamat</span>
                          <span class="colon">:</span>
                          <span class="value"
                            >Sumbawa Banget, RT002/RW002, Sumbang, Curio, Jawa
                            Barat</span
                          >
                        </div>
                      </VCol>
                      <VCol cols="12">
                        <div class="info-row">
                          <span class="label">Jenis Badan Usaha</span>
                          <span class="colon">:</span>
                          <span class="value">Lainnya</span>
                        </div>
                      </VCol>
                      <VCol cols="12">
                        <div class="info-row">
                          <span class="label">Skala Usaha</span>
                          <span class="colon">:</span>
                          <span class="value">Mikro</span>
                        </div>
                      </VCol>
                      <VDivider />
                      <VCol cols="12">
                        <div class="info-row">
                          <span class="label">Penanggung Jawab</span>
                          <span class="colon">:</span>
                          <span class="value">Sumayah</span>
                        </div>
                      </VCol>
                    </VRow>
                  </div>
                </VCardText>
              </div>
            </VExpandTransition>
          </VCard>
        </VCol>
      </VRow>
      <VRow>
        <VCol>
          <VCard variant="flat" class="pa-4">
            <p class="text-h4" style="font-weight: bold">Penanggung Jawab</p>
            <!-- Nama Usaha -->
            <VCol cols="12">
              <VLabel class="required"> Jenis Badan Usaha </VLabel>
              <VTextField required placeholder="Jenis Badan Usaha" />
            </VCol>
            <VCol cols="12">
              <VLabel class="required"> Nomor Kontak </VLabel>
              <VTextField required placeholder="Nomor Kontak" />
            </VCol>
            <VCol cols="12">
              <VLabel class="required"> Email </VLabel>
              <VTextField required placeholder="Email" />
            </VCol>
          </VCard>
        </VCol>
      </VRow>
      <VRow>
        <VCol>
          <VCard variant="flat" class="pa-4">
            <VRow>
              <VCol>
                <p class="text-h3">Aspek Legal</p>
              </VCol>
              <VCol class="d-flex justify-end align-center" cols="6" md="2">
                <TambahDataAspekLegal
                  mode="add"
                  @confirm-add="handleAddProductConfirm"
                  @cancel="() => console.log('Add cancelled')"
                />
              </VCol>
            </VRow>
            <VRow>
              <VCol>
                <VDataTableServer
                  :items-per-page-options="[10, 25, 50, 100]"
                  v-model:items-per-page="itemPerPage"
                  v-model:page="page"
                  :headers="legalTableHeader"
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
                <p class="text-h3">Penyelia Halal</p>
              </VCol>
              <VCol class="d-flex justify-end align-center" cols="6" md="2">
                <TambahDataPenyeliaHalal
                  mode="add"
                  @confirm-add="handleAddProductConfirm"
                  @cancel="() => console.log('Add cancelled')"
                />
              </VCol>
            </VRow>
            <VRow>
              <VCol>
                <VDataTableServer
                  :items-per-page-options="[10, 25, 50, 100]"
                  v-model:items-per-page="itemPerPage"
                  v-model:page="page"
                  :headers="penyeliaTableHeader"
                  :items="penyeliaTableData"
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
                <h3 class="text-h4 font-weight-bold">
                  Dokumen Persyaratan Fasilitas
                </h3>
              </VCol>
            </VRow>
            <VRow>
              <VCol>
                <VRow>
                  <VCol>
                    <VAlert
                      type="warning"
                      variant="tonal"
                      color="#652672"
                      density="compact"
                    >
                      <p>
                        File yang digunakan dengan extention XLSX, PDF, PNG dan
                        Maksimal 50mb
                      </p>
                    </VAlert>
                  </VCol>
                </VRow>
              </VCol>
            </VRow>
            <VRow>
              <VCol>
                <VTable class="fixed-table">
                  <thead>
                    <tr>
                      <th style="inline-size: 50px">No</th>
                      <th style="inline-size: 150px">Nama</th>
                      <th style="inline-size: 400px">Dokumen</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(doc, index) in documentList" :key="index">
                      <td>{{ index + 1 }}</td>
                      <td>{{ doc.nama }}</td>
                      <td>
                        <VCols v-if="documentList[0].fileName" cols="6">
                          <!-- Display file name with remove button -->
                          <VTextField
                            v-model="documentList[0].fileName"
                            dense
                            outlined
                            readonly
                            style="
                              max-inline-size: 300px;
                              padding-inline-end: 0;
                            "
                          >
                            <template #append-inner>
                              <VBtn variant="text" @click="removeFile">
                                <VIcon color="error">
                                  ri-delete-bin-fill
                                </VIcon>
                              </VBtn>
                            </template>
                          </VTextField>
                        </VCols>
                        <VCols v-else cols="6">
                          <!-- File upload input -->
                          <VFileInput
                            v-model="file"
                            dense
                            prepend-icon=""
                            hide-details
                            label="No File Chosen"
                            style="max-inline-size: 400px"
                            class="custom-file-input"
                            @change="uploadFile"
                          >
                            <!-- Button upload input -->
                            <template #append-inner>
                              <VBtn
                                color="primary"
                                variant="flat"
                                class="choose-file"
                                style="block-size: 100%; inline-size: 150px"
                              >
                                Choose File
                              </VBtn>
                            </template>
                          </VFileInput>
                        </VCols>
                      </td>
                    </tr>
                  </tbody>
                </VTable>
              </VCol>
            </VRow>
          </VCard>
        </VCol>
      </VRow>
    </VContainer>

    <!-- Tab Content Pengajuan -->
    <VRow v-if="tab === 'pengajuan'">
      <VCol>
        <VCard variant="flat" class="pa-4">
          <div
            class="d-flex justify-space-between align-center"
            @click="showPengajuan = !showPengajuan"
          >
            <p class="text-h4" style="font-weight: bold">Data Pengajuan</p>
            <VIcon
              :icon="showPengajuan ? 'mdi-chevron-up' : 'mdi-chevron-down'"
            />
          </div>
          <VExpandTransition>
            <div v-if="showPengajuan">
              <VCardText>
                <div class="d-flex flex-column">
                  <!-- Static Details -->
                  <VRow>
                    <VCol cols="12">
                      <div class="info-row">
                        <span class="label">No. ID</span>
                        <span class="colon">:</span>
                        <span class="value">39886986</span>
                      </div>
                    </VCol>
                    <VCol cols="12">
                      <div class="info-row">
                        <span class="label">Tanggal</span>
                        <span class="colon">:</span>
                        <span class="value">10/10/2024</span>
                      </div>
                    </VCol>
                    <VCol cols="12">
                      <div class="info-row">
                        <span class="label">Jenis Pengajuan</span>
                        <span class="colon">:</span>
                        <span class="value">Baru</span>
                      </div>
                    </VCol>
                  </VRow>

                  <!-- Form Fields -->
                  <VRow>
                    <!-- Jenis Pendaftaran -->
                    <VCol cols="12">
                      <VLabel class="required"> Jenis Pendaftaran </VLabel>
                      <VSelect
                        density="compact"
                        :items="['Self Declare', 'Lainnya']"
                        required
                      />
                    </VCol>

                    <!-- Kode Daftar / Fasilitasi -->
                    <VCol cols="12">
                      <VLabel class="required">
                        Kode Daftar / Fasilitasi
                      </VLabel>
                      <VRow align="center" class="mb-2">
                        <VCol cols="5.5">
                          <VSelect
                            v-model="selectedFasilitator"
                            :items="filteredFasilitators"
                            item-title="name"
                            item-value="id"
                            :search-input="searchFasilitator"
                            clearable
                            required
                            @update:search-input="onFasilitatorSearchInput"
                          />
                        </VCol>
                        <span>Atau</span>
                        <VCol cols="5.5">
                          <VTextField
                            v-model="searchFasilitator"
                            append-inner-icon="mdi-magnify"
                            required
                          />
                        </VCol>
                      </VRow>
                      <VAlert
                        type="warning"
                        variant="tonal"
                        color="#652672"
                        class="mt-3"
                      >
                        Kode unik yang diterbitkan oleh BPJPH yang diberikan
                        kepada fasilitator sebagai kode untuk mendaftarkan
                        sertifikasi halal gratis
                      </VAlert>
                    </VCol>
                    <VDivider class="mt-2" />
                    <!-- Nomor Surat Permohonan & Tanggal Surat Pemohon -->
                    <VCol cols="6">
                      <VLabel class="required"> Nomor Surat Permohonan </VLabel>
                      <VTextField
                        required
                        placeholder="Isi Nomor Surat Permohonan"
                      />
                    </VCol>
                    <VCol cols="6">
                      <VItemGroup>
                        <!-- Date TextField -->
                        <Vuepicdatepicker>
                          <template #trigger>
                            <Vuepicdatepicker
                              v-model:model-value="data.sertifikasi_date.value"
                              auto-apply
                              model-type="dd/MM/yyyy"
                              :enable-time-picker="false"
                              teleport
                              clearable
                            >
                              <template #trigger>
                                <VLabel class="required">
                                  Tanggal Surat Pemohon
                                </VLabel>
                                <VTextField
                                  placeholder="Pilih Tanggal Surat Pemohon"
                                  disabled
                                  append-inner-icon="fa-calendar"
                                  :model-value="data.sertifikasi_date.value"
                                  color="#757575"
                                />
                              </template>
                            </Vuepicdatepicker>
                          </template>
                        </Vuepicdatepicker>
                      </VItemGroup>
                    </VCol>

                    <!-- Jenis Layanan -->
                    <VCol cols="12">
                      <VLabel class="required"> Jenis Layanan </VLabel>
                      <VSelect
                        :items="['Layanan A', 'Layanan B']"
                        required
                        placeholder="Pilih Jenis Layanan"
                      />
                    </VCol>

                    <!-- Jenis Produk -->
                    <VCol cols="12">
                      <VLabel class="required"> Jenis Produk </VLabel>
                      <VSelect
                        :items="['Produk A', 'Produk B']"
                        required
                        placeholder="Pilih Jenis Produk"
                      />
                    </VCol>

                    <!-- Nama Usaha -->
                    <VCol cols="12">
                      <VLabel class="required"> Jenis Usaha </VLabel>
                      <VTextField required placeholder="Pilih Jenis Usaha" />
                    </VCol>

                    <!-- Area Pemasaran -->
                    <VCol cols="12">
                      <VLabel class="required"> Area Pemasaran </VLabel>
                      <VSelect
                        placeholder="Pilih Area Pemasaran"
                        :items="['Nasional', 'Internasional']"
                        required
                      />
                    </VCol>

                    <!-- Lokasi Pendamping -->
                    <VCol cols="12">
                      <VLabel class="required"> Lokasi Pendamping </VLabel>
                      <VSelect
                        placeholder="Pilih Area Pendamping"
                        :items="['Lokasi A', 'Lokasi B']"
                        required
                      />
                    </VCol>

                    <!-- Lembaga Pendamping -->
                    <VCol cols="12">
                      <VLabel class="required"> Lembaga Pendamping </VLabel>
                      <VSelect
                        placeholder="Pilih Lembaga Pendamping"
                        :items="['Lembaga A', 'Lembaga B']"
                        required
                      />
                    </VCol>

                    <!-- Pendamping -->
                    <VCol cols="12">
                      <VLabel class="required"> Pendamping </VLabel>
                      <VSelect
                        placeholder="Pilih Pendamping"
                        :items="['Pendamping A', 'Pendamping B']"
                        required
                      />
                    </VCol>
                  </VRow>
                </div>
              </VCardText>

              <!-- Action Buttons -->
              <VCardActions>
                <VSpacer />
                <Permohonan />
                <Pernyataan />
              </VCardActions>
            </div>
          </VExpandTransition>
        </VCard>
      </VCol>
    </VRow>

    <!-- Tab Content Pabrik dan Outlet -->
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
                  :items-per-page-options="[10, 25, 50, 100]"
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
                <TambahOutlet
                  mode="add"
                  @confirm-add="handleAddProductConfirm"
                  @cancel="() => console.log('Add cancelled')"
                />
              </VCol>
            </VRow>
            <VRow>
              <VCol>
                <VDataTableServer
                  :items-per-page-options="[10, 25, 50, 100]"
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

    <!-- Tab Content Bahan -->
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
                <VBtn
                  color="primary"
                  variant="outlined"
                  class="d-flex align-center"
                  @click="triggerFileInputClick"
                >
                  <VIcon size="20"> ri-upload-line </VIcon>
                  <span class="ml-2">Upload File</span>
                </VBtn>
                <!-- Hidden File Input -->
                <input
                  ref="fileInputRef"
                  type="file"
                  style="display: none"
                  accept=".pdf,.doc,.docx"
                  @change="handleFileUpload"
                />
              </VContainer>
            </VCol>
          </VRow>
          <VRow>
            <VCol>
              <VAlert type="warning" variant="tonal" color="#652672">
                <ol>
                  <li>
                    1. Termasuk isikan bahan dengan kategori cleaning agent
                    seperti: Air, Sabun Pencuci, Detergent, dll
                  </li>
                  <li>
                    2. Isikan nama kemasan produk, contoh: Alumunium foil,
                    standing pouch, plastik, dll
                  </li>
                </ol>
              </VAlert>
            </VCol>
          </VRow>
          <VRow>
            <VCol>
              <VDataTableServer
                :items-per-page-options="[10, 25, 50, 100]"
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

    <!-- Tab Content Produk -->
    <VRow v-if="tab === 'produk'">
      <VCol>
        <VCard variant="flat" class="pa-4">
          <VRow>
            <VCol>
              <p class="text-h3">Daftar Nama Bahan dan Kemasan</p>
              <ol>
                <li>
                  Termasuk isikan bahan dengan kategori cleaning agent seperti:
                  Air, Sabun Pencuci, Detergent, dll
                </li>
                <li>
                  Isikan nama kemasan produk, contoh: Alumunium foil, standing
                  pouch, plastik, dll
                </li>
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
                :items-per-page-options="[10, 25, 50, 100]"
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
                      :initial-data="selectedProduct"
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

    <!-- Tab Content Melacak -->
    <VRow v-if="tab === 'melacak'">
      <VCol>
        <VCard variant="flat" class="pa-4">
          <div
            class="d-flex justify-space-between align-center"
            @click="showTimeline = !showTimeline"
          >
            <p class="text-h4">Pengajuan Sertifikasi Halal</p>
            <VIcon
              :icon="showTimeline ? 'mdi-chevron-up' : 'mdi-chevron-down'"
            />
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
                      <div class="text-caption text-grey">
                        {{ item.user }}
                      </div>
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

<style lang="scss">
.custom-file-input {
  .v-field--append {
    padding-inline-end: 0 !important;
  }
}
</style>

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

.info-row {
  display: flex;
  align-items: center;
}

.label {
  min-width: 300px; /* Adjust this value based on the longest label */
  font-weight: 500;
}

.colon {
  margin: 0 8px; /* Space between colon and value */
}

.value {
  flex: 1;
  text-align: left;
}

.required::after {
  color: red;
  content: "*";
}

:deep .choose-file {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  margin-right: 0;
  scroll-margin-inline-end: 0;
}
</style>
