<template>
    <v-container class="details">
        <v-row wrap>

            <v-col cols="6" md="3">
                <v-card>
                    <v-img height="50px" width="50px" :src="iconOne"></v-img>
                    <v-card-text>
                        <div>Time: {{convertTime(trailInfo.time.min)}} hours</div>
                    </v-card-text>
                </v-card>    
            </v-col>   

            <v-col cols="6" md="3">
                <v-card>
                    <v-img height="50px" width="50px" :src="iconTwo"></v-img>
                    <v-card-text>
                        <div>Length: {{conversion(trailInfo.length)}} km</div>
                    </v-card-text>
                </v-card> 
            </v-col>

            <v-col cols="6" md="3">
                <v-card>
                    <v-img height="50px" width="50px" :src="iconThree"></v-img>
                    <v-card-text>
                        <div>Ascent:{{trailInfo.elevation.ascent}}</div>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col cols="6" md="3">
                <v-card>
                    <v-img height="50px" width="50px" :src="iconThree"></v-img>
                    <v-card-text>
                        <div>Descent:{{trailInfo.elevation.descent}}</div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <v-row wrap>
            <v-col cols="12" md="6">
                <v-card>
                    <v-card-text>
                        <div>Description missing!!!</div>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col cols="12" md="6">
                <v-card>
                    <v-card-text>
                        <div>Difficulty: {{trailInfo.rating.difficulty}}</div>
                        <div>Quality of experience: {{trailInfo.rating.qualityOfExperience}}</div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <v-row wrap>
            <v-btn rounded @click="addToFavACB">
                Add to Fav
            </v-btn>

            <v-btn rounded @click="backToSearchACB">
                Close
            </v-btn>
        </v-row>
    </v-container>
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

<!--<style scoped lang="scss">
    .details {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    }
</style>-->


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
