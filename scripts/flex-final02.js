var photoSource = 'photos'

var Grid = new function(){
	this.data = function(row){
		thisRow = row
		rowId = $(row).attr('id')
		columnLimits = parseInt($(row).attr('data-columnLimit'))
		rowLimits = parseInt($(row).attr('data-rowLimit'))

		Grid.getImages(row, rowId, columnLimits, rowLimits)
	}

	this.getImages = function(thisRow, id, col, row){
		$.getJSON('../data/' + photoSource + '.json', function(data){
			Grid.setUp(data, thisRow, id, col, row)
		})
	}

	this.setUp = function(photos, thisRow, rowId, columnLimits, rowLimits){
		photos.sort(function() { return 0.5 - Math.random() });

		for(var i=0; i < (columnLimits*rowLimits); i++){
			$(thisRow).append( _.template(template_raw, { members: photos[i] }) )

			// this gets rid of dupes, but it needs to be global
			// photos = jQuery.grep(photos, function(value) {
			// 	return value != photos[i];
			// });
		}

		if(rowLimits != 1){
			var divs = $('#' + rowId + '>.flex-item')

			for(var i = 0; i < divs.length; i+=rowLimits) {
				divs.slice(i, i+rowLimits).wrapAll('<div class="flex-item" data-layout="column"></div>');
			}
		}
	}
}

var template_raw = '<div class="flex-item" data-image-layout="square"> \
	<div class="tile"> \
		<div class="image-holder"> \
			<img src="../../images/<%= members.image %>" alt="<%= members.name %>"" name="<%= members.name %>""> \
		</div> \
		<div class="content-holder"> \
			<h4><%= members.name %></h4> \
		</div> \
	</div> \
</div>'

$(document).ready(function(){
	$.getJSON('../data/grid.json', function(data){
		$.each(data, function(i, m){
			var newRow = '<div id="row-' + (i+1) + '" class="flex-row" data-columnLimit="' + m.columns + '" data-rowLimit="' + m.rows + '" data-margin="0">'
			$('.flex-container').append(newRow)
		})

		$.each($('.flex-row'), function(i, newRow){
			Grid.data(newRow)
		})
	})	
})