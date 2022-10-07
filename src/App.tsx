import { CreateElement } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from './components/HelloWorld'
// 导入样式
import './assets/styles/App.less'
// 导入图片
import Logo from '@/assets/logo.png'

@Component
export default class App extends Vue {
  protected render(h: CreateElement) {
    return (
      <div id="app">
        <img src={Logo} />
        <HelloWorld />
      </div>
    )
  }
}
