<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const props = defineProps<{
  type?: "READ" | "EDIT";
  dataPengajuan?: object;
}>();

const route = useRoute();
const id = route.params.id;

const detail = ref(props?.dataPengajuan);

const panelType = computed(() => (props.type ? props.type : "READ"));
</script>

<template>
  <div class="d-flex flex-column ga-4">
    <VRow no-gutters>
      <VCol cols="5">
        <div class="d-flex justify-space-between">
          <div class="text-h6">
            {{ t("status-permohoanan.reguler-detail-pengajuan-noid") }}
          </div>
          <div class="me-2">:</div>
        </div>
      </VCol>
      <VCol cols="7">
        {{ id }}
      </VCol>
    </VRow>
    <VRow no-gutters>
      <VCol cols="5">
        <div class="d-flex justify-space-between">
          <div class="text-h6">
            {{ t("status-permohoanan.reguler-detail-pengajuan-tgl") }}
          </div>
          <div class="me-2">:</div>
        </div>
      </VCol>
      <VCol cols="7" v-if="detail?.tanggal_buat">
        {{ formatDateIntl(new Date(detail?.tanggal_buat)) }}
      </VCol>
    </VRow>
    <VDivider class="my-1" />
    <VRow no-gutters>
      <VCol cols="5">
        <div class="d-flex justify-space-between">
          <div class="text-h6">
            {{ t("status-permohoanan.reguler-detail-pengajuan-nomohon") }}
          </div>
          <div class="me-2">:</div>
        </div>
      </VCol>
      <VCol cols="7">
        {{ detail?.no_mohon }}
      </VCol>
    </VRow>
    <VRow no-gutters>
      <VCol cols="5">
        <div class="d-flex justify-space-between">
          <div class="text-h6">
            {{ t("status-permohoanan.reguler-detail-pengajuan-tglmohon") }}
          </div>
          <div class="me-2">:</div>
        </div>
      </VCol>
      <VCol v-if="detail?.tgl_mohon" cols="7">
        {{ formatDateIntl(new Date(detail?.tgl_mohon)) }}
      </VCol>
    </VRow>
    <VRow no-gutters>
      <VCol cols="5">
        <div class="d-flex justify-space-between">
          <div class="text-h6">
            {{ t("status-permohoanan.reguler-detail-pengajuan-jnslay") }}
          </div>
          <div class="me-2">:</div>
        </div>
      </VCol>
      <VCol cols="7">
        {{ detail?.jenis_layanan }}
      </VCol>
    </VRow>
    <VRow no-gutters>
      <VCol cols="5">
        <div class="d-flex justify-space-between">
          <div class="text-h6">
            {{ t("status-permohoanan.reguler-detail-pengajuan-jnsprod") }}
          </div>
          <div class="me-2">:</div>
        </div>
      </VCol>
      <VCol cols="7">
        {{ detail?.jenis_produk }}
      </VCol>
    </VRow>
    <VRow no-gutters>
      <VCol cols="5">
        <div class="d-flex justify-space-between">
          <div class="text-h6">
            {{ t("status-permohoanan.reguler-detail-pengajuan-merk") }}
          </div>
          <div class="me-2">:</div>
        </div>
      </VCol>
      <VCol cols="7">
        {{ detail?.merk_dagang }}
      </VCol>
    </VRow>
    <VRow no-gutters>
      <VCol cols="5">
        <div class="d-flex justify-space-between">
          <div class="text-h6">
            {{ t("status-permohoanan.reguler-detail-pengajuan-area") }}
          </div>
          <div class="me-2">:</div>
        </div>
      </VCol>
      <VCol cols="7">
        {{ detail?.area_pemasaran }}
      </VCol>
    </VRow>
    <VDivider class="my-1" />
    <VRow no-gutters>
      <VCol cols="5">
        <div class="d-flex justify-space-between">
          <div class="text-h6">
            {{ t("status-permohoanan.reguler-detail-pengajuan-namapu") }}
          </div>
          <div class="me-2">:</div>
        </div>
      </VCol>
      <VCol cols="7">
        {{ detail?.nama_pu }}
      </VCol>
    </VRow>
    <VRow no-gutters>
      <VCol cols="5" class="d-flex align-center justify-space-between">
        <div class="text-h6">
          {{ t("status-permohoanan.reguler-detail-pengajuan-lph") }}
        </div>
        <div class="me-2">:</div>
      </VCol>
      <VCol cols="7">
        {{ detail?.nama_lph }}
      </VCol>
    </VRow>
    <VRow no-gutters>
      <VCol cols="5" class="d-flex align-center justify-space-between">
        <div class="text-h6">
          {{ t("status-permohoanan.reguler-detail-pengajuan-namakbli") }}
        </div>
        <div class="me-2">:</div>
      </VCol>
      <VCol cols="7">
        {{ detail?.nama_kbli }}
      </VCol>
    </VRow>
    <VRow no-gutters>
      <VCol cols="5" class="d-flex align-center justify-space-between">
        <div class="text-h6">
          {{ t("status-permohoanan.reguler-detail-pengajuan-address") }}
        </div>
        <div class="me-2">:</div>
      </VCol>
      <VCol cols="7">
        {{ detail?.alamat_pu }}
      </VCol>
    </VRow>
    <VRow no-gutters>
      <VCol cols="5" class="d-flex align-center justify-space-between">
        <div class="text-h6">
          {{ t("status-permohoanan.reguler-detail-pengajuan-city") }}
        </div>
        <div class="me-2">:</div>
      </VCol>
      <VCol cols="7">
        {{ detail?.kota_pu }}
      </VCol>
    </VRow>
    <VRow no-gutters>
      <VCol cols="5" class="d-flex align-center justify-space-between">
        <div class="text-h6">
          {{ t("status-permohoanan.reguler-detail-pengajuan-province") }}
        </div>
        <div class="me-2">:</div>
      </VCol>
      <VCol cols="7">
        {{ detail?.provinsi_pu }}
      </VCol>
    </VRow>
    <VRow no-gutters>
      <VCol cols="5" class="d-flex align-center justify-space-between">
        <div class="text-h6">
          {{ t("status-permohoanan.reguler-detail-pengajuan-kodepos") }}
        </div>
        <div class="me-2">:</div>
      </VCol>
      <VCol cols="7">
        {{ detail?.kode_pos_pu }}
      </VCol>
    </VRow>
    <VRow no-gutters>
      <VCol cols="5" class="d-flex align-center justify-space-between">
        <div class="text-h6">
          {{ t("status-permohoanan.reguler-detail-pengajuan-negara") }}
        </div>
        <div class="me-2">:</div>
      </VCol>
      <VCol cols="7">
        {{ detail?.negara_pu || "Indonesia" }}
      </VCol>
    </VRow>
    <VRow no-gutters>
      <VCol cols="5" class="d-flex align-center justify-space-between">
        <div class="text-h6">
          {{ t("status-permohoanan.reguler-detail-pengajuan-telp") }}
        </div>
        <div class="me-2">:</div>
      </VCol>
      <VCol cols="7">
        {{ detail?.telp_pu }}
      </VCol>
    </VRow>
    <VRow no-gutters>
      <VCol cols="5" class="d-flex align-center justify-space-between">
        <div class="text-h6">
          {{ t("status-permohoanan.reguler-detail-pengajuan-email") }}
        </div>
        <div class="me-2">:</div>
      </VCol>
      <VCol cols="7">
        {{ detail?.email }}
      </VCol>
    </VRow>
  </div>
</template>

<style scoped></style>
