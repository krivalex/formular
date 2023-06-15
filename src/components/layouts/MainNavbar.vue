<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link v-if="user" to="/quit">Выйти</router-link>
    <router-link v-if="!user" to="/login">Войти</router-link>
    <router-link to="/profile">
      <div class="profile">
        <profile-circle />
      </div>
    </router-link>
  </nav>
</template>

<script>
import ProfileCircle from "@/components/ProfileCircle.vue";

export default {
  name: "main-navbar",
  components: {
    ProfileCircle
  },
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
    };
  },
}

</script>

<style lang="scss">
@mixin responsive-font-size($min-size, $max-size, $min-width, $max-width) {
  @media (min-width: $min-width) and (max-width: $max-width) {
    font-size: $min-size;
  }

  @media (min-width: $max-width) {
    font-size: $max-size;
  }
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f5f5f5;
  height: 30px;
  width: 100vw;
  position: fixed;
}

nav a {
  text-decoration: none;
  color: #000;
  @include responsive-font-size(14px, 18px, 320px, 768px);
}
</style>
