<template>
  <div v-if="props.inlineImage">
    <v-row
      v-if="progressLocal"
      align-content="center"
      class="fill-height"
      justify="center"
    >
      <v-col cols="6">
        <v-progress-circular
          color="primary"
          height="6"
          indeterminate
        ></v-progress-circular>
      </v-col>
    </v-row>
    <VIcon
      v-if="failedFetch"
      color="primary"
      size="large"
      icon="fa-picture-o"
    ></VIcon>
    <VImg
      v-if="props.namabahan && !progressLocal && !failedFetch"
      :src="uriPreview"
      contain
      max-height="300"
      max-width="200"
    ></VImg>
  </div>
  <VDialog v-if="!props.inlineImage">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-if="props.namabahan"
        v-bind="activatorProps"
        color="primary"
        variant="text"
        @click="preview(props.namabahan)"
      >
        <template #prepend>
          <VIcon
            v-if="props.iconActivator"
            color="primary"
            size="large"
            icon="fa-picture-o"
          ></VIcon>
          <p
            style="color: white"
            v-else-if="!props.iconActivator && props.stringBtnActivator"
          >
            {{ props.stringBtnActivator }}
          </p>
        </template>
      </v-btn>
      <p v-else>-</p>
    </template>
    <template v-slot:default="{ isActive }">
      <VCard>
        <VCardTitle>
          <div class="d-flex w-100" style="justify-content: space-between">
            {{ props.cardTitle }}
            <div
              style="margin-right: 10px; cursor: pointer"
              @click="isActive.value = false"
            >
              <VIcon icon="fa-times" size="20px" />
            </div>
          </div>
        </VCardTitle>
        <VCardItem>
          <v-row
            v-if="progressLocal"
            align-content="center"
            class="fill-height"
            justify="center"
          >
            <v-col class="text-subtitle-1 text-center" cols="12">
              Mengambil file
            </v-col>
            <v-col cols="6">
              <v-progress-linear
                color="deep-purple-accent-4"
                height="6"
                indeterminate
                rounded
              ></v-progress-linear>
            </v-col>
          </v-row>
          <VImg
            v-if="props.namabahan && !progressLocal"
            :src="uriPreview"
            contain
            max-height="400"
          ></VImg>
          <br />
        </VCardItem>
      </VCard>
    </template>
  </VDialog>
</template>
<script setup lang="ts">
const props = defineProps({
  namabahan: {
    required: true,
  },
  cardTitle: {
    type: String,
    required: true,
  },
  docQuery: {
    type: String,
  },
  iconActivator: {
    type: Boolean,
    default: true,
  },
  stringBtnActivator: {
    type: String,
  },
  inlineImage: {
    type: Boolean,
    default: false,
  },
});

onMounted(() => {
  if (props.inlineImage) {
    preview(props.namabahan);
  }
});

const progressLocal = ref(true);
const failedFetch = ref(false);

const uriPreview = ref();

const preview = async (filename: string) => {
  const tmp = props.docQuery ? props.docQuery : undefined;
  const blobUri = await previewAsModal(filename, tmp);

  if (blobUri?.status == 200) {
    uriPreview.value = blobUri?.uri;
  } else {
    failedFetch.value = true;
    useSnackbar().sendSnackbar("Tidak bisa mendapatkan file", "error");
  }
  progressLocal.value = false;
};
</script>
