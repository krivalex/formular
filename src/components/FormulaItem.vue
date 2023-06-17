<template>
  <div class="formula-css">
    <img class="pin" src="@/assets/pin.png">
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

      <div v-for="aspect in formula.aspects" :key="aspect.stroke" class="row">
        <p class="stroke">{{ aspect.stroke }}</p>
        <p class="stroke">{{ aspect.name }}</p>
        <div class="divider"></div>
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

<style lang="scss" scoped>
@import "@/assets/style.scss";

.formula-css {
  @include adaptiv-font(20, 12);
  @include adaptiv-width(400, 300);
  @include adaptiv-height(500, 400);
  z-index: 100;
  position: relative;
  background-color: #f1f7c1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  margin-top: 50px;
  border: 15px solid #502d16;
  border-top: none;
  border-bottom-left-radius: 10%;
  border-bottom-right-radius: 10%;
  box-shadow: 5px 2px 0px 1px #0a0a0a;

  .divider {
    @include adaptiv-width(320, 250);
    height: 2px;
    background-color: black;
  }

  .main-image {
    @include adaptiv-width(320, 250);
    @include adaptiv-height(220, 250);
    object-fit: cover;
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 20px;
  }
}

.pin {
  width: 50px;
  height: 50px;
  position: absolute;
  top: -20px;
  right: 10px;
  animation: pin 1s infinite;
}

@keyframes pin {
  0% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(10deg);
  }

  100% {
    transform: rotate(0deg);
  }
}
</style>
