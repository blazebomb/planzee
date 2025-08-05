# 🧳 Planzee - Travel Planning App

A modern travel planning application built with Next.js 15, featuring trip management, location tracking, and seamless user experience.

## ✨ Features

- **🔐 GitHub Authentication** - Secure login with NextAuth.js
- **🗺️ Trip Management** - Create, organize, and manage your trips
- **📍 Location Planning** - Add destinations with Google Maps integration
- **📸 Image Uploads** - Store beautiful trip images with UploadThing
- **📱 Responsive Design** - Works perfectly on all devices
- **🎨 Modern UI** - Dark theme with glassmorphism effects

## 🚀 Production Deployment

### Prerequisites

1. **Node.js 18+** and npm
2. **PostgreSQL database** (Neon, Supabase, or any PostgreSQL provider)
3. **GitHub OAuth App** for authentication
4. **Google Maps API key** for geocoding
5. **UploadThing account** for file uploads

### Environment Variables

Create a `.env.local` file with:

```bash
# Authentication
AUTH_GITHUB_ID=your_github_oauth_app_id
AUTH_GITHUB_SECRET=your_github_oauth_app_secret
AUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=https://your-domain.com

# Database
DATABASE_URL=your_production_database_url

# File Upload
UPLOADTHING_TOKEN=your_uploadthing_token

# Google Maps
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### Deployment Steps

#### Option 1: Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Production ready"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Add all environment variables in Vercel dashboard
   - Deploy automatically

3. **Setup Database**
   ```bash
   npx prisma migrate deploy
   ```

#### Option 2: Railway

1. **Create Railway Project**
   ```bash
   npm install -g @railway/cli
   railway login
   railway init
   ```

2. **Add Environment Variables**
   ```bash
   railway variables set AUTH_GITHUB_ID=your_value
   railway variables set DATABASE_URL=your_value
   # ... add all other variables
   ```

3. **Deploy**
   ```bash
   railway up
   ```

#### Option 3: Docker

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .
   RUN npm run build
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Build and Run**
   ```bash
   docker build -t planzee .
   docker run -p 3000:3000 --env-file .env.local planzee
   ```

### Database Setup

1. **Run Migrations**
   ```bash
   npx prisma migrate deploy
   ```

2. **Generate Prisma Client**
   ```bash
   npx prisma generate
   ```

### OAuth Setup

1. **GitHub OAuth App**
   - Go to GitHub Settings > Developer settings > OAuth Apps
   - Create new OAuth App
   - Set Authorization callback URL: `https://your-domain.com/api/auth/callback/github`

2. **Google Maps API**
   - Enable Geocoding API in Google Cloud Console
   - Create API key with proper restrictions

### Performance Optimizations

- ✅ Image optimization with Next.js Image component
- ✅ Static generation for landing pages
- ✅ Database connection pooling with Prisma
- ✅ Proper caching headers
- ✅ Compression enabled

### Security Features

- ✅ CSRF protection with NextAuth.js
- ✅ SQL injection prevention with Prisma
- ✅ XSS protection with Next.js
- ✅ Secure session management
- ✅ Input validation and sanitization

## 🛠️ Development

```bash
# Install dependencies
npm install

# Setup database
npx prisma migrate dev

# Start development server
npm run dev
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build:production` - Production build with type checking
- `npm run db:migrate` - Deploy database migrations
- `npm run db:studio` - Open Prisma Studio

## 🏗️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with GitHub provider
- **Styling**: Tailwind CSS
- **File Upload**: UploadThing
- **Maps**: Google Maps Geocoding API
- **TypeScript**: Full type safety

## 📞 Support

Created by **Ashish Kumar**

- 📧 [ashishkumar850601@gmail.com](mailto:ashishkumar850601@gmail.com)
- 🔗 [GitHub](https://github.com/blazebomb)
- 💼 [LinkedIn](https://www.linkedin.com/in/ashish-kumar-11a03125a/)
- 🌟 [Portfolio](https://personal-portfolio-woad-chi.vercel.app/)

---

Made with ❤️ for travelers everywhere
