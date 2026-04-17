import { createFileRoute } from "@tanstack/react-router";

import PageContainer from "@/components/page-container";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

export const Route = createFileRoute("/_authenticated/integrations/")({
  component: IntegrationsPage,
});

function IntegrationsPage() {
  return (
    <PageContainer>
      <h1 className="items-baseline font-medium text-4xl">Integrations</h1>

      <Button onClick={() => toast.success({ title: "This is a success toast" })} className="mt-4">
        test toast
      </Button>

      <TypeScalePlayground />
    </PageContainer>
  );
}

import { useState } from "react";

const textSizes = [
  { name: "text-2xs", multiplier: 0.625 },
  { name: "text-xs", multiplier: 0.75 },
  { name: "text-sm", multiplier: 0.875 },
  { name: "text-base", multiplier: 1 },
  { name: "text-lg", multiplier: 1.125 },
  { name: "text-xl", multiplier: 1.25 },
  { name: "text-2xl", multiplier: 1.5 },
  { name: "text-3xl", multiplier: 1.75 },
  { name: "text-4xl", multiplier: 2 },
];

const textColors = [
  { name: "foreground", label: "Primary", desc: "Headings, labels, nav items", lightness: "0.15" },
  {
    name: "secondary-foreground",
    label: "Secondary",
    desc: "Body text, table cells",
    lightness: "0.25",
  },
  {
    name: "muted-foreground",
    label: "Tertiary",
    desc: "Descriptions, timestamps",
    lightness: "0.45",
  },
  {
    name: "faded-foreground",
    label: "Quaternary",
    desc: "Placeholders, disabled",
    lightness: "0.65",
  },
];

const presets = [
  { label: "Smaller", value: 12 },
  { label: "Small", value: 13 },
  { label: "Default", value: 14 },
  { label: "Large", value: 15 },
  { label: "Larger", value: 16 },
];

function TypeScalePlayground() {
  const [base, setBase] = useState(14);
  const [dark, setDark] = useState(false);
  const [sampleText, setSampleText] = useState("The quick brown fox jumps over the lazy dog");

  const bg = dark ? "#1a1a1e" : "#ffffff";
  const surfaceBg = dark ? "#222226" : "#f8f8fa";
  const borderColor = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";
  const labelColor = dark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)";
  const sublabelColor = dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)";

  const getTextColor = (c) => {
    if (dark) {
      const map = {
        foreground: 0.95,
        "secondary-foreground": 0.82,
        "muted-foreground": 0.65,
        "faded-foreground": 0.45,
      };
      const l = map[c.name] || 0.5;
      return `oklch(${l} 0.01 282)`;
    }
    return `oklch(${c.lightness} 0.01 282)`;
  };

  return (
    <div
      style={{
        background: bg,
        minHeight: "100vh",
        padding: "2rem",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        transition: "background 0.3s",
      }}
    >
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        {/* Controls */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "2rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            {presets.map((p) => (
              <button
                type="button"
                key={p.value}
                onClick={() => setBase(p.value)}
                style={{
                  padding: "6px 14px",
                  borderRadius: 6,
                  border: `1px solid ${base === p.value ? (dark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.2)") : borderColor}`,
                  background:
                    base === p.value
                      ? dark
                        ? "rgba(255,255,255,0.08)"
                        : "rgba(0,0,0,0.04)"
                      : "transparent",
                  color: base === p.value ? (dark ? "#fff" : "#000") : labelColor,
                  fontSize: 13,
                  fontWeight: base === p.value ? 500 : 400,
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{ fontSize: 13, color: labelColor, fontVariantNumeric: "tabular-nums" }}>
              {base}px
            </span>
            <input
              type="range"
              min={10}
              max={20}
              step={0.5}
              value={base}
              onChange={(e) => setBase(parseFloat(e.target.value))}
              style={{ width: 120, accentColor: dark ? "#a78bfa" : "#7c3aed" }}
            />
            <button
              type="button"
              onClick={() => setDark(!dark)}
              style={{
                padding: "6px 14px",
                borderRadius: 6,
                border: `1px solid ${borderColor}`,
                background: "transparent",
                color: labelColor,
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              {dark ? "Light" : "Dark"}
            </button>
          </div>
        </div>

        {/* Editable sample text */}
        <div style={{ marginBottom: "2rem" }}>
          <input
            type="text"
            value={sampleText}
            onChange={(e) => setSampleText(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 14px",
              borderRadius: 8,
              border: `1px solid ${borderColor}`,
              background: surfaceBg,
              color: dark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.85)",
              fontSize: 14,
              outline: "none",
              boxSizing: "border-box",
            }}
            placeholder="Type custom sample text..."
          />
        </div>

        {/* Type scale */}
        <div style={{ marginBottom: "3rem" }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: labelColor,
              marginBottom: "1rem",
            }}
          >
            Type scale
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[...textSizes].reverse().map((size) => {
              const px = Math.round(base * size.multiplier * 10) / 10;
              return (
                <div
                  key={size.name}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    padding: "12px 0",
                    borderBottom: `1px solid ${borderColor}`,
                    gap: "1.5rem",
                  }}
                >
                  <div
                    style={{
                      width: 80,
                      flexShrink: 0,
                      fontSize: 12,
                      color: sublabelColor,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {px}px
                  </div>
                  <div
                    style={{
                      width: 80,
                      flexShrink: 0,
                      fontSize: 12,
                      color: labelColor,
                      fontFamily: "monospace",
                    }}
                  >
                    {size.name}
                  </div>
                  <div
                    style={{
                      fontSize: base * size.multiplier,
                      color: dark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.85)",
                      lineHeight: 1.4,
                      flex: 1,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      transition: "font-size 0.2s ease-out",
                    }}
                  >
                    {sampleText}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Text hierarchy */}
        <div style={{ marginBottom: "3rem" }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: labelColor,
              marginBottom: "1rem",
            }}
          >
            Text hierarchy
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {textColors.map((c) => (
              <div
                key={c.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "16px 0",
                  borderBottom: `1px solid ${borderColor}`,
                  gap: "1.5rem",
                }}
              >
                <div style={{ width: 80, flexShrink: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 500, color: getTextColor(c) }}>
                    {c.label}
                  </div>
                  <div style={{ fontSize: 11, color: sublabelColor, marginTop: 2 }}>{c.desc}</div>
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                  <div
                    style={{
                      fontSize: base * 1.5,
                      fontWeight: 500,
                      color: getTextColor(c),
                      lineHeight: 1.3,
                      transition: "font-size 0.2s ease-out",
                    }}
                  >
                    {sampleText}
                  </div>
                  <div
                    style={{
                      fontSize: base,
                      color: getTextColor(c),
                      lineHeight: 1.5,
                      transition: "font-size 0.2s ease-out",
                    }}
                  >
                    {sampleText}
                  </div>
                  <div
                    style={{
                      fontSize: base * 0.875,
                      color: getTextColor(c),
                      lineHeight: 1.5,
                      transition: "font-size 0.2s ease-out",
                    }}
                  >
                    {sampleText}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Combined preview */}
        <div style={{ marginBottom: "3rem" }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: labelColor,
              marginBottom: "1rem",
            }}
          >
            Settings page preview
          </div>
          <div
            style={{
              background: surfaceBg,
              borderRadius: 12,
              padding: "1.5rem",
              border: `1px solid ${borderColor}`,
            }}
          >
            <div
              style={{
                fontSize: base * 1.5,
                fontWeight: 500,
                color: getTextColor(textColors[0]),
                marginBottom: 4,
                transition: "font-size 0.2s ease-out",
              }}
            >
              Preferences
            </div>
            <div
              style={{
                fontSize: base * 0.875,
                color: getTextColor(textColors[2]),
                marginBottom: "1.5rem",
                transition: "font-size 0.2s ease-out",
              }}
            >
              Manage your account settings and preferences
            </div>

            <div
              style={{
                fontSize: base * 1.125,
                fontWeight: 500,
                color: getTextColor(textColors[0]),
                marginBottom: "1rem",
                transition: "font-size 0.2s ease-out",
              }}
            >
              General
            </div>

            {[
              {
                label: "Font size",
                desc: "Adjust the size of text across the app",
                value: "Default",
              },
              {
                label: "Use pointer cursors",
                desc: "Change cursor to pointer on interactive elements",
                value: null,
              },
              {
                label: "Interface theme",
                desc: "Select or customize your color scheme",
                value: "Light",
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 0",
                  borderBottom: i < 2 ? `1px solid ${borderColor}` : "none",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: base,
                      fontWeight: 400,
                      color: getTextColor(textColors[0]),
                      transition: "font-size 0.2s ease-out",
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontSize: base * 0.875,
                      color: getTextColor(textColors[2]),
                      marginTop: 2,
                      transition: "font-size 0.2s ease-out",
                    }}
                  >
                    {item.desc}
                  </div>
                </div>
                {item.value && (
                  <div
                    style={{
                      fontSize: base * 0.875,
                      color: getTextColor(textColors[1]),
                      padding: "4px 12px",
                      borderRadius: 6,
                      border: `1px solid ${borderColor}`,
                      transition: "font-size 0.2s ease-out",
                    }}
                  >
                    {item.value}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
