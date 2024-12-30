<template>
  <VForm>
    <VRow>
      <VCol>
        <VTextField label="Nama Peran" />
      </VCol>
    </VRow>
    <VRow>
      <VCol>
        <VTextField label="Keterangan" />
      </VCol>
    </VRow>
    <VRow>
      <VCol>
        <div>
          <MultiCheckboxGroup />
        </div>
      </VCol>
    </VRow>
    <div class="d-flex justify-end flex-wrap gap-4">
      <VBtn
        color="secondary"
        variant="outlined"
        @click="resetAuthCode"
      >
        Cancel
      </VBtn>

      <VBtn
        color="primary"
        type="submit"
        @click="formSubmit"
      >
        Submit
      </VBtn>
    </div>
  </VForm>
</template>
