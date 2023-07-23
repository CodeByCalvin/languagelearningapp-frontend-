// fisher-yates shuffle algorithm
  export const shuffleQuestions = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      // i = 3
      const randomIndex = Math.floor(Math.random() * (i + 1)); // 0.1 to 3.6 => 0 to 3
      // make array[i] equal to array[randomIndex] and array[randomIndex] equal to array[i]
      [array[i], array[randomIndex]] = [array[randomIndex], array[i]]; // [array[3], array[2]] = [array[2], array[3]]
    }
    return array;
  };
