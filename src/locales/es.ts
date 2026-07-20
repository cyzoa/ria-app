import type { Dictionary } from "@/locales/schema";

export const es = {
  "common": {
    "actions": {
      "save": "Guardar",
      "cancel": "Cancelar",
      "delete": "Eliminar",
      "edit": "Editar",
      "open": "Abrir →"
    },
    "pending": {
      "saving": "Guardando…",
      "savingShort": "Guardando",
      "adding": "Añadiendo…",
      "deleting": "Eliminando…",
      "processing": "Procesando…"
    },
    "count": {
      "one": "{count} elemento",
      "few": "{count} elementos",
      "many": "{count} elementos",
      "other": "{count} elementos"
    }
  },
  "navigation": {
    "label": "Navegación principal",
    "today": "Today",
    "tasks": "Tasks",
    "inbox": "Inbox",
    "notes": "Notes",
    "more": "More",
    "projects": "Projects",
    "settings": "Settings"
  },
  "appShell": {
    "logout": {
      "formal": {
        "withName": "Hasta la próxima, {name}.",
        "withoutName": "Hasta la próxima."
      },
      "casual": {
        "withName": "Nos vemos, {name}.",
        "withoutName": "Nos vemos."
      }
    },
    "voice": {
      "openLabel": "Abrir la entrada de voz de RIA",
      "listeningLabel": "RIA está escuchando",
      "listening": {
        "formal": "Escuchando",
        "casual": "Te escucho"
      }
    }
  },
  "home": {
    "greeting": {
      "morning": {
        "formal": {
          "withName": "Buenos días, {name}.",
          "withoutName": "Buenos días."
        },
        "casual": {
          "withName": "Buenos días, {name}.",
          "withoutName": "Buenos días."
        }
      },
      "afternoon": {
        "formal": {
          "withName": "Buenas tardes, {name}. ¿Nos tomamos un momento para ver cómo fluye su tarde?",
          "withoutName": "Buenas tardes. ¿Nos tomamos un momento para ver cómo fluye su tarde?"
        },
        "casual": {
          "withName": "Buenas tardes, {name}.",
          "withoutName": "Buenas tardes."
        }
      },
      "evening": {
        "formal": {
          "withName": "¿Repasamos con calma su día, {name}?",
          "withoutName": "¿Repasamos con calma su día?"
        },
        "casual": {
          "withName": "Buenas noches, {name}.",
          "withoutName": "Buenas noches."
        }
      }
    },
    "casualDefaultName": "",
    "rhythm": {
      "title": "El ritmo de hoy",
      "descriptions": {
        "Calm": "Hoy puede avanzar a un ritmo sereno, sin prisas.",
        "Focus": "Hoy puede centrarse en lo que más importa.",
        "Recovery": "Hoy conviene dejar espacio para el descanso y la recuperación.",
        "Light": "Hoy puede transcurrir con ligereza y calma.",
        "Deep Work": "Hoy es un día para trabajar con calma y concentración."
      }
    },
    "direction": {
      "title": "La dirección de hoy",
      "description": {
        "formal": "Tómese un momento para elegir algo que pueda orientar su día.",
        "casual": "Tómate un momento y elige algo que guíe tu día."
      },
      "placeholder": {
        "formal": "Si hoy eligiera una sola cosa, ¿qué sería lo más importante?",
        "casual": "Si hoy eligieras una sola cosa, ¿qué sería lo más importante?"
      },
      "empty": {
        "formal": "Aún no ha elegido una dirección para hoy.\n¿Empezamos por lo que más importa?",
        "casual": "Todavía no hay una dirección para hoy.\n¿Quieres elegir lo que más importa?"
      },
      "review": {
        "formal": "Seleccionar para volver a revisarla",
        "casual": "Seleccionar para verla de nuevo"
      },
      "choose": "Elegir la dirección de hoy",
      "inputLabel": "La dirección de hoy",
      "editLabel": "Editar la dirección de hoy: {title}"
    },
    "priorities": {
      "title": "Un paso que puede dar ahora",
      "description": {
        "formal": "Empiece por la tarea que le resulte más significativa.",
        "casual": "Empieza por la tarea que te resulte más significativa."
      },
      "empty": {
        "formal": "Aún no ha elegido las Tasks de hoy.\n¿Empezamos anotando lo que tenga en mente?",
        "casual": "Todavía no has elegido las Tasks de hoy.\n¿Quieres empezar por lo que tienes en mente?"
      },
      "choose": "Elegir en Tasks",
      "first": "Primero",
      "completeLabel": "Completar {title}",
      "reopenLabel": "Marcar {title} como pendiente"
    },
    "schedule": {
      "title": "Lo siguiente en su agenda",
      "description": {
        "formal": "Observe con calma cómo se distribuye su tiempo.",
        "casual": "Mira un momento cómo fluye tu tiempo."
      },
      "empty": {
        "formal": "Hoy su agenda está libre.\nHay espacio para avanzar con calma.",
        "casual": "Hoy tu agenda está libre.\nHay espacio para ir con calma."
      },
      "add": {
        "formal": "Añada algo si lo necesita",
        "casual": "Añade algo si lo necesitas"
      },
      "nearest": "A continuación",
      "later": "Más tarde"
    },
    "quickCapture": {
      "title": "Captura rápida",
      "action": "Dejar una idea por ahora",
      "description": {
        "formal": "Puede dejarla con calma en su Inbox.",
        "casual": "Puedes dejarla por ahora en tu Inbox."
      }
    },
    "suggestion": {
      "label": "Una sugerencia de RIA",
      "heading": {
        "formal": "¿Lo vemos juntos?",
        "casual": "¿Quieres que lo veamos juntos?"
      },
      "afternoonHeavy": {
        "formal": "Su tarde parece un poco ocupada. ¿Terminamos solo una cosa importante esta mañana?",
        "casual": "Tu tarde parece un poco ocupada. ¿Quieres terminar una cosa importante esta mañana?"
      }
    }
  },
  "tasks": {
    "title": "Tasks",
    "description": "Empiece con calma por lo que importa ahora",
    "create": {
      "open": "Crear una nueva Task",
      "titleLabel": "Título de la Task",
      "titlePlaceholder": "Anote una Task por ahora",
      "priorityLabel": "Prioridad",
      "projectLabel": "Project",
      "noProject": "Project sin asignar",
      "dueLabel": "Hora programada",
      "optional": "(opcional)",
      "submit": "Añadir Task"
    },
    "priority": {
      "low": "Baja",
      "medium": "Media",
      "high": "Alta"
    },
    "status": {
      "all": "Todos los estados",
      "todo": "Sin empezar",
      "doing": "En curso",
      "done": "Completada",
      "archived": "Archivada"
    },
    "sections": {
      "important": "Lo que importa ahora",
      "importantDescription": "Las Top 3 que conviene revisar primero",
      "active": "Tasks en curso",
      "activeDescription": "Continúe de una en una cuando sea el momento adecuado",
      "completed": "Tasks completadas",
      "completedDescription": "Puede volver a marcarlas como pendientes si lo necesita"
    },
    "empty": "Todavía no hay Tasks. Anote con calma el siguiente paso que tenga en mente.",
    "emptyFiltered": "Ninguna Task coincide con estos filtros. Pruebe a ajustar la vista.",
    "filters": {
      "title": "Ajustar vista",
      "description": "Filtrar la lista por estado o Project",
      "status": "Estado",
      "project": "Project",
      "allProjects": "Todos los Projects"
    },
    "item": {
      "top3": "Top 3",
      "priority": "Prioridad",
      "project": "Project",
      "addTop3": "Añadir a Top 3",
      "removeTop3": "Quitar de Top 3",
      "archive": "Archivar",
      "delete": "Eliminar",
      "completeLabel": "Marcar {title} como completada",
      "reopenLabel": "Marcar {title} como pendiente",
      "addTop3Label": "Añadir la Task {title} a Top 3",
      "removeTop3Label": "Quitar la Task {title} de Top 3",
      "archiveLabel": "Archivar la Task {title}",
      "deleteLabel": "Eliminar la Task {title}"
    }
  },
  "inbox": {
    "title": "Inbox",
    "description": {
      "formal": "Puede decidir qué significa más adelante. Por ahora, anote lo que le haya venido a la mente.",
      "casual": "Puedes decidirlo después. Por ahora, anota lo que te haya venido a la mente."
    },
    "capture": {
      "title": "Captura rápida",
      "placeholder": {
        "formal": "Escríbalo aquí antes de que se le olvide",
        "casual": "Escríbelo aquí antes de que se te olvide"
      },
      "submit": "Guardar",
      "pending": "Guardando…"
    },
    "list": {
      "title": "Ideas guardadas",
      "description": {
        "formal": "Revíselas con calma cuando esté preparado.",
        "casual": "Revísalas cuando estés preparado."
      },
      "empty": {
        "formal": "Cuando surja una idea, puede dejarla aquí por ahora.",
        "casual": "Cuando se te ocurra algo, déjalo aquí por ahora."
      }
    },
    "item": {
      "convert": "Mover a Tasks",
      "convertLabel": "Mover el elemento de Inbox a Tasks",
      "deleteLabel": "Eliminar el elemento de Inbox"
    }
  },
  "notes": {
    "title": "Notes",
    "description": {
      "formal": "Conserve las ideas que quiera guardar un poco más.",
      "casual": "Guarda las ideas que quieras conservar un poco más."
    },
    "create": {
      "title": "Nueva Note",
      "placeholder": {
        "formal": "Escriba una idea que quiera conservar",
        "casual": "Escribe una idea que quieras conservar"
      },
      "submit": "Guardar Note"
    },
    "list": {
      "title": "Notes recientes",
      "description": {
        "formal": "Las ideas más recientes aparecen primero.",
        "casual": "Tus ideas más recientes aparecen primero."
      },
      "empty": {
        "formal": "Todavía no hay Notes. Añada una cuando encuentre una idea que quiera conservar.",
        "casual": "Todavía no hay Notes. Añade una cuando quieras conservar una idea."
      }
    },
    "item": {
      "editing": "Editando Note",
      "saveChanges": "Guardar cambios",
      "saveChangesLabel": "Guardar los cambios de la Note",
      "cancelEditLabel": "Cancelar la edición de la Note",
      "editLabel": "Editar la Note",
      "deleteLabel": "Eliminar la Note"
    }
  },
  "projects": {
    "title": "Projects",
    "description": {
      "formal": "Observe con calma las direcciones que sigue manteniendo.",
      "casual": "Mira con calma las direcciones que sigues."
    },
    "create": {
      "open": "Crear un nuevo Project",
      "nameLabel": "Nombre del Project",
      "namePlaceholder": "Nombre el trabajo que quiera mantener agrupado",
      "colorLabel": "Color de referencia",
      "colorHelp": {
        "formal": "Este color secundario ayuda a distinguir el Project junto con su nombre.",
        "casual": "Este color ayuda a distinguir el Project junto con su nombre."
      },
      "submit": "Añadir Project"
    },
    "list": {
      "title": "Projects actuales",
      "description": {
        "formal": "Vea las direcciones en torno a las que se agrupan sus Tasks.",
        "casual": "Mira cómo se agrupan tus Tasks por dirección."
      },
      "empty": {
        "formal": "Todavía no hay Projects. Cree uno cuando quiera reunir trabajo en torno a una dirección.",
        "casual": "Todavía no hay Projects. Crea uno cuando quieras agrupar trabajo relacionado."
      },
      "taskCount": {
        "one": "{count} Task vinculada",
        "few": "{count} Tasks vinculadas",
        "many": "{count} Tasks vinculadas",
        "other": "{count} Tasks vinculadas"
      },
      "deleteLabel": "Eliminar el Project {name}"
    }
  },
  "more": {
    "title": "More",
    "description": "Vaya con calma a donde necesite",
    "navigationLabel": "Navegación adicional",
    "projectsDescription": "Revisar el flujo del trabajo en curso",
    "settingsDescription": "Ajustar el idioma, el tono y el entorno de RIA"
  },
  "settings": {
    "title": "Settings",
    "description": {
      "formal": "Elija cómo le gustaría que RIA se dirigiera a usted.",
      "casual": "Elige cómo quieres que RIA te hable."
    },
    "speechStyle": {
      "title": "Estilo de trato",
      "description": {
        "formal": "Elija el estilo con el que se sienta más cómodo.",
        "casual": "Elige el estilo con el que te sientas más cómodo."
      },
      "legend": "Elegir el estilo de trato de RIA",
      "formalLabel": "Trato respetuoso",
      "formalAccessibleLabel": "Estilo de trato respetuoso",
      "formalExample": "¿Revisamos juntos el día de hoy?",
      "casualLabel": "Trato cercano",
      "casualAccessibleLabel": "Estilo de trato cercano",
      "casualExample": "¿Quieres que veamos juntos el día de hoy?",
      "selected": "Seleccionado",
      "select": "Seleccionar",
      "saving": {
        "formal": "Guardando su estilo de trato…",
        "casual": "Guardando tu estilo de trato…"
      },
      "saved": {
        "formal": "Su estilo de trato se ha guardado.",
        "casual": "Tu estilo de trato está guardado."
      },
      "optionLabel": "{label}, {state}"
    },
    "language": {
      "title": "Idioma",
      "description": {
        "formal": "Elija el idioma que le gustaría usar en RIA.",
        "casual": "Elige el idioma que quieres usar en RIA."
      },
      "legend": "Elegir el idioma de RIA",
      "selected": "Seleccionado",
      "select": "Seleccionar",
      "saving": "Cambiando el idioma…",
      "saved": "Idioma cambiado.",
      "saveError": "No se pudo guardar el idioma. Inténtelo de nuevo.",
      "optionLabel": "{label}, {state}"
    }
  },
  "accessibility": {
    "itemCount": {
      "one": "{count} elemento",
      "few": "{count} elementos",
      "many": "{count} elementos",
      "other": "{count} elementos"
    }
  }
} as const satisfies Dictionary;
