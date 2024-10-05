<template>
    <div class="">
      <label for="check">
        <input type="checkbox" id="check"/> 
        <span></span>
        <span></span>
        <span></span>
      </label>
    </div>
  </template>
  
  <script lang="ts" setup>
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
  