import * as THREE from 'three'
import Experience from '../Experience.js'
import EventEmitter from '../Utils/EventEmitter.js'
import Debug from '../Utils/Debug.js'

export default class Planet1
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
        this.textures.mercuryM = this.resources.items.mercury
    }

    setPlanet()
    {
        const planetGeo = new THREE.SphereGeometry(0.7,32,16)
        const planetMaterial = new THREE.MeshToonMaterial({
            color: this.parameters.planetColor,
            map: this.textures.mercuryM,
            gradientMap: this.textures.gradient,
        })
        this.planet = new THREE.Mesh(planetGeo, planetMaterial)
        this.planet.position.set(Math.cos(0) * 40,1,Math.sin(0) * 40)
        this.planet.rotation.y = -0.2
        this.planet.scale.set(4,4,4)
        this.scene.add(this.planet)
    }

    animation()
    {
        this.animate = this.experience.animate
        if(this.animate === 1){
            this.t += 15
            this.planet.position.x = -Math.cos(-this.t * 0.0037 ) * Math.PI * 7.2 //0.0017
            this.planet.position.z = -Math.sin(-this.t * 0.0037 ) * Math.PI * 7.2
            this.planet.rotateY(0.008)
        }else{
            this.t += 2
            this.planet.position.x = -Math.cos(-this.t * 0.0037 ) * Math.PI * 7.2 
            this.planet.position.z = -Math.sin(-this.t * 0.0037 ) * Math.PI * 7.2
            this.planet.rotateY(0.008 * 0.1)
        }   
    }

    debugGui()
    {
        this.parameters = {
            planetColor: "#504e51",
            //ringColor: "#3a07a2"
        }

        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('planet1')
            this.debugFolder
                .addColor(this.parameters, 'planetColor')
                .onChange(() => {
                    this.planet.material.color.set(this.parameters.planetColor)
            })
        }
    }
}