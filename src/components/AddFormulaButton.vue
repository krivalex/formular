<template>
  <div class="button-add" @click="openModal">
    <i class="fa fa-plus-circle" aria-hidden="true"></i>
    <my-modal :show="showModal" @:update:model="openModal">
      11111
    </my-modal>
  </div>
</template>

<script>
import MyModal from '@/components/UI/MyModal.vue';

export default {
  name: "add-formula-button",
  components: {
    MyModal,
  },
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    openModal() {
      this.showModal = !this.showModal;
      this.$emit("update:show", true);
    },
  },

}

</script>

