exports.getUserConfirmationEmailTemplate = (firstName, lastName, email, phoneNumber, message) => {
    return (
        `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f7fc;
                }
                .container {
                    width: 100%;
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                }
                .header {
                    background-color: #3a8dff;
                    color: #ffffff;
                    padding: 40px 20px;
                    text-align: center;
                    border-top-left-radius: 8px;
                    border-top-right-radius: 8px;
                }
                .header h1 {
                    margin: 0;
                    font-size: 26px;
                    font-weight: bold;
                }
                .content {
                    padding: 30px;
                    font-size: 16px;
                    color: #333;
                    line-height: 1.6;
                }
                .highlight {
                    font-weight: bold;
                    color: #3a8dff;
                }
                .icon {
                    font-size: 50px;
                    color: #3a8dff;
                    margin-bottom: 15px;
                }
                .cta-button {
                    display: inline-block;
                    padding: 12px 25px;
                    background-color: #3a8dff;
                    color: #ffffff;
                    border-radius: 4px;
                    text-decoration: none;
                    font-weight: bold;
                    margin-top: 20px;
                }
                .footer {
                    background-color: #f4f7fc;
                    text-align: center;
                    padding: 15px;
                    font-size: 12px;
                    color: #888888;
                }
                .footer a {
                    color: #3a8dff;
                    text-decoration: none;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Thank You for Reaching Out!</h1>
                    <i class="icon">&#128522;</i>
                </div>
                <div class="content">
                    <p>Hi <span class="highlight">${firstName} ${lastName}</span>,</p>
                    <p>Thank you for submitting your query. We’ve successfully received your message and our team is working on it. Below are the details you’ve provided:</p>
                    <table style="width:100%; margin-top: 20px; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 8px; border-bottom: 1px solid #ddd;">Full Name:</td>
                            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${firstName} ${lastName}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border-bottom: 1px solid #ddd;">Email:</td>
                            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${email}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border-bottom: 1px solid #ddd;">Phone Number:</td>
                            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${phoneNumber}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border-bottom: 1px solid #ddd;">Message:</td>
                            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${message}</td>
                        </tr>
                    </table>
                    <p>We value your feedback and appreciate you taking the time to reach out. Our team will get back to you shortly.</p>
                    <p>If you need immediate assistance, feel free to visit our <a href="https://www.studynotion.com/support">Support Center</a>.</p>
                    <p>If you’d like to make any changes to your submission or have additional details to share, click the button below to update your message:</p>
                    <a href="mailto:${email}" class="cta-button">Update Your Message</a>
                </div>
                <div class="footer">
                    <p>&copy; 2025 Study Notion | Empowering Your Learning Journey</p>
                    <p>Need help? Visit <a href="https://www.studynotion.com/support">Support Center</a></p>
                </div>
            </div>
        </body>
        </html>`
    );
};
