$(document).ready(function(){
	var canvas = document.getElementById('baseLayer'),
	context = canvas.getContext('2d');

 	function loadImage() {
        var input, file, fr, img;

        if (typeof window.FileReader !== 'function') {
            alert("The file API isn't supported on this browser yet.");
            return;
        }

        input = document.getElementById('selectSs');

        if (!input) {
            alert("Um, couldn't find the imgfile element.");
        }
        else if (!input.files) {
            alert("This browser doesn't seem to support the `files` property of file inputs.");
        }
        else if (!input.files[0]) {
            alert("Please select a file");
        }
        else {
            file = input.files[0];
            fr = new FileReader();
            fr.onload = createImage;
            fr.readAsDataURL(file);
        }
        function createImage() {
            overlayImg = new Image();
            
            overlayImg.onload = imageLoaded;
            overlayImg.src = fr.result;
        }
        function imageLoaded() {
            context.drawImage(overlayImg, 0, 0, overlayImg.width, overlayImg.height, 168, 167, 260, 150);
            $("#download").removeClass("disabled");
        }
    }


	function make_base(){
	  	base_image = new Image();
	  	base_image.src = 'image/imgx1.png';

    	$("#selectSs").change(function(){
        	loadImage();
    	});

	  	base_image.onload = function(){
	    	context.drawImage(base_image, 0, 0, base_image.width, base_image.height, 0, 0, canvas.width, canvas.height);
		}
	}

	make_base();

	function downloadCanvas(link, canvasId, filename) {
	    link.href = document.getElementById(canvasId).toDataURL();
	    link.download = filename;
	}

	document.getElementById('download').addEventListener('click', function() {
	    downloadCanvas(this, 'baseLayer', 'mockup.png');
	}, false);

})