import * as dat from 'lil-gui'
import * as THREE from 'three'
import Experience from '../Experience'

export default class Debug
{
    constructor()
    {
        this.active = window.location.hash === '#debug'

        if(this.active)
        {
            this.ui = new dat.GUI()
        }
    }
}