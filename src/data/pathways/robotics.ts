import { LessonType, Pathway } from "@prisma/client";
import type { SeedCourse } from "./types";

export const roboticsCourse: SeedCourse = {
  title: "Robotics & Engineering Design Mission Path",
  slug: "robotics-engineering",
  description:
    "Design, build, and program robots through the engineering design process — from first sketch to competition-ready autonomous systems.",
  pathway: Pathway.ROBOTICS,
  level: "Intermediate",
  published: true,
  capstone: {
    title: "Capstone: Rescue Rover Design Portfolio",
    description:
      "Document a complete robot design for the Rescue Rover challenge: problem statement, sketches, bill of materials, pseudocode, test results, and a 3-minute video pitch explaining your design iterations and what you'd improve for competition day.",
  },
  modules: [
    {
      title: "Mission Design Studio",
      description: "Adopt the engineering mindset and learn to define problems before building solutions.",
      order: 1,
      lessons: [
        {
          title: "Mission Brief: Think Like an Engineer",
          type: LessonType.READING,
          order: 1,
          duration: 14,
          content: `# Mission Brief: Think Like an Engineer

**Alert:** A remote research station lost contact. Your robot may be the only way to reach it. Before you touch a single motor, you need a **plan**.

Engineers don't guess — they **define, research, brainstorm, build, test, and improve**. This is the same cycle NASA uses for rovers and your local robotics team uses on competition day.

## Today's objective
Understand the NOVA Engineering Mindset and identify one real problem a robot could solve in your school or community.

## The engineer's question
Not *"What can I build?"* but *"What problem am I solving, and for whom?"*

## Launch checklist
1. Write one problem statement: *"Our team needs to ___ because ___."*
2. List 3 constraints (budget, time, materials, rules)
3. Sketch a rough idea — ugly sketches are welcome!

## Stretch goal
Interview one person about a task they'd automate. Log their exact words.`,
        },
        {
          title: "Discovery: The 5-Phase Design Cycle",
          type: LessonType.READING,
          order: 2,
          duration: 16,
          content: `# Discovery: The 5-Phase Design Cycle

Every great robot passes through five phases. Skip one, and your bot fails on competition day.

## The cycle
1. **Define** — What exactly is the problem? Who needs the solution?
2. **Research** — What exists already? What materials and rules apply?
3. **Brainstorm** — Generate 5+ ideas. No judging yet!
4. **Build & Test** — Prototype fast. Fail fast. Learn fast.
5. **Improve** — Use test data to iterate. Version 2 beats Version 1.

## Mission objective
Apply the cycle to a **Line Follower** challenge:
- **Define:** Robot must follow a black line autonomously
- **Research:** What sensors detect lines? What motors turn wheels?
- **Brainstorm:** List 3 different chassis designs
- **Build & Test:** (coming in later missions)
- **Improve:** Document what you'd change after first test

## Stretch goal
Create a one-page design notebook template with sections for each phase.`,
        },
        {
          title: "LAB: Sketch Your First Rover",
          type: LessonType.LAB,
          order: 3,
          duration: 40,
          content: `# LAB: Sketch Your First Rover

**Mission:** Produce engineering drawings for a Rescue Rover before building anything physical.

## Requirements
Create **three views** of your rover (top, side, front) showing:
1. Wheel placement and size
2. Sensor locations (minimum: 2 line sensors, 1 obstacle sensor)
3. Battery and microcontroller placement
4. Center of mass estimate (mark with an X)

## Annotations
Label every component with:
- Part name
- Why it's placed there
- What happens if you move it

## Materials
Paper and pencil is fine. Digital tools (Tinkercad, Figma, Procreate) also work.

## Submit
Photo or scan of sketches + 3 sentences explaining your design choices.

## Stretch goal
Add a "Version 2" sketch showing one improvement after an imagined failed test.`,
        },
        {
          title: "Innovation Check: Engineering Mindset",
          type: LessonType.QUIZ,
          order: 4,
          duration: 12,
          content: `# Innovation Check: Engineering Mindset

---

**1.** What comes FIRST in the design process?
- A) Build immediately
- B) Define the problem ✓
- C) Buy expensive parts
- D) Write code

**2.** Brainstorming means:
- A) Pick the first idea
- B) Generate many ideas without judging ✓
- C) Copy a competitor's robot exactly
- D) Skip to testing

**3.** A prototype is:
- A) The final product
- B) An early test version ✓
- C) A computer simulation only
- D) A marketing brochure

**4.** "Iterate" means:
- A) Give up after failure
- B) Improve through repeated cycles ✓
- C) Use only one design
- D) Avoid testing

**5.** Constraints in engineering are:
- A) Always bad
- B) Limits that shape realistic solutions ✓
- C) Optional suggestions
- D) Only about money

---

**4+ correct?** Design studio cleared. Proceed to Structure & Mechanics.`,
        },
      ],
    },
    {
      title: "Structure & Mechanics",
      description: "Learn how robots hold together — chassis, gears, torque, and material choices.",
      order: 2,
      lessons: [
        {
          title: "Quest: Bones of a Robot",
          type: LessonType.VIDEO,
          order: 1,
          duration: 22,
          videoUrl: "https://www.youtube.com/embed/m8FwrWebMd4",
          content: `# Quest: Bones of a Robot

Every robot needs a **skeleton** — a chassis that holds components rigid while staying light enough to move.

## Key structures
- **Chassis** — the frame everything mounts to
- **Drivetrain** — motors, gears, wheels, axles
- **Mounting points** — where sensors and boards attach

## Mission objective
After the briefing, analyze your rover sketch:
1. Is the chassis rigid or flexible? Should it be?
2. Where is the center of mass? (Low = stable)
3. Will wheels have enough ground clearance?

## Design rule
*"If it wobbles on the bench, it will fail on the field."*

## Stretch goal
Research differential drive vs. tank drive. Which fits your mission?`,
        },
        {
          title: "Discovery: Gears, Levers & Torque",
          type: LessonType.READING,
          order: 2,
          duration: 18,
          content: `# Discovery: Gears, Levers & Torque

**Torque** is twisting force — what gets your robot moving when wheels grip the ground.

## Core concepts
- **Gear ratio** — trading speed for power (or vice versa)
- **Lever arm** — longer arm = more torque at the cost of speed
- **Friction** — too little = wheels spin; too much = motor strain

## Quick math
\`\`\`
Speed = Distance / Time
Torque ≈ Force × Distance from axis
\`\`\`

## Mission objective
Your robot weighs 800g and each motor provides 0.5 N·m torque. Calculate:
1. Will it climb a 15° ramp? (estimate required torque)
2. What gear ratio would help if it struggles?

Write assumptions in your log — engineers always state assumptions.

## Stretch goal
Build a paper gear train demo showing 2:1 vs 4:1 ratio effects.`,
        },
        {
          title: "LAB: Build a Stable Chassis",
          type: LessonType.LAB,
          order: 3,
          duration: 55,
          content: `# LAB: Build a Stable Chassis

**Mission:** Construct a physical or virtual chassis that passes the **NOVA Stability Test**.

## Stability Test protocol
1. Place robot on flat surface
2. Push gently from each side — should not tip
3. Lift one wheel — remaining wheels maintain contact
4. Drop from 5 cm — nothing detaches

## Build options
- **Physical:** cardboard, LEGO, VEX, or laser-cut acrylic
- **Virtual:** Tinkercad or Onshape assembly

## Requirements
- Minimum 2 driven wheels
- Microcontroller mount with screw holes or zip-tie points
- Sensor mast or front bumper mount point
- Document total mass

## Submit
Photo of chassis + stability test results (pass/fail each step).

## Stretch goal
Add shock absorption for the sensor mast using rubber bands or springs.`,
        },
        {
          title: "Discovery: Materials Matter",
          type: LessonType.READING,
          order: 4,
          duration: 14,
          content: `# Discovery: Materials Matter

Material choice affects **weight, strength, cost, and build time**.

| Material | Pros | Cons |
|----------|------|------|
| Cardboard | Free, fast | Weak, absorbs moisture |
| Acrylic | Rigid, precise | Cracks under impact |
| Aluminum | Strong, light | Harder to cut, costs more |
| 3D print PLA | Custom shapes | Layer weakness, slow |

## Mission objective
For YOUR rover mission, pick materials for:
1. Main chassis
2. Sensor bracket
3. Wheel hubs

Justify each choice in 1 sentence. Include estimated cost.

## NOVA tip
Prototype in cheap materials first. Polish in premium materials later.

## Stretch goal
Find one competition robot online and identify 3 materials you'd change and why.`,
        },
        {
          title: "Discovery: Fasteners & Assembly",
          type: LessonType.VIDEO,
          order: 5,
          duration: 16,
          videoUrl: "https://www.youtube.com/embed/GQEtYiJL619",
          content: `# Discovery: Fasteners & Assembly

Robots vibrate. **Loose bolts = mission failure.**

## Fastener toolkit
- **Screws & nuts** — strongest, reusable
- **Zip ties** — fast, great for prototypes
- **Standoffs** — elevate boards, prevent shorts
- **Hot glue** — quick but permanent and messy

## Assembly best practices
1. Lock nuts or thread-locker on vibrating joints
2. Label wires BEFORE closing the chassis
3. Leave access panels for battery swaps
4. Cable-manage so wheels don't snag wires

## Mission objective
Create a **Bill of Materials (BOM)** for your chassis lab with quantities and fastener types.

## Stretch goal
Time yourself assembling and disassembling your chassis. Target under 5 minutes for battery access.`,
        },
      ],
    },
    {
      title: "Sensors & Actuators",
      description: "Give your robot senses and muscles — the input/output systems that connect code to the world.",
      order: 3,
      lessons: [
        {
          title: "Discovery: How Robots Sense the World",
          type: LessonType.READING,
          order: 1,
          duration: 16,
          content: `# Discovery: How Robots Sense the World

Sensors are a robot's **eyes, ears, and touch**. Without them, code runs blind.

## Common NOVA sensors
| Sensor | Detects | Example use |
|--------|---------|-------------|
| IR reflective | Surface brightness | Line following |
| Ultrasonic | Distance | Obstacle avoidance |
| Gyroscope | Rotation | Straight driving |
| Color | Wavelength | Sorting objects |
| Encoder | Wheel rotation | Precise movement |

## Signal flow
\`Physical world → Sensor → Microcontroller → Code decision → Actuator\`

## Mission objective
For a Rescue Rover, pick **3 sensors** and explain:
1. What each measures
2. Where you'd mount it on your chassis
3. What happens if it fails mid-mission

## Stretch goal
Draw a sensor placement diagram on your rover sketch from Module 1.`,
        },
        {
          title: "Quest: Motors & Movement",
          type: LessonType.VIDEO,
          order: 2,
          duration: 20,
          videoUrl: "https://www.youtube.com/embed/6FruCcDz13E",
          content: `# Quest: Motors & Movement

**Actuators** turn decisions into action — spinning wheels, lifting arms, gripping objects.

## Motor types
- **DC motors** — simple, fast, need driver board
- **Servo motors** — precise angle control (0–180°)
- **Stepper motors** — exact steps, used in 3D printers

## Motor driver basics
Microcontrollers can't power motors directly. A **motor driver** (L298N, TB6612) handles the current.

\`\`\`
Arduino pin → Driver IN → Motor +/- → Movement
\`\`\`

## Mission objective
Document your drivetrain:
1. Motor type and count
2. Driver board model
3. Expected speed (slow and precise vs. fast and rough)

## Stretch goal
Calculate wheel circumference and estimate speed at max RPM.`,
        },
        {
          title: "LAB: Wire Your First Sensor",
          type: LessonType.LAB,
          order: 3,
          duration: 50,
          content: `# LAB: Wire Your First Sensor

**Mission:** Connect an IR line sensor (or potentiometer as simulator) to a microcontroller and read values.

## Wiring (IR sensor example)
\`\`\`
VCC → 5V
GND → GND
OUT → Analog pin A0
\`\`\`

## Pseudocode
\`\`\`
loop forever:
    value = read sensor A0
    print value
    wait 200ms
\`\`\`

## Requirements
1. Wire sensor correctly (photo required)
2. Read and print values over serial
3. Test on white vs. black surface — record both values
4. Calculate a threshold between them

## Submit
Screenshot of serial output + threshold value + wiring photo.

## Stretch goal
Blink an LED when the sensor detects "black" (below threshold).`,
        },
        {
          title: "Innovation Check: Sensors & Motors",
          type: LessonType.QUIZ,
          order: 4,
          duration: 12,
          content: `# Innovation Check: Sensors & Motors

---

**1.** An IR reflective sensor detects:
- A) Temperature
- B) Surface reflectivity / line contrast ✓
- C) Sound waves
- D) GPS location

**2.** Why use a motor driver board?
- A) Makes code faster
- B) Microcontroller can't supply enough current ✓
- C) Required for WiFi
- D) Replaces the battery

**3.** A servo motor is best for:
- A) Continuous wheel rotation only
- B) Precise angle positioning ✓
- C) Reading distance
- D) Storing data

**4.** Ultrasonic sensors measure:
- A) Color
- B) Distance via sound echo ✓
- C) Battery voltage
- D) Motor temperature

**5.** Sensor threshold is:
- A) Maximum robot speed
- B) A cutoff value separating signal states ✓
- C) Battery capacity
- D) Gear ratio

---

**4+ correct?** Sensors calibrated. Proceed to Robot Programming.`,
        },
        {
          title: "LAB: LED Response System",
          type: LessonType.LAB,
          order: 5,
          duration: 45,
          content: `# LAB: LED Response System

**Mission:** Build a multi-sensor display that communicates robot state through colored LEDs.

## Scenario
Mission Control needs at-a-glance status: searching, locked on target, obstacle detected.

## Requirements
1. **Green LED** — line detected (sensor below threshold)
2. **Red LED** — obstacle close (or second sensor triggered)
3. **Yellow LED** — idle / searching (neither condition met)
4. Use \`if/elif/else\` logic in code or pseudocode

## Testing protocol
Run through 3 scenarios and log which LED activates:
- On white surface, no obstacle
- On black line
- Obstacle within 10 cm

## Submit
Video or photo series showing each state + your code/pseudocode.

## Stretch goal
Add a buzzer beep pattern unique to each state for accessibility.`,
        },
      ],
    },
    {
      title: "Robot Programming",
      description: "Translate engineering designs into code that drives autonomous behavior.",
      order: 4,
      lessons: [
        {
          title: "Discovery: Pseudocode to Real Code",
          type: LessonType.READING,
          order: 1,
          duration: 15,
          content: `# Discovery: Pseudocode to Real Code

Before writing syntax, write **pseudocode** — plain-language logic anyone on your team can read.

## Line follower pseudocode
\`\`\`
loop forever:
    left = read left sensor
    right = read right sensor

    if left on line and right on line:
        go straight
    else if left on line:
        turn right slightly
    else if right on line:
        turn left slightly
    else:
        stop and search
\`\`\`

## Mission objective
Write pseudocode for YOUR rover handling:
1. Normal line following
2. 90° turn detection
3. Lost line recovery (spin slowly until found)

## Stretch goal
Have a teammate follow your pseudocode manually ("human robot" test).`,
        },
        {
          title: "Quest: Arduino Programming Basics",
          type: LessonType.VIDEO,
          order: 2,
          duration: 25,
          videoUrl: "https://www.youtube.com/embed/fJWR7dBfMco",
          content: `# Quest: Arduino Programming Basics

Arduino brings pseudocode to life with \`setup()\` and \`loop()\`.

\`\`\`cpp
void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(1000);
  digitalWrite(LED_BUILTIN, LOW);
  delay(1000);
}
\`\`\`

## Key commands
- \`pinMode(pin, INPUT/OUTPUT)\`
- \`digitalWrite(pin, HIGH/LOW)\`
- \`analogRead(pin)\` → 0–1023
- \`Serial.println(value)\`

## Mission objective
1. Blink the built-in LED at 2 Hz
2. Read an analog sensor and print to Serial Monitor
3. Modify blink speed based on sensor value

## Stretch goal
Map sensor range (0–1023) to motor speed (0–255) using \`map()\`.`,
        },
        {
          title: "LAB: Blink & Beep Protocol",
          type: LessonType.LAB,
          order: 3,
          duration: 40,
          content: `# LAB: Blink & Beep Protocol

**Mission:** Program a startup sequence that confirms all systems before the rover moves.

## Startup sequence
1. **3 short beeps** — power OK
2. **LED sweep** — left to right, each LED lights 200ms
3. **Sensor check** — print all sensor readings; if any read 0 or 1023 stuck, halt with error beep
4. **Ready signal** — 1 long beep + green LED solid

## Requirements
Implement in Arduino (or detailed pseudocode if no hardware).
Document each step with expected output.

## Submit
Serial log + video of LED/beep sequence.

## Stretch goal
Add a "calibration mode" triggered by holding a button for 3 seconds.`,
        },
        {
          title: "Build Challenge: Line Follower Prototype",
          type: LessonType.PROJECT,
          order: 4,
          duration: 75,
          content: `# Build Challenge: Line Follower Prototype

**Mid-path project:** Integrate chassis, sensors, and code into a working line follower.

## Mission
Build and program a robot that follows a black line on white poster board for at least 3 feet without human intervention.

## Requirements
1. Completed chassis with 2+ line sensors
2. Working code (Arduino, micro:bit, or equivalent)
3. **Test log:** 5 trial runs with pass/fail and notes
4. One documented improvement between trial 3 and trial 5

## Documentation
Include photos, code, and a short video of your best run.

## Rubric
| Criteria | Target |
|----------|--------|
| Completes course | 3+ feet autonomously |
| Recovery | Recovers from minor line loss |
| Iteration | Shows visible improvement in tests |

## Stretch goal
Add a speed boost on straightaways when both sensors detect the line.`,
        },
        {
          title: "Innovation Check: Robot Logic",
          type: LessonType.QUIZ,
          order: 5,
          duration: 12,
          content: `# Innovation Check: Robot Logic

---

**1.** Arduino programs run \`setup()\`:
- A) Every loop iteration
- B) Once at startup ✓
- C) Never
- D) Only on button press

**2.** \`analogRead()\` returns values from:
- A) 0 to 255
- B) 0 to 1023 ✓
- C) 0 to 100
- D) true/false only

**3.** If both line sensors see white, the robot should:
- A) Always go straight
- B) Search or stop — line may be lost ✓
- C) Shut down permanently
- D) Reverse at full speed

**4.** Pseudocode is useful because:
- A) It runs on the robot directly
- B) It plans logic before syntax ✓
- C) It replaces testing
- D) It's only for math class

**5.** \`map(value, in_min, in_max, out_min, out_max)\` is used to:
- A) Draw maps
- B) Scale a value from one range to another ✓
- C) Delete variables
- D) Connect WiFi

---

**4+ correct?** Programming systems go. Proceed to Autonomous & Competition.`,
        },
      ],
    },
    {
      title: "Autonomous & Competition",
      description: "Level up to autonomous navigation and competition-ready documentation.",
      order: 5,
      lessons: [
        {
          title: "Discovery: Navigation Algorithms",
          type: LessonType.READING,
          order: 1,
          duration: 18,
          content: `# Discovery: Navigation Algorithms

Autonomous robots follow **algorithms** — step-by-step strategies for reaching goals without human steering.

## Common strategies
- **Bang-bang control** — full left, full right, or straight (simple, jerky)
- **Proportional control** — turn amount scales with error (smoother)
- **State machine** — robot has modes: FOLLOW, TURN, SEARCH, DELIVER

## State machine example
\`\`\`
States: IDLE → FOLLOW → TURN → SEARCH
FOLLOW: if intersection detected → TURN
TURN: complete 90° → FOLLOW
SEARCH: spin until line found → FOLLOW
\`\`\`

## Mission objective
Design a state machine with at least 4 states for YOUR Rescue Rover mission.

## Stretch goal
Research PID control. Write one sentence explaining what the P, I, and D terms do.`,
        },
        {
          title: "LAB: Calibrate Line Sensors",
          type: LessonType.LAB,
          order: 2,
          duration: 45,
          content: `# LAB: Calibrate Line Sensors

**Mission:** Produce a calibration table that makes your line follower reliable under different lighting.

## Calibration protocol
1. Read each sensor on **white** — record 10 samples, average
2. Read each sensor on **black** — record 10 samples, average
3. Threshold = (white_avg + black_avg) / 2
4. Test on **gray** tape — should classify consistently

## Requirements
| Surface | Left Sensor Avg | Right Sensor Avg | Threshold |
|---------|-----------------|------------------|-----------|
| White   |                 |                  |           |
| Black   |                 |                  |           |
| Gray    |                 |                  |           |

## Submit
Completed table + code snippet using your thresholds as constants.

## Stretch goal
Add auto-calibration on startup: robot scans white then black surface automatically.`,
        },
        {
          title: "Quest: Competition Strategy",
          type: LessonType.VIDEO,
          order: 3,
          duration: 20,
          videoUrl: "https://www.youtube.com/embed/3ZiMaOuGRK0",
          content: `# Quest: Competition Strategy

Competition day is not just about the robot — it's about **team strategy, reliability, and adaptability**.

## Winning teams do this
1. **Practice runs** — 50+ test runs before competition
2. **Backup plans** — spare battery, extra sensor, printed code backup
3. **Pit crew roles** — driver, programmer, mechanic, scout
4. **Scouting** — watch other teams, adapt strategy
5. **Gracious professionalism** — help others, stay calm

## Mission objective
Create a **Competition Day Plan** for your team:
- Role assignments
- Pre-match checklist (10 items)
- Emergency fixes for 3 common failures

## Stretch goal
Time a full "pit stop" — battery swap + sensor check. Target under 2 minutes.`,
        },
        {
          title: "Discovery: Team Roles & Documentation",
          type: LessonType.READING,
          order: 4,
          duration: 14,
          content: `# Discovery: Team Roles & Documentation

Judges and mentors reward teams that can **explain their work**, not just demo it.

## Engineering notebook essentials
- Date every entry
- Sketch + label every iteration
- Record test data in tables
- Explain failures honestly — they're learning gold

## Team roles
| Role | Responsibility |
|------|----------------|
| Lead Engineer | Design decisions, integration |
| Programmer | Code, debug, version control |
| Builder | Assembly, wiring, repairs |
| Strategist | Test plans, competition scouting |

## Mission objective
Start your **Rescue Rover Engineering Notebook** with:
1. Team roster and roles
2. Problem statement (from Module 1, refined)
3. First test data table (even if empty — create the template)

## Stretch goal
Write a 30-second "elevator pitch" for your robot.`,
        },
        {
          title: "Build Challenge: Rescue Rover Design Portfolio",
          type: LessonType.PROJECT,
          order: 5,
          duration: 90,
          content: `# Build Challenge: Rescue Rover Design Portfolio

**Capstone mission:** Deliver a complete engineering portfolio for the Rescue Rover challenge.

## Deliverables
1. **Problem & Research** — Who needs this robot? What exists already?
2. **Design Evolution** — Sketches V1, V2, V3 with change notes
3. **Bill of Materials** — Every part, quantity, cost estimate
4. **Code** — Commented Arduino/pseudocode for core behaviors
5. **Test Results** — Minimum 10 logged trials with data
6. **Video Pitch** — 3 minutes: demo + what you'd improve next

## Rubric highlights
| Area | Exceeds expectations |
|------|---------------------|
| Design process | Clear iteration story with data-driven changes |
| Functionality | Robot completes core mission autonomously |
| Documentation | Another team could rebuild from your notebook |
| Teamwork | Every member's contribution is visible |

## Submit
Upload via the Capstone portal on your Mission Path page.

## Stretch goal
Present live at a NOVA showcase or local robotics event.`,
        },
      ],
    },
  ],
};
