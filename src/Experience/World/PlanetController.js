import * as THREE from 'three'
import Experience from '../Experience.js'
import EventEmitter from '../Utils/EventEmitter.js'
import Debug from '../Utils/Debug.js'
import Planet from './Planet.js'
import PlanetGroup from './PlanetGroup.js'
import Raycaster from './Raycaster.js'

/**
 * This class generates Mercury, Venus, Mars, Neptune
 * All planet is PlanetController.planet property
 * It calls Planet class to generate planet object
 */

export default class PlanetController
{
    constructor()
    {
        //Generate all 4 planets
        this.planets = []
        this.generatePlanets()
    }

    generatePlanets()
    {
        for(let i = 0; i < 8; i++){
            this.planet = new Planet(i)
            if(i > 3){
               this.planetGroup = new PlanetGroup(i, this.planet)
               this.planets.push(this.planet)
            }
       }
    }
}