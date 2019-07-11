(function( $ ){
    $.fn.calendar = function() {
        var date = new Date();
        var now_year = 0;
        var now_month = 0;
        var now_date = 0;

        this.each(function(key, elem) {
            var calendar = $(elem);
            now_year = date.getFullYear();
            now_month = date.getMonth();
            now_date = date.getDate();
            buldCalendar(now_year, now_month);

            calendar.find(".calendar__month_preview").click( function() {
                monthShift(-1);
            });

            calendar.find(".calendar__month_next").click( function() {
                monthShift(1);
            });


            function monthShift(direction) {
                date.setMonth(date.getMonth() + direction);
                var real_date = new Date();
                now_year = date.getFullYear();
                now_month = date.getMonth();
                if(now_year === real_date.getFullYear() &&  now_month === real_date.getMonth()) {
                    now_date = real_date.getDate();
                }
                if(now_year <= real_date.getFullYear() && now_month < real_date.getMonth()) {
                    now_date = 32;
                }
                if(now_year >= real_date.getFullYear() && now_month > real_date.getMonth()) {
                    now_date = 0;
                }
                buldCalendar(now_year, now_month);
            }

            function createCol(row, number, is_disabled, is_weekend) {
                var className = "";
                // calendar__col_disallow = 0
                // calendar__col_weekend  = 1
                if(is_disabled) {
                    className = "calendar__col_disallow";
                }
                if(is_weekend) {
                    className += " calendar__col_weekend";
                }
                row.append('<div class="calendar__col '+className+'">'+number+'</div>');
            }

            function createRow() {
                var element = document.createElement("div");
                element.className = "calendar__week-row";
                calendar.find(".calendar__weeks").append(element);
                return $(element);
            }

            function dateToMonthStr(month) {
                monthA = 'январь,февраль,март,апрель,май,июнь,июль,август,сентябрь,октябрь,ноябрь,декабрь'.split(',');
                return monthA[month];
            }

            function buldCalendar(y, m) {
                var date = new Date(y, m);

                calendar.find(".calendar__weeks").html("");
                calendar.find(".calendar__now-my").html(dateToMonthStr(date.getMonth()) +" "+ date.getFullYear());


                // Определения начала дня месяца, добавления пустых ячеек
                var start_week_day = date.getDay();
                if(start_week_day === 0 ) {
                    start_week_day = 7
                }
                start_week_day = start_week_day - 1;

                var row = "";
                // Показываем дни, запрещаая прошлые
                var colBusy = 0;
                while(date.getMonth() === m ) { // || colBusy !== 0
                    var num_date = date.getDate();
                    //console.log(date.getDate());
                    // В строке 7 ячеек (в неделе 7 дней)
                    if(colBusy === 0) {
                        row = createRow(); // Создаём строку и определяем её контекст
                    }
                    if(colBusy < 6) {
                        colBusy++;
                    } else {
                        colBusy = 0;
                    }
                    if(start_week_day !== 0) {
                        createCol(row,"", 0);
                        start_week_day = start_week_day - 1;
                    } else {
                        var is_disabled = false;
                        var is_weekend = false;

                        if(date.getDate() < now_date) {
                            is_disabled = true;
                        }

                        if(date.getDay() === 0 || date.getDay() === 6) {
                            is_weekend = true;
                        }

                        createCol(row, date.getDate(), is_disabled, is_weekend);
                        date.setDate(date.getDate()+1);
                    }
                }
            }
        });
    };
})( jQuery );