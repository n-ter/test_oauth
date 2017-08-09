VK.init({
  apiId: 6141592
})

const ButtonAuth = document.querySelector('#authButton')

ButtonAuth.addEventListener('click', () => {
  VK.Auth.login()

  VK.Auth.getLoginStatus(function (response) {
    console.log('response: ', response) // eslint-disable-line
  })

  VK.api('friends.get', { count: 5 }, data => {

    VK.api('users.get', { user_ids: data.response.join(',') }, data => {
      console.log(data.response)
    })
  })
})
