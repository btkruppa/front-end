export class UserService {

  initialized = false

  constructor ($log, $config, $http, $cookies, $location) {
    'ngInject'
    this.$config = $config
    this.$http = $http
    this.$cookies = $cookies
    this.$location = $location
    this.isFollowing = false
    $log.debug('UserService instantiated!')
  }

  followAvailable () {
    let cookies = this.$cookies
    let follows = this.getFollowing(cookies.get('username'))
    console.log(follows)
  }

  followUser (username) {
    let cookies = this.$cookies
    let userService = this
    this.$http({
      method: 'POST',
      url: 'http://localhost:8080/users/@' + username + '/follow',
      headers: {
        'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000/'
      },
      data: {
        username: cookies.get('username'),
        password: cookies.get('password')
      }
    }).then(function successCallback (response) {
      console.log(response.data)
      userService.getFollowers(username)
    }, function errorCallback (response) {
      console.log(response)
    })
  }

  unfollowUser (username) {
    let cookies = this.$cookies
    let userService = this
    this.$http({
      method: 'POST',
      url: 'http://localhost:8080/users/@' + username + '/unfollow',
      headers: {
        'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000/'
      },
      data: {
        username: cookies.get('username'),
        password: cookies.get('password')
      }
    }).then(function successCallback (response) {
      userService.getFollowers(username)
    }, function errorCallback (response) {
      console.log(response)
    })
  }

  getFollowers (username) {
    let followerList = this
    let location = this.$location
    this.$http({
      method: 'GET',
      url: 'http://localhost:8080/users/@' + username + '/followers',
      headers: {
        'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000/'
      }
    }).then(function successCallback (response) {
      followerList.followers = response.data
      followerList.numOfFollowers = response.data.length
      followerList.followers.map(follower => follower.username)
      followerList.isFollowing = response.data.some(follower => follower.username === followerList.$cookies.get('username'))
      if(username === followerList.$cookies.get('username')) {
        followerList.isUser = true
      } else {
        followerList.isUser = false
      }
    }, function errorCallback (response) {
      console.log(response)
    })
  }

  getFollowing (username) {
    let followingList = this
    let location = this.$location
    this.$http({
      method: 'GET',
      url: 'http://localhost:8080/users/@' + username + '/following',
      headers: {
        'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000/'
      }
    }).then(function successCallback (response) {
      followingList.follows = response.data
      followingList.numOfFollowing = response.data.length
      followingList.follows.map(followings => followings.username)

    }, function errorCallback (response) {
      console.log(response)
    })
  }

  followers = []
}
