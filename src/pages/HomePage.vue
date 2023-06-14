<template>
  <div>
    <h1>Formula Page</h1>
    {{ items }}
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
      this.items = store.getterFormulaPage;
    });
  },

}

</script>
