// https://github.com/mrdoob/three.js/blob/master/examples/webgl_raycaster_bvh.html

import * as THREE from 'three'
import { TCanvasBase } from './TCanvasBase'

export class TCanvas extends TCanvasBase {
	private mesh?: THREE.Mesh

	constructor(parentNode: ParentNode) {
		super(parentNode)

		this.setScene()
		this.createModel()
		this.animate(this.update)
	}

	private setScene = () => {
		this.scene.background = new THREE.Color('#1e1e1e')
		this.camera.position.z = 3
		this.setOrbitControls(0.1)

		const axisHelper = new THREE.AxesHelper()
		this.scene.add(axisHelper)
	}

	private createModel = () => {
		const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
		const material = new THREE.MeshNormalMaterial()
		this.mesh = new THREE.Mesh(geometry, material)
		this.scene.add(this.mesh)
	}

	private update = () => {
		const dt = this.clock.getDelta()
		this.mesh!.rotation.x += dt
		this.mesh!.rotation.y += dt * 0.5
	}
}
