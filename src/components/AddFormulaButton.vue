<template>
  <div class="button-add" @click="openModal">
    <i class="fa fa-plus-circle" aria-hidden="true"></i>
    <my-modal :show="showModal" @:update:model="openModal">
      <input type="text" class="input" placeholder="Название" />
      <div v-for="stroke in reactiveStrokes" :key="stroke.id" class="all-aspects">
        <one-stroke v-model:stroke="stroke.id" @:update:stroke="this.$emit('update:stroke', stroke.id)" />
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
  emits: ["update:show", "update:stroke"],
  updated() {
    this.strokes = this.reactiveStrokes;
  },
  data() {
    return {
      showModal: false,
      strokes: [
        {
          id: 1,
        },
      ],
      all_aspects: [],
    };
  },
  methods: {
    openModal() {
      this.showModal = !this.showModal;
      this.$emit("update:show", true);
    },
    addRow() {
      this.strokes.push({
        id: this.strokes.length + 1,
      });
    },
  },
  watch: {
    allStrokes() {
      this.$emit("update:stroke", this.strokes);
    },
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
    }
  }

}

</script>

