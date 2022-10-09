import { CreateElement } from 'vue'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Home extends Vue {
  protected render(h: CreateElement) {
    return <div>Home</div>
  }
}
