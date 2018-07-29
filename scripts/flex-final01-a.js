// var photoSource = getUrlParameter('source') !== undefined ? getUrlParameter('source') : 'photos'
var photoSource = 'photos'
var columnLimit = $('.flex-row').attr('data-columnLimit')
var rowLimit = $('.flex-row').attr('data-rowLimit')

var Grid = new function(){
	this.getImages = function(){
		$.getJSON('data/' + photoSource + '.json', function(data){
			var photos = data
			Grid.setUp(photos)
		})
	}

	this.setUp = function(photos){
		var template_compiled = _.template(template_raw, {
			members: photos
		})

		$('.flex-row').html(template_compiled)
	}
}


var template_raw = '<% for (var i = 0; i < (columnLimit * rowLimit); i++){ %> \
	<div class="flex-item <% if(rowLimit == 1){ %> col-single<% } %>" data-image-layout="square"> \
		<div class="tile"> \
			<div class="image-holder"> \
				<img src="images/<%= members[i].image %>" alt="<%= members[i].name %>"" name="<%= members[i].name %>""> \
			</div> \
			<div class="content-holder"> \
				<h4><%= members[i].name %></h4> \
			</div> \
		</div> \
	</div> \
<% } %>'



$(document).ready(function(){
	Grid.getImages()
})