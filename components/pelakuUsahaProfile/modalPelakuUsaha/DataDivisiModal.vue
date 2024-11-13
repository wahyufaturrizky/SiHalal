<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useDisplay } from "vuetify"

const props = defineProps({
  mode: { type: String, default: 'add' },
  initialData: { type: Object, default: () => ({}) },
})

const emit = defineEmits(['confirm', 'cancel'])

const isVisible = ref(false)

const form = ref({
  divisiUnitUsaha: '',
  username: '',
  alamatPabrik: '',
})

const openDialog = () => {
  isVisible.value = true
}

const closeDialog = () => {
  isVisible.value = false
}

const confirm = () => {
  emit('confirm', form.value)
}

const cancel = () => {
  emit('cancel')
  closeDialog()
}

watch(
  () => props.initialData,
  newData => {
    if (props.mode === 'edit' && newData)
      form.value = { ...newData }
  },
  { immediate: true },
)

const { mdAndUp } = useDisplay()
const dialogMaxWidth = computed(() => {
  return mdAndUp.value ? 700 : '90%'
})

</script>

<template>
  <div class="ma-1">
    <VBtn v-if="props.mode === 'add'" @click="openDialog" variant="outlined" append-icon="ri-add-line">
      Tambah
    </VBtn>
    <VBtn v-else-if="props.mode === 'edit'" @click="openDialog" variant="outlined" prepend-icon="ri-edit-line">
      Edit
    </VBtn>
    <VDialog
      v-model="isVisible"
      :max-width="dialogMaxWidth"
    >
      <VCard class="pa-2">
        <VCardTitle class="text-h5 font-weight-bold d-flex justify-space-between align-center">
          <span>{{ props.mode === 'add' ? 'Tambah Data Divisi / Unit Usaha' : 'Edit Data Divisi / Unit Usaha' }}</span>
          <VBtn
            icon
            color="transparent"
            style="border: none;"
            elevation="0"
            @click="closeDialog"
          >
            <VIcon color="black">
              ri-close-line
            </VIcon>
          </VBtn>
        </VCardTitle>

        <VCardText>
          <div class="mb-3">
            <label
              for="divisiUnitUsaha"
              class="d-block"
            >Divisi / Unit Usaha</label>
            <VTextField
              id="divisiUnitUsaha"
              v-model="form.divisiUnitUsaha"
              outlined
              dense
              required
            />
          </div>
          <div class="mb-3">
            <label
              for="username"
              class="d-block"
            >Username</label>
            <VTextField
              id="username"
              v-model="form.username"
              outlined
              dense
              required
            />
          </div>
          <div class="mb-3">
            <label
              for="alamatPabrik"
              class="d-block"
            >Alamat Pabrik</label>
            <VTextField
              id="alamatPabrik"
              v-model="form.alamatPabrik"
              outlined
              dense
              required
            />
          </div>
        </VCardText>
        <div class="d-flex justify-end gap-2">
          <VBtn
            variant="outlined"
            @click="cancel"
          >
            Batal
          </VBtn>
          <VBtn
            color="primary"
            @click="confirm"
          >
            {{ props.mode === 'add' ? 'Tambah' : 'Simpan' }}
          </VBtn>
        </div>
      </VCard>
    </VDialog>
  </div>
</template>

<style scoped>

</style>
