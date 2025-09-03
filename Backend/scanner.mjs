import snmp from "net-snmp";
import ip from "ip";
import pLimit from "p-limit";

const COMMUNITY = "public";

// OIDs for system and interface info
const OIDS = [
  "1.3.6.1.2.1.1.5.0",   // sysName
  "1.3.6.1.2.1.1.1.0",   // sysDescr
  "1.3.6.1.2.1.1.3.0",   // sysUpTime
  "1.3.6.1.2.1.1.6.0",   // sysLocation
  "1.3.6.1.2.1.1.2.0",   // sysObjectID
  "1.3.6.1.2.1.2.2.1.3.1", // ifType
  "1.3.6.1.2.1.2.2.1.8.1", // ifOperStatus
  "1.3.6.1.2.1.2.2.1.17.1" // ifConnectorPresent (used to infer physical/virtual)
];

// Interface type mapping
const ifTypeMap = {
  1: "other",
  6: "ethernetCsmacd",
  24: "loopback",
  71: "wifi",
  131: "tunnel",
  135: "l2vlan",
};

// Operational status mapping
const operStatusMap = {
  1: "up",
  2: "down",
  3: "testing",
  4: "unknown",
  5: "dormant",
  6: "notPresent",
  7: "lowerLayerDown",
};

// Query one device
function checkDevice(ipAddr) {
  return new Promise((resolve, reject) => {
    const session = snmp.createSession(ipAddr, COMMUNITY, { timeout: 1000 });
    let closed = false;
    const safeClose = () => {
      if (!closed) {
        session.close();
        closed = true;
      }
    };

    session.get(OIDS, (error, varbinds) => {
      safeClose();

      if (error) {
        return reject(error);
      }

      const isPhysical = varbinds[7]?.value === 1 ? "Physical" : "Virtual";

      resolve({
        ip: ipAddr,
        hostname: varbinds[0]?.value?.toString() || "Unknown",
        description: varbinds[1]?.value?.toString() || "Unknown",
        uptime: varbinds[2]?.value?.toString() || "N/A",
        location: varbinds[3]?.value?.toString() || "Unknown",
        objectID: varbinds[4]?.value?.toString() || "",
        interfaceType: ifTypeMap[varbinds[5]?.value] || `Unknown (${varbinds[5]?.value})`,
        operStatus: operStatusMap[varbinds[6]?.value] || `Unknown (${varbinds[6]?.value})`,
        physicalType: isPhysical
      });
    });
  });
}

function getDeviceInfo(ipAddr) {
  return checkDevice(ipAddr);
}

// IP list (static or dynamic)
function ipList() {
  return ["192.168.3.230", "192.168.1.135", "192.168.2.18", "192.168.0.186", "192.168.0.108", "192.168.2.17"];
}

// Scan network
async function scanNetwork(cidr = "192.168.1.0/24") {
  const ips = ipList(); // or use getIPList(cidr)
  console.log(`📡 Scanning ${ips.length} addresses in ${cidr} ...`);

  const limit = pLimit(3);
  const results = [];
  const nonResponders = [];

  const tasks = ips.map(ipAddr =>
    limit(() =>
      checkDevice(ipAddr)
        .then(res => {
          console.log(`✅ Found device: ${res.ip} (${res.hostname})`);
          results.push(res);
        })
        .catch(() => {
          nonResponders.push(ipAddr);
        })
    )
  );

  await Promise.all(tasks);

  console.log("\n📋 Devices found:");
  console.table(results);
  console.log(`Total devices found: ${results.length}`);

  return {
    responders: results,
    nonResponders: nonResponders
  };
}

// Optional: run scan directly
// scanNetwork();

export { getDeviceInfo, scanNetwork };