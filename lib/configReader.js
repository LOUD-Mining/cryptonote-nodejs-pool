/**
 * Cryptonote Node.JS Pool
 * https://github.com/dvandal/cryptonote-nodejs-pool
 *
 * Configuration Reader
 **/

// Load required modules
let fs = require('fs');

// Set pool software version
global.version = "v2.0.0";

/**
 * Load pool configuration
 **/
 
// Get configuration file path
let configFile = (function(){
    for (let i = 0; i < process.argv.length; i++){
        if (process.argv[i].indexOf('-config=') === 0)
            return process.argv[i].split('=')[1];
    }
    return 'config.json';
})();

// Read configuration file data
try {
    global.config = JSON.parse(fs.readFileSync(configFile));
}
catch(e){
    console.error('Failed to read config file ' + configFile + '\n\n' + e);
    return;
}

/**
 * Developper donation addresses -- thanks for supporting my works!
 **/
 
let donationAddresses = {
    XMR: '497eMhzAuwyLj6Mct54GETCHyrmYkXVGKXxhZDfgsLJ2D7XPobiAMGZhsTrFyuxcYPJvMvdQbekWQS3DXLSuy3Y18YLcsAQ',
    UPX: 'UPX1brGoBKBMpKuqyPSJE9424fpP4HYNy6V9XTZnTdVk36HjzcRmpJT7wbyN3CRLrJB8TTQK2wWf5XGQLkKAXCon5HiDNMRA1q'
};

global.donations = {};

global.devFee = config.blockUnlocker.devDonation || 0.2;
// WORKAROUND: If 'devDonation' is set to 0%, We need to explicitly set 0% or it will default to 0.2%
if (config.blockUnlocker.devDonation === 0)
    global.devFee = 0;

let wallet = donationAddresses[config.symbol.toUpperCase()];
if (devFee && wallet)
    global.donations[wallet] = devFee;
