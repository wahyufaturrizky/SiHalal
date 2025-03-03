<script setup lang="ts">
import { computed, ref } from "vue";
import { useDisplay } from "vuetify";

const props = defineProps({
  type: {
    type: String,
  },
  islockedlembaga: {
    type: Boolean,
  },
});

const { type, islockedlembaga } = props || {};

// State untuk checkbox
const kunciLembaga = ref(false);
const route = useRoute();
const loadingDelete = ref(false);
const loadingLock = ref(false);
const loadingAdd = ref(false);
const loadingItemsInstitutionName = ref(false);
const itemPerPage = ref(10);
const totalItems = ref(0);

const facilitateId = route.params.id;
const loading = ref(false);
const page = ref(1);

// Data tabel
const items = ref([]);
const itemsInstitutionName = ref([]);

// Form data dan dialog
const formRef = ref(null);
const selectedItem = ref(null);
const addDialog = ref(false);
const deleteDialog = ref(false);

// Data untuk form tambah lembaga
const formData = ref({
  institutionName: "",
  picName: "",
  picPhoneNumber: "",
});

kunciLembaga.value = islockedlembaga;

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
          isactive: item.isactive,
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

const loadItemLembagaPendamping = async () => {
  try {
    loadingItemsInstitutionName.value = true;

    const response = await $api(
      `/master/${
        type === "Reguler" ? "lembaga-pemeriksa-halal" : "lembaga-pendamping"
      }`,
      {
        method: "get",
      }
    );

    if (response) {
      itemsInstitutionName.value = response;

      loadingItemsInstitutionName.value = false;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
      loadingItemsInstitutionName.value = false;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingItemsInstitutionName.value = false;
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
      addDialog.value = false;
      await loadItemById(1, itemPerPage.value);
    } else {
      useSnackbar().sendSnackbar("Gagal update data", "error");
      loadingDelete.value = false;
      addDialog.value = false;
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

    if (type === "Reguler") {
      tempBody = {
        ...tempBody,
        lph_id: institutionName,
      };
    } else {
      tempBody = {
        ...tempBody,
        lp_id: institutionName,
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
      useSnackbar().sendSnackbar("Berhasil menambahkan data", "success");
      await loadItemById(1, itemPerPage.value);
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
    loadingLock.value = false;
  }
};

onMounted(async () => {
  await loadItemLembagaPendamping();
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

const checkIsFieldEMpty = (data: any) => {
  return Object.keys(data)?.find((key: any) => !data[key]);
};
</script>

<template>
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
                @click="confirmDelete((item as any).no)"
                :disabled="(item as any).isactive"
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
              {{
                type === "Reguler"
                  ? "Lembaga Pemeriksa Halal"
                  : "Lembaga Pendamping"
              }}
            </label>
            <VSelect
              id="institutionName"
              v-model="formData.institutionName"
              placeholder="Pilih Lembaga Pendamping"
              :items="itemsInstitutionName"
              item-title="name"
              item-value="id"
              required
              class="mb-4"
              :disabled="loadingItemsInstitutionName"
              :loading="loadingItemsInstitutionName"
              :rules="[requiredValidator]"
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
              :rules="[requiredValidator]"
            />
            <label class="text-h6" for="picName">
              Nomor Kontak Penanggung Jawab Program LPH / LP3H
            </label>
            <VTextField
              v-model="formData.picPhoneNumber"
              placeholder="Isi Nomor Kontak Penanggung Jawab Program LPH / LP3H "
              required
              class="mb-4"
              :rules="[requiredValidator]"
              type="number"
            />
          </VForm>
        </VCardText>
        <VCardActions>
          <VSpacer />
          <VBtn text variant="outlined" @click="addDialog = false">
            Batal
          </VBtn>
          <VBtn
            :disabled="loadingAdd || checkIsFieldEMpty(formData)"
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
</template>
