const state = {
  orderList:[],
  params:{}
}
const getters = {
  getOrderList: state => state.orderList
}
const actions = {
  fetchList({commit,state}){
    Vue.http.post('/api',state.params)
      .then(res=>{
        commit('uodateOrderList',res)
      },err=>{

      })

  }
}
const mutations = {
  uodateOrderList(state,orderList){
    state.orderList = orderList
  }
}



export default {
  state,
  getters,
  actions,
  mutations
}
