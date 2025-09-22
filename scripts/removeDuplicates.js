const fs = require('fs');
const path = require('path');

// questionRepository.ts dosyasını oku
const filePath = path.join(__dirname, '../src/data/questionRepository.ts');
const content = fs.readFileSync(filePath, 'utf8');

// TYT 2018 sorularını çıkar
const tyt2018Match = content.match(/export const tyt2018Questions[^=]*=\s*\[([\s\S]*?)\];/);
if (!tyt2018Match) {
  console.log('TYT 2018 soruları bulunamadı!');
  process.exit(1);
}

// Soruları parse et
const questionsText = tyt2018Match[1];
const questions = [];

// Basit regex ile soruları ayıkla
let currentQuestion = '';
let braceCount = 0;
let inQuestion = false;

for (let i = 0; i < questionsText.length; i++) {
  const char = questionsText[i];
  
  if (char === '{') {
    if (braceCount === 0) {
      inQuestion = true;
      currentQuestion = '';
    }
    braceCount++;
  }
  
  if (inQuestion) {
    currentQuestion += char;
  }
  
  if (char === '}') {
    braceCount--;
    if (braceCount === 0 && inQuestion) {
      // Soruyu parse et
      try {
        // Basit parsing - id, question, answer alanlarını çıkar
        const idMatch = currentQuestion.match(/id:\s*['"`]([^'"`]+)['"`]/);
        const questionMatch = currentQuestion.match(/question:\s*['"`]([^'"`]+)['"`]/);
        const answerMatch = currentQuestion.match(/answer:\s*['"`]([^'"`]+)['"`]/);
        
        if (idMatch && questionMatch && answerMatch) {
          questions.push({
            id: idMatch[1],
            question: questionMatch[1],
            answer: answerMatch[1],
            fullText: currentQuestion
          });
        }
      } catch (e) {
        console.log('Parse hatası:', e.message);
      }
      
      currentQuestion = '';
      inQuestion = false;
    }
  }
}

console.log(`Toplam ${questions.length} soru bulundu.`);

// Tekrarları tespit et
const duplicates = {
  byQuestion: {},
  byQuestionAndAnswer: {}
};

questions.forEach((q, index) => {
  // Soru metni tekrarları
  if (duplicates.byQuestion[q.question]) {
    duplicates.byQuestion[q.question].push(index);
  } else {
    duplicates.byQuestion[q.question] = [index];
  }
  
  // Soru + Cevap kombinasyonu tekrarları
  const key = `${q.question}|${q.answer}`;
  if (duplicates.byQuestionAndAnswer[key]) {
    duplicates.byQuestionAndAnswer[key].push(index);
  } else {
    duplicates.byQuestionAndAnswer[key] = [index];
  }
});

// Silinecek soruların indekslerini topla
const toRemove = new Set();

// Soru metni tekrarları
const questionDuplicates = Object.entries(duplicates.byQuestion).filter(([question, indices]) => indices.length > 1);
questionDuplicates.forEach(([question, indices]) => {
  indices.slice(1).forEach(index => toRemove.add(index)); // İlkini koru, diğerlerini sil
});

// Soru + Cevap kombinasyonu tekrarları
const comboDuplicates = Object.entries(duplicates.byQuestionAndAnswer).filter(([key, indices]) => indices.length > 1);
comboDuplicates.forEach(([key, indices]) => {
  indices.slice(1).forEach(index => toRemove.add(index)); // İlkini koru, diğerlerini sil
});

console.log(`Silinecek soru sayısı: ${toRemove.size}`);
console.log(`Kalan soru sayısı: ${questions.length - toRemove.size}`);

// Yeni soru listesi oluştur (tekrarları çıkar)
const uniqueQuestions = questions.filter((_, index) => !toRemove.has(index));

console.log(`\nTemizlenmiş soru sayısı: ${uniqueQuestions.length}`);

// Yeni dosya içeriği oluştur
let newContent = content;

// TYT 2018 sorularını yeni liste ile değiştir
const newQuestionsArray = uniqueQuestions.map(q => q.fullText).join(',\n  ');

// Regex ile değiştir
const newArrayContent = `export const tyt2018Questions: Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] = [
  ${newQuestionsArray}
];`;

newContent = newContent.replace(
  /export const tyt2018Questions[^=]*=\s*\[[\s\S]*?\];/,
  newArrayContent
);

// Yedek dosya oluştur
const backupPath = filePath + '.backup';
fs.writeFileSync(backupPath, content);
console.log(`\nYedek dosya oluşturuldu: ${backupPath}`);

// Yeni dosyayı kaydet
fs.writeFileSync(filePath, newContent);
console.log(`\nTemizlenmiş dosya kaydedildi: ${filePath}`);

// İstatistikleri yazdır
console.log('\n=== TEMİZLEME İSTATİSTİKLERİ ===');
console.log(`Orijinal soru sayısı: ${questions.length}`);
console.log(`Silinen soru sayısı: ${toRemove.size}`);
console.log(`Kalan soru sayısı: ${uniqueQuestions.length}`);
console.log(`Temizleme oranı: %${((toRemove.size / questions.length) * 100).toFixed(1)}`);

// Kalan soruların dağılımını göster
const subjectStats = {};
const yearStats = {};
const examTypeStats = {};

uniqueQuestions.forEach(q => {
  // Subject analizi
  const subjectMatch = q.fullText.match(/subject:\s*['"`]([^'"`]+)['"`]/);
  if (subjectMatch) {
    const subject = subjectMatch[1];
    subjectStats[subject] = (subjectStats[subject] || 0) + 1;
  }
  
  // Year analizi
  const yearMatch = q.fullText.match(/examYear:\s*(\d+)/);
  if (yearMatch) {
    const year = yearMatch[1];
    yearStats[year] = (yearStats[year] || 0) + 1;
  }
  
  // Exam type analizi
  const examTypeMatch = q.fullText.match(/examType:\s*['"`]([^'"`]+)['"`]/);
  if (examTypeMatch) {
    const examType = examTypeMatch[1];
    examTypeStats[examType] = (examTypeStats[examType] || 0) + 1;
  }
});

console.log('\n=== KALAN SORULARIN DAĞILIMI ===');
console.log('\nDerslere göre:');
Object.entries(subjectStats).sort((a, b) => b[1] - a[1]).forEach(([subject, count]) => {
  console.log(`  ${subject}: ${count} soru`);
});

console.log('\nYıllara göre:');
Object.entries(yearStats).sort((a, b) => a[0] - b[0]).forEach(([year, count]) => {
  console.log(`  ${year}: ${count} soru`);
});

console.log('\nSınav türlerine göre:');
Object.entries(examTypeStats).sort((a, b) => b[1] - a[1]).forEach(([examType, count]) => {
  console.log(`  ${examType}: ${count} soru`);
});

console.log('\n✅ Tekrar temizleme işlemi tamamlandı!');
