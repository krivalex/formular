<template>
  <MainNavbar />
  <BG>
    <router-view>
    </router-view>
  </BG>
  <AddFormulaButton />
</template>

<script>
import MainNavbar from '@/components/layouts/MainNavbar.vue'
import AddFormulaButton from './components/AddFormulaButton.vue';
import BG from './pages/BG.vue';

export default {
  name: 'App',
  components: {
    MainNavbar,
    AddFormulaButton,
    BG
  }
}
</script>
