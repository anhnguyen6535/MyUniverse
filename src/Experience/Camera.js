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
    
        // this.setControls()  //Setup Controls
        // window.camera = this.instance
        // window.camera = this.cameraGroup

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
        // this.scene.add(this.instance)
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

    //Generate Control
    setControls()
    {
        // this.controls = new TrackballControls(this.instance, this.canvas);
        // this.controls = new OrbitControls(this.instance, this.canvas)
        // this.controls.enableDamping = true
        // //this.controls.enableZoom = false
        // this.controls.enablePan = false
        // this.controls.maxPolarAngle = 100* Math.PI/180 //100
        // this.controls.minPolarAngle = 45* Math.PI/ 180  //50
        // this.controls.maxAzimuthAngle = 60* Math.PI/180
        // this.controls.minAzimuthAngle = -60* Math.PI/180

    }

    //Update Control (on each frame)
    update()
    {
        // this.controls.update()
    }

        // setInstance()
    // {
    //     this.cameraGroup = new THREE.Group()
    //     this.instance = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 1000)
    //     this.instance.position.set(2, 30, 110)
    //     this.cameraGroup.add(this.instance)
    //     this.scene.add(this.cameraGroup)
    //     // this.scene.add(this.instance)
    // }

}