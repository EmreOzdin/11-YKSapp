const { MongoClient } = require('mongodb');

// 🔧 MONGODB ATLAS CONNECTION STRING'İNİ BURAYA GİRİN
const uri = "mongodb+srv://yksapp_user:yksapp123456@cluster0.i7uic8g.mongodb.net/yksapp?retryWrites=true&w=majority&appName=Cluster0";

async function testConnection() {
  const client = new MongoClient(uri);

  try {
    console.log('🔗 MongoDB bağlantısı test ediliyor...');
    await client.connect();
    console.log('✅ MongoDB\'ye başarıyla bağlandı!');

    const database = client.db('yksapp');
    const collection = database.collection('questions');

    // Collection'ı kontrol et
    const count = await collection.countDocuments();
    console.log(`📊 Veritabanında ${count} soru bulunuyor`);

    if (count > 0) {
      // Örnek bir soru göster
      const sampleQuestion = await collection.findOne();
      console.log('\n📝 Örnek Soru:');
      console.log(`   Soru: ${sampleQuestion.questionText.substring(0, 50)}...`);
      console.log(`   Ders: ${sampleQuestion.subject}`);
      console.log(`   Sınav Tipi: ${sampleQuestion.examType}`);
    }

    console.log('\n🎉 MongoDB bağlantısı başarılı! Soruları yükleyebilirsiniz.');

  } catch (error) {
    console.error('❌ Bağlantı hatası:', error.message);
    
    if (error.message.includes('authentication')) {
      console.error('\n🔐 Kimlik doğrulama hatası!');
      console.error('MongoDB Atlas\'ta kullanıcı adı ve şifrenizi kontrol edin.');
    } else if (error.message.includes('ENOTFOUND')) {
      console.error('\n🌐 Bağlantı hatası!');
      console.error('MongoDB Atlas connection string\'inizi kontrol edin.');
    }
  } finally {
    await client.close();
  }
}

testConnection();
