import { Component, Vue, Prop } from 'vue-property-decorator'
import '../style/ErrorPage.less'

@Component
export default class ErrorPage extends Vue {
  @Prop({ type: [Number, String] })
  type: number | string

  @Prop({ type: String, default: '' })
  title: string

  @Prop({ type: String, default: '' })
  desc: string

  @Prop({ type: String, default: '' })
  img: string

  errorTypeConfig: any = {
    403: {
      img: require('./assets/403.svg'),
      title: '403',
      desc: '抱歉，你无权访问该页面'
    },
    404: {
      img: require('./assets/404.svg'),
      title: '404',
      desc: '抱歉，你访问的页面不存在'
    },
    500: {
      img: require('./assets/500.svg'),
      title: '500',
      desc: '抱歉，服务器出错了'
    }
  }

  get errorType() {
    return (
      this.errorTypeConfig[this.type.toString()] || this.errorTypeConfig['403']
    )
  }

  protected render() {
    const errorType = this.errorType
    const imgUrl = this.img || errorType.img
    const title = this.title || errorType.title
    const desc = this.desc || errorType.desc

    return (
      <div class="exception">
        <div class="img-block">
          <div style={`backgroundImage:url(${imgUrl})`} class="img-ele" />
        </div>
        <div class="content">
          <h1>{title}</h1>
          <div class="desc">{desc}</div>
          <div class="actions">
            <slot name="actions" />
          </div>
        </div>
      </div>
    )
  }
}
