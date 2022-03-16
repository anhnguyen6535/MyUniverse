import * as THREE from 'three'
import Experience from '../Experience.js'
import EventEmitter from '../Utils/EventEmitter.js'
import Debug from '../Utils/Debug.js'

/**
 * This class creates individual planet
 * This includes Mercury, Venus, Mars, Neptune
 * It is only called by PlanetController in a loop to generate the 4 planets
 */

export default class Planet
{
    constructor(index)
    {
        //Setup
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.t = 0

        //Planets information
        const scaleList = [4, 4.5, 3.8, 5.3]
        const speedList = [0.0037, 0.00135, 0.001, 0.0003]
        const radiusList = [7.2, 10, 16, 30]
        const rotateSpeedList = [0.008, 0.006, 0.016, 0.18]
        const nameList = ["mercury", "venus", "mars", "neptune"]
        this.parameters = {
            mercury: '#504e51',
            venus: '#504e51',
            mars: '#ab5936',
            neptune: '#3f54ba'
        }

        //Set up this planet
        const indexx = index
        this.scale = scaleList[indexx]
        this.speed = speedList[indexx]
        this.radius = radiusList[indexx]
        this.rotateSpeed = rotateSpeedList[indexx]
        this.name = nameList[indexx]

        //Debug
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

        //Loading specific texture depending on the planet
        this.textures[this.name] = this.resources.items[this.name]
    }

    setPlanet()
    {
        const planetGeo = new THREE.SphereGeometry(0.7,32,16)
        const planetMaterial = new THREE.MeshToonMaterial({
            color: this.parameters[this.name],
            map: this.textures[this.name],
            gradientMap: this.textures.gradient,
        })
        this.planet = new THREE.Mesh(planetGeo, planetMaterial)
        this.planet.rotation.y = -0.2
        this.planet.scale.set(this.scale,this.scale,this.scale)
        this.scene.add(this.planet)
    }

    animation()
    {
        if(this.experience.animate == 1){
            this.t += 13
        } 
        this.t += 2
        this.planet.position.x = Math.cos(-this.t * this.speed ) * Math.PI * this.radius
        this.planet.position.z = Math.sin(-this.t * this.speed ) * Math.PI * this.radius
        this.planet.rotateY(this.rotateSpeed)
    }

    debugGui()
    {
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder(this.name)
            this.debugFolder
                .addColor(this.parameters, this.name)
                .onChange(() => {
                    this.planet.material.color.set(this.parameters[this.name])
            })
        }
    }
}