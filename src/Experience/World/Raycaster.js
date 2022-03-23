import * as THREE from 'three'
import Experience from '../Experience.js'
import EventEmitter from '../Utils/EventEmitter.js'

export default class Raycaster
{
    constructor()
    {
        this.experience = new Experience()
        this.time = this.experience.time
        this.world = this.experience.world
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.mouseContainer = this.experience.mouse
        this.mouse = this.mouseContainer.mouse

        this.setInstance()
    }
    
    setInstance()
    {
        this.raycaster = new THREE.Raycaster()
        this.currentIntersect = null
    }

    checkIntersection(arr)
    {
        const sun = arr[0]
        const subArr = arr.slice(1,5)
        this.time.on('tick', () =>{
            this.animation(sun, subArr)
        })
    }
    
    animation(sun,subArr)
    {
        this.raycaster.setFromCamera({x: this.mouse.x / 0.5, y: this.mouse.y /-0.5}, window.camera)
        // this.scene.add(new THREE.ArrowHelper(this.raycaster.ray.direction, this.raycaster.ray.origin, 300, 0xff0000) );

        const intersectSun = this.raycaster.intersectObject(sun)
        let lenP1 = intersectSun.length
        if (lenP1 > 0) {
            this.mouseContainer.intersect_sun = 1
        } else {
            this.mouseContainer.intersect_sun = 2
        }

        const intersectPlanet = this.raycaster.intersectObjects(subArr)
        if(intersectPlanet.length > 0){
            if(intersectPlanet[0].object == subArr[0]){
                this.mouseContainer.intersect_planet = 1
                this.experience.textHover = "earth"
            }else if(intersectPlanet[0].object == subArr[1]){
                this.mouseContainer.intersect_planet = 2
                this.experience.textHover = "jupiter"
            }else if(intersectPlanet[0].object == subArr[2]){
                this.mouseContainer.intersect_planet = 3
                this.experience.textHover = "saturn"
            }else if(intersectPlanet[0].object == subArr[3]){
                this.mouseContainer.intersect_planet = 4
                this.experience.textHover = "uranus"
            }
        }
        else{
            this.mouseContainer.intersect_planet = 5
            this.experience.textHover = 5
        } 
    }

    // animation(arr)
    // {
    //     this.raycaster.setFromCamera(this.mouse, window.camera)

    //     const intersectSun = this.raycaster.intersectObject(arr[0])
    //     let lenP1 = intersectSun.length
    //     if (lenP1 > 0) {
    //         this.mouseContainer.intersect_sun = 1
    //         console.log(0)
    //     } else {
    //         this.mouseContainer.intersect_sun = 2
    //     }
    // }
}