<template>
  <VExpansionPanels>
    <VExpansionPanel title="Data Pengajuan">
      <VExpansionPanelText>
        <div style="max-height: 40svh; overflow-y: auto">
          <br />
          <VRow>
            <VCol cols="2">No.Id</VCol>
            <VCol cols="1">:</VCol>
            <VCol cols="9">39886986</VCol>
          </VRow>
          <VRow>
            <VCol cols="2">Tanggal</VCol>
            <VCol cols="1">:</VCol>
            <VCol cols="9">10/10/2024</VCol>
          </VRow>
          <VRow>
            <VCol cols="2">Jenis Pengajuan</VCol>
            <VCol cols="1">:</VCol>
            <VCol cols="9">Baru</VCol>
          </VRow>
          <br />
          <br />
          <VRow>
            <VCol cols="12">
              <VItemGroup>
                <VLabel>Jenis Pendaftaran</VLabel>
                <VSelect density="compact" :items="['Self Declare']"></VSelect>
              </VItemGroup>
            </VCol>
          </VRow>
          <br />
          <VRow>
            <VCol cols="12">
              <VItemGroup>
                <VLabel>Kode Daftar / Fasilitasi</VLabel>
                <VRow>
                  <VCol cols="5">
                    <VSelect
                      density="compact"
                      :items="['Self Declare']"
                      placeholder="Pilih Fasilitator"
                    ></VSelect>
                  </VCol>

                  <VSpacer
                    style="
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    "
                    ><p>Atau</p></VSpacer
                  >
                  <VCol cols="5">
                    <VTextField
                      placeholder="Cari Fasilitator"
                      append-inner-icon="mdi-magnify"
                      density="compact"
                    ></VTextField>
                  </VCol>
                </VRow>
              </VItemGroup>
            </VCol>
          </VRow>
          <br />
          <VDivider></VDivider>
          <br />
          <VRow>
            <VCol cols="12">
              <VItemGroup>
                <VLabel>Nomor Surat Permohonan</VLabel>
                <VTextField
                  placeholder="Isi Nomor Surat Permohonan"
                  density="compact"
                ></VTextField>
              </VItemGroup>
              <br />
              <VItemGroup>
                <VLabel>Tanggal Surat Pemohon</VLabel>
                <VTextField
                  placeholder="Isi Tanggal Surat Pemohon"
                  density="compact"
                ></VTextField>
              </VItemGroup>
              <br />
              <VItemGroup>
                <VLabel>Jenis Layanan</VLabel>
                <VSelect
                  placeholder="Pilih Jenis Layanan"
                  density="compact"
                ></VSelect>
              </VItemGroup>
              <br />
              <VItemGroup>
                <VLabel>Jenis Produk</VLabel>
                <VSelect
                  placeholder="Pilih Jenis Produk"
                  density="compact"
                ></VSelect>
              </VItemGroup>
              <br />
              <VItemGroup>
                <VLabel>Nama Usaha</VLabel>
                <VTextField
                  placeholder="Isi Nama Usaha"
                  density="compact"
                ></VTextField>
              </VItemGroup>
              <br />
              <VItemGroup>
                <VLabel>Area Pemasaran</VLabel>
                <VSelect
                  placeholder="Pilih Area Pemasaran"
                  density="compact"
                ></VSelect>
              </VItemGroup>
              <br />
              <VItemGroup>
                <VLabel>Lokasi Pendamping</VLabel>
                <VSelect
                  placeholder="Pilih Area Pemasaran"
                  density="compact"
                ></VSelect>
              </VItemGroup>
              <br />
              <VItemGroup>
                <VLabel>Lembaga Pendamping</VLabel>
                <VSelect
                  placeholder="Pilih Area Pemasaran"
                  density="compact"
                ></VSelect>
              </VItemGroup>
              <br />
              <VItemGroup>
                <VLabel>Pendamping</VLabel>
                <VSelect
                  placeholder="Pilih Pendamping"
                  density="compact"
                ></VSelect>
              </VItemGroup>
            </VCol>
          </VRow>
        </div>
        <br />
        <div style="display: flex; justify-content: end">
          <VItemGroup style="display: inline-flex">
            <SuratPermohonanModal></SuratPermohonanModal>
            <div style="margin-left: 1svw"></div>
            <SuratPernyataanModal></SuratPernyataanModal>
          </VItemGroup>
        </div>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>
