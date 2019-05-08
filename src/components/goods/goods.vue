<!-- create by lester -->
<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li v-for="(item,index) in goods" class="menu-item" :key="index" :class="{'current':currentIndex===index}" ref="menuList">
            <span class="text  border-1px">
              <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li v-for="(item,index) in goods" :key="index" class="food-list food-list-hook" ref="foodList">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li v-for="(food,index) in item.foods" :key="index" class="food-item border-1px">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopcart :delivery-price="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
    </div>
  </div>
</template>

<script>
import { getGoods } from 'api'
import BScroll from 'better-scroll'
import shopcart from '../../components/shopcart/shopcart'
import cartcontrol from '../../components/cartcontrol/cartcontrol'
export default {
  name: 'goods',
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: {},
      listHeight: [],
      scrollY: 0
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
    this._getGoods()
  },
  mounted() {

  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          this._followScroll(i)
          return i
        }
      }
      return 0
    }
  },
  methods: {
    _getGoods() {
      getGoods().then((goods) => {
        this.goods = goods
        this.$nextTick(() => {
          this._initScroll()
          this._calculateHeight()
        })
      })
    },
    _initScroll() {
      this.meunScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      })

      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3 // 希望能试试告诉滚动的位置
      })

      this.foodsScroll.on('scroll', (pos) => {
        // 判断滑动方向，避免下拉时分类高亮错误（如第一分类商品数量为1时，下拉使得第二分类高亮）
        if (pos.y <= 0) {
          this.scrollY = Math.abs(Math.round(pos.y))
        }
      })
    },
    _calculateHeight() {
      let foodList = this.$refs.foodList
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    _followScroll(index) {
      let menuList = this.$refs.menuList
      let el = menuList[index]
      this.meunScroll.scrollToElement(el, 300, 0, -100)
    }
  },
  components: {
    shopcart,
    cartcontrol
  }
}

</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin";
  .goods
    display :flex
    position :absolute
    top:174px
    bottom:46px
    width:100%
    overflow :hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
