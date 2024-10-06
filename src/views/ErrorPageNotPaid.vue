<template>
  <div class="flex flex-col items-center w-full min-h-screen px-2 pt-10 bg-gray-100 font-poppins">
      <div v-if="isActivated" class="fixed top-0 bottom-0 left-0 right-0 bg-sky-900 bg-opacity-60">
          <div class="w-auto py-3 mx-auto bg-white shadow-lg mt-14 rounded-xl ">
              <h1 class="mb-1 font-semibold text-sky-800 font-poppins" >La aplicación ha sido activada!</h1>
              <h2 class="font-semibold text-sky-800 font-poppins ">Serás redirigido al inicio automáticamente.</h2>
              <h2 class="font-semibold text-sky-800 font-poppins ">¡Bienvenido!</h2>
          </div>
      </div>
    <div class="w-11/12 p-8 px-1 text-center bg-white rounded-lg shadow-lg">
      <h1 class="mb-1 text-2xl font-bold text-sky-800">
          La aplicación no se ha cargado
      </h1>
      <StoreAnimated />
      <h2 class="mb-2 text-sm font-bold text-sky-800">
          Error: 402 - Acceso denegado
      </h2>
      <h2 class="font-medium font-poppins text-sky-800">
          No se ha podido verificar que esta aplicación esté activada en este dispositivo
      </h2>
      <h2 class="font-medium font-poppins text-sky-800">
        Una vez activada, este dispositivo será registrado y activado permanentemente  
      </h2>
      <h2 class="mb-4 text-lg font-semibold mt-7 text-sky-700 ">
        Introduce el código de activación
      </h2>
      <div v-if="isWrongCode" class="flex items-center justify-center gap-1 mb-2 text-red-700">
        <v-icon name="io-alert-circle-sharp" scale="1.5" color="red" animation="ring" />
        <p class="text-lg font-medium">El código {{ activationCode }} no es correcto, intentalo de nuevo</p>
      </div>
      <input
          v-model="activationCode"
          @keypress.enter="toggleState"
          @input="isWrongCode = false"
        class="w-full px-4 py-2 mb-2 text-center text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        type="text"
        placeholder="XXXXXXXX"
        maxlength="8"
      />
      <p></p>
      <button
        @click="toggleState"
        class="px-4 py-2 text-white transition duration-300 ease-in-out bg-blue-500 rounded-lg hover:bg-blue-600"
      >
        Activar
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import StoreAnimated from '@/components/payments/StoreAnimated.vue';
import { UseSystemValues } from '@/store/UseSystemValues';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

let systemValues = UseSystemValues();

let activationCode = ref('');

const router = useRouter();
let isActivated = ref(false);  
let isWrongCode = ref(false);  
let wrongCode = ref('');


const toggleState = () => {
  if (activationCode.value === 'T6Y8R2W5') {
      isWrongCode.value = false;
      isActivated.value = true;
      systemValues.setIsAppActivated(true);
      setTimeout(() => {
        router.push({ name: 'home' });
      },5000);
}
else{
  isWrongCode.value = true;
  isActivated.value = false;
  wrongCode.value = 'El código no es correcto';
}
}
</script>


<style scoped>
</style>
