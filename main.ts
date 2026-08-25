// get the passed file from the command line
const passed_file = Deno.args[0];
if (!passed_file) {
  console.error("No file passed");
  Deno.exit(1);
}
const d1 = await Deno.readTextFile(`data/data/${passed_file}`);
const data = JSON.parse(d1);
const realdata = data.data; 
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
    stdout: "piped",
    stderr: "piped"
  });
  await p.status();
  const commitMessage = `Add wallet ${address}`;
  const c = Deno.run({
    cmd: ["git", "commit", "-m", commitMessage],
    stdout: "piped",
    stderr: "piped"
  });
  await c.status();
}