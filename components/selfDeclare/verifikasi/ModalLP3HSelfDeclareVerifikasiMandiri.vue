<script setup lang="ts">
const form = ref({
  notes: null,
});

const props = defineProps({
  modalType: {
    type: String,
    required: true,
  },
});

const route = useRoute();
const router = useRouter();

const selfDeclareId = (route.params as any).id;

const loadingPengembalian = ref(false);
const loadingDibatalkan = ref(false);

const pengembalian = async () => {
  try {
    loadingPengembalian.value = true;

    const res: any = await $api(
      `/self-declare/verificator/return/${selfDeclareId}`,
      {
        method: "put",
        body: {
          notes: form.value.notes,
        },
      }
    );

    if (res?.code === 2000) {
      useSnackbar().sendSnackbar("Success", "success");
      loadingPengembalian.value = false;

      setTimeout(() => {
        navigateTo("/lp3h/self-declare/verifikasi-mandiri");
      }, 200);
    } else {
      useSnackbar().sendSnackbar(res.errors.list_error.join(", "), "error");
      loadingPengembalian.value = false;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingPengembalian.value = false;
  }
};

const dibatalkan = async () => {
  try {
    loadingDibatalkan.value = true;

    const res: any = await $api(
      `/self-declare/verificator/decline/${selfDeclareId}`,
      {
        method: "put",
        body: {
          notes: form.value.notes,
        },
      }
    );

    if (res?.code === 2000) {
      useSnackbar().sendSnackbar("Success", "success");
      loadingDibatalkan.value = false;

      setTimeout(() => {
        navigateTo("/lp3h/self-declare/verifikasi-mandiri");
      }, 200);
    } else {
      useSnackbar().sendSnackbar(res.errors.list_error.join(", "), "error");
      loadingDibatalkan.value = false;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingDibatalkan.value = false;
  }
};

const emit = defineEmits(["onSubmitPengembalian"]);

const onOpenModal = () => {
  form.value.notes = null;
};
</script>
<template>
  <VDialog>
    <template #activator="{ props: openModal }">
      <VBtn
        v-if="props.modalType == 'return'"
        variant="outlined"
        class="mx-2"
        v-bind="openModal"
        @click="onOpenModal"
      >
        Pengembalian
      </VBtn>
      <VBtn
        v-if="props.modalType == 'reject'"
        variant="flat"
        color="error"
        class="mx-2"
        v-bind="openModal"
        @click="onOpenModal"
      >
        Pembatalan
      </VBtn>
    </template>
    <template #default="{ isActive }">
      <VCard>
        <VCardTitle>
          <VRow>
            <VCol cols="10" style="display: flex; align-items: center">
              <h3 v-if="props.modalType == 'return'">
                Konfirmasi Pengembalian Dokumen
              </h3>
              <h3 v-if="props.modalType == 'reject'">
                Konfirmasi Pembatalan Dokumen
              </h3>
            </VCol>
            <VCol cols="2" style="display: flex; justify-content: end">
              <VCol cols="2" style="display: flex; justify-content: end"
                ><VIcon
                  size="small"
                  icon="fa-times"
                  @click="isActive.value = false"
                ></VIcon
              ></VCol>
            </VCol>
          </VRow>
        </VCardTitle>
        <VCardItem>
          <VItemGroup>
            <p>
              Apakah yakin untuk
              {{
                props.modalType === "return"
                  ? "Mengembalikan"
                  : props.modalType === "reject"
                  ? "Membatalkan"
                  : ""
              }}
              dokumen?
            </p>
            <br />
            <b>Alasan:</b>
            <VTextarea
              placeholder="Masukkan alasan"
              v-model="form.notes"
            ></VTextarea>
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
              @click="pengembalian"
              v-if="props.modalType == 'return'"
              variant="flat"
              color="error"
              >Ya, Kembalikan</VBtn
            >
            <VBtn
              @click="dibatalkan"
              v-if="props.modalType == 'reject'"
              variant="flat"
              color="error"
              >Ya, Batalkan</VBtn
            >
          </div>
        </VCardActions>
      </VCard>
    </template>
  </VDialog>
</template>
