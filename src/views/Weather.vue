<template>
  <h4>Weather</h4>
</template>

<script>
import axios from "axios";
import db from "@/firebase/firebase";

export default {
  name: "Weather",
  data() {
    return {
      APIkey: null,
      forecast: null,
      currentWeather: null,
      loading: true,
      currentTime: null
    };
  },
  emits: ["is-day", "is-night"],
  created() {
    this.APIkey = process.env.VUE_APP_openWeatherAPIkey;
    this.getWeather();
  },
  methods: {
    getWeather() {
      db.collection("cities")
        .where("city", "==", `${this.$route.params.city}`)
        .get()
        .then(docs =>
          docs.forEach(doc => {
            this.currentWeather = doc.data().currentWeather;
            axios
              .get(
                `https://api.openweathermap.org/data/2.5/onecall?lat=${
                  doc.data().currentWeather.coord.lat
                }&lon=${
                  doc.data().currentWeather.coord.lon
                }&exclude=current,minutley,alert$units=metric&appid=${
                  this.APIkey
                }`
              )
              .then(res => {
                this.forecast = res.data;
              })
              .then(() => {
                this.loading = false;
                console.log(this.forecast);
                console.log(this.currentWeather);
              });
          })
        )
        .catch(err => console.error(err));
    },
    getCurrentTime() {
      const dateObj = new Date();
      this.currentTime = dateObj.getHours();

      const sunrise = new Date(
        this.currentWeather.sys.sunrise * 1000
      ).getHours();
      const sunset = new Date(this.currentWeather.sys.sunset * 1000).getHours();

      if (this.currentTime > sunrise && this.currentTime < sunset) {
        this.$emit("is-day");
      } else {
        this.$emit("is-night");
      }
    }
  }
};
</script>

<style>
h4 {
  padding-top: 140px;
}
</style>
