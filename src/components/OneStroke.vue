<template>
  <div class="aspect">
    <p class="number">{{ this.stroke }}</p>
    <input type="text" class="aspect-name" placeholder="Ингредиент" />
    <input type="number" class="norma" />
    <v-select v-model="norma_option" :reduce="(option) => option.value" :options="norma_options" />
    <i class="fa fa-trash" aria-hidden="true" @click="deleteRow"></i>
  </div>
</template>

<script>
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  name: "one-stroke",
  components: {
    vSelect,
  },
  props: {
    stroke: {
      type: [Number, null],
      required: true,
    },
  },
  data() {
    return {
      norma_option: null,
      current_stroke: this.stroke,
    };
  },
  emits: ["update:stroke"],
  methods: {
    deleteRow() {
      this.current_stroke = null;
      console.log(this.stroke);
      this.$emit("update:stroke", this.current_stroke);
    },
  },
  setup() {
    return {
      norma_options: [
        { label: "грамм", value: "gramm" },
        { label: "килограмм", value: "kilogramm" },
        { label: "литр", value: "liter" },
        { label: "миллилитр", value: "milliliter" },
        { label: "штука", value: "piece" },
        { label: "щепотка", value: "hand" },
        { label: "чайная ложка", value: "small_spoke" },
        { label: "столовая ложка", value: "big_spoke" },
      ],
    }
  },
}

</script>
