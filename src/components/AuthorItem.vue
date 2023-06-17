<template>
  <div class="author-item">
    <img class="texture" src="@/assets/background/paper-text-2.jpg">
    <div class="content">
      <img :src="author.photoURL" alt="author avatar" />
      <p>{{ author.displayName }}</p>
      <div class="online-status">
        <p>Зарегистрирован(а)</p>
        <p>{{ dateFormatter }}</p>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "author-item",
  props: {
    author: {
      type: Object,
      required: true,
    },
  },
  computed: {
    dateFormatter() {
      let date = Number(this.author.createdAt)
      date = new Date(date);
      date = date.toLocaleString('ru', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
      return date
    },
  },
}

</script>

<style lang="scss" scoped>
@import "@/assets/style.scss";

.author-item {
  @include adaptiv-font(18, 12);
  @include adaptiv-width(400, 300);
  @include adaptiv-height(100, 50);
  z-index: 100;
  position: relative;
  background-color: #f1f7c1;
  margin: 0 auto;
  margin-top: 50px;
  border: 15px solid #502d16;
  border-bottom: none;
  box-shadow: 5px 2px 0px 1px #0a0a0a;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
  }

  p {
    @include adaptiv-font(18, 12);
    font-weight: 700;
  }

  .texture {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    opacity: 0.5;
    border-radius: 0%;
  }

  .online-status {
    position: absolute;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    font-family: 'Caveat', cursive;
    margin: 10px 3%;

    p {
      @include adaptiv-font(14, 10);

      &:last-child {
        color: rgb(79, 79, 79);
      }
    }
  }
}
</style>
