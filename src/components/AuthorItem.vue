<template>
  <div class="author-item">
    <img class="texture" src="@/assets/background/paper-text.jpg">
    <div class="content">
      <div class="flex-row image-name">
        <img :src="author.photoURL" v-if="author.photoURL" alt="author avatar" />
        <img :src="randomImage" v-else alt="author avatar" />
        <h1>{{ author.displayName }}</h1>
      </div>
      <div class="online-status">
        <p>Зарегистрирован(а): <b>{{ dateFormatter }}</b></p>
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
  data() {
    return {
      randomImage: "https://cdn-icons-png.flaticon.com/512/2822/2822369.png"
    }
  },
  computed: {
    dateFormatter() {
      if (this.author.createdAt === "Нет") return "Нет"
      let date = Number(this.author.createdAt)
      date = new Date(date);
      date = date.toLocaleString('ru', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
      return date
    },
    randomAvatar() {
      const images = [
        "@/assets/pin.png",
      ]

      const finalImage = images[Math.floor(Math.random() * images.length)]

      return finalImage
    },
  },
}

</script>

<style lang="scss" scoped>
@import "@/assets/style.scss";

.author-item {
  @include adaptiv-font(18, 12);
  @include adaptiv-width(400, 300);
  @include adaptiv-height(100, 100);
  z-index: 100;
  position: relative;
  background-color: #f1f7c1;
  margin: 0 auto;
  border: 15px solid #502d16;
  border-bottom: none;
  border-top: none;
  box-shadow: 5px 2px 0px 1px #0a0a0a;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background-color: gray;
    outline: 10px dashed gray;
    margin: 0 auto;
    box-shadow: 0px 0px 0px 1px #0a0a0a;
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
    opacity: 0.4;
    border-radius: 0%;
  }

  .content {
    height: 100%;

    .image-name {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin: 3% 3%;
      height: 100%;

      h1 {
        @include adaptiv-font(18, 12);
        font-weight: 700;
        margin-left: 10px;
      }

      img {
        @include adaptiv-width(50, 30);
        @include adaptiv-height(50, 30);
        border: 2px solid #502d16;
      }
    }
  }

  .online-status {
    position: absolute;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: flex-end;
    font-family: 'Caveat', cursive;
    margin: 10px 3%;
    width: 100%;
    text-align: center;

    p {
      @include adaptiv-font(14, 10);
      font-family: 'Ubuntu Condensed', sans-serif;
      text-align: center;

      b {
        color: rgb(79, 79, 79);
      }
    }
  }
}
</style>
