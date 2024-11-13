<script setup lang="ts">
const props = defineProps({
  timerStartInSecond: {
    type: Number,
    default: 60,
    required: true,
  },
});
const minute = ref(0);
const second = ref(0);

const defineTime = (input: number) => {
  // minute.value = Math.floor(input / 60);
  // console.log(minute.value);
  second.value = input;
};

onMounted(() => {
  defineTime(props.timerStartInSecond);
});

const emit = defineEmits(["countdownDone"]);

watch(second, (newSec) => {
  if (second.value > 0) {
    setTimeout(() => {
      second.value -= 1;
    }, 1000);
  }
  if (second.value == 0) {
    emit("countdownDone");
  }
});
</script>
<template>
  <VRow justify="center">
    <VCol style="text-align: center">
      <div style="display: inline-flex; color: black; justify-content: center">
        <p v-if="second < 10">0</p>
        <p>{{ second }} detik</p>
      </div>
    </VCol>
  </VRow>
</template>
