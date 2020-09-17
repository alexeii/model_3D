const toggleMenu = () => {
    const btnMenu = document.querySelector(".menu");
    const menu = document.querySelector("menu");

    const handlerMenu = () => {
        menu.classList.toggle("active-menu");
    };

    btnMenu.addEventListener("click", handlerMenu);

    menu.addEventListener("click", (event) => {
        const target = event.target;
        if (target.matches(".close-btn") || target.closest("ul>li")) {
            handlerMenu();
        }
    });
};

export default toggleMenu;