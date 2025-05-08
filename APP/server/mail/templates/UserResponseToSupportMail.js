exports.getServerSupportTeamEmailTemplate = (firstName, lastName, email, phoneNumber, message) => {
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
                    background-color: #333333;
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
                    color: #333;
                }
                .footer {
                    background-color: #f4f7fc;
                    text-align: center;
                    padding: 15px;
                    font-size: 12px;
                    color: #888888;
                }
                .footer a {
                    color: #333;
                    text-decoration: none;
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
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>New Query Submitted – Study Notion Support</h1>
                </div>
                <div class="content">
                    <p>Hello Support Team,</p>
                    <p>You have received a new query from a user. Below are the details provided:</p>
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
                    <p>Please respond to the user's query as soon as possible. You can reply to their email directly at <a href="mailto:${email}">${email}</a>.</p>
                    <p>If you need any more details, feel free to check their profile or reach out to them directly.</p>
                    <a href="mailto:${email}" class="cta-button">Respond to Query</a>
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
