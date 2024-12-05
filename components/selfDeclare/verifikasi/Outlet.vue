<script lang="ts" setup>
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
  { title: "Nama Pabrik", key: "nama_pabrik" },
  { title: "Alamat", key: "alamat" },
  { title: "Status", key: "status" },
]

const outletTableHeader = [
  { title: "No", key: "id" },
  { title: "Nama Outlet", key: "nama" },
  { title: "Alamat", key: "alamat" },
  { title: "Status", key: "status" },
]

const penyeliaTableHeader = [
  { title: "No", key: "id" },
  { title: "Nama", key: "nama" },
  { title: "No. KTP", key: "no_ktp" },
  { title: "No. Kontak", key: "no_kontak" },
  { title: "No/Tgl Sertif Penyelia Halal", key: "sertif_penyelia_halal" },
  { title: "No/Tgl SK", key: "sk" },
  { title: "Action", key: "action" },
]

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

const outletTableData = ref([
  {
    id: 1,
    nama: "My Drink Oke",
    alamat: "Sumbawa Banget, RT002/RW002, Sumbang, Curio, Kab.Enrekang, Sulawesi Selatan",
    status: "Milik Sendiri",
  }
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

// const props = defineProps({
//   data: {
//     type: Object,
//     required: true,
//   },
// });

// const { data } = props || {};
// const { importer, hcb, hcn, profile } = data || {};

const dataDetail = {
  name: "Sumayah",
  contact: "081234567899",
  email: "rasarasaa@gmail.com"
};

const selectedFilters = ref({
  fasilitas: 'Semua',
  jenisProduk: 'Semua',
  provinsi: 'Semua',
  lembaga: 'Semua',
  pendamping: 'Semua',
  kabupaten: 'Semua',
  skalaUsaha: 'Semua',
  jenisPengajuan: 'Semua',
  fac: 'Semua'
})
</script>

<template>
  <div class="mx-auto" max-width="800">
    <VRow>
      <VCol cols="12">
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
        </VDataTableServer>
      </VCol>
    </VRow>
  </div>
</template>

<style scoped>
.v-list-item-subtitle {
  white-space: nowrap; /* Prevents breaking into multiple lines */
}

.v-list-item-title {
  min-inline-size: 300px;
}
</style>
