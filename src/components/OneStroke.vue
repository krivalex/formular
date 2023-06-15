<template>
  <div class="aspect">
    <p class="number">{{ this.stroke }}</p>
    <input v-model="aspect" type="text" class="aspect-name" placeholder="Ингредиент" />
    <input v-model="count" type="number" class="unit" />
    <v-select v-model="reactive_unit" :reduce="(option) => option.value" :options="unit_options" />
    <i class="fa fa-trash" aria-hidden="true" @click="deleteRow"></i>
  </div>
</template>

<script>
import vSelect from "vue-select";
// import { ref } from "vue";
import { watch } from "vue";
import "vue-select/dist/vue-select.css";
// import { useCreatedFormulaStore } from "@/store/createdFormulaStore";

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
      current_stroke: this.stroke,
      aspect: "",
      count: "",
      unit: "",
    };
  },
  emits: ["update:stroke"],
  methods: {
    deleteRow() {
      this.current_stroke = null;
      this.$emit("update:stroke", this.current_stroke);
    },
    validateCountData(value) {
      console.log(value);
      switch (true) {
        case value.length === 0:
          console.log("empty");
          return false;
        case value.length >= 1 && value.length <= 10:
          console.log("valid");
          return true;
        default:
          console.log("default");
          return true;
      }
    },
  },
  computed: {
    reactive_unit: {
      get() {
        return this.unit;
      },
      set(value) {
        this.unit = value;
      },
    },
  },
  created() {
    watch(
      () => this.count,
      (newValue) => {
        if (this.validateCountData(String(newValue))) {
          console.log("---");
        }
      },
      { immediate: true }
    );
  },
  setup() {
    return {
      unit_options: [
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
