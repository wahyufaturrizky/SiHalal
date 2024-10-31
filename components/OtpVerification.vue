<template>
  <div>
    <VOtpInput
      v-model="kodeOtpEmail"
      class="mb-2"
      variant="solo-filled"
    />
    <p>Belum terima kode?
      <span v-if="cooldown > 0">({{ cooldown }}) detik</span>
      <span v-else><a href="#" @click.prevent="resendOtp">Kirim Ulang</a></span>
    </p>
    <v-btn
      block
      type="submit"
      :disabled="!isValidOtp"
      @click="submitCode">
      Verifikasi Kode
    </v-btn>
  </div>
</template>

<script setup>
import { computed, defineEmits, defineProps, ref } from 'vue';

const props = defineProps({
  cooldown: {
    type: Number,
    required: true,
  }
});

// Local state for OTP input
const kodeOtpEmail = ref('');

// Computed property to check if the OTP is valid
const isValidOtp = computed(() => kodeOtpEmail.value.length === 6);

const emit = defineEmits(['submitVerificationCode', 'resendOtp']);

const submitCode = () => {
  emit('submitVerificationCode', kodeOtpEmail.value); // Emit the OTP value
};

const resendOtp = () => {
  emit('resendOtp');
};
</script>

<style scoped lang="scss">
/* Add your styles here */
</style>
