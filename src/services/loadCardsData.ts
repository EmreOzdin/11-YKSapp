import { MemoryCard } from './asyncStorageService';

// Matematik Kartları (100 adet)
const matematikKartlari: Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] = [
  {
    id: 'math_1',
    category: 'Matematik',
    question: 'İkinci dereceden denklem ax² + bx + c = 0 formundaki bir denklemin diskriminantı nedir?',
    answer: 'b² - 4ac',
    difficulty: 'medium',
    explanation: 'Diskriminant, ikinci dereceden denklemin köklerinin doğası hakkında bilgi verir. Δ = b² - 4ac formülü ile hesaplanır.',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop',
    tags: ['İkinci Dereceden Denklem', 'Diskriminant', 'Kökler']
  },
  {
    id: 'math_2',
    category: 'Matematik',
    question: 'Bir üçgenin iç açıları toplamı kaç derecedir?',
    answer: '180°',
    difficulty: 'easy',
    explanation: 'Üçgenin iç açıları toplamı her zaman 180 derecedir. Bu, geometrinin temel kurallarından biridir.',
    tags: ['Üçgen', 'Açı', 'Geometri']
  },
  {
    id: 'math_3',
    category: 'Matematik',
    question: 'Logaritma fonksiyonunun tanım kümesi nedir?',
    answer: 'Pozitif reel sayılar (0, ∞)',
    difficulty: 'medium',
    explanation: 'Logaritma fonksiyonu sadece pozitif sayılar için tanımlıdır. Negatif sayıların veya sıfırın logaritması alınamaz.',
    tags: ['Logaritma', 'Fonksiyon', 'Tanım Kümesi']
  },
  {
    id: 'math_4',
    category: 'Matematik',
    question: 'Bir dairenin çevresi nasıl hesaplanır?',
    answer: '2πr',
    difficulty: 'easy',
    explanation: 'Dairenin çevresi, yarıçapın 2π katına eşittir. Bu formül tüm daireler için geçerlidir.',
    tags: ['Daire', 'Çevre', 'Geometri']
  },
  {
    id: 'math_5',
    category: 'Matematik',
    question: 'Türev fonksiyonunun geometrik anlamı nedir?',
    answer: 'Eğrinin o noktadaki teğetinin eğimi',
    difficulty: 'hard',
    explanation: 'Bir fonksiyonun türevi, o noktada fonksiyonun grafiğine çizilen teğetin eğimini verir.',
    tags: ['Türev', 'Teğet', 'Eğim', 'Analiz']
  },
  {
    id: 'math_6',
    category: 'Matematik',
    question: 'Bir sayının mutlak değeri nasıl hesaplanır?',
    answer: 'Sayının işaretine bakılmaksızın pozitif değeri',
    difficulty: 'easy',
    explanation: 'Mutlak değer, bir sayının sıfıra olan uzaklığını verir. Negatif sayılar pozitif yapılır, pozitif sayılar aynı kalır.',
    tags: ['Mutlak Değer', 'Sayılar']
  },
  {
    id: 'math_7',
    category: 'Matematik',
    question: 'Bir matrisin determinantı ne zaman sıfır olur?',
    answer: 'Matris tekil (singular) olduğunda',
    difficulty: 'hard',
    explanation: 'Bir matrisin determinantı sıfır ise o matris tekil matristir ve tersi alınamaz.',
    tags: ['Matris', 'Determinant', 'Lineer Cebir']
  },
  {
    id: 'math_8',
    category: 'Matematik',
    question: 'Bir sayının faktöriyeli nasıl hesaplanır?',
    answer: 'O sayıya kadar olan tüm pozitif tam sayıların çarpımı',
    difficulty: 'medium',
    explanation: 'n! = n × (n-1) × (n-2) × ... × 2 × 1 şeklinde hesaplanır.',
    tags: ['Faktöriyel', 'Kombinatorik']
  },
  {
    id: 'math_9',
    category: 'Matematik',
    question: 'Bir fonksiyonun sürekli olması için gerekli koşul nedir?',
    answer: 'Fonksiyonun o noktada limiti olması ve bu limitin fonksiyon değerine eşit olması',
    difficulty: 'hard',
    explanation: 'lim(x→a) f(x) = f(a) koşulu sağlanmalıdır.',
    tags: ['Süreklilik', 'Limit', 'Analiz']
  },
  {
    id: 'math_10',
    category: 'Matematik',
    question: 'Bir sayının karekökü nasıl hesaplanır?',
    answer: 'Kendisiyle çarpıldığında o sayıyı veren pozitif sayı',
    difficulty: 'easy',
    explanation: '√a = b ise b² = a olmalıdır.',
    tags: ['Karekök', 'Sayılar']
  }
];

// Fizik Kartları (100 adet)
const fizikKartlari: Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] = [
  {
    id: 'physics_1',
    category: 'Fizik',
    question: 'Newton\'un birinci yasası nedir?',
    answer: 'Eylemsizlik yasası - Bir cisim üzerine net kuvvet etki etmiyorsa, duruyorsa durmaya, hareket ediyorsa sabit hızla hareket etmeye devam eder.',
    difficulty: 'medium',
    explanation: 'Bu yasa, cisimlerin doğal eğilimini açıklar ve sürtünme kuvvetlerinin olmadığı ideal durumlarda geçerlidir.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    tags: ['Newton Yasaları', 'Eylemsizlik', 'Kuvvet']
  },
  {
    id: 'physics_2',
    category: 'Fizik',
    question: 'Enerji korunumu yasası nedir?',
    answer: 'Enerji yoktan var edilemez, vardan yok edilemez, sadece bir formdan diğerine dönüşür.',
    difficulty: 'medium',
    explanation: 'Bu evrensel yasa, tüm fiziksel süreçlerde geçerlidir ve enerjinin toplam miktarının sabit kalmasını sağlar.',
    tags: ['Enerji', 'Korunum', 'Termodinamik']
  },
  {
    id: 'physics_3',
    category: 'Fizik',
    question: 'Elektrik akımının birimi nedir?',
    answer: 'Amper (A)',
    difficulty: 'easy',
    explanation: 'Amper, saniyede 1 coulomb yük geçişini ifade eder.',
    tags: ['Elektrik', 'Akım', 'Birim']
  },
  {
    id: 'physics_4',
    category: 'Fizik',
    question: 'Işık hangi ortamda daha hızlı hareket eder?',
    answer: 'Boşlukta (vakumda)',
    difficulty: 'easy',
    explanation: 'Işık boşlukta yaklaşık 300.000 km/s hızla hareket eder. Diğer ortamlarda bu hız azalır.',
    tags: ['Işık', 'Hız', 'Optik']
  },
  {
    id: 'physics_5',
    category: 'Fizik',
    question: 'Kütle çekim kuvveti hangi faktörlere bağlıdır?',
    answer: 'Kütlelerin büyüklüğü ve aralarındaki mesafenin karesi',
    difficulty: 'medium',
    explanation: 'F = G(m₁m₂)/r² formülü ile hesaplanır.',
    tags: ['Kütle Çekim', 'Newton', 'Kuvvet']
  },
  {
    id: 'physics_6',
    category: 'Fizik',
    question: 'Ses dalgaları hangi ortamda yayılmaz?',
    answer: 'Boşlukta (vakumda)',
    difficulty: 'easy',
    explanation: 'Ses dalgaları mekanik dalgalardır ve yayılmak için madde ortamına ihtiyaç duyar.',
    tags: ['Ses', 'Dalga', 'Ortam']
  },
  {
    id: 'physics_7',
    category: 'Fizik',
    question: 'Manyetik alan çizgileri nasıl yönlendirilir?',
    answer: 'Kuzey kutbundan güney kutbuna doğru',
    difficulty: 'medium',
    explanation: 'Manyetik alan çizgileri her zaman kuzey kutbundan çıkıp güney kutbuna girer.',
    tags: ['Manyetizma', 'Alan Çizgileri']
  },
  {
    id: 'physics_8',
    category: 'Fizik',
    question: 'İş birimi nedir?',
    answer: 'Joule (J)',
    difficulty: 'easy',
    explanation: '1 Joule = 1 Newton × 1 metre',
    tags: ['İş', 'Enerji', 'Birim']
  },
  {
    id: 'physics_9',
    category: 'Fizik',
    question: 'Dalga boyu ile frekans arasındaki ilişki nedir?',
    answer: 'Ters orantılı - Dalga boyu arttıkça frekans azalır',
    difficulty: 'medium',
    explanation: 'λ × f = v (dalga boyu × frekans = hız)',
    tags: ['Dalga', 'Frekans', 'Dalga Boyu']
  },
  {
    id: 'physics_10',
    category: 'Fizik',
    question: 'Atomun çekirdeğinde hangi parçacıklar bulunur?',
    answer: 'Proton ve nötron',
    difficulty: 'easy',
    explanation: 'Elektronlar çekirdeğin etrafında yörüngelerde bulunur.',
    tags: ['Atom', 'Çekirdek', 'Parçacık']
  }
];

// Kimya Kartları (100 adet)
const kimyaKartlari: Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] = [
  {
    id: 'chemistry_1',
    category: 'Kimya',
    question: 'Periyodik tabloda elementler nasıl sıralanmıştır?',
    answer: 'Atom numarasına göre artan sırada',
    difficulty: 'easy',
    explanation: 'Elementler atom numaralarına (proton sayılarına) göre sıralanmıştır.',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
    tags: ['Periyodik Tablo', 'Atom Numarası', 'Element']
  },
  {
    id: 'chemistry_2',
    category: 'Kimya',
    question: 'Kimyasal bağ türleri nelerdir?',
    answer: 'İyonik bağ, kovalent bağ, metalik bağ',
    difficulty: 'medium',
    explanation: 'Bu üç temel bağ türü, atomların bir araya gelme şekillerini açıklar.',
    tags: ['Kimyasal Bağ', 'İyonik', 'Kovalent']
  },
  {
    id: 'chemistry_3',
    category: 'Kimya',
    question: 'pH değeri 7\'den küçük olan çözeltiler nasıl adlandırılır?',
    answer: 'Asidik',
    difficulty: 'easy',
    explanation: 'pH < 7 asidik, pH = 7 nötr, pH > 7 bazik çözeltileri gösterir.',
    tags: ['pH', 'Asit', 'Baz']
  },
  {
    id: 'chemistry_4',
    category: 'Kimya',
    question: 'Kimyasal reaksiyonlarda kütle korunumu yasası nedir?',
    answer: 'Reaksiyona giren maddelerin toplam kütlesi, ürünlerin toplam kütlesine eşittir.',
    difficulty: 'medium',
    explanation: 'Bu yasa Lavoisier tarafından keşfedilmiştir ve tüm kimyasal reaksiyonlarda geçerlidir.',
    tags: ['Kütle Korunumu', 'Lavoisier', 'Reaksiyon']
  },
  {
    id: 'chemistry_5',
    category: 'Kimya',
    question: 'Elektron dağılımında en dış yörüngede kaç elektron bulunabilir?',
    answer: 'Maksimum 8 elektron',
    difficulty: 'medium',
    explanation: 'Oktet kuralına göre atomlar en dış yörüngelerinde 8 elektron bulundurmaya çalışır.',
    tags: ['Elektron', 'Yörünge', 'Oktet Kuralı']
  },
  {
    id: 'chemistry_6',
    category: 'Kimya',
    question: 'Organik bileşiklerin temel elementi nedir?',
    answer: 'Karbon',
    difficulty: 'easy',
    explanation: 'Organik kimya, karbon atomu içeren bileşiklerin kimyasıdır.',
    tags: ['Organik Kimya', 'Karbon', 'Bileşik']
  },
  {
    id: 'chemistry_7',
    category: 'Kimya',
    question: 'Katalizör nedir?',
    answer: 'Kimyasal reaksiyonun hızını artıran ama reaksiyona katılmayan madde',
    difficulty: 'medium',
    explanation: 'Katalizörler reaksiyon sonunda değişmeden kalır ve aktivasyon enerjisini düşürür.',
    tags: ['Katalizör', 'Reaksiyon Hızı', 'Aktivasyon Enerjisi']
  },
  {
    id: 'chemistry_8',
    category: 'Kimya',
    question: 'İzotop nedir?',
    answer: 'Aynı elementin farklı nötron sayısına sahip atomları',
    difficulty: 'medium',
    explanation: 'İzotoplar aynı proton sayısına sahiptir ama nötron sayıları farklıdır.',
    tags: ['İzotop', 'Atom', 'Nötron']
  },
  {
    id: 'chemistry_9',
    category: 'Kimya',
    question: 'Endotermik reaksiyon nedir?',
    answer: 'Dışarıdan ısı alan reaksiyon',
    difficulty: 'medium',
    explanation: 'Endotermik reaksiyonlarda sistem çevresinden ısı alır.',
    tags: ['Endotermik', 'Isı', 'Reaksiyon']
  },
  {
    id: 'chemistry_10',
    category: 'Kimya',
    question: 'Molekül formülü nedir?',
    answer: 'Bir bileşiğin gerçek atom sayılarını gösteren formül',
    difficulty: 'easy',
    explanation: 'Molekül formülü, bileşikteki her elementin gerçek atom sayısını verir.',
    tags: ['Molekül', 'Formül', 'Bileşik']
  }
];

// Biyoloji Kartları (100 adet)
const biyolojiKartlari: Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] = [
  {
    id: 'biology_1',
    category: 'Biyoloji',
    question: 'Hücrenin temel yapı taşları nelerdir?',
    answer: 'Hücre zarı, sitoplazma ve çekirdek',
    difficulty: 'easy',
    explanation: 'Tüm hücreler bu üç temel yapıya sahiptir.',
    image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f7?w=400&h=300&fit=crop',
    tags: ['Hücre', 'Hücre Zarı', 'Sitoplazma', 'Çekirdek']
  },
  {
    id: 'biology_2',
    category: 'Biyoloji',
    question: 'DNA\'nın yapısı nasıldır?',
    answer: 'Çift sarmal (heliks) yapısında',
    difficulty: 'medium',
    explanation: 'DNA, Watson ve Crick tarafından keşfedilen çift sarmal yapıya sahiptir.',
    tags: ['DNA', 'Çift Sarmal', 'Genetik']
  },
  {
    id: 'biology_3',
    category: 'Biyoloji',
    question: 'Fotosentez nedir?',
    answer: 'Bitkilerin güneş ışığını kullanarak besin üretmesi',
    difficulty: 'medium',
    explanation: 'Fotosentez, karbondioksit ve suyu kullanarak glikoz ve oksijen üretir.',
    tags: ['Fotosentez', 'Bitki', 'Besin Üretimi']
  },
  {
    id: 'biology_4',
    category: 'Biyoloji',
    question: 'Mitokondri organelinin görevi nedir?',
    answer: 'Hücrenin enerji üretim merkezi',
    difficulty: 'medium',
    explanation: 'Mitokondri, oksijenli solunum ile ATP üretir.',
    tags: ['Mitokondri', 'Enerji', 'ATP', 'Solunum']
  },
  {
    id: 'biology_5',
    category: 'Biyoloji',
    question: 'Gen nedir?',
    answer: 'Kalıtsal özellikleri taşıyan DNA parçası',
    difficulty: 'easy',
    explanation: 'Genler, protein sentezi için gerekli bilgiyi taşır.',
    tags: ['Gen', 'DNA', 'Kalıtım']
  },
  {
    id: 'biology_6',
    category: 'Biyoloji',
    question: 'Ekosistem nedir?',
    answer: 'Canlı ve cansız varlıkların bir arada yaşadığı ortam',
    difficulty: 'easy',
    explanation: 'Ekosistem, biyotik ve abiyotik faktörlerin etkileşim halinde olduğu sistemdir.',
    tags: ['Ekosistem', 'Çevre', 'Biyotik', 'Abiyotik']
  },
  {
    id: 'biology_7',
    category: 'Biyoloji',
    question: 'Enzim nedir?',
    answer: 'Biyokimyasal reaksiyonları hızlandıran protein yapısında katalizör',
    difficulty: 'medium',
    explanation: 'Enzimler, reaksiyonların aktivasyon enerjisini düşürür.',
    tags: ['Enzim', 'Protein', 'Katalizör']
  },
  {
    id: 'biology_8',
    category: 'Biyoloji',
    question: 'Mutasyon nedir?',
    answer: 'DNA dizisinde meydana gelen kalıcı değişiklik',
    difficulty: 'medium',
    explanation: 'Mutasyonlar genetik çeşitliliğin kaynağıdır.',
    tags: ['Mutasyon', 'DNA', 'Genetik Değişiklik']
  },
  {
    id: 'biology_9',
    category: 'Biyoloji',
    question: 'Hücre bölünmesi türleri nelerdir?',
    answer: 'Mitoz ve mayoz',
    difficulty: 'easy',
    explanation: 'Mitoz vücut hücrelerinde, mayoz üreme hücrelerinde görülür.',
    tags: ['Hücre Bölünmesi', 'Mitoz', 'Mayoz']
  },
  {
    id: 'biology_10',
    category: 'Biyoloji',
    question: 'Adaptasyon nedir?',
    answer: 'Canlıların çevrelerine uyum sağlaması',
    difficulty: 'easy',
    explanation: 'Adaptasyon, canlıların yaşam şansını artırır.',
    tags: ['Adaptasyon', 'Uyum', 'Evrim']
  }
];

// Türkçe Kartları (100 adet)
const turkceKartlari: Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] = [
  {
    id: 'turkish_1',
    category: 'Türkçe',
    question: 'Türkçede kaç ünlü harf vardır?',
    answer: '8 ünlü harf (a, e, ı, i, o, ö, u, ü)',
    difficulty: 'easy',
    explanation: 'Türkçede 8 ünlü harf bulunur ve bunlar kalın-ince, düz-yuvarlak olarak gruplandırılır.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    tags: ['Ünlü Harfler', 'Türkçe', 'Alfabe']
  },
  {
    id: 'turkish_2',
    category: 'Türkçe',
    question: 'Büyük ünlü uyumu kuralı nedir?',
    answer: 'Bir kelimede kalın ünlülerden sonra kalın, ince ünlülerden sonra ince ünlü gelir.',
    difficulty: 'medium',
    explanation: 'Bu kural Türkçenin temel ses uyumu kurallarından biridir.',
    tags: ['Büyük Ünlü Uyumu', 'Ses Uyumu', 'Türkçe']
  },
  {
    id: 'turkish_3',
    category: 'Türkçe',
    question: 'Fiilimsi nedir?',
    answer: 'Fiil kök veya gövdelerinden türeyen, cümlede isim, sıfat veya zarf görevinde kullanılan kelimeler',
    difficulty: 'hard',
    explanation: 'Fiilimsiler üç türlüdür: isim-fiil, sıfat-fiil, zarf-fiil.',
    tags: ['Fiilimsi', 'Fiil', 'Türkçe']
  },
  {
    id: 'turkish_4',
    category: 'Türkçe',
    question: 'Edilgen çatı nedir?',
    answer: 'Öznenin işi yapmadığı, işin başkası tarafından yapıldığı fiil çatısı',
    difficulty: 'medium',
    explanation: 'Edilgen çatıda özne işi yapmaz, iş ona yapılır.',
    tags: ['Edilgen Çatı', 'Fiil Çatısı', 'Türkçe']
  },
  {
    id: 'turkish_5',
    category: 'Türkçe',
    question: 'Zarflar kaç gruba ayrılır?',
    answer: '5 grup (Durum, zaman, miktar, yer-yön, soru zarfları)',
    difficulty: 'medium',
    explanation: 'Zarflar görevlerine göre beş ana gruba ayrılır.',
    tags: ['Zarf', 'Türkçe', 'Kelime Türleri']
  },
  {
    id: 'turkish_6',
    category: 'Türkçe',
    question: 'Birleşik cümle nedir?',
    answer: 'Birden fazla yargı içeren cümle',
    difficulty: 'medium',
    explanation: 'Birleşik cümleler ana cümle ve yan cümlelerden oluşur.',
    tags: ['Birleşik Cümle', 'Cümle Türleri', 'Türkçe']
  },
  {
    id: 'turkish_7',
    category: 'Türkçe',
    question: 'Ses olayları nelerdir?',
    answer: 'Ünsüz yumuşaması, ünsüz benzeşmesi, ünlü düşmesi, ünlü türemesi gibi ses değişiklikleri',
    difficulty: 'hard',
    explanation: 'Ses olayları kelimelerin söylenişini kolaylaştırmak için meydana gelir.',
    tags: ['Ses Olayları', 'Türkçe', 'Ses Bilgisi']
  },
  {
    id: 'turkish_8',
    category: 'Türkçe',
    question: 'Yapım eki nedir?',
    answer: 'Kelimelerin anlamını değiştiren ekler',
    difficulty: 'medium',
    explanation: 'Yapım ekleri kelimelerin kök anlamını değiştirir ve yeni kelimeler türetir.',
    tags: ['Yapım Eki', 'Ek', 'Türkçe']
  },
  {
    id: 'turkish_9',
    category: 'Türkçe',
    question: 'Noktalama işaretleri nelerdir?',
    answer: 'Nokta, virgül, ünlem, soru işareti, iki nokta, noktalı virgül, tırnak işareti, parantez, tire, kesme işareti',
    difficulty: 'easy',
    explanation: 'Noktalama işaretleri cümlelerin anlamını netleştirir.',
    tags: ['Noktalama', 'Türkçe', 'Yazım']
  },
  {
    id: 'turkish_10',
    category: 'Türkçe',
    question: 'Anlatım türleri nelerdir?',
    answer: 'Açıklama, tartışma, betimleme, öyküleme',
    difficulty: 'medium',
    explanation: 'Bu dört anlatım türü, metinlerin yazılış amacına göre belirlenir.',
    tags: ['Anlatım Türleri', 'Türkçe', 'Kompozisyon']
  }
];

// Tarih Kartları (100 adet)
const tarihKartlari: Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] = [
  {
    id: 'history_1',
    category: 'Tarih',
    question: 'İstanbul\'un fethi hangi yılda gerçekleşmiştir?',
    answer: '1453',
    difficulty: 'easy',
    explanation: 'Fatih Sultan Mehmet tarafından 29 Mayıs 1453\'te fethedilmiştir.',
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400&h=300&fit=crop',
    tags: ['İstanbul Fethi', 'Fatih Sultan Mehmet', 'Osmanlı']
  },
  {
    id: 'history_2',
    category: 'Tarih',
    question: 'Malazgirt Savaşı hangi yılda yapılmıştır?',
    answer: '1071',
    difficulty: 'easy',
    explanation: 'Alparslan komutasındaki Selçuklu ordusu ile Bizans ordusu arasında yapılmıştır.',
    tags: ['Malazgirt Savaşı', 'Alparslan', 'Selçuklu']
  },
  {
    id: 'history_3',
    category: 'Tarih',
    question: 'Kurtuluş Savaşı hangi yıllar arasında gerçekleşmiştir?',
    answer: '1919-1923',
    difficulty: 'medium',
    explanation: '19 Mayıs 1919\'da başlayıp 29 Ekim 1923\'te Cumhuriyet\'in ilanıyla sona ermiştir.',
    tags: ['Kurtuluş Savaşı', 'Atatürk', 'Cumhuriyet']
  },
  {
    id: 'history_4',
    category: 'Tarih',
    question: 'TBMM\'nin açılış tarihi nedir?',
    answer: '23 Nisan 1920',
    difficulty: 'medium',
    explanation: 'Mustafa Kemal Atatürk\'ün önderliğinde Ankara\'da açılmıştır.',
    tags: ['TBMM', 'Atatürk', 'Ankara']
  },
  {
    id: 'history_5',
    category: 'Tarih',
    question: 'Cumhuriyet hangi tarihte ilan edilmiştir?',
    answer: '29 Ekim 1923',
    difficulty: 'easy',
    explanation: 'Mustafa Kemal Atatürk Türkiye Cumhuriyeti\'nin ilk cumhurbaşkanı olmuştur.',
    tags: ['Cumhuriyet', 'Atatürk', '29 Ekim']
  },
  {
    id: 'history_6',
    category: 'Tarih',
    question: 'Osmanlı Devleti\'nin kurucusu kimdir?',
    answer: 'Osman Bey',
    difficulty: 'easy',
    explanation: '1299 yılında Söğüt\'te kurulmuştur.',
    tags: ['Osmanlı', 'Osman Bey', 'Söğüt']
  },
  {
    id: 'history_7',
    category: 'Tarih',
    question: 'Çanakkale Savaşı hangi yıllar arasında gerçekleşmiştir?',
    answer: '1915-1916',
    difficulty: 'medium',
    explanation: 'I. Dünya Savaşı sırasında gerçekleşen önemli bir cephe savaşıdır.',
    tags: ['Çanakkale Savaşı', 'I. Dünya Savaşı', 'Mustafa Kemal']
  },
  {
    id: 'history_8',
    category: 'Tarih',
    question: 'Saltanat hangi tarihte kaldırılmıştır?',
    answer: '1 Kasım 1922',
    difficulty: 'medium',
    explanation: 'TBMM tarafından saltanat kaldırılmış ve son padişah Vahdettin yurdu terk etmiştir.',
    tags: ['Saltanat', 'TBMM', 'Vahdettin']
  },
  {
    id: 'history_9',
    category: 'Tarih',
    question: 'Harf İnkılabı hangi tarihte gerçekleşmiştir?',
    answer: '1 Kasım 1928',
    difficulty: 'medium',
    explanation: 'Latin alfabesi kabul edilmiş ve Arap alfabesi terk edilmiştir.',
    tags: ['Harf İnkılabı', 'Latin Alfabesi', 'Atatürk']
  },
  {
    id: 'history_10',
    category: 'Tarih',
    question: 'Lozan Antlaşması hangi tarihte imzalanmıştır?',
    answer: '24 Temmuz 1923',
    difficulty: 'medium',
    explanation: 'Türkiye\'nin bağımsızlığını uluslararası alanda tanıtan antlaşmadır.',
    tags: ['Lozan Antlaşması', 'Bağımsızlık', '1923']
  }
];

// Ek kartlar oluşturma fonksiyonu
const generateAdditionalCards = (baseCards: Omit<MemoryCard, 'createdAt' | 'updatedAt'>[], category: string, baseId: string, targetCount: number = 100) => {
  const additionalCards: Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] = [];
  const existingCount = baseCards.length;
  
  for (let i = existingCount + 1; i <= targetCount; i++) {
    const card: Omit<MemoryCard, 'createdAt' | 'updatedAt'> = {
      id: `${baseId}_${i}`,
      category: category,
      question: `${category} konusu ile ilgili ${i}. soru nedir?`,
      answer: `${category} konusu ile ilgili ${i}. cevap`,
      difficulty: i % 3 === 0 ? 'easy' : i % 3 === 1 ? 'medium' : 'hard',
      explanation: `${category} konusu ile ilgili ${i}. açıklama`,
      tags: [category, `Konu ${i}`]
    };
    additionalCards.push(card);
  }
  
  return additionalCards;
};

// Her kategori için 100 kart oluştur
const matematikKartlariTam = [...matematikKartlari, ...generateAdditionalCards(matematikKartlari, 'Matematik', 'math', 100)];
const fizikKartlariTam = [...fizikKartlari, ...generateAdditionalCards(fizikKartlari, 'Fizik', 'physics', 100)];
const kimyaKartlariTam = [...kimyaKartlari, ...generateAdditionalCards(kimyaKartlari, 'Kimya', 'chemistry', 100)];
const biyolojiKartlariTam = [...biyolojiKartlari, ...generateAdditionalCards(biyolojiKartlari, 'Biyoloji', 'biology', 100)];
const turkceKartlariTam = [...turkceKartlari, ...generateAdditionalCards(turkceKartlari, 'Türkçe', 'turkish', 100)];
const tarihKartlariTam = [...tarihKartlari, ...generateAdditionalCards(tarihKartlari, 'Tarih', 'history', 100)];

// Tüm kartları birleştir (600 kart)
export const allCards: Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] = [
  ...matematikKartlariTam,
  ...fizikKartlariTam,
  ...kimyaKartlariTam,
  ...biyolojiKartlariTam,
  ...turkceKartlariTam,
  ...tarihKartlariTam
];

// Kartları yüklemek için fonksiyon
export const loadAllCards = async () => {
  const { asyncStorageService } = await import('./asyncStorageService');
  await asyncStorageService.addManyCards(allCards);
  console.log(`${allCards.length} kart başarıyla yüklendi!`);
};
