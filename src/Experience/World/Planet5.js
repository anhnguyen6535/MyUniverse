import * as THREE from 'three'
import Experience from '../Experience.js'
import EventEmitter from '../Utils/EventEmitter.js'
import Debug from '../Utils/Debug.js'
import Text from './Text.js'

export default class Planet5
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
        this.textures.gradient.minFilter = THREE.NearestFilter
        this.textures.gradient.magFilter = THREE.NearestFilter
        this.textures.gradient.generateMipmaps = false
        this.textures.jupiter = this.resources.items.jupiter
    }

    setPlanet()
    {
        const planetGeo = new THREE.SphereGeometry(0.7,32,16)
        const planetMaterial = new THREE.MeshToonMaterial({
            color: this.parameters.planet5Color,
            map: this.textures.jupiter,
            gradientMap: this.textures.gradient,
        })
        this.planet = new THREE.Mesh(planetGeo, planetMaterial)
        this.planet.scale.set(7,7,7)
        // this.scene.add(this.planet)
    }

    setText(){
        this.textContainer = new Text('gallery', 3, '#fa3509')
        this.text = this.textContainer.text
        this.text.position.y = 7
    }

    animation()
    {
        this.animate = this.experience.animate
        if(this.animate === 1){
            this.group.remove(this.text)
            this.t += 15
            this.group.position.x = -Math.cos(-this.t * 0.0007) * Math.PI * 19  //0.007
            this.group.position.z = -Math.sin(-this.t * 0.0007) * Math.PI * 19
            this.planet.rotateY(0.8)
        }else{
            this.group.add(this.text)
            this.t += 2
            this.group.position.x = -Math.cos(-this.t * 0.0007) * Math.PI * 19  //0.007
            this.group.position.z = -Math.sin(-this.t * 0.0007) * Math.PI * 19
            this.planet.rotateY(0.8 * 0.1)
        }       
    }

    debugGui()
    {
        this.parameters = {
            planet5Color: "#90614d",
            ring3Color: "#162b37"
        }

        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('planet5')
            this.debugFolder
                .addColor(this.parameters, 'planet5Color')
                .onChange(() => {
                    this.planet.material.color.set(this.parameters.planet5Color)
            })
        }
    }

}