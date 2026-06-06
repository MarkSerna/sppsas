# CHTE — Cuestionario de Hábitos y Técnicas de Estudio

Versión web interactiva del cuestionario CHTE para la evaluación de hábitos y técnicas de estudio en estudiantes.

## Descripción

Esta aplicación permite aplicar y corregir el cuestionario CHTE directamente en el navegador, sin necesidad de instalación ni conexión a internet. El evaluador introduce las respuestas del alumno, y la herramienta calcula automáticamente las puntuaciones directas (PD) y los porcentajes por dimensión, mostrando el perfil del estudiante en una gráfica de líneas.

## Dimensiones evaluadas

| Código | Dimensión              | Puntuación máxima |
|--------|------------------------|:-----------------:|
| AC     | Actitud general        | 10                |
| LU     | Lugar de estudio       | 10                |
| ES     | Estado físico          | 6                 |
| PL     | Planificación          | 10                |
| TE     | Técnicas de estudio    | 9                 |
| EX     | Exámenes               | 5                 |
| TR     | Trabajos               | 6                 |

## Estructura del proyecto

```
chte-web/
├── index.html      # Página principal (cuestionario, tablas de resultados y gráfica)
├── style.css       # Estilos de la aplicación
├── script.js       # Lógica: renderizado de ítems, corrección y dibujo de la gráfica
└── images/         # Imágenes de cabecera, pies y ejes de la gráfica
    ├── image_0.png # Cabecera principal
    ├── image_1.png # Título del cuestionario
    ├── image_2.png # Eje Y izquierdo de la gráfica
    ├── image_3.png # Eje Y derecho de la gráfica
    ├── image_4.png # Pie de página
    └── image_5.png # Subencabezado con datos del alumno
```

## Uso

1. Abrir `index.html` en cualquier navegador moderno (Chrome, Firefox, Edge…).
2. Completar los datos del alumno: apellidos, edad, sexo, centro y curso.
3. Para cada ítem, hacer clic en la casilla ☐ de la columna correspondiente cuando la respuesta del alumno coincide con la clave de corrección.
4. Las **puntuaciones directas (PD)** y los **porcentajes (%)** se actualizan en tiempo real.
5. La **gráfica de perfil** se redibuja automáticamente al marcar o desmarcar respuestas.

## Funcionamiento técnico

- **`script.js`**: define los 56 ítems (`ITEMS`) con su dimensión y respuesta clave, construye dinámicamente las filas de la tabla (`build()`), calcula las puntuaciones (`getScores()`) y dibuja el perfil sobre un `<canvas>` (`draw()`).
- **`style.css`**: maqueta la hoja de corrección con un diseño de columnas fijo para replicar el formato impreso del cuestionario.
- No requiere librerías externas ni build process; es HTML/CSS/JS puro.

## Requisitos

- Navegador con soporte para Canvas API (cualquier navegador moderno).
- No se necesita servidor web; puede abrirse directamente como archivo local.

## Licencia

Uso interno. Los materiales del cuestionario CHTE están sujetos a los derechos de autor de sus autores originales.
