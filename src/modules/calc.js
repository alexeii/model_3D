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
            total = Math.floor(price * typeValue * squareValue * countValue * dayValue);
        }
        const start = [];

        let count = Math.ceil(total / 2);
        for (let i = 0; i < 10; i++) {
            start.push(count);
            count = Math.ceil(count / 2);
        }
        start.reverse().push(total);
        const timer = setInterval(() => {
            totalValue.textContent = start.shift();
            if (!start.length) {
                clearInterval(timer);
            }
        }, 40);


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