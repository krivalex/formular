<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link v-if="user" to="/quit">Выйти</router-link>
    <router-link v-if="!user" to="/login">Войти</router-link>
    <router-link to="/profile">Profile</router-link>
  </nav>
  <div class="profile">
    <profile-circle />
  </div>
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

<style>
</style>
