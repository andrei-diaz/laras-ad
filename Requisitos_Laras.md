

# **LAARAS WEB**

Página Web y Panel de Administración para Restaurante

**DOCUMENTO DE REQUISITOS**

Versión 1.0  
Diciembre 2024

# **Contenido**

1\. Introducción

2\. Descripción del Proyecto

3\. Alcance del Sistema

4\. Requisitos Funcionales

4.1 Página Web Pública

4.2 Panel de Administración

5\. Requisitos No Funcionales

6\. Arquitectura Técnica

7\. Fases de Desarrollo

8\. Propuesta Económica

9\. Consideraciones Adicionales

# **1\. Introducción**

El presente documento describe los requisitos técnicos y funcionales para el desarrollo de una página web profesional para restaurante, acompañada de un panel de administración que permitirá gestionar todo el contenido de manera autónoma.

El sistema está diseñado para un restaurante de comida casual que busca establecer una presencia digital profesional, mostrando su menú, promociones, información de contacto y estado de operación en tiempo real.

La solución permitirá al administrador actualizar el contenido de la página web sin necesidad de conocimientos técnicos, manteniendo la información siempre actualizada para los clientes.

# **2\. Descripción del Proyecto**

## **2.1 Objetivo General**

Desarrollar una página web atractiva y funcional para el restaurante, junto con un panel de administración intuitivo que permita gestionar todo el contenido visible en la página, incluyendo menú, promociones, horarios y estado de operación.

## **2.2 Objetivos Específicos**

* Establecer presencia digital profesional para el restaurante  
* Mostrar el menú completo con precios, descripciones e imágenes  
* Comunicar promociones y ofertas vigentes  
* Mostrar estado de operación (Abierto/Cerrado) en tiempo real  
* Facilitar el contacto con clientes potenciales  
* Mostrar reseñas y testimonios de clientes  
* Proporcionar autonomía al administrador para actualizar contenido

## **2.3 Perfil del Establecimiento**

| Característica | Descripción |
| :---- | :---- |
| Tipo de restaurante | Comida casual |
| Capacidad | 7 mesas, máximo 30 personas |
| Usuarios del sistema | Un administrador con control total |
| Objetivo principal | Presencia digital y gestión de contenido |

# **3\. Alcance del Sistema**

## **3.1 Incluido en el Desarrollo**

| Componente | Descripción |
| :---- | :---- |
| Página Web Pública | Sitio web responsive con información del restaurante, menú, promociones, ubicación, contacto, reseñas y estado en tiempo real |
| Panel de Administración | Interfaz privada para gestionar todo el contenido de la página web |
| Sistema de Horarios | Configuración de horarios regulares, especiales y estado automático Abierto/Cerrado |
| Gestión de Menú | CRUD completo de platillos con categorías, precios, descripciones e imágenes |
| Sistema de Reseñas | Integración con Google Reviews \+ sistema interno de testimonios |
| Hosting y Dominio | Configuración inicial del servidor y dominio web |

## **3.2 Fuera del Alcance Inicial (Posibles Mejoras Futuras)**

* Sistema de órdenes y pagos en línea  
* Sistema de reservaciones  
* Programa de lealtad/puntos  
* Blog de contenido  
* Integración con punto de venta

# **4\. Requisitos Funcionales**

## **4.1 Página Web Pública**

La página web será el escaparate digital del restaurante, accesible para cualquier visitante sin necesidad de registro.

### **4.1.1 Secciones de la Página**

| Sección | Contenido y Funcionalidad |
| :---- | :---- |
| Inicio | Banner principal, estado Abierto/Cerrado en tiempo real, promociones destacadas, llamadas a la acción |
| Menú | Catálogo organizado por categorías (entradas, platos fuertes, bebidas, postres), cada platillo con nombre, descripción, precio e imagen |
| Promociones | Ofertas activas, combos, descuentos especiales con fechas de vigencia |
| Nosotros | Historia del restaurante, misión, valores, lo que los hace únicos |
| Ubicación | Mapa interactivo de Google Maps, dirección completa, indicaciones de cómo llegar |
| Horarios | Horarios de atención por día, horarios especiales (festivos), indicador visual de estado actual |
| Contacto | Formulario de contacto, teléfono, correo electrónico, WhatsApp (opcional) |
| Redes Sociales | Enlaces a Facebook, Instagram, TikTok y otras redes del restaurante |
| Reseñas | Widget de Google Reviews integrado \+ testimonios internos seleccionados por el admin |

### **4.1.2 Estado del Restaurante (Abierto/Cerrado)**

Funcionalidad destacada que muestra en tiempo real si el restaurante está operando:

* Indicador visual prominente en la página de inicio  
* Cálculo automático basado en horarios configurados por el admin  
* Considera horarios regulares (lunes a domingo)  
* Considera horarios especiales (días festivos, vacaciones, eventos)  
* Los horarios especiales tienen prioridad sobre los regulares  
* Opción de override manual (forzar abierto/cerrado temporalmente)

### **4.1.3 Características Técnicas**

* Diseño responsive (móviles, tablets, computadoras)  
* Optimización SEO para posicionamiento en Google  
* Carga rápida con imágenes optimizadas  
* Certificado SSL (conexión segura HTTPS)  
* Compatible con navegadores modernos

## **4.2 Panel de Administración**

Interfaz privada accesible únicamente por el administrador mediante autenticación segura. Permite gestionar todo el contenido visible en la página web.

### **4.2.1 Gestión de Menú**

| Funcionalidad | Descripción |
| :---- | :---- |
| Categorías | Crear, editar, eliminar y ordenar categorías (entradas, bebidas, etc.) |
| Platillos | Agregar nuevos platillos con nombre, descripción, precio e imagen |
| Edición | Modificar información de platillos existentes |
| Disponibilidad | Marcar platillos como disponibles/no disponibles sin eliminarlos |
| Ordenamiento | Cambiar el orden de aparición de platillos en cada categoría |
| Imágenes | Subir y recortar imágenes de platillos, optimización automática |

### **4.2.2 Gestión de Promociones**

* Crear promociones con título, descripción e imagen  
* Configurar fechas de inicio y fin de vigencia  
* Activar/desactivar promociones manualmente  
* Marcar promociones como destacadas (aparecen en inicio)  
* Historial de promociones pasadas

### **4.2.3 Gestión de Horarios**

| Tipo de Horario | Configuración |
| :---- | :---- |
| Horarios Regulares | Hora de apertura y cierre para cada día de la semana (Lunes a Domingo) |
| Días de Descanso | Marcar días en que el restaurante no abre regularmente |
| Horarios Especiales | Configurar fechas específicas con horarios diferentes (festivos, eventos, vacaciones) |
| Cierre Temporal | Programar períodos de cierre (vacaciones, remodelación) |
| Override Manual | Forzar estado Abierto o Cerrado temporalmente ignorando horarios |

### **4.2.4 Gestión de Información**

* Editar información de la sección "Nosotros"  
* Actualizar dirección y coordenadas del mapa  
* Modificar datos de contacto (teléfono, correo, WhatsApp)  
* Gestionar enlaces a redes sociales  
* Cambiar imágenes del banner principal

### **4.2.5 Gestión de Reseñas**

* Integración automática con Google Reviews (widget)  
* Sistema interno de testimonios: agregar reseñas manualmente  
* Campos: nombre del cliente, texto del testimonio, calificación (estrellas)  
* Seleccionar qué testimonios mostrar en la página  
* Ordenar testimonios por relevancia

### **4.2.6 Dashboard**

* Vista general del estado actual del restaurante  
* Resumen de promociones activas  
* Accesos rápidos a las funciones más utilizadas  
* Mensajes recibidos del formulario de contacto

# **5\. Requisitos No Funcionales**

## **5.1 Rendimiento**

* Tiempo de carga de página menor a 3 segundos  
* Imágenes optimizadas automáticamente al subirse

## **5.2 Disponibilidad**

* Sistema disponible 24/7 en la nube  
* Respaldos automáticos de base de datos e imágenes

## **5.3 Seguridad**

* Autenticación segura para el panel de administración  
* Comunicación cifrada (HTTPS)  
* Protección contra ataques comunes (XSS, CSRF, SQL Injection)

## **5.4 Usabilidad**

* Panel de administración intuitivo, sin necesidad de conocimientos técnicos  
* Página web navegable y atractiva en cualquier dispositivo  
* Accesible desde cualquier navegador moderno

# **6\. Arquitectura Técnica**

## **6.1 Stack Tecnológico**

| Componente | Tecnología |
| :---- | :---- |
| Backend | Java con Spring Boot (API REST) |
| Frontend | React.js (página pública y panel de admin) |
| Base de Datos | MySQL |
| Almacenamiento | Servidor de archivos para imágenes |
| Hosting | Servicio en la nube (a definir) |
| Control de versiones | Git / GitHub |

## **6.2 Estructura del Sistema**

* API REST para comunicación entre frontend y backend  
* Autenticación mediante JWT para el panel de administración  
* Base de datos relacional para contenido y configuraciones  
* Separación clara entre página pública y panel privado

# **7\. Fases de Desarrollo**

El proyecto se desarrollará en fases incrementales con entregas funcionales.

| Fase | Nombre | Entregables | Duración |
| :---: | :---- | :---- | :---: |
| 1 | Configuración Base | Proyecto, base de datos, autenticación, estructura | 1 semana |
| 2 | Panel \- Menú y Categorías | CRUD completo de categorías y platillos | 1-2 semanas |
| 3 | Panel \- Contenido | Promociones, horarios, información, reseñas | 1-2 semanas |
| 4 | Página Web Pública | Diseño e implementación de todas las secciones | 2-3 semanas |
| 5 | Integración y Despliegue | Testing, correcciones, puesta en producción | 1 semana |

**Tiempo total estimado: 6-9 semanas**

# **8\. Propuesta Económica**

Se presentan dos modelos de inversión:

## **Opción A: Pago Único**

* Desarrollo completo de página web y panel  
* Dominio web (primer año)  
* Hosting (primer año)  
* Capacitación de uso del panel  
* Soporte técnico por 2 meses

**Inversión: A cotizar**

*Nota: Después del primer año, el cliente deberá cubrir la renovación anual del dominio y hosting.*

## **Opción B: Pago Único \+ Mantenimiento (Recomendado)**

Incluye todo lo de Opción A, más:

* Hosting incluido permanentemente  
* Soporte técnico continuo  
* Actualizaciones de seguridad  
* Respaldos gestionados  
* Mejoras menores incluidas

**Inversión inicial: A cotizar (menor que Opción A)**  
**Mensualidad: A cotizar**

# **9\. Consideraciones Adicionales**

## **9.1 Requerimientos del Cliente**

* Fotografías de alta calidad de los platillos  
* Logo del restaurante en formato digital  
* Información del menú (nombres, descripciones, precios)  
* Textos para sección "Nosotros"  
* Disponibilidad para reuniones de retroalimentación

## **9.2 Beneficios**

* Presencia digital profesional las 24 horas  
* Clientes informados del estado del restaurante en tiempo real  
* Menú siempre actualizado sin costos de impresión  
* Autonomía total para gestionar contenido  
* Mejor posicionamiento en búsquedas de Google  
* Base para futuras expansiones digitales

*— Fin del Documento —*