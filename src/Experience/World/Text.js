import * as THREE from 'three'
import Experience from '../Experience.js'
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import EventEmitter from '../Utils/EventEmitter.js'
import Debug from '../Utils/Debug.js'

export default class Text
{
    constructor(content, size,color)
    {
        //Setup
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.content = content
        this.size = size
        this.color = color

        //Generate Mesh
        this.setTextures()
        this.setGeo()
        this.setMaterial()
        this.setText()

        //Animation
        // this.time.on('tick', () =>{
        //     this.animation()
        // })
    }

    setTextures()
    {
        this.textures = {}
        this.textures.font = this.resources.items.cleanTexture
    }

    setText(){
        this.text = new THREE.Mesh(this.textGeo, this.textMaterial);
    }

    setGeo()
    {
        this.textGeo = new TextGeometry(
            this.content,
            {
                font: this.textures.font,
                // color: this.parameters.textColor,
                size: this.size,
                height: 0.2,
                // curveSegments: 12,
                // bevelEnabled: true,
                // bevelThickness: 0.03,
                // bevelSize: 0.002,
                // bevelOffset: 0,
                // bevelSegments: 2,
            }
          );
        this.textGeo.center();
    }

    setMaterial(){
        this.textMaterial = new THREE.MeshToonMaterial({
            color: this.color,
            // gradientMap: this.textures.gradient,
          });
    }

    animation()
    {
            
    }
}