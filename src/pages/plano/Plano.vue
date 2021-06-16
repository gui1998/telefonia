<template>
  <div class="panel panel-default">
    <div class="panel-body">
      <div class="card">
        <form @submit.prevent="submit()">
          <div>
            <div class="row">
              <div class="form-group col-sm-8">
                <label for="plano">Plano:</label>
                <input name="plano" type="text" class="form-control" v-model="form.plano" />
              </div>
              <div class="form-group col-sm-4">
                <label for="minutos">Minutos Gratis:</label>
                <input
                  required
                  class="form-control"
                  type="text"
                  name="minutos"
                  v-model="form.minutos"
                  v-mask-number
                />
              </div>
            </div>
          </div>
          <div class="w-100 d-flex justify-content-center">
            <button class="btn btn-primary" :disabled="loading">
              <template v-if="loading">
                <i class="fa fa-spin fa-spinner"></i>
                Incluindo...
              </template>
              <template v-else>Incluir novo plano</template>
            </button>
            <button
              id="botaolimpar"
              class="btn btn-danger botaolimpar"
              type="reset"
              name="b2"
              @click="reset()"
              ref="botaolimpar"
            >Limpar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    showModal: false,
    form: {
      plano: '',
      minutos: ''
    }
  }),
  methods: {
    reset () {
      Object.assign(this.$data, this.$options.data())
    },
    async submit () {
      this.loading = true

      try {
        this.$root.$emit('Spinner::show')
        const ref = this.$firebase.database().ref('plano')
        const id = this.form.plano

        const item = {
          ...this.form,
          createdAt: new Date().toLocaleString()
        }

        ref.child(id).set(item, (err) => {
          if (err) {
            this.$root.$emit('Notification::show', {
              type: 'danger',
              message: 'Não foi possível inserir o plano, tente novamente.'
            })
            this.loading = false
          } else {
            this.$root.$emit('Notification::show', {
              type: 'success',
              message: 'Plano inserido com sucesso.'
            })
            this.loading = false
          }
        })
      } catch (err) {
        this.$root.$emit('Notification::show', {
          type: 'danger',
          message: 'Não foi possível inserir o plano, tente novamente.'
        })
        this.loading = false
      } finally {
        this.$root.$emit('Spinner::hide')
        this.loading = false
      }
      this.reset()
    }
  }
}
</script>

<style scoped>
input,
select {
  text-align: center;
}
</style>
