import * as THREE from 'three'
import Experience from '../Experience.js'
import gsap from 'gsap'
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
        this.t = 17100

        //Planets information
        const scaleList = [4, 4.5, 3.8, 5.3, 4.8, 7, 5.7, 4.8]
        const speedList = [0.0037, 0.00135, 0.001, 0.0003, 0.001125, 0.0007, 0.000564, 0.0004]
        const radiusList = [9.4, 13, 19, 32, 16, 23, 25, 28]
        const rotateSpeedList = [0.008, 0.006, 0.016, 0.18, 0.03, 0.8, 0.7, 0.28]
        const nameList = ["mercury", "venus", "mars", "neptune", "earth", "jupiter","saturn","uranus"]
        const colorsHover = ["#68a6bb","#ac755d","#635612","#0a5e6b"] //baa22c 48df34 199c07
        // const colorsHover = ["#79757a","#7b787d","e1794c","516df5","#68a6bb","#ac755d","#635612","#0a5e6b"] //baa22c 48df34 199c07

        this.parameters = {
            mercury: '#504e51',
            venus: '#504e51',
            mars: '#ab5936',
            neptune: '#3f54ba',
            earth: "#43707f",
            jupiter: "#90614d",
            saturn: "#40370c",
            uranus: "#074b55"
        }

        //Set up this planet
        const indexx = index
        this.scale = scaleList[indexx]
        this.speed = speedList[indexx]
        this.radius = radiusList[indexx] * 3
        this.rotateSpeed = rotateSpeedList[indexx]
        this.name = nameList[indexx]
        if(indexx > 3) this.colorHover = colorsHover[indexx - 4]

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
            this.planet.rotateY(this.rotateSpeed)
        } else{
            this.planet.rotateY(this.rotateSpeed * 0.1)
            if(this.experience.textHover === this.name){
                this.planet.material.color.set(this.colorHover)
            }else this.planet.material.color.set(this.parameters[this.name])
        }
        this.t += 2
        this.planet.position.x = Math.cos(-this.t * this.speed ) * this.radius //* Math.PI

        this.planet.position.z = Math.sin(-this.t * this.speed) * this.radius //* Math.PI
        
  
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