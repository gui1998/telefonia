<template>
  <h1></h1>
</template>
<script>
export default {
  methods: {
    async logout () {
      this.$root.$emit('Spinner::show')

      await this.$firebase.auth().signOut()

      this.$router.push({ name: 'login' })

      this.$root.$emit('Spinner::hide')
    }
  },
  mounted () {
    this.logout()
  }
}
</script>

<style scoped lang="scss">
.btn-logout {
  width: 100%;
  cursor: pointer;
  color: var(--white);
  &:hover {
    color: var(--featured);
  }
}
</style>
