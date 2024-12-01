<script setup lang="ts">


// TODO -> PERLU HIT API, APAKAH SUDAH MENYETUJUI KEBIJAKAN HALAL
const isAgree = ref(false)

const confirm = check => isAgree.value = check

</script>

<template>
  <FormChecklistKomitmenDanTanggungJawab v-if="!isAgree" @confirm="confirm"/>
  <FormKomitmenDanTanggungJawab v-if="isAgree"/>
</template>

<style scoped lang="scss">

</style>
