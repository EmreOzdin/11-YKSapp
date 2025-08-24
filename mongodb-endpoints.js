// MongoDB Atlas App Services - API Endpoints
// Bu kodları MongoDB Atlas App Services'te kullanın

// ========================================
// 1. TÜM SORULARI GETİR
// ========================================
// Endpoint: /questions
// Method: GET

exports.getAllQuestions = async function(payload, response) {
  const collection = context.services.get("mongodb-atlas").db("yksapp").collection("questions");
  
  try {
    const questions = await collection.find({}).toArray();
    
    return {
      success: true,
      data: questions,
      count: questions.length
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

// ========================================
// 2. SINAV TİPİNE GÖRE SORULAR
// ========================================
// Endpoint: /questions/exam-type/{examType}
// Method: GET

exports.getQuestionsByExamType = async function(payload, response) {
  const { examType } = payload.query;
  const collection = context.services.get("mongodb-atlas").db("yksapp").collection("questions");
  
  try {
    const questions = await collection.find({ examType: examType }).toArray();
    
    return {
      success: true,
      data: questions,
      count: questions.length
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

// ========================================
// 3. DERSE GÖRE SORULAR
// ========================================
// Endpoint: /questions/subject/{subject}
// Method: GET

exports.getQuestionsBySubject = async function(payload, response) {
  const { subject } = payload.query;
  const collection = context.services.get("mongodb-atlas").db("yksapp").collection("questions");
  
  try {
    const questions = await collection.find({ subject: subject }).toArray();
    
    return {
      success: true,
      data: questions,
      count: questions.length
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

// ========================================
// 4. ÇIKMIŞ SORULAR
// ========================================
// Endpoint: /questions/past
// Method: GET

exports.getPastQuestions = async function(payload, response) {
  const collection = context.services.get("mongodb-atlas").db("yksapp").collection("questions");
  
  try {
    const questions = await collection.find({ isPastQuestion: true }).toArray();
    
    return {
      success: true,
      data: questions,
      count: questions.length
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

// ========================================
// 5. YILA GÖRE ÇIKMIŞ SORULAR
// ========================================
// Endpoint: /questions/past/year/{year}
// Method: GET

exports.getPastQuestionsByYear = async function(payload, response) {
  const { year } = payload.query;
  const collection = context.services.get("mongodb-atlas").db("yksapp").collection("questions");
  
  try {
    const questions = await collection.find({ 
      isPastQuestion: true, 
      year: parseInt(year) 
    }).toArray();
    
    return {
      success: true,
      data: questions,
      count: questions.length
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

// ========================================
// 6. SINAV TİPİNE GÖRE ÇIKMIŞ SORULAR
// ========================================
// Endpoint: /questions/past/exam-type/{examType}
// Method: GET

exports.getPastQuestionsByExamType = async function(payload, response) {
  const { examType } = payload.query;
  const collection = context.services.get("mongodb-atlas").db("yksapp").collection("questions");
  
  try {
    const questions = await collection.find({ 
      isPastQuestion: true, 
      examType: examType 
    }).toArray();
    
    return {
      success: true,
      data: questions,
      count: questions.length
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

// ========================================
// 7. KONUYA GÖRE SORULAR
// ========================================
// Endpoint: /questions/topic/{topic}
// Method: GET

exports.getQuestionsByTopic = async function(payload, response) {
  const { topic } = payload.query;
  const collection = context.services.get("mongodb-atlas").db("yksapp").collection("questions");
  
  try {
    const questions = await collection.find({ topic: topic }).toArray();
    
    return {
      success: true,
      data: questions,
      count: questions.length
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

// ========================================
// 8. ZORLUK SEVİYESİNE GÖRE SORULAR
// ========================================
// Endpoint: /questions/difficulty/{difficulty}
// Method: GET

exports.getQuestionsByDifficulty = async function(payload, response) {
  const { difficulty } = payload.query;
  const collection = context.services.get("mongodb-atlas").db("yksapp").collection("questions");
  
  try {
    const questions = await collection.find({ difficulty: parseInt(difficulty) }).toArray();
    
    return {
      success: true,
      data: questions,
      count: questions.length
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

// ========================================
// 9. RASTGELE SORULAR
// ========================================
// Endpoint: /questions/random?count={count}
// Method: GET

exports.getRandomQuestions = async function(payload, response) {
  const { count = 10 } = payload.query;
  const collection = context.services.get("mongodb-atlas").db("yksapp").collection("questions");
  
  try {
    const questions = await collection.aggregate([
      { $sample: { size: parseInt(count) } }
    ]).toArray();
    
    return {
      success: true,
      data: questions,
      count: questions.length
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

// ========================================
// 10. SORU ARAMA
// ========================================
// Endpoint: /questions/search?q={searchTerm}
// Method: GET

exports.searchQuestions = async function(payload, response) {
  const { q } = payload.query;
  const collection = context.services.get("mongodb-atlas").db("yksapp").collection("questions");
  
  try {
    const questions = await collection.find({
      $text: { $search: q }
    }).toArray();
    
    return {
      success: true,
      data: questions,
      count: questions.length
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

// ========================================
// 11. SAĞLIK KONTROLÜ
// ========================================
// Endpoint: /health
// Method: GET

exports.healthCheck = async function(payload, response) {
  try {
    const collection = context.services.get("mongodb-atlas").db("yksapp").collection("questions");
    const count = await collection.countDocuments();
    
    return {
      success: true,
      status: "healthy",
      message: "MongoDB connection successful",
      questionCount: count
    };
  } catch (error) {
    return {
      success: false,
      status: "unhealthy",
      error: error.message
    };
  }
};
