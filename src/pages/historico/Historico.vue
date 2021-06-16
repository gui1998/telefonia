<template>
  <md-table v-model="historicodata" md-card>
    <md-table-toolbar>
      <h1 class="md-title">Histórico</h1>
    </md-table-toolbar>
    <md-table-row slot="md-table-row" slot-scope="{ item }">
      <md-table-cell md-label="Data" md-order-by="data">{{ item.createdAt }}</md-table-cell>
      <md-table-cell md-label="Origem">{{ item.origem }}</md-table-cell>
      <md-table-cell md-label="Destino">{{ item.destino }}</md-table-cell>
      <md-table-cell md-label="Tempo">{{ item.tempo }}</md-table-cell>
      <md-table-cell md-label="Plano">{{ item.plano }}</md-table-cell>
      <md-table-cell md-label="Preço com Plano">{{ item.precocomplano }}</md-table-cell>
      <md-table-cell md-label="Preço sem Plano">{{ item.precosemplano }}</md-table-cell>
    </md-table-row>
  </md-table>
</template>

<script>
export default {
  name: 'TableTemplate',
  data: () => ({
    historicodata: []
  }),
  created () {
    this.getData()
  },
  methods: {
    getData () {
      const db = this.$firebase.database()

      const historico = db.ref('historico/')
      historico.on('value', (snapshot) => {
        const values = snapshot.val()
        this.historicodata = Object.values(values).map(function (num) {
          return num
        })
      })
    }
  }
}
</script>
