# babel-plugin-atomizer
A babel plugin for processing atomic CSS

#Usage

Add plugin in your `babel-loader` config:

```javascript
loaders: [
    {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
            presets: ['react'],
            plugins: [
                ['babel-plugin-atomizer', { configPath: __dirname + '/atomizerConfigs.js' }]
            ]
        }
    }
]
```

Example of `atomizerConfigs.js`:

```javascript
module.exports = {
    cssDest: './main.css',
    options: {
        namespace: '#atomic',
    },
    configs: {
        breakPoints: {
            sm: '@media screen(min-width=750px)',
            md: '@media(min-width=1000px)',
            lg: '@media(min-width=1200px)'
        },
        custom: {
            '1': '1px solid #000',
            'Ff(i)': 'inherit',
            'C(light-gray)': 'rgba(0, 0, 0, 0.80)'
        },
        classNames: []
    }
};

```
