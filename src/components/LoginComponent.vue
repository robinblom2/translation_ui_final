<template>
  <div class="login">
    <div class="login-form">
      <div class="login-header">
        <h3 class="text">Welcome</h3>
        <h3 class="text">To the TranslatiFire</h3>
        <button type="button" class="login-btn text" @click="logIn">Login</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserSessionStore } from '../stores/UserSessionStore';

export default {
  name: 'login-view',

  data() {
    return {
      account: null,
      signin: 'https://microsoft.com',
    };
  },

  setup() {
    const userSessionStore = useUserSessionStore();

    return { userSessionStore };
  },

  methods: {
    logIn() {
      this.userSessionStore.logIn();
    },
  },
};
</script>

<style scoped>
.login-header {
  width: 100%;
  margin-top: 10%;
}

.text {
  color: bisque;
  font-family: 'Roboto', sans-serif;
  font-size: 40px;
  text-align: center;
  padding: 0;
  margin: 0;
  margin-left: 20%;
  transform: translateX(-200%);
  opacity: 0;
  animation: slide-in-anim 1.5s ease-out forwards;
}

.login-content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 50px;
}
.login-btn {
  background-color: #ee9445d6;
  border-radius: 2px;
  box-shadow: rgba(240, 148, 44, 0.582) 0 -25px 18px -14px inset,
    rgba(230, 111, 26, 0.15) 0 1px 2px, rgba(219, 146, 27, 0.478) 0 2px 4px,
    rgba(187, 125, 44, 0.15) 0 4px 8px, rgba(187, 104, 44, 0.15) 0 8px 16px,
    rgba(187, 104, 44, 0.15) 0 16px 32px;
  color: bisque;
  cursor: pointer;
  display: inline-block;
  font-family: 'Roboto', sans-serif;
  padding: 7px 20px;
  text-align: center;
  text-decoration: none;
  transition: all 250ms;
  border: 0;
  font-size: 24px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  margin-left: 20%;
  margin-top: 30px;
}

.login-btn:hover {
  box-shadow: rgba(187, 101, 44, 0.942) 0 -25px 18px -14px inset,
    rgba(231, 164, 64, 0.893) 0 1px 2px, rgba(243, 155, 67, 0.835) 0 2px 4px,
    rgba(243, 136, 54, 0.909) 0 4px 8px, rgba(237, 145, 54, 0.934) 0 8px 16px,
    rgba(251, 174, 81, 0.868) 0 16px 32px;
  transform: scale(1.05) rotate(-1deg);
}

@keyframes slide-in-anim {
  20% {
    opacity: 0;
  }
  60% {
    transform: translateX(-45%);
  }
  75% {
    transform: translateX(-52%);
  }
  100% {
    opacity: 1;
    transform: translateX(-50%);
  }
}
</style>
