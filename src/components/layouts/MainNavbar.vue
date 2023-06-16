<template>
  <nav>
    <router-link to="/">Home</router-link>
    <div class="flex-row">
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
$maxWidth: 1280;

@mixin adaptiv-font($pcSize, $mobSize) {
  $addSize: $pcSize - $mobSize;
  $maxWidth: $maxWidth - 320;
  font-size: calc(#{$mobSize + px} + #{$addSize} * ((100vw - 320px) / #{$maxWidth}));
}

@mixin adaptiv-margin($pcSize, $mobSize) {
  $addSize: $pcSize - $mobSize;
  $maxWidth: $maxWidth - 320;
  margin: calc(#{$mobSize + px} + #{$addSize} * ((100vw - 320px) / #{$maxWidth}));
}

@mixin adaptiv-padding($pcSize, $mobSize) {
  $addSize: $pcSize - $mobSize;
  $maxWidth: $maxWidth - 320;
  padding: calc(#{$mobSize + px} + #{$addSize} * ((100vw - 320px) / #{$maxWidth}));
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f5f5f5;
  height: 30px;
  width: 100vw;
  position: fixed;
  @include adaptiv-padding(50, 20);
  padding-top: 0px;
  padding-bottom: 0px;
  z-index: 500;

  a {
    text-decoration: none;
    color: #000;
    @include adaptiv-font(14, 18);
  }
}
</style>
