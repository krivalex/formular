<template>
  <MainNavbar />
  <router-view>
  </router-view>
</template>

<script>
import MainNavbar from '@/components/layouts/MainNavbar.vue'
export default {
  name: 'App',
  components: {
    MainNavbar
  }
}
</script>

<style>
</style>
