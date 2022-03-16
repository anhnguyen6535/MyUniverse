import * as THREE from 'three'
import Experience from '../Experience.js'
import EventEmitter from '../Utils/EventEmitter.js'
import Debug from '../Utils/Debug.js'

export default class Planet2
{
    constructor()
    {
        //Setup
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.click = false
        this.t = 0
        this.debug = this.experience.debug
        this.debugGui()

        //Generate Mesh
        this.setTextures()
        this.setPlanet()

        //Animation
        this.time.on('tick', () =>{
            this.animation()
        })
    }

    setTextures()
    {
        // this.textures = {}
        // this.textures.gradient = this.resources.items.gradientTexture
        // this.textures.venus = this.resources.items.venusTexture
        // this.textures.gradient.minFilter = THREE.NearestFilter
        // this.textures.gradient.magFilter = THREE.NearestFilter
        // this.textures.gradient.generateMipmaps = false
    }

    setPlanet()
    {
        const planetGeo = new THREE.SphereGeometry(0.7,32,16)
        const planetMaterial = new THREE.MeshToonMaterial({
            color: this.parameters.planet2Color,
            map: this.textures.venus,
            gradientMap: this.textures.gradient,
        })
        this.planet = new THREE.Mesh(planetGeo, planetMaterial)
        this.planet.position.set(Math.sin(30)*50,1,Math.sin(30)* 50)
        this.planet.rotation.y = -0.2
        this.planet.scale.set(4.5,4.5,4.5)
        this.scene.add(this.planet)
    }

    animation()
    {
        this.animate = this.experience.animate
        if(this.animate === 1){
            this.t += 15
            this.planet.position.x = Math.cos(-this.t * 0.00135) * Math.PI * 10 //0.0013
            this.planet.position.z = Math.sin(-this.t * 0.00135) * Math.PI * 10
            this.planet.rotateY(0.006)
        }else{
            this.t += 2
            this.planet.position.x = Math.cos(-this.t * 0.00135) * Math.PI * 10 //0.0013
            this.planet.position.z = Math.sin(-this.t * 0.00135) * Math.PI * 10
            this.planet.rotateY(0.006 * 0.1)
        } 
    }

    debugGui()
    {
        this.parameters = {
            planet2Color: "#504e51",
            ring2Color: "#162b37"
        }

        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('planet2')
            this.debugFolder
                .addColor(this.parameters, 'planet2Color')
                .onChange(() => {
                    this.planet.material.color.set(this.parameters.planet2Color)
            })
            // this.debugFolder = this.debug.ui.addFolder('ring2')
            // this.debugFolder
            //     .addColor(this.parameters, 'ring2Color')
            //     .onChange(() => {
            //         this.ring.material.color.set(this.parameters.ring2Color)
            // })
        }
    }

    // setGroup()
// {
//     this.group2 = new THREE.Group()
//     this.group2.add(this.planet)
//     //this.group2.add(this.ring)
//     // this.group2.position.set(50,1,1)
//     // this.group2.rotation.y = -0.2
//     // this.group2.scale.set(2.45,2.45,2.45)
//     // this.scene.add(this.group2)
// }

    // setRing()
// {   
//     const ringGeo = new THREE.TorusGeometry(1, 0.2, 16, 100 )
//     const ringMaterial = new THREE.MeshToonMaterial({
//         color: this.parameters.ring2Color,
//         gradientMap: this.textures.gradient,
//     })
//     this.ring = new THREE.Mesh(ringGeo, ringMaterial)
//     this.ring.rotation.x = 90
// }


}