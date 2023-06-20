<template>
  <nav>

    <div class="item">
      <i class="fa fa-home"></i>
      <router-link to="/">Формулы</router-link>
    </div>

    <div class="item">
      <i class="fa fa-search"></i>
      <input v-model.lazy="searchReactive" @input="searchInput" type="search" placeholder="Поиск по всему" />
    </div>

    <div class="enter">
      <router-link v-if="user" to="/quit">Выйти</router-link>
      <router-link v-if="!user" to="/login">Войти</router-link>

      <router-link to="/profile">
        <div class="profile">
          <profile-circle />
        </div>
      </router-link>
    </div>

  </nav>
</template>

<script>
import ProfileCircle from "@/components/ProfileCircle.vue";
import { useFormulaStore } from "@/store/formulaStore.js";

export default {
  name: "main-navbar",
  components: {
    ProfileCircle
  },
  async mounted() {
    const store = useFormulaStore();
    await store.getFormulaPage().then(() => {
      this.formulas = store.getterFormulaPage;
    });
  },
  methods: {
    searchInput(event) {
      this.search = event.target.value;
      const store = useFormulaStore();
      store.setSearchQuery(this.search);
      store.searchFormulas();
    },
  },
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      formulas: [],
      search: "",
    };
  },
  computed: {
    filteredList() {
      return this.formulas.filter(formula => {
        return formula.name.toLowerCase().includes(this.search.toLowerCase())
      })
    },
    searchReactive: {
      get() {
        const store = useFormulaStore();
        return store.getterSearchQuery;
      },
      set() {
        const store = useFormulaStore();
        store.setSearchQuery(this.search);
        store.searchFormulas();
        return
      }
    },
  },
}

</script>

<style lang="scss">
@import "@/assets/style.scss";

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f5f5f5;
  @include adaptiv-height(50, 30);
  width: 100vw;
  position: fixed;
  @include adaptiv-padding(50, 20);
  padding-top: 0px;
  padding-bottom: 0px;
  z-index: 500;
  border-bottom: 5px solid #502d16;
  background: url('@/assets/background/paper-text.jpg');
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;

  a {
    text-decoration: none;
    color: #000;
    @include adaptiv-font(25, 15);
    margin-right: 10px;
  }

  .enter {
    display: flex;
    align-items: center;
    flex-direction: row;
    margin-right: 20px;
    margin-left: 20px;
  }

  .item {
    display: flex;
    align-items: center;
    flex-direction: row;
    margin-right: 20px;
    margin-left: 20px;

    i {
      margin-right: 5px;
      @include adaptiv-font(25, 15);
    }

    input {
      @include adaptiv-font(25, 15);
      border: none;
      border-bottom: 2px solid black;
      outline: none;
      background: transparent;
      color: #000;
      width: 70%;
      height: 100%;
    }

    input::placeholder {
      text-align: center;
      @include adaptiv-font(25, 15);
    }
  }
}
</style>
