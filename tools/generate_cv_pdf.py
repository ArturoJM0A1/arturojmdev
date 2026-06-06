from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    Image,
    KeepTogether,
    NextPageTemplate,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUTS = [
    ROOT / "public" / "JuarezMonroyArturo CV.pdf",
    ROOT / "dist" / "JuarezMonroyArturo CV.pdf",
]
PROFILE_IMAGE = ROOT / "public" / "fotosanios" / "artsearch3removebgpreview.png"

DARK_GREEN = colors.HexColor("#123C2E")
DEEP_GREEN = colors.HexColor("#0B2F25")
ACCENT_GREEN = colors.HexColor("#1F6B4A")
MIST_GREEN = colors.HexColor("#EAF3EE")
LINE_GREEN = colors.HexColor("#A9C7B8")
INK = colors.HexColor("#16231F")


styles = getSampleStyleSheet()

TITLE = ParagraphStyle(
    "Title",
    parent=styles["Normal"],
    fontName="Helvetica-Bold",
    fontSize=20,
    leading=21,
    textColor=DARK_GREEN,
    spaceAfter=2,
    alignment=TA_LEFT,
)

HEADLINE = ParagraphStyle(
    "Headline",
    parent=styles["Normal"],
    fontName="Helvetica-Bold",
    fontSize=10.8,
    leading=12,
    textColor=ACCENT_GREEN,
    spaceAfter=4,
)

CONTACT = ParagraphStyle(
    "Contact",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=8.2,
    leading=10,
    textColor=colors.HexColor("#263B34"),
    spaceAfter=6,
)

SECTION = ParagraphStyle(
    "Section",
    parent=styles["Normal"],
    fontName="Helvetica-Bold",
    fontSize=10.2,
    leading=11,
    textColor=DARK_GREEN,
    spaceBefore=7,
    spaceAfter=4,
    borderWidth=0,
    borderColor=LINE_GREEN,
    borderPadding=0,
)

BODY = ParagraphStyle(
    "Body",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=9.05,
    leading=10.85,
    textColor=INK,
    spaceAfter=2.5,
)

SMALL = ParagraphStyle(
    "Small",
    parent=BODY,
    fontSize=8.7,
    leading=10.3,
)

ROLE = ParagraphStyle(
    "Role",
    parent=styles["Normal"],
    fontName="Helvetica-Bold",
    fontSize=9.35,
    leading=10.2,
    textColor=DEEP_GREEN,
    spaceBefore=2.6,
    spaceAfter=1,
)

META = ParagraphStyle(
    "Meta",
    parent=styles["Normal"],
    fontName="Helvetica-Bold",
    fontSize=8.5,
    leading=10,
    textColor=colors.HexColor("#426456"),
    spaceAfter=1,
)

BULLET = ParagraphStyle(
    "Bullet",
    parent=BODY,
    leftIndent=12,
    firstLineIndent=-8,
    spaceAfter=1.1,
)

CALLOUT = ParagraphStyle(
    "Callout",
    parent=BODY,
    fontSize=8.8,
    leading=10.4,
    leftIndent=6,
    rightIndent=6,
    borderWidth=0.6,
    borderColor=LINE_GREEN,
    borderPadding=5,
    backColor=MIST_GREEN,
    spaceBefore=5,
)

HEADER_TITLE = ParagraphStyle(
    "HeaderTitle",
    parent=TITLE,
    fontSize=21,
    leading=22,
    textColor=colors.white,
)

HEADER_HEADLINE = ParagraphStyle(
    "HeaderHeadline",
    parent=HEADLINE,
    fontSize=10.4,
    leading=11.5,
    textColor=colors.HexColor("#D7F0E4"),
)

HEADER_CONTACT = ParagraphStyle(
    "HeaderContact",
    parent=CONTACT,
    fontSize=7.8,
    leading=9.6,
    textColor=colors.HexColor("#F3FBF7"),
)


def clean(text: str) -> str:
    return (
        text.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
    )


def p(text, style=BODY):
    return Paragraph(text, style)


def section(title):
    return p(title.upper(), SECTION)


def bullet(text):
    return p(f"- {clean(text)}", BULLET)


def header_story(subtitle: str, with_photo: bool = False):
    contact = (
        "Atotonilco de Tula, Hidalgo, México | +52 1 773 680 2105 | "
        "juarezmonroyarturo574@gmail.com | linkedin.com/in/arturojuarezmonroy | "
        "github.com/ArturoJM0A1 | https://arturojuarezmonroy.vercel.app/"
    )

    if with_photo and PROFILE_IMAGE.exists():
        left = [
            p("Arturo Juárez Monroy", HEADER_TITLE),
            p(subtitle, HEADER_HEADLINE),
            p(contact, HEADER_CONTACT),
        ]
        photo = Image(str(PROFILE_IMAGE), width=0.62 * inch, height=0.64 * inch)
        photo_box = Table([[photo]], colWidths=[0.76 * inch], rowHeights=[0.76 * inch])
        photo_box.setStyle(
            TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, -1), MIST_GREEN),
                    ("BOX", (0, 0), (-1, -1), 1.1, colors.HexColor("#D7F0E4")),
                    ("ALIGN", (0, 0), (-1, -1), "CENTER"),
                    ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                    ("LEFTPADDING", (0, 0), (-1, -1), 0),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                    ("TOPPADDING", (0, 0), (-1, -1), 0),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
                ]
            )
        )
        table = Table(
            [[left, photo_box]],
            colWidths=[6.24 * inch, 1.0 * inch],
            rowHeights=[0.98 * inch],
        )
        table.setStyle(
            TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, -1), DARK_GREEN),
                    ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                    ("LEFTPADDING", (0, 0), (-1, -1), 10),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                    ("TOPPADDING", (0, 0), (-1, -1), 8),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
                    ("LINEBELOW", (0, 0), (-1, -1), 2, ACCENT_GREEN),
                ]
            )
        )
        return [table, Spacer(1, 7)]

    return [
        p("Arturo Juárez Monroy", TITLE),
        p(subtitle, HEADLINE),
        p(contact, CONTACT),
        Spacer(1, 2),
    ]


def role(title, company, period, bullets):
    flow = [
        p(f"{clean(title)} | {clean(period)}", ROLE),
        p(clean(company), META),
    ]
    flow.extend(bullet(item) for item in bullets)
    return KeepTogether(flow)


def project(title, year, stack, bullets):
    flow = [
        p(f"{clean(title)} ({clean(year)})", ROLE),
        p(clean(stack), META),
    ]
    flow.extend(bullet(item) for item in bullets)
    return KeepTogether(flow)


def build_story():
    story = []
    story.extend(
        header_story(
            "Ingeniero de Software | Backend Java/Spring Boot | Frontend JavaScript/React",
            with_photo=True,
        )
    )

    story.append(section("Perfil profesional"))
    story.append(
        p(
            "Ingeniero de Software con experiencia en desarrollo web full stack y enfoque actual en backend con "
            "Java/Spring Boot y frontend con JavaScript/React. He construido servicios REST, integraciones con "
            "bases de datos SQL, paneles administrativos, interfaces responsivas y soluciones basadas en datos. "
            "Experiencia reciente en entorno financiero con Java, Hibernate, HQL, Criteria API, Oracle y PL/SQL; "
            "capacidad para analizar código legacy, documentar requerimientos y colaborar con Scrum."
        )
    )

    story.append(section("Competencias técnicas"))
    skills = [
        "<b>Backend:</b> Java, Spring Boot, REST APIs, Hibernate, HQL, Criteria API, PL/SQL, Node.js, Laravel, PHP.",
        "<b>Frontend:</b> JavaScript, TypeScript, React, Next.js, Angular, Astro, Tailwind CSS, Bootstrap, HTML, CSS.",
        "<b>Bases de datos:</b> Oracle, PostgreSQL, MySQL, SQL Server, SQLite, MongoDB, Prisma ORM, SQL.",
        "<b>Herramientas:</b> Git, GitHub, Firebase/Firestore, WordPress, Scrum, Excel, Power BI, MySQL Workbench.",
        "<b>Datos e IA:</b> Python, JSON, GeoJSON, Ollama, TensorFlow.js, MobileNet, APIs externas.",
        "<b>Visual e interactivo:</b> React Native, Three.js, A-Frame, Web Speech API, PWA, Canvas.",
        "<b>Idiomas:</b> Español nativo, inglés básico.",
    ]
    for item in skills:
        story.append(p(item, SMALL))

    story.append(section("Experiencia profesional"))
    story.append(
        role(
            "Desarrollador Backend",
            "INBURSA Grupo Financiero | Pachuca de Soto, Hidalgo",
            "Mayo 2026 - Junio 2026",
            [
                "Desarrollé y di soporte a lógica backend en Java para entorno financiero, siguiendo arquitectura por capas y requerimientos funcionales.",
                "Implementé y analicé operaciones de persistencia con Hibernate, HQL y Criteria API sobre Oracle.",
                "Colaboré en servicios REST con Spring Boot, consultas PL/SQL, documentación técnica y prácticas Scrum.",
            ],
        )
    )
    story.append(
        role(
            "Desarrollador Full Stack React",
            "Independent Developer",
            "Abril 2025 - Febrero 2026",
            [
                "Construí aplicaciones web con React, TypeScript, JavaScript y Node.js, integrando APIs REST y bases de datos PostgreSQL.",
                "Diseñé interfaces responsivas con Tailwind CSS y componentes reutilizables, cuidando estado, navegación y experiencia de usuario.",
                "Entregué soluciones frontend y backend para proyectos independientes, desde prototipado hasta despliegue o demostración.",
            ],
        )
    )
    story.append(
        role(
            "Desarrollo en PHP y WordPress",
            "Grupo Alternativas Solucione | Mineral de la Reforma, Hidalgo",
            "Julio 2024 - Diciembre 2024",
            [
                "Creé temas y funcionalidades personalizadas en WordPress con PHP para soluciones web de negocio.",
                "Mantuve APIs REST desarrolladas con Laravel y apoyé aplicaciones React mediante corrección de errores y actualización de componentes.",
            ],
        )
    )
    story.append(
        role(
            "Desarrollo Web Full Stack - SECTUR",
            "Gobierno del Estado de Hidalgo | Pachuca de Soto, Hidalgo",
            "Diciembre 2023 - Agosto 2024",
            [
                "Desarrollé una plataforma web turística con PHP, MySQL, JavaScript, jQuery, Tailwind CSS y Git.",
                "Implementé secciones de noticias, eventos, calendario de actividades, mapas interactivos y filtros de navegación.",
                "Mejoré interfaz, navegación dinámica, rendimiento y experiencia de usuario para consulta de información turística.",
            ],
        )
    )

    story.append(NextPageTemplate("Body"))
    story.append(PageBreak())

    story.extend(
        header_story("Proyectos seleccionados, educación y certificaciones")
    )
    story.append(section("Proyectos destacados"))
    projects = [
        (
            "Sistema de Reservaciones de Servicios Técnicos",
            "2026",
            "Java, Spring Boot, Angular, PostgreSQL",
            [
                "Implementé reglas de negocio por tiempo y tipo de servicio; el sistema permite crear, consultar y cancelar reservas con actualización dinámica.",
            ],
        ),
        (
            "Aplicación SIG de Mapas del Estado de Hidalgo",
            "2025",
            "React Native, JSON, GeoJSON, Excel, Python",
            [
                "Desarrollé una app para visualizar datos de población y vivienda del INEGI por regiones; proyecto asociado a artículo publicado en Ciencia Latina.",
            ],
        ),
        (
            "Generador de Ciudades 3D con Three.js",
            "2026",
            "Three.js, OpenStreetMap, Overpass API, JavaScript",
            [
                "Desarrollé un sistema de generación procedimental de ciudades 3D interactivas con navegación dinámica y selección de edificios.",
            ],
        ),
        (
            "Detector de Objetos PWA en tiempo real",
            "2026",
            "Angular 19, TensorFlow.js, MobileNet, PWA",
            [
                "Creé una aplicación instalable que usa cámara o imágenes, muestra predicciones con porcentaje de confianza y funciona desde navegador.",
            ],
        ),
        (
            "Chat con IA Local",
            "2026",
            "Next.js, React, Ollama, API REST, Tailwind CSS",
            [
                "Integré una API propia en Next.js con Ollama y llama3.2:1b, manejo de estado en React e interfaz responsive.",
            ],
        ),
        (
            "Importación y Edición de Catálogos de Excel a Web",
            "2026",
            "Laravel, React, SQLite, MVC",
            [
                "Construí una aplicación para convertir archivos Excel en catálogos web, con edición reactiva y persistencia en base de datos.",
            ],
        ),
        (
            "Bar “El Mezcalito”",
            "2023",
            "PHP, MySQL, Bootstrap, JavaScript",
            [
                "Desarrollé sitio web para negocio local con menú de bebidas y alimentos, información del establecimiento y sistema de reservaciones.",
            ],
        ),
        (
            "Portal Turístico de Hidalgo",
            "2024",
            "PHP, MySQL, JavaScript, Bootstrap, Tailwind CSS",
            [
                "Desarrollé portal web para promoción turística con noticias, eventos, calendario, mapas interactivos y filtros de navegación.",
            ],
        ),
    ]
    for item in projects:
        story.append(project(*item))

    story.append(section("Educación"))
    story.append(
        p(
            "<b>Ingeniería en Software</b> - Universidad Autónoma del Estado de Hidalgo (2020 - 2024)",
            BODY,
        )
    )

    story.append(section("Certificaciones y formación relevante"))
    certs = [
        "Spring Boot 4 y Java 25: Desarrolla APIs REST Profesionales.",
        "Enterprise Full Stack with Spring Boot 4 and Angular 21.",
        "Frontend Developer (React).",
        "Fullstack Application Dev.",
        "JavaScript.",
        "Utility Types en TypeScript.",
        "Crea una PWA de Detección de Objetos con Angular 19 y TensorFlow.js.",
        "Fundamentos de Scrum.",
        "Python Essentials 1.",
        "Taller GIT y GITHUB.",
    ]
    for item in certs:
        story.append(bullet(item))

    story.append(section("Habilidades personales"))
    story.append(
        p(
            "Creatividad, adaptabilidad, enfoque en el detalle, compromiso con la calidad, resiliencia y comunicación clara en equipos técnicos.",
            BODY,
        )
    )
    story.append(
        p(
            "Enfoque de posicionamiento: backend Java/Spring Boot para servicios REST y persistencia SQL, "
            "complementado con frontend JavaScript/React para construir interfaces claras, responsivas y orientadas a negocio.",
            CALLOUT,
        )
    )
    return story


def create_pdf(path: Path):
    doc = BaseDocTemplate(
        str(path),
        pagesize=letter,
        leftMargin=0.48 * inch,
        rightMargin=0.48 * inch,
        topMargin=0.42 * inch,
        bottomMargin=0.38 * inch,
        author="Arturo Juárez Monroy",
        title="JuarezMonroyArturo CV",
        subject="CV ATS Backend Java Spring Boot Frontend JavaScript React",
    )
    frame = Frame(
        doc.leftMargin,
        doc.bottomMargin,
        doc.width,
        doc.height,
        leftPadding=0,
        rightPadding=0,
        topPadding=0,
        bottomPadding=0,
        id="normal",
    )
    doc.addPageTemplates([PageTemplate(id="Body", frames=[frame])])
    doc.build(build_story())


def main():
    for output in OUTPUTS:
        output.parent.mkdir(parents=True, exist_ok=True)
        create_pdf(output)
        print(output)


if __name__ == "__main__":
    main()
