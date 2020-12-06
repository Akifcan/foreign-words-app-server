import Notification from './Notification.vue'
import notification from './notification'

export default {
  install: (app, options) => {
    app.mixin(notification)
    app.component('Notification', Notification)
  }
}