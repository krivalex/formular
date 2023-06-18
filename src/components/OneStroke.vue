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
import { watch } from "vue";
import "vue-select/dist/vue-select.css";
import { useCreatedFormulaStore } from "@/store/createdFormulaStore";

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
      validation: {
        count: false,
        aspect: false,
        unit: false,
      }
    };
  },
  emits: ["update:stroke"],
  methods: {
    deleteRow() {
      this.current_stroke = null;
      this.$emit("update:stroke", this.current_stroke);
    },
    validateCountData(value) {
      switch (true) {
        case value.length === 0:
          return false;
        case value.length >= 1 && value.length <= 10:
          return true;
        default:
          return false;
      }
    },
    validateAspectData(value) {
      switch (true) {
        case value.length === 0:
          return false;
        case value.length >= 1 && value.length <= 25:
          return true;
        default:
          return false;
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
      [() => this.count, () => this.aspect, () => this.unit],
      ([newCountValue, newAspectValue, newUnitValue]) => {

        if (this.validateCountData(String(newCountValue))) {
          this.validation.count = true;
        }
        else {
          this.validation.count = false;
        }

        if (this.validateAspectData(String(newAspectValue))) {
          this.validation.aspect = true;
        }
        else {
          this.validation.aspect = false;
        }

        if (newUnitValue) {
          this.validation.unit = true;
        }
        else {
          this.validation.unit = false;
        }

        if (this.validation.count && this.validation.aspect && this.validation.unit) {
          const store = useCreatedFormulaStore();
          const newStroke = {
            stroke: this.stroke,
            aspect: newAspectValue,
            count: newCountValue,
            unit: newUnitValue,
          };
          store.setFormulaAspects(newStroke);
        }
      },
      { immediate: true }
    );
  },
  setup() {
    return {
      unit_options: [
        { label: "грамм", value: "грамм" },
        { label: "килограмм", value: "килограмм" },
        { label: "литр", value: "литр" },
        { label: "миллилитр", value: "миллитр" },
        { label: "штука", value: "штука" },
        { label: "щепотка", value: "щепотка" },
        { label: "чайная ложка", value: "чайная ложка" },
        { label: "столовая ложка", value: "столовая ложка" },
      ],
    }
  },

}

</script>
