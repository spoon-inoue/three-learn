import * as THREE from 'three'
import { TCanvasBase } from './TCanvasBase'
// import planeFrag from './shaders/planeFrag.glsl'
// import planeVert from './shaders/planeVert.glsl'
// import sphereFrag from './shaders/sphereFrag.glsl'
// import sphereVert from './shaders/sphereVert.glsl'

export class TCanvas extends TCanvasBase {
	constructor(parentNode: ParentNode) {
		super(parentNode)

		this.setScene()
		this.createModel()
		this.animate(this.update)
	}

	private setScene = () => {
		this.scene.background = new THREE.Color('#1e1e1e')
		this.camera.position.set(0, 0, 3)
		const controls = this.setOrbitControls(0.1)
		controls.enableZoom = false
		this.setStats()

		const axes = new THREE.AxesHelper()
		this.scene.add(axes)
	}

	private createModel = () => {
		const geometry = new THREE.PlaneGeometry()
		// const geometry = new THREE.SphereGeometry(0.7, 64, 64)
		// const geometry = new THREE.TorusGeometry(0.7, 0.3, 64, 64)
		//
		const material = new THREE.MeshBasicMaterial()
		material.onBeforeCompile = (shader) => {
			console.log(shader.vertexShader)
			console.log(shader.fragmentShader)
		}
		// uvについて
		// const material = new THREE.ShaderMaterial({
		// 	uniforms: {},
		// 	vertexShader: planeVert,
		// 	fragmentShader: planeFrag,
		// 	side: THREE.DoubleSide
		// })
		// fresnel反射について
		// const material = new THREE.ShaderMaterial({
		// 	uniforms: {},
		// 	vertexShader: sphereVert,
		// 	fragmentShader: sphereFrag,
		// 	side: THREE.DoubleSide
		// })
		const mesh = new THREE.Mesh(geometry, material)
		this.scene.add(mesh)
	}

	private update = () => {}
}
