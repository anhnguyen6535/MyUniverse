import * as THREE from 'three'
import Experience from '../Experience.js'
import EventEmitter from '../Utils/EventEmitter.js'
import Debug from '../Utils/Debug.js'

export default class Asterol
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
        this.textures.mercuryM = this.resources.items.mercuryTexture
    }

    setPlanet()
    {
        const planetGeo = new THREE.SphereGeometry(0.7,32,16)
        const planetMaterial = new THREE.MeshToonMaterial({
            color: this.parameters.asterolColor,
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
            this.planet.position.x -= Math.cos(-this.time.elapsed * 0.0037) * Math.PI * 7.2 //0.0017
            this.planet.position.z -= Math.sin(-this.time.elapsed * 0.0037) * Math.PI * 7.2
            this.planet.rotateY(0.008)
        }       
    }

    debugGui()
    {
        this.parameters = {
            asterolColor: "#504e51",
        }

        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Asterol')
            this.debugFolder
                .addColor(this.parameters, 'asterolColor')
                .onChange(() => {
                    this.planet.material.color.set(this.parameters.asterolColor)
            })
            // this.debugFolder = this.debug.ui.addFolder('ring1')
            // this.debugFolder
            //     .addColor(this.parameters, 'ringColor')
            //     .onChange(() => {
            //         this.ring.material.color.set(this.parameters.ringColor)
            // })
        }
    }

    // setGroup()
    // {
    //     this.group1 = new THREE.Group()
    //     this.group1.add(this.planet)
    //     this.group1.add(this.ring)
    //     this.group1.position.set(40,1,1)
    //     this.group1.rotation.y = -0.2
    //     this.group1.scale.set(1.5,1.5,1.5)
    //     this.scene.add(this.group1)
    // }

    // setRing()
    // {   
    //     const ringGeo = new THREE.TorusGeometry(1, 0.2, 16, 100 )
    //     const ringMaterial = new THREE.MeshToonMaterial({
    //         color: this.parameters.ringColor,
    //         gradientMap: this.textures.gradient,
    //     })
    //     this.ring = new THREE.Mesh(ringGeo, ringMaterial)
    //     this.ring.rotation.x = 90
    // }


}