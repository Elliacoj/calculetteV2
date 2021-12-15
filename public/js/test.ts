const container = document.getElementById("container") as HTMLDivElement;
let divAllTouche = document.createElement("div") as HTMLDivElement;
let contentCalc: string[]= [];
let number: string = "";
let ok: boolean = true;

divAllTouche.id = "divAllTouche";

/**
 * Create a div for all button into the calculator
 */
function createCalculator():void {
    const arrayButton: string[] = ["7", "8", "9", "+", "4", "5", "6", "-", "1", "2", "3", "*", "/", "0", ".", "="];
    let x: number = 0;
    let numberCalc = document.createElement("div") as HTMLDivElement;
    numberCalc.id = "divNumber"

    for(x; x < arrayButton.length; x++) {
        let numberTouche = document.createElement("div") as HTMLDivElement;
        numberTouche.innerHTML = arrayButton[x];
        numberTouche.className = "button";
        numberCalc.appendChild(numberTouche);
    }

    divAllTouche.appendChild(numberCalc);
}

/**
 * Create a div for content text of calculator
 */
function createWindow():void {
    let window = document.createElement("div") as HTMLDivElement;
    window.id = "window";
    container.appendChild(window);
}

/**
 * Manage the event for button pressed
 */
function buttonPush():void {
    const allButton: NodeListOf<Element> = document.querySelectorAll(".button");
    let window = document.getElementById("window") as HTMLDivElement;

    allButton.forEach(function (e:Element):void {
        e.addEventListener("click", function ():void {
            if(!ok) {
                contentCalc = [];
                number = "";
                window.innerHTML = "";
                ok = true;
            }

            if(e.innerHTML !== "=") {
                if(e.innerHTML !== "+" && e.innerHTML !== "-" && e.innerHTML !== "/" && e.innerHTML !== "*") {
                    number += e.innerHTML;
                    window.innerHTML += e.innerHTML
                }
                else {
                    if(number.charAt(number.length-1) !== ".") {
                        contentCalc.push(number);
                        contentCalc.push(e.innerHTML);
                        number = "";
                        window.innerHTML += e.innerHTML
                    }
                }
            }
            else {
                if(number !== "") {
                    contentCalc.push(number);
                    ok = false;
                    if((contentCalc.length === 3) || (contentCalc.length > 3 && (contentCalc.length%2) !== 0)) {
                        let result: number = 0;
                        result = result + calc(parseFloat(contentCalc[0]), contentCalc[1], parseFloat(contentCalc[2]));

                        if(contentCalc.length > 3) {
                            for (let y: number = 3; y < contentCalc.length; y+=2) {
                                result = calc(result, contentCalc[y], parseFloat(contentCalc[y+1]));
                                console.log(result);
                            }
                        }

                        window.innerHTML = result.toString();
                    }
                    else {
                        window.innerHTML = "Error";
                    }
                }
            }
        });
    })
}

/**
 * Return result of calc
 * @param a
 * @param b
 * @param c
 */
function calc(a:number, b:string, c:number):number {
    switch(b) {
        case "+":
            return (a + c);
        case "-":
            return (a - c);
        case "*":
            return (a * c);
        case "/":
            return (a / c);
        default:
            return 0;
    }
}

createWindow();
container.appendChild(divAllTouche);
createCalculator();
buttonPush();