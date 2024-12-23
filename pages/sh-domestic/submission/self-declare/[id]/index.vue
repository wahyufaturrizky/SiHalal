<template>
  <VContainer>
    <div
      class="d-flex align-center cursor-pointer"
      @click="router.push(`/sh-domestic/submission/self-declare`)"
    >
      <VIcon icon="mdi-chevron-left" size="40px" color="primary" />
      <div class="text-primary">Kembali</div>
    </div>
    <VRow align="center">
      <VCol cols="8">
        <h3 class="text-h3 font-weight-bold">Detail Pengajuan Self Declare</h3>
      </VCol>
      <VCol cols="4">
        <div class="d-flex justify-end align-center ga-2">
          <VBtn
            variant="outlined"
            color="error"
            class="px-3"
            @click="isDeleteModalOpen = true"
          >
            <VIcon icon="mdi-delete" />
          </VBtn>
          <VBtn
            variant="outlined"
            append-icon="ri-pencil-fill"
            @click="
              router.push(
                `/sh-domestic/submission/self-declare/${submissionId}/edit`
              )
            "
            >Ubah</VBtn
          >
          <VBtn @click="isSendModalOpen = true">Kirim</VBtn>
        </div>
      </VCol>
    </VRow>

    <VRow>
      <VCol cols="8">
        <VExpansionPanels
          v-model="panelSubmission"
          expand-icon="fa-chevron-down"
          collapse-icon="fa-chevron-up"
        >
          <VExpansionPanel class="py-2">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Pengajuan Sertifikasi Halal
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <InfoRow name="No. ID" :name-style="{ fontWeight: '600' }">{{
                submissionDetail.id_reg ? submissionDetail.id_reg : "-"
              }}</InfoRow>
              <InfoRow name="Tanggal" :name-style="{ fontWeight: '600' }">
                {{
                  submissionDetail.tanggal_buat
                    ? submissionDetail.tanggal_buat
                    : "-"
                }}
              </InfoRow>
              <ThinLine :thickness="1" />
              <InfoRow
                name="No Surat Permohonan"
                :name-style="{ fontWeight: '600' }"
              >
                {{
                  submissionDetail.no_mohon ? submissionDetail.no_mohon : "-"
                }}
              </InfoRow>
              <InfoRow
                name="Tanggal Permohonan"
                :name-style="{ fontWeight: '600' }"
              >
                {{
                  submissionDetail.tgl_mohon ? submissionDetail.tgl_mohon : "-"
                }}
              </InfoRow>
              <InfoRow name="Jenis Layanan" :name-style="{ fontWeight: '600' }">
                {{
                  submissionDetail.jenis_layanan
                    ? submissionDetail.jenis_layanan
                    : "-"
                }}
              </InfoRow>
              <InfoRow name="Jenis Produk" :name-style="{ fontWeight: '600' }">
                {{
                  submissionDetail.jenis_produk
                    ? submissionDetail.jenis_produk
                    : "-"
                }}
              </InfoRow>
              <InfoRow name="Merk Dagang" :name-style="{ fontWeight: '600' }">
                {{
                  submissionDetail.merk_dagang
                    ? submissionDetail.merk_dagang
                    : "-"
                }}
              </InfoRow>
              <InfoRow name="Area Pemasaran" :name-style="{ fontWeight: '00' }">
                {{
                  submissionDetail.area_pemasaran
                    ? submissionDetail.area_pemasaran
                    : "-"
                }}
              </InfoRow>
              <InfoRow name="Pendamping" :name-style="{ fontWeight: '600' }">
                {{
                  submissionDetail.pendamping
                    ? submissionDetail.pendamping
                    : "-"
                }}
              </InfoRow>
              <InfoRow
                name="Lembaga Pendamping"
                :name-style="{ fontWeight: '600' }"
              >
                {{
                  submissionDetail.lembaga_pendamping
                    ? submissionDetail.lembaga_pendamping
                    : "-"
                }}
              </InfoRow>
              <InfoRow
                name="KBLI"
                class="d-flex align-center"
                :name-style="{ fontWeight: '600' }"
              >
                <VRow class="d-flex align-center">
                  <VCol cols="12">
                    <VSelect
                      :items="kbliDropdown"
                      :model-value="kbliData"
                      @update:model-value="(v) => (selectedKbli = v)"
                      item-title="uraian_usaha"
                      item-value="id"
                      placeholder="Pilih KBLI"
                      density="compact"
                      rounded="xl"
                      outlined
                      menu-icon="mdi-chevron-down"
                    >
                      <template #append>
                        <VBtn
                          v-if="!isEditButtonDisabled"
                          variant="outlined"
                          @click="handleUpdateKbli"
                        >
                          Update
                        </VBtn>
                        <VBtn v-else variant="outlined" color="#A09BA1">
                          Update
                        </VBtn>
                      </template>
                    </VSelect>
                  </VCol>
                </VRow>
              </InfoRow>
              <ThinLine :thickness="1" />
              <InfoRow
                name="Nama Perusahaan"
                :name-style="{ fontWeight: '600' }"
              >
                {{ submissionDetail.nama_pu ? submissionDetail.nama_pu : "-" }}
              </InfoRow>
              <InfoRow name="Alamat" :name-style="{ fontWeight: '600' }">
                {{
                  submissionDetail.alamat_pu ? submissionDetail.alamat_pu : "-"
                }}
              </InfoRow>
              <InfoRow name="Kota / Kab" :name-style="{ fontWeight: '600' }">
                {{ submissionDetail.kota_pu ? submissionDetail.kota_pu : "-" }}
              </InfoRow>
              <InfoRow name="Provinsi" :name-style="{ fontWeight: '600' }">
                {{
                  submissionDetail.provinsi_pu
                    ? submissionDetail.provinsi_pu
                    : "-"
                }}
              </InfoRow>
              <InfoRow name="Kode Pos" :name-style="{ fontWeight: '600' }">
                {{
                  submissionDetail.kode_pos_pu
                    ? submissionDetail.kode_pos_pu
                    : "-"
                }}
              </InfoRow>
              <InfoRow name="Negara" :name-style="{ fontWeight: '600' }">
                {{
                  submissionDetail.negara_pu ? submissionDetail.negara_pu : "-"
                }}
              </InfoRow>
              <InfoRow name="Telepon" :name-style="{ fontWeight: '600' }">
                {{ submissionDetail.telp_pu ? submissionDetail.telp_pu : "-" }}
              </InfoRow>
              <InfoRow name="Email" :name-style="{ fontWeight: '600' }">
                {{ submissionDetail.email ? submissionDetail.email : "-" }}
              </InfoRow>
              <ThinLine :thickness="1" />
              <InfoRow
                name="Jenis Badan Usaha"
                :name-style="{ fontWeight: '600' }"
              >
                {{
                  submissionDetail.jenis_badan_usaha
                    ? submissionDetail.jenis_badan_usaha
                    : "-"
                }}
              </InfoRow>
              <InfoRow name="Skala Usaha" :name-style="{ fontWeight: '600' }">
                {{
                  submissionDetail.skala_usaha
                    ? submissionDetail.skala_usaha
                    : "-"
                }}
              </InfoRow>
              <InfoRow name="Tingkat Usaha" :name-style="{ fontWeight: '600' }">
                {{
                  submissionDetail.tingkat_usaha
                    ? submissionDetail.tingkat_usaha
                    : "-"
                }}
              </InfoRow>
              <InfoRow name="Modal Dasar" :name-style="{ fontWeight: '600' }">
                {{
                  submissionDetail.modal_usaha
                    ? formatCurrency(String(submissionDetail.modal_usaha))
                    : "Rp 0"
                }}
              </InfoRow>
              <InfoRow name="Asal Usaha" :name-style="{ fontWeight: '600' }">
                {{
                  submissionDetail.asal_usaha
                    ? submissionDetail.asal_usaha
                    : "-"
                }}
              </InfoRow>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br />
        <VExpansionPanels
          v-model="panelPic"
          expand-icon="fa-chevron-down"
          collapse-icon="fa-chevron-up"
        >
          <VExpansionPanel class="py-2">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Penanggung Jawab
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <InfoRow name="Nama" :name-style="{ fontWeight: '600' }">
                {{ picDetail.nama_pj ? picDetail.nama_pj : "-" }}
              </InfoRow>
              <InfoRow name="Nomor Kontak" :name-style="{ fontWeight: '600' }">
                {{
                  picDetail.nomor_kontak_pj ? picDetail.nomor_kontak_pj : "-"
                }}
              </InfoRow>
              <InfoRow name="Email" :name-style="{ fontWeight: '600' }">
                {{ picDetail.email_pj ? picDetail.email_pj : "-" }}
              </InfoRow>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br />
        <VExpansionPanels
          v-model="panelAspectLegal"
          expand-icon="fa-chevron-down"
          collapse-icon="fa-chevron-up"
        >
          <VExpansionPanel class="py-2">
            <VExpansionPanelTitle class="text-h4 font-weight-bold mb-3">
              Aspek Legal
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <VDataTable
                v-if="aspectLegalItems.length"
                :headers="aspectLegalHeader"
                :items="aspectLegalItems"
                :hide-default-footer="aspectLegalItems.length < 10"
              >
                <template #item.no="{ index }">
                  {{ index + 1 }}
                </template>
                <template #item.tgl_surat="{ item }: any">
                  {{ item.tgl_surat ? item.tgl_surat : "-" }}
                </template>
                <template #item.masa_berlaku="{ item }: any">
                  {{ item.masa_berlaku ? item.masa_berlaku : "-" }}
                </template>
              </VDataTable>
              <VCard v-else variant="outlined" class="py-2">
                <VRow>
                  <VCol cols="12" align="center">
                    <img src="~/assets/images/empty-data.png" alt="" />
                    <div class="pt-2 font-weight-bold">Data Kosong</div>
                  </VCol>
                </VRow>
              </VCard>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br />
        <VExpansionPanels
          v-model="panelFactory"
          expand-icon="fa-chevron-down"
          collapse-icon="fa-chevron-up"
        >
          <VExpansionPanel class="py-2">
            <VExpansionPanelTitle class="text-h4 font-weight-bold mb-3"
              >Pabrik</VExpansionPanelTitle
            >
            <VExpansionPanelText>
              <VDataTable
                v-if="factoryItems.length"
                :headers="factoryHeader"
                :items="factoryItems"
                :hide-default-footer="factoryItems.length < 10"
              >
                <template #item.no="{ index }">
                  {{ index + 1 }}
                </template>
              </VDataTable>
              <VCard v-else variant="outlined" class="py-2">
                <VRow>
                  <VCol cols="12" align="center">
                    <img src="~/assets/images/empty-data.png" alt="" />
                    <div class="pt-2 font-weight-bold">Data Kosong</div>
                  </VCol>
                </VRow>
              </VCard>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br />
        <VExpansionPanels
          v-model="panelOutlet"
          expand-icon="fa-chevron-down"
          collapse-icon="fa-chevron-up"
        >
          <VExpansionPanel class="py-2">
            <VExpansionPanelTitle class="text-h4 font-weight-bold mb-3">
              Outlet
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <VDataTable
                v-if="outletItems.length"
                :headers="outletHeader"
                :items="outletItems"
                :hide-default-footer="outletItems.length < 10"
              >
                <template #item.no="{ index }">
                  {{ index + 1 }}
                </template>
              </VDataTable>
              <VCard v-else variant="outlined" class="py-2">
                <VRow>
                  <VCol cols="12" align="center">
                    <img src="~/assets/images/empty-data.png" alt="" />
                    <div class="pt-2 font-weight-bold">Data Kosong</div>
                  </VCol>
                </VRow>
              </VCard>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br />
        <VExpansionPanels
          v-model="panelSupervisor"
          expand-icon="fa-chevron-down"
          collapse-icon="fa-chevron-up"
        >
          <VExpansionPanel class="py-2">
            <VExpansionPanelTitle class="text-h4 font-weight-bold mb-3">
              Penyelia Halal
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <VDataTable
                v-if="supervisorItems.length"
                :headers="supervisorHeader"
                :items="supervisorItems"
                :hide-default-footer="supervisorItems.length < 10"
              >
                <template #item.no="{ index }">
                  {{ index + 1 }}
                </template>
                <template #item.no_penyelia_halal="{ item }: any">
                  {{ `${item.no_penyelia_halal}/${item.tgl_penyelia_halal}` }}
                </template>
                <template #item.no_sk="{ item }: any">
                  {{ `${item.no_sk}/${item.tanggal_sk}` }}
                </template>
              </VDataTable>
              <VCard v-else variant="outlined" class="py-2">
                <VRow>
                  <VCol cols="12" align="center">
                    <img src="~/assets/images/empty-data.png" alt="" />
                    <div class="pt-2 font-weight-bold">Data Kosong</div>
                  </VCol>
                </VRow>
              </VCard>
              <div>
                <VBtn
                  text="Download SK Penyelia"
                  append-icon="fa-download"
                  variant="outlined"
                  class="float-end mt-6"
                  target="_blank"
                  :download="submissionDetail.url_sample_penyelia_sk"
                />
              </div>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br />
        <VExpansionPanels
          v-model="panelSubstance"
          expand-icon="fa-chevron-down"
          collapse-icon="fa-chevron-up"
        >
          <VExpansionPanel class="py-2">
            <VExpansionPanelTitle class="text-h4 font-weight-bold mb-3">
              Daftar Nama Bahan
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <VDataTable
                v-if="substanceItems.length"
                :headers="substanceHeader"
                :items="substanceItems"
                :hide-default-footer="substanceItems.length < 10"
              >
                <template #item.no="{ index }">
                  {{ index + 1 }}
                </template>
                <!-- <template #item.jenis_bahan="{ item }: any">
                  {{ item.jenis_bahan ? item.jenis_bahan : "-" }}
                </template> -->
                <template #item.nama_bahan="{ item }: any">
                  {{ item.nama_bahan ? item.nama_bahan : "-" }}
                </template>
                <template #item.produsen="{ item }: any">
                  {{ item.produsen ? item.produsen : "-" }}
                </template>
                <template #item.no_sertifikat_halal="{ item }: any">
                  {{
                    item.no_sertifikat_halal ? item.no_sertifikat_halal : "-"
                  }}
                </template>
              </VDataTable>
              <VCard v-else variant="outlined" class="py-2">
                <VRow>
                  <VCol cols="12" align="center">
                    <img src="~/assets/images/empty-data.png" alt="" />
                    <div class="pt-2 font-weight-bold">Data Kosong</div>
                  </VCol>
                </VRow>
              </VCard>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br />
        <VExpansionPanels
          v-model="panelProduct"
          expand-icon="fa-chevron-down"
          collapse-icon="fa-chevron-up"
        >
          <VExpansionPanel class="py-2">
            <VExpansionPanelTitle class="text-h4 font-weight-bold mb-3">
              Daftar Nama Produk
            </VExpansionPanelTitle>
            <VExpansionPanelText class="d-flex align-center">
              <VDataTable
                v-if="productItems.length"
                :headers="productHeader"
                :items="productItems"
                class="elevation-1"
                fixed-header
                :hide-default-footer="productItems.length < 10"
              >
                <template #item.no="{ index }">
                  {{ index + 1 }}
                </template>
                <template #item.photo="{ item }: any">
                  <VIcon
                    color="primary"
                    style="cursor: pointer"
                    @click="handleDownload(item.photo)"
                  >
                    ri-download-2-fill
                  </VIcon>
                </template>
              </VDataTable>
              <VCard v-else variant="outlined" class="py-2">
                <VRow>
                  <VCol cols="12" align="center">
                    <img src="~/assets/images/empty-data.png" alt="" />
                    <div class="pt-2 font-weight-bold">Data Kosong</div>
                  </VCol>
                </VRow>
              </VCard>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br />
        <VExpansionPanels
          v-model="panelProductionProcess"
          expand-icon="fa-chevron-down"
          collapse-icon="fa-chevron-up"
        >
          <VExpansionPanel class="py-2">
            <VExpansionPanelTitle class="text-h4 font-weight-bold mb-3">
              Proses Produksi
            </VExpansionPanelTitle>
            <VExpansionPanelText class="d-flex align-center">
              <VTextarea
                ref="processProduction"
                v-model="productionProcesss"
                rounded="xl"
                outlined
                readonly
              />
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
      </VCol>
      <VCol cols="4">
        <VExpansionPanels
          v-model="panelDownloadFormulir"
          expand-icon="fa-chevron-down"
          collapse-icon="fa-chevron-up"
        >
          <VExpansionPanel class="py-2">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Formulir Unduhan
            </VExpansionPanelTitle>
            <VExpansionPanelText class="d-flex align-center">
              <InfoRowV2
                class="d-flex align-center"
                name="Surat Permohonan"
                :style="{ fontWeight: '600' }"
              >
                <VBtn
                  @click="
                    downloadForms.surat_permohonan
                      ? handleDownloadForm(downloadForms.surat_permohonan)
                      : null
                  "
                  :color="
                    downloadForms.surat_permohonan ? 'primary' : '#A09BA1'
                  "
                  density="compact"
                  class="px-2"
                >
                  <template #default>
                    <VIcon icon="fa-download" />
                  </template>
                </VBtn>
              </InfoRowV2>
              <InfoRowV2
                class="d-flex align-center"
                name="Surat Pernyataan"
                :style="{ fontWeight: '600' }"
              >
                <VBtn
                  @click="
                    downloadForms.surat_pernyataan
                      ? handleDownloadForm(downloadForms.surat_pernyataan)
                      : null
                  "
                  :color="
                    downloadForms.surat_pernyataan ? 'primary' : '#A09BA1'
                  "
                  density="compact"
                  class="px-2"
                >
                  <template #default>
                    <VIcon icon="fa-download" />
                  </template>
                </VBtn>
              </InfoRowV2>
              <InfoRowV2
                class="d-flex align-center"
                name="Ikrar"
                :style="{ fontWeight: '600' }"
              >
                <VBtn
                  @click="
                    downloadForms.ikrar
                      ? handleDownload(downloadForms.ikrar)
                      : null
                  "
                  :color="downloadForms.ikrar ? 'primary' : '#A09BA1'"
                  density="compact"
                  class="px-2"
                >
                  <template #default>
                    <VIcon icon="fa-download" />
                  </template>
                </VBtn>
              </InfoRowV2>
              <InfoRowV2
                class="d-flex align-center"
                name="Hasil Verval"
                :style="{ fontWeight: '600' }"
              >
                <VBtn
                  @click="
                    downloadForms.hasil_verval
                      ? handleDownloadForm(downloadForms.hasil_verval)
                      : null
                  "
                  :color="downloadForms.hasil_verval ? 'primary' : '#A09BA1'"
                  density="compact"
                  class="px-2"
                >
                  <template #default>
                    <VIcon icon="fa-download" />
                  </template>
                </VBtn>
              </InfoRowV2>
              <InfoRowV2
                class="d-flex align-center"
                name="Rekomendasi"
                :style="{ fontWeight: '600' }"
              >
                <VBtn
                  @click="
                    downloadForms.rekomendasi
                      ? handleDownloadForm(downloadForms.rekomendasi)
                      : null
                  "
                  :color="downloadForms.rekomendasi ? 'primary' : '#A09BA1'"
                  density="compact"
                  class="px-2"
                >
                  <template #default>
                    <VIcon icon="fa-download" />
                  </template>
                </VBtn>
              </InfoRowV2>
              <InfoRowV2
                class="d-flex align-center"
                name="SJPH"
                :style="{ fontWeight: '600' }"
              >
                <VBtn
                  @click="
                    downloadForms.sjph
                      ? handleDownloadForm(downloadForms.sjph)
                      : null
                  "
                  :color="downloadForms.sjph ? 'primary' : '#A09BA1'"
                  density="compact"
                  class="px-2"
                >
                  <template #default>
                    <VIcon icon="fa-download" />
                  </template>
                </VBtn>
              </InfoRowV2>
              <InfoRowV2
                class="d-flex align-center"
                name="Laporan"
                :style="{ fontWeight: '600' }"
              >
                <VBtn
                  @click="
                    downloadForms.laporan
                      ? handleDownloadForm(downloadForms.laporan)
                      : null
                  "
                  :color="downloadForms.laporan ? 'primary' : '#A09BA1'"
                  density="compact"
                  class="px-2"
                >
                  <template #default>
                    <VIcon icon="fa-download" />
                  </template>
                </VBtn>
              </InfoRowV2>
              <InfoRowV2
                class="d-flex align-center"
                name="STTD"
                :style="{ fontWeight: '600' }"
              >
                <VBtn
                  @click="
                    downloadForms.sttd
                      ? handleDownloadForm(downloadForms.sttd)
                      : null
                  "
                  :color="downloadForms.sttd ? 'primary' : '#A09BA1'"
                  density="compact"
                  class="px-2"
                >
                  <template #default>
                    <VIcon icon="fa-download" />
                  </template>
                </VBtn>
              </InfoRowV2>
              <InfoRowV2
                class="d-flex align-center"
                name="Sertifikasi Halal"
                :style="{ fontWeight: '600' }"
              >
                <VBtn
                  @click="
                    downloadForms.sertifikasi_halal
                      ? handleDownloadForm(downloadForms.sertifikasi_halal)
                      : null
                  "
                  :color="
                    downloadForms.sertifikasi_halal ? 'primary' : '#A09BA1'
                  "
                  density="compact"
                  class="px-2"
                >
                  <template #default>
                    <VIcon icon="fa-download" />
                  </template>
                </VBtn>
              </InfoRowV2>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
        <br />
        <VExpansionPanels
          v-model="panelRegistration"
          expand-icon="fa-chevron-down"
          collapse-icon="fa-chevron-up"
        >
          <VExpansionPanel class="py-2">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Pendaftaran
            </VExpansionPanelTitle>
            <VExpansionPanelText class="d-flex align-center">
              <InfoRowV2
                class="d-flex align-center"
                name="Nomor Daftar"
                :style="{ fontWeight: '600' }"
              >
                {{
                  registrationDetail.no_daftar
                    ? registrationDetail.no_daftar
                    : "-"
                }}
              </InfoRowV2>
              <InfoRowV2
                class="d-flex align-center"
                name="Tanggal"
                :style="{ fontWeight: '600' }"
              >
                {{
                  registrationDetail.tgl_daftar
                    ? registrationDetail.tgl_daftar
                    : "-"
                }}
              </InfoRowV2>
              <InfoRowV2
                class="d-flex align-center"
                name="Tempat Pendaftaran"
                :style="{ fontWeight: '600' }"
              >
                {{
                  registrationDetail.nama_provinsi
                    ? registrationDetail.nama_provinsi
                    : "-"
                }}
              </InfoRowV2>
              <InfoRowV2
                class="d-flex align-center"
                name="Jenis Pengajuan"
                :style="{ fontWeight: '600' }"
              >
                {{
                  registrationDetail.jenis_pengajuan
                    ? registrationDetail.jenis_pengajuan
                    : "-"
                }}
              </InfoRowV2>
              <InfoRowV2
                class="d-flex align-center"
                name="Status"
                :style="{ fontWeight: '600' }"
              >
                <v-chip
                  style="background: #f0e9f1"
                  color="primary"
                  variant="outlined"
                  rounded="lg"
                >
                  {{
                    registrationDetail.status ? registrationDetail.status : "-"
                  }}
                </v-chip>
              </InfoRowV2>
              <InfoRowV2
                class="d-flex align-top"
                name="Channel Pendaftaran"
                :style="{ fontWeight: '600' }"
              >
                {{
                  registrationDetail.channel ? registrationDetail.channel : "-"
                }}
              </InfoRowV2>
              <InfoRowV2
                class="d-flex align-center"
                name="Fasilitator"
                :style="{ fontWeight: '600' }"
              >
                {{
                  registrationDetail.fasilitator_name
                    ? registrationDetail.fasilitator_name
                    : "-"
                }}
              </InfoRowV2>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br />
        <VExpansionPanels
          v-model="panelFatwaHearing"
          expand-icon="fa-chevron-down"
          collapse-icon="fa-chevron-up"
        >
          <VExpansionPanel class="py-4">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Sidang Fatwa
            </VExpansionPanelTitle>
            <VExpansionPanelText class="d-flex align-center">
              <InfoRowV2
                class="d-flex align-center"
                name="Nomor Penetapan"
                :style="{ fontWeight: '600' }"
              >
                {{
                  fatwaSessionDetail.nomor_penetapan
                    ? fatwaSessionDetail.nomor_penetapan
                    : "-"
                }}
              </InfoRowV2>
              <InfoRowV2
                class="d-flex align-center"
                name="Tanggal Penetapan"
                :style="{ fontWeight: '600' }"
              >
                {{
                  fatwaSessionDetail.tanggal_penetapan
                    ? fatwaSessionDetail.tanggal_penetapan
                    : "-"
                }}
              </InfoRowV2>
              <InfoRowV2
                class="d-flex align-center"
                name="Penetapan"
                :style="{ fontWeight: '600' }"
              >
                {{
                  fatwaSessionDetail.nomor_penetapan
                    ? fatwaSessionDetail.nomor_penetapan
                    : "-"
                }}
              </InfoRowV2>
              <InfoRowV2
                class="d-flex align-center"
                name="Dokumen"
                :style="{ fontWeight: '600' }"
              >
                {{
                  fatwaSessionDetail.dokumen ? fatwaSessionDetail.dokumen : "-"
                }}
              </InfoRowV2>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br />
        <VExpansionPanels
          v-model="panelHalalCertificate"
          expand-icon="fa-chevron-down"
          collapse-icon="fa-chevron-up"
        >
          <VExpansionPanel class="py-2">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Sertifikat Halal
            </VExpansionPanelTitle>
            <VExpansionPanelText class="d-flex align-center">
              <InfoRowV2
                class="d-flex align-center"
                name="Nomor Sertifikat"
                :style="{ fontWeight: '600' }"
              >
                {{
                  halalCertificateDetail.nomor_sertifikat
                    ? halalCertificateDetail.nomor_sertifikat
                    : "-"
                }}
              </InfoRowV2>
              <InfoRowV2
                class="d-flex align-center"
                name="Tanggal Sertifikat"
                :style="{ fontWeight: '600' }"
              >
                {{
                  halalCertificateDetail.nomor_sertifikat
                    ? halalCertificateDetail.nomor_sertifikat
                    : "-"
                }}
              </InfoRowV2>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br />
        <VExpansionPanels
          v-model="panelTracking"
          expand-icon="fa-chevron-down"
          collapse-icon="fa-chevron-up"
        >
          <VExpansionPanel class="py-2">
            <VExpansionPanelTitle class="text-h4 font-weight-bold"
              >Melacak</VExpansionPanelTitle
            >
            <VExpansionPanelText class="d-flex align-center">
              <Melacak :data="trackingDetail" />
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
      </VCol>
    </VRow>
  </VContainer>
  <ShSubmissionDetailFormModal
    dialog-title="Menghapus Data"
    :dialog-visible="isDeleteModalOpen"
    dialog-use="DELETE"
    @update:dialog-visible="isDeleteModalOpen = $event"
    @submit:commit-action="handleDeleteSubmission"
  >
    <VCardText>
      <div>Apakah yakin ingin menghapus data pengajuan ini</div>
    </VCardText>
  </ShSubmissionDetailFormModal>
  <ShSubmissionDetailFormModal
    dialog-title="Kirim Pengajuan"
    :dialog-visible="isSendModalOpen"
    dialog-use="SEND"
    @update:dialog-visible="isSendModalOpen = $event"
    @submit:commit-action="handleSentSubmission"
  >
    <VCardText>
      <div>Apakah yakin ingin mengirim pengajuan ini</div>
    </VCardText>
  </ShSubmissionDetailFormModal>
</template>

<script setup lang="ts">
import { formatCurrency } from "@/utils/conversionIntl";

const router = useRouter();
const route = useRoute<"">();
const submissionId = route.params?.id;

const snackbar = useSnackbar();

const isDeleteModalOpen = ref(false);
const isSendModalOpen = ref(false);

const panelSubmission = ref([0, 1]);
const panelPic = ref([0, 1]);
const panelAspectLegal = ref([0, 1]);
const panelFactory = ref([0, 1]);
const panelOutlet = ref([0, 1]);
const panelSupervisor = ref([0, 1]);
const panelSubstance = ref([0, 1]);
const panelProduct = ref([0, 1]);
const panelProductionProcess = ref([0, 1]);
const panelDownloadFormulir = ref([0, 1]);
const panelRegistration = ref([0, 1]);
const panelFatwaHearing = ref([0, 1]);
const panelHalalCertificate = ref([0, 1]);
const panelTracking = ref([0, 1]);

const submissionDetail = reactive({
  id_reg: "",
  tanggal_buat: "",
  no_mohon: "",
  tgl_mohon: "",
  jenis_layanan: "",
  jenis_produk: "",
  merk_dagang: "",
  area_pemasaran: "",
  pendamping: "",
  lembaga_pendamping: "",
  nama_kbli: "",
  nama_pu: "",
  alamat_pu: "",
  kota_pu: "",
  provinsi_pu: "",
  kode_pos_pu: "",
  negara_pu: "",
  telp_pu: "",
  email: "",
  jenis_badan_usaha: "",
  skala_usaha: "",
  tingkat_usaha: "",
  modal_usaha: 0,
  asal_usaha: "",
  narasi: "",
  url_sample_penyelia_sk: "",
});
const picDetail = reactive({
  nama_pj: "",
  nomor_kontak_pj: "",
  email_pj: "",
});

const kbliDropdown = ref<any>([]);
const getExistKbli = () => {
  const result = kbliDropdown.value.find((el: any) => {
    return el.uraian_usaha === submissionDetail.nama_kbli;
  });
  return result ? result.id : null;
};

const selectedKbli = ref(null);
const kbliData = computed(() => {
  return selectedKbli.value ? selectedKbli.value : getExistKbli();
});
const isEditButtonDisabled = computed(() => {
  if (selectedKbli.value) {
    return getExistKbli() == selectedKbli.value;
  } else {
    return getExistKbli() !== selectedKbli.value;
  }
});
const aspectLegalHeader = [
  { title: "No", key: "no", nowrap: true, sortable: false },
  { title: "Jenis", key: "jenis_surat", nowrap: true },
  { title: "No. Dokumen", key: "no_surat", nowrap: true },
  { title: "Tanggal", key: "tgl_surat", nowrap: true },
  { title: "Masa Berlaku", key: "masa_berlaku", nowrap: true },
  { title: "Instansi Penerbit", key: "instansi_penerbit", nowrap: true },
];
const aspectLegalItems = ref([]);

const factoryHeader = [
  { title: "No", key: "no", nowrap: true, sortable: false },
  { title: "Nama", key: "nama_pabrik", nowrap: true },
  { title: "Alamat", key: "alamat_pabrik" },
];
const factoryItems = ref([]);

const outletHeader = [
  { title: "No", key: "no", nowrap: true, sortable: false },
  { title: "Nama", key: "nama_outlet", nowrap: true },
  { title: "Alamat", key: "alamat_outlet" },
];
const outletItems = ref([]);

const supervisorHeader = [
  { title: "No", key: "no", nowrap: true, sortable: false },
  { title: "Nama", key: "penyelia_nama", nowrap: true },
  { title: "No. KTP", key: "no_ktp", nowrap: true },
  { title: "No. Kontak", key: "no_kontak", nowrap: true },
  {
    title: "No/Tgl Sertif Penyelia Halal",
    key: "no_penyelia_halal",
    nowrap: true,
  },
  { title: "No/Tgl SK", key: "no_sk", nowrap: true },
];
const supervisorItems = ref([]);

const substanceHeader = [
  { title: "No", key: "no", nowrap: true, sortable: false },
  // { title: "Jenis Bahan ", key: "jenis_bahan", nowrap: true },
  { title: "Nama Bahan", key: "nama_bahan", nowrap: true },
  { title: "Produsen", key: "produsen", nowrap: true },
  { title: "No. Sertifikat Halal", key: "no_sertifikat_halal", nowrap: true },
];
const substanceItems = ref([
  // {
  //   no: 1,
  //   type: "Bahan",
  //   name: "Air Matang",
  //   produsen: "PT ACEN ",
  //   sertificateNumber: "3123821093821093821",
  // },
]);

const productHeader = [
  { title: "No.", key: "no", nowrap: true, sortable: false },
  { title: "Nama Produk ", key: "nama_produk", nowrap: true },
  // { title: "Merk ", key: "brand", nowrap: true },
  { title: "Foto", key: "photo", sortable: false, nowrap: true },
  { title: "Jumlah Bahan Digunakan", key: "jumlah_bahan", nowrap: true },
];
const productItems = ref([
  // { no: 1, name: "Jus Mangga Rez", brand: "Rez Juice", totalUsage: "1000" },
]);

const downloadForms = reactive({
  surat_permohonan: "",
  surat_pernyataan: "",
  ikrar: "",
  hasil_verval: "",
  rekomendasi: "",
  sjph: "",
  laporan: "",
  sttd: "",
  sertifikasi_halal: "",
}) as Record<string, string>;

const isComplete = computed(() => {
  return ["", "Draf"].includes(registrationDetail.status);
});
const registrationDetail = reactive({
  no_daftar: "",
  tgl_daftar: "",
  nama_provinsi: "",
  jenis_pengajuan: "",
  status: "",
  channel: "",
  fasilitator_name: "",
});
const fatwaSessionDetail = reactive({
  nomor_penetapan: "",
  tanggal_penetapan: "",
  ketetapan: "",
  dokumen: "",
});
const halalCertificateDetail = reactive({
  nomor_sertifikat: "",
  tanggal_sertifikat: "",
});
const trackingDetail = reactive([]);

const handleUpdateKbli = async () => {
  try {
    const result: any = await $api(
      `/self-declare/submission/${submissionId}/update-kbli`,
      {
        method: "put",
        body: {
          kbli_id: selectedKbli.value,
        },
      }
    );
    if (result.code === 2000) {
      snackbar.sendSnackbar("KBLI Successfully Updated", "success");
    }
  } catch (error) {
    snackbar.sendSnackbar("Update KBLI Failed", "error");
  }
};
const handleDeleteSubmission = async () => {
  try {
    const result: any = await $api(
      `/self-declare/submission/${submissionId}/remove`,
      {
        method: "delete",
      }
    );
    if (result.code === 2000) {
      snackbar.sendSnackbar("Berhasil menghapus data", "success");
      router.push("/sh-domestic/submission/self-declare");
    }
  } catch (error) {
    snackbar.sendSnackbar("Gagal menghapus data", "error");
  }
};
const productionProcesss = ref("");
const handleGetNarration = async () => {
  try {
    const response: any = await $api(`/self-declare/business-actor/narration`, {
      method: "get",
      query: {
        id_reg: submissionId,
      },
    });
    if (response.code === 2000) {
      productionProcesss.value = response.data.narasi;
    }
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  await Promise.all([
    getSubmissionDetail(),
    getKbli(),
    getExistKbli(),
    handleGetNarration(),
    getDownloadForm("surat-permohonan", "surat_permohonan"),
    getDownloadForm("surat-pernyataan", "surat_pernyataan"),
    // getDownloadForm("ikrar", "ikrar"),
    getIkrarFile(),
    getDownloadForm("surat-verval", "surat_verval"),
    getDownloadForm("rekomendasi", "rekomendasi"),
    getDownloadForm("sjph", "sjph"),
    getDownloadForm("laporan", "laporan"),
    getDownloadForm("sttd", "sttd"),
    getDownloadForm("setifikasi-halal", "setifikasi_halal"),
  ]);
});

const getSubmissionDetail = async () => {
  try {
    const response: any = await $api(
      `/self-declare/submission/${submissionId}/detail`,
      {
        method: "get",
      }
    );

    if (response.code === 2000) {
      // data for left side
      Object.assign(submissionDetail, response.data.certificate_halal);
      Object.assign(picDetail, response.data.penanggung_jawab);
      aspectLegalItems.value = response.data.aspek_legal;
      factoryItems.value = response.data.pabrik;
      outletItems.value = response.data.outlet;
      supervisorItems.value = response.data.penyelia_halal;
      substanceItems.value = response.data.bahan;
      productItems.value = response.data.produk;

      // data for right side
      Object.assign(registrationDetail, response.data.certificate_halal);
      Object.assign(fatwaSessionDetail, response.data.sidang_fatwa);
      Object.assign(
        halalCertificateDetail,
        response.data.sertifikat_halal_info
      );
      Object.assign(trackingDetail, response.data.tracking);
    }
  } catch (error) {
    console.log(error);
    router.push("/sh-domestic/submission/self-declare");
  }
};

const getKbli = async () => {
  const response3: any = await $api("/master/list-oss", {
    method: "get",
  });
  kbliDropdown.value = response3;
};

const getIkrarFile = async () => {
  try {
    const response: any = await $api(
      `/self-declare/business-actor/statement/agree`,
      {
        method: "get",
        query: {
          id_reg: submissionId,
        },
      }
    );

    if (response.code === 2000) {
      downloadForms.ikrar = response.data.url_download;
    }
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getDownloadForm = async (docName: string, propName: string) => {
  const result: any = await $api(
    `/self-declare/submission/${submissionId}/file`,
    {
      method: "get",
      query: {
        document: docName,
      },
    }
  );
  if (result.code === 2000) {
    downloadForms[propName] = result.data.file;
  }
};

const handleDownloadForm = async (fileName: string) => {
  return await downloadDocument(fileName);
};
const handleDownload = async (productId: string) => {
  return await downloadDocument(productId);
};

const handleSentSubmission = async () => {
  try {
    const response: any = await $api(`/self-declare/submission/send`, {
      method: "post",
      body: {
        id_reg: submissionId,
      },
    });
    if (response.code === 2000) {
      snackbar.sendSnackbar("Berhasil mengirim pengajuan", "success");
    } else {
      snackbar.sendSnackbar(response.errors.list_error[0], "error");
    }
  } catch (error) {
    snackbar.sendSnackbar("Gagal mengirim pengajuan", "error");
  }
};
</script>
