<script setup lang="ts">
import { onMounted, ref, watch } from "vue";

const props = defineProps({
  dataPu: Object,
  dataDaftar: Object,
});

const emit = defineEmits(["skPenyeliaDownloadHandler"]);
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
          ? formatDateId(dataRefDaftar.value.tgl_daftar)
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

<template>
  <div class="pdf-object">
    <object class="pdf" :data="pdfBlob" />
  </div>
  <PdfFrame
    id="pdf-blob-id"
    type="pdf-blob"
    :width="pdfCfg.width"
    :height="pdfCfg.height"
    :config="pdfConfig"
    :need-on-updated="true"
    @on-updated="getBlob"
  >
    <IPage>
      <IGroup>
        <IText
          :x="50"
          :y="5"
          text="REKOMENDASI HASIL VERIFIKASI DAN VALIDASI"
          :width="530"
          :style="{ fill: 'grad(grad1)', align: 'center', font: '13px' }"
          class="text_123"
        />
        <IText
          :x="60"
          :y="25"
          text="PENDAMPING PPH"
          :width="530"
          :style="{ fill: 'grad(grad1)', align: 'center', font: '10px' }"
          class="text_123"
        />
      </IGroup>
      <IGroup>
        <IText
          :x="60"
          :y="50"
          :width="530"
          :style="{ fill: 'grad(grad1)', align: 'left' }"
          text="Nama Pendamping:"
        />
        <IText
          :x="60"
          :y="70"
          :width="530"
          :style="{ fill: 'grad(grad1)', align: 'left' }"
          :text="dataRefPu?.nama_pendamping"
        />
        <IText
          :x="60"
          :y="95"
          :width="530"
          :style="{ fill: 'grad(grad1)', align: 'left' }"
          text="Nomor Registrasi:"
        />
        <IText
          :x="60"
          :y="115"
          :width="530"
          :style="{ fill: 'grad(grad1)', align: 'left' }"
          :text="dataRefDaftar?.no_daftar || '-'"
        />
        <IText
          :x="60"
          :y="140"
          :width="530"
          :style="{ fill: 'grad(grad1)', align: 'left' }"
          text="Lembaga Pendamping:"
        />
        <IText
          :x="60"
          :y="155"
          :width="530"
          :style="{ fill: 'grad(grad1)', align: 'left' }"
          :text="dataRefPu?.lembaga_pendamping || '-'"
        />
      </IGroup>
      <IGroup>
        <IText
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
      </IGroup>
    </IPage>
  </PdfFrame>
</template>

<style scoped>
.pdf-object,
.pdf {
  block-size: 100%;
  inline-size: 100%;
}
</style>
