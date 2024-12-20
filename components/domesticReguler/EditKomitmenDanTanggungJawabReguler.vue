<script setup lang="ts">

const props = defineProps({
  isEditable: {
    type: Boolean,
    default: true,
  },
});

// TODO -> PERLU HIT API, APAKAH SUDAH MENYETUJUI KEBIJAKAN HALAL (default nya false)
const isAgree = ref(false || !props.isEditable)

const confirm = check => isAgree.value = check

</script>

<template>
  <FormChecklistKomitmenDanTanggungJawab v-if="!isAgree" @confirm="confirm"/>
  <FormKomitmenDanTanggungJawab v-if="isAgree " :is-editable="props.isEditable"/>
</template>

<style scoped lang="scss">

</style>
