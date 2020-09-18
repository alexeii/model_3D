const sendForm = () => {
    const errorMessage = "Что то пошло не так...";
    const loadMessage = "Загрузка...";
    const successMessage = "Спасибо! Мы скоро с вами свяжемся!";

    const form = document.querySelectorAll("form");

    const statusMessage = document.createElement("div");

    statusMessage.style.cssText = `font-size: 2rem; color: white;`;
    form.forEach((item) => {
        item.addEventListener("submit", (event) => {
            event.preventDefault();
            item.appendChild(statusMessage);
            statusMessage.textContent = loadMessage;
            const formData = new FormData(item);
            const body = {};
            formData.forEach((val, key) => {
                body[key] = val;
            });
            // eslint-disable-next-line no-use-before-define
            postData(body)
                .then((response) => {
                    if (response.status !== 200) {
                        throw new Error("status network not 200");
                    }
                    statusMessage.textContent = successMessage;
                    event.target.querySelectorAll("input").forEach((item) => {
                        item.value = "";
                    });
                    const timer = () => (statusMessage.textContent = "");
                    setTimeout(timer, 2000);
                })
                .catch((error) => {
                    statusMessage.textContent = errorMessage;
                    console.error(error);
                });
        });
    });
    const postData = (body) =>
        fetch("./server.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
};

export default sendForm;