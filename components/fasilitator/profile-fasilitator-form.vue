<template>
  <VRow style="max-height: 40svh; overflow-y: scroll; box-shadow: inset">
    <VCol class="v-col-12">
      <VForm>
        <VRow>
          <VCol :cols="12">
            <VItemGroup>
              <VLabel text="Nama Fasilitator"></VLabel>
              <VTextField density="compact"></VTextField>
            </VItemGroup>
          </VCol>
        </VRow>
        <VRow>
          <VCol :cols="12">
            <VItemGroup>
              <VLabel text="Alamat"></VLabel>
              <VTextField density="compact"></VTextField>
            </VItemGroup>
          </VCol>
        </VRow>
        <VRow>
          <VCol :cols="12">
            <VItemGroup>
              <VLabel text="Jenis Fasilitator"></VLabel>
              <VSelect :items="['Perusahaan Swasta']" />
            </VItemGroup>
          </VCol>
        </VRow>
        <VRow>
          <VCol :cols="12">
            <VItemGroup>
              <VLabel text="Provinsi"></VLabel>
              <VSelect :items="['DKI Jakarta']" />
            </VItemGroup>
          </VCol>
        </VRow>
        <VRow>
          <VCol :cols="12">
            <VItemGroup>
              <VLabel text="Kabupaten/Kota"></VLabel>
              <VSelect :items="['Jakarta Selatan']" />
            </VItemGroup>
          </VCol>
        </VRow>
        <VRow>
          <VCol :cols="12">
            <VItemGroup>
              <VLabel text="Kecamatan"></VLabel>
              <VSelect :items="['Tebet']" />
            </VItemGroup>
          </VCol>
        </VRow>
        <VRow>
          <VCol :cols="12">
            <VItemGroup>
              <VLabel text="Kodepos"></VLabel>
              <VTextField density="compact"></VTextField>
            </VItemGroup>
          </VCol>
        </VRow>
        <VRow>
          <VCol :cols="12">
            <VItemGroup>
              <VLabel text="Email"></VLabel>
              <VTextField density="compact"></VTextField>
            </VItemGroup>
          </VCol>
        </VRow>
      </VForm>
    </VCol>
  </VRow>
</template>
