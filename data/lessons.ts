export interface Lesson {
  id: string;
  title: string;
  track: "javascript" | "python" | "sql";
  tier: "free" | "pro";
  order: number;
  description: string;
  explanation: string;
  examples: { label: string; code: string }[];
  objective: string;
  project: string;
  starterCode: string;
  setupSql?: string;
  expectedOutput: string;
  hints: string[];
}

export const lessons: Lesson[] = [
  // ── JavaScript Free ────────────────────────────────────────────────────
  {
    id: "js-01",
    title: "Hello, World!",
    track: "javascript",
    tier: "free",
    order: 1,
    description: "Every programmer starts here. You'll learn how to make your program display text — the most fundamental skill in coding.",
    explanation:
      `console.log() is a built-in JavaScript function that prints a value to the output. Think of it as your program talking to you.\n\nA string is any text wrapped in quotes. You can use double quotes " or single quotes ' — both work the same way.\n\nWhen JavaScript runs your code line by line, every console.log() call immediately prints its content.`,
    examples: [
      { label: "Print a simple message", code: `console.log("Hello, World!");\n// Output: Hello, World!` },
      { label: "Print numbers and multiple lines", code: `console.log(42);\nconsole.log("Line one");\nconsole.log("Line two");\n// Output:\n// 42\n// Line one\n// Line two` },
      { label: "Print multiple values at once", code: `console.log("My name is", "Alex", "and I am", 20);\n// Output: My name is Alex and I am 20` },
    ],
    project: "Mini project: Build a name badge program. Print a full name, a role, and a welcome message — each on its own line.",
    objective: "Print exactly:\nAlex Johnson\nFull Stack Developer\nWelcome to CodeLearn!",
    starterCode: `// Mini Project: Name Badge\n// Print three lines exactly as shown in the objective.\n\n`,
    expectedOutput: "Alex Johnson\nFull Stack Developer\nWelcome to CodeLearn!",
    hints: [
      "You need three separate console.log() calls — one per line.",
      'Make sure spelling and punctuation match exactly.',
      "Each console.log() automatically starts on a new line.",
    ],
  },
  {
    id: "js-02",
    title: "Variables",
    track: "javascript",
    tier: "free",
    order: 2,
    description: "Variables are named containers that store data. Instead of repeating a value everywhere, you give it a name and reuse it.",
    explanation:
      `Use let to declare a variable that can change, and const for values that never change.\n\nYou can store text (strings), numbers, true/false (booleans), and more. JavaScript figures out the type automatically.\n\nTo build a string from multiple pieces, use + to join them — this is called concatenation. You can also use template literals with backticks: \`Hello, \${name}!\``,
    examples: [
      { label: "Declaring and using variables", code: `let city = "New York";\nconst year = 2024;\nconsole.log("Welcome to " + city + " in " + year);\n// Output: Welcome to New York in 2024` },
      { label: "Template literals (backtick strings)", code: `let name = "Maya";\nlet age = 28;\nconsole.log(\`\${name} is \${age} years old.\`);\n// Output: Maya is 28 years old.` },
      { label: "Updating a variable", code: `let score = 0;\nscore = score + 10;\nscore += 5;\nconsole.log(score); // Output: 15` },
    ],
    project: "Mini project: Build a personal profile card. Store name, age, and favourite language in variables, then print a formatted profile.",
    objective: "Print exactly:\nName: Alex\nAge: 22\nFavourite language: JavaScript",
    starterCode: `// Mini Project: Profile Card\nlet name = "Alex";\nlet age = 22;\nlet language = "JavaScript";\n\n// Use template literals to print the three profile lines\n`,
    expectedOutput: "Name: Alex\nAge: 22\nFavourite language: JavaScript",
    hints: [
      "Use a separate console.log() for each line.",
      "Template literal: `Name: ${name}`",
      "Remember: the keys (Name:, Age:, Favourite language:) must match exactly.",
    ],
  },
  {
    id: "js-03",
    title: "If / Else",
    track: "javascript",
    tier: "free",
    order: 3,
    description: "Programs become powerful when they can make decisions. If/else lets your code choose different paths based on a condition.",
    explanation:
      `An if statement runs a block of code only when its condition is true. An else block runs when the condition is false. You can chain multiple conditions with else if.\n\nComparison operators:\n  >  greater than\n  <  less than\n  >= greater than or equal\n  <= less than or equal\n  === strictly equal\n  !== not equal\n\nConditions always evaluate to either true or false.`,
    examples: [
      { label: "Basic if / else", code: `let temperature = 30;\nif (temperature > 25) {\n  console.log("It's hot outside!");\n} else {\n  console.log("Nice and cool.");\n}\n// Output: It's hot outside!` },
      { label: "else if for multiple conditions", code: `let score = 72;\nif (score >= 90) {\n  console.log("Grade: A");\n} else if (score >= 75) {\n  console.log("Grade: B");\n} else if (score >= 60) {\n  console.log("Grade: C");\n} else {\n  console.log("Grade: F");\n}\n// Output: Grade: C` },
      { label: "Strict equality", code: `let password = "secret";\nif (password === "secret") {\n  console.log("Access granted");\n} else {\n  console.log("Wrong password");\n}\n// Output: Access granted` },
    ],
    project: "Mini project: Ticket price calculator. Children (under 12) pay $5, seniors (65+) pay $7, everyone else pays $12.",
    objective: "The starter uses age = 8. Print exactly:\nTicket price: $5",
    starterCode: `// Mini Project: Ticket Price Calculator\nlet age = 8;\nlet price;\n\n// Determine price: under 12 → $5, 65+ → $7, else → $12\n\nconsole.log("Ticket price: $" + price);\n`,
    expectedOutput: "Ticket price: $5",
    hints: [
      "Check age < 12 first (children), then age >= 65 (seniors), then the default.",
      "Assign the number (5, 7, or 12) to price inside each if/else block.",
      'The output must match exactly: "Ticket price: $5"',
    ],
  },
  {
    id: "js-04",
    title: "Loops",
    track: "javascript",
    tier: "free",
    order: 4,
    description: "Loops repeat a block of code multiple times — avoiding the need to write the same line over and over.",
    explanation:
      `A for loop has three parts separated by semicolons:\n  1. Initializer — runs once at the start (let i = 1)\n  2. Condition — checked before each iteration (i <= 5)\n  3. Update — runs after each iteration (i++)\n\ni++ is shorthand for i = i + 1. You can also use i-- (decrement) or i += 2 (step by 2).`,
    examples: [
      { label: "Basic for loop", code: `for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}\n// Output: 1  2  3  4  5  (each on its own line)` },
      { label: "Loop with arithmetic", code: `let sum = 0;\nfor (let i = 1; i <= 10; i++) {\n  sum += i;\n}\nconsole.log("Sum:", sum);\n// Output: Sum: 55` },
      { label: "Countdown with while", code: `let count = 3;\nwhile (count > 0) {\n  console.log("Countdown: " + count);\n  count--;\n}\n// Output:\n// Countdown: 3\n// Countdown: 2\n// Countdown: 1` },
    ],
    project: "Mini project: Print a multiplication table for the number 3 (from 3×1 to 3×5).",
    objective: "Print exactly:\n3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15",
    starterCode: `// Mini Project: Times Table\n// Use a for loop to print the 3 times table from 1 to 5.\n\n`,
    expectedOutput: "3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15",
    hints: [
      "Loop from i = 1 to i <= 5.",
      'console.log("3 x " + i + " = " + (3 * i))',
      "Wrap 3 * i in parentheses so JavaScript multiplies before concatenating.",
    ],
  },
  {
    id: "js-05",
    title: "Functions",
    track: "javascript",
    tier: "free",
    order: 5,
    description: "Functions package reusable logic under a name. You define it once and call it as many times as you need.",
    explanation:
      `A function is defined with the function keyword, a name, parentheses for parameters, and curly braces for the body.\n\nParameters are placeholders; arguments are the real values you pass when calling. A function can return a value with return — the caller receives that value.\n\nFunctions keep your code DRY (Don't Repeat Yourself).`,
    examples: [
      { label: "Function with a parameter", code: `function greet(name) {\n  console.log("Hello, " + name + "!");\n}\ngreet("Alice");\ngreet("Bob");\n// Hello, Alice!\n// Hello, Bob!` },
      { label: "Function that returns a value", code: `function add(a, b) {\n  return a + b;\n}\nlet result = add(3, 7);\nconsole.log(result); // 10` },
      { label: "Multiple parameters with logic", code: `function describe(name, age) {\n  if (age < 18) return name + " is a minor.";\n  return name + " is an adult.";\n}\nconsole.log(describe("Sam", 16));\n// Sam is a minor.` },
    ],
    project: "Mini project: Simple calculator with an add and a multiply function.",
    objective: "Print exactly:\nSum: 15\nProduct: 50",
    starterCode: `// Mini Project: Simple Calculator\n\nfunction add(a, b) {\n  // return the sum\n}\n\nfunction multiply(a, b) {\n  // return the product\n}\n\nconsole.log("Sum: " + add(7, 8));\nconsole.log("Product: " + multiply(5, 10));\n`,
    expectedOutput: "Sum: 15\nProduct: 50",
    hints: [
      "In add(), return a + b;",
      "In multiply(), return a * b;",
      "Make sure you return the value — don't just console.log inside the function.",
    ],
  },

  // ── JavaScript Pro ─────────────────────────────────────────────────────
  {
    id: "js-06",
    title: "Arrays",
    track: "javascript",
    tier: "pro",
    order: 6,
    description: "Arrays store ordered lists of values — the backbone of almost every real application.",
    explanation:
      `An array is created with square brackets []. Each item has a numeric index starting at 0.\n\nKey methods:\n  push(item)   — add to the end\n  pop()        — remove from the end\n  length       — number of items\n\nYou can loop over an array with a for loop or the cleaner for...of loop.`,
    examples: [
      { label: "Creating and accessing", code: `let fruits = ["apple", "banana", "cherry"];\nconsole.log(fruits[0]);     // apple\nconsole.log(fruits.length); // 3\nfruits.push("mango");\nconsole.log(fruits.length); // 4` },
      { label: "for...of loop", code: `let colours = ["red", "green", "blue"];\nfor (let colour of colours) {\n  console.log(colour);\n}\n// red\n// green\n// blue` },
      { label: "Summing an array", code: `let prices = [9.99, 4.50, 12.00];\nlet total = 0;\nfor (let price of prices) {\n  total += price;\n}\nconsole.log("Total: " + total);\n// Total: 26.49` },
    ],
    project: "Mini project: To-do list. Start with two tasks, add a third, then print all tasks numbered.",
    objective: "Print exactly:\n1. Buy groceries\n2. Walk the dog\n3. Read a book",
    starterCode: `// Mini Project: To-Do List\nlet tasks = ["Buy groceries", "Walk the dog"];\ntasks.push("Read a book");\n\n// Print each task with its number (1-based)\n`,
    expectedOutput: "1. Buy groceries\n2. Walk the dog\n3. Read a book",
    hints: [
      "for (let i = 0; i < tasks.length; i++)",
      'console.log((i + 1) + ". " + tasks[i])',
      "Remember index is 0-based but the display starts at 1.",
    ],
  },
  {
    id: "js-07",
    title: "Objects",
    track: "javascript",
    tier: "pro",
    order: 7,
    description: "Objects group related data under named keys. They model real-world things — a user, a product, an order.",
    explanation:
      `An object is a collection of key: value pairs wrapped in {}. Access properties with dot notation (obj.key) or bracket notation (obj["key"]).\n\nObjects can be nested — a property can be another object or an array. You can add new properties after creation just by assigning them.`,
    examples: [
      { label: "Creating and reading", code: `let car = { brand: "Toyota", model: "Corolla", year: 2022 };\nconsole.log(car.brand);   // Toyota\nconsole.log(car["year"]); // 2022` },
      { label: "Nested objects", code: `let user = {\n  name: "Jordan",\n  address: { city: "Chicago", zip: "60601" },\n};\nconsole.log(user.address.city); // Chicago` },
      { label: "Adding properties dynamically", code: `let product = { name: "Laptop" };\nproduct.price = 999;\nconsole.log(product.name + " — $" + product.price);\n// Laptop — $999` },
    ],
    project: "Mini project: Student report card object with name, grade, and subjects array.",
    objective: "Print exactly:\nStudent: Maria\nGrade: A\nSubjects: Math, Science, English",
    starterCode: `// Mini Project: Student Report Card\nlet student = {\n  name: "Maria",\n  grade: "A",\n  subjects: ["Math", "Science", "English"],\n};\n\n// Print the report card\n`,
    expectedOutput: "Student: Maria\nGrade: A\nSubjects: Math, Science, English",
    hints: [
      "Access the name with student.name, the grade with student.grade.",
      'Join subjects: student.subjects.join(", ")',
      "Three console.log() calls, one per line.",
    ],
  },
  {
    id: "js-08",
    title: "Arrow Functions",
    track: "javascript",
    tier: "pro",
    order: 8,
    description: "Arrow functions are a concise modern syntax for writing functions — you'll see them everywhere in real JavaScript code.",
    explanation:
      `Three forms from most explicit to shortest:\n  const fn = (x) => { return x * 2; }   // full\n  const fn = (x) => x * 2;               // implicit return\n  const fn = x => x * 2;                 // single param, no parens\n\nArrow functions are especially useful as callbacks passed to array methods like map, filter, and reduce.`,
    examples: [
      { label: "Converting a regular function", code: `// Regular\nfunction square(n) { return n * n; }\n// Arrow (same thing)\nconst square = (n) => n * n;\nconsole.log(square(6)); // 36` },
      { label: "As a callback", code: `let numbers = [1, 2, 3, 4, 5];\nlet doubled = numbers.map(n => n * 2);\nconsole.log(doubled);\n// [2, 4, 6, 8, 10]` },
      { label: "Multi-line arrow function", code: `const grade = (score) => {\n  if (score >= 90) return "A";\n  if (score >= 75) return "B";\n  return "C";\n};\nconsole.log(grade(82)); // B` },
    ],
    project: "Mini project: Temperature converter — Celsius to Fahrenheit and back.",
    objective: "Print exactly:\n100°C = 212°F\n32°F = 0°C",
    starterCode: `// Mini Project: Temperature Converter\n// F = (C * 9/5) + 32   |   C = (F - 32) * 5/9\n\nconst celsiusToF = (c) => /* your formula */ 0;\nconst fahrenheitToC = (f) => /* your formula */ 0;\n\nconsole.log("100°C = " + celsiusToF(100) + "°F");\nconsole.log("32°F = " + fahrenheitToC(32) + "°C");\n`,
    expectedOutput: "100°C = 212°F\n32°F = 0°C",
    hints: [
      "celsiusToF: (c * 9/5) + 32",
      "fahrenheitToC: (f - 32) * 5/9",
      "Remove the 0 placeholder and replace with the formula.",
    ],
  },
  {
    id: "js-09",
    title: "Array Methods",
    track: "javascript",
    tier: "pro",
    order: 9,
    description: "map, filter, and reduce transform arrays without manual loops — making code shorter, cleaner, and more expressive.",
    explanation:
      `  map(fn)           — transforms every item, returns same-length array\n  filter(fn)        — keeps only items where fn returns true\n  reduce(fn, start) — combines all items into one value\n\nThese are called higher-order functions because they take functions as arguments. You'll use them constantly in real apps.`,
    examples: [
      { label: "map — transform each item", code: `let names = ["alice", "bob", "carol"];\nlet upper = names.map(name => name.toUpperCase());\nconsole.log(upper);\n// ["ALICE", "BOB", "CAROL"]` },
      { label: "filter — keep matching items", code: `let scores = [45, 82, 91, 33, 76];\nlet passing = scores.filter(s => s >= 60);\nconsole.log(passing);\n// [82, 91, 76]` },
      { label: "reduce — combine into one value", code: `let prices = [10, 20, 5, 15];\nlet total = prices.reduce((sum, p) => sum + p, 0);\nconsole.log("Total: $" + total);\n// Total: $50` },
    ],
    project: "Mini project: Filter scores ≥ 60, double each (bonus curve), print each then print total.",
    objective: "Print exactly:\n164\n182\n152\nTotal: 498",
    starterCode: `// Mini Project: Score Processor\nlet scores = [45, 82, 91, 33, 76];\n\n// 1. Filter scores >= 60\n// 2. Map: multiply each by 2\n// 3. Print each score\n// 4. Print the total using reduce\n`,
    expectedOutput: "164\n182\n152\nTotal: 498",
    hints: [
      "Chain: scores.filter(s => s >= 60).map(s => s * 2)",
      "forEach to print each, then reduce to get total.",
      "Doubled 82=164, 91=182, 76=152. Total=498.",
    ],
  },
  {
    id: "js-10",
    title: "Async / Await",
    track: "javascript",
    tier: "pro",
    order: 10,
    description: "Real apps talk to servers and wait for data. Async/await lets you write that waiting code in a clean, readable way.",
    explanation:
      `JavaScript is single-threaded, so long operations are handled asynchronously. A Promise represents a value that will be available in the future.\n\nasync/await is built on Promises:\n  - Mark a function async\n  - Use await before any Promise — execution pauses until it resolves\n  - Errors are caught with try/catch\n\nPromise.resolve(value) creates an already-resolved Promise — perfect for practice.`,
    examples: [
      { label: "Basic async/await", code: `async function fetchUser() {\n  const data = await Promise.resolve({ name: "Alex" });\n  console.log("User:", data.name);\n}\nfetchUser();\n// User: Alex` },
      { label: "Simulating a delay", code: `function wait(ms) {\n  return new Promise(resolve => setTimeout(resolve, ms));\n}\nasync function run() {\n  console.log("Starting...");\n  await wait(0);\n  console.log("Done!");\n}\nrun();` },
      { label: "try/catch for errors", code: `async function riskyOp() {\n  try {\n    await Promise.reject(new Error("Network failed"));\n  } catch (err) {\n    console.log("Error:", err.message);\n  }\n}\nriskyOp();\n// Error: Network failed` },
    ],
    project: "Mini project: Simulate fetching a user profile from an API. Print the fetching message, then the name and email.",
    objective: "Print exactly:\nFetching profile...\nName: Jordan Lee\nEmail: jordan@example.com",
    starterCode: `// Mini Project: Simulated API Fetch\nasync function fetchProfile() {\n  console.log("Fetching profile...");\n\n  const profile = await Promise.resolve({\n    name: "Jordan Lee",\n    email: "jordan@example.com",\n  });\n\n  // Print name and email\n}\n\nfetchProfile();\n`,
    expectedOutput: "Fetching profile...\nName: Jordan Lee\nEmail: jordan@example.com",
    hints: [
      'console.log("Name: " + profile.name)',
      'console.log("Email: " + profile.email)',
      "Both lines must appear after the await.",
    ],
  },

  // ── JavaScript Intermediate & Advanced ─────────────────────────────────
  {
    id: "js-11",
    title: "Destructuring",
    track: "javascript",
    tier: "pro",
    order: 11,
    description: "Destructuring unpacks arrays and objects into named variables in one line — cleaner than chaining indexes and dot-notation.",
    explanation:
      `Array destructuring:\n  const [a, b, ...rest] = [1, 2, 3, 4];\n  // a=1, b=2, rest=[3,4]\n\nObject destructuring:\n  const { name, age = 0 } = { name: "Alice" };\n  // name="Alice", age=0 (default used)\n\nRenaming:\n  const { name: fullName } = { name: "Bob" };\n  // fullName="Bob"\n\nNested destructuring:\n  const { address: { city } } = user;\n  // extracts user.address.city directly\n\nDestructuring also works in function parameters:\n  function render({ title, body }) { ... }`,
    examples: [
      { label: "Array destructuring", code: `const [first, second, ...rest] = [10, 20, 30, 40];\nconsole.log(first);  // 10\nconsole.log(second); // 20\nconsole.log(rest);   // [30, 40]` },
      { label: "Object destructuring with default", code: `const { name, age = 0, city = "Unknown" } = { name: "Alice", age: 30 };\nconsole.log(name); // Alice\nconsole.log(age);  // 30\nconsole.log(city); // Unknown (default)` },
      { label: "Rename and nested", code: `const { name: fullName } = { name: "Bob" };\nconsole.log(fullName); // Bob\n\nconst { user: { city } } = { user: { city: "London" } };\nconsole.log(city); // London` },
    ],
    project: "Mini project: Destructure an order object to extract its ID, customer, first item, and total.",
    objective: "Print exactly:\nOrder #1042\nCustomer: Alice\nFirst item: Laptop\nTotal: $1107",
    starterCode: `// Mini Project: Order Summary\nconst order = {\n  id: 1042,\n  customer: "Alice",\n  items: ["Laptop", "Mouse", "Keyboard"],\n  total: 1107,\n};\n\nconst { id, customer, items: [firstItem], total } = order;\n\nconsole.log("Order #" + id);\nconsole.log("Customer: " + customer);\nconsole.log("First item: " + firstItem);\nconsole.log("Total: $" + total);\n`,
    expectedOutput: "Order #1042\nCustomer: Alice\nFirst item: Laptop\nTotal: $1107",
    hints: [
      "items: [firstItem] destructures only the first element of the items array.",
      "Defaults use =, renaming uses colon — { age: years = 0 } renames AND provides a default.",
      "The starter code is already correct — just run it!",
    ],
  },
  {
    id: "js-12",
    title: "Spread & Rest",
    track: "javascript",
    tier: "pro",
    order: 12,
    description: "The ... operator spreads iterables into positions or merges objects. As a rest parameter it collects arguments into an array — the same syntax, two opposite jobs.",
    explanation:
      `Spread (expanding):\n  Math.max(...[3, 1, 4])       — pass array as separate args\n  const copy = [...arr, 99]    — clone and append\n  const obj  = {...a, ...b}    — merge objects\n\nRest (collecting):\n  function sum(...nums) { }    — collect all args into array\n  const [head, ...tail] = arr  — rest after destructuring\n\nKey rule: rest must be the last element.\nObject spread is shallow — nested objects are still shared references.`,
    examples: [
      { label: "Spread into function args", code: `const nums = [3, 1, 4, 1, 5];\nconsole.log(Math.max(...nums)); // 5\nconsole.log(Math.min(...nums)); // 1` },
      { label: "Clone and merge objects", code: `const base = { color: "blue", size: 10 };\nconst updated = { ...base, size: 20, weight: 5 };\nconsole.log(updated);\n// { color: 'blue', size: 20, weight: 5 }` },
      { label: "Rest parameters", code: `function sum(...numbers) {\n  return numbers.reduce((acc, n) => acc + n, 0);\n}\nconsole.log(sum(1, 2, 3, 4)); // 10\nconsole.log(sum(10, 20));     // 30` },
    ],
    project: "Mini project: Merge two product objects — later values overwrite earlier ones.",
    objective: "Print exactly:\nLaptop: $999\nStock: 3\nDiscount: 10%",
    starterCode: `// Mini Project: Product Merge\nconst base    = { name: "Laptop", price: 999, stock: 5 };\nconst updates = { stock: 3, discount: 10 };\nconst product = { ...base, ...updates };\n\nconsole.log(product.name + ": $" + product.price);\nconsole.log("Stock: " + product.stock);\nconsole.log("Discount: " + product.discount + "%");\n`,
    expectedOutput: "Laptop: $999\nStock: 3\nDiscount: 10%",
    hints: [
      "{ ...base, ...updates } copies all base properties then overlays updates on top.",
      "stock appears in both objects — updates.stock (3) wins because it comes second.",
      "The starter code is already correct — just run it!",
    ],
  },
  {
    id: "js-13",
    title: "Classes",
    track: "javascript",
    tier: "pro",
    order: 13,
    description: "ES6 classes give JavaScript clean OOP syntax. They are syntactic sugar over prototypes — but far more readable for building objects with shared behaviour.",
    explanation:
      `class MyClass {\n  constructor(arg) { this.arg = arg; }\n  method() { return this.arg; }\n  get double() { return this.arg * 2; }    // getter\n  static create(a) { return new MyClass(a); } // static\n}\n\nInheritance:\n  class Child extends Parent {\n    constructor(a, b) {\n      super(a);          // must call super first\n      this.b = b;\n    }\n    method() {\n      return super.method() + " " + this.b;\n    }\n  }`,
    examples: [
      { label: "Basic class", code: `class Animal {\n  constructor(name) { this.name = name; }\n  speak() { return this.name + " makes a sound"; }\n}\nconst a = new Animal("Cat");\nconsole.log(a.speak()); // Cat makes a sound` },
      { label: "Inheritance with super", code: `class Dog extends Animal {\n  speak() {\n    return this.name + " says Woof!";\n  }\n}\nconst d = new Dog("Rex");\nconsole.log(d.speak()); // Rex says Woof!` },
      { label: "Getter and static method", code: `class Circle {\n  constructor(r) { this.r = r; }\n  get area() { return Math.round(Math.PI * this.r ** 2); }\n  static unit() { return new Circle(1); }\n}\nconst c = Circle.unit();\nconsole.log(c.area); // 3` },
    ],
    project: "Mini project: BankAccount class with chainable deposit and withdraw methods.",
    objective: "Print exactly:\nOwner: Alice\nBalance: $1300",
    starterCode: `// Mini Project: Bank Account\nclass BankAccount {\n  constructor(owner, initial = 0) {\n    this.owner = owner;\n    this.balance = initial;\n  }\n\n  deposit(amount) {\n    this.balance += amount;\n    return this;  // enables chaining\n  }\n\n  withdraw(amount) {\n    this.balance -= amount;\n    return this;\n  }\n}\n\nconst account = new BankAccount("Alice", 1000);\naccount.deposit(500).withdraw(200);\nconsole.log("Owner: " + account.owner);\nconsole.log("Balance: $" + account.balance);\n`,
    expectedOutput: "Owner: Alice\nBalance: $1300",
    hints: [
      "deposit() and withdraw() both return this — so you can chain: .deposit(500).withdraw(200).",
      "1000 + 500 - 200 = 1300.",
      "The starter code is already correct — just run it!",
    ],
  },
  {
    id: "js-14",
    title: "Closures",
    track: "javascript",
    tier: "pro",
    order: 14,
    description: "A closure is a function that remembers variables from its outer scope even after that scope has finished — the foundation of private state, factories, and modules in JavaScript.",
    explanation:
      `Every function in JavaScript closes over the variables in scope where it was defined.\n\nFactory function pattern:\n  function makeCounter() {\n    let count = 0;           // private — not accessible outside\n    return {\n      increment: () => count++,\n      value:     () => count,\n    };\n  }\n\nEach call to makeCounter() creates a separate count.\nThe inner functions share access to THAT specific count.\n\nClosures power: private state, memoisation, partial application, event handlers.`,
    examples: [
      { label: "Basic closure", code: `function outer() {\n  let secret = 42;\n  return function inner() {\n    return secret;   // inner remembers secret\n  };\n}\nconst reveal = outer();\nconsole.log(reveal()); // 42` },
      { label: "Counter factory", code: `function makeCounter(start = 0) {\n  let n = start;\n  return {\n    inc: () => ++n,\n    dec: () => --n,\n    val: () => n,\n  };\n}\nconst c = makeCounter(10);\nc.inc(); c.inc();\nconsole.log(c.val()); // 12` },
      { label: "Partial application", code: `function multiply(factor) {\n  return (n) => n * factor;\n}\nconst double = multiply(2);\nconst triple = multiply(3);\nconsole.log(double(5)); // 10\nconsole.log(triple(5)); // 15` },
    ],
    project: "Mini project: Two independent counters — one for likes, one for views.",
    objective: "Print exactly:\nLikes: 3\nViews: 1",
    starterCode: `// Mini Project: Independent Counters\nfunction makeCounter(label) {\n  let count = 0;\n  return {\n    increment() { count++; },\n    reset()     { count = 0; },\n    toString()  { return label + ": " + count; },\n  };\n}\n\nconst likes = makeCounter("Likes");\nconst views = makeCounter("Views");\n\nlikes.increment();\nlikes.increment();\nlikes.increment();\nviews.increment();\n\nconsole.log(likes.toString());\nconsole.log(views.toString());\n`,
    expectedOutput: "Likes: 3\nViews: 1",
    hints: [
      "Each call to makeCounter() creates its own separate count — likes and views are fully independent.",
      "The returned object's methods all close over the same count for that specific counter.",
      "The starter code is already correct — just run it!",
    ],
  },
  {
    id: "js-15",
    title: "Error Handling",
    track: "javascript",
    tier: "pro",
    order: 15,
    description: "try/catch/finally lets your program recover gracefully from errors. Throwing custom errors with meaningful messages makes bugs far easier to diagnose.",
    explanation:
      `try {\n  // risky code\n} catch (err) {\n  // runs only if an error is thrown\n  console.log(err.message);\n} finally {\n  // always runs — cleanup, logging, etc.\n}\n\nBuilt-in error types:\n  Error         — generic\n  TypeError     — wrong type\n  RangeError    — out-of-range value\n  SyntaxError   — invalid syntax\n\nCustom errors:\n  class AppError extends Error {\n    constructor(msg, code) {\n      super(msg);\n      this.name = "AppError";\n      this.code = code;\n    }\n  }`,
    examples: [
      { label: "Basic try/catch", code: `try {\n  JSON.parse("not json");\n} catch (err) {\n  console.log("Caught: " + err.message);\n}\n// Caught: Unexpected token ...` },
      { label: "throw and finally", code: `function checkAge(age) {\n  if (age < 0) throw new RangeError("Age cannot be negative");\n  return age;\n}\ntry {\n  checkAge(-1);\n} catch (e) {\n  console.log(e.message);\n} finally {\n  console.log("Check complete");\n}` },
      { label: "Custom error class", code: `class ValidationError extends Error {\n  constructor(field, msg) {\n    super(msg);\n    this.name = "ValidationError";\n    this.field = field;\n  }\n}\ntry {\n  throw new ValidationError("email", "Invalid format");\n} catch (e) {\n  console.log(e.name + ": " + e.message);\n}` },
    ],
    project: "Mini project: Safe divide — prints the result or a caught error, plus a 'Done' from finally.",
    objective: "Print exactly:\n5\nDone\nError: Cannot divide by zero\nDone",
    starterCode: `// Mini Project: Safe Divide\nfunction divide(a, b) {\n  if (b === 0) throw new Error("Cannot divide by zero");\n  return a / b;\n}\n\ntry {\n  console.log(divide(10, 2));\n} catch (e) {\n  console.log("Error: " + e.message);\n} finally {\n  console.log("Done");\n}\n\ntry {\n  console.log(divide(5, 0));\n} catch (e) {\n  console.log("Error: " + e.message);\n} finally {\n  console.log("Done");\n}\n`,
    expectedOutput: "5\nDone\nError: Cannot divide by zero\nDone",
    hints: [
      "throw stops execution immediately — control jumps to the catch block.",
      "finally runs after try or catch, regardless of whether an error occurred.",
      "The starter code is already correct — just run it!",
    ],
  },
  {
    id: "js-16",
    title: "Generators",
    track: "javascript",
    tier: "pro",
    order: 16,
    description: "Generator functions pause at each yield and resume on the next iteration — enabling lazy sequences, infinite streams, and custom iterators with simple, readable syntax.",
    explanation:
      `Declare with function* and produce values with yield:\n  function* count() {\n    yield 1;\n    yield 2;\n    yield 3;\n  }\n\nAdvance with next():\n  const gen = count();\n  gen.next(); // { value: 1, done: false }\n  gen.next(); // { value: 2, done: false }\n  gen.next(); // { value: undefined, done: true }\n\nfor...of drives generators automatically:\n  for (const n of count()) console.log(n);\n\nSpread also works:\n  [...range(1, 5)]  // [1, 2, 3, 4, 5]`,
    examples: [
      { label: "Basic generator", code: `function* greet() {\n  yield "Hello";\n  yield "World";\n}\nfor (const word of greet()) {\n  console.log(word);\n}\n// Hello\n// World` },
      { label: "Finite range generator", code: `function* range(start, end, step = 1) {\n  for (let i = start; i <= end; i += step) {\n    yield i;\n  }\n}\nconsole.log([...range(1, 5)]);\n// [1, 2, 3, 4, 5]` },
      { label: "Take N from an infinite generator", code: `function take(gen, n) {\n  const result = [];\n  for (const val of gen) {\n    result.push(val);\n    if (result.length >= n) break;\n  }\n  return result;\n}` },
    ],
    project: "Mini project: Fibonacci generator — collect and print the first 8 numbers.",
    objective: "Print exactly:\n0, 1, 1, 2, 3, 5, 8, 13",
    starterCode: `// Mini Project: Fibonacci Generator\nfunction* fibonacci() {\n  let a = 0, b = 1;\n  while (true) {\n    yield a;\n    [a, b] = [b, a + b];\n  }\n}\n\nfunction take(gen, n) {\n  const result = [];\n  for (const val of gen) {\n    result.push(val);\n    if (result.length >= n) break;\n  }\n  return result;\n}\n\nconsole.log(take(fibonacci(), 8).join(", "));\n`,
    expectedOutput: "0, 1, 1, 2, 3, 5, 8, 13",
    hints: [
      "function* declares a generator. Each yield pauses and returns the current value.",
      "[a, b] = [b, a + b] advances both variables to the next Fibonacci pair in one step.",
      "take() breaks out of for...of early once n values are collected.",
    ],
  },
  {
    id: "js-17",
    title: "Regular Expressions",
    track: "javascript",
    tier: "pro",
    order: 17,
    description: "Regular expressions are a pattern language for searching, validating, and transforming strings — built into JavaScript with a concise literal syntax.",
    explanation:
      `Regex literal:  /pattern/flags\n\nCommon flags:\n  g — global (find all matches)\n  i — case-insensitive\n  m — multiline (^ and $ match line boundaries)\n\nKey methods:\n  regex.test(str)          — true/false\n  str.match(regex)         — array of matches (or null)\n  str.replace(regex, rep)  — replace matches\n  str.split(regex)         — split on pattern\n\nPattern syntax:\n  \\d  digit    \\w  word char   \\s  whitespace\n  +  one+      *  zero+        ?  optional\n  ^  start     $  end\n  [abc]  set   (abc)  group`,
    examples: [
      { label: "test() for validation", code: `const emailRe = /^[\\w.+-]+@[\\w-]+\\.[\\w]{2,}$/;\nconsole.log(emailRe.test("alice@example.com")); // true\nconsole.log(emailRe.test("not-an-email"));       // false` },
      { label: "match() to extract", code: `const text = "Order 123 and Order 456";\nconst ids = text.match(/\\d+/g);\nconsole.log(ids); // ['123', '456']` },
      { label: "replace() to clean", code: `const messy = "  hello   world  ";\nconst clean = messy.trim().replace(/\\s+/g, " ");\nconsole.log(clean); // hello world` },
    ],
    project: "Mini project: Validate a list of email addresses and label each valid or invalid.",
    objective: "Print exactly:\nalice@example.com: valid\nnot-an-email: invalid\nbob@test.org: valid\ninvalid@: invalid",
    starterCode: `// Mini Project: Email Validator\nconst emails = [\n  "alice@example.com",\n  "not-an-email",\n  "bob@test.org",\n  "invalid@",\n];\n\nconst pattern = /^[\\w.+-]+@[\\w-]+\\.[\\w]{2,}$/;\n\nemails.forEach(email => {\n  const valid = pattern.test(email);\n  console.log(email + ": " + (valid ? "valid" : "invalid"));\n});\n`,
    expectedOutput: "alice@example.com: valid\nnot-an-email: invalid\nbob@test.org: valid\ninvalid@: invalid",
    hints: [
      "pattern.test(email) returns true if the whole string matches the regex.",
      "^ and $ anchor the pattern — so partial matches don't pass (e.g. 'invalid@' fails because the domain is missing).",
      "The starter code is already correct — just run it!",
    ],
  },

  // ── Python Pro ─────────────────────────────────────────────────────────
  {
    id: "py-01",
    title: "Python: Hello World",
    track: "python",
    tier: "pro",
    order: 1,
    description: "Start your Python journey. Python's clean syntax makes it one of the most readable languages to learn.",
    explanation:
      `Python uses print() to display output — like console.log() in JavaScript.\n\nKey differences from JavaScript:\n  - No semicolons needed\n  - Single and double quotes both work\n  - Indentation is mandatory (not optional)\n  - print() adds a newline automatically`,
    examples: [
      { label: "Basic print", code: `print("Hello, World!")\n# Output: Hello, World!` },
      { label: "Printing different types", code: `print("Text:", "Hello")\nprint("Number:", 42)\nprint("Boolean:", True)\n# Text: Hello\n# Number: 42\n# Boolean: True` },
      { label: "Print with sep and end", code: `print("one", "two", "three", sep="-")\nprint("No newline", end=" ")\nprint("same line")\n# one-two-three\n# No newline same line` },
    ],
    project: "Mini project: Print a business card — name, title, email each on its own line.",
    objective: "Print exactly:\nAlex Johnson\nSoftware Engineer\nalex@codelearn.io",
    starterCode: `# Mini Project: Business Card\n# Print three lines: name, title, email\n\n`,
    expectedOutput: "Alex Johnson\nSoftware Engineer\nalex@codelearn.io",
    hints: [
      "Three separate print() calls.",
      'print("Alex Johnson")',
      "Spelling and punctuation must match exactly.",
    ],
  },
  {
    id: "py-02",
    title: "Python: Variables & Types",
    track: "python",
    tier: "pro",
    order: 2,
    description: "Python variables need no declaration keyword — just assign a value. Python figures out the type automatically.",
    explanation:
      `Python's core types:\n  str    — text: "hello"\n  int    — whole number: 42\n  float  — decimal: 3.14\n  bool   — True or False\n\nNo let/const/var — just assign: name = "Alice"\n\nf-strings make combining text and variables easy:\n  f"Hello, {name}! You are {age} years old."`,
    examples: [
      { label: "Assigning variables", code: `name = "Priya"\nage = 24\nheight = 1.68\nis_student = True\nprint(name, age, height, is_student)\n# Priya 24 1.68 True` },
      { label: "f-strings", code: `language = "Python"\nversion = 3.12\nprint(f"{language} {version} is awesome!")\n# Python 3.12 is awesome!` },
      { label: "Type conversion", code: `year = 2024\nprint("Year: " + str(year))\nprint(int("100") + 50)\n# Year: 2024\n# 150` },
    ],
    project: "Mini project: Product label generator — store product name, price, and stock, then print a formatted label.",
    objective: "Print exactly:\nProduct: Wireless Headphones\nPrice: $49.99\nIn stock: 150 units",
    starterCode: `# Mini Project: Product Label\nproduct = "Wireless Headphones"\nprice = 49.99\nstock = 150\n\n# Print the formatted label using f-strings\n`,
    expectedOutput: "Product: Wireless Headphones\nPrice: $49.99\nIn stock: 150 units",
    hints: [
      'f"Product: {product}"',
      'f"Price: ${price}"',
      'f"In stock: {stock} units"',
    ],
  },
  {
    id: "py-03",
    title: "Python: Lists & Loops",
    track: "python",
    tier: "pro",
    order: 3,
    description: "Python lists are ordered, changeable collections. The for loop in Python is cleaner and more direct than in most languages.",
    explanation:
      `Python lists use square brackets []. Key operations:\n  append(item)  — add to end\n  len(list)     — number of items\n  list[-1]      — last item (negative indexing!)\n\nPython's for loop:\n  for item in my_list:\n      print(item)\n\nNo i++, no length check — Python handles it automatically. enumerate() gives you index + value together.`,
    examples: [
      { label: "Creating and accessing", code: `fruits = ["apple", "banana", "cherry"]\nprint(fruits[0])   # apple\nprint(fruits[-1])  # cherry\nprint(len(fruits)) # 3` },
      { label: "For loop over a list", code: `animals = ["cat", "dog", "bird"]\nfor animal in animals:\n    print(f"I have a {animal}")\n# I have a cat\n# I have a dog\n# I have a bird` },
      { label: "Enumerate for index + value", code: `tasks = ["code", "test", "deploy"]\nfor i, task in enumerate(tasks, start=1):\n    print(f"{i}. {task}")\n# 1. code\n# 2. test\n# 3. deploy` },
    ],
    project: "Mini project: Weekly planner — print 5 tasks as a numbered checklist.",
    objective: "Print exactly:\n1. Morning run\n2. Team standup\n3. Code review\n4. Lunch break\n5. Write tests",
    starterCode: `# Mini Project: Weekly Planner\ntasks = [\n    "Morning run",\n    "Team standup",\n    "Code review",\n    "Lunch break",\n    "Write tests",\n]\n\n# Print a numbered checklist using enumerate\n`,
    expectedOutput: "1. Morning run\n2. Team standup\n3. Code review\n4. Lunch break\n5. Write tests",
    hints: [
      "for i, task in enumerate(tasks, start=1):",
      'print(f"{i}. {task}")',
      "enumerate(list, start=1) gives (1, item1), (2, item2), ...",
    ],
  },
  {
    id: "py-04",
    title: "Python: Functions",
    track: "python",
    tier: "pro",
    order: 4,
    description: "Python functions use the def keyword. They support default parameters and can return multiple values.",
    explanation:
      `Define a function with def, a name, parentheses, a colon, and an indented body.\n\nFunctions can have:\n  - Required parameters\n  - Default parameter values (def greet(name="World"))\n  - Multiple return values: return a, b\n\nPython also supports docstrings — triple-quoted strings right after def — to document what a function does.`,
    examples: [
      { label: "Basic function with return", code: `def square(n):\n    return n * n\nprint(square(7))  # 49` },
      { label: "Default parameters", code: `def greet(name="World"):\n    return f"Hello, {name}!"\nprint(greet())         # Hello, World!\nprint(greet("Fatima")) # Hello, Fatima!` },
      { label: "Multiple return values", code: `def min_max(numbers):\n    return min(numbers), max(numbers)\nlow, high = min_max([3, 1, 9, 5])\nprint(f"Min: {low}, Max: {high}")\n# Min: 1, Max: 9` },
    ],
    project: "Mini project: BMI calculator — compute BMI from weight and height, then return the category.",
    objective: "Print exactly:\nBMI: 22.9\nCategory: Normal weight",
    starterCode: `# Mini Project: BMI Calculator\n\ndef bmi(weight_kg, height_m):\n    # return weight_kg / (height_m ** 2), rounded to 1 decimal\n    pass\n\ndef category(bmi_value):\n    # Underweight: < 18.5\n    # Normal weight: 18.5 – 24.9\n    # Overweight: 25 – 29.9\n    # Obese: 30+\n    pass\n\nresult = bmi(70, 1.75)\nprint(f"BMI: {result}")\nprint(f"Category: {category(result)}")\n`,
    expectedOutput: "BMI: 22.9\nCategory: Normal weight",
    hints: [
      "bmi(): return round(weight_kg / (height_m ** 2), 1)",
      "category(): use if/elif/else chains.",
      "70 / (1.75²) ≈ 22.857 → rounds to 22.9",
    ],
  },
  {
    id: "py-05",
    title: "Python: Dictionaries",
    track: "python",
    tier: "pro",
    order: 5,
    description: "Dictionaries store key-value pairs — the Python equivalent of JavaScript objects, and incredibly powerful.",
    explanation:
      `Create a dictionary with curly braces {} and key: value pairs.\n\nKey operations:\n  d["key"]                — read a value\n  d["key"] = val          — set or update\n  d.get("key", default)   — safe read (no error if missing)\n  d.items()               — (key, value) pairs — great for looping`,
    examples: [
      { label: "Creating and reading", code: `person = {"name": "Lena", "age": 29, "city": "Berlin"}\nprint(person["name"])\nprint(person.get("country", "Unknown"))\n# Lena\n# Unknown` },
      { label: "Looping with .items()", code: `scores = {"Alice": 92, "Bob": 78, "Carol": 85}\nfor name, score in scores.items():\n    print(f"{name}: {score}")\n# Alice: 92\n# Bob: 78\n# Carol: 85` },
      { label: "Building dynamically", code: `inventory = {}\ninventory["apples"] = 50\ninventory["oranges"] = 30\nprint(f"Apples: {inventory['apples']}")\n# Apples: 50` },
    ],
    project: "Mini project: Contact book — 3 contacts (name → phone), print each formatted.",
    objective: "Print exactly:\nAlice: 555-1234\nBob: 555-5678\nCarol: 555-9012",
    starterCode: `# Mini Project: Contact Book\ncontacts = {\n    "Alice": "555-1234",\n    "Bob": "555-5678",\n    "Carol": "555-9012",\n}\n\n# Print each contact using .items()\n`,
    expectedOutput: "Alice: 555-1234\nBob: 555-5678\nCarol: 555-9012",
    hints: [
      "for name, phone in contacts.items():",
      'print(f"{name}: {phone}")',
      "Order matters — Alice first, Bob second, Carol third.",
    ],
  },
  {
    id: "py-06",
    title: "Python: String Methods",
    track: "python",
    tier: "pro",
    order: 6,
    description: "Python strings have dozens of built-in methods for cleaning, searching, and transforming text.",
    explanation:
      `Common string methods:\n  .upper()             — uppercase\n  .lower()             — lowercase\n  .strip()             — remove leading/trailing whitespace\n  .replace(old, new)   — substitute text\n  .split(sep)          — split into a list\n  .join(iterable)      — join a list into a string\n  .title()             — capitalize each word\n\nStrings are immutable — methods always return a new string.`,
    examples: [
      { label: "Case and whitespace", code: `text = "  Hello World  "\nprint(text.strip())\nprint(text.strip().upper())\nprint(text.strip().lower())\n# Hello World\n# HELLO WORLD\n# hello world` },
      { label: "split and join", code: `sentence = "Python is fun"\nwords = sentence.split(" ")\nprint(words)\nprint("-".join(words))\n# ['Python', 'is', 'fun']\n# Python-is-fun` },
      { label: "replace and find", code: `code = "Hello, World!"\nprint(code.replace("World", "Python"))\nprint(code.find("World"))  # index 7\n# Hello, Python!\n# 7` },
    ],
    project: "Mini project: Text processor — clean a messy string and print it in three formats.",
    objective: "Print exactly:\nPYTHON IS AWESOME\npython is awesome\nPython-Is-Awesome",
    starterCode: `# Mini Project: Text Processor\ntext = "  Python is awesome  "\n\n# 1. Strip whitespace, then print uppercase\n# 2. Print lowercase\n# 3. Print title case with spaces replaced by dashes\n`,
    expectedOutput: "PYTHON IS AWESOME\npython is awesome\nPython-Is-Awesome",
    hints: [
      "cleaned = text.strip()",
      "print(cleaned.upper()) / print(cleaned.lower())",
      "print(cleaned.title().replace(' ', '-'))",
    ],
  },
  {
    id: "py-07",
    title: "Python: List Comprehensions",
    track: "python",
    tier: "pro",
    order: 7,
    description: "List comprehensions are a Pythonic shorthand for creating lists — concise, readable, and faster than a for loop.",
    explanation:
      `Syntax: [expression for item in iterable if condition]\n\nThe if condition is optional. The expression transforms each item.\n\nExamples:\n  [x**2 for x in range(5)]         — squares: [0,1,4,9,16]\n  [x for x in nums if x > 0]       — filter positives\n  [x.upper() for x in words]       — uppercase all\n\nrange(start, stop) generates numbers from start up to (not including) stop.`,
    examples: [
      { label: "Basic comprehension", code: `squares = [x**2 for x in range(1, 6)]\nprint(squares)\n# [1, 4, 9, 16, 25]` },
      { label: "Comprehension with filter", code: `nums = [1, -2, 3, -4, 5]\npositives = [x for x in nums if x > 0]\nprint(positives)\n# [1, 3, 5]` },
      { label: "Transform strings", code: `words = ["python", "is", "great"]\nupper = [w.upper() for w in words]\nprint(upper)\n# ['PYTHON', 'IS', 'GREAT']` },
    ],
    project: "Mini project: Generate a squares list and an evens list using comprehensions.",
    objective: "Print exactly:\n[1, 4, 9, 16, 25]\n[2, 4, 6, 8, 10]",
    starterCode: `# Mini Project: List Comprehensions\n\n# Create a list of squares from 1 to 5: [1, 4, 9, 16, 25]\nsquares = # your list comprehension\n\n# Create even numbers from 1 to 10: [2, 4, 6, 8, 10]\nevens = # your list comprehension (hint: use if x % 2 == 0)\n\nprint(squares)\nprint(evens)\n`,
    expectedOutput: "[1, 4, 9, 16, 25]\n[2, 4, 6, 8, 10]",
    hints: [
      "squares = [x**2 for x in range(1, 6)]",
      "evens = [x for x in range(1, 11) if x % 2 == 0]",
      "x % 2 == 0 is True for even numbers (no remainder when divided by 2).",
    ],
  },
  {
    id: "py-08",
    title: "Python: Classes & OOP",
    track: "python",
    tier: "pro",
    order: 8,
    description: "Classes are blueprints for creating objects. Object-Oriented Programming (OOP) organises code around data and behaviour.",
    explanation:
      `Define a class with class ClassName:. The __init__ method is the constructor — it runs when you create a new object.\n\nself refers to the current object. Every method must have self as the first parameter.\n\nClasses bundle data (attributes) and behaviour (methods) together. An instance is one specific object created from the class.`,
    examples: [
      { label: "Basic class", code: `class Dog:\n    def __init__(self, name, breed):\n        self.name = name\n        self.breed = breed\n\n    def speak(self):\n        return f"{self.name} says Woof!"\n\nd = Dog("Rex", "Labrador")\nprint(d.speak())\n# Rex says Woof!` },
      { label: "Attributes and methods", code: `class Counter:\n    def __init__(self):\n        self.count = 0\n\n    def increment(self):\n        self.count += 1\n\nc = Counter()\nc.increment()\nc.increment()\nprint(c.count)  # 2` },
      { label: "Inheritance", code: `class Animal:\n    def __init__(self, name):\n        self.name = name\n    def speak(self):\n        return "..."\n\nclass Cat(Animal):\n    def speak(self):\n        return f"{self.name} says Meow!"\n\nprint(Cat("Mochi").speak())\n# Mochi says Meow!` },
    ],
    project: "Mini project: Rectangle class with area() and perimeter() methods.",
    objective: "Print exactly:\nArea: 15\nPerimeter: 16",
    starterCode: `# Mini Project: Rectangle Class\n\nclass Rectangle:\n    def __init__(self, width, height):\n        self.width = width\n        self.height = height\n\n    def area(self):\n        # return width * height\n        pass\n\n    def perimeter(self):\n        # return 2 * (width + height)\n        pass\n\nr = Rectangle(5, 3)\nprint(f"Area: {r.area()}")\nprint(f"Perimeter: {r.perimeter()}")\n`,
    expectedOutput: "Area: 15\nPerimeter: 16",
    hints: [
      "area(): return self.width * self.height",
      "perimeter(): return 2 * (self.width + self.height)",
      "Replace pass with the return statement.",
    ],
  },
  {
    id: "py-09",
    title: "Python: Error Handling",
    track: "python",
    tier: "pro",
    order: 9,
    description: "Real programs encounter unexpected input. try/except lets your code handle errors gracefully instead of crashing.",
    explanation:
      `Structure:\n  try:\n      risky code here\n  except SomeError:\n      handle the error\n  finally:\n      always runs (cleanup)\n\nCommon exception types:\n  ZeroDivisionError  — dividing by zero\n  ValueError         — wrong type conversion (int("abc"))\n  TypeError          — wrong type for operation\n  KeyError           — missing dict key\n\nYou can catch multiple errors with multiple except blocks.`,
    examples: [
      { label: "ZeroDivisionError", code: `try:\n    result = 10 / 0\nexcept ZeroDivisionError:\n    print("Cannot divide by zero!")\n# Cannot divide by zero!` },
      { label: "ValueError", code: `try:\n    num = int("abc")\nexcept ValueError as e:\n    print(f"Error: {e}")\n# Error: invalid literal for int() with base 10: 'abc'` },
      { label: "Multiple except + finally", code: `try:\n    x = int(input_val)\n    result = 100 / x\nexcept ValueError:\n    print("Not a number")\nexcept ZeroDivisionError:\n    print("Cannot divide by zero")\nfinally:\n    print("Done")` },
    ],
    project: "Mini project: Safe division function that returns the result or an error message.",
    objective: "Print exactly:\nResult: 5.0\nError: cannot divide by zero",
    starterCode: `# Mini Project: Safe Division\n\ndef safe_divide(a, b):\n    try:\n        # divide a by b and return f"Result: {result}"\n        pass\n    except ZeroDivisionError:\n        # return the error message\n        pass\n\nprint(safe_divide(10, 2))\nprint(safe_divide(5, 0))\n`,
    expectedOutput: "Result: 5.0\nError: cannot divide by zero",
    hints: [
      "result = a / b  then  return f\"Result: {result}\"",
      'return "Error: cannot divide by zero"',
      "10 / 2 in Python 3 returns 5.0 (float division).",
    ],
  },
  {
    id: "py-10",
    title: "Python: Standard Library",
    track: "python",
    tier: "pro",
    order: 10,
    description: "Python's standard library gives you hundreds of useful modules for maths, dates, random numbers, and more — no installation needed.",
    explanation:
      `Import a module with import module or from module import function.\n\nEssential modules:\n  math       — sqrt, pi, ceil, floor, log\n  random     — randint, choice, shuffle\n  datetime   — date and time operations\n  os         — file system paths\n\nUsing the math module:\n  math.sqrt(16)   → 4.0\n  math.ceil(3.2)  → 4\n  math.pi         → 3.141592653589793`,
    examples: [
      { label: "math module", code: `import math\nprint(math.sqrt(25))    # 5.0\nprint(math.ceil(3.1))   # 4\nprint(round(math.pi, 4)) # 3.1416` },
      { label: "random module", code: `import random\nprint(random.randint(1, 10))  # random int 1-10\ncolours = ["red", "green", "blue"]\nprint(random.choice(colours)) # random colour` },
      { label: "datetime module", code: `from datetime import datetime\nnow = datetime.now()\nprint(f"Year: {now.year}")\nprint(f"Month: {now.month}")` },
    ],
    project: "Mini project: Use the math module to compute sqrt(144), rounded pi, and ceil(3.2).",
    objective: "Print exactly:\nsqrt(144) = 12.0\npi rounded = 3.14\nceil(3.2) = 4",
    starterCode: `# Mini Project: Math Library\nimport math\n\n# Use math.sqrt, math.pi (round to 2 decimals), math.ceil\n\nprint(f"sqrt(144) = {math.sqrt(144)}")\nprint(f"pi rounded = {round(math.pi, 2)}")\nprint(f"ceil(3.2) = {math.ceil(3.2)}")\n`,
    expectedOutput: "sqrt(144) = 12.0\npi rounded = 3.14\nceil(3.2) = 4",
    hints: [
      "math.sqrt(144) returns 12.0",
      "round(math.pi, 2) returns 3.14",
      "math.ceil(3.2) returns 4 — this starter code is complete, just run it!",
    ],
  },

  // ── Python Intermediate & Advanced ────────────────────────────────────
  {
    id: "py-11",
    title: "Python: Tuples & Sets",
    track: "python",
    tier: "pro",
    order: 11,
    description: "Tuples are immutable sequences. Sets are unordered collections of unique elements with fast membership testing and powerful set algebra.",
    explanation:
      `Tuple — immutable, ordered:\n  point = (3, 7)\n  x, y = point            # unpacking\n  a, *rest = (1, 2, 3, 4)  # splat unpacking\n\nSet — mutable, unordered, unique:\n  s = {1, 2, 3}\n  s.add(4)\n  4 in s   # True\n\nSet operations:\n  a | b   — union (all elements from both)\n  a & b   — intersection (only shared elements)\n  a - b   — difference (in a but not in b)\n  a ^ b   — symmetric difference (in one but not both)`,
    examples: [
      { label: "Tuple unpacking", code: `coords = (10, 20, 30)\nx, y, z = coords\nprint(f"x={x}, y={y}, z={z}")\n# x=10, y=20, z=30` },
      { label: "Set — unique elements", code: `tags = ["python", "sql", "python", "web", "sql"]\nunique = set(tags)\nprint(sorted(unique))\n# ['python', 'sql', 'web']` },
      { label: "Set operations", code: `a = {"Python", "SQL", "Git"}\nb = {"SQL", "Docker", "Python"}\nprint(sorted(a & b))  # intersection\nprint(sorted(a | b))  # union\nprint(sorted(a - b))  # only in a` },
    ],
    project: "Mini project: Find skills unique to each team, common to both, and all combined.",
    objective: "Print exactly:\n['Git']\n['Python', 'SQL']\n['Docker', 'Git', 'Python', 'SQL']",
    starterCode: `# Mini Project: Skill Comparison\nskills_a = {"Python", "SQL", "Git"}\nskills_b = {"SQL", "Docker", "Python"}\n\nonly_a = skills_a - skills_b\ncommon = skills_a & skills_b\nall_skills = skills_a | skills_b\n\nprint(sorted(only_a))\nprint(sorted(common))\nprint(sorted(all_skills))\n`,
    expectedOutput: "['Git']\n['Python', 'SQL']\n['Docker', 'Git', 'Python', 'SQL']",
    hints: [
      "- gives elements in left set that are NOT in right set.",
      "& gives elements present in BOTH sets.",
      "sorted() converts the set to a sorted list for consistent output.",
    ],
  },
  {
    id: "py-12",
    title: "Python: *args & **kwargs",
    track: "python",
    tier: "pro",
    order: 12,
    description: "*args and **kwargs let functions accept any number of arguments — making them flexible without overloading.",
    explanation:
      `*args — packs extra positional arguments into a tuple:\n  def total(*numbers):\n      return sum(numbers)\n  total(1, 2, 3, 4)   # works with any count\n\n**kwargs — packs extra keyword arguments into a dict:\n  def show(**info):\n      for k, v in info.items():\n          print(f"{k}: {v}")\n  show(name="Alice", age=30)\n\nYou can combine them:\n  def func(required, *args, **kwargs): ...\n\n* and ** also work when calling: func(*my_list, **my_dict)`,
    examples: [
      { label: "*args — any number of positional args", code: `def multiply(*numbers):\n    result = 1\n    for n in numbers:\n        result *= n\n    return result\nprint(multiply(2, 3, 4))\n# 24` },
      { label: "**kwargs — any keyword arguments", code: `def profile(**info):\n    for key, val in info.items():\n        print(f"{key}: {val}")\nprofile(name="Sam", role="Dev", level=3)\n# name: Sam / role: Dev / level: 3` },
      { label: "Unpacking with * and **", code: `nums = [1, 2, 3]\nprint(max(*nums))  # same as max(1, 2, 3)\n\ndefaults = {"sep": "-", "end": "!\n"}\nprint("a", "b", "c", **defaults)\n# a-b-c!` },
    ],
    project: "Mini project: Stats function that accepts any number of scores.",
    objective: "Print exactly:\nMin: 61\nMax: 95\nAvg: 79.0",
    starterCode: `# Mini Project: Flexible Stats\n\ndef stats(*scores):\n    lo = min(scores)\n    hi = max(scores)\n    avg = round(sum(scores) / len(scores), 1)\n    return lo, hi, avg\n\nlo, hi, avg = stats(72, 88, 95, 61, 79)\nprint(f"Min: {lo}")\nprint(f"Max: {hi}")\nprint(f"Avg: {avg}")\n`,
    expectedOutput: "Min: 61\nMax: 95\nAvg: 79.0",
    hints: [
      "*scores collects all positional arguments into a tuple.",
      "min(), max(), sum() all work on tuples directly.",
      "round(79.0, 1) stays 79.0 — Python keeps the decimal for floats.",
    ],
  },
  {
    id: "py-13",
    title: "Python: Lambda & Higher-Order Functions",
    track: "python",
    tier: "pro",
    order: 13,
    description: "Lambda creates a one-liner anonymous function. map(), filter(), and sorted() accept functions as arguments — making data transformations concise and expressive.",
    explanation:
      `Lambda syntax:\n  double = lambda x: x * 2\n  add = lambda a, b: a + b\n\nHigher-order functions take functions as arguments:\n  map(fn, iterable)     — apply fn to each item\n  filter(fn, iterable)  — keep items where fn returns True\n  sorted(iterable, key=fn) — sort by computed key\n\nLambda is most useful as a throwaway key/callback:\n  sorted(people, key=lambda p: p["age"])\n\nFor anything more complex, prefer a named def.`,
    examples: [
      { label: "Lambda as a key", code: `words = ["banana", "kiwi", "apple", "cherry"]\nby_length = sorted(words, key=lambda w: len(w))\nprint(by_length)\n# ['kiwi', 'apple', 'banana', 'cherry']` },
      { label: "map() to transform", code: `prices = [10, 20, 30]\ndiscounted = list(map(lambda p: round(p * 0.9, 2), prices))\nprint(discounted)\n# [9.0, 18.0, 27.0]` },
      { label: "filter() to select", code: `scores = [45, 82, 91, 33, 76]\npassing = list(filter(lambda s: s >= 60, scores))\nprint(passing)\n# [82, 91, 76]` },
    ],
    project: "Mini project: Filter products over $100 and sort cheapest first.",
    objective: "Print exactly:\nMonitor: $349\nLaptop: $999",
    starterCode: `# Mini Project: Product Filter\nproducts = [\n    {"name": "Laptop",   "price": 999},\n    {"name": "Mouse",    "price": 29},\n    {"name": "Monitor",  "price": 349},\n    {"name": "Keyboard", "price": 79},\n]\n\nexpensive = list(filter(lambda p: p["price"] >= 100, products))\nsorted_exp = sorted(expensive, key=lambda p: p["price"])\n\nfor p in sorted_exp:\n    print(f"{p['name']}: \${p['price']}")\n`,
    expectedOutput: "Monitor: $349\nLaptop: $999",
    hints: [
      "filter() keeps products where price >= 100 — that's Monitor and Laptop.",
      "sorted(..., key=lambda p: p['price']) sorts by price ascending (cheapest first).",
      "The starter code is already correct — just run it!",
    ],
  },
  {
    id: "py-14",
    title: "Python: Generators",
    track: "python",
    tier: "pro",
    order: 14,
    description: "Generators produce values one at a time using yield — letting you work with infinite or very large sequences without loading them all into memory.",
    explanation:
      `A generator function uses yield instead of return:\n  def count_up(n):\n      for i in range(n):\n          yield i\n\nEach call to next() resumes from where yield left off.\nA for loop calls next() automatically.\n\nGenerator expressions (like list comprehensions but lazy):\n  squares = (x**2 for x in range(100))\n\nWhy generators?\n  - Memory-efficient — one item at a time\n  - Work with infinite sequences\n  - Fast startup (no upfront computation)`,
    examples: [
      { label: "Simple generator function", code: `def countdown(n):\n    while n > 0:\n        yield n\n        n -= 1\n\nfor num in countdown(3):\n    print(num)\n# 3 / 2 / 1` },
      { label: "next() — advance manually", code: `def letters():\n    yield "a"\n    yield "b"\n    yield "c"\n\ng = letters()\nprint(next(g))  # a\nprint(next(g))  # b` },
      { label: "Generator expression", code: `evens = (x for x in range(10) if x % 2 == 0)\nprint(list(evens))\n# [0, 2, 4, 6, 8]` },
    ],
    project: "Mini project: Fibonacci generator — print the first 8 Fibonacci numbers.",
    objective: "Print exactly:\n[0, 1, 1, 2, 3, 5, 8, 13]",
    starterCode: `# Mini Project: Fibonacci Generator\n\ndef fibonacci():\n    a, b = 0, 1\n    while True:\n        yield a\n        a, b = b, a + b\n\ngen = fibonacci()\nresult = [next(gen) for _ in range(8)]\nprint(result)\n`,
    expectedOutput: "[0, 1, 1, 2, 3, 5, 8, 13]",
    hints: [
      "yield a pauses and returns the current value of a.",
      "a, b = b, a + b advances to the next Fibonacci pair in one step.",
      "next(gen) called 8 times gives the first 8 numbers: 0,1,1,2,3,5,8,13.",
    ],
  },
  {
    id: "py-15",
    title: "Python: Decorators",
    track: "python",
    tier: "pro",
    order: 15,
    description: "Decorators wrap a function to add behaviour before or after it runs — without changing the function itself. They power logging, timing, caching, and access control.",
    explanation:
      `A decorator is a function that takes a function and returns a new function:\n  def my_decorator(func):\n      def wrapper(*args, **kwargs):\n          # code before\n          result = func(*args, **kwargs)\n          # code after\n          return result\n      return wrapper\n\nApply with @ syntax:\n  @my_decorator\n  def greet(): ...\n  # same as: greet = my_decorator(greet)\n\nUse functools.wraps to preserve the original function's name and docstring.`,
    examples: [
      { label: "Simple logger decorator", code: `def logger(func):\n    def wrapper(*args, **kwargs):\n        print(f"Calling {func.__name__}")\n        return func(*args, **kwargs)\n    return wrapper\n\n@logger\ndef add(a, b):\n    return a + b\n\nprint(add(3, 4))\n# Calling add\n# 7` },
      { label: "Decorator that validates input", code: `def positive_only(func):\n    def wrapper(n):\n        if n < 0:\n            raise ValueError("Must be positive")\n        return func(n)\n    return wrapper\n\n@positive_only\ndef square(n):\n    return n * n\n\nprint(square(5))  # 25` },
      { label: "functools.wraps preserves metadata", code: `from functools import wraps\ndef log(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        print(f"Running {func.__name__}")\n        return func(*args, **kwargs)\n    return wrapper` },
    ],
    project: "Mini project: Build a @logger decorator that prints when a function starts and finishes.",
    objective: "Print exactly:\nCalling: greet\nHello, Alice!\nDone: greet",
    starterCode: `# Mini Project: Logger Decorator\n\ndef logger(func):\n    def wrapper(*args, **kwargs):\n        print(f"Calling: {func.__name__}")\n        result = func(*args, **kwargs)\n        print(f"Done: {func.__name__}")\n        return result\n    return wrapper\n\n@logger\ndef greet(name):\n    print(f"Hello, {name}!")\n\ngreet("Alice")\n`,
    expectedOutput: "Calling: greet\nHello, Alice!\nDone: greet",
    hints: [
      "wrapper() runs before and after func() — sandwiching the original call.",
      "func.__name__ gives the decorated function's original name.",
      "The starter code is already correct — just run it!",
    ],
  },
  {
    id: "py-16",
    title: "Python: Regular Expressions",
    track: "python",
    tier: "pro",
    order: 16,
    description: "Regular expressions (regex) are a mini-language for pattern matching inside strings — used for validation, extraction, and find-and-replace on real-world text.",
    explanation:
      `import re\n\nKey functions:\n  re.search(pattern, text)       — find first match (or None)\n  re.findall(pattern, text)      — list of all matches\n  re.sub(pattern, repl, text)    — replace all matches\n  re.match(pattern, text)        — match at start of string\n\nEssential pattern syntax:\n  \\d    digit (0–9)\n  \\w    word character (a–z, A–Z, 0–9, _)\n  \\s    whitespace\n  .     any character (except newline)\n  +     one or more\n  *     zero or more\n  ?     zero or one\n  []    character class: [aeiou], [0-9]\n  ^     start of string\n  $     end of string\n  ()    capture group`,
    examples: [
      { label: "re.search — first match", code: `import re\ntext = "Order #12345 placed on 2024-03-15"\nmatch = re.search(r'\\d+', text)\nif match:\n    print(match.group())  # 12345` },
      { label: "re.findall — all matches", code: `import re\ntext = "Prices: $10, $25, and $99"\nnumbers = re.findall(r'\\d+', text)\nprint(numbers)  # ['10', '25', '99']` },
      { label: "re.sub — find and replace", code: `import re\ntext = "Hello   World"\nclean = re.sub(r'\\s+', ' ', text)\nprint(clean)  # Hello World` },
    ],
    project: "Mini project: Extract all email addresses from a block of text.",
    objective: "Print exactly:\nhello@codelearn.io\nsupport@codelearn.io",
    starterCode: `# Mini Project: Email Extractor\nimport re\n\ntext = "Contact us at hello@codelearn.io or support@codelearn.io for help."\nemails = re.findall(r'[\\w.+-]+@[\\w-]+\\.\\w+', text)\nfor email in emails:\n    print(email)\n`,
    expectedOutput: "hello@codelearn.io\nsupport@codelearn.io",
    hints: [
      "re.findall returns a list of all non-overlapping matches.",
      "[\\w.+-]+ matches the local part before @, [\\w-]+ matches the domain, \\.\\w+ matches .io.",
      "The starter code is already correct — just run it!",
    ],
  },
  {
    id: "py-17",
    title: "Python: Type Hints & Dataclasses",
    track: "python",
    tier: "pro",
    order: 17,
    description: "Type hints document what types your functions expect and return. Dataclasses auto-generate boilerplate so you can define data containers with just the fields.",
    explanation:
      `Type hints (PEP 484):\n  def greet(name: str) -> str:\n  def total(prices: list[float]) -> float:\n  def find(key: str) -> str | None:   # Python 3.10+\n\nType hints are NOT enforced at runtime — they're for editors, linters, and readers.\n\n@dataclass (from dataclasses module):\n  - Auto-generates __init__, __repr__, __eq__\n  - Fields with defaults must come after required fields\n  - dataclasses.field() for mutable defaults (lists, dicts)\n\n  @dataclass\n  class Point:\n      x: float\n      y: float\n      label: str = "origin"`,
    examples: [
      { label: "Type-hinted function", code: `def bmi(weight: float, height: float) -> float:\n    return round(weight / height ** 2, 1)\n\nprint(bmi(70, 1.75))  # 22.9` },
      { label: "Basic dataclass", code: `from dataclasses import dataclass\n\n@dataclass\nclass Point:\n    x: float\n    y: float\n\np = Point(3.0, 4.0)\nprint(p)          # Point(x=3.0, y=4.0)\nprint(p.x, p.y)   # 3.0 4.0` },
      { label: "Dataclass with default and method", code: `from dataclasses import dataclass\n\n@dataclass\nclass Circle:\n    radius: float\n    color: str = "red"\n\n    def area(self) -> float:\n        import math\n        return round(math.pi * self.radius ** 2, 2)\n\nc = Circle(5.0)\nprint(c)\nprint(c.area())  # 78.54` },
    ],
    project: "Mini project: Dataclass for a Product with a discounted price method.",
    objective: "Print exactly:\nProduct(name='Laptop', price=999.99, in_stock=True)\n10% off: $899.99",
    starterCode: `# Mini Project: Product Dataclass\nfrom dataclasses import dataclass\n\n@dataclass\nclass Product:\n    name: str\n    price: float\n    in_stock: bool = True\n\n    def discounted(self, pct: float) -> float:\n        return round(self.price * (1 - pct / 100), 2)\n\nlaptop = Product("Laptop", 999.99)\nprint(laptop)\nprint(f"10% off: \${laptop.discounted(10)}")\n`,
    expectedOutput: "Product(name='Laptop', price=999.99, in_stock=True)\n10% off: $899.99",
    hints: [
      "@dataclass auto-generates __repr__, so print(laptop) shows all fields.",
      "discounted(10) computes 999.99 * 0.90 = 899.991 → round to 2 decimals = 899.99.",
      "The starter code is already correct — just run it!",
    ],
  },

  // ── SQL Pro ────────────────────────────────────────────────────────────
  {
    id: "sql-01",
    title: "SQL: SELECT Basics",
    track: "sql",
    tier: "pro",
    order: 1,
    description: "SQL is the language of databases. SELECT is how you read data — the most used statement in all of SQL.",
    explanation:
      `SQL (Structured Query Language) lets you create, read, update, and delete data stored in tables.\n\nA table has rows (records) and columns (fields). SELECT retrieves rows from a table.\n\nBasic syntax:\n  SELECT columns FROM table;\n\nUse * to select all columns. Column names are separated by commas. SQL keywords are conventionally written in UPPERCASE.`,
    examples: [
      { label: "Select all columns", code: `SELECT * FROM users;\n-- Returns every column and row in the users table` },
      { label: "Select specific columns", code: `SELECT name, email FROM users;\n-- Returns only the name and email columns` },
      { label: "Column aliases with AS", code: `SELECT name AS full_name, salary AS annual_salary\nFROM employees;\n-- Renames columns in the result` },
    ],
    project: "Mini project: You have an employees table. Retrieve all employees to see the full dataset.",
    objective: "Run: SELECT * FROM employees;\nExpect all 6 employees in insertion order.",
    starterCode: `-- Database is ready. Table: employees (id, name, department, salary)\n-- Select all employees\n\nSELECT * FROM employees;\n`,
    setupSql: `CREATE TABLE employees (id INTEGER, name TEXT, department TEXT, salary INTEGER);
INSERT INTO employees VALUES (1, 'Alice', 'Engineering', 85000);
INSERT INTO employees VALUES (2, 'Bob', 'Engineering', 72000);
INSERT INTO employees VALUES (3, 'Carol', 'Engineering', 90000);
INSERT INTO employees VALUES (4, 'David', 'Marketing', 62000);
INSERT INTO employees VALUES (5, 'Eve', 'Marketing', 70000);
INSERT INTO employees VALUES (6, 'Frank', 'HR', 55000);`,
    expectedOutput: "id | name | department | salary\n1 | Alice | Engineering | 85000\n2 | Bob | Engineering | 72000\n3 | Carol | Engineering | 90000\n4 | David | Marketing | 62000\n5 | Eve | Marketing | 70000\n6 | Frank | HR | 55000",
    hints: [
      "SELECT * means select all columns.",
      "FROM specifies the table name.",
      "The starter code is already correct — just run it!",
    ],
  },
  {
    id: "sql-02",
    title: "SQL: WHERE Clause",
    track: "sql",
    tier: "pro",
    order: 2,
    description: "WHERE filters rows based on a condition — like if/else for your database query.",
    explanation:
      `Add WHERE after FROM to filter rows:\n  SELECT * FROM employees WHERE department = 'Engineering';\n\nComparison operators:\n  =    equal\n  !=   not equal\n  >    greater than\n  <    less than\n  >=   greater than or equal\n  <=   less than or equal\n\nCombine conditions:\n  AND  — both must be true\n  OR   — either can be true\n  LIKE — pattern match ('A%' = starts with A)`,
    examples: [
      { label: "Simple equality filter", code: `SELECT * FROM employees\nWHERE department = 'Engineering';\n-- Returns only Engineering employees` },
      { label: "Numeric comparison", code: `SELECT name, salary FROM employees\nWHERE salary > 70000;\n-- Returns employees earning more than 70k` },
      { label: "AND / OR", code: `SELECT name FROM employees\nWHERE department = 'Marketing' AND salary >= 65000;\n-- Returns Marketing employees earning 65k+` },
    ],
    project: "Mini project: Find all employees in the Engineering department.",
    objective: "Print exactly:\nname | salary\nAlice | 85000\nBob | 72000\nCarol | 90000",
    starterCode: `-- Table: employees (id, name, department, salary)\n-- Select name and salary for Engineering employees only\n\nSELECT name, salary FROM employees\nWHERE department = 'Engineering';\n`,
    setupSql: `CREATE TABLE employees (id INTEGER, name TEXT, department TEXT, salary INTEGER);
INSERT INTO employees VALUES (1, 'Alice', 'Engineering', 85000);
INSERT INTO employees VALUES (2, 'Bob', 'Engineering', 72000);
INSERT INTO employees VALUES (3, 'Carol', 'Engineering', 90000);
INSERT INTO employees VALUES (4, 'David', 'Marketing', 62000);
INSERT INTO employees VALUES (5, 'Eve', 'Marketing', 70000);
INSERT INTO employees VALUES (6, 'Frank', 'HR', 55000);`,
    expectedOutput: "name | salary\nAlice | 85000\nBob | 72000\nCarol | 90000",
    hints: [
      "WHERE department = 'Engineering' — note single quotes around text values.",
      "SELECT name, salary selects only those two columns.",
      "The starter code is already correct — just run it!",
    ],
  },
  {
    id: "sql-03",
    title: "SQL: ORDER BY",
    track: "sql",
    tier: "pro",
    order: 3,
    description: "ORDER BY sorts your results. Without it, the database can return rows in any order.",
    explanation:
      `Syntax:\n  SELECT ... FROM ... ORDER BY column [ASC|DESC];\n\n  ASC  — ascending (default, A→Z, 0→9)\n  DESC — descending (Z→A, 9→0)\n\nYou can sort by multiple columns:\n  ORDER BY department ASC, salary DESC\n  (sorts by department first, then by salary within each department)\n\nORDER BY comes after WHERE.`,
    examples: [
      { label: "Sort ascending (default)", code: `SELECT name, salary FROM employees\nORDER BY salary;\n-- Lowest salary first` },
      { label: "Sort descending", code: `SELECT name, salary FROM employees\nORDER BY salary DESC;\n-- Highest salary first` },
      { label: "Sort by multiple columns", code: `SELECT name, department, salary\nFROM employees\nORDER BY department ASC, salary DESC;\n-- Alphabetical by dept, then highest salary first` },
    ],
    project: "Mini project: List all employees sorted by salary from highest to lowest.",
    objective: "Print exactly:\nname | salary\nCarol | 90000\nAlice | 85000\nBob | 72000\nEve | 70000\nDavid | 62000\nFrank | 55000",
    starterCode: `-- Table: employees (id, name, department, salary)\n-- List employees ordered by salary, highest first\n\nSELECT name, salary FROM employees\nORDER BY salary DESC;\n`,
    setupSql: `CREATE TABLE employees (id INTEGER, name TEXT, department TEXT, salary INTEGER);
INSERT INTO employees VALUES (1, 'Alice', 'Engineering', 85000);
INSERT INTO employees VALUES (2, 'Bob', 'Engineering', 72000);
INSERT INTO employees VALUES (3, 'Carol', 'Engineering', 90000);
INSERT INTO employees VALUES (4, 'David', 'Marketing', 62000);
INSERT INTO employees VALUES (5, 'Eve', 'Marketing', 70000);
INSERT INTO employees VALUES (6, 'Frank', 'HR', 55000);`,
    expectedOutput: "name | salary\nCarol | 90000\nAlice | 85000\nBob | 72000\nEve | 70000\nDavid | 62000\nFrank | 55000",
    hints: [
      "ORDER BY salary DESC puts the highest first.",
      "The starter code is already correct — just run it!",
      "Try changing DESC to ASC to see the difference.",
    ],
  },
  {
    id: "sql-04",
    title: "SQL: Aggregate Functions",
    track: "sql",
    tier: "pro",
    order: 4,
    description: "Aggregate functions summarise many rows into a single result — totals, averages, counts, and more.",
    explanation:
      `Built-in aggregate functions:\n  COUNT(*)        — number of rows\n  SUM(column)     — total of a numeric column\n  AVG(column)     — average value\n  MAX(column)     — highest value\n  MIN(column)     — lowest value\n\nUse AS to give the result a readable name:\n  SELECT COUNT(*) AS total FROM employees;\n\nAggregates work on the whole table (or a group — see GROUP BY).`,
    examples: [
      { label: "COUNT and SUM", code: `SELECT COUNT(*) AS total, SUM(salary) AS payroll\nFROM employees;\n-- total: 6, payroll: 434000` },
      { label: "AVG, MAX, MIN", code: `SELECT AVG(salary) AS avg_sal,\n       MAX(salary) AS highest,\n       MIN(salary) AS lowest\nFROM employees;` },
      { label: "COUNT with WHERE", code: `SELECT COUNT(*) AS engineers\nFROM employees\nWHERE department = 'Engineering';\n-- engineers: 3` },
    ],
    project: "Mini project: Find the total headcount and total payroll for all employees.",
    objective: "Print exactly:\ntotal_employees | total_payroll\n6 | 434000",
    starterCode: `-- Table: employees (id, name, department, salary)\n-- Find total employee count and sum of all salaries\n\nSELECT COUNT(*) AS total_employees,\n       SUM(salary) AS total_payroll\nFROM employees;\n`,
    setupSql: `CREATE TABLE employees (id INTEGER, name TEXT, department TEXT, salary INTEGER);
INSERT INTO employees VALUES (1, 'Alice', 'Engineering', 85000);
INSERT INTO employees VALUES (2, 'Bob', 'Engineering', 72000);
INSERT INTO employees VALUES (3, 'Carol', 'Engineering', 90000);
INSERT INTO employees VALUES (4, 'David', 'Marketing', 62000);
INSERT INTO employees VALUES (5, 'Eve', 'Marketing', 70000);
INSERT INTO employees VALUES (6, 'Frank', 'HR', 55000);`,
    expectedOutput: "total_employees | total_payroll\n6 | 434000",
    hints: [
      "COUNT(*) counts all rows regardless of NULLs.",
      "SUM(salary) adds up all salary values: 85000+72000+90000+62000+70000+55000 = 434000.",
      "The starter code is already correct — just run it!",
    ],
  },
  {
    id: "sql-05",
    title: "SQL: GROUP BY",
    track: "sql",
    tier: "pro",
    order: 5,
    description: "GROUP BY splits rows into groups and lets you run aggregates on each group separately.",
    explanation:
      `GROUP BY comes after WHERE and before ORDER BY:\n  SELECT department, COUNT(*) AS headcount\n  FROM employees\n  GROUP BY department;\n\nEach unique value of the GROUP BY column becomes one row in the result.\n\nHAVING filters groups (like WHERE but for aggregates):\n  HAVING COUNT(*) > 1\n  — only groups with more than 1 row`,
    examples: [
      { label: "Count per group", code: `SELECT department, COUNT(*) AS headcount\nFROM employees\nGROUP BY department;\n-- Engineering: 3, Marketing: 2, HR: 1` },
      { label: "Average per group", code: `SELECT department, AVG(salary) AS avg_salary\nFROM employees\nGROUP BY department\nORDER BY avg_salary DESC;` },
      { label: "HAVING to filter groups", code: `SELECT department, COUNT(*) AS headcount\nFROM employees\nGROUP BY department\nHAVING COUNT(*) > 1;\n-- Only departments with more than 1 employee` },
    ],
    project: "Mini project: Count employees per department, ordered from largest to smallest team.",
    objective: "Print exactly:\ndepartment | headcount\nEngineering | 3\nMarketing | 2\nHR | 1",
    starterCode: `-- Table: employees (id, name, department, salary)\n-- Count employees per department, largest team first\n\nSELECT department, COUNT(*) AS headcount\nFROM employees\nGROUP BY department\nORDER BY headcount DESC;\n`,
    setupSql: `CREATE TABLE employees (id INTEGER, name TEXT, department TEXT, salary INTEGER);
INSERT INTO employees VALUES (1, 'Alice', 'Engineering', 85000);
INSERT INTO employees VALUES (2, 'Bob', 'Engineering', 72000);
INSERT INTO employees VALUES (3, 'Carol', 'Engineering', 90000);
INSERT INTO employees VALUES (4, 'David', 'Marketing', 62000);
INSERT INTO employees VALUES (5, 'Eve', 'Marketing', 70000);
INSERT INTO employees VALUES (6, 'Frank', 'HR', 55000);`,
    expectedOutput: "department | headcount\nEngineering | 3\nMarketing | 2\nHR | 1",
    hints: [
      "GROUP BY department creates one row per unique department.",
      "COUNT(*) counts employees within each group.",
      "ORDER BY headcount DESC sorts largest group first.",
    ],
  },
  {
    id: "sql-06",
    title: "SQL: INSERT & UPDATE",
    track: "sql",
    tier: "pro",
    order: 6,
    description: "INSERT adds new rows to a table. UPDATE modifies existing rows. Together they power the 'write' side of any application.",
    explanation:
      `INSERT syntax:\n  INSERT INTO table (col1, col2) VALUES (val1, val2);\n  -- or without column list if providing all values:\n  INSERT INTO table VALUES (val1, val2, val3);\n\nUPDATE syntax:\n  UPDATE table SET column = new_value WHERE condition;\n\nAlways use WHERE with UPDATE — without it, every row gets changed!\n\nAfter modifying data, run a SELECT to confirm the changes.`,
    examples: [
      { label: "INSERT a new row", code: `INSERT INTO products VALUES (4, 'Chair', 199, 'Furniture');\nSELECT * FROM products;\n-- Now shows 4 rows` },
      { label: "INSERT with column names", code: `INSERT INTO products (id, name, price, category)\nVALUES (5, 'Keyboard', 79, 'Electronics');` },
      { label: "UPDATE a value", code: `UPDATE products SET price = 39 WHERE name = 'Mouse';\nSELECT name, price FROM products WHERE name = 'Mouse';\n-- Mouse | 39` },
    ],
    project: "Mini project: Add a new product 'Chair' then update the Mouse price. Show the final table.",
    objective: "Print exactly:\nid | name | price | category\n1 | Laptop | 999 | Electronics\n2 | Mouse | 39 | Electronics\n3 | Desk | 349 | Furniture\n4 | Chair | 199 | Furniture",
    starterCode: `-- Table: products (id, name, price, category)\n-- 1. INSERT Chair (id=4, price=199, Furniture)\n-- 2. UPDATE Mouse price to 39\n-- 3. SELECT all products\n\nINSERT INTO products VALUES (4, 'Chair', 199, 'Furniture');\nUPDATE products SET price = 39 WHERE name = 'Mouse';\nSELECT * FROM products;\n`,
    setupSql: `CREATE TABLE products (id INTEGER, name TEXT, price INTEGER, category TEXT);
INSERT INTO products VALUES (1, 'Laptop', 999, 'Electronics');
INSERT INTO products VALUES (2, 'Mouse', 29, 'Electronics');
INSERT INTO products VALUES (3, 'Desk', 349, 'Furniture');`,
    expectedOutput: "id | name | price | category\n1 | Laptop | 999 | Electronics\n2 | Mouse | 39 | Electronics\n3 | Desk | 349 | Furniture\n4 | Chair | 199 | Furniture",
    hints: [
      "INSERT INTO products VALUES (4, 'Chair', 199, 'Furniture');",
      "UPDATE products SET price = 39 WHERE name = 'Mouse';",
      "The starter code is already correct — just run it!",
    ],
  },
  {
    id: "sql-07",
    title: "SQL: DELETE",
    track: "sql",
    tier: "pro",
    order: 7,
    description: "DELETE removes rows from a table. It's permanent — always use WHERE or you'll delete everything.",
    explanation:
      `DELETE syntax:\n  DELETE FROM table WHERE condition;\n\nWithout WHERE:\n  DELETE FROM table;   ← deletes ALL rows!\n\nBest practice:\n  1. Run a SELECT with the same WHERE first to preview what will be deleted.\n  2. Then run the DELETE.\n\nTRUNCATE TABLE is a faster way to delete all rows, but DELETE with WHERE is more common and safer.`,
    examples: [
      { label: "Delete a specific row", code: `DELETE FROM products WHERE id = 3;\nSELECT * FROM products;\n-- Row with id=3 is gone` },
      { label: "Delete with a condition", code: `DELETE FROM orders WHERE status = 'cancelled';\n-- Removes all cancelled orders` },
      { label: "Preview before delete", code: `-- First check what you'll delete:\nSELECT * FROM products WHERE price < 50;\n-- Then delete:\nDELETE FROM products WHERE price < 50;` },
    ],
    project: "Mini project: Remove the Desk product from inventory, then show the remaining products.",
    objective: "Print exactly:\nid | name | price | category\n1 | Laptop | 999 | Electronics\n2 | Mouse | 29 | Electronics",
    starterCode: `-- Table: products (id, name, price, category)\n-- 1. DELETE the Desk product (id = 3)\n-- 2. SELECT all remaining products\n\nDELETE FROM products WHERE id = 3;\nSELECT * FROM products;\n`,
    setupSql: `CREATE TABLE products (id INTEGER, name TEXT, price INTEGER, category TEXT);
INSERT INTO products VALUES (1, 'Laptop', 999, 'Electronics');
INSERT INTO products VALUES (2, 'Mouse', 29, 'Electronics');
INSERT INTO products VALUES (3, 'Desk', 349, 'Furniture');`,
    expectedOutput: "id | name | price | category\n1 | Laptop | 999 | Electronics\n2 | Mouse | 29 | Electronics",
    hints: [
      "DELETE FROM products WHERE id = 3;",
      "Always specify WHERE — without it you'd delete all products!",
      "The starter code is already correct — just run it!",
    ],
  },
  {
    id: "sql-08",
    title: "SQL: INNER JOIN",
    track: "sql",
    tier: "pro",
    order: 8,
    description: "JOIN combines rows from two tables based on a related column — the most important SQL concept for working with real databases.",
    explanation:
      `Tables are usually split to avoid repetition (called normalisation). JOIN brings them back together.\n\nINNER JOIN returns rows where the condition matches in BOTH tables:\n  SELECT a.col, b.col\n  FROM table_a a\n  INNER JOIN table_b b ON a.id = b.a_id;\n\nOther JOIN types:\n  LEFT JOIN   — all rows from left table, NULLs where no match on right\n  RIGHT JOIN  — all rows from right table\n  FULL JOIN   — all rows from both tables`,
    examples: [
      { label: "Basic INNER JOIN", code: `SELECT orders.customer, products.name\nFROM orders\nINNER JOIN products ON orders.product_id = products.id;\n-- Matches each order to its product name` },
      { label: "JOIN with aliases", code: `SELECT o.customer, p.name, o.quantity\nFROM orders o\nJOIN products p ON o.product_id = p.id;\n-- 'o' and 'p' are table aliases (shorter to type)` },
      { label: "JOIN with WHERE", code: `SELECT o.customer, p.name\nFROM orders o\nJOIN products p ON o.product_id = p.id\nWHERE p.price > 100;\n-- Only orders for expensive products` },
    ],
    project: "Mini project: Join orders with products to show who ordered what and how many.",
    objective: "Print exactly:\ncustomer | name | quantity\nAlice | Laptop | 2\nBob | Mouse | 5\nCarol | Laptop | 1",
    starterCode: `-- Tables: orders (id, product_id, quantity, customer)\n--         products (id, name, price)\n-- Join them to show customer, product name, and quantity\n\nSELECT orders.customer, products.name, orders.quantity\nFROM orders\nINNER JOIN products ON orders.product_id = products.id;\n`,
    setupSql: `CREATE TABLE products (id INTEGER, name TEXT, price INTEGER);
INSERT INTO products VALUES (1, 'Laptop', 999);
INSERT INTO products VALUES (2, 'Mouse', 29);
INSERT INTO products VALUES (3, 'Desk', 349);
CREATE TABLE orders (id INTEGER, product_id INTEGER, quantity INTEGER, customer TEXT);
INSERT INTO orders VALUES (1, 1, 2, 'Alice');
INSERT INTO orders VALUES (2, 2, 5, 'Bob');
INSERT INTO orders VALUES (3, 1, 1, 'Carol');`,
    expectedOutput: "customer | name | quantity\nAlice | Laptop | 2\nBob | Mouse | 5\nCarol | Laptop | 1",
    hints: [
      "ON orders.product_id = products.id links the two tables.",
      "The order of SELECT columns is: customer, name, quantity.",
      "The starter code is already correct — just run it!",
    ],
  },

  // ── SQL Intermediate & Advanced ────────────────────────────────────────
  {
    id: "sql-09",
    title: "SQL: DISTINCT & LIMIT",
    track: "sql",
    tier: "pro",
    order: 9,
    description: "DISTINCT removes duplicate values from results. LIMIT controls how many rows come back — essential for leaderboards, top-N queries, and pagination.",
    explanation:
      `DISTINCT:\n  SELECT DISTINCT column FROM table;\n  -- returns only unique values\n\nLIMIT:\n  SELECT ... FROM ... LIMIT n;\n  -- returns at most n rows\n\nLIMIT with OFFSET (for pagination):\n  SELECT ... FROM ... LIMIT 5 OFFSET 10;\n  -- skip 10 rows, take the next 5\n\nLIMIT always goes at the end of a query, after ORDER BY.`,
    examples: [
      { label: "DISTINCT values", code: `SELECT DISTINCT category FROM products;\n-- Returns only unique category names: Electronics, Furniture` },
      { label: "Top 3 with LIMIT", code: `SELECT name, price FROM products\nORDER BY price DESC\nLIMIT 3;\n-- Returns the 3 most expensive products` },
      { label: "Pagination with OFFSET", code: `SELECT name FROM products\nORDER BY id\nLIMIT 2 OFFSET 2;\n-- Skips first 2 rows, returns next 2 (page 2)` },
    ],
    project: "Mini project: Show the top 3 most expensive products by name and price.",
    objective: "Print exactly:\nname | price\nLaptop | 999\nPhone | 799\nTablet | 499",
    starterCode: `-- Table: products (id, name, category, price)\n-- Find the 3 most expensive products\n\nSELECT name, price FROM products\nORDER BY price DESC\nLIMIT 3;\n`,
    setupSql: `CREATE TABLE products (id INTEGER, name TEXT, category TEXT, price INTEGER);
INSERT INTO products VALUES (1, 'Laptop', 'Electronics', 999);
INSERT INTO products VALUES (2, 'Phone', 'Electronics', 799);
INSERT INTO products VALUES (3, 'Tablet', 'Electronics', 499);
INSERT INTO products VALUES (4, 'Desk', 'Furniture', 349);
INSERT INTO products VALUES (5, 'Chair', 'Furniture', 199);
INSERT INTO products VALUES (6, 'Monitor', 'Electronics', 299);`,
    expectedOutput: "name | price\nLaptop | 999\nPhone | 799\nTablet | 499",
    hints: [
      "ORDER BY price DESC puts the most expensive first.",
      "LIMIT 3 keeps only the top 3 rows.",
      "The starter code is already correct — just run it!",
    ],
  },
  {
    id: "sql-10",
    title: "SQL: LEFT JOIN",
    track: "sql",
    tier: "pro",
    order: 10,
    description: "LEFT JOIN returns all rows from the left table — even those with no match on the right — making it essential for finding missing or unmatched data.",
    explanation:
      `INNER JOIN only returns rows that match in BOTH tables.\nLEFT JOIN returns ALL rows from the left table:\n  - Matching right-table rows fill in normally\n  - Non-matching rows get NULL for all right-table columns\n\nSyntax:\n  SELECT a.col, b.col\n  FROM table_a a\n  LEFT JOIN table_b b ON a.id = b.a_id;\n\nCOALESCE(value, default) — replaces NULL with a fallback:\n  COALESCE(o.total, 0)   ← 0 if there is no matching order\n\nFinding unmatched rows: WHERE b.id IS NULL`,
    examples: [
      { label: "LEFT JOIN shows all customers", code: `SELECT c.name, o.total\nFROM customers c\nLEFT JOIN orders o ON c.id = o.customer_id;\n-- Customers with no orders get NULL for total` },
      { label: "COALESCE to replace NULLs", code: `SELECT c.name, COALESCE(o.total, 0) AS total\nFROM customers c\nLEFT JOIN orders o ON c.id = o.customer_id;\n-- NULLs become 0` },
      { label: "Find customers with NO orders", code: `SELECT c.name\nFROM customers c\nLEFT JOIN orders o ON c.id = o.customer_id\nWHERE o.id IS NULL;\n-- Only customers who have never ordered` },
    ],
    project: "Mini project: Show all customers with a count of how many orders they have placed (0 if none).",
    objective: "Print exactly:\nname | order_count\nAlice | 2\nBob | 0\nCarol | 1\nDavid | 0",
    starterCode: `-- Tables: customers (id, name)\n--          orders (id, customer_id, total)\n-- Show every customer and their order count (0 if none)\n\nSELECT c.name, COUNT(o.id) AS order_count\nFROM customers c\nLEFT JOIN orders o ON c.id = o.customer_id\nGROUP BY c.id, c.name\nORDER BY c.id;\n`,
    setupSql: `CREATE TABLE customers (id INTEGER, name TEXT);
INSERT INTO customers VALUES (1, 'Alice');
INSERT INTO customers VALUES (2, 'Bob');
INSERT INTO customers VALUES (3, 'Carol');
INSERT INTO customers VALUES (4, 'David');
CREATE TABLE orders (id INTEGER, customer_id INTEGER, total INTEGER);
INSERT INTO orders VALUES (1, 1, 150);
INSERT INTO orders VALUES (2, 1, 80);
INSERT INTO orders VALUES (3, 3, 220);`,
    expectedOutput: "name | order_count\nAlice | 2\nBob | 0\nCarol | 1\nDavid | 0",
    hints: [
      "LEFT JOIN keeps all customers even when they have no orders.",
      "COUNT(o.id) counts non-NULL order IDs — returns 0 for customers with no orders.",
      "GROUP BY c.id, c.name groups each customer's orders before counting.",
    ],
  },
  {
    id: "sql-11",
    title: "SQL: Subqueries",
    track: "sql",
    tier: "pro",
    order: 11,
    description: "A subquery is a SELECT nested inside another query. It lets you filter by computed values — like 'above average salary' — all in one statement.",
    explanation:
      `A subquery runs first and its result feeds the outer query:\n  SELECT name FROM employees\n  WHERE salary > (SELECT AVG(salary) FROM employees);\n\nSubqueries can appear in:\n  WHERE col > (subquery)       — filter by computed value\n  WHERE col IN (subquery)      — match against a list\n  FROM (subquery) AS alias     — treat result as a table\n\nThe subquery must be wrapped in parentheses. When used in FROM, it must have an alias.`,
    examples: [
      { label: "WHERE with a subquery", code: `SELECT name, salary FROM employees\nWHERE salary > (SELECT AVG(salary) FROM employees);\n-- Returns only above-average earners` },
      { label: "IN with a subquery", code: `SELECT name FROM employees\nWHERE department IN (\n  SELECT department FROM employees\n  GROUP BY department\n  HAVING COUNT(*) >= 2\n);\n-- Employees in departments with 2 or more people` },
      { label: "Subquery in FROM", code: `SELECT dept, avg_sal FROM (\n  SELECT department AS dept,\n         AVG(salary) AS avg_sal\n  FROM employees GROUP BY department\n) AS dept_summary\nWHERE avg_sal > 70000;` },
    ],
    project: "Mini project: Find all employees who earn above the company average salary.",
    objective: "Print exactly:\nname | salary\nCarol | 90000\nAlice | 85000",
    starterCode: `-- Table: employees (id, name, department, salary)\n-- Find employees earning above the average salary\n\nSELECT name, salary FROM employees\nWHERE salary > (SELECT AVG(salary) FROM employees)\nORDER BY salary DESC;\n`,
    setupSql: `CREATE TABLE employees (id INTEGER, name TEXT, department TEXT, salary INTEGER);
INSERT INTO employees VALUES (1, 'Alice', 'Engineering', 85000);
INSERT INTO employees VALUES (2, 'Bob', 'Engineering', 72000);
INSERT INTO employees VALUES (3, 'Carol', 'Engineering', 90000);
INSERT INTO employees VALUES (4, 'David', 'Marketing', 62000);
INSERT INTO employees VALUES (5, 'Eve', 'Marketing', 70000);
INSERT INTO employees VALUES (6, 'Frank', 'HR', 55000);`,
    expectedOutput: "name | salary\nCarol | 90000\nAlice | 85000",
    hints: [
      "The subquery (SELECT AVG(salary) FROM employees) computes ~72,333 first.",
      "Only Carol (90k) and Alice (85k) exceed that average.",
      "ORDER BY salary DESC puts the highest earner first.",
    ],
  },
  {
    id: "sql-12",
    title: "SQL: CASE WHEN",
    track: "sql",
    tier: "pro",
    order: 12,
    description: "CASE WHEN adds if/else logic directly inside a SELECT — use it to label, bucket, or transform values on the fly without changing the underlying data.",
    explanation:
      `Syntax:\n  CASE\n    WHEN condition THEN result\n    WHEN condition THEN result\n    ELSE default_result\n  END AS alias\n\nConditions are checked in order — the first match wins.\nELSE is optional; without it, unmatched rows return NULL.\n\nCASE can appear in SELECT, ORDER BY, WHERE, and inside aggregates like SUM(CASE WHEN ...).`,
    examples: [
      { label: "Label by salary range", code: `SELECT name,\n  CASE\n    WHEN salary >= 80000 THEN 'High'\n    WHEN salary >= 60000 THEN 'Mid'\n    ELSE 'Entry'\n  END AS salary_band\nFROM employees;` },
      { label: "CASE in ORDER BY", code: `SELECT name, department\nFROM employees\nORDER BY\n  CASE department\n    WHEN 'Engineering' THEN 1\n    WHEN 'Marketing'   THEN 2\n    ELSE 3\n  END;` },
      { label: "CASE inside an aggregate", code: `SELECT\n  SUM(CASE WHEN salary >= 80000 THEN 1 ELSE 0 END) AS high_earners,\n  SUM(CASE WHEN salary < 60000  THEN 1 ELSE 0 END) AS entry_level\nFROM employees;\n-- Counts rows per band in one query` },
    ],
    project: "Mini project: Add a salary_band column — High (≥80k), Mid (≥60k), Entry (<60k).",
    objective: "Print exactly:\nname | salary | salary_band\nCarol | 90000 | High\nAlice | 85000 | High\nBob | 72000 | Mid\nEve | 70000 | Mid\nDavid | 62000 | Mid\nFrank | 55000 | Entry",
    starterCode: `-- Table: employees (id, name, department, salary)\n-- Classify each employee with a salary band\n\nSELECT name, salary,\n  CASE\n    WHEN salary >= 80000 THEN 'High'\n    WHEN salary >= 60000 THEN 'Mid'\n    ELSE 'Entry'\n  END AS salary_band\nFROM employees\nORDER BY salary DESC;\n`,
    setupSql: `CREATE TABLE employees (id INTEGER, name TEXT, department TEXT, salary INTEGER);
INSERT INTO employees VALUES (1, 'Alice', 'Engineering', 85000);
INSERT INTO employees VALUES (2, 'Bob', 'Engineering', 72000);
INSERT INTO employees VALUES (3, 'Carol', 'Engineering', 90000);
INSERT INTO employees VALUES (4, 'David', 'Marketing', 62000);
INSERT INTO employees VALUES (5, 'Eve', 'Marketing', 70000);
INSERT INTO employees VALUES (6, 'Frank', 'HR', 55000);`,
    expectedOutput: "name | salary | salary_band\nCarol | 90000 | High\nAlice | 85000 | High\nBob | 72000 | Mid\nEve | 70000 | Mid\nDavid | 62000 | Mid\nFrank | 55000 | Entry",
    hints: [
      "CASE checks conditions top to bottom — the first TRUE match wins.",
      "ORDER BY salary DESC sorts highest to lowest salary.",
      "The starter code is already correct — just run it!",
    ],
  },
  {
    id: "sql-13",
    title: "SQL: Window Functions",
    track: "sql",
    tier: "pro",
    order: 13,
    description: "Window functions compute values across related rows without collapsing them — giving you rankings, running totals, and row comparisons all in one query.",
    explanation:
      `Syntax:\n  function() OVER (PARTITION BY col ORDER BY col)\n\nOVER() defines the window of rows to consider.\nPARTITION BY groups rows — like GROUP BY but keeps all rows.\nORDER BY inside OVER sets the order for ranking/running totals.\n\nCommon window functions:\n  ROW_NUMBER() — unique sequential number, no ties\n  RANK()       — rank with gaps on ties: 1, 1, 3\n  DENSE_RANK() — rank without gaps on ties: 1, 1, 2\n  LAG(col, n)  — value from n rows before the current row\n  LEAD(col, n) — value from n rows after the current row`,
    examples: [
      { label: "ROW_NUMBER overall", code: `SELECT name, salary,\n  ROW_NUMBER() OVER (ORDER BY salary DESC) AS row_num\nFROM employees;\n-- Gives each employee a unique number 1–6` },
      { label: "RANK within department", code: `SELECT name, department, salary,\n  RANK() OVER (PARTITION BY department\n               ORDER BY salary DESC) AS dept_rank\nFROM employees;\n-- Rank resets for each department` },
      { label: "Running total", code: `SELECT name, salary,\n  SUM(salary) OVER (ORDER BY id) AS running_total\nFROM employees;\n-- Cumulative salary sum row by row` },
    ],
    project: "Mini project: Rank each employee by salary within their department.",
    objective: "Print exactly:\nname | department | salary | dept_rank\nCarol | Engineering | 90000 | 1\nAlice | Engineering | 85000 | 2\nBob | Engineering | 72000 | 3\nFrank | HR | 55000 | 1\nEve | Marketing | 70000 | 1\nDavid | Marketing | 62000 | 2",
    starterCode: `-- Table: employees (id, name, department, salary)\n-- Rank employees by salary within each department\n\nSELECT name, department, salary,\n  RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dept_rank\nFROM employees\nORDER BY department, dept_rank;\n`,
    setupSql: `CREATE TABLE employees (id INTEGER, name TEXT, department TEXT, salary INTEGER);
INSERT INTO employees VALUES (1, 'Alice', 'Engineering', 85000);
INSERT INTO employees VALUES (2, 'Bob', 'Engineering', 72000);
INSERT INTO employees VALUES (3, 'Carol', 'Engineering', 90000);
INSERT INTO employees VALUES (4, 'David', 'Marketing', 62000);
INSERT INTO employees VALUES (5, 'Eve', 'Marketing', 70000);
INSERT INTO employees VALUES (6, 'Frank', 'HR', 55000);`,
    expectedOutput: "name | department | salary | dept_rank\nCarol | Engineering | 90000 | 1\nAlice | Engineering | 85000 | 2\nBob | Engineering | 72000 | 3\nFrank | HR | 55000 | 1\nEve | Marketing | 70000 | 1\nDavid | Marketing | 62000 | 2",
    hints: [
      "PARTITION BY department makes the rank reset for each department.",
      "ORDER BY salary DESC inside OVER() ranks the highest salary as 1.",
      "The outer ORDER BY department, dept_rank controls the display order.",
    ],
  },
  {
    id: "sql-14",
    title: "SQL: CTEs (WITH clause)",
    track: "sql",
    tier: "pro",
    order: 14,
    description: "A CTE (Common Table Expression) gives a subquery a name so you can reference it cleanly. They turn tangled nested queries into readable, self-documenting SQL.",
    explanation:
      `Syntax:\n  WITH cte_name AS (\n    SELECT ...\n  )\n  SELECT ... FROM cte_name;\n\nMultiple CTEs (comma-separated):\n  WITH a AS (...), b AS (...)\n  SELECT ... FROM a JOIN b ON ...;\n\nCTEs are defined before the outer query and act like temporary views.\nUnlike subqueries in FROM, they can be referenced more than once.\n\nRecursive CTEs (WITH RECURSIVE) can model trees and hierarchies — a more advanced topic.`,
    examples: [
      { label: "Simple CTE", code: `WITH high_earners AS (\n  SELECT name, salary FROM employees\n  WHERE salary >= 80000\n)\nSELECT * FROM high_earners\nORDER BY salary DESC;\n-- Carol 90000, Alice 85000` },
      { label: "Multiple CTEs", code: `WITH eng AS (\n  SELECT name FROM employees WHERE department = 'Engineering'\n),\nmkt AS (\n  SELECT name FROM employees WHERE department = 'Marketing'\n)\nSELECT 'Engineer' AS role, name FROM eng\nUNION ALL\nSELECT 'Marketer', name FROM mkt;` },
      { label: "CTE then aggregate", code: `WITH dept_avg AS (\n  SELECT department, AVG(salary) AS avg_sal\n  FROM employees\n  GROUP BY department\n)\nSELECT department, ROUND(avg_sal) AS avg_salary\nFROM dept_avg\nORDER BY avg_salary DESC;` },
    ],
    project: "Mini project: Use a CTE to label salary bands, then count employees in each band.",
    objective: "Print exactly:\nsalary_band | headcount\nMid | 3\nHigh | 2\nEntry | 1",
    starterCode: `-- Table: employees (id, name, department, salary)\n-- Step 1: CTE assigns a salary_band to every employee\n-- Step 2: Outer query counts employees per band\n\nWITH banded AS (\n  SELECT name,\n    CASE\n      WHEN salary >= 80000 THEN 'High'\n      WHEN salary >= 60000 THEN 'Mid'\n      ELSE 'Entry'\n    END AS salary_band\n  FROM employees\n)\nSELECT salary_band, COUNT(*) AS headcount\nFROM banded\nGROUP BY salary_band\nORDER BY headcount DESC;\n`,
    setupSql: `CREATE TABLE employees (id INTEGER, name TEXT, department TEXT, salary INTEGER);
INSERT INTO employees VALUES (1, 'Alice', 'Engineering', 85000);
INSERT INTO employees VALUES (2, 'Bob', 'Engineering', 72000);
INSERT INTO employees VALUES (3, 'Carol', 'Engineering', 90000);
INSERT INTO employees VALUES (4, 'David', 'Marketing', 62000);
INSERT INTO employees VALUES (5, 'Eve', 'Marketing', 70000);
INSERT INTO employees VALUES (6, 'Frank', 'HR', 55000);`,
    expectedOutput: "salary_band | headcount\nMid | 3\nHigh | 2\nEntry | 1",
    hints: [
      "The CTE 'banded' runs first and assigns a salary_band to each row.",
      "The outer SELECT then groups by salary_band and counts.",
      "ORDER BY headcount DESC puts Mid (3 employees) first.",
    ],
  },
  {
    id: "sql-15",
    title: "SQL: String Functions",
    track: "sql",
    tier: "pro",
    order: 15,
    description: "SQL has built-in functions to transform text — changing case, measuring length, extracting substrings, and replacing content. Essential for cleaning and formatting real-world data.",
    explanation:
      `Common string functions in SQLite:\n  UPPER(text)                  — convert to uppercase\n  LOWER(text)                  — convert to lowercase\n  LENGTH(text)                 — character count\n  SUBSTR(text, start, length)  — extract substring (1-indexed)\n  REPLACE(text, old, new)      — find and replace\n  TRIM(text)                   — strip leading/trailing spaces\n  INSTR(text, substr)          — position of first match (0 = not found)\n  text || text                 — concatenate (SQLite uses || not +)`,
    examples: [
      { label: "UPPER, LOWER, LENGTH", code: `SELECT first_name,\n  UPPER(first_name) AS upper_name,\n  LENGTH(first_name) AS name_len\nFROM contacts;\n-- ALICE 5 / BOB 3 / CAROL 5` },
      { label: "SUBSTR and INSTR", code: `SELECT email,\n  SUBSTR(email, 1, INSTR(email, '@') - 1) AS username\nFROM contacts;\n-- alice.smith / bob.j / carol.w` },
      { label: "Concatenation with ||", code: `SELECT first_name || ' ' || last_name AS full_name,\n       'mailto:' || email AS mailto_link\nFROM contacts;\n-- Alice Smith / mailto:alice.smith@company.com` },
    ],
    project: "Mini project: Format each contact — FULL NAME in uppercase, email length, and domain after @.",
    objective: "Print exactly:\nfull_name | email_length | domain\nALICE SMITH | 23 | company.com\nBOB JOHNSON | 17 | company.com\nCAROL WILLIAMS | 19 | company.com",
    starterCode: `-- Table: contacts (id, first_name, last_name, email)\n-- Show: full name in UPPERCASE, email length, domain after @\n\nSELECT UPPER(first_name || ' ' || last_name) AS full_name,\n       LENGTH(email) AS email_length,\n       SUBSTR(email, INSTR(email, '@') + 1) AS domain\nFROM contacts\nORDER BY first_name;\n`,
    setupSql: `CREATE TABLE contacts (id INTEGER, first_name TEXT, last_name TEXT, email TEXT);
INSERT INTO contacts VALUES (1, 'Alice', 'Smith', 'alice.smith@company.com');
INSERT INTO contacts VALUES (2, 'Bob', 'Johnson', 'bob.j@company.com');
INSERT INTO contacts VALUES (3, 'Carol', 'Williams', 'carol.w@company.com');`,
    expectedOutput: "full_name | email_length | domain\nALICE SMITH | 23 | company.com\nBOB JOHNSON | 17 | company.com\nCAROL WILLIAMS | 19 | company.com",
    hints: [
      "|| is SQLite's concatenation operator — UPPER(first_name || ' ' || last_name) joins and uppercases at once.",
      "INSTR(email, '@') finds the position of @ — SUBSTR starts one position after it.",
      "LENGTH('alice.smith@company.com') = 23.",
    ],
  },
];

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find((l) => l.id === id);
}

export function getFreeLessons(): Lesson[] {
  return lessons.filter((l) => l.tier === "free");
}

export function getJSLessons(): Lesson[] {
  return lessons.filter((l) => l.track === "javascript");
}

export function getPythonLessons(): Lesson[] {
  return lessons.filter((l) => l.track === "python");
}

export function getSQLLessons(): Lesson[] {
  return lessons.filter((l) => l.track === "sql");
}
