const mqtt = require('mqtt');

// Topics must match exactly what the ESP32 sketch subscribes/publishes to
const COMMAND_TOPIC = process.env.MQTT_RELAY_COMMAND_TOPIC || 'smarthome/relay1/set';
const STATE_TOPIC = process.env.MQTT_RELAY_STATE_TOPIC || 'smarthome/relay1/state';

let client;
let relayState = 'OFF'; // last state reported back by the ESP32

const connectMQTT = () => {
  const brokerUrl = process.env.MQTT_BROKER_URL || 'mqtt://broker.hivemq.com:1883';

  client = mqtt.connect(brokerUrl, {
    username: process.env.MQTT_USERNAME || undefined,
    password: process.env.MQTT_PASSWORD || undefined,
    clientId: `smarthome-backend-${Math.random().toString(16).slice(2, 10)}`,
    reconnectPeriod: 2000,
  });

  client.on('connect', () => {
    console.log(`MQTT connected to ${brokerUrl}`);
    client.subscribe(STATE_TOPIC, (err) => {
      if (err) console.error('MQTT subscribe error:', err.message);
    });
  });

  client.on('message', (topic, payload) => {
    if (topic === STATE_TOPIC) {
      relayState = payload.toString().trim().toUpperCase();
      console.log(`Relay reported state: ${relayState}`);
    }
  });

  client.on('reconnect', () => console.log('MQTT reconnecting...'));
  client.on('error', (err) => console.error('MQTT error:', err.message));

  return client;
};

// Publishes an ON/OFF command to the ESP32. Throws if MQTT isn't connected yet.
const setRelay = (state) => {
  const normalized = String(state).toUpperCase() === 'ON' ? 'ON' : 'OFF';
  if (!client || !client.connected) {
    throw new Error('MQTT client is not connected');
  }
  client.publish(COMMAND_TOPIC, normalized);
  return normalized;
};

const getRelayState = () => relayState;

module.exports = { connectMQTT, setRelay, getRelayState, COMMAND_TOPIC, STATE_TOPIC };
