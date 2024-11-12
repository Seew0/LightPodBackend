function getRandomElement(arr: string[]) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  
export function generateSlug() {
    const adjectives = [
      'admiring', 'adoring', 'agitated', 'amazing', 'angry', 'awesome',
      'blissful', 'bold', 'brave', 'busy', 'charming', 'clever',
      'cool', 'crazy', 'dazzling', 'determined', 'dreamy', 'eager',
      'ecstatic', 'elated', 'elegant', 'epic', 'exciting', 'fervent',
      'frosty', 'gallant', 'goofy', 'gracious', 'happy', 'heroic',
      'hopeful', 'hungry', 'infallible', 'inspiring', 'intelligent', 
      'jolly', 'jovial', 'keen', 'kind', 'laughing', 'loving',
      'mystifying', 'naughty', 'nervous', 'nifty', 'nostalgic',
      'optimistic', 'peaceful', 'practical', 'priceless', 'quirky',
      'relaxed', 'reverent', 'romantic', 'sad', 'serene', 'sharp',
      'silly', 'sleepy', 'stoic', 'stupefied', 'suspicious',
      'tender', 'thirsty', 'trusting', 'vibrant', 'vigilant', 'wonderful',
      'zealous', 'zen'
    ];
  
    const names = [
      'albattani', 'allen', 'almeida', 'archimedes', 'ardinghelli', 'babbage',
      'banach', 'bardeen', 'bartik', 'bell', 'bhabha', 'bhaskara', 'blackwell',
      'bohr', 'bosch', 'boyd', 'brahmagupta', 'brattain', 'brown', 'carson',
      'colden', 'cori', 'cray', 'curie', 'darwin', 'davinci', 'einstein',
      'elion', 'engelbart', 'euclid', 'fermat', 'fermi', 'feynman', 'franklin',
      'galileo', 'gates', 'goldstine', 'goodall', 'haibt', 'hamilton', 'hawking',
      'heisenberg', 'hoover', 'hopper', 'hugle', 'hypatia', 'jang', 'jennings',
      'jepsen', 'joliot', 'jones', 'kalam', 'kare', 'keller', 'khorana', 'kilby',
      'kirch', 'knuth', 'kowalevski', 'lalande', 'lamarr', 'leakey', 'lichterman',
      'lovelace', 'lumiere', 'mahavira', 'mayer', 'mccarthy', 'mcclintock',
      'mclean', 'mcnulty', 'meitner', 'mestorf', 'minsky', 'mirzakhani', 'moore',
      'morse', 'newton', 'nobel', 'noether', 'northcutt', 'noyce', 'panini',
      'pare', 'pasteur', 'payne', 'perlman', 'pike', 'poincare', 'poitras',
      'ptolemy', 'raman', 'ramanujan', 'ride', 'ritchie', 'roentgen', 'rosalind',
      'saha', 'sammet', 'shaw', 'shirley', 'shockley', 'sinoussi', 'snyder',
      'spence', 'stallman', 'stonebraker', 'swartz', 'swirles', 'tesla', 'tharp',
      'thompson', 'torvalds', 'turing', 'varahamihira', 'visvesvaraya', 'volhard',
      'wescoff', 'wilbur', 'williams', 'wilson', 'wing', 'wozniak', 'wright',
      'yalow', 'yonath'
    ];
  
    const adjective = getRandomElement(adjectives);
    const name = getRandomElement(names);
    
    return `${adjective}_${name}`;
  }
    