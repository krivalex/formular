<template>
  <section id="formula-list">
    <div :key="formula.id" class="formula-list-item" v-for="formula in formulas">
      <formula-item :formula="formula" />
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

<style lang="scss" scoped>
@import "@/assets/style.scss";

#formula-list {
  display: flex;
  @include adaptiv-gap(50, 30);
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  @include adaptiv-margin-top(100, 50);

}

.formula-list-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.destoyed-enter-active,
.destoyed-leave-active {
  transition: opacity 0.5s;
  transform: rotate3d(1, 0, 0, 0deg);
  transition: transform 0.3s ease-in-out;
}

.destoyed-enter-from,
.destoyed-leave-to {
  opacity: 0;
  transform: rotate3d(1, 0, 0, 180deg);
}
</style>
