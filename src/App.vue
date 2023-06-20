<template>
  <MainNavbar />
  <BG>
    <router-view>
    </router-view>
  </BG>
  <AddFormulaButton />
  <div class="krivalex">@krivalex</div>
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

<style lang="scss" scoped>
@import "@/assets/style.scss";

.krivalex {
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 10px;
  @include adaptiv-font(15, 12);
  color: #fff;
  z-index: 500;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif
}
</style>
