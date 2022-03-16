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
        // this.camera = this.experience.camera
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
        this.time.on('tick', () =>{
            this.animation(arr)
        })
    }

    animation(arr)
    {
        this.raycaster.setFromCamera(this.mouse, window.camera)

        const intersectPlanet1 = this.raycaster.intersectObject(arr[0])
        let lenP1 = intersectPlanet1.length
        if (lenP1 > 0) {
            this.mouseContainer.intersectObject = 1
        } else {
            this.mouseContainer.intersectObject = 2
            // this.experience.blink = 0
            // this.experience.animate = 1 
        }
    }
}