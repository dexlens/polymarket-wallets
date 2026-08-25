// get the passed file from the command line
const passed_file = Deno.args[0];
if (!passed_file) {
  console.error("No file passed");
  Deno.exit(1);
}
const d1 = await Deno.readTextFile(`data/data/${passed_file}`);
const data = JSON.parse(d1);
const realdata = data.data; 
<<<<<<< HEAD
const thisrunsfilename = `wallets/thisrun.json`;
// create the file
await Deno.writeTextFile(thisrunsfilename, JSON.stringify([], null, 2));
let thisrunsdata = [];
if (await Deno.stat(thisrunsfilename)) {
  thisrunsdata = JSON.parse(await Deno.readTextFile(thisrunsfilename));
}
for (const wallet of realdata.slice(0, 1)) {
  const address = wallet.trader; // Adjust this if data structure is different
  const rank = wallet.rank;
  
  console.log({
    address,
    rank,
    wallet,
  })

  thisrunsdata.push(wallet);
  await Deno.writeTextFile(thisrunsfilename, JSON.stringify(thisrunsdata, null, 2));
  // commit the changes
  const p = Deno.run({
    cmd: ["git", "add", thisrunsfilename],
=======
for (const wallet of realdata.slice(0, 1)) {
  const address = wallet.trader; // Adjust this if data structure is different
  const rank = wallet.rank;
  const fileName = `wallets/${rank}-${address}.json`;

  // check if the file already exists
  if (await Deno.stat(fileName)) {
    console.log(`File ${fileName} already exists`);
    continue;
  }
  
  await Deno.writeTextFile(fileName, JSON.stringify(wallet, null, 2));
  const p = Deno.run({
    cmd: ["git", "add", fileName],
>>>>>>> 8ac5890892c4bac928949b542ab39acf14171302
    stdout: "piped",
    stderr: "piped"
  });
  await p.status();
<<<<<<< HEAD
  const commitMessage = `Add wallet ${address} to thisrun.json`;
=======
  const commitMessage = `Add wallet ${address}`;
>>>>>>> 8ac5890892c4bac928949b542ab39acf14171302
  const c = Deno.run({
    cmd: ["git", "commit", "-m", commitMessage],
    stdout: "piped",
    stderr: "piped"
  });
  await c.status();
<<<<<<< HEAD
}
=======
}
>>>>>>> 8ac5890892c4bac928949b542ab39acf14171302
