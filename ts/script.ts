class ActivePage {
	private links

	constructor(elements: HTMLAnchorElement[]) {
		this.links = elements
	}

	activate() {
		const location = window.location.href

		if (this.links.length) {
			this.links.forEach((link) => {
				link.classList.remove('active')
				if (location.includes(link.href)) link.classList.add('active')
			})
		} else {
			throw new Error('There is no elements to intereact with.')
		}
	}
}

class CurrentProduct {
	private urlParameters

	constructor(urlParameters: URLSearchParams) {
		this.urlParameters = urlParameters
	}

	activate() {
		if (this.urlParameters) {
			this.urlParameters.forEach((param) => {
				const element = document.getElementById(param)
				if (element) {
					element.setAttribute('checked', String(true))
				} else {
					throw new Error('There is no element to interact with.')
				}
			})
		}
	}
}

class Accordion {
	private elements

	constructor(elements: HTMLButtonElement[]) {
		this.elements = elements
	}

	activate() {
		if (this.elements.length) {
			this.elements.forEach((element) => {
				element.addEventListener('click', () => {
					const control = element.getAttribute('aria-controls')

					const targetElement = document.getElementById(control!)
					targetElement?.classList.toggle('active')

					const active = targetElement?.classList.contains('active')
					element.setAttribute('aria-expanded', String(active))
				})
			})
		}
	}
}

declare const SimpleAnime: any

window.addEventListener('load', () => {
	new ActivePage(
		Array.from<HTMLAnchorElement>(document.querySelectorAll('.header-menu a'))
	).activate()

	new CurrentProduct(new URLSearchParams(location.search)).activate()

	new Accordion(
		Array.from<HTMLButtonElement>(document.querySelectorAll('.perguntas button'))
	).activate()

	/* Galeria */
	const galeria = document.querySelectorAll('.bicicleta-imgs img')
	const galeriaContainer = document.querySelector('.bicicleta-imgs')

	function changeImg(event: Event) {
		const img = event.currentTarget
		const media = window.matchMedia('(min-width: 900px)').matches
		if (media && galeriaContainer) {
			galeriaContainer.prepend(img as Node)
		}
	}

	galeria.forEach((imgGaleria) => {
		imgGaleria.addEventListener('click', changeImg)
	})

	new SimpleAnime()
})
