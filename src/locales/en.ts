import type { Dictionary } from "@/locales/schema";

export const en = {
  common: {
    actions: {
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      open: "Open →",
    },
    pending: {
      saving: "Saving…",
      savingShort: "Saving",
      adding: "Adding…",
      deleting: "Deleting…",
      processing: "Processing…",
    },
    count: {
      one: "{count} item",
      few: "{count} items",
      many: "{count} items",
      other: "{count} items",
    },
  },
  navigation: {
    label: "Primary navigation",
    today: "Today",
    tasks: "Tasks",
    inbox: "Inbox",
    notes: "Notes",
    more: "More",
    projects: "Projects",
    settings: "Settings",
  },
  appShell: {
    logout: {
      formal: {
        withName: "See you again, {name}.",
        withoutName: "See you again.",
      },
      casual: {
        withName: "See you, {name}.",
        withoutName: "See you.",
      },
    },
    voice: {
      openLabel: "Open RIA voice input",
      listeningLabel: "RIA is listening",
      listening: {
        formal: "Listening",
        casual: "I’m listening",
      },
    },
  },
  home: {
    greeting: {
      morning: {
        formal: {
          withName: "Good morning, {name}.",
          withoutName: "Good morning.",
        },
        casual: {
          withName: "Morning, {name}.",
          withoutName: "Morning.",
        },
      },
      afternoon: {
        formal: {
          withName:
            "Good afternoon, {name}. Shall we take a moment to see how your afternoon is flowing?",
          withoutName:
            "Good afternoon. Shall we take a moment to see how your afternoon is flowing?",
        },
        casual: {
          withName: "Good afternoon, {name}.",
          withoutName: "Good afternoon.",
        },
      },
      evening: {
        formal: {
          withName: "Shall we gently look back on your day, {name}?",
          withoutName: "Shall we gently look back on your day?",
        },
        casual: {
          withName: "Good evening, {name}.",
          withoutName: "Good evening.",
        },
      },
    },
    casualDefaultName: "",
    rhythm: {
      title: "Today’s rhythm",
      descriptions: {
        Calm: "Today can move at a steady, unhurried pace.",
        Focus: "Today is a day to stay with what matters most.",
        Recovery: "Today is a day to make room for rest and recovery.",
        Light: "Today can unfold lightly and with ease.",
        "Deep Work": "Today is a day for quiet, focused work.",
      },
    },
    direction: {
      title: "Today’s direction",
      description: {
        formal: "Take a moment to choose one thing that can guide your day.",
        casual: "Take a moment and choose one thing to guide your day.",
      },
      placeholder: {
        formal: "If you chose just one thing today, what would matter most?",
        casual: "If you chose one thing today, what would matter most?",
      },
      empty: {
        formal: "You haven’t chosen a direction for today yet.\nShall we begin with the one thing that matters most?",
        casual: "There’s no direction for today yet.\nWant to choose the one thing that matters most?",
      },
      review: {
        formal: "Select to take another look",
        casual: "Select to look again",
      },
      choose: "Choose today’s direction",
      inputLabel: "Today’s direction",
      editLabel: "Edit today’s direction: {title}",
    },
    priorities: {
      title: "One step you can take now",
      description: {
        formal: "Begin with the task that feels most meaningful.",
        casual: "Start with the task that feels most meaningful.",
      },
      empty: {
        formal: "You haven’t chosen today’s Tasks yet.\nShall we start by writing down what comes to mind?",
        casual: "You haven’t chosen today’s Tasks yet.\nWant to start with what comes to mind?",
      },
      choose: "Choose from Tasks",
      first: "First",
      completeLabel: "Complete {title}",
      reopenLabel: "Mark {title} as incomplete",
    },
    schedule: {
      title: "Next on your schedule",
      description: {
        formal: "Take a gentle look at the flow of your time.",
        casual: "Take a quick look at how your time is flowing.",
      },
      empty: {
        formal: "Your schedule is open today.\nThere is room to move at an easy pace.",
        casual: "Your schedule is open today.\nThere’s room to take it easy.",
      },
      add: {
        formal: "Add something if you need it",
        casual: "Add something if you need to",
      },
      nearest: "Coming up next",
      later: "Later",
    },
    quickCapture: {
      title: "Quick capture",
      action: "Set down a thought for now",
      description: {
        formal: "You can leave it gently in your Inbox.",
        casual: "You can leave it in your Inbox for now.",
      },
    },
    suggestion: {
      label: "A suggestion from RIA",
      heading: {
        formal: "Shall we look at this together?",
        casual: "Want to look at this together?",
      },
      afternoonHeavy: {
        formal: "Your afternoon looks a little full. Shall we finish just one important thing this morning?",
        casual: "Your afternoon looks a little full. Want to finish one important thing this morning?",
      },
    },
  },
  tasks: {
    title: "Tasks",
    description: "Begin calmly with what matters now",
    create: {
      open: "Create a new Task",
      titleLabel: "Task title",
      titlePlaceholder: "Write down a Task for now",
      priorityLabel: "Priority",
      projectLabel: "Project",
      noProject: "No Project",
      dueLabel: "Scheduled time",
      optional: "(optional)",
      submit: "Add Task",
    },
    priority: {
      low: "Low",
      medium: "Medium",
      high: "High",
    },
    status: {
      all: "All statuses",
      todo: "Not started",
      doing: "In progress",
      done: "Completed",
      archived: "Archived",
    },
    sections: {
      important: "What matters now",
      importantDescription: "Your Top 3 to look at first",
      active: "Tasks in progress",
      activeDescription: "Continue one at a time when the moment is right",
      completed: "Completed Tasks",
      completedDescription: "You can mark them incomplete again if needed",
    },
    empty: "There are no Tasks yet. Gently capture the next step that comes to mind.",
    emptyFiltered: "No Tasks match these filters. Try adjusting the view.",
    filters: {
      title: "Adjust view",
      description: "Narrow the list by status or Project",
      status: "Status",
      project: "Project",
      allProjects: "All Projects",
    },
    item: {
      top3: "Top 3",
      priority: "Priority",
      project: "Project",
      addTop3: "Add to Top 3",
      removeTop3: "Remove from Top 3",
      archive: "Archive",
      delete: "Delete",
      completeLabel: "Mark {title} as completed",
      reopenLabel: "Mark {title} as incomplete",
      addTop3Label: "Add Task {title} to Top 3",
      removeTop3Label: "Remove Task {title} from Top 3",
      archiveLabel: "Archive Task {title}",
      deleteLabel: "Delete Task {title}",
    },
  },
  inbox: {
    title: "Inbox",
    description: {
      formal: "You can decide what it means later. For now, set down what came to mind.",
      casual: "You can decide later. Just set down what came to mind for now.",
    },
    capture: {
      title: "Quick capture",
      placeholder: {
        formal: "Write it here before it slips away",
        casual: "Put it here before you forget",
      },
      submit: "Capture",
      pending: "Capturing…",
    },
    list: {
      title: "Captured thoughts",
      description: {
        formal: "Look through them gently when you are ready.",
        casual: "Look through them when you’re ready.",
      },
      empty: {
        formal: "When a thought comes up, you can leave it here for now.",
        casual: "When something comes to mind, leave it here for now.",
      },
    },
    item: {
      convert: "Move to Tasks",
      convertLabel: "Move Inbox item to Tasks",
      deleteLabel: "Delete Inbox item",
    },
  },
  notes: {
    title: "Notes",
    description: {
      formal: "Keep the thoughts you would like to hold on to a little longer.",
      casual: "Keep the thoughts you want to hold on to a little longer.",
    },
    create: {
      title: "New Note",
      placeholder: {
        formal: "Write down a thought you would like to keep",
        casual: "Write down a thought you want to keep",
      },
      submit: "Save Note",
    },
    list: {
      title: "Recent Notes",
      description: {
        formal: "Your most recent thoughts appear first.",
        casual: "Your latest thoughts appear first.",
      },
      empty: {
        formal: "There are no Notes yet. Add one when a thought feels worth keeping.",
        casual: "There are no Notes yet. Add one when you want to keep a thought.",
      },
    },
    item: {
      editing: "Editing Note",
      saveChanges: "Save changes",
      saveChangesLabel: "Save Note changes",
      cancelEditLabel: "Cancel Note editing",
      editLabel: "Edit Note",
      deleteLabel: "Delete Note",
    },
  },
  projects: {
    title: "Projects",
    description: {
      formal: "Take a calm look at the directions you are continuing to follow.",
      casual: "Take a calm look at the directions you’re following.",
    },
    create: {
      open: "Create a new Project",
      nameLabel: "Project name",
      namePlaceholder: "Name the work you want to keep together",
      colorLabel: "Reference color",
      colorHelp: {
        formal: "This secondary color helps distinguish the Project alongside its name.",
        casual: "This color helps tell the Project apart alongside its name.",
      },
      submit: "Add Project",
    },
    list: {
      title: "Current Projects",
      description: {
        formal: "See the directions your Tasks are gathered around.",
        casual: "See how your Tasks are grouped by direction.",
      },
      empty: {
        formal: "There are no Projects yet. Create one when you want to gather work around a direction.",
        casual: "There are no Projects yet. Create one when you want to group related work.",
      },
      taskCount: {
        one: "{count} linked Task",
        few: "{count} linked Tasks",
        many: "{count} linked Tasks",
        other: "{count} linked Tasks",
      },
      deleteLabel: "Delete Project {name}",
    },
  },
  more: {
    title: "More",
    description: "Move gently to where you need to go",
    navigationLabel: "Additional navigation",
    projectsDescription: "Review the flow of ongoing work",
    settingsDescription: "Adjust RIA’s language, tone, and environment",
  },
  settings: {
    title: "Settings",
    description: {
      formal: "Choose how you would like RIA to speak with you.",
      casual: "Choose how you’d like RIA to speak with you.",
    },
    speechStyle: {
      title: "Speech style",
      description: {
        formal: "Choose the style that feels most comfortable.",
        casual: "Pick the style that feels most comfortable.",
      },
      legend: "Choose RIA’s speech style",
      formalLabel: "Respectful",
      formalAccessibleLabel: "Respectful speech style",
      formalExample: "Shall we look at today together?",
      casualLabel: "Relaxed",
      casualAccessibleLabel: "Relaxed speech style",
      casualExample: "Want to look at today together?",
      selected: "Selected",
      select: "Select",
      saving: {
        formal: "Saving your speech style…",
        casual: "Saving your speech style…",
      },
      saved: {
        formal: "Your speech style has been saved.",
        casual: "Your speech style is saved.",
      },
      optionLabel: "{label}, {state}",
    },
    language: {
      title: "Language",
      description: {
        formal: "Choose the language you would like to use in RIA.",
        casual: "Pick the language you want to use in RIA.",
      },
      legend: "Choose RIA’s language",
      selected: "Selected",
      select: "Select",
      saving: "Changing language…",
      saved: "Language changed.",
      saveError: "We couldn’t save the language setting. Please try again.",
      optionLabel: "{label}, {state}",
    },
  },
  accessibility: {
    itemCount: {
      one: "{count} item",
      few: "{count} items",
      many: "{count} items",
      other: "{count} items",
    },
  },
} as const satisfies Dictionary;
