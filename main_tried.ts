// get the passed file from the command line
import fs from "node:fs";
const passed_file = Deno.args[0];
const start = Deno.args[1];
const end = Deno.args[2];
if (!passed_file) {
  console.error("No file passed");
  Deno.exit(1);
}
if (!start) {
  console.error("No start passed");
  Deno.exit(1);
}
if (!end) {
  console.error("No end passed");
  Deno.exit(1);
}
const d1 = await Deno.readTextFile(`data/data/${passed_file}`);
const data = JSON.parse(d1);
const realdata = data.data; 

/**
 * The RUN thingie
 */
const runStart = parseInt(start);
const runEnd = parseInt(end);
const runName = `run-${runStart}-${runEnd}`;

const thisrunsfilename = `wallets/${runName}.json`;

// check if the run already exists
// if (fs.existsSync(thisrunsfilename)) {
//   console.log(`Run ${runName} already exists`);
//   Deno.exit(0);
// }

// create the file
await Deno.writeTextFile(thisrunsfilename, JSON.stringify([], null, 2));
let thisrunsdata = [];
if (await Deno.stat(thisrunsfilename)) {
  thisrunsdata = JSON.parse(await Deno.readTextFile(thisrunsfilename));
}
// for (const wallet of realdata.slice(runStart, runEnd)) {
//   const address = wallet.trader; // Adjust this if data structure is different
//   const rank = wallet.rank;
//   const trader_name = wallet.trader_name;
  
//   thisrunsdata.push(wallet);
//   await Deno.writeTextFile(thisrunsfilename, JSON.stringify(thisrunsdata, null, 2));
//   // commit the changes
//   const p = Deno.run({
//     cmd: ["git", "add", thisrunsfilename],
//     stdout: "piped",
//     stderr: "piped"
//   });
//   await p.status();
//   const commitMessage = `Add ${trader_name}:${address}`;
//   const c = Deno.run({
//     cmd: ["git", "commit", "-m", commitMessage],
//     stdout: "piped",
//     stderr: "piped"
//   });
//   await c.status();

//   // increase the index
//   const indexfilename = `index.json`;
//   const indexdata = JSON.parse(await Deno.readTextFile(indexfilename));
//   indexdata.wallets++;
//   await Deno.writeTextFile(indexfilename, JSON.stringify(indexdata, null, 2));
//   // console.log(`Finished ${wallet.trader_name}:${wallet.trader}`);
// }


// slice the 300,000 into runs of 100 
const runs = [];
for (let i = 0; i < 300000; i += 100) {
  runs.push({ start: i, end: i + 100 });
}

console.log(runs.length);

for (const run of runs.slice(0, 2)) {
  const runName = `run-${run.start}-${run.end}`;
  console.log(`Processing run ${runName}`);
  const thisrunsfilename = `wallets/${runName}.json`;
  // if (fs.existsSync(thisrunsfilename)) {
  //   console.log(`Run ${runName} already exists`);
  //   continue;
  // }
  await Deno.writeTextFile(thisrunsfilename, JSON.stringify([], null, 2));
  let thisrunsdata = [];
  if (await Deno.stat(thisrunsfilename)) {
    thisrunsdata = JSON.parse(await Deno.readTextFile(thisrunsfilename));
  }
  for (const wallet of realdata.slice(run.start, run.end)) {
    thisrunsdata.push(wallet);
  }
  await Deno.writeTextFile(thisrunsfilename, JSON.stringify(thisrunsdata, null, 2));
  const commitMessage = `Add run ${runName}`;
  const c = Deno.run({
    cmd: ["git", "commit", "-m", commitMessage],
    stdout: "piped",
    stderr: "piped"
  });
  await c.status();

  // wait 5 seconds
  await new Promise(resolve => setTimeout(resolve, 5000));
  // increase the index
  const indexfilename = `index.json`;
  const indexdata = JSON.parse(await Deno.readTextFile(indexfilename));
  indexdata.wallets += 100;
  await Deno.writeTextFile(indexfilename, JSON.stringify(indexdata, null, 2));
}

// read the index.json now
const indexfilename = `index.json`;
const indexdata = JSON.parse(await Deno.readTextFile(indexfilename));
const wallets = indexdata.wallets;
// save the wallets to the README.md
const readmefilename = `README.md`;
const readmedata = await Deno.readTextFile(readmefilename);
// find the {{ number of wallets }}
const numberFormatted = wallets.toLocaleString(); 
const newreadmedata = readmedata.replace(/Wallets: \d+/, `Wallets: ${numberFormatted}`);
// console.log(newreadmedata);
await Deno.writeTextFile(readmefilename, newreadmedata);
