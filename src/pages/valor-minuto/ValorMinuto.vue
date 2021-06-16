<template>
  <div class="panel panel-default">
    <div class="panel-body">
      <div class="card">
        <form @submit.prevent="submit()">
          <div>
            <div class="row">
              <div class="form-group col-sm-4">
                <label for>Origem:</label>
                <input
                  required
                  type="text"
                  class="form-control"
                  v-mask-number
                  v-model="form.origem"
                />
              </div>
              <div class="form-group col-sm-4">
                <label for>Destino:</label>
                <input
                  required
                  type="text"
                  v-mask-number
                  class="form-control"
                  v-model="form.destino"
                />
              </div>
              <div class="form-group col-sm-4">
                <label for="preco">Valor (R$):</label>
                <input
                  required
                  class="form-control"
                  type="text"
                  name="preco"
                  v-model="form.preco"
                  v-mask-decimal.us="2"
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
              <template v-else>Incluir novo custo</template>
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
// outside of the component:

export default {
  data: () => ({
    loading: false,
    form: {
      origem: '',
      destino: '',
      preco: ''
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
        const ref = this.$firebase.database().ref('valor-minuto')
        const origem = this.form.origem
        const destino = this.form.destino
        const id = ref.push().key

        const item = {
          id,
          ...this.form,
          createdAt: new Date().toLocaleString()
        }

        ref
          .child(origem)
          .child(destino)
          .set(item, (err) => {
            if (err) {
              this.$root.$emit('Notification::show', {
                type: 'danger',
                message: 'Não foi possível inserir o custo, tente novamente.'
              })
              this.loading = false
            } else {
              this.$root.$emit('Notification::show', {
                type: 'success',
                message: 'Custo inserido com sucesso.'
              })

              this.loading = false
            }
          })
      } catch (err) {
        this.$root.$emit('Notification::show', {
          type: 'danger',
          message: 'Não foi possível inserir o custo, tente novamente.'
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
