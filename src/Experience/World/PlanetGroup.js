import * as THREE from 'three'
import Experience from '../Experience.js'
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import gsap from 'gsap'
import EventEmitter from '../Utils/EventEmitter.js'
import Debug from '../Utils/Debug.js'
import Text from './Text.js'

export default class PlanetGroup
{
    constructor(index, planet)
    {
        //Setup
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug
       

        //Group Information
        const textList = ["ABOUT ME", "GALLERY", "TROPHY", "DIARY"]
        const positions = [6,7,6,6]
        const names = ["earth", "jupiter", "saturn","uranus"]
        const colorsHover = ["#48df34","#e99a2b","#012b6f","#fd3e1c"]
        this.parameters = {
            earth: '#31ec18',
            jupiter: '#eb0000',
            saturn: '#10017e',
            uranus: '#ff2600',
        }

        //Setup Group
        const indexx = index - 4
        this.content = textList[indexx]
        this.planet = planet
        this.positionY = positions[indexx]
        this.name = names[indexx]
        this.colorHover = colorsHover[indexx]
        
        this.setTextures()
        this.setGeo()
        this.setMaterial()
        this.setText()
        
        this.debugGui()

        //Animation
        this.time.on('tick', () =>{
            this.animation()
        })
    }

    animation()
    {
        if(this.experience.animate === 0){
            this.scene.add(this.text)
            this.text.position.x = this.planet.planet.position.x
            this.text.position.z = this.planet.planet.position.z 
            if(this.experience.textHover === this.name){
                this.text.position.y = this.positionY + 1
                this.text.material.color.set(this.colorHover)
            }else{
                this.text.position.y = this.positionY
                this.text.material.color.set(this.parameters[this.name])
            } 
        }else this.scene.remove(this.text)
    }

    setTextures()
    {
        this.textures = {}
        this.textures.font = this.resources.items.robotTexture
    }

    setGeo()
    {
        this.textGeo = new TextGeometry(
            this.content,
            {
                font: this.textures.font,
                size: 4,
                height: 0.2,
            }
          );
        this.textGeo.center();
    }

    setMaterial(){
        this.textMaterial = new THREE.MeshToonMaterial({
            color: this.parameters[this.name]
          });
    }

    setText(){
        this.text = new THREE.Mesh(this.textGeo, this.textMaterial);
        this.text.position.y = this.positionY
       
    }


    debugGui()
    {
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder(this.name + " text")
            this.debugFolder
                .addColor(this.parameters, this.name )
                .onChange(() => {
                    this.text.material.color.set(this.parameters[this.name])
            })
        }
    }
}