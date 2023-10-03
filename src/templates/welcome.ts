export const welcometemp = function (username: string): string {
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome Email</title>
    </head>
    <body style="font-family: Arial, sans-serif; padding: 20px;">
        <h1>Dear, ${username}!</h1>
        <p>Thank you for joining our service. We're excited to have you on board.</p>
        <p>If you have any questions or need assistance, feel free to contact our support team.</p>
        <p>Best regards,</p>
        <p>Your Service Team</p>
    </body>
    </html>
    `;

    return html;
};