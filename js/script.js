class ActivePage {
	constructor(elements) {
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
	constructor(urlParameters) {
		this.urlParameters = urlParameters
	}

	activate() {
		if (this.urlParameters) {
			this.urlParameters.forEach((param) => {
				const element = document.getElementById(param)
				if (element) {
					element.setAttribute('checked', true)
				} else {
					throw new Error('There is no element to interact with.')
				}
			})
		}
	}
}

class Accordion {
	constructor(elements) {
		this.elements = elements
	}

	activate() {
		if (this.elements.length) {
			this.elements.forEach((element) => {
				element.addEventListener('click', () => {
					const control = element.getAttribute('aria-controls')

					const targetElement = document.getElementById(control)
					targetElement.classList.toggle('active')

					const active = targetElement.classList.contains('active')
					element.setAttribute('aria-expanded', active)
				})
			})
		}
	}
}

window.addEventListener('load', () => {
	new ActivePage(document.querySelectorAll('.header-menu a')).activate()

	new CurrentProduct(new URLSearchParams(location.search)).activate()

	new Accordion(document.querySelectorAll('.perguntas button')).activate()

	/* Galeria */
	const galeria = document.querySelectorAll('.bicicleta-imgs img')
	const galeriaContainer = document.querySelector('.bicicleta-imgs')

	function changeImg(event) {
		const img = event.currentTarget
		const media = window.matchMedia('(min-width: 900px)').matches
		if (media) {
			galeriaContainer.prepend(img)
		}
	}

	galeria.forEach((imgGaleria) => {
		imgGaleria.addEventListener('click', changeImg)
	})
})

if (window.SimpleAnime) new SimpleAnime()
