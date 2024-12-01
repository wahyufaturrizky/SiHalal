<script setup lang="ts">
const submissionData = ref({
  id: "39886986",
  date: "10/10/2024",
  type: "Baru",
});

const fasilitatorData = ref([{ title: "BPJH SEHATI", value: "BPJH SEHATI" }]);
const selectedFasilitator = ref("");
const searchFasilitator = ref("");
const foundFasilitator = ref("");

const handleSelectFasilitator = (v: string) => {
  selectedFasilitator.value = v;
  const found = fasilitatorData.value.find((i) => i.value === v);
  if (found) foundFasilitator.value = found.value;
};
const handleSearchFasilitator = () => {
  const regex = new RegExp(searchFasilitator.value, "i");
  const found = fasilitatorData.value.find((i) => regex.test(i.value));
  if (found) {
    foundFasilitator.value = found.value;
    useSnackbar().sendSnackbar("Kode fasilitator ditemukan", "success");
  } else {
    foundFasilitator.value = "";
    useSnackbar().sendSnackbar(
      "Kode fasilitator tidak ditemukan, silahkan cek kembali",
      "error"
    );
  }
};

const downloadFile = () => {
  useSnackbar().sendSnackbar("Berhasil mengunduh data", "success");
};
</script>

<template>
  <VCard class="mb-10 pt-3">
    <VCardTitle class="mb-5">
      <div class="font-weight-bold text-h4">Data Pengajuan</div>
    </VCardTitle>
    <VCardText>
      <VRow>
        <VCol cols="3" class="font-weight-bold mb-1">No. ID</VCol>
        <VCol cols="9">: {{ submissionData.id }}</VCol>
      </VRow>
      <VRow>
        <VCol cols="3" class="font-weight-bold mb-1">Tanggal</VCol>
        <VCol cols="9">: {{ submissionData.date }}</VCol>
      </VRow>
      <VRow>
        <VCol cols="3" class="font-weight-bold mb-1">Jenis Pengajuan</VCol>
        <VCol cols="9">: {{ submissionData.date }}</VCol>
      </VRow>
      <VDivider class="my-5" />
      <VItemGroup>
        <div class="font-weight-bold mb-1">Jenis Pendaftaran</div>
        <VSelect
          density="compact"
          :items="fasilitatorData"
          placeholder="Pilih Jenis Pendaftaran"
          rounded="xl"
          menu-icon="fa-chevron-down"
        />
      </VItemGroup>
      <br />
      <VCard>
        <VCardText>
          <VRow>
            <VCol>
              <VItemGroup>
                <div class="font-weight-bold mb-1">Fasilitasi</div>
                <VSelect
                  density="compact"
                  rounded="xl"
                  v-modal="selectedFasilitator"
                  :items="fasilitatorData"
                  placeholder="Pilih Fasilitator"
                  @update:model-value="handleSelectFasilitator"
                  @click:clear="
                    [(selectedFasilitator = ''), (foundFasilitator = '')]
                  "
                  :disabled="searchFasilitator.length > 0"
                  clearable
                  menu-icon="fa-chevron-down"
                />
              </VItemGroup>
            </VCol>
            <VCol cols="auto" align-self="center">Atau</VCol>
            <VCol>
              <div class="font-weight-bold mb-1">Kode Fasilitasi</div>
              <VTextField
                v-model="searchFasilitator"
                placeholder="Masukkan Kode"
                :disabled="selectedFasilitator.length > 0"
                density="compact"
                rounded="xl"
              >
                <template #append>
                  <VBtn
                    variant="outlined"
                    @click="handleSearchFasilitator"
                    :disabled="selectedFasilitator.length > 0"
                  >
                    Cari Kode
                  </VBtn>
                </template>
              </VTextField>
            </VCol>
          </VRow>
          <VExpandTransition>
            <VItemGroup v-if="foundFasilitator.length > 0">
              <VRow>
                <VCol class="text-center">
                  <div>Fasilitator</div>
                  <div class="font-weight-bold text-h3">
                    {{ foundFasilitator }}
                  </div>
                </VCol>
              </VRow>
            </VItemGroup>
          </VExpandTransition>
        </VCardText>
      </VCard>
      <VItemGroup v-if="foundFasilitator">
        <br />
        <div class="font-weight-bold mb-1">Asal Pelaku Usaha</div>
        <VSelect
          density="compact"
          placeholder="Pilih Asal Pelaku Usaha"
          rounded="xl"
          menu-icon="fa-chevron-down"
        />
      </VItemGroup>
    </VCardText>
  </VCard>
  <VCard class="pt-3">
    <VCardTitle class="mb-5">
      <div class="font-weight-bold text-h4">Penanggung Jawab</div>
    </VCardTitle>
    <VCardText>
      <div class="mb-10">
        <VRow>
          <VCol cols="3" class="font-weight-bold mb-1">Surat Permohonan</VCol>
          <VCol cols="9">
            :
            <VBtn
              color="primary"
              density="comfortable"
              append-icon="fa-download"
              @click="downloadFile"
              >Unduh</VBtn
            >
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="3" class="font-weight-bold mb-1">Surat Pernyataan</VCol>
          <VCol cols="9">
            :
            <VBtn
              color="primary"
              density="comfortable"
              append-icon="fa-download"
              @click="downloadFile"
              >Unduh</VBtn
            >
          </VCol>
        </VRow>
      </div>
      <VRow>
        <VCol cols="6">
          <VItemGroup>
            <div class="font-weight-bold mb-1">Nomor Surat Permohonan</div>
            <VTextField
              placeholder="Masukkan Nomor Surat"
              density="compact"
              rounded="xl"
            />
          </VItemGroup>
        </VCol>
        <VCol cols="6">
          <VItemGroup>
            <div class="font-weight-bold mb-1">Tanggal Surat Pemohon</div>
            <VTextField
              placeholder="Masukkan Tanggal Permohonan"
              density="compact"
              rounded="xl"
            />
          </VItemGroup>
        </VCol>
      </VRow>
      <br />
      <VItemGroup>
        <div class="font-weight-bold mb-1">Jenis Layanan</div>
        <VSelect
          placeholder="Pilih Jenis Layanan"
          density="compact"
          rounded="xl"
          menu-icon="fa-chevron-down"
        />
      </VItemGroup>
      <br />
      <VItemGroup>
        <div class="font-weight-bold mb-1">Jenis Produk</div>
        <VSelect
          placeholder="Pilih Jenis Produk"
          density="compact"
          rounded="xl"
          menu-icon="fa-chevron-down"
        />
      </VItemGroup>
      <br />
      <VItemGroup>
        <div class="font-weight-bold mb-1">Nama Usaha</div>
        <VTextField
          placeholder="Masukkan Nama Usaha"
          density="compact"
          rounded="xl"
        />
      </VItemGroup>
      <br />
      <VRow>
        <VCol cols="6">
          <VItemGroup>
            <div class="font-weight-bold mb-1">Asal Pemasaran</div>
            <VSelect
              placeholder="Pilih Asal Pemasaran"
              density="compact"
              rounded="xl"
              menu-icon="fa-chevron-down"
            />
          </VItemGroup>
        </VCol>
        <VCol cols="6">
          <VItemGroup>
            <div class="font-weight-bold mb-1">Lokasi Pendamping</div>
            <VSelect
              placeholder="Pilih Area Pemasaran"
              density="compact"
              rounded="xl"
              menu-icon="fa-chevron-down"
            />
          </VItemGroup>
        </VCol>
      </VRow>
      <br />
      <VRow>
        <VCol cols="6">
          <VItemGroup>
            <div class="font-weight-bold mb-1">Lembaga Pendamping</div>
            <VSelect
              placeholder="Pilih Area Pemasaran"
              density="compact"
              rounded="xl"
              menu-icon="fa-chevron-down"
            />
          </VItemGroup>
        </VCol>
        <VCol cols="6">
          <VItemGroup>
            <div class="font-weight-bold mb-1">Pendamping</div>
            <VSelect
              placeholder="Pilih Pendamping"
              density="compact"
              rounded="xl"
              menu-icon="fa-chevron-down"
            />
          </VItemGroup>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>
