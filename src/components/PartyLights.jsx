import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';

const PartyLights = ({ isDarkMode = true }) => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const animationRef = useRef(null);

  const initThree = useCallback(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'low-power'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = false;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 6);
    camera.lookAt(0, 0, 0);

    const bgColor = isDarkMode ? 0x0a0a12 : 0xf0f0f8;
    scene.background = new THREE.Color(bgColor);
    scene.fog = new THREE.Fog(bgColor, 6, 12);

    const roomColor = isDarkMode ? 0x080810 : 0xe8e8f0;
    const roomMat = new THREE.MeshBasicMaterial({ 
      color: roomColor, 
      side: THREE.BackSide,
      transparent: true,
      opacity: 0.6
    });
    const room = new THREE.Mesh(new THREE.BoxGeometry(14, 10, 14), roomMat);
    room.position.y = 0;
    scene.add(room);

    const ballVert = `
      varying vec3 vNorm;
      varying vec3 vObj;
      varying vec3 vWorld;
      void main(){
        vObj   = position;
        vNorm  = normalize(normalMatrix * normal);
        vec4 w = modelMatrix * vec4(position,1.);
        vWorld = w.xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.);
      }
    `;

    const ballFrag = `
      #define PI 3.14159265359
      precision highp float;
      uniform vec3  uCam;
      uniform float uTime;
      uniform vec3  uSpots[8];
      uniform vec3  uSpotCols[8];
      varying vec3 vNorm;
      varying vec3 vObj;
      varying vec3 vWorld;

      vec3 tileNormal(vec3 p, float tiles){
        vec3 n = normalize(p);
        float lat = asin(clamp(n.y,-1.,1.));
        float lon = atan(n.z, n.x);
        float dLat = PI / tiles;
        float latQ = floor(lat/dLat + 0.5)*dLat;
        float lonQ;
        float rowTiles = max(1., floor(cos(latQ)*tiles*2.));
        float dLon = 2.*PI/rowTiles;
        lonQ = floor(lon/dLon + 0.5)*dLon;
        return normalize(vec3(cos(latQ)*cos(lonQ), sin(latQ), cos(latQ)*sin(lonQ)));
      }

      float tileEdge(vec3 p, float tiles){
        vec3 n = normalize(p);
        float lat = asin(clamp(n.y,-1.,1.));
        float lon = atan(n.z, n.x);
        float dLat = PI/tiles;
        float rowTiles = max(1., floor(cos(floor(lat/dLat+.5)*dLat)*tiles*2.));
        float dLon = 2.*PI/rowTiles;
        float eLat = abs(fract(lat/dLat+.5)-.5)*2.;
        float eLon = abs(fract(lon/dLon+.5)-.5)*2.;
        float edge = max(eLat, eLon);
        return smoothstep(0.72, 0.98, edge);
      }

      void main(){
        float TILES = 24.;
        vec3 N    = normalize(vNorm);
        vec3 tN   = tileNormal(vObj, TILES);
        float edge = tileEdge(vObj, TILES);
        vec3 V    = normalize(uCam - vWorld);
        vec3 R    = reflect(-V, tN);

        vec3 col = vec3(0.15); 
        for(int i=0;i<8;i++){
          vec3 L    = normalize(uSpots[i]);
          float refl = max(dot(R, L), 0.0);
          float flash = pow(refl, 180.0) * 6.0;
          col += uSpotCols[i] * flash;
        }

        float d = max(dot(tN, normalize(vec3(0.9,8,0.9))), 0.);
        col += vec3(0.8,0.15,0.10) * d * 0.3;

        vec3 H = normalize(normalize(vec3(-0.4,1.5,0.5)) + V);
        float sp = pow(max(dot(tN,H),0.),200.)*9.5;
        col += vec3(0.6, 0.5, 0.2) * d * 0.2;

        col = mix(col, vec3(0.005), edge);
        float rim = pow(1.-max(dot(N,V),0.), 2.5)*0.15;
        col += vec3(0.1,0.15,0.25)*rim;

        gl_FragColor = vec4(col, 1.);
      }
    `;

    const NUM_SPOTS = 8;
    const spotDirs = [];
    const spotCols = [];

    const hues = [0.0, 0.08, 0.18, 0.33, 0.50, 0.62, 0.75, 0.88];
    for (let i = 0; i < NUM_SPOTS; i++) {
      const h = hues[i];
      const rgb = hsvToRgb(h, 1.0, 1.0);
      spotCols.push(new THREE.Vector3(rgb[0], rgb[1], rgb[2]));
      spotDirs.push(new THREE.Vector3());
    }

    const ballMat = new THREE.ShaderMaterial({
      vertexShader: ballVert,
      fragmentShader: ballFrag,
      uniforms: {
        uCam: { value: camera.position },
        uTime: { value: 0.0 },
        uSpots: { value: spotDirs },
        uSpotCols: { value: spotCols },
      },
    });

    const ballGeo = new THREE.SphereGeometry(1.2, 128, 128);
    const ball = new THREE.Mesh(ballGeo, ballMat);
    ball.position.set(0, 0.5, 0);
    scene.add(ball);

    const beamMats = [];
    const beams = [];
    const SPOT_COLORS = [0xff2020, 0xff8800, 0xffee00, 0x00ff44, 0x00eeff, 0x2244ff, 0xcc00ff, 0xff00aa];

    for (let i = 0; i < NUM_SPOTS; i++) {
      const color = isDarkMode ? SPOT_COLORS[i] : adjustColorForLight(SPOT_COLORS[i]);
      const bm = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: isDarkMode ? 0.035 : 0.02,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide
      });
      beamMats.push(bm);
      const bGeo = new THREE.CylinderGeometry(0.015, 0.25, 6, 8, 1, true);
      const beam = new THREE.Mesh(bGeo, bm);
      scene.add(beam);
      beams.push(beam);
    }

    const floorSpots = [];
    for (let i = 0; i < NUM_SPOTS; i++) {
      const color = isDarkMode ? SPOT_COLORS[i] : adjustColorForLight(SPOT_COLORS[i]);
      const fs = new THREE.Mesh(
        new THREE.CircleGeometry(0.4, 32),
        new THREE.MeshBasicMaterial({
          color: color,
          transparent: true,
          opacity: 0,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        })
      );
      fs.rotation.x = -Math.PI / 2;
      fs.position.y = -4.8;
      scene.add(fs);
      floorSpots.push(fs);
    }

    const spotMeshes = [];
    for (let i = 0; i < NUM_SPOTS; i++) {
      const color = isDarkMode ? SPOT_COLORS[i] : adjustColorForLight(SPOT_COLORS[i]);
      const disc = new THREE.Mesh(
        new THREE.CircleGeometry(0.06, 16),
        new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.9, side: THREE.DoubleSide })
      );
      scene.add(disc);
      spotMeshes.push(disc);
    }

    const PCNT = 150;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(PCNT * 3);
    const pC = new Float32Array(PCNT * 3);
    for (let i = 0; i < PCNT; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 12;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 6 + 0.5;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 12;
      const rgb = hsvToRgb(Math.random(), 0.9, 1.0);
      pC[i * 3] = rgb[0];
      pC[i * 3 + 1] = rgb[1];
      pC[i * 3 + 2] = rgb[2];
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(pC, 3));
    scene.add(new THREE.Points(pGeo, new THREE.PointsMaterial({
      size: 0.03,
      vertexColors: true,
      transparent: true,
      opacity: isDarkMode ? 0.5 : 0.25,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })));

    let rotY = 0;
    let velX = 0.008;
    let lastMX = 0;
    let dragging = false;

    const onMouseDown = (e) => { dragging = true; lastMX = e.clientX; velX = 0; };
    const onMouseMove = (e) => {
      if (!dragging) return;
      velX = (e.clientX - lastMX) * 0.01;
      rotY += velX;
      lastMX = e.clientX;
    };
    const onMouseUp = () => { dragging = false; };

    renderer.domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    const clock = new THREE.Clock();
    let t = 0;

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), 0.05);
      t += dt;

      if (!dragging) { velX += (0.008 - velX) * 0.03; rotY += velX; }
      ball.rotation.y = rotY;
      ballMat.uniforms.uTime.value = t;

      for (let i = 0; i < NUM_SPOTS; i++) {
        const base = (i / NUM_SPOTS) * Math.PI * 2;
        const speed = 0.38 + i * 0.07;
        const phi = base + t * speed;
        const elev = Math.sin(t * 0.5 + i * 0.9) * 0.55;

        const dx = Math.sin(phi) * Math.cos(elev);
        const dy = Math.sin(elev) - 0.3;
        const dz = Math.cos(phi) * Math.cos(elev);
        const dir = new THREE.Vector3(dx, dy, dz).normalize();

        const src = ball.position.clone().addScaledVector(dir, 1.05);
        spotDirs[i].copy(dir);

        const beam = beams[i];
        const midPt = src.clone().addScaledVector(dir, 3);
        beam.position.copy(midPt);
        beam.lookAt(src);
        beam.rotateX(Math.PI / 2);
        beamMats[i].opacity = (isDarkMode ? 0.035 : 0.02) + Math.sin(t * 3 + i) * 0.01;

        const disc = spotMeshes[i];
        disc.position.copy(src);
        disc.lookAt(camera.position);

        const fs = floorSpots[i];
        const ty = (-4.8 - src.y) / dir.y;
        if (ty > 0 && ty < 20) {
          fs.position.x = src.x + dir.x * ty;
          fs.position.z = src.z + dir.z * ty;
          fs.material.opacity = (isDarkMode ? 0.15 : 0.08) + Math.sin(t * 2 + i) * 0.04;
          const scale = 0.3 + ty * 0.03;
          fs.scale.set(scale, scale, scale);
        } else {
          fs.material.opacity = 0;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isDarkMode]);

  useEffect(() => {
    const cleanup = initThree();
    return cleanup;
  }, [initThree]);

  return (
    <div 
      ref={containerRef} 
      className="party-lights__canvas"
      style={{ 
        width: '100%', 
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0
      }} 
    />
  );
};

function hsvToRgb(h, s, v) {
  let r, g, b, i = Math.floor(h * 6), f = h * 6 - i, p = v * (1 - s), q = v * (1 - f * s), t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    case 5: r = v; g = p; b = q; break;
  }
  return [r, g, b];
}

function adjustColorForLight(hexColor) {
  const r = ((hexColor >> 16) & 255) / 255;
  const g = ((hexColor >> 8) & 255) / 255;
  const b = (hexColor & 255) / 255;
  
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  const factor = luminance > 0.5 ? 0.4 : 0.7;
  
  return ((Math.round(r * 255 * factor) << 16) | 
          (Math.round(g * 255 * factor) << 8) | 
          Math.round(b * 255 * factor));
}

export default PartyLights;
