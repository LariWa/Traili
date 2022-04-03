<template>
    <div>
        <v-container class="details" v-if="trailInfo">
            <v-row wrap>
                <v-col cols="6" md="3">
                    <v-card>
                        <v-img height="50px" width="50px" :src="iconOne"></v-img>
                        <v-card-text v-if="trailInfo.time">
                            <div>Time: {{ convertTime(trailInfo.time.min) }} h</div> 
                           
                        </v-card-text>
                    </v-card>    
                </v-col>   

                <v-col cols="6" md="3">
                    <v-card>
                        <v-img height="50px" width="50px" :src="iconTwo"></v-img>
                        <v-card-text v-if="trailInfo.length">
                            <div>Length: {{conversion(trailInfo.length)}} km</div>
                        </v-card-text>
                    </v-card> 
                </v-col>

                <v-col cols="6" md="3">
                    <v-card>
                        <v-img height="50px" width="50px" :src="iconThree"></v-img>
                        <v-card-text v-if="trailInfo.elevation">
                            <div>Ascent: {{trailInfo.elevation.ascent}} m</div>
                        </v-card-text>
                    </v-card>
                </v-col>

                <v-col cols="6" md="3">
                    <v-card>
                        <v-img height="50px" width="50px" :src="iconThree"></v-img>
                        <v-card-text v-if="trailInfo.elevation">
                            <div>Descent: {{trailInfo.elevation.descent}} m</div>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>

            <v-row wrap>
                <v-col cols="12" md="6">
                    <v-card>
                        <v-card-text>
                            <div>{{strippedContent(trailInfo.longText)}}</div>
                        </v-card-text>
                    </v-card>
                </v-col>

                <v-col cols="12" md="6">
                    <v-card>
                        <v-card-text v-if="trailInfo.rating">
                            <div>Difficulty: {{dificulty(trailInfo.rating.difficulty)}}</div>
                            <div>Quality of experience: {{trailInfo.rating.qualityOfExperience}}</div>                            
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>

            <v-row wrap>
                <v-btn rounded id="addToFav" @click="addToFavACB">
                    Add to Fav
                </v-btn>

                <v-btn rounded @click="backToSearchACB">
                    Close
                </v-btn>
            </v-row>

            <v-row wrap>
                <VueWeather></VueWeather>
            </v-row>
        </v-container>
    </div>
</template>

<script>
//import trailData from "./TourDetailsExample.json";
import VueWeather from "../../presenters/weatherPresenter.vue";

export default{
    data() {
        return {
            //trailInfo: trailData.tour[0],
            //trailInfo: this.$store.state.currentTour,
            iconOne: 'https://www.iconpacks.net/icons/1/free-time-icon-968-thumb.png',
            iconTwo: 'https://cdn0.iconfinder.com/data/icons/10-essential-of-backpacking-plus-more/1000/Map4-512.png',
            iconThree: 'https://www.garminmountainfestival.com/wp-content/uploads/2019/11/elevation-up.png',
            };
    },
    components: {
            VueWeather,
    },
    
    props: ['trail'], 
    computed: {
        trailInfo() {            
            return this.$store.getters.getCurrentTour;
        },
    },

    methods: {
        conversion: function(length){
            var formattedNumber= length/1000;
            return formattedNumber.toFixed(1);
        },
        convertTime: function(min){
            var hours = (min / 60);
            var h = Math.floor(hours);
            var minutes = (hours - h) * 60;
            var m = Math.floor(minutes);

            return `${this.twoDigits(h)}:${this.twoDigits(m)}`;
        }, 
        twoDigits: function(num){
            return num.toString().padStart(2, '0');
        },

        backToSearchACB: function(){

        },
        addToFavACB: function(){
            this.$emit("addToFav", this.trailInfo);
            //this.$store.commit("addToFavACB", this.trail); //onAddToMenu();
        },

        strippedContent: function(string) {
            var clearText = string.replace(/<\/?[^>]+(>|$)/g, "");
            return clearText;
        },
        dificulty: function(value){
            if (value == 1){
                return "easy";
            }
            else if (value == 2){
                return "intermediate";
            }
            else if (value == 3){
                return "difficult";
            }
            else{
                return "difficulty unknown";
            }
        },
        experience: function(){

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
