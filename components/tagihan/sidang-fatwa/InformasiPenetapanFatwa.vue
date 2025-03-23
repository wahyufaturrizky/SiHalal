<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const props = defineProps({
  data: {
    type: Object,
  },
  dataPengajuan: {
    type: Object,
  },
  idReg: {
    type: String,
  },
  phoneNumber: {
    type: String
  }
});

const panelOpen = ref(0);
const { data, dataPengajuan, idReg } = props || {};
const visibleOtp = ref(false)
const lov = ref([])
const cooldown = ref(0)
const otpNumber = ref("")
const visibleDialogVerification = ref(false)
const visibleDialogSubmit = ref(false)

const countdown = ref(0);
const countdownInterval = ref(null);

const startCooldown = () => {
  const interval = setInterval(() => {
    if (cooldown.value > 0) cooldown.value--;
    else clearInterval(interval);
  }, 1000);
};

const sessionData = await useMyAuthUserStore().getSession();

const loadMasterLov = async () => {
  try {
    const response: any = await $api(
      "/sidang-fatwa/task-force/lov-penetapan",
      {
        method: "get"
      }
    );
    if (response.code == 2000) {
      lov.value = response.data
      return;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  } finally {
    // loadingPendamping.value = false;
  }
};

const onRequestOtp = async () => {
  try {
    if (!props.phoneNumber) {
      throw {
        message: 'No HP Komisi Fatwa belum ada'
      }
    }
    const response: any = await $api(
      "/sidang-fatwa/task-force/request-otp",
      {
        method: "post",
        body: {
          channel: "phone_number",
          destination: props.phoneNumber,
        }
      }
    );
    if (response.code == 2000) {
      visibleOtp.value = true
      return;
    }
  } catch (error) {
    if (error.message === 'No HP belum ada') {
      useSnackbar().sendSnackbar(error.message, "error");
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  } finally {
    // loadingPendamping.value = false;
  }
}

const startCountdown = (seconds: number) => {
  countdown.value = seconds;
  localStorage.setItem('otpExpirationTime', (Math.floor(Date.now() / 1000) + seconds).toString());

  countdownInterval.value = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      clearInterval(countdownInterval.value);
      localStorage.removeItem('otpExpirationTime');
    }
  }, 1000);
};

const reRequestOtp = async () => {
  startCountdown(60);
  onRequestOtp()
}

const onSubmitPenetapan = async () => {
  try {
    const response: any = await $api(
      "/sidang-fatwa/task-force/submit-penetapan",
      {
        method: "post",
        body: {
          id_reg: idReg,
          id_penetapan: data?.id_penetapan,
          penetapan: data?.penetapan,
        },
      },
    );
    if (response.code === 2000) {
      useSnackbar().sendSnackbar(response.message, "success");
      return;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan submit penetapan", "error");
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan submit penetapan", "error");
  } finally {
    // loadingPendamping.value = false;
  }
}

const onVerifyOtp = async () => {
  try {
    const response: any = await $api(
      "/sidang-fatwa/task-force/verify-otp",
      {
        method: "post",
        body: {
          user_id: sessionData.value?.id,
          otp: otpNumber.value,
        }
      }
    );
    if (response.code === 2000) {
      useSnackbar().sendSnackbar("Verifikasi OTP berhasil", "success");
      visibleDialogVerification.value = false
      setTimeout(async () => {
        await onSubmitPenetapan()
      }, 500);
      return;
    } else {
      useSnackbar().sendSnackbar("OTP tidak valid", "error");
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  } finally {
    // loadingPendamping.value = false;
  }
}

onMounted(async () => {
  const storedTime = localStorage.getItem('otpExpirationTime');
  if (storedTime) {
    const now = Math.floor(Date.now() / 1000);
    const remainingTime = parseInt(storedTime, 10) - now;

    if (remainingTime > 0) {
      startCountdown(remainingTime);
    }
  }
  await loadMasterLov()
})

const onApprove = async () => {
  if (!visibleOtp.value) {
    onRequestOtp()
  } else {
    visibleOtp.value = false
  }
}

watch(countdown, (newValue) => {
  if (newValue > 0) {
    visibleOtp.value = true
  }
});
</script>

<template>
  <VExpansionPanels v-model="panelOpen">
    <VExpansionPanel>
      <!-- Header Panel -->
      <VExpansionPanelTitle>
        <h3>
          {{ t('task-force.proses-sidang.detail.section-informasi-penetapan.title') }}
        </h3>
      </VExpansionPanelTitle>

      <!-- Konten Panel -->
      <VExpansionPanelText>
       
        <div class="mt-5">
          <label>
            {{ t('task-force.proses-sidang.detail.section-informasi-penetapan.ketetapan') }}
          </label>
          <VSelect
            v-model="data.penetapan"
            :items="lov"
            placeholder="Pilih Penetapan"
            density="compact"
            item-title="name"
            item-value="code"
          ></VSelect>
        </div>
        <div style="float: inline-end;" class="mt-5">
          <VDialog
            v-model="visibleDialogVerification"
            max-width="60svw"
          >
            <template #activator="{ props }">
              <VBtn
                v-bind="props"
                :disabled="disabled"
              >
                {{ t('task-force.proses-sidang.detail.section-informasi-penetapan.btn') }}
              </VBtn>
            </template>
            <VCard>
              <VCardTitle>
                <div
                  class="d-flex w-100"
                  style="justify-content: space-between;"
                >
                  {{ `${visibleOtp ? 'Verifikasi OTP' : 'Konfirmasi'}` }}
                  <div
                    v-if="!visibleDialogSubmit"
                    style="margin-right: 10px;"
                    @click="visibleDialogVerification = false"
                  >
                    <VIcon icon="fa-times" size="20px" />
                  </div>
                </div>
              </VCardTitle>
              <VCardText>
                <div v-if="visibleOtp">
                  <div v-if="!visibleDialogSubmit">
                    <label>
                      Kami telah mengirimkan kode OTP ke nomor handphone “{{ sessionData?.phone_number }}”
                    </label>
                    <VOtpInput
                      class="mb-2"
                      variant="solo-filled"
                      v-model="otpNumber"
                    />
                    <p>Belum terima kode?
                      <span v-if="countdown > 0">({{ countdown }}) detik</span>
                      <span v-else><a href="#" @click.prevent="() => reRequestOtp()">Kirim Ulang</a></span>
                    </p>
                    <VBtn
                      block
                      type="submit"
                      :disabled="otpNumber.length < 6"
                      @click="onVerifyOtp">
                      Verifikasi Kode
                    </VBtn>
                  </div>
                  <div v-else>
                    OTP berhasil, sedang melakukan submit penetapan
                  </div>
                </div>
                <div v-else>
                  <label>
                    Yakin ingin ditetapkan halal untuk No. Pendaftaran: {{ dataPengajuan?.no_daftar }} atas nama Yusuf Suganda? Jika YA maka selanjutnya akan dilakukan proses penerbitan sertifikat oleh BPJPH
                  </label>
                </div>
              </VCardText>
              <VCardActions v-if="!visibleOtp">
                <div style="margin-right: 10px;">
                  <VBtn
                    color="primary"
                    variant="outlined"
                    @click="visibleDialogVerification = false"
                  >
                    Batal
                  </VBtn>
                  <VBtn
                    text
                    variant="elevated"
                    color="primary"
                    @click="() => {
                      onApprove()
                    }"
                  >
                    Ya, Setuju
                  </VBtn>
                </div>
              </VCardActions>
            </VCard>
          </VDialog>
        </div>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>

<style scoped>
.report-info {
  display: flex;
  align-items: center;
  margin-block-start: 16px;
}

.label {
  font-size: 16px;
  font-weight: 500;
}

.download-btn {
  display: flex;
  justify-content: flex-end;
}

h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}

/* Tombol berbentuk kotak */
.square-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border-radius: 8px; /* Membuat ujungnya kotak dengan sudut sedikit melengkung */
  block-size: 40px; /* Tinggi tombol */
  inline-size: 40px; /* Lebar tombol */
}

.square-btn > .mdi {
  font-size: 20px; /* Ukuran ikon */
}

.square-btn:hover {
  background-color: rgba(98, 0, 238, 10%); /* Efek hover */
}
</style>
