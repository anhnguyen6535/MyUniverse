import * as THREE from 'three'
import Experience from '../Experience.js'

export default class AxesHelper
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene

        setAxes()
    }

    setAxes()
    {
        const ax = new THREE.AxesHelper
        //this.scene.add(ax)
    }
}