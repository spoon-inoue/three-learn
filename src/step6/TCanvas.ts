import * as THREE from 'three'
import { TCanvasBase } from './TCanvasBase'
import torusDefinePartsVert from './shaders/torusDefinePartsVert.glsl'
import torusPartsVert from './shaders/torusPartsVert.glsl'
import torusDefinePartsFrag from './shaders/torusDefinePartsFrag.glsl'
import torusPartsFrag from './shaders/torusPartsFrag.glsl'

export class TCanvas extends TCanvasBase {
	constructor(parentNode: ParentNode) {
		super(parentNode)

		this.setScene()
		this.createModel()
		this.createLights()
		this.animate(this.update)
	}

	private setScene = () => {
		this.scene.background = new THREE.Color('#1e1e1e')
		this.camera.position.set(0, 0, 3)
		this.setOrbitControls(0.1)
		this.setStats()

		const axes = new THREE.AxesHelper()
		this.scene.add(axes)
	}

	private createLights = () => {
		const directionalLight = new THREE.DirectionalLight('#fff', 1)
		directionalLight.position.set(5, 5, 5)
		directionalLight.castShadow = true
		const range = 3
		directionalLight.shadow.camera.far = 15
		directionalLight.shadow.camera.top = range
		directionalLight.shadow.camera.bottom = -range
		directionalLight.shadow.camera.left = -range
		directionalLight.shadow.camera.right = range
		directionalLight.shadow.mapSize.set(2048, 2048)
		this.scene.add(directionalLight)
	}

	private createModel = () => {
		// const geometry = new THREE.PlaneGeometry()
		// const geometry = new THREE.SphereGeometry(0.7, 64, 64)
		const geometry = new THREE.TorusGeometry(0.5, 0.2, 64, 64)
		//
		const material = new THREE.MeshStandardMaterial()
		material.onBeforeCompile = (shader) => {
			shader.vertexShader = shader.vertexShader.replace('#define STANDARD', torusDefinePartsVert)
			shader.vertexShader = shader.vertexShader.replace('#include <fog_vertex>', torusPartsVert)
			// ---------------------------------
			shader.fragmentShader = shader.fragmentShader.replace('#define STANDARD', torusDefinePartsFrag)
			shader.fragmentShader = shader.fragmentShader.replace('#include <output_fragment>', torusPartsFrag)
		}
		const mesh = new THREE.Mesh(geometry, material)
		mesh.castShadow = true
		mesh.receiveShadow = true
		this.scene.add(mesh)

		const groundGeo = new THREE.PlaneGeometry(5, 5)
		const groundMat = new THREE.MeshStandardMaterial()
		const ground = new THREE.Mesh(groundGeo, groundMat)
		ground.rotation.x = -Math.PI / 2
		ground.position.y = -1
		ground.receiveShadow = true
		this.scene.add(ground)
	}

	private update = () => {}
}
