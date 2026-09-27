import { FoodItem, BrushingStep, QuizQuestion, Badge } from '../types';

export const FOOD_ITEMS: FoodItem[] = [
  // Makanan Sahabat Gigi (Baik)
  {
    id: 'food_apple',
    name: 'Apel Segar',
    category: 'good',
    icon: '🍎',
    color: '#ef4444',
    description: 'Buah renyah kaya serat alami',
    educationalFact: 'Mengunyah apel menghasilkan banyak air liur (saliva) yang membersihkan sisa makanan dan menetralkan asam di mulut secara alami!'
  },
  {
    id: 'food_milk',
    name: 'Susu Segar',
    category: 'good',
    icon: '🥛',
    color: '#38bdf8',
    description: 'Kaya kalsium & vitamin D',
    educationalFact: 'Kalsium dan fosfat dalam susu membantu proses remineralisasi untuk memperkuat lapisan email gigi agar tidak mudah keropos.'
  },
  {
    id: 'food_cheese',
    name: 'Keju Lembut',
    category: 'good',
    icon: '🧀',
    color: '#facc15',
    description: 'Tinggi kalsium & penyeimbang pH',
    educationalFact: 'Keju merangsang air liur dan menaikkan pH mulut sehingga keasaman turun, melindungi gigi dari serangan asam pembentuk lubang!'
  },
  {
    id: 'food_carrot',
    name: 'Wortel Renyah',
    category: 'good',
    icon: '🥕',
    color: '#f97316',
    description: 'Kaya vitamin A & serat pembersih',
    educationalFact: 'Tekstur renyah wortel bertindak seperti sikat gigi alami yang menggosok plak dari permukaan gigi dan menjaga kesehatan gusi.'
  },
  {
    id: 'food_water',
    name: 'Air Putih Bersih',
    category: 'good',
    icon: '💧',
    color: '#0284c7',
    description: 'Pembersih alami tanpa gula',
    educationalFact: 'Minum air putih membantu membilas sisa makanan, mencegah mulut kering (xerostomia), dan menjaga kebersihan rongga mulut.'
  },
  {
    id: 'food_broccoli',
    name: 'Brokoli Hijau',
    category: 'good',
    icon: '🥦',
    color: '#22c55e',
    description: 'Sayuran kaya zat besi & kalsium',
    educationalFact: 'Zat besi dan kalsium dalam brokoli membentuk lapisan pelindung asam pada email gigi dan menyehatkan gusi.'
  },
  {
    id: 'food_fish',
    name: 'Ikan & Telur',
    category: 'good',
    icon: '🐟',
    color: '#06b6d4',
    description: 'Sumber vitamin D & fosfor',
    educationalFact: 'Vitamin D sangat dibutuhkan tubuh untuk menyerap kalsium secara maksimal agar tulang rahang dan gigi tumbuh kuat.'
  },

  // Makanan Musuh Gigi (Buruk/Perusak jika berlebih & tidak disikat)
  {
    id: 'food_candy',
    name: 'Permen Lolipop',
    category: 'bad',
    icon: '🍭',
    color: '#ec4899',
    description: 'Tinggi gula & sangat lengket',
    educationalFact: 'Permen manis menempel lama di sela gigi. Bakteri pengurai gula akan mengubahnya menjadi asam yang melarutkan email gigi hingga berlubang!'
  },
  {
    id: 'food_soda',
    name: 'Minuman Bersoda',
    category: 'bad',
    icon: '🥤',
    color: '#8b5cf6',
    description: 'Sangat asam & tinggi kadar gula',
    educationalFact: 'Soda memiliki tingkat keasaman tinggi (pH rendah) ditambah gula, yang langsung mengikis (erosi) lapisan keras pelindung gigi.'
  },
  {
    id: 'food_chocolate',
    name: 'Cokelat Manis',
    category: 'bad',
    icon: '🍫',
    color: '#78350f',
    description: 'Lengket dan penuh pemanis buatan',
    educationalFact: 'Cokelat manis yang tertinggal di sela gigi menjadi makanan empuk bagi bakteri Streptococcus mutans untuk menghasilkan asam perusak.'
  },
  {
    id: 'food_chips',
    name: 'Keripik Renyah Manis/Asin',
    category: 'bad',
    icon: '🍟',
    color: '#eab308',
    description: 'Tepung olahan mudah jadi gula',
    educationalFact: 'Keripik berbahan pati mudah terselip di sela gigi. Enzim amilase di mulut mengubah pati menjadi gula sederhana pemicu plak.'
  },
  {
    id: 'food_ice_cube',
    name: 'Es Batu (Dikunyah Paksa)',
    category: 'bad',
    icon: '🧊',
    color: '#64748b',
    description: 'Sangat keras & dingin ekstrem',
    educationalFact: 'Mengunyah es batu yang keras dapat memicu retakan mikro (micro-cracks) pada email gigi bahkan bisa membuat tambalan gigi pecah!'
  },
  {
    id: 'food_boba',
    name: 'Minuman Boba Manis',
    category: 'bad',
    icon: '🧋',
    color: '#d97706',
    description: 'Kombinasi gula cair pekat & kenyal',
    educationalFact: 'Boba yang kenyal mudah menempel di lekukan gigi geraham, dan sirup manisnya membasahi seluruh gigi dengan asam gula.'
  }
];

export const BRUSHING_STEPS: BrushingStep[] = [
  {
    id: 1,
    correctOrder: 1,
    title: 'Oleskan Pasta Gigi Secukupnya',
    shortDesc: 'Gunakan pasta gigi berfluoride sebesar biji jagung (pea-sized).',
    detailReason: 'Untuk anak dan dewasa, pasta gigi seukuran biji jagung sudah cukup memberikan perlindungan fluoride tanpa busa berlebih yang membuat ingin cepat meludah.',
    iconName: 'Sparkles',
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  {
    id: 2,
    correctOrder: 2,
    title: 'Sikat Bagian Luar Depan (Memutar)',
    shortDesc: 'Arahkan sikat 45° ke gusi, buat gerakan melingkar bulat lembut.',
    detailReason: 'Gerakan memutar dari arah perbatasan gusi ke gigi efektif mengangkat plak tanpa melukai atau menyebabkan penurunan gusi (resesi gingiva).',
    iconName: 'Smile',
    color: 'bg-sky-50 text-sky-700 border-sky-200'
  },
  {
    id: 3,
    correctOrder: 3,
    title: 'Sikat Permukaan Kunyah Geraham',
    shortDesc: 'Gerakkan sikat maju-mundur pendek pada lekukan gigi geraham.',
    detailReason: 'Permukaan kunyah memiliki ceruk dan fisur yang dalam, tempat favorit sisa makanan bersarang dan memicu lubang gigi belakang.',
    iconName: 'Activity',
    color: 'bg-amber-50 text-amber-700 border-amber-200'
  },
  {
    id: 4,
    correctOrder: 4,
    title: 'Sikat Bagian Dalam Gigi (Mencongkel)',
    shortDesc: 'Posisikan sikat tegak, cungkil kotoran perlahan dari arah gusi ke luar.',
    detailReason: 'Bagian belakang gigi depan sering menumpuk karang gigi karena dekat muara kelenjar liur; gerakan mencungkil lembut membersihkannya optimal.',
    iconName: 'Shield',
    color: 'bg-indigo-50 text-indigo-700 border-indigo-200'
  },
  {
    id: 5,
    correctOrder: 5,
    title: 'Bersihkan Permukaan Lidah',
    shortDesc: 'Sikat punggung lidah perlahan dari pangkal ke ujung.',
    detailReason: 'Lebih dari 80% bakteri penyebab bau mulut (halitosis) bersembunyi di papila lidah. Membersihkan lidah membuat napas segar seketika!',
    iconName: 'Wind',
    color: 'bg-pink-50 text-pink-700 border-pink-200'
  },
  {
    id: 6,
    correctOrder: 6,
    title: 'Kumur Cukup 1 Kali Saja',
    shortDesc: 'Keluarkan busa sisa pasta gigi dan bilas ringan hanya 1 kali.',
    detailReason: 'Tahukah kamu? Jangan berkumur berulang-ulang dengan banyak air! Membiarkan sisa tipis fluoride menempel di gigi akan melindungi email lebih lama.',
    iconName: 'Droplets',
    color: 'bg-teal-50 text-teal-700 border-teal-200'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Berapa kali sebaiknya kita menyikat gigi setiap hari?',
    options: [
      '1 kali saja saat mandi pagi',
      'Minimal 2 kali: pagi setelah sarapan & malam sebelum tidur',
      'Hanya saat gigi terasa kotor',
      '5 kali setiap selesai ngemil'
    ],
    correctIndex: 1,
    explanation: 'Standar kesehatan gigi Kemenkes & PDGI menganjurkan menyikat gigi minimal 2 kali sehari: pagi hari setelah sarapan dan malam hari sebelum tidur agar kuman tidak berkembang biak semalaman.',
    source: 'Kementerian Kesehatan RI'
  },
  {
    id: 2,
    question: 'Berapa lama durasi menyikat gigi yang dianjurkan oleh dokter gigi?',
    options: [
      '30 detik saja cepat-cepat',
      'Minimal 2 menit (120 detik)',
      '10 menit sampai busa habis',
      '15 detik'
    ],
    correctIndex: 1,
    explanation: 'Waktu ideal menyikat gigi adalah minimal 2 menit, dibagi rata 30 detik untuk setiap kuadran mulut (kanan atas, kiri atas, kiri bawah, kanan bawah).',
    source: 'World Dental Federation (FDI)'
  },
  {
    id: 3,
    question: 'Kapan kita harus mengganti sikat gigi dengan yang baru?',
    options: [
      'Setiap 3 bulan sekali atau jika bulu sikat sudah mekar/rusak',
      'Setahun sekali saat ulang tahun',
      'Kalau gagang sikat gigi patah',
      'Tidak perlu diganti selamanya'
    ],
    correctIndex: 0,
    explanation: 'Bulu sikat yang sudah mekar atau berusia lebih dari 3 bulan sudah tidak efektif membersihkan plak dan bisa menjadi sarang penumpukan bakteri.',
    source: 'Persatuan Dokter Gigi Indonesia (PDGI)'
  },
  {
    id: 4,
    question: 'Berapa banyak pasta gigi yang dianjurkan ditaruh di sikat gigi untuk anak dan remaja?',
    options: [
      'Sepenuh bulu sikat sampai tumpah',
      'Sebesar biji jagung / kacang polong (pea-sized)',
      'Satu sendok makan',
      'Cukup dicelupkan ke air saja'
    ],
    correctIndex: 1,
    explanation: 'Cukup sebesar biji jagung! Jumlah ini sudah cukup memberikan manfaat fluoride tanpa membuat busa melimpah berlebihan yang bikin mual.',
    source: 'Ikatan Dokter Gigi Anak Indonesia'
  },
  {
    id: 5,
    question: 'Berapa kali kita sebaiknya memeriksakan gigi ke dokter gigi secara rutin?',
    options: [
      'Hanya kalau gigi sudah sakit berdenyut',
      'Minimal 6 bulan sekali',
      '5 tahun sekali',
      'Tidak perlu ke dokter gigi jika rajin gosok gigi'
    ],
    correctIndex: 1,
    explanation: 'Pemeriksaan rutin setiap 6 bulan sekali penting untuk mendeteksi lubang kecil sejak dini sebelum menjadi parah dan membersihkan karang gigi yang mengeras.',
    source: 'Standar WHO & Kemenkes'
  },
  {
    id: 6,
    question: 'Mengapa setelah menyikat gigi dianjurkan hanya berkumur 1 kali dengan sedikit air?',
    options: [
      'Agar menghemat air kran',
      'Supaya lapisan pelindung fluoride tidak larut terbuang semua',
      'Karena pasta gigi rasanya enak',
      'Agar napas tidak terlalu wangi'
    ],
    correctIndex: 1,
    explanation: 'Kumur berulang-ulang dengan air akan membilas habis zat fluoride. Dengan meludah dan kumur 1 kali saja, fluoride tetap bekerja memperkuat email gigi.',
    source: 'British Dental Association & FDI'
  },
  {
    id: 7,
    question: 'Alat apa yang paling efektif membersihkan sisa makanan yang terjepit di antara dua gigi?',
    options: [
      'Tusuk gigi dari kayu runcing',
      'Benang gigi khusus (Dental Floss)',
      'Jarum pentul atau peniti',
      'Kuku jari tangan'
    ],
    correctIndex: 1,
    explanation: 'Dental floss (benang gigi) dirancang khusus lentur dan aman membersihkan sela gigi tanpa melukai gusi. Tusuk gigi tajam dapat membuat gusi berdarah dan renggang.',
    source: 'PDGI'
  },
  {
    id: 8,
    question: 'Makanan manakah di bawah ini yang paling baik untuk membantu membersihkan gigi secara alami?',
    options: [
      'Permen karet manis bergula',
      'Apel dan wortel segar yang renyah',
      'Kue donat bertabur cokelat',
      'Keripik kentang manis'
    ],
    correctIndex: 1,
    explanation: 'Buah apel dan wortel yang kaya serat merangsang air liur yang banyak dan secara mekanis membantu membersihkan plak di permukaan gigi saat dikunyah.',
    source: 'Edukasi Gizi & Kesehatan Gigi'
  }
];

export const BADGES_LIST: Badge[] = [
  {
    id: 'badge_first_step',
    title: 'Langkah Pertama',
    description: 'Memulai petualangan belajar di GigiSehat.',
    icon: '🌱',
    category: 'general',
    condition: 'Bermain salah satu mini game untuk pertama kali.'
  },
  {
    id: 'badge_food_master',
    title: 'Sahabat Nutrisi Gigi',
    description: 'Berhasil memilah semua makanan sehat & merusak gigi dengan benar.',
    icon: '🍎',
    category: 'food',
    condition: 'Mendapatkan skor minimal 100 di Pilah Makanan.'
  },
  {
    id: 'badge_germ_slayer',
    title: 'Pahlawan Anti Kuman',
    description: 'Menyingkirkan kuman dan plak gigi hingga mulut bersih berkilau!',
    icon: '🛡️',
    category: 'clean',
    condition: 'Menuntaskan Basmi Kuman dengan kebersihan 100%.'
  },
  {
    id: 'badge_step_genius',
    title: 'Master Urutan Sikat Gigi',
    description: 'Menyusun 6 langkah menyikat gigi yang tepat tanpa salah.',
    icon: '🪥',
    category: 'steps',
    condition: 'Menyelesaikan tantangan Urutkan Langkah Sikat Gigi.'
  },
  {
    id: 'badge_timer_hero',
    title: 'Juara 2 Menit Sikat Gigi',
    description: 'Menyelesaikan sesi panduan menyikat gigi 4 kuadran selama 2 menit.',
    icon: '⏱️',
    category: 'timer',
    condition: 'Menyelesaikan sesi Timer 2 Menit sampai tuntas.'
  },
  {
    id: 'badge_quiz_champ',
    title: 'Dokter Gigi Cilik',
    description: 'Menjawab kuis kesehatan gigi dengan nilai sempurna!',
    icon: '🎓',
    category: 'quiz',
    condition: 'Mencapai skor tinggi pada Kuis Dokter Gigi Cilik.'
  },
  {
    id: 'badge_sparkle_legend',
    title: 'Bintang Gigi Berkilau',
    description: 'Mengumpulkan lebih dari 300 poin total di GigiSehat!',
    icon: '✨',
    category: 'general',
    condition: 'Mencapai 300 total poin.'
  }
];

export const ENCYCLOPEDIA_SECTIONS = [
  {
    id: 'anatomy',
    title: 'Anatomi Gigi Kita',
    subtitle: 'Kenali bagian-bagian luar biasa di dalam sebutir gigi',
    icon: '🦷',
    items: [
      {
        part: 'Email (Enamel)',
        desc: 'Lapisan putih paling luar gigi. Ini adalah zat paling keras di tubuh manusia! Berfungsi melindungi bagian dalam gigi dari keausan dan asam.',
        tip: 'Jaga email dengan fluoride dan hindari minuman asam berlebih.'
      },
      {
        part: 'Dentin',
        desc: 'Lapisan di bawah email yang berwarna agak kekuningan. Memiliki saluran-saluran renik ke saraf gigi.',
        tip: 'Jika email terkikis, dentin terbuka dan gigi terasa ngilu saat minum dingin.'
      },
      {
        part: 'Pulpa (Pulp)',
        desc: 'Bagian tengah gigi yang berisi pembuluh darah dan serabut saraf hidup. Memberikan nutrisi pada gigi.',
        tip: 'Jika lubang gigi mencapai pulpa, gigi akan terasa sakit berdenyut hebat.'
      },
      {
        part: 'Gusi (Gingiva)',
        desc: 'Jaringan merah muda yang menyelimuti tulang rahang dan mencengkeram leher gigi.',
        tip: 'Sikat gigi memutar lembut mencegah gusi berdarah dan penurunan gusi.'
      }
    ]
  },
  {
    id: 'myths',
    title: 'Mitos vs Fakta Gigi',
    subtitle: 'Luruskan anggapan yang sering keliru tentang kesehatan gigi',
    icon: '💡',
    items: [
      {
        part: 'Mitos: Menggosok gigi makin keras makin bersih',
        desc: 'Fakta: Menyikat terlalu keras dengan bulu sikat kasar justru mengikis lapisan email gigi dan melukai gusi!',
        tip: 'Gunakan sikat berbulu lembut (soft) dengan gerakan memutar melingkar santai.'
      },
      {
        part: 'Mitos: Gigi susu anak berlubang tidak perlu dirawat karena akan copot',
        desc: 'Fakta: Gigi susu yang rusak bisa infeksi, memicu rasa sakit, dan membuat gigi permanen penggantinya tumbuh berantakan!',
        tip: 'Rawat gigi sejak gigi susu pertama tumbuh pada usia 6 bulan.'
      },
      {
        part: 'Mitos: Kalau tidak sakit gigi, tidak perlu ke dokter gigi',
        desc: 'Fakta: Lubang gigi pada tahap awal sering kali TIDAK terasa sakit sama sekali. Saat terasa sakit, kerusakannya sudah dalam!',
        tip: 'Periksa berkala setiap 6 bulan sekali untuk tindakan pencegahan.'
      },
      {
        part: 'Mitos: Kumur banyak air setelah sikat gigi bikin lebih higienis',
        desc: 'Fakta: Berkumur banyak air justru membilas habis zat fluoride yang baru menempel di gigi.',
        tip: 'Kumur cukup 1 kali dengan sedikit air agar fluoride tetap aktif melindungi gigi.'
      }
    ]
  },
  {
    id: 'daily_routine',
    title: 'Jadwal 24 Jam Gigi Juara',
    subtitle: 'Kebiasaan harian mudah untuk senyum cerah percaya diri',
    icon: '⭐',
    items: [
      {
        part: 'Pagi Hari (Setelah Sarapan)',
        desc: 'Sikat gigi 2 menit dengan pasta gigi berfluoride sebutir biji jagung. Membersihkan sisa sarapan agar nafas segar sepanjang aktivitas sekolah/kerja.',
        tip: 'Jangan sikat gigi sebelum sarapan; sikatlah SETELAH sarapan pagi.'
      },
      {
        part: 'Siang Hari (Setelah Makan Siang)',
        desc: 'Kumur air putih bersih setelah makan untuk membilas sisa makanan yang terselip dan menetralkan keasaman mulut.',
        tip: 'Pilih camilan buah potong daripada biskuit manis yang lengket.'
      },
      {
        part: 'Malam Hari (Tepat Sebelum Tidur)',
        desc: 'Ini adalah waktu paling krusial! Saat tidur, produksi air liur berkurang drastis sehingga bakteri sangat mudah merusak gigi jika tidak disikat.',
        tip: 'Setelah sikat gigi malam, jangan makan atau minum manis lagi kecuali air putih.'
      }
    ]
  }
];
