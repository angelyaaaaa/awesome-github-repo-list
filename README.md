# awesome-github-repo-list
UI to search for repos and list it, mainly included search-input and display-list.

## How to init
setting `.env` first: put your github token into `.env` and named `REACT_APP_GITHUB_TOKEN`

```bash
# dependency
yarn

# run
yarn start
```
## Browser Requirement
chrome version should be 112+ to implment css nesting function

## Structure
├── src
│   ├── components // functional components
│   ├── hooks // UI logic or business logic
│   ├── styles // components' style
│   └── index.js
├── node_modules
├── package.json
├── .env // setting it first
└── .gitignore

## Performance Improvement
- used `infinite scroll` to fetch data pieceful, instead of getting all in one time
- used `virtual list` to improve UI performance, only render the list items which in the window screen
- used `debounce` to limit the API rate, prevent fetching too fast
- used `throttle` to limit the scroll event

