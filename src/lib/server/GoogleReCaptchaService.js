import { env } from "$env/dynamic/private";

export const isBot = async (captchaToken, userIp) =>
{
    const postData = new URLSearchParams();
    postData.append('secret', env.RECAPTCHA_SECRET_KEY);
    postData.append('response', captchaToken);
    postData.append('remoteip', userIp);
    
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: postData
    };

    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', options); 
    const responseBody = await response.json();
    return !responseBody.success;
}