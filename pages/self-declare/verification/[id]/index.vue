<script setup lang="ts">
import { ref } from "vue";
import { VDataTableServer } from "vuetify/components";

const route = useRoute();
const router = useRouter();

const selfDeclareId = (route.params as any).id;

interface TimelineItem {
  title: string;
  user: string;
  date: string;
  color: string;
}

const detailData = ref();
const loadingAll = ref(true);
const loadingTandaiOK = ref(false);
const loadingTandaiNotOK = ref(false);
const loadingPengembalian = ref(false);

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
const showDetail = ref(true);
const loadingDibatalkan = ref(false);
const loadingBahan = ref(false);

const itemPerPageBahan = ref(10);
const totalItemsBahan = ref(0);
const pageBahan = ref(1);

const itemPerPage = ref(10);
const totalItems = ref(0);
const loading = ref(false);
const page = ref(1);
const dataPengajuanSertifikasiHalal = ref();
const jenisBadanUsahaPenanggungJawab = ref();
const nomorKontakPenanggungJawab = ref();
const emailPenanggungJawab = ref();
const aspekLegal = ref();
const penyeliaHalal = ref();
const dokumen = ref();
const listBahan = ref([]);

const loadItem = async (page, size) => {
  // Temporarily skip API call for dummy data testing
  items.value = items.value.slice((page - 1) * size, page * size); // Paginate dummy data
  totalItems.value = items.value.length;
};

const loadItemBahanById = async ({
  page,
  size,
}: {
  page: number;
  size: number;
}) => {
  loadingBahan.value = true;
  try {
    const response: any = await $api(
      `/self-declare/verificator/bahan/${selfDeclareId}`,
      {
        method: "get",
        params: {
          page,
          size,
        },
      }
    );

    if (response.code === 2000) {
      listBahan.value = response.data;
      totalItemsBahan.value = response.total;
      loadingBahan.value = false;
      return response;
    } else {
      loadingBahan.value = false;
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  } catch (error) {
    loadingBahan.value = false;
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const loadItemById = async () => {
  try {
    const response: any = await $api(
      `/self-declare/verificator/${selfDeclareId}`,
      {
        method: "get",
      }
    );

    if (response.code === 2000) {
      const { data } = response || {};
      const {
        certificate_halal,
        penanggung_jawab,
        aspek_legal,
        penyelia_halal,
      } = data || {};
      const { nama_pj, nomor_kontak_pj, email_pj } = penanggung_jawab || {};
      const { nama_pu, alamat_pu, jenis_badan_usaha, skala_usaha } =
        certificate_halal || {};

      jenisBadanUsahaPenanggungJawab.value = jenis_badan_usaha;
      nomorKontakPenanggungJawab.value = nomor_kontak_pj;
      emailPenanggungJawab.value = email_pj;

      aspekLegal.value = aspek_legal;

      penyeliaHalal.value = penyelia_halal;

      dataPengajuanSertifikasiHalal.value = [
        {
          label: "Nama",
          value: nama_pu,
        },
        {
          label: "Alamat",
          value: alamat_pu,
        },
        {
          label: "Jenis Badan Usaha",
          value: jenis_badan_usaha,
        },
        {
          label: "Skala Usaha",
          value: skala_usaha,
        },
        {
          label: "Penanggung Jawab",
          value: nama_pj,
        },
      ];

      detailData.value = response.data;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  } catch (error) {
    console.log("@error", error);

    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const loadDocument = async () => {
  try {
    const response: any = await $api("/master/dokumen", {
      method: "get",
    });

    if (response.length > 0) {
      dokumen.value = response;
      return response;
    }
  } catch (error) {
    console.log("@error", error);

    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

onMounted(async () => {
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
  ];

  totalItems.value = items.value.length; // Set totalItems for pagination

  const res: any = await Promise.all([
    loadItemById(),
    loadDocument(),
    loadItemBahanById({ page: pageBahan.value, size: itemPerPageBahan.value }),
  ]);

  const checkResIfUndefined = res.every((item: any) => {
    return item !== undefined;
  });

  if (checkResIfUndefined) {
    loadingAll.value = false;
  } else {
    loadingAll.value = false;
  }
});

const verifikatorTableHeader = [
  { title: "No", key: "id" },
  { title: "Jenis Bahan", key: "jenis_bahan" },
  { title: "Nama Bahan", key: "nama_bahan" },
  { title: "Produsen", key: "produsen" },
  { title: "Nomor Sertifikat Halal", key: "nomor_sertifikat_halal" },
  { title: "Keterangan", key: "keterangan" },
  { title: "Action", key: "action" },
];

const bahanTableHeader = [
  { title: "No", key: "no" },
  { title: "Jenis Bahan", key: "jenis_bahan" },
  { title: "Nama Bahan", key: "nama_bahan" },
  { title: "Produsen", key: "produsen" },
  { title: "Tanggal Berlaku", key: "tanggal_berlaku" },
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
  { title: "No", key: "id_reg_legal" },
  { title: "Jenis", key: "jenis_surat" },
  { title: "No. Dokumen", key: "no_surat" },
  { title: "Tanggal", key: "tanggal_surat" },
  { title: "Masa Berlaku", key: "masa_berlaku" },
  { title: "Instansi Penerbit", key: "instansi_penerbit" },
];

const penyeliaTableHeader = [
  { title: "No", key: "penyelia_id" },
  { title: "Nama", key: "penyelia_nama" },
  { title: "No. KTP", key: "no_ktp" },
  { title: "No. Kontak", key: "no_kontak" },
  { title: "No/Tgl Sertif Penyelia Halal", key: "no_penyelia_halal" },
  { title: "Tgl SK", key: "tanggal_sk" },
  { title: "Tgl Penyelia Halal", key: "tgl_penyelia_halal" },
  { title: "No SK", key: "no_sk" },
  { title: "Action", key: "action" },
];

const headersDokumenPersyaratanFasilitas = [
  { title: "No", key: "id" },
  { title: "Nama", key: "nama" },
  { title: "Dokumen", key: "doc" },
];

const itemsDokumenPersyaratanFasilitas = ref([
  {
    id: 1,
    nama: "Dokumen 1",
    doc: "Dokumen 1",
  },
  {
    id: 2,
    nama: "Dokumen 2",
    doc: "Dokumen 2",
  },
]);

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

const onFasilitatorSearchInput = debounce((input: any) => {
  console.log(input, "ini input");
  searchFasilitator.value = input;
}, 500);

const tandaiOK = async () => {
  try {
    loadingTandaiOK.value = true;

    const res: any = await $api(
      `/self-declare/verificator/tandai-ok/${selfDeclareId}`,
      {
        method: "put",
      }
    );

    if (res?.code === 2000) {
      useSnackbar().sendSnackbar("Success", "success");
      loadingTandaiOK.value = false;

      setTimeout(() => {
        router.go(-1);
      }, 1000);
    } else {
      useSnackbar().sendSnackbar(res.errors.list_error.join(", "), "error");
      loadingTandaiOK.value = false;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingTandaiOK.value = false;
  }
};

const batalkanStatusHijau = async () => {
  try {
    loadingTandaiNotOK.value = true;

    const res: any = await $api(
      `/self-declare/verificator/tandai-not-ok/${selfDeclareId}`,
      {
        method: "put",
      }
    );

    if (res?.code === 2000) {
      useSnackbar().sendSnackbar("Success", "success");
      loadingTandaiNotOK.value = false;

      setTimeout(() => {
        router.go(-1);
      }, 1000);
    } else {
      useSnackbar().sendSnackbar(res.errors.list_error.join(", "), "error");
      loadingTandaiNotOK.value = false;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingTandaiNotOK.value = false;
  }
};

const pengembalian = async () => {
  try {
    loadingPengembalian.value = true;

    const res: any = await $api(
      `/self-declare/verificator/return/${selfDeclareId}`,
      {
        method: "put",
      }
    );

    if (res?.code === 2000) {
      useSnackbar().sendSnackbar("Success", "success");
      loadingPengembalian.value = false;

      setTimeout(() => {
        router.go(-1);
      }, 1000);
    } else {
      useSnackbar().sendSnackbar(res.errors.list_error.join(", "), "error");
      loadingPengembalian.value = false;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingPengembalian.value = false;
  }
};

const dibatalkan = async () => {
  try {
    loadingDibatalkan.value = true;

    const res: any = await $api(
      `/self-declare/verificator/decline/${selfDeclareId}`,
      {
        method: "put",
      }
    );

    if (res?.code === 2000) {
      useSnackbar().sendSnackbar("Success", "success");
      loadingDibatalkan.value = false;

      setTimeout(() => {
        router.go(-1);
      }, 1000);
    } else {
      useSnackbar().sendSnackbar(res.errors.list_error.join(", "), "error");
      loadingDibatalkan.value = false;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingDibatalkan.value = false;
  }
};
</script>

<template>
  <VContainer v-if="!loadingAll" class="pa-0">
    <!-- Title and Buttons Row -->
    <VRow>
      <VCol>
        <p class="text-h4">Detail Pengajuan</p>
      </VCol>
      <VCol class="d-flex justify-end align-center" cols="4" md="5">
        <VBtn variant="outlined" class="mx-2"> Lihat Laporan </VBtn>
        <VBtn
          :loading="loadingTandaiOK"
          @click="tandaiOK"
          color="#49A84C"
          class="mx-2"
        >
          Tandai OK
        </VBtn>
        <VBtn
          :loading="loadingTandaiNotOK"
          @click="batalkanStatusHijau"
          variant="outlined"
          color="error"
          class="mx-2"
        >
          Batalkan Status Hijau
        </VBtn>
        <VBtn
          :loading="loadingPengembalian"
          @click="pengembalian"
          variant="outlined"
          class="mx-2"
        >
          Pengembalian
        </VBtn>
        <VBtn
          :loading="loadingDibatalkan"
          @click="dibatalkan"
          color="#E1442E"
          class="mx-2"
        >
          Dibatalkan
        </VBtn>
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
                      <VCol
                        v-for="(item, index) in dataPengajuanSertifikasiHalal"
                        :key="index"
                        cols="12"
                      >
                        <div class="info-row">
                          <span class="label">{{ item.label }}</span>
                          <span class="colon">:</span>
                          <span class="value">{{ item.value }}</span>
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
              <VTextField
                v-model="jenisBadanUsahaPenanggungJawab"
                required
                placeholder="Jenis Badan Usaha"
              />
            </VCol>
            <VCol cols="12">
              <VLabel class="required"> Nomor Kontak </VLabel>
              <VTextField
                v-model="nomorKontakPenanggungJawab"
                required
                placeholder="Nomor Kontak"
              />
            </VCol>
            <VCol cols="12">
              <VLabel class="required"> Email </VLabel>
              <VTextField
                v-model="emailPenanggungJawab"
                required
                placeholder="Email"
              />
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
                  :dokumen="dokumen"
                  @refresh="loadItem(page, itemPerPage)"
                />
              </VCol>
            </VRow>
            <VRow>
              <VCol>
                <VDataTableServer
                  v-model:items-per-page="itemPerPage"
                  v-model:page="page"
                  :headers="legalTableHeader"
                  :items="aspekLegal"
                  :loading="loading"
                  :items-length="totalItems"
                  :hide-default-footer="true"
                  loading-text="Loading..."
                  @update:options="loadItem(page, itemPerPage)"
                >
                  <template #item.id_reg_legal="{ index }">
                    {{ index + 1 + (page - 1) * itemPerPage }}
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
                  @refresh="loadItem(page, itemPerPage)"
                  mode="add"
                />
              </VCol>
            </VRow>
            <VRow>
              <VCol>
                <VDataTableServer
                  v-model:items-per-page="itemPerPage"
                  v-model:page="page"
                  :headers="penyeliaTableHeader"
                  :items="penyeliaHalal"
                  :loading="loading"
                  :items-length="totalItems"
                  :hide-default-footer="true"
                  loading-text="Loading..."
                  @update:options="loadItem(page, itemPerPage)"
                >
                  <template #item.penyelia_id="{ index }">
                    {{ index + 1 + (page - 1) * itemPerPage }}
                  </template>
                  <!-- <template #item.action="{ item }">
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
                  </template> -->
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
                <VDataTableServer
                  :headers="headersDokumenPersyaratanFasilitas"
                  :items="itemsDokumenPersyaratanFasilitas"
                  :loading="loading"
                  :hide-default-footer="true"
                  loading-text="Loading..."
                  items-per-page="2"
                  page="1"
                  :items-length="2"
                >
                  <template #item.id="{ index }">
                    {{ index + 1 + (page - 1) * itemPerPage }}
                  </template>
                  <template #item.nama="{ item }">
                    {{ item.nama }}
                  </template>
                  <template #item.doc="{ item }">
                    <div>
                      <HalalFileInput />
                    </div>
                  </template>
                </VDataTableServer>
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
                <TambahPabrikOutlet mode="add" />
              </VCol>
            </VRow>
            <VRow>
              <VCol>
                <VDataTableServer
                  v-model:items-per-page="itemPerPage"
                  v-model:page="page"
                  :headers="pabrikTableHeader"
                  :items="[]"
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
                <TambahOutlet mode="add" />
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

    <!-- Tab Content Bahan -->
    <VRow v-if="tab === 'bahan'">
      <VCol>
        <VCard variant="flat" class="pa-4">
          <VRow>
            <VCol>
              <p class="text-h3">Daftar Nama Bahan dan Kemasan</p>
            </VCol>
            <VCol class="d-flex justify-end align-center" cols="0" md="2">
              <TambahBahanModalHalal mode="add" />
              <!-- <VContainer>
                <VBtn
                  color="primary"
                  variant="outlined"
                  class="d-flex align-center"
                  @click="triggerFileInputClick"
                >
                  <VIcon size="20"> ri-upload-line </VIcon>
                  <span class="ml-2">Upload File</span>
                </VBtn>

                <input
                  ref="fileInputRef"
                  type="file"
                  style="display: none"
                  accept=".pdf,.doc,.docx"
                  @change="handleFileUpload"
                />
              </VContainer> -->
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
                v-model:items-per-page="itemPerPageBahan"
                v-model:page="pageBahan"
                :headers="bahanTableHeader"
                :items="listBahan"
                :loading="loadingBahan"
                :items-length="totalItemsBahan"
                loading-text="Loading..."
                @update:options="
                  loadItemBahanById({ page: pageBahan, size: itemPerPageBahan })
                "
              >
                <template #item.no="{ index }">
                  {{ index + 1 + (pageBahan - 1) * itemPerPageBahan }}
                </template>
                <template #item.tanggal_berlaku="{ item }">
                  {{ formatDate((item as any).tanggal_berlaku) }}
                </template>
                <template #item.action="{ item }">
                  <div class="d-flex gap-1">
                    <UbahBahanModalHalal />
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
              <TambahProduk mode="add" />
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
                      :initial-data="selectedProduct"
                      icon="ri-pencil-fill"
                      :show-label="false"
                      color="#652672"
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
