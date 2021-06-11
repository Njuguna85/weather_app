<template>
  <h4>Weather</h4>
</template>

<script>
export default {
  name: "Weather",
  data() {
    return {
      forecast: null,
      currentWeather: null,
      loading: true
    };
  }
};
</script>

<style>
h4 {
  padding-top: 140px;
}
</style>
