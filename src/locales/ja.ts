import type { Dictionary } from "@/locales/schema";

export const ja = {
  common: {
    actions: {
      save: "保存",
      cancel: "キャンセル",
      delete: "削除",
      edit: "編集",
      open: "開く →",
    },
    pending: {
      saving: "保存しています…",
      savingShort: "保存中",
      adding: "追加しています…",
      deleting: "削除しています…",
      processing: "処理しています…",
    },
    count: {
      one: "{count}件",
      few: "{count}件",
      many: "{count}件",
      other: "{count}件",
    },
  },
  navigation: {
    label: "メインナビゲーション",
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
        withName: "またお会いしましょう、{name}。",
        withoutName: "またお会いしましょう。",
      },
      casual: {
        withName: "またね、{name}。",
        withoutName: "またね。",
      },
    },
    voice: {
      openLabel: "RIAの音声入力を開く",
      listeningLabel: "RIAが聞いています",
      listening: {
        formal: "聞いています",
        casual: "聞いてるよ",
      },
    },
  },
  home: {
    greeting: {
      morning: {
        formal: {
          withName: "おはようございます、{name}。",
          withoutName: "おはようございます。",
        },
        casual: {
          withName: "おはよう、{name}。",
          withoutName: "おはよう。",
        },
      },
      afternoon: {
        formal: {
          withName: "午後のリズムを一緒に見てみましょうか、{name}。",
          withoutName: "午後のリズムを一緒に見てみましょうか。",
        },
        casual: {
          withName: "こんにちは、{name}。",
          withoutName: "こんにちは。",
        },
      },
      evening: {
        formal: {
          withName: "今日一日をゆっくり振り返ってみましょうか、{name}。",
          withoutName: "今日一日をゆっくり振り返ってみましょうか。",
        },
        casual: {
          withName: "こんばんは、{name}。",
          withoutName: "こんばんは。",
        },
      },
    },
    casualDefaultName: "",
    rhythm: {
      title: "今日のリズム",
      descriptions: {
        Calm: "今日は無理をせず、穏やかなペースで過ごせる日です。",
        Focus: "今日は大切なことに静かに集中する日です。",
        Recovery: "今日は休息と回復のための余白をつくる日です。",
        Light: "今日は軽やかに流れに沿って過ごせる日です。",
        "Deep Work": "今日は落ち着いて深く取り組む日です。",
      },
    },
    direction: {
      title: "今日の方向",
      description: {
        formal: "今日を導く一つのことを、ゆっくり決めてみましょう。",
        casual: "今日を導く一つのことを、ゆっくり決めてみよう。",
      },
      placeholder: {
        formal: "今日一つだけ選ぶなら、何がいちばん大切ですか？",
        casual: "今日一つだけ選ぶなら、何がいちばん大切かな？",
      },
      empty: {
        formal: "今日の方向はまだ決まっていません。\nいちばん大切なことを一つ選んでみましょうか。",
        casual: "今日の方向はまだ決まっていないよ。\nいちばん大切なことを一つ選んでみようか。",
      },
      review: {
        formal: "選択して、もう一度見てみましょう",
        casual: "選択して、もう一度見てみよう",
      },
      choose: "今日の方向を決める",
      inputLabel: "今日の方向",
      editLabel: "今日の方向を編集：{title}",
    },
    priorities: {
      title: "今できる一歩",
      description: {
        formal: "いちばん意味のあることから、一つずつ進めてみましょう。",
        casual: "いちばん意味のあることから、一つずつ進めよう。",
      },
      empty: {
        formal: "今日のTasksはまだ決まっていません。\n思い浮かんだことから一つ書いてみましょうか。",
        casual: "今日のTasksはまだ決まっていないよ。\n思い浮かんだことから一つ書いてみようか。",
      },
      choose: "Tasksから選ぶ",
      first: "最初に",
      completeLabel: "{title}を完了する",
      reopenLabel: "{title}を未完了に戻す",
    },
    schedule: {
      title: "次の予定",
      description: {
        formal: "時間の流れを一度だけ、そっと見てみましょう。",
        casual: "時間の流れを一度だけ、軽く見てみよう。",
      },
      empty: {
        formal: "今日は予定が入っていません。\nゆったり過ごせる一日ですね。",
        casual: "今日は予定が入っていないよ。\nゆったり過ごせる一日だね。",
      },
      add: {
        formal: "必要なら予定を追加してみましょう",
        casual: "必要なら予定を追加してみよう",
      },
      nearest: "いちばん近い予定",
      later: "その後の予定",
    },
    quickCapture: {
      title: "クイックメモ",
      action: "浮かんだことを、いったん置いておく",
      description: {
        formal: "Inboxに気軽に残しておけます。",
        casual: "Inboxに気軽に残しておけるよ。",
      },
    },
    suggestion: {
      label: "RIAからの提案",
      heading: {
        formal: "一緒に見てみましょうか？",
        casual: "一緒に見てみようか？",
      },
      afternoonHeavy: {
        formal: "午後の予定が少し多いようです。午前中は大切なことを一つだけ終えてみましょうか。",
        casual: "午後の予定が少し多そうだね。午前中は大切なことを一つだけ終えてみようか。",
      },
    },
  },
  tasks: {
    title: "Tasks",
    description: "今大切なことから、落ち着いて見ていく",
    create: {
      open: "新しいTaskを作成",
      titleLabel: "Taskのタイトル",
      titlePlaceholder: "今しておきたいTaskを入力",
      priorityLabel: "優先度",
      projectLabel: "Project",
      noProject: "Project未設定",
      dueLabel: "予定時刻",
      optional: "（任意）",
      submit: "Taskを追加",
    },
    priority: {
      low: "低",
      medium: "中",
      high: "高",
    },
    status: {
      all: "すべての状態",
      todo: "未着手",
      doing: "進行中",
      done: "完了",
      archived: "アーカイブ済み",
    },
    sections: {
      important: "今大切なTask",
      importantDescription: "最初に見ておきたいTop 3",
      active: "進行中のTask",
      activeDescription: "必要なときに一つずつ続ける",
      completed: "完了したTask",
      completedDescription: "必要なら未完了に戻せます",
    },
    empty: "Taskはまだありません。思い浮かんだ次の一歩を、気軽に記録してみましょう。",
    emptyFiltered: "条件に合うTaskはありません。表示条件を調整してみましょう。",
    filters: {
      title: "表示を調整",
      description: "状態やProjectで一覧を絞り込む",
      status: "状態",
      project: "Project",
      allProjects: "すべてのProjects",
    },
    item: {
      top3: "Top 3",
      priority: "優先度",
      project: "Project",
      addTop3: "Top 3に追加",
      removeTop3: "Top 3から外す",
      archive: "アーカイブ",
      delete: "削除",
      completeLabel: "{title}を完了にする",
      reopenLabel: "{title}を未完了に戻す",
      addTop3Label: "Task「{title}」をTop 3に追加",
      removeTop3Label: "Task「{title}」をTop 3から外す",
      archiveLabel: "Task「{title}」をアーカイブ",
      deleteLabel: "Task「{title}」を削除",
    },
  },
  inbox: {
    title: "Inbox",
    description: {
      formal: "判断はあとで大丈夫です。まずは浮かんだことを置いておきましょう。",
      casual: "判断はあとで大丈夫。まずは浮かんだことを置いておこう。",
    },
    capture: {
      title: "クイックメモ",
      placeholder: {
        formal: "忘れる前にここへ書いておきましょう",
        casual: "忘れる前にここへ書いておこう",
      },
      submit: "記録する",
      pending: "記録しています…",
    },
    list: {
      title: "記録したこと",
      description: {
        formal: "整理したくなったときに、ゆっくり見てみましょう。",
        casual: "整理したくなったときに、ゆっくり見てみよう。",
      },
      empty: {
        formal: "置いておきたいことが浮かんだら、ここに記録できます。",
        casual: "置いておきたいことが浮かんだら、ここに書いておこう。",
      },
    },
    item: {
      convert: "Tasksへ移す",
      convertLabel: "Inboxの項目をTasksへ移す",
      deleteLabel: "Inboxの項目を削除",
    },
  },
  notes: {
    title: "Notes",
    description: {
      formal: "もう少し長く残しておきたい考えを記録しましょう。",
      casual: "もう少し長く残しておきたい考えを記録しよう。",
    },
    create: {
      title: "新しいNote",
      placeholder: {
        formal: "残しておきたい考えを書いてみましょう",
        casual: "残しておきたい考えを書いてみよう",
      },
      submit: "Noteを保存",
    },
    list: {
      title: "最近のNotes",
      description: {
        formal: "最近記録した考えから表示します。",
        casual: "最近記録した考えから表示するよ。",
      },
      empty: {
        formal: "Noteはまだありません。残しておきたい考えが浮かんだら記録してみましょう。",
        casual: "Noteはまだないよ。残しておきたい考えが浮かんだら記録してみよう。",
      },
    },
    item: {
      editing: "Noteを編集中",
      saveChanges: "変更を保存",
      saveChangesLabel: "Noteの変更を保存",
      cancelEditLabel: "Noteの編集をキャンセル",
      editLabel: "Noteを編集",
      deleteLabel: "Noteを削除",
    },
  },
  projects: {
    title: "Projects",
    description: {
      formal: "続けていることの方向を、落ち着いて見てみましょう。",
      casual: "続けていることの方向を、落ち着いて見てみよう。",
    },
    create: {
      open: "新しいProjectを作成",
      nameLabel: "Project名",
      namePlaceholder: "一緒にまとめておきたいことの名前",
      colorLabel: "識別カラー",
      colorHelp: {
        formal: "名前と一緒にProjectを見分けるための補助カラーです。",
        casual: "名前と一緒にProjectを見分けるための補助カラーだよ。",
      },
      submit: "Projectを追加",
    },
    list: {
      title: "現在のProjects",
      description: {
        formal: "Tasksがまとまっている方向を一覧で見てみましょう。",
        casual: "Tasksがまとまっている方向を一覧で見てみよう。",
      },
      empty: {
        formal: "Projectはまだありません。必要なときに、新しい方向としてまとめてみましょう。",
        casual: "Projectはまだないよ。必要なときに、新しい方向としてまとめてみよう。",
      },
      taskCount: {
        one: "関連するTask {count}件",
        few: "関連するTask {count}件",
        many: "関連するTask {count}件",
        other: "関連するTask {count}件",
      },
      deleteLabel: "Project「{name}」を削除",
    },
  },
  more: {
    title: "More",
    description: "必要な場所へ、ゆっくり移動する",
    navigationLabel: "その他のメニュー",
    projectsDescription: "進行中のことの流れを確認",
    settingsDescription: "RIAの言語、話し方、利用環境を調整",
  },
  settings: {
    title: "Settings",
    description: {
      formal: "RIAにどのような話し方でそばにいてほしいか選びましょう。",
      casual: "RIAにどんな話し方でそばにいてほしいか選ぼう。",
    },
    speechStyle: {
      title: "話し方",
      description: {
        formal: "心地よく感じる話し方を選びましょう。",
        casual: "心地よく感じる話し方を選ぼう。",
      },
      legend: "RIAの話し方を選択",
      formalLabel: "丁寧な話し方",
      formalAccessibleLabel: "丁寧な話し方",
      formalExample: "今日も一緒に見てみましょうか？",
      casualLabel: "親しみのある話し方",
      casualAccessibleLabel: "親しみのある話し方",
      casualExample: "今日も一緒に見てみようか？",
      selected: "選択中",
      select: "選択",
      saving: {
        formal: "話し方を保存しています…",
        casual: "話し方を保存しているよ…",
      },
      saved: {
        formal: "話し方を保存しました。",
        casual: "話し方を保存したよ。",
      },
      optionLabel: "{label}、{state}",
    },
    language: {
      title: "言語",
      description: {
        formal: "RIAで使用する言語を選びましょう。",
        casual: "RIAで使う言語を選ぼう。",
      },
      legend: "RIAの言語を選択",
      selected: "選択中",
      select: "選択",
      saving: "言語を変更しています…",
      saved: "言語を変更しました。",
      saveError: "言語設定を保存できませんでした。もう一度お試しください。",
      optionLabel: "{label}、{state}",
    },
  },
  accessibility: {
    itemCount: {
      one: "{count}件",
      few: "{count}件",
      many: "{count}件",
      other: "{count}件",
    },
  },
} as const satisfies Dictionary;
