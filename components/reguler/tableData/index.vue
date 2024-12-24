<script setup lang="ts">
const props = defineProps({
  id: {
    type: String,
    required: false,
  },
  onSubmit: {
    type: Function,
    default: () => {},
    required: false,
  },
  onAdd: {
    type: Function,
    default: () => {},
    required: false,
  },
  onDetail: {
    type: Function,
    default: () => {},
    required: false,
  },
  onEdit: {
    type: Function,
    default: () => {},
    required: false,
  },
  onDelete: {
    type: Function,
    default: () => {},
    required: false,
  },
  title: {
    type: String,
    required: false,
  },
  data: {
    type: Array,
    required: false,
  },
  withAddButton: {
    type: Boolean,
    required: false,
  },
  withSaveButton: {
    type: Boolean,
    required: false,
  },
  withApproveButton: {
    type: Boolean,
    required: false,
  },
  withAddButtonBahan: {
    type: Boolean,
    required: false,
  },
  reRender: {
    type: Boolean,
    required: false,
  },
  refresh: {
    type: Function,
    default: () => {},
    required: false,
  },
})

const route = useRoute()

const id = route.params.id

const ingredientItems = ref<Bahan[]>(props?.data?.value || [])
const productItems = ref<any[]>([])

const handleCheck = (item: any) => {
  if (item.checked)
    item.checked = false
  else
    item.checked = true
}

const getListIngredients = async () => {
  props.refresh()
  try {
    const response: any = await $api(
      '/self-declare/business-actor/ingredient/list',
      {
        method: 'get',
        query: {
          id_reg: id,
        },
      },
    )

    if (response.code === 2000)
      ingredientItems.value = response.data

    return response
  }
  catch (error) {
    console.log(error)
  }
}

const getListProducts = async () => {
  try {
    const response: any = await $api(
      '/reguler/pelaku-usaha/tab-bahan/products/list',
      {
        method: 'get',
        query: {
          id_reg: id,
        },
      },
    )

    if (response.code === 2000) {
      productItems.value = response.data || []
    }
    return response
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  if (props?.title === 'Daftar Nama Bahan dan Kemasan')
    getListIngredients()
  else if (props?.title === 'Daftar Nama Produk')
    getListProducts()
})

watch(() => props.reRender, () => {
  getListProducts()
})
</script>

<template>
  <VCard class="pa-4">
    <VCardTitle>
      <div class="d-flex justify-space-between align-center">
        <span class="text-h5 font-weight-bold">{{ props.title }}</span>
        <div class="d-flex justify-space-between gap-4">
          <div v-if="withAddButtonBahan">
            <TambahBahanModal @loadList="getListIngredients()"></TambahBahanModal>
          </div>
          <VBtn
            v-if="withAddButton"
            variant="outlined"
            append-icon="ri-add-line"
            @click="props.onAdd"
          >
            Tambah
          </VBtn>
          <VBtn
            v-if="withSaveButton"
            variant="flat"
            @click="props.onSubmit"
          >
            {{ withApproveButton ? "Saya Setuju" : "Simpan" }}
          </VBtn>
        </div>
      </div>
      <slot name="headerDialog" />
    </VCardTitle>
    <VCardText>
      <br />
      <VRow>
        <VDataTable
          class="border rounded"
          :items-per-page="-1"
          hide-default-footer=""
          :headers="props.data.label"
          :items="
            props?.title === 'Daftar Nama Bahan dan Kemasan'
              ? ingredientItems
              : props.title === 'Daftar Nama Produk'
                ? productItems : props?.data.value
          "
        >
          <template #item.no="{ index }">
            <div>
              {{ index + 1 }}
            </div>
          </template>
          <template #item.addType="{ item }">
            <div>
              {{ item?.FileDok !== '' ? 'Unggah' : 'Manual' }}
            </div>
          </template>
          <template #item.religion>
            <label>Islam</label>
          </template>
          <template #item.productType="{ item }">
            <div>
              {{ item.productType }}
            </div>
          </template>
          <template #item.productName="{ item }">
            <div>
              {{ item.productName }}
            </div>
          </template>
          <template #item.materialTypeLong="{ item }">
            <div class="mw30">
              {{ item.materialTypeLong }}
            </div>
          </template>
          <template #item.publication="{ item }">
            <!-- <VCheckbox true-value="true" /> -->
            <VCheckbox
              v-model="item.checked"
              @change="() => handleCheck(item)"
            />
          </template>
          <template #item.action="{ item }">
            <DialogDeleteAuditPengajuan
              title="Hapus Bahan"
              button-text="Ya, Hapus"
              :content="props?.title"
              :on-delete="() => props?.onDelete(item)"
            >
              <template #contentDelete>
                <p>Apakah anda yakin menghapus data ini?</p>
              </template>
            </DialogDeleteAuditPengajuan>
          </template>
          <template #item.actionEdit="{ item }">
            <Vbtn variant="plain" class="cursor-pointer" @click="() => props.onEdit(item)">
              <VIcon end icon="ri-pencil-line" color="#652672" />
            </Vbtn>
          </template>
          <template #item.actionPopOver2="{ item }">
            <VMenu>
              <template #activator="{ props }">
                <VBtn
                  v-bind="props"
                  append-icon="ri-more-2-line"
                  variant="plain"
                />
              </template>
              <VList>
                <VListItem class="p0">
                  <VListItemTitle>
                    <Vbtn
                      variant="plain"
                      class="cursor-pointer"
                      @click="() => props.onEdit(item)"
                    >
                      <VRow>
                        <VCol sm="4">
                          <VIcon end icon="ri-pencil-line" />
                        </VCol>
                        <VCol>
                          <label class="cursor-pointer">Ubah </label>
                        </VCol>
                      </VRow>
                    </Vbtn>
                  </VListItemTitle>
                </VListItem>
                <VListItem class="p0">
                  <VListItemTitle>
                    <Vbtn variant="plain" class="cursor-pointer">
                      <VRow>
                        <VCol sm="4">
                          <VIcon
                            end
                            icon="fa-trash"
                            color="#E1442E"
                            size="15px"
                          />
                        </VCol>
                        <VCol>
                          <label class="cursor-pointer textRed">Hapus </label>
                        </VCol>
                      </VRow>
                    </Vbtn>
                  </VListItemTitle>
                </VListItem>
              </VList>
            </VMenu>
          </template>
          <template #item.actionPopOver3="{ item }">
            <VMenu>
              <template #activator="{ props }">
                <VBtn
                  v-bind="props"
                  append-icon="ri-more-2-line"
                  variant="plain"
                />
              </template>
              <VList>
                <VListItem class="p0">
                  <VListItemTitle>
                    <Vbtn
                      variant="plain"
                      class="cursor-pointer"
                      @click="() => props.onDetail(item)"
                    >
                      <VRow>
                        <VCol sm="4">
                          <VIcon end icon="ri-arrow-right-line" />
                        </VCol>
                        <VCol>
                          <label class="cursor-pointer">Detail </label>
                        </VCol>
                      </VRow>
                    </Vbtn>
                  </VListItemTitle>
                </VListItem>
                <VListItem class="p0">
                  <VListItemTitle>
                    <Vbtn
                      variant="plain"
                      class="cursor-pointer"
                      @click="() => props.onEdit(item)"
                    >
                      <VRow>
                        <VCol sm="4">
                          <VIcon end icon="ri-pencil-line" />
                        </VCol>
                        <VCol>
                          <label class="cursor-pointer">Ubah </label>
                        </VCol>
                      </VRow>
                    </Vbtn>
                  </VListItemTitle>
                </VListItem>
                <VListItem class="p0">
                  <VListItemTitle>
                    <Vbtn variant="plain" class="cursor-pointer">
                      <VRow>
                        <VCol sm="4">
                          <VIcon
                            end
                            icon="fa-trash"
                            color="#E1442E"
                            size="15px"
                          />
                        </VCol>
                        <VCol>
                          <label class="cursor-pointer textRed">Hapus </label>
                        </VCol>
                      </VRow>
                    </Vbtn>
                  </VListItemTitle>
                </VListItem>
              </VList>
            </VMenu>
          </template>
        </VDataTable>
      </VRow>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.required {
  color: red;
  font-size: 12px;
}
.p0 {
  padding-left: 2px !important;
}
.ml5 {
  margin-left: 5px;
}
.textRed {
  color: #e1442e;
}
.h-20 {
  height: 20px;
}
.mw30 {
  min-width: 20rem !important;
}
</style>
