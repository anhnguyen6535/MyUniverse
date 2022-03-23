import * as THREE from 'three'
import Experience from '../Experience.js'
import EventEmitter from '../Utils/EventEmitter.js'
import Debug from '../Utils/Debug.js'
import Text from './Text.js'

export default class Planet3
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
        // this.group.add(this.text)
        this.group.position.set(50,1,1)
        this.group.rotation.y = -0.2
        //this.group.scale.set(15,15,15)
        this.scene.add(this.group)
    }

    setTextures()
    {
        this.textures = {}
        this.textures.gradient = this.resources.items.gradientTexture
        this.textures.earth = this.resources.items.earth
        this.textures.gradient.minFilter = THREE.NearestFilter
        this.textures.gradient.magFilter = THREE.NearestFilter
        this.textures.gradient.generateMipmaps = false
    }

    setPlanet()
    {
        const planetGeo = new THREE.SphereGeometry(0.7,32,16)
        const planetMaterial = new THREE.MeshToonMaterial({
            color: this.parameters.planet3Color,
            map: this.textures.earth,
            gradientMap: this.textures.gradient,
        })
        this.planet = new THREE.Mesh(planetGeo, planetMaterial)
        this.planet.scale.set(4.8,4.8,4.8)
        // this.scene.add(this.planet)
    }

    setText(){
        this.textContainer = new Text('whoami', 3, '#3FACFF')
        this.text = this.textContainer.text
        this.text.position.y = 6
    }

    animation()
    {
        this.animate = this.experience.animate
        if(this.animate === 1){
            this.group.remove(this.text)
            this.t += 15
            this.group.position.x = -Math.cos(-this.t * 0.001125) * Math.PI * 13 //0.001
            this.group.position.z = -Math.sin(-this.t * 0.001125) * Math.PI * 13
            this.planet.rotateY(0.03)
        }  else{
            this.group.add(this.text)
            this.t += 2
            this.group.position.x = -Math.cos(-this.t * 0.001125) * Math.PI * 13 //0.001
            this.group.position.z = -Math.sin(-this.t * 0.001125) * Math.PI * 13
            this.planet.rotateY(0.03 * 0.1)
        }     
    }

    debugGui()
    {
        this.parameters = {
            planet3Color: "#43707f",
            ring3Color: "#162b37"
        }

        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('planet3')
            this.debugFolder
                .addColor(this.parameters, 'planet3Color')
                .onChange(() => {
                    this.planet.material.color.set(this.parameters.planet3Color)
            })
        }
    }


}