<template>
  <v-app style="background-color: green">
    
    <!-- Toolbar -->
    <v-toolbar app dark>
      <v-toolbar-title class="headline text-uppercase">
        <div id="logo" @click="resetar()">
          <span style="font-weight: bold">JAKA</span>
          <span class="font-weight-light"> Games</span>
        </div>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <table>
        <tr>
          <th>
            <v-img class="mt-2 mb-2 pa-3 flagsOfCountrys" :src="brazilIco.image"></v-img>
          </th>
          <th>
            <v-img class="mt-2 mb-2 pa-3 flagsOfCountrys" :src="usaIco.image"></v-img>
          </th>
        </tr>
      </table>
      <div v-if="this.$store.state.momento === false">
        <v-btn flat @click="cadastrar = true">
          <span class="mr-2">Cadastrar</span>
        </v-btn>
      </div>
      <div v-if="this.$store.state.momento === true && this.$store.state.pulouLogin === true">
        <v-btn flat @click="trazerDadosDoUsuario()">
          <span class="mr-2">Seus dados</span>
        </v-btn>
      </div>
    </v-toolbar>
    
    <!-- Card do Login -->
    <template>
      <v-content v-if="!$store.state.momento" class="mt-4">
        <v-container>
          <table class="elevation-12" width="100%">
            <tr>
              <th>
              <v-card dark>
                <v-toolbar color="success" dark flat>
                  <v-toolbar-title>Faça o login para jogar:</v-toolbar-title>
                  <v-spacer />
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field v-model="emailLogando" label="Login" name="login" prepend-icon="person" type="text"/>
                    <v-text-field v-model="senhaLogando" id="password" label="Password" name="password" prepend-icon="lock" type="password"/>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn @click="fazerLogin()" color="success">Login ►</v-btn>
                </v-card-actions>
              </v-card>
              </th>
            </tr>
            <tr>
              <th>
                <v-card style="color: white" color="success" class="mt-2">
                  <v-card-title><h2>SEJA BEM-VINDO, PLAYER!</h2></v-card-title>
                  <v-card-text>
                    <p align="left">O jogo <span style="color: green">JAKA Game&copy;  </span> (Red version) é um jogo de baralho comum ao qual alinha estratégia, blefe e uma pitada de sorte também. O objetivo do jogo é formar a palavra <span style="color: black">JAKA</span> com as cartas valetes, ás e reis, e baixá-las na mesa antes de todos os seus oponentes.</p>
                    <p align="left">Para saber mais sobre como jogar, acesse nosso instagram, siga a gente, lá tem dicas de como jogar JAKA em grupo ou contra uma pessoa:</p>
                    <table>
                      <tr>
                        <th>
                          <v-img class="mt-2 mb-2 pa-3 icones" :src="instaSets.image"></v-img>
                        </th>
                      </tr>
                      <tr>
                        <th style="color: black">
                          @jaka.game
                        </th>
                      </tr>
                    </table>
                    <br>
                    <br>
                    <p align="left">Você pode acessar as regras do game também pelo link abaixo:</p>
                    <p align="left"><span style="font-size: 14pt"><a style="color: black" href="http://bit.ly/jakagameregras" target="_blank">► VER AS REGRAS</a></span></p>
                    <br>
                    <p align="left">O jogo já está formado com regras claras e formato de jogo definidos, porém, este site é apenas uma plataforma de testes para o jogo. Nosso objetivo é testar para quem sabe, desenvolver um app e aprimorar o sistema para que possamos oferecer jogos online do JAKA Game. Então estamos em fase inicial ainda, por isso queremos sua opinião. Ajude-nos. O que podemos melhorar no site?</p>
                    <p align="left" style="font-size: 18pt">Opine por meio deste formulário no google drive, nos ajudará muito:</p>
                    <p align="left"><a style="font-size: 14pt; color: black" href="http://bit.ly/jakagameform" target="_blank">► O QUE PRECISA MELHORAR?</a></p>
                    <p style="font-size: 14pt">Precisamos do seu cadastro. Nem que seja uma única vez, faça o cadastro para que possamos aprimorar o nosso jogo. É muito importante!</p>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="pularLogin()" class="pr-2 elevation-12">Pular Login ►</v-btn>
                  </v-card-actions>
                </v-card>
              </th>
            </tr>
          </table>
        </v-container>
      </v-content>
    </template>

    <!-- Card do Game, só abre após logado -->
    <template>
      <v-content v-if="$store.state.momento">
      <GameCardField/>
      </v-content>
    </template>

    <!-- Card do cadastro -->
    <template>
      <v-dialog v-model="cadastrar" max-width="600">
        <v-card dark>
          <v-card-title class="headline">Por que estamos cadastrando?</v-card-title>
          <v-card-text>Estamos cadastrando players que queiram receber novidades sobre o jogo, bem como receber informações de campeonatos que ocorrerão e também para ficarem por dentro das atualizações do game.</v-card-text>
          <v-card-text>Seus dados não serão utilizados ou cedidos à terceiros!</v-card-text>
          <v-form>
            <div class="pa-4">

              <div class="col-sm">
                <v-text-field v-model="nomeCompleto" :rules="nameRules" :counter="50" label="Nome Completo" required></v-text-field>
              </div>

              <div class="col-sm">
                <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
              </div>

              <div class="col-sm">
                <v-text-field v-model="password" :rules="passwordRules" label="Senha" required></v-text-field>
              </div>

            </div>
          </v-form>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" @click="cadastrar = false">Cancelar</v-btn>
            <v-btn color="green darken-1" style="color: white" @click="cadastrarUsuario()">Cadastrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>

    <!-- Card da edição do usuário -->
    <template>
      <v-dialog v-model="editUsuario" persistent max-width="600">
        <v-card dark>
          <v-card-title class="headline">Editar seus dados</v-card-title>
          <v-card-text>Seus dados salvos:</v-card-text>
          <v-form>
            <div class="pa-4">

              <div class="col-sm">
                <v-text-field v-model="nomeCompletoEdit" :rules="nameRules" :counter="50" label="Nome Completo" required></v-text-field>
              </div>

              <div class="col-sm">
                <v-text-field v-model="emailEdit" :rules="emailRules" label="E-mail" required></v-text-field>
              </div>

              <div class="col-sm">
                <v-text-field :type="mostrarSenhaNaEdicao ? 'password' : 'text'" v-model="passwordEdit" :append-icon="mostrarSenhaNaEdicao ? 'remove_red_eye' : 'cancel'" @click:append="mostrarSenhaNaEdicao = !mostrarSenhaNaEdicao" :rules="passwordRules" label="Senha" required></v-text-field>
              </div>

            </div>
          </v-form>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" @click="editUsuario = false">Cancelar</v-btn>
            <v-btn color="green darken-1" style="color: white" @click="editarUsuario()">Salvar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>

    <!-- Snackbar Geral para qualquer aviso -->
    <template>
      <div class="text-center ma-2">
        <v-snackbar v-model="snackbarGeral" :color="corDoSnackBarGeral" :timeout="timeoutDoSnackBarGeral">
          {{ textDoSnackBarGeral }}
          <v-btn color="pink" text @click="snackbarGeral = false">
            Fechar
          </v-btn>
        </v-snackbar>
      </div>
    </template>

    <v-spacer></v-spacer>

    <v-footer dark>
      <span class="ml-4">(β) Versão beta</span>
      <v-spacer></v-spacer>
      <div class="mr-2">JAKA Games &copy; {{ new Date().getFullYear() }}</div>
    </v-footer>

  </v-app>
</template>

<script>
import GameCardField from './components/GameCardField'
import apiUsers from './link/apiUsers'

export default {
  
  name: 'App',
  
  components: {
    GameCardField,
  },

  mounted () {
    this.verificarSeTaLogado()
  },
  
  data: () => ({

    brazilIco: {'image': require('@/assets/brazilsflag.svg')},
    usaIco: {'image': require('@/assets/usaflag.svg')},

    instaSets: {'image': require('@/assets/insta.png')},

    cartaExemplo1: {'image': require('@/assets/cartas/valetedeouros.png')},
    cartaExemplo2: {'image': require('@/assets/cartas/damadeespadas.png')},
    cartaExemplo3: {'image': require('@/assets/cartas/oitodecopas.png')},
    cartaExemplo4: {'image': require('@/assets/cartas/quatrodepaus.png')},

    usuarioLogado: false,
    cadastrar: false,
    valid: false,
    editUsuario: false,

    snackbarGeral: false,
    textDoSnackBarGeral: '',
    corDoSnackBarGeral: '',
    timeoutDoSnackBarGeral: 2000,
    
    nomeCompleto: '',
    password: '',
    email: '',

    nomeCompletoEdit: '',
    emailEdit: '',
    passwordEdit: '',
    mostrarSenhaNaEdicao: true,

    emailLogando: '',
    senhaLogando: '',
    
    nameRules: [
      v => !!v || 'O campo Nome Completo é obrigatório',
      v => v.length <= 50 || 'Nome deve conter menos que 50 caracteres',
    ],
    emailRules: [
      v => !!v || 'O campo E-mail é obrigatório',
      v => /.+@.+/.test(v) || 'O E-mail precisa ser válido',
    ],
    passwordRules: [
      v => !!v || 'O campo Senha é obrigatório'
    ],
  }),

  methods: {
    
    resetar(){
      window.location.reload()
    },

    cadastrarUsuario(){
      this.cadastrar = false
      let novoUsuario = {}
      
      novoUsuario.nome = this.nomeCompleto
      novoUsuario.email = this.email
      novoUsuario.senha = this.password
      novoUsuario.contador = 1

      apiUsers.adicionarUsuario(novoUsuario).then( usuarioCadastrado => {
        console.log("Tá retornando: " + JSON.stringify(usuarioCadastrado))
        if(usuarioCadastrado === "Usuario já cadastrado"){
          this.textDoSnackBarGeral = 'Este email já foi utilizado para um cadastro, utilize outro email, por favor!',
          this.corDoSnackBarGeral = 'error'
          this.timeoutDoSnackBarGeral = 5000
          this.snackbarGeral = true
          this.cadastrar = true
        }
        else if(usuarioCadastrado != {}){
          this.textDoSnackBarGeral = 'Player cadastrado com sucesso! Pode jogar agora :)',          
          this.corDoSnackBarGeral = 'success'
          this.timeoutDoSnackBarGeral = 5000
          this.snackbarGeral = true
        }
        else {
          this.textDoSnackBarGeral = 'Algum erro inesperado ocorreu, por favor, informe o adm!',          
          this.corDoSnackBarGeral = 'error'
          this.timeoutDoSnackBarGeral = 5000
          this.snackbarGeral = true
        }

      })

    },

    fazerLogin(){
      let usuarioLogando = {}
      usuarioLogando.email = this.emailLogando
      usuarioLogando.senha = this.senhaLogando

      apiUsers.autenticarLogin(usuarioLogando).then( usuarioRetornado => {
        
        if(usuarioRetornado === 'Usuario não encontrado'){
          this.textDoSnackBarGeral = 'Erro ao logar, email ou senha estão incorretos, tente novamente!',
          this.corDoSnackBarGeral = 'error'
          this.timeoutDoSnackBarGeral = 5000
          this.snackbarGeral = true
        }
        else if(usuarioRetornado === 'Erro na autenticação do Usuario!'){
          this.textDoSnackBarGeral = 'Erro ao logar, por favor, tente novamente mais tarde. Se o erro persistir, por favor, informe o ADM do Game!',
          this.corDoSnackBarGeral = 'error'
          this.timeoutDoSnackBarGeral = 5000
          this.snackbarGeral = true
        }
        else if(usuarioRetornado != {} && usuarioRetornado != '' && usuarioRetornado != [] && usuarioRetornado != null && usuarioRetornado != undefined){
          this.textDoSnackBarGeral = 'Seja bem-vindo, inicie o jogo!',
          this.corDoSnackBarGeral = 'success'
          this.timeoutDoSnackBarGeral = 5000
          this.snackbarGeral = true

          localStorage.setItem('localArmz', usuarioRetornado._id)

          let player = {}
          player._id = localStorage.getItem("localArmz")
          
          apiUsers.incrementUsers(player).then( qtdeDeVezesJogadas => {
            console.log("qtdeDeVezesJogadas é: " +  JSON.stringify(qtdeDeVezesJogadas.contador))
            return
          })

          this.$store.state.momento = true
          this.$store.state.pulouLogin = true
          
        }
        else {
          alert("Algum erro inesperado ocorreu, avise o ADM do game!")
        }

      })

    },

    trazerDadosDoUsuario(){
      
      // Métodos para buscar dados do Player para o card antes de abrir o card
      let usuarioAEditar = {}
      usuarioAEditar._id = localStorage.getItem("localArmz")

      apiUsers.buscarUsuarioPorId(usuarioAEditar).then( usuarioRetornado => {
        if(usuarioRetornado === 'Erro ao buscar usuario com id especificado!'){
          this.textDoSnackBarGeral = 'Falha na procura pelo seus dados, por favor, tente novamente mais tarde, se o erro persistir, informe este erro ao admin!',
          this.corDoSnackBarGeral = 'error'
          this.timeoutDoSnackBarGeral = 5000
          this.snackbarGeral = true
        }
        else if (usuarioRetornado != {} && usuarioRetornado != '' && usuarioRetornado != [] && usuarioRetornado != null && usuarioRetornado != undefined) {
          this.nomeCompletoEdit = usuarioRetornado.nome
          this.emailEdit = usuarioRetornado.email
          this.passwordEdit = usuarioRetornado.senha
          // Abre o card já com os dados
          this.editUsuario = true
        }
        else {
          alert("Erro ao trazer dados do usuário!")
        }

      })

    },

    editarUsuario(){
      // Método para salvar a edição dos dados
      let usuarioEditado = {}
      usuarioEditado.nome = this.nomeCompletoEdit
      usuarioEditado.email = this.emailEdit
      usuarioEditado.senha = this.passwordEdit

      apiUsers.editarUsuario(usuarioEditado).then( novoUsuario =>{
        
        if(novoUsuario === 'Erro ao editar Usuario!'){
          this.textDoSnackBarGeral = 'Erro ao editar o player, tente novamente mais tarde!',
          this.corDoSnackBarGeral = 'error'
          this.timeoutDoSnackBarGeral = 5000
          this.snackbarGeral = true
        }
        else if (novoUsuario != {} && novoUsuario != '' && novoUsuario != [] && novoUsuario != null && novoUsuario != undefined) {
          this.textDoSnackBarGeral = 'Player editado com sucesso!',
          this.corDoSnackBarGeral = 'success'
          this.timeoutDoSnackBarGeral = 5000
          this.snackbarGeral = true
          this.editUsuario = false
        }
        else {
          alert("Algum erro inesperado ocorreu, avise o ADM do game!")
        }

      })

    },

    pularLogin(){
      // let maisUmaJogada = 1
      // apiUsers.incrementUsers(maisUmaJogada).then ( usuarioDeNúmero =>{
      //   console.log(usuarioDeNúmero)
      // })

      let anonimo = {}
      anonimo._id = '5e57d56fa9c17a45080c062b'

      apiUsers.contagemPlayers(anonimo).then( logado => {
        console.log("Ok, foi lá e salvou mais um acesso do anônimo!")
      })

      this.$store.state.momento = true
    },

    verificarSeTaLogado(){
      
      let id = localStorage.getItem("localArmz")
      if(id === null){
        this.msgDeAlerta = 'Faça o login!'
        this.msgDeAlertaDisparar = true
        this.msgDeAlertaCor = 'error'
        this.msgDeAlertaTime = 4000
        this.$store.state.momento = false
      }
      else {
        this.msgDeAlerta = 'Player já logado na sua conta, só jogar!! :D'
        this.msgDeAlertaDisparar = true
        this.msgDeAlertaCor = 'success'
        this.msgDeAlertaTime = 4000
        this.$store.state.momento = true
      }
    
    },

  }

}
</script>

<style>

  #logo:hover {
    cursor: pointer;
  }

  .flagsOfCountrys {
    width: 5px;
    height: 5px;
    max-width: 10px;
    max-height: 10px;
    margin-left: 15px;
    border-radius: 6px;
  }

  .icones{
    width: 45px;
    height: 45px;
  }

</style>