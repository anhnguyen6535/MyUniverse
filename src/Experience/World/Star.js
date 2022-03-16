import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Star
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.resources = this.experience.resources

        this.count = 3000

        this.setGeometry()
        this.setTextures()
        this.setMaterial()
        this.setMesh()
        this.countFrame = 0
        this.flag = true

        //Animation
        this.time.on('tick', () =>{
            this.animation()
        })
    }

    setGeometry()
    {
        this.geometry = new THREE.BufferGeometry()
        const positions = new Float32Array(this.count*3)
        const colors = new Float32Array(this.count*3)

        for(let i = 0; i < this.count *3; i++){
            positions[i] = (Math.random() - 0.5) * 190
            colors[i] = Math.random()
        }
        this.geometry.setAttribute('position', new THREE.BufferAttribute(positions,3))
        this.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    }

    setTextures()
    {
        this.textures = {}
        this.textures = this.resources.items.particlesTexture
    }

    setMaterial()
    {
        this.material = new THREE.PointsMaterial({size: 0.7, sizeAttenuation: true})
        this.material.vertexColors = true
        this.material.transparent = true
        this.material.alphaMap = this.textures
        this.material.depthWrite = false
    }

    setMesh()
    {
        this.mesh = new THREE.Points(this.geometry, this.material)

        this.scene.add(this.mesh)
    }

    animation(){
        if(this.experience.blink == 1){
            //this.time.countFrame ++
            if(this.time.countFrame % 20 == 0){
                if(this.flag){
                    this.mesh.material.size = 1.2
                    this.flag = false 
                }
                this.mesh.material.size = (Math.random()+1.2)
            }
        }else{
            this.mesh.material.size = 0.7 
            this.flag = false
        }

    }
}