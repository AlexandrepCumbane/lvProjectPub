export class Constants {
  static stsAuthority = process.env.REACT_APP_CIAM_STS_AUTH;
  static clientId = process.env.REACT_APP_CIAM_CLIENT_ID;
  static clientRoot = process.env.REACT_APP_PUBLIC_URL;
  static clientScope = "openid email api";
  static apiRoot = process.env.REACT_APP_CIAM_STS_AUTH;
}
