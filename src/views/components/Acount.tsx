import { Component, Vue, Emit, Prop, Watch } from 'vue-property-decorator'

@Component
export default class Acount extends Vue {
  count: number = 0
  @Prop({ type: Number, default: 0 })
  acount: number

  @Emit('add-acount')
  addAcount() {
    this.count++
    return this.count
  }

  @Watch('acount')
  onAcountChange(nVal: number) {
    this.count = nVal
  }

  created() {
    this.count = this.acount
  }

  protected render() {
    const count = this.count
    return <div>
      <p>统计：{count }</p>
      <el-button type="primary" on-click={this.addAcount}>点击</el-button>
    </div>
  }
}
