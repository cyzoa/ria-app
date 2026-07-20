export const ko = {
  common: {
    actions: {
      save: "저장",
      cancel: "취소",
      delete: "삭제",
      edit: "수정",
      open: "열기 →",
    },
    pending: {
      saving: "저장 중…",
      savingShort: "저장 중",
      adding: "추가 중…",
      deleting: "삭제 중…",
      processing: "처리 중…",
    },
    count: {
      one: "{count}개",
      few: "{count}개",
      many: "{count}개",
      other: "{count}개",
    },
  },
  navigation: {
    label: "주요 내비게이션",
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
        withName: "다음에 또 봬요, {name}",
        withoutName: "다음에 또 봬요",
      },
      casual: {
        withName: "다음에 또 봐, {name}",
        withoutName: "다음에 또 봐",
      },
    },
    voice: {
      openLabel: "RIA 음성 입력 열기",
      listeningLabel: "RIA 음성 입력 듣는 중",
      listening: {
        formal: "듣고 있어요",
        casual: "듣고 있어",
      },
    },
  },
  home: {
    greeting: {
      morning: {
        formal: {
          withName: "좋은 아침이에요, {name}",
          withoutName: "좋은 아침이에요.",
        },
        casual: {
          withName: "좋은 아침이야, {name}",
          withoutName: "좋은 아침이야.",
        },
      },
      afternoon: {
        formal: {
          withName: "오후 리듬을 같이 볼까요, {name}",
          withoutName: "오후 리듬을 같이 볼까요.",
        },
        casual: {
          withName: "좋은 오후야, {name}",
          withoutName: "좋은 오후야.",
        },
      },
      evening: {
        formal: {
          withName: "오늘 하루를 천천히 정리해볼까요, {name}",
          withoutName: "오늘 하루를 천천히 정리해볼까요.",
        },
        casual: {
          withName: "좋은 저녁이야, {name}",
          withoutName: "좋은 저녁이야.",
        },
      },
    },
    casualDefaultName: "오빠",
    rhythm: {
      title: "오늘의 리듬",
      descriptions: {
        Calm: "오늘은 무리하지 않고 안정적으로 가는 날이에요.",
        Focus: "오늘은 중요한 것에 집중하는 날이에요.",
        Recovery: "오늘은 충분히 쉬고 회복하는 날이에요.",
        Light: "오늘은 가볍게 흐르는 날이에요.",
        "Deep Work": "오늘은 깊이 있는 작업에 몰입하는 날이에요.",
      },
    },
    direction: {
      title: "오늘의 방향",
      description: {
        formal: "오늘을 이끌 한 가지를 천천히 정해보세요.",
        casual: "오늘을 이끌 한 가지를 천천히 정해봐.",
      },
      placeholder: {
        formal: "오늘 하나만 정한다면, 뭐가 제일 중요할까요?",
        casual: "오늘 하나만 정한다면, 뭐가 제일 중요할까?",
      },
      empty: {
        formal: "오늘의 방향이 아직 없어요.\n가장 중요한 것 하나만 정해볼까요?",
        casual: "오늘의 방향이 아직 없어.\n가장 중요한 것 하나만 정해볼까?",
      },
      review: {
        formal: "눌러서 다시 살펴보세요",
        casual: "눌러서 다시 살펴봐",
      },
      choose: "눌러서 방향 정하기",
      inputLabel: "오늘의 방향",
      editLabel: "오늘의 방향 수정: {title}",
    },
    priorities: {
      title: "지금 가능한 한 걸음",
      description: {
        formal: "가장 의미 있는 일부터 하나씩 이어가세요.",
        casual: "가장 의미 있는 일부터 하나씩 이어가.",
      },
      empty: {
        formal: "오늘 할 일을 아직 안 정했어요.\n떠오르는 것부터 하나 적어볼까요?",
        casual: "오늘 할 일을 아직 안 정했어.\n떠오르는 것부터 하나 적어볼까?",
      },
      choose: "할 일에서 정하기",
      first: "먼저",
      completeLabel: "{title} 완료",
      reopenLabel: "{title} 미완료로 변경",
    },
    schedule: {
      title: "다음 일정",
      description: {
        formal: "시간의 흐름을 한 번만 가볍게 살펴보세요.",
        casual: "시간의 흐름을 한 번만 가볍게 살펴봐.",
      },
      empty: {
        formal: "오늘은 일정이 비어 있어요.\n느긋하게 보낼 수 있는 하루네요.",
        casual: "오늘은 일정이 비어 있어.\n느긋하게 보낼 수 있는 하루네.",
      },
      add: {
        formal: "일정이 필요하면 추가해보세요",
        casual: "일정이 필요하면 추가해봐",
      },
      nearest: "가장 가까운 일정",
      later: "이후 일정",
    },
    quickCapture: {
      title: "빠른 기록",
      action: "떠오른 생각을 잠시 내려놓기",
      description: {
        formal: "Inbox에 편하게 남겨둘 수 있어요.",
        casual: "Inbox에 편하게 남겨둘 수 있어.",
      },
    },
    suggestion: {
      label: "RIA의 제안",
      heading: {
        formal: "함께 살펴볼까요?",
        casual: "같이 살펴볼까?",
      },
      afternoonHeavy: {
        formal: "오늘은 오후 일정이 조금 무거워 보여요. 오전에는 중요한 것 하나만 먼저 끝내볼까요?",
        casual: "오늘은 오후 일정이 조금 무거워 보여. 오전에는 중요한 것 하나만 먼저 끝내볼까?",
      },
    },
  },
  tasks: {
    title: "Tasks",
    description: "지금 중요한 일부터 차분히 살펴보기",
    create: {
      open: "새 Task 만들기",
      titleLabel: "Task 제목",
      titlePlaceholder: "지금 해둘 Task 입력",
      priorityLabel: "우선순위",
      projectLabel: "Project",
      noProject: "Project 없음",
      dueLabel: "예정 시간",
      optional: "(선택)",
      submit: "Task 추가",
    },
    priority: {
      low: "낮음",
      medium: "보통",
      high: "높음",
    },
    status: {
      all: "모든 상태",
      todo: "진행 전",
      doing: "진행 중",
      done: "완료",
      archived: "보관됨",
    },
    sections: {
      important: "지금 중요한 작업",
      importantDescription: "오늘 먼저 살펴볼 Top 3",
      active: "진행 중인 작업",
      activeDescription: "필요한 순간에 하나씩 이어가기",
      completed: "완료한 작업",
      completedDescription: "필요하면 다시 미완료로 변경 가능",
    },
    empty: "아직 등록된 Task 없음. 떠오른 다음 한 걸음부터 가볍게 기록.",
    emptyFiltered: "선택한 조건에 맞는 Task 없음. 보기 조건 다시 선택.",
    filters: {
      title: "보기 조정",
      description: "상태나 Project로 목록 좁히기",
      status: "상태",
      project: "Project",
      allProjects: "모든 Project",
    },
    item: {
      top3: "Top 3",
      priority: "우선순위",
      project: "Project",
      addTop3: "Top 3에 두기",
      removeTop3: "Top 3에서 빼기",
      archive: "보관",
      delete: "삭제",
      completeLabel: "{title}, 완료로 변경",
      reopenLabel: "{title}, 미완료로 변경",
      addTop3Label: "{title} Task를 Top 3에 두기",
      removeTop3Label: "{title} Task를 Top 3에서 빼기",
      archiveLabel: "{title} Task 보관",
      deleteLabel: "{title} Task 삭제",
    },
  },
  inbox: {
    title: "Inbox",
    description: {
      formal: "판단은 나중에 해도 괜찮아요. 떠오른 것을 먼저 내려놓으세요.",
      casual: "판단은 나중에 해도 괜찮아. 떠오른 것을 먼저 내려놔.",
    },
    capture: {
      title: "빠른 기록",
      placeholder: {
        formal: "잊기 전에 여기에 적어두세요",
        casual: "잊기 전에 여기에 적어둬",
      },
      submit: "기록하기",
      pending: "기록 중…",
    },
    list: {
      title: "기록된 생각",
      description: {
        formal: "정리가 필요할 때 천천히 살펴보세요.",
        casual: "정리가 필요할 때 천천히 살펴봐.",
      },
      empty: {
        formal: "지금 내려놓을 생각이 생기면 여기에 적어두세요.",
        casual: "지금 내려놓을 생각이 생기면 여기에 적어둬.",
      },
    },
    item: {
      convert: "Task로 옮기기",
      convertLabel: "Inbox 항목을 Task로 옮기기",
      deleteLabel: "Inbox 항목 삭제",
    },
  },
  notes: {
    title: "Notes",
    description: {
      formal: "조금 더 오래 간직하고 싶은 생각을 남겨두세요.",
      casual: "조금 더 오래 간직하고 싶은 생각을 남겨둬.",
    },
    create: {
      title: "새 Note",
      placeholder: {
        formal: "오래 남겨두고 싶은 생각을 적어보세요",
        casual: "오래 남겨두고 싶은 생각을 적어봐",
      },
      submit: "Note 저장",
    },
    list: {
      title: "최근 Note",
      description: {
        formal: "최근에 남긴 생각부터 보여드려요.",
        casual: "최근에 남긴 생각부터 보여줄게.",
      },
      empty: {
        formal: "아직 기록된 Note가 없어요. 오래 두고 싶은 생각이 생기면 남겨보세요.",
        casual: "아직 기록된 Note가 없어. 오래 두고 싶은 생각이 생기면 남겨봐.",
      },
    },
    item: {
      editing: "Note 수정 중",
      saveChanges: "변경 저장",
      saveChangesLabel: "Note 수정 내용 저장",
      cancelEditLabel: "Note 수정 취소",
      editLabel: "Note 수정",
      deleteLabel: "Note 삭제",
    },
  },
  projects: {
    title: "Projects",
    description: {
      formal: "이어가고 있는 일의 방향을 차분히 살펴보세요.",
      casual: "이어가고 있는 일의 방향을 차분히 살펴봐.",
    },
    create: {
      open: "새 Project 만들기",
      nameLabel: "Project 이름",
      namePlaceholder: "함께 묶어둘 일의 이름",
      colorLabel: "구분 색상",
      colorHelp: {
        formal: "이름과 함께 Project를 구분하는 보조 색상이에요.",
        casual: "이름과 함께 Project를 구분하는 보조 색상이야.",
      },
      submit: "Project 추가",
    },
    list: {
      title: "현재 Project",
      description: {
        formal: "작업이 묶인 방향을 한눈에 살펴보세요.",
        casual: "작업이 묶인 방향을 한눈에 살펴봐.",
      },
      empty: {
        formal: "아직 만든 Project가 없어요. 필요할 때 새로운 방향을 묶어보세요.",
        casual: "아직 만든 Project가 없어. 필요할 때 새로운 방향을 묶어봐.",
      },
      taskCount: {
        one: "연결된 Task {count}개",
        few: "연결된 Task {count}개",
        many: "연결된 Task {count}개",
        other: "연결된 Task {count}개",
      },
      deleteLabel: "{name} Project 삭제",
    },
  },
  more: {
    title: "More",
    description: "필요한 곳으로 천천히 이동하기",
    navigationLabel: "추가 메뉴",
    projectsDescription: "진행 중인 일의 흐름 확인",
    settingsDescription: "RIA의 말투와 사용 환경 조정",
  },
  settings: {
    title: "Settings",
    description: {
      formal: "RIA가 어떤 말투로 곁에 있을지 선택하세요.",
      casual: "RIA가 어떤 말투로 곁에 있을지 골라봐.",
    },
    speechStyle: {
      title: "말투 설정",
      description: {
        formal: "편안하게 느껴지는 말투를 선택하세요.",
        casual: "편안하게 느껴지는 말투를 골라봐.",
      },
      legend: "RIA 말투 선택",
      formalLabel: "존댓말",
      formalAccessibleLabel: "존댓말 말투",
      formalExample: "오늘도 함께 살펴볼까요?",
      casualLabel: "편한 말투",
      casualAccessibleLabel: "편한 말투",
      casualExample: "오늘도 같이 살펴볼까?",
      selected: "선택됨",
      select: "선택",
      saving: {
        formal: "말투를 저장하고 있어요…",
        casual: "말투를 저장하고 있어…",
      },
      saved: {
        formal: "말투를 저장했어요.",
        casual: "말투를 저장했어.",
      },
      optionLabel: "{label} {state}",
    },
    language: {
      title: "언어 설정",
      description: {
        formal: "RIA에서 사용할 언어를 선택하세요.",
        casual: "RIA에서 사용할 언어를 골라봐.",
      },
      legend: "RIA 언어 선택",
      selected: "선택됨",
      select: "선택",
      saving: "언어를 바꾸고 있어요…",
      saved: "언어를 변경했어요.",
      saveError: "언어 설정을 저장하지 못했어요. 다시 시도해주세요.",
      optionLabel: "{label} {state}",
    },
  },
  accessibility: {
    itemCount: {
      one: "{count}개",
      few: "{count}개",
      many: "{count}개",
      other: "{count}개",
    },
  },
} as const;
