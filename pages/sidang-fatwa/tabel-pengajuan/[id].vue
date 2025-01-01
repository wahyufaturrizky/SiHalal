<script lang="ts" setup>
import SubPelakuUsahaLayout from "@/layouts/subPelakuUsahaLayout.vue";

const route = useRoute();

const sidangFatwaId = (route.params as any).id;

const loadingAll = ref(true);
const detailData = ref();
const profil = ref();
const jenisUsaha = ref();
const skalaUsaha = ref();
const trackingData = ref();

const loadItemById = async () => {
  try {
    const response: any = await $api(
      `/sidang-fatwa/proses-sidang-fatwa/${sidangFatwaId}`,
      {
        method: "get",
      }
    );

    if (response.code === 2000) {
      detailData.value = response.data;

      const { sertifikat_halal_reguler, tracking } = response.data || {};

      const {
        status,
        jenis_daftar,
        nama_pu,
        kota_pu,
        prov_pu,
        alamat_pu,
        kode_pos_pu,
        negara_pu,
        no_telp,
        email,
        jenis_usaha,
        id_reg,
        tgl_permohonan,
        skala_usaha,
      } = sertifikat_halal_reguler || {};

      jenisUsaha.value = jenis_usaha;
      skalaUsaha.value = skala_usaha;
      trackingData.value = tracking;

      profil.value = [
        {
          label: "Nomor ID",
          value: id_reg,
        },
        {
          label: "Tanggal Buat",
          value: formatDate(tgl_permohonan),
        },
        {
          label: "Status",
          value: status,
        },
        {
          label: "Jenis Pendaftaran",
          value: jenis_daftar,
        },
        {
          label: "Nama Perusahaan",
          value: nama_pu,
        },
        {
          label: "Alamat",
          value: alamat_pu,
        },
        {
          label: "Kota/Kab",
          value: kota_pu,
        },
        {
          label: "Provinsi",
          value: prov_pu,
        },
        {
          label: "Kode Pos",
          value: kode_pos_pu,
        },
        {
          label: "Negara",
          value: negara_pu,
        },
        {
          label: "Telepon",
          value: no_telp,
        },
        {
          label: "Email",
          value: email,
        },
      ];

      return response;
    } else {
      useSnackbar().sendSnackbar(
        response.errors.list_error.join(", "),
        "error"
      );
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

onMounted(async () => {
  const res = await Promise.all([loadItemById()]);

  const checkResIfUndefined = res.every((item: any) => {
    return item !== undefined;
  });

  if (checkResIfUndefined) {
    loadingAll.value = false;
  } else {
    loadingAll.value = false;
  }
});
</script>

<template>
  <SubPelakuUsahaLayout v-if="!loadingAll">
    <template #pageTitle>
      <VRow justify="space-between" align="center">
        <VCol cols="12">
          <h2 class="font-weight-bold">Detail Data Pengajuan</h2>
        </VCol>
        <!-- <VCol cols="auto">
          <UpdateSidangFatwaProses />
          <TambahDataSidangFatwaProses />
        </VCol> -->
      </VRow>
    </template>

    <!-- left content -->
    <template #leftContent>
      <VRow>
        <VCol cols="12">
          <ProfileDetailPengajuanProsesSidangFatwa
            :jenisusaha="jenisUsaha"
            :skalausaha="skalaUsaha"
            :profil="profil"
          />
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <PengajuanSertifikatProsesSidangFatwa :detaildata="detailData" />
        </VCol>
      </VRow>

      <VRow>
        <VCol cols="12">
          <DaftarNamaProdukProsesSidang :detaildata="detailData" />
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <BiayaPemeriksaanProsesSidang :detaildata="detailData" />
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <JadwalAuditProsesSidang :detaildata="detailData" />
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <AuditorListProsesSidang :detaildata="detailData" />
        </VCol>
      </VRow>
      <VRow>
        <VCol :cols="12">
          <HasilPemeriksaanProsesSidang :detaildata="detailData" />
        </VCol>
      </VRow>
    </template>

    <!-- right content -->
    <template #rightContent>
      <VRow>
        <VCol :cols="12">
          <HasilAuditDetailPengajuan />
        </VCol>
      </VRow>
      <VRow>
        <VCol :cols="12">
          <BiayaPemeriksaanDetail :detaildata="detailData" />
        </VCol>
      </VRow>
      <VRow>
        <VCol :cols="12">
          <DokumenUnduhan />
        </VCol>
        <VCol :cols="12">
          <MelacakDetailFatwaProsesSidang :trackingdata="trackingData" />
        </VCol>
      </VRow>
    </template>
  </SubPelakuUsahaLayout>
  <VSkeletonLoader
    type="table-heading, list-item-two-line, image, table-tfoot"
    v-else
  />
</template>

<style lang="scss" scoped></style>
