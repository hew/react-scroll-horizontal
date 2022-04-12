const config = {
    "*.{css,html,json,md,yml}": ["prettier --write"],
    "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
}

module.exports = config
