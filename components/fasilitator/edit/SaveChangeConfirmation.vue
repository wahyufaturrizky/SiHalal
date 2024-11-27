<script setup lang="ts">
import { computed, ref } from "vue";
import { useDisplay } from "vuetify";

const props = defineProps({
  form: {
    type: Object,
    required: true,
  },
});

const router = useRouter();
const route = useRoute();

const facilitateId = route.params.id;

const loadingUpdate = ref(false);

const { form } = props || {};

const isVisible = ref(false);

const closeDialog = () => {
  isVisible.value = false;
};

const putFacilitate = async () => {
  try {
    loadingUpdate.value = true;

    const {
      facilitatorName,
      explanationOfFacilitation,
      year,
      regionalScope,
      startDate,
      endDate,
      type,
      sourceOfFund,
      kuota,
      picName,
      picPhoneNumber,
    } = form;

    const res = await $api(`/facilitate/update/${facilitateId}`, {
      method: "put",
      body: {
        fac_name: facilitatorName,
        fac_description: explanationOfFacilitation,
        tahun: year,
        lingkup_wilayah: regionalScope,
        tgl_aktif: startDate,
        tgl_selesai: endDate,
        jenis: type,
        sumber_biaya: sourceOfFund,
        kuota,
        nama_pic_program: picName,
        no_hp_pic_program: picPhoneNumber,
      },
    });

    if (res?.code === 2000) {
      closeDialog();
      loadingUpdate.value = false;
      router.go(-1);
    } else {
      useSnackbar().sendSnackbar("Gagal update data", "error");
      loadingUpdate.value = false;
    }
  } catch (error) {
    closeDialog();
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingUpdate.value = false;
  }
};

const openDialog = () => {
  isVisible.value = true;
};

const confirm = () => {
  putFacilitate();
};

const cancel = () => {
  closeDialog();
};

const { mdAndUp } = useDisplay();

const dialogMaxWidth = computed(() => {
  return mdAndUp ? 700 : "90%";
});
</script>

<template>
  <div class="ma-1">
    <VBtn variant="flat" color="primary" @click="openDialog">
      Simpan Perubahan
    </VBtn>

    <VDialog v-model="isVisible" :max-width="dialogMaxWidth">
      <VCard>
        <VCardTitle
          class="text-h5 font-weight-bold d-flex justify-space-between align-center"
        >
          <span>Simpan Perubahan </span>
          <VBtn
            icon
            color="transparent"
            style="border: none"
            elevation="0"
            @click="closeDialog"
          >
            <VIcon color="black"> ri-close-line </VIcon>
          </VBtn>
        </VCardTitle>
        <VCardText>
          <p class="mb-2">Apakah kamu yakin ingin menyimpan perubahan data ?</p>
        </VCardText>
        <VCardActions>
          <VBtn variant="outlined" text @click="cancel"> Batal </VBtn>
          <VBtn
            :disabled="loadingupdate"
            class="primaru"
            variant="flat"
            @click="confirm"
          >
            {{ loadingupdate ? "Loading..." : "Simpan" }}
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>

<style scoped></style>
