import { Component, Vue } from 'vue-property-decorator'

@Component
export default class User extends Vue {
  protected render() {
    return <div>User</div>
  }
}
