<template>
  <div class="button-add" @click="openModal">
    <i class="fa fa-plus-circle" aria-hidden="true"></i>
    <my-modal :show="showModal" @:update:model="openModal">
      <input type="text" class="input" placeholder="Название" />
      <div v-for="stroke in strokes" :key="stroke" class="all-aspects">
        <one-stroke @:delete:row="deleteRow" />
      </div>
      <div class="stroke-actions">
        <button class="button add-row" @click="addRow">
          <i class="fa fa-plus" aria-hidden="true"></i>
          Добавить строку
        </button>
      </div>
      <div class="final-actions">
        <button class="button is-primary">Добавить</button>
        <button class="button is-danger">Отмена</button>
      </div>
    </my-modal>
  </div>
</template>

<script>
import MyModal from '@/components/UI/MyModal.vue';
import OneStroke from '@/components/OneStroke.vue';

export default {
  name: "add-formula-button",
  components: {
    MyModal,
    OneStroke,
  },
  data() {
    return {
      showModal: false,
      strokes: 1,
      all_aspects: [],
    };
  },
  methods: {
    openModal() {
      this.showModal = !this.showModal;
      this.$emit("update:show", true);
    },
    addRow() {
      this.strokes++;
    },
    deleteRow() {
      this.$emit("delete-row", this.formulaId);
    },
  },

}

</script>

