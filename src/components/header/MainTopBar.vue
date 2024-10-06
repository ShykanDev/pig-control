<template>
    <div class="z-50">
        <div class="fixed top-0 left-0 right-0 flex justify-between px-5 py-2 bg-white shadow-md w-dvw rounded-bl-md rounded-br-md">
            <v-icon name="gi-pig" scale="1.9" color="#075985" />
            <h2 class="text-2xl font-medium font-lilita text-sky-800">Carnitas Estilo Michoacán</h2>
            <div>
                <div class="">
                    <label for="check">
                        <input @click="toggleSidebar" type="checkbox" id="check" />
                        <span></span>
                        <span></span>
                        <span></span>
                    </label>
                </div>
            </div>
        </div>
        <div :class="{'-translate-x-0': !isMenuOpen, 'translate-x-[100%]': isMenuOpen }"
            class="flex flex-col items-left px-4 fixed top-[5%] py-7 gap-3 bottom-0 left-[50%]  right-0 bg-slate-100 -z-10 transition-transform duration-300 ease-in-out">
            <RouterLink class="flex items-center" :to="{ name: 'home' }">
                <v-icon name="ri-home-5-fill" scale="1.5" color="#075985" />
                <p :class="{'bg-sky-800 text-white' : route.name === 'home', 'bg-white text-sky-800' : route.name !== 'home' }"
                    class="w-full px-2 text-lg font-medium text-left rounded-lg font-poppins">Inicio</p>
            </RouterLink>
            <RouterLink class="flex items-center" :to="{ name: 'sales' }">
                <v-icon name="hi-clipboard-list" scale="1.5" color="#075985" />
                <p :class="{'bg-sky-800 text-white' : route.name === 'sales', 'bg-white text-sky-800' : route.name !== 'sales'}"
                    class="w-full px-2 text-lg font-medium text-left rounded-lg font-poppins">Ventas</p>
            </RouterLink>
            <RouterLink class="flex items-center" :to="{ name: 'salesHistory' }">
                <v-icon name="ri-file-history-fill" scale="1.5" color="#075985" />
                <p :class="{'bg-sky-800 text-white' : route.name === 'salesHistory', 'bg-white text-sky-800' : route.name !== 'salesHistory'}"
                    class="w-full px-2 text-lg font-medium text-left rounded-lg font-poppins">Historial de Ventas</p>
            </RouterLink>
        </div>
    </div>
</template>
  
  <script lang="ts" setup>
  import { useRoute } from 'vue-router';
  import HamMenu from './HamMenu.vue';
  import { ref } from 'vue';
  
  const route = useRoute();
  
  // Inicialmente, el menú estará cerrado
  let isMenuOpen = ref(true);
  
  // Función para alternar el estado del sidebar
  const toggleSidebar = (e: Event) => {
    isMenuOpen.value = !isMenuOpen.value;
  }
  </script>
  
  <style scoped>
  label {
    display: flex;
    flex-direction: column;
    width: 30px; /* Más pequeño */
    cursor: pointer;
  }
  
  label span {
    background: #075985;
    border-radius: 3px; /* Ajuste de borde */
    height: 4px; /* Más pequeño */
    margin: 3.1px 0; /* Más pequeño */
    transition: .4s cubic-bezier(0.68, -0.6, 0.32, 1.6);
  }
  
  span:nth-of-type(1) {
    width: 50%;
  }
  
  span:nth-of-type(2) {
    width: 100%;
  }
  
  span:nth-of-type(3) {
    width: 75%;
  }
  
  input[type="checkbox"] {
    display: none;
  }
  
  input[type="checkbox"]:checked ~ span:nth-of-type(1) {
    transform-origin: bottom;
    transform: rotateZ(45deg) translate(4px, 0px); /* Ajuste */
  }
  
  input[type="checkbox"]:checked ~ span:nth-of-type(2) {
    transform-origin: top;
    transform: rotateZ(-45deg);
  }
  
  input[type="checkbox"]:checked ~ span:nth-of-type(3) {
    transform-origin: bottom;
    width: 50%;
    transform: translate(15px, -6px) rotateZ(45deg); /* Ajuste */
  }
  </style>
  