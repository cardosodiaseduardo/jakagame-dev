<template>
  <v-container class="pt-0" style="background-color: green">
    <v-layout>
      

      <!-- Todo o Game está aqui -->
      <v-card elevation="10" height dark full-width width="1200px" class="pa-3 centralized">

        <!-- Alertas do jogo -->
        <v-snackbar outlined bottom :timeout="msgDeAlertaTime" :color="msgDeAlertaCor" v-model="msgDeAlertaDisparar" v-if="mostrarMsgDeAlertas">
          {{ msgDeAlerta }}
        </v-snackbar>
        
        <!-- Botões seletores de ligar e desligar as mensagens -->
        <v-layout>
          <v-switch v-model="mostrarLogs" v-if="mostrarMesaDoPlayer1 != 0" class="ma-2 pa-2" label="Mostrar Logs das jogadas"></v-switch>
          <v-switch v-model="mostrarMsgDeAlertas" v-if="mostrarMesaDoPlayer1 != 0" class="ma-2 pa-2" label="Mostrar mensagens de aviso"></v-switch>
        </v-layout>

        <!-- Card para iniciar ou resetar o Jogo -->
        <v-layout>
          <v-btn color="primary" small v-if="botaoInicial" @click="sacarCartasIniciais()">Iniciar Jogo</v-btn>
          <v-btn color="error" small v-if="!botaoInicial" @click="resetar()">Novo Jogo</v-btn>
          <v-layout v-if="!acabouOjogo">
            <v-card :color="quemEhAVezCor" v-if="!botaoInicial">
              <v-card-title>
                {{ quemEhAVez }}
                <div class="ml-3" v-if="quemEhAVezTrueOrFalse">
                  <v-progress-circular indeterminate color="primary"></v-progress-circular>
                </div>
              </v-card-title>
            </v-card>
          </v-layout>
        </v-layout>
        
        <!-- Card com as cartas da mão e mesa do PLAYER e do OPONENTE e com o Card das Ações -->
        <table border="0" v-if="mostrarMesaDoPlayer1 != 0">
          <tr>
            <td>
              <!-- Card do Player -->
              <v-icon class="mx-2" color="success">person_pin</v-icon>
              <v-card max-width="600px" color="success" class="pa-2 ma-2 centralized" height dark>
                <h3 class="mx-2">Suas cartas da mão e mesa</h3>
                <v-flex class="center">
                  <v-flex>
                    <table border="0" class="mt-2 mb-2 pt-2 pb-2">
                      <tr>
                        <th class="px-2"></th>
                        <td justify="center" align="center">
                        </td>
                        <td class="pl-2"></td>
                        <td></td>
                        <td class="pl-2"></td>
                        <td></td>
                        <td class="pl-1"></td>
                        <td></td>
                      </tr>
                      <tr>
                        <th class="px-2">MÃO</th>
                        <td class="pr-2">
                          <v-img class="pa-3 carta" :src="carta1.image"></v-img>
                        </td>
                        <td class="pl-2" style="font-size: 18pt; font-weight: bold; color: black">
                          <v-icon v-if="vezDoJogador" @click="movimentacoesEntreAsCartas(1)">swap_horiz</v-icon>
                        </td>
                        <td class="pr-2">
                          <v-img class="pa-3 carta" :src="carta2.image"></v-img>
                        </td>
                        <td class="pl-2" style="font-size: 18pt; font-weight: bold; color: black">
                          <v-icon v-if="vezDoJogador" @click="movimentacoesEntreAsCartas(2)">swap_horiz</v-icon>
                        </td>
                        <td class="pr-2">
                          <v-img class="pa-3 carta" :src="carta3.image"></v-img>
                        </td>
                        <td class="pl-2" style="font-size: 18pt; font-weight: bold; color: black">
                          <v-icon v-if="vezDoJogador" @click="movimentacoesEntreAsCartas(3)">swap_horiz</v-icon>
                        </td>
                        <td class="pr-2">
                          <v-img  class="pa-3 carta" :src="carta4.image"></v-img>
                        </td>
                      </tr>
                      <tr>
                        <th></th>
                        <td class="pl-2" style="font-size: 18pt; font-weight: bold; color: black" justify="center" align="center">
                          <div v-if="travarMovimentacaoDaMesaDoPlayer === true">
                            <v-icon v-if="vezDoJogador" @click="movimentacoesEntreAsCartas(7)">swap_vert</v-icon>
                          </div>
                        </td>
                        <td></td>
                        <td class="pl-2" style="font-size: 18pt; font-weight: bold; color: black" justify="center" align="center">
                          <div v-if="travarMovimentacaoDaMesaDoPlayer === true">
                            <v-icon v-if="vezDoJogador" @click="movimentacoesEntreAsCartas(8)">swap_vert</v-icon>
                          </div>
                        </td>
                        <td></td>
                        <td class="pl-2" style="font-size: 18pt; font-weight: bold; color: black" justify="center" align="center">
                          <div v-if="travarMovimentacaoDaMesaDoPlayer === true">
                            <v-icon v-if="vezDoJogador" @click="movimentacoesEntreAsCartas(9)">swap_vert</v-icon>
                          </div>
                        </td>
                        <td></td>
                        <td class="pl-2" style="font-size: 18pt; font-weight: bold; color: black" justify="center" align="center">
                          <div v-if="travarMovimentacaoDaMesaDoPlayer === true">
                            <v-icon v-if="vezDoJogador" @click="movimentacoesEntreAsCartas(10)">swap_vert</v-icon>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th>MESA</th>
                        <td class="pr-2">
                          <v-img class="mt-2 mb-2 pa-3 carta" :src="carta5.image"></v-img>
                        </td>
                        <td class="pl-2" style="font-size: 18pt; font-weight: bold; color: black" justify="center" align="center">
                          <div v-if="travarMovimentacaoDaMesaDoPlayer === true">
                            <v-icon v-if="vezDoJogador" @click="movimentacoesEntreAsCartas(4)">swap_horiz</v-icon>
                          </div>
                        </td>
                        <td class="pr-2">
                          <v-img class="mt-2 mb-2 pa-3 carta" :src="carta6.image"></v-img>
                        </td>
                        <td class="pl-2" style="font-size: 18pt; font-weight: bold; color: black" justify="center" align="center">
                          <div v-if="travarMovimentacaoDaMesaDoPlayer === true">
                            <v-icon v-if="vezDoJogador" @click="movimentacoesEntreAsCartas(5)">swap_horiz</v-icon>
                          </div>
                        </td>
                        <td class="pr-2">
                          <v-img class="mt-2 mb-2 pa-3 carta" :src="carta7.image"></v-img>
                        </td>
                        <td class="pl-2" style="font-size: 18pt; font-weight: bold; color: black" justify="center" align="center">
                          <div v-if="travarMovimentacaoDaMesaDoPlayer === true">
                            <v-icon v-if="vezDoJogador" @click="movimentacoesEntreAsCartas(6)">swap_horiz</v-icon>
                          </div>
                        </td>
                        <td class="pr-2">
                          <v-img class="mt-2 mb-2 pa-3 carta" :src="carta8.image"></v-img>
                        </td>
                      </tr>
                    </table>
                  </v-flex>
                </v-flex>
              </v-card>
            </td>
            <td>
              <!-- Card do oponente -->
              <v-icon class="mx-2" color="error">person_pin</v-icon>
              <div v-if="mostrarTableFinal">
                <v-card max-width="600px" color="red" class="pa-2 ma-2 centralized" height dark>
                  <h3 class="mx-2">Cartas do seu oponente</h3>
                  <v-flex class="center">
                    <v-flex>
                      <table border="0" class="mt-2 mb-2 pt-2 pb-2">
                        <tr>
                          <th class="px-2">Posição</th>
                          <td>1ª Carta</td>
                          <td>2ª Carta</td>
                          <td>3ª Carta</td>
                          <td>4ª Carta</td>
                        </tr>
                        <tr>
                          <th>MÃO</th>
                          <td class="pr-2">
                            <v-img class="mt-2 mb-2 pa-3 carta" :src="cartaOponente1.image"></v-img>
                          </td>
                          <td class="pr-2">
                            <v-img class="mt-2 mb-2 pa-3 carta" :src="cartaOponente2.image"></v-img>
                          </td>
                          <td class="pr-2">
                            <v-img class="mt-2 mb-2 pa-3 carta" :src="cartaOponente3.image"></v-img>
                          </td>
                          <td class="pr-2">
                            <v-img class="mt-2 mb-2 pa-3 carta" :src="cartaOponente4.image"></v-img>
                          </td>
                        </tr>
                        <tr>
                          <th>Posição</th>
                          <td>5ª Carta</td>
                          <td>6ª Carta</td>
                          <td>7ª Carta</td>
                          <td>8ª Carta</td>
                        </tr>
                        <tr>
                          <th>MESA</th>
                          <td class="pr-2">
                            <v-img class="mt-2 mb-2 pa-3 carta" :src="cartaOponente5.image"></v-img>
                          </td>
                          <td class="pr-2">
                            <v-img class="mt-2 mb-2 pa-3 carta" :src="cartaOponente6.image"></v-img>
                          </td>
                          <td class="pr-2">
                            <v-img class="mt-2 mb-2 pa-3 carta" :src="cartaOponente7.image"></v-img>
                          </td>
                          <td class="pr-2">
                            <v-img class="mt-2 mb-2 pa-3 carta" :src="cartaOponente8.image"></v-img>
                          </td>
                        </tr>
                      </table>
                    </v-flex>
                  </v-flex>
                </v-card>
              </div>
              <div v-else-if="!mostrarTableFinal">
                <v-card max-width="600px" color="red" class="pa-2 ma-2 centralized" height dark>
                  <h3 class="mx-2">Cartas do seu oponente</h3>
                  <v-flex class="center">
                    <v-flex>
                      <table border="0" class="mt-2 mb-2 pt-2 pb-2">
                        <tr>
                          <th class="px-2">Posição</th>
                          <td>1ª Carta</td>
                          <td>2ª Carta</td>
                          <td>3ª Carta</td>
                          <td>4ª Carta</td>
                        </tr>
                        <tr>
                          <th>MÃO</th>
                          <td class="pr-2">
                            <v-img class="mt-2 mb-2 pa-3 carta" :src="cartaVirada1.image"></v-img>
                          </td>
                          <td class="pr-2">
                            <v-img class="mt-2 mb-2 pa-3 carta" :src="cartaVirada2.image"></v-img>
                          </td>
                          <td class="pr-2">
                            <v-img class="mt-2 mb-2 pa-3 carta" :src="cartaVirada3.image"></v-img>
                          </td>
                          <td class="pr-2">
                            <v-img class="mt-2 mb-2 pa-3 carta" :src="cartaVirada4.image"></v-img>
                          </td>
                        </tr>
                        <tr>
                          <th>Posição</th>
                          <td>5ª Carta</td>
                          <td>6ª Carta</td>
                          <td>7ª Carta</td>
                          <td>8ª Carta</td>
                        </tr>
                        <tr>
                          <th>MESA</th>
                          <td class="pr-2">
                            <v-img class="mt-2 mb-2 pa-3 carta" :src="cartaVirada1.image"></v-img>
                          </td>
                          <td class="pr-2">
                            <v-img class="mt-2 mb-2 pa-3 carta" :src="cartaVirada2.image"></v-img>
                          </td>
                          <td class="pr-2">
                            <v-img class="mt-2 mb-2 pa-3 carta" :src="cartaVirada3.image"></v-img>
                          </td>
                          <td class="pr-2">
                            <v-img class="mt-2 mb-2 pa-3 carta" :src="cartaVirada4.image"></v-img>
                          </td>
                        </tr>
                      </table>
                    </v-flex>
                  </v-flex>
                </v-card>
              </div>
            </td>
            <td>
              <!-- Card das AÇÕES que o player pode fazer -->
              <v-icon v-if="!acabouOjogo" class="mx-2" color="warning">my_location</v-icon>
              <v-card max-width="600px" elevation="20" class="pa-2 ma-2 centralized" height dark v-if="!acabouOjogo">
                <h3>Suas ações</h3>
                <span>Você pode sacar uma carta ou pegar uma carta do seu oponente por meio do "Challenge"</span>
                <v-card color="success" class="pr-2 pl-2 mt-2 mb-2" v-if="vezDoJogador">
                  <v-card-title>Sacar carta do monte</v-card-title>
                  <v-card-actions>
                    <v-btn color="primary" small @click="vezDoPlayer1()">+1 carta</v-btn>
                  </v-card-actions>
                </v-card>
                <v-card color="error" class="pr-2 pl-2 mt-2 mb-2" v-if="vezDoJogador">
                  <v-card-title>Desafiar seu oponente por uma carta dele</v-card-title>
                  <v-card-actions>
                    <v-btn color="primary" small @click="ehDesafio = true">Challenge</v-btn>
                  </v-card-actions>
                </v-card>
              </v-card>
            </td>
          </tr>
        </table>

        <!-- Logs das mensagens ao player -->
        <v-card elevation="10" height dark width="100%" class="mr-2 pa-3 table" v-if="mostrarLogs">
          <fieldset class="textoAlinhadoAEsquerda overflow-auto">
            <legend style="border: 0px black solid;margin-left: 1em; padding: 0.2em 0.8em ">Logs</legend>
            <div v-for="log in logs" v-bind:key="log.code" class="ml-2 pl-2 overflow-auto" height="80%">
              <span>({{log.code}}) </span>
              <span>{{log.dataFmt}}: </span>
              <span>{{log.msg}} </span>
            </div>
          </fieldset>
        </v-card>
        
        <!-- 1º Card de Desafio: quando o player1 desafia a IA -->
        <template>
          <v-dialog v-model="ehDesafio" max-width="550">
            
            <template justify="start" align="start">
              <div>
                <v-stepper style="background-color: rgb(76,175,80)" v-model="passoApassoDoDesafio" :vertical="passoApassoDoDesafioVertical" :alt-labels="passoApassoDoDesafioLabels">
                  <template>

                    <v-stepper-header>
                      <v-stepper-step step="1">
                        Escolha a carta do seu oponente
                      </v-stepper-step>
                      
                      <v-stepper-step step="2">
                        Escolha a sua carta para desafiar
                      </v-stepper-step>
                    </v-stepper-header>

                    <v-stepper-items>
                      <v-stepper-content step="1">
                        
                        <v-card color="success">
                          <v-card-text>
                            Se ganhar, a carta do seu oponente vai para sua mão e você perde a carta que usou para o desafio!
                          </v-card-text>
                          
                          <template>
                            <table class="ml-3 mb-2">
                              <tr>
                                <td class="pr-2">
                                  <h4>5ª Carta</h4>
                                  <v-img v-on:click="objetoCartaDaMesaDoOponenteSelecionado = cartaOponente5, cartaDoOponenteEscolhidaPeloPlayer = 'cartaOponente5'" class="mt-2 mb-2 pa-3 carta cartaPointer cartaSelecionada" :src="cartaVirada1.image"></v-img>
                                </td>
                                <td class="pr-2">
                                  <h4>6ª Carta</h4>
                                  <v-img v-on:click="objetoCartaDaMesaDoOponenteSelecionado = cartaOponente6, cartaDoOponenteEscolhidaPeloPlayer = 'cartaOponente6'" class="mt-2 mb-2 pa-3 carta cartaPointer cartaSelecionada" :src="cartaVirada2.image"></v-img>
                                </td>
                                <td class="pr-2">
                                  <h4>7ª Carta</h4>
                                  <v-img v-on:click="objetoCartaDaMesaDoOponenteSelecionado = cartaOponente7, cartaDoOponenteEscolhidaPeloPlayer = 'cartaOponente7'" class="mt-2 mb-2 pa-3 carta cartaPointer cartaSelecionada" :src="cartaVirada3.image"></v-img>
                                </td>
                                <td class="pr-2">
                                  <h4>8ª Carta</h4>
                                  <v-img v-on:click="objetoCartaDaMesaDoOponenteSelecionado = cartaOponente8, cartaDoOponenteEscolhidaPeloPlayer = 'cartaOponente8'" class="mt-2 mb-2 pa-3 carta cartaPointer cartaSelecionada" :src="cartaVirada4.image"></v-img>
                                </td>
                              </tr>
                            </table>
                          </template>

                          <v-card-actions class="mt-2">
                            <v-btn color="error" text @click="ehDesafio = false">
                              <v-icon class="mr-2">cancel</v-icon>
                              Cancelar
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn color="green darken-1" style="color: white" text @click="passoApassoDoDesafio = 2">
                              Continuar
                              <v-icon>keyboard_arrow_right</v-icon>
                            </v-btn>
                          </v-card-actions>
                        </v-card>

                      </v-stepper-content>
                      
                      <v-stepper-content step="2">

                        <v-card color="success">
                          <v-card-text>
                            Escolha a sua carta da mão que você acha que irá ganhar o desafio. Escolha a maior carta, óbvio!
                          </v-card-text>
                          
                            <template>
                              <table class="ml-3 mb-2">
                                <tr>
                                  <td class="pr-2">
                                    <v-img v-on:click="objetoCartaDaMaoDoPlayerSelecionada = carta1, cartaDaMaoEscolhidaPeloPlayer = 'carta1'" class="mt-2 mb-2 pa-3 carta cartaPointer cartaSelecionada" :src="carta1.image"></v-img>
                                  </td>
                                  <td class="pr-2">
                                    <v-img v-on:click="objetoCartaDaMaoDoPlayerSelecionada = carta2, cartaDaMaoEscolhidaPeloPlayer = 'carta2'" class="mt-2 mb-2 pa-3 carta cartaPointer cartaSelecionada" :src="carta2.image"></v-img>
                                  </td>
                                  <td class="pr-2">
                                    <v-img v-on:click="objetoCartaDaMaoDoPlayerSelecionada = carta3, cartaDaMaoEscolhidaPeloPlayer = 'carta3'" class="mt-2 mb-2 pa-3 carta cartaPointer cartaSelecionada" :src="carta3.image"></v-img>
                                  </td>
                                  <td class="pr-2">
                                    <v-img v-on:click="objetoCartaDaMaoDoPlayerSelecionada = carta4, cartaDaMaoEscolhidaPeloPlayer = 'carta4'" class="mt-2 mb-2 pa-3 carta cartaPointer cartaSelecionada" :src="carta4.image"></v-img>
                                  </td>
                                </tr>
                              </table>
                            </template>

                          <v-card-actions class="mt-2">
                            <v-btn color="error" text @click="passoApassoDoDesafio = 1">
                              <v-icon>keyboard_arrow_left</v-icon>
                              Voltar
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn color="green darken-1" style="color: white" text @click="desafiar()">
                              Desafiar
                              <v-icon class="ml-2">adjust</v-icon>
                            </v-btn>
                          </v-card-actions>
                        </v-card>


                      </v-stepper-content>
                    </v-stepper-items>

                  </template>
                </v-stepper>
              </div>
            </template>

            

          </v-dialog>
        </template>

        <!-- 2º Card de Desafio: quando a IA desafia o player1 -->
        <template>
          <v-dialog v-model="ehDesafioDaIa" max-width="550" persistent>
            
            <template>
              <div>
                <v-card color="error">

                  <v-card-title>
                    <h3 style="color: white">
                      Opa, é hora do duelo!
                    </h3>
                  </v-card-title>
                      
                  <v-card-text style="color: white">
                    A Bruna está te desafiando e ela quer essa carta que está na sua mesa: {{ cartaDesejadaPelaIa.nome }} {{ cartaDesejadaPelaIa.naipe }}<br>
                    <br>
                    E aí, vai deixar ela ganhar? Selecione sua maior carta na mão. Se der empate ou você ganhar o desafio, você não perderá sua carta da mesa, apenas perderá a carta da mão que utilizou para o desafio.<br>
                    <br>
                  </v-card-text>
                  
                  <template>
                    <table class="ml-3 mb-2">
                      <tr style="color: white">
                        <td class="pr-2">
                          <h4>1ª Carta</h4>
                          <v-img v-on:click="objetoCartaDaMaoDoPlayerSelecionadoParaDesafioDaIa = carta1, cartaDaMaoDoPlayerSelecionadoParaDesafioDaIa = 'carta1'" class="mt-2 mb-2 pa-3 carta cartaPointer cartaSelecionada" :src="carta1.image"></v-img>
                        </td>
                        <td class="pr-2">
                          <h4>2ª Carta</h4>
                          <v-img v-on:click="objetoCartaDaMaoDoPlayerSelecionadoParaDesafioDaIa = carta2, cartaDaMaoDoPlayerSelecionadoParaDesafioDaIa = 'carta2'" class="mt-2 mb-2 pa-3 carta cartaPointer cartaSelecionada" :src="carta2.image"></v-img>
                        </td>
                        <td class="pr-2">
                          <h4>3ª Carta</h4>
                          <v-img v-on:click="objetoCartaDaMaoDoPlayerSelecionadoParaDesafioDaIa = carta3, cartaDaMaoDoPlayerSelecionadoParaDesafioDaIa = 'carta3'" class="mt-2 mb-2 pa-3 carta cartaPointer cartaSelecionada" :src="carta3.image"></v-img>
                        </td>
                        <td class="pr-2">
                          <h4>4ª Carta</h4>
                          <v-img v-on:click="objetoCartaDaMaoDoPlayerSelecionadoParaDesafioDaIa = carta4, cartaDaMaoDoPlayerSelecionadoParaDesafioDaIa = 'carta4'" class="mt-2 mb-2 pa-3 carta cartaPointer cartaSelecionada" :src="carta4.image"></v-img>
                        </td>
                      </tr>
                    </table>
                  </template>

                  <v-card-actions class="mt-2">
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" style="color: white" text @click="terminarDesafioContraIA()">
                      Continuar
                      <v-icon class="ml-2">adjust</v-icon>
                    </v-btn>
                  </v-card-actions>

                </v-card>
              </div>
            </template>

            

          </v-dialog>
        </template>

        <!-- Card do ganhador -->
        <div class="text-center">
          <v-dialog v-model="avisoDoGanhador" width="500">
            <v-card>
              <v-card-title class="headline grey lighten-2" primary-title>
                Acabou!
              </v-card-title>

              <v-card-text>
                {{ msgDoGanhador }}                
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="resetar()">
                  Jogar Novamente
                </v-btn>
                <v-btn color="warning" text @click="visualizarFinal()">
                  Fechar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>

        <!-- --Monte das cartas de compra-- -->
        <!-- <fieldset class="mt-2 pa-2 table" v-if="mostrarMesaDoPlayer1 != 0">
          <legend style="border: 1px black solid;margin-left: 1em; padding: 0.2em 0.8em ">Monte</legend>
          <v-layout class="baralho2">
              <v-img class="mt-2 mb-2 pa-3 carta" v-for="carta in todasAsCartas" :key="carta.id" :src="carta.image"></v-img>
          </v-layout>
        </fieldset> -->

      </v-card>     
      <!-- ►►►►►►►►►►►►► -->


    </v-layout>
  </v-container>
</template>


<script>

export default {

  data: () => ({
    
    vezDoTurno: 0,

    cartaVirada1: {'image': require('@/assets/cartas/cartaVirada.png')},
    cartaVirada2: {'image': require('@/assets/cartas/cartaVirada2.png')},
    cartaVirada3: {'image': require('@/assets/cartas/cartaVirada3.png')},
    cartaVirada4: {'image': require('@/assets/cartas/cartaVirada4.png')},
    
    todasAsCartas:[

      { 'id': 48,    'carta': 'Dez de Paus',        'nome': 'Dez',        'valor': 10,    'naipe': 'de ♣',     'image': require('@/assets/cartas/dezdepaus.png')},
      { 'id': 13,    'carta': 'Ás de Ouros',        'nome': 'Ás',         'valor': 14,    'naipe': 'de ♦',     'image': require('@/assets/cartas/asdeouros.png')},
      { 'id': 4,     'carta': 'Cinco de Ouros',     'nome': 'Cinco',      'valor': 5,     'naipe': 'de ♦',     'image': require('@/assets/cartas/cincodeouros.png')},
      { 'id': 105,   'carta': 'Reis de Paus',       'nome': 'Reis',       'valor': 13,    'naipe': 'de ♣',      'image': require('@/assets/cartas/reisdepaus.png')},
      { 'id': 65,    'carta': 'Valete de Ouros',    'nome': 'Valete',     'valor': 12,    'naipe': 'de ♦',     'image': require('@/assets/cartas/valetedeouros.png')},
      { 'id': 14,    'carta': 'Dois de Espadas',    'nome': 'Dois',       'valor': 2,     'naipe': 'de ♠',   'image': require('@/assets/cartas/doisdeespadas.png')},
      { 'id': 7,     'carta': 'Oito de Ouros',      'nome': 'Oito',       'valor': 8,     'naipe': 'de ♦',     'image': require('@/assets/cartas/oitodeouros.png')},
      { 'id': 28,    'carta': 'Três de Copas',      'nome': 'Três',       'valor': 3,     'naipe': 'de ♥',     'image': require('@/assets/cartas/tresdecopas.png')},
      { 'id': 9,     'carta': 'Dez de Ouros',       'nome': 'Dez',        'valor': 10,    'naipe': 'de ♦',     'image': require('@/assets/cartas/dezdeouros.png')},
      { 'id': 26,    'carta': 'Ás de Espadas',      'nome': 'Ás',         'valor': 14,    'naipe': 'de ♠',   'image': require('@/assets/cartas/asdeespadas.png')},
      { 'id': 11,    'carta': 'Valete de Ouros',    'nome': 'Valete',     'valor': 12,    'naipe': 'de ♦',     'image': require('@/assets/cartas/valetedeouros.png')},
      { 'id': 34,    'carta': 'Nove de Copas',      'nome': 'Nove',       'valor': 9,     'naipe': 'de ♥',     'image': require('@/assets/cartas/novedecopas.png')},
      { 'id': 8,     'carta': 'Nove de Ouros',      'nome': 'Nove',       'valor': 9,     'naipe': 'de ♦',     'image': require('@/assets/cartas/novedeouros.png')},
      { 'id': 15,    'carta': 'Três de Espadas',    'nome': 'Três',       'valor': 3,     'naipe': 'de ♠',   'image': require('@/assets/cartas/tresdeespadas.png')},
      { 'id': 16,    'carta': 'Quatro de Espadas',  'nome': 'Quatro',     'valor': 4,     'naipe': 'de ♠',   'image': require('@/assets/cartas/quatrodeespadas.png')},
      { 'id': 17,    'carta': 'Cinco de Espadas',   'nome': 'Cinco',      'valor': 5,     'naipe': 'de ♠',   'image': require('@/assets/cartas/cincodeespadas.png')},
      { 'id': 6,     'carta': 'Sete de Ouros',      'nome': 'Sete',       'valor': 7,     'naipe': 'de ♦',     'image': require('@/assets/cartas/setedeouros.png')},
      { 'id': 50,    'carta': 'Valete de Paus',     'nome': 'Valete',     'valor': 12,    'naipe': 'de ♣',      'image': require('@/assets/cartas/valetedepaus.png')},
      { 'id': 18,    'carta': 'Seis de Espadas',    'nome': 'Seis',       'valor': 6,     'naipe': 'de ♠',   'image': require('@/assets/cartas/seisdeespadas.png')},
      { 'id': 44,    'carta': 'Seis de Paus',       'nome': 'Seis',       'valor': 6,     'naipe': 'de ♣',      'image': require('@/assets/cartas/seisdepaus.png')},
      { 'id': 69,    'carta': 'Três de Espadas',    'nome': 'Três',       'valor': 3,     'naipe': 'de ♠',   'image': require('@/assets/cartas/tresdeespadas.png')},
      { 'id': 19,    'carta': 'Sete de Espadas',    'nome': 'Sete',       'valor': 7,     'naipe': 'de ♠',   'image': require('@/assets/cartas/setedeespadas.png')},
      { 'id': 20,    'carta': 'Oito de Espadas',    'nome': 'Oito',       'valor': 8,     'naipe': 'de ♠',   'image': require('@/assets/cartas/oitodeespadas.png')},
      { 'id': 22,    'carta': 'Dez de Espadas',     'nome': 'Dez',        'valor': 10,    'naipe': 'de ♠',   'image': require('@/assets/cartas/dezdeespadas.png')},
      { 'id': 23,    'carta': 'Dama de Espadas',    'nome': 'Dama',       'valor': 11,    'naipe': 'de ♠',   'image': require('@/assets/cartas/damadeespadas.png')},
      { 'id': 5,     'carta': 'Seis de Ouros',      'nome': 'Seis',       'valor': 6,     'naipe': 'de ♦',     'image': require('@/assets/cartas/seisdeouros.png')},
      { 'id': 24,    'carta': 'Valete de Espadas',  'nome': 'Valete',     'valor': 12,    'naipe': 'de ♠',   'image': require('@/assets/cartas/valetedeespadas.png')},
      { 'id': 25,    'carta': 'Reis de Espadas',    'nome': 'Reis',       'valor': 13,    'naipe': 'de ♠',   'image': require('@/assets/cartas/reisdeespadas.png')},
      { 'id': 27,    'carta': 'Dois de Copas',      'nome': 'Dois',       'valor': 2,     'naipe': 'de ♥',     'image': require('@/assets/cartas/doisdecopas.png')},
      // { 'id': 108,   'carta': 'Coringa Vermelho',   'nome': 'Coringa',    'valor': 15,    'naipe': 'sem naipe',    'image': require('@/assets/cartas/redcoringa.png')},
      { 'id': 29,    'carta': 'Quatro de Copas',    'nome': 'Quatro',     'valor': 4,     'naipe': 'de ♥',     'image': require('@/assets/cartas/quatrodecopas.png')},
      { 'id': 30,    'carta': 'Cinco de Copas',     'nome': 'Cinco',      'valor': 5,     'naipe': 'de ♥',     'image': require('@/assets/cartas/cincodecopas.png')},
      { 'id': 31,    'carta': 'Seis de Copas',      'nome': 'Seis',       'valor': 6,     'naipe': 'de ♥',     'image': require('@/assets/cartas/seisdecopas.png')},
      { 'id': 3,     'carta': 'Quatro de Ouros',    'nome': 'Quatro',     'valor': 4,     'naipe': 'de ♦',     'image': require('@/assets/cartas/quatrodeouros.png')},
      { 'id': 33,    'carta': 'Oito de Copas',      'nome': 'Oito',       'valor': 8,     'naipe': 'de ♥',     'image': require('@/assets/cartas/oitodecopas.png')},
      { 'id': 21,    'carta': 'Nove de Espadas',    'nome': 'Nove',       'valor': 9,     'naipe': 'de ♠',   'image': require('@/assets/cartas/novedeespadas.png')},
      { 'id': 62,    'carta': 'Nove de Ouros',      'nome': 'Nove',       'valor': 9,     'naipe': 'de ♦',     'image': require('@/assets/cartas/novedeouros.png')},
      { 'id': 73,    'carta': 'Sete de Espadas',    'nome': 'Sete',       'valor': 7,     'naipe': 'de ♠',   'image': require('@/assets/cartas/setedeespadas.png')},
      { 'id': 12,    'carta': 'Reis de Ouros',      'nome': 'Reis',       'valor': 13,    'naipe': 'de ♦',     'image': require('@/assets/cartas/reisdeouros.png')},
      { 'id': 35,    'carta': 'Dez de Copas',       'nome': 'Dez',        'valor': 10,    'naipe': 'de ♥',     'image': require('@/assets/cartas/dezdecopas.png')},
      { 'id': 36,    'carta': 'Dama de Copas',      'nome': 'Dama',       'valor': 11,    'naipe': 'de ♥',     'image': require('@/assets/cartas/damadecopas.png')},
      { 'id': 37,    'carta': 'Valete de Copas',    'nome': 'Valete',     'valor': 12,    'naipe': 'de ♥',     'image': require('@/assets/cartas/valetedecopas.png')},
      { 'id': 42,    'carta': 'Quatro de Paus',     'nome': 'Quatro',     'valor': 4,     'naipe': 'de ♣',      'image': require('@/assets/cartas/quatrodepaus.png')},
      { 'id': 100,   'carta': 'Oito de Paus',       'nome': 'Oito',       'valor': 8,     'naipe': 'de ♣',      'image': require('@/assets/cartas/oitodepaus.png')},
      { 'id': 39,    'carta': 'Ás de Copas',        'nome': 'Ás',         'valor': 14,    'naipe': 'de ♥',     'image': require('@/assets/cartas/asdecopas.png')},
      { 'id': 53,    'carta': 'Coringa Preto',      'nome': 'Coringa',    'valor': 15,    'naipe': 'sem naipe',    'image': require('@/assets/cartas/blackcoringa.png')},
      { 'id': 1,     'carta': 'Dois de Ouros',      'nome': 'Dois',       'valor': 2,     'naipe': 'de ♦',     'image': require('@/assets/cartas/doisdeouros.png')},
      { 'id': 41,    'carta': 'Três de Paus',       'nome': 'Três',       'valor': 3,     'naipe': 'de ♣',      'image': require('@/assets/cartas/tresdepaus.png')},
      { 'id': 47,    'carta': 'Nove de Paus',       'nome': 'Nove',       'valor': 9,     'naipe': 'de ♣',      'image': require('@/assets/cartas/novedepaus.png')},
      { 'id': 64,    'carta': 'Dama de Ouros',      'nome': 'Dama',       'valor': 11,    'naipe': 'de ♦',     'image': require('@/assets/cartas/damadeouros.png')},
      { 'id': 38,    'carta': 'Reis de Copas',      'nome': 'Reis',       'valor': 13,    'naipe': 'de ♥',     'image': require('@/assets/cartas/reisdecopas.png')},
      { 'id': 93,    'carta': 'Ás de Copas',        'nome': 'Ás',         'valor': 14,    'naipe': 'de ♥',     'image': require('@/assets/cartas/asdecopas.png')},
      { 'id': 40,    'carta': 'Dois de Paus',       'nome': 'Dois',       'valor': 2,     'naipe': 'de ♣',      'image': require('@/assets/cartas/doisdepaus.png')},
      { 'id': 45,    'carta': 'Sete de Paus',       'nome': 'Sete',       'valor': 7,     'naipe': 'de ♣',      'image': require('@/assets/cartas/setedepaus.png')},
      { 'id': 95,    'carta': 'Três de Paus',       'nome': 'Três',       'valor': 3,     'naipe': 'de ♣',      'image': require('@/assets/cartas/tresdepaus.png')},
      { 'id': 46,    'carta': 'Oito de Paus',       'nome': 'Oito',       'valor': 8,     'naipe': 'de ♣',      'image': require('@/assets/cartas/oitodepaus.png')},
      { 'id': 10,    'carta': 'Dama de Ouros',      'nome': 'Dama',       'valor': 11,    'naipe': 'de ♦',     'image': require('@/assets/cartas/damadeouros.png')},
      { 'id': 84,    'carta': 'Cinco de Copas',     'nome': 'Cinco',      'valor': 5,     'naipe': 'de ♥',     'image': require('@/assets/cartas/cincodecopas.png')},
      { 'id': 51,    'carta': 'Reis de Paus',       'nome': 'Reis',       'valor': 13,    'naipe': 'de ♣',      'image': require('@/assets/cartas/reisdepaus.png')},
      { 'id': 52,    'carta': 'Ás de Paus',         'nome': 'Ás',         'valor': 14,    'naipe': 'de ♣',      'image': require('@/assets/cartas/asdepaus.png')},           
      { 'id': 106,   'carta': 'Ás de Paus',         'nome': 'Ás',         'valor': 14,    'naipe': 'de ♣',      'image': require('@/assets/cartas/asdepaus.png')},           
      // { 'id': 107,   'carta': 'Coringa Preto',      'nome': 'Coringa',    'valor': 15,    'naipe': 'sem naipe',    'image': require('@/assets/cartas/blackcoringa.png')},
      { 'id': 56,    'carta': 'Três de Ouros',      'nome': 'Três',       'valor': 3,     'naipe': 'de ♦',     'image': require('@/assets/cartas/tresdeouros.png')},
      { 'id': 57,    'carta': 'Quatro de Ouros',    'nome': 'Quatro',     'valor': 4,     'naipe': 'de ♦',     'image': require('@/assets/cartas/quatrodeouros.png')},
      { 'id': 59,    'carta': 'Seis de Ouros',      'nome': 'Seis',       'valor': 6,     'naipe': 'de ♦',     'image': require('@/assets/cartas/seisdeouros.png')},
      { 'id': 32,    'carta': 'Sete de Copas',      'nome': 'Sete',       'valor': 7,     'naipe': 'de ♥',     'image': require('@/assets/cartas/setedecopas.png')},
      { 'id': 43,    'carta': 'Cinco de Paus',      'nome': 'Cinco',      'valor': 5,     'naipe': 'de ♣',      'image': require('@/assets/cartas/cincodepaus.png')},
      { 'id': 60,    'carta': 'Sete de Ouros',      'nome': 'Sete',       'valor': 7,     'naipe': 'de ♦',     'image': require('@/assets/cartas/setedeouros.png')},
      { 'id': 92,    'carta': 'Reis de Copas',      'nome': 'Reis',       'valor': 13,    'naipe': 'de ♥',     'image': require('@/assets/cartas/reisdecopas.png')},
      { 'id': 77,    'carta': 'Dama de Espadas',    'nome': 'Dama',       'valor': 11,    'naipe': 'de ♠',   'image': require('@/assets/cartas/damadeespadas.png')},
      { 'id': 2,     'carta': 'Três de Ouros',      'nome': 'Três',       'valor': 3,     'naipe': 'de ♦',     'image': require('@/assets/cartas/tresdeouros.png')},
      { 'id': 86,    'carta': 'Sete de Copas',      'nome': 'Sete',       'valor': 7,     'naipe': 'de ♥',     'image': require('@/assets/cartas/setedecopas.png')},
      { 'id': 80,    'carta': 'Ás de Espadas',      'nome': 'Ás',         'valor': 14,    'naipe': 'de ♠',   'image': require('@/assets/cartas/asdeespadas.png')},
      { 'id': 98,    'carta': 'Seis de Paus',       'nome': 'Seis',       'valor': 6,     'naipe': 'de ♣',      'image': require('@/assets/cartas/seisdepaus.png')},
      { 'id': 67,    'carta': 'Ás de Ouros',        'nome': 'Ás',         'valor': 14,    'naipe': 'de ♦',     'image': require('@/assets/cartas/asdeouros.png')},
      { 'id': 68,    'carta': 'Dois de Espadas',    'nome': 'Dois',       'valor': 2,     'naipe': 'de ♠',   'image': require('@/assets/cartas/doisdeespadas.png')},
      { 'id': 63,    'carta': 'Dez de Ouros',       'nome': 'Dez',        'valor': 10,    'naipe': 'de ♦',     'image': require('@/assets/cartas/dezdeouros.png')},
      { 'id': 70,    'carta': 'Quatro de Espadas',  'nome': 'Quatro',     'valor': 4,     'naipe': 'de ♠',   'image': require('@/assets/cartas/quatrodeespadas.png')},
      { 'id': 71,    'carta': 'Cinco de Espadas',   'nome': 'Cinco',      'valor': 5,     'naipe': 'de ♠',   'image': require('@/assets/cartas/cincodeespadas.png')},
      { 'id': 102,   'carta': 'Dez de Paus',        'nome': 'Dez',        'valor': 10,    'naipe': 'de ♣,',     'image': require('@/assets/cartas/dezdepaus.png')},
      { 'id': 72,    'carta': 'Seis de Espadas',    'nome': 'Seis',       'valor': 6,     'naipe': 'de ♠',   'image': require('@/assets/cartas/seisdeespadas.png')},
      { 'id': 101,   'carta': 'Nove de Paus',       'nome': 'Nove',       'valor': 9,     'naipe': 'de ♣',      'image': require('@/assets/cartas/novedepaus.png')},
      { 'id': 75,    'carta': 'Nove de Espadas',    'nome': 'Nove',       'valor': 9,     'naipe': 'de ♠',   'image': require('@/assets/cartas/novedeespadas.png')},
      { 'id': 76,    'carta': 'Dez de Espadas',     'nome': 'Dez',        'valor': 10,    'naipe': 'de ♠',   'image': require('@/assets/cartas/dezdeespadas.png')},
      { 'id': 74,    'carta': 'Oito de Espadas',    'nome': 'Oito',       'valor': 8,     'naipe': 'de ♠',   'image': require('@/assets/cartas/oitodeespadas.png')},
      { 'id': 78,    'carta': 'Valete de Espadas',  'nome': 'Valete',     'valor': 12,    'naipe': 'de ♠',   'image': require('@/assets/cartas/valetedeespadas.png')},
      { 'id': 58,    'carta': 'Cinco de Ouros',     'nome': 'Cinco',      'valor': 5,     'naipe': 'de ♦',     'image': require('@/assets/cartas/cincodeouros.png')},
      { 'id': 54,    'carta': 'Coringa Vermelho',   'nome': 'Coringa',    'valor': 15,    'naipe': 'sem naipe',    'image': require('@/assets/cartas/redcoringa.png')},
      { 'id': 82,    'carta': 'Três de Copas',      'nome': 'Três',       'valor': 3,     'naipe': 'de ♥',     'image': require('@/assets/cartas/tresdecopas.png')},
      { 'id': 66,    'carta': 'Reis de Ouros',      'nome': 'Reis',       'valor': 13,    'naipe': 'de ♦',     'image': require('@/assets/cartas/reisdeouros.png')},
      { 'id': 83,    'carta': 'Quatro de Copas',    'nome': 'Quatro',     'valor': 4,     'naipe': 'de ♥',     'image': require('@/assets/cartas/quatrodecopas.png')},
      { 'id': 81,    'carta': 'Dois de Copas',      'nome': 'Dois',       'valor': 2,     'naipe': 'de ♥',     'image': require('@/assets/cartas/doisdecopas.png')},
      { 'id': 61,    'carta': 'Oito de Ouros',      'nome': 'Oito',       'valor': 8,     'naipe': 'de ♦',     'image': require('@/assets/cartas/oitodeouros.png')},
      { 'id': 103,   'carta': 'Dama de Paus',       'nome': 'Dama',       'valor': 11,    'naipe': 'de ♣',      'image': require('@/assets/cartas/damadepaus.png')},
      { 'id': 85,    'carta': 'Seis de Copas',      'nome': 'Seis',       'valor': 6,     'naipe': 'de ♥',     'image': require('@/assets/cartas/seisdecopas.png')},
      { 'id': 87,    'carta': 'Oito de Copas',      'nome': 'Oito',       'valor': 8,     'naipe': 'de ♥',     'image': require('@/assets/cartas/oitodecopas.png')},
      { 'id': 88,    'carta': 'Nove de Copas',      'nome': 'Nove',       'valor': 9,     'naipe': 'de ♥',     'image': require('@/assets/cartas/novedecopas.png')},
      { 'id': 89,    'carta': 'Dez de Copas',       'nome': 'Dez',        'valor': 10,    'naipe': 'de ♥',     'image': require('@/assets/cartas/dezdecopas.png')},
      { 'id': 90,    'carta': 'Dama de Copas',      'nome': 'Dama',       'valor': 11,    'naipe': 'de ♥',     'image': require('@/assets/cartas/damadecopas.png')},
      { 'id': 91,    'carta': 'Valete de Copas',    'nome': 'Valete',     'valor': 12,    'naipe': 'de ♥',     'image': require('@/assets/cartas/valetedecopas.png')},
      { 'id': 55,    'carta': 'Dois de Ouros',      'nome': 'Dois',       'valor': 2,     'naipe': 'de ♦',     'image': require('@/assets/cartas/doisdeouros.png')},
      { 'id': 94,    'carta': 'Dois de Paus',       'nome': 'Dois',       'valor': 2,     'naipe': 'de ♣',      'image': require('@/assets/cartas/doisdepaus.png')},
      { 'id': 49,    'carta': 'Dama de Paus',       'nome': 'Dama',       'valor': 11,    'naipe': 'de ♣',      'image': require('@/assets/cartas/damadepaus.png')},
      { 'id': 96,    'carta': 'Quatro de Paus',     'nome': 'Quatro',     'valor': 4,     'naipe': 'de ♣',      'image': require('@/assets/cartas/quatrodepaus.png')},
      { 'id': 79,    'carta': 'Reis de Espadas',    'nome': 'Reis',       'valor': 13,    'naipe': 'de ♠',   'image': require('@/assets/cartas/reisdeespadas.png')},
      { 'id': 97,    'carta': 'Cinco de Paus',      'nome': 'Cinco',      'valor': 5,     'naipe': 'de ♣',      'image': require('@/assets/cartas/cincodepaus.png')},
      { 'id': 99,    'carta': 'Sete de Paus',       'nome': 'Sete',       'valor': 7,     'naipe': 'de ♣',      'image': require('@/assets/cartas/setedepaus.png')},
      { 'id': 104,   'carta': 'Valete de Paus',     'nome': 'Valete',     'valor': 12,    'naipe': 'de ♣',      'image': require('@/assets/cartas/valetedepaus.png')},
    ],
     
    carta1: '',
    carta2: '',      
    carta3: '',
    carta4: '',      
    carta5: '',
    carta6: '',     
    carta7: '',
    carta8: '',
    cartaOponente1: '',
    cartaOponente2: '',
    cartaOponente3: '',
    cartaOponente4: '',
    cartaOponente5: '',
    cartaOponente6: '',
    cartaOponente7: '',
    cartaOponente8: '',

    cartaSacada: '',
    objetoCartaDaMesaDoOponenteSelecionado: {},
    objetoCartaDaMaoDoPlayerSelecionada: {},
    cartaDoOponenteEscolhidaPeloPlayer: '',
    cartaDaMaoEscolhidaPeloPlayer: '',
    cartaDesejadaPelaIa: {},
    objetoCartaDaMaoDoPlayerSelecionadoParaDesafioDaIa: '',
    cartaDaMaoDoPlayerSelecionadoParaDesafioDaIa: '',
    cartaDaMesaGanha: '',

    movimentoDaCartaDaMesaDoPlayerDo1Para5DoPlayer: 0,
    movimentoDaCartaDaMesaDoPlayerDo2Para6DoPlayer: 0,
    movimentoDaCartaDaMesaDoPlayerDo3Para7DoPlayer: 0,
    movimentoDaCartaDaMesaDoPlayerDo4Para8DoPlayer: 0,
    movimentoDaCartaDaMesaDoPlayerDo5Para6DoPlayer: 0,
    movimentoDaCartaDaMesaDoPlayerDo6Para7DoPlayer: 0,
    movimentoDaCartaDaMesaDoPlayerDo7Para8DoPlayer: 0,
    travarMovimentacaoDaMesaDoPlayer: true,

    mostrarMesaDoPlayer1: 0,
    mostrarTableFinal: false,

    logs: [],
    logOrdenado: [],
    numeroDoLog: 0,
    mostrarLogs: false,
    mostrarMsgDeAlertas: true,
    msgDeAlertaDisparar: false,
    msgDeAlerta: '',
    msgDeAlertaCor: '',
    msgDeAlertaTime: 0,

    ehDesafio: false,
    ehDesafioDaIa: false,
    passoApassoDoDesafio: '',
    passoApassoDoDesafioVertical: true,
    passoApassoDoDesafioLabels: true,

    iniciouOjogo: false,
    acabouOjogo: false,
    vezDoJogador: true,
    quemEhAVez: 'É a sua vez',
    quemEhAVezTrueOrFalse: false,
    quemEhAVezCor: 'blue',
    botaoInicial: true,
    
    avisoDoGanhador: false,
    msgDoGanhador: '',

  }),

  mounted: function(){
    this.verificarSeTaLogado()
  },

  methods: {

    // Método para iniciar o jogo dando as 16 cartas pro Player e 16 para a IA
    sacarCartasIniciais() {
      
      this.mostrarMesaDoPlayer1 = 1
      this.msgDeAlertaDisparar = true
      this.log('O jogo começou, é a sua vez!')
      this.msgDeAlerta = 'O jogo começou, é a sua vez!'
      this.msgDeAlertaCor = 'success'
      this.msgDeAlertaTime = 2000

      this.sacarCartaDoMonte()
      this.carta1 = this.cartaSacada

      this.sacarCartaDoMonte()
      this.carta2 = this.cartaSacada

      this.sacarCartaDoMonte()
      this.carta3 = this.cartaSacada

      this.sacarCartaDoMonte()
      this.carta4 = this.cartaSacada
    
      this.sacarCartaDoMonte()
      this.carta5 = this.cartaSacada

      this.sacarCartaDoMonte()
      this.carta6 = this.cartaSacada

      this.sacarCartaDoMonte()
      this.carta7 = this.cartaSacada

      this.sacarCartaDoMonte()
      this.carta8 = this.cartaSacada

      this.sacarCartaDoMonte()
      this.cartaOponente1 = this.cartaSacada

      this.sacarCartaDoMonte()
      this.cartaOponente2 = this.cartaSacada

      this.sacarCartaDoMonte()
      this.cartaOponente3 = this.cartaSacada

      this.sacarCartaDoMonte()
      this.cartaOponente4 = this.cartaSacada

      this.sacarCartaDoMonte()
      this.cartaOponente5 = this.cartaSacada

      this.sacarCartaDoMonte()
      this.cartaOponente6 = this.cartaSacada

      this.sacarCartaDoMonte()
      this.cartaOponente7 = this.cartaSacada

      this.sacarCartaDoMonte()
      this.cartaOponente8 = this.cartaSacada

      this.botaoInicial = false
      this.iniciouOjogo = true

    },

    // Método do Player que saca uma carta do monte e posiciona na primeira carta da mão
    sacarCartaDoMonte () {
      let refId = 0;
      // sorteio da carta
      refId = Math.floor(Math.random() * (this.todasAsCartas.length));
      let cartaRetirada = {}
      cartaRetirada = this.todasAsCartas.splice(refId, 1)
      this.cartaSacada = cartaRetirada[0]
    },

    // Método que chama o sacarCartaDoMonte e já aciona a vez do IA
    vezDoPlayer1 () {
      this.sacarCartaDoMonte()
      this.carta1 = this.cartaSacada
      this.log('Você sacou uma carta do monte');
      this.msgDeAlerta = 'Você sacou uma carta do monte'
      this.vezDoTurno = this.vezDoTurno + 1
      this.msgDeAlertaDisparar = true
      this.msgDeAlertaCor = 'blue'
      this.msgDeAlertaTime = 2000
      this.quemEhAVezCor = 'warning'
      this.quemEhAVez = 'É a vez da Bruna'
      this.quemEhAVezTrueOrFalse = true
      this.vezDoJogador = false
      this.travarMovimentacaoDaMesaDoPlayer = true
      let tempo = Math.floor(Math.random() * 5000)
      setTimeout(() => this.vezDoOponente(), tempo)

    },

    // Método para a IA jogar, fazendo movimentações entre as cartas e sacar cartas do monte ou realizar desafios
    vezDoOponente () {

      let movimentosFeitosPelaIA = ''



      // _____________________JJJJJJJJJJJJJJJJ_____________________
      // _____________________JJJJJJJJJJJJJJJJ_____________________
      // ___________________________JJJJ___________________________
      // ___________________________JJJJ___________________________
      // ___________________________JJJJ___________________________
      // ___________________JJJJ____JJJJ___________________________
      // ____________________JJJJJ__JJJJ___________________________
      // ______________________JJJJJJJJ____________________________
      // Regras para a IA posicionar J de qualquer naipe na posição 5
      if (this.cartaOponente5.nome !==  'Valete' && this.cartaOponente5.nome !== 'Coringa'){
        
        // Se a carta5 não é um valete ou coringa e se a carta1 é um coringa ou valete, então troca de posições do 1 pro 5
        if ((this.cartaOponente5.nome !== 'Valete' && this.cartaOponente5.nome !== 'Coringa') && (this.cartaOponente1.nome === 'Valete' || this.cartaOponente1.nome === 'Coringa')) {
          let novaCarta1 = ''
          let novaCarta5 = ''
          novaCarta1 = this.cartaOponente5
          novaCarta5 = this.cartaOponente1
          this.cartaOponente1 = novaCarta1
          this.cartaOponente5 = novaCarta5
          movimentosFeitosPelaIA = movimentosFeitosPelaIA + ' movimentou carta 1 para o lugar da 5, e'
        } 
        
        // Se a carta5 não é um valete ou coringa e se a carta2 é um coringa ou valete, então troca de posições do 2 pro 5
        if ((this.cartaOponente5.nome !== 'Valete' && this.cartaOponente5.nome !== 'Coringa') && (this.cartaOponente2.nome === 'Valete' || this.cartaOponente2.nome === 'Coringa')) {
          let novaCarta2 = ''
          let novaCarta5 = ''
          novaCarta2 = this.cartaOponente5
          novaCarta5 = this.cartaOponente2
          this.cartaOponente2 = novaCarta2
          this.cartaOponente5 = novaCarta5
          movimentosFeitosPelaIA = movimentosFeitosPelaIA + ' movimentou carta 2 para o lugar da 5, e'
        }
        
        // Se a carta5 não é um valete ou coringa e se a carta3 é um coringa ou valete, então troca de posições do 3 pro 5
        if ((this.cartaOponente5.nome !== 'Valete' && this.cartaOponente5.nome !== 'Coringa') && (this.cartaOponente3.nome === 'Valete' || this.cartaOponente3.nome === 'Coringa')) {
          let novaCarta3 = ''
          let novaCarta5 = ''
          novaCarta3 = this.cartaOponente5
          novaCarta5 = this.cartaOponente3
          this.cartaOponente3 = novaCarta3
          this.cartaOponente5 = novaCarta5
          movimentosFeitosPelaIA = movimentosFeitosPelaIA + ' movimentou carta 3 para o lugar da 5, e'
        }
        
        // Se a carta5 não é um valete ou coringa e se a carta4 é um coringa ou valete, então troca de posições do 4 pro 5
        if ((this.cartaOponente5.nome !== 'Valete' && this.cartaOponente5.nome !== 'Coringa') && (this.cartaOponente4.nome === 'Valete' || this.cartaOponente4.nome === 'Coringa')) {
          let novaCarta4 = ''
          let novaCarta5 = ''
          novaCarta4 = this.cartaOponente5
          novaCarta5 = this.cartaOponente4
          this.cartaOponente4 = novaCarta4
          this.cartaOponente5 = novaCarta5
          movimentosFeitosPelaIA = movimentosFeitosPelaIA + ' movimentou carta 4 para o lugar da 5, e'
        }
        
        // Se a carta5 não é um valete ou coringa e se a carta6 é um coringa ou valete, então troca de posições do 6 pro 5
        if ((this.cartaOponente5.nome !== 'Valete' && this.cartaOponente5.nome !== 'Coringa') && (this.cartaOponente6.nome === 'Valete' || this.cartaOponente6.nome === 'Coringa')) {
          let novaCarta6 = ''
          let novaCarta5 = ''
          novaCarta6 = this.cartaOponente5
          novaCarta5 = this.cartaOponente6
          this.cartaOponente6 = novaCarta6
          this.cartaOponente5 = novaCarta5
          movimentosFeitosPelaIA = movimentosFeitosPelaIA + ' movimentou carta 6 para o lugar da 5, e'
        }
        
        // Se a carta5 não é um valete ou coringa e se a carta7 é um coringa ou valete, então troca de posições do 7 pro 5
        if ((this.cartaOponente5.nome !== 'Valete' && this.cartaOponente5.nome !== 'Coringa') && (this.cartaOponente7.nome === 'Valete' || this.cartaOponente7.nome === 'Coringa')) {
          let novaCarta5 = ''
          let novaCarta7 = ''
          novaCarta5 = this.cartaOponente7
          novaCarta7 = this.cartaOponente5
          this.cartaOponente5 = novaCarta5
          this.cartaOponente7 = novaCarta7
          movimentosFeitosPelaIA = movimentosFeitosPelaIA + ' movimentou carta 7 para o lugar da 5, e'
        }
        
        // Se a carta5 não é um valete ou coringa e se a carta8 é um coringa ou valete, então troca de posições do 8 pro 5
        if ((this.cartaOponente7.nome !== 'Valete' && this.cartaOponente5.nome !== 'Coringa') && (this.cartaOponente8.nome === 'Valete' || this.cartaOponente8.nome === 'Coringa')) { 
          let novaCarta7 = ''
          let novaCarta8 = ''
          novaCarta7 = this.cartaOponente8
          novaCarta8 = this.cartaOponente7
          this.cartaOponente7 = novaCarta7
          this.cartaOponente8 = novaCarta8
          movimentosFeitosPelaIA = movimentosFeitosPelaIA + ' movimentou carta 8 para o lugar da 7, e'
        }
      }


      
      // ____________________________AA____________________________
      // ___________________________AAAA___________________________
      // __________________________AA__AA__________________________
      // _________________________AAA__AAA_________________________
      // ________________________AAA____AAA________________________
      // _______________________AAAAAAAAAAAA_______________________
      // ______________________AAAA______AAAA______________________
      // _____________________AAAA________AAAA_____________________
      // Regras para a IA posicionar A de qualquer naipe na posição 6 respeitando a regra anterior
      if (this.cartaOponente6.nome !== 'Ás' && this.cartaOponente6.nome !== 'Coringa') {

        // Se a carta6 não é um ás ou coringa, e se a carta5 é um ás, então troca de posições do 5 pro 6
        if ((this.cartaOponente6.nome !== 'Coringa' && this.cartaOponente6.nome !== 'Ás') && this.cartaOponente5.nome === 'Ás') {
          let novaCarta6 = ''
          let novaCarta5 = ''
          novaCarta6 = this.cartaOponente5
          novaCarta5 = this.cartaOponente6
          this.cartaOponente6 = novaCarta6
          this.cartaOponente5 = novaCarta5
          movimentosFeitosPelaIA = movimentosFeitosPelaIA + ' movimentou carta 5 para o lugar da 6, e'
        }
        
        // Se a carta6 não é um ás ou coringa, e se a carta7 é um ás, então troca de posições do 7 pro 6
        if ( (this.cartaOponente6.nome !== 'Coringa' && this.cartaOponente6.nome !== 'Ás') && this.cartaOponente7.nome === 'Ás') {
          let novaCarta6 = ''
          let novaCarta7 = ''
          novaCarta6 = this.cartaOponente7
          novaCarta7 = this.cartaOponente6
          this.cartaOponente6 = novaCarta6
          this.cartaOponente7 = novaCarta7
          movimentosFeitosPelaIA = movimentosFeitosPelaIA + ' movimentou carta 7 para o lugar da 6, e'
        }
        
        // Se a carta6 não é um ás ou coringa, e se a carta8 é um ás, então troca de posições do 8 pro 6
        if ( (this.cartaOponente6.nome !== 'Coringa' && this.cartaOponente6.nome !== 'Ás') && this.cartaOponente8.nome === 'Ás') {
          let novaCarta6 = ''
          let novaCarta8 = ''
          novaCarta6 = this.cartaOponente8
          novaCarta8 = this.cartaOponente6
          this.cartaOponente6 = novaCarta6
          this.cartaOponente8 = novaCarta8
          movimentosFeitosPelaIA = movimentosFeitosPelaIA + ' movimentou carta 8 para o lugar da 6, e'
        }
        
        // Se a carta6 não é um Ás, e se a carta1 é um Ás ou Coringa, então troca de posições do 1 pro 6
        if ( (this.cartaOponente6.nome !== 'Ás' && this.cartaOponente6.nome !== 'Coringa') && (this.cartaOponente1.nome === 'Ás' || this.cartaOponente1.nome === 'Coringa')) {
          let novaCarta6 = ''
          let novaCarta1 = ''
          novaCarta6 = this.cartaOponente1
          novaCarta1 = this.cartaOponente6
          this.cartaOponente6 = novaCarta6
          this.cartaOponente1 = novaCarta1
          movimentosFeitosPelaIA = movimentosFeitosPelaIA + ' movimentou carta 1 para o lugar da 6, e'
        }
        
        // Se a carta6 não é um Ás, e se a carta2 é um Ás ou Coringa, então troca de posições do 2 pro 6
        if ( (this.cartaOponente6.nome !== 'Ás' && this.cartaOponente6.nome !== 'Coringa') && (this.cartaOponente2.nome === 'Ás' || this.cartaOponente2.nome === 'Coringa')) {
          let novaCarta6 = ''
          let novaCarta2 = ''
          novaCarta6 = this.cartaOponente2
          novaCarta2 = this.cartaOponente6
          this.cartaOponente6 = novaCarta6
          this.cartaOponente2 = novaCarta2
          movimentosFeitosPelaIA = movimentosFeitosPelaIA + ' movimentou carta 2 para o lugar da 6, e'
        }
        
        // Se a carta6 não é um Ás, e se a carta3 é um Ás ou Coringa, então troca de posições do 3 pro 6
        if ( (this.cartaOponente6.nome !== 'Ás' && this.cartaOponente6.nome !== 'Coringa') && (this.cartaOponente3.nome === 'Ás' || this.cartaOponente3.nome === 'Coringa')) {
          let novaCarta6 = ''
          let novaCarta3 = ''
          novaCarta6 = this.cartaOponente3
          novaCarta3 = this.cartaOponente6
          this.cartaOponente6 = novaCarta6
          this.cartaOponente3 = novaCarta3
          movimentosFeitosPelaIA = movimentosFeitosPelaIA + ' movimentou carta 3 para o lugar da 6, e'
        }
        
        // Se a carta6 não é um Ás, e se a carta4 é um Ás ou Coringa, então troca de posições do 4 pro 6
        if ( (this.cartaOponente6.nome !== 'Ás' && this.cartaOponente6.nome !== 'Coringa') && (this.cartaOponente4.nome === 'Ás' || this.cartaOponente4.nome === 'Coringa')) {
          let novaCarta6 = ''
          let novaCarta4 = ''
          novaCarta6 = this.cartaOponente4
          novaCarta4 = this.cartaOponente6
          this.cartaOponente6 = novaCarta6
          this.cartaOponente4 = novaCarta4
          movimentosFeitosPelaIA = movimentosFeitosPelaIA + ' movimentou carta 4 para o lugar da 6, e'
        }
      }



      // ________________________KKK_____KKK___________________
      // ________________________KKK____KKK____________________
      // ________________________KKK___KKK_____________________
      // ________________________KKK__KKK______________________
      // ________________________KKKKKKKK______________________
      // ________________________KKK___KKK_____________________
      // ________________________KKK____KKK____________________
      // ________________________KKK_____KKK___________________
      // Regras para a IA posicionar K de qualquer naipe na posição 7 respeitando as duas regras anteriores
      if (this.cartaOponente7.nome !== 'Reis' && this.cartaOponente7.nome !== 'Coringa') {
        
        // Se a carta7 não é um Reis, e se a carta1 é um Reis ou Coringa, então troca de posições do 1 pro 7
        if ( (this.cartaOponente7.nome !== 'Reis' && this.cartaOponente7.nome !== 'Coringa') && (this.cartaOponente1.nome === 'Reis' || this.cartaOponente1.nome === 'Coringa')) {
          let novaCarta7 = ''
          let novaCarta1 = ''
          novaCarta7 = this.cartaOponente1
          novaCarta1 = this.cartaOponente7
          this.cartaOponente7 = novaCarta7
          this.cartaOponente1 = novaCarta1
          movimentosFeitosPelaIA = movimentosFeitosPelaIA + ' movimentou carta 1 para o lugar da 7, e'
        }
        
        // Se a carta7 não é um Reis, e se a carta2 é um Reis ou Coringa, então troca de posições do 2 pro 7
        if ((this.cartaOponente7.nome !== 'Reis' && this.cartaOponente7.nome !== 'Coringa') && (this.cartaOponente2.nome === 'Reis' || this.cartaOponente2.nome === 'Coringa')) {
          let novaCarta7 = ''
          let novaCarta2 = ''
          novaCarta7 = this.cartaOponente2
          novaCarta2 = this.cartaOponente7
          this.cartaOponente7 = novaCarta7
          this.cartaOponente2 = novaCarta2
          movimentosFeitosPelaIA = movimentosFeitosPelaIA + ' movimentou carta 2 para o lugar da 7, e'
        }
        
        // Se a carta7 não é um Reis, e se a carta3 é um Reis ou Coringa, então troca de posições do 3 pro 7
        if ((this.cartaOponente7.nome !== 'Reis' && this.cartaOponente7.nome !== 'Coringa') && (this.cartaOponente3.nome === 'Reis' || this.cartaOponente3.nome === 'Coringa')) {
          let novaCarta7 = ''
          let novaCarta3 = ''
          novaCarta7 = this.cartaOponente3
          novaCarta3 = this.cartaOponente7
          this.cartaOponente7 = novaCarta7
          this.cartaOponente3 = novaCarta3
          movimentosFeitosPelaIA = movimentosFeitosPelaIA + ' movimentou carta 3 para o lugar da 7, e'
        }
        
        // Se a carta7 não é um Reis, e se a carta4 é um Reis ou Coringa, então troca de posições do 4 pro 7
        if ((this.cartaOponente7.nome !== 'Reis' && this.cartaOponente7.nome !== 'Coringa') && (this.cartaOponente4.nome === 'Reis' || this.cartaOponente4.nome === 'Coringa')) {
          let novaCarta7 = ''
          let novaCarta4 = ''
          novaCarta7 = this.cartaOponente4
          novaCarta4 = this.cartaOponente7
          this.cartaOponente7 = novaCarta7
          this.cartaOponente4 = novaCarta4
          movimentosFeitosPelaIA = movimentosFeitosPelaIA + ' movimentou carta 4 para o lugar da 7, e'
        }
        
        // Se a carta7 não é um Reis, e se a carta5 é um Reis, então troca de posições do 5 pro 7
        if ((this.cartaOponente7.nome !== 'Coringa' && this.cartaOponente7.nome !== 'Reis') && this.cartaOponente5.nome === 'Reis') {
          let novaCarta7 = ''
          let novaCarta5 = ''
          novaCarta7 = this.cartaOponente5
          novaCarta5 = this.cartaOponente7
          this.cartaOponente7 = novaCarta7
          this.cartaOponente5 = novaCarta5
          movimentosFeitosPelaIA = movimentosFeitosPelaIA + ' movimentou carta 5 para o lugar da 7, e'
        }
        
        // Se a carta7 não é um Reis, e se a carta6 é um Reis, então troca de posições do 6 pro 7
        if ( (this.cartaOponente7.nome !== 'Coringa' && this.cartaOponente7.nome !== 'Reis') && this.cartaOponente6.nome === 'Reis') {
          let novaCarta6 = ''
          let novaCarta7 = ''
          novaCarta6 = this.cartaOponente7
          novaCarta7 = this.cartaOponente6
          this.cartaOponente6 = novaCarta6
          this.cartaOponente7 = novaCarta7
          movimentosFeitosPelaIA = movimentosFeitosPelaIA + ' movimentou carta 7 para o lugar da 6, e'
        }
        
        // Se a carta7 não é um Reis, e se a carta8 é um Reis, então troca de posições do 8 pro 7
        if ( (this.cartaOponente7.nome !== 'Coringa' && this.cartaOponente7.nome !== 'Reis') && this.cartaOponente8.nome === 'Reis') {
          let novaCarta8 = ''
          let novaCarta7 = ''
          novaCarta8 = this.cartaOponente7
          novaCarta7 = this.cartaOponente8
          this.cartaOponente8 = novaCarta8
          this.cartaOponente7 = novaCarta7
          movimentosFeitosPelaIA = movimentosFeitosPelaIA + ' movimentou carta 7 para o lugar da 8, e'
        }
      }



      // ____________________________AA____________________________
      // ___________________________AAAA___________________________
      // __________________________AA__AA__________________________
      // _________________________AAA__AAA_________________________
      // ________________________AAA____AAA________________________
      // _______________________AAAAAAAAAAAA_______________________
      // ______________________AAAA______AAAA______________________
      // _____________________AAAA________AAAA_____________________
      // Regras para a IA posicionar o último As de qualquer naipe na posição 8 respeitando as regras anteriores
      if (this.cartaOponente8.nome !== 'Ás' && this.cartaOponente8.nome !== 'Coringa') {
        
        // Se a carta8 não é um Ás ou Coringa, e se a carta1 é um Ás ou Coringa, então troca de posições do 1 pro 8
        if ( (this.cartaOponente8.nome !== 'Ás' && this.cartaOponente8.nome !== 'Coringa') && (this.cartaOponente1.nome === 'Ás' || this.cartaOponente1.nome === 'Coringa') ) {
          let novaCarta8 = ''
          let novaCarta1 = ''
          novaCarta8 = this.cartaOponente1
          novaCarta1 = this.cartaOponente8
          this.cartaOponente8 = novaCarta8
          this.cartaOponente1 = novaCarta1
          movimentosFeitosPelaIA = movimentosFeitosPelaIA + ' movimentou carta 1 para o lugar da 8, e'
        }
        
        // Se a carta8 não é um Ás ou Coringa, e se a carta2 é um Ás ou Coringa, então troca de posições do 2 pro 8
        if ( (this.cartaOponente8.nome !== 'Ás' && this.cartaOponente8.nome !== 'Coringa') && (this.cartaOponente2.nome === 'Ás' || this.cartaOponente2.nome === 'Coringa') ) {
          let novaCarta8 = ''
          let novaCarta2 = ''
          novaCarta8 = this.cartaOponente2
          novaCarta2 = this.cartaOponente8
          this.cartaOponente8 = novaCarta8
          this.cartaOponente2 = novaCarta2
          movimentosFeitosPelaIA = movimentosFeitosPelaIA + ' movimentou carta 2 para o lugar da 8, e'
        }
        
        // Se a carta8 não é um Ás ou Coringa, e se a carta3 é um Ás ou Coringa, então troca de posições do 3 pro 8
        if ( (this.cartaOponente8.nome !== 'Ás' && this.cartaOponente8.nome !== 'Coringa') && (this.cartaOponente3.nome === 'Ás' || this.cartaOponente3.nome === 'Coringa') ) {
          let novaCarta8 = ''
          let novaCarta3 = ''
          novaCarta8 = this.cartaOponente3
          novaCarta3 = this.cartaOponente8
          this.cartaOponente8 = novaCarta8
          this.cartaOponente3 = novaCarta3
          movimentosFeitosPelaIA = movimentosFeitosPelaIA + ' movimentou carta 3 para o lugar da 8, e'
        }
        
        // Se a carta8 não é um Ás ou Coringa, e se a carta4 é um Ás ou Coringa, então troca de posições do 4 pro 8
        if ( (this.cartaOponente8.nome !== 'Ás' && this.cartaOponente8.nome !== 'Coringa') && (this.cartaOponente4.nome === 'Ás' || this.cartaOponente4.nome === 'Coringa') ) {
          let novaCarta8 = ''
          let novaCarta4 = ''
          novaCarta8 = this.cartaOponente4
          novaCarta4 = this.cartaOponente8
          this.cartaOponente8 = novaCarta8
          this.cartaOponente4 = novaCarta4
          movimentosFeitosPelaIA = movimentosFeitosPelaIA + ' movimentou carta 4 para o lugar da 8, e'
        }

        // Se a carta8 não é um Ás ou Coringa, e se a carta5 é um Ás, então troca de posições do 5 pro 8
        if( (this.cartaOponente8.nome !== 'Ás' && this.cartaOponente8.nome !== 'Coringa') && this.cartaOponente5.nome === 'Ás' ){
          let novaCarta8 = ''
          let novaCarta5 = ''
          novaCarta8 = this.cartaOponente5
          novaCarta5 = this.cartaOponente8
          this.cartaOponente8 = novaCarta8
          this.cartaOponente5 = novaCarta5
          movimentosFeitosPelaIA = movimentosFeitosPelaIA + ' movimentou carta 5 para o lugar da 8, e'
        }

        // Se a carta8 não é um Ás ou Coringa, e se a carta7 é um Ás, então troca de posições do 7 pro 8
        if( (this.cartaOponente8.nome !== 'Ás' && this.cartaOponente8.nome !== 'Coringa') && this.cartaOponente7.nome === 'Ás' ){
          let novaCarta8 = ''
          let novaCarta7 = ''
          novaCarta8 = this.cartaOponente7
          novaCarta7 = this.cartaOponente8
          this.cartaOponente8 = novaCarta8
          this.cartaOponente7 = novaCarta7
          movimentosFeitosPelaIA = movimentosFeitosPelaIA + ' movimentou carta 7 para o lugar da 8, e '
        }

      }

      // Verificar se a IA ganhou o jogo antes de sacar uma nova carta
      if(((this.cartaOponente5.nome === 'Valete' || this.cartaOponente5.nome === 'Coringa') && (this.cartaOponente6.nome === 'Ás' || this.cartaOponente6.nome === 'Coringa') && (this.cartaOponente7.nome === 'Reis' || this.cartaOponente7.nome === 'Coringa') && (this.cartaOponente8.nome === 'Ás' || this.cartaOponente8.nome === 'Coringa')) || ((this.carta5.nome === 'Valete' || this.carta5.nome === 'Coringa') && (this.carta6.nome === 'Ás' || this.carta6.nome === 'Coringa') && (this.carta7.nome === 'Reis' || this.carta7.nome === 'Coringa') && (this.carta8.nome === 'Ás' || this.carta8.nome === 'Coringa'))){
        if(((this.cartaOponente5.nome === 'Valete' || this.cartaOponente5.nome === 'Coringa') && (this.cartaOponente6.nome === 'Ás' || this.cartaOponente6.nome === 'Coringa') && (this.cartaOponente7.nome === 'Reis' || this.cartaOponente7.nome === 'Coringa') && (this.cartaOponente8.nome === 'Ás' || this.cartaOponente8.nome === 'Coringa')) && ((this.carta5.nome === 'Valete' || this.carta5.nome === 'Coringa') && (this.carta6.nome === 'Ás' || this.carta6.nome === 'Coringa') && (this.carta7.nome === 'Reis' || this.carta7.nome === 'Coringa') && (this.carta8.nome === 'Ás' || this.carta8.nome === 'Coringa'))){
          this.avisoDoGanhador = true
          this.msgDoGanhador = 'Tivemos um empate! :|'
          this.acabouOjogo = true
          this.mostrarTableFinal = true
        } 
        else if(((this.cartaOponente5.nome === 'Valete' || this.cartaOponente5.nome === 'Coringa') && (this.cartaOponente6.nome === 'Ás' || this.cartaOponente6.nome === 'Coringa') && (this.cartaOponente7.nome === 'Reis' || this.cartaOponente7.nome === 'Coringa') && (this.cartaOponente8.nome === 'Ás' || this.cartaOponente8.nome === 'Coringa')) && ((this.carta5.nome !== 'Valete' || this.carta5.nome !== 'Coringa') || (this.carta6.nome !== 'Ás' || this.carta6.nome !== 'Coringa') || (this.carta7.nome !== 'Reis' || this.carta7.nome !== 'Coringa') || (this.carta8.nome !== 'Ás' || this.carta8.nome !== 'Coringa'))){
          this.avisoDoGanhador = true
          this.msgDoGanhador = 'Ih, rapaz, parece que a Bruna venceu, :/  lamento! Jogue novamente!'
          this.acabouOjogo = true
          this.mostrarTableFinal = true
        } 
        else if(((this.cartaOponente5.nome !== 'Valete' || this.cartaOponente5.nome !== 'Coringa') || (this.cartaOponente6.nome !== 'Ás' || this.cartaOponente6.nome !== 'Coringa') || (this.cartaOponente7.nome !== 'Reis' || this.cartaOponente7.nome !== 'Coringa') || (this.cartaOponente8.nome !== 'Ás' || this.cartaOponente8.nome !== 'Coringa')) && ((this.carta5.nome !== 'Valete' || this.carta5.nome !== 'Coringa') && (this.carta6.nome !== 'Ás' || this.carta6.nome !== 'Coringa') && (this.carta7.nome !== 'Reis' || this.carta7.nome !== 'Coringa') && (this.carta8.nome !== 'Ás' || this.carta8.nome !== 'Coringa'))){
          this.avisoDoGanhador = true
          this.msgDoGanhador = 'Parabéns, vitória!'
          this.acabouOjogo = true
          this.mostrarTableFinal = true
        }

      } 

      // Entrará no else que irá decidir se vai Sacar carta ou se vai Desafiar o Player:
      else {
        // Se IA não ganhou o jogo ainda, então ela deve sacar mais uma carta ou fazer o desafio por uma carta do Player1

        // Sorteio pra definir se a IA vai desafiar ou não, mas ela só vai desafiar se ela tiver alguma carta de valor forte nas mãos e
        // se tiver movimentações nas cartas da mesa do player1

        let sorteio = 0;
        
        // sorteio do número que vai definir se a IA desafia ou não
        sorteio = Math.floor(Math.random() * 9);
        let numeroParaDesafiar = 1
        let valorParaDesafiar = 7

        // Verifica as condições para desafiar nesse if abaixo e entra se condições forem favoráveis para desafiar
        if((this.movimentoDaCartaDaMesaDoPlayerDo1Para5DoPlayer >= numeroParaDesafiar || this.movimentoDaCartaDaMesaDoPlayerDo2Para6DoPlayer >= numeroParaDesafiar || this.movimentoDaCartaDaMesaDoPlayerDo3Para7DoPlayer >= numeroParaDesafiar || this.movimentoDaCartaDaMesaDoPlayerDo4Para8DoPlayer >= numeroParaDesafiar || this.movimentoDaCartaDaMesaDoPlayerDo5Para6DoPlayer >= numeroParaDesafiar || this.movimentoDaCartaDaMesaDoPlayerDo6Para7DoPlayer >= numeroParaDesafiar || this.movimentoDaCartaDaMesaDoPlayerDo7Para8DoPlayer >= numeroParaDesafiar) && (this.cartaOponente1.valor >= valorParaDesafiar || this.cartaOponente2.valor >= valorParaDesafiar || this.cartaOponente3.valor >= valorParaDesafiar || this.cartaOponente4.valor >= valorParaDesafiar) && (sorteio === 0 || sorteio === 1 || sorteio === 2 || sorteio === 3) ){
            
          // Setando a carta que a IA vai ganhar no desafio por meio de dedução lógica dos movimentos
          if(this.movimentoDaCartaDaMesaDoPlayerDo1Para5DoPlayer >= numeroParaDesafiar){
            this.cartaDesejadaPelaIa = this.carta5
            this.cartaDaMesaGanha = 'carta5'
            
          }
          if(this.movimentoDaCartaDaMesaDoPlayerDo2Para6DoPlayer >= numeroParaDesafiar){
            this.cartaDesejadaPelaIa = this.carta6
            this.cartaDaMesaGanha = 'carta6'
            
          }
          if(this.movimentoDaCartaDaMesaDoPlayerDo3Para7DoPlayer >= numeroParaDesafiar){
            this.cartaDesejadaPelaIa = this.carta7
            this.cartaDaMesaGanha = 'carta7'
            
          }
          if(this.movimentoDaCartaDaMesaDoPlayerDo4Para8DoPlayer >= numeroParaDesafiar){
            this.cartaDesejadaPelaIa = this.carta8
            this.cartaDaMesaGanha = 'carta8'
            
          }
          if(this.movimentoDaCartaDaMesaDoPlayerDo5Para6DoPlayer >= numeroParaDesafiar){
            let sorteio =  Math.floor(Math.random() * 1)
            if(sorteio === 0){
              this.cartaDesejadaPelaIa = this.carta5
              this.cartaDaMesaGanha = 'carta5'
              
            }
            else {
              this.cartaDesejadaPelaIa = this.carta6
              this.cartaDaMesaGanha = 'carta6'
              
            }
          }
          if(this.movimentoDaCartaDaMesaDoPlayerDo6Para7DoPlayer >= numeroParaDesafiar){
            let sorteio =  Math.floor(Math.random() * 1)
            if(sorteio === 0){
              this.cartaDesejadaPelaIa = this.carta6
              this.cartaDaMesaGanha = 'carta6'
              
            }
            else {
              this.cartaDesejadaPelaIa = this.carta7
              this.cartaDaMesaGanha = 'carta7'
              
            }
          }
          if(this.movimentoDaCartaDaMesaDoPlayerDo7Para8DoPlayer >= numeroParaDesafiar){
            let sorteio =  Math.floor(Math.random() * 1)
            if(sorteio === 0){
              this.cartaDesejadaPelaIa = this.carta7
              this.cartaDaMesaGanha = 'carta7'
              
            }
            else {
              this.cartaDesejadaPelaIa = this.carta8
              this.cartaDaMesaGanha = 'carta8'
            }
          }

          this.log('A Bruna' + movimentosFeitosPelaIA + ' te desafiou.')
          this.msgDeAlerta = 'A Bruna' + movimentosFeitosPelaIA + ' te desafiou.'
          this.msgDeAlertaCor = 'error'
          this.msgDeAlertaTime = 5000
          this.msgDeAlertaDisparar = true
          this.ehDesafioDaIa = true

        }
        
        // Se não é para desafiar, então entra no else para sacar uma carta
        else {

          // Regra para a IA sacar uma carta tirando a menor da mão após ter feito os passos das regras anteriores
          if ((this.cartaOponente1.valor < this.cartaOponente2.valor) && (this.cartaOponente1.valor < this.cartaOponente3.valor) && (this.cartaOponente1.valor < this.cartaOponente4.valor)){
            this.sacarCartaDoMonte()
            this.cartaOponente1 = this.cartaSacada
          } 
          else if ((this.cartaOponente2.valor < this.cartaOponente1.valor) && (this.cartaOponente2.valor < this.cartaOponente3.valor) && (this.cartaOponente2.valor < this.cartaOponente4.valor)){
            this.sacarCartaDoMonte()
            this.cartaOponente2 = this.cartaSacada
          }
          else if ((this.cartaOponente3.valor < this.cartaOponente1.valor) && (this.cartaOponente3.valor < this.cartaOponente2.valor) && (this.cartaOponente3.valor < this.cartaOponente4.valor)){
            this.sacarCartaDoMonte()
            this.cartaOponente3 = this.cartaSacada
          }
          else if ((this.cartaOponente4.valor < this.cartaOponente1.valor) && (this.cartaOponente4.valor < this.cartaOponente2.valor) && (this.cartaOponente4.valor < this.cartaOponente3.valor)){
            this.sacarCartaDoMonte()
            this.cartaOponente4 = this.cartaSacada
          } 
          else {
            this.sacarCartaDoMonte()
            this.cartaOponente1 = this.cartaSacada
          }

          this.log('A Bruna ' + movimentosFeitosPelaIA + ' sacou uma carta.')
          this.msgDeAlerta = 'A Bruna ' + movimentosFeitosPelaIA + ' sacou uma carta.'
          this.msgDeAlertaCor = 'error'
          this.msgDeAlertaTime = 5000
          this.msgDeAlertaDisparar = true

        }


      }

      this.quemEhAVez = 'É a sua vez'
      this.quemEhAVezCor = 'blue'
      this.quemEhAVezTrueOrFalse = false
      this.vezDoJogador = true

    },

    // Método que é acionado quando o usuário selecionar a carta que vai usar contra a IA no Challenge e depois ao apertar continuar
    terminarDesafioContraIA(){

      if(this.objetoCartaDaMaoDoPlayerSelecionadoParaDesafioDaIa.nome == undefined) {
        // alert("Você não selecionou sua carta para o desafio. Lembre-se, você não tem a opção de não aceitar o desafio!")
        this.msgDeAlerta = 'Você não selecionou sua carta para o desafio. Lembre-se, você não tem a opção de não aceitar o desafio!'
        this.msgDeAlertaCor = 'error'
        this.msgDeAlertaTime = 5000
        this.msgDeAlertaDisparar = true
      }
      
      if(this.objetoCartaDaMaoDoPlayerSelecionadoParaDesafioDaIa.nome != undefined) {
        // Executa a regra de desafio da IA contra o Player aqui
        // Procura pela maior carta da mão do oponente


        // _________________11111111________________
        // ________________111111111________________
        // _______________1111111111________________
        // ______________11111111111________________
        // _____________111111111111________________
        // ____________1111111111111________________
        // ___________1111111_111111________________
        // __________1111111__111111________________
        // ___________________111111________________
        // ___________________111111________________
        // ___________________111111________________
        // ___________________111111________________
        // ___________1111111111111111111111________
        // ___________1111111111111111111111________
        // Seta a primeira carta da mão do oponente se ela for a maior
        if(this.cartaOponente1.valor >= this.cartaOponente2.valor && this.cartaOponente1.valor >= this.cartaOponente3.valor && this.cartaOponente1.valor >= this.cartaOponente4.valor){
          
          let cartaUsadaPelaIAnoDesafio = this.cartaOponente1.nome + ' ' + this.cartaOponente1.naipe

          // Se a IA ganhar o desafio
          if(this.cartaOponente1.valor > this.objetoCartaDaMaoDoPlayerSelecionadoParaDesafioDaIa.valor){
            this.cartaOponente1 = this.cartaDesejadaPelaIa
            
            if(this.cartaDaMaoDoPlayerSelecionadoParaDesafioDaIa === 'carta1'){
              this.sacarCartaDoMonte()
              this.carta1 = this.cartaSacada
              
              if(this.cartaDaMesaGanha === 'carta5'){
                this.sacarCartaDoMonte()
                this.carta5 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo1Para5DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo5Para6DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo5Para6DoPlayer = 0
              }
              if(this.cartaDaMesaGanha === 'carta6'){
                this.sacarCartaDoMonte()
                this.carta6 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo2Para6DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo6Para7DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo5Para6DoPlayer = 0
              }
              if(this.cartaDaMesaGanha === 'carta7'){
                this.sacarCartaDoMonte()
                this.carta7 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo3Para7DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo7Para8DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo6Para7DoPlayer = 0
              }
              if(this.cartaDaMesaGanha === 'carta8'){
                this.sacarCartaDoMonte()
                this.carta8 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo4Para8DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo7Para8DoPlayer = 0
              }

            }
            if(this.cartaDaMaoDoPlayerSelecionadoParaDesafioDaIa === 'carta2'){
              this.sacarCartaDoMonte()
              this.carta2 = this.cartaSacada
              
              if(this.cartaDaMesaGanha === 'carta5'){
                this.sacarCartaDoMonte()
                this.carta5 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo1Para5DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo5Para6DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo5Para6DoPlayer = 0
              }
              if(this.cartaDaMesaGanha === 'carta6'){
                this.sacarCartaDoMonte()
                this.carta6 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo2Para6DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo6Para7DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo5Para6DoPlayer = 0
              }
              if(this.cartaDaMesaGanha === 'carta7'){
                this.sacarCartaDoMonte()
                this.carta7 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo3Para7DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo7Para8DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo6Para7DoPlayer = 0
              }
              if(this.cartaDaMesaGanha === 'carta8'){
                this.sacarCartaDoMonte()
                this.carta8 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo4Para8DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo7Para8DoPlayer = 0
              }
            }
            if(this.cartaDaMaoDoPlayerSelecionadoParaDesafioDaIa === 'carta3'){
              this.sacarCartaDoMonte()
              this.carta3 = this.cartaSacada
              
              if(this.cartaDaMesaGanha === 'carta5'){
                this.sacarCartaDoMonte()
                this.carta5 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo1Para5DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo5Para6DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo5Para6DoPlayer = 0
              }
              if(this.cartaDaMesaGanha === 'carta6'){
                this.sacarCartaDoMonte()
                this.carta6 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo2Para6DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo6Para7DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo5Para6DoPlayer = 0
              }
              if(this.cartaDaMesaGanha === 'carta7'){
                this.sacarCartaDoMonte()
                this.carta7 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo3Para7DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo7Para8DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo6Para7DoPlayer = 0
              }
              if(this.cartaDaMesaGanha === 'carta8'){
                this.sacarCartaDoMonte()
                this.carta8 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo4Para8DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo7Para8DoPlayer = 0
              }
            }
            if(this.cartaDaMaoDoPlayerSelecionadoParaDesafioDaIa === 'carta4'){
              this.sacarCartaDoMonte()
              this.carta4 = this.cartaSacada
              
              if(this.cartaDaMesaGanha === 'carta5'){
                this.sacarCartaDoMonte()
                this.carta5 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo1Para5DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo5Para6DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo5Para6DoPlayer = 0
              }
              if(this.cartaDaMesaGanha === 'carta6'){
                this.sacarCartaDoMonte()
                this.carta6 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo2Para6DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo6Para7DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo5Para6DoPlayer = 0
              }
              if(this.cartaDaMesaGanha === 'carta7'){
                this.sacarCartaDoMonte()
                this.carta7 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo3Para7DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo7Para8DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo6Para7DoPlayer = 0
              }
              if(this.cartaDaMesaGanha === 'carta8'){
                this.sacarCartaDoMonte()
                this.carta8 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo4Para8DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo7Para8DoPlayer = 0
              }
            }

            this.log('A Bruna ganhou o desafio porque usou ' + cartaUsadaPelaIAnoDesafio +  ' as cartas sua e da Bruna utilizadas no desafio foram repostas com uma carta do monte!')
            this.msgDeAlerta = 'A Bruna ganhou o desafio porque usou ' + cartaUsadaPelaIAnoDesafio +  ' as cartas sua e da Bruna utilizadas no desafio foram repostas com uma carta do monte!'
            this.msgDeAlertaDisparar = true
            this.msgDeAlertaCor = 'error'
            this.msgDeAlertaTime = 5000
            this.objetoCartaDaMaoDoPlayerSelecionadoParaDesafioDaIa = {}

          }

          // Se a IA perder o desafio
          else {

            this.sacarCartaDoMonte()
            this.cartaOponente1 = this.cartaSacada
            
            if(this.cartaDaMaoDoPlayerSelecionadoParaDesafioDaIa === 'carta1'){
              this.sacarCartaDoMonte()
              this.carta1 = this.cartaSacada
            }
            if(this.cartaDaMaoDoPlayerSelecionadoParaDesafioDaIa === 'carta2'){
              this.sacarCartaDoMonte()
              this.carta2 = this.cartaSacada
            }
            if(this.cartaDaMaoDoPlayerSelecionadoParaDesafioDaIa === 'carta3'){
              this.sacarCartaDoMonte()
              this.carta3 = this.cartaSacada
            }
            if(this.cartaDaMaoDoPlayerSelecionadoParaDesafioDaIa === 'carta4'){
              this.sacarCartaDoMonte()
              this.carta4 = this.cartaSacada
            }

            this.log('A Bruna perdeu o  desafio porque usou ' + cartaUsadaPelaIAnoDesafio +  '. As cartas sua e da Bruna utilizadas no desafio foram repostas com uma carta do monte!')
            this.msgDeAlerta = 'A Bruna perdeu o  desafio porque usou ' + cartaUsadaPelaIAnoDesafio +  '. As cartas sua e da Bruna utilizadas no desafio foram repostas com uma carta do monte!'
            this.msgDeAlertaDisparar = true
            this.msgDeAlertaCor = 'success'
            this.msgDeAlertaTime = 5000
            this.objetoCartaDaMaoDoPlayerSelecionadoParaDesafioDaIa = {}

          }
        
        }

        // _____________2222222222222_______________
        // ____________222222222222222______________
        // __________222222_______222222____________
        // __________22222_________22222____________
        // __________2222__________22222____________
        // ___________2222_________22222____________
        // ________________________22222____________
        // ________________________22222____________
        // ________________________22222____________
        // _______________________22222_____________
        // ______________________22222______________
        // ____________________22222________________
        // __________________222222_________________
        // _______________222222222_________________
        // _____________2222222222222222222_________
        // _____________2222222222222222222_________
        // Seta a segunda carta da mão do oponente se ela for a maior
        else if(this.cartaOponente2.valor >= this.cartaOponente1.valor && this.cartaOponente2.valor >= this.cartaOponente3.valor && this.cartaOponente2.valor >= this.cartaOponente4.valor){
          
          let cartaUsadaPelaIAnoDesafio = this.cartaOponente2.nome + ' ' + this.cartaOponente2.naipe

          // Se a IA ganhar o desafio
          if(this.cartaOponente2.valor > this.objetoCartaDaMaoDoPlayerSelecionadoParaDesafioDaIa.valor){
            this.cartaOponente2 = this.cartaDesejadaPelaIa
            
            if(this.cartaDaMaoDoPlayerSelecionadoParaDesafioDaIa === 'carta1'){
              this.sacarCartaDoMonte()
              this.carta1 = this.cartaSacada
              
              if(this.cartaDaMesaGanha === 'carta5'){
                this.sacarCartaDoMonte()
                this.carta5 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo1Para5DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo5Para6DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo5Para6DoPlayer = 0
              }
              if(this.cartaDaMesaGanha === 'carta6'){
                this.sacarCartaDoMonte()
                this.carta6 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo2Para6DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo6Para7DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo5Para6DoPlayer = 0
              }
              if(this.cartaDaMesaGanha === 'carta7'){
                this.sacarCartaDoMonte()
                this.carta7 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo3Para7DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo7Para8DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo6Para7DoPlayer = 0
              }
              if(this.cartaDaMesaGanha === 'carta8'){
                this.sacarCartaDoMonte()
                this.carta8 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo4Para8DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo7Para8DoPlayer = 0
              }

            }
            if(this.cartaDaMaoDoPlayerSelecionadoParaDesafioDaIa === 'carta2'){
              this.sacarCartaDoMonte()
              this.carta2 = this.cartaSacada
              
              if(this.cartaDaMesaGanha === 'carta5'){
                this.sacarCartaDoMonte()
                this.carta5 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo1Para5DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo5Para6DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo5Para6DoPlayer = 0
              }
              if(this.cartaDaMesaGanha === 'carta6'){
                this.sacarCartaDoMonte()
                this.carta6 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo2Para6DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo6Para7DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo5Para6DoPlayer = 0
              }
              if(this.cartaDaMesaGanha === 'carta7'){
                this.sacarCartaDoMonte()
                this.carta7 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo3Para7DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo7Para8DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo6Para7DoPlayer = 0
              }
              if(this.cartaDaMesaGanha === 'carta8'){
                this.sacarCartaDoMonte()
                this.carta8 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo4Para8DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo7Para8DoPlayer = 0
              }
            }
            if(this.cartaDaMaoDoPlayerSelecionadoParaDesafioDaIa === 'carta3'){
              this.sacarCartaDoMonte()
              this.carta3 = this.cartaSacada
              
              if(this.cartaDaMesaGanha === 'carta5'){
                this.sacarCartaDoMonte()
                this.carta5 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo1Para5DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo5Para6DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo5Para6DoPlayer = 0
              }
              if(this.cartaDaMesaGanha === 'carta6'){
                this.sacarCartaDoMonte()
                this.carta6 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo2Para6DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo6Para7DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo5Para6DoPlayer = 0
              }
              if(this.cartaDaMesaGanha === 'carta7'){
                this.sacarCartaDoMonte()
                this.carta7 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo3Para7DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo7Para8DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo6Para7DoPlayer = 0
              }
              if(this.cartaDaMesaGanha === 'carta8'){
                this.sacarCartaDoMonte()
                this.carta8 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo4Para8DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo7Para8DoPlayer = 0
              }
            }
            if(this.cartaDaMaoDoPlayerSelecionadoParaDesafioDaIa === 'carta4'){
              this.sacarCartaDoMonte()
              this.carta4 = this.cartaSacada
              
              if(this.cartaDaMesaGanha === 'carta5'){
                this.sacarCartaDoMonte()
                this.carta5 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo1Para5DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo5Para6DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo5Para6DoPlayer = 0
              }
              if(this.cartaDaMesaGanha === 'carta6'){
                this.sacarCartaDoMonte()
                this.carta6 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo2Para6DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo6Para7DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo5Para6DoPlayer = 0
              }
              if(this.cartaDaMesaGanha === 'carta7'){
                this.sacarCartaDoMonte()
                this.carta7 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo3Para7DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo7Para8DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo6Para7DoPlayer = 0
              }
              if(this.cartaDaMesaGanha === 'carta8'){
                this.sacarCartaDoMonte()
                this.carta8 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo4Para8DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo7Para8DoPlayer = 0
              }
            }

            this.log('A Bruna ganhou o desafio porque usou ' + cartaUsadaPelaIAnoDesafio +  ' as cartas sua e da Bruna utilizadas no desafio foram repostas com uma carta do monte!')
            this.msgDeAlerta = 'A Bruna ganhou o desafio porque usou ' + cartaUsadaPelaIAnoDesafio +  ' as cartas sua e da Bruna utilizadas no desafio foram repostas com uma carta do monte!'
            this.msgDeAlertaDisparar = true
            this.msgDeAlertaCor = 'error'
            this.msgDeAlertaTime = 5000
            this.objetoCartaDaMaoDoPlayerSelecionadoParaDesafioDaIa = {}
            
          }

          // Se a IA perder o desafio
          else {
            this.sacarCartaDoMonte()
            this.cartaOponente2 = this.cartaSacada
            
            if(this.cartaDaMaoDoPlayerSelecionadoParaDesafioDaIa === 'carta1'){
              this.sacarCartaDoMonte()
              this.carta1 = this.cartaSacada
            }
            if(this.cartaDaMaoDoPlayerSelecionadoParaDesafioDaIa === 'carta2'){
              this.sacarCartaDoMonte()
              this.carta2 = this.cartaSacada
            }
            if(this.cartaDaMaoDoPlayerSelecionadoParaDesafioDaIa === 'carta3'){
              this.sacarCartaDoMonte()
              this.carta3 = this.cartaSacada
            }
            if(this.cartaDaMaoDoPlayerSelecionadoParaDesafioDaIa === 'carta4'){
              this.sacarCartaDoMonte()
              this.carta4 = this.cartaSacada
            }

            this.log('A Bruna perdeu o desafio porque usou ' + cartaUsadaPelaIAnoDesafio +  '. As cartas sua e da Bruna utilizadas no desafio foram repostas com uma carta do monte!')
            this.msgDeAlerta = 'A Bruna perdeu o desafio porque usou ' + cartaUsadaPelaIAnoDesafio +  '. As cartas sua e da Bruna utilizadas no desafio foram repostas com uma carta do monte!'
            this.msgDeAlertaDisparar = true
            this.msgDeAlertaCor = 'success'
            this.msgDeAlertaTime = 5000
            this.objetoCartaDaMaoDoPlayerSelecionadoParaDesafioDaIa = {}

          }

        }


        // __________3333333333333333333____________
        // __________333333333__33333333____________
        // __________33333_________33333____________
        // __________333_____________333____________
        // __________________________333____________
        // __________________________333____________
        // ________________________33333____________
        // ____________________333333333____________
        // ____________________333333333____________
        // ________________________33333____________
        // __________________________333____________
        // __________________________333____________
        // __________333_____________333____________
        // __________33333_________33333____________
        // __________333333333__33333333____________
        // __________3333333333333333333____________
        // Seta a terceira carta da mão do oponente se ela for a maior
        else if(this.cartaOponente3.valor >= this.cartaOponente1.valor && this.cartaOponente3.valor >= this.cartaOponente2.valor && this.cartaOponente3.valor >= this.cartaOponente4.valor){

          let cartaUsadaPelaIAnoDesafio = this.cartaOponente3.nome + ' ' + this.cartaOponente3.naipe

          // Se a IA ganhar o desafio
          if(this.cartaOponente3.valor > this.objetoCartaDaMaoDoPlayerSelecionadoParaDesafioDaIa.valor){
            this.cartaOponente3 = this.cartaDesejadaPelaIa
            
            if(this.cartaDaMaoDoPlayerSelecionadoParaDesafioDaIa === 'carta1'){
              this.sacarCartaDoMonte()
              this.carta1 = this.cartaSacada
              
              if(this.cartaDaMesaGanha === 'carta5'){
                this.sacarCartaDoMonte()
                this.carta5 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo1Para5DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo5Para6DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo5Para6DoPlayer = 0
              }
              if(this.cartaDaMesaGanha === 'carta6'){
                this.sacarCartaDoMonte()
                this.carta6 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo2Para6DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo6Para7DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo5Para6DoPlayer = 0
              }
              if(this.cartaDaMesaGanha === 'carta7'){
                this.sacarCartaDoMonte()
                this.carta7 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo3Para7DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo7Para8DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo6Para7DoPlayer = 0
              }
              if(this.cartaDaMesaGanha === 'carta8'){
                this.sacarCartaDoMonte()
                this.carta8 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo4Para8DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo7Para8DoPlayer = 0
              }

            }
            if(this.cartaDaMaoDoPlayerSelecionadoParaDesafioDaIa === 'carta2'){
              this.sacarCartaDoMonte()
              this.carta2 = this.cartaSacada
              
              if(this.cartaDaMesaGanha === 'carta5'){
                this.sacarCartaDoMonte()
                this.carta5 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo1Para5DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo5Para6DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo5Para6DoPlayer = 0
              }
              if(this.cartaDaMesaGanha === 'carta6'){
                this.sacarCartaDoMonte()
                this.carta6 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo2Para6DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo6Para7DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo5Para6DoPlayer = 0
              }
              if(this.cartaDaMesaGanha === 'carta7'){
                this.sacarCartaDoMonte()
                this.carta7 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo3Para7DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo7Para8DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo6Para7DoPlayer = 0
              }
              if(this.cartaDaMesaGanha === 'carta8'){
                this.sacarCartaDoMonte()
                this.carta8 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo4Para8DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo7Para8DoPlayer = 0
              }
            }
            if(this.cartaDaMaoDoPlayerSelecionadoParaDesafioDaIa === 'carta3'){
              this.sacarCartaDoMonte()
              this.carta3 = this.cartaSacada
              
              if(this.cartaDaMesaGanha === 'carta5'){
                this.sacarCartaDoMonte()
                this.carta5 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo1Para5DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo5Para6DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo5Para6DoPlayer = 0
              }
              if(this.cartaDaMesaGanha === 'carta6'){
                this.sacarCartaDoMonte()
                this.carta6 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo2Para6DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo6Para7DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo5Para6DoPlayer = 0
              }
              if(this.cartaDaMesaGanha === 'carta7'){
                this.sacarCartaDoMonte()
                this.carta7 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo3Para7DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo7Para8DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo6Para7DoPlayer = 0
              }
              if(this.cartaDaMesaGanha === 'carta8'){
                this.sacarCartaDoMonte()
                this.carta8 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo4Para8DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo7Para8DoPlayer = 0
              }
            }
            if(this.cartaDaMaoDoPlayerSelecionadoParaDesafioDaIa === 'carta4'){
              this.sacarCartaDoMonte()
              this.carta4 = this.cartaSacada
              
              if(this.cartaDaMesaGanha === 'carta5'){
                this.sacarCartaDoMonte()
                this.carta5 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo1Para5DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo5Para6DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo5Para6DoPlayer = 0
              }
              if(this.cartaDaMesaGanha === 'carta6'){
                this.sacarCartaDoMonte()
                this.carta6 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo2Para6DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo6Para7DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo5Para6DoPlayer = 0
              }
              if(this.cartaDaMesaGanha === 'carta7'){
                this.sacarCartaDoMonte()
                this.carta7 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo3Para7DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo7Para8DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo6Para7DoPlayer = 0
              }
              if(this.cartaDaMesaGanha === 'carta8'){
                this.sacarCartaDoMonte()
                this.carta8 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo4Para8DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo7Para8DoPlayer = 0
              }
            }

            this.log('A Bruna ganhou o desafio porque usou ' + cartaUsadaPelaIAnoDesafio +  ' as cartas sua e da Bruna utilizadas no desafio foram repostas com uma carta do monte!')
            this.msgDeAlerta = 'A Bruna ganhou o desafio porque usou ' + cartaUsadaPelaIAnoDesafio +  ' as cartas sua e da Bruna utilizadas no desafio foram repostas com uma carta do monte!'
            this.msgDeAlertaDisparar = true
            this.msgDeAlertaCor = 'error'
            this.msgDeAlertaTime = 5000
            this.objetoCartaDaMaoDoPlayerSelecionadoParaDesafioDaIa = {}
            
          } 

          // Se a IA perder o desafio
          else {
            this.sacarCartaDoMonte()
            this.cartaOponente3 = this.cartaSacada
            
            if(this.cartaDaMaoDoPlayerSelecionadoParaDesafioDaIa === 'carta1'){
              this.sacarCartaDoMonte()
              this.carta1 = this.cartaSacada
            }
            if(this.cartaDaMaoDoPlayerSelecionadoParaDesafioDaIa === 'carta2'){
              this.sacarCartaDoMonte()
              this.carta2 = this.cartaSacada
            }
            if(this.cartaDaMaoDoPlayerSelecionadoParaDesafioDaIa === 'carta3'){
              this.sacarCartaDoMonte()
              this.carta3 = this.cartaSacada
            }
            if(this.cartaDaMaoDoPlayerSelecionadoParaDesafioDaIa === 'carta4'){
              this.sacarCartaDoMonte()
              this.carta4 = this.cartaSacada
            }

            this.log('A Bruna perdeu o desafio porque usou ' + cartaUsadaPelaIAnoDesafio +  '. As cartas sua e da Bruna utilizadas no desafio foram repostas com uma carta do monte!')
            this.msgDeAlerta = 'A Bruna perdeu o desafio porque usou ' + cartaUsadaPelaIAnoDesafio +  '. As cartas sua e da Bruna utilizadas no desafio foram repostas com uma carta do monte!'
            this.msgDeAlertaDisparar = true
            this.msgDeAlertaCor = 'success'
            this.msgDeAlertaTime = 5000
            this.objetoCartaDaMaoDoPlayerSelecionadoParaDesafioDaIa = {}

          }

        }

        
        // __________________444444_________________
        // _________________4444444_________________
        // ________________44444444_________________
        // _______________444444444_________________
        // ______________4444444444_________________
        // _____________44444__4444_________________
        // ____________44444___4444_________________
        // ___________44444____4444_________________
        // __________44444_____4444_________________
        // _________4444444444444444444_____________
        // ________44444444444444444444_____________
        // ________44444444444444444444_____________
        // ____________________4444_________________
        // ____________________4444_________________
        // ____________________4444_________________
        // Seta a quarta carta da mão do oponente se ela for a maior
        else if(this.cartaOponente4.valor >= this.cartaOponente1.valor && this.cartaOponente4.valor >= this.cartaOponente2.valor && this.cartaOponente4.valor >= this.cartaOponente3.valor){

          let cartaUsadaPelaIAnoDesafio = this.cartaOponente4.nome + ' ' + this.cartaOponente4.naipe

          // Se a IA ganhar o desafio
          if(this.cartaOponente4.valor > this.objetoCartaDaMaoDoPlayerSelecionadoParaDesafioDaIa.valor){
            this.cartaOponente4 = this.cartaDesejadaPelaIa
            
            if(this.cartaDaMaoDoPlayerSelecionadoParaDesafioDaIa === 'carta1'){
              this.sacarCartaDoMonte()
              this.carta1 = this.cartaSacada
              
              if(this.cartaDaMesaGanha === 'carta5'){
                this.sacarCartaDoMonte()
                this.carta5 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo1Para5DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo5Para6DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo5Para6DoPlayer = 0
              }
              if(this.cartaDaMesaGanha === 'carta6'){
                this.sacarCartaDoMonte()
                this.carta6 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo2Para6DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo6Para7DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo5Para6DoPlayer = 0
              }
              if(this.cartaDaMesaGanha === 'carta7'){
                this.sacarCartaDoMonte()
                this.carta7 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo3Para7DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo7Para8DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo6Para7DoPlayer = 0
              }
              if(this.cartaDaMesaGanha === 'carta8'){
                this.sacarCartaDoMonte()
                this.carta8 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo4Para8DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo7Para8DoPlayer = 0
              }

            }
            if(this.cartaDaMaoDoPlayerSelecionadoParaDesafioDaIa === 'carta2'){
              this.sacarCartaDoMonte()
              this.carta2 = this.cartaSacada
              
              if(this.cartaDaMesaGanha === 'carta5'){
                this.sacarCartaDoMonte()
                this.carta5 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo1Para5DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo5Para6DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo5Para6DoPlayer = 0
              }
              if(this.cartaDaMesaGanha === 'carta6'){
                this.sacarCartaDoMonte()
                this.carta6 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo2Para6DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo6Para7DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo5Para6DoPlayer = 0
              }
              if(this.cartaDaMesaGanha === 'carta7'){
                this.sacarCartaDoMonte()
                this.carta7 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo3Para7DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo7Para8DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo6Para7DoPlayer = 0
              }
              if(this.cartaDaMesaGanha === 'carta8'){
                this.sacarCartaDoMonte()
                this.carta8 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo4Para8DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo7Para8DoPlayer = 0
              }
            }
            if(this.cartaDaMaoDoPlayerSelecionadoParaDesafioDaIa === 'carta3'){
              this.sacarCartaDoMonte()
              this.carta3 = this.cartaSacada
              
              if(this.cartaDaMesaGanha === 'carta5'){
                this.sacarCartaDoMonte()
                this.carta5 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo1Para5DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo5Para6DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo5Para6DoPlayer = 0
              }
              if(this.cartaDaMesaGanha === 'carta6'){
                this.sacarCartaDoMonte()
                this.carta6 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo2Para6DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo6Para7DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo5Para6DoPlayer = 0
              }
              if(this.cartaDaMesaGanha === 'carta7'){
                this.sacarCartaDoMonte()
                this.carta7 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo3Para7DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo7Para8DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo6Para7DoPlayer = 0
              }
              if(this.cartaDaMesaGanha === 'carta8'){
                this.sacarCartaDoMonte()
                this.carta8 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo4Para8DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo7Para8DoPlayer = 0
              }
            }
            if(this.cartaDaMaoDoPlayerSelecionadoParaDesafioDaIa === 'carta4'){
              this.sacarCartaDoMonte()
              this.carta4 = this.cartaSacada
              
              if(this.cartaDaMesaGanha === 'carta5'){
                this.sacarCartaDoMonte()
                this.carta5 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo1Para5DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo5Para6DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo5Para6DoPlayer = 0
              }
              if(this.cartaDaMesaGanha === 'carta6'){
                this.sacarCartaDoMonte()
                this.carta6 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo2Para6DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo6Para7DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo5Para6DoPlayer = 0
              }
              if(this.cartaDaMesaGanha === 'carta7'){
                this.sacarCartaDoMonte()
                this.carta7 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo3Para7DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo7Para8DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo6Para7DoPlayer = 0
              }
              if(this.cartaDaMesaGanha === 'carta8'){
                this.sacarCartaDoMonte()
                this.carta8 = this.cartaSacada
                this.movimentoDaCartaDaMesaDoPlayerDo4Para8DoPlayer = 0
                this.movimentoDaCartaDaMesaDoPlayerDo7Para8DoPlayer = 0
              }
            }
            
            this.log('A Bruna ganhou o desafio porque usou ' + cartaUsadaPelaIAnoDesafio +  ' as cartas sua e da Bruna utilizadas no desafio foram repostas com uma carta do monte!')
            this.msgDeAlerta = 'A Bruna ganhou o desafio porque usou ' + cartaUsadaPelaIAnoDesafio +  ' as cartas sua e da Bruna utilizadas no desafio foram repostas com uma carta do monte!'
            this.msgDeAlertaDisparar = true
            this.msgDeAlertaCor = 'error'
            this.msgDeAlertaTime = 5000
            this.objetoCartaDaMaoDoPlayerSelecionadoParaDesafioDaIa = {}
            
          } 

          // Se a IA perder o desafio
          else {
            this.sacarCartaDoMonte()
            this.cartaOponente4 = this.cartaSacada
            
            if(this.cartaDaMaoDoPlayerSelecionadoParaDesafioDaIa === 'carta1'){
              this.sacarCartaDoMonte()
              this.carta1 = this.cartaSacada
            }
            if(this.cartaDaMaoDoPlayerSelecionadoParaDesafioDaIa === 'carta2'){
              this.sacarCartaDoMonte()
              this.carta2 = this.cartaSacada
            }
            if(this.cartaDaMaoDoPlayerSelecionadoParaDesafioDaIa === 'carta3'){
              this.sacarCartaDoMonte()
              this.carta3 = this.cartaSacada
            }
            if(this.cartaDaMaoDoPlayerSelecionadoParaDesafioDaIa === 'carta4'){
              this.sacarCartaDoMonte()
              this.carta4 = this.cartaSacada
            }

            this.log('A Bruna perdeu o desafio porque usou ' + cartaUsadaPelaIAnoDesafio +  '. As cartas, sua e da Bruna, utilizadas no desafio foram repostas com uma carta do monte!')
            this.msgDeAlerta = 'A Bruna perdeu o desafio porque usou ' + cartaUsadaPelaIAnoDesafio +  '. As cartas, sua e da Bruna, utilizadas no desafio foram repostas com uma carta do monte!'
            this.msgDeAlertaDisparar = true
            this.msgDeAlertaCor = 'success'
            this.msgDeAlertaTime = 5000
            this.objetoCartaDaMaoDoPlayerSelecionadoParaDesafioDaIa = {}

          }

        }

        this.ehDesafioDaIa = false

      }

    },

    vezDoOponente2() {
      this.quemEhAVezCor = 'warning'
      this.quemEhAVez = 'É a vez da Bruna'
      this.quemEhAVezTrueOrFalse = true
      let tempo = Math.floor(Math.random() * 5000)
      setTimeout(() => this.vezDoOponente(), tempo)
    },

    // Métodos de movimentação do player
    movimentacoesEntreAsCartas(movimento) {
      if (movimento === 1) {
        
        let novaCarta1 = ''
        let novaCarta2 = ''
        novaCarta1 = this.carta2
        novaCarta2 = this.carta1
        this.carta1 = novaCarta1
        this.carta2 = novaCarta2
      } 
      else if (movimento === 2) {
        let novaCarta2 = ''
        let novaCarta3 = ''
        novaCarta2 = this.carta3
        novaCarta3 = this.carta2
        this.carta2 = novaCarta2
        this.carta3 = novaCarta3
      }
      else if (movimento === 3) {
        let novaCarta3 = ''
        let novaCarta4 = ''
        novaCarta3 = this.carta4
        novaCarta4 = this.carta3
        this.carta3 = novaCarta3
        this.carta4 = novaCarta4
      }
      else if (movimento === 4) {
        let novaCarta5 = ''
        let novaCarta6 = ''
        novaCarta5 = this.carta6
        novaCarta6 = this.carta5
        this.carta5 = novaCarta5
        this.carta6 = novaCarta6

        this.movimentoDaCartaDaMesaDoPlayerDo5Para6DoPlayer = this.movimentoDaCartaDaMesaDoPlayerDo5Para6DoPlayer + 1
        this.travarMovimentacaoDaMesaDoPlayer = false

        if((this.carta5.nome === 'Valete' || this.carta5.nome === 'Coringa') && (this.carta6.nome === 'Ás' || this.carta6.nome === 'Coringa') && (this.carta7.nome === 'Reis' || this.carta7.nome === 'Coringa') && (this.carta8.nome === 'Ás' || this.carta8.nome === 'Coringa')){
          this.msgDoGanhador = 'Parabéns, vitória!'
          this.avisoDoGanhador = true
          this.acabouOjogo = true
          this.mostrarTableFinal = true
        }
      }
      else if (movimento === 5) {
        let novaCarta6 = ''
        let novaCarta7 = ''
        novaCarta6 = this.carta7
        novaCarta7 = this.carta6
        this.carta6 = novaCarta6
        this.carta7 = novaCarta7

        this.movimentoDaCartaDaMesaDoPlayerDo6Para7DoPlayer = this.movimentoDaCartaDaMesaDoPlayerDo6Para7DoPlayer + 1
        this.travarMovimentacaoDaMesaDoPlayer = false

        if((this.carta5.nome === 'Valete' || this.carta5.nome === 'Coringa') && (this.carta6.nome === 'Ás' || this.carta6.nome === 'Coringa') && (this.carta7.nome === 'Reis' || this.carta7.nome === 'Coringa') && (this.carta8.nome === 'Ás' || this.carta8.nome === 'Coringa')){
          this.msgDoGanhador = 'Parabéns, vitória!'
          this.avisoDoGanhador = true
          this.acabouOjogo = true
          this.mostrarTableFinal = true
        }
      }
      else if (movimento === 6) {
        let novaCarta7 = ''
        let novaCarta8 = ''
        novaCarta7 = this.carta8
        novaCarta8 = this.carta7
        this.carta7 = novaCarta7
        this.carta8 = novaCarta8

        this.movimentoDaCartaDaMesaDoPlayerDo7Para8DoPlayer = this.movimentoDaCartaDaMesaDoPlayerDo7Para8DoPlayer + 1
        this.travarMovimentacaoDaMesaDoPlayer = false

        if((this.carta5.nome === 'Valete' || this.carta5.nome === 'Coringa') && (this.carta6.nome === 'Ás' || this.carta6.nome === 'Coringa') && (this.carta7.nome === 'Reis' || this.carta7.nome === 'Coringa') && (this.carta8.nome === 'Ás' || this.carta8.nome === 'Coringa')){
          this.msgDoGanhador = 'Parabéns, vitória!'
          this.avisoDoGanhador = true
          this.acabouOjogo = true
          this.mostrarTableFinal = true
        }
      }
      else if (movimento === 7) {
        let novaCarta1 = ''
        let novaCarta5 = ''
        novaCarta1 = this.carta5
        novaCarta5 = this.carta1
        this.carta1 = novaCarta1
        this.carta5 = novaCarta5

        this.movimentoDaCartaDaMesaDoPlayerDo1Para5DoPlayer = this.movimentoDaCartaDaMesaDoPlayerDo1Para5DoPlayer + 1
        this.travarMovimentacaoDaMesaDoPlayer = false

        if((this.carta5.nome === 'Valete' || this.carta5.nome === 'Coringa') && (this.carta6.nome === 'Ás' || this.carta6.nome === 'Coringa') && (this.carta7.nome === 'Reis' || this.carta7.nome === 'Coringa') && (this.carta8.nome === 'Ás' || this.carta8.nome === 'Coringa')){
          this.msgDoGanhador = 'Parabéns, vitória!'
          this.avisoDoGanhador = true
          this.acabouOjogo = true
          this.mostrarTableFinal = true
        }
      }
      else if (movimento === 8) {
        let novaCarta2 = ''
        let novaCarta6 = ''
        novaCarta2 = this.carta6
        novaCarta6 = this.carta2
        this.carta2 = novaCarta2
        this.carta6 = novaCarta6

        this.movimentoDaCartaDaMesaDoPlayerDo2Para6DoPlayer = this.movimentoDaCartaDaMesaDoPlayerDo2Para6DoPlayer + 1
        this.travarMovimentacaoDaMesaDoPlayer = false

        if((this.carta5.nome === 'Valete' || this.carta5.nome === 'Coringa') && (this.carta6.nome === 'Ás' || this.carta6.nome === 'Coringa') && (this.carta7.nome === 'Reis' || this.carta7.nome === 'Coringa') && (this.carta8.nome === 'Ás' || this.carta8.nome === 'Coringa')){
          this.msgDoGanhador = 'Parabéns, vitória!'
          this.avisoDoGanhador = true
          this.acabouOjogo = true
          this.mostrarTableFinal = true
        }
      }
      else if (movimento === 9) {
        let novaCarta3 = ''
        let novaCarta7 = ''
        novaCarta3 = this.carta7
        novaCarta7 = this.carta3
        this.carta3 = novaCarta3
        this.carta7 = novaCarta7

        this.movimentoDaCartaDaMesaDoPlayerDo3Para7DoPlayer = this.movimentoDaCartaDaMesaDoPlayerDo3Para7DoPlayer + 1
        this.travarMovimentacaoDaMesaDoPlayer = false
        
        if((this.carta5.nome === 'Valete' || this.carta5.nome === 'Coringa') && (this.carta6.nome === 'Ás' || this.carta6.nome === 'Coringa') && (this.carta7.nome === 'Reis' || this.carta7.nome === 'Coringa') && (this.carta8.nome === 'Ás' || this.carta8.nome === 'Coringa')){
          this.msgDoGanhador = 'Parabéns, vitória!'
          this.avisoDoGanhador = true
          this.acabouOjogo = true
          this.mostrarTableFinal = true
        }
      }
      else if (movimento === 10) {
        let novaCarta4 = ''
        let novaCarta8 = ''
        novaCarta4 = this.carta8
        novaCarta8 = this.carta4
        this.carta4 = novaCarta4
        this.carta8 = novaCarta8

        this.movimentoDaCartaDaMesaDoPlayerDo4Para8DoPlayer = this.movimentoDaCartaDaMesaDoPlayerDo4Para8DoPlayer + 1
        this.travarMovimentacaoDaMesaDoPlayer = false
        
        if((this.carta5.nome === 'Valete' || this.carta5.nome === 'Coringa') && (this.carta6.nome === 'Ás' || this.carta6.nome === 'Coringa') && (this.carta7.nome === 'Reis' || this.carta7.nome === 'Coringa') && (this.carta8.nome === 'Ás' || this.carta8.nome === 'Coringa')){
          this.msgDoGanhador = 'Parabéns, vitória!'
          this.avisoDoGanhador = true
          this.acabouOjogo = true
          this.mostrarTableFinal = true
        }
      }
      else if (movimento === 11) {
        this.carta1 = ''
        this.log('Você descartou a primeira carta da sua mão');
      }
      else {
        alert("Deu erro, entre em contato com o admin para informá-lo!")
      }
    },
    
    // Método para resetar a partida
    resetar () {
      this.avisoDoGanhador = false
      window.location.reload()
      
    },

    visualizarFinal () {
      this.avisoDoGanhador = false
      this.mostrarTableFinal = true
    },

    desafiar() {

      // Primeira validação pra verificar se o player selecionou as cartas do oponente e de sua mão para o desafio
      if(this.objetoCartaDaMesaDoOponenteSelecionado.nome === undefined || this.objetoCartaDaMaoDoPlayerSelecionada.nome === undefined){

        if(this.objetoCartaDaMesaDoOponenteSelecionado.nome === undefined){
          
          this.msgDeAlerta = 'Você precisa selecionar a carta do seu oponente que você quer ganhar'
          this.msgDeAlertaCor = 'error'
          this.msgDeAlertaTime = 5000
          this.msgDeAlertaDisparar = true
          this.passoApassoDoDesafio = 1
        
        } 
        
        else if (this.objetoCartaDaMaoDoPlayerSelecionada.nome === undefined){
          
          this.msgDeAlerta = 'Você precisa selecionar a sua carta da sua mão para ganhar o desafio'
          this.msgDeAlertaCor = 'error'
          this.msgDeAlertaTime = 5000
          this.msgDeAlertaDisparar = true
          this.passoApassoDoDesafio = 2
        
        }

      }

      // Entrará no else se foi selecionado as duas cartas, e depois o else irá validar quem ganhou e já dar o resultado final
      else {

        let cartaMaiorDaMaoDoOponente = ''


        // _________________11111111________________
        // ________________111111111________________
        // _______________1111111111________________
        // ______________11111111111________________
        // _____________111111111111________________
        // ____________1111111111111________________
        // ___________1111111_111111________________
        // __________1111111__111111________________
        // ___________________111111________________
        // ___________________111111________________
        // ___________________111111________________
        // ___________________111111________________
        // ___________1111111111111111111111________
        // ___________1111111111111111111111________
        // Verifica se a 1ª◙◙◙◙◙◙ carta da mão do oponente é a maior e seta ela como a maior se verdadeiro, 
        // depois faz a verificação se o player ganhou ou não o desafio
        if((this.cartaOponente1.valor >= this.cartaOponente2.valor) && (this.cartaOponente1.valor >= this.cartaOponente3.valor) && (this.cartaOponente1.valor >= this.cartaOponente4.valor)){
          
          cartaMaiorDaMaoDoOponente = this.cartaOponente1
          let cartaUsadaPelaIAnoDesafio = this.cartaOponente1.nome + ' ' + this.cartaOponente1.naipe

          // Se ganhou:
          if(this.objetoCartaDaMaoDoPlayerSelecionada.valor > cartaMaiorDaMaoDoOponente.valor){
            
            if(this.cartaDaMaoEscolhidaPeloPlayer === 'carta1'){
              if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente5'){
                let novaCarta1 = ''
                novaCarta1 = this.cartaOponente5
                this.carta1 = novaCarta1

                this.sacarCartaDoMonte()
                this.cartaOponente5 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente1 = this.cartaSacada

              }
              else if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente6'){
                let novaCarta1 = ''
                novaCarta1 = this.cartaOponente6
                this.carta1 = novaCarta1

                this.sacarCartaDoMonte()
                this.cartaOponente6 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente1 = this.cartaSacada

              }
              else if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente7'){
                let novaCarta1 = ''
                novaCarta1 = this.cartaOponente7
                this.carta1 = novaCarta1

                this.sacarCartaDoMonte()
                this.cartaOponente7 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente1 = this.cartaSacada

              }
              else if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente8'){
                let novaCarta1 = ''
                novaCarta1 = this.cartaOponente8
                this.carta1 = novaCarta1

                this.sacarCartaDoMonte()
                this.cartaOponente8 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente1 = this.cartaSacada

              }

            }
            else if (this.cartaDaMaoEscolhidaPeloPlayer === 'carta2'){
              if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente5'){
                let novaCarta2 = ''
                novaCarta2 = this.cartaOponente5
                this.carta2 = novaCarta2

                this.sacarCartaDoMonte()
                this.cartaOponente5 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente1 = this.cartaSacada

              }
              else if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente6'){
                let novaCarta2 = ''
                novaCarta2 = this.cartaOponente6
                this.carta2 = novaCarta2

                this.sacarCartaDoMonte()
                this.cartaOponente6 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente1 = this.cartaSacada

              }
              else if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente7'){
                let novaCarta2 = ''
                novaCarta2 = this.cartaOponente7
                this.carta2 = novaCarta2

                this.sacarCartaDoMonte()
                this.cartaOponente7 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente1 = this.cartaSacada

              }
              else if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente8'){
                let novaCarta2 = ''
                novaCarta2 = this.cartaOponente8
                this.carta2 = novaCarta2

                this.sacarCartaDoMonte()
                this.cartaOponente8 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente1 = this.cartaSacada

              }
            }
            else if (this.cartaDaMaoEscolhidaPeloPlayer === 'carta3'){
              if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente5'){
                let novaCarta3 = ''
                novaCarta3 = this.cartaOponente5
                this.carta3 = novaCarta3

                this.sacarCartaDoMonte()
                this.cartaOponente5 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente1 = this.cartaSacada

              }
              else if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente6'){
                let novaCarta3 = ''
                novaCarta3 = this.cartaOponente6
                this.carta3 = novaCarta3

                this.sacarCartaDoMonte()
                this.cartaOponente6 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente1 = this.cartaSacada

              }
              else if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente7'){
                let novaCarta3 = ''
                novaCarta3 = this.cartaOponente7
                this.carta3 = novaCarta3

                this.sacarCartaDoMonte()
                this.cartaOponente7 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente1 = this.cartaSacada

              }
              else if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente8'){
                let novaCarta3 = ''
                novaCarta3 = this.cartaOponente8
                this.carta3 = novaCarta3

                this.sacarCartaDoMonte()
                this.cartaOponente8 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente1 = this.cartaSacada

              }
            }
            else if (this.cartaDaMaoEscolhidaPeloPlayer === 'carta4'){
              if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente5'){
                let novaCarta4 = ''
                novaCarta4 = this.cartaOponente5
                this.carta4 = novaCarta4

                this.sacarCartaDoMonte()
                this.cartaOponente5 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente1 = this.cartaSacada

              }
              else if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente6'){
                let novaCarta4 = ''
                novaCarta4 = this.cartaOponente6
                this.carta4 = novaCarta4

                this.sacarCartaDoMonte()
                this.cartaOponente6 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente1 = this.cartaSacada

              }
              else if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente7'){
                let novaCarta4 = ''
                novaCarta4 = this.cartaOponente7
                this.carta4 = novaCarta4

                this.sacarCartaDoMonte()
                this.cartaOponente7 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente1 = this.cartaSacada

              }
              else if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente8'){
                let novaCarta4 = ''
                novaCarta4 = this.cartaOponente8
                this.carta4 = novaCarta4

                this.sacarCartaDoMonte()
                this.cartaOponente8 = this.cartaSacada
                
                this.sacarCartaDoMonte()
                this.cartaOponente1 = this.cartaSacada

              }

            }

            this.ehDesafio = false
            this.log('Você ganhou o desafio porque a Bruna usou ' + cartaUsadaPelaIAnoDesafio + ' a Bruna repoz a carta da mesa e da mão com duas cartas do monte e a carta da mesa dela foi para sua mão');
            this.msgDeAlerta = 'Você ganhou o desafio porque a Bruna usou ' + cartaUsadaPelaIAnoDesafio + ' a Bruna repoz a carta da mesa e da mão com duas cartas do monte e a carta da mesa dela foi para sua mão'
            this.msgDeAlertaDisparar = true
            this.msgDeAlertaCor = 'blue'
            this.msgDeAlertaTime = 5000

            this.vezDoOponente2()

          }

          // Se perdeu:
          else {

            if(this.cartaDaMaoEscolhidaPeloPlayer === 'carta1'){
              
              this.sacarCartaDoMonte()
              this.carta1 = this.cartaSacada

              this.sacarCartaDoMonte()
              this.cartaOponente1 = this.cartaSacada

            }
            else if (this.cartaDaMaoEscolhidaPeloPlayer === 'carta2'){
              
              this.sacarCartaDoMonte()
              this.carta2 = this.cartaSacada

              this.sacarCartaDoMonte()
              this.cartaOponente1 = this.cartaSacada

            }
            else if (this.cartaDaMaoEscolhidaPeloPlayer === 'carta3'){
              
              this.sacarCartaDoMonte()
              this.carta3 = this.cartaSacada

              this.sacarCartaDoMonte()
              this.cartaOponente1 = this.cartaSacada

            }
            else if (this.cartaDaMaoEscolhidaPeloPlayer === 'carta4'){
              
              this.sacarCartaDoMonte()
              this.carta4 = this.cartaSacada

              this.sacarCartaDoMonte()
              this.cartaOponente1 = this.cartaSacada

            }

            this.log('Você perdeu o desafio porque a Bruna usou ' + cartaUsadaPelaIAnoDesafio + '. As cartas usadas no desafio foram descartadas e agora é a vez da Bruna.');
            this.msgDeAlerta = 'Você perdeu o desafio porque a Bruna usou ' + cartaUsadaPelaIAnoDesafio + '. As cartas usadas no desafio foram descartadas e agora é a vez da Bruna.'
            this.msgDeAlertaDisparar = true
            this.msgDeAlertaCor = 'error'
            this.msgDeAlertaTime = 5000
            this.ehDesafio = false
            this.vezDoOponente2()

          }

        }



        // _____________2222222222222_______________
        // ____________222222222222222______________
        // __________222222_______222222____________
        // __________22222_________22222____________
        // __________2222__________22222____________
        // ___________2222_________22222____________
        // ________________________22222____________
        // ________________________22222____________
        // ________________________22222____________
        // _______________________22222_____________
        // ______________________22222______________
        // ____________________22222________________
        // __________________222222_________________
        // _______________222222222_________________
        // _____________2222222222222222222_________
        // _____________2222222222222222222_________
        // Verifica se a 2ª◙◙◙◙◙◙ carta da mão do oponente é a maior e seta ela como a maior se verdadeiro, 
        // depois faz a verificação se o player ganhou ou não o desafio
        else if((this.cartaOponente2.valor >= this.cartaOponente1.valor) && (this.cartaOponente2.valor >= this.cartaOponente3.valor) && (this.cartaOponente2.valor >= this.cartaOponente4.valor)){
          
          cartaMaiorDaMaoDoOponente = this.cartaOponente2
          let cartaUsadaPelaIAnoDesafio = this.cartaOponente2.nome + ' ' + this.cartaOponente2.naipe

          // Se ganhou:
          if(this.objetoCartaDaMaoDoPlayerSelecionada.valor > cartaMaiorDaMaoDoOponente.valor){
            
            if(this.cartaDaMaoEscolhidaPeloPlayer === 'carta1'){
              if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente5'){
                let novaCarta1 = ''
                novaCarta1 = this.cartaOponente5
                this.carta1 = novaCarta1

                this.sacarCartaDoMonte()
                this.cartaOponente5 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente2 = this.cartaSacada

              }
              else if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente6'){
                let novaCarta1 = ''
                novaCarta1 = this.cartaOponente6
                this.carta1 = novaCarta1

                this.sacarCartaDoMonte()
                this.cartaOponente6 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente2 = this.cartaSacada

              }
              else if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente7'){
                let novaCarta1 = ''
                novaCarta1 = this.cartaOponente7
                this.carta1 = novaCarta1

                this.sacarCartaDoMonte()
                this.cartaOponente7 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente2 = this.cartaSacada

              }
              else if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente8'){
                let novaCarta1 = ''
                novaCarta1 = this.cartaOponente8
                this.carta1 = novaCarta1

                this.sacarCartaDoMonte()
                this.cartaOponente8 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente2 = this.cartaSacada

              }

            }
            else if (this.cartaDaMaoEscolhidaPeloPlayer === 'carta2'){
              if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente5'){
                let novaCarta2 = ''
                novaCarta2 = this.cartaOponente5
                this.carta2 = novaCarta2

                this.sacarCartaDoMonte()
                this.cartaOponente5 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente2 = this.cartaSacada

              }
              else if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente6'){
                let novaCarta2 = ''
                novaCarta2 = this.cartaOponente6
                this.carta2 = novaCarta2

                this.sacarCartaDoMonte()
                this.cartaOponente6 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente2 = this.cartaSacada

              }
              else if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente7'){
                let novaCarta2 = ''
                novaCarta2 = this.cartaOponente7
                this.carta2 = novaCarta2

                this.sacarCartaDoMonte()
                this.cartaOponente7 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente2 = this.cartaSacada

              }
              else if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente8'){
                let novaCarta2 = ''
                novaCarta2 = this.cartaOponente8
                this.carta2 = novaCarta2

                this.sacarCartaDoMonte()
                this.cartaOponente8 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente2 = this.cartaSacada

              }
            }
            else if (this.cartaDaMaoEscolhidaPeloPlayer === 'carta3'){
              if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente5'){
                let novaCarta3 = ''
                novaCarta3 = this.cartaOponente5
                this.carta3 = novaCarta3

                this.sacarCartaDoMonte()
                this.cartaOponente5 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente2 = this.cartaSacada

              }
              else if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente6'){
                let novaCarta3 = ''
                novaCarta3 = this.cartaOponente6
                this.carta3 = novaCarta3

                this.sacarCartaDoMonte()
                this.cartaOponente6 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente2 = this.cartaSacada

              }
              else if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente7'){
                let novaCarta3 = ''
                novaCarta3 = this.cartaOponente7
                this.carta3 = novaCarta3

                this.sacarCartaDoMonte()
                this.cartaOponente7 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente2 = this.cartaSacada

              }
              else if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente8'){
                let novaCarta3 = ''
                novaCarta3 = this.cartaOponente8
                this.carta3 = novaCarta3

                this.sacarCartaDoMonte()
                this.cartaOponente8 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente2 = this.cartaSacada

              }
            }
            else if (this.cartaDaMaoEscolhidaPeloPlayer === 'carta4'){
              if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente5'){
                let novaCarta4 = ''
                novaCarta4 = this.cartaOponente5
                this.carta4 = novaCarta4

                this.sacarCartaDoMonte()
                this.cartaOponente5 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente2 = this.cartaSacada

              }
              else if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente6'){
                let novaCarta4 = ''
                novaCarta4 = this.cartaOponente6
                this.carta4 = novaCarta4

                this.sacarCartaDoMonte()
                this.cartaOponente6 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente2 = this.cartaSacada

              }
              else if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente7'){
                let novaCarta4 = ''
                novaCarta4 = this.cartaOponente7
                this.carta4 = novaCarta4

                this.sacarCartaDoMonte()
                this.cartaOponente7 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente2 = this.cartaSacada

              }
              else if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente8'){
                let novaCarta4 = ''
                novaCarta4 = this.cartaOponente8
                this.carta4 = novaCarta4

                this.sacarCartaDoMonte()
                this.cartaOponente8 = this.cartaSacada
                
                this.sacarCartaDoMonte()
                this.cartaOponente2 = this.cartaSacada

              }
            }

            this.ehDesafio = false
            this.log('Você ganhou o desafio porque a Bruna usou ' + cartaUsadaPelaIAnoDesafio + ' a Bruna repoz a carta da mesa e da mão com duas cartas do monte e a carta da mesa dela foi para sua mão');
            this.msgDeAlerta = 'Você ganhou o desafio porque a Bruna usou ' + cartaUsadaPelaIAnoDesafio + ' a Bruna repoz a carta da mesa e da mão com duas cartas do monte e a carta da mesa dela foi para sua mão'
            this.msgDeAlertaDisparar = true
            this.msgDeAlertaCor = 'blue'
            this.msgDeAlertaTime = 5000

            this.vezDoOponente2()

          }
          
          // Se perdeu:
          else {
          
            if(this.cartaDaMaoEscolhidaPeloPlayer === 'carta1'){
              
              this.sacarCartaDoMonte()
              this.carta1 = this.cartaSacada
              

              this.sacarCartaDoMonte()
              this.cartaOponente2 = this.cartaSacada

            }
            else if (this.cartaDaMaoEscolhidaPeloPlayer === 'carta2'){
              
              this.sacarCartaDoMonte()
              this.carta2 = this.cartaSacada
              
              this.sacarCartaDoMonte()
              this.cartaOponente2 = this.cartaSacada

            }
            else if (this.cartaDaMaoEscolhidaPeloPlayer === 'carta3'){
              
              this.sacarCartaDoMonte()
              this.carta3 = this.cartaSacada
              
              this.sacarCartaDoMonte()
              this.cartaOponente3 = this.cartaSacada
              
            }
            else if (this.cartaDaMaoEscolhidaPeloPlayer === 'carta4'){
              
              this.sacarCartaDoMonte()
              this.carta4 = this.cartaSacada
              
              this.sacarCartaDoMonte()
              this.cartaOponente4 = this.cartaSacada

            }

            this.log('Você perdeu o desafio porque a Bruna usou ' + cartaUsadaPelaIAnoDesafio + '. As cartas usadas no desafio foram descartadas e agora é a vez da Bruna.');
            this.msgDeAlerta = 'Você perdeu o desafio porque a Bruna usou ' + cartaUsadaPelaIAnoDesafio + '. As cartas usadas no desafio foram descartadas e agora é a vez da Bruna.'
            this.msgDeAlertaDisparar = true
            this.msgDeAlertaCor = 'error'
            this.msgDeAlertaTime = 5000
            this.ehDesafio = false
            this.vezDoOponente2()

          }

        }



        // __________3333333333333333333____________
        // __________333333333__33333333____________
        // __________33333_________33333____________
        // __________333_____________333____________
        // __________________________333____________
        // __________________________333____________
        // ________________________33333____________
        // ____________________333333333____________
        // ____________________333333333____________
        // ________________________33333____________
        // __________________________333____________
        // __________________________333____________
        // __________333_____________333____________
        // __________33333_________33333____________
        // __________333333333__33333333____________
        // __________3333333333333333333____________
        // Verifica se a 3ª◙◙◙◙◙◙ carta da mão do oponente é a maior e seta ela como a maior se verdadeiro, 
        // depois faz a verificação se o player ganhou ou não o desafio
        else if((this.cartaOponente3.valor >= this.cartaOponente1.valor) && (this.cartaOponente3.valor >= this.cartaOponente2.valor) && (this.cartaOponente3.valor >= this.cartaOponente4.valor)){
          
          cartaMaiorDaMaoDoOponente = this.cartaOponente3
          let cartaUsadaPelaIAnoDesafio = this.cartaOponente3.nome + ' ' + this.cartaOponente3.naipe

          // Se ganhou:
          if(this.objetoCartaDaMaoDoPlayerSelecionada.valor > cartaMaiorDaMaoDoOponente.valor){
            
            if(this.cartaDaMaoEscolhidaPeloPlayer === 'carta1'){
              if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente5'){
                let novaCarta1 = ''
                novaCarta1 = this.cartaOponente5
                this.carta1 = novaCarta1

                this.sacarCartaDoMonte()
                this.cartaOponente5 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente3 = this.cartaSacada

              }
              else if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente6'){
                let novaCarta1 = ''
                novaCarta1 = this.cartaOponente6
                this.carta1 = novaCarta1

                this.sacarCartaDoMonte()
                this.cartaOponente6 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente3 = this.cartaSacada

              }
              else if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente7'){
                let novaCarta1 = ''
                novaCarta1 = this.cartaOponente7
                this.carta1 = novaCarta1

                this.sacarCartaDoMonte()
                this.cartaOponente7 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente3 = this.cartaSacada

              }
              else if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente8'){
                let novaCarta1 = ''
                novaCarta1 = this.cartaOponente8
                this.carta1 = novaCarta1

                this.sacarCartaDoMonte()
                this.cartaOponente8 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente3 = this.cartaSacada

              }

            }
            else if (this.cartaDaMaoEscolhidaPeloPlayer === 'carta2'){
              if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente5'){
                let novaCarta2 = ''
                novaCarta2 = this.cartaOponente5
                this.carta2 = novaCarta2

                this.sacarCartaDoMonte()
                this.cartaOponente5 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente3 = this.cartaSacada

              }
              else if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente6'){
                let novaCarta2 = ''
                novaCarta2 = this.cartaOponente6
                this.carta2 = novaCarta2

                this.sacarCartaDoMonte()
                this.cartaOponente6 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente3 = this.cartaSacada

              }
              else if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente7'){
                let novaCarta2 = ''
                novaCarta2 = this.cartaOponente7
                this.carta2 = novaCarta2

                this.sacarCartaDoMonte()
                this.cartaOponente7 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente3 = this.cartaSacada

              }
              else if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente8'){
                let novaCarta2 = ''
                novaCarta2 = this.cartaOponente8
                this.carta2 = novaCarta2

                this.sacarCartaDoMonte()
                this.cartaOponente8 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente3 = this.cartaSacada

              }
            }
            else if (this.cartaDaMaoEscolhidaPeloPlayer === 'carta3'){
              if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente5'){
                let novaCarta3 = ''
                novaCarta3 = this.cartaOponente5
                this.carta3 = novaCarta3

                this.sacarCartaDoMonte()
                this.cartaOponente5 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente3 = this.cartaSacada

              }
              else if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente6'){
                let novaCarta3 = ''
                novaCarta3 = this.cartaOponente6
                this.carta3 = novaCarta3

                this.sacarCartaDoMonte()
                this.cartaOponente6 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente3 = this.cartaSacada

              }
              else if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente7'){
                let novaCarta3 = ''
                novaCarta3 = this.cartaOponente7
                this.carta3 = novaCarta3

                this.sacarCartaDoMonte()
                this.cartaOponente7 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente3 = this.cartaSacada

              }
              else if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente8'){
                let novaCarta3 = ''
                novaCarta3 = this.cartaOponente8
                this.carta3 = novaCarta3

                this.sacarCartaDoMonte()
                this.cartaOponente8 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente3 = this.cartaSacada

              }
            }
            else if (this.cartaDaMaoEscolhidaPeloPlayer === 'carta4'){
              if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente5'){
                let novaCarta4 = ''
                novaCarta4 = this.cartaOponente5
                this.carta4 = novaCarta4

                this.sacarCartaDoMonte()
                this.cartaOponente5 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente3 = this.cartaSacada

              }
              else if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente6'){
                let novaCarta4 = ''
                novaCarta4 = this.cartaOponente6
                this.carta4 = novaCarta4

                this.sacarCartaDoMonte()
                this.cartaOponente6 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente3 = this.cartaSacada

              }
              else if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente7'){
                let novaCarta4 = ''
                novaCarta4 = this.cartaOponente7
                this.carta4 = novaCarta4

                this.sacarCartaDoMonte()
                this.cartaOponente7 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente3 = this.cartaSacada

              }
              else if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente8'){
                let novaCarta4 = ''
                novaCarta4 = this.cartaOponente8
                this.carta4 = novaCarta4

                this.sacarCartaDoMonte()
                this.cartaOponente8 = this.cartaSacada
                
                this.sacarCartaDoMonte()
                this.cartaOponente3 = this.cartaSacada

              }
            }

            this.ehDesafio = false
            this.log('Você ganhou o desafio porque a Bruna usou ' + cartaUsadaPelaIAnoDesafio + ' a Bruna repoz a carta da mesa e da mão com duas cartas do monte e a carta da mesa dela foi para sua mão');
            this.msgDeAlerta = 'Você ganhou o desafio porque a Bruna usou ' + cartaUsadaPelaIAnoDesafio + ' a Bruna repoz a carta da mesa e da mão com duas cartas do monte e a carta da mesa dela foi para sua mão'
            this.msgDeAlertaDisparar = true
            this.msgDeAlertaCor = 'blue'
            this.msgDeAlertaTime = 5000

            this.vezDoOponente2()

          } 
          
          // Se perdeu:
          else {
          
            if(this.cartaDaMaoEscolhidaPeloPlayer === 'carta1'){
              
              this.sacarCartaDoMonte()
              this.carta1 = this.cartaSacada
              
              this.sacarCartaDoMonte()
              this.cartaOponente3 = this.cartaSacada

            }
            else if (this.cartaDaMaoEscolhidaPeloPlayer === 'carta2'){
              
              this.sacarCartaDoMonte()
              this.carta2 = this.cartaSacada
              
              this.sacarCartaDoMonte()
              this.cartaOponente3 = this.cartaSacada

            }
            else if (this.cartaDaMaoEscolhidaPeloPlayer === 'carta3'){
              
              this.sacarCartaDoMonte()
              this.carta3 = this.cartaSacada
              
              this.sacarCartaDoMonte()
              this.cartaOponente3 = this.cartaSacada

            }
            else if (this.cartaDaMaoEscolhidaPeloPlayer === 'carta4'){
              
              this.sacarCartaDoMonte()
              this.carta4 = this.cartaSacada
              
              this.sacarCartaDoMonte()
              this.cartaOponente3 = this.cartaSacada

            }

            this.log('Você perdeu o desafio porque a Bruna usou ' + cartaUsadaPelaIAnoDesafio + '. As cartas usadas no desafio foram descartadas e agora é a vez da Bruna.');
            this.msgDeAlerta = 'Você perdeu o desafio porque a Bruna usou ' + cartaUsadaPelaIAnoDesafio + '. As cartas usadas no desafio foram descartadas e agora é a vez da Bruna.'
            this.msgDeAlertaDisparar = true
            this.msgDeAlertaCor = 'error'
            this.msgDeAlertaTime = 5000
            this.ehDesafio = false
            this.vezDoOponente2()

          }

        }



        // __________________444444_________________
        // _________________4444444_________________
        // ________________44444444_________________
        // _______________444444444_________________
        // ______________4444444444_________________
        // _____________44444__4444_________________
        // ____________44444___4444_________________
        // ___________44444____4444_________________
        // __________44444_____4444_________________
        // _________4444444444444444444_____________
        // ________44444444444444444444_____________
        // ________44444444444444444444_____________
        // ____________________4444_________________
        // ____________________4444_________________
        // ____________________4444_________________
        // Verifica se a 4ª◙◙◙◙◙◙ carta da mão do oponente é a maior e seta ela como a maior se verdadeiro, 
        // depois faz a verificação se o player ganhou ou não o desafio
        else if((this.cartaOponente4.valor >= this.cartaOponente1.valor) && (this.cartaOponente4.valor >= this.cartaOponente2.valor) && (this.cartaOponente4.valor >= this.cartaOponente3.valor)){
          
          cartaMaiorDaMaoDoOponente = this.cartaOponente4
          let cartaUsadaPelaIAnoDesafio = this.cartaOponente4.nome + ' ' + this.cartaOponente4.naipe

          // Se ganhou:
          if(this.objetoCartaDaMaoDoPlayerSelecionada.valor > cartaMaiorDaMaoDoOponente.valor){
            
            if(this.cartaDaMaoEscolhidaPeloPlayer === 'carta1'){
              if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente5'){
                let novaCarta1 = ''
                novaCarta1 = this.cartaOponente5
                this.carta1 = novaCarta1

                this.sacarCartaDoMonte()
                this.cartaOponente5 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente4 = this.cartaSacada

              }
              else if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente6'){
                let novaCarta1 = ''
                novaCarta1 = this.cartaOponente6
                this.carta1 = novaCarta1

                this.sacarCartaDoMonte()
                this.cartaOponente6 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente4 = this.cartaSacada

              }
              else if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente7'){
                let novaCarta1 = ''
                novaCarta1 = this.cartaOponente7
                this.carta1 = novaCarta1

                this.sacarCartaDoMonte()
                this.cartaOponente7 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente4 = this.cartaSacada

              }
              else if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente8'){
                let novaCarta1 = ''
                novaCarta1 = this.cartaOponente8
                this.carta1 = novaCarta1

                this.sacarCartaDoMonte()
                this.cartaOponente8 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente4 = this.cartaSacada

              }

            }
            else if (this.cartaDaMaoEscolhidaPeloPlayer === 'carta2'){
              if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente5'){
                let novaCarta2 = ''
                novaCarta2 = this.cartaOponente5
                this.carta2 = novaCarta2

                this.sacarCartaDoMonte()
                this.cartaOponente5 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente4 = this.cartaSacada

              }
              else if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente6'){
                let novaCarta2 = ''
                novaCarta2 = this.cartaOponente6
                this.carta2 = novaCarta2

                this.sacarCartaDoMonte()
                this.cartaOponente6 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente4 = this.cartaSacada

              }
              else if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente7'){
                let novaCarta2 = ''
                novaCarta2 = this.cartaOponente7
                this.carta2 = novaCarta2

                this.sacarCartaDoMonte()
                this.cartaOponente7 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente4 = this.cartaSacada

              }
              else if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente8'){
                let novaCarta2 = ''
                novaCarta2 = this.cartaOponente8
                this.carta2 = novaCarta2

                this.sacarCartaDoMonte()
                this.cartaOponente8 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente4 = this.cartaSacada

              }
            }
            else if (this.cartaDaMaoEscolhidaPeloPlayer === 'carta3'){
              if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente5'){
                let novaCarta3 = ''
                novaCarta3 = this.cartaOponente5
                this.carta3 = novaCarta3

                this.sacarCartaDoMonte()
                this.cartaOponente5 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente4 = this.cartaSacada

              }
              else if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente6'){
                let novaCarta3 = ''
                novaCarta3 = this.cartaOponente6
                this.carta3 = novaCarta3

                this.sacarCartaDoMonte()
                this.cartaOponente6 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente4 = this.cartaSacada

              }
              else if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente7'){
                let novaCarta3 = ''
                novaCarta3 = this.cartaOponente7
                this.carta3 = novaCarta3

                this.sacarCartaDoMonte()
                this.cartaOponente7 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente4 = this.cartaSacada

              }
              else if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente8'){
                let novaCarta3 = ''
                novaCarta3 = this.cartaOponente8
                this.carta3 = novaCarta3

                this.sacarCartaDoMonte()
                this.cartaOponente8 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente4 = this.cartaSacada

              }
            }
            else if (this.cartaDaMaoEscolhidaPeloPlayer === 'carta4'){
              if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente5'){
                let novaCarta4 = ''
                novaCarta4 = this.cartaOponente5
                this.carta4 = novaCarta4

                this.sacarCartaDoMonte()
                this.cartaOponente5 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente4 = this.cartaSacada

              }
              else if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente6'){
                let novaCarta4 = ''
                novaCarta4 = this.cartaOponente6
                this.carta4 = novaCarta4

                this.sacarCartaDoMonte()
                this.cartaOponente6 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente4 = this.cartaSacada

              }
              else if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente7'){
                let novaCarta4 = ''
                novaCarta4 = this.cartaOponente7
                this.carta4 = novaCarta4

                this.sacarCartaDoMonte()
                this.cartaOponente7 = this.cartaSacada

                this.sacarCartaDoMonte()
                this.cartaOponente4 = this.cartaSacada

              }
              else if(this.cartaDoOponenteEscolhidaPeloPlayer === 'cartaOponente8'){
                let novaCarta4 = ''
                novaCarta4 = this.cartaOponente8
                this.carta4 = novaCarta4

                this.sacarCartaDoMonte()
                this.cartaOponente8 = this.cartaSacada
                
                this.sacarCartaDoMonte()
                this.cartaOponente4 = this.cartaSacada

              }
            }

            this.ehDesafio = false
            this.log('Você ganhou o desafio porque a Bruna usou ' + cartaUsadaPelaIAnoDesafio + ' a Bruna repoz a carta da mesa e da mão com duas cartas do monte e a carta da mesa dela foi para sua mão');
            this.msgDeAlerta = 'Você ganhou o desafio porque a Bruna usou ' + cartaUsadaPelaIAnoDesafio + ' a Bruna repoz a carta da mesa e da mão com duas cartas do monte e a carta da mesa dela foi para sua mão'
            this.msgDeAlertaDisparar = true
            this.msgDeAlertaCor = 'blue'
            this.msgDeAlertaTime = 5000

            this.vezDoOponente2()

          }
          
          // Se perdeu:
          else {
          
            if(this.cartaDaMaoEscolhidaPeloPlayer === 'carta1'){
              
              this.sacarCartaDoMonte()
              this.carta1 = this.cartaSacada
              
              this.sacarCartaDoMonte()
              this.cartaOponente4 = this.cartaSacada

            }
            else if (this.cartaDaMaoEscolhidaPeloPlayer === 'carta2'){
              
              this.sacarCartaDoMonte()
              this.carta2 = this.cartaSacada
              
              this.sacarCartaDoMonte()
              this.cartaOponente4 = this.cartaSacada

            }
            else if (this.cartaDaMaoEscolhidaPeloPlayer === 'carta3'){
              
              this.sacarCartaDoMonte()
              this.carta3 = this.cartaSacada
              
              this.sacarCartaDoMonte()
              this.cartaOponente4 = this.cartaSacada
              
            }
            else if (this.cartaDaMaoEscolhidaPeloPlayer === 'carta4'){
              
              this.sacarCartaDoMonte()
              this.carta4 = this.cartaSacada
              
              this.sacarCartaDoMonte()
              this.cartaOponente4 = this.cartaSacada

            }

            this.log('Você perdeu o desafio porque a Bruna usou ' + cartaUsadaPelaIAnoDesafio + '. As cartas usadas no desafio foram descartadas e agora é a vez da Bruna.');
            this.msgDeAlerta = 'Você perdeu o desafio porque a Bruna usou ' + cartaUsadaPelaIAnoDesafio + '. As cartas usadas no desafio foram descartadas e agora é a vez da Bruna.'
            this.msgDeAlertaDisparar = true
            this.msgDeAlertaCor = 'error'
            this.msgDeAlertaTime = 5000
            this.ehDesafio = false
            this.vezDoOponente2()

          }

        } 

        // Mensagem de erro
        else {
          alert("Erro na lógica! Por favor, informe o adm do site sobre esse erro!")
        }

      }

      this.objetoCartaDaMesaDoOponenteSelecionado = {}
      this.objetoCartaDaMaoDoPlayerSelecionada = {}
      this.passoApassoDoDesafio = 1
      this.travarMovimentacaoDaMesaDoPlayer = true

    },
    
    log(texto) {

      let dataAtual = new Date();
      let dtarr = dataAtual.toISOString().split('T'); // [0] = dia, [1] = hora/minuto/segundo
      let dia = dtarr[0];
      let horas = dtarr[1];
      let codigo = this.numeroDoLog + 1
      let novaOrdem = []

      // formata em dd/MM/yyyy
      dia = ('[') + dia.split('-')[2] + "/" + dia.split('-')[1] + "/" + dia.split('-')[0] + (']');
      horas = horas.split('.')[0];


      this.logs.push({
        code: codigo,
        msg: texto,
        data: dataAtual,
        dataFmt: dia + ' ' + horas
      });

      this.numeroDoLog = this.numeroDoLog + 1;

    },

    verificarSeTaLogado(){
      
      let _id = localStorage.getItem("Ponto")
      if(_id === ''){
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
    
    }

  }


    
}

</script>

<style>

.baralho2 {
  flex-wrap: wrap;
}

.baralho {
  width: 800px;
}

.table {
  border: 5px black solid;
  text-align: center;
}

.centralized {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.carta {
  width: 50px;
  height: 100px;
  object-fit: cover;
  object-position: center;
  max-width: 100%;
  max-height: 100%;
  margin-left: 10px;
  border-radius: 6px;
  background-position: 50%;
}

.v-image__image, .v-image__placeholder {
  width: 100%;
  height: 100%;
  
}

.carta:hover{
  border: 1px;
}

.botaoEstilizado {
  text-decoration: none;
  font-size: 18pt;
  text-transform: lowercase;
}

.quebraDeLinha {
  word-wrap: break-word;
  text-align: center;
}

.cartaPointer {
  cursor: pointer;
}

.cartaSelecionada {
  border: 1px;
}

.scrolar{
  overflow-y: scroll;
}

.textoAlinhadoAEsquerda{
  text-align: start;
}

</style>