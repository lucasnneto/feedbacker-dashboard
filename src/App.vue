<template>
  <ModalFactory />
  <router-view />
</template>
<script>
import { onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import ModalFactory from "./components/ModalFactory";
import services from "./services";
import { setCurrentUser } from "./store/user";
export default {
  components: {
    ModalFactory,
  },
  setup() {
    onMounted(() => {
      window.localStorage.removeItem("token");
    });
    const router = useRouter();
    const route = useRoute();
    watch(
      () => route.path,
      async () => {
        if (route.meta.hasAuth) {
          const token = window.localStorage.getItem("token");
          if (!token) {
            router.push({ name: "Home" });
            return;
          }
          const { data } = await services.users.getMe();
          setCurrentUser(data);
        }
      }
    );
  },
};
</script>
