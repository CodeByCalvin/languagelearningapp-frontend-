import axios from 'axios';
const SERVER_URL = [
  'https://language-api-sogu.onrender.com',
  'http://localhost:3001'
];

export default class ApiServerClient {
  static getRandomWord() {
    const url = `${SERVER_URL[0]}/api/words/random`
    return axios.get(url);
  }
  static getReviewQuestions(amount) {
    if (amount === undefined) {
      amount = 1
    } else if (amount > 20) {
      amount = 20
    }
    const url = `${SERVER_URL[0]}/api/review/${amount}`
    return axios.get(url);
  }

  static async auth(action, data) {
    const url = `${SERVER_URL[1]}/auth/${action}`;
    const response = await axios.post(url, data, { withCredentials: true });
    return response.data;
  }


}