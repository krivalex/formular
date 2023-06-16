<template>
  <div class="formula-css">
    <img src="@/assets/pin.png">
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
  border: 20px solid #5a3a02;
  border-top: none;
  border-radius: 30px;
}
</style>
