<template>
  <section id="formula-list">
    <div class="formula-list-item" v-for="formula in formulas" :key="formula.id">
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
$maxWidth: 1280;

@mixin adaptiv-width($pcSize, $mobSize) {
  $addSize: $pcSize - $mobSize;
  $maxWidth: $maxWidth - 320;
  max-width: calc(#{$mobSize + px} + #{$addSize} * ((100vw - 320px) / #{$maxWidth}));
}

@mixin adaptiv-height($pcSize, $mobSize) {
  $addSize: $pcSize - $mobSize;
  $maxWidth: $maxWidth - 320;
  min-height: calc(#{$mobSize + px} + #{$addSize} * ((100vw - 320px) / #{$maxWidth}));
}

@mixin adaptiv-gap($pcSize, $mobSize) {
  $addSize: $pcSize - $mobSize;
  $maxWidth: $maxWidth - 320;
  gap: calc(#{$mobSize + px} + #{$addSize} * ((100vw - 320px) / #{$maxWidth}));
}

#formula-list {
  display: flex;
  @include adaptiv-gap(80, 30);
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

}

.formula-list-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @include adaptiv-width(450, 300);
  @include adaptiv-height(700, 400);
}
</style>
