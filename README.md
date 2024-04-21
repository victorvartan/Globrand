# About Globrand

Naming things is not easy!

Choosing a good brand name is hard enough in your local market.

But as you grow, you might find the same name that made sense locally could be horrible for another market.

Globrand helps you identify some of the pros and cons of a brand name for different languages, as well as find similar existing brand names.

# Setting up your local environment

1. Clone this repo
2. npm i
3. Add a .env file at the root of the project folder (i.e. one level higher than the src folder) with these values:
```
PUBLIC_RECAPTCHA_SITE_KEY=
RECAPTCHA_SECRET_KEY=
GEMINI_API_KEY=
```
Optionally, if you want to run the script that generates translations with the help of Google Translate API, add these values as well:
```
GOOGLE_TRANSLATE_CLIENT_EMAIL=
GOOGLE_TRANSLATE_PRIVATE_KEY=
GOOGLE_TRANSLATE_PROJECT_ID=
```
4. npm run dev

# Notes

Make sure you are in a country that has access to the Gemini API, otherwise use a VPN before using the website.

Please note that Globrand might display inaccurate info, so always double-check its responses.

By using Globrand you agree to the terms of service. Do not input any sensitive information.

Enjoy!
