<script setup lang="ts">
import { modalTypeEnum } from "../verval-enum";

const props = defineProps({
  modalType: {
    type: String,
    required: true,
  },
});

const notesPengembalian = ref();
const route = useRoute();

const isActive = ref(false);

const emit = defineEmits(["verval-return", "verval-submit"]);

const vervalReturn = async () => {
  emit("verval-return", notesPengembalian.value);
  isActive.value = false;
};

const vervalSend = async () => {
  emit("verval-submit");
  isActive.value = false;
};
</script>
<template>
  <VDialog max-width="50svw" v-model="isActive">
    <template #activator="{ props: openModal }">
      <VBtn
        v-if="modalType === modalTypeEnum.KEMBALI"
        v-bind="openModal"
        variant="outlined"
        style="margin-right: 1svw"
        append-icon="fa-undo"
        >Pengembalian</VBtn
      >
      <VBtn
        v-if="modalType === modalTypeEnum.KIRIM"
        v-bind="openModal"
        variant="flat"
        append-icon="fa-paper-plane"
        >Kirim</VBtn
      >
    </template>
    <template #default="{ isActive }">
      <VCard>
        <VCardTitle>
          <VRow>
            <VCol cols="6">
              <h3 v-if="modalType === modalTypeEnum.KEMBALI">
                Konfirmasi Pengembalian
              </h3>
              <h3 v-if="modalType === modalTypeEnum.KIRIM">Kirim Pengajuan</h3>
            </VCol>
            <VCol cols="6" style="display: flex; justify-content: end"
              ><VIcon
                size="small"
                icon="fa-times"
                @click="isActive.value = false"
              ></VIcon
            ></VCol>
          </VRow>
        </VCardTitle>
        <VCardItem>
          <VItemGroup v-if="modalType === modalTypeEnum.KEMBALI">
            <p>
              Apakah kamu yakin ingin melakukan pengembalian pada transaksi ini?
            </p>
            <VTextarea
              placeholder="Isi Catatan Pengembalian (Opsional)"
              v-model="notesPengembalian"
            ></VTextarea>
          </VItemGroup>
          <VItemGroup v-if="modalType === modalTypeEnum.KIRIM">
            <p>Yakin ingin mengirim pengajuan fasilitasi?</p>
          </VItemGroup>
        </VCardItem>
        <VCardActions
          style="display: flex; justify-content: end; padding: 1.5svw"
        >
          <div>
            <VBtn @click="isActive.value = false" variant="outlined"
              >Batal</VBtn
            >
            <VBtn
              @click="vervalSend"
              variant="flat"
              v-if="modalType === modalTypeEnum.KIRIM"
              >Kirim</VBtn
            >
            <VBtn
              variant="flat"
              @click="vervalReturn"
              v-if="modalType === modalTypeEnum.KEMBALI"
              >Kembalikan</VBtn
            >
          </div>
        </VCardActions>
      </VCard>
    </template>
  </VDialog>
</template>
