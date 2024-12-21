<template>
  <div class="">
    <p class="text-h4">KELUARIN V TAB ITEM MANUFACTURE NYA, MASUKIN KE PAGE SHLN VERIFIKATOR VIEW MANUFACTURE. THANK YOU !!! </p>
    <v-tabs v-model="tab">
      <v-tab value="identity">identity</v-tab>
      <v-tab value="document">document</v-tab>
      <v-tab value="manufacture">manufacture</v-tab>
      <v-tab value="product">Product</v-tab>

    </v-tabs>

    <!-- <v-card-text> -->
    <v-tabs-window v-model="tab">
      <v-tabs-window-item value="manufacture">
        <VerificatorDetailManufacture />
      </v-tabs-window-item>
    </v-tabs-window>

  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const tab = ref("manufacture");

</script>
