import * as THREE from 'three'
import Experience from './Experience.js'

export default class Mouse
{
    constructor()
    {
        //Setup
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.intersect_sun = 2
        this.intersect_planet = 5
        this.click = 0
        window.start = false 
        this.setInstance()  //Setup mouse

        
    }

    //Generate mouse
    setInstance()
    {
        this.mouse = new THREE.Vector2();
        window.addEventListener("mousemove", (event) => {
            window.start = true 
            this.mouse.x = (event.clientX / this.sizes.width) - 0.5;
            this.mouse.y = (event.clientY / this.sizes.height) - 0.5;
            window.parallaxX = this.mouse.x * 0.5
            window.parallaxY = - this.mouse.y * 0.5
        });

        window.addEventListener("click", () => {
            if(this.intersect_sun == 1)
            {
                this.click ++
                if(this.click % 2 == 1){
                    this.experience.animate = 0
                    this.experience.blink = 1
                }else if(this.click % 2 == 0){
                    this.experience.blink = 0
                    this.experience.animate = 1 
                } 
            }

            if(this.intersect_planet == 1)
            {
                console.log("earth")
                // this.experience.planetClick = 1
            }else if(this.intersect_planet == 2){
                console.log("jupiter")
            }else if(this.intersect_planet == 3){
                console.log("saturn")
            }else if(this.intersect_planet == 4){
                console.log("uranus")
            }
        });
    }  
}