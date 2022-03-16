import Experience from '../Experience.js'
import Environment from './Environment.js'
import Sun from './Sun.js'
import Star from './Star.js'
import Raycaster from './Raycaster.js'
import * as THREE from 'three'
import EventEmitter from '../Utils/EventEmitter.js'
import TextUniverse from './TextUniverse.js'
import PlanetController from './PlanetController.js'

/**
 * A class generates all objects on screen
 */

export default class World
{
    
    constructor()
    {
        this.experience = new Experience()
        this.time = this.experience.time
        this.mouse = this.experience.mouse
        this.scene = this.experience.scene
        this.raycaster = new Raycaster()
        this.resources = this.experience.resources

        //Wait for resources
        this.resources.on('ready', () =>
        {
            this.text = new TextUniverse()
            this.sun = new Sun()
            this.planets = new PlanetController()
            this.star = new Star()
            this.environment = new Environment()
            this.raycaster.checkIntersection
            ([
                this.text.text
            ])
        })

        
    }

    // update()
    // {
    //     if(this.door)
    //     {
    //         this.door.update()
    //     }
    //     if(this.bridge)
    //     {
    //         this.bridge.update()
    //     }
    //     if(this.robot)
    //     {
    //         this.robot.update()
    //     }
    //}
}