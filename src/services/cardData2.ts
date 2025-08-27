import { MemoryCard } from './mongoService';

// Kalan kategoriler için kartlar
export const memoryCardsData2: MemoryCard[] = [
  // KİMYA KARTLARI (33 adet)
  {
    id: 'chemistry_1',
    category: 'chemistry',
    question: 'Periyodik tabloda kaç periyot vardır?',
    answer: '7 periyot vardır.',
    difficulty: 'easy',
    explanation: 'Periyodik tabloda yatay sıralar periyot olarak adlandırılır.',
    tags: ['periyodik tablo', 'periyot', 'element']
  },
  {
    id: 'chemistry_2',
    category: 'chemistry',
    question: 'Atom numarası nedir?',
    answer: 'Bir elementin çekirdeğindeki proton sayısıdır.',
    difficulty: 'easy',
    explanation: 'Atom numarası elementin kimliğini belirler.',
    tags: ['atom numarası', 'proton', 'element']
  },
  {
    id: 'chemistry_3',
    category: 'chemistry',
    question: 'Kütle numarası nedir?',
    answer: 'Proton ve nötron sayılarının toplamıdır.',
    difficulty: 'easy',
    explanation: 'Kütle numarası = Proton sayısı + Nötron sayısı',
    tags: ['kütle numarası', 'proton', 'nötron']
  },
  {
    id: 'chemistry_4',
    category: 'chemistry',
    question: 'İzotop nedir?',
    answer: 'Aynı atom numarasına sahip farklı kütle numaralı atomlardır.',
    difficulty: 'medium',
    explanation: 'İzotoplar farklı nötron sayısına sahiptir.',
    tags: ['izotop', 'atom', 'nötron']
  },
  {
    id: 'chemistry_5',
    category: 'chemistry',
    question: 'İyon nedir?',
    answer: 'Elektron alarak veya vererek yük kazanmış atom veya atom gruplarıdır.',
    difficulty: 'medium',
    explanation: 'Pozitif yüklü iyonlar katyon, negatif yüklü iyonlar anyon olarak adlandırılır.',
    tags: ['iyon', 'elektron', 'yük']
  },
  {
    id: 'chemistry_6',
    category: 'chemistry',
    question: 'Molekül nedir?',
    answer: 'İki veya daha fazla atomun kimyasal bağlarla birleşmesiyle oluşan yapıdır.',
    difficulty: 'easy',
    explanation: 'Moleküller elementlerin veya bileşiklerin en küçük birimidir.',
    tags: ['molekül', 'atom', 'kimyasal bağ']
  },
  {
    id: 'chemistry_7',
    category: 'chemistry',
    question: 'Bileşik nedir?',
    answer: 'Farklı elementlerin kimyasal olarak birleşmesiyle oluşan maddedir.',
    difficulty: 'easy',
    explanation: 'Bileşikler kendini oluşturan elementlerden farklı özelliklere sahiptir.',
    tags: ['bileşik', 'element', 'kimyasal']
  },
  {
    id: 'chemistry_8',
    category: 'chemistry',
    question: 'Karışım nedir?',
    answer: 'İki veya daha fazla maddenin fiziksel olarak birleşmesiyle oluşan yapıdır.',
    difficulty: 'easy',
    explanation: 'Karışımlarda maddeler kendi özelliklerini korur.',
    tags: ['karışım', 'madde', 'fiziksel']
  },
  {
    id: 'chemistry_9',
    category: 'chemistry',
    question: 'Homojen karışım nedir?',
    answer: 'Tüm noktalarında aynı özellikleri gösteren karışımdır.',
    difficulty: 'medium',
    explanation: 'Çözeltiler homojen karışımlara örnektir.',
    tags: ['homojen', 'karışım', 'çözelti']
  },
  {
    id: 'chemistry_10',
    category: 'chemistry',
    question: 'Heterojen karışım nedir?',
    answer: 'Farklı noktalarında farklı özellikler gösteren karışımdır.',
    difficulty: 'medium',
    explanation: 'Süspansiyonlar heterojen karışımlara örnektir.',
    tags: ['heterojen', 'karışım', 'süspansiyon']
  },
  {
    id: 'chemistry_11',
    category: 'chemistry',
    question: 'Kimyasal bağ nedir?',
    answer: 'Atomları bir arada tutan kuvvettir.',
    difficulty: 'medium',
    explanation: 'İyonik, kovalent ve metalik bağ türleri vardır.',
    tags: ['kimyasal bağ', 'atom', 'kuvvet']
  },
  {
    id: 'chemistry_12',
    category: 'chemistry',
    question: 'İyonik bağ nedir?',
    answer: 'Pozitif ve negatif yüklü iyonlar arasındaki elektrostatik çekimdir.',
    difficulty: 'medium',
    explanation: 'İyonik bağlar genellikle metal ve ametal arasında oluşur.',
    tags: ['iyonik bağ', 'iyon', 'elektrostatik']
  },
  {
    id: 'chemistry_13',
    category: 'chemistry',
    question: 'Kovalent bağ nedir?',
    answer: 'Atomlar arasında elektron ortaklaşması ile oluşan bağdır.',
    difficulty: 'medium',
    explanation: 'Kovalent bağlar genellikle ametal atomları arasında oluşur.',
    tags: ['kovalent bağ', 'elektron', 'ortaklaşma']
  },
  {
    id: 'chemistry_14',
    category: 'chemistry',
    question: 'Metalik bağ nedir?',
    answer: 'Metal atomları arasında elektron denizi ile oluşan bağdır.',
    difficulty: 'medium',
    explanation: 'Metalik bağlar metallerin özelliklerini açıklar.',
    tags: ['metalik bağ', 'metal', 'elektron denizi']
  },
  {
    id: 'chemistry_15',
    category: 'chemistry',
    question: 'pH nedir?',
    answer: 'Çözeltinin asitlik veya bazlık derecesini gösteren ölçektir.',
    difficulty: 'medium',
    explanation: 'pH 0-14 arasında değer alır. 7 nötr, 7\'den küçük asidik, 7\'den büyük baziktir.',
    tags: ['pH', 'asit', 'baz']
  },
  {
    id: 'chemistry_16',
    category: 'chemistry',
    question: 'Asit nedir?',
    answer: 'Suda çözündüğünde H⁺ iyonu veren maddelerdir.',
    difficulty: 'medium',
    explanation: 'Asitler ekşi tada sahiptir ve turnusol kağıdını kırmızıya boyar.',
    tags: ['asit', 'H⁺', 'turnusol']
  },
  {
    id: 'chemistry_17',
    category: 'chemistry',
    question: 'Baz nedir?',
    answer: 'Suda çözündüğünde OH⁻ iyonu veren maddelerdir.',
    difficulty: 'medium',
    explanation: 'Bazlar acı tada sahiptir ve turnusol kağıdını maviye boyar.',
    tags: ['baz', 'OH⁻', 'turnusol']
  },
  {
    id: 'chemistry_18',
    category: 'chemistry',
    question: 'Tuz nedir?',
    answer: 'Asit ve bazın tepkimesi sonucu oluşan nötr maddedir.',
    difficulty: 'medium',
    explanation: 'Tuzlar iyonik bağlı bileşiklerdir.',
    tags: ['tuz', 'asit', 'baz']
  },
  {
    id: 'chemistry_19',
    category: 'chemistry',
    question: 'Oksidasyon nedir?',
    answer: 'Bir maddenin elektron kaybetmesi olayıdır.',
    difficulty: 'medium',
    explanation: 'Oksidasyon yükseltgenme olarak da bilinir.',
    tags: ['oksidasyon', 'elektron', 'kayıp']
  },
  {
    id: 'chemistry_20',
    category: 'chemistry',
    question: 'Redüksiyon nedir?',
    answer: 'Bir maddenin elektron kazanması olayıdır.',
    difficulty: 'medium',
    explanation: 'Redüksiyon indirgenme olarak da bilinir.',
    tags: ['redüksiyon', 'elektron', 'kazanç']
  },
  {
    id: 'chemistry_21',
    category: 'chemistry',
    question: 'Redoks tepkimesi nedir?',
    answer: 'Oksidasyon ve redüksiyon olaylarının birlikte gerçekleştiği tepkimedir.',
    difficulty: 'medium',
    explanation: 'Redoks tepkimelerinde elektron alışverişi olur.',
    tags: ['redoks', 'oksidasyon', 'redüksiyon']
  },
  {
    id: 'chemistry_22',
    category: 'chemistry',
    question: 'Katalizör nedir?',
    answer: 'Kimyasal tepkimenin hızını artıran ancak tepkimede harcanmayan maddedir.',
    difficulty: 'medium',
    explanation: 'Katalizörler aktivasyon enerjisini düşürür.',
    tags: ['katalizör', 'tepkime', 'hız']
  },
  {
    id: 'chemistry_23',
    category: 'chemistry',
    question: 'Aktivasyon enerjisi nedir?',
    answer: 'Kimyasal tepkimenin başlaması için gerekli minimum enerjidir.',
    difficulty: 'hard',
    explanation: 'Aktivasyon enerjisi tepkime hızını belirler.',
    tags: ['aktivasyon enerjisi', 'tepkime', 'enerji']
  },
  {
    id: 'chemistry_24',
    category: 'chemistry',
    question: 'Denge sabiti nedir?',
    answer: 'Kimyasal denge durumunda ürünlerin ve reaktiflerin konsantrasyonları arasındaki orandır.',
    difficulty: 'hard',
    explanation: 'K = [Ürünler] / [Reaktifler]',
    tags: ['denge sabiti', 'kimyasal denge', 'konsantrasyon']
  },
  {
    id: 'chemistry_25',
    category: 'chemistry',
    question: 'Le Chatelier prensibi nedir?',
    answer: 'Denge halindeki bir sisteme etki edildiğinde sistem bu etkiyi azaltacak yönde tepki verir.',
    difficulty: 'hard',
    explanation: 'Bu prensip kimyasal dengelerin davranışını açıklar.',
    tags: ['le chatelier', 'denge', 'tepki']
  },
  {
    id: 'chemistry_26',
    category: 'chemistry',
    question: 'Çözünürlük nedir?',
    answer: 'Belirli bir sıcaklıkta bir maddenin çözücüde çözünebilen maksimum miktarıdır.',
    difficulty: 'medium',
    explanation: 'Çözünürlük sıcaklık ve basınca bağlıdır.',
    tags: ['çözünürlük', 'çözücü', 'sıcaklık']
  },
  {
    id: 'chemistry_27',
    category: 'chemistry',
    question: 'Elektroliz nedir?',
    answer: 'Elektrik akımı kullanılarak kimyasal tepkimelerin gerçekleştirilmesidir.',
    difficulty: 'hard',
    explanation: 'Elektroliz endüstride yaygın olarak kullanılır.',
    tags: ['elektroliz', 'elektrik', 'tepkime']
  },
  {
    id: 'chemistry_28',
    category: 'chemistry',
    question: 'Galvanik hücre nedir?',
    answer: 'Kimyasal enerjiyi elektrik enerjisine dönüştüren sistemdir.',
    difficulty: 'hard',
    explanation: 'Piller galvanik hücrelere örnektir.',
    tags: ['galvanik hücre', 'kimyasal enerji', 'elektrik']
  },
  {
    id: 'chemistry_29',
    category: 'chemistry',
    question: 'Organik kimya nedir?',
    answer: 'Karbon atomu içeren bileşikleri inceleyen kimya dalıdır.',
    difficulty: 'medium',
    explanation: 'Organik kimya yaşamın temelini oluşturan bileşikleri inceler.',
    tags: ['organik kimya', 'karbon', 'bileşik']
  },
  {
    id: 'chemistry_30',
    category: 'chemistry',
    question: 'İnorganik kimya nedir?',
    answer: 'Karbon atomu içermeyen bileşikleri inceleyen kimya dalıdır.',
    difficulty: 'medium',
    explanation: 'İnorganik kimya mineralleri ve metal bileşiklerini inceler.',
    tags: ['inorganik kimya', 'mineral', 'metal']
  },
  {
    id: 'chemistry_31',
    category: 'chemistry',
    question: 'Analitik kimya nedir?',
    answer: 'Maddelerin bileşimini ve miktarını belirleyen kimya dalıdır.',
    difficulty: 'medium',
    explanation: 'Analitik kimya kalitatif ve kantitatif analiz yapar.',
    tags: ['analitik kimya', 'bileşim', 'analiz']
  },
  {
    id: 'chemistry_32',
    category: 'chemistry',
    question: 'Fizikokimya nedir?',
    answer: 'Fizik ve kimya arasındaki ilişkiyi inceleyen kimya dalıdır.',
    difficulty: 'hard',
    explanation: 'Fizikokimya termodinamik ve kinetik konularını inceler.',
    tags: ['fizikokimya', 'termodinamik', 'kinetik']
  },
  {
    id: 'chemistry_33',
    category: 'chemistry',
    question: 'Biyokimya nedir?',
    answer: 'Canlı organizmalardaki kimyasal süreçleri inceleyen bilim dalıdır.',
    difficulty: 'hard',
    explanation: 'Biyokimya protein, karbonhidrat ve yağ metabolizmasını inceler.',
    tags: ['biyokimya', 'organizma', 'metabolizma']
  },

  // BİYOLOJİ KARTLARI (33 adet)
  {
    id: 'biology_1',
    category: 'biology',
    question: 'Hücre nedir?',
    answer: 'Canlıların en küçük yapı ve işlev birimidir.',
    difficulty: 'easy',
    explanation: 'Tüm canlılar hücrelerden oluşur.',
    tags: ['hücre', 'canlı', 'birim']
  },
  {
    id: 'biology_2',
    category: 'biology',
    question: 'Prokaryot hücre nedir?',
    answer: 'Çekirdek zarı olmayan basit yapılı hücrelerdir.',
    difficulty: 'medium',
    explanation: 'Bakteriler prokaryot hücrelere sahiptir.',
    tags: ['prokaryot', 'çekirdek', 'bakteri']
  },
  {
    id: 'biology_3',
    category: 'biology',
    question: 'Ökaryot hücre nedir?',
    answer: 'Çekirdek zarı olan gelişmiş yapılı hücrelerdir.',
    difficulty: 'medium',
    explanation: 'Bitki, hayvan ve mantar hücreleri ökaryottur.',
    tags: ['ökaryot', 'çekirdek', 'gelişmiş']
  },
  {
    id: 'biology_4',
    category: 'biology',
    question: 'Mitokondri nedir?',
    answer: 'Hücrede enerji üretiminden sorumlu organeldir.',
    difficulty: 'medium',
    explanation: 'Mitokondri hücrenin enerji santralidir.',
    tags: ['mitokondri', 'enerji', 'organel']
  },
  {
    id: 'biology_5',
    category: 'biology',
    question: 'Kloroplast nedir?',
    answer: 'Bitki hücrelerinde fotosentez yapan organeldir.',
    difficulty: 'medium',
    explanation: 'Kloroplastlar yeşil renkli pigment içerir.',
    tags: ['kloroplast', 'fotosentez', 'bitki']
  },
  {
    id: 'biology_6',
    category: 'biology',
    question: 'DNA nedir?',
    answer: 'Genetik bilgiyi taşıyan nükleik asittir.',
    difficulty: 'medium',
    explanation: 'DNA çift sarmal yapıya sahiptir.',
    tags: ['DNA', 'genetik', 'nükleik asit']
  },
  {
    id: 'biology_7',
    category: 'biology',
    question: 'RNA nedir?',
    answer: 'Protein sentezinde görev alan nükleik asittir.',
    difficulty: 'medium',
    explanation: 'RNA tek sarmal yapıya sahiptir.',
    tags: ['RNA', 'protein', 'nükleik asit']
  },
  {
    id: 'biology_8',
    category: 'biology',
    question: 'Gen nedir?',
    answer: 'Kalıtsal özellikleri belirleyen DNA parçasıdır.',
    difficulty: 'medium',
    explanation: 'Genler protein kodlar.',
    tags: ['gen', 'kalıtım', 'DNA']
  },
  {
    id: 'biology_9',
    category: 'biology',
    question: 'Kromozom nedir?',
    answer: 'DNA ve proteinlerden oluşan genetik materyal paketidir.',
    difficulty: 'medium',
    explanation: 'İnsanlarda 46 kromozom bulunur.',
    tags: ['kromozom', 'DNA', 'protein']
  },
  {
    id: 'biology_10',
    category: 'biology',
    question: 'Mitoz nedir?',
    answer: 'Vücut hücrelerinin bölünme şeklidir.',
    difficulty: 'medium',
    explanation: 'Mitozda kromozom sayısı korunur.',
    tags: ['mitoz', 'bölünme', 'kromozom']
  },
  {
    id: 'biology_11',
    category: 'biology',
    question: 'Mayoz nedir?',
    answer: 'Üreme hücrelerinin oluştuğu bölünme şeklidir.',
    difficulty: 'medium',
    explanation: 'Mayozda kromozom sayısı yarıya iner.',
    tags: ['mayoz', 'üreme', 'kromozom']
  },
  {
    id: 'biology_12',
    category: 'biology',
    question: 'Fotosentez nedir?',
    answer: 'Bitkilerin güneş ışığı ile besin üretmesidir.',
    difficulty: 'medium',
    explanation: 'Fotosentezde CO₂ ve H₂O kullanılarak glikoz üretilir.',
    tags: ['fotosentez', 'bitki', 'besin']
  },
  {
    id: 'biology_13',
    category: 'biology',
    question: 'Solunum nedir?',
    answer: 'Besinlerin parçalanarak enerji üretilmesidir.',
    difficulty: 'medium',
    explanation: 'Solunum oksijenli ve oksijensiz olabilir.',
    tags: ['solunum', 'besin', 'enerji']
  },
  {
    id: 'biology_14',
    category: 'biology',
    question: 'Enzim nedir?',
    answer: 'Kimyasal tepkimeleri hızlandıran protein yapısındaki katalizörlerdir.',
    difficulty: 'medium',
    explanation: 'Enzimler substrat spesifiktir.',
    tags: ['enzim', 'protein', 'katalizör']
  },
  {
    id: 'biology_15',
    category: 'biology',
    question: 'Hormon nedir?',
    answer: 'Vücutta kimyasal mesajcı görevi yapan maddelerdir.',
    difficulty: 'medium',
    explanation: 'Hormonlar endokrin bezlerden salgılanır.',
    tags: ['hormon', 'mesajcı', 'endokrin']
  },
  {
    id: 'biology_16',
    category: 'biology',
    question: 'Antikor nedir?',
    answer: 'Bağışıklık sisteminde görev alan proteinlerdir.',
    difficulty: 'medium',
    explanation: 'Antikorlar yabancı maddelere karşı savunma yapar.',
    tags: ['antikor', 'bağışıklık', 'protein']
  },
  {
    id: 'biology_17',
    category: 'biology',
    question: 'Antijen nedir?',
    answer: 'Vücutta antikor üretimine neden olan yabancı maddelerdir.',
    difficulty: 'medium',
    explanation: 'Antijenler bağışıklık sistemini uyarır.',
    tags: ['antijen', 'yabancı', 'bağışıklık']
  },
  {
    id: 'biology_18',
    category: 'biology',
    question: 'Mutasyon nedir?',
    answer: 'DNA dizisinde meydana gelen kalıcı değişikliklerdir.',
    difficulty: 'medium',
    explanation: 'Mutasyonlar genetik çeşitliliğe neden olur.',
    tags: ['mutasyon', 'DNA', 'değişiklik']
  },
  {
    id: 'biology_19',
    category: 'biology',
    question: 'Doğal seçilim nedir?',
    answer: 'Çevreye en uyumlu bireylerin hayatta kalmasıdır.',
    difficulty: 'medium',
    explanation: 'Doğal seçilim evrimin temel mekanizmasıdır.',
    tags: ['doğal seçilim', 'uyum', 'evrim']
  },
  {
    id: 'biology_20',
    category: 'biology',
    question: 'Adaptasyon nedir?',
    answer: 'Canlıların çevrelerine uyum sağlamasıdır.',
    difficulty: 'medium',
    explanation: 'Adaptasyonlar kalıtsal olabilir.',
    tags: ['adaptasyon', 'uyum', 'çevre']
  },
  {
    id: 'biology_21',
    category: 'biology',
    question: 'Tür nedir?',
    answer: 'Ortak özelliklere sahip ve üreyebilen canlı grubudur.',
    difficulty: 'medium',
    explanation: 'Türler biyolojik sınıflandırmanın temelidir.',
    tags: ['tür', 'özellik', 'üreme']
  },
  {
    id: 'biology_22',
    category: 'biology',
    question: 'Popülasyon nedir?',
    answer: 'Belirli bir alanda yaşayan aynı tür canlıların topluluğudur.',
    difficulty: 'medium',
    explanation: 'Popülasyonlar dinamik yapılardır.',
    tags: ['popülasyon', 'tür', 'alan']
  },
  {
    id: 'biology_23',
    category: 'biology',
    question: 'Ekosistem nedir?',
    answer: 'Canlı ve cansız varlıkların etkileşim halinde olduğu sistemdir.',
    difficulty: 'medium',
    explanation: 'Ekosistemler enerji ve madde döngüsü içerir.',
    tags: ['ekosistem', 'canlı', 'cansız']
  },
  {
    id: 'biology_24',
    category: 'biology',
    question: 'Besin zinciri nedir?',
    answer: 'Canlılar arasındaki beslenme ilişkisini gösteren zincirdir.',
    difficulty: 'medium',
    explanation: 'Besin zincirinde enerji aktarımı olur.',
    tags: ['besin zinciri', 'beslenme', 'enerji']
  },
  {
    id: 'biology_25',
    category: 'biology',
    question: 'Üretici nedir?',
    answer: 'Kendi besinini üretebilen canlılardır.',
    difficulty: 'easy',
    explanation: 'Bitkiler üretici canlılardır.',
    tags: ['üretici', 'besin', 'bitki']
  },
  {
    id: 'biology_26',
    category: 'biology',
    question: 'Tüketici nedir?',
    answer: 'Besinini dışarıdan alan canlılardır.',
    difficulty: 'easy',
    explanation: 'Hayvanlar tüketici canlılardır.',
    tags: ['tüketici', 'besin', 'hayvan']
  },
  {
    id: 'biology_27',
    category: 'biology',
    question: 'Ayrıştırıcı nedir?',
    answer: 'Ölü organizmaları parçalayan canlılardır.',
    difficulty: 'medium',
    explanation: 'Bakteri ve mantarlar ayrıştırıcıdır.',
    tags: ['ayrıştırıcı', 'organizma', 'bakteri']
  },
  {
    id: 'biology_28',
    category: 'biology',
    question: 'Simbiyoz nedir?',
    answer: 'İki farklı tür arasındaki yakın yaşam ilişkisidir.',
    difficulty: 'hard',
    explanation: 'Simbiyoz mutualizm, kommensalizm ve parazitizm şeklinde olabilir.',
    tags: ['simbiyoz', 'tür', 'ilişki']
  },
  {
    id: 'biology_29',
    category: 'biology',
    question: 'Mutualizm nedir?',
    answer: 'İki türün de yarar gördüğü simbiyotik ilişkidir.',
    difficulty: 'medium',
    explanation: 'Mutualizmde her iki tür de fayda sağlar.',
    tags: ['mutualizm', 'simbiyoz', 'yarar']
  },
  {
    id: 'biology_30',
    category: 'biology',
    question: 'Parazitizm nedir?',
    answer: 'Bir türün diğerinden yarar sağladığı simbiyotik ilişkidir.',
    difficulty: 'medium',
    explanation: 'Parazitizmde bir tür zarar görür.',
    tags: ['parazitizm', 'simbiyoz', 'zarar']
  },
  {
    id: 'biology_31',
    category: 'biology',
    question: 'Kommensalizm nedir?',
    answer: 'Bir türün yarar gördüğü diğerinin etkilenmediği simbiyotik ilişkidir.',
    difficulty: 'medium',
    explanation: 'Kommensalizmde bir tür nötr kalır.',
    tags: ['kommensalizm', 'simbiyoz', 'nötr']
  },
  {
    id: 'biology_32',
    category: 'biology',
    question: 'Biyoçeşitlilik nedir?',
    answer: 'Bir bölgedeki tür çeşitliliğidir.',
    difficulty: 'medium',
    explanation: 'Biyoçeşitlilik ekosistem sağlığının göstergesidir.',
    tags: ['biyoçeşitlilik', 'tür', 'çeşitlilik']
  },
  {
    id: 'biology_33',
    category: 'biology',
    question: 'Endemik tür nedir?',
    answer: 'Sadece belirli bir bölgede yaşayan türlerdir.',
    difficulty: 'medium',
    explanation: 'Endemik türler korunması gereken türlerdir.',
    tags: ['endemik', 'tür', 'bölge']
  }
];
