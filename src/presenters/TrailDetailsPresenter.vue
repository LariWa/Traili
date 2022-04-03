<template>
    <TrailDetails @addToFav="onAddToFav"/>
    
</template>

<script>
import TrailDetails from "@/components/products/TrailDetails.vue";

export default {
    components: { TrailDetails },
    data() {
        return { 
        };
    },
    methods: {
        onAddToFav: function (trail) {
                //console.log("onAddToFav " + trail);
                this.$store.commit('addToFav', trail);
        }
    }
};
</script>
