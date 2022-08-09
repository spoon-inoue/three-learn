import { TCanvas } from './TCanvas'

class App {
	private canvas: TCanvas

	constructor() {
		this.canvas = this.createCanvas()
		this.addEvents()
	}

	private createCanvas = () => {
		const parentNode = document.querySelector<HTMLDivElement>('.step5')!
		return new TCanvas(parentNode)
	}

	private addEvents = () => {
		window.addEventListener('beforeunload', () => {
			this.canvas.dispose()
		})
	}
}

new App()
