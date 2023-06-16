<template>
  <div class="formula-css">
    <img class="pin" src="@/assets/pin.png">
  </div>
</template>

<script>

export default {
  name: "formula-css",
}


</script>


<style lang="scss" scoped>
@import "@/assets/style.scss";

.formula-css {
  @include adaptiv-font(20, 12);
  @include adaptiv-width(400, 300);
  @include adaptiv-height(500, 400);
  z-index: 100;
  position: relative;
  background-color: #f1f7c1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  margin-top: 50px;
  border: 15px solid #502d16;
  border-top: none;
  border-bottom-left-radius: 10%;
  border-bottom-right-radius: 10%;
  box-shadow: 5px 2px 0px 1px #0a0a0a;
}

.pin {
  width: 50px;
  height: 50px;
  position: absolute;
  top: -20px;
  right: 10px;
  animation: pin 1s infinite;
}

@keyframes pin {
  0% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(10deg);
  }

  100% {
    transform: rotate(0deg);
  }
}
</style>
