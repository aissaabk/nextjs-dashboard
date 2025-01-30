import { generateSignedUrl } from "@app/lib/apiClient";

const fetchData = async () => {
  const apiConfig = {
    baseUrl: "https://example.com",
    appKey: "12345678",
    appSecret: "your-app-secret",
  };

  const params = {
    code: "0_2DL4DV3jcU1UOT7WGI1A4rY91",
    uuid: "uuid",
  };

  const url = generateSignedUrl(apiConfig, "/auth/token/security/create", params);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  });

  const data = await response.json();
  console.log(data);
};

export default function HomePage() {
  React.useEffect(() => {
    fetchData();
  }, []);

  return <div>Check the console for API response!</div>;
}
