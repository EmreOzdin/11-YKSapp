import fs from 'fs';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// biologycards.ts dosyasını oku ve verileri çıkar
function extractBiologyCards() {
  try {
    const filePath = path.join(__dirname, '../src/data/biologycards.ts');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Export edilen array'i bul
    const exportMatch = fileContent.match(/export const biologyCards[^=]*=\s*\[([\s\S]*?)\];/);
    if (!exportMatch) {
      throw new Error('biologyCards array bulunamadı');
    }
    
    const arrayContent = exportMatch[1];
    
    // Her kart objesini bul ve parse et
    const cards = [];
    const cardRegex = /\{\s*id:\s*'([^']+)',\s*category:\s*'([^']+)',\s*question:\s*'([^']+)',\s*answer:\s*'([^']+)',\s*difficulty:\s*'([^']+)',\s*explanation:\s*'([^']+)',\s*tags:\s*\[([^\]]+)\],?\s*\}/g;
    
    let match;
    while ((match = cardRegex.exec(arrayContent)) !== null) {
      const tags = match[7].split(',').map(tag => tag.trim().replace(/'/g, ''));
      
      cards.push({
        id: match[1],
        category: match[2],
        question: match[3],
        answer: match[4],
        difficulty: match[5],
        explanation: match[6],
        tags: tags
      });
    }
    
    return cards;
  } catch (error) {
    console.error('❌ biologycards.ts dosyası okunamadı:', error.message);
    return [];
  }
}

async function uploadBiologyCards() {
  try {
    console.log('🔄 biologycards.ts dosyasından biyoloji kartları okunuyor...');
    
    const biologyCards = extractBiologyCards();
    
    if (biologyCards.length === 0) {
      console.error('❌ Hiç biyoloji kartı bulunamadı!');
      return;
    }
    
    console.log(`📊 Toplam ${biologyCards.length} biyoloji kartı bulundu`);
    console.log('🔄 MongoDB\'ye yükleniyor...');
    
    const response = await fetch('http://localhost:3000/cards/bulk', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cards: biologyCards }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.success) {
      console.log(`✅ ${result.data.length} biyoloji kartı başarıyla MongoDB'ye yüklendi!`);
      console.log('📊 İlk 10 kart:', result.data.slice(0, 10).map(card => card.id).join(', '));
      console.log('📊 Son 10 kart:', result.data.slice(-10).map(card => card.id).join(', '));
    } else {
      console.error('❌ Kartlar yüklenirken hata oluştu:', result.error);
    }
  } catch (error) {
    console.error('❌ API bağlantı hatası:', error.message);
    console.log('💡 API sunucusunun çalıştığından emin olun: npm start (yksapp-api klasöründe)');
  }
}

// Script'i çalıştır
uploadBiologyCards();
