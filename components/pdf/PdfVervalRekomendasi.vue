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
        ></i-text>
        <i-text
          :x="60"
          :y="70"
          :width="530"
          :style="{ fill: 'grad(grad1)', align: 'left' }"
          :text="dataRef.dataRefPu?.nama_pendamping"
        ></i-text>
        <i-text
          :x="60"
          :y="95"
          :width="530"
          :style="{ fill: 'grad(grad1)', align: 'left' }"
          text="Nomor Registrasi"
        ></i-text>
        <i-text
          :x="60"
          :y="115"
          :width="530"
          :style="{ fill: 'grad(grad1)', align: 'left' }"
          :text="dataRef.dataRefDaftar?.no_daftar"
        ></i-text>
        <i-text
          :x="60"
          :y="140"
          :width="530"
          :style="{ fill: 'grad(grad1)', align: 'left' }"
          text="Lembaga Pendamping:"
        ></i-text>
        <i-text
          :x="60"
          :y="155"
          :width="530"
          :style="{ fill: 'grad(grad1)', align: 'left' }"
          :text="dataRef.dataRefPu?.lembaga_pendamping"
        ></i-text>
      </i-group>
      <i-group>
        <i-text
          v-for="(item, index) in listPdfElement"
          :x="item.spacesX"
          :y="calculateRelativeCoordY(item.spacesY, 'list pdf')"
          :style="{ fill: 'grad(grad1)', align: 'left' }"
          :text="`${item.type == 'numbered-list' ? index + '. ' : ''}${
            item.value
          }`"
        ></i-text>
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
import { ref } from "vue";

const props = defineProps({
  dataPu: Object as () => any,
  dataDaftar: Object as () => any,
});

const dataRef = ref({
  dataRefPu: null,
  dataRefDaftar: null,
});

let pdfBlob = ref("");
let pdfConfig = {
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
  // console.log("tes blob = ", blob);
  pdfBlob.value = blob;
  emit("skPenyeliaDownloadHandler", blob);
}

let baseCoordY = 140;

const calculateRelativeCoordY = (currCoordY: number, keterangan: string) => {
  // console.log("occured", baseCoordY, " - ", keterangan);
  baseCoordY += currCoordY;
  return baseCoordY;
};

const listPdfElement = ref();

const refreshPdf = () => {
  listPdfElement.value = [
    {
      value: "Rekomendasi",
      spacesY: 60,
      spacesX: 60,
      type: "non-list",
    },
    {
      value: "Bahan yang digunakan sudah memenuhi persyaratan kehalalan produk",
      spacesY: 30,
      spacesX: 80,
      type: "numbered-list",
    },
    {
      value:
        "Proses produksi yang dilakukan telah memenuhi persyaratan kehalalan produk",
      spacesY: 20,
      spacesX: 80,
      type: "numbered-list",
    },
    {
      value:
        "Produk yang dihasilkan sudah dipastikan memenuhi persyaratan kehalalan produk",
      spacesY: 20,
      spacesX: 80,
      type: "numbered-list",
    },
    {
      value:
        "Pelaku Usaha dapat direkomendasikan untuk diberikan Sertifikat Halal",
      spacesY: 20,
      spacesX: 80,
      type: "numbered-list",
    },
    {
      value:
        "Demikian keputusan penetapan ini dibuat untuk dilaksanakan sebagaimana mestinya",
      spacesY: 30,
      spacesX: 60,
      type: "non-list",
    },
    {
      value: `${dataRef.value.dataRefPu?.kota}, ${
        dataRef.value.dataRefDaftar?.tgl_daftar
          ? new Date(dataRef.value.dataRefDaftar?.tgl_daftar)
              .toISOString()
              .substring(0, 10)
          : "-"
      }`,
      spacesY: 40,
      spacesX: 30,
      type: "non-list",
    },
    {
      value: dataRef.value.dataRefPu?.nama_pendamping,
      spacesY: 80,
      spacesX: 30,
      type: "non-list",
    },
    {
      value: "Pendamping",
      spacesY: 20,
      spacesX: 30,
      type: "non-list",
    },
  ];
};

watch(
  [props.dataPu, props.dataDaftar],
  ([newDataPu, newDataDaftar]) => {
    if (newDataPu && newDataDaftar) {
      dataRef.value.dataRefPu = newDataPu;
      dataRef.value.dataRefDaftar = newDataDaftar;

      refreshPdf();
    }
  },
  { immediate: true }
);

onMounted(async () => {
  baseCoordY = 140;
});
</script>
