import * as THREE from 'three'
import Experience from './Experience.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class Camera
{
    constructor()
    {
        //Setup
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.time = this.experience.time

        this.setInstance()  //Setup Camera

        //Animation
        this.time.on('tick', () =>{
            this.animation()
        })
    }

    //Generate Camera
    setInstance()
    {
        this.cameraGroup = new THREE.Group()
        this.instance = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 1000)
        this.instance.position.set(2, 30, 110)
        this.cameraGroup.add(this.instance)
        this.scene.add(this.cameraGroup)
    }

    animation(){
        if(window.start == false){
            this.instance.position.set(2, 10, 110)
        }else{
            this.cameraGroup.position.x = 2 + (20 * window.parallaxX)
            this.cameraGroup.position.y = -0 + (20 * (window.parallaxY))
            window.camera = this.instance
        }
    }

    //Resize viewport
    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    //Update Control (on each frame)
    update()
    {
        // this.controls.update()
    }
}