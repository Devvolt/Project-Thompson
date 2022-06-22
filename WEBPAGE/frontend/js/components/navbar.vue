<template>
  <span
    ><div id="DSLogin">
        <LogInWithDiscord />
    </div></span
  >
</template>

<script>
import LogInWithDiscord from 'vollex.cc/assets/components/LogInWithDiscord.vue';
import Navbar from "vollex.cc/assets/elements/Navbar.vue";

export default {
    name: "Navbar",
    components: {
        'LogInWithDiscord': LogInWithDiscord
    }
};
</script>

<style>
* {
  display: flex;
  width: 100%;
  height: 10%;
  padding: 0;
  margin: 0;
}

#DSLogin {
  margin: 0.5rem;
}
</style>
