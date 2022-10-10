import { Component, Vue } from 'vue-property-decorator'
// import HelloWorld from '@/components/HelloWorld'
// // 导入样式
// import '@/assets/styles/App.less'
// // 导入图片
// import Logo from '@/assets/logo.png'

@Component
export default class App extends Vue {
  protected render() {
    // const $route = this.$route
    // key={$route.fullPath}
    return (
      <div id="app">
        <router-view />
      </div>
    )
  }
}
