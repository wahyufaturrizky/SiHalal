<script setup lang="ts">
import { ref } from "vue";

const form = ref();
const formStatus = ref(false);
const typedProcess = ref("");
const processRules = ref([(v: string) => !!v || "Proses produksi harus diisi"]);
const processArray = ref<Array<string>>([]);
const prosesProduction = ref("");

const { isVerificator, hideChipStatus } = defineProps({
  isVerificator: {
    type: Boolean,
    default: false,
  },
  hideChipStatus: {
    type: Boolean,
  },
  canNotEdit: {
    type: Boolean,
  },
});
const verified = ref(false);

const snackbar = useSnackbar();

const route = useRoute<"">();
const submissionId = route.params?.id;

const { refresh } = await useAsyncData("get-narration", async () => {
  try {
    const endpointBusActor = `/self-declare/business-actor/narration`;
    const endpointVerificator = `/self-declare/verificator/narration`;
    const finalUri = isVerificator ? endpointVerificator : endpointBusActor;
    const response: any = await $api(finalUri, {
      method: "get",
      query: {
        id_reg: submissionId,
      },
    });
    if (response.code === 2000) {
      if (isVerificator) {
        prosesProduction.value = response.data?.narasi_pph;
        if (response.data.narasi_pph != "") {
          Object.assign(
            processArray.value,
            response.data.narasi_pph.split("\n")
          );
        }
      } else {
        prosesProduction.value = response.data.narasi;
        if (response.data.narasi.length > 0) {
          Object.assign(processArray.value, response.data.narasi.split("\n"));
        }
      }
      verified.value = response.data.verified == "unverified" ? false : true;
    }
  } catch (error) {
    console.log(error);
  }
});
const handleAddSave = async () => {
  // console.log("PROSES PRODUCTION ", prosesProduction.value)
  try {
    const response: any = await $api(
      `/self-declare/business-actor/narration/update`,
      {
        method: "put",
        body: {
          id_reg: submissionId,
          narasi: prosesProduction.value,
        },
      }
    );

    if (response.code === 2000) {
      snackbar.sendSnackbar("Berhasil Mengubah Data ", "success");
      refresh();
    }
  } catch (error) {
    snackbar.sendSnackbar("Gagal Mengubah Data ", "success");
  }
};

const handleAddProcess = () => {
  if (!typedProcess.value.length) return;

  processArray.value.push(typedProcess.value);
  typedProcess.value = "";

  if (processArray.value.length > 1) {
    const lastIndex = processArray.value.length - 1;
    prosesProduction.value +=
      `\n${lastIndex + 1}.` + `${processArray.value[lastIndex]}`;
  } else {
    prosesProduction.value = `1. ${processArray.value[0]}`;
  }
};

const statusItem: any = new Proxy(
  {
    OF1: { color: "grey-300", desc: "Draft" },
    OF10: { color: "success", desc: "Submitted" },
    OF15: { color: "success", desc: "Verified" },
    OF2: { color: "error", desc: "Returned" },
    OF290: { color: "error", desc: "Rejected" },
    OF5: { color: "success", desc: "Invoice issued" },
    OF320: { color: "success", desc: "Code Issued" },
    OF11: { color: "success", desc: "Verification" },
    OF50: { color: "success", desc: "Dikirim ke LPH" },
    OF300: { color: "success", desc: "Halal Certified Issued" },
    OF285: { color: "success", desc: "Dikembalikan Oleh Fatwa" },
    OF74: { color: "success", desc: "Sent to Komite Fatwa" },
    OF280: { color: "success", desc: "Dikembalikan Ke PU" },
    OF100: { color: "success", desc: "Selesai Sidang Fatwa" },
    OF120: { color: "success", desc: "Certificate Issued" },
    OF900: { color: "error", desc: "Dibatalkan" },
  },
  {
    get(target: any, prop: any) {
      return prop in target ? target[prop] : defaultStatus;
    },
  }
);
</script>

<template>
  <VCard>
    <VCardTitle class="pa-4 d-flex justify-space-between align-center">
      <!-- <template #[`item.status`]="{ item, index }">
        <div class="d-flex">
          <VChip
            :key="index"
            :color="statusItem[(item as any).status_code].color"
            class="ma-1"
          >
            {{ statusItem[(item as any).status_code].desc }}
          </VChip>
        </div>
      </template> -->

      <h4 class="text-h4">Proses Produksi Halal</h4>
      <div class="d-flex align-center gap-4">
        <template>
          <!-- ... -->
          <VChip
            v-if="!hideChipStatus"
            :color="verified ? 'success' : 'error'"
            class="ma-1"
          >
            {{ verified ? "Sudah Verifikasi" : "Belum Verifikasi" }}
          </VChip>
          <!-- ... -->
        </template>
        <VBtn
          v-if="!isVerificator && !verified && !canNotEdit"
          @click="handleAddSave"
          color="primary"
          variant="elevated"
        >
          Simpan Perubahan
        </VBtn>
      </div>
    </VCardTitle>
    <VCardItem>
      <VForm ref="form" v-model="formStatus" @submit.prevent="handleAddProcess">
        <VRow class="d-flex justify-space-between align-center">
          <VCol cols="6" class="text-h6">Ketik Proses</VCol>
          <VCol
            v-if="!canNotEdit"
            cols="6"
            class="d-flex justify-space-between align-center ga-4"
          >
            <VTextField
              :disabled="isVerificator"
              v-model="typedProcess"
              :rules="processRules"
              placeholder="Isi Ketik Proses"
              density="compact"
              outlined
              class="mr-3"
              :hide-details="false"
              autofocus
            >
              <template #append>
                <VBtn
                  :disabled="isVerificator"
                  dense
                  outlined
                  @click="handleAddProcess"
                >
                  Tambah
                </VBtn>
              </template>
            </VTextField>
          </VCol>
        </VRow>
      </VForm>
    </VCardItem>
    <br />
    <VCardText>
      <p>Proses Produksi</p>
      <VTextarea
        v-model="prosesProduction"
        placeholder="Masukkan proses produksi"
        outlined
        dense
      />
    </VCardText>
  </VCard>
</template>

<style scoped lang="scss"></style>
