<template>
  <nav>

    <div class="item">
      <i class="fa fa-home"></i>
      <router-link to="/">Формулы</router-link>
    </div>

    <div class="item">
      <i class="fa fa-search"></i>
      <input v-model="searchReactive" @input="searchInput" type="search" placeholder="Поиск" />
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
    searchInput() {
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
  border: 5px solid #502d16;
  background: #f7c09b;

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
  }
}
</style>
