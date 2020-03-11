import { Document, UI } from 'sketch'

export default function snap (context) {
	var document = Document.getSelectedDocument()
	var selection = document.selectedLayers

	if (!selection.isEmpty) {
		
		// !important Specify type which gets snapped in manifests identifiers
		let commands = [ context.command.identifier().replace('snap-','') ]

		// Split up if there are multiple types to snap to
		commands = commands[0].split("-")

		// Snap
		commands.forEach(type => {
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

		// Message
		UI.message("👌Snap!")

	} else {
		UI.message("It seems you haven't selected any layers")
	}

}