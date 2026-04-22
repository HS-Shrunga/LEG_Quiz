export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: 'Computer Fundamentals' | 'Math' | 'Mental Ability';
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
    // 40% Computer Fundamentals (4 questions)
    {
      id: 'c1',
      category: 'Computer Fundamentals',
      text: 'What does "CNN" stand for in Deep Learning?',
      options: ['Central Neural Network', 'Convolutional Neural Network', 'Computer Node Network', 'Circular Neural Node'],
      correctAnswer: 1,
      explanation: 'CNN stands for Convolutional Neural Network, primarily used for image processing.'
    },
    {
      id: 'c2',
      category: 'Computer Fundamentals',
      text: 'Which of the following is a "NoSQL" database?',
      options: ['PostgreSQL', 'MySQL', 'MongoDB', 'Oracle'],
      correctAnswer: 2,
      explanation: 'MongoDB is a document-oriented NoSQL database.'
    },
    {
      id: 'c3',
      category: 'Computer Fundamentals',
      text: 'In Python, which keyword is used to create a function?',
      options: ['func', 'define', 'def', 'function'],
      correctAnswer: 2,
      explanation: 'The "def" keyword is used to define a function in Python.'
    },
    {
      id: 'c4',
      category: 'Computer Fundamentals',
      text: 'What is the primary purpose of an Operating System?',
      options: ['Spreadsheet calculations', 'Hardware management', 'Web browsing', 'Creating presentations'],
      correctAnswer: 1,
      explanation: 'An OS manages computer hardware and software resources.'
    },
    // 30% Math (3 questions)
    {
      id: 'm1',
      category: 'Math',
      text: 'What is the median of the data set: [2, 4, 6, 8, 10]?',
      options: ['4', '6', '8', '5'],
      correctAnswer: 1,
      explanation: 'The median is the middle value in a sorted list, which is 6.'
    },
    {
      id: 'm2',
      category: 'Math',
      text: 'If a dice is rolled, what is the probability of getting a 4?',
      options: ['1/2', '1/3', '1/6', '1/4'],
      correctAnswer: 2,
      explanation: 'A dice has 6 sides, so the probability of any side is 1/6.'
    },
    {
      id: 'm3',
      category: 'Math',
      text: 'What is the value of 2^5?',
      options: ['10', '16', '32', '64'],
      correctAnswer: 2,
      explanation: '2 raised to the power of 5 is 32.'
    },
    // 30% Mental Ability (3 questions)
    {
      id: 'l1',
      category: 'Mental Ability',
      text: 'Complete the pattern: 2, 4, 8, 16, ?',
      options: ['20', '24', '32', '30'],
      correctAnswer: 2,
      explanation: 'The sequence doubles each time: 16 * 2 = 32.'
    },
    {
      id: 'l2',
      category: 'Mental Ability',
      text: 'If RED is 27, what is BLUE?',
      options: ['40', '42', '38', '36'],
      correctAnswer: 0,
      explanation: 'R=18, E=5, D=4 (Sum=27). B=2, L=12, U=21, E=5 (Sum=40).'
    },
    {
      id: 'l3',
      category: 'Mental Ability',
      text: 'A is the father of B, but B is not the son of A. What is B to A?',
      options: ['Cousin', 'Daughter', 'Nephew', 'Brother'],
      correctAnswer: 1,
      explanation: 'If B is not the son, B must be the daughter.'
    }
  ]
};

export const leaderboardData = [
  { id: 1, name: 'Alex Rivera', score: 950, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' },
  { id: 2, name: 'Sarah Chen', score: 920, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
  { id: 3, name: 'Michael Ross', score: 890, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael' },
  { id: 4, name: 'Elena Gilbert', score: 850, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena' },
  { id: 5, name: 'David Kim', score: 820, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David' },
];
