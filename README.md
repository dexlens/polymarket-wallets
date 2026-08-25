# Polymarket Wallets 
This is a json file dataset of wallets have been indexed by DEX Lens for polymarket activity; the data is behind calling the DEX Lens API and we use this as a public good & source of truth if you want to use it for your own research. 

Wallets: {{ number of wallets }}

# Dislcaimer
This repo is large and may take a while to clone. Please be patient; or use the dexlens api directly. 
```bash
curl -s https://api.dexlens.io/v1/polymarket/wallets | jq . > data/polymarket-wallets.json
```

# What is this?
It is a dataset of XXX wallets that we have indexed from scanning the blockchain for polymarket activity; we place it here on Githu.

1. A source of truth for DEX Lens research.
2. A public good 

As a matter of public good and to facilitate it as a source of truth for DEX Lens research. please understand that this dataset is provided "as is" and it may be incomplete, inaccurate, or outdated.
We do our best to keep it up to date, but we make no guarantees.
