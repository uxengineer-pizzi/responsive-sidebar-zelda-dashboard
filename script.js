const toggleDropdown = (dropdown, menu, isOpen) => {
  dropdown.classList.toggle('sidebar__item--dropdown--open', isOpen);
  menu.style.height = isOpen ? `${menu.scrollHeight}px` : 0;
};

const closeAllDropdowns = () => {
  const openDropdowns = document.querySelectorAll(
    '.sidebar__item--dropdown--open',
  );
  for (const openDropdown of openDropdowns) {
    const menu = openDropdown.querySelector('.sidebar__dropdown-menu');
    toggleDropdown(openDropdown, menu, false);
  }
};

const dropdownToggles = document.querySelectorAll('.sidebar__dropdown-toggle');
for (const dropdownToggle of dropdownToggles) {
  dropdownToggle.addEventListener('click', (e) => {
    e.preventDefault();
    const dropdown = dropdownToggle.closest('.sidebar__item--dropdown');
    const menu = dropdown.querySelector('.sidebar__dropdown-menu');
    const isOpen = dropdown.classList.contains('sidebar__item--dropdown--open');
    closeAllDropdowns();
    toggleDropdown(dropdown, menu, !isOpen);
  });
}

const sidebarToggleButtons = document.querySelectorAll(
  '.sidebar__toggler, .sidebar__menu-button',
);
for (const button of sidebarToggleButtons) {
  button.addEventListener('click', () => {
    closeAllDropdowns();
    document
      .querySelector('.js-sidebar')
      .classList.toggle('sidebar--collapsed');
  });
}

if (window.innerWidth <= 1024)
  document.querySelector('.js-sidebar').classList.add('sidebar--collapsed');

const themeToggle = {
  init() {
    this.body = document.body;
    this.toggleLight = document.querySelector('.js-toggle-bright');
    this.toggleDark = document.querySelector('.js-toggle-dark');

    document
      .querySelector('.sidebar__theme-toggle')
      .addEventListener('click', (e) => {
        const btn = e.target.closest('.sidebar__theme-btn');
        if (!btn) return;

        this.toggleTheme(btn.classList.contains('js-toggle-dark'));
      });

    this.setActiveButton(this.body.classList.contains('dark'));
  },

  toggleTheme(isDark) {
    this.body.classList.toggle('dark', isDark);
    this.setActiveButton(isDark);

    localStorage.setItem('themePreference', isDark ? 'dark' : 'light');
  },

  setActiveButton(isDark) {
    this.toggleLight.classList.toggle('sidebar__theme-btn--active', !isDark);
    this.toggleDark.classList.toggle('sidebar__theme-btn--active', isDark);
  },
};

document.addEventListener('DOMContentLoaded', () => themeToggle.init());

const savedTheme = localStorage.getItem('themePreference');
if (savedTheme) {
  document.body.classList.toggle('dark', savedTheme === 'dark');
}
