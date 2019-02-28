function setup () {
    canvas = createCanvas(1000, 300);
    canvas.parent('canvas');
    background(230);
}

function draw (){
    background(230);
    for(var i = 0; i < arrayWater.length; i++){
        fill(0, 255, 0);
        rect(50+arrayWater[i].index * 20, 270, 20, arrayWater[i].valueGround*-20);
        fill(0, 0, 255);
        rect(50+arrayWater[i].index * 20, 270-arrayWater[i].valueGround*20, 20, arrayWater[i].valueWater*-20);
    }
}

var arrayWater = [];

function calculate(){
    arrayWater.length = 0;
    var inputData = document.getElementById('input-data').value;
    //var arrayInput = [1, 2, 3, 4, 6, 3, 2, 4, 7, 3, 4, 6, 1, 2, 1];
    var arrayInput = inputData.split(',');

    for (var i = 0; i < arrayInput.length; i++) {
        arrayInput[i] = +arrayInput[i];
    }

    var leftValueMax = 0;
    var rightValueMax = 0;
    var leftValue = 0;
    var rightValue = arrayInput.length - 1;
    var result = 0;

    while(leftValue < rightValue) {
        if(arrayInput[leftValue] > leftValueMax) {
            leftValueMax = arrayInput[leftValue];
        }
        if(arrayInput[rightValue] > rightValueMax) {
            rightValueMax = arrayInput[rightValue];
        }
        if(leftValueMax >= rightValueMax) {
            arrayWater.push({index:rightValue,
                            valueGround: arrayInput[rightValue],
                            valueWater:rightValueMax - arrayInput[rightValue]});
            result += rightValueMax - arrayInput[rightValue];
            rightValue--;
        } else {
            arrayWater.push({index:leftValue,
                            valueGround: arrayInput[leftValue],
                            valueWater: leftValueMax - arrayInput[leftValue]});
            result += leftValueMax - arrayInput[leftValue];
            leftValue++;
        }
    }

    arrayWater.push({index:leftValue,
                            valueGround: arrayInput[leftValue],
                            valueWater: 0});

    document.getElementById('result').innerHTML = "Total water: " + result;
    return result;
}