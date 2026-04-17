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
    lat: 53.347200,
    lng: 83.778500,
    color: "#1a3fa8",
    gradient: "from-blue-700 to-indigo-600",
    address: "пр. Ленина, 61",
    description: "Главный учебный корпус университета, административный центр АГУ",
    photo: "https://cdn.poehali.dev/projects/0d9b90aa-f21c-49c2-9293-c68e8ca12f3f/files/c054c259-06fe-4539-9f3b-c9184b0dcba9.jpg",
    institutes: [
      "ИНГЕО — Институт географии",
      "ИИМО — Институт истории и международных отношений",
    ],
    qrCodes: [
      {
        id: "iimo",
        name: "ИИМО",
        url: "https://iimo.asu.ru",
        image: "https://cdn.poehali.dev/projects/0d9b90aa-f21c-49c2-9293-c68e8ca12f3f/bucket/594ff977-3f98-4884-ab9c-dbca95abdfea.jpg",
      },
    ],
  },
  {
    id: "L",
    letter: "Л",
    name: "Корпус Л",
    fullName: "Корпус Л",
    lat: 53.347050,
    lng: 83.778200,
    color: "#7c3aed",
    gradient: "from-violet-600 to-purple-700",
    address: "пр. Ленина, 61",
    description: "Корпус естественнонаучных факультетов",
    photo: "https://cdn.poehali.dev/projects/0d9b90aa-f21c-49c2-9293-c68e8ca12f3f/files/6e77bbdc-3ad9-4226-af7a-72d652751ece.jpg",
    institutes: [
      "ИББ — Институт биологии и биотехнологии",
      "ИМИТ — Институт математики и информационных технологий",
      "Библиотека АГУ",
    ],
    qrCodes: [
      {
        id: "imit",
        name: "ИМИТ",
        url: "https://imit.asu.ru",
        image: "https://cdn.poehali.dev/projects/0d9b90aa-f21c-49c2-9293-c68e8ca12f3f/bucket/ddc57b3f-78d0-4ce7-96c0-f07fe20526af.jpg",
      },
    ],
  },
  {
    id: "S",
    letter: "С",
    name: "Корпус С",
    fullName: "Корпус С",
    lat: 53.345100,
    lng: 83.775800,
    color: "#0ea5e9",
    gradient: "from-sky-500 to-blue-600",
    address: "пр. Социалистический, 68",
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
      {
        id: "miemis",
        name: "МИЭМИС",
        url: "https://miemis.asu.ru",
        image: "https://cdn.poehali.dev/projects/0d9b90aa-f21c-49c2-9293-c68e8ca12f3f/bucket/551048ac-99de-4633-ada6-ed8a4f6041b5.jpg",
      },
      { id: "law", name: "Юридический институт", url: "https://law.asu.ru" },
      { id: "dean-full", name: "Деканат очное", url: "https://asu.ru/dean" },
      { id: "dean-ext", name: "Деканат заочное", url: "https://asu.ru/dean-ext" },
      {
        id: "creativity",
        name: "Центр Творчества",
        url: "https://asu.ru/creativity",
        image: "https://cdn.poehali.dev/projects/0d9b90aa-f21c-49c2-9293-c68e8ca12f3f/bucket/1bbeebf7-f1a2-416a-b578-0e10e7ad6a6a.jpg",
      },
      {
        id: "boiling",
        name: "Точка кипения",
        url: "https://boiling.asu.ru",
        image: "https://cdn.poehali.dev/projects/0d9b90aa-f21c-49c2-9293-c68e8ca12f3f/bucket/56a4b705-02a1-458b-9e26-6d60a658fce7.jpg",
      },
      {
        id: "liga",
        name: "Лига студентов",
        url: "https://liga.asu.ru",
        image: "https://cdn.poehali.dev/projects/0d9b90aa-f21c-49c2-9293-c68e8ca12f3f/bucket/28d0082f-d45b-4ee8-92ae-4fa7979332fd.jpg",
      },
    ],
  },
  {
    id: "D",
    letter: "Д",
    name: "Корпус Д",
    fullName: "Корпус Д",
    lat: 53.349800,
    lng: 83.776500,
    color: "#f97316",
    gradient: "from-orange-500 to-amber-500",
    address: "ул. Димитрова, 66",
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
    lat: 53.337800,
    lng: 83.783200,
    color: "#10b981",
    gradient: "from-emerald-500 to-teal-600",
    address: "пр. Красноармейский, 90",
    description: "Корпус химических и технических факультетов",
    photo: "https://cdn.poehali.dev/projects/0d9b90aa-f21c-49c2-9293-c68e8ca12f3f/files/4dbce4e7-3e54-4ab4-af7c-82e0235910c6.jpg",
    institutes: [
      "ИХиХФТ — Институт химии и химической технологии",
      "ИЦТЭФ — Институт цифровых технологий, электроники и физики",
    ],
    qrCodes: [],
  },
  {
    id: "SOK",
    letter: "СОК",
    name: "Спортивно-оздоровительный комплекс",
    fullName: "СОК — Спортивно-оздоровительный комплекс",
    lat: 53.337600,
    lng: 83.783500,
    color: "#f59e0b",
    gradient: "from-amber-400 to-orange-400",
    address: "пр. Красноармейский, 90а",
    description: "Спортивный и оздоровительный центр университета",
    institutes: ["Бассейн", "Спортивные залы", "Фитнес-центр"],
    qrCodes: [],
  },
  {
    id: "CLINIC",
    letter: "П",
    name: "Студенческая поликлиника",
    fullName: "Студенческая поликлиника",
    lat: 53.348800,
    lng: 83.777300,
    color: "#ec4899",
    gradient: "from-pink-500 to-rose-500",
    address: "пр. Ленина, 66",
    description: "Медицинское учреждение для студентов и сотрудников АГУ",
    institutes: ["Терапия", "Стоматология", "Профилактика"],
    qrCodes: [],
  },
];
