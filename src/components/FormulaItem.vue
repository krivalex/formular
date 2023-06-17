<template>
  <author-item :author="formula.author" />
  <div class="formula-css">
    <img class="texture" src="@/assets/background/paper-text.jpg">
    <div class="content">

      <h1>{{ formula.name }}</h1>

      <img class="main-image" :src="formula.image_link" alt="formula image" />

      <div v-for="aspect in formula.aspects" :key="aspect.stroke" class="row">
        <div class="strokes">
          <p class="stroke">{{ aspect.stroke }}. {{ aspect.aspect }}</p>
          <p class="stroke">{{ aspect.count }} {{ aspect.unit }}</p>
        </div>
        <div class="divider"></div>
      </div>

      <p class="formula-description">{{ formula.description }}</p>

      <div class="category-kitchen">
        <p>{{ formula.category }}</p>
        <p>{{ formula.kitchen }}</p>
      </div>

      <div class="diffuculty-date">
        <div class="difficulty">
          <star-rating :star-size="20" :show-rating="false" :read-only="true" :rating="formula.difficulty"
            :active-color="['#a1eb34', '#ebd934', '#eb9f34', '#eb5f34', '#eb3d34']" :active-border-color="['#a8c3c0']"
            :border-width="4"
            :star-points="[23, 2, 14, 17, 0, 19, 10, 34, 7, 50, 23, 43, 38, 50, 36, 34, 46, 19, 31, 17]" />
        </div>
        <p>{{ dateFormatter }}</p>
      </div>

    </div>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating';
import AuthorItem from './AuthorItem.vue';

export default {
  name: "formula-item",
  components: {
    StarRating,
    AuthorItem,
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
  computed: {
    dateFormatter() {
      const date = this.formula.date
      let result_date = new Date(date.slice(0, 4), Number(date.slice(5, 7)) - 1, date.slice(8, 10));
      let formatter = new Intl.DateTimeFormat("ru", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
      return formatter.format(result_date);
    },
  }
}


</script>

<style lang="scss" scoped>
@import "@/assets/style.scss";

.formula-css {
  @include adaptiv-font(18, 12);
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
  border: 15px solid #502d16;
  border-top: none;
  border-bottom-left-radius: 10%;
  border-bottom-right-radius: 10%;
  box-shadow: 5px 2px 0px 1px #0a0a0a;

  .author-title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;

    h1 {
      @include adaptiv-font(24, 16);
      font-weight: 700;
      margin: 0;
    }
  }

  .divider {
    height: 2px;
    background-color: black;
  }

  .main-image {
    @include adaptiv-width(340, 240);
    @include adaptiv-height(150, 80);
    object-fit: cover;
    margin: 0 auto;
    border: 2px solid #502d16;
    box-shadow: 3px 2px 0px 1px #0a0a0a;
  }

  .texture {
    width: 100%;
    height: 100%;
    border-bottom-left-radius: 10%;
    border-bottom-right-radius: 10%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    opacity: 0.4;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background-color: gray;
    outline: 4px dashed gray;
    margin: 0 auto;
    box-shadow: 0px 0px 0px 1px #0a0a0a;
  }
}

.strokes {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 0 auto;
  padding: 0 10px;

  .stroke {
    display: flex;
    justify-content: space-between;
  }
}
</style>
