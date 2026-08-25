<div align="center" style="margin-top: 1em;">
  <a href="https://github.com/dexlens" style="text-decoration: none; margin: 0 10px;">
    <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/>
  </a>
  <a href="https://dexlens.io" style="text-decoration: none; margin: 0 10px;">
    <img src="https://img.shields.io/badge/Website-0A66C2?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Website"/>
  </a>
  <a href="https://x.com/dexlprotocol" style="text-decoration: none; margin: 0 10px;">
    <img src="https://img.shields.io/badge/X-000000?style=for-the-badge&logo=x&logoColor=white" alt="X (formerly Twitter)"/>
  </a>
  <a href="https://t.me/dexlens_official" style="text-decoration: none; margin: 0 10px;">
    <img src="https://img.shields.io/badge/Telegram-229ED9?style=for-the-badge&logo=telegram&logoColor=white" alt="Telegram"/>
  </a>
  <a href="https://etherscan.io/token/0x2e8fafaf34f610af898d6a5eabcad82417c56ed9" style="text-decoration: none; margin: 0 10px;">
    <img src="https://img.shields.io/badge/Etherscan-3C3C3D?style=for-the-badge&logo=ethereum&logoColor=white" alt="Etherscan"/>
  </a>
</div>



# Polymarket Wallets 
This is a json file dataset of wallets have been indexed by DEX Lens for polymarket activity; the data is behind calling the DEX Lens API and we use this as a public good & source of truth if you want to use it for your own research. 

Wallets: 5000

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
