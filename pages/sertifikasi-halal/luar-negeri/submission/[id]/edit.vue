<template>
  <div class="">
    <p class="text-h4">Edit Foreign Halal Certificate Requirements</p>
    <!-- <v-card class="pa-4"> -->
    <v-tabs v-model="tab">
      <v-tab value="identity">identity</v-tab>
      <v-tab value="document">document</v-tab>
      <v-tab value="manufacture">manufacture</v-tab>
      <v-tab value="product">product</v-tab>
    </v-tabs>

    <!-- <v-card-text> -->
    <v-tabs-window v-model="tab">
      <v-tabs-window-item value="identity">
        <EditIdentity />
      </v-tabs-window-item>

      <v-tabs-window-item value="document">
        <EditDocument />
      </v-tabs-window-item>

      <v-tabs-window-item value="manufacture">
        <EditManufacture />
      </v-tabs-window-item>
      <v-tabs-window-item value="product">
        <EditProduct />
      </v-tabs-window-item>
    </v-tabs-window>
    <!-- </v-card-text> -->
    <!-- </v-card> -->
  </div>
</template>

<script setup>
import EditDocument from "@/views/pages/shln/EditDocument.vue";
import EditIdentity from "@/views/pages/shln/EditIdentity.vue";
import EditManufacture from "@/views/pages/shln/EditManufacture.vue";
import EditProduct from "@/views/pages/shln/EditProduct.vue";
import { ref } from "vue";

const tab = ref("one");
</script>
