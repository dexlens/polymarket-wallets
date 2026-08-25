# deno run --allow-all main.ts data-0-300_000/data-0-300_000.json 0 100
# deno run --allow-all main.ts data-0-300_000/data-0-300_000.json 100 200
# deno run --allow-all main.ts data-0-300_000/data-0-300_000.json 200 300
# deno run --allow-all main.ts data-0-300_000/data-0-300_000.json 300 400
# deno run --allow-all main.ts data-0-300_000/data-0-300_000.json 400 500
for ((i=2000; i<5000; i+=100))
do
  start=$i
  end=$((i+100))
  deno run --allow-all main.ts data-0-300_000/data-0-300_000.json $start $end
done