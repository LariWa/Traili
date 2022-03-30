<template>
    <div class="details">
        <div class="blocks">
            <img class="image" v-bind:src="iconOne">
            <p class="time">Time: {{convertTime(trailInfo.time.min)}} hours</p>
        </div>

        <div class="blocks">
            <img class="image" v-bind:src="iconTwo">
            <p class="lenght">Length: {{conversion(trailInfo.length)}} km</p>    
        </div>

        <div class="blocks">
            <img class="image" v-bind:src="iconThree">
            <p class="elevation">Elevation: ascent:{{trailInfo.elevation.ascent}} descent:{{trailInfo.elevation.descent}} </p>  
        </div>

        <div class="blocks">
            <p class="rating">Difficulty: {{trailInfo.rating.difficulty}}</p>
            <p class="rating">Quality of experience: {{trailInfo.rating.qualityOfExperience}}</p>
        </div>

        <div class="buttons">
            <button class="button" @click="addToFavACB">Add to Fav</button>
            <button class="button" @click="backToSearchACB">Close</button>
        </div>
    </div>
</template>

<script>
import trailData from "./TourDetailsExample.json";

export default{
    data() {
        return {
            trailInfo: trailData.tour[0],
            iconOne: 'https://www.iconpacks.net/icons/1/free-time-icon-968-thumb.png',
            iconTwo: 'https://cdn0.iconfinder.com/data/icons/10-essential-of-backpacking-plus-more/1000/Map4-512.png',
            iconThree: 'https://www.garminmountainfestival.com/wp-content/uploads/2019/11/elevation-up.png',
            };

    },
    props: ['trail'], 
    methods: {
        conversion: function(length){
            var formattedNumber= length/100000;
            return formattedNumber.toFixed(2);
        },
        convertTime: function(min){
            var h = Math.floor(min / 3600);
            var m = Math.floor(min % 3600 / 60);

            return `${this.twoDigits(h)}:${this.twoDigits(m)}`;
        },
        twoDigits: function(num){
            return num.toString().padStart(2, '0');
        },

        backToSearchACB: function(){

        },
        addToFavACB: function(){

        }
    }
}
</script>

<style scoped lang="scss">
    .details {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    }
    .image {
        width: 100px;
        height: 100px;
    }
    .blocks{
        margin: 1%; //space outside of the element
        padding: 1%; //space iside of the element
        background-color: white;
        box-shadow: 0 0 10px lightgray;
        border-radius: 10px;
    }
    .button{
        margin: 5%;
        padding: 5%;
    }
</style>


<!--<div v-if="trail" class="trail-details">
        
        <h3 class="sth">{{trail.name}}</h3> 

        <p class="desciption">Description: {{trail.desciption}}</p>

        <button class="view-product-button" @click="Semit('view-product', product)">View</button>
    
    </div>
    
    computed: {
        description() {
        return this.product.description.substring(0, 150)
        }
    }


    <div v-for="(element, index) in trailInfo.wayType.elements" :key="index">
        {{ element.title }}
        </div>
    
    {{trailInfo.wayType.elements[0].title}}
    -->
