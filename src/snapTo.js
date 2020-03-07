import { Document, UI } from 'sketch'

export default function snapTo (...args) {
	var document = Document.getSelectedDocument()
	var selection = document.selectedLayers

	if (!selection.isEmpty) {
		
		args.forEach(type => {
			selection.layers.forEach(layer => {
				let key = "frame"
				
				if (type == "lineHeight" || type == "fontSize") {
					key = "style"
				}

				if (layer[key][type]) {
					let offset = layer[key][type] % 8
					if (offset < 4) {
						layer[key][type] -= offset
					} else {
		      	layer[key][type] += (8 - offset)
					}
				}

			})
		})

	} else {
		UI.message("It seems you haven't selected any layers")
	}

}