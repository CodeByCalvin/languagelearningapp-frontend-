import axios from "axios";
const SERVER_URL = [
  "https://language-api-sogu.onrender.com",
  "http://localhost:3001",
];

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YjY3MGJmNzFjY2U0NjUyZTE1YmMxNyIsImlhdCI6MTY4OTY4ODc2OSwiZXhwIjoxNjkyMjgwNzY5fQ.DnuAWqr71gYfsx4DGFYNXPmh1Pzj6-AfGXU2uyq6VSA";

export default class ApiServerClient {
  static getRandomWord() {
    const url = `${SERVER_URL[0]}/api/words/random`;
    return axios.get(url);
  }
  static getReviewQuestions(amount) {
    if (amount === undefined) {
      amount = 1;
    } else if (amount > 20) {
      amount = 20;
    }
    const url = `${SERVER_URL[0]}/review/${amount}`;
    return axios.get(url);
  }
  static getLearnedWords() {
    const url = `${SERVER_URL[0]}/auth/progress/learned`;
    return axios.get(url, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }
  static getReviewedWords() {
    const url = `${SERVER_URL[0]}/auth/progress/reviewed`;
    return axios.get(url, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  static setLearnedWords(words) {
    const url = `${SERVER_URL[0]}/auth/setwordslearned`;
    return axios.post(
      url,
      { new_words: words },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
  }
}
