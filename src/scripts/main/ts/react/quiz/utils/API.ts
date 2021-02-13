import { TResponse } from "../createReactApp";

export async function getQuestions(url: string, testID: string): Promise<TResponse | undefined> {
  return await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ testID: testID }),
  }).then(response => {
    if (response.status === 200) {
      return response.json();
    } else {
      console.warn(`Fetch error for url`, url);
      console.warn(`Fetch error. Status`, response.status);
      return undefined;
    }
  });
}

export async function getTestResult(url: string, testID: string | null, result: number) {
  return await fetch(url, {
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache', 
    credentials: 'same-origin', 
    referrerPolicy: 'no-referrer', 
    // headers: {
    //     'Content-Type': 'application/json'
    // },
    body: JSON.stringify({
      id: testID,
      result: result,
    }),
  });
}