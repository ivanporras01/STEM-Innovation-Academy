import { LessonType, Pathway } from "@prisma/client";
import type { SeedCourse } from "./types";

export const codingAiCourse: SeedCourse = {
  title: "Coding & AI Mission Path",
  slug: "intro-python-ai",
  description:
    "Launch from Python basics into AI-powered builds. Decode signals, automate tasks, and ship a personal AI project worthy of mission control.",
  pathway: Pathway.CODING_AI,
  level: "Beginner",
  published: true,
  capstone: {
    title: "Capstone: Your Personal AI Innovation",
    description:
      "Design and build an original AI-powered tool that solves a real problem for your school, family, or community. Submit working code, a 2-minute demo video, and a brief ethics reflection explaining who benefits and what safeguards you built in.",
  },
  modules: [
    {
      title: "Launchpad — Python Awakens",
      description: "Boot up your coding toolkit and write your first programs as a NOVA Explorer.",
      order: 1,
      lessons: [
        {
          title: "Mission Brief: Your Code Awakens",
          type: LessonType.READING,
          order: 1,
          duration: 12,
          content: `# Mission Brief: Your Code Awakens

**Signal detected.** NOVA Mission Control needs Explorers who can speak the language of machines — and that language is **Python**.

You are not here to memorize syntax. You are here to **build things that work**: greeting bots, data explorers, and eventually AI tools that help real people.

## Today's objective
Understand what Python can do and set up your coding environment (Replit, VS Code, or Trinket all work).

## Why this matters
Every robot, smart greenhouse, and chatbot on NOVA runs on code. Python is the bridge between *your ideas* and *running software*.

## Launch checklist
1. Open your coding environment and create a file called \`nova_launch.py\`
2. Run \`print("Explorer online")\` — if you see output, you're live
3. Write one sentence in your mission log: *What do you want to build first?*

## Stretch goal
Change the message to include your Explorer name using an f-string: \`print(f"Explorer {name} online")\``,
        },
        {
          title: "Discovery: Variables Hold Power",
          type: LessonType.VIDEO,
          order: 2,
          duration: 18,
          videoUrl: "https://www.youtube.com/embed/_uQrJ0TkZlc",
          content: `# Discovery: Variables Hold Power

Variables are **memory slots** — containers that hold data your program needs later.

\`\`\`python
explorer_name = "Alex"
signal_strength = 87
mission_active = True
\`\`\`

## Mission objective
Watch the briefing, then create three variables about your NOVA journey and print each one.

## Key signals
- **Strings** hold text (\`"hello"\`)
- **Integers & floats** hold numbers (\`14\`, \`3.14\`)
- **Booleans** hold True/False flags

## Hands-on steps
1. Create variables for your name, favorite pathway, and missions completed (start at 0)
2. Print them in one formatted line
3. Change \`mission_active\` to False — what happens when you re-run?

## Stretch goal
Use \`type()\` on each variable and log the results to your mission notebook.`,
        },
        {
          title: "LAB: Build Your Explorer ID Card",
          type: LessonType.LAB,
          order: 3,
          duration: 35,
          content: `# LAB: Build Your Explorer ID Card

**Mission:** Program generates a digital NOVA Explorer ID card from user input.

## Brief
Mission Control issues ID cards to every Explorer. Yours will ask questions and print a formatted badge.

## Requirements
1. Ask for: full name, pathway (Coding/Robotics/IoT), and home base (city)
2. Print a bordered card with all info
3. Include a random **Badge ID** (hint: \`import random\`)

## Example output
\`\`\`
╔══════════════════════════╗
║   NOVA EXPLORER ID       ║
║   Alex Nova              ║
║   Pathway: Coding & AI   ║
║   Base: San Juan         ║
║   Badge: NOVA-4821       ║
╚══════════════════════════╝
\`\`\`

## Submit
Save your \`.py\` file and mark this mission complete when your card runs without errors.

## Stretch goal
Add input validation — if name is empty, ask again.`,
        },
        {
          title: "Discovery: Strings & Numbers Dance",
          type: LessonType.READING,
          order: 4,
          duration: 15,
          content: `# Discovery: Strings & Numbers Dance

Programs constantly **combine and transform** data. Master these moves early — you'll use them in every future mission.

## String operations
\`\`\`python
greeting = "Hello, " + explorer + "!"
shout = signal.upper()
words = message.split(" ")
\`\`\`

## Number operations
\`\`\`python
total = score1 + score2
average = total / 2
power = base ** 2
\`\`\`

## Mission objective
Build a **Signal Strength Calculator** that takes two readings, averages them, and reports whether the signal is STRONG (>80) or WEAK.

## Steps
1. Get two integer inputs from the user
2. Calculate the average (watch for integer division!)
3. Print a friendly status message with the numeric result

## Stretch goal
Use an f-string to format the average to one decimal place: \`f"{avg:.1f}"\``,
        },
        {
          title: "Innovation Check: Python Foundations",
          type: LessonType.QUIZ,
          order: 5,
          duration: 15,
          content: `# Innovation Check: Python Foundations

Answer each question in your mission log, then check your work below.

---

**1.** What data type holds \`True\` or \`False\`?
- A) String
- B) Boolean ✓
- C) Float
- D) List

**2.** What does \`print(type(42))\` output?
- A) \`"int"\`
- B) \`<class 'int'>\` ✓
- C) \`42\`
- D) Error

**3.** Which correctly creates a variable?
- A) \`14 = age\`
- B) \`age == 14\`
- C) \`age = 14\` ✓
- D) \`var age 14\`

**4.** What is the result of \`"NOVA" + "2026"\`?
- A) \`NOVA2026\` (without quotes)
- B) \`"NOVA2026"\` ✓
- C) Error
- D) \`2026NOVA\`

**5.** Which function gets user input in Python 3?
- A) \`get()\`
- B) \`input()\` ✓
- C) \`read()\`
- D) \`scan()\`

---

**Score 4+?** Signal clear — proceed to Logic Circuits. **Retry?** Revisit the Variable Discovery mission.`,
        },
      ],
    },
    {
      title: "Logic Circuits",
      description: "Teach your programs to make decisions and branch like mission control routing signals.",
      order: 2,
      lessons: [
        {
          title: "Quest: Decisions with If/Else",
          type: LessonType.VIDEO,
          order: 1,
          duration: 20,
          videoUrl: "https://www.youtube.com/embed/Z1Yd7upQsXY",
          content: `# Quest: Decisions with If/Else

Not every path is the same. Smart programs **choose** based on conditions — just like Mission Control routes Explorers to different quests.

\`\`\`python
if signal_strength > 80:
    print("Signal locked — proceed!")
elif signal_strength > 50:
    print("Weak signal — boost antenna")
else:
    print("Lost contact — return to base")
\`\`\`

## Mission objective
After watching the briefing, build a **Pathway Selector** that recommends a NOVA pathway based on user interest (1=Coding, 2=Robotics, 3=IoT).

## Steps
1. Display the three pathway options
2. Read the user's choice
3. Print a personalized launch message for each branch
4. Handle invalid input with an \`else\` clause

## Stretch goal
Add a fourth option: "Explore all three" with a special message.`,
        },
        {
          title: "Discovery: Boolean Signals",
          type: LessonType.READING,
          order: 2,
          duration: 12,
          content: `# Discovery: Boolean Signals

Booleans are the **on/off switches** of programming. Combined with comparison operators, they power every decision your code makes.

## Comparison operators
\`\`\`python
age >= 11        # True for middle school Explorers
name == "Alex"   # equality check
score != 0       # not equal
\`\`\`

## Logical operators
\`\`\`python
if age >= 11 and age <= 18:   # both must be True
if role == "mentor" or role == "admin":
if not mission_complete:
\`\`\`

## Mission objective
Write an **Explorer Access Gate** that checks:
- Age is between 11 and 18
- User answered "yes" to the safety briefing

Only print "Access granted" when BOTH are true.

## Stretch goal
Refactor using a single \`access_granted\` boolean variable set before the final \`if\`.`,
        },
        {
          title: "LAB: Mission Control Gate",
          type: LessonType.LAB,
          order: 3,
          duration: 40,
          content: `# LAB: Mission Control Gate

**Mission:** Build an interactive gatekeeper that validates Explorer credentials before granting lab access.

## Scenario
The NOVA lab door only opens when credentials check out. Your program is the gatekeeper.

## Requirements
1. Ask for Explorer ID (must start with "NOVA-")
2. Ask for pathway code: CA, RB, or IOT
3. Ask for clearance level (1–3)
4. Grant access ONLY if: valid ID prefix, known pathway code, clearance ≥ 2
5. Print different denial messages for each failure type

## Example
\`\`\`
Enter Explorer ID: NOVA-1234
Pathway code: CA
Clearance level: 3
✓ ACCESS GRANTED — Welcome to the Coding Lab
\`\`\`

## Submit
Test at least 3 scenarios: success, wrong ID, low clearance.

## Stretch goal
Add a retry loop — three failed attempts locks the gate for 30 seconds (simulated with a message).`,
        },
        {
          title: "Innovation Check: Logic & Conditions",
          type: LessonType.QUIZ,
          order: 4,
          duration: 12,
          content: `# Innovation Check: Logic & Conditions

---

**1.** What prints when \`x = 5\` and we run \`if x > 3: print("A") else: print("B")\`?
- A) A ✓
- B) B
- C) Both
- D) Nothing

**2.** Which expression is True?
- A) \`10 == "10"\`
- B) \`not False\` ✓
- C) \`5 > 10\`
- D) \`True and False\`

**3.** What keyword checks an additional condition after \`if\`?
- A) \`then\`
- B) \`elseif\`
- C) \`elif\` ✓
- D) \`else if\`

**4.** \`age >= 11 and age <= 18\` is True when age is:
- A) 10
- B) 19
- C) 14 ✓
- D) Always

**5.** What does \`!=\` mean?
- A) Assign value
- B) Not equal to ✓
- C) Approximately equal
- D) Greater than

---

**4+ correct?** Logic circuits online. Proceed to Loop the Loop.`,
        },
      ],
    },
    {
      title: "Loop the Loop",
      description: "Repeat actions efficiently — the secret behind games, automation, and data processing.",
      order: 3,
      lessons: [
        {
          title: "Quest: Repeat Until Success",
          type: LessonType.VIDEO,
          order: 1,
          duration: 22,
          videoUrl: "https://www.youtube.com/embed/OnDr4J2UXFc",
          content: `# Quest: Repeat Until Success

Loops let you **repeat work without repeating code**. Every game, animation, and data scanner uses them.

## For loop — known repetitions
\`\`\`python
for i in range(5):
    print(f"Scan #{i + 1} complete")
\`\`\`

## While loop — until condition changes
\`\`\`python
attempts = 0
while attempts < 3:
    print("Retrying signal...")
    attempts += 1
\`\`\`

## Mission objective
Build a **Launch Countdown** that prints from 10 to 1, then "Liftoff!"

## Steps
1. Use a \`for\` loop with \`range()\`
2. Print each number on its own line
3. Print "Liftoff!" after the loop

## Stretch goal
Add a \`while\` version and compare which feels clearer for this task.`,
        },
        {
          title: "Discovery: While vs For Loops",
          type: LessonType.READING,
          order: 2,
          duration: 14,
          content: `# Discovery: While vs For Loops

Choosing the right loop is a **design decision**, not a syntax trick.

| Loop | Best for |
|------|----------|
| \`for\` | Known count — scanning 10 sensors, printing a list |
| \`while\` | Unknown count — waiting for input, retry until valid |

## Loop control
\`\`\`python
for item in items:
    if item == "skip":
        continue   # skip this round
    if item == "stop":
        break      # exit loop early
\`\`\`

## Mission objective
Write a **Password Retry System** that:
- Allows up to 3 attempts
- Uses \`while\` loop
- Breaks early on correct password "nova2026"
- Prints "Locked out" after 3 failures

## Stretch goal
Add a hint after the second wrong attempt.`,
        },
        {
          title: "LAB: Countdown to Launch",
          type: LessonType.LAB,
          order: 3,
          duration: 45,
          content: `# LAB: Countdown to Launch

**Mission:** Build a multi-phase launch sequence simulator using nested loops and conditions.

## Scenario
NOVA rockets require a 5-step pre-launch checklist, repeated for each of 3 staging bays.

## Requirements
1. Outer loop: iterate bays 1–3
2. Inner loop: run checklist steps (Fuel, Comms, Guidance, Payload, Final)
3. Print \`Bay {n}: {step} — OK\` for each step
4. After each bay completes, print \`Bay {n} READY\`
5. End with \`ALL BAYS GO — LAUNCH AUTHORIZED\`

## Bonus behavior
Randomly simulate ONE step failing (use \`random.choice\`) and retry that step once before continuing.

## Submit
Run the full sequence and capture output in your mission log.

## Stretch goal
Add a total elapsed time estimate (5 seconds per step).`,
        },
        {
          title: "Discovery: Debugging Like a Pro",
          type: LessonType.READING,
          order: 4,
          duration: 16,
          content: `# Discovery: Debugging Like a Pro

Every Explorer hits bugs. Pros **hunt systematically** — they don't guess randomly.

## The NOVA debug protocol
1. **Read the error** — Python tells you the line and error type
2. **Print checkpoints** — \`print(f"DEBUG: x={x}")\` reveals hidden values
3. **Isolate** — comment out half the code to find where it breaks
4. **Rubber duck** — explain the code line-by-line out loud

## Common loop bugs
- Off-by-one errors (\`range(10)\` gives 0–9, not 1–10)
- Infinite \`while True\` without a break condition
- Modifying a list while iterating over it

## Mission objective
Fix this broken countdown (paste into your editor):

\`\`\`python
for i in range(10, 0):  # Bug here
    print(i)
print("Launch!")
\`\`\`

Document what was wrong and why your fix works.

## Stretch goal
Introduce an intentional bug in your Launch LAB code, then fix it using the protocol above.`,
        },
      ],
    },
    {
      title: "Functions & Data Streams",
      description: "Organize code into reusable blocks and wrangle collections of data.",
      order: 4,
      lessons: [
        {
          title: "Quest: Reusable Code Blocks",
          type: LessonType.VIDEO,
          order: 1,
          duration: 20,
          videoUrl: "https://www.youtube.com/embed/9Os0o3WpFkk",
          content: `# Quest: Reusable Code Blocks

Functions are **named recipes** — write once, call whenever you need that action.

\`\`\`python
def greet_explorer(name):
    return f"Welcome aboard, {name}!"

message = greet_explorer("Alex")
\`\`\`

## Mission objective
Create a mini **Mission Toolkit** with three functions:
1. \`calculate_signal_strength(readings)\` — returns average of a list
2. \`format_badge(name, pathway)\` — returns formatted string
3. \`is_mission_ready(checklist)\` — returns True if all items are True

Call each function and print results.

## Stretch goal
Add default parameters: \`format_badge(name, pathway="Explorer")\`.`,
        },
        {
          title: "LAB: Function Factory",
          type: LessonType.LAB,
          order: 2,
          duration: 40,
          content: `# LAB: Function Factory

**Mission:** Refactor messy code into clean, testable functions.

## Starting code (messy — your job is to fix it)
\`\`\`python
scores = [88, 92, 75, 95, 81]
total = 0
for s in scores:
    total += s
avg = total / len(scores)
print(f"Average: {avg}")
if avg >= 90:
    print("Grade: A")
elif avg >= 80:
    print("Grade: B")
else:
    print("Grade: C")
\`\`\`

## Requirements
Refactor into:
- \`calculate_average(numbers)\` → float
- \`letter_grade(average)\` → string
- \`report_scores(scores)\` → prints full report

## Submit
Your refactored code should produce identical output but be readable and reusable.

## Stretch goal
Add \`highest_score(scores)\` and include it in the report.`,
        },
        {
          title: "Discovery: Lists & Dictionaries",
          type: LessonType.READING,
          order: 3,
          duration: 18,
          content: `# Discovery: Lists & Dictionaries

Real programs juggle **collections** of data — sensor readings, Explorer names, chatbot responses.

## Lists — ordered collections
\`\`\`python
missions = ["Decode Signal", "Build Bot", "Launch Lab"]
missions.append("New Quest")
for m in missions:
    print(m)
\`\`\`

## Dictionaries — key-value pairs
\`\`\`python
explorer = {"name": "Alex", "pathway": "CODING_AI", "level": 2}
print(explorer["name"])
\`\`\`

## Mission objective
Build a **Mission Tracker** dictionary where keys are mission names and values are completion status (True/False). Write a function that prints completion percentage.

## Stretch goal
Load 5 missions from a list into the dictionary automatically using a loop.`,
        },
        {
          title: "Discovery: Visualize Your Data",
          type: LessonType.VIDEO,
          order: 4,
          duration: 25,
          videoUrl: "https://www.youtube.com/embed/a9UrCT-z1-c",
          content: `# Discovery: Visualize Your Data

Numbers tell stories when you **see** them. Data visualization turns raw readings into discoveries.

\`\`\`python
import matplotlib.pyplot as plt

days = ["Mon", "Tue", "Wed", "Thu", "Fri"]
scores = [72, 85, 91, 88, 95]

plt.bar(days, scores, color="cyan")
plt.title("Weekly Mission Scores")
plt.show()
\`\`\`

## Mission objective
1. Create a list of 7 daily "signal strength" values (real or simulated)
2. Plot them as a line chart with labels
3. Write one sentence: *What pattern do you notice?*

## Why this matters
Before training AI models, Explorers must **see** their data. Charts reveal trends that raw numbers hide.

## Stretch goal
Add a horizontal line at y=80 labeled "Minimum Signal Threshold".`,
        },
        {
          title: "Build Challenge: School Stats Dashboard",
          type: LessonType.PROJECT,
          order: 5,
          duration: 60,
          content: `# Build Challenge: School Stats Dashboard

**Mid-path project:** Turn classroom data into a visual story.

## Mission
Build a Python program that analyzes a dataset of your choice (survey results, sports scores, weather readings, or library checkouts) and produces at least **two charts**.

## Requirements
1. Store data in lists or a dictionary
2. Calculate at least: mean, max, and min
3. Create 2+ visualizations (bar, line, or pie)
4. Print a 3-sentence **Discovery Report** explaining what the data reveals

## Deliverable
- \`.py\` source file
- Screenshots of your charts
- Brief written summary

## NOVA standard
Would another Explorer understand your story without asking questions? Clarity beats complexity.

## Stretch goal
Accept new data points via \`input()\` and update the chart dynamically.`,
        },
      ],
    },
    {
      title: "AI Frontier",
      description: "Enter the world of artificial intelligence — ethical, accessible, and hands-on.",
      order: 5,
      lessons: [
        {
          title: "Discovery: What Is AI, Really?",
          type: LessonType.READING,
          order: 1,
          duration: 18,
          content: `# Discovery: What Is AI, Really?

AI is not magic — it's **pattern recognition at scale**. Machines learn from examples instead of following only hand-written rules.

## Three flavors you'll meet
- **Rule-based AI** — if/then logic (your chatbot)
- **Machine Learning** — learns patterns from data (spam filters, recommendations)
- **Generative AI** — creates new content (text, images, code)

## Real NOVA connections
- Robotics: computer vision finds lines and obstacles
- IoT: anomaly detection spots unusual sensor readings
- Coding: autocomplete and code assistants

## Mission objective
Pick one AI tool you use (Siri, Spotify recommendations, photo filters). Write:
1. What input it receives
2. What output it produces
3. One way it could go wrong

## Stretch goal
Research: what's the difference between AI and automation?`,
        },
        {
          title: "Quest: Ethics in the Machine",
          type: LessonType.VIDEO,
          order: 2,
          duration: 20,
          videoUrl: "https://www.youtube.com/embed/ePfNEEpNCgY",
          content: `# Quest: Ethics in the Machine

With great computing power comes **great responsibility**. NOVA Explorers build AI that helps people — never harms them.

## Key questions for every AI project
- **Who trained it?** Biased data → biased results
- **Who benefits?** And who might be left out?
- **What could go wrong?** Privacy leaks, false predictions, over-reliance
- **Can humans override it?** Always keep a human in the loop

## Mission objective
Watch the briefing, then complete the **Ethics Canvas**:
1. Your AI idea (one sentence)
2. One stakeholder who benefits
3. One risk and your mitigation plan
4. One data privacy consideration

## NOVA pledge
*"I will ask who benefits and who might be harmed before I ship any AI tool."*

## Stretch goal
Find a news story about AI bias and summarize it in 2 sentences.`,
        },
        {
          title: "LAB: Train a Simple Classifier",
          type: LessonType.LAB,
          order: 3,
          duration: 50,
          content: `# LAB: Train a Simple Classifier

**Mission:** Use scikit-learn (or Teachable Machine in browser) to classify items into two categories.

## Option A — Python (scikit-learn)
\`\`\`python
from sklearn.tree import DecisionTreeClassifier

# Fruit classifier: weight vs sweetness
X = [[150, 7], [170, 8], [140, 9], [130, 5], [120, 4]]
y = ["apple", "apple", "apple", "orange", "orange"]

model = DecisionTreeClassifier()
model.fit(X, y)
print(model.predict([[160, 6]]))
\`\`\`

## Option B — Teachable Machine
Train an image or audio classifier in browser at teacheablemachine.withgoogle.com

## Requirements
1. Choose a dataset with at least 10 examples per category
2. Train and test with 3 new inputs
3. Report accuracy (how many it got right)
4. Write one sentence on what features the model likely used

## Stretch goal
Identify one misclassification and explain why the model might have failed.`,
        },
        {
          title: "LAB: Rule-Based Chatbot Engine",
          type: LessonType.LAB,
          order: 4,
          duration: 45,
          content: `# LAB: Rule-Based Chatbot Engine

**Mission:** Build a NOVA Help Bot that answers Explorer questions using dictionaries and loops.

## Starter scaffold
\`\`\`python
responses = {
    "hello": "Welcome to NOVA! Ready for your next mission?",
    "pathways": "We offer Coding & AI, Robotics, and IoT pathways!",
    "help": "Ask about pathways, missions, mentors, or hours.",
}

def get_response(user_input):
    key = user_input.lower().strip()
    return responses.get(key, "Signal unclear — try 'help'")
\`\`\`

## Requirements
1. Add at least 8 keyword responses
2. Run a \`while\` loop until user types "bye"
3. Handle partial matches (e.g., "hi" triggers "hello")
4. Log the conversation to a list and print summary at exit

## Stretch goal
Add sentiment: if message contains "stuck" or "confused", offer encouragement.`,
        },
        {
          title: "Innovation Check: AI Concepts",
          type: LessonType.QUIZ,
          order: 5,
          duration: 15,
          content: `# Innovation Check: AI Concepts

---

**1.** Machine learning models learn from:
- A) Magic
- B) Hand-written rules only
- C) Data examples ✓
- D) Internet downloads

**2.** Rule-based chatbots use:
- A) Neural networks only
- B) Dictionary lookup & conditions ✓
- C) Random guesses
- D) Satellite links

**3.** AI bias often comes from:
- A) Fast computers
- B) Skewed training data ✓
- C) Python syntax
- D) Large screens

**4.** Before deploying AI, NOVA Explorers should ask:
- A) Will it look cool?
- B) Who benefits and who might be harmed? ✓
- C) Can I skip testing?
- D) Does it use emojis?

**5.** A decision tree classifier splits data based on:
- A) Random colors
- B) Feature values ✓
- C) File names
- D) User age only

---

**4+ correct?** You're cleared for the Capstone. Review the Build Challenge in your mission sidebar.`,
        },
        {
          title: "Build Challenge: Personal AI Innovation",
          type: LessonType.PROJECT,
          order: 6,
          duration: 90,
          content: `# Build Challenge: Personal AI Innovation

**Capstone mission:** Ship an original AI-powered tool that solves a real problem.

## Choose your build
- **Smart assistant** — rule-based or ML chatbot for a specific audience
- **Data predictor** — classify or predict based on a dataset you collect
- **Automation bot** — script that saves time on a repetitive task
- **Creative AI** — generative tool with clear human oversight

## Requirements
1. Working code (Python preferred)
2. README explaining: problem, solution, how to run
3. Ethics reflection (200 words): stakeholders, risks, safeguards
4. 2-minute demo (video or live walkthrough notes)

## Rubric highlights
| Criteria | Exceeds |
|----------|---------|
| Functionality | Works reliably on 5+ test cases |
| Creativity | Original idea, not a copy-paste tutorial |
| Ethics | Thoughtful risk analysis included |
| Documentation | Another Explorer could run it |

## Submit
Use the Capstone submission portal on your Mission Path page.

## Stretch goal
Deploy your tool where others can try it (Replit link, Streamlit app, or local demo station).`,
        },
      ],
    },
  ],
};
