<template>
  <VRow class="px-2 py-1 bg-white">
    <VCol cols="12" class="d-flex justify-end">
      <VMenu>
        <template #activator="{ props }">
          <VBtn
            color="secondary"
            size="small"
            variant="outlined"
            v-bind="props"
          >
            <VIcon start icon="fa-solid fa-question-circle" />
            Butuh Bantuan ?
            <VIcon end icon="mdi-chevron-down" />
          </VBtn>
        </template>

        <v-list>
          <v-list-item
            value="whatsapp"
            color="primary"
            href="https://wa.me/081180103146"
            target="-blank"
          >
            <template v-slot:prepend>
              <v-icon icon="fa-whatsapp" color="success"></v-icon>
            </template>
            <v-list-item-title class="text-success">Whatsapp</v-list-item-title>
          </v-list-item>
          <v-list-item
            value="email"
            color="primary"
            href="mailto:layanan@halal.go.id"
            target="-blank"
          >
            <template v-slot:prepend>
              <v-icon icon="fa-envelope"></v-icon>
            </template>
            <v-list-item-title>Email</v-list-item-title>
          </v-list-item>
          <v-list-item
            value="telepon"
            color="primary"
            href="tel:147"
            target="-blank"
          >
            <template v-slot:prepend>
              <v-icon icon="fa-phone"></v-icon>
            </template>
            <v-list-item-title>Telepon</v-list-item-title>
          </v-list-item>
        </v-list>
      </VMenu>
    </VCol>
  </VRow>
</template>

<script lang="ts" setup></script>

<style></style>
