<script setup lang="ts">
import { PerfectScrollbar } from "vue3-perfect-scrollbar";

const ability = useAbility();

// TODO: Get type from backend
const { data: userData, signOut } = useAuth();

async function logout() {
  try {
    await signOut({ redirect: false });
    useMyAuthUserStore().resetUser();

    navigateTo({ name: "login" });
  } catch (error) {
    throw createError(error);
  }
}
const userRoleArr = userData.value?.roles;
const isFatwaCommission = computed(() => {
  const existData = userRoleArr?.filter((item: any) => {
    return item.code === "R.6";
  });

  return existData && existData.length > 0;
});

const userProfileList = [
  { type: "divider" },
  // {
  //   type: 'navItem',
  //   icon: 'ri-user-line',
  //   title: 'Profile',
  //   to: { name: 'apps-user-view-id', params: { id: 21 } },
  // },
  // {
  //   type: 'navItem',
  //   icon: 'ri-settings-4-line',
  //   title: 'Settings',
  //   to: { name: 'pages-account-settings-tab', params: { tab: 'account' } },
  // },
  // {
  //   type: 'navItem',
  //   icon: 'ri-file-text-line',
  //   title: 'Billing Plan',
  //   to: { name: 'pages-account-settings-tab', params: { tab: 'billing-plans' } },
  //   chipsProps: { color: 'error', text: '4', size: 'small' },
  // },
];
</script>

<template>
  <VBadge
    v-if="userData"
    dot
    bordered
    location="bottom right"
    offset-x="2"
    offset-y="2"
    color="success"
    class="user-profile-badge"
  >
    <VAvatar
      class="cursor-pointer"
      size="42"
      :color="'secondary'"
      :variant="'tonal'"
    >
      <!-- <VImg v-if="userData && userData.avatar" :src="userData.avatar" /> -->
      <VIcon icon="fa-user" />

      <!-- SECTION Menu -->
      <VMenu activator="parent" width="270" location="bottom end" offset="15px">
        <VList>
          <PerfectScrollbar :options="{ wheelPropagation: false }">
            <VListItem>
              <div class="d-flex gap-x-2 align-center">
                <VAvatar variant="tonal" color="secondary">
                  <VIcon icon="fa-user" />
                </VAvatar>

                <div>
                  <div class="text-h5 font-weight-medium">
                    {{ userData.name }}
                  </div>
                  <div class="text-caption text-disabled">
                    {{ userData.email }}
                  </div>
                </div>
              </div>
            </VListItem>
            <VListItem>
              <div class="d-flex gap-x-2 align-center">
                <VAvatar variant="tonal" color="secondary">
                  <VIcon icon="fa-shield" />
                </VAvatar>

                <div>
                  <div class="text-caption text-disabled">Role:</div>
                  <div class="text-h5 font-weight-medium">
                    {{ userData.roles[0].name }}
                  </div>
                </div>
              </div>
            </VListItem>
            <VListItem class="px-4">
              <VBtn
                block
                color="error"
                size="large"
                append-icon="ri-logout-box-r-line"
                @click="logout"
              >
                Keluar
              </VBtn>
            </VListItem>
          </PerfectScrollbar>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
</template>

<style lang="scss">
.user-profile-badge {
  &.v-badge--bordered.v-badge--dot .v-badge__badge::after {
    color: rgb(var(--v-theme-background));
  }
}
</style>
