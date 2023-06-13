<template>
  <div>
    <h1>Formula Page</h1>
  </div>
</template>

<script>
import { useFormulaStore } from "@/store/formulaStore";

export default {
  name: "formula-page",
  data() {
    return {
      items: []
    };
  },
  async mounted() {
    const store = useFormulaStore();
    await store.getFormulaPage().then(() => {
      console.log(store.formula_page);
    });
    this.items = store.formula_page;
  },

}

</script>
