import * as THREE from 'three'
import Experience from '../Experience.js'
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import EventEmitter from '../Utils/EventEmitter.js'
import Debug from '../Utils/Debug.js'

export default class TextUniverse
{
    constructor()
    {
        //Setup
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug
        this.debugGui()

        //Generate Mesh
        this.setTextures()
        this.setGeo()
        this.setMaterial()
        this.setText()
    }

    setTextures()
    {
        this.textures = {}
        this.textures.gradient = this.resources.items.gradientTexture
        this.textures.gradient.minFilter = THREE.NearestFilter
        this.textures.gradient.magFilter = THREE.NearestFilter
        this.textures.gradient.generateMipmaps = false
        this.textures.font = this.resources.items.fontTexture
    }

    setText(){
        this.text = new THREE.Mesh(this.textGeo, this.textMaterial);
        this.text.position.y = 30

        this.scene.add(this.text);
    }

    setGeo()
    {
        this.textGeo = new TextGeometry(
            'Anh\'s universe',
            {
                font: this.textures.font,
                size: 10,
                height: 0.2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.002,
                bevelOffset: 0,
                bevelSegments: 2,
            }
          );
        this.textGeo.center();
    }

    setMaterial(){
        this.textMaterial = new THREE.MeshToonMaterial({
            color: this.parameters.textColor,
            gradientMap: this.textures.gradient,
          });
    }

    debugGui()
    {
        this.parameters = {
            textColor: "#652e10",
        }

        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('textUniverse')
            this.debugFolder
                .addColor(this.parameters, 'textColor').onChange(() => 
                {
                    this.textMaterial.color.set(this.parameters.textColor);
                });
            }
    }
}