<template>
  <author-item v-if="formula.author !== null" :author="formula.author" />
  <author-item v-else :author="null_user" />
  <div class="formula-css">
    <img class="texture" src="@/assets/background/paper-text.jpg">
    <div class="content">

      <h1>{{ formula.name }}</h1>

      <img class="main-image" :src="formula.image_link" alt="formula image" />

      <p class="formula-description">{{ formula.description }}</p>

      <div v-for="aspect in formula.aspects" :key="aspect.stroke" class="row">
        <div class="strokes">
          <p class="stroke">{{ aspect.stroke }}. {{ aspect.aspect }}</p>
          <p class="stroke">{{ aspect.count }} {{ unit_ultra_computed(aspect.unit, aspect.count) }}</p>
        </div>
        <div class="divider"></div>
      </div>

      <div class="category-kitchen">
        <p>{{ formula.category }}</p>
        <p>{{ formula.kitchen }}</p>
      </div>

      <div class="flex-row diffuculty-date">
        <div class="difficulty">
          <div class="difficulty-text">
            <p>{{ diffucult_preview }}</p>
          </div>
          <star-rating :star-size="15" :show-rating="false" :read-only="true" :rating="formula.difficulty"
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
  methods: {
    unit_ultra_computed(unit, count) {
      let current_unit = unit;
      let current_count = String(count);
      let lastDigit = current_count[current_count.length - 1];

      if (["2", "3", "4"].includes(lastDigit)) {
        console.log('2, 3, 4');
        current_unit = current_unit + 'а';
        return current_unit;
      } else if (["5", "6", "7", "8", "9", "0"].includes(lastDigit)) {
        console.log('5, 6, 7, 8, 9, 0');
        current_unit = current_unit + 'ов';
        return current_unit;
      } else {
        if (["грамм", "миллилитр", "килограмм", "литр"].includes(current_unit)) {
          return current_unit;
        } else {
          current_unit = current_unit + 'а';
          return current_unit;
        }
      }
    },
  },
  computed: {
    dateFormatter() {
      const date = this.formula.date;
      const year = Number(date.slice(0, 4));
      const month = Number(date.slice(5, 7)) - 1;
      const day = Number(date.slice(8, 10));

      const result_date = new Date(year, month, day);

      const formatter = new Intl.DateTimeFormat("ru", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });

      return formatter.format(result_date);
    },
    null_user() {
      return {
        displayName: "Автор неизвестен",
        createdAt: "Нет",
      }
    },
    diffucult_preview() {
      switch (this.formula.difficulty) {
        case 0:
          return "«Сложность не указана»";
        case 1:
          return "«Справиться каждый»";
        case 2:
          return "«Минимальные навыки готовки»";
        case 3:
          return "«Придется поторчать на кухне»";
        case 4:
          return "«Придется сходить в магазин, и постараться»";
        case 5:
          return "«Только для опытных поваров»";
        default:
          return "«Сложность не указана»";
      }
    },
  }
};


</script>

<style lang="scss" scoped>
@import "@/assets/style.scss";

.formula-css {
  @include adaptiv-font(18, 12);
  @include adaptiv-width(400, 300);
  @include adaptiv-height(550, 450);
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
  font-family: 'Caveat', cursive;

  .content {
    height: 100%;
    position: relative;

    h1 {
      text-align: center;
      font-family: 'Ubuntu', sans-serif;
      margin: 5% 0;
      @include adaptiv-font(30, 20);
    }

    .formula-description {
      @include adaptiv-font(20, 14);
      margin: 0 5%;
      text-align: justify;
      text-indent: 1.5em;
    }

    .category-kitchen {
      display: flex;
      width: 100%;
      justify-content: space-between;
      padding: 0 5%;
      font-family: 'Ubuntu', sans-serif;
      margin-top: 10px;
      margin-bottom: 50px;

      p {
        @include adaptiv-font(17, 14);
        border: 2px solid black;
        font-style: italic;
        padding: 5px;
        cursor: pointer;
      }
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

}

.strokes {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0 10px;

  .stroke {
    display: flex;
    justify-content: space-between;
  }
}

.diffuculty-date {
  justify-content: space-evenly;
  position: absolute;
  bottom: 0;

  .difficulty {

    min-width: 60%;

    .difficulty-text {

      p {
        max-width: 80%;
        font-family: 'Ubuntu Condensed', sans-serif;
        @include adaptiv-font(14, 10);
        white-space: nowrap;
        margin-bottom: 5px;

      }
    }
  }

  p {
    min-width: 40%;
  }
}
</style>
