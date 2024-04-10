var ctx;
function main() {
    var canvas = document.getElementById('example');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
    return;
    }
    ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height); 


    
} 

function drawVector(v, color) {

    var centerX = ctx.canvas.width / 2;
    var centerY = ctx.canvas.height / 2;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX+v.elements[0] * 20,centerY-v.elements[1] * 20);
    ctx.strokeStyle = color;
    ctx.stroke();
}

function handleDrawEvent(){
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    var xInput = document.getElementById('x');
    var yInput = document.getElementById('y');
    var xInput2 = document.getElementById('x2');
    var yInput2 = document.getElementById('y2');

    var x = parseFloat(xInput.value);
    var y = parseFloat(yInput.value);
    var x2 = parseFloat(xInput2.value);
    var y2 = parseFloat(yInput2.value);
    
    var v1 = new Vector3([x, y, 0]);
    var v2 = new Vector3([x2, y2, 0]);
    
    drawVector(v1, "red");
    drawVector(v2, "blue");
}

function handleDrawOperationEvent(){
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); 
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    var xInput = document.getElementById('x');
    var yInput = document.getElementById('y');
    var xInput2 = document.getElementById('x2');
    var yInput2 = document.getElementById('y2');
    var OperationInput = document.getElementById('oper')
    var scalarInput = document.getElementById('scalar');
    

    var x = parseFloat(xInput.value);
    var y = parseFloat(yInput.value);
    var x2 = parseFloat(xInput2.value);
    var y2 = parseFloat(yInput2.value);
    var operation = OperationInput.value;
    var scalar = parseFloat(scalarInput.value);
    
    var v1 = new Vector3([x, y, 0]);
    var v2 = new Vector3([x2, y2, 0]);
    drawVector(v1, "red");
    drawVector(v2, "blue");
    var v3;
    var v4;

    if (operation === 'add') {
        v3 = v1.add(v2);
        drawVector(v3, "green");
    } 
    else if (operation === 'sub') {
        v3 = v1.sub(v2);   
        drawVector(v3, "green");
    }
    else if (operation === 'mul') {
        v3 = v1.mul(scalar);
        v4 = v2.mul(scalar);
        drawVector(v3, "green");
        drawVector(v4, "green");
    }
    else if (operation === 'div') {
        v3 = v1.div(scalar);
        v4 = v2.div(scalar);
        drawVector(v3, "green");
        drawVector(v4, "green");
    }
    else if (operation === 'mag') {
        console.log("Magnitude v1: ", v1.magnitude())
        console.log("Magnitude v2: ", v2.magnitude())
    }
    else if (operation === 'nor') {
        drawVector(v1.normalize(), "green");
        drawVector(v2.normalize(), "green");
    }
    else if (operation === 'ang') {
        console.log("Angle: ", angleBetween(v1,v2));
    }
    else if (operation === 'are') {
        console.log("Area: ", areaTriangle(v1,v2));
    }
}

function angleBetween(v1, v2){
    const getDot = Vector3.dot(v1, v2);
    const magv1 = v1.magnitude();
    const magv2 = v2.magnitude();
    const cos = getDot / (magv1 * magv2);
    const radians = Math.acos(cos);
    const degrees = radians * 180 / Math.PI;
    return degrees;
}

function areaTriangle(v1, v2){
    const crossProduct = Vector3.cross(v1, v2);
    const area = 0.5 * crossProduct.magnitude();
    return area;
}