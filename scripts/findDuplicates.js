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

// Basit regex ile soruları ayıkla (daha güvenli bir yöntem için JSON parse kullanılabilir)
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
  byId: {},
  byQuestion: {},
  byAnswer: {},
  byQuestionAndAnswer: {}
};

questions.forEach((q, index) => {
  // ID tekrarları
  if (duplicates.byId[q.id]) {
    duplicates.byId[q.id].push(index);
  } else {
    duplicates.byId[q.id] = [index];
  }
  
  // Soru metni tekrarları
  if (duplicates.byQuestion[q.question]) {
    duplicates.byQuestion[q.question].push(index);
  } else {
    duplicates.byQuestion[q.question] = [index];
  }
  
  // Cevap tekrarları
  if (duplicates.byAnswer[q.answer]) {
    duplicates.byAnswer[q.answer].push(index);
  } else {
    duplicates.byAnswer[q.answer] = [index];
  }
  
  // Soru + Cevap kombinasyonu tekrarları
  const key = `${q.question}|${q.answer}`;
  if (duplicates.byQuestionAndAnswer[key]) {
    duplicates.byQuestionAndAnswer[key].push(index);
  } else {
    duplicates.byQuestionAndAnswer[key] = [index];
  }
});

// Sonuçları yazdır
console.log('\n=== TEKRAR ANALİZİ ===\n');

// ID tekrarları
const idDuplicates = Object.entries(duplicates.byId).filter(([id, indices]) => indices.length > 1);
if (idDuplicates.length > 0) {
  console.log('🔴 AYNI ID\'YE SAHİP SORULAR:');
  idDuplicates.forEach(([id, indices]) => {
    console.log(`  ID: ${id} - ${indices.length} kez tekrar`);
    indices.forEach(index => {
      console.log(`    ${index}: ${questions[index].question.substring(0, 50)}...`);
    });
  });
  console.log('');
}

// Soru metni tekrarları
const questionDuplicates = Object.entries(duplicates.byQuestion).filter(([question, indices]) => indices.length > 1);
if (questionDuplicates.length > 0) {
  console.log('🔴 AYNI SORU METNİNE SAHİP SORULAR:');
  questionDuplicates.forEach(([question, indices]) => {
    console.log(`  Soru: ${question.substring(0, 50)}... - ${indices.length} kez tekrar`);
    indices.forEach(index => {
      console.log(`    ${index}: ID=${questions[index].id}`);
    });
  });
  console.log('');
}

// Soru + Cevap kombinasyonu tekrarları
const comboDuplicates = Object.entries(duplicates.byQuestionAndAnswer).filter(([key, indices]) => indices.length > 1);
if (comboDuplicates.length > 0) {
  console.log('🔴 AYNI SORU + CEVAP KOMBİNASYONUNA SAHİP SORULAR:');
  comboDuplicates.forEach(([key, indices]) => {
    const [question, answer] = key.split('|');
    console.log(`  Soru: ${question.substring(0, 30)}...`);
    console.log(`  Cevap: ${answer.substring(0, 30)}...`);
    console.log(`  ${indices.length} kez tekrar:`);
    indices.forEach(index => {
      console.log(`    ${index}: ID=${questions[index].id}`);
    });
    console.log('');
  });
}

// Özet
console.log('=== ÖZET ===');
console.log(`Toplam soru sayısı: ${questions.length}`);
console.log(`Aynı ID'ye sahip soru grupları: ${idDuplicates.length}`);
console.log(`Aynı soru metnine sahip soru grupları: ${questionDuplicates.length}`);
console.log(`Aynı soru+cevap kombinasyonuna sahip soru grupları: ${comboDuplicates.length}`);

// Silinecek soruların indekslerini topla
const toRemove = new Set();
idDuplicates.forEach(([id, indices]) => {
  indices.slice(1).forEach(index => toRemove.add(index)); // İlkini koru, diğerlerini sil
});
questionDuplicates.forEach(([question, indices]) => {
  indices.slice(1).forEach(index => toRemove.add(index)); // İlkini koru, diğerlerini sil
});
comboDuplicates.forEach(([key, indices]) => {
  indices.slice(1).forEach(index => toRemove.add(index)); // İlkini koru, diğerlerini sil
});

console.log(`\nSilinecek soru sayısı: ${toRemove.size}`);
console.log(`Kalan soru sayısı: ${questions.length - toRemove.size}`);

// Silinecek soruları listele
if (toRemove.size > 0) {
  console.log('\n=== SİLİNECEK SORULAR ===');
  Array.from(toRemove).sort((a, b) => a - b).forEach(index => {
    console.log(`${index}: ${questions[index].id} - ${questions[index].question.substring(0, 50)}...`);
  });
}
