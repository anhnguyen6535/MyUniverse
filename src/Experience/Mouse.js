import * as THREE from 'three'
import Experience from './Experience.js'

export default class Mouse
{
    constructor()
    {
        //Setup
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.intersectObject = 2
        this.click = 0
        this.setInstance()  //Setup mouse

        
    }

    //Generate mouse
    setInstance()
    {
        this.mouse = new THREE.Vector2();
        window.addEventListener("mousemove", (event) => {
            // this.mouse.x = (event.clientX / this.sizes.width) - 0.5;
            // this.mouse.y = (event.clientY / this.sizes.height) - 0.5;
            // this.parallaxX = this.mouse.x * 0.5
            // this.parallaxY = - this.mouse.y * 0.5
            this.mouse.x = (event.clientX / this.sizes.width) * 2 - 1;
            this.mouse.y = -(event.clientY / this.sizes.height) * 2 + 1;
        });

        window.addEventListener("click", () => {
            this.click ++
            if(this.intersectObject == 1 && this.click % 2 == 1)
            {
                this.experience.animate = 0
                this.experience.blink = 1
            }
            else if(this.intersectObject == 1 && this.click % 2 == 0){
                this.experience.blink = 0
                this.experience.animate = 1 
            }
        });
    }

    // animation(){
    //     const parallaxX = this.mouse.x * 0.5
    //     const parallaxY = - this.mouse.y * 0.5

    //     cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 5 * deltaTime
    //     cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 5 * deltaTime
    // }

    // update(){
    //     if(this.intersectObject = 0)
    //     {
    //         console.log('ha')
    //     }
    // }

    
}