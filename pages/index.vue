<script lang="ts" setup>
import InformationLoginPopUp from '@/components/halalCommon/InformationLoginPopUp.vue'

const sessionData = await useMyAuthUserStore().getSession()
const loading = ref(false)
const listAnnouncement = ref<any>([])
const store = pelakuUsahaProfile()
const { setLocale } = useI18n()

const getAnnouncementList = async (id: any) => {
  try {
    const response: any = await $api('/admin/users/announcement', {
      method: 'get',
      query: {
        id,
      },
    } as any)

    if (response.code === 2000) {
      listAnnouncement.value = response.data
    }
  }
  catch (error) {
    console.error(error)
  }
}

const handleLoadUserDetail = async () => {
  try {
    const response: any = await $api('/admin/users/detail', {
      method: 'get',
      query: {
        user_id: sessionData?.value?.id,
      },
    } as any)

    if (response.code === 2000)
      response.data.roles.map((el: any) => getAnnouncementList(el.id))
  }
  catch (error) {
    console.error(error)
  }
}
onMounted(async () => {
  loading.value = true
  handleLoadUserDetail()
  loading.value = false
})

definePageMeta({
  action: 'manage',
  subject: ['Pelaku Usaha'],
})

onMounted(async () => {
  const userRole = sessionData?.value?.roles?.[0]?.name
  const asalUsaha = localStorage.getItem('asalUsaha')
  if (userRole === 'Pelaku Usaha' && !asalUsaha) {
    await store.fetchProfile(null)

    const fetchedAsalUsaha = store?.profileData?.asal_usaha

    localStorage.setItem('asalUsaha', fetchedAsalUsaha)
    if (fetchedAsalUsaha === 'Luar Negeri')
      setLocale('en')
  }
})
</script>

<template>
  <InformationLoginPopUp v-if="listAnnouncement.length != 0" :data="listAnnouncement" />
</template>
