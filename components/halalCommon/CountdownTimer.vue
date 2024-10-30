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
  minute.value = Math.floor(input / 60);
  second.value = input % 60;
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
  } else {
    if (minute.value > 0) {
      minute.value -= 1;
      second.value += 59;
    }
  }
  if (second.value == 0 && minute.value == 0) {
    emit("countdownDone");
  }
});
</script>
<template>
  <VRow justify="center">
    <VCol style="text-align: center">
      <div style="display: inline-flex; color: black; justify-content: center">
        <p v-if="minute < 10">0</p>
        <p>{{ minute }}</p>
        <p>:</p>
        <p v-if="second < 10">0</p>
        <p>{{ second }}</p>
      </div>
    </VCol>
  </VRow>
</template>
