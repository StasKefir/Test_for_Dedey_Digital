$(document).ready(function () {

    let dropZone = $('#dropZone'),
        maxFileSize = 10485760; // максимальный размер фалйа - 10 мб.

    // Проверка поддержки браузером
    if (typeof (window.FileReader) == 'undefined') {
        dropZone.attr("placeholder", "Не поддерживается браузером!");
        dropZone.addClass('error');
    }

    // Добавляем класс hover при наведении
    dropZone[0].ondragover = function () {
        dropZone.addClass('hover');
        return false;
    };

    // Убираем класс hover
    dropZone[0].ondragleave = function () {
        dropZone.removeClass('hover');
        return false;
    };


    let result;
    function handleDrop(e) {
        e.stopPropagation();
        e.preventDefault();
        let files = e.dataTransfer.files,
            f = files[0];
        if (f.size > maxFileSize) {
            dropZone.attr("placeholder", "Допустимый размер файла 10мб, выберите другой файл!");
            dropZone.addClass('error');
            return false;
        }

        let ext = f.name.split('.').pop().toLowerCase();
        if ($.inArray(ext, ['xls', 'xlsx']) == -1) {
            dropZone.attr("placeholder", "Не допустимый формат файла" + " \"\ " + ext + " \"\ " + ", выберите другой файл");
            dropZone.removeClass('drop');
            dropZone.addClass('error');
            return false;
        }
        dropZone.attr("placeholder", "Файл-" + f.name);
        dropZone.addClass('drop');
        
        let reader = new FileReader();
        reader.onload = function (e) {
            let data = new Uint8Array(e.target.result);
            let workbook = XLSX.read(data, {
                type: 'array'
            });
            let keys = Object.keys(workbook.Sheets);
            let jsonObj = XLSX.utils.sheet_to_json(workbook.Sheets[keys[0]]);
            result={resultArray: jsonObj};
            console.log(jsonObj);
        };
        reader.readAsArrayBuffer(f);


        $.ajax({
            url: "http://193.243.158.230:4500/api/import",
            headers: {
                "Authorization":"test-task",
                "Content-Type":"application/json"
            },
            method: "POST",
            dataType: "json",
            data: {
                "resultArray":result
            },
            success: function(data){
              console.log("succes: "+data);
            }
          });

    }

    dropZone[0].addEventListener('drop', handleDrop, false);
 
});