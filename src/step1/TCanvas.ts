// https://github.com/mrdoob/three.js/blob/master/examples/webgl_raycaster_bvh.html

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export class TCanvas {
	private renderer: THREE.WebGLRenderer
	private scene: THREE.Scene
	private camera: THREE.PerspectiveCamera

	private controls?: OrbitControls
	private clock?: THREE.Clock
	private mesh?: THREE.Mesh

	constructor(private parentNode: ParentNode) {
		const { renderer, scene, camera } = this.init()
		this.renderer = renderer
		this.scene = scene
		this.camera = camera
		this.setScene()
		this.createModel()
		this.addEvents()
		this.animate()
	}

	private init = () => {
		const { width, height, aspect } = this.size

		const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
		renderer.setPixelRatio(window.devicePixelRatio)
		renderer.setSize(width, height)
		const container = this.parentNode.querySelector('.three-container')!
		container.appendChild(renderer.domElement)

		const scene = new THREE.Scene()
		const camera = new THREE.PerspectiveCamera(50, aspect, 0.01, 100)

		return { renderer, scene, camera }
	}

	private get size() {
		const [width, height] = [window.innerWidth, window.innerHeight]
		return { width, height, aspect: width / height }
	}

	private setScene = () => {
		this.scene.background = new THREE.Color('#1e1e1e')
		this.camera.position.z = 3

		this.controls = new OrbitControls(this.camera, this.renderer.domElement)
		this.controls.dampingFactor = 0.1
		this.controls.enableDamping = true

		this.clock = new THREE.Clock()

		const axisHelper = new THREE.AxesHelper()
		this.scene.add(axisHelper)
	}

	private addEvents = () => {
		window.addEventListener('resize', this.handleResize)
	}

	private handleResize = () => {
		const { width, height, aspect } = this.size

		this.camera.aspect = aspect
		this.camera.updateProjectionMatrix()

		this.renderer.setSize(width, height)

		this.render()
	}

	private createModel = () => {
		const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
		const material = new THREE.MeshNormalMaterial()
		this.mesh = new THREE.Mesh(geometry, material)
		this.scene.add(this.mesh)
	}

	private animate = () => {
		requestAnimationFrame(this.animate)
		// ----------------------------------
		this.controls!.update()

		const dt = this.clock!.getDelta()
		this.mesh!.rotation.x += dt
		this.mesh!.rotation.y += dt * 0.5
		// ----------------------------------
		this.render()
	}

	private render = () => {
		this.renderer.render(this.scene, this.camera)
	}
}
