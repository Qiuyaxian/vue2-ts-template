import { Component, Vue } from 'vue-property-decorator'

@Component
export default class User extends Vue {
  protected render() {
    const $store = this.$store
    const userInfo = $store.getters['user/userInfo']
    return <div>欢迎{userInfo.name}登陆</div>
  }
}
