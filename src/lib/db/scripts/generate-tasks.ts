// biome-ignore-all lint/suspicious/noConsole: local development script
import { db } from "@/lib/db/db";
import { tasks } from "@/lib/db/schema";

const userIds = ["550e8400e29b41d4a716446655440000", "97S5CDk6ehnD5GUoyTYfUehG5h7oYZ3r"];

// Sample data for generating realistic tasks
const categories = [
  "work",
  "personal",
  "health",
  "finance",
  "social",
  "household",
  "learning",
  "shopping",
  "fitness",
  "entertainment",
];

const taskTemplates = {
  work: [
    "Complete quarterly report",
    "Prepare presentation for team meeting",
    "Review code pull requests",
    "Update project documentation",
    "Schedule 1-on-1 with manager",
    "Respond to client emails",
    "Fix bug in production",
    "Deploy new feature to staging",
    "Attend sprint planning meeting",
    "Write unit tests for new module",
    "Update JIRA tickets",
    "Conduct code review",
    "Research new framework",
    "Optimize database queries",
    "Set up CI/CD pipeline",
  ],
  personal: [
    "Call mom",
    "Plan vacation trip",
    "Organize photo albums",
    "Write in journal",
    "Update resume",
    "Declutter closet",
    "Back up computer files",
    "Renew driver's license",
    "Sort through old emails",
    "Plan birthday party",
    "Update contact list",
    "Organize digital files",
    "Create vision board",
    "Write thank you notes",
    "Plan weekend activities",
  ],
  health: [
    "Schedule annual checkup",
    "Go for a 30-minute run",
    "Meal prep for the week",
    "Take vitamins",
    "Book dentist appointment",
    "Meditate for 10 minutes",
    "Drink 8 glasses of water",
    "Get 8 hours of sleep",
    "Try new healthy recipe",
    "Schedule eye exam",
    "Track calories for the day",
    "Do yoga session",
    "Go for a walk",
    "Prepare healthy snacks",
    "Refill prescriptions",
  ],
  finance: [
    "Pay credit card bill",
    "Review monthly budget",
    "Transfer money to savings",
    "File tax returns",
    "Review investment portfolio",
    "Cancel unused subscriptions",
    "Set up automatic bill pay",
    "Check credit score",
    "Compare insurance rates",
    "Update budget spreadsheet",
    "Pay utility bills",
    "Review bank statements",
    "Set savings goals",
    "Research retirement plans",
    "Track monthly expenses",
  ],
  social: [
    "Text friend about weekend plans",
    "RSVP to wedding invitation",
    "Plan game night",
    "Send birthday card",
    "Catch up with old college friend",
    "Organize book club meeting",
    "Plan dinner party",
    "Join local sports league",
    "Attend networking event",
    "Schedule coffee with colleague",
    "Plan family reunion",
    "Send thank you gifts",
    "Organize neighborhood BBQ",
    "Join community volunteer group",
    "Plan double date",
  ],
  household: [
    "Clean out refrigerator",
    "Change air filters",
    "Fix leaky faucet",
    "Organize garage",
    "Deep clean bathroom",
    "Water plants",
    "Do laundry",
    "Vacuum living room",
    "Replace light bulbs",
    "Clean gutters",
    "Organize pantry",
    "Wash windows",
    "Mow lawn",
    "Clean out closet",
    "Dust furniture",
  ],
  learning: [
    "Complete online course module",
    "Read chapter of business book",
    "Practice Spanish on Duolingo",
    "Watch tutorial video",
    "Attend webinar",
    "Take notes from podcast",
    "Learn new programming language",
    "Read research paper",
    "Complete coding challenge",
    "Study for certification",
    "Watch educational documentary",
    "Practice piano",
    "Learn new recipe",
    "Read industry blog posts",
    "Complete LinkedIn Learning course",
  ],
  shopping: [
    "Buy groceries for the week",
    "Order new running shoes",
    "Purchase birthday gift",
    "Buy office supplies",
    "Order household essentials",
    "Shop for winter clothes",
    "Buy new laptop charger",
    "Order books from Amazon",
    "Purchase gym equipment",
    "Buy pet food",
    "Order printer ink",
    "Shop for home decor",
    "Buy gardening supplies",
    "Order vitamins online",
    "Purchase storage containers",
  ],
  fitness: [
    "Complete 5K run",
    "Attend yoga class",
    "Do strength training workout",
    "Go swimming",
    "Join cycling group",
    "Try new fitness class",
    "Hit personal record at gym",
    "Complete HIIT workout",
    "Go rock climbing",
    "Practice stretching routine",
    "Train for marathon",
    "Do home workout video",
    "Play tennis match",
    "Attend spin class",
    "Go hiking",
  ],
  entertainment: [
    "Watch new movie release",
    "Finish TV series season",
    "Read new novel",
    "Visit art museum",
    "Attend concert",
    "Play video game",
    "Go to theater show",
    "Listen to new podcast episode",
    "Visit local brewery",
    "Attend sports game",
    "Go to comedy show",
    "Visit aquarium",
    "Try new restaurant",
    "Go bowling with friends",
    "Attend music festival",
  ],
};

const descriptions = [
  "Need to complete this soon",
  "High priority task",
  "Don't forget about this",
  "Important for next week",
  "Quick task to knock out",
  "Been putting this off",
  "Should be easy to finish",
  "Might take a few hours",
  "Remember to follow up",
  "Set aside time for this",
  "Critical for project success",
  "Low priority but needs doing",
  "Fun task to look forward to",
  "Necessary but tedious",
  "Will feel great when done",
];

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function generateTasks(count: number, userId: string) {
  const tasks = [];
  const now = new Date();
  const threeMonthsFromNow = new Date(now);
  threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);

  for (let i = 0; i < count; i++) {
    const category = getRandomItem(categories);
    const name = getRandomItem(taskTemplates[category as keyof typeof taskTemplates]);
    const description = getRandomItem(descriptions);
    const completed = Math.random() < 0.1; // 10% chance of being completed
    const dueDate = getRandomDate(now, threeMonthsFromNow);

    tasks.push({
      userId,
      name,
      description,
      category,
      completed,
      dueDate: dueDate.toISOString(),
    });
  }

  return tasks;
}

/**
 * Seed database with sample tasks.
 */
const seedDatabase = async () => {
  console.log("Seeding tasks...");

  // Generate 20 tasks for each user
  for (const userId of userIds) {
    console.log(`📝 Generating 20 tasks for user: ${userId}`);
    const tasksToInsert = generateTasks(20, userId);

    console.log(`💾 Inserting tasks into database for user: ${userId}...`);
    await db.insert(tasks).values(tasksToInsert);

    console.log(`✅ Successfully seeded 20 tasks for user: ${userId}`);
  }

  console.log("🎉 Database has been seeded successfully! Total: 40 tasks");
};

await seedDatabase()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Error seeding database:", err);
    process.exit(1);
  });
