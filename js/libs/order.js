document.addEventListener("DOMContentLoaded",
    function () {
        var lastStep = 2;
        var step = 0;
        var start_date = new Date();
        var date = start_date.getFullYear() + "-" + (+start_date.getMonth() + 1) + "-" + start_date.getDate();

        updateControls();
        request(date, 23);

        $('.steps-form #js-click-form-next').click(function () {
            step++;
            $('.steps-form .step-form.active').removeClass('active');
            $('.steps-form .step-form.step-' + step).addClass('active');
            updateControls();
        });

        $('.steps-form #js-click-form-back').click(function () {
            step--;
            $('.steps-form .step-form.active').removeClass('active');
            $('.steps-form .step-form.step-' + step).addClass('active');
            updateControls();
        });


        function updateControls() {
            if (lastStep === step) {
                $('.steps-form #js-click-form-next').hide();
                $('.steps-form #js-click-form-back').show();
            }
            if (lastStep > step) {
                $('.steps-form #js-click-form-next').show();
                $('.steps-form #js-click-form-back').show();
            }
            if (0 === step) {
                $('.steps-form #js-click-form-back').hide();
                $('.steps-form #js-click-form-next').show();
            }
        }


        var picker = $('#datePicker').datetimepicker({
            date: new Date(),
            viewMode: 'YMD',
            firstDayOfWeek: 1,
            language: 'ru',
            onDateChange: function () {
                var d = this.getValue();
                if (d) {
                    date = d.getFullYear() + "-" + (+d.getMonth() + 1) + "-" + d.getDate();
                    getTimeTable();
                } else {
                    reset();
                }
            },
            onClose: function () {
                this.element.remove();
            }
        });


        //new SimpleBar($("#time-table")[0]);
        var nowDay = [];
        var currentTime = "";
        reset();

        /* $('#sauna_currnt').change(function(){
             getTimeTable();
         });*/

        $('#current-sauna-id').change(function () {
            console.log('current-sauna-id')
            getTimeTable();
        });

        function getTimeTable() {
            /*var sauna = $("#sauna_currnt").val();*/
           var sauna = $("#current-sauna-id").val();

            reset();

            request(date, sauna);
        }

        function request(date, sauna) {
            $.ajax({
                url: '/wp-admin/admin-ajax.php',
                type: 'POST',
                data: 'action=getFreeOnThisDay&date=' + date + '&sauna=' + sauna,
                beforeSend: function (xhr) {
                    //console.log('Загрузка, 5 сек...');
                },
                success: function (data) {
                    //console.log( data );
                    nowDay = JSON.parse(data);
                    updateTimeTable(JSON.parse(data));
                }
            });
        }


        var clickTimeTableNum = 0;
        var hors = 0;

        $('#time-table').on('click', '.time-table__row.allowed', function () {

            if (clickTimeTableNum === 0) {
                clickTimeTableNum = 1;
                $('#time-table .time-table__row.current').removeClass('current');
                $(this).addClass('current');
                currentTime = +$(this).attr('data-time');
                //console.log("Ta", currentTime);
            } else {
                clickTimeTableNum = 0;
                $(this).addClass('current');
                var timeB = +$(this).attr('data-time');
                //console.log("Tb", timeB);

                if (currentTime < timeB) {
                    var cacheTime = currentTime;
                    currentTime = timeB;
                    timeB = cacheTime;
                }

                hors = currentTime - timeB;

                // Нормализуем, если сначала указали конечное время
                if (hors < 0) {
                    hors *= -1;
                }
                hors += 1;

                for (var i = timeB + 1; i <= currentTime; i++) {
                    $('#time-table .time-table__row').eq(i).addClass('current');
                }

                console.log("Заказано на :" + hors, "c " + timeB, "по  " + currentTime);

                currentTime = timeB;

                $('#view-name').show();
            }

        });

        $("#js-do-order").click(function () {
            //var date = $('#dateVisit').val();
            var sauna = $("#sauna_currnt").val();
            var hours = hors;

            var name = $("#input-name").val();
            var phone = $("#input-phone").val();

            if (date != "" && name != "" && phone != "") {
                $.ajax({
                    url: '/wp-admin/admin-ajax.php',
                    type: 'POST',
                    data: 'action=addOrder&date=' + date + '&sauna=' + sauna + '&currentTime=' + currentTime + "&hours=" + hours + "&phone=" + phone + "&name=" + name,
                    beforeSend: function (xhr) {
                        //console.log('Загрузка, 5 сек...');
                    },
                    success: function (data) {
                        var result = JSON.parse(data);
                        if (result.ok === 1) {


                            var stepform = $('.steps-form');
                            $(stepform).find('.step-form.active').removeClass('active');
                            $('.steps-form #js-click-form-next').hide();
                            $('.steps-form #js-click-form-back').hide();

                            $(stepform).find('.step-form.step-final').addClass('active');
                        } else {
                            alert("Возникла ошибка:" + result.e);
                            console.log(currentTime, date, name, phone, result);
                        }
                    }
                });
            } else {
                alert("Проверьте правильность ввода данных.");
                console.log(currentTime, date, name, phone);
            }
        });

        function reset() {
            currentTime = "";
            nowDay = [];
            $('#time-table').hide();
            $('#view-name').hide();
            $('#js-errore-msg').html("");
        }

        function updateTimeTable(array) {
            $('#time-table').show();
            //var tt = $("#time-table .simplebar-content");
            var tt = $("#time-table");
            if (!array.e) {

                tt.html("");
                for (var i = 0; array.length > i; i++) {
                    var classDiv = "allowed";
                    var text = "Свободно";
                    var time = i;

                    if (i === 24) {
                        tt.append("<div class='time-table__row newday'>Следующий день</div>");
                    }
                    if (time > 23) {
                        time = i - 24;

                    }

                    if (!array[i]) {
                        var classDiv = "denay";
                        var text = "Занято";
                    }
                    /* tt.append("<div data-time='"+i+"' class='time-table__row "+classDiv+"'><span>"+time+":00</span><span>"+text+"</span></div>"); */
                    tt.append("<div data-time='" + i + "' class='time-table__row " + classDiv + "'><span>" + time + ":00</span></div>");
                }
            } else {
                tt.html("<div class='time-table__row error'>" + array.e + "</div>");
            }
        }
    }
);