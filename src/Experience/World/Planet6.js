import * as THREE from 'three'
import Experience from '../Experience.js'
import Text from './Text.js'
import EventEmitter from '../Utils/EventEmitter.js'
import Debug from '../Utils/Debug.js'

export default class Planet6
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
        // this.setRing()
        this.setText()
        this.setGroup()

        //Animation
        this.time.on('tick', () =>{
            this.animation()
        })
    }

    setGroup()
    {
        this.group = new THREE.Group()
        this.group.add(this.planet)
        //this.group.add(this.ring)
        this.group.position.set(50,1,20)
        this.group.rotation.y = -0.2
        this.scene.add(this.group)
    }

    setTextures()
    {
        this.textures = {}
        this.textures.gradient = this.resources.items.gradientTexture
        this.textures.gradient.minFilter = THREE.NearestFilter
        this.textures.gradient.magFilter = THREE.NearestFilter
        this.textures.gradient.generateMipmaps = false
        this.textures.saturnM = this.resources.items.saturnTexture
    }

    setRing()
    {   
        const ringGeo = new THREE.TorusGeometry(1, 0.2, 16, 100 )
        const ringMaterial = new THREE.MeshToonMaterial({
            color: this.parameters.ring3Color,
            gradientMap: this.textures.gradient,
        })
        this.ring = new THREE.Mesh(ringGeo, ringMaterial)
        this.ring.rotation.x = 90
    }

    setPlanet()
    {
        const planetGeo = new THREE.SphereGeometry(0.7,32,16)
        const planetMaterial = new THREE.MeshToonMaterial({
            color: this.parameters.planet6Color,
            map: this.textures.saturnM,
            gradientMap: this.textures.gradient,
        })
        this.planet = new THREE.Mesh(planetGeo, planetMaterial)
        this.planet.scale.set(5.7,5.7,5.7)
    }

    setText(){
        this.textContainer = new Text('trophy', 3, '#E9BE33')
        this.text = this.textContainer.text
        this.text.position.y = 6
    }

    animation()
    {
        this.animate = this.experience.animate
        if(this.animate === 1){
            this.group.remove(this.text)
            this.t += 15
            this.group.position.x = Math.cos(-this.t * 0.000564) * Math.PI * 23
            this.group.position.z = Math.sin(-this.t * 0.000564) * Math.PI * 23
            this.planet.rotateY(0.7)
            // this.ring.rotateX(0.05)
            // this.ring.rotateZ(0.05)
            // this.ring.rotateY(0.05)
        }else{
            this.group.add(this.text)
            this.t += 2
            this.group.position.x = Math.cos(-this.t * 0.000564) * Math.PI * 23
            this.group.position.z = Math.sin(-this.t * 0.000564) * Math.PI * 23
            this.planet.rotateY(0.7 * 0.1)
        }       
    }

    debugGui()
    {
        this.parameters = {
            planet6Color: "#40370c",
            ring3Color: "#162b37"
        }

        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('planet6')
            this.debugFolder
                .addColor(this.parameters, 'planet6Color')
                .onChange(() => {
                    this.planet.material.color.set(this.parameters.planet6Color)
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