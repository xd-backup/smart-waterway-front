import Promise from 'bluebird'
import * as THREE from 'three'

// constants
const textures = {
    ocean: 'dirt-512.jpg',
    sandy: 'sand-512.jpg',
    grass: 'grass-512.jpg',
    rocky: 'rock-512.jpg',
    snowy: 'snow-512.jpg'
}

const vertexShader = 'uniform sampler2D heightTexture; \
    uniform float heightScale; \
    uniform int level; \
    varying float vAmount; \
    varying vec2 vUV; \
    void main() \
    { \
	    vUV = uv; \
	    vec4 heightData = texture2D( heightTexture, uv * pow( 2, level ) ); \
	    vAmount = heightData.r; \
        vec3 newPosition = position + normal * heightScale * vAmount; \
	    gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 ); \
    }'

const fragmentShader = 'uniform sampler2D oceanTexture; \
    uniform sampler2D sandyTexture; \
    uniform sampler2D grassTexture; \
    uniform sampler2D rockyTexture; \
    uniform sampler2D snowyTexture; \
    uniform int level; \
    varying vec2 vUV; \
    varying float vAmount; \
    void main() \
    { \
        vec4 water = (smoothstep(0.01, 0.25, vAmount) - smoothstep(0.24, 0.26, vAmount)) * texture2D( oceanTexture, vUV * pow( 2, level ) * 10.0 ); \
        vec4 sandy = (smoothstep(0.24, 0.27, vAmount) - smoothstep(0.28, 0.31, vAmount)) * texture2D( sandyTexture, vUV * pow( 2, level ) * 10.0 ); \
        vec4 grass = (smoothstep(0.28, 0.32, vAmount) - smoothstep(0.35, 0.40, vAmount)) * texture2D( grassTexture, vUV * pow( 2, level ) * 20.0 ); \
        vec4 rocky = (smoothstep(0.30, 0.50, vAmount) - smoothstep(0.40, 0.70, vAmount)) * texture2D( rockyTexture, vUV * pow( 2, level ) * 20.0 ); \
        vec4 snowy = (smoothstep(0.50, 0.65, vAmount))                                   * texture2D( snowyTexture, vUV * pow( 2, level ) * 10.0 ); \
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0) + water + sandy + grass + rocky + snowy; //, 1.0); \
    }'

class Tile {
    constructor(paths, scene, camera, renderer) {
        this.paths = paths
        this.scene = scene
        this.camera = camera
        this.renderer = renderer
        this.textureLoader = new THREE.TextureLoader()
        this.lods = []

        this.getTextureUniform = Promise.props({
            oceanTexture: this.loadTexture(`${this.paths.texture}/${textures.ocean}`),
            sandyTexture: this.loadTexture(`${this.paths.texture}/${textures.sandy}`),
            grassTexture: this.loadTexture(`${this.paths.texture}/${textures.grass}`),
            rockyTexture: this.loadTexture(`${this.paths.texture}/${textures.rocky}`),
            snowyTexture: this.loadTexture(`${this.paths.texture}/${textures.snowy}`)
        }).bind(this).then((textureUniform) => {
            this.textureUniform = textureUniform
            return Promise.resolve(textureUniform)
        })

        this.load = this.load.bind(this)
        this.update = this.update.bind(this)
        this.loadTexture = this.loadTexture.bind(this)
        this.loadTileInfo = this.loadTileInfo.bind(this)
        this.getCameraDistance = this.getCameraDistance.bind(this)
    }

    load() {
        const that = this
        const cameraDistance = this.getCameraDistance()

        return this.loadTileInfo().then((tileInfo) => {
            that.tileInfo = tileInfo
            return this.getTextureUniform.bind(this)
        }).then(() => {
            return Promise.mapSeries(this.tileInfo.tiles, (tile) => {
                return this.loadTexture(`${this.paths.heightMap}/${tile.filename}`)
            })
        }).then((tileHeightMaps) => {
            this.tileInfo.tiles.map((tile, tileIndex) => {
                const lod = new THREE.LOD()
                const tileHeightMap = tileHeightMaps[tileIndex]

                for (let level = 0; level < this.tileInfo.level; level++) {
                    const levelUniforms = {
                        heightMap: tileHeightMap,
                        heightScale: level.heightScale,
                        level,
                        ...this.textureUniform
                    }

                    const levelMaterial = new THREE.ShaderMaterial({
                        uniforms: levelUniforms,
                        vertexShader,
                        fragmentShader
                    })

                    const levelGeometry = new THREE.PlaneGeometry(
                        tile.geometry.width,
                        tile.geometry.height,
                        tile.segment.x / (2 ** level),
                        tile.segment.y / (2 ** level)
                    )

                    const levelMesh = new THREE.Mesh(levelGeometry, levelMaterial)
                    levelMesh.position.x = tile.position.x
                    levelMesh.position.y = tile.position.y

                    lod.addLevel(levelMesh, cameraDistance * (2 ** level))
                }

                this.lods.push(lod)
                this.scene.add(lod)

                return lod
            })
        })
            .catch((err) => {
                console.log('Tile::load() Error', err)
            })
    }

    update() {
        this.lods.map((lod) => {
            lod.update(this.camera)
        })
    }

    // helper
    loadTexture(type, filename) {
        return new Promise((resolve, reject) => {
            this.textureLoader.load(this.paths[type] + filename, {}, (texture) => {
                if (texture instanceof THREE.Texture) {
                    resolve(texture)
                } else {
                    reject(new Error(`Texture loading failed. Filename: ${filename}`))
                }
            })
        })
    }

    loadTileInfo() {
        const that = this

        return fetch(`${this.paths.info}`).then((res) => {
            if (res.ok) {
                return res.json()
            }

            console.log('Tile::loadTileInfo() WebService Error')
            return null
        }).then((info) => {
            that.tileInfo = info
            return Promise.resolve(info)
        }).catch((err) => {
            console.log('Tile::loadTileInfo() Error', err.message)
        })
    }

    getCameraDistance() {
        const vFov = this.camera.fov * (Math.PI / 180)
        const distance = (this.renderer.getSize().height / 2) / Math.tan(vFov / 2)
        return distance
    }

}

export default Tile
