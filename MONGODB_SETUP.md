# MongoDB Atlas Kurulum Rehberi

Bu rehber, YKS App için MongoDB Atlas bağlantısını kurmanızı sağlar.

## 1. MongoDB Atlas Hesabı Oluşturma

1. [MongoDB Atlas](https://www.mongodb.com/atlas) sitesine gidin
2. "Try Free" butonuna tıklayın
3. Hesap oluşturun ve giriş yapın

## 2. Cluster Oluşturma

1. "Build a Database" butonuna tıklayın
2. "Shared" seçeneğini seçin (ücretsiz)
3. Cloud provider ve region seçin (AWS, Google Cloud, Azure)
4. Cluster name'i "yksapp-cluster" olarak ayarlayın
5. "Create" butonuna tıklayın

## 3. Database User Oluşturma

1. "Database Access" sekmesine gidin
2. "Add New Database User" butonuna tıklayın
3. Username: `yksapp-user`
4. Password: Güçlü bir şifre oluşturun
5. Database User Privileges: "Read and write to any database" seçin
6. "Add User" butonuna tıklayın

## 4. Network Access Ayarlama

1. "Network Access" sekmesine gidin
2. "Add IP Address" butonuna tıklayın
3. "Allow Access from Anywhere" seçin (0.0.0.0/0)
4. "Confirm" butonuna tıklayın

## 5. Connection String Alma

1. "Database" sekmesine gidin
2. "Connect" butonuna tıklayın
3. "Connect your application" seçin
4. Driver: "Node.js"
5. Version: "4.1 or later"
6. Connection string'i kopyalayın

## 6. Environment Dosyasını Güncelleme

`src/config/environment.js` dosyasında MongoDB URI'yi güncelleyin:

```javascript
MONGODB: {
  URI: 'mongodb+srv://yksapp-user:YOUR_PASSWORD@yksapp-cluster.xxxxx.mongodb.net/yksapp?retryWrites=true&w=majority',
  DATABASE_NAME: 'yksapp',
},
```

## 7. Kartları MongoDB'ye Yükleme

MongoDB Atlas bağlantısı kurulduktan sonra:

```bash
npm run mongodb:upload
```

## 8. Bağlantıyı Test Etme

```bash
npm run mongodb:test
```

## Güvenlik Notları

- Production ortamında IP whitelist'i sadece gerekli IP'lerle sınırlayın
- Database user'ın sadece gerekli yetkilere sahip olduğundan emin olun
- Connection string'i environment variable olarak saklayın

## Sorun Giderme

### Bağlantı Hatası
- Network Access ayarlarını kontrol edin
- Database user bilgilerini doğrulayın
- Connection string'in doğru olduğundan emin olun

### Authentication Hatası
- Username ve password'ü kontrol edin
- Database user'ın doğru yetkilere sahip olduğundan emin olun

### Timeout Hatası
- Network bağlantınızı kontrol edin
- MongoDB Atlas cluster'ının çalıştığından emin olun
