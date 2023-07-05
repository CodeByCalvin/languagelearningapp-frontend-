import axios from 'axios';
const SERVER_URL = 'https://language-api-sogu.onrender.com/api';

export default class ApiServerClient {
  static getRandomWord() {
    const url = `${SERVER_URL}/words/random`
    return axios.get(url);
  }
  static getReviewQuestions() {
    const url = `${SERVER_URL}/review`
    return axios.get(url);
  }
}