<template>
  <div>
    <button @click="googleRegister">Зарегистрироваться c помощью Google</button>
  </div>
</template>

<script>
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

export default {
  name: 'RegisterPage',
  setup() {
    const googleRegister = () => {
      const auth = getAuth()
      const provider = new GoogleAuthProvider()

      signInWithPopup(auth, provider)
        .then((userCredential) => {
          const user = userCredential.user
          localStorage.setItem('user', JSON.stringify(user))
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          console.log(errorCode, errorMessage)
        })
    }

    return {
      googleRegister
    }
  }
}

</script>
