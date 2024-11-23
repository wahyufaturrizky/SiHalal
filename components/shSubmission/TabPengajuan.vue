<script setup lang="ts">
const searchFasilitator = ref("");
</script>

<template>
  <VCard class="mb-10">
    <VCardTitle class="mb-5">
      <div class="font-weight-bold text-h4">Data Pengajuan</div>
    </VCardTitle>
    <VCardText>
      <VRow>
        <VCol cols="3">No.Id</VCol>
        <VCol cols="9">: 39886986</VCol>
      </VRow>
      <VRow>
        <VCol cols="3">Tanggal</VCol>
        <VCol cols="9">: 10/10/2024</VCol>
      </VRow>
      <VRow>
        <VCol cols="3">Jenis Pengajuan</VCol>
        <VCol cols="9">: Baru</VCol>
      </VRow>
      <VDivider class="my-5" />
      <VItemGroup>
        <VLabel>Jenis Pendaftaran</VLabel>
        <VSelect
          density="compact"
          :items="['BPJH SEHATI']"
          placeholder="Pilih Jenis Pendaftaran"
        />
      </VItemGroup>
      <br />
      <VCard>
        <VCardText>
          <VRow>
            <VCol>
              <VItemGroup>
                <VLabel>Fasilitasi</VLabel>
                <VSelect
                  density="compact"
                  v-modal="searchFasilitator"
                  :items="[{ title: 'BPJH SEHATI', value: 'BPJH SEHATI' }]"
                  placeholder="Pilih Fasilitator"
                  @update:model-value="(v) => (searchFasilitator = v)"
                />
              </VItemGroup>
            </VCol>
            <VCol cols="auto" align-self="center">Atau</VCol>
            <VCol>
              <VLabel>Kode Fasilitasi</VLabel>
              <VTextField placeholder="Masukkan Kode" density="compact">
                <template #append>
                  <VBtn variant="outlined"> Cari Kode </VBtn>
                </template>
              </VTextField>
            </VCol>
          </VRow>
          <VRow v-if="searchFasilitator.length">
            <VCol class="text-center">
              <div>Fasilitator</div>
              <div class="font-weight-bold text-h3">
                {{ searchFasilitator }}
              </div>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
      <VItemGroup v-if="searchFasilitator.length">
        <br />
        <VLabel>Asal Pelaku Usaha</VLabel>
        <VSelect
          density="compact"
          :items="['BPJH SEHATI']"
          placeholder="Pilih Asal Pelaku Usaha"
        />
      </VItemGroup>
    </VCardText>
  </VCard>
  <VCard>
    <VCardTitle class="mb-5">
      <div class="font-weight-bold text-h4">Penanggung Jawab</div>
    </VCardTitle>
    <VCardText>
      <div class="mb-10">
        <VRow>
          <VCol cols="3">Surat Permohonan</VCol>
          <VCol cols="9">
            :
            <VBtn
              color="primary"
              density="comfortable"
              append-icon="fa-download"
              >Unduh</VBtn
            >
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="3">Surat Pernyataan</VCol>
          <VCol cols="9">
            :
            <VBtn
              color="primary"
              density="comfortable"
              append-icon="fa-download"
              >Unduh</VBtn
            >
          </VCol>
        </VRow>
      </div>
      <VRow>
        <VCol cols="6">
          <VItemGroup>
            <VLabel>Nomor Surat Permohonan</VLabel>
            <VTextField
              placeholder="Masukkan Nomor Surat"
              density="compact"
            ></VTextField>
          </VItemGroup>
        </VCol>
        <VCol cols="6">
          <VItemGroup>
            <VLabel>Tanggal Surat Pemohon</VLabel>
            <VTextField
              placeholder="Masukkan Tanggal Permohonan"
              density="compact"
            ></VTextField>
          </VItemGroup>
        </VCol>
      </VRow>
      <br />
      <VItemGroup>
        <VLabel>Jenis Layanan</VLabel>
        <VSelect placeholder="Pilih Jenis Layanan" density="compact"></VSelect>
      </VItemGroup>
      <br />
      <VItemGroup>
        <VLabel>Jenis Produk</VLabel>
        <VSelect placeholder="Pilih Jenis Produk" density="compact"></VSelect>
      </VItemGroup>
      <br />
      <VItemGroup>
        <VLabel>Nama Usaha</VLabel>
        <VTextField
          placeholder="Masukkan Nama Usaha"
          density="compact"
        ></VTextField>
      </VItemGroup>
      <br />
      <VRow>
        <VCol cols="6">
          <VItemGroup>
            <VLabel>Asal Pemasaran</VLabel>
            <VSelect
              placeholder="Pilih Asal Pemasaran"
              density="compact"
            ></VSelect>
          </VItemGroup>
        </VCol>
        <VCol cols="6">
          <VItemGroup>
            <VLabel>Lokasi Pendamping</VLabel>
            <VSelect
              placeholder="Pilih Area Pemasaran"
              density="compact"
            ></VSelect>
          </VItemGroup>
        </VCol>
      </VRow>
      <br />
      <VRow>
        <VCol cols="6">
          <VItemGroup>
            <VLabel>Lembaga Pendamping</VLabel>
            <VSelect
              placeholder="Pilih Area Pemasaran"
              density="compact"
            ></VSelect>
          </VItemGroup>
        </VCol>
        <VCol cols="6">
          <VItemGroup>
            <VLabel>Pendamping</VLabel>
            <VSelect placeholder="Pilih Pendamping" density="compact"></VSelect>
          </VItemGroup>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>

<style scoped></style>
