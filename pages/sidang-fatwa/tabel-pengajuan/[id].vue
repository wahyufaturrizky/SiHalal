<script lang="ts" setup>
import BiayaPemeriksaan from "@/components/sidangFatwa/BiayaPemeriksaan.vue";
import SubPelakuUsahaLayout from "@/layouts/subPelakuUsahaLayout.vue";

const route = useRoute();

const sidangFatwaId = (route.params as any).id;

const loadingAll = ref(true);
const detailData = ref();

const loadItemById = async () => {
  try {
    const response: any = await $api(
      `/sidang-fatwa/entri-ketetapan-halal/${sidangFatwaId}`,
      {
        method: "get",
      }
    );

    if (response.code === 2000) {
      detailData.value = response.data;
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
          <VBtn
            color="primary"
            outlined
            class="text-capitalize"
            @click="updateStatus"
          >
            Update Status Selesai Sidang Fatwa
          </VBtn>
          <VBtn
            color="primary"
            class="text-capitalize ml-4"
            @click="unggahKetetapanHalal"
          >
            Unggah Ketetapan Halal
          </VBtn>
        </VCol>
      </VRow>
    </template>

    <!-- left content -->
    <template #leftContent>
      <VRow>
        <VCol cols="12">
          <ProfileDetailPengajuan />
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <PengajuanSertifikat />
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
