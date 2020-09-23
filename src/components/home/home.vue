<template>
    <div class="home">
       <components :is="$store.state.comp"></components>
    </div>
</template>

<script>
    import editor from './wordEdit/editor'
    import tab  from './echartstab/tab'
    import officialNews from './officialNews/index'
    import ediAdd from './wordEdit/editAdd'
   export default {
       name: "home",
       data(){
           return{

           }
       },
       components:{
           editor,
           tab,
           officialNews,
           ediAdd
       },
       created(){
           this. displayhome();
       },
       methods:{
          displayhome(){
              this.$store.commit('setTab')
          }
       }
   }
</script>

<style scoped lang="scss">
    .home{
        overflow-y: scroll;
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        padding: 0 15px 15px 15px;
        display: flex;
        flex-direction: column;
    }
</style>
