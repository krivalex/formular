<template>
  <div class="profile" v-if="user">
    <div class="profile__circle">
      <img :src="user.photoURL" alt="profile" />
    </div>
  </div>
</template>

<script>
export default {
  name: "profile-circle",
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
    };
  },
}

</script>
