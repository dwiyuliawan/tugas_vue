import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HomeView.vue'
import DetailProduct from '@/views/DetailProductView.vue'
import Blog from '@/views/BlogView.vue'
import Article from '@/views/ArticleView.vue'
import Checkout from '@/views/CheckoutView.vue'
import OrderList from '@/views/OrderListView.vue'
import OrderConfirmation from '@/views/OrderConfirmationView.vue'
import OrderDetail from '@/views/OrderDetailView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/blog',
    name: 'Blog',
    component: Blog
  },
  {
    path: '/article/:slug',
    name: 'Article',
    component: Article
  },
  {
    path: '/detailproduct/:id',
    name: 'DetailProduct',
    component: DetailProduct,
    props: true
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout
  },
  {
    path: '/orders-list',
    name: 'OrderList',
    component: OrderList
  },
  {
    path: '/orders/:orderId',
    name: 'OrderDetail',
    component: OrderDetail,
    props: true
  },
  {
    path: '/orders-confirmation',
    name: 'OrderConfirmation',
    component: OrderConfirmation
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
