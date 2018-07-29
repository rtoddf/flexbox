var photoSource = 'photos'

var Grid = new function(){
	this.data = function(row){
		thisRow = row
		rowId = $(row).attr('id')
		columnLimits = parseInt($(row).attr('data-columnLimit'))
		rowLimits = parseInt($(row).attr('data-rowLimit'))
		rowLayout = $(row).attr('data-layout')
		nums = $(row).attr('data-nums')

		Grid.getImages(row, rowId, columnLimits, rowLimits, rowLayout, nums)
	}

	this.getImages = function(thisRow, id, col, row, layout, nums){
		$.getJSON('data/' + photoSource + '.json', function(data){
			Grid.setUp(data, thisRow, id, col, row, layout, nums)
		})
	}

	this.setUp = function(photos, thisRow, rowId, columnLimits, rowLimits, rowLayout, nums){
		// photos.sort(function() { return 0.5 - Math.random() });

		

		var totalPh = 0;
		nums = nums.split('/');

		for(i=0; i<nums.length; i++) {
			console.log('nums: ', nums[i])

			totalPh += parseInt(nums[i])
		}
		console.log('totalPh: ', totalPh)

		for(var i=0; i < totalPh; i++){
			$(thisRow).append( _.template(template_raw, { members: photos[i] }) )

			// this gets rid of dupes, but it needs to be global
			// photos = jQuery.grep(photos, function(value) {
			// 	return value != photos[i];
			// });
		}

		if(rowLimits != 1){
			var divs = $('#' + rowId + '>.flex-item')

			// console.log('rowLayoutVals: ', rowLayoutVals)
			console.log('rowLayout: ', rowLayout)
			var rowLayoutVals = rowLayout.split('/');

			for(i=0, j=0; i<divs.length, j<rowLayoutVals.length; i+=rowLimits, j++) {
				
				console.log('j: ', rowLayoutVals[j])

				divs.slice(i, i+rowLimits).wrapAll('<div class="flex-item ' + rowLayoutVals[j] + '"></div>');
			}
		}
	}
}

var template_raw = '<div class="flex-item<% if(rowLimits == 1){ %> col-single<% } %>"> \
	<div class="tile"> \
		<div class="image-holder"> \
			<img src="images/<%= members.image %>" alt="<%= members.name %>"" name="<%= members.name %>""> \
		</div> \
		<div class="content-holder"> \
			<h4><%= members.name %></h4> \
		</div> \
	</div> \
</div>'

$(document).ready(function(){
	$.getJSON('data/grid02.json', function(data){
		$.each(data, function(i, m){
			var newRow = '<div id="row-' + (i+1) + '" class="flex-row" data-columnLimit="' + m.columns + '" data-rowLimit="' + m.rows + '" data-layout="' + m.layout + '" data-nums="' + m.nums +'">'
			$('.flex-container').append(newRow)
		})

		$.each($('.flex-row'), function(i, newRow){
			Grid.data(newRow)
		})
	})	
})