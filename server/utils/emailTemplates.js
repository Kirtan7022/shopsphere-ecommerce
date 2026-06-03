export const resetPasswordTemplate = (userName, resetUrl) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin:0;padding:0;background-color:#f1f5f9;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
      <div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
        <!-- Header -->
        <div style="background:linear-gradient(135deg,#4f46e5,#7c3aed,#ec4899);padding:40px 32px;text-align:center;">
          <h1 style="color:#ffffff;font-size:28px;margin:0 0 8px 0;font-weight:800;">🛒 ShopSphere</h1>
          <p style="color:rgba(255,255,255,0.8);font-size:14px;margin:0;">Password Reset Request</p>
        </div>
        <!-- Body -->
        <div style="padding:40px 32px;">
          <p style="font-size:16px;color:#334155;margin:0 0 16px 0;">Hi <strong>${userName}</strong>,</p>
          <p style="font-size:15px;color:#64748b;line-height:1.6;margin:0 0 24px 0;">
            We received a request to reset your password. Click the button below to create a new password. This link will expire in <strong>15 minutes</strong>.
          </p>
          <div style="text-align:center;margin:32px 0;">
            <a href="${resetUrl}" style="display:inline-block;background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#ffffff;text-decoration:none;padding:14px 40px;border-radius:12px;font-size:16px;font-weight:600;box-shadow:0 4px 16px rgba(79,70,229,0.3);">
              Reset Password
            </a>
          </div>
          <p style="font-size:13px;color:#94a3b8;line-height:1.5;margin:0 0 8px 0;">If you didn't request this, you can safely ignore this email.</p>
          <p style="font-size:13px;color:#94a3b8;line-height:1.5;margin:0;">Or copy this link: <br/><a href="${resetUrl}" style="color:#4f46e5;word-break:break-all;">${resetUrl}</a></p>
        </div>
        <!-- Footer -->
        <div style="background:#f8fafc;padding:24px 32px;text-align:center;border-top:1px solid #e2e8f0;">
          <p style="font-size:12px;color:#94a3b8;margin:0;">© ${new Date().getFullYear()} ShopSphere. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const passwordChangedTemplate = (userName) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin:0;padding:0;background-color:#f1f5f9;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
      <div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
        <div style="background:linear-gradient(135deg,#059669,#10b981);padding:40px 32px;text-align:center;">
          <h1 style="color:#ffffff;font-size:28px;margin:0 0 8px 0;font-weight:800;">🛒 ShopSphere</h1>
          <p style="color:rgba(255,255,255,0.8);font-size:14px;margin:0;">Password Updated Successfully</p>
        </div>
        <div style="padding:40px 32px;">
          <p style="font-size:16px;color:#334155;margin:0 0 16px 0;">Hi <strong>${userName}</strong>,</p>
          <p style="font-size:15px;color:#64748b;line-height:1.6;margin:0 0 24px 0;">
            Your password has been successfully reset. You can now log in with your new password.
          </p>
          <p style="font-size:14px;color:#ef4444;font-weight:500;margin:0;">
            If you did not make this change, please contact support immediately.
          </p>
        </div>
        <div style="background:#f8fafc;padding:24px 32px;text-align:center;border-top:1px solid #e2e8f0;">
          <p style="font-size:12px;color:#94a3b8;margin:0;">© ${new Date().getFullYear()} ShopSphere. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};
