// get the passed file from the command line
const passed_file = Deno.args[0];
if (!passed_file) {
  console.error("No file passed");
  Deno.exit(1);
}
const d1 = await Deno.readTextFile(`data/data/${passed_file}`);
const data = JSON.parse(d1);
const realdata = data.data; 

/**
 * The RUN thingie
 */
const runStart = 0;
const runEnd = 3;
const runName = `run-${runStart}-${runEnd}`;

const thisrunsfilename = `wallets/${runName}.json`;
// create the file
await Deno.writeTextFile(thisrunsfilename, JSON.stringify([], null, 2));
let thisrunsdata = [];
if (await Deno.stat(thisrunsfilename)) {
  thisrunsdata = JSON.parse(await Deno.readTextFile(thisrunsfilename));
}
for (const wallet of realdata.slice(runStart, runEnd)) {
  const address = wallet.trader; // Adjust this if data structure is different
  const rank = wallet.rank;
  const trader_name = wallet.trader_name;
  
  thisrunsdata.push(wallet);
  await Deno.writeTextFile(thisrunsfilename, JSON.stringify(thisrunsdata, null, 2));
  // commit the changes
  const p = Deno.run({
    cmd: ["git", "add", thisrunsfilename],
    stdout: "piped",
    stderr: "piped"
  });
  await p.status();
  const commitMessage = `Add ${trader_name}:${address}`;
  const c = Deno.run({
    cmd: ["git", "commit", "-m", commitMessage],
    stdout: "piped",
    stderr: "piped"
  });
  await c.status();

  // increase the index
  const indexfilename = `index.json`;
  const indexdata = JSON.parse(await Deno.readTextFile(indexfilename));
  indexdata.wallets++;
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
console.log(newreadmedata);
await Deno.writeTextFile(readmefilename, newreadmedata);
