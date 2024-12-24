<script setup lang="ts">
const props = defineProps<{ data: any }>();
const businessActor = computed(() => props?.data);

const dataPermohonan = [
  {
    id: 1,
    key: "Nama (sesuai KTP)",
    value: businessActor.value.nama_pj ? businessActor.value.nama_pj : "-",
  },
  {
    id: 2,
    key: "Alamat (sesuai KTP)",
    value: businessActor.value.alamat_pu ? businessActor.value.alamat_pu : "-",
  },
  {
    id: 3,
    key: "Jabatan",
    value: "Penanggung Jawab Usaha",
  },
  {
    id: 4,
    key: "Nomor Kontak",
    value: businessActor.value.nomor_kontak_pj
      ? businessActor.value.nomor_kontak_pj
      : "-",
  },
  {
    id: 5,
    key: "Nama Perusahaan",
    value: businessActor.value.nama_pu ? businessActor.value.nama_pu : "-",
  },
  {
    id: 6,
    key: "Alamat Perusahaan",
    value: businessActor.value.alamat_pu ? businessActor.value.alamat_pu : "-",
  },
];

const route = useRoute<"">();
const submissionId = route.params?.id;
const suratPernyataan = ref("");
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
    suratPernyataan.value = result.data.file;
  }
};

const handleDownload = async () => {
  return await downloadDocument(suratPernyataan.value);
};

onMounted(() => {
  getDownloadForm("surat-pernyataan");
});
</script>

<template>
  <VDialog max-width="70svw">
    <template #activator="{ props: openModal }">
      <VBtn variant="outlined" v-bind="openModal">Surat Pernyataan</VBtn>
    </template>
    <template #default="{ isActive }">
      <VCard>
        <VCardTitle style="padding: 1.5svw">
          <VRow>
            <VCol cols="10"><h3>Pernyataan Pelaku Usaha</h3></VCol>
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
          <div style="max-height: 50svh; overflow: auto">
            <VRow no-gutters v-for="item in dataPermohonan" :key="item.id">
              <VCol cols="3">{{ item.key }}</VCol>
              <VCol cols="1">:</VCol>
              <VCol cols="8">{{ item.value }}</VCol>
            </VRow>
            <br />
            <VRow>
              <VCol cols="12">
                <p>Dengan ini menyatakan:</p>
                <ul
                  style="padding-inline-start: 3svw; list-style-type: decimal"
                >
                  <li>Usaha kami telah berproduksi minimal 1 tahun;</li>
                  <li>
                    Memiliki pendapatan tahunan (omset) maksimal Rp. 500.000.000
                    (lima ratus juta rupiah) yang dihitung berdasarkan
                    pendapatan per bulan
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
                  Demikian surat pernyataan ini dibuat sebagai syarat pengajuan
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
              >Pratinjau Surat Pengajuan</VBtn
            >
          </div>
        </VCardActions>
      </VCard>
    </template>
  </VDialog>
</template>
