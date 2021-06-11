<template>
  <div class="city" @click="goToWeather">
    <i
      v-if="edit"
      @click="removeCity"
      class="far fa-trash-alt edit"
      ref="edit"
    ></i>
    <span>{{ city.city }}</span>
    <div class="weather">
      <span>{{ Math.round(city.currentWeather.main.temp) }}&deg;</span>
      <img
        :src="
          require(`@/../public/conditions/${city.currentWeather.weather[0].icon}.svg`)
        "
        alt="current weather"
      />
      <!-- <div class="video">
        <video
          :src="
            require(`@/../public/videos/${city.currentWeather.weather[0].icon}.mp4`)
          "
          autoplay
          loop
          muted
        ></video>
      </div> -->
    </div>
  </div>
</template>

<script>
import db from "@/firebase/firebase.js";

export default {
  name: "City",
  data() {
    return {
      id: null
    };
  },
  props: ["city", "edit"],
  methods: {
    removeCity() {
      db.collection("cities")
        .where("city", "==", `${this.city.city}`)
        .get()
        .then(docs => {
          docs.forEach(doc => {
            this.id = doc.id;
          });
        })
        .then(() => {
          db.collection("cities")
            .doc(this.id)
            .delete();
        });
    },
    goToWeather(e) {
      if (e.target === this.$refs.edit) {
        return;
      } else {
        return this.$router.push({
          name: "Weather",
          params: { city: this.city.city }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.city {
  display: flex;
  position: relative;
  flex-direction: column;
  padding: 20px;
  flex-basis: 50%;
  min-height: 250px;
  color: white;
  box-shadow: 0 1px 2px 0 rgba(243, 238, 238, 0.05);

  .edit {
    border-radius: 0 15px 0 0;
    border: 10px rgb(202, 183, 183);
    background-color: rgba(77, 77, 77);
    padding: 10px;
    z-index: 1;
    font-size: 20px;
    position: absolute;
    bottom: 0;
    left: 0;
    cursor: pointer;
  }

  span {
    z-index: 1;
    text-transform: capitalize;
    display: block;
    font-size: 25px;
    font-weight: 600;
  }

  .weather {
    display: flex;
    z-index: 1;
    justify-content: flex-end;
    align-items: flex-end;
    flex: 1;

    span {
      font-size: 35px;
      margin-right: 8px;
    }
    img {
      height: 20px;
      width: auto;
    }
  }
}
</style>
