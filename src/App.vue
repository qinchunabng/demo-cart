<template>
  <div class="app-container">
    <Header></Header>
    <Goods v-for="item in list" 
      :key="item.id" 
      :id="item.id"
      :title="item.goods_name" 
      :pic="item.goods_img" 
      :price="item.goods_price"
      :state="item.goods_state"
      :quantity="item.goods_count"
      @state-change="getNewState">
        <Counter 
          :count="item.goods_count"
          @count-change="goodsCountChange(item,$event)"></Counter>
      </Goods>
    <Footer :fullChecked="fullState"
      :totalAmount="totalAmount"
      :totalCount="totalCount"
      @full-check-change="fullCheckChange"></Footer>
</div>
</template>

<script>
import axios from 'axios'
import bus from '@/components/eventBus.js'
import Header from '@/components/Header/Header.vue'
import Goods from '@/components/Goods/Goods.vue'
import Footer from '@/components/Footer/Footer.vue'
import Counter from '@/components/Counter/Counter.vue'

export default {
  data(){
    return {
      //存储购物车数据
      list: []
    }
  },
  computed:{
    //动态计算是否全选
    fullState(){
      //如果所有商品的goods_state都为true才返回true
      return this.list.every(item=>item.goods_state)
    },
    //总金额
    totalAmount(){
      return this.list.filter(item=>item.goods_state).reduce((amt, item)=>{
        return amt+=item.goods_price * item.goods_count
      },0);
    },
    //总数量
    totalCount(){
      return this.list.filter(item=>item.goods_state).reduce((total,item)=>{
        return total += item.goods_count
      },0);
    }
  },
  components:{
    Header,
    Goods,
    Footer,
    Counter
  },
  methods:{
    //初始化购物车列表
    async initCartList(){
      const { data: res } = await axios.get('https://www.escook.cn/api/cart')
      console.log(res);
      if(res.status === 200){
        this.list = res.list;
      }
    },
    //获取商品是否选中的状态
    getNewState(obj){
      console.log('getNewState', obj);
      this.list.some(item=>{
        if(item.id === obj.id){
          item.goods_state = obj.state;
          return true;
        }
      })
    },
    //全选状态变化
    fullCheckChange(e){
      console.log('fullCheckChange', e);
      this.list.forEach(element => {
        element.goods_state = e;
      });
    },
    //商品数量变化
    goodsCountChange(item,e){
      console.log('goodsCountChange', item, e);
      item.goods_count=e.val
    }
  },
  created(){
    this.initCartList();
    const that = this;
    //eventBus事件监听
    //处理从子组件传来的商品数量变化事件
    bus.$on('share', e => {
      that.list.some(item => {
        if(item.id === e.id){
          item.goods_count = e.count;
          return true;
        }
      });
    });
  }
}
</script>

<style lang="less" scoped>
.app-container {
  padding-top: 45px;
  padding-bottom: 50px;
}
</style>
