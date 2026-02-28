export const getOwnerEmailTemplate = (formData) => {
  const { name, email, subject, message } = formData;
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        .container {
          background-color: #080812;
          color: #ffffff;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding: 40px;
          border-radius: 20px;
          max-width: 600px;
          margin: 0 auto;
          border: 1px solid #1e293b;
        }
        .header {
          border-bottom: 2px solid #00ffff;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .header h1 {
          color: #00ffff;
          font-size: 24px;
          margin: 0;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        .info-grid {
          display: grid;
          gap: 15px;
          margin-bottom: 30px;
        }
        .info-item {
          background: rgba(255, 255, 255, 0.03);
          padding: 15px;
          border-radius: 12px;
          border-left: 3px solid #a855f7;
        }
        .label {
          color: #94a3b8;
          font-size: 12px;
          text-transform: uppercase;
          margin-bottom: 5px;
        }
        .value {
          color: #e2e8f0;
          font-size: 16px;
          font-weight: 600;
        }
        .message-box {
          background: rgba(0, 255, 255, 0.02);
          padding: 20px;
          border-radius: 12px;
          border: 1px solid rgba(0, 255, 255, 0.1);
          line-height: 1.6;
          color: #cbd5e1;
        }
        .footer {
          margin-top: 40px;
          text-align: center;
          font-size: 12px;
          color: #64748b;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Neural Inquiry</h1>
        </div>
        
        <div class="info-grid">
          <div class="info-item">
            <div class="label">From</div>
            <div class="value">${name}</div>
          </div>
          <div class="info-item">
            <div class="label">Email Address</div>
            <div class="value">${email}</div>
          </div>
          <div class="info-item">
            <div class="label">Subject</div>
            <div class="value">${subject}</div>
          </div>
        </div>

        <div class="label" style="margin-left: 5px;">Message Logs</div>
        <div class="message-box">
          ${message.replace(/\n/g, '<br>')}
        </div>

        <div class="footer">
          Dashboard: EverbestDev Portfolio System v2.0
        </div>
      </div>
    </body>
    </html>
  `;
};

export const getAutoResponseTemplate = (formData) => {
  const { name, subject } = formData;
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap');
        
        body {
          margin: 0;
          padding: 0;
          background-color: #030303;
        }
        .container {
          background-color: #050505;
          color: #00ffff;
          font-family: 'Space Mono', 'Courier New', monospace;
          padding: 0;
          border-radius: 4px;
          max-width: 600px;
          margin: 20px auto;
          overflow: hidden;
          border: 1px solid #00ffff;
          box-shadow: 0 0 15px rgba(0, 255, 255, 0.2);
        }
        .scanline {
          width: 100%;
          height: 2px;
          background: rgba(0, 255, 255, 0.1);
          margin-bottom: 2px;
        }
        .header {
          background-color: #00ffff;
          color: #000;
          padding: 10px 20px;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 4px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .header span {
          background: #000;
          color: #00ffff;
          padding: 2px 8px;
          font-size: 10px;
        }
        .content {
          padding: 40px;
          position: relative;
        }
        .terminal-header {
          margin-bottom: 30px;
          border-bottom: 1px solid rgba(0, 255, 255, 0.3);
          padding-bottom: 10px;
          font-size: 12px;
          opacity: 0.8;
        }
        .greeting {
          font-size: 24px;
          color: #00ffff;
          margin-bottom: 25px;
          text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
        }
        .greeting::before {
          content: "> ";
        }
        .text {
          color: #00ffaa;
          font-size: 15px;
          line-height: 1.6;
          margin-bottom: 30px;
        }
        .data-block {
          border: 1px dashed #00ffff;
          padding: 15px;
          margin-top: 20px;
          background: rgba(0, 255, 255, 0.02);
        }
        .data-line {
          display: flex;
          margin-bottom: 5px;
          font-size: 13px;
        }
        .data-label {
          color: #666;
          width: 100px;
          flex-shrink: 0;
        }
        .data-value {
          color: #fff;
        }
        .button {
          display: inline-block;
          margin-top: 30px;
          padding: 12px 30px;
          border: 1px solid #00ffff;
          color: #00ffff;
          text-decoration: none;
          font-weight: bold;
          text-transform: uppercase;
          font-size: 14px;
          transition: all 0.3s;
          background: transparent;
        }
        .glitch-text {
          position: relative;
          color: white;
          background: black;
          font-size: 12px;
          padding: 5px;
          border-bottom: 1px solid #00ffff;
        }
        .signature {
          margin-top: 50px;
          padding-top: 20px;
          border-top: 1px solid rgba(0, 255, 255, 0.2);
          color: #444;
          font-size: 11px;
          text-align: right;
        }
        .cursor {
          display: inline-block;
          width: 8px;
          height: 15px;
          background: #00ffff;
          margin-left: 5px;
          vertical-align: middle;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          ESTABLISHING CONNECTION...
          <span>SECURE_V3.0</span>
        </div>
        
        <div class="content">
          <div class="terminal-header">
            DATE: ${new Date().toLocaleDateString()}<br>
            STATUS: PACKET_RECEIVED<br>
            ENCRYPTION: ACTIVE
          </div>

          <div class="greeting">HELLO, ${name.toUpperCase()}</div>
          
          <div class="text">
            SYSTEM_LOG: TRANSMISSION RECEIVED SUCCESSFULLY. YOUR INQUIRY HAS BEEN ADDED TO THE NEURAL PROCESSING QUEUE.
          </div>

          <div class="data-block">
            <div class="data-line">
              <span class="data-label">TOPIC:</span>
              <span class="data-value">${subject.toUpperCase()}</span>
            </div>
            <div class="data-line">
              <span class="data-label">SOURCE:</span>
              <span class="data-value">PORTFOLIO_V2_CONTACT</span>
            </div>
          </div>

          <div class="text" style="margin-top:20px;">
            YOU WILL BE NOTIFIED VIA THIS CHANNEL ONCE THE ANALYSIS IS COMPLETE.<span class="cursor"></span>
          </div>

          <a href="https://everbestdev.vercel.app" class="button">ACCESS_PORTFOLIO</a>

          <div class="signature">
            // AUTHOR: EVERBESTDEV<br>
            // ROLE: SOFTWARE_ENGINEER<br>
            // END_OF_TRANSMISSION
          </div>
        </div>
      </div>
    </body>
    </html>
  `
};
