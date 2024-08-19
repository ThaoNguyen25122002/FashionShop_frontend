<script setup>
import HeaderMember from './HeaderMember.vue'
import FooterMember from './FooterMember.vue'
</script>

<template>
  <HeaderMember />
  <router-view></router-view>
  <FooterMember />
</template>
