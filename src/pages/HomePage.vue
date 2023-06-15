<template>
  <section id="home-page">
    <h1>Formula Page</h1>
    <formula-list :formulas="formulas" />
  </section>
</template>

<script>
import { useFormulaStore } from "@/store/formulaStore";
import FormulaList from "@/components/FormulaList.vue";

export default {
  name: "formula-page",
  components: {
    FormulaList,
  },
  data() {
    return {
      formulas: []
    };
  },
  async mounted() {
    const store = useFormulaStore();
    await store.getFormulaPage().then(() => {
      this.formulas = store.getterFormulaPage;
    });
  },

}

</script>

<style lang="scss" scoped>
</style>

