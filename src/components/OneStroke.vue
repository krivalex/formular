<template>
  <div class="aspect">
    <p class="number">{{ this.stroke }}.</p>
    <input v-model="aspect" type="text" class="aspect-name" placeholder="Ингредиент" />
    <input v-model="count" type="number" class="unit" />
    <v-select v-model="reactive_unit" :reduce="(option) => option.value" :options="unit_options"
      placeholder="Измерение" />
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
        { label: "миллилитр", value: "миллилитр" },
        { label: "штука", value: "штук" },
        { label: "щепотка", value: "щепотк" },
        { label: "чайная ложка", value: "чайная ложк" },
        { label: "столовая ложка", value: "столовая ложк" },
      ],
    }
  },

}

</script>

<style lang="scss">
@import "@/assets/style.scss";

.aspect {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;

  .v-select {
    width: 120px;
    border: none;
    font-family: "Montserrat", sans-serif;
  }

  .vs__search {
    display: none;
  }

  .vs__dropdown-toggle {
    padding: 8% 0;
  }

  input {
    padding: 5px;
    width: 33%;
    font-size: 16px;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    color: black;
    background-color: transparent;
    transition: all 0.3s ease-in-out;

    &:focus {
      border-bottom: 1px solid red;
    }
  }

  .unit {
    width: 20%;
  }

  .aspect-name {
    width: 50%;
  }

  .number {
    padding: 5px;
    font-style: "Montserrat", sans-serif;
  }

  .fa-trash {
    font-size: 20px;
    padding: 5px;
    color: red;
    cursor: pointer;
  }
}
</style>

