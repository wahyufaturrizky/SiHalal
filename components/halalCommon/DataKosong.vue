<template>
  <div class="border-thin rounded my-4 pa-2 d-flex flex-column justify-center align-center">
    <VImg :src="emptyDate">

    </VImg>
    <p>Data Kosong</p>
  </div>
</template>

<script setup>
import emptyDate from "@/assets/images/svg/data-kosong.svg";
</script>
