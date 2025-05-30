<script setup lang="ts">
import { Bahan, Evaluasi, Produk } from "#components";
import { ref } from "vue";

const route = useRoute();
const id = route?.params?.id;
const loading = ref<boolean>(false);

const activeTab = ref(-1);
const approveRequirements = ref(false);
const listLegal = ref<any>(null);
const listFactory = ref<any>(null);
const listOutlet = ref<any>(null);
const listPenyelia = ref<any>(null);
const itemsProduct = ref<any>(null);
const itemsChannel = ref<any>(null);

const tabList = ref([
  "Data Pengajuan",
  "Komitmen dan Tanggung Jawab",
  "Bahan",
  "Proses",
  "Produk",
  "Pemantauan dan Evaluasi",
  "Dokumen",
]);

const getListLegal = async () => {
  try {
    const response: any = await $api("/reguler/pelaku-usaha/list-legal", {
      method: "get",
      params: { id },
    });

    if (response?.code === 2000) listLegal.value = response.data;
    else useSnackbar().sendSnackbar("Ada Kesalahan", "error");
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

    if (response?.code === 2000) listPenyelia.value = response.data;
    else useSnackbar().sendSnackbar("Ada Kesalahan", "error");
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

      return itemsChannel.value;
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
        params: { id_reg:id, type },
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
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

onMounted(async () => {
  loading.value = true;
  activeTab.value = 0;
  await Promise.allSettled([
    getFactoryAndOutlet("FAPAB"),
    getFactoryAndOutlet("FAOUT"),
    getListLegal(),
    getListPenyelia(),
    getChannel(LIST_CHANNEL_PATH_JNLAY),
  ]);
  loading.value = false;
});
</script>

<template>
  <div v-if="!loading">
    <VContainer>
      <KembaliButton class="pl0" />
      <div class="headerSection">
        <h2 style="font-size: 32px">Ubah Data</h2>
        <div v-if="activeTab === 4 || activeTab === 5 || activeTab === 6">
          <VRow>
            <VCol>
              <VBtn
                color="#E1442E"
                variant="outlined"
                style="border-color: #e1442e !important"
              >
                Batal
              </VBtn>
            </VCol>
            <VCol>
              <VBtn variant="elevated"> Simpan Perubahan </VBtn>
            </VCol>
          </VRow>
        </div>
      </div>
      <br />
      <VRow>
        <VCol cols="12" class="pl0">
          <VTabs v-model="activeTab" align-tabs="start" class="w-100">
            <VTab v-for="(item, index) in tabList" :key="item" :value="index">
              {{ item }}
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
              is-disabled
            />
          </div>
          <div v-if="activeTab === 1">
            <div v-if="!approveRequirements">
              <KomitmenDanTanggungJawab
                :on-complete="() => (approveRequirements = true)"
              />
            </div>
            <div v-else>
              <ListKomitmenDanTanggungJawab />
            </div>
          </div>
          <div v-if="activeTab === 2">
            <Bahan />
          </div>
          <div v-if="activeTab === 3">
            <div v-if="!approveRequirements">
              <ProsesLayanan
                :id="id"
                :on-complete="() => (approveRequirements = true)"
              />
            </div>
            <div v-else>
              <ListProses />
            </div>
          </div>
          <div v-if="activeTab === 4">
            <Produk />
          </div>
          <div v-if="activeTab === 5">
            <Evaluasi />
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
  padding-left: 0px !important;
}
.headerSection {
  display: flex;
  justify-content: space-between;
}
</style>
