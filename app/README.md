<!-- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify -->

### Deploying to S3 with Cloudfront and ensuring security with Lambda Function.

1 - Create a Lambda Function
2 - Use following Lambda function code:

```javascript
"use strict";

exports.handler = async (event, context, callback) => {
  const response = event.Records[0].cf.response;
  const headers = response.headers;

  headers["Strict-Transport-Security"] = [
    {
      key: "Strict-Transport-Security",
      value: "max-age=63072000; includeSubDomains; preload",
    },
  ];

  headers["X-XSS-Protection"] = [
    {
      key: "X-XSS-Protection",
      value: "1; mode=block",
    },
  ];

  headers["X-Content-Type-Options"] = [
    {
      key: "X-Content-Type-Options",
      value: "nosniff",
    },
  ];

  headers["X-Frame-Options"] = [
    {
      key: "X-Frame-Options",
      value: "SAMEORIGIN",
    },
  ];

  headers["Referrer-Policy"] = [
    { key: "Referrer-Policy", value: "no-referrer-when-downgrade" },
  ];

  headers["Content-Security-Policy"] = [
    {
      key: "Content-Security-Policy",
      value: "upgrade-insecure-requests;",
    },
  ];

  // Craft the Feature Policy params based on your needs.
  // The settings below are very restrictive and might produce undesiderable results
  headers["Feature-Policy"] = [
    {
      key: "Feature-Policy",
      value:
        "geolocation none; midi none; notifications none; push none; sync-xhr none; microphone none; camera none; magnetometer none; gyroscope none; speaker self; vibrate none; fullscreen self; payment none;",
    },
  ];

  // The Expect-CT header is still experimental. Uncomment the code only if you have a report-uri
  // You may refer to report-uri.com to setup an account and set your own URI
  // headers['Expect-CT'] = [{
  //     key: 'Expect-CT',
  //     value: 'max-age=86400, enforce, report-uri="https://{{ your_subdomain }}report-uri.com/r/d/ct/enforce'",
  // }];
  callback(null, response);
};
```

--> More info: follow guide:https://medium.com/faun/hardening-the-http-security-headers-with-aws-lambda-edge-and-cloudfront-2e2da1ae4d83
