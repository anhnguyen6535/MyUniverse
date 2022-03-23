import * as THREE from 'three'

import Debug from './Utils/Debug.js'
import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import World from './World/World.js'
import Resources from './Utils/Resources.js'

import sources from './sources.js'
import Mouse from './Mouse.js'

let instance = null

export default class Experience
{
    constructor(_canvas)
    {
        // Singleton
        if(instance)
        {
            return instance
        }
        instance = this
        
        // Global access
        window.experience = this

        // Options
        this.canvas = _canvas

        // Setup
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.countFrame = this.time.countFrame
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)
        this.mouse = new Mouse()
        this.camera = new Camera()     
        this.renderer = new Renderer()
        this.world = new World()

        // Flag Default use to communicate between Raycaster and space objects
        this.animate = 1        //Flag for Normal speed planets
        this.blink = 0          //Flag for Stars blink
        this.textHover = ""      //Flag for Hover on text animation

        document.getElementById('sun').classList.add('animate')

        // Resize event
        this.sizes.on('resize', () =>
        {
            this.resize()
        })

        // Time tick event
        this.time.on('tick', () =>
        {
            this.update()
        })
    }

    //Resize viewport
    resize()
    {
        this.camera.resize()
        this.renderer.resize()
    }

    //Update viewport
    update()
    {
        this.camera.update()
        //this.world.update()
        this.renderer.update()
    }

    //Destroy method
    destroy()
    {
        this.sizes.off('resize')
        this.time.off('tick')

        // Traverse the whole scene
        this.scene.traverse((child) =>
        {
            // Test if it's a mesh
            if(child instanceof THREE.Mesh)
            {
                child.geometry.dispose()

                // Loop through the material properties
                for(const key in child.material)
                {
                    const value = child.material[key]

                    // Test if there is a dispose function
                    if(value && typeof value.dispose === 'function')
                    {
                        value.dispose()
                    }
                }
            }
        })

        // this.camera.controls.dispose()
        this.renderer.instance.dispose()

        if(this.debug.active)
            this.debug.ui.destroy()
    }
}