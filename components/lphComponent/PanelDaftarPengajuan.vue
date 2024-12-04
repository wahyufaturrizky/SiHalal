<script setup lang="ts">
const props = defineProps<{
  type?: "READ" | "EDIT";
}>();

const panelType = computed(() => (props.type ? props.type : "READ"));
</script>

<template>
  <div class="d-flex flex-column ga-4">
    <VRow no-gutters>
      <VCol cols="5">
        <div class="d-flex justify-space-between">
          <div class="text-h6">No. ID</div>
          <div class="me-2">:</div>
        </div>
      </VCol>
      <VCol cols="7">39886986</VCol>
    </VRow>
    <VRow no-gutters>
      <VCol cols="5">
        <div class="d-flex justify-space-between">
          <div class="text-h6">Status</div>
          <div class="me-2">:</div>
        </div>
      </VCol>
      <VCol cols="7">Pembayaran</VCol>
    </VRow>
    <VRow no-gutters>
      <VCol cols="5">
        <div class="d-flex justify-space-between">
          <div class="text-h6">Tanggal Buat</div>
          <div class="me-2">:</div>
        </div>
      </VCol>
      <VCol cols="7">10/10/2024</VCol>
    </VRow>
    <VDivider class="my-1" />
    <VRow no-gutters>
      <VCol cols="5">
        <div class="d-flex justify-space-between">
          <div class="text-h6">Nama Perusahaan</div>
          <div class="me-2">:</div>
        </div>
      </VCol>
      <VCol cols="7">Kopi Susu Samsul</VCol>
    </VRow>
    <VRow no-gutters>
      <VCol cols="5">
        <div class="d-flex justify-space-between">
          <div class="text-h6">Alamat</div>
          <div class="me-2">:</div>
        </div>
      </VCol>
      <VCol cols="7">Sumbawa Banget, RT002/RW002, Sumbang, Curio</VCol>
    </VRow>
    <VRow no-gutters>
      <VCol cols="5">
        <div class="d-flex justify-space-between">
          <div class="text-h6">Kota/Kab</div>
          <div class="me-2">:</div>
        </div>
      </VCol>
      <VCol cols="7">Kab. Enrekang</VCol>
    </VRow>
    <VRow no-gutters>
      <VCol cols="5">
        <div class="d-flex justify-space-between">
          <div class="text-h6">Provinsi</div>
          <div class="me-2">:</div>
        </div>
      </VCol>
      <VCol cols="7">Sulawesi Selatan</VCol>
    </VRow>
    <VRow no-gutters>
      <VCol cols="5">
        <div class="d-flex justify-space-between">
          <div class="text-h6">Kode Pos</div>
          <div class="me-2">:</div>
        </div>
      </VCol>
      <VCol cols="7">-</VCol>
    </VRow>
    <VRow no-gutters>
      <VCol cols="5">
        <div class="d-flex justify-space-between">
          <div class="text-h6">Negara</div>
          <div class="me-2">:</div>
        </div>
      </VCol>
      <VCol cols="7">Indonesia</VCol>
    </VRow>
    <VRow no-gutters>
      <VCol cols="5">
        <div class="d-flex justify-space-between">
          <div class="text-h6">Telepon</div>
          <div class="me-2">:</div>
        </div>
      </VCol>
      <VCol cols="7">081234567890</VCol>
    </VRow>
    <VRow no-gutters>
      <VCol cols="5">
        <div class="d-flex justify-space-between">
          <div class="text-h6">Email</div>
          <div class="me-2">:</div>
        </div>
      </VCol>
      <VCol cols="7">kopisususamsul@gmail.com</VCol>
    </VRow>
    <VDivider class="my-1" />
    <VRow no-gutters>
      <VCol cols="5">
        <div class="d-flex justify-space-between">
          <div class="text-h6">Jenis Badan Usaha</div>
          <div class="me-2">:</div>
        </div>
      </VCol>
      <VCol cols="7">Lainnya</VCol>
    </VRow>
    <VRow no-gutters>
      <VCol cols="5" class="d-flex align-center justify-space-between">
        <div class="text-h6">Skala Usaha</div>
        <div class="me-2">:</div>
      </VCol>
      <VCol v-if="panelType == 'READ'" cols="7">Mikro</VCol>
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
