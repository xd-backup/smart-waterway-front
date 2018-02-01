import * as THREE from 'three'

const waterMeshName = 'waterMesh'

class Terrain {
    constructor(store, width, height) {
        this.animate = this.animate.bind(this)
        this.render = this.render.bind(this)

        this.store = store
        this.width = width
        this.height = height

        // create rotate quaternion
        this.quaternion = new THREE.Quaternion()
        this.quaternion.setFromAxisAngle(
            new THREE.Vector3(0, 1, 0), 
            this.store.state.rotateAngle)

        // create material
        this.phongMaterial = new THREE.MeshLambertMaterial({ 
	        color: 0x9b986c,
            emissive: 0x2f2f2f, 
            side: THREE.DoubleSide
	    })
        this.waterMaterial = new THREE.MeshLambertMaterial({ 
	        color: 0x2194ce,
            emissive: 0x2f2f2f, 
            transparent: true,
            opacity: 0.7,
            side: THREE.DoubleSide
	    })

        // create particles
        this.cloud = new Cloud()
        this.flow = new Flow()

        // create terrain
        this.builder = new TriangleBuilder(territoryData)
        this.builder.normalize()
        this.builder.setWindow(50)
        this.planeGeo = this.builder.build()
        this.planeGeo.computeVertexNormals()

        this.terrainMesh = new THREE.Mesh(this.planeGeo, this.phongMaterial) 
        // this.boxMesh = new THREE.Mesh(new THREE.BoxGeometry(400, 400, 400), this.phongMaterial)

        this.waterGeo = new THREE.PlaneGeometry(12000, 10000, 199, 99)
        this.waterGeo.computeVertexNormals()
        this.waterGeo.vertices = this.waterGeo.vertices.map(vert => {
            return new THREE.Vector3(vert.x, vert.z, vert.y)
        })
        this.waterMesh = new THREE.Mesh(this.waterGeo, this.waterMaterial)

        // create lights
        this.envLight = new THREE.AmbientLight(0x303030)
        this.light = new THREE.DirectionalLight(0xffffff)
        this.light.position.set(300, 200, 100)
        this.light.lookAt(new THREE.Vector3(0, 0, 0))

        // create clock for animate
        this.clock = new THREE.Clock()

        // create renderer
        this.renderer = new THREE.WebGLRenderer({antialias: true})
        // console.log('Territory.js', 'this.width', 'this.height', this.width, this.height)
        this.renderer.setSize(this.width, this.height)
        // this.renderer.setClearColor(0xfffff7)
        this.renderer.setClearColor(0x000000)

        // create camera
        this.aspectRatio = this.width / this.height
        this.camera = new THREE.PerspectiveCamera(75, this.aspectRatio, 1, 5000)
        this.camera.position.set(1200, 800, 1200)

        // create scene
        this.scene = new THREE.Scene()
        this.scene.add(this.envLight)
        this.scene.add(this.light)
        this.scene.add(this.terrainMesh)

        this.waterMesh.name = waterMeshName
        this.scene.add(this.waterMesh)

        if (this.store.state.meteorology) {
            let cloudMesh = this.cloud.particleGroup.mesh
            cloudMesh.name = cloudMeshName
            this.scene.add(cloudMesh)
        }
        if (this.store.state.hydrology) {
            let flowMesh = this.flow.particleGroup.mesh
            flowMesh.name = flowMeshName
            // this.scene.add(flowMesh)
        }

        this.camera.position.set(1200, 1200, 1200)
        this.camera.lookAt(new THREE.Vector3(0, -400, 0))
        this.scene.fog = new THREE.Fog(0xffffff, 0.3, 10000)

        setTimeout(this.animate, 0) 
    }

    animate() {
        if (this.store.state.meteorology) {
            if (this.scene.getObjectByName(cloudMeshName) === undefined || this.scene.getObjectByName(cloudMeshName) == null) { 
                let cloudMesh = this.cloud.particleGroup.mesh
                cloudMesh.name = cloudMeshName
                this.scene.add(cloudMesh)
            }
        }
        else {
            if (this.scene.getObjectByName(cloudMeshName) !== undefined && this.scene.getObjectByName(cloudMeshName) != null) { 
                let cloudMesh = this.scene.getObjectByName(cloudMeshName)
                this.scene.remove(cloudMesh)
            }
        }

        if (this.store.state.hydrology) {
            if (this.scene.getObjectByName(waterMeshName) === undefined || this.scene.getObjectByName(waterMeshName) == null) {
                let waterMesh = this.waterMesh
                waterMesh.name = waterMeshName
                this.scene.add(waterMesh)
            }
        }
        else {
            if (this.scene.getObjectByName(waterMeshName) !== undefined && this.scene.getObjectByName(waterMeshName) != null) {
                let waterMesh = this.scene.getObjectByName(waterMeshName)
                this.scene.remove(waterMesh)
            }
        }

        requestAnimationFrame(this.animate)

        let dt = this.clock.getDelta()

        this.store.update(dt)
        this.cloud.update(dt)
        this.flow.update(dt)

        this.render()
    }

    render() {
        // this.light.color = this.store.state.lightColor
        this.light.color.setHex(this.store.lightColor)
        this.quaternion.setFromAxisAngle(
            new THREE.Vector3(0, 1, 0), 
            this.store.state.rotateAngle)
        this.scene.quaternion.set(this.quaternion.x, this.quaternion.y, this.quaternion.z, this.quaternion.w)

        this.renderer.render(this.scene, this.camera)
    }

    get rendererDom() {
        return this.renderer.domElement
    }
}

export default Terrain
