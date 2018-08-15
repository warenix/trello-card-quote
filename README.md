# Trello Card Quote

A Trello power up to search any other cards quoted current card.

# Usage

1.  Go to a trello card
2.  Click "Power-ups" > Card Quote
3.  After authorization, you will see a list of cards quoted current card.

# Deploy

1.  Install `surge` cli tool

    ```sh
    npm install surge
    ```

2.  Modify `src/CNAME` for the target subdomain
3.  Deploy
    ```sh
    cd src
    ./node_modules/surge/lib/cli.js
    ```

# Local Server

```
cd src
python -m SimpleHTTPServer 8022
```

Visit [localhost](http://localhost:8022) to use it locally.

# Credits

-   <div>Icons made by <a href="https://www.flaticon.com/authors/pixelmeetup" title="Pixelmeetup">Pixelmeetup</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>

-   [surge.sh](https://surge.sh) for app hosting.
-   [showdown](https://github.com/showdownjs/showdown) for showing markdown.
