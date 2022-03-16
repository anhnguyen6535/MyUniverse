import Experience from '../Experience.js'
import EventEmitter from './EventEmitter.js'

export default class Time extends EventEmitter
{
    constructor()
    {
        super()

        //Loading Obj
        this.experience = new Experience()
        // this.world = this.experience.world
        // this.sun = this.world.sun
        // this.planet1 = this.world.planet1

        // Setup
        this.start = Date.now()
        this.current = this.start
        this.elapsed = 0
        this.delta = 16
        this.oldElapsedTime = 0
        this.countFrame = 0

        

        window.requestAnimationFrame(() =>
        {
            this.tick()
        })
    }

    tick()
    {
        const currentTime = Date.now()
        this.delta = currentTime - this.current
        this.current = currentTime
        this.elapsed = this.current - this.start
        this.countFrame ++

        //Update obj
        // this.sun.rotateY(0.2)
        // //torus.rotateX(0.2)

        // this.planet1.position.x = Math.cos(elapsedTime) * Math.PI * 3
        // this.planet1.position.z = Math.sin(elapsedTime) * Math.PI * 3
        //planet.rotateY(0.1)
        //ring.rotateX(0.1)
        //group.rotateX(Math.PI )
        //group.position.y += 1
        //camera.lookAt(sun.position)

        this.trigger('tick')

        window.requestAnimationFrame(() =>
        {
            this.tick()
        })

        //this.trigger('')
    }
}