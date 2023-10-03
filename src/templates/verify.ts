export const otptemp = function (otp: number) {
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OTP Email</title>
    </head>
    <body style="font-family: Arial, sans-serif; padding: 20px;">
        <h1>OTP Verification</h1>
        <p>Your One-Time Password (OTP) for verification is:</p>
        <h2>${otp}</h2>
        <p>This OTP will expire in 10 minutes.</p>
        <p>If you did not request this OTP, please ignore this email.</p>
        <p>Thank you for using our service.</p>
    </body>
    </html>
    `;

    return html;
};