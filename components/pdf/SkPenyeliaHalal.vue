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
    @on-ready="callMethod"
    @on-updated="getBlob"
  >
    <i-page>
      <i-group>
        <i-text
          :x="50"
          :y="5"
          text="SURAT KEPUTUSAN PENETAPAN PENYELIA HALAL"
          :width="530"
          :style="{ fill: 'grad(grad1)', align: 'center', font: '13px' }"
          class="text_123"
        />
        <i-text
          :x="60"
          :y="20"
          text="NOMOR"
          :width="530"
          :style="{ fill: 'grad(grad1)', align: 'center', font: '13px' }"
          class="text_123"
        />
      </i-group>
      <i-group>
        <i-text
          :x="60"
          :y="50"
          :width="530"
          :style="{ fill: 'grad(grad1)', align: 'left' }"
          text="Yang bertanda tangan di bawah ini:"
        ></i-text>
      </i-group>
      <i-group>
        <i-text
          :x="60"
          :y="70"
          :width="530"
          :style="{ fill: 'grad(grad1)', align: 'left' }"
          :text="'Nama: ' + company.name"
        ></i-text>
        <i-text
          :x="60"
          :y="90"
          :width="530"
          :style="{ fill: 'grad(grad1)', align: 'left' }"
          text="Jabatan:"
        ></i-text>
        <i-text
          :x="60"
          :y="110"
          :width="530"
          :style="{ fill: 'grad(grad1)', align: 'left' }"
          :text="'Bertindak untuk dan atas nama perusahaan:' + company.hereby"
        ></i-text>
      </i-group>
      <i-group>
        <i-text
          :x="60"
          :y="140"
          :style="{ fill: 'grad(grad1)', align: 'left' }"
          text="Dengan ini menetapkan nama-nama dibawah ini sebagai penyelia halal, sebagai berikut:"
        ></i-text>
      </i-group>
      <i-group>
        <i-text
          v-for="(item, index) in listPenyelia"
          :x="item.spacesX"
          :y="calculateRelativeCoordY(item.spacesY, 'listpenyelia')"
          :style="{ fill: 'grad(grad1)', align: 'left' }"
          :text="`${index + 1}. ${item.value}`"
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

function callMethod(l) {
  console.log(l);
}

const emit = defineEmits(["skPenyeliaDownloadHandler"]);

function getBlob(blob) {
  console.log("tes blob = ", blob);
  pdfBlob.value = blob;
  emit("skPenyeliaDownloadHandler", blob);
}

let baseCoordY = 140;

const calculateRelativeCoordY = (currCoordY: number, keterangan: string) => {
  console.log("occured", baseCoordY, " - ", keterangan);
  baseCoordY += currCoordY;
  return baseCoordY;
};

const listPenyelia = ref();

const listPdfElement = ref();

const company = ref({
  name: "",
  position: "",
  hereby: "",
});

const store = pelakuUsahaProfile();

onMounted(async () => {
  baseCoordY = 140;
  await store.fetchProfile();
  // const tmp: Array<IpenyeliaList> = [];
  listPenyelia.value = store.supervisorData
    ?.map((val) => {
      console.log("basecoordy", baseCoordY);
      return { value: val.name, spacesY: 20, spacesX: 60 };
    })
    .filter((val) => val.value);
  // listPenyelia.value = tmp;
  console.log("list penyelia = ", listPenyelia);

  company.value.hereby = store.profileData?.company_name;
  company.value.name = store.penanggungJawabHalal?.name;
  company.value.position = "";

  listPdfElement.value = [
    {
      value: "Penyelia Halal memiliki tugas:",
      spacesY: 40,
      spacesX: 60,
      type: "non-list",
    },
    {
      value: "Mengawasi proses produk halal di perusahaan",
      spacesY: 20,
      spacesX: 60,
      type: "numbered-list",
    },
    {
      value: "menentukan tindakan perbaikan dan pencegahan",
      spacesY: 20,
      spacesX: 60,
      type: "numbered-list",
    },
    {
      value: "mengordinasikan proses produk halal",
      spacesY: 20,
      spacesX: 60,
      type: "numbered-list",
    },
    {
      value: "mendampingi auditor halal pada saat pemeriksaan",
      spacesY: 20,
      spacesX: 60,
      type: "numbered-list",
    },
    {
      value:
        "Demikian keputusan penetapan ini dibuat untuk dilaksanakan sebagaimana mestinya",
      spacesY: 20,
      spacesX: 60,
      type: "non-list",
    },
    {
      value: "Pimpinan Perusahaan",
      spacesY: 40,
      spacesX: 450,
      type: "non-list",
    },
    { value: "Samsul", spacesY: 40, spacesX: 480, type: "non-list" },
  ];
});
</script>
