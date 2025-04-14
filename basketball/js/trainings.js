// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.mobile-menu-toggle').addEventListener('click', () => {
        document.querySelector('nav ul').classList.toggle('active');
    });
    
    // Calendar functionality
    const calendarDays = document.getElementById('calendarDays');
    const currentMonthElement = document.getElementById('currentMonth');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    
    let currentDate = new Date();
    
    
    // Events data
    const events = [
        { date: new Date(2025, 3, 15), title: 'Freshman Welcome Session' },
        { date: new Date(2025, 3, 18), title: 'Friendly Match' },
        { date: new Date(2025, 3, 25), title: '3-on-3 Tournament' },
        { date: new Date(2025, 4, 5), title: 'Skills Workshop' },
        { date: new Date(2025, 4, 12), title: 'End of Season Party' },
        { date: new Date(2025, 4, 20), title: 'Summer Training Camp' },
        { date: new Date(2025, 5, 1), title: 'Team Building Retreat' },
        { date: new Date(2025, 5, 10), title: 'Charity Match' },
        { date: new Date(2025, 5, 15), title: 'Annual Awards Night' }
        // TODO: Integrate with backend to fetch events dynamically
    ];
    
    function renderCalendar() {
        calendarDays.innerHTML = '';
        
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        currentMonthElement.textContent = new Date(year, month, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        
        const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0-6
        const daysInMonth = new Date(year, month + 1, 0).getDate(); // Last day of month
        
        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.classList.add('day', 'empty');
            calendarDays.appendChild(emptyDay);
        }
        
        // Add cells for each day of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('day');
            dayElement.textContent = day;
            
            // Check if there's an event on this day
            const currentDay = new Date(year, month, day);
            const hasEvent = events.some(event => 
                event.date.getDate() === currentDay.getDate() &&
                event.date.getMonth() === currentDay.getMonth() &&
                event.date.getFullYear() === currentDay.getFullYear()
            );
            
            if (hasEvent) {
                dayElement.classList.add('has-event');
            }
            
            // Highlight today
            if (day === 14 && month === 3 && year === 2025) {
                dayElement.classList.add('today');
            }
            
            calendarDays.appendChild(dayElement);
        }
    }
    
    prevMonthBtn.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });
    
    nextMonthBtn.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });
    
    renderCalendar();
});