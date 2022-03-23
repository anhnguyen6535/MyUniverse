import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Sun
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug

        this.debugGui()

        this.setGeometry()
        this.setTextures()
        this.setMaterial()
        this.setMesh()

        //Animation
        this.time.on('tick', () =>{
            this.animation()
        })
    }

    setGeometry()
    {
        this.geometry = new THREE.SphereGeometry(2,32,32)
    }

    setTextures()
    {
        this.textures = {}
        this.textures.gradient = this.resources.items.gradientTexture
        this.textures.sunM = this.resources.items.sunTexture
    }

    setMaterial()
    {
        this.material = new THREE.MeshToonMaterial({
            color: this.parameters.color,
            transparent: true,
            map: this.textures.sunM,
            gradientMap: this.textures.gradient,
        })
        
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.scale.set(8,8,8)
        this.scene.add(this.mesh)
    }

    animation()
    {
        this.animate = this.experience.animate
        if(this.animate === 1){
            this.mesh.rotateY(0.004)
        }
        else{
            document.getElementById('sun').classList.remove('animate')
            document.getElementById('sun').style.display = "block"

            this.mesh.rotateY(0.004 * 0.1)
            document.getElementById('welldone').classList.add('animate')
            document.getElementById('direction').classList.add('animate')
        }
    }

    debugGui()
    {
        this.parameters = {
            color: '#f94c39'
        }
        
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('sun')
            this.debugFolder.addColor(this.parameters, 'color')
                            .onChange(() => {
                                this.mesh.material.color.set(this.parameters.color)
                            })
        }
    }
}