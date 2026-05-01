"use client";

type Point = { x: number; y: number };
type TrailPoint = Point & { life: number };

export function renderCanvas() {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement | null;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let width = 0;
  let height = 0;
  let raf = 0;
  let active = false;
  let pointer: Point | null = null;
  const trail: TrailPoint[] = [];

  const getTargetRect = () => {
    const parent = canvas.parentElement;
    if (parent) return parent.getBoundingClientRect();
    return canvas.getBoundingClientRect();
  };

  const resize = () => {
    const rect = getTargetRect();
    width = Math.max(1, Math.floor(rect.width));
    height = Math.max(1, Math.floor(rect.height));
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const pushPoint = (x: number, y: number) => {
    trail.push({ x, y, life: 1 });
    if (trail.length > 120) trail.splice(0, trail.length - 120);
  };

  const toLocalPoint = (clientX: number, clientY: number): Point => {
    const rect = canvas.getBoundingClientRect();
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const onMouseMove = (e: MouseEvent) => {
    active = true;
    pointer = toLocalPoint(e.clientX, e.clientY);
    pushPoint(pointer.x, pointer.y);
  };

  const onTouchMove = (e: TouchEvent) => {
    if (!e.touches[0]) return;
    active = true;
    pointer = toLocalPoint(e.touches[0].clientX, e.touches[0].clientY);
    pushPoint(pointer.x, pointer.y);
  };

  const onLeave = () => {
    active = false;
    pointer = null;
  };

  const draw = () => {
    // Re-sync in case hero height/viewport changed without window resize.
    if (
      Math.floor(canvas.clientWidth) !== width ||
      Math.floor(canvas.clientHeight) !== height
    ) {
      resize();
    }

    ctx.clearRect(0, 0, width, height);

    if (pointer && active) {
      pushPoint(pointer.x, pointer.y);
    }

    for (let i = trail.length - 1; i >= 0; i -= 1) {
      const p = trail[i];
      p.life -= 0.018;
      if (p.life <= 0) {
        trail.splice(i, 1);
      }
    }

    if (trail.length > 1) {
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      for (let i = 1; i < trail.length; i += 1) {
        const a = trail[i - 1];
        const b = trail[i];
        const alpha = Math.max(0, Math.min(1, b.life)) * 0.9;
        ctx.strokeStyle = `rgba(247, 183, 255, ${alpha})`;
        ctx.lineWidth = 1 + 10 * alpha;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }

    raf = window.requestAnimationFrame(draw);
  };

  let resizeObserver: ResizeObserver | null = null;
  resize();
  draw();

  window.addEventListener("resize", resize);
  window.addEventListener("mousemove", onMouseMove, { passive: true });
  window.addEventListener("touchmove", onTouchMove, { passive: true });
  window.addEventListener("mouseleave", onLeave);
  window.addEventListener("touchend", onLeave, { passive: true });
  if (typeof ResizeObserver !== "undefined") {
    resizeObserver = new ResizeObserver(() => resize());
    const parent = canvas.parentElement;
    if (parent) resizeObserver.observe(parent);
    resizeObserver.observe(canvas);
  }

  const cleanup = () => {
    window.cancelAnimationFrame(raf);
    window.removeEventListener("resize", resize);
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("touchmove", onTouchMove);
    window.removeEventListener("mouseleave", onLeave);
    window.removeEventListener("touchend", onLeave);
    if (resizeObserver) resizeObserver.disconnect();
  };

  // Store cleanup to avoid duplicate listeners if renderCanvas is called again.
  const oldCleanup = (canvas as HTMLCanvasElement & { __cleanup?: () => void })
    .__cleanup;
  if (oldCleanup) oldCleanup();
  (canvas as HTMLCanvasElement & { __cleanup?: () => void }).__cleanup = cleanup;
}
