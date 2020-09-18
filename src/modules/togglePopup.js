 const togglePopup = () => {
     const popup = document.querySelector(".popup");
     const popupBtn = document.querySelectorAll(".popup-btn");
     const popupContent = document.querySelector(".popup-content");
     let count = 0;
     let butInteval;

     const popUpMove = function () {
         butInteval = requestAnimationFrame(popUpMove);
         count++;

         if (count < 15) {
             popupContent.style.top = count ** 2 + "px";
         } else {
             cancelAnimationFrame(butInteval);
         }
     };

     popupBtn.forEach((elem) => {
         elem.addEventListener("click", () => {
             popup.style.display = "block";
             if (window.innerWidth > 768) {
                 popupContent.style.top = 0 + "px";
                 butInteval = requestAnimationFrame(popUpMove);
             }
         });
     });

     popup.addEventListener("click", (event) => {
         let target = event.target;
         if (target.classList.contains("popup-close")) {
             popup.style.display = "none";
             count = 0;
         } else {
             target = target.closest(".popup-content");
             if (!target) {
                 popup.style.display = "none";
                 count = 0;
             }
         }
     });
 };
 export default togglePopup;