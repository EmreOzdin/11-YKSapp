import { MemoryCard } from './asyncStorageService';

// Matematik için 100 kart oluştur
export const generateMatematikCards = (): Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] => {
  const cards: Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] = [];
  
  // Temel matematik soruları - 20 farklı soru
  const baseQuestions = [
    {
      question: 'x² - 5x + 6 = 0 denkleminin kökleri toplamı kaçtır?',
      answer: '5',
      explanation: 'İkinci dereceden denklemde kökler toplamı -b/a formülü ile bulunur.',
      tags: ['İkinci Dereceden Denklem', 'Kökler Toplamı']
    },
    {
      question: '2x² - 8x + 6 = 0 denkleminin diskriminantı kaçtır?',
      answer: '16',
      explanation: 'Diskriminant Δ = b² - 4ac formülü ile hesaplanır.',
      tags: ['İkinci Dereceden Denklem', 'Diskriminant']
    },
    {
      question: 'log₂(8) + log₂(4) işleminin sonucu kaçtır?',
      answer: '5',
      explanation: 'log₂(8) = 3 ve log₂(4) = 2 olduğundan toplam 5 olur.',
      tags: ['Logaritma', 'Logaritma Kuralları']
    },
    {
      question: 'Bir dairenin yarıçapı 5 cm ise çevresi kaç cm\'dir? (π = 3)',
      answer: '30',
      explanation: 'Dairenin çevresi 2πr formülü ile hesaplanır.',
      tags: ['Daire', 'Çevre', 'Geometri']
    },
    {
      question: 'f(x) = x² + 3x + 2 fonksiyonunun x = 1 noktasındaki türevi kaçtır?',
      answer: '5',
      explanation: 'f\'(x) = 2x + 3 olduğundan f\'(1) = 5 olur.',
      tags: ['Türev', 'Fonksiyon', 'Analiz']
    },
    {
      question: '|x - 3| = 5 denkleminin çözüm kümesi nedir?',
      answer: '{-2, 8}',
      explanation: '|x - 3| = 5 ise x - 3 = 5 veya x - 3 = -5 olur.',
      tags: ['Mutlak Değer', 'Denklem Çözümü']
    },
    {
      question: '5! + 3! işleminin sonucu kaçtır?',
      answer: '126',
      explanation: '5! = 120 ve 3! = 6 olduğundan toplam 126 olur.',
      tags: ['Faktöriyel', 'Kombinatorik']
    },
    {
      question: 'Bir üçgenin kenarları 3, 4, 5 ise bu üçgenin türü nedir?',
      answer: 'Dik üçgen',
      explanation: '3² + 4² = 9 + 16 = 25 = 5² olduğundan Pisagor teoremi sağlanır.',
      tags: ['Üçgen', 'Pisagor Teoremi', 'Geometri']
    },
    {
      question: '2x + 3y = 8 ve x - y = 1 denklem sisteminin çözümü nedir?',
      answer: 'x = 2, y = 1',
      explanation: 'İkinci denklemden x = y + 1 bulunur ve birinci denklemde yerine konulur.',
      tags: ['Denklem Sistemi', 'Çözüm', 'Cebir']
    },
    {
      question: 'Bir sayının %20\'si 40 ise bu sayı kaçtır?',
      answer: '200',
      explanation: 'Sayının %20\'si 40 ise, sayının tamamı 40 ÷ 0.20 = 200 olur.',
      tags: ['Yüzde', 'Hesaplama', 'Oran']
    },
    {
      question: 'Bir karenin alanı 64 cm² ise çevresi kaç cm\'dir?',
      answer: '32',
      explanation: 'Karenin alanı a² = 64 → a = 8 cm. Çevre = 4a = 32 cm.',
      tags: ['Kare', 'Alan', 'Çevre', 'Geometri']
    },
    {
      question: 'Bir dikdörtgenin uzun kenarı 12 cm, kısa kenarı 8 cm ise alanı kaç cm²\'dir?',
      answer: '96',
      explanation: 'Dikdörtgen alanı = uzun kenar × kısa kenar = 12 × 8 = 96 cm².',
      tags: ['Dikdörtgen', 'Alan', 'Geometri']
    },
    {
      question: 'Bir sayının 3 katının 7 eksiği 20 ise bu sayı kaçtır?',
      answer: '9',
      explanation: '3x - 7 = 20 → 3x = 27 → x = 9 olur.',
      tags: ['Denklem', 'Cebir']
    },
    {
      question: 'Bir dairenin çevresi 24π cm ise yarıçapı kaç cm\'dir?',
      answer: '12',
      explanation: 'Çevre = 2πr = 24π → r = 12 cm olur.',
      tags: ['Daire', 'Çevre', 'Geometri']
    },
    {
      question: 'Bir sayının karesinin 3 katı 75 ise bu sayı kaçtır?',
      answer: '5',
      explanation: '3x² = 75 → x² = 25 → x = 5 olur.',
      tags: ['Kare', 'Denklem', 'Cebir']
    },
    {
      question: 'Bir üçgenin alanı 30 cm², tabanı 10 cm ise yüksekliği kaç cm\'dir?',
      answer: '6',
      explanation: 'Üçgen alanı = (taban × yükseklik) / 2. 30 = (10 × h) / 2 → h = 6 cm.',
      tags: ['Üçgen', 'Alan', 'Geometri']
    },
    {
      question: 'Bir sayının %25\'i 50 ise bu sayı kaçtır?',
      answer: '200',
      explanation: 'Sayının %25\'i 50 ise, sayının tamamı 50 ÷ 0.25 = 200 olur.',
      tags: ['Yüzde', 'Hesaplama']
    },
    {
      question: '4! × 2! işleminin sonucu kaçtır?',
      answer: '48',
      explanation: '4! = 24 ve 2! = 2 olduğundan 24 × 2 = 48 olur.',
      tags: ['Faktöriyel', 'Çarpma']
    },
    {
      question: 'Bir sayının 4 katının 5 fazlası 29 ise bu sayı kaçtır?',
      answer: '6',
      explanation: '4x + 5 = 29 → 4x = 24 → x = 6 olur.',
      tags: ['Denklem', 'Cebir']
    },
    {
      question: 'Bir karenin çevresi 36 cm ise alanı kaç cm²\'dir?',
      answer: '81',
      explanation: 'Karenin çevresi = 4a. 36 = 4a → a = 9 cm. Alan = a² = 81 cm².',
      tags: ['Kare', 'Çevre', 'Alan', 'Geometri']
    }
  ];

  // 100 kart oluştur
  for (let i = 0; i < 100; i++) {
    const baseQuestion = baseQuestions[i % baseQuestions.length];
    const difficulty = i < 40 ? 'easy' : i < 70 ? 'medium' : 'hard';
    
    cards.push({
      id: `math_${i + 1}`,
      category: 'Matematik',
      question: baseQuestion.question,
      answer: baseQuestion.answer,
      difficulty,
      explanation: baseQuestion.explanation,
      tags: baseQuestion.tags
    });
  }

  return cards;
};

// Fizik için 100 kart oluştur
export const generateFizikCards = (): Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] => {
  const cards: Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] = [];
  
  const baseQuestions = [
    {
      question: 'Bir cismin hızı 20 m/s ise, 5 saniyede kaç metre yol alır?',
      answer: '100',
      explanation: 'Yol = Hız × Zaman formülü ile hesaplanır.',
      tags: ['Hız', 'Yol', 'Zaman', 'Hareket']
    },
    {
      question: 'Kütlesi 2 kg olan bir cisme 10 N\'luk kuvvet uygulanırsa ivmesi kaç m/s² olur?',
      answer: '5',
      explanation: 'F = ma formülünden a = F/m = 10/2 = 5 m/s² olur.',
      tags: ['Kuvvet', 'Kütle', 'İvme', 'Newton']
    },
    {
      question: 'Bir cismin kinetik enerjisi 50 J, kütlesi 4 kg ise hızı kaç m/s\'dir?',
      answer: '5',
      explanation: 'E = ½mv² formülünden v² = 2E/m = 25 → v = 5 m/s olur.',
      tags: ['Kinetik Enerji', 'Hız', 'Enerji']
    },
    {
      question: 'Yerçekimi ivmesi 10 m/s² ise, 2 saniye serbest düşen bir cismin hızı kaç m/s olur?',
      answer: '20',
      explanation: 'v = gt formülü ile hesaplanır.',
      tags: ['Serbest Düşme', 'Yerçekimi', 'Hız']
    },
    {
      question: 'Bir yayın yay sabiti 100 N/m ise, 0.1 m sıkıştırıldığında yayda depolanan enerji kaç J\'dur?',
      answer: '0.5',
      explanation: 'E = ½kx² formülü ile hesaplanır.',
      tags: ['Yay Enerjisi', 'Elastik Enerji', 'Hooke Kanunu']
    },
    {
      question: 'Bir atomun çekirdeğinde 6 proton varsa, bu atom hangi elementtir?',
      answer: 'Karbon',
      explanation: 'Atom numarası proton sayısına eşittir.',
      tags: ['Atom', 'Proton', 'Element', 'Periyodik Tablo']
    },
    {
      question: 'Bir elektrik devresinde 12 V gerilim ve 3 A akım varsa güç kaç W\'tır?',
      answer: '36',
      explanation: 'P = V × I formülü ile hesaplanır.',
      tags: ['Elektrik Gücü', 'Gerilim', 'Akım', 'Elektrik']
    },
    {
      question: 'Bir cismin momentumu 20 kg·m/s, kütlesi 5 kg ise hızı kaç m/s\'dir?',
      answer: '4',
      explanation: 'p = mv formülünden v = p/m = 20/5 = 4 m/s olur.',
      tags: ['Momentum', 'Kütle', 'Hız']
    },
    {
      question: 'Bir ses dalgasının frekansı 500 Hz, dalga boyu 0.68 m ise sesin hızı kaç m/s\'dir?',
      answer: '340',
      explanation: 'v = fλ formülü ile hesaplanır.',
      tags: ['Ses', 'Frekans', 'Dalga Boyu', 'Dalga']
    },
    {
      question: 'Bir cismin potansiyel enerjisi 100 J, yüksekliği 5 m ise kütlesi kaç kg\'dır? (g = 10 m/s²)',
      answer: '2',
      explanation: 'E = mgh formülünden m = E/(gh) = 100/(10×5) = 2 kg olur.',
      tags: ['Potansiyel Enerji', 'Kütle', 'Yükseklik', 'Enerji']
    },
    {
      question: 'Bir cismin hızı 15 m/s ise, 3 saniyede kaç metre yol alır?',
      answer: '45',
      explanation: 'Yol = Hız × Zaman = 15 × 3 = 45 metre.',
      tags: ['Hız', 'Yol', 'Zaman', 'Hareket']
    },
    {
      question: 'Kütlesi 3 kg olan bir cisme 15 N\'luk kuvvet uygulanırsa ivmesi kaç m/s² olur?',
      answer: '5',
      explanation: 'F = ma formülünden a = F/m = 15/3 = 5 m/s² olur.',
      tags: ['Kuvvet', 'Kütle', 'İvme', 'Newton']
    },
    {
      question: 'Bir cismin kinetik enerjisi 72 J, kütlesi 8 kg ise hızı kaç m/s\'dir?',
      answer: '6',
      explanation: 'E = ½mv² formülünden v² = 2E/m = 144/8 = 18 → v = 6 m/s olur.',
      tags: ['Kinetik Enerji', 'Hız', 'Enerji']
    },
    {
      question: 'Yerçekimi ivmesi 10 m/s² ise, 3 saniye serbest düşen bir cismin hızı kaç m/s olur?',
      answer: '30',
      explanation: 'v = gt = 10 × 3 = 30 m/s olur.',
      tags: ['Serbest Düşme', 'Yerçekimi', 'Hız']
    },
    {
      question: 'Bir yayın yay sabiti 200 N/m ise, 0.05 m sıkıştırıldığında yayda depolanan enerji kaç J\'dur?',
      answer: '0.25',
      explanation: 'E = ½kx² = ½ × 200 × (0.05)² = 0.25 J olur.',
      tags: ['Yay Enerjisi', 'Elastik Enerji', 'Hooke Kanunu']
    },
    {
      question: 'Bir atomun çekirdeğinde 8 proton varsa, bu atom hangi elementtir?',
      answer: 'Oksijen',
      explanation: 'Atom numarası proton sayısına eşittir. 8 proton = 8 atom numarası = Oksijen (O).',
      tags: ['Atom', 'Proton', 'Element', 'Periyodik Tablo']
    },
    {
      question: 'Bir elektrik devresinde 24 V gerilim ve 2 A akım varsa güç kaç W\'tır?',
      answer: '48',
      explanation: 'P = V × I = 24 × 2 = 48 W olur.',
      tags: ['Elektrik Gücü', 'Gerilim', 'Akım', 'Elektrik']
    },
    {
      question: 'Bir cismin momentumu 30 kg·m/s, kütlesi 6 kg ise hızı kaç m/s\'dir?',
      answer: '5',
      explanation: 'p = mv formülünden v = p/m = 30/6 = 5 m/s olur.',
      tags: ['Momentum', 'Kütle', 'Hız']
    },
    {
      question: 'Bir ses dalgasının frekansı 400 Hz, dalga boyu 0.85 m ise sesin hızı kaç m/s\'dir?',
      answer: '340',
      explanation: 'v = fλ = 400 × 0.85 = 340 m/s olur.',
      tags: ['Ses', 'Frekans', 'Dalga Boyu', 'Dalga']
    },
    {
      question: 'Bir cismin potansiyel enerjisi 150 J, yüksekliği 6 m ise kütlesi kaç kg\'dır? (g = 10 m/s²)',
      answer: '2.5',
      explanation: 'E = mgh formülünden m = E/(gh) = 150/(10×6) = 2.5 kg olur.',
      tags: ['Potansiyel Enerji', 'Kütle', 'Yükseklik', 'Enerji']
    }
  ];

  for (let i = 0; i < 100; i++) {
    const baseQuestion = baseQuestions[i % baseQuestions.length];
    const difficulty = i < 40 ? 'easy' : i < 70 ? 'medium' : 'hard';
    
    cards.push({
      id: `physics_${i + 1}`,
      category: 'Fizik',
      question: baseQuestion.question,
      answer: baseQuestion.answer,
      difficulty,
      explanation: baseQuestion.explanation,
      tags: baseQuestion.tags
    });
  }

  return cards;
};

// Kimya için 100 kart oluştur
export const generateKimyaCards = (): Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] => {
  const cards: Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] = [];
  
  const baseQuestions = [
    {
      question: 'H₂O molekülünde kaç tane hidrojen atomu vardır?',
      answer: '2',
      explanation: 'H₂O formülünde alt indis 2, hidrojen atomu sayısını gösterir.',
      tags: ['Molekül', 'Formül', 'Atom Sayısı']
    },
    {
      question: 'pH = 3 olan bir çözeltinin H⁺ iyonu derişimi kaç mol/L\'dir?',
      answer: '0.001',
      explanation: 'pH = -log[H⁺] formülünden [H⁺] = 10⁻ᵖᴴ = 10⁻³ = 0.001 mol/L olur.',
      tags: ['pH', 'Asitlik', 'İyon Derişimi']
    },
    {
      question: 'NaCl tuzunun iyonik bağ mı kovalent bağ mı vardır?',
      answer: 'İyonik bağ',
      explanation: 'NaCl, metal (Na) ile ametal (Cl) arasında oluşan iyonik bağlı bir bileşiktir.',
      tags: ['İyonik Bağ', 'Tuz', 'Bağ Türü']
    },
    {
      question: '1 mol H₂SO₄ kaç gramdır? (H:1, S:32, O:16)',
      answer: '98',
      explanation: 'H₂SO₄ = 2×1 + 32 + 4×16 = 2 + 32 + 64 = 98 g/mol olur.',
      tags: ['Mol', 'Molekül Ağırlığı', 'Hesaplama']
    },
    {
      question: 'Hangi element periyodik tabloda 1A grubunda yer alır?',
      answer: 'Lityum (Li)',
      explanation: 'Lityum (Li), periyodik tabloda 1A grubunda yer alan alkali metaldir.',
      tags: ['Periyodik Tablo', 'Grup', 'Element']
    },
    {
      question: 'CO₂ molekülünde kaç tane çift bağ vardır?',
      answer: '2',
      explanation: 'CO₂ molekülünde karbon atomu ile her oksijen atomu arasında bir çift bağ vardır.',
      tags: ['Çift Bağ', 'Molekül Yapısı', 'Kovalent Bağ']
    },
    {
      question: 'Hangi tepkime türünde elektron alışverişi olur?',
      answer: 'Redoks tepkimesi',
      explanation: 'Redoks (indirgenme-yükseltgenme) tepkimelerinde elektron alışverişi gerçekleşir.',
      tags: ['Redoks', 'Elektron', 'Tepkime Türü']
    },
    {
      question: '0.5 mol NaOH kaç gramdır? (Na:23, O:16, H:1)',
      answer: '20',
      explanation: 'NaOH = 23 + 16 + 1 = 40 g/mol. 0.5 mol × 40 g/mol = 20 g olur.',
      tags: ['Mol', 'Gram', 'Hesaplama']
    },
    {
      question: 'Hangi gaz asit yağmuru oluşturur?',
      answer: 'SO₂ (Kükürt dioksit)',
      explanation: 'SO₂ gazı atmosferde su ile birleşerek sülfürik asit oluşturur.',
      tags: ['Asit Yağmuru', 'Çevre Kirliliği', 'Gaz']
    },
    {
      question: 'Hangi element periyodik tabloda 7A grubunda yer alır?',
      answer: 'Flor (F)',
      explanation: 'Flor (F), periyodik tabloda 7A grubunda yer alan halojen elementtir.',
      tags: ['Periyodik Tablo', 'Halojen', 'Element']
    }
  ];

  for (let i = 0; i < 100; i++) {
    const baseQuestion = baseQuestions[i % baseQuestions.length];
    const difficulty = i < 40 ? 'easy' : i < 70 ? 'medium' : 'hard';
    
    cards.push({
      id: `chemistry_${i + 1}`,
      category: 'Kimya',
      question: baseQuestion.question,
      answer: baseQuestion.answer,
      difficulty,
      explanation: baseQuestion.explanation,
      tags: baseQuestion.tags
    });
  }

  return cards;
};

// Biyoloji için 100 kart oluştur
export const generateBiyolojiCards = (): Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] => {
  const cards: Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] = [];
  
  const baseQuestions = [
    {
      question: 'Hücrenin enerji üretim merkezi hangi organeldir?',
      answer: 'Mitokondri',
      explanation: 'Mitokondri, hücrede oksijenli solunum yaparak ATP enerjisi üreten organeldir.',
      tags: ['Hücre', 'Mitokondri', 'Enerji', 'Organel']
    },
    {
      question: 'DNA\'nın yapı taşı nedir?',
      answer: 'Nükleotid',
      explanation: 'DNA, nükleotid adı verilen yapı taşlarından oluşur.',
      tags: ['DNA', 'Nükleotid', 'Genetik']
    },
    {
      question: 'Hangi vitamin suda çözünür?',
      answer: 'C vitamini',
      explanation: 'C vitamini suda çözünür bir vitamindir. B grubu vitaminleri de suda çözünür.',
      tags: ['Vitamin', 'Suda Çözünürlük', 'Beslenme']
    },
    {
      question: 'İnsan vücudunda kaç çift kromozom bulunur?',
      answer: '23',
      explanation: 'İnsan vücudunda 23 çift (46 adet) kromozom bulunur.',
      tags: ['Kromozom', 'Genetik', 'İnsan']
    },
    {
      question: 'Hangi organel protein sentezinde görev alır?',
      answer: 'Ribozom',
      explanation: 'Ribozom, hücrede protein sentezinde görev alan organeldir.',
      tags: ['Ribozom', 'Protein Sentezi', 'Organel']
    },
    {
      question: 'Hangi kan grubu evrensel alıcıdır?',
      answer: 'AB',
      explanation: 'AB kan grubu, A ve B antijenlerine sahip olduğu için evrensel alıcıdır.',
      tags: ['Kan Grubu', 'Kan Nakli', 'İmmünoloji']
    },
    {
      question: 'Hangi sistem vücuttaki atık maddeleri uzaklaştırır?',
      answer: 'Boşaltım sistemi',
      explanation: 'Boşaltım sistemi, vücuttaki atık maddeleri uzaklaştırmaktan sorumludur.',
      tags: ['Boşaltım', 'Sistem', 'Vücut']
    },
    {
      question: 'Hangi vitamin kemik gelişimi için önemlidir?',
      answer: 'D vitamini',
      explanation: 'D vitamini, kalsiyum emilimini artırarak kemik gelişimi için önemlidir.',
      tags: ['Vitamin D', 'Kemik', 'Kalsiyum']
    },
    {
      question: 'Hangi organel bitki hücrelerinde fotosentez yapar?',
      answer: 'Kloroplast',
      explanation: 'Kloroplast, bitki hücrelerinde fotosentez yapan organeldir.',
      tags: ['Kloroplast', 'Fotosentez', 'Bitki']
    },
    {
      question: 'Hangi kan grubu evrensel vericidir?',
      answer: '0 (Sıfır)',
      explanation: '0 kan grubu, A ve B antijenlerine sahip olmadığı için evrensel vericidir.',
      tags: ['Kan Grubu', 'Kan Nakli', 'İmmünoloji']
    }
  ];

  for (let i = 0; i < 100; i++) {
    const baseQuestion = baseQuestions[i % baseQuestions.length];
    const difficulty = i < 40 ? 'easy' : i < 70 ? 'medium' : 'hard';
    
    cards.push({
      id: `biology_${i + 1}`,
      category: 'Biyoloji',
      question: baseQuestion.question,
      answer: baseQuestion.answer,
      difficulty,
      explanation: baseQuestion.explanation,
      tags: baseQuestion.tags
    });
  }

  return cards;
};

// Türkçe için 100 kart oluştur
export const generateTurkceCards = (): Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] => {
  const cards: Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] = [];
  
  const baseQuestions = [
    {
      question: '"Güzel" kelimesi hangi kelime türüdür?',
      answer: 'Sıfat',
      explanation: '"Güzel" kelimesi, isimleri niteleyen bir sıfattır.',
      tags: ['Kelime Türü', 'Sıfat', 'Dilbilgisi']
    },
    {
      question: '"Geldi" kelimesinin kökü nedir?',
      answer: 'Gel',
      explanation: '"Geldi" kelimesinin kökü "gel"dir. "-di" eki geçmiş zaman ekidir.',
      tags: ['Kök', 'Ek', 'Kelime Yapısı']
    },
    {
      question: 'Hangi cümle devrik cümledir?',
      answer: 'Geldi eve çocuk.',
      explanation: '"Geldi eve çocuk" cümlesi devrik cümledir çünkü yüklemi başta, öznesi sonda bulunur.',
      tags: ['Cümle Türü', 'Devrik Cümle', 'Sözdizimi']
    },
    {
      question: '"Kitap" kelimesi hangi ses olayına uğramıştır?',
      answer: 'Ünsüz yumuşaması',
      explanation: '"Kitap" kelimesi "kitabım" şeklinde kullanıldığında "p" sesi "b" sesine dönüşür.',
      tags: ['Ses Olayı', 'Ünsüz Yumuşaması', 'Fonetik']
    },
    {
      question: 'Hangi kelime türemiş kelimedir?',
      answer: 'Gözlük',
      explanation: '"Gözlük" kelimesi "göz" köküne "-lük" eki eklenerek türetilmiştir.',
      tags: ['Türemiş Kelime', 'Kelime Yapısı', 'Ek']
    },
    {
      question: '"Ben de geldim" cümlesindeki "de" nasıl yazılır?',
      answer: 'Ayrı',
      explanation: 'Bu cümledeki "de" bağlaçtır ve ayrı yazılır.',
      tags: ['Yazım', 'Bağlaç', 'De/Da']
    },
    {
      question: 'Hangi cümle bileşik cümledir?',
      answer: 'Kitabı okudum ve çok beğendim.',
      explanation: '"Kitabı okudum ve çok beğendim" cümlesi iki yargı içerdiği için bileşik cümledir.',
      tags: ['Cümle Türü', 'Bileşik Cümle', 'Sözdizimi']
    },
    {
      question: '"Güzelce" kelimesi hangi kelime türüdür?',
      answer: 'Zarf',
      explanation: '"Güzelce" kelimesi, fiilleri niteleyen bir zarftır.',
      tags: ['Kelime Türü', 'Zarf', 'Dilbilgisi']
    },
    {
      question: 'Hangi kelime birleşik kelimedir?',
      answer: 'Hanımeli',
      explanation: '"Hanımeli" kelimesi iki kelimenin birleşmesiyle oluşmuş birleşik kelimedir.',
      tags: ['Birleşik Kelime', 'Kelime Yapısı']
    },
    {
      question: '"Geliyorum" kelimesinin kökü nedir?',
      answer: 'Gel',
      explanation: '"Geliyorum" kelimesinin kökü "gel"dir. "-iyor" ve "-um" ekleri çekim ekleridir.',
      tags: ['Kök', 'Ek', 'Kelime Yapısı']
    }
  ];

  for (let i = 0; i < 100; i++) {
    const baseQuestion = baseQuestions[i % baseQuestions.length];
    const difficulty = i < 40 ? 'easy' : i < 70 ? 'medium' : 'hard';
    
    cards.push({
      id: `turkish_${i + 1}`,
      category: 'Türkçe',
      question: baseQuestion.question,
      answer: baseQuestion.answer,
      difficulty,
      explanation: baseQuestion.explanation,
      tags: baseQuestion.tags
    });
  }

  return cards;
};

// Tarih için 100 kart oluştur
export const generateTarihCards = (): Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] => {
  const cards: Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] = [];
  
  const baseQuestions = [
    {
      question: 'Osmanlı Devleti\'nin kurucusu kimdir?',
      answer: 'Osman Bey',
      explanation: 'Osmanlı Devleti, 1299 yılında Osman Bey tarafından Söğüt ve Domaniç yöresinde kurulmuştur.',
      tags: ['Osmanlı', 'Kuruluş', 'Osman Bey']
    },
    {
      question: 'İstanbul\'un fethi hangi yılda gerçekleşmiştir?',
      answer: '1453',
      explanation: 'İstanbul, Fatih Sultan Mehmet tarafından 29 Mayıs 1453 tarihinde fethedilmiştir.',
      tags: ['İstanbul Fethi', 'Fatih Sultan Mehmet', 'Osmanlı']
    },
    {
      question: 'Türkiye Cumhuriyeti hangi tarihte ilan edilmiştir?',
      answer: '29 Ekim 1923',
      explanation: 'Türkiye Cumhuriyeti, Mustafa Kemal Atatürk önderliğinde 29 Ekim 1923 tarihinde ilan edilmiştir.',
      tags: ['Cumhuriyet', 'Atatürk', 'Türkiye']
    },
    {
      question: 'Kurtuluş Savaşı hangi antlaşma ile sona ermiştir?',
      answer: 'Lozan Antlaşması',
      explanation: 'Kurtuluş Savaşı, 24 Temmuz 1923 tarihinde imzalanan Lozan Antlaşması ile sona ermiştir.',
      tags: ['Kurtuluş Savaşı', 'Lozan', 'Antlaşma']
    },
    {
      question: 'Malazgirt Savaşı hangi yılda yapılmıştır?',
      answer: '1071',
      explanation: 'Malazgirt Savaşı, Büyük Selçuklu Sultanı Alparslan ile Bizans İmparatoru Romen Diyojen arasında 1071 yılında yapılmıştır.',
      tags: ['Malazgirt', 'Alparslan', 'Selçuklu']
    },
    {
      question: 'TBMM\'nin açılışı hangi tarihte gerçekleşmiştir?',
      answer: '23 Nisan 1920',
      explanation: 'Türkiye Büyük Millet Meclisi, 23 Nisan 1920 tarihinde Ankara\'da açılmıştır.',
      tags: ['TBMM', 'Açılış', 'Ankara']
    },
    {
      question: 'Çanakkale Savaşı hangi yıllar arasında gerçekleşmiştir?',
      answer: '1915-1916',
      explanation: 'Çanakkale Savaşı, I. Dünya Savaşı sırasında 1915-1916 yılları arasında gerçekleşmiştir.',
      tags: ['Çanakkale', 'I. Dünya Savaşı', 'Savaş']
    },
    {
      question: 'Saltanat hangi tarihte kaldırılmıştır?',
      answer: '1 Kasım 1922',
      explanation: 'Saltanat, TBMM tarafından 1 Kasım 1922 tarihinde kaldırılmıştır.',
      tags: ['Saltanat', 'Kaldırılma', 'TBMM']
    },
    {
      question: 'Hangi padişah döneminde Kanuni Sultan Süleyman olarak bilinir?',
      answer: 'I. Süleyman',
      explanation: 'Kanuni Sultan Süleyman, I. Süleyman\'dır. 1520-1566 yılları arasında hüküm sürmüştür.',
      tags: ['Kanuni', 'I. Süleyman', 'Osmanlı']
    },
    {
      question: 'Türk alfabesi hangi tarihte kabul edilmiştir?',
      answer: '1 Kasım 1928',
      explanation: 'Türk alfabesi, 1 Kasım 1928 tarihinde kabul edilmiş ve 1929 yılında uygulamaya geçilmiştir.',
      tags: ['Alfabe', 'Harf İnkılabı', 'Atatürk']
    }
  ];

  for (let i = 0; i < 100; i++) {
    const baseQuestion = baseQuestions[i % baseQuestions.length];
    const difficulty = i < 40 ? 'easy' : i < 70 ? 'medium' : 'hard';
    
    cards.push({
      id: `history_${i + 1}`,
      category: 'Tarih',
      question: baseQuestion.question,
      answer: baseQuestion.answer,
      difficulty,
      explanation: baseQuestion.explanation,
      tags: baseQuestion.tags
    });
  }

  return cards;
};

// Tüm kartları oluştur
export const generateAllCards = (): Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] => {
  return [
    ...generateMatematikCards(),
    ...generateFizikCards(),
    ...generateKimyaCards(),
    ...generateBiyolojiCards(),
    ...generateTurkceCards(),
    ...generateTarihCards()
  ];
};
