import * as THREE from 'three'
import { TCanvasBase } from './TCanvasBase'

export class TCanvas extends TCanvasBase {
	private mesh?: THREE.Mesh
	private wheelTarget = 0

	private datas = {
		enabledLerp: false
	}

	constructor(parentNode: ParentNode) {
		super(parentNode)

		this.setScene()
		this.createLights()
		this.createModel()
		this.addEvents()
		this.setDispose()
		this.animate(this.update)
	}

	private setScene = () => {
		this.scene.background = new THREE.Color('#1e1e1e')
		this.camera.position.set(0, 1, 4)
		const controls = this.setOrbitControls(0.1)
		controls.enableZoom = false

		this.setStats()

		const axisHelper = new THREE.AxesHelper()
		this.scene.add(axisHelper)

		this.gui.add(this.datas, 'enabledLerp')
	}

	private createLights = () => {
		const ambientLight = new THREE.AmbientLight('#fff', 0.2)
		this.scene.add(ambientLight)

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

		// const dirLightHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
		// this.scene.add(dirLightHelper)
	}

	private createModel = () => {
		{
			const geometry = new THREE.BoxGeometry()
			const material = new THREE.MeshStandardMaterial({ color: '#0aa' })
			this.mesh = new THREE.Mesh(geometry, material)
			this.mesh.receiveShadow = true
			this.mesh.castShadow = true
			this.scene.add(this.mesh)
		}

		{
			const geometry = new THREE.PlaneGeometry(5, 5)
			const material = new THREE.MeshStandardMaterial()
			const mesh = new THREE.Mesh(geometry, material)
			mesh.rotation.x = -Math.PI / 2
			mesh.position.y = -1
			mesh.receiveShadow = true
			this.scene.add(mesh)
		}
	}

	private addEvents = () => {
		window.addEventListener('wheel', this.handleWheel)
	}

	private prev = 0

	private handleWheel = (e: WheelEvent) => {
		const absCurrent = Math.abs(e.deltaY)
		if (0 <= absCurrent - this.prev) {
			this.wheelTarget += 0 < e.deltaY ? 1 : -1
		}
		this.prev = absCurrent
	}

	private update = () => {
		if (this.datas.enabledLerp) {
			const rx = THREE.MathUtils.lerp(this.mesh!.rotation.x, this.wheelTarget, 0.05)
			const ry = THREE.MathUtils.lerp(this.mesh!.rotation.y, this.wheelTarget * 0.5, 0.05)
			const rz = THREE.MathUtils.lerp(this.mesh!.rotation.z, this.wheelTarget * 0.1, 0.05)
			this.mesh!.rotation.set(rx, ry, rz)
		} else {
			this.mesh!.rotation.set(this.wheelTarget, this.wheelTarget * 0.5, this.wheelTarget * 0.1)
		}
	}

	private setDispose = () => {
		this.diposeCallback = () => {
			window.removeEventListener('wheel', this.handleWheel)
		}
	}
}
