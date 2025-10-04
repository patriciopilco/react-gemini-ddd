# 🏛️ DDD Xpert - Generador de Arquitectura DDD

**DDD Xpert** es una aplicación React moderna que utiliza Gemini AI para generar automáticamente arquitecturas completas de Domain-Driven Design (DDD) a partir de casos de uso. Convierte tus requisitos en diagramas C4 interactivos, bounded contexts, agregados y mucho más.

## 🚀 Características Principales

### 1. **Diagramas de Entidades Completos**
- Visualización detallada de Agregados con su estructura interna
- Identificación de Entidades Raíz (Root Entities)
- Listado de Entidades con sus atributos
- Objetos de Valor (Value Objects) con sus propiedades
- Repositorios asociados a cada agregado

### 2. **Bounded Contexts Explicados**
- Descripción detallada de cada Contexto Delimitado
- Responsabilidades específicas de cada contexto
- Relación con el dominio general del sistema
- Lenguaje Ubicuo (Ubiquitous Language) con términos y definiciones

### 3. **Context Maps (Mapas de Contexto)**
- Visualización de las relaciones entre Bounded Contexts
- Patrones de integración implementados:
  - 🤝 **Shared Kernel**: Kernel compartido entre contextos
  - 👥 **Customer-Supplier**: Relación cliente-proveedor
  - 🙇 **Conformist**: Downstream se conforma al upstream
  - 🛡️ **Anticorruption Layer**: Capa anticorrupción
  - 🌐 **Open Host Service**: Servicio de host abierto
  - 📝 **Published Language**: Lenguaje publicado
  - ↔️ **Separate Ways**: Contextos independientes
  - 🤜🤛 **Partnership**: Asociación entre contextos

### 4. **Diagramas C4 Interactivos con React Flow**
- 🎨 **Diagrama C4 - Nivel de Contexto**: Visualización interactiva de bounded contexts y sus relaciones
- 📦 **Diagrama C4 - Nivel de Contenedor**: Agregados, entidades, value objects y repositorios con conexiones visuales
- 🔧 **Diagrama C4 - Nivel de Componente**: Componentes técnicos con dependencias e interacciones
- Características interactivas:
  - Zoom y pan para explorar los diagramas
  - Minimapa para navegación rápida
  - Nodos arrastrables para reorganizar visualmente
  - Layout automático con algoritmo Dagre
  - Animaciones en las conexiones

### 5. **Diagrama de Componentes por Capas**
- Visualización de la arquitectura técnica organizada por capas:
  - 🖥️ **Capa de Presentación**: Controllers, Views, UI Components
  - ⚙️ **Capa de Aplicación**: Servicios de aplicación que coordinan el flujo
  - 🏛️ **Capa de Dominio**: Lógica de negocio, entidades, agregados
  - 🗄️ **Capa de Infraestructura**: Repositorios, APIs, Base de datos
- Componentes con sus responsabilidades y dependencias

### 6. **Análisis Completo de DDD**
- Identificación de Servicios de Dominio
- Servicios de Aplicación
- Eventos de Dominio
- Vista general del dominio del sistema

## 📋 Requisitos Previos

- Node.js (versión 14 o superior)
- npm o yarn
- Clave API de Google Gemini AI

## 🔧 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/patriciopilco/react-gemini-ddd.git
cd react-gemini-ddd
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea un archivo `.env` en la raíz del proyecto:
```env
REACT_APP_GEMINI_API_KEY=tu_clave_api_aqui
```

4. Inicia la aplicación:
```bash
npm start
```

La aplicación se abrirá en [http://localhost:3000](http://localhost:3000)

## 💡 Uso

1. **Ingresa los Casos de Uso**: Describe los casos de uso o requisitos de tu sistema en el área de texto.

   Ejemplo:
   ```
   - Un usuario puede registrarse en el sistema
   - Un cliente puede crear un nuevo pedido
   - El sistema debe procesar pagos con tarjeta de crédito
   - Un administrador puede gestionar productos
   - El sistema debe enviar notificaciones por email
   ```

2. **Genera la Arquitectura**: Haz clic en "Generar Arquitectura DDD"

3. **Explora los Resultados**: La aplicación mostrará:
   - Vista general del dominio
   - Bounded Contexts con sus componentes
   - Diagramas de agregados, entidades y value objects
   - Mapas de contexto con patrones de integración

## 🏗️ Estructura del Proyecto

```
react-gemini-ddd/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   └── DiagramLegend.js    # Leyenda de símbolos del diagrama
│   ├── App.js                   # Componente principal
│   ├── App.css
│   ├── index.js
│   └── ...
├── .env                         # Variables de entorno (no incluido en repo)
├── package.json
└── README.md
```

## 🎨 Tecnologías Utilizadas

- **React 19.1.0**: Framework de UI
- **Tailwind CSS**: Framework de estilos (CDN)
- **Google Gemini AI**: Modelo de IA para generación de arquitectura
- **Google Fonts (Inter)**: Tipografía moderna

## 📚 Conceptos DDD Implementados

### Bounded Context (Contexto Delimitado)
Un límite explícito dentro del cual un modelo de dominio particular es válido.

### Aggregate (Agregado)
Un cluster de objetos de dominio que pueden tratarse como una única unidad.

### Entity (Entidad)
Un objeto que tiene identidad única y es rastreado a través de su ciclo de vida.

### Value Object (Objeto de Valor)
Un objeto inmutable que describe características del dominio pero no tiene identidad propia.

### Repository (Repositorio)
Un mecanismo para encapsular el almacenamiento, recuperación y búsqueda de agregados.

### Context Map (Mapa de Contexto)
Una representación visual de las relaciones entre diferentes Bounded Contexts.

## 🔐 Seguridad

- Nunca compartas tu clave API de Gemini
- El archivo `.env` está incluido en `.gitignore`
- Las claves API deben mantenerse seguras en variables de entorno

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT.

## 👨‍💻 Autor

**Patricio Pilco**
- GitHub: [@patriciopilco](https://github.com/patriciopilco)

## 🙏 Agradecimientos

- Google Gemini AI por proporcionar la API de IA
- La comunidad de Domain-Driven Design
- Create React App por el template base

## 📞 Soporte

Si tienes preguntas o necesitas ayuda, por favor abre un issue en el repositorio de GitHub.

---

**¡Feliz modelado de dominios! 🎉**
