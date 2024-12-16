<script setup lang="ts">
const props = defineProps({
  onSubmit: {
    type: Function,
    default: () => {},
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
  withAddButton: {
    type: Boolean,
    required: true,
  },
})

const getSelectOptions = (field: string): string => {
  let data: string[] = [];
  switch (field) {
    case "Jenis Layanan":
      data = ["Mikro", "Kecil", "Menengah", "Besar"];
      break;
    case "Skala Usaha":
      data = ["Mikro", "Kecil", "Menengah", "Besar"];
      break;
    case "Nama Fasilitas":
      data = ["Es Cream", "Minuman", "Snack", "Lainnya"];
      break;
    case "Pengujian Laboratorium":
      data = ["Ada", "Tidak Ada"];
      break;
    case "Hasil Audit":
      data = ["Lulus", "Tidak Lulus"];
      break;
    default:
      break;
  }

  return data;
};
</script>

<template>
  <VCard class="pa-4">
    <VCardTitle class="d-flex justify-space-between align-center">
      <span class="text-h5 font-weight-bold">{{ props.title }}</span>
    </VCardTitle>
    <VCardText>
      <br>
      <VRow>
        <VCol
          v-for="(item, index) in props.data"
          :key="item.title"
          :value="index"
          cols="12"
        >
          <div v-if="item.type === 'text'">
            <p class="label-pengajuan">
              {{ item.title }}
              <span v-if="item.required" class="required">*</span>
            </p>
            <VTextField v-model="item.value" class="-mt-10" />
          </div>
          <div v-if="item.type === 'select'">
            <p class="label-pengajuan">
              {{ item.title }}
              <span v-if="item.required" class="required">*</span>
            </p>
            <VSelect
              v-if="item.disabled"
              v-model="item.value"
              :items="getSelectOptions(item.title)"
              outlined
              class="-mt-10"
              disabled
              bg-color="#F6F6F6"
              :value="item.value"
            />
            <VSelect
              v-if="!item.disabled"
              v-model="item.value"
              :items="getSelectOptions(item.title)"
              outlined
              class="-mt-10"
              item-value="code"
              item-title="name"
            />
          </div>
          <VCol
            v-if="item.type === 'date'"
            class="d-flex justify-space-between align-center px-0"
            cols="12"
          >
            <!-- <p class="label-pengajuan">{{ item.title }}</p> -->
            <div
              v-for="(element, idx) in item.data"
              :key="element.title"
              :value="idx"
              cols="5"
              class="px-0 w-48"
            >
              <p class="label-pengajuan">
                {{ element.title }}
              </p>
              <VTextField
                v-model="element.value"
                disabled
                bg-color="#F6F6F6"
                class="-mt-10"
              />
            </div>
          </VCol>
          <div v-if="item.type === 'textarea'">
            <div>
              <p class="label-pengajuan">
                {{ item.title }}
                <span v-if="item.required" class="required">*</span>
              </p>
              <VTextarea v-model="item.value" class="-mt-10" />
            </div>
          </div>
        </VCol>
      </VRow>
      <br />
      <VBtn class="btn-container" variant="flat" @click="props.onSubmit">
        Simpan
      </VBtn>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.required {
  color: red;
  font-size: 12px;
}
.btn-container {
  float: inline-end !important;
}
</style>
