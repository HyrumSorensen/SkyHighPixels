import { Circle } from "./circle.js";
import { initShaderProgram } from "./shader.js";
import { collideParticles } from "./collisions.js";
import { mat4 } from 'gl-matrix';


const GRAVITY = 9.8;
const AIR_FRICTION_CONSTANT = 0.2;


main();
async function main() {
    console.log('This is working');

    const canvas = document.getElementById('glcanvas');
    const gl = canvas.getContext('webgl');

    if (!gl) {
        alert('Your browser does not support WebGL');
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const vertexShaderText = await (await fetch("simple.vs")).text();
    const fragmentShaderText = await (await fetch("simple.fs")).text();
    let shaderProgram = initShaderProgram(gl, vertexShaderText, fragmentShaderText);
    gl.useProgram(shaderProgram);

    const projectionMatrixUniformLocation = gl.getUniformLocation(shaderProgram, "uProjectionMatrix");
    const aspect = canvas.clientWidth / canvas.clientHeight;
    const projectionMatrix = mat4.create();
    const yhigh = 10;
    const ylow = -yhigh;
    const xlow = ylow * aspect;
    const xhigh = yhigh * aspect;
    mat4.ortho(projectionMatrix, xlow, xhigh, ylow, yhigh, -1, 1);
    gl.uniformMatrix4fv(
        projectionMatrixUniformLocation,
        false,
        projectionMatrix
    );

    const NUM_CIRCLES = 8;
    const collisionFriction = 0.85; // Adjust this value as needed
    const circleList = [];
    for (let i = 0; i < NUM_CIRCLES; i++) {
        let overlaps;
        let newCircle;
        do {
            overlaps = false;
            newCircle = new Circle(xlow, xhigh, ylow, yhigh);
            for (let j = 0; j < circleList.length; j++) {
                const dx = newCircle.x - circleList[j].x;
                const dy = newCircle.y - circleList[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < newCircle.size + circleList[j].size) {
                    overlaps = true;
                    break;
                }
            }
        } while (overlaps);
        circleList.push(newCircle);
    }
    

    let previousTime = 0;
    function redraw(currentTime) {
        currentTime *= .001;
        let DT = currentTime - previousTime;
        previousTime = currentTime;
        if (DT > .1) {
            DT = .1;
        }

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Collision detection and resolution
        for (let i = 0; i < NUM_CIRCLES - 1; i++) {
            for (let j = i + 1; j < NUM_CIRCLES; j++) {
                let circle1 = circleList[i];
                let circle2 = circleList[j];

                const dx = circle2.x - circle1.x;
                const dy = circle2.y - circle1.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const minDistance = circle1.size + circle2.size;

                if (distance < minDistance) {
                    // Circles are colliding
                    collideParticles(circle1, circle2, DT, collisionFriction);

                    // Post-collision separation
                    const overlap = minDistance - distance;
                    const separationX = (overlap / 2) * (dx / distance);
                    const separationY = (overlap / 2) * (dy / distance);
                    circle1.x -= separationX;
                    circle1.y -= separationY;
                    circle2.x += separationX;
                    circle2.y += separationY;
                }
            }
        }


        // Update circle positions
        for (let i = 0; i < NUM_CIRCLES; i++) {
            circleList[i].update(DT, GRAVITY, AIR_FRICTION_CONSTANT);
        }

        // Draw circles
        for (let i = 0; i < NUM_CIRCLES; i++) {
            circleList[i].draw(gl, shaderProgram);
        }

        requestAnimationFrame(redraw);
    }
    requestAnimationFrame(redraw);
};
