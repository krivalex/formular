<template>
  <div class="button-add" @click="openModal">
    <i class="fa fa-plus" aria-hidden="true"></i>

    <my-modal :show="showModal" @:update:model="openModal" class="content-modal">

      <div class="paper">

        <h1 class="label">Добавить новый рецепт</h1>

        <input v-model="name" @input="nameInput" type="text" class="name" placeholder="Название рецепта" />

        <div class="label-small">
          <span>Как приготовить?</span>
        </div>

        <textarea v-model="description" @input="descriptionInput" class="textarea"
          placeholder="Краткое описание"></textarea>

        <input v-model="link" @input="linkInput" type="text" class="input" placeholder="Ссылка на исходник" />

        <div class="label-small">
          <span>Категории</span>
        </div>

        <v-select v-model="reactive_category" :reduce="(option) => option.value" :options="category_options"
          placeholder="Выберите категорию блюда" />

        <v-select v-model="reactive_kitchen" :reduce="(option) => option.value" :options="kitchen_options"
          placeholder="Выберите кухню" />

        <div class="label-small">
          <span>Ингредиенты</span>
        </div>

        <div v-for="stroke in reactiveStrokes" :key="stroke.id" class="all-aspects">
          <one-stroke :refresh="refresh" v-model:stroke="stroke.id"
            @:update:stroke="this.$emit('update:stroke', stroke.id)" />
        </div>

        <div class="stroke-actions">

          <div class="hand-item">
            <div class="spooky"></div>
            <div class="border"></div>
            <button class="button add-row" @click="addRow">
              Добавить еще один
              <i class="fa fa-plus" aria-hidden="true"></i>
            </button>
          </div>
        </div>


        <div class="label-small">
          <span>Сложность готовки</span>
        </div>

        <star-rating v-model:rating="difficult" :animate="true" :show-rating="false" :star-size="25"
          :active-color="['#a1eb34', '#ebd934', '#eb9f34', '#eb5f34', '#eb3d34']" :active-border-color="['#a8c3c0']"
          :border-width="4" :star-points="[23, 2, 14, 17, 0, 19, 10, 34, 7, 50, 23, 43, 38, 50, 36, 34, 46, 19, 31, 17]"
          :active-on-click="true" :clearable="true" :padding="3"></star-rating>


        <form class="input__wrapper" enctype="multipart/form-data">
          <my-input id="input__file" class="input input__file" name="images" type="file" accept=".jpg, .png"
            @input="imagesInput"></my-input>
          <label for="input__file" class="input__file-button">
            <span class="input__file-icon-wrapper">
              <img class="input__file-icon" src="@/assets/camera-icon.svg" alt="Выбрать файл" width="25">
            </span>
            <span class="input__file-button-text">Фото блюда</span>
          </label>
        </form>



        <div class="final-actions">
          <button @click="addFormula" class="button is-primary">Добавить</button>
          <button @click="clearFormula" class="button is-danger">Отмена</button>
        </div>

      </div>

    </my-modal>
  </div>
</template>

<script>
import MyModal from '@/components/UI/MyModal.vue';
import OneStroke from '@/components/OneStroke.vue';
import { useCreatedFormulaStore } from '@/store/createdFormulaStore';
import StarRating from 'vue-star-rating';
import { watch } from 'vue';
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  name: "add-formula-button",
  components: {
    MyModal,
    OneStroke,
    StarRating,
    vSelect,
  },
  emits: ["update:show", "update:stroke"],
  updated() {
    this.strokes = this.reactiveStrokes;
  },
  data() {
    return {
      showModal: false,
      name: "",
      image: "",
      link: "",
      difficult: 0,
      description: "",
      refresh: false,
      strokes: [
        {
          id: 1,
        },
      ],
    };
  },
  methods: {
    nameInput(event) {
      this.name = event.target.value;
      const Fstore = useCreatedFormulaStore();
      Fstore.setFormulaName(this.name);
    },
    descriptionInput(event) {
      this.description = event.target.value;
      const Fstore = useCreatedFormulaStore();
      Fstore.setFormulaDescription(this.description);
    },
    linkInput(event) {
      this.link = event.target.value;
      const Fstore = useCreatedFormulaStore();
      Fstore.setFormulaLink(this.link);
    },
    openModal() {
      this.showModal = !this.showModal;
      this.$emit("update:show", true);
    },
    addRow() {
      this.strokes.push({
        id: this.strokes.length + 1,
      });
    },
    async imagesInput(e) {
      const Fstore = useCreatedFormulaStore();
      this.image = e.target.files[0];
      await Fstore.setFormulaImage(this.image);
    },
    async addFormula() {
      const Fstore = useCreatedFormulaStore();
      await Fstore.addFormula();

      const container = document.querySelector('.paper');
      container.classList.add('animate-paper-up');
      container.scrollTop = 0;

      setTimeout(() => {
        const store = useCreatedFormulaStore();

        store.clearFormula();

        this.name = "";
        this.image = "";
        this.difficult = 0;
        this.link = "";
        this.description = "";
        this.refresh = true;
        this.strokes = [
          {
            id: 1,
          },
        ];


        setTimeout(() => {
          container.classList.remove('animate-paper-up');
        }, 3000);
      }, 2000);
    },
    clearFormula() {
      const container = document.querySelector('.paper');
      container.classList.add('animate-paper');
      container.scrollTop = 0;

      setTimeout(() => {
        const store = useCreatedFormulaStore();

        store.clearFormula();

        this.name = "";
        this.image = "";
        this.difficult = 0;
        this.link = "";
        this.description = "";
        this.refresh = true;
        this.strokes = [
          {
            id: 1,
          },
        ];


        setTimeout(() => {
          container.classList.remove('animate-paper');
          this.refresh = false;
        }, 3000);
      }, 2000);
    }
  },
  created() {
    watch(
      [() => this.difficult],
      ([newRatingValue]) => {
        if (newRatingValue !== 0) {
          const store = useCreatedFormulaStore();
          store.setFormulaDifficulty(newRatingValue);
        }
      },
      { immediate: true }
    );
  },
  computed: {
    reactiveStrokes() {
      this.strokes.forEach((stroke) => {
        if (stroke.id === null) {
          this.strokes.splice(this.strokes.indexOf(stroke), 1);
        }
      });

      let start_id = 1;
      this.strokes.forEach((stroke) => {
        stroke.id = start_id;
        start_id++;
      });
      return this.strokes;
    },
    reactive_category: {
      get() {
        const store = useCreatedFormulaStore();
        return store.formula.category;
      },
      set(value) {
        const store = useCreatedFormulaStore();
        store.setFormulaCategory(value);
      },
    },
    reactive_kitchen: {
      get() {
        const store = useCreatedFormulaStore();
        return store.formula.kitchen;
      },
      set(value) {
        const store = useCreatedFormulaStore();
        store.setFormulaKitchen(value);
      },
    },
  },
  setup() {
    return {
      category_options: [
        { label: "супы", value: "супы🍲" },
        { label: "завтраки", value: "завтраки🍳" },
        { label: "основные блюда", value: "основные блюда🥩" },
        { label: "выпечка и десерты", value: "выпечка и десерты🍰" },
        { label: "салаты", value: "салаты🥗" },
        { label: "закуски", value: "закуски🍢" },
        { label: "сэндвичи", value: "сэндвичи🥪" },
        { label: "алкогольные напитки", value: "алкогольные напитки🍾" },
        { label: "напитки", value: "напитки☕" },
      ],
      kitchen_options: [
        { label: "русская кухня", value: "русская кухня" },
        { label: "американская кухня", value: "американская кухня" },
        { label: "казахская кухня", value: "казахская кухня" },
        { label: "уйгурская кухня", value: "уйгурская кухня" },
        { label: "итальянская кухня", value: "итальянская кухня" },
        { label: "английская кухня", value: "английская кухня" },
        { label: "грузинская кухня", value: "грузинская кухня" },
      ]
    }
  }

}

</script>

<style lang="scss" scoped>
@import "@/assets/style.scss";

.paper {
  background-color: white;
  padding: 17px 30px;
}

.animate-paper {
  animation: fold-paper 4s forwards;
}

.animate-paper-up {
  animation: fold-paper-up 4s forwards;
}

@keyframes fold-paper {
  0% {
    transform: perspective(1000px) skewX(0deg) skewY(0deg) rotateX(0deg) rotateY(0deg) rotateZ(0deg) translateX(0%) translateY(0%);

  }

  50% {
    transform: perspective(1000px) skewX(0deg) skewY(0deg) rotateX(0deg) rotateY(0deg) rotateZ(0deg) translateX(0%) translateY(120%);
  }

  100% {
    transform: perspective(1000px) skewX(0deg) skewY(0deg) rotateX(0deg) rotateY(0deg) rotateZ(0deg) translateX(0%) translateY(0%);
  }
}

@keyframes fold-paper-up {
  0% {
    transform: perspective(1000px) skewX(0deg) skewY(0deg) rotateX(0deg) rotateY(0deg) rotateZ(0deg) translateX(0%) translateY(0%);

  }

  50% {
    transform: perspective(1000px) skewX(0deg) skewY(0deg) rotateX(0deg) rotateY(0deg) rotateZ(0deg) translateX(0%) translateY(-120%);
  }

  100% {
    transform: perspective(1000px) skewX(0deg) skewY(0deg) rotateX(0deg) rotateY(0deg) rotateZ(0deg) translateX(0%) translateY(0%);
  }
}

.button-add {
  position: fixed;
  bottom: 1%;
  right: 1%;
  @include adaptiv-height(100, 30);
  @include adaptiv-width(100, 30);
  z-index: 500;


  .fa-plus {
    @include adaptiv-font(80, 40);
    width: 100%;
    height: 100%;
    z-index: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    -webkit-text-stroke: 1px black;
  }

  .content-modal {

    input {
      @include adaptiv-font(20, 20);
      width: 100%;
      height: 100%;
      border: none;
      border-bottom: 1px solid black;
      outline: none;
      background-color: transparent;
      padding: 0 10px;
    }

    textarea {
      @include adaptiv-font(20, 20);
      width: 100%;
      height: 150px;
      border: 1px solid black;
      outline: none;
      padding: 0 10px;
      margin-top: 3%;
    }

    input::placeholder {
      text-align: center;
    }

    .vue-star-rating {
      justify-content: center;
    }

    .v-select {
      width: 80%;
      margin: 0 auto;
    }

    .label {
      @include adaptiv-font(28, 15);
      font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
      text-align: center;
    }

    .label-small {
      @include adaptiv-font(22, 15);
      font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
      text-align: center;
      margin-top: 3%;
    }

    .name {
      @include adaptiv-font(28, 15);
      font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
      text-align: center;
      margin-top: 7%;
    }

    .add-row {
      @include adaptiv-font(18, 12);
      font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
      text-align: center;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 75%;
      background-color: #fcaa51;
      border-top-right-radius: 45%;
      border-bottom-right-radius: 45%;

      .fa-plus {
        @include adaptiv-font(15, 10);
        text-align: center;
        cursor: pointer;
        width: fit-content;
        margin-top: 3px;
        margin-left: 5px;
      }

    }

    .hand-item {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      margin-top: 3%;

      .border {
        width: 10%;
        background-color: #ffe993;
        height: 23px;
        border: 2px solid black;
        border-right: none;
      }

      .spooky {
        position: relative;
        width: 10%;
        height: 32px;
        background-color: black;
        border-radius: 50%;
        border-top-left-radius: 90%;
        border-bottom-left-radius: 90%;
        margin-right: -10px;
      }
    }
  }
}

.final-actions {
  width: 100%;

  .is-primary {
    width: 50%;
    margin-top: 5%;
    margin-bottom: 5%;
    @include adaptiv-font(30, 20);
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    background-color: #b5fc51;
  }

  .is-danger {
    width: 50%;
    margin-top: 5%;
    margin-bottom: 5%;
    @include adaptiv-font(30, 20);
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    background-color: #fc7951;
  }
}

.input__wrapper {
  width: 100%;
  position: relative;
  margin-top: 15px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.input__file {
  opacity: 0;
  visibility: hidden;
  position: absolute;
}

.input__file-icon-wrapper {
  height: 45px;
  width: 60px;
  margin-right: 15px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  border-right: 1px solid #fff;
}

.input__file-button-text {
  line-height: 1;
  margin-top: 1px;
}

.input__file-icon {
  filter: brightness(0) invert(1);
}

.input__file-button {
  width: 100%;
  max-width: 200px;
  height: 45px;
  background: black;
  color: #fff;
  font-size: 1.125rem;
  font-weight: 700;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  border-radius: 3px;
  cursor: pointer;
  margin: 0;
}
</style>

