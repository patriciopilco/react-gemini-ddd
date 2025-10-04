# 🏛️ DDD Xpert - Branding y Diseño

## Identidad de Marca

**DDD Xpert** es un generador inteligente de arquitectura Domain-Driven Design que combina el poder de la IA con las mejores prácticas de diseño de software.

## Esquema de Colores

### Colores Principales
- **Azul Principal**: `#1168bd` - Representa profesionalismo y confianza
- **Azul Oscuro**: `#0d4d8c` - Para contraste y profundidad
- **Teal/Verde azulado**: `#48bb78` - Para elementos de éxito y value objects
- **Naranja**: `#ed8936` - Para elementos de acción y repositorios
- **Púrpura**: `#805ad5` - Para interfaces y APIs

### Gradientes
```css
/* Gradiente principal del fondo */
background: linear-gradient(to bottom right, #6366f1, #a855f7);

/* Gradiente del título */
background: linear-gradient(to right, #2563eb, #14b8a6);

/* Gradiente del logo */
background: linear-gradient(135deg, #1168bd 0%, #0d4d8c 100%);
```

## Logo y Favicon

### Favicon SVG
El favicon presenta:
- Una letra "D" grande en el centro (Domain-Driven Design)
- Dos círculos decorativos:
  - Verde (#48bb78) - Representa crecimiento y value objects
  - Naranja (#ed8936) - Representa energía y repositorios
- Fondo con gradiente azul
- Esquinas redondeadas para un look moderno

### Iconografía
Utilizamos emojis y SVG para mantener una interfaz ligera y accesible:
- 🏛️ - Arquitectura (símbolo principal de DDD Xpert)
- 🔵 - Bounded Contexts
- 📦 - Contenedores y Agregados
- 🔧 - Componentes
- 🤝 - Patrones de integración
- 🎨 - Diagramas C4

## Tipografía

### Fuente Principal
- **Inter** - Una fuente sans-serif moderna y legible
- Pesos utilizados: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold), 800 (Extrabold)

### Aplicación
```css
font-family: 'Inter', sans-serif;
```

## Componentes de UI

### Botones
```css
/* Botón principal */
.btn-primary {
    background: linear-gradient(to right, #3b82f6, #14b8a6);
    color: white;
    font-weight: bold;
    border-radius: 9999px; /* fully rounded */
    padding: 0.75rem 2rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

/* Hover state */
.btn-primary:hover {
    background: linear-gradient(to right, #2563eb, #0d9488);
    transform: scale(1.05);
}
```

### Cards
```css
.card {
    background: white;
    border-radius: 0.75rem;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e7eb;
    padding: 2rem;
}
```

## Patrones de Diseño

### Diagrama C4 - Nivel de Contexto
- **Color**: Azul (#1168bd)
- **Uso**: Bounded contexts y sistemas
- **Estilo**: Nodos rectangulares con bordes redondeados

### Diagrama C4 - Nivel de Contenedor
- **Agregados**: Azul oscuro (#1168bd)
- **Entidades**: Azul claro (#63b3ed)
- **Value Objects**: Verde (#48bb78)
- **Repositorios**: Naranja (#ed8936)

### Diagrama C4 - Nivel de Componente
- **Componentes**: Gris (#4a5568)
- **Interfaces/APIs**: Púrpura (#805ad5)
- **Databases**: Naranja (#dd6b20)
- **Externos**: Gris claro (#718096)

## Guía de Estilo para Desarrollo

### Consistencia Visual
1. Usa siempre los colores de la paleta oficial
2. Mantén el espaciado consistente (múltiplos de 4px)
3. Aplica sombras sutiles para profundidad
4. Usa transiciones suaves (300ms ease-in-out)

### Accesibilidad
1. Contraste mínimo de 4.5:1 para texto
2. Usa etiquetas aria apropiadas
3. Asegura navegación por teclado
4. Proporciona tooltips descriptivos

### Responsive Design
```css
/* Mobile First */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
```

## Assets

### Ubicación de Archivos
```
public/
├── favicon.svg          # Favicon en formato SVG
├── favicon.ico          # Favicon para compatibilidad
├── logo192.png         # Logo para PWA (192x192)
├── logo512.png         # Logo para PWA (512x512)
└── manifest.json       # Configuración de PWA
```

## Mensajes y Copys

### Tono de Voz
- **Profesional**: Confiable y experto
- **Educativo**: Explica conceptos DDD claramente
- **Amigable**: Accesible y no intimidante
- **Preciso**: Técnicamente correcto

### Ejemplos de Copys
- **Título**: "🏛️ DDD Xpert"
- **Subtítulo**: "Generador de Arquitectura Domain-Driven Design"
- **CTA**: "Generar Arquitectura DDD"
- **Loading**: "Generando tu arquitectura DDD..."
- **Error**: "¡Error! Por favor, intenta de nuevo"

## SEO y Metadata

### Meta Tags
```html
<title>DDD Xpert - Generador de Arquitectura DDD</title>
<meta name="description" content="DDD Xpert - Generador de Arquitectura Domain-Driven Design">
<meta name="theme-color" content="#1168bd">
```

### PWA Manifest
```json
{
  "short_name": "DDD Xpert",
  "name": "DDD Xpert - Generador de Arquitectura Domain-Driven Design",
  "theme_color": "#1168bd",
  "background_color": "#ffffff"
}
```

## Evolución de Marca

### Versión 1.0 (Actual)
- Logo simple con letra "D"
- Paleta de colores azul/teal
- Enfoque en simplicidad y claridad

### Futuras Mejoras
- Logo animado para estados de carga
- Dark mode con paleta adaptada
- Temas personalizables por usuario
- Exportación de branding en documentación generada

## Recursos

### Herramientas de Diseño
- [Coolors.co](https://coolors.co) - Generador de paletas
- [Figma](https://figma.com) - Diseño de interfaz
- [SVG OMG](https://jakearchibald.github.io/svgomg/) - Optimización de SVG

### Inspiración
- Material Design
- Tailwind UI
- C4 Model Official Site
- Domain-Driven Design Community

---

**Última actualización**: Octubre 2025  
**Versión**: 1.0.0  
**Mantenido por**: Equipo DDD Xpert
