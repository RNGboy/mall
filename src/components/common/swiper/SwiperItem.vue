<template>
    <div class="slide">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name:'Slide'
}
</script>

<style lang="css" scoped>
    .slide{
        width: 100%;
        flex-shrink: 0;
    }
    .slide a{
        display: block;
    }
    .slide img{
        width: 100%;
        vertical-align: middle;
    }
</style>