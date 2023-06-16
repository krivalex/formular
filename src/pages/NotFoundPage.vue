<template>
  <div class="formula-css">

  </div>
</template>

<script>

export default {
  name: "formula-css",
  components: {
  },
  props: {
  },
  data() {
    return {
    }
  },
  methods: {
  },
  computed: {
  },
  created() {
  },
  mounted() {
  },

}


</script>


<style lang="scss" scoped>
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

@mixin adaptiv-width($pcSize, $mobSize) {
  $addSize: $pcSize - $mobSize;
  $maxWidth: $maxWidth - 320;
  width: calc(#{$mobSize + px} + #{$addSize} * ((100vw - 320px) / #{$maxWidth}));
}

@mixin adaptiv-height($pcSize, $mobSize) {
  $addSize: $pcSize - $mobSize;
  $maxWidth: $maxWidth - 320;
  height: calc(#{$mobSize + px} + #{$addSize} * ((100vw - 320px) / #{$maxWidth}));
}

@mixin adaptiv-absolute-top($pcSize, $mobSize) {
  $addSize: $pcSize - $mobSize;
  $maxWidth: $maxWidth - 320;
  top: calc(#{$mobSize + px} + #{$addSize} * ((100vw - 320px) / #{$maxWidth}));
}

@mixin adaptiv-absolute-left($pcSize, $mobSize) {
  $addSize: $pcSize - $mobSize;
  $maxWidth: $maxWidth - 320;
  left: calc(#{$mobSize + px} + #{$addSize} * ((100vw - 320px) / #{$maxWidth}));
}

.formula-css {
  @include adaptiv-font(20, 12);
  @include adaptiv-width(400, 300);
  @include adaptiv-height(700, 400);
  z-index: 100;
  position: relative;
  background-color: #f1f7c1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}
</style>
