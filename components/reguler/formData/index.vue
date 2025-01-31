<!-- eslint-disable vue/prop-name-casing -->
<script setup lang="ts">
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const emit = defineEmits();

const props = defineProps({
  id: {
    type: String,
    required: false,
  },
  onSubmit: {
    type: Function,
    default: () => {},
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
  withAddButton: {
    type: Boolean,
    required: true,
  },
  service_type: {
    type: Array,
    required: false,
  },
  product_type: {
    type: Array,
    required: false,
  },
  jenis_layanan: {
    type: String,
    required: false,
  },
  area_pemasaran: {
    type: String,
    required: false,
  },
  isviewonly: {
    type: Boolean,
  },
  facId: {
    type: String,
    required: false,
  },
});

const itemsLph = ref<any>([]);
const searchRegisType = ref<string>(props?.facId);
const messageFasilitator = ref<string>("");
const productList = ref<any[]>([]);

const listAreaPemasaran = [
  { name: "Kabupaten/Kota", code: "Kabupaten/Kota" },
  { name: "Provinsi", code: "Provinsi" },
  { name: "Nasional", code: "Nasional" },
  { name: "Internasional", code: "Internasional" },
];

const getSelectOptions = (field: string): string => {
  let data: string[] = [];
  field = t(field);
  switch (field) {
    case t("pengajuan-reguler.reguler-form--pengajuan-pengajuan-jnslay"):
      data = props?.service_type;
      break;
    case t("pengajuan-reguler.reguler-detail-pengajuan-jnsprod"):
      data = productList.value || [];
      break;
    case "Skala Usaha":
      data = ["Mikro", "Kecil", "Menengah", "Besar"];
      break;
    case "Jenis Pendaftaran":
      data = [
        { name: "Pendaftaran Mandiri/Reguler ", code: "" },
        { name: "Pendaftaran Melalui Fasilitasi", code: "CH002" },
      ];
      break;
    case "Jenis Pengajuan":
      data = [{ name: "baru", code: "baru" }];
      break;
    case "Nama Fasilitas":
      data = ["Es Cream", "Minuman", "Snack", "Lainnya"];
      break;
    case "Pengujian Laboratorium":
      data = ["Ada", "Tidak Ada"];
      break;
    case "Hasil Audit":
      data = ["Lulus", "Tidak Lulus"];
    case "Area Pemasaran":
      data = listAreaPemasaran || [];
      break;
    default:
      break;
  }

  return data;
};

const getLph = async (path: string, layanan: string, area: string) => {
  try {
    const params = {
      url: `${path}/${props?.id}/lph?jenis_layanan=${layanan}&area_pemasaran=${area}`,
      page: 1,
      size: 10,
      keyword: "",
    };

    const response: any = await $api("/reguler/list", {
      method: "get",
      params,
    });

    if (response?.code === 2000) itemsLph.value = response.data;
    else useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const onSubmit = async () => {
  if (props?.title === t("halal_cert_submission.title")) {
    const jenisLayanan = props?.service_type?.find(
      (item: any) =>
        props.data?.[3]?.value === item.name ||
        props.data?.[3]?.value === item.code
    );
    const jenisProduk = props?.product_type?.find(
      (item: any) =>
        props.data?.[4]?.value === item.name ||
        props.data?.[4]?.value === item.code
    );
    const tanggalDaftar =
      props.data[2]?.value && formatDateIntl(new Date(props.data[2]?.value));
    const lphId = itemsLph.value?.find(
      (item: any) =>
        props.data[7]?.value === item.nama_lph ||
        props.data[7]?.value === item.lph_id
    );

    const payload = {
      id_reg: props?.id,
      nama_pu: props.data[0]?.value,
      no_mohon: props.data[1]?.value,
      tgl_daftar: `${tanggalDaftar?.split("/")?.[2]}-${
        tanggalDaftar?.split("/")?.[1]
      }-${tanggalDaftar?.split("/")?.[0]}`,
      jenis_layanan: jenisLayanan?.code || props.data?.[3]?.value,
      jenis_produk: jenisProduk?.code || props.data?.[4]?.value,
      merk_dagang: props.data[5]?.value,
      area_pemasaran: props.data?.[6]?.value,
      lph_id: lphId ? lphId.lph_id : props.data[7]?.value,
      channel_id: "",
      fac_id: props.data[9]?.value,
    };
    if (lphId) {
      props.onSubmit(payload);
    } else {
      props.onSubmit("error");
    }
  } else {
    props.onSubmit();
  }
};

const getProductType = async (id: string) => {
  try {
    const response: any = await $api("/master/product-filter", {
      method: "get",
      params: { id },
    });

    if (response.length) {
      productList.value = response;

      return response;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const lphValidation = async (title: string, value: string, index: number) => {
  if (title === t("pengajuan-reguler.reguler-detail-pengajuan-jnslay")) {
    props.data.map((el) => {
      if (
        el.title === t("pengajuan-reguler.reguler-detail-pengajuan-jnsprod")
      ) {
        el.value = "";
      } else if (
        el.title === t("pengajuan-reguler.reguler-detail-pengajuan-lph")
      ) {
        el.value = "";
      } else if (
        el.title === t("pengajuan-reguler.reguler-detail-pengajuan-area")
      ) {
        el.value = "";
      }
    });
  }
  const jenisLayanan = props?.service_type?.find(
    (item: any) =>
      props.data?.[3]?.value === item.name ||
      props.data?.[3]?.value === item.code
  );

  if (title === t("pengajuan-reguler.reguler-detail-pengajuan-jnslay"))
    await getProductType(value);
  else if (title === t("pengajuan-reguler.reguler-detail-pengajuan-area"))
    await getLph(LIST_BUSINESS_ACTOR, jenisLayanan?.code, value);

  if (props.title === t("halal_cert_submission.title")) {
    const checkData = props.data.map((el: any) => {
      if (el.required && el.value === "") return false;
      return true;
    });
  }
};

const checkCodeFasilitas = async () => {
  try {
    const response: any = await $api("/reguler/pelaku-usaha/find-facility", {
      method: "get",
      query: { facCode: searchRegisType.value },
    });

    if (response) {
      console.log(response.data);
      messageFasilitator.value = response?.message;
      emit("complete", response?.data?.[0]?.id);

      return response;
    }
  } catch (error) {
    console.log(error);
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

onMounted(async () => {
  setTimeout(async () => {
    const jenisLayanan = props?.service_type?.find(
      (item: any) =>
        props.data?.[3]?.value === item.name ||
        props.data?.[3]?.value === item.code
    );
    if (props.data?.[3]?.value)
      await getProductType(jenisLayanan?.code || props.data?.[3]?.value);
    if (jenisLayanan && props.data[6])
      await getLph(
        LIST_BUSINESS_ACTOR,
        jenisLayanan?.code,
        props.data?.[6]?.value
      );
  }, 1000);
});

watchEffect(async () => {
  // we need to check undefined because if we pass 0 as currentStep it will be falsy
  const jenisLayanan = props?.service_type?.find(
    (item: any) =>
      props.data?.[3]?.value === item.name ||
      props.data?.[3]?.value === item.code
  );
  if (props.data?.[3]?.value)
    await getProductType(jenisLayanan?.code || props.data?.[3]?.value);
  if (jenisLayanan && props.data[6])
    await getLph(
      LIST_BUSINESS_ACTOR,
      jenisLayanan?.code,
      props.data?.[6]?.value
    );
});
</script>

<template>
  <VCard class="pa-4">
    <VCardTitle class="d-flex justify-space-between align-center">
      <span class="text-h5 font-weight-bold">{{ props.title }}</span>
    </VCardTitle>
    <VCardText>
      <br />
      <VRow>
        <VCol
          v-for="(item, index) in props.data"
          :key="index"
          :value="item.value"
          cols="12"
        >
          <div v-if="item.type === 'text'">
            <p class="label-pengajuan">
              {{ t(item.title) }}
              <span v-if="item.required" class="required">*</span>
            </p>
            <div
              v-if="
                item.title.includes('Tanggal') ||
                item.title ===
                  'pengajuan-reguler.reguler-form--pengajuan-pengajuan-tglmohon'
              "
            >
              <VueDatePicker
                id="tanggal_daftar"
                v-model="item.value"
                teleport-center
                :enable-time-picker="false"
                format="dd-MM-yyyy"
              />
            </div>
            <div v-else>
              <VTextField v-model="item.value" class="-mt-10" />
            </div>
          </div>
          <div v-if="item.type === 'select'">
            <p class="label-pengajuan">
              {{ t(item.title) }}
              <span v-if="item.required" class="required">*</span>
            </p>
            <VSelect
              v-if="item.disabled"
              v-model="item.value"
              :items="getSelectOptions(item.title) || []"
              outlined
              class="-mt-10"
              disabled
              bg-color="#F6F6F6"
              :value="item.value"
            />
            <VSelect
              v-if="!item.disabled"
              v-model="item.value"
              :items="
                item.title === 'LPH' ? itemsLph : getSelectOptions(item.title)
              "
              outlined
              class="-mt-10"
              :item-value="item.title === 'LPH' ? 'lph_id' : 'code'"
              :item-title="item.title === 'LPH' ? 'nama_lph' : 'name'"
              @update:model-value="
                () => lphValidation(item.title, item.value, index)
              "
            />
          </div>
          <VCol
            v-if="item.type === 'date'"
            class="d-flex justify-space-between align-center px-0"
            cols="12"
          >
            <!-- <p class="label-pengajuan">{{ item.title }}</p> -->
            <div
              v-for="(element, idx) in item.data"
              :key="element.title"
              :value="idx"
              cols="5"
              class="px-0 w-48"
            >
              <p class="label-pengajuan">
                {{ element.title }}
              </p>
              <VTextField
                v-model="element.value"
                disabled
                bg-color="#F6F6F6"
                class="-mt-10"
              />
            </div>
          </VCol>
          <div v-if="item.type === 'textarea'">
            <div>
              <p class="label-pengajuan">
                {{ t(item.title) }}
                <span v-if="item.required" class="required">*</span>
              </p>
              <VTextarea v-model="item.value" class="-mt-10" />
            </div>
          </div>
        </VCol>
        <VCol
          v-if="
            props.data?.[9]?.value === 'CH002' ||
            props?.data?.[9]?.value === 'Pendaftaran Melalui Fasilitasi'
          "
          cols="12"
        >
          <label>Kode Daftar/Fasilitasi</label>
          <div class="d-flex gap-10 mt-3">
            <VTextField
              v-model="searchRegisType"
              placeholder="masukkan kode fasilitas"
              style="max-inline-size: 10rem"
            />
            <VBtn
              variant="outlined"
              style="block-size: 45px"
              @click="checkCodeFasilitas"
            >
              Cari Kode
            </VBtn>
          </div>
          <VAlert
            v-if="messageFasilitator"
            type="warning"
            variant="tonal"
            color="#652672"
            class="mt-3"
          >
            {{ messageFasilitator }}
          </VAlert>
        </VCol>
      </VRow>
      <br />
      <VBtn
        v-if="!isviewonly"
        class="btn-container"
        variant="flat"
        @click="onSubmit"
      >
        {{ t("pengajuan-reguler.reguler-form--pengajuan-pengajuan-save") }}
      </VBtn>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.required {
  color: red;
  font-size: 12px;
}

.btn-container {
  float: inline-end !important;
}
</style>
