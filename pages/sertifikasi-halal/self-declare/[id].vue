<template>
  <VContainer>
    <KembaliButton />
    <VRow class="justify-space-between">
      <VCol cols="auto">
        <h3 class="text-h3">
          Detail Pengajuan Self Declare
        </h3>
      </VCol>
      <VCol cols="3">
        icon
      </VCol>
    </VRow>

    <VRow>
      <VCol cols="8">
        <ExpandCard title="Pengajuan Sertifikasi Halal">
          <InfoRow name="No.ID">{{userId}}</InfoRow>
          <InfoRow name="Tanggal">10/10/2024</InfoRow>
          <ThinLine :thickness=1 />
          <InfoRow name="No Surat Permohonan">389392924</InfoRow>
          <InfoRow name="Tanggal Permohonan">10/10/2024</InfoRow>
          <InfoRow name="Jenis Layanan">PNB</InfoRow>
          <InfoRow name="Jenis Produk">Minuman</InfoRow>
          <InfoRow name="Merk Dagang">-</InfoRow>
          <InfoRow name="Area Pemasaran">-</InfoRow>
          <InfoRow name="Pendamping">-</InfoRow>
          <InfoRow name="Lembaga Pendamping">-</InfoRow>
          <InfoRow name="KBLI">Minuman</InfoRow>
        </ExpandCard>
      </VCol>

      <VCol cols="4">
        B
      </VCol>
    </VRow>

  </VContainer>
</template>

<script setup lang="ts">
import TextFormView from "@/components/selfDeclare/InfoRow.vue"

const route = useRoute()

const userId = route.params.id
</script>
