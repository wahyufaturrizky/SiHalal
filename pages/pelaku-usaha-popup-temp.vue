<script setup lang="ts">
import DataDivisiModal from '@/views/pages/pelaku-usaha/DataDivisiModal.vue'
import DataOuletModal from '@/views/pages/pelaku-usaha/DataOuletModal.vue'
import DataOutletUploadModal from '@/views/pages/pelaku-usaha/DataOutletUploadModal.vue'
import DataPabrikModal from '@/views/pages/pelaku-usaha/DataPabrikModal.vue'
import DataPenyeliaHalalModal from '@/views/pages/pelaku-usaha/DataPenyeliaHalalModal.vue'
import DeleteConfirmation from '@/views/pages/pelaku-usaha/DeleteConfirmation.vue'
import AspekLegalModal from '@/views/pages/pelaku-usaha/AspekLegalModal.vue'
import ListDataDivisionModal from '@/views/pages/pelaku-usaha/ListDataDivisionModal.vue'
import SaveConfirmation from '@/views/pages/pelaku-usaha/SaveConfirmation.vue'
import UpdateConfirmation from '@/views/pages/pelaku-usaha/UpdateConfirmation.vue'

const handleAddAspekLegalConfirm = formData => {
  console.log('Add confirmed:', formData)
}

const handleEditAspekLegalConfirm = formData => {
  console.log('Edit confirmed:', formData)
}

const initialDataAspekLegal = {
  jenisDocument: 'SIUP',
  nomorDocument: '123456',
  tanggalDocument: '2024-11-01',
  masaBerlaku: '2025-11-01',
  instansiPenerbit: 'Instansi XYZ',
}

const initialDataPeyeliaHalal = {
  noKtp: '1234567890',
  noKontak: '081234567890',
  namaPenyelia: 'John Doe',
  agamaPenyelia: 'Islam',
  nomorSertifikat: 'Sert123',
  tanggalSertifikat: '2023-01-01',
  nomorSk: 'SK123',
  tanggalSk: '2023-02-01',
  sertifikatKompetensi: null,
  sertifikatPelatihan: null,
  ktpFile: null,
}

const dataDivisi = ref([
  { index: 1, divisiUnitUsaha: 'Divisi A', alamatPabrik: 'Alamat A', username: 'userA' },
  { index: 2, divisiUnitUsaha: 'Divisi B', alamatPabrik: 'Alamat B', username: 'userB' },
])
</script>

<template>
  <SaveConfirmation />
  <DeleteConfirmation />
  <UpdateConfirmation />

  <h4>ASPEK DATA LEGAL </h4>
  <AspekLegalModal
    mode="add"
    @confirm-add="handleAddAspekLegalConfirm"
    @cancel="() => console.log('Add cancelled')"
  />
  <AspekLegalModal
    mode="edit"
    :initial-data="initialDataAspekLegal"
    @confirm-edit="handleEditAspekLegalConfirm"
    @cancel="() => console.log('Edit cancelled')"
  />

  <h4>DATA PABRIK</h4>
  <DataPabrikModal
    mode="add"
    @confirm-add="handleAddAspekLegalConfirm"
    @cancel="() => console.log('Add cancelled')"
  />
  <DataPabrikModal
    mode="edit"
    :initial-data="initialDataForEdit"
    @confirm-edit="handleEditConfirm"
    @cancel="() => console.log('Edit cancelled')"
  />

  <h4>DATA OULET</h4>
  <DataOuletModal
    mode="add"
    @confirm-add="handleAddAspekLegalConfirm"
    @cancel="() => console.log('Add cancelled')"
  />
  <DataOuletModal
    mode="edit"
    :initial-data="initialDataForEdit"
    @confirm-edit="handleEditConfirm"
    @cancel="() => console.log('Edit cancelled')"
  />

  <DataOutletUploadModal
    mode="edit"
    :initial-data="initialDataForEdit"
    @confirm-edit="handleEditConfirm"
    @cancel="() => console.log('Edit cancelled')"
  />

  <h4>DATA PENYELIA HALAL</h4>
  <DataPenyeliaHalalModal
    mode="add"
    @confirm-add="handleAddAspekLegalConfirm"
    @cancel="() => console.log('Add cancelled')"
  />
  <DataPenyeliaHalalModal
    mode="edit"
    :initial-data="initialDataPeyeliaHalal"
    @confirm="handleAddAspekLegalConfirm"
    @cancel="() => console.log('Add cancelled')"
  />

  <h4>DATA DIVISI / UNIT USAHA</h4>
  <DataDivisiModal
    mode="add"
    @confirm-add="handleAddAspekLegalConfirm"
    @cancel="() => console.log('Add cancelled')"
  />
  <DataDivisiModal
    mode="edit"
    :initial-data="initialDataPeyeliaHalal"
    @confirm="handleAddAspekLegalConfirm"
    @cancel="() => console.log('Add cancelled')"
  />

  <h4>LIS DATA DIVISION</h4>
  <ListDataDivisionModal
    mode="add"
    :initial-data="selectedData"
    @confirm="handleAddAspekLegalConfirm"
    @cancel="handleCancel"
  />
</template>

<style scoped lang="scss">

</style>
