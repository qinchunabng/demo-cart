<template>
  <div class="number-container d-flex justify-content-center align-items-center">
    <!-- 减 1 的按钮 -->
    <button type="button" class="btn btn-light btn-sm" @click="sub">-</button>
    <!-- 购买的数量 -->
    <span class="number-box">{{ count }}</span>
    <!-- 加 1 的按钮 -->
    <button type="button" class="btn btn-light btn-sm" @click="add">+</button>
  </div>
</template>

<script>
import bus from '@/components/eventBus.js'

export default {
  props:{
    count:{
      default: 1,
      type: Number
    },
    id:{
      default: null,
      type: Number
    }
  },
  methods:{
    //增加商品数量
    add(){
      //使用slot改写后不需要
      // bus.$emit('share',{
      //   id: this.id,
      //   count: this.count + 1
      // });    
      this.$emit('count-change',{
        id: this.id,
        val: this.count + 1
      });
    },
    //减少商品数量
    sub(){
      if(this.count - 1 < 1){
        return
      }
      //使用slot改写后不需要
      // bus.$emit('share', {
      //   id: this.id,
      //   count: this.count - 1
      // });
      this.$emit('count-change',{
        id: this.id,
        val: this.count - 1
      });
    }
  }
}
</script>

<style lang="less" scoped>
.number-box {
  min-width: 30px;
  text-align: center;
  margin: 0 5px;
  font-size: 12px;
}

.btn-sm {
  width: 30px;
}
</style>
