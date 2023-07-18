import axios from 'axios';
const SERVER_URL = 'https://language-api-sogu.onrender.com/api';

export default class ApiServerClient {
  static getRandomWord() {
    const url = `${SERVER_URL}/words/random`
    return axios.get(url);
  }
  static getReviewQuestions(amount) {
    if (amount === undefined) {
      amount = 1
    } else if (amount > 20) {
      amount = 20
    }
    const url = `${SERVER_URL}/review/${amount}`
    return axios.get(url);
  }
}