<script setup lang="ts">

// TODO -> PERLU HIT API, APAKAH SUDAH MENYETUJUI PERNYTAAN BEBAS BABI
const isAgree = ref(false)

const confirm = check => isAgree.value = check

</script>

<template>
  <FormCheckPernyataanBebasBabi @confirm="confirm" v-if="!isAgree" />
  <div v-if="isAgree">
    <FormProsesReguler />
  </div>
</template>

<style scoped lang="scss">

</style>
