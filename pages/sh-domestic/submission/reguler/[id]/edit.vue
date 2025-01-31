<script setup lang="ts">
import { Bahan, Evaluasi, Produk } from "#components";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const route = useRoute();

const id = (route?.params as any)?.id;
const isViewOnly = (route?.query as any)?.isViewOnly;
const loadingAll = ref<boolean>(true);

const activeTab = ref(-1);
const approveRequirements = ref(false);
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
    } else useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  } catch (error) {
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
    } else useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const getChannel = async (path: string) => {
  try {
    const params = {
      url: path,
    };

    const response: any = await $api("/reguler/lph/list", {
      method: "get",
      params,
    });

    if (response?.code === 2000) {
      itemsChannel.value = response?.data;

      return response;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
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
        params: { id, type },
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
        const jenisBahan = response.data?.map((i) => i.jenis_bahan);

        if (
          ["Bahan", "Cleaning Agent", "Kemasan"].every((item) =>
            jenisBahan.includes(item)
          )
        ) {
          bahanComplete(true);
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
    getFactoryAndOutlet("FAPAB"),
    getFactoryAndOutlet("FAOUT"),
    getListLegal(),
    getListPenyelia(),
    getChannel(LIST_CHANNEL_PATH_JNLAY),
    getListIngredients(),
  ]);

  const checkResIfUndefined = res.every((item: any) => {
    return item !== undefined;
  });

  if (checkResIfUndefined) {
    loadingAll.value = false;
  } else {
    loadingAll.value = false;
  }
});
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
                style="border-color: #e1442e !important;"
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
            <VTab
              v-for="(item, index) in tabList"
              :key="item"
              :value="index"
              :disabled="index > 2 && !isBahanCompleted"
            >
              {{ `${t(item)}`}}
            </VTab>
          </VTabs>
        </VCol>
      </VRow>
      <br />
      <VTabsItems v-model="activeTab">
        <VTabItem>
          <div v-if="activeTab === 0">
            <DataPengajuan
              :id="id"
              :list_legal="listLegal"
              :list_factory="listFactory"
              :list_outlet="listOutlet"
              :list_penyelia="listPenyelia"
              :list_channel="itemsChannel"
              :isviewonly="isViewOnly"
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
            <div v-if="!approveRequirements">
              <ProsesLayanan
                :id="id"
                :on-complete="() => (approveRequirements = true)"
              />
            </div>
            <div v-else>
              <ListProses :isviewonly="isViewOnly" />
            </div>
          </div>
          <div v-if="activeTab === 4">
            <Produk :isviewonly="isViewOnly" />
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
</style>
