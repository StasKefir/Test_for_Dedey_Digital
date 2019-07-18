window.addEventListener('load', function () {

    let arrowsUp = this.document.querySelectorAll(".arr-up"),
        arrowsDown = this.document.querySelectorAll(".arr-down"),
        arrInput = this.document.querySelectorAll(".hotel-rooms-input");
        


    arrowsUp.forEach(function (item) {
        item.addEventListener("click", function (event) {
            let target = event.target;
            for (let i = 0; i < arrowsUp.length; i++) {
                if (target == arrowsUp[i]) {
                    let inputValue = +arrInput[i].value;
                    arrInput[i].value = inputValue + 1;
                    arrowsDown[i].classList.add("gold");
                }
            }
        });
    });

    arrowsDown.forEach(function (item) {
        item.addEventListener("click", function (event) {
           
                let target = event.target;
                for (let i = 0; i < arrowsDown.length; i++) {
                    if (arrInput[i].value == 0) {} else {
                    if (target == arrowsDown[i]) {
                        let inputValue = +arrInput[i].value;
                        arrInput[i].value = inputValue - 1;
                        if (arrInput[i].value == 0) {
                            arrowsDown[i].classList.remove("gold");
                        }
                    }
                }
            }
        });
    });

   
    setDate();
});

function setDate(){
    let d = new Date(),
        day = d.getDate(),
        months= d.getMonth(),
        nameMonth="",
        dateInput = this.document.querySelectorAll(".date");

    switch(months) {
        case 0:
            nameMonth = "Января";
        break;
        case 1:
            nameMonth = "Февраля";
        break;
        case 2:
            nameMonth = "Марта";
        break;
        case 3:
            nameMonth = "Апреля";
        break;
        case 4:
            nameMonth = "Мая";
        break;
        case 5:
            nameMonth = "Июня";
        break;
        case 6:
            nameMonth = "Июля";
        break;
        case 7:
            nameMonth = "Августа";
        break;
        case 8:
            nameMonth = "Сентябра";
        break;
        case 9:
            nameMonth = "Октября";
        break;
        case 10:
            nameMonth = "Ноября";
        break;
        case 11:
            nameMonth = "Декабря";
        break;
        default: nameMonth = "Мая";
    }

    if(day<10){
        dateInput[0].value = ("0"+day)+" "+nameMonth;
        dateInput[1].value = ("0"+(+day +7))+" "+nameMonth;
    } else {
        dateInput[0].value = day+ " "+nameMonth;
        dateInput[1].value = (+day +7)+ " "+nameMonth;
    }
   
    // console.log(d);
    // console.log(day);
    // console.log(months);
    // console.log(nameMonth);
    // console.log(+day);
    
}