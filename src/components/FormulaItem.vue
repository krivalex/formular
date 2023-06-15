<template>
  <div class="formula">
    <h1>{{ formula.name }}</h1>
    <img :src="formula.image_link" alt="formula image" />
    <p>Difficult: {{ formula.difficult }}</p>
    <div class="formula-aspects" v-for="stroke in formula.strokes" :key="stroke.id">
      <div class="formula-aspect">
        <p>{{ stroke.stroke }}</p>
        <p>{{ stroke.aspect }}</p>
        <p>{{ stroke.count }}</p>
        <p>{{ stroke.unit }}</p>
      </div>
    </div>
    <p class="formula-description">{{ formula.description }}</p>
    <p>{{ formula.category }}</p>
    <p>{{ formula.kitchen }}</p>
    <p>{{ formula.author }}</p>
    <p>{{ formula.date }}</p>

  </div>
</template>

<script>
export default {
  name: "formula-item",
  props: {
    formula: {
      type: Object,
      required: true,
    },
  },
  created() {
    console.log(this.formula);
  },
}


</script>

<style lang="scss">
$maxWidth: 1280;

@mixin adaptiv-font($pcSize, $mobSize) {
  $addSize: $pcSize - $mobSize;
  $maxWidth: $maxWidth - 320;
  font-size: calc(#{$mobSize + px} + #{$addSize} * ((100vw - 320px) / #{$maxWidth}));
}

@mixin adaptiv-margin($pcSize, $mobSize) {
  $addSize: $pcSize - $mobSize;
  $maxWidth: $maxWidth - 320;
  margin: calc(#{$mobSize + px} + #{$addSize} * ((100vw - 320px) / #{$maxWidth}));
}

@mixin adaptiv-padding($pcSize, $mobSize) {
  $addSize: $pcSize - $mobSize;
  $maxWidth: $maxWidth - 320;
  padding: calc(#{$mobSize + px} + #{$addSize} * ((100vw - 320px) / #{$maxWidth}));
}

.formula {
  @include adaptiv-font(20, 12);
}
</style>
