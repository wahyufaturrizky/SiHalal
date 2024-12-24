<script setup lang="ts">
const props = defineProps({
  onSubmit: {
    type: Function,
    default: () => { },
    required: false,
  },
  onAdd: {
    type: Function,
    default: () => { },
    required: false,
  },
  onEdit: {
    type: Function,
    default: () => { },
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
  withAddButton: {
    type: Boolean,
    required: true,
  },
  withApproveButton: {
    type: Boolean,
    required: true,
  },
})

const handleDownload = async (item: any) => {
  try {
    const response = await $api('/shln/submission/document/download', {
      method: 'post',
      body: {
        filename: item,
      },
    })

    if (response.url)
      window.open(response.url, '_blank', 'noopener,noreferrer')
  }
  catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <VCard class="pa-4">
    <VCardTitle>
      <div class="d-flex justify-space-between align-center">
        <span class="text-h5 font-weight-bold">{{ props.title }}</span>
        <div class="d-flex justify-space-between gap-4">
          <VBtn
            v-if="withAddButton"
            variant="outlined"
            append-icon="ri-add-line"
            @click="props.onAdd"
          >
            Tambah
          </VBtn>
          <!-- <VBtn
            variant="flat"
            @click="props.onSubmit"
          >
            {{ withApproveButton ? 'Saya Setuju' : 'Simpan' }}
          </VBtn> -->
        </div>
      </div>
    </VCardTitle>
    <VCardText>
      <div
        v-for="(item, index) in props.data"
        :key="index"
      >
        <VRow class="mt-2">
          <slot :name="`subTitle${index + 1}`" />
          <VDataTable
            class="border rounded"
            :items-per-page="-1"
            hide-default-footer=""
            :headers="item.label"
            :items="item.value"
          >
            <template #item.no="{ index }">
              <div>
                {{ index + 1 }}
              </div>
            </template>
            <template #item.productType="{ item }">
              <div>
                {{ item.productType }}
              </div>
            </template>
            <template #item.tanggal_masuk="{ item }">
              <div v-if="item.tanggal_masuk">
                {{ formatDateIntl(new Date(item.tanggal_masuk)) }}
              </div>
              <div v-else>
                -
              </div>
            </template>
            <template #item.tanggal_keluar="{ item }">
              <div v-if="item.tanggal_keluar">
                {{ formatDateIntl(new Date(item.tanggal_keluar)) }}
              </div>
              <div v-else>
                -
              </div>
            </template>
            <template #item.file_dok="{ item }">
              <Vbtn
                v-if="item.file_dok"
                class="d-flex gap-3 cursor-pointer"
                style="margin-left: -10px"
                @click="() => handleDownload(item.file_dok)"
              >
                <div>
                  <VIcon end icon="ri-file-3-line" color="#652672" />
                </div>
                <label class="cursor-pointer">file</label>
              </Vbtn>
              <div v-else>
                <label>-</label>
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
              <VCheckbox true-value="true" />
            </template>
            <template #item.action="{ item }">
              <DialogDeleteAuditPengajuan
                title="Hapus Bahan"
                button-text="Hapus"
              />
            </template>
            <template #item.actionEdit="{ item }">
              <Vbtn
                variant="plain"
                class="cursor-pointer"
                @click="() => props.onEdit(item, index)"
              >
                <VIcon
                  end
                  icon="ri-pencil-line"
                  color="#652672"
                />
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
                        @click="props.onEdit"
                      >
                        <VRow>
                          <VCol sm="4">
                            <VIcon
                              end
                              icon="ri-pencil-line"
                            />
                          </VCol>
                          <VCol>
                            <label class="cursor-pointer">Ubah
                            </label>
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
                      >
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
                            <label class="cursor-pointer textRed">Hapus
                            </label>
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
                        @click="props.onEdit"
                      >
                        <VRow>
                          <VCol sm="4">
                            <VIcon
                              end
                              icon="ri-arrow-right-line"
                            />
                          </VCol>
                          <VCol>
                            <label class="cursor-pointer">Detail
                            </label>
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
                        @click="props.onEdit"
                      >
                        <VRow>
                          <VCol sm="4">
                            <VIcon
                              end
                              icon="ri-pencil-line"
                            />
                          </VCol>
                          <VCol>
                            <label class="cursor-pointer">Ubah
                            </label>
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
                      >
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
                            <label class="cursor-pointer textRed">Hapus
                            </label>
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
      </div>
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
};
.ml5 {
  margin-left: 5px;
}
.textRed {
  color: #E1442E;
}
.h-20 {
  height: 20px;
}
.mw30 {
  min-width: 20rem !important;
}
</style>
