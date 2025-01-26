<script setup lang="ts">
const router = useRouter();
const profileData = reactive({
  // Data -> Profil Komisi Fatwa
  id: "",
  nama_mui: "",
  jenis: "",
  alamat: "",
  kd_prov: "",
  provinsi: "",
  kd_kab: "",
  kota: "",
  kd_kec: "",
  kecamatan: "",
  wilayah_id: "",
  email: "",
  // Data -> Penanggung Jawab
  nama_pimpinan: "",
  no_hp_pimpinan: "",
  pimpinan_tte: "",
  nama_sekretaris: "",
  no_hp_sekretaris: "",
  sekretaris_tte: "",
  nama_bidang_fatwa: "",
  no_hp_bidang_fatwa: "",
  bidang_fatwa_tte: "",
  nama_kontak: "",
  no_hp_kontak: "",
  // Data -> Rekening Bank & NPWP
  rekening: {
    unik_id: "",
    bank: "",
    no_rekening: "",
    nama: "",
    filefotorek: "",
    npwp: "",
    nama_npwp: "",
    filefotonpwp: "",
    terverifikasi: 0,
    verfikasi_bpjph: 0,
  },
});

const getSubDistrict = async (kode: string) => {
  const response = await $api("/master/subdistrict", {
    method: "post",
    body: {
      district: kode,
    },
  } as any);
  profileData.kecamatan = (response as any[]).filter((item: any) => {
    return item.code === profileData.kd_kec;
  })[0]?.name;
};
const handleLoadProfile = async () => {
  try {
    const response: any = await $api("/komisi-fatwa/profile", {
      method: "get",
    } as any);
    if (response.code === 2000) {
      Object.assign(profileData, response.data);
      if (profileData.kd_kec && profileData.kd_kab) {
        getSubDistrict(profileData.kd_kab);
      }
    }
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  handleLoadProfile();
});
</script>

<template>
  <VRow align="center">
    <VCol>
      <h1 style="font-size: 32px">Detail Profil Komisi Fatwa</h1>
    </VCol>
    <VCol align="end">
      <VBtn
        color="primary"
        variant="outlined"
        text="Ubah"
        class="px-3"
        @click="router.push('/komisi-fatwa/edit-profile')"
      >
        <template #prepend>
          <VIcon icon="mdi-pencil" />
        </template>
      </VBtn>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="12">
      <VCard>
        <VCardTitle>
          <h3 class="text-h4 font-weight-bold">Profil Komisi Fatwa</h3>
        </VCardTitle>
        <VCardItem>
          <VRow>
            <VCol cols="3" class="font-weight-bold">
              <h4>Nama Lembaga</h4>
            </VCol>
            <VCol cols="9" class="d-flex">
              <span class="me-2">:</span>
              <span>{{
                profileData.nama_mui ? profileData.nama_mui : "-"
              }}</span>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="3" class="font-weight-bold">
              <h4>Jenis Lembaga</h4>
            </VCol>
            <VCol cols="9" class="d-flex">
              <span class="me-2">:</span>
              <span>{{ profileData.jenis ? profileData.jenis : "-" }}</span>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="3" class="font-weight-bold">
              <h4>Alamat</h4>
            </VCol>
            <VCol cols="9" class="d-flex">
              <span class="me-2">:</span>
              <span>{{ profileData.alamat ? profileData.alamat : "-" }}</span>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="3" class="font-weight-bold">
              <h4>Provinsi</h4>
            </VCol>
            <VCol cols="9" class="d-flex">
              <span class="me-2">:</span>
              <span>{{
                profileData.provinsi ? profileData.provinsi : "-"
              }}</span>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="3" class="font-weight-bold">
              <h4>Kota/Kab</h4>
            </VCol>
            <VCol cols="9" class="d-flex">
              <span class="me-2">:</span>
              <span>{{ profileData.kota ? profileData.kota : "-" }}</span>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="3" class="font-weight-bold">
              <h4>Kecamatan</h4>
            </VCol>
            <VCol cols="9" class="d-flex">
              <span class="me-2">:</span>
              <span>{{
                profileData.kecamatan ? profileData.kecamatan : "-"
              }}</span>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="3" class="font-weight-bold">
              <h4>Email</h4>
            </VCol>
            <VCol cols="9" class="d-flex">
              <span class="me-2">:</span>
              <span>{{ profileData.email ? profileData.email : "-" }}</span>
            </VCol>
          </VRow>
        </VCardItem>
      </VCard>
    </VCol>
    <VCol cols="12">
      <VCard>
        <VCardTitle>
          <h3 class="text-h4 font-weight-bold">Penanggung Jawab</h3>
        </VCardTitle>
        <VCardItem>
          <VRow>
            <VCol cols="6">
              <VRow>
                <VCol cols="5">
                  <h4 class="font-weight-bold">Nama Pimpinan</h4>
                </VCol>
                <VCol cols="7" class="d-flex">
                  <span class="me-2">:</span>
                  <span>{{
                    profileData.nama_pimpinan ? profileData.nama_pimpinan : "-"
                  }}</span>
                </VCol>
              </VRow>
              <VRow>
                <VCol cols="5">
                  <h4 class="font-weight-bold">No. HP</h4>
                </VCol>
                <VCol cols="7" class="d-flex">
                  <span class="me-2">:</span>
                  <span>{{
                    profileData.no_hp_pimpinan
                      ? profileData.no_hp_pimpinan
                      : "-"
                  }}</span>
                </VCol>
              </VRow>
            </VCol>
            <VCol cols="6">
              <VRow>
                <VCol cols="4" class="font-weight-bold">
                  <h4>Upload TTE</h4>
                </VCol>
                <VCol cols="8" class="d-flex">
                  <span class="me-2">:</span>
                  <div class="d-flex">
                    <VIcon
                      v-if="profileData.pimpinan_tte"
                      icon="fa-download"
                      color="primary"
                      class="me-3"
                    />
                    <span class="text-primary">
                      {{
                        profileData.pimpinan_tte
                          ? profileData.pimpinan_tte
                          : "-"
                      }}
                    </span>
                  </div>
                </VCol>
              </VRow>
            </VCol>
          </VRow>
          <VDivider class="mt-5 mb-3" />
          <VRow>
            <VCol cols="6">
              <VRow>
                <VCol cols="5">
                  <h4 class="font-weight-bold">Nama Sekretaris</h4>
                </VCol>
                <VCol cols="7" class="d-flex">
                  <span class="me-2">:</span>
                  <span>{{
                    profileData.nama_sekretaris
                      ? profileData.nama_sekretaris
                      : "-"
                  }}</span>
                </VCol>
              </VRow>
              <VRow>
                <VCol cols="5">
                  <h4 class="font-weight-bold">No. HP</h4>
                </VCol>
                <VCol cols="7" class="d-flex">
                  <span class="me-2">:</span>
                  <span>{{
                    profileData.no_hp_sekretaris
                      ? profileData.no_hp_sekretaris
                      : "-"
                  }}</span>
                </VCol>
              </VRow>
            </VCol>
            <VCol cols="6">
              <VRow>
                <VCol cols="4" class="font-weight-bold">
                  <h4>Upload TTE</h4>
                </VCol>
                <VCol cols="8" class="d-flex">
                  <span class="me-2">:</span>
                  <div class="d-flex">
                    <VIcon
                      v-if="profileData.sekretaris_tte"
                      icon="fa-download"
                      color="primary"
                      class="me-3"
                    />
                    <span class="text-primary">
                      {{
                        profileData.sekretaris_tte
                          ? profileData.sekretaris_tte
                          : "-"
                      }}
                    </span>
                  </div>
                </VCol>
              </VRow>
            </VCol>
          </VRow>
          <VDivider class="mt-5 mb-3" />
          <VRow>
            <VCol cols="6">
              <VRow>
                <VCol cols="5">
                  <h4 class="font-weight-bold">Nama Ketua Bidang Fatwa</h4>
                </VCol>
                <VCol cols="7" class="d-flex">
                  <span class="me-2">:</span>
                  <span>{{
                    profileData.nama_bidang_fatwa
                      ? profileData.nama_bidang_fatwa
                      : "-"
                  }}</span>
                </VCol>
              </VRow>
              <VRow>
                <VCol cols="5">
                  <h4 class="font-weight-bold">No. HP</h4>
                </VCol>
                <VCol cols="7" class="d-flex">
                  <span class="me-2">:</span>
                  <span>{{
                    profileData.no_hp_bidang_fatwa
                      ? profileData.no_hp_bidang_fatwa
                      : "-"
                  }}</span>
                </VCol>
              </VRow>
            </VCol>
            <VCol cols="6">
              <VRow>
                <VCol cols="4" class="font-weight-bold">
                  <h4>Upload TTE</h4>
                </VCol>
                <VCol cols="8" class="d-flex">
                  <span class="me-2">:</span>
                  <div class="d-flex">
                    <VIcon
                      v-if="profileData.bidang_fatwa_tte"
                      icon="fa-download"
                      color="primary"
                      class="me-3"
                    />
                    <span class="text-primary">
                      {{
                        profileData.bidang_fatwa_tte
                          ? profileData.bidang_fatwa_tte
                          : "-"
                      }}
                    </span>
                  </div>
                </VCol>
              </VRow>
            </VCol>
          </VRow>
          <VDivider class="mt-5 mb-3" />
          <VRow>
            <VCol cols="6">
              <VRow>
                <VCol cols="5">
                  <h4 class="font-weight-bold">Nama Kontak</h4>
                </VCol>
                <VCol cols="7" class="d-flex">
                  <span class="me-2">:</span>
                  <span>{{
                    profileData.nama_kontak ? profileData.nama_kontak : "-"
                  }}</span>
                </VCol>
              </VRow>
              <VRow>
                <VCol cols="5">
                  <h4 class="font-weight-bold">No. HP</h4>
                </VCol>
                <VCol cols="7" class="d-flex">
                  <span class="me-2">:</span>
                  <span>{{
                    profileData.no_hp_kontak ? profileData.no_hp_kontak : "-"
                  }}</span>
                </VCol>
              </VRow>
            </VCol>
          </VRow>
        </VCardItem>
      </VCard>
    </VCol>
    <VCol cols="12">
      <VCard>
        <VCardTitle>
          <h3 class="text-h4 font-weight-bold">Data Rekening Bank & NPWP</h3>
        </VCardTitle>
        <VCardItem>
          <VRow>
            <VCol cols="3" class="font-weight-bold">
              <h4>Nama Bank</h4>
            </VCol>
            <VCol cols="9" class="d-flex">
              <span class="me-2">:</span>
              <span>{{
                profileData.rekening.bank ? profileData.rekening.bank : "-"
              }}</span>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="3" class="font-weight-bold">
              <h4>No. Rekening</h4>
            </VCol>
            <VCol cols="9" class="d-flex">
              <span class="me-2">:</span>
              <span>{{
                profileData.rekening.no_rekening
                  ? profileData.rekening.no_rekening
                  : "-"
              }}</span>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="3" class="font-weight-bold">
              <h4>Atas Nama</h4>
            </VCol>
            <VCol cols="9" class="d-flex">
              <span class="me-2">:</span>
              <span>{{
                profileData.rekening.nama ? profileData.rekening.nama : "-"
              }}</span>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="3" class="font-weight-bold">
              <h4>Upload Foto Rekening</h4>
            </VCol>
            <VCol cols="9" class="d-flex">
              <span class="me-2">:</span>
              <div class="d-flex">
                <VIcon
                  v-if="profileData.rekening.filefotorek"
                  icon="fa-download"
                  color="primary"
                  class="me-3"
                />
                <span class="text-primary">
                  {{
                    profileData.rekening.filefotorek
                      ? profileData.rekening.filefotorek
                      : "-"
                  }}
                </span>
              </div>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="3" class="font-weight-bold">
              <h4>NPWP</h4>
            </VCol>
            <VCol cols="9" class="d-flex">
              <span class="me-2">:</span>
              <span>{{
                profileData.rekening.npwp ? profileData.rekening.npwp : "-"
              }}</span>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="3" class="font-weight-bold">
              <h4>Upload Foto NPWP</h4>
            </VCol>
            <VCol cols="9" class="d-flex">
              <span class="me-2">:</span>
              <div class="d-flex">
                <VIcon
                  v-if="profileData.rekening.filefotonpwp"
                  icon="fa-download"
                  color="primary"
                  class="me-3"
                />
                <span class="text-primary">
                  {{
                    profileData.rekening.filefotonpwp
                      ? profileData.rekening.filefotonpwp
                      : "-"
                  }}
                </span>
              </div>
            </VCol>
          </VRow>
        </VCardItem>
      </VCard>
    </VCol>
  </VRow>
</template>

<style scoped></style>
