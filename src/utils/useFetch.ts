export default async function customFetch(url: string, data: any) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

  const config = {
    ...data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      key: process.env.NEXT_PUBLIC_API_KEY,
      ...(data.headers || {}),
    },
  };

  try {
    const res: any = await fetch(baseUrl + url, config);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
}
