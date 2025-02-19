// LAB 04 - FUNCTIONS

// HELPER
function randi(exclusive_max) {
    return Math.floor(Math.random() * exclusive_max)
}



const mealCalculatorObj = {
    mealCost: 0,
    taxRate: 0,
    tipRate: 0,
    taxAmount: 0,
    tipAmount: 0,
    grossAmount: 0,

    setMealCost(cost) {
        this.mealCost = cost;
        this.calculate();
    },

    setTaxRate(rate) {
        this.taxRate = rate;
        this.calculate();
    },

    setTipRate(rate) {
        this.tipRate = rate;
        this.calculate();
    },

    calculate() {
        this.taxAmount = this.mealCost * this.taxRate;
        this.tipAmount = this.mealCost * this.tipRate;
        this.grossAmount = this.mealCost + this.taxAmount + this.tipAmount;
    }
};


function do_task(task_id, input_val_1, input_val_2, output_div) {

    // MAKE RETURN OUTPUT TEXT
    var resText = "";

    switch (task_id) {
        case 1:
            // HANDLE BAD/EMPTY
            if (!isValidNumberRegex(input_val_1)) {
                resText = "That does not seem to be a number.\nPlease check your input and try again.";
            }
            else {


                // GET MEALCOST AS A FLOAT
                let mealCost = parseFloat(input_val_1.replace(",", ""));
                resText += "Net Amount(excluding tax):            $" + mealCost.toFixed(2).padStart(8) + "\n";

                // HANDLE NEGATIVE OR FREE
                if (mealCost < 0) {
                    resText += "Wow! They paid you to eat it?!";
                }
                else if (mealCost == 0) {
                    resText += "A free meal? Nice!";
                }
                else {
  
                    const mealCalculator = mealCalculatorObj;
                    mealCalculator.setMealCost(mealCost);
                    mealCalculator.setTaxRate(0.07);
                    mealCalculator.setTipRate(0.15);

                    mealCalculator.calculate()
                    
                    resText += "Tax (7%):                             $" + mealCalculator.taxAmount.toFixed(2).padStart(8) + "\n";
                    resText += "Tip (15%):                            $" + mealCalculator.tipAmount.toFixed(2).padStart(8) + "\n";
                    resText += "Gross Amount (including tax and tip): $" + mealCalculator.grossAmount.toFixed(2).padStart(8);
                }
            }
    }

    // SET TEXT ON OUTPUT DIV & LOG
    output_div.innerText = resText;

    // LOG IT
    console.log(resText)
}


function isValidNumberRegex(input) {
    return /^-?\d{1,3}(,\d{3})*(\.\d+)?$|^-?\d+(\.\d+)?$/.test(input);
}
