
<template>
  <div id="app">
    <base-spinner />
    <Notificacao/>
    <div class="container-fluid hidden-xs-down">
      <div class="row">
        <div class="col">
          <Menu />
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseSpinner from './components/global/BaseSpinner'
import Menu from './components/layout/Menu'
import Notificacao from './components/layout/Notificacao'

export default {
  name: 'App',
  components: {
    BaseSpinner,
    Menu,
    Notificacao
  },
  data: () => ({ isLogged: false }),
  mounted () {
    this.$firebase.auth().onAuthStateChanged((user) => {
      window.uid = user ? user.uid : null
      this.$root.$emit('Spinner::hide')
    })
  }
}
</script>

<style lang="scss">
#app {
  font-size: 16px;
  min-height: 100vh;
  color: var(--light);
  background-color: var(--darker);
}
.card {
  background-color: var(--dark-medium) !important;
}
hr {
  background-color: white;
}
.botaolimpar {
  margin-left: 5px;
}
</style>
