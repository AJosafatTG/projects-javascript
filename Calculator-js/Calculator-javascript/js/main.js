const screenCalc = document.querySelector(".screen-calc");
const buttons = document.querySelectorAll(".btn");

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        const btnPush = btn.textContent;

        if (btn.id === "deleteAll") {
            screenCalc.textContent = "0";
            return;
        }
        if (btn.id === "delete") {
            if (screenCalc.textContent.length === 1 || screenCalc.textContent === "Error!") {
                screenCalc.textContent = "0";
            } else {
                screenCalc.textContent = screenCalc.textContent.slice(0, -1);
            }
            return;
        }

        if (btn.id === "equal") {
            try {
              screenCalc.textContent = eval(screenCalc.textContent);
              screenCalc.textContent(undefined);
            } catch {
                screenCalc.textContent = "Error!";
            }
            return;
        }
        if (screenCalc.textContent === "0" || screenCalc.textContent === "Error!") {
            screenCalc.textContent = btnPush;
        } else {
            screenCalc.textContent += btnPush;
        }
        
        
    });
});
