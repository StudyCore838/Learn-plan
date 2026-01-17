# LearnPlan Hub - Vercel Deployment Guide

## 📦 Download

Your complete project is available for download:
**[Download Vercel Site Version](https://e1lko7sq8s.preview.c24.airoapp.ai/assets/vercel-site-version.tar.gz)**

## 🚀 Quick Deploy to Vercel

### Prerequisites
- Node.js 18+ installed
- Vercel account (free tier works)
- MySQL database (PlanetScale, Railway, or any MySQL provider)

### Step 1: Extract and Install

```bash
# Extract the archive
tar -xzf vercel-site-version.tar.gz
cd vercel-export

# Install dependencies
npm install
```

### Step 2: Set Up Database

1. **Create a MySQL database** on your preferred provider:
   - [PlanetScale](https://planetscale.com/) (Recommended - Free tier)
   - [Railway](https://railway.app/)
   - [Supabase](https://supabase.com/)

2. **Get your database connection URL** (format: `mysql://user:password@host:port/database`)

3. **Run migrations:**

```bash
# Set your database URL
export DATABASE_URL="your-mysql-connection-url"

# Generate and run migrations
npm run db:generate
npm run db:migrate
```

### Step 3: Configure Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL=your-mysql-connection-url

# OpenAI (for AI features)
OPENAI_API_KEY=your-openai-api-key

# Google Calendar (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Microsoft Outlook (Optional)
MICROSOFT_CLIENT_ID=your-microsoft-client-id
MICROSOFT_CLIENT_SECRET=your-microsoft-client-secret
MICROSOFT_TENANT_ID=common
```

### Step 4: Deploy to Vercel

#### Option A: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

#### Option B: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com/)
2. Click "Add New Project"
3. Import your Git repository (push code to GitHub first)
4. Configure:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist/client`
   - **Install Command:** `npm install`

5. Add Environment Variables in Vercel dashboard:
   - Go to Project Settings → Environment Variables
   - Add all variables from your `.env` file

6. Click "Deploy"

### Step 5: Configure OAuth Redirects (If using Calendar Sync)

#### Google Calendar:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to your OAuth credentials
3. Add authorized redirect URI:
   ```
   https://your-vercel-domain.vercel.app/api/calendar/google/callback
   ```

#### Microsoft Outlook:
1. Go to [Azure Portal](https://portal.azure.com/)
2. Navigate to your App Registration
3. Add redirect URI:
   ```
   https://your-vercel-domain.vercel.app/api/calendar/outlook/callback
   ```

## 🔧 Vercel Configuration

The project includes a `vercel.json` configuration file. If it doesn't exist, create one:

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "outputDirectory": "dist/client",
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

## 📝 Post-Deployment Checklist

- [ ] Database migrations completed
- [ ] Environment variables configured in Vercel
- [ ] OpenAI API key added (for AI features)
- [ ] OAuth redirect URIs updated (if using calendar sync)
- [ ] Test user registration and login
- [ ] Test AI features (quiz, flashcards, cheat sheet)
- [ ] Test calendar sync (if configured)
- [ ] Verify all pages load correctly

## 🎯 Features Included

### Core Features
- ✅ User authentication (signup, login, password reset)
- ✅ Dashboard with activity tracking
- ✅ Notes management with rich text
- ✅ Flashcards with AI generation
- ✅ Quiz generator with AI
- ✅ Study planner with calendar
- ✅ Pomodoro timer
- ✅ AI cheat sheet generator
- ✅ Resource library

### Calendar Integration
- ✅ Google Calendar sync
- ✅ Microsoft Outlook sync
- ✅ Task-to-event synchronization
- ✅ Multiple calendar support

### AI Features (Requires OpenAI API Key)
- ✅ Generate flashcards from text
- ✅ Generate quizzes from topics
- ✅ Create study cheat sheets
- ✅ Smart content analysis

## 🔐 Security Notes

1. **Never commit `.env` files** to version control
2. **Use environment variables** in Vercel for all secrets
3. **Rotate API keys** regularly
4. **Enable HTTPS** (Vercel does this automatically)
5. **Set up CORS** if needed for API access

## 🐛 Troubleshooting

### Build Fails
- Check Node.js version (18+ required)
- Verify all dependencies installed: `npm install`
- Clear cache: `rm -rf node_modules package-lock.json && npm install`

### Database Connection Issues
- Verify DATABASE_URL format
- Check database is accessible from Vercel
- Ensure migrations ran successfully
- For PlanetScale, enable "Allow public connections"

### API Routes Not Working
- Check `vercel.json` routing configuration
- Verify environment variables in Vercel dashboard
- Check function logs in Vercel dashboard

### Calendar Sync Not Working
- Verify OAuth credentials are correct
- Check redirect URIs match exactly
- Ensure secrets are set in Vercel environment variables
- Check API quotas in Google/Microsoft consoles

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Documentation](https://vitejs.dev/)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [PlanetScale Documentation](https://planetscale.com/docs)

## 🆘 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review Vercel deployment logs
3. Check browser console for errors
4. Verify all environment variables are set

## 📄 License

This project is ready for deployment and customization for your needs.

---

**Built with:** React, TypeScript, Vite, Tailwind CSS, Drizzle ORM, MySQL
**Deployment:** Optimized for Vercel
**Version:** 1.0.0 - Calendar Integration Complete
