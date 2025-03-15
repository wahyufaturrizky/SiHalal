<script setup lang="ts">
const route = useRoute();
const id = route?.params?.id;

const snackbar = useSnackbar();

const panelPengajuan = ref([0, 1]);
const panelSertifikasi = ref([0, 1]);
const panelDaftarProduk = ref([0, 1]);
const panelBiayaPemekrisaan = ref([0, 1]);
const panelJadwalAudit = ref([0, 1]);
const panelHasilPemeriksaan = ref([0, 1]);
const panelAudit = ref([0, 1]);
const panelNomorPendaftaran = ref([0, 1]);
const panelTracking = ref([0, 1]);
const totalItemProduk = ref(0);

const detailPengajuan = ref({
  alamat: null,
  email: null,
  jenis_pendaftaran: null,
  jenis_produk: null,
  jenis_usaha: null,
  kodepos: null,
  kota: null,
  nama_pu: null,
  negara: null,
  nomor_id: id,
  provinsi: null,
  skala_usaha: null,
  status: null,
  tanggal_buat: null,
  telepon: null,
});

const typeSkalaUsaha = [
  { title: "Besar", value: "Besar" },
  { title: "UMK", value: "UMK" },
];

const detailSertifikasi = ref({
  area_pemasaran: null,
  jenis_layanan: null,
  jenis_pengajuan: null,
  jenis_produk: null,
  merek_dagang: null,
  no_permohonan: null,
  tanggal_permohonan: null,
});

const daftarProdukHeader = [
  { title: "No.", key: "no", nowrap: true },
  { title: "Layanan Produk", key: "layanan_produk", nowrap: true },
  { title: "Jenis Produk", key: "jenis_produk", nowrap: true },
  { title: "Kelas Produk", key: "kelas_produk", nowrap: true },
  { title: "Rincian Produk", key: "rincian_produk", nowrap: true },
  { title: "Nama Produk", key: "nama_produk", nowrap: true },
  { title: "Publikasi", key: "publikasi_produk", nowrap: true },
];

const daftarProdukItems = ref([]);

const biayaPemeriksaanHeader = [
  { title: "No.", key: "no", nowrap: true },
  { title: "Keterangan Biaya", key: "keterangan", nowrap: true },
  { title: "Jumlah", key: "qty", nowrap: true },
  { title: "Harga", key: "harga", nowrap: true },
  { title: "Sub Total", key: "total", nowrap: true },
];

const biayaPemeriksaanItems = ref([]);

const jadwalAudit = ref({
  tanggal_mulai: null,
  tanggal_selesai: null,
});

const auditHeader = [
  { title: "No.", key: "no", nowrap: true },
  { title: "Nama", key: "nama", nowrap: true },
  { title: "Tanggal Lahir", key: "tanggal_lahir", nowrap: true },
  { title: "JK", key: "jk", nowrap: true },
  { title: "No. Pendaftaran", key: "no_reg", nowrap: true },
];

const auditItems = ref([]);

const hasilPemeriksaan = ref({
  dokumen: null,
  hasil: null,
  tanggal_selesai: null,
});

const nomorPendaftaran = ref({
  no_daftar: null,
  provinsi: null,
  tanggal_daftar: null,
});

const totalBiaya = ref(null);

const tracking = ref([]);

const updateSkalaUsaha = () => {
  snackbar.sendSnackbar("KBLI Successfully Updated", "success");
};

const navigateTo = (url: string) => {
  window.location.href = url;
};

// API METHOD
const loadDetailPengajuan = async (): void => {
  try {
    const response = await $api(`/reguler/auditor/${id}/pengajuan`, {
      method: "GET",
    });

    if (response.code === 2000) {
      const data = response.data;

      detailPengajuan.value = {
        alamat: data?.alamat,
        email: data?.email,
        jenis_pendaftaran: data?.jenis_pendaftaran,
        jenis_produk: data?.jenis_produk,
        jenis_usaha: data?.jenis_usaha,
        kodepos: data?.kodepos,
        kota: data?.kota,
        nama_pu: data?.nama_pu,
        negara: data?.negara,
        nomor_id: data?.nomor_id,
        provinsi: data?.provinsi,
        skala_usaha: data?.skala_usaha,
        status: data?.status,
        tanggal_buat: data?.tanggal_buat,
        telepon: data?.telepon,
      };
    }
  } catch (e) {
    snackbar.sendSnackbar("Terjadi Kesalahan ", "error");
  }
};

const loadDetailSertifikasi = async (): void => {
  try {
    const response = await $api(`/reguler/auditor/${id}/sertifikasi`, {
      method: "GET",
    });

    if (response.code === 2000) {
      const data = response.data;

      detailSertifikasi.value = {
        area_pemasaran: data.area_pemasaran,
        jenis_layanan: data.jenis_layanan,
        jenis_pengajuan: data.jenis_pengajuan,
        jenis_produk: data.jenis_produk,
        merek_dagang: data.merek_dagang,
        no_permohonan: data.no_permohonan,
        tanggal_permohonan: data.tanggal_permohonan,
      };
    }
  } catch (e) {
    snackbar.sendSnackbar("Terjadi Kesalahan ", "error");
  }
};

const loadDaftarProduk = async (): void => {
  try {
    const response = await $api(`/reguler/auditor/${id}/produk`, {
      method: "GET",
    });

    if (response.code === 2000) {
      daftarProdukItems.value = response.data;
      totalItemProduk.value = response.total_item;
    }
  } catch (e) {
    snackbar.sendSnackbar("Terjadi Kesalahan ", "error");
  }
};

const loadPemeriksaanProduk = async (): void => {
  try {
    const response = await $api(`/reguler/auditor/${id}/pemeriksaanproduk`, {
      method: "GET",
    });

    if (response.code === 2000) {
      const data = response.data;
      biayaPemeriksaanItems.value = data.biaya;
      totalBiaya.value = data.total_biaya;
      jadwalAudit.value = data.jadwal_audit;
      auditItems.value = data.auditor;
      hasilPemeriksaan.value = {
        dokumen: data.hasil_pemeriksaan?.dokumen,
        hasil: data.hasil_pemeriksaan?.hasil,
        tanggal_selesai: data.hasil_pemeriksaan?.tanggal_selesai,
      };
      nomorPendaftaran.value = {
        no_daftar: data.no_pendaftaran?.no_daftar,
        provinsi: data.no_pendaftaran?.provinsi,
        tanggal_daftar: data.no_pendaftaran?.tanggal_daftar,
      };

      tracking.value = data.tracking.map((i) => ({
        status: i.comment,
        created_at: i.date,
        username: i.username,
      }));
    }
  } catch (e) {
    snackbar.sendSnackbar("Terjadi Kesalahan ", "error");
  }
};

const send = async () => {
  const body = {
    id_reg: id,
    status: "OF70",
  };

  try {
    const response: any = await $api(`/reguler/auditor/send`, {
      method: "post",
      body: body,
    });

    if (response?.code === 2000) {
      useSnackbar().sendSnackbar("Sukses send", "success");
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

onMounted(async () => {
  await Promise.all([
    loadDetailPengajuan(),
    loadDetailSertifikasi(),
    loadDaftarProduk(),
    loadPemeriksaanProduk(),
  ]);
});
</script>

<template>
  <VContainer>
    <VRow>
      <KembaliButton />
    </VRow>
    <VRow class="d-flex justify-space-between align-center">
      <VCol class="">
        <h3 class="text-h3">Detail Audit Produk</h3>
      </VCol>
      <VCol cols="8">
        <VRow class="d-flex justify-end align-center ga-2">
          <VBtn
            variant="outlined"
            append-icon="ri-edit-line"
            @click="navigateTo(`/auditor-halal/layanan/${id}`)"
          >
            Ubah Data
          </VBtn>
          <VBtn
            variant="outlined"
            append-icon="ri-edit-line"
            @click="navigateTo(`/audit-pengajuan/ubah-laporan/${id}`)"
          >
            Ubah Laporan
          </VBtn>
          <VBtn append-icon="fa-paper-plane" @click="send"> Kirim </VBtn>
        </VRow>
      </VCol>
    </VRow>

    <VRow class="d-flex justify-space-between">
      <VCol cols="8">
        <VExpansionPanels v-model="panelPengajuan">
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Data Pengajuan
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="No.ID"
              >
                {{ detailPengajuan.nomor_id }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Status"
              >
                {{ detailPengajuan.status }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Tanggal Buat"
              >
                {{ detailPengajuan.tanggal_buat }}
              </InfoRow>
              <ThinLine :thickness="1" />
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Nama Perusahaan"
              >
                {{ detailPengajuan.nama_pu }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Alamat"
              >
                {{ detailPengajuan.alamat }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Kota/Kab"
              >
                {{ detailPengajuan.kota }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Provinsi"
              >
                {{ detailPengajuan.provinsi }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Kode Pos"
              >
                {{ detailPengajuan.kodepos }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Negara"
              >
                {{ detailPengajuan.negara }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Telepon"
              >
                {{ detailPengajuan.telepon }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Email"
              >
                {{ detailPengajuan.email }}
              </InfoRow>
              <ThinLine :thickness="1" />
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Jenis Badan Usaha"
              >
                {{ detailPengajuan.jenis_usaha }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Skala Usaha"
                class="d-flex align-center"
              >
                {{ detailPengajuan.skala_usaha }}
              </InfoRow>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br />
        <VExpansionPanels v-model="panelSertifikasi">
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Pengajuan Sertifikasi
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="No / Tanggal Permohonan"
              >
                {{ detailSertifikasi.no_permohonan }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Jenis Layanan"
              >
                {{ detailSertifikasi.no_permohonan }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Jenis Pengajuan"
              >
                {{ detailSertifikasi.jenis_pengajuan }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Jenis Produk"
              >
                {{ detailSertifikasi.jenis_produk }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Merek Dagang"
              >
                {{ detailSertifikasi.merek_dagang }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Area Pemasaran"
              >
                {{ detailSertifikasi.area_pemasaran }}
              </InfoRow>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br />
        <VExpansionPanels v-model="panelDaftarProduk">
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Daftar Nama Produk
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <VDataTable
                :items-length="totalItemProduk"
                :headers="daftarProdukHeader"
                :items="daftarProdukItems"
                :items-per-page-options="[10, 25]"
              >
                <template #item.productType="{ item }">
                  <div class="mw-170">
                    {{ item.productType }}
                  </div>
                </template>
                <template #item.productName="{ item }">
                  <div class="mw-170">
                    {{ item.productName }}
                  </div>
                </template>
                <template #item.publication="{ item }">
                  <VCheckbox true-value="true" />
                </template>
                <template #[`item.no`]="{ index }">
                  <span>{{ index + 1 }}</span>
                </template>
              </VDataTable>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br />
        <VExpansionPanels v-model="panelBiayaPemekrisaan">
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Biaya Pemeriksaan
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <VDataTable
                :headers="biayaPemeriksaanHeader"
                :items="biayaPemeriksaanItems"
              >
                <template #[`item.no`]="{ index }">
                  <span>{{ index + 1 }}</span>
                </template>
              </VDataTable>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br />
        <VExpansionPanels v-model="panelJadwalAudit">
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Jadwal Audit
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Tanggal Mulai"
              >
                {{ jadwalAudit.tanggal_mulai }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Tanggal Selesai"
              >
                {{ jadwalAudit.tanggal_selesai }}
              </InfoRow>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br />
        <VExpansionPanels v-model="panelAudit">
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Auditor
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <VDataTable :headers="auditHeader" :items="auditItems">
                <template #[`item.no`]="{ index }">
                  <span>{{ index + 1 }}</span>
                </template>
              </VDataTable>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
        <br />
        <VExpansionPanels v-model="panelHasilPemeriksaan">
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Hasil Pemeriksaan
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Tanggal Selesai LPH"
              >
                {{ hasilPemeriksaan.tanggal_selesai }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Hasil"
              >
                {{ hasilPemeriksaan.hasil }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Dokumen"
              >
                {{ hasilPemeriksaan.dokumen }}
              </InfoRow>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
      </VCol>
      <VCol cols="4" class="">
        <VExpansionPanels v-model="panelNomorPendaftaran">
          <VExpansionPanel class="pa-5">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              No. Pendaftaran
            </VExpansionPanelTitle>
            <VExpansionPanelText class="d-flex align-center">
              <p class="font-weight-bold text-black">
                {{ nomorPendaftaran.no_daftar }}
              </p>
              <p class="font-weight-bold text-black">
                {{ nomorPendaftaran.tanggal_daftar }}
              </p>
              <p class="font-weight-bold text-black">
                {{ nomorPendaftaran.provinsi }}
              </p>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
        <br />
        <VExpansionPanels v-model="panelNomorPendaftaran">
          <VExpansionPanel class="pa-5">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Biaya Pemeriksaan
            </VExpansionPanelTitle>
            <VExpansionPanelText class="d-flex align-center">
              <p class="font-weight-bold text-black">Rp {{ totalBiaya }}</p>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
        <br />

        <br />
        <VExpansionPanels v-model="panelTracking">
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4">
              Melacak
            </VExpansionPanelTitle>
            <VExpansionPanelText class="d-flex align-center">
              <HalalTimeLine :event="tracking" />
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
      </VCol>
    </VRow>
  </VContainer>
</template>

<style lang="scss" scoped>
.mw-170 {
  max-width: 170px;
  overflow: hidden;
  white-space: nowrap;
  text-wrap: wrap;
}
</style>
