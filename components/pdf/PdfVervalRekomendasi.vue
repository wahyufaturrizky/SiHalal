<template>
  <div class="pdf-object">
    <object class="pdf" :data="pdfBlob"></object>
  </div>
  <pdfFrame
    type="pdf-blob"
    id="pdf-blob-id"
    :width="pdfCfg.width"
    :height="pdfCfg.height"
    :config="pdfConfig"
    :needOnUpdated="true"
    @on-updated="getBlob"
  >
    <i-page>
      <i-group>
        <i-text
          :x="50"
          :y="5"
          text="REKOMENDASI HASIL VERIFIKASI DAN VALIDASI"
          :width="530"
          :style="{ fill: 'grad(grad1)', align: 'center', font: '13px' }"
          class="text_123"
        />
        <i-text
          :x="60"
          :y="25"
          text="PENDAMPING PPH"
          :width="530"
          :style="{ fill: 'grad(grad1)', align: 'center', font: '10px' }"
          class="text_123"
        />
      </i-group>
      <i-group>
        <i-text
          :x="60"
          :y="50"
          :width="530"
          :style="{ fill: 'grad(grad1)', align: 'left' }"
          text="Nama Pendamping:"
        />
        <i-text
          :x="60"
          :y="70"
          :width="530"
          :style="{ fill: 'grad(grad1)', align: 'left' }"
          :text="dataRefPu?.nama_pendamping"
        />
        <i-text
          :x="60"
          :y="95"
          :width="530"
          :style="{ fill: 'grad(grad1)', align: 'left' }"
          text="Nomor Registrasi:"
        />
        <i-text
          :x="60"
          :y="115"
          :width="530"
          :style="{ fill: 'grad(grad1)', align: 'left' }"
          :text="dataRefDaftar?.no_daftar || '-'"
        />
        <i-text
          :x="60"
          :y="140"
          :width="530"
          :style="{ fill: 'grad(grad1)', align: 'left' }"
          text="Lembaga Pendamping:"
        />
        <i-text
          :x="60"
          :y="155"
          :width="530"
          :style="{ fill: 'grad(grad1)', align: 'left' }"
          :text="dataRefPu?.lembaga_pendamping || '-'"
        />
      </i-group>
      <i-group>
        <i-text
          v-for="(item, index) in listPdfElement"
          :key="index"
          :x="item.spacesX"
          :y="calculateRelativeCoordY(item.spacesY)"
          :style="{ fill: 'grad(grad1)', align: 'left' }"
          :text="
            item.type === 'numbered-list'
              ? `${index}. ${item.value}`
              : item.value
          "
        />
      </i-group>
    </i-page>
  </pdfFrame>
</template>

<style scoped>
.pdf-object,
.pdf {
  height: 100%;
  width: 100%;
}
</style>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";

const props = defineProps({
  dataPu: Object,
  dataDaftar: Object,
});

const dataRefPu = ref();
const dataRefDaftar = ref();

const pdfBlob = ref("");
const pdfConfig = {
  margins: {
    top: 30,
    bottom: 20,
  },
};

const pdfCfg = {
  height: 900,
  width: 620,
};

const emit = defineEmits(["skPenyeliaDownloadHandler"]);

function getBlob(blob) {
  pdfBlob.value = blob;
  emit("skPenyeliaDownloadHandler", blob);
}

let baseCoordY = 140;

const calculateRelativeCoordY = (currCoordY: number) => {
  baseCoordY += currCoordY;
  return baseCoordY;
};

const listPdfElement = ref();

const refreshPdf = () => {
  baseCoordY = 140;
  listPdfElement.value = [
    { value: "Rekomendasi", spacesY: 60, spacesX: 60, type: "non-list" },
    {
      value: "Bahan yang digunakan sudah memenuhi persyaratan kehalalan produk",
      spacesY: 30,
      spacesX: 80,
      type: "numbered-list",
    },
    {
      value: "Proses produksi telah memenuhi persyaratan kehalalan produk",
      spacesY: 20,
      spacesX: 80,
      type: "numbered-list",
    },
    {
      value: "Produk memenuhi persyaratan kehalalan produk",
      spacesY: 20,
      spacesX: 80,
      type: "numbered-list",
    },
    {
      value: "Pelaku Usaha dapat direkomendasikan untuk Sertifikat Halal",
      spacesY: 20,
      spacesX: 80,
      type: "numbered-list",
    },
    {
      value: "Keputusan dibuat untuk dilaksanakan sebagaimana mestinya",
      spacesY: 30,
      spacesX: 60,
      type: "non-list",
    },
    {
      value: `${dataRefPu.value?.kota || "-"}, ${
        dataRefDaftar.value?.tgl_daftar
          ? new Date(dataRefDaftar.value.tgl_daftar)
              .toISOString()
              .substring(0, 10)
          : "-"
      }`,
      spacesY: 40,
      spacesX: 30,
      type: "non-list",
    },
    {
      value: dataRefPu.value?.nama_pendamping || "-",
      spacesY: 80,
      spacesX: 30,
      type: "non-list",
    },
    { value: "Pendamping", spacesY: 20, spacesX: 30, type: "non-list" },
  ];
};

watch(
  () => [props.dataPu, props.dataDaftar],
  ([newDataPu, newDataDaftar]) => {
    dataRefPu.value = newDataPu;
    dataRefDaftar.value = newDataDaftar;
    refreshPdf();
  },
  { immediate: true }
);

onMounted(() => {
  dataRefPu.value = props.dataPu;
  dataRefDaftar.value = props.dataDaftar;
  refreshPdf();
});
</script>
