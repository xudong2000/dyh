<template>
  <div id="admin">
    <div class="box">
      <div class="div"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Admin",
};
</script>

<style lang="less" scoped>
#admin {
  width: 100%;
  height: 500px;
  background-color: #fff;
  .box {
    width: 300px;
    height: 300px;
    background-color: @color1;
    &:hover {
      background-color: @color2;
      .div {
        background-color: @color1;
      }
    }
    .div {
      width: @var;
      height: 100px + 100;
      background-color: @color2;
    }
  }
}
@color1: red;
@color2: blue;
@var: @a;
@a: 50%;
</style>