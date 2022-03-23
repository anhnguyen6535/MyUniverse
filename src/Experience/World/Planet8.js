import * as THREE from 'three'
import Experience from '../Experience.js'
import EventEmitter from '../Utils/EventEmitter.js'
import Debug from '../Utils/Debug.js'

export default class Planet8
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
        this.textures.neptuneM = this.resources.items.neptune
    }

    setPlanet()
    {
        const planetGeo = new THREE.SphereGeometry(0.7,32,16)
        const planetMaterial = new THREE.MeshToonMaterial({
            color: this.parameters.planet8Color,
            map: this.textures.neptuneM,
            gradientMap: this.textures.gradient,
        })
        this.planet = new THREE.Mesh(planetGeo, planetMaterial)

        this.planet.position.set(50,1,10)
        this.planet.rotation.y = -0.2
        this.planet.scale.set(5.3,5.3,5.3)
        this.scene.add(this.planet)
    }

    animation()
    {
        this.animate = this.experience.animate
        if(this.animate === 1){
            this.t += 15
            this.planet.position.x = Math.cos(-this.t * 0.0003) * Math.PI * 30 //0.000269
            this.planet.position.z = Math.sin(-this.t * 0.0003) * Math.PI * 30
            this.planet.rotateY(0.18)
        }else{
            this.t += 2
            this.planet.position.x = Math.cos(-this.t * 0.0003) * Math.PI * 30
            this.planet.position.z = Math.sin(-this.t * 0.0003) * Math.PI * 30
            this.planet.rotateY(0.18 * 0.1)
        }      
    }

    debugGui()
    {
        this.parameters = {
            planet8Color: "#3f54ba",
            ring3Color: "#162b37"
        }

        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('planet8')
            this.debugFolder
                .addColor(this.parameters, 'planet8Color')
                .onChange(() => {
                    this.planet.material.color.set(this.parameters.planet8Color)
            })
        }
    }
}