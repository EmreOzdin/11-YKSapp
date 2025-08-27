import { MemoryCard } from './mongoService';

// 200 adet bilgi kartı verisi
export const memoryCardsData: MemoryCard[] = [
  // MATEMATİK KARTLARI (34 adet)
  {
    id: 'math_1',
    category: 'math',
    question: 'İkinci dereceden denklem formülü nedir?',
    answer: 'x = (-b ± √(b² - 4ac)) / 2a',
    difficulty: 'medium',
    explanation: 'Bu formül ax² + bx + c = 0 şeklindeki denklemlerin çözümünde kullanılır.',
    tags: ['denklem', 'formül', 'ikinci derece']
  },
  {
    id: 'math_2',
    category: 'math',
    question: 'Pisagor teoremi nedir?',
    answer: 'a² + b² = c² (Dik üçgende hipotenüsün karesi, diğer iki kenarın karelerinin toplamına eşittir)',
    difficulty: 'easy',
    explanation: 'Dik üçgende en uzun kenar olan hipotenüsün karesi, diğer iki kenarın karelerinin toplamına eşittir.',
    tags: ['geometri', 'üçgen', 'teorem']
  },
  {
    id: 'math_3',
    category: 'math',
    question: 'Logaritma nedir?',
    answer: 'Bir sayının belirli bir tabana göre üssüdür. logₐb = c ise a^c = b',
    difficulty: 'hard',
    explanation: 'Logaritma, üstel fonksiyonun tersidir ve büyük sayıları daha küçük sayılarla ifade etmek için kullanılır.',
    tags: ['logaritma', 'üs', 'fonksiyon']
  },
  {
    id: 'math_4',
    category: 'math',
    question: 'Türev nedir?',
    answer: 'Bir fonksiyonun belirli bir noktadaki değişim hızını gösteren matematiksel kavramdır.',
    difficulty: 'hard',
    explanation: 'Türev, fonksiyonun grafiğine çizilen teğetin eğimini verir.',
    tags: ['türev', 'kalkülüs', 'değişim hızı']
  },
  {
    id: 'math_5',
    category: 'math',
    question: 'İntegral nedir?',
    answer: 'Bir fonksiyonun belirli bir aralıktaki toplam değişimini hesaplayan matematiksel işlemdir.',
    difficulty: 'hard',
    explanation: 'İntegral, türevin tersidir ve alan hesaplamalarında kullanılır.',
    tags: ['integral', 'kalkülüs', 'alan']
  },
  {
    id: 'math_6',
    category: 'math',
    question: 'Trigonometrik fonksiyonlar nelerdir?',
    answer: 'sin, cos, tan, cot, sec, csc fonksiyonlarıdır.',
    difficulty: 'medium',
    explanation: 'Bu fonksiyonlar açıların değerlerini hesaplamak için kullanılır.',
    tags: ['trigonometri', 'fonksiyon', 'açı']
  },
  {
    id: 'math_7',
    category: 'math',
    question: 'Pi sayısı nedir?',
    answer: 'π ≈ 3.14159... (Bir dairenin çevresinin çapına oranı)',
    difficulty: 'easy',
    explanation: 'Pi sayısı, daire hesaplamalarında kullanılan sabit bir sayıdır.',
    tags: ['pi', 'daire', 'sabit']
  },
  {
    id: 'math_8',
    category: 'math',
    question: 'E sayısı nedir?',
    answer: 'e ≈ 2.71828... (Doğal logaritmanın tabanı)',
    difficulty: 'medium',
    explanation: 'E sayısı, doğal logaritma ve üstel fonksiyonlarda kullanılan önemli bir sabittir.',
    tags: ['e sayısı', 'logaritma', 'sabit']
  },
  {
    id: 'math_9',
    category: 'math',
    question: 'Fibonacci dizisi nedir?',
    answer: 'Her sayı kendinden önceki iki sayının toplamıdır: 1, 1, 2, 3, 5, 8, 13, 21...',
    difficulty: 'easy',
    explanation: 'Fibonacci dizisi doğada birçok yerde karşımıza çıkar.',
    tags: ['fibonacci', 'dizi', 'doğa']
  },
  {
    id: 'math_10',
    category: 'math',
    question: 'Asal sayı nedir?',
    answer: 'Sadece 1 ve kendisine bölünebilen 1\'den büyük sayılardır.',
    difficulty: 'easy',
    explanation: 'Asal sayılar matematikte temel yapı taşlarıdır.',
    tags: ['asal sayı', 'bölme', 'temel']
  },
  {
    id: 'math_11',
    category: 'math',
    question: 'Faktöriyel nedir?',
    answer: 'n! = n × (n-1) × (n-2) × ... × 2 × 1',
    difficulty: 'medium',
    explanation: 'Faktöriyel, permütasyon ve kombinasyon hesaplamalarında kullanılır.',
    tags: ['faktöriyel', 'permütasyon', 'kombinasyon']
  },
  {
    id: 'math_12',
    category: 'math',
    question: 'Permütasyon nedir?',
    answer: 'n elemanın r\'li sıralı seçimlerinin sayısı: P(n,r) = n!/(n-r)!',
    difficulty: 'medium',
    explanation: 'Permütasyonda sıra önemlidir.',
    tags: ['permütasyon', 'sıralama', 'olasılık']
  },
  {
    id: 'math_13',
    category: 'math',
    question: 'Kombinasyon nedir?',
    answer: 'n elemanın r\'li sırasız seçimlerinin sayısı: C(n,r) = n!/(r!(n-r)!)',
    difficulty: 'medium',
    explanation: 'Kombinasyonda sıra önemli değildir.',
    tags: ['kombinasyon', 'seçim', 'olasılık']
  },
  {
    id: 'math_14',
    category: 'math',
    question: 'Aritmetik dizi nedir?',
    answer: 'Ardışık terimler arasındaki fark sabit olan dizidir.',
    difficulty: 'medium',
    explanation: 'Örnek: 2, 5, 8, 11, 14... (fark: 3)',
    tags: ['aritmetik', 'dizi', 'fark']
  },
  {
    id: 'math_15',
    category: 'math',
    question: 'Geometrik dizi nedir?',
    answer: 'Ardışık terimler arasındaki oran sabit olan dizidir.',
    difficulty: 'medium',
    explanation: 'Örnek: 2, 6, 18, 54... (oran: 3)',
    tags: ['geometrik', 'dizi', 'oran']
  },
  {
    id: 'math_16',
    category: 'math',
    question: 'Mutlak değer nedir?',
    answer: 'Bir sayının 0\'a olan uzaklığıdır, her zaman pozitiftir.',
    difficulty: 'easy',
    explanation: '|x| = x (x ≥ 0), |x| = -x (x < 0)',
    tags: ['mutlak değer', 'uzaklık', 'pozitif']
  },
  {
    id: 'math_17',
    category: 'math',
    question: 'Karmaşık sayı nedir?',
    answer: 'a + bi formunda yazılan sayılardır (i² = -1)',
    difficulty: 'hard',
    explanation: 'Karmaşık sayılar gerçek ve sanal kısımlardan oluşur.',
    tags: ['karmaşık sayı', 'i', 'sanal']
  },
  {
    id: 'math_18',
    category: 'math',
    question: 'Matris nedir?',
    answer: 'Sayıların dikdörtgen şeklinde düzenlenmiş halidir.',
    difficulty: 'medium',
    explanation: 'Matrisler lineer cebirde kullanılır.',
    tags: ['matris', 'lineer cebir', 'düzen']
  },
  {
    id: 'math_19',
    category: 'math',
    question: 'Determinant nedir?',
    answer: 'Bir kare matrisin özel bir sayısal değeridir.',
    difficulty: 'hard',
    explanation: 'Determinant matrisin tersinin var olup olmadığını belirler.',
    tags: ['determinant', 'matris', 'ters']
  },
  {
    id: 'math_20',
    category: 'math',
    question: 'Vektör nedir?',
    answer: 'Hem büyüklük hem de yönü olan matematiksel nesnedir.',
    difficulty: 'medium',
    explanation: 'Vektörler fizik ve matematikte yaygın olarak kullanılır.',
    tags: ['vektör', 'büyüklük', 'yön']
  },
  {
    id: 'math_21',
    category: 'math',
    question: 'Skaler çarpım nedir?',
    answer: 'İki vektörün büyüklüklerinin çarpımı ile aralarındaki açının kosinüsünün çarpımıdır.',
    difficulty: 'hard',
    explanation: 'a · b = |a| × |b| × cos(θ)',
    tags: ['skaler çarpım', 'vektör', 'açı']
  },
  {
    id: 'math_22',
    category: 'math',
    question: 'Vektörel çarpım nedir?',
    answer: 'İki vektörün vektörel çarpımı, bu vektörlere dik olan yeni bir vektördür.',
    difficulty: 'hard',
    explanation: 'a × b = |a| × |b| × sin(θ) × n',
    tags: ['vektörel çarpım', 'vektör', 'dik']
  },
  {
    id: 'math_23',
    category: 'math',
    question: 'Limit nedir?',
    answer: 'Bir fonksiyonun belirli bir noktaya yaklaşırken aldığı değerdir.',
    difficulty: 'hard',
    explanation: 'Limit kalkülüsün temel kavramlarından biridir.',
    tags: ['limit', 'kalkülüs', 'yaklaşım']
  },
  {
    id: 'math_24',
    category: 'math',
    question: 'Süreklilik nedir?',
    answer: 'Bir fonksiyonun grafiğinde kopukluk olmaması durumudur.',
    difficulty: 'medium',
    explanation: 'Sürekli fonksiyonların grafiği tek parça halindedir.',
    tags: ['süreklilik', 'fonksiyon', 'grafik']
  },
  {
    id: 'math_25',
    category: 'math',
    question: 'Türevlenebilirlik nedir?',
    answer: 'Bir fonksiyonun belirli bir noktada türevinin var olması durumudur.',
    difficulty: 'hard',
    explanation: 'Türevlenebilir fonksiyonlar o noktada düzgün bir teğete sahiptir.',
    tags: ['türevlenebilirlik', 'türev', 'teğet']
  },
  {
    id: 'math_26',
    category: 'math',
    question: 'İntegrallenebilirlik nedir?',
    answer: 'Bir fonksiyonun belirli bir aralıkta integralinin var olması durumudur.',
    difficulty: 'hard',
    explanation: 'Sürekli fonksiyonlar integrallenebilirdir.',
    tags: ['integrallenebilirlik', 'integral', 'süreklilik']
  },
  {
    id: 'math_27',
    category: 'math',
    question: 'Taylor serisi nedir?',
    answer: 'Bir fonksiyonu polinomların toplamı olarak ifade eden seridir.',
    difficulty: 'hard',
    explanation: 'f(x) = f(a) + f\'(a)(x-a) + f\'\'(a)(x-a)²/2! + ...',
    tags: ['taylor serisi', 'polinom', 'yaklaşım']
  },
  {
    id: 'math_28',
    category: 'math',
    question: 'Fourier serisi nedir?',
    answer: 'Periyodik fonksiyonları sinüs ve kosinüs fonksiyonlarının toplamı olarak ifade eden seridir.',
    difficulty: 'hard',
    explanation: 'Fourier serisi sinyal işlemede kullanılır.',
    tags: ['fourier serisi', 'periyodik', 'sinüs']
  },
  {
    id: 'math_29',
    category: 'math',
    question: 'Olasılık nedir?',
    answer: 'Bir olayın gerçekleşme şansını 0 ile 1 arasında ifade eden sayıdır.',
    difficulty: 'medium',
    explanation: 'P(A) = 0 imkansız olay, P(A) = 1 kesin olay',
    tags: ['olasılık', 'şans', 'olay']
  },
  {
    id: 'math_30',
    category: 'math',
    question: 'Beklenen değer nedir?',
    answer: 'Bir rastgele değişkenin ortalama değeridir.',
    difficulty: 'medium',
    explanation: 'E(X) = Σ x × P(X=x)',
    tags: ['beklenen değer', 'ortalama', 'rastgele']
  },
  {
    id: 'math_31',
    category: 'math',
    question: 'Varyans nedir?',
    answer: 'Bir rastgele değişkenin ortalama etrafındaki dağılımının ölçüsüdür.',
    difficulty: 'medium',
    explanation: 'Var(X) = E[(X - μ)²]',
    tags: ['varyans', 'dağılım', 'ölçü']
  },
  {
    id: 'math_32',
    category: 'math',
    question: 'Standart sapma nedir?',
    answer: 'Varyansın kareköküdür.',
    difficulty: 'medium',
    explanation: 'σ = √Var(X)',
    tags: ['standart sapma', 'varyans', 'karekök']
  },
  {
    id: 'math_33',
    category: 'math',
    question: 'Normal dağılım nedir?',
    answer: 'Çan eğrisi şeklinde simetrik bir olasılık dağılımıdır.',
    difficulty: 'medium',
    explanation: 'Normal dağılım doğada çok yaygındır.',
    tags: ['normal dağılım', 'çan eğrisi', 'simetrik']
  },
  {
    id: 'math_34',
    category: 'math',
    question: 'Korelasyon nedir?',
    answer: 'İki değişken arasındaki doğrusal ilişkinin gücünü ölçen katsayıdır.',
    difficulty: 'medium',
    explanation: 'Korelasyon -1 ile +1 arasında değer alır.',
    tags: ['korelasyon', 'ilişki', 'doğrusal']
  },

  // FİZİK KARTLARI (33 adet)
  {
    id: 'physics_1',
    category: 'physics',
    question: "Newton'un 1. Yasası nedir?",
    answer: 'Bir cisim üzerine net kuvvet etki etmiyorsa, cisim durumunu korur (durgun kalır veya sabit hızla hareket eder).',
    difficulty: 'easy',
    explanation: 'Bu yasa eylemsizlik yasası olarak da bilinir.',
    tags: ['newton', 'eylemsizlik', 'kuvvet']
  },
  {
    id: 'physics_2',
    category: 'physics',
    question: "Newton'un 2. Yasası nedir?",
    answer: 'F = m × a (Kuvvet, kütle ile ivmenin çarpımına eşittir)',
    difficulty: 'medium',
    explanation: 'Bu yasa dinamik yasası olarak da bilinir.',
    tags: ['newton', 'kuvvet', 'ivme']
  },
  {
    id: 'physics_3',
    category: 'physics',
    question: "Newton'un 3. Yasası nedir?",
    answer: 'Her etkiye karşılık eşit ve zıt yönde bir tepki vardır.',
    difficulty: 'medium',
    explanation: 'Bu yasa etki-tepki yasası olarak da bilinir.',
    tags: ['newton', 'etki', 'tepki']
  },
  {
    id: 'physics_4',
    category: 'physics',
    question: 'Enerji korunumu yasası nedir?',
    answer: 'Enerji yoktan var edilemez, vardan yok edilemez, sadece bir türden diğerine dönüşür.',
    difficulty: 'medium',
    explanation: 'Bu yasa termodinamiğin 1. yasasıdır.',
    tags: ['enerji', 'korunum', 'termodinamik']
  },
  {
    id: 'physics_5',
    category: 'physics',
    question: 'Momentum nedir?',
    answer: 'p = m × v (Momentum, kütle ile hızın çarpımıdır)',
    difficulty: 'medium',
    explanation: 'Momentum korunumlu bir büyüklüktür.',
    tags: ['momentum', 'kütle', 'hız']
  },
  {
    id: 'physics_6',
    category: 'physics',
    question: 'Elektrik akımı birimi nedir?',
    answer: 'Amper (A)',
    difficulty: 'easy',
    explanation: 'Amper, saniyede 1 coulomb yük geçişini ifade eder.',
    tags: ['elektrik', 'akım', 'amper']
  },
  {
    id: 'physics_7',
    category: 'physics',
    question: 'Gerilim birimi nedir?',
    answer: 'Volt (V)',
    difficulty: 'easy',
    explanation: 'Volt, elektrik potansiyel farkının birimidir.',
    tags: ['gerilim', 'volt', 'potansiyel']
  },
  {
    id: 'physics_8',
    category: 'physics',
    question: 'Direnç birimi nedir?',
    answer: 'Ohm (Ω)',
    difficulty: 'easy',
    explanation: 'Ohm, elektrik direncinin birimidir.',
    tags: ['direnç', 'ohm', 'elektrik']
  },
  {
    id: 'physics_9',
    category: 'physics',
    question: "Ohm'un yasası nedir?",
    answer: 'V = I × R (Gerilim, akım ile direncin çarpımına eşittir)',
    difficulty: 'medium',
    explanation: 'Bu yasa elektrik devrelerinin temelidir.',
    tags: ['ohm', 'gerilim', 'akım']
  },
  {
    id: 'physics_10',
    category: 'physics',
    question: 'Güç birimi nedir?',
    answer: 'Watt (W)',
    difficulty: 'easy',
    explanation: 'Watt, saniyede harcanan enerji miktarını ifade eder.',
    tags: ['güç', 'watt', 'enerji']
  },
  {
    id: 'physics_11',
    category: 'physics',
    question: 'Frekans birimi nedir?',
    answer: 'Hertz (Hz)',
    difficulty: 'easy',
    explanation: 'Hertz, saniyedeki titreşim sayısını ifade eder.',
    tags: ['frekans', 'hertz', 'titreşim']
  },
  {
    id: 'physics_12',
    category: 'physics',
    question: 'Dalga boyu birimi nedir?',
    answer: 'Metre (m)',
    difficulty: 'easy',
    explanation: 'Dalga boyu, dalganın bir tam periyodunun uzunluğudur.',
    tags: ['dalga boyu', 'metre', 'periyot']
  },
  {
    id: 'physics_13',
    category: 'physics',
    question: 'Işık hızı nedir?',
    answer: 'c ≈ 3 × 10⁸ m/s',
    difficulty: 'easy',
    explanation: 'Işık hızı evrendeki en yüksek hızdır.',
    tags: ['ışık hızı', 'c', 'hız']
  },
  {
    id: 'physics_14',
    category: 'physics',
    question: 'Ses hızı nedir?',
    answer: 'Havada yaklaşık 343 m/s',
    difficulty: 'easy',
    explanation: 'Ses hızı ortamın özelliklerine bağlıdır.',
    tags: ['ses hızı', 'hava', 'hız']
  },
  {
    id: 'physics_15',
    category: 'physics',
    question: 'Yerçekimi ivmesi nedir?',
    answer: 'g ≈ 9.81 m/s²',
    difficulty: 'easy',
    explanation: 'Bu değer Dünya\'nın yüzeyinde geçerlidir.',
    tags: ['yerçekimi', 'ivme', 'dünya']
  },
  {
    id: 'physics_16',
    category: 'physics',
    question: 'Kütle birimi nedir?',
    answer: 'Kilogram (kg)',
    difficulty: 'easy',
    explanation: 'Kilogram, kütlenin temel birimidir.',
    tags: ['kütle', 'kilogram', 'birim']
  },
  {
    id: 'physics_17',
    category: 'physics',
    question: 'Uzunluk birimi nedir?',
    answer: 'Metre (m)',
    difficulty: 'easy',
    explanation: 'Metre, uzunluğun temel birimidir.',
    tags: ['uzunluk', 'metre', 'birim']
  },
  {
    id: 'physics_18',
    category: 'physics',
    question: 'Zaman birimi nedir?',
    answer: 'Saniye (s)',
    difficulty: 'easy',
    explanation: 'Saniye, zamanın temel birimidir.',
    tags: ['zaman', 'saniye', 'birim']
  },
  {
    id: 'physics_19',
    category: 'physics',
    question: 'Sıcaklık birimi nedir?',
    answer: 'Kelvin (K)',
    difficulty: 'easy',
    explanation: 'Kelvin, mutlak sıcaklık birimidir.',
    tags: ['sıcaklık', 'kelvin', 'birim']
  },
  {
    id: 'physics_20',
    category: 'physics',
    question: 'Basınç birimi nedir?',
    answer: 'Pascal (Pa)',
    difficulty: 'easy',
    explanation: 'Pascal, basıncın temel birimidir.',
    tags: ['basınç', 'pascal', 'birim']
  },
  {
    id: 'physics_21',
    category: 'physics',
    question: 'İş birimi nedir?',
    answer: 'Joule (J)',
    difficulty: 'easy',
    explanation: 'Joule, enerji ve işin birimidir.',
    tags: ['iş', 'joule', 'enerji']
  },
  {
    id: 'physics_22',
    category: 'physics',
    question: 'Kuvvet birimi nedir?',
    answer: 'Newton (N)',
    difficulty: 'easy',
    explanation: 'Newton, kuvvetin temel birimidir.',
    tags: ['kuvvet', 'newton', 'birim']
  },
  {
    id: 'physics_23',
    category: 'physics',
    question: 'Açısal hız birimi nedir?',
    answer: 'Radyan/saniye (rad/s)',
    difficulty: 'medium',
    explanation: 'Açısal hız, dönme hareketinin hızını ifade eder.',
    tags: ['açısal hız', 'radyan', 'dönme']
  },
  {
    id: 'physics_24',
    category: 'physics',
    question: 'Açısal momentum nedir?',
    answer: 'L = I × ω (Eylemsizlik momenti ile açısal hızın çarpımı)',
    difficulty: 'hard',
    explanation: 'Açısal momentum da korunumlu bir büyüklüktür.',
    tags: ['açısal momentum', 'eylemsizlik', 'açısal hız']
  },
  {
    id: 'physics_25',
    category: 'physics',
    question: 'Eylemsizlik momenti nedir?',
    answer: 'Bir cismin dönme hareketine karşı gösterdiği dirençtir.',
    difficulty: 'hard',
    explanation: 'Eylemsizlik momenti cismin kütle dağılımına bağlıdır.',
    tags: ['eylemsizlik momenti', 'dönme', 'direnç']
  },
  {
    id: 'physics_26',
    category: 'physics',
    question: 'Merkezcil kuvvet nedir?',
    answer: 'Dairesel hareket yapan cisme etki eden merkeze yönelik kuvvettir.',
    difficulty: 'medium',
    explanation: 'F = mv²/r formülü ile hesaplanır.',
    tags: ['merkezcil kuvvet', 'dairesel hareket', 'merkez']
  },
  {
    id: 'physics_27',
    category: 'physics',
    question: 'Merkezkaç kuvveti nedir?',
    answer: 'Dönen sistemde hissedilen dışa doğru kuvvettir.',
    difficulty: 'medium',
    explanation: 'Bu kuvvet gerçek bir kuvvet değil, eylemsizlik etkisidir.',
    tags: ['merkezkaç', 'dönme', 'eylemsizlik']
  },
  {
    id: 'physics_28',
    category: 'physics',
    question: 'Hooke yasası nedir?',
    answer: 'F = -kx (Yay kuvveti, yay sabiti ile uzamanın çarpımına eşittir)',
    difficulty: 'medium',
    explanation: 'Bu yasa elastik malzemeler için geçerlidir.',
    tags: ['hooke', 'yay', 'elastik']
  },
  {
    id: 'physics_29',
    category: 'physics',
    question: 'Arşimet prensibi nedir?',
    answer: 'Bir cismin sıvıya batan kısmının ağırlığı kadar sıvı ağırlığında kaldırma kuvveti uygular.',
    difficulty: 'medium',
    explanation: 'Bu prensip sıvıların kaldırma kuvvetini açıklar.',
    tags: ['arşimet', 'kaldırma kuvveti', 'sıvı']
  },
  {
    id: 'physics_30',
    category: 'physics',
    question: 'Bernoulli prensibi nedir?',
    answer: 'Akışkanın hızı arttıkça basıncı azalır.',
    difficulty: 'medium',
    explanation: 'Bu prensip uçak kanatlarının çalışma prensibini açıklar.',
    tags: ['bernoulli', 'akışkan', 'basınç']
  },
  {
    id: 'physics_31',
    category: 'physics',
    question: 'Doppler olayı nedir?',
    answer: 'Kaynak ve gözlemci arasındaki hareket nedeniyle frekansın değişmesidir.',
    difficulty: 'medium',
    explanation: 'Bu olay ses ve ışık dalgalarında gözlenir.',
    tags: ['doppler', 'frekans', 'hareket']
  },
  {
    id: 'physics_32',
    category: 'physics',
    question: 'Fotoelektrik olay nedir?',
    answer: 'Işık etkisiyle metalden elektron kopması olayıdır.',
    difficulty: 'hard',
    explanation: 'Bu olay kuantum fiziğinin temelidir.',
    tags: ['fotoelektrik', 'elektron', 'kuantum']
  },
  {
    id: 'physics_33',
    category: 'physics',
    question: 'Compton olayı nedir?',
    answer: 'X-ışınlarının elektronlarla çarpışması sonucu dalga boyunun değişmesidir.',
    difficulty: 'hard',
    explanation: 'Bu olay ışığın parçacık özelliğini gösterir.',
    tags: ['compton', 'x-ışını', 'parçacık']
  }
];
