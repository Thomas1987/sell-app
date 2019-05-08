<!-- create by lester -->
<template>
  <div class="cartcontrol">
    <div class="cart-decrease" @click="decreaseCart" transition="move" v-show="food.count>0">
      <span class="inner icon-remove_circle_outline "></span>
    </div>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click="addCart"></div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    food: {
      type: Object
    }
  },
  data() {
    return {
    }
  },

  components: {},

  mounted() {
  },
  computed: {},

  methods: {
    addCart() {
      console.log('click')
      if (!this.food.count) {
        // 通过set 来改变属性 这样vue才能检测到不存在的属性的变化
        this.$set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
    },
    decreaseCart() {
      if (this.food.count > 0) {
        this.food.count--
      }
    }
  }
}

</script>
<style lang="stylus">
  .cartcontrol
    font-size:0
    .cart-decrease
      display:inline-block
      padding:6px
      transition:all 0.4s linear
      &.move-transition
        opacity:1
        transform :translate3d(0,0,0)
      .inner
        line-height :24px
        font-size:24px
        color:rgb(0,160,220)
      &.move-enter,&.move-leave
        opacity:0
        transform :translate3d(24px,0,0)
    .cart-count
      display:inline-block
      vertical-align :top
      width :12px
      padding-top :6px
      line-height :24px
      text-align :center
      font-size:10px
      color:rgb(147,153,159)
    .cart-add
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)
</style>
