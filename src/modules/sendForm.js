  const sendForm = () => {
      const errorMessage = "Что то пошло не так...";
      const loadMessage = "Загрузка...";
      const successMessage = "Спасибо! Мы скоро с вами свяжемся!";

      const form1 = document.getElementById("form1");

      const form2 = document.getElementById("form2");

      const form3 = document.getElementById("form3");

      const statusMessage = document.createElement("div");

      statusMessage.style.cssText = "font-size: 2rem;";

      form1.addEventListener("submit", (event) => {
          event.preventDefault();
          form1.appendChild(statusMessage);
          statusMessage.textContent = loadMessage;
          const formData = new FormData(form1);
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

      form2.addEventListener("submit", (event) => {
          event.preventDefault();
          form2.appendChild(statusMessage);
          statusMessage.textContent = loadMessage;
          const formData = new FormData(form2);
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
                  console.log(error);
              });
      });

      form3.addEventListener("submit", (event) => {
          event.preventDefault();
          form3.appendChild(statusMessage);
          statusMessage.style.cssText = `font-size: 2rem;
      color: white;`;
          statusMessage.textContent = loadMessage;
          const formData = new FormData(form3);
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
                  console.log(error);
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