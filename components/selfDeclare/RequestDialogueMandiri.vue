<script setup lang="ts">
import { defineEmits, defineProps, ref, watch } from "vue";
import { useDisplay } from "vuetify";

const props = defineProps({
  dialogVisible: {
    type: Boolean,
    required: true,
  },
  submit: {
    type: Function,
    required: true,
  },
});

const emit = defineEmits(["update:dialogVisible"]);

const localDialogVisible = ref(props.dialogVisible);

watch(
  () => props.dialogVisible,
  (newVal) => {
    localDialogVisible.value = newVal;
  }
);

watch(localDialogVisible, (newVal) => {
  emit("update:dialogVisible", newVal);
});

const closeDialog = () => {
  localDialogVisible.value = false;
};

const kbliOptions = ref([]);
const selectedKBLI = ref();

const handleRegister = () => {
  props.submit(selectedKBLI.value);
  closeDialog();
};
const developmentDialog = ref(false);
const handleRegisterDevelopment = () => {
  developmentDialog.value = true;
};
const noSertifikat = ref("");
const router = useRouter();
const registerNewDevelopment = async () => {
  try {
    const response: any = await $api(
      "/pelaku-usaha/layanan-sertifikasi-halal-mandiri/development",
      {
        method: "post",
        body: {
          no_sertifikat: noSertifikat.value,
        },
      }
    );

    if (response?.code === 2000) {
      router.push(`/sh-domestic/submission/self-declare-mandiri/${response?.data?.id_reg}`);
    } else {
      useSnackbar().sendSnackbar(
        response.errors.list_error.length != 0
          ? response.errors.list_error[0]
          : "Ada Kesalahan",
        "error"
      );
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  } finally {
    noSertifikat.value = "";
    developmentDialog.value = false;
    localDialogVisible.value = false;
  }
};

onMounted(async () => {
  const response: any = await $api("/master/list-oss", {
    method: "get",
  });
  kbliOptions.value = response.filter((item: any, index: number, self: any) => {
    return index === self.findIndex((el: any) => el.id === item.id);
  });
});
const { mdAndUp } = useDisplay();
const dialogMaxWidth = computed(() => {
  return mdAndUp.value ? 850 : "90%";
});
</script>

<template>
  <VDialog v-model="localDialogVisible" :max-width="dialogMaxWidth">
    <VCard class="pa-4">
      <VCardTitle class="headline d-flex space-between align-center">
        <h4>Layanan Sertifikasi Halal</h4>
        <VSpacer />
        <VBtn icon class="no-bg" @click="localDialogVisible = false">
          <VIcon icon="mdi-close" style="color: black" />
        </VBtn>
      </VCardTitle>
      <VCardText>
        <p class="text-body-2">
          Ajukan Permohonan Anda untuk mendapatkan sertifikat halal dari BPJPH
          dengan memilih salah satu layanan dibawah ini:
        </p>
        <VRow>
          <VCol>
            <VCard
              class="my-4 pa-4 d-flex flex-column mx-auto mb-8"
              elevation="4"
              width="90%"
            >
              <h3 class="font-weight-bold text-center">Baru</h3>
              <p class="text-center text-body-2 mt-2">
                Proses sertifikasi halal untuk produk baru yang belum pernah /
                belum memiliki sertifikat halal sebelumnya
              </p>
              <VBtn
                color="primary"
                class="mt-2 text-center"
                width="100%"
                :disabled="!selectedKBLI"
                @click="handleRegister"
              >
                Daftar
              </VBtn>
            </VCard>
          </VCol>
          <VCol>
            <VCard
              class="my-4 pa-4 d-flex flex-column mx-auto mb-8"
              elevation="4"
              width="90%"
            >
              <h3 class="font-weight-bold text-center">Baru (Pengembangan)</h3>
              <p class="text-center text-body-2 mt-2">
                Proses sertifikasi halal untuk
                <strong>menambahkan / mengembangkan </strong>
                dari produk yang telah memiliki sertifikat halal sebelumnya dan
                masih berlaku sampai sekarang
              </p>

              <!-- {{ t("pengajuan-reguler.popup-new-desc") }}<br /> -->
              <!-- {{ t("pengajuan-reguler.popup-new-desc-1") }} -->
              <!-- <strong>{{ t("pengajuan-reguler.popup-new-desc-2") }}</strong> / -->
              <!-- <strong>{{ t("pengajuan-reguler.popup-new-desc-3") }}</strong -->
              <!-- ><br /> -->
              <!-- {{ t("pengajuan-reguler.popup-new-desc-4") }} -->
              <VBtn
                color="primary"
                class="mt-2 text-center"
                width="100%"
                @click="handleRegisterDevelopment"
              >
                Daftar
              </VBtn>
            </VCard>
          </VCol>
        </VRow>
        <div class="font-weight-bold text-body-2 mb-1">
          Pilih KBLI/Usaha/Kegiatan
        </div>
        <VSelect
          v-model="selectedKBLI"
          :items="kbliOptions"
          item-title="uraian_usaha"
          item-value="id"
          placeholder="Pilih KBLI/Usaha/Kegiatan"
          outlined
          density="compact"
        />
      </VCardText>
    </VCard>
  </VDialog>
  <VDialog v-model="developmentDialog" width="500">
    <!-- Dialog Content -->
    <VCard title="Perkembangan Sertifikat Halal">
      <DialogCloseBtn
        variant="text"
        size="default"
        @click="developmentDialog = false"
      />

      <VForm @submit.prevent="registerNewDevelopment()">
        <VCardText>
          <VLabel>Nomor</VLabel>
          <v-text-field
            name="name"
            class="mt-2"
            v-model="noSertifikat"
            placeholder="Isi nomor sertifikat halal"
            id="id"
          ></v-text-field>
        </VCardText>

        <VCardText class="d-flex justify-end flex-wrap gap-4">
          <VBtn
            variant="outlined"
            color="secondary"
            @click="developmentDialog = false"
          >
            close
          </VBtn>
          <VBtn type="submit"> Submit </VBtn>
        </VCardText>
      </VForm>
    </VCard>
  </VDialog>
</template>

<style scoped>
.headline {
  font-size: 1.2rem;
}
.no-bg {
  background-color: transparent !important;
  color: inherit;
  box-shadow: none;
}
</style>
