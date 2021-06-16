<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <div class="card">
        <h2 class="h1 titleprincial">Bem vindo à OniQ Telefonia</h2>
        <p class="textojusficativa">
          A OniQ, preocupada com a transparência junto aos seus clientes, disponibilizou uma página na web onde o
          cliente pode calcular o valor da ligação. Aqui você pode escolher os códigos das
          cidades de origem e destino, o tempo da ligação em minutos e escolher qual o plano FaleMais.
        </p>
      </div>
    </div>
    <hr />
    <div class="panel-body">
      <div class="card">
        <form @submit.prevent="submit()">
          <div class="row">
            <div class="form-group col-sm-4">
              <label for="origem">Origem:</label>
              <select
                required
                name="origem"
                @change="carregarDestino()"
                class="form-control"
                v-model="form.origem"
              >
                <option
                  v-for="(tabelaorigem) in tabelaorigem"
                  :key="tabelaorigem.key"
                >{{ tabelaorigem.key }}</option>
              </select>
            </div>
            <div class="form-group col-sm-4">
              <label for="destino">Destino:</label>
              <select required name="destino" class="form-control" v-model="form.destino">
                <option
                  v-for="(tabeladestinos) in tabeladestinos"
                  :key="tabeladestinos.key"
                >{{tabeladestinos.key}}</option>
              </select>
            </div>
            <div class="form-group col-sm-4">
              <label for="tempo">Tempo (min):</label>
              <input
                required
                name="tempo"
                class="form-control"
                type="number"
                v-mask-number
                v-model="form.tempo"
              />
            </div>
          </div>
          <div class="row">
            <div class="form-group col-sm-4">
              <label for="plano">Plano FaleMais:</label>
              <select
                required
                name="plano"
                @change="buscarvalorplano"
                class="form-control"
                v-model="form.plano"
              >
                <option v-for="(planosfalemais, key) in planosfalemais" :key="key">{{ key }}</option>
              </select>
            </div>
            <div class="form-group col-sm-4">
              <label for="precocomplano">Com FaleMais</label>
              <input
                name="precocomplano"
                class="form-control"
                disabled
                type="text"
                v-model="form.precocomplano"
                pattern="([0-9]{1,3}).([0-9]{1,3})"
              />
            </div>
            <div class="form-group col-sm-4">
              <label for="precosemplano">Sem FaleMais</label>
              <input
                name="precosemplano"
                class="form-control"
                disabled
                type="text"
                v-model="form.precosemplano"
                pattern="([0-9]{1,3}).([0-9]{1,3})"
              />
            </div>
          </div>
          <div class="d-flex justify-content-center">
            <button class="btn btn-primary" :disabled="loading">
              <template v-if="loading">
                <i class="fa fa-spin fa-spinner"></i>
                Calculando...
              </template>
              <template v-else>Calcular Custo</template>
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="panel-footer">
      <hr />
      <img src="../../imagens/oniqfundo.jpg" id="imagemempresa" alt="imagem-empresa" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data: () => ({
    loading: false,
    tabelaorigem: {},
    planosfalemais: {},
    tabeladestinos: {},
    minutosPlano: '',
    valorMinuto: '',
    form: {
      origem: '',
      destino: '',
      plano: '',
      tempo: '',
      precocomplano: '',
      precosemplano: ''
    }
  }),
  mounted () {
    this.getData()
  },
  methods: {
    calculatotal () {
      this.buscarvalorminuto()

      var tempo = parseInt(this.form.tempo)
      var precominsemplano = this.valorMinuto
      var precomincomplano = this.valorMinuto * 1.1
      var minutosgratis = this.minutosPlano
      var tempoexcedente = 0
      this.form.precosemplano = precominsemplano * tempo

      tempoexcedente = tempo - minutosgratis

      if (tempoexcedente >= 0) {
        this.form.precocomplano = parseFloat(
          precomincomplano * tempoexcedente
        ).toFixed(2)
      } else {
        this.form.precocomplano = parseFloat(0.0).toFixed(2)
      }
    },
    carregarDestino () {
      const db = this.$firebase.database()

      var arraydestino = []

      const Origem = db.ref('valor-minuto').child(this.form.origem.toString())

      Origem.on('value', (snapshot) => {
        const values = snapshot.val()
        for (var key in values) {
          arraydestino.push({
            key: key,
            value: values[key]
          })
        }
        this.tabeladestinos = arraydestino
      })
    },
    buscarvalorminuto () {
      let valor = this.tabeladestinos.filter((data, index) => {
        return data.key === this.form.destino
      })
      this.valorMinuto = parseFloat(valor[0].value.preco)
    },
    buscarvalorplano () {
      const db = this.$firebase.database()
      var minutos = ''
      const valorPlano = db.ref('plano')
      valorPlano
        .orderByChild('plano')
        .equalTo(this.form.plano)
        .on('child_added', function (snapshot) {
          minutos = snapshot.val().minutos
        })
      this.minutosPlano = minutos
    },
    async submit () {
      this.calculatotal()
      this.loading = true
      try {
        this.$root.$emit('Spinner::show')
        const ref = this.$firebase.database().ref('historico')
        const id = ref.push().key
        const item = {
          id,
          ...this.form,
          createdAt: new Date().toLocaleString()
        }

        ref.child(id).set(item, (err) => {
          if (err) {
            this.$root.$emit('Notification::show', {
              type: 'danger',
              message:
                'Não foi possível calcular, verifique e tente novamente.'
            })
            this.loading = false
          } else {
            this.loading = false
          }
        })
      } catch (err) {
        this.$root.$emit('Notification::show', {
          type: 'danger',
          message: 'Não foi possível calcular, verifique e tente novamente.'
        })
        this.loading = false
      } finally {
        this.$root.$emit('Spinner::hide')
        this.loading = false
      }
    },
    getData () {
      const db = this.$firebase.database()

      var arrayorigem = []
      const valorMinuto = db.ref('valor-minuto/')
      valorMinuto.on('value', (snapshot) => {
        const values = snapshot.val()
        for (var key in values) {
          arrayorigem.push({
            key: key,
            value: values[key]
          })
        }
        this.tabelaorigem = arrayorigem
      })

      const faleMais = db.ref('plano/')
      faleMais.on('value', (snapshot) => {
        this.planosfalemais = snapshot.val()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.textojusficativa {
  font-size: 20px;
  text-align: justify;
  color: var(--light);
}
input,
select {
  text-align: center;
}
#imagemempresa {
  height: 40vh;
  width: 100%;
}
</style>
