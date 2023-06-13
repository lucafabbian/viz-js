import { instance } from "../../src/standalone.mjs";
import { makeGraph } from "./utils.mjs";

const tests = [
  { nodeCount: 100, randomEdgeCount: 0 },
  { nodeCount: 1000, randomEdgeCount: 0 },
  { nodeCount: 5000, randomEdgeCount: 0 },
  { nodeCount: 100, randomEdgeCount: 50 },
  { nodeCount: 1000, randomEdgeCount: 500 },
  { nodeCount: 5000, randomEdgeCount: 1000 },
  { nodeCount: 100, randomEdgeCount: 100 },
  { nodeCount: 1000, randomEdgeCount: 1000 },
  { nodeCount: 5000, randomEdgeCount: 5000 }
];

const timeLimit = 5000;

for (const { nodeCount, randomEdgeCount } of tests) {
  const viz = await instance();
  const label = `${nodeCount} nodes, ${randomEdgeCount} edges`;
  const src = makeGraph(nodeCount, randomEdgeCount);

  let callCount = 0;

  const startTime = performance.now();

  while (performance.now() - startTime < timeLimit) {
    viz.render(src);
    callCount++;
  }

  const stopTime = performance.now();
  const duration = (stopTime - startTime) / 1000;
  const speed = callCount / duration;

  console.log(`${label}: ${callCount} in ${duration.toFixed(2)} s, ${speed.toFixed(2)} calls/s`);
}
