"use client";

import React, { PointerEventHandler, useCallback } from "react";
import { lerp } from "@/lib/math";
import s from "./styles.module.css";
import gsap from "gsap";

export default function Page() {
  const mouseRef = React.useRef<HTMLHeadingElement>(null);

  const cursorPosRef = React.useRef({
    x: 0,
    y: 0,
  });

  const cursorTargetRef = React.useRef({
    x: 0,
    y: 0,
  });

  const [snap, setSnap] = React.useState<null | {
    x: number;
    y: number;
    w: number;
    h: number;
  }>(null);

  React.useEffect(() => {
    const callback: gsap.TickerCallback = (time, deltaTime) => {
      if (snap) {
        console.log(cursorPosRef.current);
        cursorPosRef.current.x = lerp(
          cursorPosRef.current.x,
          snap.x,
          deltaTime * 0.01,
        );

        cursorPosRef.current.y = lerp(
          cursorPosRef.current.y,
          snap.y,
          deltaTime * 0.01,
        );
      } else {
        cursorPosRef.current.x = lerp(
          cursorPosRef.current.x,
          cursorTargetRef.current.x,
          deltaTime * 0.01,
        );

        cursorPosRef.current.y = lerp(
          cursorPosRef.current.y,
          cursorTargetRef.current.y,
          deltaTime * 0.01,
        );
      }

      if (mouseRef.current) {
        mouseRef.current.style.setProperty(
          "--x",
          cursorPosRef.current.x.toString(),
        );
        mouseRef.current.style.setProperty(
          "--y",
          cursorPosRef.current.y.toString(),
        );
      }
    };

    gsap.ticker.add(callback);

    return () => {
      gsap.ticker.remove(callback);
    };
  }, [snap]);

  React.useEffect(() => {
    const controller = new AbortController();

    window.addEventListener("mousemove", (event) => {
      const x = event.clientX;
      const y = event.clientY;

      if (mouseRef.current) {
        cursorTargetRef.current.x = x;
        cursorTargetRef.current.y = y;
      }
    }, { signal: controller.signal });

    return () => {
      controller.abort();
    };
  }, []);

  const onPointerEnter = useCallback<PointerEventHandler<HTMLHeadingElement>>(
    (event) => {
      setSnap({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        w: event.currentTarget.getClientRects()[0].width + 10,
        h: event.currentTarget.getClientRects()[0].height,
      });
    },
    [],
  );

  const onPointerLeave = useCallback(() => {
    setSnap(null);
  }, []);

  return (
    <div className="w-screen h-screen bg-black text-green-400 flex items-center justify-center">
      <h1
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        className="uppercase text-[10vh] leading-none relative cursor-default pl-[0.1em] opacity-60 hover:opacity-100"
      >
        Start
      </h1>
      <div
        ref={mouseRef}
        className={s.cursor}
        style={
          {
            "--w": snap ? `${snap.w}px` : undefined,
            "--h": snap ? `${snap.h}px` : undefined,
          } as React.CSSProperties
        }
      />
    </div>
  );
}
