<template>
  <section id="formula-list">
    <div class="formula-list">
      <div class="formula-list-item" v-for="formula in formulas" :key="formula.id">
        <formula-item :formula="formula" />
      </div>
    </div>
  </section>
</template>

<script>
import FormulaItem from "@/components/FormulaItem.vue";

export default {
  name: "formula-list",
  components: {
    FormulaItem,
  },
  props: {
    formulas: {
      required: true,
    },
  },
}

</script>
