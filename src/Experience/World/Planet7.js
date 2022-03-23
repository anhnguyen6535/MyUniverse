import * as THREE from 'three'
import Experience from '../Experience.js'
import EventEmitter from '../Utils/EventEmitter.js'
import Debug from '../Utils/Debug.js'

export default class Planet7
{
    constructor()
    {
        //Setup
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.click = false
        this.debug = this.experience.debug
        this.debugGui()
        this.t = 0

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
        this.textures = {}
        this.textures.gradient = this.resources.items.gradientTexture
        this.textures.gradient.minFilter = THREE.NearestFilter
        this.textures.gradient.magFilter = THREE.NearestFilter
        this.textures.gradient.generateMipmaps = false
        this.textures.uranus = this.resources.items.uranus
    }

    setPlanet()
    {
        const planetGeo = new THREE.SphereGeometry(0.7,32,16)
        const planetMaterial = new THREE.MeshToonMaterial({
            color: this.parameters.planet7Color,
            map: this.textures.uranus,
            gradientMap: this.textures.gradient,
        })
        this.planet = new THREE.Mesh(planetGeo, planetMaterial)

        this.planet.position.set(50,1,1)
        this.planet.rotation.y = -0.2
        this.planet.scale.set(4.8,4.8,4.8)
        this.scene.add(this.planet)
    }

    animation()
    {
        this.animate = this.experience.animate
        if(this.animate === 1){
            this.t += 15
            this.planet.position.x = -Math.cos(-this.t * 0.0004) * Math.PI * 27
            this.planet.position.z = -Math.sin(-this.t * 0.0004) * Math.PI * 27
            this.planet.rotateY(0.28)
        }else{
            this.t += 2
            this.planet.position.x = -Math.cos(-this.t * 0.0004) * Math.PI * 27
            this.planet.position.z = -Math.sin(-this.t * 0.0004) * Math.PI * 27
            this.planet.rotateY(0.28 * 0.1)
        }      
    }

    debugGui()
    {
        this.parameters = {
            planet7Color: "#074b55",
            ring3Color: "#162b37"
        }

        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('planet7')
            this.debugFolder
                .addColor(this.parameters, 'planet7Color')
                .onChange(() => {
                    this.planet.material.color.set(this.parameters.planet7Color)
            })
            // this.debugFolder = this.debug.ui.addFolder('ring3')
            // this.debugFolder
            //     .addColor(this.parameters, 'ring3Color')
            //     .onChange(() => {
            //         this.ring.material.color.set(this.parameters.ring3Color)
            // })
        }
    }
}