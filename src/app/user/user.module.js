import { user } from './user.component'
import { configure } from './user.config'
import { UserService } from './user.service'

export default
  angular
    .module('twitter-user', [])
    .component('user', user)
    .service('$user', UserService)
    .config(configure)
    .name