<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

// Define props untuk `seconds`, default-nya 60 detik
const props = defineProps<{ seconds: number }>()
const emit = defineEmits<['resendCode']>()

const remainingTime = ref(props.seconds)

const startCooldown = () => {
  remainingTime.value = props.seconds

  const interval = setInterval(() => {
    if (remainingTime.value > 0) {
      remainingTime.value--
    }
    else
      clearInterval(interval)
  }, 1000)
}

const emitResendCode = () => {
  startCooldown()
  emit('resendCode')
}

onMounted(() => {
  startCooldown()
})

watch(() => props.seconds, () => {
  startCooldown()
})
</script>

<template>
  <span>
    <span v-if="remainingTime > 0">({{ remainingTime }}) detik</span>
    <span v-else>
      <a
        href="#"
        @click.prevent="emitResendCode"
      >Kirim Ulang</a>
    </span>
  </span>
</template>
