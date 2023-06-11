<template>
  <div class="aspect">
    <input type="text" class="aspect-name" placeholder="Ингридиент" />
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
  methods: {
    deleteRow() {
      this.$emit("delete-row", this.formulaId);
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
