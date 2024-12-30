<script setup lang="ts">
const props = defineProps<{
  type?: "READ" | "EDIT";
  dataPengajuan?: object;
}>();

const detail = ref(props?.dataPengajuan);

const panelType = computed(() => (props.type ? props.type : "READ"));
</script>

<template>
  <div v-if="detail" class="d-flex flex-column ga-4">
    <VRow no-gutters>
      <VCol cols="5">
        <div class="d-flex justify-space-between">
          <div class="text-h6">No. ID</div>
          <div class="me-2">:</div>
        </div>
      </VCol>
      <VCol cols="7">
        {{ (detail as any)?.nomor_id }}
      </VCol>
    </VRow>
    <VRow no-gutters>
      <VCol cols="5">
        <div class="d-flex justify-space-between">
          <div class="text-h6">Status</div>
          <div class="me-2">:</div>
        </div>
      </VCol>
      <VCol cols="7">
        {{ (detail as any)?.status }}
      </VCol>
    </VRow>
    <VRow no-gutters>
      <VCol cols="5">
        <div class="d-flex justify-space-between">
          <div class="text-h6">Tanggal Buat</div>
          <div class="me-2">:</div>
        </div>
      </VCol>
      <VCol cols="7" v-if="(detail as any)?.tanggal_buat">
        {{ formatDateIntl(new Date((detail as any)?.tanggal_buat)) }}
      </VCol>
    </VRow>
    <VDivider class="my-1" />
    <VRow no-gutters>
      <VCol cols="5">
        <div class="d-flex justify-space-between">
          <div class="text-h6">Nama Perusahaan</div>
          <div class="me-2">:</div>
        </div>
      </VCol>
      <VCol cols="7">
        {{ (detail as any)?.nama_pu }}
      </VCol>
    </VRow>
    <VRow no-gutters>
      <VCol cols="5">
        <div class="d-flex justify-space-between">
          <div class="text-h6">Alamat</div>
          <div class="me-2">:</div>
        </div>
      </VCol>
      <VCol cols="7">
        {{ (detail as any)?.alamat }}
      </VCol>
    </VRow>
    <VRow no-gutters>
      <VCol cols="5">
        <div class="d-flex justify-space-between">
          <div class="text-h6">Kota/Kab</div>
          <div class="me-2">:</div>
        </div>
      </VCol>
      <VCol cols="7">
        {{ (detail as any)?.kota }}
      </VCol>
    </VRow>
    <VRow no-gutters>
      <VCol cols="5">
        <div class="d-flex justify-space-between">
          <div class="text-h6">Provinsi</div>
          <div class="me-2">:</div>
        </div>
      </VCol>
      <VCol cols="7">
        {{ (detail as any)?.provinsi }}
      </VCol>
    </VRow>
    <VRow no-gutters>
      <VCol cols="5">
        <div class="d-flex justify-space-between">
          <div class="text-h6">Kode Pos</div>
          <div class="me-2">:</div>
        </div>
      </VCol>
      <VCol cols="7">
        {{ (detail as any)?.kodepos }}
      </VCol>
    </VRow>
    <VRow no-gutters>
      <VCol cols="5">
        <div class="d-flex justify-space-between">
          <div class="text-h6">Negara</div>
          <div class="me-2">:</div>
        </div>
      </VCol>
      <VCol cols="7">
        {{ (detail as any)?.negara }}
      </VCol>
    </VRow>
    <VRow no-gutters>
      <VCol cols="5">
        <div class="d-flex justify-space-between">
          <div class="text-h6">Telepon</div>
          <div class="me-2">:</div>
        </div>
      </VCol>
      <VCol cols="7">
        {{ (detail as any)?.telepon }}
      </VCol>
    </VRow>
    <VRow no-gutters>
      <VCol cols="5">
        <div class="d-flex justify-space-between">
          <div class="text-h6">Email</div>
          <div class="me-2">:</div>
        </div>
      </VCol>
      <VCol cols="7">
        {{ (detail as any)?.email }}
      </VCol>
    </VRow>
    <VDivider class="my-1" />
    <VRow no-gutters>
      <VCol cols="5">
        <div class="d-flex justify-space-between">
          <div class="text-h6">Jenis Badan Usaha</div>
          <div class="me-2">:</div>
        </div>
      </VCol>
      <VCol cols="7">
        {{ (detail as any)?.jenis_usaha }}
      </VCol>
    </VRow>
    <VRow no-gutters>
      <VCol cols="5" class="d-flex align-center justify-space-between">
        <div class="text-h6">Skala Usaha</div>
        <div class="me-2">:</div>
      </VCol>
      <VCol v-if="panelType == 'READ'" cols="7">
        {{ (detail as any)?.skala_usaha }}
      </VCol>
      <VCol v-else cols="7" class="d-flex align-center">
        <VSelect density="compact" model-value="Mikro" rounded="xl">
          <template #append>
            <VBtn text="Update" variant="outlined" disabled />
          </template>
        </VSelect>
      </VCol>
    </VRow>
  </div>
</template>

<style scoped></style>
