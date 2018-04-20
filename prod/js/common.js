requirejs.config({
    baseUrl: "js",
    paths: {
        jquery: "lib/jquery",
        bootstrap: "lib/bootstrap",
        tether: "lib/tether",
        mdb: "lib/mdb",
    },
    map: {
        "*": {
            jquery: "jquery"
        }
    },
    shim: {
        mdb: {
            deps: ["tether", "bootstrap"]
        },
        bootstrap: { 
            deps: ["jquery"],
            exports: "Bootstrap"
        }
    }
});