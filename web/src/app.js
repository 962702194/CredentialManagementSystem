import router from 'umi/router'

window.router = router
export const dva = {
  config: {
    onError (err) {
      err.preventDefault()
      console.error(err.message)
    }
  }
}
