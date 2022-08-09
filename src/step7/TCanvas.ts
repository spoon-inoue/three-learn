import gsap from 'gsap'
import * as THREE from 'three'
import { TCanvasBase } from './TCanvasBase'

export class TCanvas extends TCanvasBase {
	private mesh?: THREE.Mesh

	private tl: gsap.core.Timeline

	private datas = {
		start: () => this.tl.restart(true),
		reverse: () => this.tl.reverse(),
		combination: async () => {
			await this.tl.restart()
			this.tl.reverse()
		},
		forward: () => this.forward(),
		backward: () => this.backward()
	}

	constructor(parentNode: ParentNode) {
		super(parentNode)

		this.setScene()
		this.createLights()
		this.createModel()
		this.tl = this.createGsapAnimation()
		this.animate()
	}

	private setScene = () => {
		this.scene.background = new THREE.Color('#1e1e1e')
		this.camera.position.set(0, 1, 4)
		this.setOrbitControls(0.1)

		this.setStats()

		const axisHelper = new THREE.AxesHelper()
		this.scene.add(axisHelper)

		this.gui.add(this.datas, 'start')
		this.gui.add(this.datas, 'reverse')
		this.gui.add(this.datas, 'combination')
		this.gui.add(this.datas, 'forward')
		this.gui.add(this.datas, 'backward')
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

	private createGsapAnimation = () => {
		const tl = gsap.timeline({ delay: 2, paused: true, defaults: { duration: 1, ease: 'power2.out' } })
		tl.set(this.mesh!.rotation, { x: 0, y: 0 })
		tl.set(this.mesh!.scale, { x: 1, y: 1, z: 1 })
		tl.to(this.mesh!.rotation, { x: 2 * Math.PI, y: 2 * Math.PI })
		tl.to(this.mesh!.scale, { x: 1.5, y: 1.5, z: 1.5, duration: 2, ease: 'elastic.out(1.5, 0.2)' }, '<50%')
		return tl
	}

	// ============================================
	private from = {
		rotation: [0, 0, 0],
		scale: [1, 1, 1]
	}

	private to = {
		rotation: [2 * Math.PI, 2 * Math.PI, 0],
		scale: [1.5, 1.5, 1.5]
	}

	private forward = () => {
		const [rx, ry, rz] = this.to.rotation
		const [sx, sy, sz] = this.to.scale

		const tl = gsap.timeline()
		tl.to(this.mesh!.rotation, { x: rx, y: ry, z: rz, duration: 1, ease: 'power2.out' })
		tl.to(this.mesh!.scale, { x: sx, y: sy, z: sz, duration: 2, ease: 'elastic.out(1.5, 0.2)' }, '<50%')
	}

	private backward = () => {
		const [rx, ry, rz] = this.from.rotation
		const [sx, sy, sz] = this.from.scale

		const tl = gsap.timeline({ defaults: { duration: 1, ease: 'power2.in' } })
		tl.to(this.mesh!.rotation, { x: rx, y: ry, z: rz })
		tl.to(this.mesh!.scale, { x: sx, y: sy, z: sz }, '<')
	}
}
