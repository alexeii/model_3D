const calc = (price = 100) => {
    const calcType = document.querySelector(".calc-type");
    const calcSquare = document.querySelector(".calc-square");
    const calcCount = document.querySelector(".calc-count");
    const calcDay = document.querySelector(".calc-day");
    const totalValue = document.getElementById("total");
    const calcBlock = document.querySelector(".calc-block");


    const countSum = () => {
        let total = 0;
        let countValue = 1;
        let dayValue = 1;
        const typeValue = calcType.options[calcType.selectedIndex].value;
        const squareValue = +calcSquare.value;
        if (calcCount.value > 1) {
            countValue += (calcCount.value - 1) / 10;
        }
        if (calcDay.value && calcDay.value < 5) {
            dayValue *= 2;
        } else if (calcDay.value && calcDay.value < 10) {
            dayValue *= 1.5;
        }
        if (typeValue && squareValue) {
            total = price * typeValue * squareValue * countValue * dayValue;
        }
        let start = 0;
        const timer = setInterval(() => {
            totalValue.textContent = start++;
            start++;
            if (start > total) {
                clearInterval(timer);
            }
        });

        //totalValue.textContent = total;
    };

    calcBlock.addEventListener("change", (event) => {
        const target = event.target;
        if (
            target === calcType ||
            target === calcSquare ||
            target === calcCount ||
            target === calcDay
        ) {
            countSum();
        }
    });
};

export default calc;