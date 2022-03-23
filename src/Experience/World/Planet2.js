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
        this.textures = {}
        this.textures.gradient = this.resources.items.gradientTexture
        this.textures.venus = this.resources.items.venus
        this.textures.gradient.minFilter = THREE.NearestFilter
        this.textures.gradient.magFilter = THREE.NearestFilter
        this.textures.gradient.generateMipmaps = false
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
        }
    }



}