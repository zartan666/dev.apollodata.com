# Apollo site
Available at [dev.apollodata.com](http://dev.apollodata.com).

## How to run the site
1. Install jekyll with `gem install jekyll`
2. Go to the project directory
3. Run `npm install`
4. Run `npm start`

## How to update CSS
1. Compile LESS to CSS via `grunt` in command line
2. Commit the compiled `style.css`

## How to update React code

*NOTE*: when you run in development `npm start`, this happens automatically locally, but **YOU MUST BUILD BEFORE PUSHING TO MASTER**.

1. Compile React code: `npm run build`
2. Commit the compiled `build` directory
