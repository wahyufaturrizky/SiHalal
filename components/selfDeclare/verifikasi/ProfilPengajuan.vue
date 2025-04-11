<script lang="ts" setup>
interface SertifikasiHalal {
  alamat_pu: string;
  area_pemasaran: string;
  asal_usaha: string;
  email: string;
  id_reg: string;
  jenis_layanan: string;
  jenis_produk: string;
  jenis_usaha: string;
  kode_pos_pu: string;
  kota_pu: string;
  merek_dagang: string;
  modal_usaha: number;
  nama_kbli: string;
  nama_pu: string;
  "nama_pu_sh ": string;
  negara_pu: string;
  no_mohon: string;
  no_telp: string;
  prov_pu: string;
  skala_usaha: string;
  tanggal: string;
  tgl_daftar: string;
  tingkat_usaha: string;
}
const props = defineProps<{ data: SertifikasiHalal }>();
const dataHalal = ref(props.data);

watchEffect(() => {
  dataHalal.value = props.data;
});
</script>

<template>
  <div class="mx-auto" max-width="800">
    <VRow>
      <VCol cols="12">
        <VList>
          <!-- Personal Information -->
          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium">
                Nomor ID
              </VListItemTitle>
            </template>
            <VListItemSubtitle> : {{ dataHalal.id_reg }} </VListItemSubtitle>
          </VListItem>

          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium">
                Tanggal
              </VListItemTitle>
            </template>
            <VListItemSubtitle
              >: {{ formatDateId(dataHalal.tanggal) }}</VListItemSubtitle
            >
          </VListItem>

          <!-- Address Information -->
          <VDivider class="my-2" />
          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium">
                No. Permohonan
              </VListItemTitle>
            </template>
            <VListItemSubtitle>: {{ dataHalal.no_mohon }}</VListItemSubtitle>
          </VListItem>

          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium">
                Tanggal Permohonan
              </VListItemTitle>
            </template>
            <VListItemSubtitle>: {{ dataHalal.tgl_daftar }}</VListItemSubtitle>
          </VListItem>

          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium">
                Jenis Layanan
              </VListItemTitle>
            </template>
            <VListItemSubtitle>
              : {{ dataHalal.jenis_layanan }}
            </VListItemSubtitle>
          </VListItem>

          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium">
                Jenis Produk
              </VListItemTitle>
            </template>
            <VListItemSubtitle>
              : {{ dataHalal.jenis_produk }}
            </VListItemSubtitle>
          </VListItem>

          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium">
                Merek Dagang
              </VListItemTitle>
            </template>
            <VListItemSubtitle
              >: {{ dataHalal.merek_dagang }}</VListItemSubtitle
            >
          </VListItem>

          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium">
                Area Pemasaran
              </VListItemTitle>
            </template>
            <VListItemSubtitle
              >: {{ dataHalal.area_pemasaran }}</VListItemSubtitle
            >
          </VListItem>
          <!-- Company Information -->
          <VDivider class="my-2" />
          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium">
                Nama Perusahaan
              </VListItemTitle>
            </template>
            <VListItemSubtitle>: {{ dataHalal.nama_pu }}</VListItemSubtitle>
          </VListItem>

          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium">
                Nama Perusahaan tertera di SH
              </VListItemTitle>
            </template>
            <VListItemSubtitle> : {{ dataHalal.nama_pu }} </VListItemSubtitle>
          </VListItem>

          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium">
                Nama KBLI
              </VListItemTitle>
            </template>
            <VListItemSubtitle>:{{ dataHalal.nama_kbli }}</VListItemSubtitle>
          </VListItem>

          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium">
                Alamat
              </VListItemTitle>
            </template>
            <VListItemSubtitle>: {{ dataHalal.alamat_pu }}</VListItemSubtitle>
          </VListItem>

          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium">
                Kota/Kab
              </VListItemTitle>
            </template>
            <VListItemSubtitle>: {{ dataHalal.kota_pu }}</VListItemSubtitle>
          </VListItem>

          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium">
                Provinsi
              </VListItemTitle>
            </template>
            <VListItemSubtitle> : {{ dataHalal.prov_pu }} </VListItemSubtitle>
          </VListItem>

          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium">
                Kode Pos
              </VListItemTitle>
            </template>
            <VListItemSubtitle>
              : {{ dataHalal.kode_pos_pu }}
            </VListItemSubtitle>
          </VListItem>

          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium">
                Negara
              </VListItemTitle>
            </template>
            <VListItemSubtitle> : {{ dataHalal.negara_pu }} </VListItemSubtitle>
          </VListItem>

          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium">
                Telepon
              </VListItemTitle>
            </template>
            <VListItemSubtitle> : {{ dataHalal.no_telp }} </VListItemSubtitle>
          </VListItem>

          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium">
                Email
              </VListItemTitle>
            </template>
            <VListItemSubtitle> : {{ dataHalal.email }} </VListItemSubtitle>
          </VListItem>

          <!-- Certification Information -->
          <VDivider class="my-2" />
          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium">
                Jenis Badan Usaha
              </VListItemTitle>
            </template>
            <VListItemSubtitle>
              : {{ dataHalal.jenis_usaha }}
            </VListItemSubtitle>
          </VListItem>

          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium">
                Skala Usaha
              </VListItemTitle>
            </template>
            <VListItemSubtitle>
              : {{ dataHalal.skala_usaha }}
            </VListItemSubtitle>
          </VListItem>

          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium">
                Modal Dasar
              </VListItemTitle>
            </template>
            <VListItemSubtitle>: {{ dataHalal.modal_usaha }}</VListItemSubtitle>
          </VListItem>
        </VList>
      </VCol>
    </VRow>
  </div>
</template>

<style scoped>
.v-list-item-subtitle {
  white-space: nowrap; /* Prevents breaking into multiple lines */
}

.v-list-item-title {
  min-inline-size: 300px;
}
</style>
