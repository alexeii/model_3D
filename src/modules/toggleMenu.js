const toggleMenu = () => {
    const menu = document.querySelector("menu");

    const handlerMenu = () => {
        menu.classList.toggle("active-menu");
    };

    document.body.addEventListener("click", (event) => {
        const target = event.target;
        if (
            target.matches(".close-btn") ||
            target.closest(".active-menu>ul>li") ||
            target.closest(".menu>small") ||
            target.closest(".menu>img")
        ) {
            handlerMenu();
        } else if (menu.classList.contains("active-menu") && target !== menu) {
            handlerMenu();
        }
    });
    const anchors = menu.querySelectorAll('ul>li>a');
    const anchor1 = document.body.querySelector('a');
    anchors.forEach((item) => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            const blockId = item.getAttribute('href');
            document.querySelector(blockId).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
    anchor1.addEventListener('click', (event) => {
        event.preventDefault();
        const blockId = anchor1.getAttribute('href');
        document.querySelector(blockId).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });


};

export default toggleMenu;