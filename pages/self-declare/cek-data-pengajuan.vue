<script setup lang="ts">
import { ref } from "vue";
const tab = ref("identity");
</script>

<template>
  <!-- <v-container> -->
  <v-row>
    <v-col cols="12">
      <KembaliButton />
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12">
      <h1>Detail Pengajuan</h1>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-tabs v-model="tab">
        <v-tab value="identity">Pelaku Usaha</v-tab>
        <v-tab value="document">Pengajuan</v-tab>
        <v-tab value="manufacture">Pabrik & Outlet</v-tab>
        <v-tab value="product">Bahan</v-tab>
        <v-tab value="product">Produk</v-tab>
        <v-tab value="product">Proses Produk Halal</v-tab>
        <v-tab value="product">Pernyataan</v-tab>
      </v-tabs>

      <!-- <v-tabs-windows v-model="tab">
          <v-tabs-window-item value="identity">
            <div>A</div>
          </v-tabs-window-item>
        </v-tabs-windows> -->
    </v-col>
  </v-row>
  <!-- </v-container> -->
</template>

<style scoped></style>
