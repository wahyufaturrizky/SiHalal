<template>
  <VRow no-gutters class="auth-new-account">
    <VCol class="d-flex align-center justify-center">
      <v-card>
        <v-card-text>
          <VCol>
            <p class="text-h5 font-weight-bold">Pilih Asal Pelaku Usaha</p>
            <RadioButtonGroup v-model="radioGroup">
              <RadioButtonCustom label="Luar Negeri / Overseas" :value="1" />
              <RadioButtonCustom label="Dalam Negeri / Domestic" :value="2" />
              <RadioButtonCustom label="Instansi Pemerintah" :value="3" />
            </RadioButtonGroup>
          </VCol>
          <VCol class="d-flex justify-end">
            <VBtn>Selanjutnya</VBtn>
          </VCol>
        </v-card-text>
      </v-card>
    </VCol>
  </VRow>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "blank",
  unauthenticatedOnly: true,
  public: true,
});

const radioGroup = useState("radioGroup", () => 1);
</script>

<style lang="css" scoped>
.auth-new-account {
  height: 100dvh;
}
</style>
