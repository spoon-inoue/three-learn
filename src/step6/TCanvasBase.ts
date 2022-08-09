import GUI from 'lil-gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'

export abstract class TCanvasBase {
	private container: HTMLElement

	protected renderer!: THREE.WebGLRenderer
	protected scene!: THREE.Scene
	protected camera!: THREE.PerspectiveCamera
	protected clock = new THREE.Clock()
	protected diposeCallback?: () => void

	private _gui?: GUI
	private stats?: Stats
	private animeID?: number
	private controls?: OrbitControls

	constructor(parentNode: ParentNode, private containerClassName = 'three-container') {
		this.container = parentNode.querySelector(`.${this.containerClassName}`)!

		this.init()
		this._addEvents()
	}

	private init = () => {
		const { width, height, aspect } = this.size

		this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
		this.renderer.setPixelRatio(window.devicePixelRatio)
		this.renderer.setSize(width, height)
		this.renderer.shadowMap.enabled = true
		this.container.appendChild(this.renderer.domElement)

		this.scene = new THREE.Scene()
		this.camera = new THREE.PerspectiveCamera(50, aspect, 0.01, 100)
		this.camera.position.z = 5
	}

	private _addEvents = () => {
		window.addEventListener('resize', this.handleResize)
	}

	private handleResize = () => {
		const { width, height, aspect } = this.size

		this.camera.aspect = aspect
		this.camera.updateProjectionMatrix()

		this.renderer.setSize(width, height)

		this.render()
	}

	protected get gui() {
		if (!this._gui) this._gui = new GUI()
		return this._gui
	}

	protected setStats = () => {
		if (!this.stats) {
			this.stats = Stats()
			this.container.appendChild(this.stats.dom)
		}
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
		this.stats && this.stats.update()

		callback && callback()

		this.render()
	}

	protected render = () => {
		this.renderer.render(this.scene, this.camera)
	}

	dispose = () => {
		this.diposeCallback && this.diposeCallback()

		window.removeEventListener('resize', this.handleResize)
		this.animeID && cancelAnimationFrame(this.animeID)
	}
}
