<script setup lang="ts">
import { ref } from "vue";
import { useDisplay } from "vuetify";

const emit = defineEmits(["refresh"]);

const route = useRoute();

const selfDeclareId = (route.params as any).id;

const formData = ref({
  jenis_bahan: "",
  tipe_bahan: "",
  produsen: "",
  kelompok: "",
  merek: "",
  nomor_sertifikat_halal: "",
  tgl_berlaku: "",
  id_bahan: "",
  nama: "",
});

const loadingAdd = ref(false);

const resetForm = () => {
  formData.value = {
    jenis_bahan: "",
    tipe_bahan: "",
    produsen: "",
    kelompok: "",
    merek: "",
    nomor_sertifikat_halal: "",
    tgl_berlaku: "",
    id_bahan: "",
    nama: "",
  };
};

const loadingAll = ref(true);

const itemsIngredientsUncertified = ref<any[]>([]);
const pageIngredientsUncertified = ref(1);
const itemPerPageIngredientsUncertified = ref(10);
const totalItemsIngredientsUncertified = ref(0);
const loadingIngredientsUncertified = ref(false);

const itemsIngredientsCertified = ref<any[]>([]);
const pageIngredientsCertified = ref(1);
const itemPerPageIngredientsCertified = ref(10);
const totalItemsIngredientsCertified = ref(0);
const loadingIngredientsCertified = ref(false);

const loadItemIngredientsCertified = async (
  page: number,
  size: number,
  name: string = ""
) => {
  try {
    loadingIngredientsCertified.value = true;

    const response: any = await $api(
      "/self-declare/verificator/bahan/certified",
      {
        method: "get",
        params: {
          page,
          size,
          name,
        },
      }
    );

    if (response.code === 2000) {
      if (page === 1) {
        itemsIngredientsCertified.value = response.data || [];
      } else {
        itemsIngredientsCertified.value = [
          ...itemsIngredientsCertified.value,
          ...response.data,
        ];
      }
      totalItemsIngredientsCertified.value = response.total_item || 0;
      loadingIngredientsCertified.value = false;
      return response;
    } else {
      useSnackbar().sendSnackbar(
        response.errors.list_error.join(", "),
        "error"
      );
      loadingIngredientsCertified.value = false;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingIngredientsCertified.value = false;
  }
};

const loadItemIngredientsUncertified = async (
  page: number,
  size: number,
  name: string = ""
) => {
  try {
    loadingIngredientsUncertified.value = true;

    const response: any = await $api(
      "/self-declare/verificator/bahan/uncertified",
      {
        method: "get",
        params: {
          page,
          size,
          name,
        },
      }
    );

    if (response.code === 2000) {
      if (page === 1) {
        itemsIngredientsUncertified.value = response.data || [];
      } else {
        itemsIngredientsUncertified.value = [
          ...itemsIngredientsUncertified.value,
          ...response.data,
        ];
      }
      totalItemsIngredientsUncertified.value = response.total_item || 0;
      loadingIngredientsUncertified.value = false;
      return response;
    } else {
      useSnackbar().sendSnackbar(
        response.errors.list_error.join(", "),
        "error"
      );
      loadingIngredientsUncertified.value = false;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingIngredientsUncertified.value = false;
  }
};

onMounted(async () => {
  const res = await Promise.all([
    loadItemIngredientsUncertified(
      pageIngredientsUncertified.value,
      itemPerPageIngredientsUncertified.value,
      ""
    ),
    loadItemIngredientsCertified(
      pageIngredientsCertified.value,
      itemPerPageIngredientsCertified.value,
      ""
    ),
  ]);

  const checkResIfUndefined = res.every((item) => {
    return item !== undefined;
  });

  if (checkResIfUndefined) {
    loadingAll.value = false;
  } else {
    loadingAll.value = false;
  }
});

const debouncedFetch = debounce(loadItemIngredientsUncertified, 500);
const debouncedFetchCertified = debounce(loadItemIngredientsCertified, 500);

const handleInputIngredientsUncertified = (val: any) => {
  pageIngredientsUncertified.value = 1;
  debouncedFetch(
    pageIngredientsUncertified.value,
    itemPerPageIngredientsUncertified.value,
    val.target.value
  );
};

const handleInputIngredientsCertified = (val: any) => {
  pageIngredientsCertified.value = 1;
  debouncedFetchCertified(
    pageIngredientsCertified.value,
    itemPerPageIngredientsCertified.value,
    val.target.value
  );
};

const addDialog = ref(false);

const addDataBahan = async () => {
  try {
    loadingAdd.value = true;

    const {
      jenis_bahan,
      produsen,
      merek,
      nomor_sertifikat_halal,
      tgl_berlaku,
      id_bahan,
      tipe_bahan,
    } = formData.value;

    const res: any = await $api("/self-declare/verificator/bahan/add", {
      method: "post",
      body: {
        id_reg: selfDeclareId,
        jenis_bahan: jenis_bahan,
        is_bahan_bersertifikat: tipe_bahan === "bersertifikat" ? true : false,
        id_bahan,
        produsen,
        merek,
        nomor_sertifikat_halal,
        tgl_berlaku,
      },
    });

    if (res?.code === 2000) {
      loadingAdd.value = false;
      resetForm();
      addDialog.value = false;
      useSnackbar().sendSnackbar("Berhasil menambahkan data", "success");
      emit("refresh");
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

const loadMoreIngredientsUncertified = () => {
  if (
    itemsIngredientsUncertified.value.length <
      totalItemsIngredientsUncertified.value &&
    !loadingIngredientsUncertified.value
  ) {
    pageIngredientsUncertified.value += 1;
    loadItemIngredientsUncertified(
      pageIngredientsUncertified.value,
      itemPerPageIngredientsUncertified.value,
      ""
    );
  }
};

const loadMoreIngredientsCertified = () => {
  if (
    itemsIngredientsCertified.value.length <
      totalItemsIngredientsCertified.value &&
    !loadingIngredientsCertified.value
  ) {
    pageIngredientsCertified.value += 1;
    loadItemIngredientsCertified(
      pageIngredientsCertified.value,
      itemPerPageIngredientsCertified.value,
      ""
    );
  }
};

// Sample data for "Bahan Bersertifikat" and "Tidak Bersertifikat"
const bahanOptions = [
  { name: "Bahan Bersertifikat", value: "bersertifikat" },
  { name: "Bahan Tidak Bersertifikat", value: "tidak_bersertifikat" },
];

const jenisBahanOptions = [
  { name: "Bahan", value: "Bahan" },
  { name: "Cleaning Agent", value: "Cleaning Agent" },
  { name: "Kemasan", value: "Kemasan" },
];

const { mdAndUp } = useDisplay();
const dialogMaxWidth = computed(() => (mdAndUp ? 700 : "90%"));

const changeTipeBahan = (val: string) => {
  if (val === "bersertifikat") {
    loadItemIngredientsCertified(
      pageIngredientsCertified.value,
      itemPerPageIngredientsCertified.value,
      ""
    );
  } else {
    loadItemIngredientsUncertified(
      pageIngredientsUncertified.value,
      itemPerPageIngredientsUncertified.value,
      ""
    );
  }

  formData.value = {
    ...formData.value,
    nama: "",
    merek: "",
    produsen: "",
    nomor_sertifikat_halal: "",
    tgl_berlaku: "",
    jenis_bahan: "",
    kelompok: "",
  };
};

const changeSertifikat = (val: string) => {
  if (formData.value.tipe_bahan === "bersertifikat") {
    const findBahan = itemsIngredientsCertified.value.find(
      (findItem: any) => findItem.id === val
    );

    const {
      nama_bahan,
      merek,
      produsen,
      no_sertifikat,
      tgl_berlaku_sertifikat,
      id,
    } = findBahan || {};

    formData.value = {
      ...formData.value,
      nama: nama_bahan,
      id_bahan: id,
      merek: merek,
      produsen: produsen,
      nomor_sertifikat_halal: no_sertifikat,
      tgl_berlaku: formatToISOString(tgl_berlaku_sertifikat),
    };
  } else {
    const findBahanUncertified = itemsIngredientsUncertified.value.find(
      (findItem: any) => findItem.id === val
    );

    const { kelompok, nama_bahan } = findBahanUncertified || {};

    formData.value = {
      ...formData.value,
      nama: nama_bahan,
      kelompok: kelompok,
      id_bahan: id,
    };
  }
};
</script>

<template>
  <VBtn
    variant="outlined"
    prepend-icon="fa-plus"
    style="margin: 1svw"
    @click="addDialog = true"
  >
    Tambah
  </VBtn>

  <VDialog v-model="addDialog" :max-width="dialogMaxWidth">
    <VCard>
      <VCardTitle>
        <VRow>
          <VCol cols="10"><h3>Tambah Data Bahan</h3></VCol>
          <VCol cols="2" style="display: flex; justify-content: end">
            <VIcon size="small" icon="fa-times" @click="addDialog = false" />
          </VCol>
        </VRow>
      </VCardTitle>
      <VCardItem v-if="!loadingAll">
        <VRow>
          <VCol cols="12">
            <VItemGroup>
              <VLabel>Tipe Bahan</VLabel>
              <VSelect
                v-model="formData.tipe_bahan"
                :items="bahanOptions"
                item-title="name"
                item-value="value"
                placeholder="Pilih Tipe Bahan"
                density="compact"
                @update:modelValue="changeTipeBahan"
              />
            </VItemGroup>
          </VCol>
        </VRow>
        <VRow v-if="formData.tipe_bahan">
          <VCol cols="12">
            <VItemGroup v-if="formData.tipe_bahan === 'tidak_bersertifikat'">
              <VLabel> Bahan&nbsp; Tidak&nbsp; Bersertifikat </VLabel>

              <VAutocomplete
                :items="itemsIngredientsUncertified"
                item-title="nama_bahan"
                item-value="id"
                density="compact"
                placeholder="Cari Bahan Tidak Bersertifikat"
                :loading="loadingIngredientsUncertified"
                @input="handleInputIngredientsUncertified"
                @update:modelValue="changeSertifikat"
              >
                <template #item="{ props, item }">
                  <VListItem
                    v-bind="props"
                    :title="(item.raw as any).nama_bahan"
                  >
                  </VListItem>
                </template>
                <template #append-item>
                  <div v-intersect="loadMoreIngredientsUncertified" />
                </template>
              </VAutocomplete>
            </VItemGroup>
            <VItemGroup v-if="formData.tipe_bahan === 'bersertifikat'">
              <VLabel> Bahan&nbsp; Bersertifikat </VLabel>

              <VAutocomplete
                :items="itemsIngredientsCertified"
                item-title="nama_bahan"
                item-value="id"
                density="compact"
                placeholder="Cari Bahan Bersertifikat"
                :loading="loadingIngredientsCertified"
                @input="handleInputIngredientsCertified"
                @update:modelValue="changeSertifikat"
              >
                <template #item="{ props, item }">
                  <VListItem
                    v-bind="props"
                    :title="(item.raw as any).nama_bahan"
                  >
                  </VListItem>
                </template>
                <template #append-item>
                  <div v-intersect="loadMoreIngredientsCertified" />
                </template>
              </VAutocomplete>

              <!-- <VRow class="mt-2 justify-end align-center">
                <VCol cols="auto" class="d-flex align-center pr-0">
                  <p class="text-caption mb-0">
                    Bahan yang dicari tidak ditemukan? Ajukan bahan disini.
                  </p>
                </VCol>
                <VCol cols="auto" class="pl-0">
                  <AjukanBahanModal />
                </VCol>
              </VRow> -->
            </VItemGroup>
          </VCol>
        </VRow>

        <br />
        <VDivider />
        <br />
        <VRow>
          <VCol cols="12">
            <VItemGroup>
              <VLabel>Jenis Bahan</VLabel>
              <VSelect
                v-model="formData.jenis_bahan"
                :items="jenisBahanOptions"
                item-title="name"
                item-value="value"
                placeholder="Pilih Jenis Bahan"
                density="compact"
              />
            </VItemGroup>
          </VCol>
        </VRow>
        <VRow
          v-if="
            ['bersertifikat', 'tidak_bersertifikat'].includes(
              formData.tipe_bahan
            )
          "
        >
          <!-- merk produk appears when tipe bahan = bersertifikat -->
          <VCol cols="12">
            <VItemGroup>
              <VLabel>Nama Bahan</VLabel>
              <VTextField
                disabled
                placeholder="Merk Produk otomatis terisi setelah memilih bahan"
                density="compact"
                v-model="formData.nama"
              />
            </VItemGroup>
          </VCol>
        </VRow>
        <VRow v-if="formData.tipe_bahan === 'tidak_bersertifikat'">
          <!-- kelompok appears when tipe bahan = tidak bersertifikat -->
          <VCol cols="12">
            <VItemGroup>
              <VLabel>Kelompok</VLabel>
              <VTextField
                disabled
                placeholder="Kelompok otomatis terisi setelah memilih bahan"
                density="compact"
                v-model="formData.kelompok"
              />
            </VItemGroup>
          </VCol>
        </VRow>

        <VRow v-if="formData.tipe_bahan === 'bersertifikat'">
          <!-- merk produk appears when tipe bahan = bersertifikat -->
          <VCol cols="12">
            <VItemGroup>
              <VLabel>Merk Produk</VLabel>
              <VTextField
                disabled
                placeholder="Merk Produk otomatis terisi setelah memilih bahan"
                density="compact"
                v-model="formData.merek"
              />
            </VItemGroup>
          </VCol>
        </VRow>
        <VRow v-if="formData.tipe_bahan === 'bersertifikat'">
          <!-- produsen appears when tipe bahan = bersertifikat -->
          <VCol cols="12">
            <VItemGroup>
              <VLabel>Produsen</VLabel>
              <VTextField
                disabled
                placeholder="Produsen otomatis terisi setelah memilih bahan"
                density="compact"
                v-model="formData.produsen"
              />
            </VItemGroup>
          </VCol>
        </VRow>
        <VRow v-if="formData.tipe_bahan === 'bersertifikat'">
          <!-- appears when tipe bahan = bersertifikat -->
          <VCol cols="12">
            <VItemGroup>
              <VLabel>Nomor Sertifikat Halal</VLabel>
              <VTextField
                disabled
                placeholder="Nomor Sertifikat Halal otomatis terisi setelah memilih bahan"
                density="compact"
                v-model="formData.nomor_sertifikat_halal"
              />
            </VItemGroup>
          </VCol>
        </VRow>
        <VRow v-if="formData.tipe_bahan === 'bersertifikat'">
          <VCol cols="12">
            <VLabel>Masa Berlaku Sertifikat Halal</VLabel>
            <VTextField
              v-model="formData.tgl_berlaku"
              placeholder="Tanggal"
              type="date"
              disabled
            />
          </VCol>
        </VRow>
      </VCardItem>
      <VCardActions
        style="display: flex; justify-content: end; padding: 1.5svw"
      >
        <div>
          <VBtn
            @click="addDialog = false"
            :disabled="loadingAdd"
            variant="outlined"
          >
            Batal
          </VBtn>
          <VBtn @click="addDataBahan" :loading="loadingAdd" variant="flat">
            Tambah
          </VBtn>
        </div>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
