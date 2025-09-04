const { MongoClient } = require('mongodb');

async function testMongoDBConnection() {
  const uri = 'mongodb://127.0.0.1:27017';
  const client = new MongoClient(uri);

  try {
    console.log('🔌 MongoDB bağlantısı test ediliyor...');
    
    await client.connect();
    console.log('✅ MongoDB bağlantısı başarılı!');
    
    const db = client.db('yksapp');
    console.log('📊 Database: yksapp');
    
    const collections = await db.listCollections().toArray();
    console.log('📁 Mevcut collections:', collections.map(c => c.name));
    
    // Test collection oluştur
    const testCollection = db.collection('test');
    await testCollection.insertOne({ test: 'data', timestamp: new Date() });
    console.log('✅ Test verisi eklendi');
    
    const testData = await testCollection.find({}).toArray();
    console.log('📋 Test verileri:', testData);
    
    // Test verisini temizle
    await testCollection.deleteMany({});
    console.log('🧹 Test verisi temizlendi');
    
  } catch (error) {
    console.error('❌ MongoDB bağlantı hatası:', error.message);
  } finally {
    await client.close();
    console.log('🔌 Bağlantı kapatıldı');
  }
}

testMongoDBConnection();
