<template>
  <section id="nothing">
    <div class="random-floating-image">
      <img src="@/assets/background/aspects/Aer.webp">
      <img src="@/assets/background/aspects/Aqua.webp">
      <img src="@/assets/background/aspects/Ignis.webp">
      <img src="@/assets/background/aspects/Ordo.webp">
      <img src="@/assets/background/aspects/Perditio.webp">
      <img src="@/assets/background/aspects/Terra.webp">
      <img src="@/assets/background/aspects/Alienis.png">
      <img src="@/assets/background/aspects/Gelum.webp">
    </div>
  </section>
</template>

<script>

export default {
  name: "not-found-page",
  mounted() {

    const container = document.querySelector('.random-floating-image');
    const images = container.querySelectorAll('img');

    images.forEach((image) => {
      let randomX = Math.random() * window.innerWidth;
      let randomY = Math.random() * window.innerHeight;

      if (randomX > window.innerHeight - 100) {
        randomX -= 100;
      }

      console.log(randomX, randomY);

      image.style.left = `${randomX}px`;
      image.style.top = `${randomY}px`;
      image.style.animation = `${this.generateRandomKeyframeAnimation()} ${Math.random() * 5 + 45}s infinite`;

      image.classList.add('floating-animation');
    });
  },
  methods: {
    generateRandomKeyframeAnimation() {
      const animationName = `random-animation-${Math.floor(Math.random() * 1000)}`;
      const rotation = Math.floor(Math.random() * 360);
      const keyframes = `@keyframes ${animationName} {
    0% {
      transform:
       rotate(0deg) 
       translate(0px, 0px);
    }
    50% {
      transform: 
       rotate(${rotation}deg)
       translate(${Math.floor(Math.random() * 50)}px, ${Math.floor(Math.random() * 50)}px);
    }
    100% {
      transform:
       rotate(${rotation}deg)
       translate(0px, 0px));
    }
  }`;

      const styleSheet = document.createElement('style');
      styleSheet.innerHTML = keyframes;
      document.head.appendChild(styleSheet);

      return animationName;
    }
  }
};
</script>

<style lang="scss">
#nothing {
  height: calc(100vh);
}

.random-floating-image {
  position: relative;
  z-index: 10;
}

.random-floating-image img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: absolute;
}


@keyframes float {
  0% {
    transform: rotate(0deg) translate(0px, 0px);
  }

  50% {
    transform: rotate(45deg) translate(20px, 20px);
  }

  100% {
    transform: rotate(0deg) translate(0px, 0px);
  }
}

.floating-animation {
  animation-name: float;
  animation-duration: 3s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}
</style>
