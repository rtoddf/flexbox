var photoSource = 'photos',
	columnLimit = parseInt($('.grid').attr('data-columnLimit')),
	rowLimit = parseInt($('.grid').attr('data-rowLimit')),
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
			$('.grid').append( _.template(template_raw, { members: photos[i] }) )
		}

		if(rowLimit != 1){
			divs = $('.grid>div')

			for(var i = 0; i < divs.length; i+=rowLimit) {
				divs.slice(i, i+rowLimit).wrapAll('<div data-layout="column"></div>');
			}
		}
	}
}

var template_raw = '<div class="flex-item" data-image-layout="square"> \
	<div class="tile"> \
		<figure> \
			<img src="../../images/<%= members.image %>" alt="<%= members.name %>"" name="<%= members.name %>""> \
		</figure> \
		<div class="content-holder"> \
			<h4><%= members.name %></h4> \
		</div> \
	</div> \
</div>'

$(document).ready(function(){
	Grid.getImages()
})