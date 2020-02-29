<template>
    <nav>

        <v-toolbar app dark>
          <v-toolbar-title>
            <router-link to="/Home" class="menuTituloClasse">
                Jaka Games
            </router-link>
          </v-toolbar-title>
          
          <v-spacer></v-spacer>
          
          <v-toolbar-items>
          
                <v-btn flat>
                    <router-link to="/About" class="menuClasseLinks">
                        Sobre o Game
                    </router-link>
                </v-btn>
                
                <v-btn flat>
                    <router-link to="/Register" class="menuClasseLinks">
                        Cadastre-se
                    </router-link>
                </v-btn>
                
                <v-btn flat>
                    <router-link to="/Login" class="menuClasseLinks">
                        Login
                    </router-link>
                </v-btn>

          </v-toolbar-items>
        </v-toolbar>


    </nav>
</template>

<script>
    export default {
        data() {
            return {
                links: [
                    {
                        icon: 'about',
                        text: 'About',
                        route: '/About'
                    },
                    {
                        icon: 'cadastre-se',
                        text: 'Register',
                        route: '/Register'
                    },
                    {
                        icon: 'home',
                        text: 'Home',
                        route: '/Home'
                    },
                    {
                        icon: 'login',
                        text: 'Login',
                        route: '/Login'
                    }
                ]
            }
        },
    }
</script>

<style>

    .menuClasseLinks {
        text-decoration: none;
        font-size: 11pt;
        color: red;
    
    }

    .menuTituloClasse {
        text-decoration: none;
        color: red;
        
    }

</style>