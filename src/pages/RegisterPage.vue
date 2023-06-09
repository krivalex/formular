<template>
  <div>
    <input type="text" v-model="login" placeholder="Логин/Имя" />
    <input type="password" v-model="password" placeholder="Пароль" />
    <input type="password" v-model="repeat_password" placeholder="Повторите пароль" />
    <button @click="commonRegister">Зарегистрироваться</button>
    <button @click="googleRegister">Зарегистрироваться c помощью Google</button>
  </div>
</template>

<script>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

export default {
  name: 'RegisterPage',
  setup() {
    const login = ref('')
    const password = ref('')
    const repeat_password = ref('')

    const commonRegister = () => {
      if (password.value !== repeat_password.value) {
        alert('Пароли не совпадают')
        return
      }
      const auth = getAuth()
      createUserWithEmailAndPassword(auth, login.value, password.value)
        .then((userCredential) => {
          const user = userCredential.user
          console.log(user)
          // ...
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          console.log(errorCode, errorMessage)
        })
    }

    const googleRegister = () => {
      const auth = getAuth()
      const provider = new GoogleAuthProvider()

      signInWithPopup(auth, provider)
        .then((userCredential) => {
          const user = userCredential.user
          console.log(user)
          // ...
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          console.log(errorCode, errorMessage)
        })
    }

    return {
      login,
      password,
      repeat_password,
      commonRegister,
      googleRegister
    }
  }
}

</script>
