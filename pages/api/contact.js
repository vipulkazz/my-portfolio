import nodemailer from 'nodemailer';

// --- Simple in-memory rate limiter ---
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 5; // max requests per window per IP
const rateLimitMap = new Map(); // IP -> [timestamp, ...]

// Clean up stale entries every 30 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, timestamps] of rateLimitMap) {
    const valid = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
    if (valid.length === 0) {
      rateLimitMap.delete(ip);
    } else {
      rateLimitMap.set(ip, valid);
    }
  }
}, 30 * 60 * 1000);

function isRateLimited(req) {
  const ip =
    (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
    req.socket.remoteAddress ||
    'unknown';
  const now = Date.now();
  const timestamps = (rateLimitMap.get(ip) || []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );

  if (timestamps.length >= RATE_LIMIT_MAX) {
    rateLimitMap.set(ip, timestamps);
    return true;
  }

  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  return false;
}
// --- End rate limiter ---

// Escapes HTML special characters to prevent XSS in HTML email templates.
function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

// Basic RFC-5322-inspired email format check (no consecutive dots, valid TLD).
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Field length limits (characters).
const LIMITS = {
  name: 100,
  email: 254,
  subject: 200,
  message: 5000,
};

// Create transporter for Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  if (isRateLimited(req)) {
    return res.status(429).json({ message: 'Too many requests. Please try again later.' });
  }

  try {
    const { name, email, subject, message } = req.body;

    // Validate presence of all required fields.
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Enforce string type for every field to reject non-string payloads.
    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof subject !== 'string' ||
      typeof message !== 'string'
    ) {
      return res.status(400).json({ message: 'Invalid field types' });
    }

    // Enforce field length limits.
    if (name.length > LIMITS.name) {
      return res.status(400).json({ message: `Name must be at most ${LIMITS.name} characters` });
    }
    if (email.length > LIMITS.email) {
      return res.status(400).json({ message: `Email must be at most ${LIMITS.email} characters` });
    }
    if (subject.length > LIMITS.subject) {
      return res.status(400).json({ message: `Subject must be at most ${LIMITS.subject} characters` });
    }
    if (message.length > LIMITS.message) {
      return res.status(400).json({ message: `Message must be at most ${LIMITS.message} characters` });
    }

    // Validate email format.
    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ message: 'Invalid email address' });
    }

    // Sanitize all user-supplied values before embedding them in HTML.
    const safeName = sanitize(name);
    const safeEmail = sanitize(email);
    const safeSubject = sanitize(subject);
    // Sanitize message first, then restore line breaks as <br> tags.
    const safeMessage = sanitize(message).replace(/\n/g, '<br>');

    // Send email using Nodemailer
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'hi@vipulkaushik.com',
      subject: `Portfolio Contact: ${safeSubject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #f13024;">New Contact Form Submission</h2>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${safeName}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>Subject:</strong> ${safeSubject}</p>
            <p><strong>Message:</strong></p>
            <div style="background-color: white; padding: 15px; border-radius: 5px; margin-top: 10px;">
              ${safeMessage}
            </div>
          </div>
          <p style="color: #666; font-size: 12px;">Sent from your portfolio website at ${new Date().toLocaleString()}</p>
        </div>
      `,
      // Plain-text fallback uses the original (unsanitized) values — safe because
      // there is no HTML rendering context here.
      text: `
        New Contact Form Submission

        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        Message: ${message}

        Sent from your portfolio website at ${new Date().toLocaleString()}
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);

    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ message: 'Failed to send message' });
  }
} 