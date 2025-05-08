exports.generatePurchaseConfirmationEmail = (userName, amount, orderId ) => {
    return `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
        <div style="max-width: 600px; margin: auto; background-color: white; padding: 30px; border-radius: 8px;">
          <h2 style="color: #333;">Hello ${userName},</h2>
          <p>Thank you for your purchase!</p>
          <p>We’re happy to confirm that your order <strong>#${orderId}</strong> has been completed successfully.</p>
          <p><strong>Amount Paid:</strong> ₹${amount}</p>
          <p>We hope you enjoy your purchase. If you have any questions, feel free to contact our support team.</p>
          <br/>
          <p>Best regards,</p>
          <p><strong>STUDY NOTION</strong></p>
        </div>
      </div>
    `;
  }
  