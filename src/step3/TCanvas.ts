import * as THREE from 'three'
import { TCanvasBase } from './TCanvasBase'

export class TCanvas extends TCanvasBase {
	private mesh?: THREE.Mesh

	constructor(parentNode: ParentNode) {
		super(parentNode)

		this.setScene()
		this.createLights()
		this.createModel()
		this.animate(this.update)
	}

	private setScene = () => {
		this.scene.background = new THREE.Color('#1e1e1e')
		this.camera.position.set(-2, 2, 3)
		this.setOrbitControls(0.1)

		const axisHelper = new THREE.AxesHelper()
		this.scene.add(axisHelper)
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

		// const dirLightHelper = new THREE.DirectionalLightHelper(directionalLight)
		const dirLightHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
		this.scene.add(dirLightHelper)
	}

	private createModel = () => {
		{
			const geometry = new THREE.BoxGeometry()
			const material = new THREE.MeshStandardMaterial()
			this.mesh = new THREE.Mesh(geometry, material)
			this.mesh.receiveShadow = true
			this.mesh.castShadow = true
			this.scene.add(this.mesh)
		}

		{
			const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
			const material = new THREE.MeshStandardMaterial()
			const mesh = new THREE.Mesh(geometry, material)
			mesh.receiveShadow = true
			mesh.castShadow = true
			mesh.position.set(2, 2, 2)
			this.scene.add(mesh)
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

	private update = () => {
		const dt = this.clock.getDelta()
		this.mesh!.rotation.x += dt
		this.mesh!.rotation.y += dt * 0.5
	}
}
