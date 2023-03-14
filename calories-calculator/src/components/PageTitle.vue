<template>
    {{ title }}
</template>

<script setup>
    const props = defineProps({
        title: {
            type: String,
            required: true
        }
    })
</script>