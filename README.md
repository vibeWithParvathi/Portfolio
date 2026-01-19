A modern, responsive portfolio website showcasing my skills, projects, and professional experience. Features include animated background effects, interactive skills slider, smooth scrolling navigation, and 
a functional contact form with EmailJS integration. Built with a clean black and white design theme, fully responsive across all devices, and optimized for performance.


Complication in Protfolio:

# EmailJS Setup Instructions

To enable email functionality for your contact form, you need to set up EmailJS (free service for sending emails from static websites).

## Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for a free account (free tier allows 200 emails/month)

## Step 2: Create Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail recommended)
4. Connect your Gmail account (parvathijaya111@gmail.com)
5. Copy the **Service ID** (you'll need this)

## Step 3: Create Email Template
1. Go to "Email Templates" in EmailJS dashboard
2. Click "Create New Template"
3. Use this template structure:

**Template Name:** Contact Form
**Subject:** New Portfolio Contact: {{subject}}
**Content (HTML):**
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Message</title>
</head>
<body style="font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
    <div style="background-color: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h2 style="color: #000000; margin-top: 0; margin-bottom: 20px; font-size: 24px; border-bottom: 2px solid #000000; padding-bottom: 10px;">
            New Message from Portfolio Contact Form
        </h2>
        
        <div style="margin-bottom: 25px;">
            <p style="margin: 0 0 10px 0; color: #666666;">
                <strong style="color: #000000;">From:</strong> {{from_name}}
            </p>
            <p style="margin: 0 0 10px 0; color: #666666;">
                <strong style="color: #000000;">Email:</strong> <a href="mailto:{{from_email}}" style="color: #000000; text-decoration: none;">{{from_email}}</a>
            </p>
            <p style="margin: 0 0 10px 0; color: #666666;">
                <strong style="color: #000000;">Subject:</strong> {{subject}}
            </p>
        </div>
        
        <div style="margin-top: 25px; padding: 20px; background-color: #f9f9f9; border-left: 4px solid #000000; border-radius: 4px;">
            <h3 style="color: #000000; margin-top: 0; margin-bottom: 15px; font-size: 18px;">Message:</h3>
            <p style="margin: 0; color: #333333; white-space: pre-wrap;">{{message}}</p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px dashed #cccccc;">
            <p style="margin: 0; color: #666666; font-size: 12px;">
                <strong>Reply to:</strong> <a href="mailto:{{reply_to}}" style="color: #000000; text-decoration: none;">{{reply_to}}</a>
            </p>
            <p style="margin: 10px 0 0 0; color: #999999; font-size: 11px;">
                This message was sent from your portfolio website contact form.
            </p>
        </div>
    </div>
</body>
</html>
```

**Content (Plain Text Alternative - if HTML doesn't work):**
```
You have received a new message from your portfolio contact form.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FROM: {{from_name}}
EMAIL: {{from_email}}
SUBJECT: {{subject}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MESSAGE:
{{message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Reply to: {{reply_to}}

This message was sent from your portfolio website contact form.
```

4. Copy the **Template ID** (you'll need this)

## Step 4: Get Public Key
1. Go to "Account" → "General" in EmailJS dashboard
2. Copy your **Public Key**

## Step 5: Update script.js
Replace these values in `script.js`:

1. Line with `emailjs.init("YOUR_PUBLIC_KEY")` - Replace `YOUR_PUBLIC_KEY` with your actual public key
2. Line with `const serviceID = 'YOUR_SERVICE_ID'` - Replace `YOUR_SERVICE_ID` with your service ID
3. Line with `const templateID = 'YOUR_TEMPLATE_ID'` - Replace `YOUR_TEMPLATE_ID` with your template ID

## Testing
After setup, test the form by submitting it. You should receive an email at parvathijaya111@gmail.com.


