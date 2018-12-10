var photoSource = 'photos',
	columnLimit = parseInt($('.flex-row').attr('data-columnLimit')),
	rowLimit = parseInt($('.flex-row').attr('data-rowLimit')),
	divs

var Grid = new function(){
	this.getImages = function(){
		$.getJSON('../data/' + photoSource + '.json', function(data){
			Grid.setUp(data)
		})
	}

	this.setUp = function(photos){
		photos.sort(function() { return 0.5 - Math.random() });

		for(var i=0; i < (columnLimit*rowLimit); i++){
			$('.flex-row').append( _.template(template_raw, { members: photos[i] }) )
		}

		if(rowLimit != 1){
			divs = $('.flex-row>.flex-item')

			for(var i = 0; i < divs.length; i+=rowLimit) {
				divs.slice(i, i+rowLimit).wrapAll('<div class="flex-item" data-layout="column"></div>');
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
	Grid.getImages()
})