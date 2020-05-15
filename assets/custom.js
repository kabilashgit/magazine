// window.addEventListener('load', function() {
//     document.querySelector('input[type="file"]').addEventListener('change', function() {
//         if (this.files && this.files[0]) {
//             let img = document.querySelector('img');  // $('img')[0]
//             img.src = URL.createObjectURL(this.files[0]); // set src to blob url
//             img.onload = imageIsLoaded;
//         }
//     });
// });
//
// function imageIsLoaded() {
//     alert(this.src);  // blob url
//     // update width and height ...
// }




$(function () {
    let $uploadedImg = '#uploadedImg';

    $('input[type="file"]').val('');
    $('input[type="file"]').on('change', function (e) {

        // console.log($(this));
        readURL(this);
    });

    $('input[name="radioInput"]').on('click', function (e) {
        let selectedRadio = $(this).val();
        if(selectedRadio === 'sepia') {
            $($uploadedImg).css('filter', 'sepia(1)');
        }else if(selectedRadio === 'greyscale') {
            $($uploadedImg).css('filter', 'grayscale(1)');
        }else if($('#fitImage').is(':checked')) {
            console.log('fit')
            $($uploadedImg).css('object-fit', 'contain')

        }else if($('#fillImage').is(':checked')) {
            console.log('fit')
            $($uploadedImg).css('object-fit', 'cover');
        }else {
            $($uploadedImg).css('filter', 'none');
        }
    });

    $('#scale').on('input', function () {
        let value = $(this).val();
        $('#uploadedImg').css('transform', 'scale('+value+')');

    });

    $('#brightness').on('input', function () {
        let value = $(this).val();
        if($('#sepiaInput').is(':checked')) {
            $($uploadedImg).css('filter', 'sepia(1) brightness('+value+'%)');
        }else if($('#greyScale').is(':checked')) {
            $($uploadedImg).css('filter', 'grayscale(1) brightness('+value+'%)');
        }else {
            $($uploadedImg).css('filter', 'brightness('+value+'%)');
        }

    });

    $('#contrast').on('input', function () {
        let value = $(this).val();
        if($('#sepiaInput').is(':checked')) {
            $($uploadedImg).css('filter', 'sepia(1) contrast('+value+'%)');
        }else if($('#greyScale').is(':checked')) {
            $($uploadedImg).css('filter', 'grayscale(1) contrast('+value+'%)');
        }else {
            $($uploadedImg).css('filter', 'contrast('+value+'%)');
        }

    });

    $('#saturation').on('input', function () {
        let value = $(this).val();
        if($('#sepiaInput').is(':checked')) {
            $($uploadedImg).css('filter', 'sepia(1) saturate('+value+'%)');
        }else if($('#greyScale').is(':checked')) {
            $($uploadedImg).css('filter', 'grayscale(1) saturate('+value+'%)');
        }else {
            $($uploadedImg).css('filter', 'saturate('+value+'%)');
        }

    });


    $('input[type="checkbox"]').on('click', function () {
        let $value = $(this);
        let $closeElem = $value.parent().parent().parent().find('input[type="range"]');
        if($(this).val() === 'off') {
            $value.val('on');
            $closeElem.attr('disabled', false)
        }else  {
            $value.val('off');
            $closeElem.attr('disabled', true)
        }

    });

    $('#btnDownload').on('click', function () {
        let capture = document.querySelector('#bg_area');
        html2canvas(capture,{
            scale: 3
        }).then(canvas => {
            saveAs(canvas.toDataURL(), 'file-name.png');
            resetSrc();
        });
    });


    function resetSrc() {
        document.getElementById('uploadedImg').src = '';
    }
    function saveAs(uri, filename) {

        let link = document.createElement('a');

        if (typeof link.download === 'string') {

            link.href = uri;
            link.download = filename;

            //Firefox requires the link to be in the body
            document.body.appendChild(link);

            //simulate click
            link.click();

            //remove the link when done
            document.body.removeChild(link);

        } else {

            window.open(uri);

        }
    }






    function readURL(input) {
        if (input.files && input.files[0]) {
            let reader = new FileReader();

            reader.onload = function (e) {

                $($uploadedImg).attr('src', e.target.result);

            };

            reader.readAsDataURL(input.files[0]);
        }
    }
});


