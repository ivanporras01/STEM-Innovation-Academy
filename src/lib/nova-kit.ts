/**
 * Official NOVA Explorer hardware kit — ESP32 base (Arduino IDE compatible).
 * Single kit covers Robotics & IoT mentor-led build missions.
 */
export const NOVA_EXPLORER_KIT = {
  name: "NOVA Explorer Kit (ESP32)",
  tagline: "One kit. Three paths. Real builds with your Innovation Mentor.",
  estimatedCostUsd: "35–50",
  controller: "ESP32 DevKit (Arduino IDE / C++)",
  simulationFallback: "https://wokwi.com",
  components: [
    { item: "ESP32 DevKit V1", qty: 1, notes: "WiFi + Bluetooth for IoT missions" },
    { item: "Breadboard (830 tie)", qty: 1, notes: "Prototyping" },
    { item: "Jumper wires (M-M)", qty: 1, notes: "40+ pack" },
    { item: "LEDs (assorted)", qty: 5, notes: "Red, green, yellow" },
    { item: "Resistors 220Ω", qty: 10, notes: "LED protection" },
    { item: "Push buttons", qty: 2, notes: "Input missions" },
    { item: "Passive buzzer", qty: 1, notes: "Blink & Beep Protocol" },
    { item: "DHT11 sensor", qty: 1, notes: "Temperature / humidity" },
    { item: "HC-SR04 ultrasonic", qty: 1, notes: "Distance / robotics" },
    { item: "SG90 micro servo", qty: 1, notes: "Actuator basics" },
    { item: "Photoresistor (LDR)", qty: 1, notes: "Light level missions" },
  ],
  roboticsAddOn: {
    name: "NOVA Robotics Add-On",
    estimatedCostUsd: "25–40",
    components: [
      { item: "L298N motor driver", qty: 1, notes: "Dual DC motor control" },
      { item: "DC gear motors + wheels", qty: 2, notes: "Rover chassis" },
      { item: "Line-follow sensor module", qty: 1, notes: "IR array or 2× sensors" },
      { item: "Chassis plate + caster", qty: 1, notes: "2WD rover base" },
    ],
  },
} as const;

export type KitTier = "base" | "robotics-plus";

export function getKitLabel(tier: KitTier): string {
  return tier === "robotics-plus"
    ? `${NOVA_EXPLORER_KIT.name} + Robotics Add-On`
    : NOVA_EXPLORER_KIT.name;
}
