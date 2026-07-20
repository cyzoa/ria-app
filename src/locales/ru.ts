import type { Dictionary } from "@/locales/schema";

export const ru = {
  "common": {
    "actions": {
      "save": "Сохранить",
      "cancel": "Отменить",
      "delete": "Удалить",
      "edit": "Изменить",
      "open": "Открыть →"
    },
    "pending": {
      "saving": "Сохранение…",
      "savingShort": "Сохранение",
      "adding": "Добавление…",
      "deleting": "Удаление…",
      "processing": "Обработка…"
    },
    "count": {
      "one": "{count} элемент",
      "few": "{count} элемента",
      "many": "{count} элементов",
      "other": "{count} элемента"
    }
  },
  "navigation": {
    "label": "Основная навигация",
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
        "withName": "До следующей встречи, {name}.",
        "withoutName": "До следующей встречи."
      },
      "casual": {
        "withName": "До встречи, {name}.",
        "withoutName": "До встречи."
      }
    },
    "voice": {
      "openLabel": "Открыть голосовой ввод RIA",
      "listeningLabel": "RIA слушает",
      "listening": {
        "formal": "Слушаю",
        "casual": "Я слушаю"
      }
    }
  },
  "home": {
    "greeting": {
      "morning": {
        "formal": {
          "withName": "Доброе утро, {name}.",
          "withoutName": "Доброе утро."
        },
        "casual": {
          "withName": "Доброе утро, {name}.",
          "withoutName": "Доброе утро."
        }
      },
      "afternoon": {
        "formal": {
          "withName": "Добрый день, {name}. Давайте ненадолго остановимся и посмотрим, как проходит ваш день.",
          "withoutName": "Добрый день. Давайте ненадолго остановимся и посмотрим, как проходит ваш день."
        },
        "casual": {
          "withName": "Добрый день, {name}.",
          "withoutName": "Добрый день."
        }
      },
      "evening": {
        "formal": {
          "withName": "Давайте спокойно оглянемся на ваш день, {name}?",
          "withoutName": "Давайте спокойно оглянемся на ваш день?"
        },
        "casual": {
          "withName": "Добрый вечер, {name}.",
          "withoutName": "Добрый вечер."
        }
      }
    },
    "casualDefaultName": "",
    "rhythm": {
      "title": "Ритм сегодняшнего дня",
      "descriptions": {
        "Calm": "Сегодня можно двигаться ровно и без спешки.",
        "Focus": "Сегодня стоит сосредоточиться на самом важном.",
        "Recovery": "Сегодня стоит оставить место для отдыха и восстановления.",
        "Light": "Сегодня можно двигаться легко и спокойно.",
        "Deep Work": "Сегодня подходит для тихой, сосредоточенной работы."
      }
    },
    "direction": {
      "title": "Направление на сегодня",
      "description": {
        "formal": "Уделите минуту выбору того, что сможет направлять ваш день.",
        "casual": "Удели минуту выбору того, что сможет направлять твой день."
      },
      "placeholder": {
        "formal": "Если выбрать сегодня только одно, что будет самым важным?",
        "casual": "Если выбрать сегодня только одно, что будет самым важным?"
      },
      "empty": {
        "formal": "Вы ещё не выбрали направление на сегодня.\nНачнём с самого важного?",
        "casual": "Направления на сегодня пока нет.\nХочешь выбрать самое важное?"
      },
      "review": {
        "formal": "Выбрать, чтобы посмотреть ещё раз",
        "casual": "Выбрать, чтобы посмотреть снова"
      },
      "choose": "Выбрать направление на сегодня",
      "inputLabel": "Направление на сегодня",
      "editLabel": "Изменить направление на сегодня: {title}"
    },
    "priorities": {
      "title": "Один шаг, который можно сделать сейчас",
      "description": {
        "formal": "Начните с задачи, которая кажется вам наиболее значимой.",
        "casual": "Начни с задачи, которая кажется тебе наиболее значимой."
      },
      "empty": {
        "formal": "Вы ещё не выбрали сегодняшние Tasks.\nНачнём с того, что сейчас приходит вам в голову?",
        "casual": "Ты ещё не выбрал сегодняшние Tasks.\nХочешь начать с того, что сейчас приходит в голову?"
      },
      "choose": "Выбрать в Tasks",
      "first": "Сначала",
      "completeLabel": "Завершить {title}",
      "reopenLabel": "Отметить {title} как незавершённую"
    },
    "schedule": {
      "title": "Дальше в вашем расписании",
      "description": {
        "formal": "Спокойно взгляните на течение своего времени.",
        "casual": "Посмотри, как распределяется твоё время."
      },
      "empty": {
        "formal": "Сегодня ваше расписание свободно.\nМожно двигаться в спокойном темпе.",
        "casual": "Сегодня твоё расписание свободно.\nМожно никуда не спешить."
      },
      "add": {
        "formal": "При необходимости добавить событие",
        "casual": "Добавь событие, если нужно"
      },
      "nearest": "Ближайшее",
      "later": "Позже"
    },
    "quickCapture": {
      "title": "Быстрая заметка",
      "action": "Записать мысль на потом",
      "description": {
        "formal": "Можно ненадолго оставить её в Inbox.",
        "casual": "Можешь пока оставить её в Inbox."
      }
    },
    "suggestion": {
      "label": "Предложение от RIA",
      "heading": {
        "formal": "Посмотрим на это вместе?",
        "casual": "Хочешь посмотреть на это вместе?"
      },
      "afternoonHeavy": {
        "formal": "Ваш день после обеда выглядит немного насыщенным. Завершим утром только одно важное дело?",
        "casual": "После обеда день выглядит немного насыщенным. Хочешь завершить утром одно важное дело?"
      }
    }
  },
  "tasks": {
    "title": "Tasks",
    "description": "Спокойно начните с того, что важно сейчас",
    "create": {
      "open": "Создать новую Task",
      "titleLabel": "Название Task",
      "titlePlaceholder": "Запишите Task на потом",
      "priorityLabel": "Приоритет",
      "projectLabel": "Project",
      "noProject": "Project не задан",
      "dueLabel": "Запланированное время",
      "optional": "(необязательно)",
      "submit": "Добавить Task"
    },
    "priority": {
      "low": "Низкий",
      "medium": "Средний",
      "high": "Высокий"
    },
    "status": {
      "all": "Все статусы",
      "todo": "Не начато",
      "doing": "В процессе",
      "done": "Завершено",
      "archived": "В архиве"
    },
    "sections": {
      "important": "Что важно сейчас",
      "importantDescription": "Ваши Top 3 для первого внимания",
      "active": "Текущие Tasks",
      "activeDescription": "Продолжайте по одной, когда наступит подходящий момент",
      "completed": "Завершённые Tasks",
      "completedDescription": "При необходимости их можно снова отметить как незавершённые"
    },
    "empty": "Tasks пока нет. Спокойно запишите следующий шаг, который приходит в голову.",
    "emptyFiltered": "Ни одна Task не соответствует этим фильтрам. Попробуйте изменить параметры.",
    "filters": {
      "title": "Настроить вид",
      "description": "Отфильтровать список по статусу или Project",
      "status": "Статус",
      "project": "Project",
      "allProjects": "Все Projects"
    },
    "item": {
      "top3": "Top 3",
      "priority": "Приоритет",
      "project": "Project",
      "addTop3": "Добавить в Top 3",
      "removeTop3": "Убрать из Top 3",
      "archive": "В архив",
      "delete": "Удалить",
      "completeLabel": "Отметить {title} как завершённую",
      "reopenLabel": "Отметить {title} как незавершённую",
      "addTop3Label": "Добавить Task {title} в Top 3",
      "removeTop3Label": "Убрать Task {title} из Top 3",
      "archiveLabel": "Переместить Task {title} в архив",
      "deleteLabel": "Удалить Task {title}"
    }
  },
  "inbox": {
    "title": "Inbox",
    "description": {
      "formal": "Решить, что это значит, можно позже. Пока просто запишите то, что пришло в голову.",
      "casual": "Решить можно позже. Пока просто запиши то, что пришло в голову."
    },
    "capture": {
      "title": "Быстрая заметка",
      "placeholder": {
        "formal": "Запишите здесь, пока мысль не ускользнула",
        "casual": "Запиши здесь, пока не забылось"
      },
      "submit": "Записать",
      "pending": "Запись…"
    },
    "list": {
      "title": "Записанные мысли",
      "description": {
        "formal": "Вернитесь к ним спокойно, когда будете готовы.",
        "casual": "Вернись к ним, когда будешь готов."
      },
      "empty": {
        "formal": "Когда появится мысль, можно пока оставить её здесь.",
        "casual": "Когда что-то придёт в голову, оставь это пока здесь."
      }
    },
    "item": {
      "convert": "Переместить в Tasks",
      "convertLabel": "Переместить элемент Inbox в Tasks",
      "deleteLabel": "Удалить элемент Inbox"
    }
  },
  "notes": {
    "title": "Notes",
    "description": {
      "formal": "Сохраните мысли, к которым хотите вернуться позже.",
      "casual": "Сохрани мысли, к которым хочешь вернуться позже."
    },
    "create": {
      "title": "Новая Note",
      "placeholder": {
        "formal": "Запишите мысль, которую хотите сохранить",
        "casual": "Запиши мысль, которую хочешь сохранить"
      },
      "submit": "Сохранить Note"
    },
    "list": {
      "title": "Недавние Notes",
      "description": {
        "formal": "Сначала показаны ваши самые свежие мысли.",
        "casual": "Сначала показаны твои самые свежие мысли."
      },
      "empty": {
        "formal": "Notes пока нет. Добавьте Note, когда появится мысль, которую стоит сохранить.",
        "casual": "Notes пока нет. Добавь Note, когда захочешь сохранить мысль."
      }
    },
    "item": {
      "editing": "Редактирование Note",
      "saveChanges": "Сохранить изменения",
      "saveChangesLabel": "Сохранить изменения Note",
      "cancelEditLabel": "Отменить редактирование Note",
      "editLabel": "Изменить Note",
      "deleteLabel": "Удалить Note"
    }
  },
  "projects": {
    "title": "Projects",
    "description": {
      "formal": "Спокойно посмотрите на направления, которым продолжаете следовать.",
      "casual": "Спокойно посмотри на направления, которым следуешь."
    },
    "create": {
      "open": "Создать новый Project",
      "nameLabel": "Название Project",
      "namePlaceholder": "Назовите работу, которую хотите объединить",
      "colorLabel": "Цвет-ориентир",
      "colorHelp": {
        "formal": "Этот дополнительный цвет вместе с названием помогает различать Project.",
        "casual": "Этот цвет вместе с названием помогает различать Project."
      },
      "submit": "Добавить Project"
    },
    "list": {
      "title": "Текущие Projects",
      "description": {
        "formal": "Посмотрите, вокруг каких направлений собраны ваши Tasks.",
        "casual": "Посмотри, как твои Tasks сгруппированы по направлениям."
      },
      "empty": {
        "formal": "Projects пока нет. Создайте Project, когда захотите объединить работу вокруг одного направления.",
        "casual": "Projects пока нет. Создай Project, когда захочешь объединить связанную работу."
      },
      "taskCount": {
        "one": "{count} связанная Task",
        "few": "{count} связанные Tasks",
        "many": "{count} связанных Tasks",
        "other": "{count} связанной Task"
      },
      "deleteLabel": "Удалить Project «{name}»"
    }
  },
  "more": {
    "title": "More",
    "description": "Спокойно перейдите туда, куда вам нужно",
    "navigationLabel": "Дополнительная навигация",
    "projectsDescription": "Посмотреть ход текущей работы",
    "settingsDescription": "Настроить язык, стиль общения и окружение RIA"
  },
  "settings": {
    "title": "Settings",
    "description": {
      "formal": "Выберите, как RIA будет обращаться к вам.",
      "casual": "Выбери, как RIA будет обращаться к тебе."
    },
    "speechStyle": {
      "title": "Стиль общения",
      "description": {
        "formal": "Выберите наиболее комфортный стиль общения.",
        "casual": "Выбери наиболее комфортный стиль общения."
      },
      "legend": "Выбрать стиль общения RIA",
      "formalLabel": "Уважительное обращение",
      "formalAccessibleLabel": "Уважительный стиль общения",
      "formalExample": "Посмотрим на сегодняшний день вместе?",
      "casualLabel": "Дружеское обращение",
      "casualAccessibleLabel": "Дружеский стиль общения",
      "casualExample": "Хочешь посмотреть на сегодняшний день вместе?",
      "selected": "Выбрано",
      "select": "Выбрать",
      "saving": {
        "formal": "Сохраняется ваш стиль общения…",
        "casual": "Сохраняется твой стиль общения…"
      },
      "saved": {
        "formal": "Ваш стиль общения сохранён.",
        "casual": "Твой стиль общения сохранён."
      },
      "optionLabel": "{label}, {state}"
    },
    "language": {
      "title": "Язык",
      "description": {
        "formal": "Выберите язык, который хотите использовать в RIA.",
        "casual": "Выбери язык, который хочешь использовать в RIA."
      },
      "legend": "Выбрать язык RIA",
      "selected": "Выбрано",
      "select": "Выбрать",
      "saving": "Язык изменяется…",
      "saved": "Язык изменён.",
      "saveError": "Не удалось сохранить язык. Попробуйте ещё раз.",
      "optionLabel": "{label}, {state}"
    }
  },
  "accessibility": {
    "itemCount": {
      "one": "{count} элемент",
      "few": "{count} элемента",
      "many": "{count} элементов",
      "other": "{count} элемента"
    }
  }
} as const satisfies Dictionary;
