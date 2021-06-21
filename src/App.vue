<template>
  <div class="main">
    <Navigation
      v-on:add-city="toggleModal"
      v-on:edit-city="toggleEdit"
      :addCityActive="addCityActive"
    />
    <Modal v-if="modalOpen" v-on:close-modal="toggleModal" :APIkey="APIkey" />
    <router-view
      :cities="cities"
      :edit="edit"
      @is-day="dayTime"
      @is-night="nightTime"
    />
  </div>
</template>

<script>
import axios from "axios";
import db from "./firebase/firebase";
import Navigation from "./components/Navigation.vue";
import Modal from "./components/Modal.vue";

export default {
  name: "App",
  components: {
    Navigation,
    Modal
  },
  data() {
    return {
      isDay: null,
      isNight: null,
      APIkey: null,
      cities: [],
      modalOpen: null,
      edit: null,
      addCityActive: null
    };
  },
  methods: {
    toggleModal() {
      this.modalOpen = !this.modalOpen;
    },
    toggleEdit() {
      this.edit = !this.edit;
    },

    getCityWeather() {
      let firebaseDb = db.collection("cities");

      firebaseDb.onSnapshot(snap => {
        snap.docChanges().forEach(async doc => {
          if (doc.type === "added" && !doc.doc.Nd) {
            try {
              const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${
                  doc.doc.data().city
                }&units=metric&appid=${this.APIkey}`
              );
              const data = response.data;
              // add the weather to the city
              firebaseDb
                .doc(doc.doc.id)
                .update({
                  currentWeather: data
                })
                .then(() => {
                  this.cities.push(doc.doc.data());
                });
            } catch (error) {
              console.error(error);
            }
          } else if (doc.type === "added" && doc.doc.Nd) {
            this.cities.push(doc.doc.data());
          } else if (doc.type === "removed") {
            this.cities = this.cities.filter(
              city => city.city !== doc.doc.data().city
            );
          }
        });
      });
    },
    checkRoute() {
      if (this.$route.name === "AddCity") {
        this.addCityActive = true;
      } else {
        this.addCityActive = false;
      }
    },
    dayTime() {
      this.isDay = !this.isDay;
    },
    nightTime() {
      this.isNight = !this.isNight;
    }
  },
  watch: {
    $route() {
      this.checkRoute();
    }
  },
  created() {
    this.APIkey = process.env.VUE_APP_openWeatherAPIkey;
    this.getCityWeather();
    this.checkRoute();
  }
};
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}

.main {
  max-width: 1024px;
  margin: 0 auto;
  height: 100vh;

  .container {
    padding: 0 20px;
  }
}
</style>
