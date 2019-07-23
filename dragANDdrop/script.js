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




    function handleDrop(e) {
        e.stopPropagation();
        e.preventDefault();
        let files = e.dataTransfer.files,
            f = files[0];
        /////////////////////////////////////////////
        if (f.size > maxFileSize) {
            dropZone.attr("placeholder", "Допустимый размер файла 10мб, выберите другой файл!");
            // dropZone.removeClass('drop');
            dropZone.addClass('error');
            return false;
        }
        ///////////////////////////////////////////////////
        let ext = f.name.split('.').pop().toLowerCase();
        if ($.inArray(ext, ['xls', 'xlsx']) == -1) {
            dropZone.attr("placeholder", "Не допустимый формат файла" + " \"\ " + ext + " \"\ " + ", выберите другой файл");
            dropZone.removeClass('drop');
            dropZone.addClass('error');
            return false;
        }
        dropZone.attr("placeholder", "Файл-" + f.name);
        dropZone.addClass('drop');
        //////////////////////////////////////////////////// 


        let resultArray;
        let reader = new FileReader();
        reader.onload = function (e) {
            let data = new Uint8Array(e.target.result);
            let workbook = XLSX.read(data, {
                type: 'array'
            });
            let keys = Object.keys(workbook.Sheets);
            let jsonObj = XLSX.utils.sheet_to_json(workbook.Sheets[keys[0]]);
            // resultArray= jsonObj;
            console.log(jsonObj);
        };
        reader.readAsArrayBuffer(f);


        // let formData = new FormData();
        // formData.append("file", arrObjs);
        // // отослать
        // let xhr = new XMLHttpRequest();

        // xhr.open("POST", "http://193.243.158.230:4500/api/import", true);
        // xhr.setRequestHeader('Authorization', 'test-task');
        // if (this.status != 200) {
        //     // обработать ошибку
        //     console.log(xhr.status);
        //     // alert( 'ошибка: ' + (this.status ? this.statusText : 'запрос не удался') );
        //     return;
        //   }
        //   console.log(xhr.status);
        // xhr.send(formData);
        // console.log(xhr.status);

        // const obj = {resultArray};
        // $.ajax({
            
        //     type: "POST",
        //     url: "http://193.243.158.230:4500/api/import",
        //     crossDomain:true,
        //     headers: {
        //         "Authorization": "test-task"
        //     },
        //     data: JSON.stringify(obj),
        //     success: function(msg){
        //     //   alert( "Прибыли данные: "+msg );
        //     console.log(msg);
        //     }
        //   });
           
       
    ////////

    dropZone[0].addEventListener('drop', handleDrop, false);}

    const send = () => {
        const data = {
               resultArray: [
                    {
                       number: 1, letter: 'a', color: 'blue', __nowNum__: 1
                    },
                    {
                        number: 2, letter: 'b', color: 'green', __nowNum__: 2
                    },
                    {
                        number: 3, letter: 'c', color: 'yellow', __nowNum__: 3
                    }
               ]};
    
        fetch('http://193.243.158.230:4500/api/import', {
            method: 'POST',
            headers: {
                'Authorization': 'test-task',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(arr => console.log(arr));
    };
    
    send();
});