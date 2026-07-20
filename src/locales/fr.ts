import type { Dictionary } from "@/locales/schema";

export const fr = {
  "common": {
    "actions": {
      "save": "Enregistrer",
      "cancel": "Annuler",
      "delete": "Supprimer",
      "edit": "Modifier",
      "open": "Ouvrir →"
    },
    "pending": {
      "saving": "Enregistrement…",
      "savingShort": "Enregistrement",
      "adding": "Ajout…",
      "deleting": "Suppression…",
      "processing": "Traitement…"
    },
    "count": {
      "one": "{count} élément",
      "few": "{count} éléments",
      "many": "{count} éléments",
      "other": "{count} éléments"
    }
  },
  "navigation": {
    "label": "Navigation principale",
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
        "withName": "À bientôt, {name}.",
        "withoutName": "À bientôt."
      },
      "casual": {
        "withName": "À plus tard, {name}.",
        "withoutName": "À plus tard."
      }
    },
    "voice": {
      "openLabel": "Ouvrir la saisie vocale de RIA",
      "listeningLabel": "RIA vous écoute",
      "listening": {
        "formal": "Écoute en cours",
        "casual": "Je t’écoute"
      }
    }
  },
  "home": {
    "greeting": {
      "morning": {
        "formal": {
          "withName": "Bonjour, {name}.",
          "withoutName": "Bonjour."
        },
        "casual": {
          "withName": "Bonjour, {name}.",
          "withoutName": "Bonjour."
        }
      },
      "afternoon": {
        "formal": {
          "withName": "Bonjour, {name}. Prenons un moment pour voir comment se déroule votre après-midi.",
          "withoutName": "Bonjour. Prenons un moment pour voir comment se déroule votre après-midi."
        },
        "casual": {
          "withName": "Bonjour, {name}.",
          "withoutName": "Bonjour."
        }
      },
      "evening": {
        "formal": {
          "withName": "Prenons un moment pour revenir doucement sur votre journée, {name}.",
          "withoutName": "Prenons un moment pour revenir doucement sur votre journée."
        },
        "casual": {
          "withName": "Bonsoir, {name}.",
          "withoutName": "Bonsoir."
        }
      }
    },
    "casualDefaultName": "",
    "rhythm": {
      "title": "Le rythme d’aujourd’hui",
      "descriptions": {
        "Calm": "Aujourd’hui peut avancer à un rythme régulier, sans hâte.",
        "Focus": "Aujourd’hui, restez auprès de ce qui compte le plus.",
        "Recovery": "Aujourd’hui, laissez de la place au repos et à la récupération.",
        "Light": "Aujourd’hui peut se dérouler avec légèreté et simplicité.",
        "Deep Work": "Aujourd’hui se prête à un travail calme et concentré."
      }
    },
    "direction": {
      "title": "La direction d’aujourd’hui",
      "description": {
        "formal": "Prenez un moment pour choisir ce qui peut guider votre journée.",
        "casual": "Prends un moment pour choisir ce qui peut guider ta journée."
      },
      "placeholder": {
        "formal": "Si vous ne choisissiez qu’une chose aujourd’hui, laquelle compterait le plus ?",
        "casual": "Si tu ne choisissais qu’une chose aujourd’hui, laquelle compterait le plus ?"
      },
      "empty": {
        "formal": "Vous n’avez pas encore choisi de direction pour aujourd’hui.\nSouhaitez-vous commencer par ce qui compte le plus ?",
        "casual": "Il n’y a pas encore de direction pour aujourd’hui.\nTu veux choisir ce qui compte le plus ?"
      },
      "review": {
        "formal": "Sélectionner pour revoir",
        "casual": "Sélectionner pour revoir"
      },
      "choose": "Choisir la direction d’aujourd’hui",
      "inputLabel": "La direction d’aujourd’hui",
      "editLabel": "Modifier la direction d’aujourd’hui : {title}"
    },
    "priorities": {
      "title": "Un pas possible maintenant",
      "description": {
        "formal": "Commencez par la tâche qui vous semble la plus importante.",
        "casual": "Commence par la tâche qui te semble la plus importante."
      },
      "empty": {
        "formal": "Vous n’avez pas encore choisi les Tasks d’aujourd’hui.\nSouhaitez-vous commencer par noter ce qui vous vient à l’esprit ?",
        "casual": "Tu n’as pas encore choisi les Tasks d’aujourd’hui.\nTu veux commencer par ce qui te vient à l’esprit ?"
      },
      "choose": "Choisir dans Tasks",
      "first": "En premier",
      "completeLabel": "Terminer {title}",
      "reopenLabel": "Marquer {title} comme non terminée"
    },
    "schedule": {
      "title": "La suite de votre programme",
      "description": {
        "formal": "Observez doucement le fil de votre temps.",
        "casual": "Regarde un instant comment ton temps s’organise."
      },
      "empty": {
        "formal": "Votre programme est libre aujourd’hui.\nVous pouvez avancer tranquillement.",
        "casual": "Ton programme est libre aujourd’hui.\nTu peux avancer tranquillement."
      },
      "add": {
        "formal": "Ajouter quelque chose si nécessaire",
        "casual": "Ajoute quelque chose si nécessaire"
      },
      "nearest": "À venir",
      "later": "Plus tard"
    },
    "quickCapture": {
      "title": "Note rapide",
      "action": "Déposer une pensée pour le moment",
      "description": {
        "formal": "Vous pouvez la laisser doucement dans votre Inbox.",
        "casual": "Tu peux la laisser dans ton Inbox pour le moment."
      }
    },
    "suggestion": {
      "label": "Une suggestion de RIA",
      "heading": {
        "formal": "Souhaitez-vous regarder cela ensemble ?",
        "casual": "Tu veux qu’on regarde cela ensemble ?"
      },
      "afternoonHeavy": {
        "formal": "Votre après-midi semble un peu chargé. Souhaitez-vous terminer une seule chose importante ce matin ?",
        "casual": "Ton après-midi semble un peu chargé. Tu veux terminer une seule chose importante ce matin ?"
      }
    }
  },
  "tasks": {
    "title": "Tasks",
    "description": "Commencez calmement par ce qui compte maintenant",
    "create": {
      "open": "Créer une nouvelle Task",
      "titleLabel": "Titre de la Task",
      "titlePlaceholder": "Notez une Task pour le moment",
      "priorityLabel": "Priorité",
      "projectLabel": "Project",
      "noProject": "Project non défini",
      "dueLabel": "Horaire prévu",
      "optional": "(facultatif)",
      "submit": "Ajouter la Task"
    },
    "priority": {
      "low": "Faible",
      "medium": "Moyenne",
      "high": "Élevée"
    },
    "status": {
      "all": "Tous les états",
      "todo": "Non commencée",
      "doing": "En cours",
      "done": "Terminée",
      "archived": "Archivée"
    },
    "sections": {
      "important": "Ce qui compte maintenant",
      "importantDescription": "Vos Top 3 à regarder en premier",
      "active": "Tasks en cours",
      "activeDescription": "Continuez une par une lorsque le moment vous convient",
      "completed": "Tasks terminées",
      "completedDescription": "Vous pouvez les marquer de nouveau comme non terminées si nécessaire"
    },
    "empty": "Il n’y a pas encore de Tasks. Notez doucement la prochaine étape qui vous vient à l’esprit.",
    "emptyFiltered": "Aucune Task ne correspond à ces filtres. Essayez d’ajuster l’affichage.",
    "filters": {
      "title": "Ajuster l’affichage",
      "description": "Réduire la liste par état ou Project",
      "status": "État",
      "project": "Project",
      "allProjects": "Tous les Projects"
    },
    "item": {
      "top3": "Top 3",
      "priority": "Priorité",
      "project": "Project",
      "addTop3": "Ajouter aux Top 3",
      "removeTop3": "Retirer des Top 3",
      "archive": "Archiver",
      "delete": "Supprimer",
      "completeLabel": "Marquer {title} comme terminée",
      "reopenLabel": "Marquer {title} comme non terminée",
      "addTop3Label": "Ajouter la Task {title} aux Top 3",
      "removeTop3Label": "Retirer la Task {title} des Top 3",
      "archiveLabel": "Archiver la Task {title}",
      "deleteLabel": "Supprimer la Task {title}"
    }
  },
  "inbox": {
    "title": "Inbox",
    "description": {
      "formal": "Vous pourrez décider plus tard de ce que cela signifie. Pour le moment, déposez ce qui vous est venu à l’esprit.",
      "casual": "Tu pourras décider plus tard. Pour le moment, dépose ce qui t’est venu à l’esprit."
    },
    "capture": {
      "title": "Note rapide",
      "placeholder": {
        "formal": "Écrivez-le ici avant que l’idée ne s’échappe",
        "casual": "Écris-le ici avant de l’oublier"
      },
      "submit": "Noter",
      "pending": "Enregistrement…"
    },
    "list": {
      "title": "Pensées notées",
      "description": {
        "formal": "Parcourez-les doucement lorsque vous serez prêt.",
        "casual": "Regarde-les quand tu seras prêt."
      },
      "empty": {
        "formal": "Lorsqu’une pensée apparaît, vous pouvez la laisser ici pour le moment.",
        "casual": "Quand une pensée arrive, tu peux la laisser ici pour le moment."
      }
    },
    "item": {
      "convert": "Déplacer vers Tasks",
      "convertLabel": "Déplacer l’élément de l’Inbox vers Tasks",
      "deleteLabel": "Supprimer l’élément de l’Inbox"
    }
  },
  "notes": {
    "title": "Notes",
    "description": {
      "formal": "Conservez les pensées que vous souhaitez garder un peu plus longtemps.",
      "casual": "Garde les pensées que tu veux conserver un peu plus longtemps."
    },
    "create": {
      "title": "Nouvelle Note",
      "placeholder": {
        "formal": "Écrivez une pensée que vous souhaitez conserver",
        "casual": "Écris une pensée que tu veux conserver"
      },
      "submit": "Enregistrer la Note"
    },
    "list": {
      "title": "Notes récentes",
      "description": {
        "formal": "Vos pensées les plus récentes apparaissent en premier.",
        "casual": "Tes pensées les plus récentes apparaissent en premier."
      },
      "empty": {
        "formal": "Il n’y a pas encore de Notes. Ajoutez-en une lorsqu’une pensée mérite d’être conservée.",
        "casual": "Il n’y a pas encore de Notes. Ajoute-en une lorsque tu veux garder une pensée."
      }
    },
    "item": {
      "editing": "Modification de la Note",
      "saveChanges": "Enregistrer les modifications",
      "saveChangesLabel": "Enregistrer les modifications de la Note",
      "cancelEditLabel": "Annuler la modification de la Note",
      "editLabel": "Modifier la Note",
      "deleteLabel": "Supprimer la Note"
    }
  },
  "projects": {
    "title": "Projects",
    "description": {
      "formal": "Observez calmement les directions que vous continuez à suivre.",
      "casual": "Regarde calmement les directions que tu suis."
    },
    "create": {
      "open": "Créer un nouveau Project",
      "nameLabel": "Nom du Project",
      "namePlaceholder": "Nommez le travail que vous souhaitez garder ensemble",
      "colorLabel": "Couleur de repère",
      "colorHelp": {
        "formal": "Cette couleur secondaire aide à distinguer le Project avec son nom.",
        "casual": "Cette couleur aide à distinguer le Project avec son nom."
      },
      "submit": "Ajouter le Project"
    },
    "list": {
      "title": "Projects actuels",
      "description": {
        "formal": "Voyez les directions autour desquelles vos Tasks sont réunies.",
        "casual": "Regarde comment tes Tasks sont regroupées par direction."
      },
      "empty": {
        "formal": "Il n’y a pas encore de Projects. Créez-en un lorsque vous souhaitez réunir du travail autour d’une direction.",
        "casual": "Il n’y a pas encore de Projects. Crée-en un lorsque tu veux regrouper du travail lié."
      },
      "taskCount": {
        "one": "{count} Task associée",
        "few": "{count} Tasks associées",
        "many": "{count} Tasks associées",
        "other": "{count} Tasks associées"
      },
      "deleteLabel": "Supprimer le Project « {name} »"
    }
  },
  "more": {
    "title": "More",
    "description": "Allez doucement là où vous en avez besoin",
    "navigationLabel": "Navigation supplémentaire",
    "projectsDescription": "Revoir le fil du travail en cours",
    "settingsDescription": "Ajuster la langue, le ton et l’environnement de RIA"
  },
  "settings": {
    "title": "Settings",
    "description": {
      "formal": "Choisissez la manière dont vous souhaitez que RIA vous parle.",
      "casual": "Choisis la manière dont tu veux que RIA te parle."
    },
    "speechStyle": {
      "title": "Style de parole",
      "description": {
        "formal": "Choisissez le style qui vous semble le plus confortable.",
        "casual": "Choisis le style qui te semble le plus confortable."
      },
      "legend": "Choisir le style de parole de RIA",
      "formalLabel": "Ton respectueux",
      "formalAccessibleLabel": "Style de parole respectueux",
      "formalExample": "Souhaitez-vous regarder la journée ensemble ?",
      "casualLabel": "Ton familier",
      "casualAccessibleLabel": "Style de parole familier",
      "casualExample": "Tu veux qu’on regarde la journée ensemble ?",
      "selected": "Sélectionné",
      "select": "Sélectionner",
      "saving": {
        "formal": "Enregistrement de votre style de parole…",
        "casual": "Enregistrement de ton style de parole…"
      },
      "saved": {
        "formal": "Votre style de parole a été enregistré.",
        "casual": "Ton style de parole est enregistré."
      },
      "optionLabel": "{label}, {state}"
    },
    "language": {
      "title": "Langue",
      "description": {
        "formal": "Choisissez la langue que vous souhaitez utiliser dans RIA.",
        "casual": "Choisis la langue que tu veux utiliser dans RIA."
      },
      "legend": "Choisir la langue de RIA",
      "selected": "Sélectionné",
      "select": "Sélectionner",
      "saving": "Changement de langue…",
      "saved": "Langue modifiée.",
      "saveError": "Impossible d’enregistrer la langue. Veuillez réessayer.",
      "optionLabel": "{label}, {state}"
    }
  },
  "accessibility": {
    "itemCount": {
      "one": "{count} élément",
      "few": "{count} éléments",
      "many": "{count} éléments",
      "other": "{count} éléments"
    }
  }
} as const satisfies Dictionary;
