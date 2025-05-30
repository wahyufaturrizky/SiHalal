<script setup lang="ts">
import { Bahan, Evaluasi } from "#components";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const route = useRoute();

const id = (route?.params as any)?.id;
const isViewOnly = (route?.query as any)?.isViewOnly;
const loadingAll = ref<boolean>(true);

const activeTab = ref(-1);
const approveRequirements = ref(false);
const approveRequirementsProses = ref<boolean>(false);
const namaPj = ref<string>("");
const listLegal = ref<any>(null);
const listFactory = ref<any>(null);
const listOutlet = ref<any>(null);
const listPenyelia = ref<any>(null);
const itemsChannel = ref<any>(null);

const { t } = useI18n();

const tabList = ref([
  "pengajuan-reguler.reguler-form-head-datapengajuan",
  "pengajuan-reguler.reguler-form-head-komitmen",
  "pengajuan-reguler.reguler-form-head-bahan",
  "pengajuan-reguler.reguler-form-head-proses",
  "pengajuan-reguler.reguler-form-head-produk",
  "pengajuan-reguler.reguler-form-head-eval",
  "pengajuan-reguler.reguler-form-head-dokumen",
]);

const isBahanCompleted = ref(false);

const bahanComplete = (isComplete) => {
  isBahanCompleted.value = isComplete;
};

const bahanFailed = (missing) => {
  useSnackbar().sendSnackbar(
    `Jenis bahan berikut belum diinput : ${missing.join(
      ","
    )} Lain - lain. Untuk jenis bahan lain - lain opsion`,
    "error"
  );
};

const getListLegal = async () => {
  try {
    const response: any = await $api("/reguler/pelaku-usaha/list-legal", {
      method: "get",
      params: { id },
    });

    if (response?.code === 2000) {
      listLegal.value = response.data;

      return response;
    } else {
      useSnackbar().sendSnackbar(t("global-error.error-mistake"), "error");
    }
  } catch (error) {
    useSnackbar().sendSnackbar(t("global-error.error-mistake"), "error");
  }
};

const getFlagProcess = async () => {
  try {
    const response: any = await $api("/reguler/pelaku-usaha/flag-process", {
      method: "get",
      params: { id },
    });

    if (response?.code === 2000) {
      approveRequirementsProses.value = response?.data?.is_proses;
      namaPj.value = response?.data?.nama_pj;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  } catch (err) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const getListPenyelia = async () => {
  try {
    const response: any = await $api("/reguler/pelaku-usaha/list-penyelia", {
      method: "get",
      params: { id },
    });

    if (response?.code === 2000) {
      listPenyelia.value = response.data;

      return response;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const getChannel = async (path: string) => {
  try {
    // const params = {
    //   url: path,
    // };
    //
    // const response: any = await $api("/reguler/lph/list", {
    //   method: "get",
    //   params,
    // });

    // const response = await $api(`/master/jenis-layanan-by-idreg/${id}`, {
    //   method: "get",
    // });

    const response = await $api("/master/jenis-layanan", {
      method: "get",
      query: {
        query: "empty",
      },
    });

    itemsChannel.value = response;

    //
    // if (response?.code === 2000) {
    //
    //   return response;
    // } else {
    //   useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    // }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const getFactoryAndOutlet = async (type: string) => {
  try {
    const response: any = await $api(
      "/reguler/pelaku-usaha/list-factory-outlet",
      {
        method: "get",
        params: { id_reg: id, type },
      }
    );

    if (response?.code === 2000) {
      if (type === "FAPAB") {
        if (response.data.length > 0) {
          response?.data.map((el: any) => (el.checked = false));
          listFactory.value = response.data;
        }
      } else {
        response?.data.map((el: any) => (el.checked = false));
        listOutlet.value = response?.data;
      }

      return response;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const getListIngredients = async () => {
  try {
    const response: any = await $api(
      "/self-declare/business-actor/ingredient/list",
      {
        method: "get",
        query: {
          id_reg: id,
        },
      }
    );

    if (response.code === 2000) {
      if (response.data !== null) {
        const jenisBahan = response.data?.map((i) =>
          i.jenis_bahan?.toLowerCase()
        );

        if (
          ["Bahan", "Cleaning Agent", "Kemasan"].every((item) =>
            jenisBahan.includes(item?.toLowerCase())
          )
        ) {
          let count = 0;
          jenisBahan.map((element: any) => {
            if (element === "bahan") count++;
          });
          if (count < 3) bahanComplete(false);
          else bahanComplete(true);
        } else {
          bahanComplete(false);
        }
      }
    }

    return response;
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  activeTab.value = 0;

  const res: any = await Promise.all([
    getListLegal(),
    getListPenyelia(),
    getFactoryAndOutlet("FAPAB"),
    getFactoryAndOutlet("FAOUT"),
    getChannel(LIST_CHANNEL_PATH_JNLAY),
    getListIngredients(),
  ]);

  const checkResIfUndefined = res.every((item: any) => {
    return item !== undefined;
  });

  const sessionData = await useMyAuthUserStore().getSession();

  const userRole = sessionData?.value?.roles?.[0]?.name;

  if (userRole === "Lembaga Pemeriksa Halal")
    localStorage.setItem("commitmentAndResponsibility", true);
  else await getFlagProcess();

  if (checkResIfUndefined) loadingAll.value = false;
  else loadingAll.value = false;
});

onUnmounted(() => {
  localStorage.removeItem("commitmentAndResponsibility");
});

const dataPengajuanRef = ref();

const dataPengajuanEmitted = ref();

const handleDataPengajuanEmitted = (value: any) => {
  dataPengajuanEmitted.value = value;
};

const onclickTab = (tab: any) => {
  if (tab == 2) dataPengajuanRef.value.emitRequestCertificateData();
};

const valid = ref(false);
</script>

<template>
  <div v-if="!loadingAll">
    <VContainer>
      <KembaliButton class="pl0" />
      <div class="headerSection">
        <h3 class="text-h3 font-weight-bold">
          {{ t("pengajuan-reguler.reguler-form-head-title") }}
        </h3>
        <div
          v-if="
            (activeTab === 4 || activeTab === 5 || activeTab === 6) &&
            !isViewOnly
          "
        >
          <VRow>
            <VCol>
              <VBtn
                color="#E1442E"
                variant="outlined"
                style="border-color: #e1442e !important"
              >
                {{ t("pengajuan-reguler.reguler-form-head-cancel") }}
              </VBtn>
            </VCol>
            <VCol>
              <VBtn variant="elevated">
                {{ t("pengajuan-reguler.reguler-form-head-simpan") }}
              </VBtn>
            </VCol>
          </VRow>
        </div>
      </div>
      <br />
      <VRow>
        <VCol cols="12" class="pl0">
          <VTabs v-model="activeTab" align-tabs="start" class="w-100">
            <div
              v-for="(item, index) in tabList"
              :key="index"
              class="position-relative d-inline-block"
            >
              <!--
                <VTooltip
                v-if="index > 2 && !isBahanCompleted"
                activator="parent"
                >
                Mohon lengkapi Bahan, Cleaning Agent, Kemasan agar menu ini
                dapat di akses
                </VTooltip>
              -->
              <VTab :value="index" @click="onclickTab(index)">
                {{ t(item) }}
              </VTab>
            </div>
          </VTabs>
        </VCol>
      </VRow>
      <br />
      <VTabsItems v-model="activeTab">
        <VTabItem>
          <div v-if="activeTab === 0">
            <DataPengajuan
              :id="id"
              ref="dataPengajuanRef"
              :list_legal="listLegal"
              :list_factory="listFactory"
              :list_outlet="listOutlet"
              :list_penyelia="listPenyelia"
              :list_channel="itemsChannel"
              :isviewonly="isViewOnly"
              @certificate-data-changed="handleDataPengajuanEmitted"
              @refetch-list-legal="getListLegal"
              @refetch-list-factory="() => getFactoryAndOutlet('FAPAB')"
              @refetch-list-outlet="() => getFactoryAndOutlet('FAOUT')"
              @refetch-list-penyelia="getListPenyelia"
            />
          </div>
          <div v-if="activeTab === 1">
            <div v-if="!approveRequirements">
              <KomitmenDanTanggungJawab
                :on-complete="() => (approveRequirements = true)"
              />
            </div>
            <div v-else>
              <ListKomitmenDanTanggungJawab :isviewonly="isViewOnly" />
            </div>
          </div>
          <div v-if="activeTab === 2">
            <Bahan
              :isviewonly="isViewOnly"
              @complete="() => bahanComplete(true)"
              @failed="() => bahanComplete(false)"
            />
          </div>
          <div v-if="activeTab === 3">
            <div v-if="!approveRequirementsProses">
              <ProsesLayanan
                :id="id"
                :on-complete="() => (approveRequirementsProses = true)"
                :nama-pj="namaPj"
              />
            </div>
            <div v-else>
              <ListProses :isviewonly="isViewOnly" />
            </div>
          </div>
          <div v-if="activeTab === 4">
            <!-- <Produk :isviewonly="isViewOnly" /> -->
            <ProdukRegulerEdit :isviewonly="isViewOnly" />
          </div>
          <div v-if="activeTab === 5">
            <Evaluasi :isviewonly="isViewOnly" />
          </div>
          <div v-if="activeTab === 6">
            <DokumenTab />
          </div>
        </VTabItem>
      </VTabsItems>
    </VContainer>
  </div>
  <div v-else>
    <VSkeletonLoader v-for="i in 3" :key="i" type="list-item-two-line" />
  </div>
</template>

<style lang="scss" scoped>
.required {
  color: red;
  font-size: 12px;
}

.pl0 {
  padding-inline-start: 0 !important;
}

.headerSection {
  display: flex;
  justify-content: space-between;
}

.tab-hover {
  position: relative;
}
</style>
