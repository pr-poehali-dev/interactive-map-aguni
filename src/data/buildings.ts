export interface QRCode {
  id: string;
  name: string;
  url: string;
  image?: string;
}

export interface Building {
  id: string;
  letter: string;
  name: string;
  fullName: string;
  lat: number;
  lng: number;
  color: string;
  gradient: string;
  institutes: string[];
  address: string;
  description: string;
  photo?: string;
  qrCodes: QRCode[];
  floorMap?: string;
  extra?: string[];
}

export const buildings: Building[] = [
  {
    id: "M",
    letter: "М",
    name: "Главный корпус М",
    fullName: "Главный корпус М",
    lat: 53.34714,
    lng: 83.77845,
    color: "#1a3fa8",
    gradient: "from-blue-700 to-indigo-600",
    address: "пр. Ленина, 61",
    description: "Главный учебный корпус университета, административный центр АГУ",
    photo: "https://cdn.poehali.dev/projects/0d9b90aa-f21c-49c2-9293-c68e8ca12f3f/files/c054c259-06fe-4539-9f3b-c9184b0dcba9.jpg",
    institutes: ["ИНГЕО — Институт географии", "ИИМО — Институт истории и международных отношений"],
    qrCodes: [],
  },
  {
    id: "L",
    letter: "Л",
    name: "Корпус Л",
    fullName: "Корпус Л",
    lat: 53.34620,
    lng: 83.77750,
    color: "#7c3aed",
    gradient: "from-violet-600 to-purple-700",
    address: "ул. Димитрова, 66",
    description: "Корпус естественнонаучных факультетов",
    photo: "https://cdn.poehali.dev/projects/0d9b90aa-f21c-49c2-9293-c68e8ca12f3f/files/6e77bbdc-3ad9-4226-af7a-72d652751ece.jpg",
    institutes: ["ИББ — Институт биологии и биотехнологии", "ИМИТ — Институт математики и информационных технологий", "Библиотека АГУ"],
    qrCodes: [],
  },
  {
    id: "S",
    letter: "С",
    name: "Корпус С",
    fullName: "Корпус С",
    lat: 53.34540,
    lng: 83.77920,
    color: "#0ea5e9",
    gradient: "from-sky-500 to-blue-600",
    address: "ул. Смирнова, 10",
    description: "Корпус гуманитарных и социальных факультетов",
    photo: "https://cdn.poehali.dev/projects/0d9b90aa-f21c-49c2-9293-c68e8ca12f3f/files/b8e4a6f1-188d-482d-8b2f-a3da3261c763.jpg",
    institutes: [
      "МИЭМИС — Международный институт экономики, менеджмента и информационных систем",
      "Юридический институт",
      "Деканат (очная форма обучения)",
      "Деканат (заочная форма обучения)",
      "Центр Творчества",
      "Точка кипения",
      "Лига студентов",
    ],
    extra: ["Пристройка имени Калашникова"],
    qrCodes: [
      { id: "miemis", name: "МИЭМИС", url: "https://miemis.asu.ru" },
      { id: "law", name: "Юридический институт", url: "https://law.asu.ru" },
      { id: "dean-full", name: "Деканат очное", url: "https://asu.ru/dean" },
      { id: "dean-ext", name: "Деканат заочное", url: "https://asu.ru/dean-ext" },
      { id: "creativity", name: "Центр Творчества", url: "https://asu.ru/creativity" },
      { id: "boiling", name: "Точка кипения", url: "https://boiling.asu.ru" },
      { id: "liga", name: "Лига студентов", url: "https://liga.asu.ru" },
    ],
  },
  {
    id: "D",
    letter: "Д",
    name: "Корпус Д",
    fullName: "Корпус Д",
    lat: 53.34810,
    lng: 83.77640,
    color: "#f97316",
    gradient: "from-orange-500 to-amber-500",
    address: "ул. Короленко, 9",
    description: "Корпус гуманитарных наук и медиа",
    photo: "https://cdn.poehali.dev/projects/0d9b90aa-f21c-49c2-9293-c68e8ca12f3f/files/80a17eff-c9cd-436d-a2c4-df76fa48914b.jpg",
    institutes: ["ИГН — Институт гуманитарных наук", "Медиа.Хаб АГУ"],
    qrCodes: [],
  },
  {
    id: "K",
    letter: "К",
    name: "Корпус К",
    fullName: "Корпус К",
    lat: 53.34680,
    lng: 83.78010,
    color: "#10b981",
    gradient: "from-emerald-500 to-teal-600",
    address: "пр. Социалистический, 68",
    description: "Корпус химических и технических факультетов",
    photo: "https://cdn.poehali.dev/projects/0d9b90aa-f21c-49c2-9293-c68e8ca12f3f/files/4dbce4e7-3e54-4ab4-af7c-82e0235910c6.jpg",
    institutes: ["ИХиХФТ — Институт химии и химической технологии", "ИЦТЭФ — Институт цифровых технологий, электроники и физики"],
    qrCodes: [],
  },
  {
    id: "SOK",
    letter: "СОК",
    name: "Спортивно-оздоровительный комплекс",
    fullName: "СОК — Спортивно-оздоровительный комплекс",
    lat: 53.34760,
    lng: 83.77510,
    color: "#f59e0b",
    gradient: "from-amber-400 to-orange-400",
    address: "пр. Ленина, 61а",
    description: "Спортивный и оздоровительный центр университета",
    institutes: ["Бассейн", "Спортивные залы", "Фитнес-центр"],
    qrCodes: [],
  },
  {
    id: "CLINIC",
    letter: "П",
    name: "Студенческая поликлиника",
    fullName: "Студенческая поликлиника",
    lat: 53.34880,
    lng: 83.77730,
    color: "#ec4899",
    gradient: "from-pink-500 to-rose-500",
    address: "пр. Ленина, 66",
    description: "Медицинское учреждение для студентов и сотрудников АГУ",
    institutes: ["Терапия", "Стоматология", "Профилактика"],
    qrCodes: [],
  },
];
