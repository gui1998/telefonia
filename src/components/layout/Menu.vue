
<template>
  <div class="card">
    <nav class="nav">
      <router-link
        exact
        :key="i"
        class="nav-link"
        exact-active-class="active"
        :to="{ name: router.name }"
        v-for="(router, i) in routerLinks"
      >
        <i class="fa" :class="`fa-${router.meta.icon}`"></i>
        {{ router.meta.title }}
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  computed: {
    routerLinks () {
      return this.$router.options.routes.filter((r) => r.name !== 'login')
    }
  }
}
</script>

<style scoped lang="scss">
.card {
  margin-bottom: 5px;
}
.nav {
  font-size: 16px;
  .nav-link {
    color: var(--white);
    transition: 0.4s;
    text-decoration: none;
    &.active {
      color: var(--featured);
      background-color: transparent;
    }
    &:hover {
      color: var(--dark);
      background-color: var(--featured);
    }
  }
}
</style>
