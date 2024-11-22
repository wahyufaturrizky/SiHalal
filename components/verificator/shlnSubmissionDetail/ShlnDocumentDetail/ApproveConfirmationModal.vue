<template>
  <VDialog>
    <template #activator="{ props: openModal }">
      <VBtn
        v-bind="openModal"
        color="#49a84c"
        density="compact"
        variant="outlined"
        >Approve</VBtn
      >
    </template>
    <template #default="{ isActive }">
      <VCard max-width="50svw">
        <VCardTitle>
          <VRow>
            <VCol cols="10"><h3>Approve Confirmation</h3></VCol>
            <VCol cols="2" style="display: flex; justify-content: end">
              <VIcon
                size="small"
                icon="fa-times"
                @click="isActive.value = false"
              ></VIcon>
            </VCol>
          </VRow>
        </VCardTitle>
        <VCardText>
          <VRow>
            <VCol cols="12">
              <VTable>
                <thead>
                  <tr>
                    <th>Tanggal</th>
                    <th>Catatan</th>
                    <th>Verifikator</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>18/10/2024, 09:00:00 AM</td>
                    <td></td>
                    <td>JoeyHLN</td>
                  </tr>
                </tbody>
              </VTable>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12">
              <p><b>Are you sure you want to approve this submission?</b></p>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12">
              <VTextarea placeholder="Input Additional Notes"></VTextarea>
            </VCol>
          </VRow>
        </VCardText>
        <VCardActions>
          <VBtn variant="outlined" @click="isActive.value = false">Cancel</VBtn>
          <VBtn variant="elevated">Save Notes</VBtn>
          <VBtn color="#49A84C" variant="elevated">Approve</VBtn>
        </VCardActions>
      </VCard>
    </template>
  </VDialog>
</template>
