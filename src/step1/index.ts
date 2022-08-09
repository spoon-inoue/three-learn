import { TCanvas } from './TCanvas'

class App {
	constructor() {
		this.createCanvas()
	}

	private createCanvas = () => {
		const parentNode = document.querySelector<HTMLDivElement>('.step1')!
		new TCanvas(parentNode)
	}
}

new App()
