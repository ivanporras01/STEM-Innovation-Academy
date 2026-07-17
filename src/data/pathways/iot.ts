import { LessonType, Pathway } from "@prisma/client";
import type { SeedCourse } from "./types";

export const iotCourse: SeedCourse = {
  title: "IoT & Emerging Technologies Mission Path",
  slug: "iot-smart-systems",
  description:
    "Connect sensors, microcontrollers, and cloud dashboards to build intelligent systems for classrooms, greenhouses, and communities.",
  pathway: Pathway.IOT,
  level: "Intermediate",
  published: true,
  capstone: {
    title: "Capstone: Community Smart System Blueprint",
    description:
      "Design and prototype a complete IoT solution for your school or community: sensor network diagram, working prototype code, live or simulated dashboard, security plan, and a 5-minute pitch explaining impact, data flow, and privacy safeguards.",
  },
  modules: [
    {
      title: "Connected World",
      description: "Discover how everyday objects become intelligent when sensors, code, and connectivity work together.",
      order: 1,
      lessons: [
        {
          title: "Mission Brief: Everything Talks",
          type: LessonType.READING,
          order: 1,
          duration: 14,
          content: `# Mission Brief: Everything Talks

**Signal from the field:** The NOVA Smart Greenhouse reports wild temperature swings. The school energy dashboard shows mystery spikes. Something in the connected world needs **your** systems thinking.

The **Internet of Things (IoT)** links physical devices to the internet so they can sense, decide, and act — often without a human pressing buttons.

## Today's objective
Map the IoT stack and identify one problem in your school that a smart sensor could monitor.

## The four layers
1. **Sensors** — eyes and ears (temperature, motion, light)
2. **Microcontroller** — local brain (ESP32, Arduino, Raspberry Pi Pico)
3. **Connectivity** — WiFi, Bluetooth, LoRa
4. **Cloud/Dashboard** — storage, alerts, visualization

## Launch checklist
1. List 3 "dumb" objects that could become smart
2. Pick one and write: *"If this were IoT, it would measure ___ and alert ___ when ___."*
3. Draw a simple box diagram: Sensor → Board → Cloud → Phone

## Stretch goal
Walk your school and photograph one place that needs environmental monitoring.`,
        },
        {
          title: "Discovery: IoT in Your Community",
          type: LessonType.VIDEO,
          order: 2,
          duration: 18,
          videoUrl: "https://www.youtube.com/embed/LlhmzleBJzs",
          content: `# Discovery: IoT in Your Community

IoT isn't futuristic — it's **already around you**.

## Real examples
- **Smart thermostats** — learn your schedule, save energy
- **Air quality monitors** — alert cities on pollution days
- **Precision agriculture** — soil sensors trigger irrigation
- **Wearable health trackers** — heart rate to your phone

## NOVA missions using IoT
- Smart greenhouse (temperature + humidity + auto-fan)
- School energy dashboard (power per classroom)
- Flood alert system (river level sensors)

## Mission objective
After the briefing, research ONE community IoT project (local or global). Document:
1. What it measures
2. Who benefits
3. One privacy concern

## Stretch goal
Compare WiFi vs. LoRa for a rural sensor network — when would you pick each?`,
        },
        {
          title: "Discovery: Sensors, Brains & Clouds",
          type: LessonType.READING,
          order: 3,
          duration: 16,
          content: `# Discovery: Sensors, Brains & Clouds

Building IoT means connecting three worlds: **physics, code, and networks**.

## Sensor cheat sheet
| Sensor | Measures | Unit |
|--------|----------|------|
| DHT22 | Temp + humidity | °C, % |
| LDR | Light level | lux (approx) |
| PIR | Motion | on/off |
| Soil moisture | Water in soil | % |

## Microcontroller roles
- Read sensors on a schedule (every 5 sec)
- Filter noisy data (averages, thresholds)
- Send batches to cloud (not every single reading!)
- Trigger local actions (fan on, valve open)

## Cloud platform options
- **ThingSpeak** — free tiers, easy charts
- **Adafruit IO** — beginner-friendly dashboards
- **MQTT brokers** — lightweight pub/sub messaging

## Mission objective
Design a data flow for a **classroom comfort monitor**:
Sensor → ??? → Dashboard → Alert to teacher

Fill in every arrow with a technology choice and one sentence why.

## Stretch goal
Estimate data volume: 1 reading/minute × 8 hours × 180 school days = ? readings/year`,
        },
        {
          title: "Innovation Check: IoT Foundations",
          type: LessonType.QUIZ,
          order: 4,
          duration: 12,
          content: `# Innovation Check: IoT Foundations

---

**1.** IoT stands for:
- A) Internet of Textbooks
- B) Internet of Things ✓
- C) Internal Office Tools
- D) Input/Output Technology

**2.** Which component reads the physical world?
- A) Dashboard
- B) Sensor ✓
- C) WiFi router only
- D) Phone case

**3.** A microcontroller's job includes:
- A) Only storing photos
- B) Reading sensors and making local decisions ✓
- C) Replacing the internet
- D) Printing reports

**4.** Cloud dashboards are useful because they:
- A) Eliminate all sensors
- B) Visualize data and send alerts remotely ✓
- C) Only work offline
- D) Replace microcontrollers

**5.** LoRa is often chosen for:
- A) High-speed video streaming
- B) Long-range, low-power sensor networks ✓
- C) Gaming
- D) Word processing

---

**4+ correct?** Connected World unlocked. Proceed to Sensor Lab.`,
        },
      ],
    },
    {
      title: "Sensor Lab",
      description: "Hands-on missions reading the physical world with real and simulated sensors.",
      order: 2,
      lessons: [
        {
          title: "Quest: Reading the Physical World",
          type: LessonType.VIDEO,
          order: 1,
          duration: 22,
          videoUrl: "https://www.youtube.com/embed/gh2FHyQtgDk",
          content: `# Quest: Reading the Physical World

Every IoT build starts with **reliable sensor readings**. Garbage data in = wrong decisions out.

## Reading pipeline
\`\`\`
Raw analog value → Calibration → Filtered value → Decision
\`\`\`

## Arduino example
\`\`\`cpp
int raw = analogRead(A0);
float voltage = raw * (5.0 / 1023.0);
Serial.println(voltage);
\`\`\`

## Mission objective
1. Connect one analog sensor (or potentiometer simulator)
2. Print 20 readings over 10 seconds
3. Calculate min, max, and average manually or in code

## Noise tip
Take 5 rapid readings and average them — smoother data, smarter decisions.

## Stretch goal
Graph readings on paper — do you see a pattern or random jitter?`,
        },
        {
          title: "LAB: Temperature Probe",
          type: LessonType.LAB,
          order: 2,
          duration: 50,
          content: `# LAB: Temperature Probe

**Mission:** Build a temperature monitoring station that displays readings on serial and an LCD (or serial-only if no LCD).

## Hardware
- DHT22 or TMP36 (or simulated with potentiometer mapped to temp range)
- LCD 16x2 (optional)
- Microcontroller + breadboard

## Requirements
1. Read temperature every 2 seconds
2. Display on Serial Monitor with timestamp (\`millis()\`)
3. Flag **HOT** when temp > 28°C (or your mapped threshold)
4. Log 10 readings in a table in your mission notebook

## Example output
\`\`\`
[12400ms] Temp: 24.5°C — OK
[14400ms] Temp: 29.1°C — HOT!
\`\`\`

## Submit
Photo of wiring + serial log screenshot.

## Stretch goal
Add hysteresis: alert at 28°C, clear alert only when below 26°C (prevents flickering alerts).`,
        },
        {
          title: "Discovery: Analog vs Digital Signals",
          type: LessonType.READING,
          order: 3,
          duration: 14,
          content: `# Discovery: Analog vs Digital Signals

IoT devices speak two languages: **continuous** (analog) and **on/off** (digital).

## Analog
- Infinite range between min and max (in practice 0–1023 on Arduino)
- Examples: temperature, light level, soil moisture
- Needs ADC (Analog-to-Digital Converter)

## Digital
- Only two states: HIGH or LOW
- Examples: button press, motion detected, door open
- Can use \`digitalRead()\` directly

## Mission objective
Classify these as analog or digital:
1. PIR motion sensor output
2. LDR light sensor
3. Push button
4. Ultrasonic distance (hint: timing pulse)

Then write one sentence: *When would analog be better than digital?*

## Stretch goal
Use \`pulseIn()\` to read an ultrasonic sensor and calculate distance in cm.`,
        },
        {
          title: "LAB: Light Level Monitor",
          type: LessonType.LAB,
          order: 4,
          duration: 45,
          content: `# LAB: Light Level Monitor

**Mission:** Create an ambient light monitor that classifies rooms as Dark, Normal, or Bright.

## Requirements
1. Read LDR or photoresistor on analog pin
2. Calibrate thresholds using YOUR environment (not copied values!)
3. Classify and print status every second
4. Drive an LED: off = dark, dim = normal, bright = bright room

## Calibration table (fill in)
| Condition | Raw Reading | Label |
|-----------|-------------|-------|
| Covered   |             | Dark  |
| Normal    |             | Normal|
| Flashlight|             | Bright|

## Submit
Calibration table + 30-second video cycling through all three states.

## Stretch goal
Auto-adjust thresholds: take 10-second baseline on startup to set "Normal" range.`,
        },
        {
          title: "Innovation Check: Sensor Science",
          type: LessonType.QUIZ,
          order: 5,
          duration: 12,
          content: `# Innovation Check: Sensor Science

---

**1.** Arduino \`analogRead()\` returns:
- A) 0 or 1 only
- B) 0 to 1023 ✓
- C) -100 to 100
- D) Floating point only

**2.** Hysteresis prevents:
- A) Sensor wiring
- B) Alert flickering at threshold boundary ✓
- C) WiFi connection
- D) Code compilation

**3.** Averaging multiple readings helps:
- A) Increase noise
- B) Reduce random noise ✓
- C) Delete data
- D) Speed up WiFi

**4.** DHT22 measures:
- A) Distance only
- B) Temperature and humidity ✓
- C) Sound level
- D) GPS coordinates

**5.** Digital sensors output:
- A) Continuous voltage levels only
- B) Discrete HIGH/LOW states ✓
- C) Text messages
- D) Images

---

**4+ correct?** Sensor lab certified. Proceed to Data & Dashboards.`,
        },
      ],
    },
    {
      title: "Data & Dashboards",
      description: "Turn raw sensor streams into live dashboards and data-driven discoveries.",
      order: 3,
      lessons: [
        {
          title: "Discovery: Data Is a Superpower",
          type: LessonType.READING,
          order: 1,
          duration: 15,
          content: `# Discovery: Data Is a Superpower

Sensors without storage are **moments without memory**. IoT power comes from trends over time.

## Why log data?
- Spot patterns (classroom hottest at 2 PM)
- Prove your solution works (before/after comparison)
- Trigger smart alerts (not just display numbers)

## Data formats
\`\`\`json
{
  "device": "greenhouse-01",
  "temp_c": 26.4,
  "humidity": 62,
  "timestamp": "2026-07-17T14:30:00Z"
}
\`\`\`

## Mission objective
Design a JSON payload for YOUR classroom comfort monitor with at least 4 fields. Explain what each field means.

## Stretch goal
Calculate storage: 1 JSON record ≈ 100 bytes. 1 reading/min for 1 year = how many MB?`,
        },
        {
          title: "LAB: Serial Data Logger",
          type: LessonType.LAB,
          order: 2,
          duration: 50,
          content: `# LAB: Serial Data Logger

**Mission:** Log sensor data to serial in CSV format for import into spreadsheets or dashboards.

## CSV format
\`\`\`
millis,temp_c,humidity,status
1000,24.1,58,OK
3000,24.3,57,OK
5000,29.5,55,HOT
\`\`\`

## Requirements
1. Print CSV header once in \`setup()\`
2. Log one row every 5 seconds for 2 minutes (24 rows minimum)
3. Include at least 3 data columns plus timestamp
4. Copy output into Google Sheets and create a line chart

## Submit
Spreadsheet screenshot with chart + Arduino code.

## Stretch goal
Add a \`min\` and \`max\` column tracking running extremes during the session.`,
        },
        {
          title: "Quest: Build a Live Dashboard",
          type: LessonType.VIDEO,
          order: 3,
          duration: 25,
          videoUrl: "https://www.youtube.com/embed/6JI5y8W6HXE",
          content: `# Quest: Build a Live Dashboard

Dashboards turn numbers into **actionable stories** for teachers, farmers, and facility managers.

## Platform walkthrough
Popular free options: **ThingSpeak**, **Adafruit IO**, **Blynk**

## Typical flow
1. Create channel (dashboard) with fields
2. Device sends HTTP POST or MQTT message
3. Platform stores + graphs automatically
4. Set triggers (email when temp > 30°C)

## ESP32 example (ThingSpeak)
\`\`\`cpp
// Pseudocode — adapt to your platform
connectWiFi(ssid, password);
sendToCloud(field1, temperature);
sendToCloud(field2, humidity);
delay(15000); // platform rate limits apply
\`\`\`

## Mission objective
Create a free cloud account, set up one channel with 2 fields, and send at least 5 test values (manual or code).

## Stretch goal
Add a public chart embed link to your mission log.`,
        },
        {
          title: "Discovery: Charts That Tell Stories",
          type: LessonType.READING,
          order: 4,
          duration: 14,
          content: `# Discovery: Charts That Tell Stories

A great dashboard answers three questions **at a glance**:
1. What's happening now?
2. Is that normal?
3. Do I need to act?

## Chart type guide
| Chart | Best for |
|-------|----------|
| Line | Trends over time (temperature all day) |
| Gauge | Current status vs. target |
| Bar | Comparing locations (Room A vs B) |
| Heatmap | Patterns by hour/day |

## Design rules
- Label axes with units (°C, not just numbers)
- Use color consistently (red = alert, green = OK)
- Show thresholds as dotted lines

## Mission objective
Redesign your Serial Data Logger chart:
1. Add axis labels and title
2. Add a horizontal threshold line
3. Write 2 sentences: *What story does the data tell?*

## Stretch goal
Create a second chart comparing two sensors side-by-side.`,
        },
        {
          title: "Build Challenge: Classroom Climate Station",
          type: LessonType.PROJECT,
          order: 5,
          duration: 75,
          content: `# Build Challenge: Classroom Climate Station

**Mid-path project:** Deploy a multi-sensor station with local display AND cloud logging.

## Mission
Monitor your classroom (or simulated environment) for temperature and one additional variable (humidity, light, or CO₂ if available).

## Requirements
1. Local readout (Serial, LCD, or OLED)
2. Cloud dashboard with live or near-live data (minimum 1 hour of logged data)
3. Alert rule when conditions exceed comfortable range
4. One-page **Discovery Report**: when is the room most uncomfortable? Why might that be?

## Deliverables
- Wiring diagram or photo
- Code (commented)
- Dashboard link or screenshot
- Written discovery summary

## Stretch goal
Compare weekday vs. weekend data if your device runs continuously.`,
        },
      ],
    },
    {
      title: "Smart Systems",
      description: "Build automated responses and understand how connected devices stay secure.",
      order: 4,
      lessons: [
        {
          title: "Discovery: Agriculture Goes Smart",
          type: LessonType.READING,
          order: 1,
          duration: 16,
          content: `# Discovery: Agriculture Goes Smart

Farmers were IoT pioneers — **soil sensors and automated irrigation** save water and boost harvests.

## Smart greenhouse logic
\`\`\`
if soil_moisture < 30%:
    open_valve for 10 seconds
if temperature > 32°C:
    turn_on_fan
if humidity > 80%:
    send_alert("Mold risk")
\`\`\`

## NOVA Smart Greenhouse connection
Your linked experience **smart-greenhouse** uses these exact patterns. This mission path teaches the systems behind that adventure.

## Mission objective
Design automation rules for a school garden:
1. When to water (soil moisture threshold)
2. When to alert (frost, heat, pest motion)
3. What actuators you'd need (valve, fan, buzzer)

## Stretch goal
Estimate water savings if irrigation runs only when needed vs. on a fixed timer.`,
        },
        {
          title: "LAB: Automated Water Trigger",
          type: LessonType.LAB,
          order: 2,
          duration: 55,
          content: `# LAB: Automated Water Trigger

**Mission:** Program a soil moisture threshold system that activates a pump, servo valve, or LED (simulating water).

## Requirements
1. Read soil moisture sensor (or potentiometer as simulator)
2. If moisture < 30% (your calibrated threshold): activate output for 5 seconds
3. Enforce cooldown — no re-trigger for 60 seconds
4. Log every activation with timestamp and moisture reading

## Safety
Never run water pumps unattended in early prototypes. Use LED/buzzer as stand-in until design is proven.

## Submit
Video of 2 activation cycles + serial log.

## Stretch goal
Add manual override button: hold 3 sec to force one watering cycle.`,
        },
        {
          title: "Quest: Cloud Connectivity Basics",
          type: LessonType.VIDEO,
          order: 3,
          duration: 22,
          videoUrl: "https://www.youtube.com/embed/E22-MgJATUM",
          content: `# Quest: Cloud Connectivity Basics

Getting data from a device to the cloud requires **reliable connectivity patterns**.

## WiFi workflow (ESP32/ESP8266)
1. Connect to network (\`WiFi.begin()\`)
2. Wait for connection (with timeout!)
3. Send HTTP POST or MQTT publish
4. Handle failures gracefully (retry, local buffer)

## Rate limits matter
Free cloud tiers often cap updates at **once every 15 seconds**. Design accordingly.

## Mission objective
Write pseudocode for a resilient upload loop:
- Try upload
- If fail, store reading locally (array buffer)
- Retry every 30 seconds
- On success, flush buffer

## Stretch goal
Research MQTT vs HTTP for IoT — list one advantage of each.`,
        },
        {
          title: "Discovery: IoT Security Essentials",
          type: LessonType.READING,
          order: 4,
          duration: 18,
          content: `# Discovery: IoT Security Essentials

Every connected device is a **potential entry point**. NOVA builds secure by default.

## Top IoT security mistakes
1. Default passwords never changed
2. Unencrypted WiFi credentials in code repos
3. Open dashboards with no authentication
4. No firmware update plan

## Security checklist
- [ ] Change default admin passwords
- [ ] Use WPA2/WPA3 WiFi
- [ ] Store secrets in environment variables, not GitHub
- [ ] Enable HTTPS for cloud APIs
- [ ] Segment IoT devices on separate network if possible

## Mission objective
Audit a hypothetical smart locker system. List 3 vulnerabilities and fixes for each.

## Stretch goal
Research one real IoT breach (Mirai botnet counts!) and summarize the lesson in 2 sentences.`,
        },
        {
          title: "LAB: Secure Device Pairing",
          type: LessonType.LAB,
          order: 5,
          duration: 45,
          content: `# LAB: Secure Device Pairing

**Mission:** Implement (or document) a secure device onboarding flow for your IoT project.

## Secure pairing flow
1. Device creates unique ID on first boot
2. User connects to device's temporary AP (access point)
3. User submits WiFi credentials via captive portal
4. Device stores credentials encrypted (or in flash, never in source code)
5. Device registers with cloud using API key from environment config

## If no hardware
Write a detailed **Security Design Doc** covering the 5 steps above for YOUR capstone project.

## Requirements
- No plaintext passwords in Git repository
- API keys stored in \`.env\` (add \`.env\` to \`.gitignore\`)
- Document what happens if credentials are wrong

## Submit
Security design doc + screenshot showing secrets are NOT in your code files.

## Stretch goal
Implement WiFi connection with 3-retry timeout and fallback to AP mode.`,
        },
      ],
    },
    {
      title: "Community Impact",
      description: "Design IoT systems that serve schools and communities — then pitch your smart solution.",
      order: 5,
      lessons: [
        {
          title: "Discovery: Environmental Monitoring Networks",
          type: LessonType.READING,
          order: 1,
          duration: 16,
          content: `# Discovery: Environmental Monitoring Networks

One sensor is a datapoint. A **network** is a movement — citizen science at scale.

## Network design
- **Nodes** — individual sensor devices
- **Gateway** — collects node data, sends to cloud
- **Portal** — public or school dashboard

## Example: School air quality network
Place PM2.5 sensors in: cafeteria, gym, parking lot, garden
Compare readings → discover pollution sources → advocate for change

## Mission objective
Plan a 3-node sensor network for your community:
1. Draw node locations on a map
2. Specify sensor type at each node
3. Identify who acts on the data (principal, city council, Explorers)

## Stretch goal
Research Sensor.Community or similar open networks — how do they share data publicly?`,
        },
        {
          title: "LAB: Air Quality Alert Prototype",
          type: LessonType.LAB,
          order: 2,
          duration: 55,
          content: `# LAB: Air Quality Alert Prototype

**Mission:** Build (or simulate) an air quality monitor that triggers alerts when readings exceed healthy limits.

## Options
- **Hardware:** PM2.5 sensor (PMS5003) or gas sensor (MQ-135)
- **Simulation:** Map potentiometer to AQI scale (0–500)

## Alert tiers
| AQI | Status | Action |
|-----|--------|--------|
| 0–50 | Good | Green LED |
| 51–100 | Moderate | Yellow LED |
| 101+ | Unhealthy | Red LED + buzzer |

## Requirements
1. Read and classify AQI every 10 seconds
2. Log readings to serial CSV
3. Trigger appropriate alert tier
4. Run for 5 minutes and capture log

## Submit
CSV log + photo/video of alert states.

## Stretch goal
Add SMS or email alert via IFTTT webhook when AQI > 100.`,
        },
        {
          title: "Innovation Check: Systems Thinking",
          type: LessonType.QUIZ,
          order: 3,
          duration: 12,
          content: `# Innovation Check: Systems Thinking

---

**1.** A cooldown timer on irrigation prevents:
- A) Sensor reading
- B) Over-watering from repeated triggers ✓
- C) WiFi connection
- D) Data logging

**2.** Storing WiFi passwords in GitHub is:
- A) Best practice
- B) A security risk ✓
- C) Required by Arduino
- D) Only bad for robots

**3.** MQTT is useful for IoT because it:
- A) Only works offline
- B) Supports lightweight pub/sub messaging ✓
- C) Replaces all sensors
- D) Eliminates need for code

**4.** A 3-node sensor network needs:
- A) Only one sensor total
- B) Multiple devices + data aggregation strategy ✓
- C) No cloud platform
- D) Only manual readings

**5.** Hysteresis in alerts means:
- A) Alerts never clear
- B) Different thresholds for trigger vs. clear ✓
- C) No thresholds used
- D) Sensors are removed

---

**4+ correct?** Systems thinking verified. Prepare your capstone pitch.`,
        },
        {
          title: "Quest: Pitch Your Smart Solution",
          type: LessonType.READING,
          order: 4,
          duration: 20,
          content: `# Quest: Pitch Your Smart Solution

Great IoT projects die without **clear pitches**. Learn to sell the problem, not just the gadget.

## Pitch structure (5 minutes)
1. **Hook** — startling fact or story (15 sec)
2. **Problem** — who suffers and how (45 sec)
3. **Solution** — your system in plain language (90 sec)
4. **Demo** — show dashboard or prototype (90 sec)
5. **Impact & Ask** — what's next? funding? pilot? teammates? (60 sec)

## Mission objective
Draft speaker notes for your capstone pitch using the structure above.

Practice out loud once. Time yourself.

## Judges want to hear
- Why THIS problem matters to YOU
- Real data (even 1 hour of logs beats pure theory)
- Honest limitations — what doesn't work yet?

## Stretch goal
Record a 60-second teaser video for social media using only your phone.`,
        },
        {
          title: "Build Challenge: Community Smart System Blueprint",
          type: LessonType.PROJECT,
          order: 5,
          duration: 90,
          content: `# Build Challenge: Community Smart System Blueprint

**Capstone mission:** Design a complete IoT solution that serves your school or community.

## Choose your system
- Smart agriculture (greenhouse, garden, compost monitor)
- Energy awareness (classroom power, solar output)
- Environmental (air quality, noise, flood detection)
- Safety (hallway occupancy, emergency exit monitoring)
- Accessibility (smart alert for hearing-impaired Explorers)

## Deliverables
1. **System diagram** — sensors, microcontroller, connectivity, cloud, users
2. **Working prototype** — at least one real sensor reading to dashboard or CSV
3. **Automation rule** — one if/then action (local or cloud trigger)
4. **Security plan** — passwords, API keys, network considerations
5. **Impact pitch** — 5 minutes live or recorded

## Rubric highlights
| Area | Exceeds |
|------|---------|
| Community fit | Solves a problem stakeholders confirmed |
| Technical | Reliable data + meaningful automation |
| Security | No exposed credentials, thoughtful plan |
| Communication | Pitch makes non-engineers care |

## Submit
Upload all materials via the Capstone portal on your Mission Path page.

## Stretch goal
Deploy a pilot with real users for one week and report findings.`,
        },
      ],
    },
  ],
};
