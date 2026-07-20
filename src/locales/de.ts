import type { Dictionary } from "@/locales/schema";

export const de = {
  "common": {
    "actions": {
      "save": "Speichern",
      "cancel": "Abbrechen",
      "delete": "Löschen",
      "edit": "Bearbeiten",
      "open": "Öffnen →"
    },
    "pending": {
      "saving": "Wird gespeichert…",
      "savingShort": "Speichern",
      "adding": "Wird hinzugefügt…",
      "deleting": "Wird gelöscht…",
      "processing": "Wird verarbeitet…"
    },
    "count": {
      "one": "{count} Eintrag",
      "few": "{count} Einträge",
      "many": "{count} Einträge",
      "other": "{count} Einträge"
    }
  },
  "navigation": {
    "label": "Hauptnavigation",
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
        "withName": "Bis zum nächsten Mal, {name}.",
        "withoutName": "Bis zum nächsten Mal."
      },
      "casual": {
        "withName": "Bis dann, {name}.",
        "withoutName": "Bis dann."
      }
    },
    "voice": {
      "openLabel": "RIA-Spracheingabe öffnen",
      "listeningLabel": "RIA hört zu",
      "listening": {
        "formal": "Ich höre zu",
        "casual": "Ich höre dir zu"
      }
    }
  },
  "home": {
    "greeting": {
      "morning": {
        "formal": {
          "withName": "Guten Morgen, {name}.",
          "withoutName": "Guten Morgen."
        },
        "casual": {
          "withName": "Guten Morgen, {name}.",
          "withoutName": "Guten Morgen."
        }
      },
      "afternoon": {
        "formal": {
          "withName": "Guten Tag, {name}. Nehmen wir uns einen Moment, um zu sehen, wie Ihr Nachmittag verläuft.",
          "withoutName": "Guten Tag. Nehmen wir uns einen Moment, um zu sehen, wie Ihr Nachmittag verläuft."
        },
        "casual": {
          "withName": "Guten Tag, {name}.",
          "withoutName": "Guten Tag."
        }
      },
      "evening": {
        "formal": {
          "withName": "Wollen wir behutsam auf Ihren Tag zurückblicken, {name}?",
          "withoutName": "Wollen wir behutsam auf Ihren Tag zurückblicken?"
        },
        "casual": {
          "withName": "Guten Abend, {name}.",
          "withoutName": "Guten Abend."
        }
      }
    },
    "casualDefaultName": "",
    "rhythm": {
      "title": "Der Rhythmus des Tages",
      "descriptions": {
        "Calm": "Heute darf es in einem ruhigen, gleichmäßigen Tempo weitergehen.",
        "Focus": "Heute können Sie bei dem bleiben, was am wichtigsten ist.",
        "Recovery": "Heute darf Raum für Ruhe und Erholung entstehen.",
        "Light": "Heute darf sich leicht und gelassen entfalten.",
        "Deep Work": "Heute ist Zeit für ruhige, konzentrierte Arbeit."
      }
    },
    "direction": {
      "title": "Die Richtung des Tages",
      "description": {
        "formal": "Nehmen Sie sich einen Moment Zeit und wählen Sie etwas, das Ihren Tag leiten kann.",
        "casual": "Nimm dir einen Moment Zeit und wähle etwas, das deinen Tag leiten kann."
      },
      "placeholder": {
        "formal": "Wenn Sie heute nur eine Sache wählen würden, was wäre am wichtigsten?",
        "casual": "Wenn du heute nur eine Sache wählen würdest, was wäre am wichtigsten?"
      },
      "empty": {
        "formal": "Sie haben noch keine Richtung für heute gewählt.\nWollen wir mit dem beginnen, was am wichtigsten ist?",
        "casual": "Für heute gibt es noch keine Richtung.\nMöchtest du wählen, was am wichtigsten ist?"
      },
      "review": {
        "formal": "Auswählen, um erneut hinzusehen",
        "casual": "Auswählen, um noch einmal hinzusehen"
      },
      "choose": "Richtung für heute wählen",
      "inputLabel": "Richtung für heute",
      "editLabel": "Richtung für heute bearbeiten: {title}"
    },
    "priorities": {
      "title": "Ein möglicher nächster Schritt",
      "description": {
        "formal": "Beginnen Sie mit der Aufgabe, die Ihnen am bedeutsamsten erscheint.",
        "casual": "Beginne mit der Aufgabe, die dir am bedeutsamsten erscheint."
      },
      "empty": {
        "formal": "Sie haben die heutigen Tasks noch nicht gewählt.\nWollen wir zunächst notieren, was Ihnen in den Sinn kommt?",
        "casual": "Du hast die heutigen Tasks noch nicht gewählt.\nMöchtest du mit dem beginnen, was dir in den Sinn kommt?"
      },
      "choose": "In Tasks auswählen",
      "first": "Zuerst",
      "completeLabel": "{title} abschließen",
      "reopenLabel": "{title} als unerledigt markieren"
    },
    "schedule": {
      "title": "Als Nächstes in Ihrem Zeitplan",
      "description": {
        "formal": "Betrachten Sie in Ruhe, wie Ihre Zeit verläuft.",
        "casual": "Schau kurz, wie deine Zeit verläuft."
      },
      "empty": {
        "formal": "Ihr Zeitplan ist heute frei.\nEs gibt Raum für ein ruhiges Tempo.",
        "casual": "Dein Zeitplan ist heute frei.\nEs gibt Raum, es ruhig anzugehen."
      },
      "add": {
        "formal": "Bei Bedarf etwas hinzufügen",
        "casual": "Füge bei Bedarf etwas hinzu"
      },
      "nearest": "Als Nächstes",
      "later": "Später"
    },
    "quickCapture": {
      "title": "Schnelle Notiz",
      "action": "Einen Gedanken vorerst ablegen",
      "description": {
        "formal": "Sie können ihn behutsam in Ihrer Inbox ablegen.",
        "casual": "Du kannst ihn vorerst in deiner Inbox ablegen."
      }
    },
    "suggestion": {
      "label": "Ein Vorschlag von RIA",
      "heading": {
        "formal": "Wollen wir uns das gemeinsam ansehen?",
        "casual": "Möchtest du dir das gemeinsam ansehen?"
      },
      "afternoonHeavy": {
        "formal": "Ihr Nachmittag wirkt etwas voll. Wollen wir heute Vormittag nur eine wichtige Sache abschließen?",
        "casual": "Dein Nachmittag wirkt etwas voll. Möchtest du heute Vormittag eine wichtige Sache abschließen?"
      }
    }
  },
  "tasks": {
    "title": "Tasks",
    "description": "Beginnen Sie ruhig mit dem, was jetzt wichtig ist",
    "create": {
      "open": "Neue Task erstellen",
      "titleLabel": "Task-Titel",
      "titlePlaceholder": "Eine Task für später notieren",
      "priorityLabel": "Priorität",
      "projectLabel": "Project",
      "noProject": "Kein Project festgelegt",
      "dueLabel": "Geplante Zeit",
      "optional": "(optional)",
      "submit": "Task hinzufügen"
    },
    "priority": {
      "low": "Niedrig",
      "medium": "Mittel",
      "high": "Hoch"
    },
    "status": {
      "all": "Alle Status",
      "todo": "Nicht begonnen",
      "doing": "In Bearbeitung",
      "done": "Erledigt",
      "archived": "Archiviert"
    },
    "sections": {
      "important": "Was jetzt wichtig ist",
      "importantDescription": "Ihre Top 3 für den ersten Blick",
      "active": "Laufende Tasks",
      "activeDescription": "Setzen Sie jeweils eine fort, wenn der Zeitpunkt passt",
      "completed": "Erledigte Tasks",
      "completedDescription": "Sie können sie bei Bedarf wieder als unerledigt markieren"
    },
    "empty": "Noch sind keine Tasks vorhanden. Notieren Sie in Ruhe den nächsten Schritt, der Ihnen einfällt.",
    "emptyFiltered": "Keine Task entspricht diesen Filtern. Passen Sie die Ansicht an.",
    "filters": {
      "title": "Ansicht anpassen",
      "description": "Liste nach Status oder Project eingrenzen",
      "status": "Status",
      "project": "Project",
      "allProjects": "Alle Projects"
    },
    "item": {
      "top3": "Top 3",
      "priority": "Priorität",
      "project": "Project",
      "addTop3": "Zu Top 3 hinzufügen",
      "removeTop3": "Aus Top 3 entfernen",
      "archive": "Archivieren",
      "delete": "Löschen",
      "completeLabel": "{title} als erledigt markieren",
      "reopenLabel": "{title} als unerledigt markieren",
      "addTop3Label": "Task {title} zu Top 3 hinzufügen",
      "removeTop3Label": "Task {title} aus Top 3 entfernen",
      "archiveLabel": "Task {title} archivieren",
      "deleteLabel": "Task {title} löschen"
    }
  },
  "inbox": {
    "title": "Inbox",
    "description": {
      "formal": "Was es bedeutet, können Sie später entscheiden. Legen Sie zunächst ab, was Ihnen in den Sinn kam.",
      "casual": "Was es bedeutet, kannst du später entscheiden. Leg zunächst ab, was dir in den Sinn kam."
    },
    "capture": {
      "title": "Schnelle Notiz",
      "placeholder": {
        "formal": "Schreiben Sie es hier auf, bevor es entgleitet",
        "casual": "Schreib es hier auf, bevor du es vergisst"
      },
      "submit": "Notieren",
      "pending": "Wird notiert…"
    },
    "list": {
      "title": "Festgehaltene Gedanken",
      "description": {
        "formal": "Sehen Sie sie in Ruhe durch, wenn Sie bereit sind.",
        "casual": "Schau sie durch, wenn du bereit bist."
      },
      "empty": {
        "formal": "Wenn ein Gedanke auftaucht, können Sie ihn vorerst hier ablegen.",
        "casual": "Wenn dir etwas einfällt, leg es vorerst hier ab."
      }
    },
    "item": {
      "convert": "Zu Tasks verschieben",
      "convertLabel": "Inbox-Eintrag zu Tasks verschieben",
      "deleteLabel": "Inbox-Eintrag löschen"
    }
  },
  "notes": {
    "title": "Notes",
    "description": {
      "formal": "Bewahren Sie Gedanken auf, die Sie etwas länger festhalten möchten.",
      "casual": "Bewahre Gedanken auf, die du etwas länger festhalten möchtest."
    },
    "create": {
      "title": "Neue Note",
      "placeholder": {
        "formal": "Einen Gedanken notieren, den Sie bewahren möchten",
        "casual": "Einen Gedanken notieren, den du bewahren möchtest"
      },
      "submit": "Note speichern"
    },
    "list": {
      "title": "Neueste Notes",
      "description": {
        "formal": "Ihre neuesten Gedanken erscheinen zuerst.",
        "casual": "Deine neuesten Gedanken erscheinen zuerst."
      },
      "empty": {
        "formal": "Noch sind keine Notes vorhanden. Fügen Sie eine hinzu, wenn ein Gedanke bleiben soll.",
        "casual": "Noch sind keine Notes vorhanden. Füge eine hinzu, wenn du einen Gedanken bewahren möchtest."
      }
    },
    "item": {
      "editing": "Note bearbeiten",
      "saveChanges": "Änderungen speichern",
      "saveChangesLabel": "Änderungen der Note speichern",
      "cancelEditLabel": "Bearbeitung der Note abbrechen",
      "editLabel": "Note bearbeiten",
      "deleteLabel": "Note löschen"
    }
  },
  "projects": {
    "title": "Projects",
    "description": {
      "formal": "Betrachten Sie in Ruhe die Richtungen, denen Sie weiter folgen.",
      "casual": "Betrachte in Ruhe die Richtungen, denen du folgst."
    },
    "create": {
      "open": "Neues Project erstellen",
      "nameLabel": "Project-Name",
      "namePlaceholder": "Benennen Sie die Arbeit, die Sie zusammenhalten möchten",
      "colorLabel": "Kennfarbe",
      "colorHelp": {
        "formal": "Diese zusätzliche Farbe hilft zusammen mit dem Namen, das Project zu unterscheiden.",
        "casual": "Diese Farbe hilft zusammen mit dem Namen, das Project zu unterscheiden."
      },
      "submit": "Project hinzufügen"
    },
    "list": {
      "title": "Aktuelle Projects",
      "description": {
        "formal": "Sehen Sie, nach welchen Richtungen Ihre Tasks gebündelt sind.",
        "casual": "Sieh, wie deine Tasks nach Richtung gruppiert sind."
      },
      "empty": {
        "formal": "Noch sind keine Projects vorhanden. Erstellen Sie eines, wenn Sie Arbeit um eine Richtung bündeln möchten.",
        "casual": "Noch sind keine Projects vorhanden. Erstelle eines, wenn du zusammengehörige Arbeit gruppieren möchtest."
      },
      "taskCount": {
        "one": "{count} verknüpfte Task",
        "few": "{count} verknüpfte Tasks",
        "many": "{count} verknüpfte Tasks",
        "other": "{count} verknüpfte Tasks"
      },
      "deleteLabel": "Project „{name}“ löschen"
    }
  },
  "more": {
    "title": "More",
    "description": "Gehen Sie in Ruhe dorthin, wo Sie hinmöchten",
    "navigationLabel": "Zusätzliche Navigation",
    "projectsDescription": "Verlauf der laufenden Arbeit ansehen",
    "settingsDescription": "Sprache, Ansprache und Umgebung von RIA anpassen"
  },
  "settings": {
    "title": "Settings",
    "description": {
      "formal": "Wählen Sie, wie RIA mit Ihnen sprechen soll.",
      "casual": "Wähle, wie RIA mit dir sprechen soll."
    },
    "speechStyle": {
      "title": "Ansprache",
      "description": {
        "formal": "Wählen Sie die Ansprache, mit der Sie sich am wohlsten fühlen.",
        "casual": "Wähle die Ansprache, mit der du dich am wohlsten fühlst."
      },
      "legend": "RIAs Ansprache wählen",
      "formalLabel": "Respektvolle Ansprache",
      "formalAccessibleLabel": "Respektvolle Ansprache",
      "formalExample": "Wollen wir uns den heutigen Tag gemeinsam ansehen?",
      "casualLabel": "Vertraute Ansprache",
      "casualAccessibleLabel": "Vertraute Ansprache",
      "casualExample": "Möchtest du dir den heutigen Tag gemeinsam ansehen?",
      "selected": "Ausgewählt",
      "select": "Auswählen",
      "saving": {
        "formal": "Ihre Ansprache wird gespeichert…",
        "casual": "Deine Ansprache wird gespeichert…"
      },
      "saved": {
        "formal": "Ihre Ansprache wurde gespeichert.",
        "casual": "Deine Ansprache wurde gespeichert."
      },
      "optionLabel": "{label}, {state}"
    },
    "language": {
      "title": "Sprache",
      "description": {
        "formal": "Wählen Sie die Sprache, die Sie in RIA verwenden möchten.",
        "casual": "Wähle die Sprache, die du in RIA verwenden möchtest."
      },
      "legend": "RIAs Sprache wählen",
      "selected": "Ausgewählt",
      "select": "Auswählen",
      "saving": "Sprache wird gewechselt…",
      "saved": "Sprache geändert.",
      "saveError": "Die Spracheinstellung konnte nicht gespeichert werden. Bitte versuchen Sie es erneut.",
      "optionLabel": "{label}, {state}"
    }
  },
  "accessibility": {
    "itemCount": {
      "one": "{count} Eintrag",
      "few": "{count} Einträge",
      "many": "{count} Einträge",
      "other": "{count} Einträge"
    }
  }
} as const satisfies Dictionary;
