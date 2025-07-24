# 🎮 Task Tracker - Gamified Productivity Dashboard

A modern, gamified task management application built with Next.js, React, and Ant Design. Transform your productivity into an engaging game with levels, achievements, streaks, and rewards!

![Task Tracker Dashboard](https://img.shields.io/badge/Status-Active-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-14.0-black)
![React](https://img.shields.io/badge/React-18.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Ant Design](https://img.shields.io/badge/Ant%20Design-5.0-red)

## ✨ Features

### 🎯 Core Task Management
- **Create, Edit, Delete Tasks** - Full CRUD operations with intuitive UI
- **Status Management** - Quick toggle between Pending, In Progress, and Completed
- **Priority Levels** - Set task priorities (Urgent, High, Medium, Low)
- **Real-time Updates** - Instant status changes without page refresh
- **Search & Filter** - Find tasks quickly with advanced filtering

### 🎮 Gamification System
- **📊 Experience Points (XP)** - Earn XP based on task priority and completion
- **🏆 Level System** - Progress through levels as you complete more tasks
- **🔥 Daily Streaks** - Build consistency with daily task completion tracking
- **🎖️ Achievements** - Unlock 8+ achievements for various milestones
- **💰 Points System** - Earn points that scale with task difficulty
- **📈 Progress Tracking** - Visual progress bars and statistics

### 🎨 User Experience
- **🌙 Dark/Light Mode** - Toggle between themes with smooth transitions
- **📱 Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **🎯 Intuitive Dashboard** - Quick overview of tasks, progress, and achievements
- **🔔 Notifications** - Celebrate achievements and level-ups with toast notifications
- **📊 Visual Analytics** - Charts and statistics to track your productivity

## 🚀 Demo

### Dashboard Overview
- **User Progress Card** - Shows current level, XP, and points
- **Achievement Gallery** - Display unlocked achievements with rarity indicators
- **Task Statistics** - Visual breakdown of task completion rates
- **Recent Tasks** - Quick view of your latest activities
- **Streak Calendar** - Interactive calendar showing your productivity streak

### Task Management
- **Quick Status Toggle** - Change task status with dropdown menus
- **One-Click Completion** - Fast-track task completion with dedicated buttons
- **Instant Rewards** - Get immediate feedback with points and XP notifications
- **Visual Status Indicators** - Color-coded status tags and icons

## 🛠️ Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **UI Library**: Ant Design 5.0
- **State Management**: React Context API
- **Data Fetching**: Refine Framework
- **Styling**: CSS-in-JS, Ant Design theming
- **Icons**: Ant Design Icons
- **Date Handling**: Day.js
- **Build Tool**: Next.js built-in bundler

## 📦 Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/task-tracker.git
cd task-tracker
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🎮 Gamification Features

### 🏆 Achievement System
| Achievement | Description | Requirement | Rarity |
|-------------|-------------|-------------|---------|
| 🎯 Getting Started | Complete your first task | 1 task | Common |
| 💪 Productive Day | Complete 5 tasks in one day | 5 tasks/day | Common |
| 👑 Task Master | Complete 50 total tasks | 50 tasks | Rare |
| 🔥 Streak Warrior | Maintain a 7-day streak | 7-day streak | Epic |
| ⚡ Consistency King | Maintain a 30-day streak | 30-day streak | Legendary |
| 🏆 Legendary Achiever | Complete 100 total tasks | 100 tasks | Legendary |
| ⚡ Speed Demon | Complete 10 tasks in one day | 10 tasks/day | Epic |
| 💎 Perfectionist | Complete 20 tasks with perfect streak | 20 tasks + streak | Mythic |

### 💰 Points System
- **Urgent Priority**: 50 points (100 XP)
- **High Priority**: 30 points (60 XP)
- **Medium Priority**: 20 points (40 XP)
- **Low Priority**: 10 points (20 XP)
- **Default**: 15 points (30 XP)

### 📈 Level Progression
- **Level 1-5**: 100 XP per level
- **Level 6-10**: 200 XP per level
- **Level 11+**: 300 XP per level

## 📁 Project Structure

```
task-tracker/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── dashboard/          # Dashboard page
│   │   ├── tasks/              # Task management pages
│   │   ├── layout.tsx          # Root layout
│   │   └── globals.css         # Global styles
│   ├── components/             # Reusable components
│   │   ├── header/             # Header component
│   │   ├── gamification/       # Gamification components
│   │   └── themed-layout/      # Theme-aware layouts
│   ├── contexts/               # React contexts
│   │   ├── color-mode/         # Theme context
│   │   └── gamification/       # Gamification context
│   ├── providers/              # Data providers
│   ├── types/                  # TypeScript types
│   └── hooks/                  # Custom hooks
├── public/                     # Static assets
└── package.json               # Dependencies
```

## 🎨 Themes

The application supports both light and dark themes with:
- **Automatic Detection** - Respects system preferences
- **Manual Toggle** - Switch themes with header button
- **Persistent Storage** - Remembers your choice
- **Smooth Transitions** - Animated theme changes

## 📊 Analytics & Insights

### Dashboard Metrics
- **Completion Rate** - Visual progress circle with percentage
- **Task Breakdown** - Statistics for each status category
- **Recent Activity** - Timeline of latest tasks
- **Achievement Progress** - Track milestone completion

### Streak Analytics
- **Current Streak** - Days of consecutive task completion
- **Best Streak** - Personal record tracking
- **Streak Calendar** - Visual representation of productive days
- **Milestone Tracking** - Progress toward streak achievements

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
```bash
git checkout -b feature/amazing-feature
```
3. **Commit your changes**
```bash
git commit -m 'Add amazing feature'
```
4. **Push to the branch**
```bash
git push origin feature/amazing-feature
```
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use Ant Design components when possible
- Maintain responsive design principles
- Add proper error handling
- Write descriptive commit messages

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Ant Design** - For the beautiful UI components
- **Refine** - For the powerful data management framework
- **Next.js** - For the amazing React framework
- **Vercel** - For hosting and deployment

## 📞 Support

If you encounter any issues or have questions:

1. **Check the Issues** - Look for existing solutions
2. **Create an Issue** - Report bugs or request features
3. **Discussions** - Ask questions in GitHub Discussions

## 🚀 Deployment

### Deploy on Vercel (Recommended)

1. **Push to GitHub**
2. **Connect to Vercel**
3. **Deploy automatically**


**Made with ❤️ and ☕ by Athul**

*Transform your productivity into a game - because achieving goals should be fun!* 🎮✨
