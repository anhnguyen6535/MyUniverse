import * as THREE from 'three'
import Experience from '../Experience.js'
import EventEmitter from '../Utils/EventEmitter.js'

export default class Environment
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        
        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('environment')
        }

        this.setSunLight()
        //this.setSpotLight()
        this.setAmbientLight()
        //this.setEnvironmentMap()
    }

    setAmbientLight()
    {
        this.ambientLight = new THREE.AmbientLight('#ffffff', 3)
        this.scene.add(this.ambientLight)
    }

    setSunLight()
    {
        // this.sunLight = new THREE.DirectionalLight('#ffffff', 3)
        // //this.sunLight = new THREE.SpotLight('#ffffff', 1)
        // this.sunLight.position.set(30,0,10)
        // this.sunLight.rotation.z = 90* Math.PI /180
        // this.scene.add(this.sunLight)
        // this.directionalLightHelper = new THREE.DirectionalLightHelper(this.sunLight, 2)
        // this.scene.add(this.directionalLightHelper)

        // this.spotLightHelper = new THREE.SpotLightHelper(spotLight)
        // this.scene.add(spotLightHelper)
        // window.requestAnimationFrame(() =>
        // {
        //     this.spotLightHelper.update()
        // })
    }

    setSpotLight()
    {
        // this.spotLight = new THREE.SpotLight('#ffffff', 1)
        // this.spotLight.position.set(1,10,1)
        // //this.spotLight.rotation.z = 20* Math.PI /180
        // this.scene.add(this.spotLight)
        // this.spotLightHelper = new THREE.SpotLightHelper(spotLight)
        // this.scene.add(spotLightHelper)
        // window.requestAnimationFrame(() =>
        // {
        //     this.spotLightHelper.update()
        // })
    }

}