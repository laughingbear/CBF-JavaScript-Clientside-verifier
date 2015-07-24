# CBF-JavaScript-Clientside-verifier
A JavaScript implementation of the bet validation script 

This is a javascript port of the Cryptobetfair PHP verifier. (https://cryptobetfair.com/d/i/verifybet.php?showyourself=pygmentize)
It relies heavily on CryptoJS and PHPJS. 
The usage of PHPJS, is done to maintain readability and comparability with the PHP verifier.

#Requirements

// @require     http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/sha256.js
// @require     http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/hmac-sha256.js
// @require     http://crypto-js.googlecode.com/svn/tags/3.1.2/build/components/enc-base64-min.js
// @require     https://raw.githubusercontent.com/kvz/phpjs/master/functions/misc/pack.js
// @require     https://raw.githubusercontent.com/kvz/phpjs/master/workbench/misc/unpack.js
// @require     https://raw.githubusercontent.com/kvz/phpjs/master/functions/bc/bccomp.js
// @require     https://raw.githubusercontent.com/kvz/phpjs/master/functions/strings/bin2hex.js
// @require     https://raw.githubusercontent.com/kvz/phpjs/master/functions/strings/str_split.js
// @require     https://raw.githubusercontent.com/kvz/phpjs/master/functions/math/hexdec.js
// @require     https://raw.githubusercontent.com/kvz/phpjs/master/functions/bc/bcdiv.js
// @require     https://raw.githubusercontent.com/kvz/phpjs/master/functions/bc/bcsub.js
// @require     https://raw.githubusercontent.com/kvz/phpjs/master/functions/bc/bcmul.js
// @require     https://raw.githubusercontent.com/kvz/phpjs/master/functions/bc/bcdiv.js
// @require     https://raw.githubusercontent.com/kvz/phpjs/master/functions/_phpjs_shared/_phpjs_shared_bc.js

