<template>
  <div class="profile" v-if="user">
    <div class="profile-circle">
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

<style lang="scss">
.profile {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;

  .profile-circle {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
