<template>
  <div class="formula">
    <img class="formula-bg" src="@/assets/background/formula-bg.png">
    <div class="content">
      <h1>{{ formula.name }}</h1>
      <img class="main-image" :src="formula.image_link" alt="formula image" />
      <div class="row difficulty">
        <p>Сложность: </p>
        <star-rating :star-size="20" :show-rating="false" :read-only="true" :rating="formula.difficulty"
          :active-color="['#a1eb34', '#ebd934', '#eb9f34', '#eb5f34', '#eb3d34']" :active-border-color="['#a8c3c0']"
          :border-width="4"
          :star-points="[23, 2, 14, 17, 0, 19, 10, 34, 7, 50, 23, 43, 38, 50, 36, 34, 46, 19, 31, 17]" />
      </div>

      <div class="formula-aspects" v-for="stroke in formula.aspects" :key="stroke.id">
        <div class="formula-aspect">
          <p>{{ stroke.aspect }}, </p>
        </div>
      </div>
      <p class="formula-description">{{ formula.description }}</p>
      <p>{{ formula.category }}</p>
      <p>{{ formula.kitchen }}</p>
      <p>{{ formula.author.displayName }}</p>
      <p>{{ formula.date }}</p>
    </div>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating';

export default {
  name: "formula-item",
  components: {
    StarRating,
  },
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

.formula {
  @include adaptiv-font(20, 12);
  @include adaptiv-width(400, 300);
  @include adaptiv-height(700, 400);
  z-index: 100;
  position: relative;
}

.formula-bg {
  @include adaptiv-width(400, 300);
  @include adaptiv-height(700, 400);
  z-index: -1;
  position: absolute;
}

.content {
  margin: 0 auto;
  margin-top: 18%;
  padding: 0 7% 0 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Caveat', cursive;
  position: relative;
  width: 100%;

  h1 {
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    @include adaptiv-font(30, 20);
  }

  .row {
    position: absolute;
    @include adaptiv-font(20, 12);
  }

  .difficulty {
    @include adaptiv-absolute-top(400, 300);
    @include adaptiv-absolute-left(40, 20);
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 80%;

  }
}



.main-image {
  width: 100%;
  height: 35%;
  object-fit: cover;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
