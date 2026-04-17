# twonarly-ui — UI Standards

This skill encodes the design system conventions, component patterns, and UI engineering standards used across the Twonarly (April) application. Use this as the source of truth when building or modifying any UI in this codebase.

---

## Core Philosophy

**Density over decoration.** This is a productivity app. Every pixel of padding, every font weight, every border radius was chosen to maximize information density while maintaining readability. The UI should feel compact, precise, and fast.

**Scale with the user.** Typography and icons use `em` units that scale with the user's font-size preference. Never hardcode pixel values for text or icon sizes — always use the utility classes.

**Convention over configuration.** Components use `data-slot` attributes, CVA variants, and the `cn()` utility. Follow the existing patterns exactly. Don't invent new abstractions.

---

## Color System

OKLCH color space throughout. All colors are CSS custom properties mapped to Tailwind via `@theme inline`.

### Semantic Tokens

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--background` | `oklch(1 0 0)` | `oklch(0.141 0.005 285.823)` | Page background |
| `--foreground` | `oklch(0 0 285.823)` | `oklch(0.985 0 0)` | Primary text |
| `--primary` | `oklch(0.646 0.196 293.756)` | `oklch(0.71 0.176 293.756)` | Brand violet, CTA buttons, focus rings |
| `--secondary` | `oklch(0.967 0.001 286.375)` | `oklch(0.274 0.006 286.033)` | Secondary buttons, hover states |
| `--muted` | `oklch(0.94 0.001 286.375)` | `oklch(0.274 0.006 286.033)` | Disabled backgrounds, subtle fills |
| `--muted-foreground` | `oklch(0.552 0.016 285.938)` | `oklch(0.705 0.015 286.067)` | Secondary text, descriptions, placeholders |
| `--accent` | `oklch(0.8946 0.0562 293.06)` | `oklch(0.274 0.006 286.033)` | Accent highlights |
| `--destructive` | `oklch(0.577 0.245 27.325)` | same | Error states, delete actions |
| `--border` | `oklch(0.92 0.004 286.32)` | `oklch(0.274 0.006 286.033)` | All borders |
| `--input` | `oklch(0.92 0.004 286.32)` | `oklch(0.274 0.006 286.033)` | Input borders (matches `--border`) |
| `--ring` | matches `--primary` | matches `--primary` | Focus rings |

### Rules

- Never use raw hex or rgb values. Always reference semantic tokens via Tailwind (`text-foreground`, `bg-primary`, `border-border`).
- Dark mode inputs get `dark:bg-input/30` for subtle depth.
- Destructive error rings use opacity: `aria-invalid:ring-destructive/20` (light) and `dark:aria-invalid:ring-destructive/40` (dark).
- Sidebar has its own token namespace (`--sidebar`, `--sidebar-foreground`, `--sidebar-accent`, etc.).

---

## Typography

### Font Stack

```
-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
"Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif
```

### Base Size (configurable)

The root `--font-size-base` defaults to `14px` and scales via `html[data-font-size]`:

| Setting | Size |
|---------|------|
| `smaller` | 12px |
| `small` | 13px |
| `default` | 14px |
| `large` | 15px |
| `larger` | 16px |

### Text Scale (em-based)

All text sizing uses custom utility classes in `em` units so they scale with the user's preference:

| Class | Size | Usage |
|-------|------|-------|
| `.text-h1` | 2em | Page titles |
| `.text-h2` | 1.75em | Section headers |
| `.text-h3` | 1.5em | Subsection headers |
| `.text-h4` | 1.25em | Card headers |
| `.text-h5` | 1.125em | Emphasized text |
| `.text-body-lg` | 1.125em | Large body text |
| `.text-body` | 0.95em | Default body text, buttons, labels |
| `.text-body-sm` | 0.875em | Descriptions, secondary text |
| `.text-body-xs` | 0.75em | Captions, timestamps |
| `.text-body-2xs` | 0.625em | Micro text |

### Font Weights

| Weight | Usage |
|--------|-------|
| `font-light` | Kbd shortcuts only |
| `font-normal` | Body text, descriptions |
| `font-medium` | Labels, titles, sidebar items, card titles |
| `font-semibold` | Dialog titles only |

**Never use `font-bold` or `font-extrabold`.** The UI is intentionally restrained.

---

## Icon Sizing

Icons also scale with font-size via `em`-based utility classes:

| Class | Size | Usage |
|-------|------|-------|
| `.icon-xs` | 1em | Inline icons in dropdowns, chevrons |
| `.icon-sm` | 1.15em | Sidebar nav icons, button icons |
| `.icon-md` | 1.25em | Standalone icons |
| `.icon-lg` | 1.5em | Prominent icons |
| `.icon-xl` | 1.75em | Hero icons |

**Never use hardcoded `size-4`, `size-5` for icons in components.** Use the icon utility classes.

---

## Spacing & Padding

### Button Padding

| Size | Height | Horizontal Padding | Gap |
|------|--------|-------------------|-----|
| `xs` | h-6 | px-2.5 | gap-1 |
| `sm` | h-7 | px-2.5 | gap-1 |
| `default` | h-8 | px-2.5 | gap-1.5 |
| `lg` | h-9 | px-2.5 | gap-1.5 |
| `xl` | h-10 | px-3 | gap-2 |
| `icon` | size-8 | — | — |
| `icon-xs` | size-6 | — | — |
| `icon-sm` | size-7 | — | — |
| `icon-lg` | size-9 | — | — |

Buttons with leading/trailing icons use `has-data-[icon=inline-start]` and `has-data-[icon=inline-end]` to tighten padding on the icon side.

### Input Padding

| Component | Padding | Height |
|-----------|---------|--------|
| Input | `px-3 py-1` | h-8 |
| Textarea | `px-3 py-2` | min-h-16 (field-sizing-content) |
| Select trigger | inherits from Button (when using `asChild`) | — |

### Card Padding

| Slot | Padding |
|------|---------|
| CardHeader | `px-4 pt-3` (`pb-3` when bordered) |
| CardContent | `px-4` |
| CardFooter | `px-4 pb-3` (`pt-3` when bordered) |

### Dialog Padding

| Slot | Padding |
|------|---------|
| DialogContent | `p-6` + `gap-4` |
| DialogHeader | `gap-2` |
| DialogFooter | `gap-2` |
| DialogClose button | `absolute top-3 right-3` |

### Popover / Dropdown Padding

| Component | Content Padding | Item Padding |
|-----------|----------------|--------------|
| Dropdown | `p-1` | `px-2 py-1` |
| Popover | `p-4` | — |
| Tooltip | `px-2 py-1` | — |
| Select content | `p-1` | `px-2` (h-7) |

### Sheet / Drawer Padding

| Slot | Padding |
|------|---------|
| SheetHeader | `p-4 gap-1.5` |
| SheetFooter | `p-4 gap-2` |
| DrawerHeader | `p-4 gap-0.5` |
| DrawerFooter | `p-4 gap-2` |

### Sidebar Padding

| Slot | Padding |
|------|---------|
| SidebarHeader | `p-2 gap-2` |
| SidebarGroup | `p-2` |
| SidebarMenuButton | `px-2 py-2` (h-8) |

### Item Component Padding

| Size | Padding | Gap |
|------|---------|-----|
| `default` | `p-4` | `gap-4` |
| `sm` | `py-3 px-4` | `gap-2.5` |

### Field Padding

| Size | Padding | Gap |
|------|---------|-----|
| `default` | `p-4` | `gap-4` |
| `sm` | `py-3 px-4` | `gap-2.5` |

### Page Layout

- Container: `max-w-4xl mx-auto p-4`
- Section spacing: `space-y-12`
- Bottom buffer: `last:mb-24`

---

## Border & Radius

### Radius Scale

Base: `--radius: 0.5rem` (8px)

| Token | Value | Usage |
|-------|-------|-------|
| `rounded-sm` | 4px | — |
| `rounded-md` | 6px | — |
| `rounded-lg` | 8px | **Default** — buttons, inputs, cards, dialogs, dropdowns, popovers, sidebar items |
| `rounded-xl` | 12px | Drawer corners |
| `rounded-full` | 50% | Avatars, badges, switches |
| `rounded-[3px]` | 3px | Checkboxes |

**`rounded-lg` is the standard.** Use it for everything unless the component specifically needs something else.

### Border Widths

| Pattern | Usage |
|---------|-------|
| `border` (1px) | Cards, inputs, dialogs, sidebar floating variant |
| `shadow-[0_0.5px_0_0_var(--color-border)]` | Table header (sub-pixel border) |
| `shadow-[1px_0_0_0_var(--color-border)]` | Sidebar classic variant (left position) |
| `shadow-[-1px_0_0_0_var(--color-border)]` | Sidebar classic variant (right position) |
| `outline outline-border` | Sidebar floating variant |
| `ring-1 ring-foreground/10` | Dropdown menu content |
| `ring-1 ring-black/5` | Toast notifications |

### Separator

- Horizontal: `h-px w-full bg-border`
- Vertical: `h-full w-px bg-border`
- Menu separators: `-mx-1 my-1 h-px bg-border`

---

## Sizing

### Component Heights

| Component | Height |
|-----------|--------|
| Button xs | h-6 |
| Button sm | h-7 |
| Button default | h-8 |
| Button lg | h-9 |
| Button xl | h-10 |
| Input | h-8 |
| Select item | h-7 |
| Table header/row | h-10 |
| Sidebar menu button | h-8 |
| Sidebar group label | h-8 |
| Kbd | h-5 (min-w-5) |
| Switch root | h-5 w-7.5 |
| Switch thumb | size-3.5 |
| Checkbox | size-4 |

### Sidebar

| Property | Value |
|----------|-------|
| Desktop width | `14rem` (224px) |
| Mobile width | `18rem` (288px) |
| Collapsed width | `3rem` (48px) |

---

## Focus States

### Primary Focus Pattern

All interactive elements use a consistent two-layer focus system:

```
focus-visible:border-primary   /* Border turns primary */
outline-none                   /* Remove default outline */
```

### Button Focus (default variant)

```
focus-visible:ring
focus-visible:ring-primary
focus-visible:ring-offset-2
focus-visible:ring-offset-background
```

### Button Focus (outline, ghost, destructive variants)

```
focus-visible:border-primary
focus-visible:border
```

### Input Focus

```
focus-visible:border-primary
```

### Checkbox/Switch Focus

```
focus-visible:ring-1
focus-visible:ring-primary
focus-visible:ring-offset-2
focus-visible:ring-offset-background
```

### Invalid State

```
aria-invalid:border-destructive
aria-invalid:ring-destructive/20
aria-invalid:ring-[3px]
dark:aria-invalid:ring-destructive/40
```

### Menu Item Focus

```
focus:bg-secondary
focus:text-accent-foreground
```

### Table Row Focus

```
focus-visible:bg-muted/20
focus-visible:outline-none
focus-visible:ring-0
```

### Dialog Close Button Focus

```
focus:ring-2
focus:ring-ring
focus:ring-offset-2
```

---

## Hover States

| Element | Hover |
|---------|-------|
| Button default | `hover:bg-primary/80` |
| Button outline | `hover:bg-muted hover:text-foreground` |
| Button ghost | `hover:bg-muted hover:text-foreground` |
| Button destructive | `hover:bg-destructive/10` |
| Dropdown item | `focus:bg-secondary` (keyboard) |
| Sidebar button | `hover:bg-sidebar-accent/60 hover:text-sidebar-foreground` |
| Table row | `hover:bg-muted/20` |
| Dialog close | `hover:opacity-100` (from `opacity-70`) |
| Link in description | `[&>a:hover]:text-primary` |

---

## Active / Pressed States

Buttons that need tactile feedback use CSS `active:scale-[0.97]` with `pointer-hover:scale-[1.04]`:

```tsx
<Button className="pointer-hover:scale-[1.04] active:scale-[0.97]">
  New Task
</Button>
```

Sidebar menu buttons use `transition-transform duration-160 ease-out active:scale-[.97]`.

---

## Disabled States

Consistent across all interactive elements:

```
disabled:pointer-events-none
disabled:opacity-50
disabled:cursor-not-allowed   /* inputs only */
```

---

## Selected / Active States

### Sidebar Navigation

```
data-[active=true]:bg-sidebar-accent
data-[active=true]:text-sidebar-foreground
```

### Table Rows

```
data-[state=selected]:bg-primary/5
data-[state=selected]:hover:bg-primary/10
```

### Menu Items (expanded)

```
aria-expanded:bg-muted
aria-expanded:text-foreground
```

---

## Animations & Transitions

### Easing Functions

Three custom curves defined as CSS variables:

```css
--ease-out-strong: cubic-bezier(0.23, 1, 0.32, 1);
--ease-in-out-strong: cubic-bezier(0.77, 0, 0.175, 1);
--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
```

### Duration Guide

| Element | Duration |
|---------|----------|
| Color transitions | `transition-colors` (150ms default) |
| Switch/checkbox | `duration-100 ease-out-strong` |
| Sidebar collapse | `duration-300 ease-(--ease-out-strong)` |
| Dropdown open/close | `duration-100` |
| Sheet open | `duration-500` |
| Sheet close | `duration-300` |
| Dialog | `duration-0` (instant) |
| Button press feedback | `duration-160 ease-out` |

### Enter/Exit Animations

All overlay components (dialogs, dropdowns, popovers, sheets) use:

```
data-[state=open]:animate-in    data-[state=closed]:animate-out
data-[state=open]:fade-in-0     data-[state=closed]:fade-out-0
data-[state=open]:zoom-in-95    data-[state=closed]:zoom-out-95
```

Directional slide based on `data-[side=*]`:

```
data-[side=bottom]:slide-in-from-top-2
data-[side=top]:slide-in-from-bottom-2
data-[side=left]:slide-in-from-right-2
data-[side=right]:slide-in-from-left-2
```

### Stagger Animation

Menu items use a CSS stagger pattern with 50ms increments:

```css
[data-slot="item"].stagger {
  opacity: 0;
  transform: translateY(8px);
  animation: fadeIn 300ms var(--ease-out-strong) forwards;
}
[data-slot="item"].stagger:nth-child(1) { animation-delay: 0ms; }
[data-slot="item"].stagger:nth-child(2) { animation-delay: 50ms; }
/* ... up to 7 children at 50ms increments */
```

### Transform Origins

Popovers and dropdowns use Radix's transform-origin variables:

```
origin-(--radix-popover-content-transform-origin)
origin-(--radix-dropdown-menu-content-transform-origin)
origin-(--radix-tooltip-content-transform-origin)
```

### Transition Overrides

Use `transition-none` on select triggers and settings controls to prevent flash on value change.

---

## Shadows

| Shadow | Usage |
|--------|-------|
| `shadow-xs` | Inputs, checkboxes (subtle depth) |
| `shadow-md` | Dropdown menus |
| `shadow-lg` | Dialogs, toasts |
| `shadow-[0_0.5px_0_0_var(--color-border)]` | Table header (sub-pixel line) |
| `ring-1 ring-foreground/10` | Dropdown content border |
| `ring-1 ring-black/5` | Toast border |

---

## Component Patterns

### data-slot Convention

Every component sets a `data-slot` attribute for CSS targeting and debugging:

```tsx
<div data-slot="card" />
<div data-slot="card-header" />
<div data-slot="dialog-content" />
```

### Variant Architecture (CVA)

Components with multiple visual states use `class-variance-authority`:

```tsx
const buttonVariants = cva("base-classes", {
  variants: {
    variant: { default: "...", outline: "...", ghost: "..." },
    size: { default: "...", sm: "...", lg: "..." },
  },
  defaultVariants: { variant: "default", size: "default" },
});
```

### asChild Pattern

Components that need to render as a different element use `Slot` from Radix:

```tsx
const Comp = asChild ? Slot.Root : "button";
return <Comp className={cn(variants({ variant, size }), className)} {...props} />;
```

### Tooltip + Trigger Pattern

Complex triggers wrap both Tooltip and Dialog/Dropdown triggers:

```tsx
<Tooltip>
  <Dialog>
    <TooltipTrigger asChild>
      <DialogTrigger asChild>
        <Button>Action</Button>
      </DialogTrigger>
    </TooltipTrigger>
    ...
  </Dialog>
  <TooltipContent>Shortcut: c</TooltipContent>
</Tooltip>
```

### Toast Pattern

Custom toast using Sonner with intent-based API:

```tsx
toast.success({ title: "Profile updated" });
toast.error({ title: "Failed to update", description: "Try again." });
```

Toast layout: `px-3 py-2 rounded-lg shadow-lg ring-1 ring-black/5`

---

## Cursor Behavior

Default cursor is `cursor-default` (set globally on `*`).

When `appearance.usePointerCursor` is enabled, `html.pointer-cursor` applies `!cursor-pointer` to all interactive elements via CSS selectors targeting buttons, anchors, `[role="button"]`, `[role="tab"]`, `[role="menuitem"]`, checkboxes, radios, and selects.

Inputs retain `cursor-auto` via the Input component.

---

## Responsive Patterns

### Breakpoints

| Breakpoint | Width | Usage |
|------------|-------|-------|
| `sm` | 640px | Dialog max-width, flex direction switches |
| `md` | 768px | Sidebar visibility, layout changes |

### Mobile Adaptations

- Sidebar hidden on mobile; Sheet used instead
- Phone layout uses bottom navigation (`MobileBottomNav`)
- Toasts position: `top-center` (phone) vs `bottom-right` (desktop)
- Dialog: `max-w-[calc(100%-2rem)]` mobile, `sm:max-w-lg` desktop
- DrawerContent: `max-h-[80vh]` with bottom-sheet pattern

### Container Queries

Used in Card and Field components:

```
@container/card-header
@container/field-group
```

---

## Dark Mode

Class-based: `.dark` on `<html>`. Provider detects system preference and allows manual override including custom theme.

Dark-mode-specific overrides:

| Pattern | Purpose |
|---------|---------|
| `dark:bg-input/30` | Subtle input background depth |
| `dark:hover:bg-input/50` | Input hover in dark mode |
| `dark:hover:bg-muted/50` | Ghost button hover |
| `dark:aria-invalid:ring-destructive/40` | Stronger error ring in dark |
| `dark:data-[state=checked]:bg-primary` | Checkbox checked state |

---

## Review Checklist

When reviewing UI code, verify:

| Check | Expected |
|-------|----------|
| Text sizing | Uses `.text-body`, `.text-body-sm`, `.text-h1` etc. — never raw `text-sm`, `text-lg` |
| Icon sizing | Uses `.icon-xs`, `.icon-sm` etc. — never raw `size-4` in components |
| Border radius | `rounded-lg` for containers, `rounded-full` for avatars/badges |
| Focus state | `focus-visible:border-primary` present on all interactive elements |
| Button height | Matches size variant (h-6 through h-10) |
| Padding | Uses established patterns (px-2.5 for buttons, px-3 for inputs, px-4 for cards) |
| Color references | Semantic tokens only (`text-foreground`, not `text-gray-900`) |
| Dark mode | `dark:bg-input/30` on inputs, proper ring opacity on errors |
| data-slot | Present on every component root |
| Transitions | `transition-none` where flash prevention needed, `transition-colors` for hover |
| Disabled | `disabled:pointer-events-none disabled:opacity-50` |
