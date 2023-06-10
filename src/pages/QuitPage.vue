<template>
  <section id="quit">
    <div class="info">
      <h1 class="quit-label">Вы уверены что хотите выйти из аккаунта?</h1>
      <p class="session">Текущие сессии:</p>
    </div>
    <div class="user_card">
      <div class="user_card__avatar">
        <img :src="user.photoURL" alt="avatar" />
      </div>
      <div class="user_card__info">
        <div class="user_card__info__name">
          <h2>{{ user.displayName }}</h2>
        </div>
        <div class="user_card__info__email">
          <h3>{{ user.email }}</h3>
        </div>
      </div>
      <div class="actions">
        <button class="yes" @click="quit">
          Выйти
        </button>
        <button class="no" @click="cancel">
          Отмена
        </button>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  name: "quit-page",
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
    };
  },
  methods: {
    quit() {
      localStorage.clear();
      this.$router.push("/register");
    },
    cancel() {
      this.$router.go(-1);
    }
  },
}
</script>
