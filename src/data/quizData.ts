export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: 'AI & ML Basics' | 'CS Fundamentals' | 'Aptitude';
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  image: string;
}

export const masterQuiz: Quiz = {
  id: 'master-ds-ai',
  title: 'DS & AI Foundation Challenge',
  description: 'Test your skills in Computer Science, Math, and Logic.',
  image: '/src/assets/hero-bg.png',
  questions: [
    // --- SECTION 1: AI & ML Basics (10 Questions) ---
    {
      id: 'ai1',
      category: 'AI & ML Basics',
      text: 'What is the primary goal of "Supervised Learning"?',
      options: ['Finding hidden patterns', 'Learning from labeled data', 'Playing games like Chess', 'Reducing data dimensions'],
      correctAnswer: 1,
      explanation: 'Supervised learning uses labeled datasets to train algorithms.'
    },
    {
      id: 'ai2',
      category: 'AI & ML Basics',
      text: 'Which of the following is an example of an "Unsupervised Learning" task?',
      options: ['Classification', 'Regression', 'Clustering', 'Sentiment Analysis'],
      correctAnswer: 2,
      explanation: 'Clustering is the most common unsupervised learning task.'
    },
    {
      id: 'ai3',
      category: 'AI & ML Basics',
      text: 'What does "Overfitting" mean in Machine Learning?',
      options: ['Model is too simple', 'Model performs well on training data but poorly on unseen data', 'Model is too fast', 'Model has too little data'],
      correctAnswer: 1,
      explanation: 'Overfitting happens when a model learns noise in the training data.'
    },
    {
      id: 'ai4',
      category: 'AI & ML Basics',
      text: 'Which activation function is commonly used in the hidden layers of Deep Neural Networks?',
      options: ['Sigmoid', 'Softmax', 'ReLU', 'Step'],
      correctAnswer: 2,
      explanation: 'ReLU (Rectified Linear Unit) is widely used due to its efficiency.'
    },
    {
      id: 'ai5',
      category: 'AI & ML Basics',
      text: 'What is the purpose of a "Validation Set" during model training?',
      options: ['Final evaluation', 'Training weights', 'Hyperparameter tuning', 'Data cleaning'],
      correctAnswer: 2,
      explanation: 'Validation set is used to tune hyperparameters and prevent overfitting.'
    },
    {
      id: 'ai6',
      category: 'AI & ML Basics',
      text: 'Which algorithm is typically used for "Binary Classification"?',
      options: ['K-Means', 'Logistic Regression', 'Linear Regression', 'PCA'],
      correctAnswer: 1,
      explanation: 'Logistic Regression is used for predicting categorical outcomes (0/1).'
    },
    {
      id: 'ai7',
      category: 'AI & ML Basics',
      text: 'In Deep Learning, what does a "Kernel" (or Filter) do in a CNN?',
      options: ['Connects neurons', 'Stores weights', 'Extracts features', 'Aggregates outputs'],
      correctAnswer: 2,
      explanation: 'Kernels slide over images to detect edges, shapes, and features.'
    },
    {
      id: 'ai8',
      category: 'AI & ML Basics',
      text: 'What is "Gradient Descent" used for?',
      options: ['Increasing error', 'Optimizing model weights', 'Visualizing data', 'Data labeling'],
      correctAnswer: 1,
      explanation: 'Gradient Descent is an optimization algorithm to minimize loss.'
    },
    {
      id: 'ai9',
      category: 'AI & ML Basics',
      text: 'What is "NLP" an abbreviation for?',
      options: ['Neural Layer Processing', 'Natural Logic Programming', 'Natural Language Processing', 'Network Layer Protocol'],
      correctAnswer: 2,
      explanation: 'NLP stands for Natural Language Processing.'
    },
    {
      id: 'ai10',
      category: 'AI & ML Basics',
      text: 'What is the "Black Box" problem in AI?',
      options: ['High power consumption', 'Lack of interpretability', 'Limited storage', 'High cost'],
      correctAnswer: 1,
      explanation: 'The black box problem refers to the difficulty in understanding how complex AI models reach decisions.'
    },

    // --- SECTION 2: CS Fundamentals (5 Questions) ---
    {
      id: 'cs1',
      category: 'CS Fundamentals',
      text: 'Which of the following is a "NoSQL" database?',
      options: ['PostgreSQL', 'MySQL', 'MongoDB', 'Oracle'],
      correctAnswer: 2,
      explanation: 'MongoDB is a document-oriented NoSQL database.'
    },
    {
      id: 'cs2',
      category: 'CS Fundamentals',
      text: 'What is the time complexity of searching for an element in a balanced Binary Search Tree (BST)?',
      options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'],
      correctAnswer: 1,
      explanation: 'Balanced BST search takes logarithmic time.'
    },
    {
      id: 'cs3',
      category: 'CS Fundamentals',
      text: 'Which layer of the OSI model is responsible for routing packets?',
      options: ['Data Link', 'Transport', 'Network', 'Physical'],
      correctAnswer: 2,
      explanation: 'The Network layer (Layer 3) handles routing.'
    },
    {
      id: 'cs4',
      category: 'CS Fundamentals',
      text: 'What does "ACID" stand for in Database Transactions?',
      options: ['Accuracy, Consistency, Isolation, Durability', 'Atomicity, Consistency, Isolation, Durability', 'Atomicity, Control, Integrity, Data', 'Access, Consistency, Integration, Durability'],
      correctAnswer: 1,
      explanation: 'ACID stands for Atomicity, Consistency, Isolation, and Durability.'
    },
    {
      id: 'cs5',
      category: 'CS Fundamentals',
      text: 'Which data structure follows the "First In First Out" (FIFO) principle?',
      options: ['Stack', 'Queue', 'Tree', 'Linked List'],
      correctAnswer: 1,
      explanation: 'A Queue follows FIFO.'
    },

    // --- SECTION 3: Aptitude (5 Questions) ---
    {
      id: 'ap1',
      category: 'Aptitude',
      text: 'A train 150m long is running at 60 km/h. How long will it take to pass a pole?',
      options: ['8 sec', '9 sec', '10 sec', '12 sec'],
      correctAnswer: 1,
      explanation: 'Speed = 60 * 5/18 = 50/3 m/s. Time = Distance/Speed = 150 / (50/3) = 9 sec.'
    },
    {
      id: 'ap2',
      category: 'Aptitude',
      text: 'If 3 people can build 3 chairs in 3 hours, how many hours does it take 1 person to build 1 chair?',
      options: ['1 hour', '3 hours', '9 hours', '6 hours'],
      correctAnswer: 1,
      explanation: 'The rate is 1 person-chair per 3 hours.'
    },
    {
      id: 'ap3',
      category: 'Aptitude',
      text: 'In a group of 60 students, 40% like Math. How many students do NOT like Math?',
      options: ['24', '36', '40', '30'],
      correctAnswer: 1,
      explanation: '40% like Math = 24 students. 60 - 24 = 36 do not like it.'
    },
    {
      id: 'ap4',
      category: 'Aptitude',
      text: 'What is the next number in the series: 7, 10, 15, 22, 31, ...?',
      options: ['38', '40', '42', '45'],
      correctAnswer: 2,
      explanation: 'The differences are prime numbers (or +3, +5, +7, +9... wait, 7+3=10, 10+5=15, 15+7=22, 22+9=31, 31+11=42).'
    },
    {
      id: 'ap5',
      category: 'Aptitude',
      text: 'If "APPLE" is coded as "BQQMF", how is "ORANGE" coded?',
      options: ['PSBOHF', 'PSBOHG', 'QSCOHG', 'PTCPIG'],
      correctAnswer: 0,
      explanation: 'Each letter is shifted by one (A->B, P->Q, etc.). O->P, R->S, A->B, N->O, G->H, E->F.'
    }
  ]
};

export const leaderboardData = [
  { id: 1, name: 'Alex Rivera', score: 950, college: 'Stanford University', department: 'Computer Science', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' },
  { id: 2, name: 'Sarah Chen', score: 920, college: 'MIT', department: 'Data Science', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
  { id: 3, name: 'Michael Ross', score: 890, college: 'Harvard University', department: 'AI & Machine Learning', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael' },
  { id: 4, name: 'Elena Gilbert', score: 850, college: 'UC Berkeley', department: 'Software Engineering', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena' },
  { id: 5, name: 'David Kim', score: 820, college: 'Caltech', department: 'Information Technology', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David' },
];
