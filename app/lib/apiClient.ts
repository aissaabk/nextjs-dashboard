import crypto from "crypto-js";

interface ApiConfig {
  baseUrl: string;
  appKey: string;
  appSecret: string;
}

interface ApiParams {
  code: string;
  uuid: string;
}

export const generateSignedUrl = (
  config: ApiConfig,
  apiName: string,
  params: ApiParams
): string => {
  const timestamp = Date.now().toString();

  // Create the signature string
  const queryParams = {
    app_key: config.appKey,
    timestamp: timestamp,
    sign_method: "sha256",
    ...params,
  };

  // Sort parameters by key and create the string for hashing
  const sortedParams = Object.keys(queryParams)
    .sort()
    .map((key) => `${key}=${queryParams[key]}`)
    .join("&");

  const signString = `${config.appSecret}${sortedParams}${config.appSecret}`;
  const signature = crypto.SHA256(signString).toString(crypto.enc.Hex);

  // Add signature to query parameters
  const signedParams = {
    ...queryParams,
    sign: signature,
  };

  // Build the full URL
  const queryString = Object.keys(signedParams)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(signedParams[key])}`)
    .join("&");

  return `${config.baseUrl}${apiName}?${queryString}`;
};
