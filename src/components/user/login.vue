<template>
  <div class="form" id="form">
    <div id="formHeader">
      <h2>Formulaire de connexion</h2>
    </div>
    <form class="signInForm">
      <div class="form-div">
        <label for="email">email: </label>
        <input
          type="text"
          name="email"
          id="email"
          v-model="dataConnexion.email"
        />
      </div>
      <div class="form-div">
        <label for="password">password: </label>
        <input
          type="password"
          name="password"
          id="password"
          v-model="dataConnexion.password"
        />
      </div>
      <p class="alerte" v-show="isVisible">
        L'adresse mail est obligatoire et doit être valide. <br />
        Le mot de passe est obligatoire et doit comporter entre 4 et 10
        caractères.
      </p>
      <p class="alerte" v-show="idUncorrect">Utilisateur inconnu.</p>
      <div class="form-div">
        <button
          id="validationButton"
          class="submit-button"
          v-on:click.prevent="connexion"
          v-on:keyup.enter="connexion"
        >
          Valider
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import store from "../../store/";
import configAxios from "../../axios/configAxios";

//import utils from "../Utils/axios";

import jwtDecode from "jwt-decode";
export default {
  name: "Connexion",
  data() {
    return {
      dataConnexion: {
        email: null,
        password: null,
      },
      isVisible: false,
      idUncorrect: false,
      logged: false,
    };
  },
  methods: {
    connexion() {
      //Obtenir tous les refuges
      configAxios
        .get("refuges")
        .then((res) => {
          store.dispatch("getRefuges", res.data);
        })
        .catch((err) => err);
      //Obtenir tous les chiens
      configAxios
        .get("chien")
        .then((res) => {
          store.dispatch("getChiens", res.data);
        })
        .catch((err) => err);

      //

      const email = this.dataConnexion.email;
      const password = this.dataConnexion.password;
      const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
      const regexPassword = /^(?=.*\d).{4,10}$/; //chaîne de 4 à 10 caractères
      if (
        !email ||
        !regexEmail.test(email) ||
        !password ||
        !regexPassword.test(password)
      ) {
        return (this.isVisible = true);
      } else {
        configAxios
          .post(`user/login`, {
            email: email,
            password: password,
          })
          .then((result) => {
            localStorage.setItem("token", result.data.token);
            const decoded = jwtDecode(result.data.token);
            console.log(decoded);
            this.logged = true;
            store.dispatch("getUserLogged", this.logged);
            store.dispatch("getUserInfos", decoded);

            location.replace("/Accueil");
          })

          .catch(() => (this.idUncorrect = true));
      }
    },
  },

  computed: {
    username() {
      // We will see what `params` is shortly
      return this.$route.params.username;
    },

    userLoggedIn() {
      return store.state.userLoggedIn;
    },
    setUserName() {
      return this.$store.state.userName;
    },
    setRefuges() {
      return this.$store.state.categories;
    },
  },
};
</script>
<style lang="scss">
.signInForm {
  width: 50%;
  margin: auto;
  padding: 10px;

  & .form-div {
    margin: 10px;
  }
}
</style>
