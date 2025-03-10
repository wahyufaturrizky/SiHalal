<script setup lang="ts">
const props = defineProps<{ data: any }>();
const businessActor = computed(() => props.data);

const dataPermohonan = computed(() => [
  {
    id: 1,
    key: "Nama (sesuai KTP)",
    value: props.data.nama_pj ? props.data.nama_pj : "-",
  },
  {
    id: 2,
    key: "Alamat (sesuai KTP)",
    value: props.data.alamat_pu ? props.data.alamat_pu : "-",
  },
  {
    id: 3,
    key: "Jabatan",
    value: "Penanggung Jawab Usaha",
  },
  {
    id: 4,
    key: "Nomor Kontak",
    value: props.data.nomor_kontak_pj ? props.data.nomor_kontak_pj : "-",
  },
  {
    id: 5,
    key: "Nama Perusahaan",
    value: props.data.nama_pu ? props.data.nama_pu : "-",
  },
  {
    id: 6,
    key: "Alamat Perusahaan",
    value: props.data.alamat_pu ? props.data.alamat_pu : "-",
  },
]);

const route = useRoute<"">();
const submissionId = route.params?.id;
const suratPermohonan = ref("");
const getDownloadForm = async (docName: string) => {
  const result: any = await $api(
    `/self-declare/submission/${submissionId}/file`,
    {
      method: "get",
      query: {
        document: docName,
      },
    }
  );
  if (result.code === 2000) {
    suratPermohonan.value = result.data.file;
  }
};

const handleDownload = async () => {
  if (suratPermohonan.value) {
    return await downloadDocument(suratPermohonan.value, "FILES");
  }
};

onMounted(() => {
  getDownloadForm("surat-permohonan");
});
</script>

<template>
  <VDialog max-width="70svw">
    <template #activator="{ props: openModal }">
      <VBtn variant="outlined" v-bind="openModal">Surat Permohonan</VBtn>
    </template>
    <template #default="{ isActive }">
      <VCard>
        <VCardTitle style="padding: 1.5svw">
          <VRow>
            <VCol cols="10"><h3>Surat Permohonan</h3></VCol>
            <VCol cols="2" style="display: flex; justify-content: end"
              ><VIcon
                size="small"
                icon="fa-times"
                @click="isActive.value = false"
              ></VIcon
            ></VCol>
          </VRow>
        </VCardTitle>
        <VCardItem>
          <div style="overflow: auto; max-block-size: 50svh">
            <VRow no-gutters>
              <VCol cols="12"><b>Yth. Kepala BPJH</b></VCol>
            </VRow>
            <VRow no-gutters>
              <VCol cols="12"><b>Jakarta</b></VCol>
            </VRow>
            <br />
            <VRow no-gutters v-for="item in dataPermohonan" :key="item.id">
              <VCol cols="3">{{ item.key }}</VCol>
              <VCol cols="1">:</VCol>
              <VCol cols="8">{{ item.value }}</VCol>
            </VRow>
            <br />
            <VRow>
              <VCol cols="12">
                <p>
                  Dengan ini mengajukan permohonan sertifikat halal dengan
                  pernyataan pelaku usaha. Selain itu kami menyatakan bahwa:
                </p>
                <ul
                  style="list-style-type: decimal; padding-inline-start: 3svw"
                >
                  <li>
                    Kami belum pernah mendapatkan fasilitasi pembiayaan
                    sertifikasi halal dan tidak sedang/akan menerima fasilitasi
                    pembiayaan sertifikasi halal dari pihak mana pun;
                  </li>
                  <li>
                    Kami bersedia untuk didampingi oleh pendamping PPH dan
                    bersedia untuk mencantumkan label halal pada produk yang
                    telah disertifikasi halal;
                  </li>
                  <li>
                    Saya menjamin kebenaran kelengkapan data dan dokumen yang
                    menjadi persyaratan penerimaan fasilitasi sertifikasi halal
                    bagi pelaku usaha mikro dan kecil dari Kementerian Agama RI;
                  </li>
                </ul>
                <br />
                <p>
                  Apabila dikemudian hari data dan informasi, serta pernyataan
                  yang saya buat ini tidak benar dan terbukti merugikan Negara,
                  maka saya bersedia mengembalikan biaya fasilitasi sertifikasi
                  halal kepada Kas Negara dan/atau BPJPH berhak membatalkan
                  pengajuan permohonan sertifikat halal secara sepihak.
                </p>
                <p>
                  Demikian surat permohonan ini dibuat sebagai syarat pengajuan
                  permohonan Sertifikat Halal dengan pernyataan pelaku usaha.
                  Atas perhatiannya kami ucapkan terima kasih.
                </p>
              </VCol>
            </VRow>
          </div>
        </VCardItem>
        <VCardActions
          style="display: flex; justify-content: end; padding: 1.5svw"
        >
          <div>
            <VBtn variant="flat" @click="handleDownload"
              >Pratinjau Surat Permohonan</VBtn
            >
          </div>
        </VCardActions>
      </VCard>
    </template>
  </VDialog>
</template>
