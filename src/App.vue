<template>
  <MainNavbar />
  <router-view>
  </router-view>
  <AddFormulaButton />
</template>

<script>
import MainNavbar from '@/components/layouts/MainNavbar.vue'
import AddFormulaButton from './components/AddFormulaButton.vue';
export default {
  name: 'App',
  components: {
    MainNavbar,
    AddFormulaButton
  }
}
</script>
