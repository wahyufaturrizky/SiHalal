<script setup lang="ts">
import { computed, ref } from "vue";
import { useDisplay } from "vuetify";

// State untuk checkbox
const kunciLembaga = ref(false);
const route = useRoute();
const router = useRouter();
const loadingDelete = ref(false);
const loadingLock = ref(false);
const loadingAdd = ref(false);
const itemPerPage = ref(10);
const totalItems = ref(0);

const facilitateId = route.params.id;
const loading = ref(false);
const page = ref(1);

// Data tabel
const items = ref([]);

// Form data dan dialog
const formRef = ref(null);
const selectedItem = ref(null);
const addDialog = ref(false);
const deleteDialog = ref(false);

// Data untuk form tambah lembaga
const formData = ref({
  institutionName: "Universitas Islam Negeri Sunan Gunung Djati Bandung",
  picName: "",
  picPhoneNumber: "",
});

const loadItemById = async (page: number, size: number) => {
  try {
    loading.value = true;

    const response = await $api(`/facilitate/lembaga/list/${facilitateId}`, {
      method: "get",
      params: {
        page,
        size,
      },
    });

    if (response.code === 2000) {
      items.value = response.data?.map((item) => {
        const { id, nama_pic_lembaga, nomor_pic_lembaga, nama_lph_lp3h } = item;

        return {
          no: id,
          institutionName: nama_lph_lp3h,
          picName: nama_pic_lembaga,
          picPhoneNumber: nomor_pic_lembaga,
        };
      });

      totalItems.value = response?.total_item;

      loading.value = false;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
      loading.value = false;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loading.value = false;
  }
};

const deleteFacilitateLembaga = async (id: string) => {
  try {
    loadingDelete.value = true;

    const res = await $api(`/facilitate/lembaga/delete/${id}`, {
      method: "delete",
    });

    if (res?.code === 2000) {
      loadingDelete.value = false;
      router.go(-1);
    } else {
      useSnackbar().sendSnackbar("Gagal update data", "error");
      loadingDelete.value = false;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingDelete.value = false;
  }
};

// Reset form
const resetForm = () => {
  formData.value = {
    institutionName: "",
    picName: "",
    picPhoneNumber: "",
  };
};

const addFacilitateLembaga = async () => {
  try {
    loadingAdd.value = true;

    const { picName, picPhoneNumber, institutionName } = formData.value;

    let tempBody = {
      fac_id: facilitateId,
      nama_pic_lembaga: picName,
      nomor_pic_lembaga: picPhoneNumber,
    };

    if (
      institutionName === "Universitas Islam Negeri Sunan Gunung Djati Bandung"
    ) {
      tempBody = {
        ...tempBody,
        lp_id: "0000df86-2b61-4778-8f70-30b8166286cb",
      };
    } else {
      tempBody = {
        ...tempBody,
        lph_id: "01e3d771-2d0b-0bd4-30a8-f294a6871d24",
      };
    }

    const res = await $api("/facilitate/lembaga/add", {
      method: "post",
      body: tempBody,
    });

    if (res?.code === 2000) {
      loadingAdd.value = false;
      resetForm();
      addDialog.value = false;
      router.go(-1);
    } else {
      useSnackbar().sendSnackbar("Gagal update data", "error");
      loadingAdd.value = false;
      resetForm();
      addDialog.value = false;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingAdd.value = false;
    resetForm();
    addDialog.value = false;
  }
};

const updateLockFacilitateLembaga = async () => {
  try {
    loadingLock.value = true;

    const res = await $api("/facilitate/lembaga/lock", {
      method: "put",
      body: {
        fac_id: facilitateId,
        is_locked_lembaga: kunciLembaga.value,
      },
    });

    if (res?.code === 2000) {
      loadingLock.value = false;
    } else {
      useSnackbar().sendSnackbar("Gagal update data", "error");
      loadingLock.value = false;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingAdd.value = false;
  }
};

onMounted(async () => {
  await loadItemById(1, itemPerPage.value);
});

// Header tabel
const headers = [
  { title: "No", key: "no" },
  { title: "Nama LPH / LP3H", key: "institutionName" },
  { title: "Nama Penanggung Jawab", key: "picName" },
  { title: "Nomor Penanggung Jawab", key: "picPhoneNumber" },
  { title: "Action", value: "action", sortable: false },
];

// Fungsi tambah data
const tambahData = () => {
  addFacilitateLembaga();
};

const confirmDelete = (item: any) => {
  selectedItem.value = item;
  deleteDialog.value = true;
};

const hapusData = () => {
  const index = selectedItem.value;

  deleteFacilitateLembaga(index);

  deleteDialog.value = false;
};

const { mdAndUp } = useDisplay();
const dialogMaxWidth = computed(() => (mdAndUp ? 700 : "90%"));
</script>

<template>
  <VContainer>
    <!-- Checkbox Kunci Lembaga -->
    <VCard class="mb-6">
      <VCardText>
        <VRow>
          <VCol cols="3">
            <label for="kunciLembaga">Kunci Lembaga (LPH / LP3H) </label>
          </VCol>
          <VCol cols="9">
            <VCheckbox
              id="kunciLembaga"
              v-model="kunciLembaga"
              label="Kunci (LPH/LP3H)"
              :disabled="loadingLock"
              @change="updateLockFacilitateLembaga"
            />
            <span
              >Dengan mengunci lembaga (LPH/LP3H), maka pelaku usaha hanya bisa
              memilih lembaga sesuai dengan isian pada form di bawah ini.</span
            >
          </VCol>
        </VRow>
      </VCardText>
    </VCard>

    <VCard class="pa-4">
      <VCardText class="d-flex justify-space-between align-center">
        <p class="text-h4">List Lembaga</p>
        <VBtn
          color="primary"
          class="mb-4"
          append-icon="ri-add-line"
          @click="addDialog = true"
        >
          Tambah
        </VBtn>
      </VCardText>

      <VDataTableServer
        v-model:items-per-page="itemPerPage"
        v-model:page="page"
        :headers="headers"
        :items="items"
        :loading="loading"
        :items-length="totalItems"
        loading-text="Loading..."
        @update:options="loadItemById(page, itemPerPage)"
      >
        <template #item.no="{ index }">
          {{ index + 1 + (page - 1) * itemPerPage }}
        </template>
        <template #item.action="{ item }">
          <div class="d-flex gap-1">
            <IconBtn size="small">
              <VIcon
                color="error"
                style="cursor: pointer"
                @click="confirmDelete(item.no)"
              >
                ri-delete-bin-6-line
              </VIcon>
            </IconBtn>
          </div>
        </template>
      </VDataTableServer>
    </VCard>

    <VDialog v-model="addDialog" :max-width="dialogMaxWidth">
      <VCard class="pa-4">
        <VCardTitle class="text-h4"> Tambah Lembaga </VCardTitle>
        <VCardText>
          <VForm ref="formRef">
            <label class="text-h6" for="institutionName">
              Lembaga Pendamping
            </label>
            <VSelect
              id="institutionName"
              v-model="formData.institutionName"
              placeholder="Pilih Lembaga Pendamping"
              :items="[
                'Universitas Islam Negeri Sunan Gunung Djati Bandung',
                'LPH LPPOM MUI Sulawesi Utara',
              ]"
              required
              class="mb-4"
            />
            <label class="text-h6" for="picName">
              Nama Penanggung Jawab Program LPH / LP3H
            </label>
            <VTextField
              id="picName"
              v-model="formData.picName"
              placeholder="Isi Nama Penanggung Jawab Program LPH / LP3H "
              required
              class="mb-4"
            />
            <label class="text-h6" for="picName">
              Nomor Kontak Penanggung Jawab Program LPH / LP3H
            </label>
            <VTextField
              v-model="formData.picPhoneNumber"
              placeholder="Isi Nomor Kontak Penanggung Jawab Program LPH / LP3H "
              required
              class="mb-4"
            />
          </VForm>
        </VCardText>
        <VCardActions>
          <VSpacer />
          <VBtn text variant="outlined" @click="addDialog = false">
            Batal
          </VBtn>
          <VBtn
            :disabled="loadingAdd"
            color="primary"
            text
            variant="flat"
            @click="tambahData"
          >
            {{ loadingAdd ? "Loading..." : "Tambah" }}
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <VDialog v-model="deleteDialog" :max-width="dialogMaxWidth">
      <VCard class="pa-4">
        <VCardTitle class="text-h4"> Hapus Data Lembaga </VCardTitle>
        <VCardText>Yakin ingin menghapus data lembaga? </VCardText>
        <VCardActions>
          <VSpacer />
          <VBtn
            text
            color="primary"
            variant="outlined"
            @click="deleteDialog = false"
          >
            Batal
          </VBtn>
          <VBtn
            :disabled="loadingDelete"
            color="error"
            variant="flat"
            text
            @click="hapusData"
          >
            {{ loadingDelete ? "Loading..." : "Ya, Hapus" }}
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </VContainer>
</template>
