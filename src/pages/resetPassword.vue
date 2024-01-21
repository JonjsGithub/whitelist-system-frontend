<template>
    <PasswordReset v-if="ok" :vcode="vcode" />
</template>

<script setup>

import { ref } from 'vue'

import { useRouter } from 'vue-router'

import PasswordReset from '~/components/user/dashboard/account/PasswordReset.vue'


const router = useRouter()
const route = router.currentRoute.value

const ok = ref(false)
const vcode = ref("")
vcode.value = route.params.vcode
ok.value = ref(true)

</script>

<style scoped>

</style>

