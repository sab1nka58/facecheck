async function loadSidebar() {
    try {
        const response = await fetch('sidebar.html');
        const sidebarHTML = await response.text();
        document.getElementById('sidebar-container').innerHTML = sidebarHTML;
        highlightActiveLink();
    } catch (error) {
        console.error('Ошибка загрузки сайдбара:', error);
    }
}

async function loadHeader() {
    try {
        const response = await fetch('header.html');
        const headerHTML = await response.text();
        document.getElementById('header-container').innerHTML = headerHTML;
    } catch (error) {
        console.error('Ошибка загрузки хедера:', error);
    }
}

function highlightActiveLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.sidebar > a, .sidebar__wrap > a');

    links.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    const supportLink = document.querySelector('.support a');
    if (supportLink) {
        const supportPath = supportLink.getAttribute('href');
        if (supportPath === currentPath) {
            supportLink.classList.add('active');
        } else {
            supportLink.classList.remove('active');
        }
    }
}

function updateDateRange() {
    const date = new Date();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    // Первый и последний день текущего месяца
    const firstDay = `${month} 1, ${year}`;
    const lastDayOfMonth = new Date(year, date.getMonth() + 1, 0).getDate();
    const lastDay = `${month} ${lastDayOfMonth}, ${year}`;

    // Вставляем диапазон дат в элемент с id="date-range"
    const dateRangeElement = document.getElementById('date-range');
    if (dateRangeElement) {
        dateRangeElement.innerHTML = `${firstDay} - ${lastDay}`;
    }
}

// Загружаем сайдбар, хедер и обновляем дату при загрузке страницы
window.onload = async () => {
    await loadHeader();
    await loadSidebar();
    updateDateRange();
};