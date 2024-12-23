<script lang="ts" setup>
import BiayaPemeriksaan from "@/components/sidangFatwa/BiayaPemeriksaan.vue";
import SubPelakuUsahaLayout from "@/layouts/subPelakuUsahaLayout.vue";

const defaultStatus = { color: "error", desc: "Unknown Status" };

const statusItem: any = new Proxy(
  {
    OF1: { color: "grey-300", desc: "Draft" },
    OF10: { color: "success", desc: "Submitted" },
    OF15: { color: "success", desc: "Verified" },
    OF2: { color: "error", desc: "Returned" },
    OF290: { color: "error", desc: "Rejected" },
    OF5: { color: "success", desc: "Invoice issued" },
    OF320: { color: "success", desc: "Code Issued" },
    OF11: { color: "success", desc: "Verification" },
    OF50: { color: "success", desc: "Dikirim ke LPH" },
    OF300: { color: "success", desc: "Halal Certified Issued" },
    OF285: { color: "success", desc: "Dikembalikan Oleh Fatwa" },
    OF74: { color: "success", desc: "Sent to Komite Fatwa" },
    OF280: { color: "success", desc: "Dikembalikan Ke PU" },
    OF100: { color: "success", desc: "Selesai Sidang Fatwa" },
    OF120: { color: "success", desc: "Certificate Issued" },
    OF900: { color: "error", desc: "Dibatalkan" },
  },
  {
    get(target: any, prop: any) {
      return prop in target ? target[prop] : defaultStatus;
    },
  }
);

const route = useRoute();

const sidangFatwaId = (route.params as any).id;

const loadingAll = ref(true);
const detailData = ref();
const profil = ref();
const jenisUsaha = ref();

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

      const { sidang_fatwa } = response.data || {};
      const { no_kh, SertifikatHalalReguler, tgl_sidang } = sidang_fatwa || {};

      const {
        status_reg,
        jenis_daftar,
        nama_pu,
        kota_pu,
        prov_pu,
        alamat_pu,
        kode_pos_pu,
        negara_pu,
        no_kontak_pj,
        email_pj,
        jenis_usaha,
        tgl_mohon,
      } = SertifikatHalalReguler || {};

      jenisUsaha.value = jenis_usaha;

      profil.value = [
        {
          label: "Nomor ID",
          value: no_kh,
        },
        {
          label: "Tanggal Buat",
          value: formatDate(tgl_sidang),
        },
        {
          label: "Status",
          value: statusItem[status_reg].desc,
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
          value: no_kontak_pj,
        },
        {
          label: "Email",
          value: email_pj,
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
        <VCol cols="auto">
          <UpdateSidangFatwaProses />
          <TambahDataSidangFatwaProses />
        </VCol>
      </VRow>
    </template>

    <!-- left content -->
    <template #leftContent>
      <VRow>
        <VCol cols="12">
          <ProfileDetailPengajuanProsesSidangFatwa
            :jenisusaha="jenisUsaha"
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
          <DaftarNamaProduk />
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <BiayaPemeriksaan />
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <JadwalAudit />
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <AuditorList />
        </VCol>
      </VRow>
      <VRow>
        <VCol :cols="12">
          <HasilPemeriksaan />
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
          <BiayaPemeriksaanDetail />
        </VCol>
      </VRow>
      <VRow>
        <VCol :cols="12">
          <DokumenUnduhan />
        </VCol>
        <VCol :cols="12">
          <MelacakDetaikFatwa />
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
