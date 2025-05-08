exports.PasswordResetEmail = (firstName, resetLink ) => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password | Study Notion</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 30px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
          }
          h2 {
            color: #333;
          }
          p {
            color: #555;
            font-size: 16px;
          }
          .button {
            display: inline-block;
            background: #007bff;
            color: #ffffff;
            text-decoration: none;
            padding: 12px 20px;
            border-radius: 5px;
            font-size: 16px;
            font-weight: bold;
            margin-top: 20px;
          }
          .button:hover {
            background: #0056b3;
          }
          .footer {
            font-size: 14px;
            color: #777;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Password Reset Request</h2>
          <p>Hi ${firstName},</p>
          <p>We received a request to reset your password for your Study Notion account. Click the button below to set a new password:</p>
          <a href="${resetLink}" class="button">Reset Password</a>
          <p>If you didn’t request this, you can safely ignore this email.</p>
          <p>Alternatively, you can copy and paste the following link into your browser:</p>
          <p><a href="${resetLink}" style="word-break: break-all;">${resetLink}</a></p>
          <p class="footer">If you need any help, feel free to contact our support team.</p>
          <p class="footer">– The Study Notion Team</p>
        </div>
      </body>
      </html>
    `;
  };
  