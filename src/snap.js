import { Document, UI, Settings } from 'sketch'

export function snap (context) {
	// Document & Selection
	var document = Document.getSelectedDocument()
	var selection = document.selectedLayers

	// Run
	if (!selection.isEmpty) {
		// Get setting for grid type
		var amount_point_grid = Settings.documentSettingForKey(document, 'gridType') || 8

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
					let offset = layer[key][type] % amount_point_grid
					if (offset < (amount_point_grid * 0.5)) {
						layer[key][type] -= offset
					} else {
		      	layer[key][type] += (amount_point_grid - offset)
					}
				}

			})
		})

		// Message
		UI.message("👌Snapped to " + amount_point_grid + "pt grid!")

	} else {
		UI.message("It seems you haven't selected any layers")
	}

}

export function settings (context) {
	var document = Document.getSelectedDocument()

	UI.getInputFromUser(
	  "Change point grid setting",
	  {
	    type: UI.INPUT_TYPE.selection,
	    possibleValues: ['2pt Grid', '4pt Grid', '6pt Grid', '8pt Grid', '10pt Grid', '12pt Grid', '16pt Grid'],
	    initialValue: (Settings.documentSettingForKey(document, 'gridType') || 8) + 'pt Grid'
	  },
	  (err, value) => {
	    if (err) {
	      // most likely the user canceled the input
	      return
	    }

	    let point_value = value.split('pt Grid')[0]
	    Settings.setDocumentSettingForKey(document, 'gridType', point_value || 8);
	  }
	)
}