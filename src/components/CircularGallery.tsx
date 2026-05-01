/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from "ogl";

import "./CircularGallery.css";

type OGL = Renderer["gl"];

function debounce<T extends (...a: any[]) => void>(fn: T, ms: number) {
  let t: ReturnType<typeof setTimeout> | undefined;
  return (...a: Parameters<T>) => {
    if (t) clearTimeout(t);
    t = setTimeout(() => fn(...a), ms);
  };
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function autoBind<T extends object>(o: T) {
  const proto = Object.getPrototypeOf(o) as any;
  Object.getOwnPropertyNames(proto).forEach((k) => {
    if (k === "constructor") return;
    const v = (o as any)[k];
    if (typeof v === "function") (o as any)[k] = v.bind(o);
  });
}

function getFontPx(font: string) {
  const m = font.match(/(\d+)px/);
  return m ? parseInt(m[1]!, 10) : 30;
}

function createTextTexture(
  gl: OGL,
  text: string,
  font: string,
  color: string,
) {
  const cv = document.createElement("canvas");
  const ctx = cv.getContext("2d");
  if (!ctx) throw new Error("2d context");
  ctx.font = font;
  const w = Math.ceil(ctx.measureText(text).width);
  const fs = getFontPx(font);
  const h = Math.ceil(fs * 1.2);
  cv.width = w + 20;
  cv.height = h + 20;
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.clearRect(0, 0, cv.width, cv.height);
  ctx.fillText(text, cv.width / 2, cv.height / 2);
  const texture = new Texture(gl, { generateMipmaps: false });
  (texture as any).image = cv;
  return { texture, width: cv.width, height: cv.height };
}

class Title {
  plane: Mesh;
  gl: OGL;
  renderer: Renderer;
  text: string;
  textColor: string;
  font: string;
  mesh!: Mesh;

  constructor({
    gl,
    plane,
    renderer,
    text,
    textColor,
    font,
  }: {
    gl: OGL;
    plane: Mesh;
    renderer: Renderer;
    text: string;
    textColor: string;
    font: string;
  }) {
    autoBind(this);
    this.gl = gl;
    this.plane = plane;
    this.renderer = renderer;
    this.text = text;
    this.textColor = textColor;
    this.font = font;
    this.createMesh();
  }

  createMesh() {
    const { texture, width, height } = createTextTexture(
      this.gl,
      this.text,
      this.font,
      this.textColor,
    );
    const g = new Plane(this.gl);
    const p = new Program(this.gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 c = texture2D(tMap, vUv);
          if (c.a < 0.1) discard;
          gl_FragColor = c;
        }`,
      uniforms: { tMap: { value: texture } },
      transparent: true,
    });
    this.mesh = new Mesh(this.gl, { geometry: g, program: p });
    const aspect = width / height;
    const th = this.plane.scale.y * 0.15;
    const tw = th * aspect;
    this.mesh.scale.set(tw, th, 1);
    this.mesh.position.y = -this.plane.scale.y * 0.5 - th * 0.5 - 0.05;
    this.mesh.setParent(this.plane);
  }
}

class Media {
  extra = 0;
  geometry: Plane;
  gl: OGL;
  image: string;
  index: number;
  length: number;
  renderer: Renderer;
  scene: Transform;
  screen: { width: number; height: number };
  text: string;
  viewport: { width: number; height: number };
  bend: number;
  textColor: string;
  borderRadius: number;
  font: string;
  program!: Program;
  plane!: Mesh;
  title?: Title;
  showPlaneTitles: boolean;
  scale!: number;
  padding!: number;
  width!: number;
  widthTotal!: number;
  x!: number;
  speed = 0;
  isBefore = false;
  isAfter = false;

  constructor(
    p: {
      geometry: Plane;
      gl: OGL;
      image: string;
      index: number;
      length: number;
      renderer: Renderer;
      scene: Transform;
      screen: { width: number; height: number };
      text: string;
      viewport: { width: number; height: number };
      bend: number;
      textColor: string;
      borderRadius: number;
      font: string;
      showPlaneTitles: boolean;
    },
  ) {
    autoBind(this);
    Object.assign(this, p);
    this.createShader();
    this.createMesh();
    if (this.showPlaneTitles) {
      this.createTitle();
    }
    this.onResize();
  }

  createShader() {
    const texture = new Texture(this.gl, { generateMipmaps: true });
    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }`,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;
        float rbox(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }
        void main() {
          vec2 r = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 u = vec2(
            vUv.x * r.x + (1.0 - r.x) * 0.5,
            vUv.y * r.y + (1.0 - r.y) * 0.5
          );
          vec4 c = texture2D(tMap, u);
          float d = rbox(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          float a = 1.0 - smoothstep(-0.002, 0.002, d);
          gl_FragColor = vec4(c.rgb, a);
        }`,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] as [number, number] },
        uImageSizes: { value: [0, 0] as [number, number] },
        uSpeed: { value: 0 },
        uTime: { value: 100 * Math.random() },
        uBorderRadius: { value: this.borderRadius },
      },
      transparent: true,
    });
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = this.image;
    img.onload = () => {
      (texture as any).image = img;
      this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
    };
  }

  createMesh() {
    this.plane = new Mesh(this.gl, { geometry: this.geometry, program: this.program });
    this.plane.setParent(this.scene);
  }

  createTitle() {
    this.title = new Title({
      gl: this.gl,
      plane: this.plane,
      renderer: this.renderer,
      text: this.text,
      textColor: this.textColor,
      font: this.font,
    });
  }

  update(
    scroll: { current: number; last: number },
    direction: "right" | "left",
  ) {
    this.plane.position.x = this.x - scroll.current - this.extra;
    const x = this.plane.position.x;
    const H = this.viewport.width / 2;

    if (this.bend === 0) {
      this.plane.position.y = 0;
      this.plane.rotation.z = 0;
    } else {
      const B = Math.abs(this.bend);
      const R = (H * H + B * B) / (2 * B);
      const ex = Math.min(Math.abs(x), H);
      const arc = R - Math.sqrt(R * R - ex * ex);
      if (this.bend > 0) {
        this.plane.position.y = -arc;
        this.plane.rotation.z = -Math.sign(x) * Math.asin(ex / R);
      } else {
        this.plane.position.y = arc;
        this.plane.rotation.z = Math.sign(x) * Math.asin(ex / R);
      }
    }

    this.speed = scroll.current - scroll.last;
    (this.program.uniforms.uTime as any).value += 0.04;
    (this.program.uniforms.uSpeed as any).value = this.speed;

    const h = this.plane.scale.x / 2;
    const v = this.viewport.width / 2;
    this.isBefore = this.plane.position.x + h < -v;
    this.isAfter = this.plane.position.x - h > v;
    if (direction === "right" && this.isBefore) {
      this.extra -= this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
    if (direction === "left" && this.isAfter) {
      this.extra += this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
  }

  onResize(opt?: {
    screen?: { width: number; height: number };
    viewport?: { width: number; height: number };
  }) {
    if (opt?.screen) this.screen = opt.screen;
    if (opt?.viewport) this.viewport = opt.viewport;
    this.scale = this.screen.height / 1500;
    this.plane.scale.y = (this.viewport.height * (900 * this.scale)) / this.screen.height;
    this.plane.scale.x = (this.viewport.width * (700 * this.scale)) / this.screen.width;
    (this.plane.program.uniforms.uPlaneSizes as any).value = [
      this.plane.scale.x,
      this.plane.scale.y,
    ];
    this.padding = 2;
    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  }
}

export type GalleryItem = {
  image: string;
  href: string;
  /** Título en el preview (hover). Si no hay `text` y activas títulos bajo el plano, se usa `name`. */
  name: string;
  /** Subtítulo / categoría en el preview */
  category: string;
  /** Etiqueta bajo la tarjeta en WebGL; solo se usa si `showPlaneTitles` está activo */
  text?: string;
};

type AppCfg = {
  items: GalleryItem[];
  bend: number;
  textColor: string;
  borderRadius: number;
  font: string;
  scrollSpeed: number;
  scrollEase: number;
  onItemNavigate: (href: string) => void;
  showPlaneTitles: boolean;
  activeIndexListener: { onIndex: (i: number) => void };
};

class GalleryApp {
  container: HTMLElement;
  scrollSpeed: number;
  scroll: { ease: number; current: number; target: number; last: number };
  onCheckDebounced: () => void;
  renderer!: Renderer;
  gl!: OGL;
  camera!: Camera;
  scene!: Transform;
  planeGeometry!: Plane;
  medias: Media[] = [];
  private items: GalleryItem[] = [];
  private doubled: GalleryItem[] = [];
  private unique = 0;
  screen = { width: 1, height: 1 };
  viewport = { width: 1, height: 1 };
  raf = 0;
  isDown = false;
  start = 0;
  scrollAtDown = 0;
  private moved = 0;
  onItemNavigate: (href: string) => void;
  private activeIndexListener: { onIndex: (i: number) => void };
  private lastEmittedActiveIndex = -1;
  private onResizeB!: () => void;
  private onWheelB!: (e: Event) => void;
  private onDownB!: (e: Event) => void;
  private onMoveB!: (e: Event) => void;
  private onUpB!: () => void;
  private onClickB!: (e: Event) => void;

  constructor(container: HTMLElement, cfg: AppCfg) {
    autoBind(this);
    this.container = container;
    this.scrollSpeed = cfg.scrollSpeed;
    this.onItemNavigate = cfg.onItemNavigate;
    this.activeIndexListener = cfg.activeIndexListener;
    this.scroll = {
      ease: cfg.scrollEase,
      current: 0,
      target: 0,
      last: 0,
    };
    this.onCheckDebounced = debounce(this.onCheck.bind(this), 200);
    this.items = cfg.items;
    this.unique = this.items.length;
    this.doubled = this.items.length ? this.items.concat(this.items) : [];
    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    if (this.doubled.length) {
      this.createMedias(
        this.doubled,
        cfg.bend,
        cfg.textColor,
        cfg.borderRadius,
        cfg.font,
        cfg.showPlaneTitles,
      );
    }
    this.addListeners();
    this.update();
  }

  createRenderer() {
    this.renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(
        (typeof window !== "undefined" && window.devicePixelRatio) || 1,
        2,
      ),
    });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.container.appendChild(this.renderer.gl.canvas);
    (this.container as HTMLDivElement).classList.add("circular-gallery");
  }

  createCamera() {
    this.camera = new Camera(this.gl, { fov: 45 });
    this.camera.position.set(0, 0, 20);
  }

  createScene() {
    this.scene = new Transform();
  }

  createGeometry() {
    this.planeGeometry = new Plane(this.gl, {
      heightSegments: 50,
      widthSegments: 100,
    });
  }

  createMedias(
    items: GalleryItem[],
    bend: number,
    textColor: string,
    borderRadius: number,
    font: string,
    showPlaneTitles: boolean,
  ) {
    this.medias = items.map(
      (data, index) =>
        new Media({
          geometry: this.planeGeometry,
          gl: this.gl,
          image: data.image,
          index,
          length: items.length,
          renderer: this.renderer,
          scene: this.scene,
          screen: this.screen,
          text: data.text ?? data.name,
          viewport: this.viewport,
          bend,
          textColor,
          borderRadius,
          font,
          showPlaneTitles,
        }),
    );
  }

  onPointerDown = (e: Event) => {
    const me = e as MouseEvent;
    const te = e as TouchEvent;
    this.isDown = true;
    this.moved = 0;
    this.start = "touches" in e ? te.touches[0]!.clientX : me.clientX;
    this.scrollAtDown = this.scroll.target;
  };

  onPointerMove = (e: Event) => {
    if (!this.isDown) return;
    const me = e as MouseEvent;
    const te = e as TouchEvent;
    const x = "touches" in e ? te.touches[0]!.clientX : me.clientX;
    this.moved = Math.max(this.moved, Math.abs(x - this.start));
    const d = (this.start - x) * (this.scrollSpeed * 0.025);
    this.scroll.target = this.scrollAtDown + d;
  };

  onPointerUp = () => {
    this.isDown = false;
    this.onCheck();
  };

  onWheel = (e: Event) => {
    const w = e as WheelEvent;
    const d = w.deltaY || (w as any).wheelDelta || (w as any).detail;
    this.scroll.target += (d > 0 ? 1 : -1) * this.scrollSpeed * 0.2;
    this.onCheckDebounced();
  };

  onCheck() {
    if (!this.medias[0]) return;
    const w = this.medias[0]!.width;
    const i = Math.round(Math.abs(this.scroll.target) / w);
    const item = w * i;
    this.scroll.target = this.scroll.target < 0 ? -item : item;
  }

  onResize = () => {
    this.screen = {
      width: this.container.clientWidth,
      height: this.container.clientHeight,
    };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({ aspect: this.screen.width / this.screen.height });
    const fov = (this.camera.fov * Math.PI) / 180;
    const h = 2 * Math.tan(fov / 2) * this.camera.position.z;
    this.viewport = { width: h * this.camera.aspect, height: h };
    for (const m of this.medias) m.onResize({ screen: this.screen, viewport: this.viewport });
  };

  onClick = (e: Event) => {
    if (this.moved > 8) {
      this.moved = 0;
      return;
    }
    e.preventDefault();
    this.navigate();
  };

  getClosestItemIndex() {
    if (!this.medias.length || !this.unique) return 0;
    let best = 0;
    let bestD = Number.POSITIVE_INFINITY;
    for (const m of this.medias) {
      const ax = Math.abs(m.plane.position.x);
      if (ax < bestD) {
        bestD = ax;
        best = m.index;
      }
    }
    return best % this.unique;
  }

  navigate() {
    if (!this.items.length) return;
    const i = this.getClosestItemIndex();
    const href = this.items[i]!.href;
    if (href) this.onItemNavigate(href);
  }

  update() {
    this.scroll.current = lerp(
      this.scroll.current,
      this.scroll.target,
      this.scroll.ease,
    );
    const dir: "right" | "left" =
      this.scroll.current > this.scroll.last ? "right" : "left";
    for (const m of this.medias) m.update(this.scroll, dir);
    if (this.scene && this.camera) {
      this.renderer.render({ scene: this.scene, camera: this.camera });
    }
    this.scroll.last = this.scroll.current;
    const i = this.getClosestItemIndex();
    if (i !== this.lastEmittedActiveIndex) {
      this.lastEmittedActiveIndex = i;
      this.activeIndexListener.onIndex(i);
    }
    this.raf = requestAnimationFrame(() => this.update());
  }

  addListeners() {
    const el = this.container;
    this.onResizeB = this.onResize;
    this.onWheelB = this.onWheel;
    this.onDownB = this.onPointerDown;
    this.onMoveB = this.onPointerMove;
    this.onUpB = this.onPointerUp;
    this.onClickB = this.onClick;
    window.addEventListener("resize", this.onResizeB);
    window.addEventListener("mousewheel" as any, this.onWheelB);
    window.addEventListener("wheel", this.onWheelB, { passive: true });
    el.addEventListener("mousedown", this.onDownB);
    window.addEventListener("mousemove", this.onMoveB);
    window.addEventListener("mouseup", this.onUpB);
    el.addEventListener("touchstart", this.onDownB, { passive: true });
    el.addEventListener("touchmove", this.onMoveB, { passive: true });
    el.addEventListener("touchend", this.onUpB);
    el.addEventListener("click", this.onClickB);
  }

  destroy() {
    const el = this.container;
    cancelAnimationFrame(this.raf);
    window.removeEventListener("resize", this.onResizeB);
    window.removeEventListener("mousewheel" as any, this.onWheelB);
    window.removeEventListener("wheel", this.onWheelB);
    el.removeEventListener("mousedown", this.onDownB);
    window.removeEventListener("mousemove", this.onMoveB);
    window.removeEventListener("mouseup", this.onUpB);
    el.removeEventListener("touchstart", this.onDownB);
    el.removeEventListener("touchmove", this.onMoveB);
    el.removeEventListener("touchend", this.onUpB);
    el.removeEventListener("click", this.onClickB);
    const c = this.renderer.gl.canvas;
    if (c.parentNode) c.parentNode.removeChild(c);
  }
}

export type CircularGalleryRef = { getClosestItemIndex: () => number };

const DEF_FONT = "bold 28px system-ui, sans-serif";

const CircularGallery = forwardRef<
  CircularGalleryRef,
  {
    items: GalleryItem[];
    bend?: number;
    textColor?: string;
    borderRadius?: number;
    font?: string;
    scrollSpeed?: number;
    scrollEase?: number;
    onItemNavigate: (href: string) => void;
    /** Mostrar títulos WebGL bajo cada imagen (por defecto desactivado) */
    showPlaneTitles?: boolean;
  }
>(function CircularGallery(
  {
    items,
    bend = 3,
    textColor = "#ffffff",
    borderRadius = 0.06,
    font = DEF_FONT,
    scrollSpeed = 1.1,
    scrollEase = 0.04,
    onItemNavigate,
    showPlaneTitles = false,
  },
  ref,
) {
  const rootRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<GalleryApp | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [canHover, setCanHover] = useState(true);

  const activeIndexListener = useRef<{ onIndex: (i: number) => void }>({
    onIndex: () => {},
  });
  activeIndexListener.current.onIndex = (i) => setActiveIndex(i);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    setCanHover(window.matchMedia("(hover: hover)").matches);
  }, []);

  useImperativeHandle(ref, () => ({
    getClosestItemIndex: () =>
      appRef.current?.getClosestItemIndex() ?? 0,
  }));

  const navRef = useRef(onItemNavigate);
  navRef.current = onItemNavigate;

  useEffect(() => {
    if (!rootRef.current) return;
    const app = new GalleryApp(rootRef.current, {
      items,
      bend,
      textColor,
      borderRadius,
      font,
      scrollSpeed,
      scrollEase,
      showPlaneTitles,
      activeIndexListener: activeIndexListener.current,
      onItemNavigate: (href) => navRef.current(href),
    });
    appRef.current = app;
    return () => {
      app.destroy();
      appRef.current = null;
    };
  }, [items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase, showPlaneTitles]);

  const showPreview = !canHover || isHovering;
  const current = items[activeIndex];

  return (
    <div
      className="relative h-full w-full"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="circular-gallery h-full w-full" ref={rootRef} />
      {showPreview && current && (
        <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex justify-center px-4 sm:bottom-8">
          <div className="max-w-[min(100%,24rem)] rounded-2xl border border-white/25 bg-black/30 px-4 py-2.5 text-center shadow-lg backdrop-blur-md">
            <p className="text-[0.95rem] font-semibold leading-tight text-white sm:text-sm">
              {current.name}
            </p>
            <p className="mt-0.5 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-white/80">
              {current.category}
            </p>
          </div>
        </div>
      )}
    </div>
  );
});

CircularGallery.displayName = "CircularGallery";

export { CircularGallery };
