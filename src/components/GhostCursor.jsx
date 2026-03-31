import { useEffect, useRef } from "react";

const VERT_SHADER = `
precision mediump float;

varying vec2 vUv;
attribute vec2 a_position;

void main() {
  vUv = .5 * (a_position + 1.);
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAG_SHADER = `
precision mediump float;

varying vec2 vUv;
uniform float u_time;
uniform float u_ratio;
uniform float u_size;
uniform vec2 u_pointer;
uniform float u_smile;
uniform vec2 u_target_pointer;
uniform vec3 u_main_color;
uniform vec3 u_border_color;
uniform float u_flat_color;
uniform sampler2D u_texture;

#define PI 3.14159265358979323846

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m*m;
  m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

vec2 rotate(vec2 v, float angle) {
  float r_sin = sin(angle);
  float r_cos = cos(angle);
  return vec2(v.x * r_cos - v.y * r_sin, v.x * r_sin + v.y * r_cos);
}

float eyes(vec2 uv, float smile) {
  uv.y -= .5;
  uv.y *= .8;
  uv.x = abs(uv.x);
  uv.y += smile * .3 * pow(uv.x, 1.3);
  uv.x -= (.6 + .2 * smile);
  float d = clamp(length(uv), 0., 1.);
  return 1. - pow(d, .08);
}

float mouth(vec2 uv, float smile) {
  uv.y += 1.5;
  uv.x *= (.5 + .5 * abs(1. - smile));
  uv.y *= (3. - 2. * abs(1. - smile));
  uv.y -= smile * 4. * pow(uv.x, 2.);
  float d = clamp(length(uv), 0., 1.);
  return 1. - pow(d, .07);
}

float faceShape(vec2 uv, float rotation, float size, float smile) {
  uv = rotate(uv, rotation);
  uv /= (.27 * size);

  float eyes_shape = 10. * eyes(uv, smile);
  float mouth_shape = 20. * mouth(uv, smile);

  float col = 0.;
  col = mix(col, 1., eyes_shape);
  col = mix(col, 1., mouth_shape);

  return col;
}

void main() {
  vec2 point = u_pointer;
  point.x *= u_ratio;

  vec2 uv = vUv;
  uv.x *= u_ratio;
  uv -= point;

  float texture = texture2D(u_texture, vec2(vUv.x, 1. - vUv.y)).r;
  float shape = texture;

  float noise = snoise(uv * vec2(.7 / u_size, .6 / u_size) + vec2(0., .0015 * u_time));
  noise += 1.2;
  noise *= 2.1;
  noise += smoothstep(-.8, -.2, (uv.y) / u_size);

  float face = faceShape(uv, 5. * (u_target_pointer.x - u_pointer.x), u_size, u_smile);
  shape -= face;
  shape *= noise;

  vec3 border = (1. - u_border_color);
  border.g += .2 * sin(.005 * u_time);
  border *= .5;

  vec3 color = u_main_color;
  color -= (1. - u_flat_color) * border * smoothstep(.0, .01, shape);

  shape = u_flat_color * smoothstep(.8, 1., shape) + (1. - u_flat_color) * shape;
  color *= shape;

  gl_FragColor = vec4(color, shape);
}
`;

const MOUSE_THRESHOLD = 0.1;
const BASE_SIZE = 14;
const TAIL = {
  dotsNumber: 25,
  spring: 1.4,
  friction: 0.3,
  gravity: 0,
};
const ROCKET_HIDE_PADDING = 90;
const LIGHT_MAIN_COLOR = [0.58, 0.81, 1.0];
const LIGHT_BORDER_COLOR = [0.34, 0.62, 0.96];
const DARK_MAIN_COLOR = [0.98, 0.96, 0.96];
const DARK_BORDER_COLOR = [0.2, 0.5, 0.7];

function createDotSize(size) {
  return (index, dotsNumber, height) =>
    size * (1.0 - 0.2 * Math.pow((3.0 * index) / dotsNumber - 1.0, 2.0));
}

export default function GhostCursor() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReducedMotion || coarsePointer) return undefined;

    const gl = canvas.getContext("webgl", { alpha: true, antialias: true });
    if (!gl) return undefined;

    const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const textureCanvas = document.createElement("canvas");
    const textureCtx = textureCanvas.getContext("2d");
    if (!textureCtx) return undefined;

    const mouse = {
      x: 0.25 * window.innerWidth,
      y: 0.8 * window.innerHeight,
      tX: 0.25 * window.innerWidth,
      tY: 0.8 * window.innerHeight,
      moving: false,
    };
    const initialIsDarkMode = document.body.classList.contains("dark-mode");

    const state = {
      size: BASE_SIZE,
      smile: 1,
      mainColor: initialIsDarkMode ? DARK_MAIN_COLOR : LIGHT_MAIN_COLOR,
      borderColor: initialIsDarkMode ? DARK_BORDER_COLOR : LIGHT_BORDER_COLOR,
      isFlatColor: false,
      visibility: 1,
      ...TAIL,
    };

    const dotSize = createDotSize(state.size);
    const pointerTrail = new Array(state.dotsNumber).fill(null).map((_, i) => ({
      x: mouse.x,
      y: mouse.y,
      vx: 0,
      vy: 0,
      opacity: 0.04 + 0.3 * Math.pow(1 - i / state.dotsNumber, 4),
      bordered: 0.6 * Math.pow(1 - i / state.dotsNumber, 1),
      r: dotSize(i, state.dotsNumber, window.innerHeight),
    }));

    const createShader = (source, type) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = createShader(VERT_SHADER, gl.VERTEX_SHADER);
    const fragmentShader = createShader(FRAG_SHADER, gl.FRAGMENT_SHADER);
    if (!vertexShader || !fragmentShader) return undefined;

    const program = gl.createProgram();
    if (!program) return undefined;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return undefined;

    gl.useProgram(program);

    const uniforms = {
      u_time: gl.getUniformLocation(program, "u_time"),
      u_ratio: gl.getUniformLocation(program, "u_ratio"),
      u_size: gl.getUniformLocation(program, "u_size"),
      u_pointer: gl.getUniformLocation(program, "u_pointer"),
      u_smile: gl.getUniformLocation(program, "u_smile"),
      u_target_pointer: gl.getUniformLocation(program, "u_target_pointer"),
      u_main_color: gl.getUniformLocation(program, "u_main_color"),
      u_border_color: gl.getUniformLocation(program, "u_border_color"),
      u_flat_color: gl.getUniformLocation(program, "u_flat_color"),
      u_texture: gl.getUniformLocation(program, "u_texture"),
    };

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const canvasTexture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, canvasTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    gl.uniform1i(uniforms.u_texture, 0);
    gl.uniform1f(uniforms.u_size, state.size / window.innerHeight);
    gl.uniform1f(uniforms.u_flat_color, state.isFlatColor ? 1 : 0);
    gl.uniform3f(uniforms.u_main_color, state.mainColor[0], state.mainColor[1], state.mainColor[2]);
    gl.uniform3f(uniforms.u_border_color, state.borderColor[0], state.borderColor[1], state.borderColor[2]);

    const resize = () => {
      canvas.width = window.innerWidth * devicePixelRatio;
      canvas.height = window.innerHeight * devicePixelRatio;
      textureCanvas.width = window.innerWidth;
      textureCanvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(uniforms.u_ratio, canvas.width / canvas.height);
      gl.uniform1f(uniforms.u_size, state.size / window.innerHeight);
      for (let i = 0; i < pointerTrail.length; i += 1) {
        pointerTrail[i].r = dotSize(i, state.dotsNumber, window.innerHeight);
      }
    };

    const updateMousePosition = (x, y) => {
      mouse.moving = true;
      mouse.tX = x;
      const size = state.size;
      const adjustedY = y - 0.6 * size;
      mouse.tY = adjustedY > size ? adjustedY : size;
      window.clearTimeout(movingTimer);
      movingTimer = window.setTimeout(() => {
        mouse.moving = false;
      }, 300);
    };

    const onMouseMove = (event) => updateMousePosition(event.clientX, event.clientY);
    const onTouchMove = (event) => {
      if (!event.targetTouches?.length) return;
      updateMousePosition(event.targetTouches[0].clientX, event.targetTouches[0].clientY);
    };
    const onClick = (event) => updateMousePosition(event.clientX, event.clientY);

    const updateTexture = () => {
      textureCtx.fillStyle = "black";
      textureCtx.fillRect(0, 0, textureCanvas.width, textureCanvas.height);

      pointerTrail.forEach((p, index) => {
        if (index === 0) {
          p.x = mouse.x;
          p.y = mouse.y;
        } else {
          p.vx += (pointerTrail[index - 1].x - p.x) * state.spring;
          p.vx *= state.friction;
          p.vy += (pointerTrail[index - 1].y - p.y) * state.spring;
          p.vy *= state.friction;
          p.vy += state.gravity;
          p.x += p.vx;
          p.y += p.vy;
        }

        const gradient = textureCtx.createRadialGradient(p.x, p.y, p.r * p.bordered, p.x, p.y, p.r);
        gradient.addColorStop(0, `rgba(255,255,255,${p.opacity * state.visibility})`);
        gradient.addColorStop(1, "rgba(255,255,255,0)");

        textureCtx.beginPath();
        textureCtx.fillStyle = gradient;
        textureCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        textureCtx.fill();
      });
    };

    let frameId = 0;
    let isDarkMode = document.body.classList.contains("dark-mode");
    let movingTimer = window.setTimeout(() => {
      mouse.moving = false;
    }, 300);

    const isNearRocketButton = (x, y) => {
      const rocketButton = document.querySelector(".rocket-button");
      if (!rocketButton) return false;
      const rect = rocketButton.getBoundingClientRect();
      const closestX = Math.max(rect.left, Math.min(x, rect.right));
      const closestY = Math.max(rect.top, Math.min(y, rect.bottom));
      const dx = x - closestX;
      const dy = y - closestY;
      return dx * dx + dy * dy <= ROCKET_HIDE_PADDING * ROCKET_HIDE_PADDING;
    };

    const render = () => {
      const currentTime = performance.now();
      gl.uniform1f(uniforms.u_time, currentTime);

      const nowDarkMode = document.body.classList.contains("dark-mode");
      if (nowDarkMode !== isDarkMode) {
        isDarkMode = nowDarkMode;
        state.mainColor = isDarkMode ? DARK_MAIN_COLOR : LIGHT_MAIN_COLOR;
        state.borderColor = isDarkMode ? DARK_BORDER_COLOR : LIGHT_BORDER_COLOR;
        gl.uniform3f(uniforms.u_main_color, state.mainColor[0], state.mainColor[1], state.mainColor[2]);
        gl.uniform3f(uniforms.u_border_color, state.borderColor[0], state.borderColor[1], state.borderColor[2]);
      }

      const shouldHide = isNearRocketButton(mouse.tX, mouse.tY);
      const targetVisibility = shouldHide ? 0 : 1;
      state.visibility += (targetVisibility - state.visibility) * 0.25;

      if (mouse.moving) {
        state.smile = Math.max(state.smile - 0.05, -0.1);
        state.gravity = Math.max(state.gravity - 10 * state.size, 0);
      } else {
        // Keep a static idle state (no breathing/bouncing animation).
        state.smile = 1;
        state.gravity = 0;
      }

      mouse.x += (mouse.tX - mouse.x) * MOUSE_THRESHOLD;
      mouse.y += (mouse.tY - mouse.y) * MOUSE_THRESHOLD;

      gl.uniform1f(uniforms.u_smile, state.smile);
      gl.uniform2f(uniforms.u_pointer, mouse.x / window.innerWidth, 1 - mouse.y / window.innerHeight);
      gl.uniform2f(uniforms.u_target_pointer, mouse.tX / window.innerWidth, 1 - mouse.tY / window.innerHeight);

      updateTexture();
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureCanvas);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      frameId = window.requestAnimationFrame(render);
    };

    resize();
    render();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("click", onClick, { passive: true });

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(movingTimer);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("click", onClick);
      gl.deleteTexture(canvasTexture);
      gl.deleteBuffer(vertexBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, []);

  return <canvas id="ghost" ref={canvasRef} className="ghost-cursor-canvas" aria-hidden="true" />;
}
