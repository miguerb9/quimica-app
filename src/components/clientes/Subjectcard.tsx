"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface Props {
  href: string;
  imgSrc: string | undefined;
  index: number;
  title: string;
  description?: string;
}

export default function SubjectCard({
  href,
  imgSrc,
  index,
  title,
  description,
}: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      style={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "16px",
        overflow: "hidden",
        textDecoration: "none",
        background: "white",
        border: `1px solid ${hovered ? "rgba(37,99,235,0.3)" : "rgba(15,31,61,0.1)"}`,
        boxShadow: hovered
          ? "0 14px 36px rgba(37,99,235,0.14)"
          : "0 2px 12px rgba(15,31,61,0.07)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition:
          "transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Imagen */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "220px",
          overflow: "hidden",
          background: "#e8eef8",
          flexShrink: 0,
        }}
      >
        {imgSrc && (
          <Image
            src={imgSrc}
            alt={title}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}

        <span
          style={{
            position: "absolute",
            top: "12px",
            left: "12px",
            fontSize: "11px",
            fontWeight: 700,
            fontFamily: "monospace",
            letterSpacing: "0.1em",
            padding: "4px 12px",
            borderRadius: "999px",
            background: "rgba(255,255,255,0.9)",
            color: "#2563eb",
            boxShadow: "0 1px 6px rgba(0,0,0,0.12)",
          }}
        >
          T{String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Texto */}
      <div style={{ padding: "22px 24px 24px" }}>
        <h2
          style={{
            fontSize: "18px",
            fontWeight: 700,
            color: "#0f1f3d",
            fontFamily: "Georgia, serif",
            marginBottom: "8px",
            lineHeight: 1.3,
          }}
        >
          {title}
        </h2>
        {description && (
          <p
            style={{
              fontSize: "14px",
              color: "#64748b",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {description}
          </p>
        )}
      </div>
    </Link>
  );
}
