<script setup lang="ts">
import { ref } from 'vue';
import { VDataTableServer } from "vuetify/components";

interface TimelineItem {
  title: string;
  user: string;
  date: string;
  color: string;
}

const tabs = ref([
  { text: 'Pelaku Usaha', value: 'pelaku_usaha' },
  { text: 'Pengajuan', value: 'pengajuan' },
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

const items = ref<
  {
    id: string;
    jenis_bahan: string;
    nama_bahan: string;
    produsen: string;
    no_sertifikat_halal: string;
    keterangan: string;
  }[]
>([]);

const itemPerPage = ref(10);
const totalItems = ref(0);
const loading = ref(false);
const page = ref(1);

const loadItem = async (page: number, size: number, keyword: string = "") => {
  try {
    loading.value = true;

    const response = await $api("/shln/verificator", {
      method: "get",
      params: {
        page,
        size,
        keyword,
      },
    });

    items.value = response.data;
    totalItems.value = response.total_item;
    loading.value = false;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loading.value = false;
  }
};

const debouncedFetch = debounce(loadItem, 500);

onMounted(async () => {
  await loadItem(1, itemPerPage.value, "");
});

const refresh = async () => {
  await loadItem(1, itemPerPage.value, "");
};

const verifikatorTableHeader = [
  { title: "No", key: "id" },
  { title: "Jenis Bahan", key: "jenis_bahan" },
  { title: "Nama Bahan", key: "nama_bahan" },
  { title: "Produsen", key: "produsen" },
  { title: "Nomor Sertifikat Halal", key: "nomor_sertifikat_halal" },
  { title: "Keterangan", key: "keterangan" },
  { title: "Action", key: "action" },
];

const handleAddProductConfirm = formData => {
  console.log('Add confirmed:', formData)
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
        <v-btn variant="outlined" class="mx-2">Lihat Laporan</v-btn>
        <v-btn color="#49A84C" class="mx-2">Tandai OK</v-btn>
        <v-btn variant="outlined" color="error" class="mx-2">
          Batalkan Status Hijau
        </v-btn>
        <v-btn variant="outlined" class="mx-2">Pengembalian</v-btn>
        <v-btn color="#E1442E" class="mx-2">Dibatalkan</v-btn>
      </VCol>
    </VRow>

    <!-- Tabs -->
    <VRow>
      <VCol>
        <v-tabs v-model="tab" align-tabs="start" height="60">
          <v-tab v-for="item in tabs" :key="item.value" :value="item.value">
            {{ item.text }}
          </v-tab>
        </v-tabs>
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
