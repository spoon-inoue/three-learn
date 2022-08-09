import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export abstract class TCanvasBase {
	protected renderer: THREE.WebGLRenderer
	protected scene: THREE.Scene
	protected camera: THREE.PerspectiveCamera
	protected clock = new THREE.Clock()

	private animeID?: number
	private controls?: OrbitControls

	constructor(private parentNode: ParentNode, private containerClassName = 'three-container') {
		const { renderer, scene, camera } = this.init()
		this.renderer = renderer
		this.scene = scene
		this.camera = camera
		this.addEvents()
	}

	private init = () => {
		const { width, height, aspect } = this.size

		const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
		renderer.setPixelRatio(window.devicePixelRatio)
		renderer.setSize(width, height)
		const container = this.parentNode.querySelector(`.${this.containerClassName}`)!
		container.appendChild(renderer.domElement)

		const scene = new THREE.Scene()
		const camera = new THREE.PerspectiveCamera(50, aspect, 0.01, 100)
		camera.position.z = 5

		return { renderer, scene, camera }
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

	protected get size() {
		const [width, height] = [window.innerWidth, window.innerHeight]
		return { width, height, aspect: width / height }
	}

	protected setOrbitControls = (damping?: number) => {
		if (!this.controls) {
			this.controls = new OrbitControls(this.camera, this.renderer.domElement)
		}
		if (damping) {
			this.controls.enableDamping = true
			this.controls.dampingFactor = damping
		}
		return this.controls
	}

	protected animate = (callback?: () => void) => {
		this.animeID = requestAnimationFrame(this.animate.bind(this, callback))

		if (this.controls && this.controls.enableDamping) {
			this.controls.update()
		}

		callback && callback()

		this.render()
	}

	protected render = () => {
		this.renderer.render(this.scene, this.camera)
	}

	dispose = () => {
		window.removeEventListener('resize', this.handleResize)
		this.animeID && cancelAnimationFrame(this.animeID)
	}
}
