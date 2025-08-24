const { MongoClient } = require('mongodb');

// sampleData.js dosyasından soruları import et
const sampleData = require('./sampleData');

// 🔧 MONGODB ATLAS CONNECTION STRING'İNİ BURAYA GİRİN
// MongoDB Atlas Dashboard > Connect > Connect to your application > Copy connection string
// Örnek: "mongodb+srv://username:password@cluster.mongodb.net/yksapp?retryWrites=true&w=majority"
const uri = "mongodb+srv://yksapp_user:yksapp123456@cluster0.i7uic8g.mongodb.net/yksapp?retryWrites=true&w=majority&appName=Cluster0";
  

// ⚠️  YUKARIDAKİ URI'Yİ KENDİ MONGODB ATLAS ADRESİNİZLE DEĞİŞTİRİN!

async function uploadQuestions() {
  const client = new MongoClient(uri);

  try {
    console.log('🔗 MongoDB\'ye bağlanılıyor...');
    await client.connect();
    console.log('✅ MongoDB\'ye başarıyla bağlandı');

    const database = client.db('yksapp');
    const collection = database.collection('questions');

    // Mevcut soruları kontrol et
    const existingCount = await collection.countDocuments();
    console.log(`📊 Mevcut soru sayısı: ${existingCount}`);

    if (existingCount > 0) {
      console.log('⚠️  Veritabanında zaten sorular var.');
      console.log('Mevcut soruları silmek için aşağıdaki komutu çalıştırın:');
      console.log('await collection.deleteMany({});');
      return;
    }

    // Soruları MongoDB formatına dönüştür
    const questionsToUpload = sampleData.map((question, index) => ({
      ...question,
      _id: question.id || `question_${Date.now()}_${index}`, // MongoDB _id alanı
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    console.log(`📝 ${questionsToUpload.length} soru yükleniyor...`);

    // Soruları yükle
    const result = await collection.insertMany(questionsToUpload);
    
    console.log(`✅ ${result.insertedCount} soru başarıyla yüklendi!`);
    console.log(`📊 Toplam soru sayısı: ${await collection.countDocuments()}`);

    // İstatistikler
    const stats = await collection.aggregate([
      {
        $group: {
          _id: null,
          totalQuestions: { $sum: 1 },
          tytQuestions: { $sum: { $cond: [{ $eq: ['$examType', 'TYT'] }, 1, 0] } },
          aytQuestions: { $sum: { $cond: [{ $eq: ['$examType', 'AYT'] }, 1, 0] } },
          ydtQuestions: { $sum: { $cond: [{ $eq: ['$examType', 'YDT'] }, 1, 0] } },
          pastQuestions: { $sum: { $cond: ['$isPastQuestion', 1, 0] } },
          subjects: { $addToSet: '$subject' }
        }
      }
    ]).toArray();

    if (stats.length > 0) {
      const stat = stats[0];
      console.log('\n📈 Yüklenen Soruların İstatistikleri:');
      console.log(`   Toplam Soru: ${stat.totalQuestions}`);
      console.log(`   TYT Soruları: ${stat.tytQuestions}`);
      console.log(`   AYT Soruları: ${stat.aytQuestions}`);
      console.log(`   YDT Soruları: ${stat.ydtQuestions}`);
      console.log(`   Çıkmış Sorular: ${stat.pastQuestions}`);
      console.log(`   Dersler: ${stat.subjects.join(', ')}`);
    }

  } catch (error) {
    console.error('❌ Hata oluştu:', error);
    console.error('Hata detayları:', error.message);
    
    if (error.message.includes('authentication')) {
      console.error('\n🔐 Kimlik doğrulama hatası!');
      console.error('MongoDB Atlas\'ta kullanıcı adı ve şifrenizi kontrol edin.');
    } else if (error.message.includes('ENOTFOUND')) {
      console.error('\n🌐 Bağlantı hatası!');
      console.error('MongoDB Atlas connection string\'inizi kontrol edin.');
    }
  } finally {
    await client.close();
    console.log('🔌 MongoDB bağlantısı kapatıldı');
  }
}

// Script'i çalıştır
console.log('🚀 Soru yükleme işlemi başlatılıyor...');
console.log('📋 Yüklenecek soru sayısı:', sampleData.length);
console.log('');

uploadQuestions().catch(console.error);
