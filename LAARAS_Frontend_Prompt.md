# 🍽️ LAARAS - Restaurant Public Website Frontend Prompt

## Project Overview

Build a beautiful, modern **public-facing website** for **LAARAS**, a casual dining restaurant in Mexico. The website should serve as a digital showcase to attract customers, display the menu, promotions, and provide real-time information about the restaurant's operating status.

**Stack:** React.js + TypeScript + TailwindCSS (responsive, mobile-first design)

---

## 🎨 Design System & Branding

### Color Palette
```css
/* Primary Colors */
--color-primary: #C45C26;        /* Warm terracotta/burnt orange - CTAs, highlights */
--color-primary-dark: #A34A1D;   /* Darker terracotta for hover states */
--color-secondary: #2D4A3E;      /* Deep forest green - navigation, accents */
--color-accent: #D4A853;         /* Golden/amber - special elements, stars */

/* Backgrounds */
--bg-light: #FDF8F3;             /* Warm cream - main background */
--bg-dark: #1A1A1A;              /* Rich charcoal - footer, dark sections */
--bg-card: #FFFFFF;              /* Pure white - cards */
--bg-overlay: rgba(26, 26, 26, 0.7); /* Dark overlay for hero images */

/* Text */
--text-primary: #2C1810;         /* Dark brown - headings, main text */
--text-secondary: #6B5B4F;       /* Warm gray - descriptions, secondary text */
--text-light: #FFFFFF;           /* White - text on dark backgrounds */

/* Status */
--status-open: #22C55E;          /* Vibrant green - open indicator */
--status-closed: #DC2626;        /* Red - closed indicator */
--status-warning: #F59E0B;       /* Amber - limited availability */
```

### Typography
```css
/* Import from Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Josefin+Sans:wght@400;500;600&display=swap');

--font-heading: 'Cormorant Garamond', serif;  /* Elegant serif for headings */
--font-body: 'Inter', sans-serif;              /* Clean sans-serif for body */
--font-accent: 'Josefin Sans', sans-serif;     /* Stylish for menu items */
```

### Design Principles
- **Warm, inviting atmosphere** - feels like stepping into the restaurant
- **Food photography as hero** - high-quality images should be focal points
- **Generous whitespace** - elegant and uncluttered
- **Subtle animations** - smooth transitions, hover effects, scroll animations
- **Mobile-first responsive** - perfect on all devices (320px to 1920px+)
- **Glassmorphism accents** - frosted glass effect on cards over images
- **Micro-interactions** - buttons react, cards lift, elements breathe

---

## 📐 Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│                    HEADER (Sticky)                          │
│  [Logo]          [Nav Links]           [OPEN/CLOSED Badge]  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                    HERO SECTION                             │
│            (Full-screen with parallax)                      │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                 FEATURED PROMOTIONS                         │
│                   (Carousel)                                │
├─────────────────────────────────────────────────────────────┤
│                      MENU                                   │
│          (Category tabs + Dish cards grid)                  │
├─────────────────────────────────────────────────────────────┤
│                    ABOUT US                                 │
│          (Split: Story left, Images right)                  │
├─────────────────────────────────────────────────────────────┤
│                   HOURS & LOCATION                          │
│          (Map + Schedule side by side)                      │
├─────────────────────────────────────────────────────────────┤
│                     REVIEWS                                 │
│             (Testimonials carousel)                         │
├─────────────────────────────────────────────────────────────┤
│                     CONTACT                                 │
│          (Form + Contact info cards)                        │
├─────────────────────────────────────────────────────────────┤
│                     FOOTER                                  │
│    (Logo, links, social media, copyright)                   │
└─────────────────────────────────────────────────────────────┘
                 [WhatsApp Floating Button]
```

---

## 🧩 Component Specifications

### 1. Header/Navigation

**Desktop (≥1024px):**
```
┌────────────────────────────────────────────────────────────────────┐
│ [🍽️ LAARAS]   Inicio  Menú  Promociones  Nosotros  Contacto  [🟢 ABIERTO] │
└────────────────────────────────────────────────────────────────────┘
```

**Behavior:**
- **Sticky** - stays fixed at top on scroll
- **Transparent at top** - shows page content through header
- **Solid on scroll** - becomes solid with subtle shadow after 50px scroll
- **Smooth transition** - 0.3s ease for background color change

**Status Badge:**
- Green pulsing dot + "ABIERTO" when open
- Red dot + "CERRADO" with next opening time when closed
- Example: `🔴 CERRADO · Abrimos mañana 12:00`

**Mobile (≤768px):**
- Logo on left
- Status badge in center
- Hamburger menu (☰) on right
- Full-screen slide-in drawer with navigation links
- Drawer has dark overlay on background

---

### 2. Hero Section

**Layout:** Full viewport height (100vh), centered content

**Background:**
- High-quality image of restaurant interior or signature dish
- Subtle parallax effect on scroll (background moves slower)
- Dark gradient overlay (70% opacity at bottom, 30% at top)

**Content (centered):**
```
        ┌─────────────────────────────────┐
        │     🟢 ABIERTO AHORA           │ ← Status badge (large, animated pulse)
        │    Cerramos a las 10:00 PM     │ ← Closing time
        └─────────────────────────────────┘

                   LAARAS                   ← Restaurant name (very large, serif)
                   ───────
        "Sabores que inspiran momentos"     ← Tagline (italic, elegant)

        ┌─────────────┐  ┌─────────────────┐
        │  VER MENÚ   │  │   UBICACIÓN 📍  │  ← CTA Buttons
        └─────────────┘  └─────────────────┘
```

**Buttons:**
- Primary (VER MENÚ): Solid terracotta, white text, rounded-lg
- Secondary (UBICACIÓN): Outline white, transparent background
- Both have hover scale (1.05) and shadow increase

**Scroll Indicator:**
- Animated down arrow at bottom center
- Bounce animation inviting users to scroll

---

### 3. Featured Promotions Section

**Section Title:** "Promociones Especiales" (centered, decorative underline)

**Layout:** Horizontal carousel with 3 visible cards (desktop), 1 (mobile)

**Promotion Card:**
```
┌──────────────────────────────┐
│        [Promo Image]         │  ← 16:9 aspect ratio
│         (full width)         │
├──────────────────────────────┤
│  🏷️ ¡OFERTA!                 │  ← Ribbon badge (positioned top-right of image)
│                              │
│  Combo Familiar              │  ← Title (bold, large)
│  2 platos fuertes +          │  ← Description (2-3 lines max)
│  bebidas incluidas           │
│                              │
│  📅 Válido hasta: 15 Dic     │  ← Validity date (small, muted)
└──────────────────────────────┘
```

**Carousel Controls:**
- Previous/Next arrow buttons (sides)
- Dot indicators below (current dot highlighted)
- Auto-rotate every 5 seconds
- Pause on hover

---

### 4. Menu Section

**Section Title:** "Nuestro Menú" (centered)
**Subtitle:** "Descubre nuestros platillos preparados con los mejores ingredientes"

**Category Tabs:**
```
┌────────────────────────────────────────────────────────────────┐
│  [Todos]  [🥗 Entradas]  [🍖 Platos Fuertes]  [🍹 Bebidas]  [🍰 Postres] │
└────────────────────────────────────────────────────────────────┘
```

- Horizontally scrollable on mobile
- Active tab has underline accent (terracotta)
- Smooth transition when switching

**Search Bar (optional):**
- "Buscar platillo..." placeholder
- Search icon on left
- Filters dishes in real-time

**Dish Card Grid:**
- Desktop: 3 columns
- Tablet: 2 columns
- Mobile: 1 column
- Gap: 24px

**Individual Dish Card:**
```
┌──────────────────────────────────────┐
│                                      │
│          [Dish Image]                │ ← 4:3 aspect ratio, object-cover
│     (hover: slight zoom 1.05)        │
│                                      │
├──────────────────────────────────────┤
│                                      │
│  Tacos al Pastor               $85   │ ← Name + Price (flex justify-between)
│                                      │
│  Deliciosos tacos con piña,          │ ← Description (muted, 2 lines max)
│  cilantro y cebolla...               │
│                                      │
│  [🟢 Disponible]  ──or──  [⚠️ Agotado] │ ← Availability badge
│                                      │
└──────────────────────────────────────┘
```

**Card Behavior:**
- Subtle shadow on hover (lift effect)
- Click opens modal with full details:
  - Larger image
  - Full description
  - Ingredients (if available)
  - Close button (X)

**Empty State (when no dishes in category):**
```
┌────────────────────────────────────┐
│        🍽️                         │
│   No hay platillos disponibles    │
│   en esta categoría               │
└────────────────────────────────────┘
```

---

### 5. About Us Section (Nosotros)

**Layout:** Two-column split (desktop), stacked (mobile)

**Left Column (60%):**
```
        Nuestra Historia
        ─────────────────

        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam...

        ────────────────────────────────────

        Nuestra Misión
        ─────────────────

        Servir platillos excepcionales en un ambiente cálido
        y acogedor...

        ────────────────────────────────────

        🍃 Ingredientes Frescos    🤝 Servicio Excepcional
        👨‍🍳 Pasión por Cocinar      ❤️ Ambiente Familiar
```

**Right Column (40%):**
- Stacked images (2-3) with rounded corners
- Slight overlap for depth
- Images of: restaurant interior, chef cooking, food close-up

**Stats Section (below, full-width):**
```
┌──────────────────┬──────────────────┬──────────────────┐
│       7          │       30         │       5+         │
│     MESAS        │    COMENSALES    │      AÑOS        │
└──────────────────┴──────────────────┴──────────────────┘
```
- Numbers animate counting up when scrolled into view

---

### 6. Hours & Location Section

**Layout:** Two-column (desktop), stacked (mobile)

**Left Column - Hours:**
```
        Horarios de Atención
        ─────────────────────

        ┌─────────────────────────────────┐
        │ 🟢 ABIERTO AHORA                │ ← Current status (large)
        │    Cerramos en 2 horas          │
        └─────────────────────────────────┘

        Lunes        12:00 PM - 10:00 PM
        Martes       12:00 PM - 10:00 PM
        Miércoles    12:00 PM - 10:00 PM
        Jueves       12:00 PM - 10:00 PM
        Viernes      12:00 PM - 11:00 PM  ← Extended hours highlighted
        Sábado       11:00 AM - 11:00 PM
        Domingo      11:00 AM - 09:00 PM

        ⚠️ Horario especial:
        24 Dic - Cerramos 6:00 PM
```

- Current day row is highlighted (bold, accent background)
- Closed days show "Cerrado" in red
- Special hours appear in warning box below

**Right Column - Location:**
```
        Encuéntranos
        ─────────────

        ┌──────────────────────────────────────┐
        │                                      │
        │         [Google Map Embed]           │
        │                                      │
        │              📍                      │
        │                                      │
        └──────────────────────────────────────┘

        📍 Calle Principal #123, Colonia Centro
           Ciudad, Estado, CP 12345

        ┌─────────────────┐  ┌─────────────────┐
        │ 📍 Abrir en Maps │  │ 📋 Copiar       │
        └─────────────────┘  └─────────────────┘
```

---

### 7. Reviews Section (Reseñas)

**Section Title:** "Lo que dicen nuestros clientes"

**Layout:** Testimonials carousel

**Testimonial Card:**
```
┌────────────────────────────────────────────────────────────┐
│                                                            │
│         "La mejor comida casera de la ciudad.              │
│          El ambiente es increíble y el servicio            │
│          es excepcional. ¡Siempre regresamos!"             │
│                                                            │
│                     ⭐⭐⭐⭐⭐                               │
│                                                            │
│                   María García                             │
│                  hace 2 semanas                            │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

**Overall Rating Display:**
```
        ⭐ 4.8 de 5  •  Basado en 127 reseñas
```

**Carousel:**
- Show 1 testimonial at a time (centered, prominent)
- Smooth slide animation
- Auto-rotate every 6 seconds
- Dot navigation below

---

### 8. Contact Section

**Section Title:** "Contáctanos"
**Subtitle:** "¿Tienes preguntas? Estamos aquí para ayudarte"

**Layout:** Two-column (desktop), stacked (mobile)

**Left Column - Contact Form:**
```
┌──────────────────────────────────────────────────┐
│                                                  │
│  Nombre                                          │
│  ┌────────────────────────────────────────────┐  │
│  │                                            │  │
│  └────────────────────────────────────────────┘  │
│                                                  │
│  Correo electrónico                              │
│  ┌────────────────────────────────────────────┐  │
│  │                                            │  │
│  └────────────────────────────────────────────┘  │
│                                                  │
│  Teléfono (opcional)                             │
│  ┌────────────────────────────────────────────┐  │
│  │                                            │  │
│  └────────────────────────────────────────────┘  │
│                                                  │
│  Mensaje                                         │
│  ┌────────────────────────────────────────────┐  │
│  │                                            │  │
│  │                                            │  │
│  │                                            │  │
│  └────────────────────────────────────────────┘  │
│                                                  │
│  ┌──────────────────────────────────────────┐    │
│  │          📤 ENVIAR MENSAJE               │    │
│  └──────────────────────────────────────────┘    │
│                                                  │
└──────────────────────────────────────────────────┘
```

**Form Validation:**
- Required fields: Name, Email, Message
- Email format validation
- Error messages below each invalid field
- Submit button shows loading spinner during submission
- Success toast: "¡Mensaje enviado! Te responderemos pronto."
- Error toast: "Error al enviar. Intenta de nuevo."

**Right Column - Contact Info Cards:**
```
┌────────────────────────────────┐
│  📞 Teléfono                   │
│     +52 (123) 456-7890         │ ← Clickable (tel: link)
└────────────────────────────────┘

┌────────────────────────────────┐
│  💬 WhatsApp                   │
│     +52 (123) 456-7890         │ ← Clickable (wa.me link)
└────────────────────────────────┘

┌────────────────────────────────┐
│  📧 Correo                     │
│     contacto@laaras.com        │ ← Clickable (mailto: link)
└────────────────────────────────┘

        ─────────────────────

        Síguenos en redes:

        [📘 Facebook]  [📷 Instagram]  [🎵 TikTok]
```

---

### 9. Footer

**Background:** Dark charcoal (#1A1A1A)
**Text:** Light/white

**Layout:**
```
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│      [🍽️ LAARAS]              Enlaces Rápidos        Contáctanos       │
│                               ───────────────        ──────────────    │
│   Sabores que inspiran        Inicio                 📍 Dirección...  │
│   momentos                    Menú                   📞 +52 123...    │
│                               Promociones            📧 contacto@...  │
│                               Nosotros                                 │
│      [Facebook] [Instagram]   Contacto               ⏰ Lun-Dom        │
│      [TikTok]                                           12:00-10:00   │
│                                                                        │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│        © 2024 LAARAS Restaurant. Todos los derechos reservados.       │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

---

### 10. WhatsApp Floating Button

**Position:** Fixed, bottom-right corner (24px from edges)

**Appearance:**
```
     ┌─────┐
     │ 💬  │  ← WhatsApp green (#25D366), rounded-full
     └─────┘
```

**Behavior:**
- Subtle bounce animation on page load
- Shows tooltip "¿Necesitas ayuda?" on hover
- Opens WhatsApp chat with pre-filled message
- Hides when near footer (avoid overlap)

---

## ✨ Animations & Interactions

### Scroll Animations (Framer Motion or AOS)
- **Fade in up:** All sections fade in + slide up 30px when entering viewport
- **Stagger children:** Cards animate one after another (0.1s delay)
- **Parallax:** Hero background moves at 0.5x scroll speed

### Hover Effects
- **Buttons:** Scale 1.05, shadow increase, 0.2s transition
- **Cards:** Translate Y -5px, shadow increase, 0.3s transition
- **Images:** Scale 1.05 within container (overflow hidden), 0.4s transition
- **Links:** Color change to primary, underline slides in from left

### Status Badge Animation
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
.status-open .dot {
  animation: pulse 2s infinite;
}
```

### Loading States
- **Skeleton loaders:** Gray animated placeholders for cards
- **Spinner:** Terracotta colored circular spinner for buttons
- **Toast notifications:** Slide in from top-right, auto-dismiss 5s

### Page Transitions
- Smooth scroll to sections (scroll-behavior: smooth)
- Anchor links for navigation (/#menu, /#contacto, etc.)

---

## 📱 Responsive Breakpoints

```css
/* Mobile First Approach */
/* Base styles for mobile: 320px - 767px */

/* Tablet: 768px - 1023px */
@media (min-width: 768px) { }

/* Desktop: 1024px - 1279px */
@media (min-width: 1024px) { }

/* Large Desktop: 1280px+ */
@media (min-width: 1280px) { }
```

### Key Responsive Changes:
| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Navigation | Hamburger drawer | Hamburger drawer | Horizontal links |
| Hero title | 36px | 48px | 64px |
| Menu grid | 1 column | 2 columns | 3 columns |
| About section | Stacked | Stacked | Side-by-side |
| Hours/Location | Stacked | Stacked | Side-by-side |
| Contact form | Full width | Full width | Side-by-side |

---

## 🔌 Data Structure (for Mock/API Integration)

### Restaurant Status
```typescript
interface RestaurantStatus {
  isOpen: boolean;
  currentTime: string;
  nextChange: string; // "Cerramos a las 10:00 PM" or "Abrimos mañana 12:00 PM"
}
```

### Menu Category
```typescript
interface Category {
  id: number;
  name: string;
  icon: string; // emoji or icon name
  order: number;
}
```

### Dish
```typescript
interface Dish {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: number;
  isAvailable: boolean;
}
```

### Promotion
```typescript
interface Promotion {
  id: number;
  title: string;
  description: string;
  image: string;
  startDate: string;
  endDate: string;
  isFeatured: boolean;
}
```

### Hours
```typescript
interface DayHours {
  day: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}

interface SpecialHours {
  date: string;
  description: string;
  isOpen: boolean;
  openTime?: string;
  closeTime?: string;
}
```

### Review
```typescript
interface Review {
  id: number;
  customerName: string;
  rating: number; // 1-5
  text: string;
  date: string;
}
```

### Restaurant Info
```typescript
interface RestaurantInfo {
  name: string;
  tagline: string;
  story: string;
  mission: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  mapCoordinates: { lat: number; lng: number };
  socialLinks: {
    facebook?: string;
    instagram?: string;
    tiktok?: string;
  };
}
```

---

## 📋 Sample Mock Data

```json
{
  "status": {
    "isOpen": true,
    "currentTime": "2:30 PM",
    "nextChange": "Cerramos a las 10:00 PM"
  },
  "categories": [
    { "id": 1, "name": "Entradas", "icon": "🥗", "order": 1 },
    { "id": 2, "name": "Platos Fuertes", "icon": "🍖", "order": 2 },
    { "id": 3, "name": "Bebidas", "icon": "🍹", "order": 3 },
    { "id": 4, "name": "Postres", "icon": "🍰", "order": 4 }
  ],
  "dishes": [
    {
      "id": 1,
      "name": "Tacos al Pastor",
      "description": "Deliciosos tacos con carne al pastor, piña, cilantro y cebolla. Servidos con salsa verde y limón.",
      "price": 85,
      "image": "/images/tacos-pastor.jpg",
      "categoryId": 2,
      "isAvailable": true
    },
    {
      "id": 2,
      "name": "Guacamole con Totopos",
      "description": "Aguacate fresco machacado con jitomate, cebolla, cilantro y chile serrano.",
      "price": 65,
      "image": "/images/guacamole.jpg",
      "categoryId": 1,
      "isAvailable": true
    },
    {
      "id": 3,
      "name": "Agua de Horchata",
      "description": "Refrescante agua de arroz con canela y un toque de vainilla.",
      "price": 35,
      "image": "/images/horchata.jpg",
      "categoryId": 3,
      "isAvailable": false
    }
  ],
  "promotions": [
    {
      "id": 1,
      "title": "Combo Familiar",
      "description": "2 platos fuertes + 4 bebidas + postre para compartir. ¡Perfecto para disfrutar en familia!",
      "image": "/images/promo-familiar.jpg",
      "startDate": "2024-12-01",
      "endDate": "2024-12-31",
      "isFeatured": true
    }
  ],
  "hours": [
    { "day": "Lunes", "isOpen": true, "openTime": "12:00", "closeTime": "22:00" },
    { "day": "Martes", "isOpen": true, "openTime": "12:00", "closeTime": "22:00" },
    { "day": "Miércoles", "isOpen": true, "openTime": "12:00", "closeTime": "22:00" },
    { "day": "Jueves", "isOpen": true, "openTime": "12:00", "closeTime": "22:00" },
    { "day": "Viernes", "isOpen": true, "openTime": "12:00", "closeTime": "23:00" },
    { "day": "Sábado", "isOpen": true, "openTime": "11:00", "closeTime": "23:00" },
    { "day": "Domingo", "isOpen": true, "openTime": "11:00", "closeTime": "21:00" }
  ],
  "reviews": [
    {
      "id": 1,
      "customerName": "María García",
      "rating": 5,
      "text": "La mejor comida casera de la ciudad. El ambiente es increíble y el servicio es excepcional. ¡Siempre regresamos!",
      "date": "2024-11-25"
    },
    {
      "id": 2,
      "customerName": "Carlos Rodríguez",
      "rating": 5,
      "text": "Los tacos al pastor son los mejores que he probado. Ambiente muy acogedor y precios justos.",
      "date": "2024-11-20"
    }
  ],
  "info": {
    "name": "LAARAS",
    "tagline": "Sabores que inspiran momentos",
    "story": "Desde hace más de 5 años, LAARAS ha sido el lugar favorito de familias y amigos para disfrutar de auténtica comida mexicana...",
    "mission": "Servir platillos excepcionales preparados con ingredientes frescos en un ambiente cálido y acogedor.",
    "address": "Calle Principal #123, Colonia Centro, Ciudad, Estado, CP 12345",
    "phone": "+52 (123) 456-7890",
    "whatsapp": "+52 (123) 456-7890",
    "email": "contacto@laaras.com",
    "mapCoordinates": { "lat": 19.4326, "lng": -99.1332 },
    "socialLinks": {
      "facebook": "https://facebook.com/laaras",
      "instagram": "https://instagram.com/laaras",
      "tiktok": "https://tiktok.com/@laaras"
    }
  }
}
```

---

## ⚙️ Key Features Summary

1. **Real-time Open/Closed Status** - Prominent indicator based on configured hours
2. **Responsive Menu** - Category filtering, search, availability badges
3. **Promotions Carousel** - Auto-rotating featured deals
4. **Interactive Hours Display** - Current day highlighted, special hours alerts
5. **Google Maps Integration** - Embedded map with custom marker
6. **Reviews Carousel** - Customer testimonials with star ratings
7. **Contact Form** - Validation, loading states, success/error feedback
8. **WhatsApp Integration** - Floating button for quick contact
9. **Social Media Links** - Facebook, Instagram, TikTok
10. **SEO Optimized** - Proper meta tags, semantic HTML, fast loading

---

## 🚀 Implementation Priority

1. Header with navigation and status badge
2. Hero section with CTAs
3. Menu section with categories and dish cards
4. Footer with contact info
5. Hours & Location section
6. About Us section
7. Contact form
8. Promotions carousel
9. Reviews section
10. Polish animations and mobile responsiveness

---

*This prompt is designed for AI frontend tools like Stitch, v0, Bolt, or Lovable. Copy sections as needed or use the complete prompt for full page generation.*
