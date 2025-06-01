
        const monthYear = document.getElementById('monthYear');
        const calendarGrid = document.getElementById('calendarGrid');
        const prevMonthBtn = document.getElementById('prevMonth');
        const nextMonthBtn = document.getElementById('nextMonth');
        const addEventBtn = document.getElementById('addEventBtn');
        const eventModal = document.getElementById('eventModal');
        const eventNameInput = document.getElementById('eventName');
        const eventDateInput = document.getElementById('eventDate');
        const eventDurationInput = document.getElementById('eventDuration');
        const eventColorInput = document.getElementById('eventColor');

        let currentDate = new Date(2020, 8); // September 2020
        let events = [
            { name: "Anna's Birthday", date: "2020-09-08", duration: "3h", color: "purple" },
            { name: "Presentation of the ne...", date: "2020-09-16", duration: "2h", color: "blue" },
            { name: "Ray's Birthday", date: "2020-09-28", duration: "3h", color: "purple" }
        ];

        function renderCalendar() {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            const firstDay = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

            monthYear.textContent = `${currentDate.toLocaleString('default', { month: 'long' })}, ${year}`;
            calendarGrid.innerHTML = '';

            // Добавляем заголовки дней недели
                // dayNames.forEach(day => {
                //     const dayHeader = document.createElement('div');
                //     dayHeader.className = 'calendar-day header';
                //     dayHeader.textContent = day;
                //     calendarGrid.appendChild(dayHeader);
                // });

            // Добавляем пустые ячейки до первого дня месяца
            for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
                const emptyDay = document.createElement('div');
                emptyDay.className = 'calendar-day empty';
                calendarGrid.appendChild(emptyDay);
            }

            // Добавляем дни текущего месяца
            for (let day = 1; day <= daysInMonth; day++) {
                const dayDiv = document.createElement('div');
                dayDiv.className = 'calendar-day';
                const dayNumber = document.createElement('span');
                dayNumber.textContent = day;
                dayDiv.appendChild(dayNumber);

                const eventDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const dayEvents = events.filter(event => event.date === eventDate);
                dayEvents.forEach(event => {
                    const eventDiv = document.createElement('div');
                    eventDiv.className = `event ${event.color === 'blue' ? 'yellow' : ''}`;
                    eventDiv.innerHTML = `<span>${event.duration}</span> ${event.name}`;
                    if (event.color === 'blue') {
                        eventDiv.style.borderLeftColor = '#007bff';
                    }
                    dayDiv.appendChild(eventDiv);
                });

                calendarGrid.appendChild(dayDiv);
            }

            // Определяем, сколько ячеек осталось до конца последней недели
            const totalCells = calendarGrid.children.length;
            const remainingCells = (7 - (totalCells % 7)) % 7;
            if (remainingCells > 0) {
                for (let day = 1; day <= remainingCells; day++) {
                    const nextMonthDay = document.createElement('div');
                    nextMonthDay.className = 'calendar-day next-month';
                    const dayNumber = document.createElement('span');
                    dayNumber.textContent = day;
                    nextMonthDay.appendChild(dayNumber);
                    calendarGrid.appendChild(nextMonthDay);
                }
            }
        }

        prevMonthBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
        });

        nextMonthBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
        });

        addEventBtn.addEventListener('click', () => {
            eventModal.style.display = 'flex';
            eventNameInput.value = '';
            eventDateInput.value = '';
            eventDurationInput.value = '';
        });

        function closeModal() {
            eventModal.style.display = 'none';
        }

        function saveEvent() {
            const name = eventNameInput.value;
            const date = eventDateInput.value;
            const duration = eventDurationInput.value;
            const color = eventColorInput.value;

            if (name && date && duration) {
                events.push({ name, date, duration, color });
                closeModal();
                renderCalendar();
            } else {
                alert('Please fill in all fields');
            }
        }

        renderCalendar();
  