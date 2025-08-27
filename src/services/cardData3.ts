import { MemoryCard } from './mongoService';

// Türkçe ve Tarih kategorileri için kartlar
export const memoryCardsData3: MemoryCard[] = [
  // TÜRKÇE KARTLARI (33 adet)
  {
    id: 'turkish_1',
    category: 'turkish',
    question: 'İsim nedir?',
    answer: 'Varlıkları, kavramları, duyguları karşılayan kelimelerdir.',
    difficulty: 'easy',
    explanation: 'İsimler tek başına anlam taşıyan kelimelerdir.',
    tags: ['isim', 'varlık', 'kelime']
  },
  {
    id: 'turkish_2',
    category: 'turkish',
    question: 'Fiil nedir?',
    answer: 'İş, oluş, hareket, durum bildiren kelimelerdir.',
    difficulty: 'easy',
    explanation: 'Fiiller cümlede yüklem görevinde bulunur.',
    tags: ['fiil', 'iş', 'yüklem']
  },
  {
    id: 'turkish_3',
    category: 'turkish',
    question: 'Sıfat nedir?',
    answer: 'İsimleri niteleyen veya belirten kelimelerdir.',
    difficulty: 'easy',
    explanation: 'Sıfatlar isimlerin özelliklerini belirtir.',
    tags: ['sıfat', 'niteleme', 'belirtme']
  },
  {
    id: 'turkish_4',
    category: 'turkish',
    question: 'Zamir nedir?',
    answer: 'İsimlerin yerini tutan kelimelerdir.',
    difficulty: 'medium',
    explanation: 'Zamirler isimlerin yerine geçer.',
    tags: ['zamir', 'yerine geçme', 'isim']
  },
  {
    id: 'turkish_5',
    category: 'turkish',
    question: 'Zarf nedir?',
    answer: 'Fiilleri, sıfatları veya zarfları niteleyen kelimelerdir.',
    difficulty: 'medium',
    explanation: 'Zarflar durum, zaman, miktar bildirir.',
    tags: ['zarf', 'niteleme', 'durum']
  },
  {
    id: 'turkish_6',
    category: 'turkish',
    question: 'Edat nedir?',
    answer: 'Kendi başına anlamı olmayan, kelimeler arasında ilişki kuran kelimelerdir.',
    difficulty: 'medium',
    explanation: 'Edatlar bağlaç ve ünlemlerle birlikte yardımcı kelimelerdir.',
    tags: ['edat', 'ilişki', 'yardımcı']
  },
  {
    id: 'turkish_7',
    category: 'turkish',
    question: 'Bağlaç nedir?',
    answer: 'Kelime, kelime grubu veya cümleleri birbirine bağlayan kelimelerdir.',
    difficulty: 'medium',
    explanation: 'Bağlaçlar eşitlik, karşıtlık, neden-sonuç ilişkisi kurar.',
    tags: ['bağlaç', 'bağlama', 'ilişki']
  },
  {
    id: 'turkish_8',
    category: 'turkish',
    question: 'Ünlem nedir?',
    answer: 'Sevinç, korku, şaşkınlık gibi duyguları ifade eden kelimelerdir.',
    difficulty: 'easy',
    explanation: 'Ünlemler duygusal tepkileri yansıtır.',
    tags: ['ünlem', 'duygu', 'tepki']
  },
  {
    id: 'turkish_9',
    category: 'turkish',
    question: 'Cümle nedir?',
    answer: 'Bir düşünceyi, duyguyu, isteği tam olarak anlatan kelime grubudur.',
    difficulty: 'easy',
    explanation: 'Cümleler yüklem taşır ve anlam bütünlüğü oluşturur.',
    tags: ['cümle', 'düşünce', 'yüklem']
  },
  {
    id: 'turkish_10',
    category: 'turkish',
    question: 'Özne nedir?',
    answer: 'Cümlede yüklemin bildirdiği işi yapan varlıktır.',
    difficulty: 'easy',
    explanation: 'Özne "kim, ne" sorularına cevap verir.',
    tags: ['özne', 'iş yapan', 'soru']
  },
  {
    id: 'turkish_11',
    category: 'turkish',
    question: 'Yüklem nedir?',
    answer: 'Cümlede iş, oluş, hareket, durum bildiren kelimedir.',
    difficulty: 'easy',
    explanation: 'Yüklem cümlenin temel öğesidir.',
    tags: ['yüklem', 'iş', 'temel']
  },
  {
    id: 'turkish_12',
    category: 'turkish',
    question: 'Nesne nedir?',
    answer: 'Cümlede yüklemin etkilediği varlıktır.',
    difficulty: 'medium',
    explanation: 'Nesne "kimi, neyi" sorularına cevap verir.',
    tags: ['nesne', 'etkilenen', 'soru']
  },
  {
    id: 'turkish_13',
    category: 'turkish',
    question: 'Dolaylı tümleç nedir?',
    answer: 'Cümlede yön, yer, zaman bildiren öğedir.',
    difficulty: 'medium',
    explanation: 'Dolaylı tümleç "-e, -de, -den" ekleriyle bulunur.',
    tags: ['dolaylı tümleç', 'yön', 'yer']
  },
  {
    id: 'turkish_14',
    category: 'turkish',
    question: 'Zarf tümleci nedir?',
    answer: 'Cümlede yüklemi niteleyen öğedir.',
    difficulty: 'medium',
    explanation: 'Zarf tümleci "nasıl, ne zaman, nerede" sorularına cevap verir.',
    tags: ['zarf tümleci', 'niteleme', 'soru']
  },
  {
    id: 'turkish_15',
    category: 'turkish',
    question: 'Basit cümle nedir?',
    answer: 'Tek yüklemi olan cümledir.',
    difficulty: 'easy',
    explanation: 'Basit cümleler tek bir düşünceyi ifade eder.',
    tags: ['basit cümle', 'tek yüklem', 'düşünce']
  },
  {
    id: 'turkish_16',
    category: 'turkish',
    question: 'Birleşik cümle nedir?',
    answer: 'Birden fazla yüklemi olan cümledir.',
    difficulty: 'medium',
    explanation: 'Birleşik cümleler ana ve yan cümlelerden oluşur.',
    tags: ['birleşik cümle', 'çok yüklem', 'yan cümle']
  },
  {
    id: 'turkish_17',
    category: 'turkish',
    question: 'Sıralı cümle nedir?',
    answer: 'Birden fazla yargıyı virgül veya noktalı virgülle bağlayan cümledir.',
    difficulty: 'medium',
    explanation: 'Sıralı cümlelerde yargılar arasında eşitlik vardır.',
    tags: ['sıralı cümle', 'yargı', 'bağlama']
  },
  {
    id: 'turkish_18',
    category: 'turkish',
    question: 'Devrik cümle nedir?',
    answer: 'Yüklemi sonda olmayan cümledir.',
    difficulty: 'medium',
    explanation: 'Devrik cümleler şiir ve edebiyatta kullanılır.',
    tags: ['devrik cümle', 'yüklem', 'şiir']
  },
  {
    id: 'turkish_19',
    category: 'turkish',
    question: 'Eksiltili cümle nedir?',
    answer: 'Yüklemi olmayan cümledir.',
    difficulty: 'medium',
    explanation: 'Eksiltili cümlelerde yüklem anlaşılır durumdadır.',
    tags: ['eksiltili cümle', 'yüklem yok', 'anlaşılır']
  },
  {
    id: 'turkish_20',
    category: 'turkish',
    question: 'Kurallı cümle nedir?',
    answer: 'Yüklemi sonda olan cümledir.',
    difficulty: 'easy',
    explanation: 'Kurallı cümleler Türkçenin doğal sıralamasıdır.',
    tags: ['kurallı cümle', 'yüklem sonda', 'doğal']
  },
  {
    id: 'turkish_21',
    category: 'turkish',
    question: 'Olumlu cümle nedir?',
    answer: 'Yüklemi olumlu olan cümledir.',
    difficulty: 'easy',
    explanation: 'Olumlu cümleler bir işin yapıldığını bildirir.',
    tags: ['olumlu cümle', 'yapılan iş', 'bildirme']
  },
  {
    id: 'turkish_22',
    category: 'turkish',
    question: 'Olumsuz cümle nedir?',
    answer: 'Yüklemi olumsuz olan cümledir.',
    difficulty: 'easy',
    explanation: 'Olumsuz cümleler bir işin yapılmadığını bildirir.',
    tags: ['olumsuz cümle', 'yapılmayan iş', 'bildirme']
  },
  {
    id: 'turkish_23',
    category: 'turkish',
    question: 'Soru cümlesi nedir?',
    answer: 'Soru bildiren cümledir.',
    difficulty: 'easy',
    explanation: 'Soru cümleleri "mi" eki veya soru kelimeleriyle kurulur.',
    tags: ['soru cümlesi', 'soru', 'mi eki']
  },
  {
    id: 'turkish_24',
    category: 'turkish',
    question: 'Ünlem cümlesi nedir?',
    answer: 'Ünlem bildiren cümledir.',
    difficulty: 'easy',
    explanation: 'Ünlem cümleleri duygusal tepkileri yansıtır.',
    tags: ['ünlem cümlesi', 'duygu', 'tepki']
  },
  {
    id: 'turkish_25',
    category: 'turkish',
    question: 'Şart cümlesi nedir?',
    answer: 'Koşul bildiren cümledir.',
    difficulty: 'medium',
    explanation: 'Şart cümleleri "-se, -sa" ekleriyle kurulur.',
    tags: ['şart cümlesi', 'koşul', 'se sa']
  },
  {
    id: 'turkish_26',
    category: 'turkish',
    question: 'İstek cümlesi nedir?',
    answer: 'İstek, dilek bildiren cümledir.',
    difficulty: 'medium',
    explanation: 'İstek cümleleri "-elim, -alım" ekleriyle kurulur.',
    tags: ['istek cümlesi', 'dilek', 'elim alım']
  },
  {
    id: 'turkish_27',
    category: 'turkish',
    question: 'Emir cümlesi nedir?',
    answer: 'Buyruk, emir bildiren cümledir.',
    difficulty: 'medium',
    explanation: 'Emir cümleleri emir kipiyle kurulur.',
    tags: ['emir cümlesi', 'buyruk', 'emir kipi']
  },
  {
    id: 'turkish_28',
    category: 'turkish',
    question: 'Gereklilik cümlesi nedir?',
    answer: 'Zorunluluk bildiren cümledir.',
    difficulty: 'medium',
    explanation: 'Gereklilik cümleleri "-meli, -malı" ekleriyle kurulur.',
    tags: ['gereklilik cümlesi', 'zorunluluk', 'meli malı']
  },
  {
    id: 'turkish_29',
    category: 'turkish',
    question: 'Olasılık cümlesi nedir?',
    answer: 'Tahmin bildiren cümledir.',
    difficulty: 'medium',
    explanation: 'Olasılık cümleleri "-ebilir, -abilir" ekleriyle kurulur.',
    tags: ['olasılık cümlesi', 'tahmin', 'ebilir abilir']
  },
  {
    id: 'turkish_30',
    category: 'turkish',
    question: 'Haber cümlesi nedir?',
    answer: 'Bilgi veren cümledir.',
    difficulty: 'easy',
    explanation: 'Haber cümleleri nesnel bilgi içerir.',
    tags: ['haber cümlesi', 'bilgi', 'nesnel']
  },
  {
    id: 'turkish_31',
    category: 'turkish',
    question: 'Yorum cümlesi nedir?',
    answer: 'Kişisel görüş bildiren cümledir.',
    difficulty: 'medium',
    explanation: 'Yorum cümleleri öznel değerlendirme içerir.',
    tags: ['yorum cümlesi', 'görüş', 'öznel']
  },
  {
    id: 'turkish_32',
    category: 'turkish',
    question: 'Tanım cümlesi nedir?',
    answer: 'Bir kavramı açıklayan cümledir.',
    difficulty: 'medium',
    explanation: 'Tanım cümleleri "nedir" sorusuna cevap verir.',
    tags: ['tanım cümlesi', 'açıklama', 'nedir']
  },
  {
    id: 'turkish_33',
    category: 'turkish',
    question: 'Karşılaştırma cümlesi nedir?',
    answer: 'İki varlık arasında benzerlik veya farklılık bildiren cümledir.',
    difficulty: 'medium',
    explanation: 'Karşılaştırma cümleleri "gibi, kadar, daha" kelimeleriyle kurulur.',
    tags: ['karşılaştırma cümlesi', 'benzerlik', 'farklılık']
  },

  // TARİH KARTLARI (34 adet)
  {
    id: 'history_1',
    category: 'history',
    question: 'Tarih nedir?',
    answer: 'Geçmişte yaşanan olayları inceleyen bilim dalıdır.',
    difficulty: 'easy',
    explanation: 'Tarih insanlığın geçmişini araştırır.',
    tags: ['tarih', 'geçmiş', 'olay']
  },
  {
    id: 'history_2',
    category: 'history',
    question: 'Tarih öncesi çağlar nelerdir?',
    answer: 'Taş Devri, Bakır Devri, Tunç Devri, Demir Devri',
    difficulty: 'medium',
    explanation: 'Bu çağlar yazının bulunmasından önceki dönemleri kapsar.',
    tags: ['tarih öncesi', 'çağlar', 'yazı']
  },
  {
    id: 'history_3',
    category: 'history',
    question: 'Tarih çağları nelerdir?',
    answer: 'İlk Çağ, Orta Çağ, Yeni Çağ, Yakın Çağ',
    difficulty: 'medium',
    explanation: 'Bu çağlar yazının bulunmasından sonraki dönemleri kapsar.',
    tags: ['tarih çağları', 'yazı', 'dönem']
  },
  {
    id: 'history_4',
    category: 'history',
    question: 'İlk Çağ ne zaman başlar?',
    answer: 'MÖ 3200 (yazının bulunması)',
    difficulty: 'medium',
    explanation: 'İlk Çağ yazının bulunmasıyla başlar.',
    tags: ['ilk çağ', 'MÖ 3200', 'yazı']
  },
  {
    id: 'history_5',
    category: 'history',
    question: 'Orta Çağ ne zaman başlar?',
    answer: 'MS 375 (Kavimler Göçü)',
    difficulty: 'medium',
    explanation: 'Orta Çağ Kavimler Göçü ile başlar.',
    tags: ['orta çağ', 'MS 375', 'kavimler göçü']
  },
  {
    id: 'history_6',
    category: 'history',
    question: 'Yeni Çağ ne zaman başlar?',
    answer: '1453 (İstanbul\'un Fethi)',
    difficulty: 'medium',
    explanation: 'Yeni Çağ İstanbul\'un fethi ile başlar.',
    tags: ['yeni çağ', '1453', 'istanbul fethi']
  },
  {
    id: 'history_7',
    category: 'history',
    question: 'Yakın Çağ ne zaman başlar?',
    answer: '1789 (Fransız İhtilali)',
    difficulty: 'medium',
    explanation: 'Yakın Çağ Fransız İhtilali ile başlar.',
    tags: ['yakın çağ', '1789', 'fransız ihtilali']
  },
  {
    id: 'history_8',
    category: 'history',
    question: 'Sümerler nerede yaşamıştır?',
    answer: 'Mezopotamya (Güney Irak)',
    difficulty: 'medium',
    explanation: 'Sümerler ilk yazıyı bulan uygarlıktır.',
    tags: ['sümerler', 'mezopotamya', 'yazı']
  },
  {
    id: 'history_9',
    category: 'history',
    question: 'Babiller nerede yaşamıştır?',
    answer: 'Mezopotamya (Orta Irak)',
    difficulty: 'medium',
    explanation: 'Babiller Hammurabi Kanunları ile ünlüdür.',
    tags: ['babiller', 'mezopotamya', 'hammurabi']
  },
  {
    id: 'history_10',
    category: 'history',
    question: 'Asurlular nerede yaşamıştır?',
    answer: 'Mezopotamya (Kuzey Irak)',
    difficulty: 'medium',
    explanation: 'Asurlular ticaret ve savaşçılıkla ünlüdür.',
    tags: ['asurlular', 'mezopotamya', 'ticaret']
  },
  {
    id: 'history_11',
    category: 'history',
    question: 'Mısırlılar nerede yaşamıştır?',
    answer: 'Nil Nehri çevresi',
    difficulty: 'easy',
    explanation: 'Mısırlılar piramitleri ile ünlüdür.',
    tags: ['mısırlılar', 'nil', 'piramit']
  },
  {
    id: 'history_12',
    category: 'history',
    question: 'Hititler nerede yaşamıştır?',
    answer: 'Anadolu (Orta Anadolu)',
    difficulty: 'medium',
    explanation: 'Hititler Anadolu\'nun ilk büyük uygarlığıdır.',
    tags: ['hititler', 'anadolu', 'uygarlık']
  },
  {
    id: 'history_13',
    category: 'history',
    question: 'Frigler nerede yaşamıştır?',
    answer: 'Anadolu (İç Anadolu)',
    difficulty: 'medium',
    explanation: 'Frigler tarım ve hayvancılıkla uğraşmıştır.',
    tags: ['frigler', 'anadolu', 'tarım']
  },
  {
    id: 'history_14',
    category: 'history',
    question: 'Lidyalılar nerede yaşamıştır?',
    answer: 'Anadolu (Batı Anadolu)',
    difficulty: 'medium',
    explanation: 'Lidyalılar parayı bulan uygarlıktır.',
    tags: ['lidyalılar', 'anadolu', 'para']
  },
  {
    id: 'history_15',
    category: 'history',
    question: 'İyonlar nerede yaşamıştır?',
    answer: 'Anadolu (Batı Anadolu kıyıları)',
    difficulty: 'medium',
    explanation: 'İyonlar bilim ve felsefe ile uğraşmıştır.',
    tags: ['iyonlar', 'anadolu', 'bilim']
  },
  {
    id: 'history_16',
    category: 'history',
    question: 'Urartular nerede yaşamıştır?',
    answer: 'Anadolu (Doğu Anadolu)',
    difficulty: 'medium',
    explanation: 'Urartular madencilik ve mimari ile ünlüdür.',
    tags: ['urartular', 'anadolu', 'madencilik']
  },
  {
    id: 'history_17',
    category: 'history',
    question: 'Persler nerede yaşamıştır?',
    answer: 'İran',
    difficulty: 'medium',
    explanation: 'Persler büyük bir imparatorluk kurmuştur.',
    tags: ['persler', 'iran', 'imparatorluk']
  },
  {
    id: 'history_18',
    category: 'history',
    question: 'Yunanlılar nerede yaşamıştır?',
    answer: 'Yunanistan ve çevresi',
    difficulty: 'easy',
    explanation: 'Yunanlılar demokrasiyi bulan uygarlıktır.',
    tags: ['yunanlılar', 'yunanistan', 'demokrasi']
  },
  {
    id: 'history_19',
    category: 'history',
    question: 'Romalılar nerede yaşamıştır?',
    answer: 'İtalya ve çevresi',
    difficulty: 'easy',
    explanation: 'Romalılar büyük bir imparatorluk kurmuştur.',
    tags: ['romalılar', 'italya', 'imparatorluk']
  },
  {
    id: 'history_20',
    category: 'history',
    question: 'Kavimler Göçü nedir?',
    answer: 'MS 375\'te Hunların Avrupa\'ya göç etmesi',
    difficulty: 'medium',
    explanation: 'Kavimler Göçü Orta Çağ\'ı başlatmıştır.',
    tags: ['kavimler göçü', 'MS 375', 'hunlar']
  },
  {
    id: 'history_21',
    category: 'history',
    question: 'Haçlı Seferleri ne zaman yapılmıştır?',
    answer: '1096-1270 yılları arası',
    difficulty: 'medium',
    explanation: 'Haçlı Seferleri Hristiyanların Kudüs\'ü almak için yaptığı seferlerdir.',
    tags: ['haçlı seferleri', '1096-1270', 'kudüs']
  },
  {
    id: 'history_22',
    category: 'history',
    question: 'Coğrafi Keşifler ne zaman başlamıştır?',
    answer: '15. yüzyıl',
    difficulty: 'medium',
    explanation: 'Coğrafi Keşifler yeni ticaret yolları bulmak için yapılmıştır.',
    tags: ['coğrafi keşifler', '15. yüzyıl', 'ticaret']
  },
  {
    id: 'history_23',
    category: 'history',
    question: 'Rönesans ne zaman başlamıştır?',
    answer: '14. yüzyıl',
    difficulty: 'medium',
    explanation: 'Rönesans bilim, sanat ve edebiyatta yenilik dönemidir.',
    tags: ['rönesans', '14. yüzyıl', 'yenilik']
  },
  {
    id: 'history_24',
    category: 'history',
    question: 'Reform ne zaman başlamıştır?',
    answer: '16. yüzyıl',
    difficulty: 'medium',
    explanation: 'Reform dini alanda yenilik hareketidir.',
    tags: ['reform', '16. yüzyıl', 'din']
  },
  {
    id: 'history_25',
    category: 'history',
    question: 'Sanayi İnkılabı ne zaman başlamıştır?',
    answer: '18. yüzyıl',
    difficulty: 'medium',
    explanation: 'Sanayi İnkılabı üretimde makineleşme dönemidir.',
    tags: ['sanayi inkılabı', '18. yüzyıl', 'makineleşme']
  },
  {
    id: 'history_26',
    category: 'history',
    question: 'Fransız İhtilali ne zaman olmuştur?',
    answer: '1789',
    difficulty: 'medium',
    explanation: 'Fransız İhtilali demokrasi ve insan hakları için yapılmıştır.',
    tags: ['fransız ihtilali', '1789', 'demokrasi']
  },
  {
    id: 'history_27',
    category: 'history',
    question: 'I. Dünya Savaşı ne zaman olmuştur?',
    answer: '1914-1918',
    difficulty: 'easy',
    explanation: 'I. Dünya Savaşı büyük devletler arasında olmuştur.',
    tags: ['I. dünya savaşı', '1914-1918', 'büyük devletler']
  },
  {
    id: 'history_28',
    category: 'history',
    question: 'II. Dünya Savaşı ne zaman olmuştur?',
    answer: '1939-1945',
    difficulty: 'easy',
    explanation: 'II. Dünya Savaşı Nazi Almanyası\'nın saldırısı ile başlamıştır.',
    tags: ['II. dünya savaşı', '1939-1945', 'nazi']
  },
  {
    id: 'history_29',
    category: 'history',
    question: 'Soğuk Savaş ne zaman olmuştur?',
    answer: '1945-1991',
    difficulty: 'medium',
    explanation: 'Soğuk Savaş ABD ve SSCB arasında olmuştur.',
    tags: ['soğuk savaş', '1945-1991', 'ABD SSCB']
  },
  {
    id: 'history_30',
    category: 'history',
    question: 'SSCB ne zaman dağılmıştır?',
    answer: '1991',
    difficulty: 'medium',
    explanation: 'SSCB\'nin dağılması Soğuk Savaş\'ı sona erdirmiştir.',
    tags: ['SSCB', '1991', 'dağılma']
  },
  {
    id: 'history_31',
    category: 'history',
    question: 'Osmanlı İmparatorluğu ne zaman kurulmuştur?',
    answer: '1299',
    difficulty: 'easy',
    explanation: 'Osmanlı İmparatorluğu Osman Bey tarafından kurulmuştur.',
    tags: ['osmanlı', '1299', 'osman bey']
  },
  {
    id: 'history_32',
    category: 'history',
    question: 'Osmanlı İmparatorluğu ne zaman yıkılmıştır?',
    answer: '1922',
    difficulty: 'easy',
    explanation: 'Osmanlı İmparatorluğu I. Dünya Savaşı sonrası yıkılmıştır.',
    tags: ['osmanlı', '1922', 'yıkılma']
  },
  {
    id: 'history_33',
    category: 'history',
    question: 'Türkiye Cumhuriyeti ne zaman kurulmuştur?',
    answer: '1923',
    difficulty: 'easy',
    explanation: 'Türkiye Cumhuriyeti Mustafa Kemal Atatürk tarafından kurulmuştur.',
    tags: ['türkiye cumhuriyeti', '1923', 'atatürk']
  },
  {
    id: 'history_34',
    category: 'history',
    question: 'Kurtuluş Savaşı ne zaman olmuştur?',
    answer: '1919-1922',
    difficulty: 'medium',
    explanation: 'Kurtuluş Savaşı Türk milletinin bağımsızlık mücadelesidir.',
    tags: ['kurtuluş savaşı', '1919-1922', 'bağımsızlık']
  }
];
